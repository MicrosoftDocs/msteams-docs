---
title: Overview to authentication for tabs using Teams SSO with Azure AD
description: Overview to SSO authentication in Teams and how to use it in tabs
ms.topic: how-to
ms.localizationpriority: medium
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD)
---
# Enable Teams single sign-on (SSO) in a tab application

Users sign in to Microsoft Teams through their work, school, or Microsoft account that is Office 365 and Microsoft Outlook. You can use single sign-on to authorize your tab app on desktop or mobile clients. If a user signs in once, they don't have to sign in again on any other device as they're signed in automatically.

With Teams SSO, the access token is pre-fetched to improve app performance and load times.

## Using Teams identity for authentication

Teams SSO is an authentication method that uses a user's Teams sign-in identity to provide them app access. A user who has logged into Teams doesn't need to log in again to your app within the Teams environment. With only a consent required from the user, the Teams app retrieves access token for them from Azure Active Directory (AD).

## Teams SSO for tabs at runtime

The following image shows how the Teams SSO with Azure AD process works:

:::image type="content" source="../../../assets/images/tabs/tabs-sso-diagram.png" alt-text="Tab single sign-on SSO diagram":::

1. In the tab, a JavaScript call is made to `getAuthToken()`. `getAuthToken()` tells Teams to obtain an access token for the tab application.
2. If the current user is using your tab application for the first time, there's a request prompt to consent if consent is required. Alternately, there's a request prompt to handle step-up authentication such as two-factor authentication.
3. Teams requests the tab access token from the Azure AD endpoint for the current user.
4. Azure AD sends the tab access token to the Teams application.
5. Teams sends the tab access token to the tab as part of the result object returned by the `getAuthToken()` call.
6. The token is parsed in the tab application using JavaScript, to extract required information, such as the user's email address.

> [!NOTE]
> The `getAuthToken()` is only valid for consenting to a limited set of user-level APIs that is email, profile, offline_access, and OpenId. It is not used for further Graph scopes such as `User.Read` or `Mail.Read`. For suggested workarounds, see Get an access token with Graph permissions- \add x-ref\.

The SSO API also works in [task modules](../../../task-modules-and-cards/what-are-task-modules.md) that embed web content.

## Build a Teams tab app with Teams SSO

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
      - [Create client secret](tab-sso-client-secret.md)

    :::column-end:::
:::row-end:::
:::row:::
    :::column span="":::

      3. **Update sample app code**

    :::column-end:::
    :::column span="2":::

      After you register your app in Azure AD, update the app properties in your app's manifest file.
      Next, you update the sample app with details configured on Azure AD.

      - [Code configuration for enabling Teams SSO for tabs](tab-sso-code.md)

    :::column-end:::
:::row-end:::
:::row:::
    :::column span="":::

      4. **Get an access token from client side**

    :::column-end:::
    :::column span="2":::

      This step requires your app user to give their consent for using their credentials for user-level permission. Azure AD receives the user credentials and sends an access token to Teams.
      In the sample app, this step is already done for your.
      To do this for your app:

      - Update authentication API.
      - Use on-behalf-of flow to fetch access token using Microsoft Authentication Library (MSAL).
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
