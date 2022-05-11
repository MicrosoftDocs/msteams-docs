---
title: Overview to authentication for tabs using SSO in Teams with Azure AD
description: Overview to SSO authentication in Teams and how to use it in tabs
ms.topic: conceptual
ms.localizationpriority: medium
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD) SSO access token app manifest 
---
# Enable single sign-on in a tab app

Single sign-on (SSO) allows a user sign-in only once to access an application or a web service. The app users never have to go through authentication again.

With SSO in Teams, app users have an added advantage. After logging into Teams using Microsoft or Microsoft 365 account, app users don't need to sign in again to use your app. App users can access your app within Teams even on any other device with access granted through Azure AD.

Here's what you'll learn in this section:

1. **SSO user experience**: Teams offers your app users a true SSO experience can use your app without signing in again.
2. **SSO in Teams at runtime**: Within Teams, your tab app interacts with Azure AD at runtime for authenticating and authorizing app users.
3. **Enable SSO for your tab app**: Implement the tasks involved to implement SSO in your tab app.

## SSO user experience in Teams

App users sign in to Teams using either personal Microsoft account or Microsoft 365 account. You can take advantage of this, and use SSO to authenticate and authorize the app users.

&nbsp;&nbsp;&nbsp;&nbsp; :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/teams-sso-ux.png" alt-text="Teams SSO user experience" border="false":::

- Teams authenticates and stores the identity of its app user.
- Your tab app uses the stored identity of the app user who is already validated by Teams.
- The app user needs to give consent to Teams for using the identity to access for using your tab app.

You can view here an example of user experience with SSO in a tab app:

:::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/sso-tab.gif" alt-text="SSO in tab app":::

### Enhance user experience with SSO

- Teams gets the access token for the current user from Azure AD. This interaction with Azure AD is invisible to the user. It translates to app access for the user without having to leave Teams environment.
- After consenting to Teams the first time, the app user can use your tab app with no further need of consent, even on any other device. For this reason, it's true SSO and a better user experience.
- The access token is pre-fetched by Teams. This is done to improve performance and load time of the app in Teams environment.
- The user doesn't need to memorize or record several passwords to access and use apps in Teams environment.

Now, let's see what happens at the backend during runtime to achieve true SSO user experience within Teams.

## SSO in Teams at runtime

You can achieve SSO in a tab app by obtaining access token for the Teams user who's currently logged in. This process involves the tab app, Teams, and Azure AD. During this interaction, the app user must give consent for using identity to obtain the access token.

The following image shows how SSO works when a Teams app user attempts to access the tab app:

:::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/teams-runtime-seq.png" alt-text="Tab single sign-on SSO diagram" border="false" lightbox="../../../assets/images/authentication/teams-sso-tabs/teams-runtime-seq.png":::

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

| # | Interaction | What's going on |
| --- | --- | --- |
| 1 | Tab app -> Teams Client | The tab app makes a JavaScript call to `getAuthToken()`, which tells Teams to obtain an access token. |
| 2 | Teams Client - > Consent form | If the current app user is using your tab app for the first time, Teams displays request prompt to consent, if it's required. The app user must provide consent to Teams for using Teams identity to obtain access token from Azure AD. <br> Alternately, there's a request prompt to handle step-up authentication such as two-factor authentication. |
| 3 | Teams Client -> Azure AD | Teams requests Azure AD endpoint for the access token for the current user based on the app user's Teams identity. |
| 4 | Azure AD -> Teams Client | Azure AD sends the access token to the Teams Client. The token is a JSON Web Token (JWT), and it's validation works just like token validation in most standard OAuth flows. Teams will cache the token on your behalf so that future calls to `getAuthToken()` return the cached token. |
| 5 | Teams Client -> Tab app | Teams sends the access token to the tab app as part of the result object returned by the `getAuthToken()` call. |
| 6 | Tab app | The tab app parses the token using JavaScript to extract required information, such as the app user's email address. The token returned to the tab app is both an access token and an identity token. |

