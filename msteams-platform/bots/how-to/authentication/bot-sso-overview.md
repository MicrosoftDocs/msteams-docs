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
2. **SSO in Teams at runtime**: Your tab app interacts with Azure AD at runtime for one-time authentication and authorization for your app users.
3. **Enable SSO for your tab app**: Implement the tasks involved to implement SSO in your tab app.

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

Achieve SSO in a tab app by obtaining access token for the Teams app user who's currently logged in. This process involves the tab app client and server, Teams client, and Azure AD. During this interaction, the app user must give consent for using Teams identity to obtain the access token in a multi-tenant environment.

The following image shows how SSO works when a Teams app user attempts to access the tab app:

:::image type="content" source="../../../assets/images/authentication/teams-sso-bots/sso-runtime-seqd-bots.png" alt-text="Bots at runtime":::

| # | Interaction | What's going on |
| --- | --- | --- |
| 1 | Bot service → Teams Client | The SSO flow for a Teams bot app is triggered when an app user sends a message (or an activity) to the bot service. The app user uses the Teams client to send a message to the bot service. On receiving the message, the bot sends a oAuth Card to Teams client with a request for a token. |
| 2 | Teams Client → Azure AD | The Teams client receives the OAuth card and the token exchange request from the bot service. It sends this OAuth Card to Azure AD requesting for an access token. |
| 3 | Azure AD → Consent dialog |  |
| 4 | Bot service → Bot Framework Token service |  |
| 5 | Bot Framework Token service → Azure AD |  |
| 6 | Bot Framework Token service → Bot service |  |

For a bot or a message extension app, the bot app sends an OAuth Card to Teams Client. This card is used to get access token from Azure AD using `tokenExchangeResource`. A bot or message extension app can have more than one active endpoint. The first time app user would receive consent request for all active endpoints. Following app user's consent, Teams Client sends the token received from Azure AD to the bot app using `tokenExchange`. The bot app can then parse the token to retrieve the app user's information, such as email address.
