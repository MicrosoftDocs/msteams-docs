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
1. [Request a bot token](#request-a-bot-token)
1. [Receive the bot token](#receive-the-bot-token)

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

## Request a bot token

The request to get the token is a POST message request using the existing message schema. It's included in the attachments of an OAuthCard. The schema for the OAuthCard class is defined in [Microsoft Bot Schema 4.0](/dotnet/api/microsoft.bot.schema.oauthcard?view=botbuilder-dotnet-stable&preserve-view=true) and it's similar to a sign-in card. Teams treats this request as a silent token acquisition if the `TokenExchangeResource` property is populated on the card. For the Teams channel, only the `Id` property, which uniquely identifies a token request, is honored.

>[!NOTE]
> The Microsoft Bot Framework `OAuthPrompt` or the `MultiProviderAuthDialog` is supported for SSO authentication.

If the app user is using the application for the first time and user consent is required, the following dialog box appears:

:::image type="content" source="../../../assets/images/authentication/SSO-bots-auth/bot-consent-box.png" alt-text="Consent dialog for bot SSO":::

When the user selects **Continue**, one of the following events occurs:

* If the bot UI has a sign-in button, the sign-in flow for bots is activated. You can determine the permissions that require app user's consent. Use this approach if your app requires Graph permissions other than `openid`.

* If the bot doesn't have a sign-in button on the OAuth card, user consent is required for a minimal set of permissions. This token is useful for basic authentication and to get the app user's email address.

### C# token request without a sign-in button

Use the following code snippet for requesting a token without needing the app user to sign-in.

# [charp](#tab/cs)

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

## Receive the bot token

The response with the token is sent through an invoke activity with the same schema as other invoke activities that the bots receive today. The only difference is the invoke name,
**sign in/tokenExchange**, and the **value** field. The **value** field contains the **Id**, a string of the initial request to get the token and the **token** field, a string value including the token.

>[!NOTE]
> You might receive multiple responses for a given request if the user has multiple active endpoints. You must eliminate all duplicate or redundant responses with the token.

### C# code to handle the invoke activity

# [charp](#tab/csharp)

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

## Next step

> [!div class="nextstepaction"]
> [Update Teams app manifest and preview the app](bot-sso-manifest.md)