> [!IMPORTANT]
> The `getAuthToken()` is only valid for consenting to a limited set of user-level APIs that is email, profile, offline_access, and OpenId. It is not used for further Graph scopes such as `User.Read` or `Mail.Read`. For suggested workarounds, see [Extend your app with Microsoft Graph permissions](tab-sso-graph-api.md).

### Use cases for enabling SSO for tab app

Here are some use cases where enabling SSO is beneficial. Call `getAuthToken()` in these scenarios to use Teams identity for obtaining access token for your app users:

- To get user’s teams identity from Teams if you have an existing app that you want to be available within a tab app in Teams for your app users.

- To authenticate a user by reusing the team’s identity inside your tab app.

- To authenticate and get user’s teams identity without having them to signing in again inside configurable tabs. This is applicable to some settings that need to be configured at a config stage.

- To obtain an access token inside a task module, when it's invoked from a tab app, a bot app, a messaging extension app, or adaptive cards.

- To authenticate a user in stage view.

- To authenticate users for [task modules](../../../task-modules-and-cards/what-are-task-modules.md) that embed web content.

> [!NOTE]
> Tabs are Teams-aware web pages. To enable SSO in a web-page hosted inside a tab app, add [Teams Javascript client SDK](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true), and call `microsoftTeams.initialize()`. Once you've initialized Microsoft Teams, call `microsoftTeams.getAuthToken()` to get the access token for your app.

To achieve Teams SSO at runtime, configure your app to enable SSO for authenticating and authorizing app users.

## Enable SSO for a tab app

This section describes the tasks involved in implementing SSO for a tab app. These tasks are language- and framework-agnostic.

To enable SSO for a tab app:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/enable-sso.png" alt-text="Steps to enable SSO for tab" border="false" lightbox="../../../assets/images/authentication/teams-sso-tabs/enable-sso.png":::

1. **Register with Azure AD**: Create an Azure AD app to generate an app ID and app ID URI. You also configure redirect URI where Azure AD would send the access token in exchange for identity token for the current user logged into Teams. For generating access token, you configure scopes and OBO flow.
2. **Configure code**: Update the code to handle access token, calling it when a user accesses your app and validating it when received.
3. **Update Teams app manifest**: Update your Teams Client manifest with the app ID generated on Azure AD and the app ID URI to ensure secure connection between Azure AD and your app.

## Third-party cookies on iOS

After the iOS 14 update, Apple has blocked the [third-party cookie](https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/) access for all the apps by default. Therefore, the apps that leverage third-party cookies for authentication in their Channel or Chat tabs and Personal apps will not be able to complete their authentication workflows on Teams iOS clients. To conform with Privacy and Security requirements, you must move to a token-based system or use first-party cookies for the user authentication workflows.

## Best practices

Here's a list of best practices:

- **Don't store access token on client-side code**: Don’t cache or store the access token in your app's client-side code. Always call `getAuthToken()` when you need an access token. Teams Client caches the access token (or request a new one if it expires). This makes sure that there's no accidental leak of your token from your web app.
- **Use server-side code for Microsoft Graph calls**: Always use the server-side code to make Microsoft Graph calls, or other calls that require passing an access token. Never return the OBO token to the client to enable the client to make direct calls to Microsoft Graph. This helps protect the token from being intercepted or leaked. For more information on the proper protocol flow, see the [OAuth 2.0 protocol diagram](auth-flow-tab.md).

## Known limitations

