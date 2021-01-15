---
title: Single sign-on support for bots 
description: Describes how to get a user token. Currently, a bot developer can use a sign in card or the azure bot service with the OAuth card support.
keywords: token, user token, SSO support for bots
ms.topic: conceptual
---

# Single sign-on (SSO) support for bots

Single sign-on authentication in Azure Active Directory (AAD) minimizes the number of times users need to enter their sign in credentials by silently refreshing the authentication token. If users agree to use your app, they need not provide consent again on another device and can sign in automatically. The flow is similar to that of [Microsoft Teams tab SSO support]( ../../../tabs/how-to/authentication/auth-aad-sso.md), however, the difference is in the protocol for how a bot [requests tokens](#request-a-bot-token) and [receives responses](#receive-the-bot-token).

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

1. [Register your app through the AAD portal](#register-your-app-through-the-aad-portal).
2. [Update your Teams application manifest for your bot](#update-your-teams-application-manifest-for-your-bot).
3. [Add the code to request and receive a bot token](#add-the-code-to-request-and-receive-a-bot-token).

### Register your app through the AAD portal

The following steps are required to register your app through the AAD portal. These steps are similar to the [tab SSO flow](../../../tabs/how-to/authentication/auth-aad-sso.md):

1. Register a new application in the [Azure Active Directory – App Registrations](https://go.microsoft.com/fwlink/?linkid=2083908) portal.
2. Select **New Registration** and on the *register an application* page, enter the following values:
    1. Enter a **Name** for your app.
    2. Choose the **Supported account types** (any account type will work).

        > [!NOTE]
        >
        > If your AAD app is registered in the same tenant where you're making an authentication request in Teams, the user consent is not asked and an access token is granted right away. If the AAD app is registered in a different tenant, users need to provide consent to these permissions.

    3. Choose **Register**.
3. On the overview page, copy and save the **Application (client) ID**. You need it later when updating your Teams application manifest.
4. Under **Manage**, select **Expose an API**. 

   > [!IMPORTANT]
    > * If you are building a standalone bot, enter the Application ID URI as `api://botid-{YourBotId}`. Here **YourBotId** is your AAD application ID.
    > * If you are building an app with a bot and a tab, enter the Application ID URI as `api://fully-qualified-domain-name.com/botid-{YourBotId}`.

5. Select the permissions that your application needs for the AAD endpoint and, optionally, for Microsoft Graph.
6. [Grant permissions](/azure/active-directory/develop/v2-permissions-and-consent) for Teams desktop, web, and mobile applications.
7. Select **Add a scope**.
8. In the panel that opens, add a client app by entering `access_as_user` as the **Scope name**.

    >[!NOTE]
    > The "access_as_user" scope used to add a client app is for "Administrators and users".
    >
    > You need to be aware of these important restrictions:
    >
    > * Only user-level Microsoft Graph API permissions, i.e., email, profile, offline_access, and OpenId are supported. If you need access to other Microsoft Graph scopes such as `User.Read` or `Mail.Read`, see our [recommended workaround](../../../tabs/how-to/authentication/auth-aad-sso.md#apps-that-require-additional-microsoft-graph-scopes).
    > * Your application's domain name needs to be same as the domain name, which you have registered for your AAD application.
    > * Multiple domains per app are currently not supported.
    > * Applications that use the `azurewebsites.net` domain are not supported because it is common and may be a security risk.

#### Update the Azure portal with the OAuth connection

The following steps are required to update the Azure portal with the OAuth connection:

1. In the Azure Portal, navigate to **Bot Channels Registration**.

2. Go to **API Permissions**. Select **Add a permission** > **Microsoft Graph** > **Delegated permissions**, then add the following permissions from Microsoft Graph API:
    * User.Read (enabled by default)
    * email
    * offline_access
    * OpenId
    * profile

3. Select **Settings** on the left pane and choose **Add Setting** under the **OAuth Connection Settings** section.

    ![SSOBotHandle2 view](../../../assets/images/bots/bots-vuSSOBotHandle2-settings.png)

4. The following steps are required to complete the **New Connection Setting** form:

    >[!NOTE]
    > **Implicit grant** may be required in the AAD application.

    1. Enter a **Name** for your new Connection Setting. This is the name that is referred to inside the settings of your bot service code in **step 5** of the [Bot SSO at runtime](#bot-sso-at-runtime) section.
    2. From the **Service Provider** drop-down, select **Azure Active Directory v2**.
    3. Enter the client credentials for the AAD application.
    4. For the **Token Exchange URL** use the scope value defined in the [Update your Teams application manifest for your bot](#update-your-teams-application-manifest-for-your-bot) section. The Token Exchange URL indicates to the SDK that this AAD application is configured for SSO.
    5. In the **Tenant ID** box, enter *common*.
    6. Add all the **Scopes** configured when specifying permissions to downstream APIs for your AAD application. With the **Client id** and **Client secret** provided, the token store exchanges the token for a graph token with defined permissions for you.
    7. Select **Save**.

    ![VuSSOBotConnection setting view](../../../assets/images/bots/bots-vuSSOBotConnection-settings.png)

### Update your Teams application manifest for your bot

If your application contains a standalone bot, then the following code is required to add new properties to your Teams application manifest:

```json
    "webApplicationInfo": 
        {
            "id": "00000000-0000-0000-0000-000000000000",
            "resource": "api://botid-00000000-0000-0000-0000-000000000000"
        }
```
If your application contains a bot and a tab, then the following code is required to add new properties to your Teams application manifest:

```json
    "webApplicationInfo": 
        {
            "id": "00000000-0000-0000-0000-000000000000",
            "resource": "api://subdomain.example.com/botid-00000000-0000-0000-0000-000000000000"
        }
```

**WebApplicationInfo** is the parent of the following elements:

> [!div class="checklist"]
>
> * **id** - The client ID of the application. This is the application ID that you obtained as part of registering the application with AAD.
> * **resource** - The domain and subdomain of your application. This is the same URI (including the `api://` protocol) that you registered when creating your `scope` in the [Register your app through the AAD portal](#register-your-app-through-the-aad-portal) section. You should not include the `access_as_user` path in your resource. The domain part of this URI should match the domain and subdomains, used in the URLs of your Teams application manifest.

### Add the code to request and receive a bot token

#### Request a bot token

The request to get the token is a normal POST message request (using the existing message schema). It is included in the attachments of an OAuthCard. The schema for the OAuthCard class is defined in [Microsoft Bot Schema 4.0](/dotnet/api/microsoft.bot.schema.oauthcard?view=botbuilder-dotnet-stable&preserve-view=true) and it is similar to a sign-in card. Teams treats this request as a silent token acquisition if the `TokenExchangeResource` property is populated on the card. For the Teams channel, we honor only the `Id` property, which uniquely identifies a token request.

>[!NOTE]
> The Microsoft Bot Framework `OAuthPrompt` or the `MultiProviderAuthDialog` is supported for SSO authentication.

If the user is using your application for the first time and user consent is required, the following dialog box is shown to continue with the consent experience:

![Consent dialog box](../../../assets/images/bots/bots-consent-dialogbox.png)

When the user selects **Continue**, two different things occur depending on whether the bot is defined or not, and a sign-in button is shown on the OAuthCard.

If the bot defines a sign-in button, the sign in flow for bots is triggered similar to the sign in flow from a card button in a message stream. It is up to the developer to decide which permissions require user's consent. This approach is recommended if you need a token with permissions beyond `openId`. For example, if you want to exchange the token for graph resources.

If the bot is not providing a sign-in button on the card, user consent is required for a minimal set of permissions. This token is useful for basic authentication and to get the user's email address.

##### C# token request without a sign-in button

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

### Update the auth sample

You need to open [Teams auth sample](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/46.teams-auth). The following steps are required to update the auth sample:

1. Update the TeamsBot to handle the deduping of the incoming request by including the following code:

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
  
2. Update `appsettings.json` to include the `botId`, password, and the connection name defined in the [Update the Azure portal with the OAuth connection](#update-the-azure-portal-with-the-oauth-connection) section.
3. Update the manifest and ensure that `token.botframework.com` is in the valid domains list. For more information, see [Teams auth sample](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/46.teams-auth).
4. Zip the manifest with the profile images and install it in Teams.

#### Additional code samples

* [C# sample using the Bot Framework SDK](https://github.com/microsoft/BotBuilder-Samples/tree/main/experimental/teams-sso/csharp_dotnetcore).

* [C# sample using the Bot Framework SDK to deduplicate the token request](https://microsoft.sharepoint.com/:u:/t/ExtensibilityandFundamentals/Ea36rUGiN1BGt1RiLOb-mY8BGMF8NwPtronYGym0sCGOTw?e=4bB682).

* [C# sample without using the Bot Framework SDK token store](https://microsoft-my.sharepoint-df.com/:u:/p/tac/EceKDXrkMn5AuGbh6iGid8ABKEVQ6hkxArxK1y7-M8OVPw).
