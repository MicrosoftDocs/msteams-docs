---
title: Single sign-on support for bots 
description: Describes how to get a user token. Currently, a bot developer can use a sign in card or the azure bot service with the OAuth card support.
keywords: token, user token, SSO support for bots
---

# Single sign-on (SSO) support for bots

Silent authentication in Azure Active Directory (Azure AD) minimizes the number of times a user needs to enter their login credentials by silently refreshing the authentication token. If a user agrees to use your app, they will not have to consent again on another device and will be signed in automatically. The flow is very similar to the [Teams tab SSO support]( ../../../tabs/how-to/authentication/auth-aad-sso.md). The difference is the protocol for  how a bot requests tokens and receives the response.

OAuth 2.0 is an open standard for authentication and authorization used by Azure Active Directory (Azure AD) and many other identity providers. A basic understanding of OAuth 2.0 is a prerequisite for working with authentication in Teams.

## Bot SSO at runtime

![Bot SSO at runtime diagram](../../../assets/images/bots/bots-sso-diagram.png)

1. The bot sends a message with an OAuth card that contains the `tokenExchangeResource` property. It tells Teams to obtain an authentication token for the bot application. The user receives messages at all the active endpoints of the user.

> [!NOTE]
> ✔ A user can have more than one active endpoint at a time.  
> ✔ The bot token is received from every active endpoint of the user.

2. If this is the first time the current user has used your bot application, there will be a request prompt to consent (if consent is required) or to handle step-up authentication (such as two-factor authentication).

3. Microsoft Teams requests the bot application token from the Azure AD endpoint for the current user.

4. Azure AD sends the bot application token to the Teams application.

5. Microsoft Teams sends the token to the bot as part of the value object returned by the invoke activity with the name sign-in/tokenExchange.
  
6. The token will be parsed in the bot application to extract the needed information, such as the user's email address.
  
### Develop an SSO Microsoft Teams bot
  
The SSO support currently requires the app to be installed in personal scope. To develop an SSO Microsoft Teams bot, a developer needs to:

