---
title: Code configuration for enabling SSO for bots
description: Describes code configuration for enabling SSO for bots
ms.topic: how-to
ms.localizationpriority: medium
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD) Graph API
---
# Add code to enable SSO in your bot app

Before you add code to enable SSO, ensure that you've registered your app with Azure AD.

> [!div class="nextstepaction"]
> [Register with Azure AD](bot-sso-register-aad.md)

You need to configure your app's code to obtain an access token from Azure AD. The access token is issued on behalf of the bot app.

This section covers:

1. [Request a bot token](#request-a-bot-token)
1. [Receive the bot token](#receive-the-bot-token)

## Request a bot token

The request to get the token is a normal POST message request using the existing message schema. It's included in the attachments of an OAuthCard. The schema for the OAuthCard class is defined in [Microsoft Bot Schema 4.0](/dotnet/api/microsoft.bot.schema.oauthcard?view=botbuilder-dotnet-stable&preserve-view=true) and it's similar to a sign in card. Teams treats this request as a silent token acquisition if the `TokenExchangeResource` property is populated on the card. For the Teams channel, only the `Id` property, which uniquely identifies a token request, is honored.

>[!NOTE]
> The Microsoft Bot Framework `OAuthPrompt` or the `MultiProviderAuthDialog` is supported for SSO authentication.

If the user is using the application for the first time and user consent is required, the following dialog box appears to continue with the consent experience:

![Consent dialog box](~/assets/images/authentication/SSO-bots-auth/bot-consent-box.png)

When the user selects **Continue**, the following events occur:

* If the bot defines a sign in button, the sign in flow for bots is activated that is similar to the sign in flow from an OAuth card button in a message stream. The developer must decide which permissions require user's consent. This approach is recommended if you require a token with permissions beyond `openId`. For example, if you want to exchange the token for graph resources.

* If the bot isn't providing a sign in button on the OAuth card, user consent is required for a minimal set of permissions. This token is useful for basic authentication and to get the user's email address.

### C# token request without a sign in button

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

## Receive the bot token

The response with the token is sent through an invoke activity with the same schema as other invoke activities that the bots receive today. The only difference is the invoke name,
**sign in/tokenExchange**, and the **value** field. The **value** field contains the **Id**, a string of the initial request to get the token and the **token** field, a string value including the token.

>[!NOTE]
> You might receive multiple responses for a given request if the user has multiple active endpoints. You must deduplicate the responses with the token.

### C# code to handle the invoke activity

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

The `turnContext.activity.value` is of type [TokenExchangeInvokeRequest](/dotnet/api/microsoft.bot.schema.tokenexchangeinvokerequest?view=botbuilder-dotnet-stable&preserve-view=true) and contains the token that can be further used by your bot. You must store the tokens for performance reasons and refresh them.

## Token exchange failure

/ move to Troubleshooting /

If there's a token exchange failure, use the following code:

```json
{​​ 
    "status": "<response code>", 
    "body": 
    {​​ 
        "id":"<unique Id>", 
        "connectionName": "<connection Name on the bot (from the OAuth card)>", 
        "failureDetail": "<failure reason if status code is not 200, null otherwise>" 
    }​​ 
}​​
```

To understand what the bot does when the token exchange fails to trigger a consent prompt, see the following steps:

>[!NOTE]
> No user action is required to be taken as the bot takes the actions when the token exchange fails.

1. The client starts a conversation with the bot triggering an OAuth scenario.
2. The bot sends back an OAuth card to the client.
3. The client intercepts the OAuth card before displaying it to the user and checks if it contains a `TokenExchangeResource` property.
4. If the property exists, the client sends a `TokenExchangeInvokeRequest` to the bot. The client must have an exchangeable token for the user, which must be an Azure AD v2 token and whose audience must be the same as `TokenExchangeResource.Uri` property. The client sends an invoke activity to the bot with the following code:

    ```json
    {
        "type": "Invoke",
        "name": "signin/tokenExchange",
        "value": 
        {
            "id": "<any unique Id>",
            "connectionName": "<connection Name on the skill bot (from the OAuth card)>",
            "token": "<exchangeable token>"
        }
    }
    ```

5. The bot processes the `TokenExchangeInvokeRequest` and returns a `TokenExchangeInvokeResponse` back to the client. The client must wait until it receives the `TokenExchangeInvokeResponse`.

    ```json
    {
        "status": "<response code>",
        "body": 
        {
            "id":"<unique Id>",
            "connectionName": "<connection Name on the skill bot (from the OAuth card)>",
            "failureDetail": "<failure reason if status code is not 200, null otherwise>"
        }
    }
    ```

6. If the `TokenExchangeInvokeResponse` has a `status` of `200`, then the client doesn't show the OAuth card. See the [normal flow image](/azure/bot-service/bot-builder-concept-sso?view=azure-bot-service-4.0#sso-components-interaction&preserve-view=true). For any other `status` or if the `TokenExchangeInvokeResponse` isn't received, then the client shows the OAuth card to the user. See the [fallback flow image](/azure/bot-service/bot-builder-concept-sso?view=azure-bot-service-4.0#sso-components-interaction&preserve-view=true). If there are any errors or unmet dependencies like user consent, this activity ensures that the SSO flow falls back to normal OAuthCard flow.

## Next step

> [!div class="nextstepaction"]
> [Update Teams manifest and preview the app](bot-sso-manifest.md)
