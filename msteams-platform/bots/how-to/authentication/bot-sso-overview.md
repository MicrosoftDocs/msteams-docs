---
title: Overview to authentication using SSO in Teams with Azure AD
description: Learn about Single sign-on (SSO) authentication in Teams and how to enable it in bots and message extension.
ms.topic: conceptual
ms.localizationpriority: high
keywords: teams authentication bots message extension Microsoft Azure Active Directory (Azure AD) SSO access token app manifest 
---
# Enable SSO for bot app

<!--Single sign-on (SSO) allows a user to access an application or a web service after signing-in only once. The app users never have to go through authentication again.-->

With SSO in Teams, app users have the advantage of using Teams to access apps. After logging into Teams using Microsoft or Microsoft 365 account, app users can use your app without needing to sign in again. Your app is available to app users on any device with access granted through Azure AD.

Here's what you'll learn in this section:

1. **SSO user experience**: Teams offers your app users a true SSO experience. App users can use your app without signing in again.
2. **SSO in Teams at runtime**: Your bot app interacts with Azure AD at runtime for one-time authentication and authorization for your app users.
3. **Enable SSO for your bot app**: Implement the tasks involved to implement SSO in your bot app.

## SSO user experience in Teams

App users sign in to Teams using either personal Microsoft account or Microsoft 365 account. You can take advantage of this, and use SSO to authenticate and authorize the app users. Azure AD provides app users access to your bot app. It's based on the app user's Teams identity. The app user who has signed into Teams can be given access to your bot app.

- Teams authenticates and stores the identity of its app user.
- Your bot uses the stored identity of the app user who is already validated by Teams.
- The app user needs to give consent to Teams for using the identity to access for using your bot.
- The app user can access the app on web, desktop, or mobile client.

### Enhance user experience with SSO

Here's what your app users get with SSO experience:

- Teams gets the access token for the current app user from Azure AD. This interaction with Azure AD is invisible to the app user. It translates to getting app access without having to leave Teams environment.
- An app user needs to consent only in a multi-tenant environment. If the app user and the app reside in the same tenant, the app user doesn't need to give consent for using the app.
- After consenting to Teams the first time, the app user can use your app with no further need of consent, even on any other device. For this reason, it offers a better user experience.
  - Alternatively, the tenant administrator can grant consent on behalf of the app users. In this scenario, when the tenant administrator consents for app users in the tenant, the app users don't need to be prompted for consent at all. This means that the app users don't see the consent dialogs, and can access the app seamlessly.
- The access token is pre-fetched by Teams to improve performance and load time of the app in Teams environment.
- App users don't need to memorize or record several passwords to access and use apps in Teams environment.

> [!NOTE]
> App users can't give permission to some permission scopes, such as `Sites.ReadWrite.All`, which allows the app user to read and write to all SharePoint and OneDrive assets in the tenant. For such scopes, only the tenant administrator than grant consent on an app user's behalf.

Now, let's see what happens at the backend during runtime to achieve SSO experience within Teams.

## SSO in Teams at runtime

Achieve SSO in a bot app by obtaining access token for the Teams app user who's currently logged in. This process involves the bot app client and server, Teams client, and Azure AD. During this interaction, the app user must give consent for using Teams identity to obtain the access token in a multi-tenant environment.

The following image shows how SSO works when a Teams app user attempts to access the bot app:

:::image type="content" source="../../../assets/images/authentication/teams-sso-bots/sso-runtime-seqd-bots.png" alt-text="Bots at runtime" lightbox="../../../assets/images/authentication/teams-sso-bots/sso-runtime-seqd-bots.png":::

| # | Interaction | What's going on |
| --- | --- | --- |
| 1 | App user → Teams Client |  |
| 2 | Teams Client → Bot service |  |
| 3 | Bot service → Bot Framework token service |  |
| 4 |   |  |
| 5 |   |  |
| 6 |   |  |

<!--
Points from SME response:

1. The message that app user sends is received by the Teams service, which sends it to the bot.

    1. If the app user has previously signed in, a token is saved in the Bot Framework token store.
    2. The bot calls the Bot Framework token service which checks for an existing token for the app user in the token store. If it exists, the app user is given access.
    3. If no token is available, the bot triggers the auth flow.