1. [Create a free Azure account](#create-an-azure-account)
2. [Update your Microsoft Teams app manifest](#update-your-app-manifest)
3. [Request/receive the bot token](#request-and-receive-a-bot-token)

#### Create an Azure account

This step is similar to the [tab SSO flow](../../../tabs/how-to/authentication/auth-aad-sso.md) flow. Please follow [Create the azure active directory application]( ../../../tabs/how-to/authentication/auth-aad-sso.md#1-create-your-azure-active-directory-azure-ad-application) to create the aad application. At step 5 in the instructions;

* If you are building a standalone bot, set the Application ID URI to `api://botid-{YourBotId}` .
* If you are building an app with a bot and a tab, set the Application ID URI to `api://fully-qualified-domain-name.com/botid-{YourBotId}`.

#### Update your app manifest

Please follow [Update your Microsoft Teams application manifest]( ../../../tabs/how-to/authentication/auth-aad-sso.md#2-update-your-microsoft-teams-application-manifest) for guidance.

#### Request and receive a bot token

To implement the bot SSO flow, you can use the bot framework OAuthPrompt or implement the flow without an OAuthPrompt. The below sections describe both approaches:

#### Requesting a bot token

The request to get the token is a normal post message request (using the existing message schema). It includes in the attachments of an OAuth card. The schema for the OAuthCard class is defined in [Microsoft Bot Schema 4.0](/dotnet/api/microsoft.bot.schema.oauthcard?view=botbuilder-dotnet-stable&preserve-view=true) and it is very similar to a sign-in card. Teams will treat this request as a silent token acquisition if the TokenExchangeResource property is populated on the card. For Teams channel we honor only the Id property, which uniquely identifies a token request.

If this is the first time the user is using your application and the user consent is required, the user will be shown a dialog to continue with the consent experience similar to the one below. When the user selects **Continue**, two different things occur depending on whether the bot is defined or not and a sign-in button on the OAuth card.

![Consent dialog box](../../../assets/images/bots/bots-consent-dialogbox.png)

If the bot defined a sign-in button, the sign-in flow for bots will be triggered similarly to the sign-in flow from a card button in a message stream. It is up to the developer to decide which permissions to ask for the user to consent. This approach is recommended if you need a token with permissions beyond openId, for example, if you want to exchange the token for some graph resources.

If the bot is not providing a sign-in button on the card, it triggers user consent for a minimal set of permissions. This token is useful for basic authentication and getting the user email address.

**C# token request without a sign-in button**:

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

#### Receiving the token

The response with the token is sent through an invoke activity with the same schema as others invoke activities the bots receive today. The only difference is the invoke name, **sign-in/tokenExchange** and the **value** field which will contain the **ID** (a string) of the initial request to get the token and the **token** field (a string value including the token). Please note that you might receive multiple responses for a given request if the user has multiple active endpoints. It is up to the bot developer to deduplicate the responses with the token.

**C# code to respond to handle the invoke activity**:

```csharp
protected override async Task<InvokeResponse> OnInvokeActivity
  (ITurnContext<IInvokeActivity> turnContext, CancellationToken cancellationToken)
        {
            try
            {
                if (turnContext.Activity.Name == SignInConstants.TokenExchangeOperationName && turnContext.Activity.ChannelId == Channels.Msteams)
                {
                    await OnTokenResponse(turnContext, cancellationToken);
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

The turnContext.activity.value is of type [TokenExchangeInvokeRequest](/dotnet/api/microsoft.bot.schema.tokenexchangeinvokerequest?view=botbuilder-dotnet-stable&preserve-view=true) and contains the token that can be further used by the developer. Store the tokens securely for performance reasons and refresh them.

#### Update the azure portal with the oauth connection

1. In the Azure Portal, navigate back to the **Bot Channels Registration**.

2. Switch to the **Settings** blade and choose **Add Setting** under the OAuth Connection Settings section.

![SSOBotHandle2 view](../../../assets/images/bots/bots-vuSSOBotHandle2-settings.png)

3. Complete the **Connection Setting** form:

> [!div class="checklist"]
>
> * Enter a name for your new Connection Setting. This will be the name that gets referenced inside the settings of your bot service code in **step 5**.
> * In the Service Provider dropdown, select **Azure Active Directory V2**.
>* Enter the client credentials for the AAD application.
>* For the Token Exchange URL, use the scope value defined in the previous step of your AAD application. The presence of the Token Exchange URL is indicating to the SDK that this AAD application is configured for SSO.
>* Specify "common" as the **Tenant ID**.
>* Add all the scopes configured when specifying permissions to downstream APIs for your AAD application. With the client id and client secret provided, token store will exchange the token for a graph token with defined permissions for you.
>* Select **Save**.

![VuSSOBotConnection setting view](../../../assets/images/bots/bots-vuSSOBotConnection-settings.png)

#### Update the auth sample

Start with the [teams auth sample](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/46.teams-auth).

1. Update the TeamsBot to include the following. To handle the deduping of the incoming request, see below:

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
  
2. Update the `appsettings.json` to include the `botId`, password, and the connection name defined above.
3. Update the manifest and ensure that `token.botframework.com` is in the valid domains section.
4. Zip the manifest with the profile images and install it in Teams.

#### Code samples

* [C# sample using the Bot Framework SDK](https://microsoft-my.sharepoint-df.com/:u:/p/vul/ETZQfeTViDlCv-frjgTIincB7dvk2HOnma1TLvcoeGGIxg?e=uPq62c)

* [C# sample using the Bot Framework SDK to deduplicate the token request](https://microsoft.sharepoint.com/:u:/t/ExtensibilityandFundamentals/Ea36rUGiN1BGt1RiLOb-mY8BGMF8NwPtronYGym0sCGOTw?e=4bB682)

* [C# sample not using the Bot Framework SDK token store](https://microsoft-my.sharepoint-df.com/:u:/p/tac/EceKDXrkMn5AuGbh6iGid8ABKEVQ6hkxArxK1y7-M8OVPw)

* [JavaScript sample](https://github.com/ydogandjiev/taskmeow).
