---
title: Overview to authentication using SSO in Teams with Azure AD
description: Learn about Single sign-on (SSO) authentication in Teams and how to enable it in bots and message extension.
ms.topic: conceptual
ms.localizationpriority: high
---
# Enable SSO for your app

With SSO in Teams, app users have the advantage of using Teams to access bot or message extension apps. After logging into Teams using Microsoft or Microsoft 365 account, app users can use your app without needing to sign in again. Your app is available to app users on any device with access granted through Azure AD.

Here's what you'll learn in this section:

1. **SSO user experience**: Teams offers your app users a true SSO experience. App users can use your app without signing in again.
2. **SSO in Teams at runtime**: Your bot app interacts with Azure AD at runtime for one-time authentication and authorization for your app users.

This section covers SSO configuration required for bot and messaging extension apps.

## SSO user experience in Teams

App users sign in to Teams using either personal Microsoft account or Microsoft 365 account. You can take advantage of this, and use SSO to authenticate and authorize the app users. Azure AD provides app users access to your bot or message extension app. It's based on the app user's Teams identity. The app user who has signed into Teams can be given access to your app.

- Teams authenticates and stores the identity of its app user.
- Your bot uses the stored identity of the app user who is already validated by Teams.
- The app user needs to give consent to Teams for using the identity to access for using your bot.
- The app user can access the app on web, desktop, or mobile client.

> [!NOTE]
> App users can't give permission to some permission scopes, such as `Sites.ReadWrite.All`, which allows the app user to read and write to all SharePoint and OneDrive assets in the tenant. For such scopes, only the tenant administrator than grant consent on an app user's behalf.

Now, let's see what happens at the backend during runtime to achieve SSO experience within Teams.

## SSO in Teams at runtime

Achieve SSO in a bot or message extension app by obtaining access token for the Teams app user who's currently logged in. This process involves the bot app client and server, Teams client, and Azure AD. During this interaction, the app user must give consent for using Teams identity to obtain the access token in a multi-tenant environment.

The following image shows how SSO works when a Teams app user attempts to access the bot or message extension app:

:::image type="content" source="../../../assets/images/authentication/teams-sso-bots/sso-runtime-seqd-bots.png" alt-text="Bots at runtime" lightbox="../../../assets/images/authentication/teams-sso-bots/sso-runtime-seqd-bots.png":::

| # | Interaction | What's going on |
| --- | --- | --- |
| 1 | Teams Client → Bot service | The message that app user sends is received by the Teams client, which sends it to the bot. <br> If the app user has previously signed in, a token is saved in the Bot Framework Token Store. <br> • The bot calls the Bot Framework Token Service which checks for an existing token for the app user in the token store. If it exists, the app user is given access. <br> • If no token is available, the bot triggers the auth flow. |
| 2 | Bot service → Bot Framework Token Service | The bot calls the Bot Framework Token Service to obtain a sign in link for the user. |
| 3 | Bot Framework Token Service → Teams client | Bot Framework Token Service sends the request for sign-in link to the bot service, which forwards it to the Teams Client in an OAuth card. |
| 4 | Teams client → Bot service → Bot Framework Token Service → Azure AD | After the Teams client receives the OAuth card for the app user, if SSO is enabled, it sends a token exchange request for the app user back to the bot. The bot calls the token service, attempting to exchange the received token from Azure AD. |
| 5 | Azure AD → Teams Client | For the app user who's using the bot service for the first time, the token exchange can occur only after app user gives their consent. Teams Client displays a message to the app user for giving consent. <br> 1. The authentication falls back to the sign-in prompt and the app user must sign in to use the bot app. The sign-in button pops up in Teams Client, and when app user selects it, the Azure AD sign-in page is rendered. <br> 2. The app user signs in and grants access to the bot service. |
| 6 | Bot service -> Bot Framework Token Service | The token for the app user is stored in the token store. |

> [!NOTE]
> In Step 5, if the app user hasn't previously consented, the exchange will fail and the bot sends back a failure notice. In this case, the Teams client displays a message to the app user for giving consent.

For a bot or a message extension app, the bot app sends an OAuth Card to Teams Client. This card is used to get access token from Azure AD using `tokenExchangeResource`. A bot or message extension app can have more than one active endpoint. The first time app user would receive consent request for all active endpoints. Following app user's consent, Teams Client sends the token received from Azure AD to the bot app using `tokenExchange`. The bot app can then parse the token to retrieve the app user's information, such as email address.

## Enable SSO for a Teams app

The bot and message extension apps use Bot Framework to handle communication with the app users.

**Bot app**: Also referred to as a chatbot or conversational bot, it's service that runs simple and repetitive tasks for app users. Bots can be part of a larger application or be a standalone service.
**Message extension app**: It's a web service you host that can be invoked from within Teams client. It utilizes the messaging schema of a bot to ensure secure communication. You'll need to register your web service as a bot to enable SSO for your message extension app.

This section describes the tasks involved in implementing SSO for a Teams bot or message extension app. To enable SSO for a Teams bot or message extension app:

1. **Configure app with Azure AD**: Create an Azure AD app to generate an app ID and application ID URI. For generating access token, you configure scopes and authorize trusted client applications. The configuration required in Azure AD for enabling SSO in a bot and message extension apps are the same.
1. **Add code**: Add the code to handle access token, sending this token to your app's server code in the Authorization header, and validating the access token when it's received. The code required to enable SSO in a bot app is different from a message extension app. This section allows you to select the app for which you want to add code for enabling SSO.
1. **Update Teams app manifest**: Update your Teams Client app manifest with the app ID and application ID URI generated on Azure AD to allow Teams to request access tokens on behalf of your app. The update required in the manifest file is same for bot and message extension apps.

## Next step

> [!div class="nextstepaction"]
> [Enable SSO for your app in Azure AD](bot-sso-register-aad.md)
