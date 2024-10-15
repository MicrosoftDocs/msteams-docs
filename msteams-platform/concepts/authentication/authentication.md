---
title: Authenticating app users
description: Learn about authentication methods that you can enable in Teams app, such as Single sign-on (SSO) and using third-party OAuth providers.
ms.topic: conceptual
ms.localizationpriority: medium
ms.date: 05/23/2022
---
# Authenticate users in Microsoft Teams

Authentication is all about validating app users, and securing the app and app users against unwarranted access. You can use an authentication method suitable for your app to validate app users who want to use the Teams app.

Choose to add authentication for your app in one of the following ways:

* **Enable single sign-on (SSO) in a Teams app**:
  SSO within Teams is an authentication method that uses an app user's Teams identity to provide them with access to your app. A user who has logged into Teams doesn't need to log in again to your app within the Teams environment. With only a consent required from the app user, the Teams app retrieves access details for them from Microsoft Entra ID. After the app user has given consent, they can access the app even from other devices without having to be validated again.

* **Enable authentication using third-party OAuth provider**:
  You can use a third-party OAuth Identity Provider (IdP) to authenticate your app users. The app user is registered with the identity provider, which has a trust relationship with your app. When the user attempts to log in, the identity provider validates the app user and provides them with access to your app. Microsoft Entra ID is one such third party OAuth provider. You can use other providers, such as Google, Facebook, GitHub, or any other provider.

* **Enable SSO for nested apps**:
  You can use nested app authentication (NAA) to utilize SSO for authentication of apps nested (embedded) inside the supported Microsoft apps. Compared with existing full-trust authentication models and the on-behalf-of (OBO) flow, NAA provides better security and flexibility in app architecture, enabling the creation of rich, client-driven apps.

  With the network access account, you can use MSAL.js to obtain tokens for your Teams tab or Office Add-in apps. NAA leverages the capabilities of the Microsoft host to facilitate conditional access and Intune policies, such as registered device policy. These policies might not be supported when hosted within the native webviews.

  > [!NOTE]
  > * NAA is available only in [public developer preview](../../resources/dev-preview/developer-preview-intro.md).
  > * NAA is supported in MSAL.js v3.15 and higher. For the latest updates, see [changelog entries](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/CHANGELOG.md).

* **Enable authentication for your API based message extensions**:

  You can enable the following authentication methods for your API-based message extension:

  * **API key authentication**: Implement API key authentication to use a key token known only to the app and the API service to authenticate requests. For more information, see [API key authentication](../../messaging-extensions/api-based-secret-service-auth.md)

  * **SSO authentication**: Microsoft Entra is a comprehensive identity and access management solution that provides secure authentication for API-based message extensions. It ensures that only authenticated users can access your app’s features within Microsoft Teams. For more information, see [enable SSO for API-based message extensions](../../messaging-extensions/api-based-microsoft-entra.md).

  * **None**: Update `none` as a value for `authorization` in an API-based message extension when the API doesn't require any authentication for the user. When Teams service sends a request to the API, it doesn't supply any authentication information.

    ```json
        "authorization": {
            "authType": "none"
        }
    ```

## Select authentication method

Enable authentication with SSO or third party OAuth IdPs in your tab app, bot app, and messaging extension app. Select one of the two methods for adding authentication in your app:

:::row:::
    :::column span="1":::
        SSO
    :::column-end:::
    :::column span="1":::
        &nbsp;
    :::column-end:::
    :::column span="1":::
        OAuth
    :::column-end:::
:::row-end:::
:::row:::
    :::column span="1":::
        :::image type="content" source="../../assets/images/authentication/tab-sso-icon.png" alt-text="SSO for tab app" link="../../tabs/how-to/authentication/tab-sso-overview.md":::
    :::column-end:::
    :::column span="1":::
        <br>

        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  **Tab app**
        
    :::column-end:::
    :::column span="1":::
        :::image type="content" source="../../assets/images/authentication/tab-app-idp.png" alt-text="Authentication with third-party OAuth provider for tab app." link="../../tabs/how-to/authentication/auth-tab-aad.md":::
    :::column-end:::
:::row-end:::
:::row:::
    :::column span="1":::
        :::image type="content" source="../../assets/images/authentication/bot-sso-icon.png" alt-text="SSO for bot app" link="../../bots/how-to/authentication/bot-sso-overview.md":::

    :::column-end:::
    :::column span="1":::
        <br>

        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; **Bot app**
        
    :::column-end:::
    :::column span="1":::
        :::image type="content" source="../../assets/images/authentication/bot-app-idp.png" alt-text="Authentication with third-party OAuth provider for bot app." link="../../bots/how-to/authentication/add-authentication.md":::
    :::column-end:::
:::row-end:::
:::row:::
    :::column span="1":::
        :::image type="content" source="../../assets/images/authentication/mex-sso-icon.png" alt-text="SSO for messaging extension app" link="../../bots/how-to/authentication/bot-sso-overview.md":::
    :::column-end:::
    :::column span="1":::
        <br>

        &nbsp; &nbsp; &nbsp; **Message extension app**
        
    :::column-end:::
    :::column span="1":::
        :::image type="content" source="../../assets/images/authentication/mex-app-idp.png" alt-text="Authentication with third-party oAuth IdPs for messaging extension app." link="../../messaging-extensions/how-to/add-authentication.md":::
    :::column-end:::
:::row-end:::

## See also

* [Enable single sign-on in a tab app](../../tabs/how-to/authentication/tab-sso-overview.md)
* [Microsoft Teams authentication flow for tabs](~/tabs/how-to/authentication/auth-flow-tab.md)
* [Single sign-on support for bots](~/bots/how-to/authentication/auth-aad-sso-bots.md)
* [Add authentication to your message extension](~/messaging-extensions/how-to/add-authentication.md)
* [Glossary](../../get-started/glossary.md)
* [Microsoft Graph authentication provider based on scenario](/graph/sdks/choose-authentication-providers)
