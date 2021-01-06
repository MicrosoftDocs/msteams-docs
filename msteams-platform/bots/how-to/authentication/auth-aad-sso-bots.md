---
title: Single sign-on support for bots 
description: Describes how to get a user token. Currently, a bot developer can use a sign in card or the azure bot service with the OAuth card support.
keywords: token, user token, SSO support for bots
ms.topic: conceptual
---

# Single sign-on (SSO) support for bots

Single sign-on authentication in Azure Active Directory (AAD) minimizes the number of times users need to enter their sign in credentials by silently refreshing the authentication token. If users agree to use your app, they need not provide consent again on another device and can sign in automatically. The flow is similar to that of [Microsoft Teams tab SSO support]( ../../../tabs/how-to/authentication/auth-aad-sso.md), however, the difference is in the protocol for how a bot requests tokens and receives responses.

>[!NOTE]
> OAuth 2.0 is an open standard for authentication and authorization used by AAD and many other identity providers. A basic understanding of OAuth 2.0 is a prerequisite for working with authentication in Teams.

## Bot SSO at runtime

![Bot SSO at runtime diagram](../../../assets/images/bots/bots-sso-diagram.png)

The following steps are required to get authentication and bot application tokens:

1. The bot sends a message with an OAuthCard that contains the `tokenExchangeResource` property. It tells Teams to obtain an authentication token for the bot application. The user receives messages at all the active user endpoints.

    > [!NOTE]
    >* A user can have more than one active endpoint at a time.  
    >* The bot token is received from every active user endpoint.
    >* SSO support currently requires the app to be installed in personal scope.

2. When the current user uses your bot application for the first time, there is a request prompt to provide consent (if consent is required) or to handle step-up authentication (such as two-factor authentication).

3. Teams requests the bot application token from the AAD endpoint for the current user.

4. AAD sends the bot application token to the Teams application.

5. Teams sends the token to the bot as part of the value object returned by the invoke activity with the name sign-in/tokenExchange.
  
6. The parsed token in the bot application provides the needed information, such as the user's email address.
  
## Develop an SSO Teams bot
  
The following steps are required to develop an SSO Teams bot:

