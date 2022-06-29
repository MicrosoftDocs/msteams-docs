---
title: Overview to authentication for tabs using SSO in Teams with Azure AD
description: Overview to SSO authentication in Teams and how to use it in tabs
ms.topic: conceptual
ms.localizationpriority: medium
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD) SSO access token app manifest 
---
# Enable SSO for tab app

<!--Single sign-on (SSO) allows a user to access an application or a web service after signing-in only once. The app users never have to go through authentication again.-->

With SSO in Teams, app users have the advantage of using Teams to access apps. After logging into Teams using Microsoft or Microsoft 365 account, app users can use your app without needing to sign in again. Your app is available to app users on any device with access granted through Azure AD.

Here's what you'll learn in this section:

1. **SSO user experience**: Teams offers your app users a true SSO experience. App users can use your app without signing in again.
2. **SSO in Teams at runtime**: Your tab app interacts with Azure AD at runtime for one-time authentication and authorization for your app users.
3. **Enable SSO for your tab app**: Implement the tasks involved to implement SSO in your tab app.

## SSO user experience in Teams

App users sign in to Teams using either personal Microsoft account or Microsoft 365 account. You can take advantage of this, and use SSO to authenticate and authorize the app users.

&nbsp;&nbsp;&nbsp;&nbsp; :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/teams-sso-ux.png" alt-text="SSO user experience in a Teams tab app" border="false":::

- Teams authenticates and stores the identity of its app user.
- Your tab app uses the stored identity of the app user who is already validated by Teams.
- The app user needs to give consent to Teams for using the identity to access for using your tab app.
- The app user can access the app on web, desktop, or mobile client.

You can view here an example of user experience with SSO in a tab app:

:::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/sso-tab.gif" alt-text="SSO in tab app":::

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

:::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/sso-runtime-seqd.png" alt-text="Tab single sign-on SSO diagram" border="false" lightbox="../../../assets/images/authentication/teams-sso-tabs/sso-runtime-seqd.png":::

| # | Interaction | What's going on |
| --- | --- | --- |
| 1 | Tab app → Teams Client | The tab app makes a JavaScript call to `getAuthToken()`, which tells Teams to obtain an access token. |
| 2 | Teams Client → Azure AD | Teams requests Azure AD endpoint for the access token for the current app user based on Teams identity. |
| 3 | Azure AD → Consent form | If the current app user is using your tab app for the first time, Teams displays request prompt to consent, if the app needs to access some protected data. The app user (or the administrator) must give consent to Teams for using the app user's Teams identity to obtain access token from Azure AD. <br> Alternately, there's a request prompt to handle step-up authentication such as two-factor authentication. |
| 4 | Azure AD → Teams Client | Azure AD sends the access token to the Teams Client. The token is a JSON Web Token (JWT), and it's validation works just like token validation in most standard OAuth flows. Teams caches the token on your behalf so that future calls to `getAuthToken()` return the cached token. |
| 5 | Teams Client → Tab app client | Teams sends the access token to the tab app as part of the result object returned by the `getAuthToken()` call. |
| 6 | Tab app (between client & server) | The tab app parses the access token using JavaScript to extract required information, such as the app user's email address. The token returned to the tab app is both an access token and an identity token. |

For more information, see [Update code to enable SSO](tab-sso-code.md).

> [!IMPORTANT]
> The `getAuthToken()` is valid only for consenting to a limited set of user-level APIs, such as email, profile, offline_access, and OpenId. It isn't used for other Graph scopes such as `User.Read` or `Mail.Read`. For suggested workarounds, see [Extend your app with Microsoft Graph permissions](tab-sso-graph-api.md).

Tabs are Teams-aware web pages. To enable SSO in a web-page hosted inside a tab app, add [Teams Javascript client SDK](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true), and call `microsoftTeams.initialize()`. After initialization, call `microsoftTeams.getAuthToken()` to get the access token for your app.

### Use cases for enabling SSO

