---
title: Overview to authentication for tabs using SSO in Teams with Azure AD
description: Learn about Single sign-on (SSO) authentication in Teams and how to enable it in tabs.
ms.topic: conceptual
ms.localizationpriority: high
---
# Enable SSO for tab app

With single sign-on (SSO) in Teams, app users have the advantage of using Teams to access tab apps. After logging in to Teams using Microsoft or Microsoft 365 account, app users can use your app without the need to sign in again. Your app is available to app users on any device with the access granted through Azure Active Directory (Azure AD).

Here's what you'll learn in this section:

1. **SSO user experience**: Teams offers your app users a true SSO experience. The app users can use your app without signing in again.
2. **SSO in Teams at runtime**: Your tab app interacts with Azure AD at runtime for one-time authentication and authorization for your app users.
3. **Enable SSO for your tab app**: Implement the tasks involved to enable SSO in your tab app.

## SSO user experience in Teams

The app users sign in to Teams using either personal Microsoft account or Microsoft 365 account. You can take advantage of this account and use SSO to authenticate and authorize the app users.

:::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/teams-sso-ux.png" alt-text="Screenshot shows the SSO user experience in a teams tab app.":::

- Teams authenticates and stores the identity of its app user.
- Your tab app uses the stored identity of the app user who is already validated by Teams.
- The app user needs to give consent to Teams for using the identity to access your tab app.
- The app user can access the app on web, desktop, or mobile client.

You can view here an example of user experience with SSO in a tab app:

:::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/sso-tab.gif" alt-text="Graphical representation shows the user experience of SSO in tab app.":::

### Enhance user experience with SSO

Here's what your app users get with SSO experience:

- Teams gets the access token for the current app user from Azure AD. This interaction with Azure AD is invisible to the app user. It translates to get the app access without having to leave the Teams environment.
- An app user needs to consent only in a multi-tenant environment. If the app user and the app reside in the same tenant, the app user doesn't need to give consent for using the app.
- After consenting to Teams the first time, the app user can use your app with no further need of consent, even on any other device. For this reason, it offers a better user experience.
  - Alternatively, the tenant administrator can grant consent on behalf of the app users. In this scenario, when the tenant administrator consents for the app users in the tenant, the app users don't need to be prompted for consent at all. It means that the app users don't see the consent dialogs and can access the app seamlessly.
- The access token is pre-fetched by Teams to improve performance and load time of the app in the Teams environment.
- The app users don't need to memorize or record several passwords to access and use apps in Teams environment.

Now, let's see what happens at the backend during runtime to achieve SSO experience within Teams.

## SSO in Teams at runtime

Achieve SSO in a tab app by obtaining access token for the Teams app user who's currently logged in. This process involves the tab app client and server, Teams client, and Azure AD. During this interaction, the app user must give consent for using Teams identity to obtain the access token in a multi-tenant environment.

The following image shows how SSO works when a Teams app user attempts to access the tab app:

:::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/sso-runtime-seqd.png" alt-text="Screenshot shows the tab SSO process flow and how it works." lightbox="../../../assets/images/authentication/teams-sso-tabs/sso-runtime-seqd.png":::

| # | Interaction | What's going on |
| --- | --- | --- |
| 1 | Tab app → Teams Client | The tab app makes a JavaScript call to `getAuthToken()`, which tells Teams to obtain an access token. |
| 2 | Teams Client → Azure AD | Teams requests Azure AD endpoint for the access token for the current app user based on Teams identity. |
| 3 | Azure AD → Consent form | If the current app user is using your tab app for the first time, Teams displays request prompt to consent, if the app needs to access some protected data. The app user (or the administrator) must give consent to Teams for using the app user's Teams identity to obtain access token from Azure AD. <br> Alternately, there's a request prompt to handle step-up authentication such as two-factor authentication. |
| 4 | Azure AD → Teams Client | Azure AD sends the access token to the Teams Client. The token is a JSON Web Token (JWT), and its validation works just like token validation in most standard OAuth flows. Teams caches the token on your behalf so that future calls to `getAuthToken()` return the cached token. |
| 5 | Teams Client → Tab app client | Teams sends the access token to the tab app as part of the result object returned by the `getAuthToken()` call. |
| 6 | Tab app (between client and server) | The tab app parses the access token using JavaScript to extract required information, such as the app user's email address. The token returned to the tab app is both an access token and an identity token. |

For more information, see [Add code to enable SSO in a tab app](tab-sso-code.md) and [Add code to enable SSO in your bot app](../../../bots/how-to/authentication/bot-sso-code.md).

