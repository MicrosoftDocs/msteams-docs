---
title: Overview to authentication for tabs using Teams SSO with Azure AD
description: Overview to SSO authentication in Teams and how to use it in tabs
ms.topic: how-to
ms.localizationpriority: medium
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD)
---
# Enable Teams single sign-on in a tab application

Users sign in to Microsoft Teams using either their personal Microsoft account or their Microsoft 365 account. Take advantage of this and use single sign-on (SSO) to authenticate and authorize the user to your tab app without requiring them to sign in a second time.

## Teams SSO for tabs at runtime

Teams SSO authentication is achieved through a validation process that involves the tab app, Microsoft Teams, and Azure AD. During this interaction, the user must consent for use of their Teams identity to obtain access token.

The following image shows how the Teams SSO works when a Teams user attempts to access the tab app:

:::image type="content" source="../../../assets/images/tabs/tabs-sso-diagram.png" alt-text="Tab single sign-on SSO diagram":::

| # | Interaction | What's going on |
| --- | --- | --- |
| 1 | Tab -> Teams | The tab app makes a JavaScript call to `getAuthToken()`, which tells Teams to obtain an access token for the tab application. |
| 2 | Teams - > Consent form | If the current user is using your tab application for the first time, Teams displays request prompt to consent, if consent is required. The user must provide their consent to Teams for using their Teams identity to obtain access token from Azure AD. <br> Alternately, there's a request prompt to handle step-up authentication such as two-factor authentication. |
| 3 | Teams -> Azure AD | Teams requests Azure AD endpoint for the tab access token for the current Teams user. |
| 4 | Azure AD -> Teams | Azure AD sends the tab access token to the Teams application. Teams will cache the token on your behalf so that future calls to getAccessToken simply return the cached token. |
| 5 | Teams -> Tab | Teams sends the tab access token to the tab as part of the result object returned by the `getAuthToken()` call. |
| 6 | Tab app | The tab app parses the token using JavaScript to extract required information, such as the user's email address. |

The token returned to the tab app is both an access token and an identity token. The tab app can use the token as an access token to make authenticated HTTPS requests to APIs on the server-side. Because the access token contains identity claims, the server can store information associated with the user's identity; such as the user's preferences.

For more information on access tokens, please see [Configure code to enable Teams SSO](tab-sso-code.md).

> [!IMPORTANT]
> The `getAuthToken()` is only valid for consenting to a limited set of user-level APIs that is email, profile, offline_access, and OpenId. It is not used for further Graph scopes such as `User.Read` or `Mail.Read`. For suggested workarounds, see [Get an access token with Graph permissions](tab-sso-token-graph.md).

The SSO API also works in [task modules](../../../task-modules-and-cards/what-are-task-modules.md) that embed web content.

## Enable Teams SSO for a tab app

This section describes the tasks involved in implementing SSO for a tab app. These tasks are language- and framework-agnostic.

To build a tab app that uses Teams SSO to authenticate users:

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

      Your Teams app users are authenticated using their Teams user credentials and Azure AD provides an access token for them.
      You'll need to create a new tab app registration in Azure AD:

      - [Register your tab application in Azure AD](tab-sso-register-aad.md)
      - [Configure API permissions with Microsoft Graph](tab-sso-graph-api.md)
      - [Configure admin consent](tab-sso-admin-consent.md)

    :::column-end:::
:::row-end:::
:::row:::
    :::column span="":::

      1. **Configure code**

    :::column-end:::
    :::column span="2":::

      Next, you configure the code for acquiring access token from Azure AD:

      - [Code configuration for enabling Teams SSO for tabs](tab-sso-code.md)

    :::column-end:::
:::row-end:::
:::row:::
    :::column span="":::

      1. **Update Teams manifest**

    :::column-end:::
    :::column span="2":::

      Update the app properties in your app's manifest file:
      
      - [Update Teams app manifest and preview the app](tab-sso-manifest.md)
      
    :::column-end:::
:::row-end:::

## Best practices

Here's a list of best practices:

## Known limitations

- **Tenant Admin Consent**

    A simple way of consenting on behalf of an organization as a tenant admin is to refer to `https://login.microsoftonline.com/common/adminconsent?client_id=<AAD_App_ID>`.

- **Ask for consent using the Auth API**

    Another approach for getting Graph scopes is to present a consent dialog using our existing [web-based Azure AD authentication approach](~/tabs/how-to/authentication/auth-tab-aad.md#navigate-to-the-authorization-page-from-your-pop-up-page). This approach involves popping up an Azure AD consent dialog box.

    To ask for additional consent using the Auth API, follow these steps:

    1. The token retrieved using `getAuthToken()` must be exchanged server-side using Azure AD [on-behalf-of flow](/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow) to get access to those other Graph APIs. Ensure you use the v2 Graph endpoint for this exchange.
    2. If the exchange fails, Azure AD returns an invalid grant exception. There are usually one of two error messages, `invalid_grant` or `interaction_required`.
    3. When the exchange fails, you must ask for consent. Show some user interface (UI) asking the user to grant other consent. This UI must include a button that triggers an Azure AD consent dialog box using our [Azure AD authentication API](~/concepts/authentication/auth-silent-aad.md).
    4. When asking for more consent from Azure AD, you must include `prompt=consent` in your [query-string-parameter](~/tabs/how-to/authentication/auth-silent-aad.md#get-the-user-context) to Azure AD, otherwise Azure AD doesn't ask for the other scopes.
        * Instead of `?scope={scopes}`
        * Use this `?prompt=consent&scope={scopes}`
        * Ensure that `{scopes}` includes all the scopes you're prompting the user for, for example, Mail.Read or User.Read.
    5. Once the user has granted more permission, retry the on-behalf-of-flow to get access to these other APIs.

## Next step

> [!div class="nextstepaction"]
> [Register your tab application in Azure AD](tab-sso-register-aad.md)

## See also

- [Configure code to enable Teams SSO](tab-sso-code.md)
