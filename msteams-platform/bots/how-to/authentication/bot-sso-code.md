---
title: Code configuration for enabling SSO for bots
description: Describes code configuration for enabling SSO for bots
ms.topic: how-to
ms.localizationpriority: high
---
# Add code to enable SSO in your bot app

Before you add code to enable SSO, ensure that you've configured your app with Azure AD.

> [!div class="nextstepaction"]
> [Configure bot app in Azure AD](bot-sso-register-aad.md)

You need to configure your app's code to obtain an access token from Azure AD. The access token is issued on behalf of the bot app.

This section covers:

1. [Update development environment variables](#update-development-environment-variables)
1. [Add code to request a token](#add-code-to-request-a-token)
1. [Add code to receive the token](#add-code-to-receive-the-token)

## Update development environment variables

You've configured client secret and OAuth connection setting for the app in Azure AD. You must configure your bot app code with these variables.

To update the development environment variables:

1. Open the bot app project.
1. Open the environment file for your project.
1. Update the variable `MICROSOFT_APP_PASSWORD` and its value as shown below:

    ```text
    MICROSOFT_APP_PASSWORD=<client secret from Azure AD>
    ```

1. Add a new variable in the environment file for configuring OAuth connection setting as shown below:

    ```text
    SSO_CONNECTION_NAME={{OAUTH_CONNECTION_SETTING_NAME}}
    ```

1. Save the file.

You've now configured the required environment variables for your bot app and for SSO. Next, add the code for handling bot tokens.

## Add code to request a token

The request to get the token is a POST message request using the existing message schema. It's included in the attachments of an OAuthCard. The schema for the OAuthCard class is defined in [Microsoft Bot Schema 4.0](/dotnet/api/microsoft.bot.schema.oauthcard?view=botbuilder-dotnet-stable&preserve-view=true). Teams refreshes the token if the `TokenExchangeResource` property is populated on the card. For the Teams channel, only the `Id` property, which uniquely identifies a token request, is honored.

>[!NOTE]
> The Microsoft Bot Framework `OAuthPrompt` or the `MultiProviderAuthDialog` is supported for SSO authentication.

Use the following code snippet for requesting a token without needing the app user to sign-in.

# [csharp](#tab/cs)

```csharp
    var attachment = new Attachment
            {
                Content = new OAuthCard
                {
                    TokenExchangeResource = new TokenExchangeResource
                    {
                        Id = requestId
                    }
                },
                ContentType = OAuthCard.ContentType,
            };
            var activity = MessageFactory.Attachment(attachment);

            // NOTE: This activity needs to be sent in the 1:1 conversation between the bot and the user. 
            // If the bot supports group and channel scope, this code should be updated to send the request to the 1:1 chat. 

       await turnContext.SendActivityAsync(activity, cancellationToken);
```

# [JavaScript](#tab/js)

```JavaScript
var attachment = {
    content: {
        tokenExchangeResource: {
            id: requestId
                }
            },
    contentType: "application/vnd.microsoft.card.oauth",
};
await context.sendActivity({
    attachments: [attachment]
});
```
---

### Consent dialog for getting access token

If the app user is using the application for the first time and user consent is required, the following dialog box appears:

:::image type="content" source="../../../assets/images/authentication/SSO-bots-auth/bot-consent-box.png" alt-text="Consent dialog for bot SSO":::

When the user selects **Continue**, one of the following events occurs:

* If the bot UI has a sign-in button, the sign-in flow for bots is activated. You can determine the permissions that require app user's consent. Use this approach if your app requires Graph permissions other than `openid`.

* If the bot doesn't have a sign-in button on the OAuth card, user consent is required for a minimal set of permissions. This token is useful for basic authentication and to get the app user's email address.

The consent dialog that appears is for open-id scopes defined in Azure AD. The app user must give consent only once. After consenting, the app user can access and use your bot app for the granted permissions and scopes.

> [!IMPORTANT]
> Scenarios where consent dialogs are not needed:
>
> - If the tenant administrator has granted consent on behalf of the tenant, app users don't need to be prompted for consent at all. This means that the app users don't see the consent dialogs, and can access the app seamlessly.
> - If your Azure AD app is registered in the same tenant from which you're requesting an authentication in Teams, the app user can't be asked to consent, and is granted an access token right away. App users consent to these permissions only if the Azure AD app is registered in a different tenant.

If you encounter any errors, see [Troubleshoot SSO authentication in Teams](../../../tabs/how-to/authentication/tab-sso-troubleshooting.md).

## Add code to receive the token

The response with the token is sent through an invoke activity with the same schema as other invoke activities that the bots receive today. The only difference is the invoke name,
**sign in/tokenExchange**, and the **value** field. The **value** field contains the **Id**, a string of the initial request to get the token and the **token** field, a string value including the token.

>[!NOTE]
> You might receive multiple responses for a given request if the user has multiple active endpoints. You must eliminate all duplicate or redundant responses with the token.

Use the following code snippet to invoke response:

# [csharp](#tab/csharp)

```csharp
    protected override async Task<InvokeResponse> OnInvokeActivityAsync
    (ITurnContext<IInvokeActivity> turnContext, CancellationToken cancellationToken)
            {
                try
                {
                    if (turnContext.Activity.Name == SignInConstants.TokenExchangeOperationName && turnContext.Activity.ChannelId == Channels.Msteams)
                    {
                        await OnTokenResponseEventAsync(turnContext, cancellationToken);
                        return new InvokeResponse() { Status = 200 };
                    }
                    else
                    {
                        return await base.OnInvokeActivityAsync(turnContext, cancellationToken);
                    }
                }
                catch (InvokeResponseException e)
                {
                    return e.CreateInvokeResponse();
                }
            }
```

# [JavaScript](#tab/javascript)

```JavaScript
async onSignInInvoke(context) {
        if (context.activity && context.activity.name === tokenExchangeOperationName) {
            await onTokenResponseEvent(context);
            const response = {
                        status: 200
                    };
                    return response;
        }
        else {
            return await super.onInvokeActivity(context);
        }
    }
```
---

The `turnContext.activity.value` is of type [TokenExchangeInvokeRequest](/dotnet/api/microsoft.bot.schema.tokenexchangeinvokerequest?view=botbuilder-dotnet-stable&preserve-view=true). It contains the token that can be used by your bot. You must store the tokens and refresh them as needed by the app user.

### Validate the access token

Web APIs on your server must decode the access token, and verify if it's sent from the client. The token is a JSON Web Token (JWT), which means that validation works just like token validation in most standard OAuth flows. The web APIs must decode access token. Optionally, you can copy and paste access token manually into a tool, such as jwt.ms.

There are a number of libraries available that can handle JWT validation. Basic validation includes:

- Checking that the token is well-formed
- Checking that the token was issued by the intended authority
- Checking that the token is targeted to the web API

Keep in mind the following guidelines when validating the token:

- Valid SSO tokens are issued by Azure AD. The `iss` claim in the token should start with this value.
- The token's `aud1` parameter will be set to the app ID generated during Azure AD app registration.
- The token's `scp` parameter will be set to `access_as_user`.

#### Example access token

The following is a typical decoded payload of an access token.

```javascript
{
    aud: "2c3caa80-93f9-425e-8b85-0745f50c0d24",
    iss: "https://login.microsoftonline.com/fec4f964-8bc9-4fac-b972-1c1da35adbcd/v2.0",
    iat: 1521143967,
    nbf: 1521143967,
    exp: 1521147867,
    aio: "ATQAy/8GAAAA0agfnU4DTJUlEqGLisMtBk5q6z+6DB+sgiRjB/Ni73q83y0B86yBHU/WFJnlMQJ8",
    azp: "e4590ed6-62b3-5102-beff-bad2292ab01c",
    azpacr: "0",
    e_exp: 262800,
    name: "Mila Nikolova",
    oid: "6467882c-fdfd-4354-a1ed-4e13f064be25",
    preferred_username: "milan@contoso.com",
    scp: "access_as_user",
    sub: "XkjgWjdmaZ-_xDmhgN1BMP2vL2YOfeVxfPT_o8GRWaw",
    tid: "fec4f964-8bc9-4fac-b972-1c1da35adbcd",
    uti: "MICAQyhrH02ov54bCtIDAA",
    ver: "2.0"
}
```

## Code sample

|**Sample name** | **Description** |**.NET** |**C#** |**Node.js** |
|----------------|-----------------|--------------|--------------|--------------|
|Bot framework SDK | This sample code demonstrates how to get started with authentication in a bot for Microsoft Teams. |[View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/csharp_dotnetcore/46.teams-auth)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation-sso-quickstart/csharp_dotnetcore/BotConversationSsoQuickstart)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation-sso-quickstart/js)|

## Next step

> [!div class="nextstepaction"]
> [Update Teams app manifest and preview the app](bot-sso-manifest.md)