1. [Create an Azure account](#create-an-azure-account).
2. [Update your Teams app manifest](#update-your-teams-app-manifest).
3. [Add the code to request and receive a bot token](#add-the-code-to-request-and-receive-a-bot-token).

### Create an Azure account

The following steps are required to create an Azure account. These steps are similar to the [tab SSO flow](../../../tabs/how-to/authentication/auth-aad-sso.md):

1. Get your [AAD Application ID](/graph/auth-register-app-v2) for Teams desktop, web, or mobile client.

   > [!IMPORTANT]
    > * If you are building a standalone bot, set the Application ID URI to `api://botid-{YourBotId}`. Here **YourBotId** is your AAD application ID.
    > * If you are building an app with a bot and a tab, set the Application ID URI to `api://fully-qualified-domain-name.com/botid-{YourBotId}`.

1. Specify the permissions that your application needs for the AAD endpoint and, optionally, for Microsoft Graph.
1. [Grant permissions](/azure/active-directory/develop/v2-permissions-and-consent) for Teams desktop, web, and mobile applications.
1. Select **Add a scope**.
1. In the panel that opens, add a client app by entering `access_as_user` as the **Scope name**.

    >[!NOTE]
    > The "access_as_user" scope used to add a client app is for "Administrators and users".

### Update your Teams app manifest

The following code is required to add new properties to your Teams app manifest:

```json
    "webApplicationInfo": 
        {
            "id": "00000000-0000-0000-0000-000000000000",
            "resource": "api://subdomain.example.com/00000000-0000-0000-0000-000000000000"
        }
```

**WebApplicationInfo** - The parent of the following elements:

> [!div class="checklist"]
>
> * **id** - The client ID of the application. This is the application ID that you obtained as part of registering the application with Azure AD.
> * **resource** - The domain and subdomain of your application. This is the same URI (including the `api://` protocol) that you registered when creating your `scope` in the [Create an Azure account](#create-an-azure-account) section. You should not include the `access_as_user` path in your resource. The domain part of this URI should match the domain and subdomains, used in the URLs of your Teams application manifest.

### Add the code to request and receive a bot token

#### Request a bot token

The request to get the token is a normal POST message request (using the existing message schema). It is included in the attachments of an OAuthCard. The schema for the OAuthCard class is defined in [Microsoft Bot Schema 4.0](/dotnet/api/microsoft.bot.schema.oauthcard?view=botbuilder-dotnet-stable&preserve-view=true) and it is similar to a sign-in card. Teams treats this request as a silent token acquisition if the `TokenExchangeResource` property is populated on the card. For the Teams channel, we honor only the `Id` property, which uniquely identifies a token request.

>[!NOTE]
> The Bot Framework `OAuthPrompt` or the `MultiProviderAuthDialog` is supported for SSO authentication.

If this is the first time the user is using your application and user consent is required, the following dialog box is shown to continue with the consent experience. When the user selects **Continue**, two different things occur depending on whether the bot is defined or not and a sign-in button is shown on the OAuthCard.

![Consent dialog box](../../../assets/images/bots/bots-consent-dialogbox.png)

If the bot defines a sign-in button, the sign in flow for bots is triggered similar to the sign in flow from a card button in a message stream. It is up to the developer to decide which permissions require user's consent. This approach is recommended if you need a token with permissions beyond `openId`. For example, if you want to exchange the token for graph resources.

If the bot is not providing a sign-in button on the card, user consent is required for a minimal set of permissions. This token is useful for basic authentication and to get the user's email address.

#### C# token request without a sign-in button

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

#### Receive the bot token

The response with the token is sent through an invoke activity with the same schema as other invoke activities that the bots receive today. The only difference is the invoke name, **sign-in/tokenExchange** and the **value** field, which contains the **Id** (a string) of the initial request to get the token and the **token** field (a string value including the token).

>[!NOTE]
> You might receive multiple responses for a given request if the user has multiple active endpoints. It is up to you to deduplicate the responses with the token.

##### C# code to handle the invoke activity

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

The `turnContext.activity.value` is of type [TokenExchangeInvokeRequest](/dotnet/api/microsoft.bot.schema.tokenexchangeinvokerequest?view=botbuilder-dotnet-stable&preserve-view=true) and contains the token that can be further used by your bot. You need to store the tokens for performance reasons and refresh them.

### Update the Azure portal with the OAuth connection

The following steps are required to update the Azure portal with the OAuth connection:

1. In the Azure Portal, navigate back to **Bot Channels Registration**.

2. Select **Settings** on the left pane and choose **Add Setting** under the **OAuth Connection Settings** section.

    ![SSOBotHandle2 view](../../../assets/images/bots/bots-vuSSOBotHandle2-settings.png)

3. The following steps are required to complete the **New Connection Setting** form:

    >[!NOTE]
    > **Implicit grant** may be required in the AAD application.
    
    1. Enter a name for your new Connection Setting. This is the name that gets referenced inside the settings of your bot service code in **step 5** of the [Bot SSO at runtime](#bot-sso-at-runtime) section.
    2. From the **Service Provider** drop-down, select **Azure Active Directory V2**.
    3. Enter the client credentials for the AAD application.
    4. For the Token Exchange URL use the scope value defined in the previous step of your AAD application. The Token Exchange URL indicates to the SDK that this AAD application is configured for SSO.
    5. In the **Tenant ID** box, enter *common*.
    6. Add all the scopes configured when specifying permissions to downstream APIs for your AAD application. With the client ID and client secret provided, the token store exchanges the token for a graph token with defined permissions for you.
    7. Select **Save**.

    ![VuSSOBotConnection setting view](../../../assets/images/bots/bots-vuSSOBotConnection-settings.png)

### Update the auth sample

The following steps are required to update the auth sample.

1. Open [Teams auth sample](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/46.teams-auth).
2. Update the TeamsBot to handle the deduping of the incoming request by including the following code:

    ```csharp
        protected override async Task OnSignInInvokeAsync(ITurnContext<IInvokeActivity> turnContext, CancellationToken cancellationToken)
            {
                await Dialog.RunAsync(turnContext, ConversationState.CreateProperty<DialogState>(nameof(DialogState)), cancellationToken);
            }
        protected override async Task OnTokenResponseEventAsync(ITurnContext<IEventActivity> turnContext, CancellationToken cancellationToken)
            {
                await Dialog.RunAsync(turnContext, ConversationState.CreateProperty<DialogState>(nameof(DialogState)), cancellationToken);
            }
    ```
  
3. Update `appsettings.json` to include the `botId`, password, and the connection name defined in the [Update the Azure portal with the OAuth connection](#update-the-azure-portal-with-the-oauth-connection) section.
4. Update the manifest and ensure that `token.botframework.com` is in the valid domains list. For more information, see [teams auth sample](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/46.teams-auth).
5. Zip the manifest with the profile images and install it in Teams.

#### Additional code samples

* [C# sample using the Bot Framework SDK](https://github.com/microsoft/BotBuilder-Samples/tree/main/experimental/teams-sso/csharp_dotnetcore).

* [C# sample using the Bot Framework SDK to deduplicate the token request](https://microsoft.sharepoint.com/:u:/t/ExtensibilityandFundamentals/Ea36rUGiN1BGt1RiLOb-mY8BGMF8NwPtronYGym0sCGOTw?e=4bB682).

* [C# sample without using the Bot Framework SDK token store](https://microsoft-my.sharepoint-df.com/:u:/p/tac/EceKDXrkMn5AuGbh6iGid8ABKEVQ6hkxArxK1y7-M8OVPw).