> [!IMPORTANT]
>
> - The `getAuthToken()` is valid only for consenting to a limited set of user-level APIs, such as email, profile, offline_access, and OpenId. It isn't used for other Graph scopes such as `User.Read` or `Mail.Read`. For suggested workarounds, see [Extend your app with Microsoft Graph permissions](tab-sso-graph-api.md).
> - The `getAuthToken` fails for anonymous users as they aren't Azure AD accounts.

Tabs are Teams-aware web pages. To enable SSO in a webpage hosted inside a tab app, add [Teams Javascript client library](/javascript/api/overview/msteams-client?) and call `microsoftTeams.initialize()`. After initialization, call `microsoftTeams.getAuthToken()` to get the access token for your app.

### Use cases for enabling SSO

You can enable SSO in Teams for all apps that support Azure AD as an identity provider. In addition to using SSO for authenticating app users in a tab app, you can also use it to enable seamless access across Teams.

Some scenarios where you can use the SSO API to authenticate your app users are:

- If you want to authenticate your app users within a Teams tab app, the SSO API allows app users to use your app in Teams with no additional authentication needed. Based on the app user's Teams identity, you can obtain access token for them from Azure AD.
- If your app uses dialog from within a bot, a tab, a message extension, or Adaptive Cards, then you can use the SSO API to authenticate your app users.
- You can also use the SSO API for authenticating your app users who want to access to Stage view without need to be validated again.

> [!TIP]
> You can also use the SSO API to authenticate app users in [dialogs](../../../task-modules-and-cards/what-are-task-modules.md) that embed web content.

To achieve SSO at runtime, configure your app to enable SSO for authenticating and authorizing app users.

## Enable SSO for a Teams tab app

This section describes the tasks involved in implementing SSO for a Teams app. These tasks are language- and framework-agnostic.

To enable SSO for a Teams tab app:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/enable-sso.png" alt-text="Screenshot shows the steps to enable SSO for tab." lightbox="../../../assets/images/authentication/teams-sso-tabs/enable-sso.png":::

1. **Configure app with Azure AD**: Create an Azure AD app to generate an app ID and application ID URI. For generating access token, configure scopes and authorize trusted client applications.
2. **Add code**: Add the code to handle access token, send this token to your app's server code in the Authorization header, and validate the access token when it's received.
3. **Update Teams app manifest**: Update your Teams client app manifest with the app ID and application ID URI generated on Azure AD to allow Teams to request access tokens on behalf of your app.

## Third-party cookies on iOS

After the iOS 14 update, Apple has blocked the [third-party cookie](https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/) access for all apps by default. Therefore, the apps that leverage third-party cookies for authentication in their Channel or Chat tabs and Personal apps won't be able to complete their authentication workflows on Teams iOS clients. To conform with Privacy and Security requirements, you must move to a token-based system or use first-party cookies for the user authentication workflows.

### Teams mobile client support

For Teams mobile, client versions that support SSO are:

- Teams for Android (1416/1.0.0.2020073101 and later)
- Teams for iOS (version: 2.0.18 and later)  
- Teams JavaScript library (version: 1.11 and later) for SSO to work in meeting side panel

For the best experience with Teams, use the latest version of iOS and Android.

## Step-by-step guides

Use the following step-by-step guides for enabling SSO for Teams app:

- [AAD SSO for tabs and message extension](../../../sbs-tabs-and-messaging-extensions-with-sso.yml)
- [Build a bot with SSO authentication](../../../sbs-bots-with-sso.yml)

## Best practices

Here's a list of best practices:

- **Call access token only when you need it**: Call `getAuthToken()` only when you need an access token. You can call it when an app user accesses your tab app, or for using a particular function that requires app user validation.
- **Don't store access token on client-side code**: Don’t cache or store the access token in your app's client-side code. Teams client caches the access token (or request a new one if it expires). This ensures that there's no accidental leak of your token from your web app.
- **Use server-side code for Microsoft Graph calls**: Always use the server-side code to make Microsoft Graph calls, or other calls that require passing an access token. Never return the OBO token to the client to enable the client to make direct calls to Microsoft Graph. This helps protect the token from being intercepted or leaked. For more information, see [Extend tab app with Microsoft Graph permissions and scope](tab-sso-graph-api.md).

## Known limitations

- Currently, SSO in Teams supports only OAuth 2.0 token. It doesn't support SAML token.
- Multiple domains per app aren't supported. For more information, see [LOB apps](tab-sso-register-aad.md#before-you-configure-your-app).

## Next step

> [!div class="nextstepaction"]
> [Register your tab application in Azure AD](tab-sso-register-aad.md)

## See also

- [Configure code to enable SSO in a tab app](tab-sso-code.md)
- [Glossary](../../../get-started/glossary.md)