- Currently, SSO only supports OAuth 2.0 token. It doesn't support SAML token.
- SSO in Teams works only with OAuth 2.0 protocol.  
- SSO works only with Azure AD. To extend it to other OAuth Identity providers, the flow needs to be implemented. For more information, please see, [Enable authentication using third-party OAuth provider](auth-flow-tab.md) and [Configure third party OAuth authentication](auth-tab-aad.md).
- Multiple domains per app is not supported. For this, please read about [LOB apps](tab-sso-register-aad.md#before-you-register-with-azure-ad).
- Tenant admin consent: A simple way of [consenting on behalf of an organization as a tenant admin](/azure/active-directory/develop/v2-permissions-and-consent.md#requesting-consent-for-an-entire-tenant) is by getting [consent from admin](https://login.microsoftonline.com/common/adminconsent?client_id=<AAD_App_ID).
  
    You can ask for consent using the Auth API. Another approach for getting Graph scopes is to present a consent dialog using our existing [third party OAuth provider authentication approach](~/tabs/how-to/authentication/auth-tab-aad.md#navigate-to-the-authorization-page-from-your-pop-up-page). This approach involves popping up an Azure AD consent dialog box.

  <details>
  <summary>To ask for additional consent using the Auth API, follow these steps:</summary>

    1. The token retrieved using `getAuthToken()` must be exchanged on the server-side using Azure AD [on-behalf-of flow](/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow) to get access to those other Graph APIs. Ensure you use the v2 Graph endpoint for this exchange.
    2. If the exchange fails, Azure AD returns an invalid grant exception. There are usually one of the two error messages, `invalid_grant` or `interaction_required`.
    3. When the exchange fails, you must ask for consent. Use the app user interface (UI) to ask the user to grant other consent. This UI must include a button that triggers an Azure AD consent dialog using [Silent authentication](~/concepts/authentication/auth-silent-aad.md).
    4. When asking for more consent from Azure AD, you must include `prompt=consent` in your [query-string-parameter](~/tabs/how-to/authentication/auth-silent-aad.md#get-the-user-context) to Azure AD, otherwise Azure AD wouldn't ask for other scopes.

        - Instead of `?scope={scopes}`, use `?prompt=consent&scope={scopes}`
        - Ensure that `{scopes}` includes all the scopes you're prompting the user for, for example, Mail.Read or User.Read.
    1. Once the user has granted more permissions, retry the On-behalf-of flow to get access to these other APIs.

    </details>

## Next step

> [!div class="nextstepaction"]
> [Register your tab application in Azure AD](tab-sso-register-aad.md)

## See also

[Configure code to enable Teams SSO](tab-sso-code.md)

<!--
:::row:::
    :::column span="":::

      1. **Build your Teams tab app**
    
    :::column-end:::
    :::column span="2":::
        
      You can build a simple tab app and enable SSO for it.
      **Quickstart**: The simplest path to get started with Teams tab SSO is with the Teams toolkit for Microsoft Visual Studio Code. 
      You can also create a simple personal tab app. For more information, see [Create a personal tab](../create-personal-tab.md)
    
    :::column-end:::
:::row-end:::
:::row:::
    :::column span="":::

      2. **Register your app with Azure AD**

    :::column-end:::
    :::column span="2":::

      Your Teams Client users are authenticated using Teams user credentials and Azure AD provides an access token for them.
      You'll need to create a new tab app registration in Azure AD:

      - [Register your tab application in Azure AD](tab-sso-register-aad.md)
      - [Configure API permissions with Microsoft Graph](tab-sso-graph-api.md)
      - [Configure admin consent](tab-sso-admin-consent.md)

    :::column-end:::
:::row-end:::
:::row:::
    :::column span="":::

      3. **Configure code**

    :::column-end:::
    :::column span="2":::

      Next, you configure the code for acquiring access token from Azure AD:

      - [Code configuration for enabling Teams SSO for tabs](tab-sso-code.md)

    :::column-end:::
:::row-end:::
:::row:::
    :::column span="":::

      4. **Update Teams manifest**

    :::column-end:::
    :::column span="2":::

      Update the app properties in your app's manifest file:
      
      - [Update Teams Client manifest and preview the app](tab-sso-manifest.md)
      
    :::column-end:::
:::row-end:::-->