You can enable SSO in Teams for all apps that support Azure AD as an identity provider. In addition to using SSO for authenticating app users in a tab app, you can also use it to enable seamless access across Teams.

Some scenarios where you can use the SSO API to authenticate your app users are:

- If you want to authenticate your app users within a Teams tab app, the SSO API allows app users to use your app in Teams with no additional authentication needed. Based on the app user's Teams identity, you can obtain access token for them from Azure AD.
- If your app uses task module from within a bot, a tab, a message extension, or Adaptive Cards, then you can use the SSO API to authenticate your app users.
- You can also use the SSO API for authenticating your app users who want to access to Stage view without need to be validated again.

> [!TIP]
> You can also use the SSO API to authenticate app users in [task modules](../../../task-modules-and-cards/what-are-task-modules.md) that embed web content.

To achieve SSO at runtime, configure your app to enable SSO for authenticating and authorizing app users.

## Enable SSO for a tab app

This section describes the tasks involved in implementing SSO for a tab app. These tasks are language- and framework-agnostic.

To enable SSO for a tab app:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/enable-sso.png" alt-text="Steps to enable SSO for tab" border="false" lightbox="../../../assets/images/authentication/teams-sso-tabs/enable-sso.png":::

1. **Register with Azure AD**: Create an Azure AD app to generate an app ID and application ID URI. For generating access token, you configure scopes and authorize trusted client applications.
2. **Update code**: Add the code to handle access token, calling `getAuthToken()` when an app user accesses your tab app, sending this token to your app's server code in the Authorization header, and validating the access token when it's received.
3. **Update Teams app manifest**: Update your Teams Client app manifest with the app ID and application ID URI generated on Azure AD to allow Teams to request access tokens on behalf of your app.

## Third-party cookies on iOS

After the iOS 14 update, Apple has blocked the [third-party cookie](https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/) access for all apps by default. Therefore, the apps that leverage third-party cookies for authentication in their Channel or Chat tabs and Personal apps won't be able to complete their authentication workflows on Teams iOS clients. To conform with Privacy and Security requirements, you must move to a token-based system or use first-party cookies for the user authentication workflows.

### Teams mobile client support

For Teams mobile, client versions that support SSO are:

- Teams for Android (1416/1.0.0.2020073101 and later)
- Teams for iOS (version: 2.0.18 and later)  
- Teams JavaScript SDK (version: 1.11 and later) for SSO to work in meeting side panel

For the best experience with Teams, use the latest version of iOS and Android.

## Best practices

Here's a list of best practices:

- **Call access token only when you need it**: Call `getAuthToken()` only when you need an access token. You can call it when an app user accesses your tab app, or for using a particular function that requires app user validation.
- **Don't store access token on client-side code**: Don’t cache or store the access token in your app's client-side code. Teams Client caches the access token (or request a new one if it expires). This ensures that there's no accidental leak of your token from your web app.
- **Use server-side code for Microsoft Graph calls**: Always use the server-side code to make Microsoft Graph calls, or other calls that require passing an access token. Never return the OBO token to the client to enable the client to make direct calls to Microsoft Graph. This helps protect the token from being intercepted or leaked. For more information, see [Extend tab app with Microsoft Graph permissions and scope](tab-sso-graph-api.md).

## Known limitations

