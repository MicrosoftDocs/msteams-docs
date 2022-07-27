---
title: Code configuration for enabling SSO for message extension
description: Describes code configuration for enabling SSO for message extension
ms.topic: how-to
ms.localizationpriority: high
---
# Add code to enable SSO in your message extension app

Before you add code to enable SSO, ensure that you've registered your app with Azure AD.

> [!div class="nextstepaction"]
> [Register with Azure AD](msgex-sso-register-aad.md)

You need to configure your app's code to obtain an access token from Azure AD. The access token is issued on behalf of the bot app.

> [!NOTE]
> SSO handlers except `OnTeamsMessagingExtensionQueryAsync` and `OnTeamsAppBasedLinkQueryAsync` from the `TeamsMessagingExtensionsSearchAuthConfigBot.cs` file aren't supported.

This section covers:

1. [Update development environment variables](#update-development-environment-variables)
1. [Request a bot token](#request-a-bot-token)
1. [Receive the bot token](#receive-the-bot-token)

## Update development environment variables

You've configured client secret and OAuth connection setting for the app in Azure AD. You must configure your bot app code with these variables.

To update the development environment variables:

1. Open the bot app project.
1. Open the `./env` file for your project.
1. Find the variable `MICROSOFT_APP_PASSWORD` and update its value as shown below:

    ```text
    MICROSOFT_APP_PASSWORD=<client secret from Azure AD>
    ```

1. Add a new variable in the `./env` file for configuring OAuth connection setting as shown below:

    ```text
    SSO_CONNECTION_NAME={{OAUTH_CONNECTION_SETTING_NAME}}
    ```

1. Save the file.

You've now configured the required environment variables for your bot app and for SSO. Next, add the code for handling bot tokens.

## Request a bot token

The request to get the token is a normal POST message request using the existing message schema. It's included in the attachments of an OAuthCard. The schema for the OAuthCard class is defined in [Microsoft Bot Schema 4.0](/dotnet/api/microsoft.bot.schema.oauthcard?view=botbuilder-dotnet-stable&preserve-view=true) and it's similar to a sign-in card. Teams treats this request as a silent token acquisition if the `TokenExchangeResource` property is populated on the card. For the Teams channel, only the `Id` property, which uniquely identifies a token request, is honored.

>[!NOTE]
> The Microsoft Bot Framework `OAuthPrompt` or the `MultiProviderAuthDialog` is supported for SSO authentication.

If the app user is using the application for the first time and user consent is required, the following message appears:

:::image type="content" source="../../../assets/images/authentication/teams-sso-mex/MEActions.png" alt-text="SSO authentication for message extension app":::

When the app user selects **AAD SSO authentication**, the validation is done using the Teams identity.

:::image type="content" source="../../../assets/images/authentication/teams-sso-mex/MESsoCard.png" alt-text="SSO authentication completed for message extension app":::

### C# token request without a sign-in button

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

## Receive the bot token

The response with the token is sent through an invoke activity with the same schema as other invoke activities that the bots receive today. The only difference is the invoke name,
**sign in/tokenExchange**, and the **value** field. The **value** field contains the **Id**, a string of the initial request to get the token and the **token** field, a string value including the token.

>[!NOTE]
> You might receive multiple responses for a given request if the user has multiple active endpoints. You must deduplicate the responses with the token.

You receive the token in `OnTeamsMessagingExtensionQueryAsync` handler in the `turnContext.Activity.Value` payload or in the `OnTeamsAppBasedLinkQueryAsync`, depending on which scenario you're enabling the SSO for:

```json
JObject valueObject=JObject.FromObject(turnContext.Activity.Value);
if(valueObject["authentication"] !=null)
 {
    JObject authenticationObject=JObject.FromObject(valueObject["authentication"]);
    if(authenticationObject["token"] !=null)
 }
```

To configure an OAuth connection, add the following code snippet to `TeamsMessagingExtensionsSearchAuthConfigBot.cs`:

```c#
protected override async Task<InvokeResponse> OnInvokeActivityAsync(ITurnContext<IInvokeActivity> turnContext, CancellationToken cancellationToken)
     {
         JObject valueObject = JObject.FromObject(turnContext.Activity.Value);
         if (valueObject["authentication"] != null)
         {
             JObject authenticationObject = JObject.FromObject(valueObject["authentication"]);
             if (authenticationObject["token"] != null)
             {
                 //If the token is NOT exchangeable, then return 412 to require user consent
                 if (await TokenIsExchangeable(turnContext, cancellationToken))
                 {
                     return await base.OnInvokeActivityAsync(turnContext, cancellationToken).ConfigureAwait(false);
                 }
                 else
                 {
                     var response = new InvokeResponse();
                     response.Status = 412;
                     return response;
                 }
             }
         }
         return await base.OnInvokeActivityAsync(turnContext, cancellationToken).ConfigureAwait(false);
     }
     private async Task<bool> TokenIsExchangeable(ITurnContext turnContext, CancellationToken cancellationToken)
     {
         TokenResponse tokenExchangeResponse = null;
         try
         {
             JObject valueObject = JObject.FromObject(turnContext.Activity.Value);
             var tokenExchangeRequest =
             ((JObject)valueObject["authentication"])?.ToObject<TokenExchangeInvokeRequest>();
             var userTokenClient = turnContext.TurnState.Get<UserTokenClient>();
             tokenExchangeResponse = await userTokenClient.ExchangeTokenAsync(
                             turnContext.Activity.From.Id,
                              _connectionName,
                              turnContext.Activity.ChannelId,
                              new TokenExchangeRequest
              {
                  Token = tokenExchangeRequest.Token,
              },
               cancellationToken).ConfigureAwait(false);
         }
 #pragma warning disable CA1031 //Do not catch general exception types (ignoring, see comment below)
         catch
 #pragma warning restore CA1031 //Do not catch general exception types
         {
             //ignore exceptions
             //if token exchange failed for any reason, tokenExchangeResponse above remains null, and a failure invoke response is sent to the caller.
             //This ensures the caller knows that the invoke has failed.
         }
         if (tokenExchangeResponse == null || string.IsNullOrEmpty(tokenExchangeResponse.Token))
         {
             return false;
         }
         return true;
     }
```

### C# code to handle the invoke activity

Use the following code snippet to invoke response.

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

The `turnContext.activity.value` is of type [TokenExchangeInvokeRequest](/dotnet/api/microsoft.bot.schema.tokenexchangeinvokerequest?view=botbuilder-dotnet-stable&preserve-view=true) and contains the token that can be further used by your bot. You must store the tokens for performance reasons and refresh them.

## Next step

> [!div class="nextstepaction"]
> [Update Teams app manifest and preview the app](msgex-sso-manifest.md)