2. The bot calls the Bot Framework token service to obtain a sign in link for the user, and send it to Teams service which forwards it to the client.

3. After the Teams client receives the OAuth card for the app user, if Single Sign On is enabled, it sends a token exchange request for the app user back to the Teams service which sends it to the bot.

4. The bot calls the token service, attempting to exchange the received token. If the user has not previously consented, the exchange will fail and the bot sends back a failure notice. In this case, the Teams client displays a message to the app user for giving consent.
    1. In case the consent is required, the authentication falls back to the sign-in prompt and the app user must sign in to use the bot app. The Sign in button pops up in Teams, and then AAD Sign in page is rendered when clicked.
    2. The app user signs in and grants access to the bot.

The token for the app user is stored in the token store.-->

<!--
Message to Teams client > Teams client to Teams bot service > Bot > Token store > If not found at token store -> check Cache for valid token > If token isn't in cache (or expired) -> Bot sends OAuth card to Token store to get sign in url for OAuth card for the app user > Teams client gets OAuth card and sends it for Token exchange request > Bot seeks consent to exchange token > if consent fails -> Teams client shows the sign-in prompt -> Teams client/Bot saves the token in Token store-->

<!--Flow for authentication app user being authenticated for the first time:
1. An app user attempts to access the bot app by sending a message to the Teams client.
    1. The message that app user sends is received by Teams client, which sends it to the bot service.
    1. If the app user's consent isn't needed, the bot service receives a token, and then it's sent to the Bot Framework token service.
    1. If the app user has used the bot service earlier, the token is saved in the Bot Framework token service.
    1. The Bot Framework token checks for existing token for the app user. If it exists, the app user is given access. If not, it checks the token cache for a valid token. If a valid token exists (that hasn't expired), the app user is given access.
    1. If the app user doesn't have a token, it triggers the auth flow.

1. The bot service accesses the Bot Framework token store to obtain an OAuth card for the user, and send it to Teams client.
1. After the Teams client received an OAuth card for the app user, it sends a token exchange request for the app user.
1. The app user must consent for token. In this case, the Teams client displays a message to the app user for giving consent.
    1. In case the consent is unsuccessful, the authentication falls back to the sign-in prompt and the app user must sign in to use the bot app.
    1. The Sign in button pops up in Teams, and then AAD Sign in page is rendered.
    1. The app user signs in and granted access to the bot from Azure AD.
1. The token for the app user is stored in the token store.

Flow for authenticating app user at subsequent bot access:

1. An app user attempts to access the Teams bot app by sending a message to the bot service.
    1. The message that app user sends is received by Teams client, which sends it to the bot service.
    1. If the app user has used the bot service earlier, the token is saved in the Bot Framework token service.
    1. Check for existing valid token for the app user: The Bot Framework token checks for existing token for the app user. If it exists, the app user is given access. If not, it checks the token cache for a valid token. If a token exists that hasn't expired, the app user is given access.
 1. If the token has expired, the authentication falls back to the sign-in prompt and the app user must sign in to use the bot app.
    1. The Sign in button pops up in Teams.
    1. The Sign in page is rendered.
    1. The app user signs in and granted access to the bot from Azure AD.

Notes:
 
1. The authentication flow isn't completely same as for tabs. If the developer wants to use the Teams identity to seek consent, they would need to implement authentication without using Bot Framework token store.
    1. It follows that there would initially be two ways to implement authentication: using token store, or not using it.

1. If the app scope defines a set of permissions and then changes the permissions (or the number of permissions), the existing token would be matched for the permissions as per the scope. If the permissions don't match, the app user would need to consent again (as they had to do the first time they used to bot app).-->


For a bot or a message extension app, the bot app sends an OAuth Card to Teams Client. This card is used to get access token from Azure AD using `tokenExchangeResource`. A bot or message extension app can have more than one active endpoint. The first time app user would receive consent request for all active endpoints. Following app user's consent, Teams Client sends the token received from Azure AD to the bot app using `tokenExchange`. The bot app can then parse the token to retrieve the app user's information, such as email address.