- Currently, SSO in Teams supports only OAuth 2.0 token. It doesn't support SAML token.
- Multiple domains per app are not supported. For more information, see [LOB apps](tab-sso-register-aad.md#before-you-register-with-azure-ad).

## Next step

> [!div class="nextstepaction"]
> [Register your tab application in Azure AD](tab-sso-register-aad.md)

## See also

[Configure code to enable SSO in a tab app](tab-sso-code.md)

<!--
### Use cases for enabling SSO for tab app

Here are some use cases where enabling SSO is beneficial. Call `getAuthToken()` in these scenarios to use Teams identity for obtaining access token for your app users:

- To get an app user’s identity from Teams if you have an existing app that you want to be available within a tab app in Teams.

- To authenticate an app user by reusing the Team’s identity inside your tab app.

- To authenticate and get an app user’s Teams identity inside configurable tabs. The app users don't need to sign in again. It's applicable to some settings that need to be configured at a configuration stage.

- To obtain an access token inside a task module, when it's invoked from a tab app, a bot app, a messaging extension app, or adaptive cards.

- To authenticate an app user in Stage view.

- To authenticate users for [task modules](../../../task-modules-and-cards/what-are-task-modules.md) that embed web content.
-->

<!--
```mermaid
sequenceDiagram
    User->>Tab app: Opens Teams app
    Tab app->>Teams Client: 1. Call getAuthToken()
    Teams Client->>Sign-in and Consent: 2. Check if consent is required
    Sign-in and Consent->>Teams Client: Prompt for consent from new user
    Teams Client->>Azure AD: 3. Request access token from Azure AD
    Azure AD->>Teams Client: 4. Send access token to Teams Client
    Teams Client->>Tab app: 5. Respond to getAuthToken() with access token
    Tab app->>Tab app: 6. Parse access token to give access to user
```
-->

<!--
- Tenant admin consent: A simple way of [consenting on behalf of an organization as a tenant admin](/azure/active-directory/develop/v2-permissions-and-consent.md#requesting-consent-for-an-entire-tenant) is by getting [consent from admin](/azure/active-directory/manage-apps/grant-admin-consent).
  
    You can ask for consent using the Auth API. Another approach for getting Graph scopes is to present a consent dialog using our existing [third party OAuth provider authentication approach](~/tabs/how-to/authentication/auth-tab-aad.md#navigate-to-the-authorization-page-from-your-pop-up-page). This approach involves popping up an Azure AD consent dialog box.

  <details>
  <summary>To ask for additional consent using the Auth API, follow these steps:</summary>

    1. The token retrieved using `getAuthToken()` must be exchanged on the server-side using Azure AD [on-behalf-of flow (OBO)](/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow) to get access to those other Graph APIs. Ensure you use the v2 Graph endpoint for this exchange.
    2. If the exchange fails, Azure AD returns an invalid grant exception. It usually responds with one of the two error messages, `invalid_grant` or `interaction_required`.
    3. When the exchange fails, you must ask for consent. Use the user interface (UI) to ask the app user to grant other consent. This UI must include a button that triggers an Azure AD consent dialog using [Silent authentication](~/concepts/authentication/auth-silent-aad.md).
    4. When asking for more consent from Azure AD, you must include `prompt=consent` in your [query-string-parameter](~/tabs/how-to/authentication/auth-silent-aad.md#get-the-user-context) to Azure AD, otherwise Azure AD wouldn't ask for other scopes.

        - Instead of `?scope={scopes}`, use `?prompt=consent&scope={scopes}`
        - Ensure that `{scopes}` includes all the scopes you're prompting the user for, for example, `Mail.Read` or `User.Read`.
    5. After the app user has granted more permissions, retry the OBO flow to get access to these other APIs.

    </details>
-->
<!--
- If you want your existing app to be available within a Teams tab app, the SSO API allows your signed-in app users to use your app in Teams with no additional authentication needed. Based on the app user's Teams identity, you can obtain access token for them from Azure AD.
- If your app has configurable tabs, you can use `getAuthToken()` to allow app users into the tab app without signing in again. SSO is applicable to some settings that need to be configured at a configuration stage.
- Your app may have a bot, a tab, a message extension, or Adaptive Cards, and allows your app users to invoke task module from within a tab or a bot. The SSO API will authenticate your app users who attempt to access the task module. Teams can use the app user's Teams identity and obtain an access token from Azure AD.

- You can also use the SSO API for authenticating your app users who want to access to Stage view without need to be validated again. The access token obtained for the app user when they first used your app can be used to allow them to use Stage view. -->
