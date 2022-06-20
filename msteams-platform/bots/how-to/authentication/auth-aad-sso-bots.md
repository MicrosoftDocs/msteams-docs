---
title: Single sign-on support for bots 
description: Learn how to get a user token and a bot developer can use a sign-in card or the Azure bot service with the OAuth card support.
ms.localizationpriority: medium
ms.topic: conceptual
---

# Single sign-on (SSO) support for bots

Single sign-on authentication in Microsoft Azure Active Directory (Azure AD) silently refreshes the authentication token to minimize the number of times users need to enter their sign in credentials. If users agree to use your app, they don't have to provide consent again on another device as they're signed in automatically. Tabs and bots have similar flow for SSO support. But bot [requests tokens](#request-a-bot-token) and [receives responses](#receive-the-bot-token) with a different protocol.

>[!NOTE]
> OAuth 2.0 is an open standard for authentication and authorization used by Azure AD and many other identity providers. A basic understanding of OAuth 2.0 is a prerequisite for working with authentication in Teams.

See the following video to learn about SSO with Microsoft Teams bots :
<br>

> [!VIDEO https://www.microsoft.com/en-us/videoplayer/embed/RE4OASc]
<br>

## Bot SSO at runtime

The following image illustrates the flow of SSO in bots:

![Bot SSO at runtime diagram](../../../assets/images/bots/bots-sso-diagram.png)

The following steps help you with authentication and bot application tokens:

1. The bot sends a message to Teams with an OAuthCard that contains `tokenExchangeResource` to obtain an authentication token for the bot application. The user receives messages at all the active user endpoints.

   > [!NOTE]
   >
   > * A user can have more than one active endpoint at a time.
   > * The bot token is received from every active user endpoint.
   > * The app must be installed in personal scope for SSO support.

1. If the current user is using your bot application for the first time, a request prompt appears to   the user to do one of the following actions:
    * Provide consent, if necessary.
    * Handle step-up authentication, such as two-factor authentication.

1. Teams requests the bot application token from the Azure AD endpoint for the current user.

1. Azure AD sends the bot application token to the Teams application.

1. Teams sends the token to the bot as part of the value object returned by the invoking with **sign in/tokenExchange**.
  
1. The parsed token in the bot application provides the required information, such as the user's email address.
  
## Develop an SSO Teams bot
  
The following steps guide you to develop SSO Teams bot:

1. [Register your app through the Azure AD portal](#register-your-app-through-the-azure-ad-portal).
1. [Update your Teams application manifest for your bot](#update-your-teams-application-manifest-for-your-bot).
1. [Add the code to request and receive a bot token](#add-the-code-to-request-and-receive-a-bot-token).

### Register your app through the Azure AD portal

The steps to register your app through the Azure AD portal are similar to the [tab SSO flow](../../../tabs/how-to/authentication/tab-sso-overview.md). The following steps guide you to register your app:

1. Register a new application in the [Azure Active Directory – App Registrations](https://go.microsoft.com/fwlink/?linkid=2083908) portal.

1. Select **New Registration**. The **Register an application** page appears.

    ![New registration](~/assets/images/authentication/SSO-bots-auth/app-registration.png)

1. In the **Register an application**, do the following steps:

   > [!NOTE]
   >
   > The users are not asked for consent and are granted access tokens right away, if the Azure AD app is registered in the same tenant where they are making an authentication request in Teams. However, the users must provide consent to the permissions, if the Azure AD app is registered in a different tenant.

    * Enter **Name** for your app.
    * Select **Supported account types**, such as single tenant or multitenant.
    * Select **Register**.

    ![Register an application](~/assets/images/authentication/SSO-bots-auth/register-application.png)

1. Go to overview page.
1. Copy the value of **Application (client) ID**.
1. Under **Manage**, go to **Expose an API**

   > [!TIP]
   > To update your app manifest later, save the **Application (client) ID** value.

   > [!IMPORTANT]
   >
   > * If you are building a standalone bot, enter the Application ID URI as `api://botid-{YourBotId}`. Here *YourBotId* is your Azure AD application ID.
   > * If you are building an app with a bot and a tab, enter the Application ID URI as `api://fully-qualified-domain-name.com/botid-{YourBotId}`.

1. Select **Add a scope**.
1. In the panel that prompts, enter `access_as_user` as the **Scope name**.

   >[!NOTE]
   > The "access_as_user" scope used to add a client app is for "Administrators and users".
   >
   > You must be aware of the following important restrictions:
   >
   > * Only user-level Microsoft Graph API permissions, such as email, profile, offline_access, and OpenId are supported. If you need access to other Microsoft Graph scopes, such as `User.Read` or `Mail.Read`, see [Extend tab app with Microsoft Graph permissions and scope](../../../tabs/how-to/authentication/tab-sso-graph-api.md).
   > * Your application's domain name must be same as the domain name that you have registered for your Azure AD application.
   > * Multiple domains per app are currently not supported.
   > * Applications that use the `azurewebsites.net` domain are not supported because it is common and may be a security risk.

1. In the **Who can consent?**, enter **Admins and users**.
1. Enter the following details to configure the admin and user consent prompts with values that are appropriate for the `access_as_user`scope.
    * **Admin consent display name**: Teams can access the user’s profile.
    * **Admin consent description**: Teams can call the app’s web APIs as the current user.
    * **User consent display name**: Teams can access your profile and make requests on your behalf.
    * **User consent description**: Teams can call this app’s APIs with the same rights as you have.

    ![admin and users](~/assets/images/authentication/SSO-bots-auth/add-a-scope.png)

1. Ensure that the state is set to **Enabled**.

    ![State](~/assets/images/authentication/SSO-bots-auth/enabled-state.png)

1. Select **Add scope** to save the details. The domain part of the **Scope name** displayed must automatically match the **Application ID** URI set in the previous step, with `/access_as_user` appended to the end `api://subdomain.example.com/00000000-0000-0000-0000-000000000000/access_as_user`.

1. In the **Authorized client applications**, identify the applications that you want to authorize for your app’s web application.
1. Select **Add a client application**.

    ![client application](~/assets/images/authentication/SSO-bots-auth/add-client-application.png)

1. Enter each of the following client IDs and select the authorized scope you created in the previous step:
    * `1fec8e78-bce4-4aaf-ab1b-5451cc387264` for Teams mobile or desktop application.
    * `5e3ce6c0-2b1f-4285-8d4b-75ee78787346` for Teams web application.

    ![client id](~/assets/images/authentication/SSO-bots-auth/add-client-id.png)

1. Go to **Authentication**.
1. In **Platform configurations**, select **Add a platform**.

    ![platform](~/assets/images/authentication/SSO-bots-auth/platform-configuration.png)

1. Select **Web**.

    ![Configure platform](~/assets/images/authentication/SSO-bots-auth/configure-platform.png)

1. Enter the **Redirect URIs** for your app.

   >[!NOTE]
   > This URI should be a fully qualified domain name. It's also followed by the API route where an authentication response is sent. If you're following any of the Teams samples, the URI is `https://token.botframework.com/.auth/web/redirect`. For more information, see [OAuth 2.0 authorization code flow](/azure/active-directory/develop/v2-oauth2-auth-code-flow).

    ![Redirect uris](~/assets/images/authentication/SSO-bots-auth/configure-web.png)

1. The following steps will help you to enable implicit grant:
    * Select **Authentication** from the left pane.
    * Select the **Access tokens** and **ID tokens** checkboxes.

    ![Grant flow](~/assets/images/authentication/SSO-bots-auth/grant-flow.png)

    * Select **Save** to save the changes.

1. Add necessary **API Permissions**.
    * Select **API permissions** from the left pane.
    * Select **Add a platform** to add any permissions that your app requires to downstream APIs, for example, User.Read.

#### Update manifest in Microsoft Azure portal

The following steps will guide you to update the bot manifest in Azure portal:

1. Select **Manifest** from the left pane.
1. Ensure the config item is set to **"accessTokenAcceptedVersion": 2**. If not, change it's value to **2**.

    ![Update manifest](~/assets/images/bots/update-manifest.png)

   >[!NOTE]
   > If you are already in testing your bot in Teams, you must sign out from this app and sign out from Teams. Then sign in again to see this change.

1. Select **Save**.

#### Update the Azure portal with the OAuth connection

The following steps will guide you to update the Azure portal with the OAuth connection:

1. In the Azure portal, go to [**AzureBot**](https://ms.portal.azure.com/#create/Microsoft.AzureBot)
1. Go to **Configuration** on the left pane.
1. Select **Add OAuth Connection Settings**.

    ![Configuration setting](~/assets/images/authentication/SSO-bots-auth/auth-setting2.png)

1. The following steps will guide you to complete the **New Connection Setting** form:

   >[!NOTE]
   > **Implicit grant** may be required in the Azure AD application.

    * Enter **Name** in the **New Connection Setting** page.

    >[!NOTE]
    > The **Name** is referred to the settings of your bot service code in *step 5* of [Bot SSO at runtime](#bot-sso-at-runtime).

    * From the **Service Provider** drop-down, select **Azure Active Directory v2**.
    * Enter the client credentials, such as **Client Id** and **Client secret** for the Azure AD application.
    * For the **Token Exchange URL**, use the scope value defined in [Update your Teams application manifest for your bot](#update-your-teams-application-manifest-for-your-bot) for example, `api://botid-<your-app-id>/`. The Token Exchange URL indicates to the SDK that this Azure AD application is configured for SSO.
    * In the **Tenant ID**, enter *common*.
    * Add all the **Scopes** configured when specifying permissions to downstream APIs for your Azure AD application. With the Client ID and Client secret provided, the token store exchanges the token for a graph token with defined permissions.
    * Select **Save**.
    * Select **Apply**.

    ![Connection setting](~/assets/images/authentication/Bot-connection-setting.png)

### Update your Teams application manifest for your bot

If the application contains a standalone bot, then use the following code to add new properties to the Teams application manifest:

```json
    "webApplicationInfo": 
        {
            "id": "00000000-0000-0000-0000-000000000000",
            "resource": "api://botid-00000000-0000-0000-0000-000000000000"
        }
```

If the application contains a bot and a tab, then use the following code to add new properties to the Teams application manifest:

```json
    "webApplicationInfo": 
        {
            "id": "00000000-0000-0000-0000-000000000000",
            "resource": "api://subdomain.example.com/botid-00000000-0000-0000-0000-000000000000"
        }
```

**webApplicationInfo** is the parent of the following elements:

* **id** - The client ID of the application. It's the application ID that you obtained as part of registering the application with Azure AD. Don't share this Application ID with multiple Teams apps. Create a new Azure AD app for each application manifest that uses `webApplicationInfo`.
* **resource** - The domain and subdomain of your application. It's the same URI, including the `api://` protocol that you registered when creating your `scope` in [Register your app through the Azure AD portal](#register-your-app-through-the-azure-ad-portal). Don't include the `access_as_user` path in your resource. The domain part of this URI must match the domain and subdomains used in the URLs of your Teams application manifest.

### Add the code to request and receive a bot token

#### Request a bot token

The request to get the token is a normal POST message request using the existing message schema. It's included in the attachments of an OAuthCard. The schema for the OAuthCard class is defined in [Microsoft Bot Schema 4.0](/dotnet/api/microsoft.bot.schema.oauthcard?view=botbuilder-dotnet-stable&preserve-view=true) and it's similar to a sign in card. Teams treats this request as a silent token acquisition if the `TokenExchangeResource` property is populated on the card. For the Teams channel, only the `Id` property, which uniquely identifies a token request, is honored.

>[!NOTE]
> The Microsoft Bot Framework `OAuthPrompt` or the `MultiProviderAuthDialog` is supported for SSO authentication.

If the user is using the application for the first time and user consent is required, the following dialog box appears to continue with the consent experience:

![Consent dialog box](~/assets/images/authentication/SSO-bots-auth/bot-consent-box.png)

When the user selects **Continue**, the following events occur:

* If the bot defines a sign in button, the sign in flow for bots is activated that is similar to the sign in flow from an OAuth card button in a message stream. The developer must decide which permissions require user's consent. This approach is recommended if you require a token with permissions beyond `openId`. For example, if you want to exchange the token for graph resources.

* If the bot isn't providing a sign in button on the OAuth card, user consent is required for a minimal set of permissions. This token is useful for basic authentication and to get the user's email address.

##### C# token request without a sign in button

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

The response with the token is sent through an invoke activity with the same schema as other invoke activities that the bots receive today. The only difference is the invoke name,
**sign in/tokenExchange**, and the **value** field. The **value** field contains the **Id**, a string of the initial request to get the token and the **token** field, a string value including the token.

>[!NOTE]
> You might receive multiple responses for a given request if the user has multiple active endpoints. You must deduplicate the responses with the token.

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

The `turnContext.activity.value` is of type [TokenExchangeInvokeRequest](/dotnet/api/microsoft.bot.schema.tokenexchangeinvokerequest?view=botbuilder-dotnet-stable&preserve-view=true) and contains the token that can be further used by your bot. You must store the tokens for performance reasons and refresh them.

### Token exchange failure

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

### Update the auth sample

Open [Teams auth sample](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/46.teams-auth) and then complete the following steps to update it:

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
  
2. Update `appsettings.json` to include the `botId`, password, and the connection name defined in [Update the Azure portal with the OAuth connection](#update-the-azure-portal-with-the-oauth-connection).
3. Update the manifest and ensure that `token.botframework.com` is in the valid domains list. For more information, see [Teams auth sample](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/46.teams-auth).
4. Zip the manifest with the profile images and install it in Teams.

## Code sample

|**Sample name** | **Description** |**.NET** |**C#** |**Node.js** |
|----------------|-----------------|--------------|--------------|--------------|
|Bot framework SDK | This sample code demonstrates how to get started with authentication in a bot for Microsoft Teams. |[View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/csharp_dotnetcore/46.teams-auth)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation-sso-quickstart/csharp_dotnetcore/BotConversationSsoQuickstart)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation-sso-quickstart/js)|

## Step-by-step guide

Follow the [step-by-step guide](../../../sbs-bots-with-sso.yml), to build a bot with SSO authentication.
