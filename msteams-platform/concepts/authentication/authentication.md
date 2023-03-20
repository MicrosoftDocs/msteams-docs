---
title: Authenticating app users
description: Learn about authentication methods that you can enable in Teams app, such as Single sign-on (SSO) and using third-party OAuth providers.
ms.topic: conceptual
ms.localizationpriority: medium
---
# Authenticate users in Microsoft Teams

Authentication is all about validating app users, and securing the app and app users against unwarranted access. You can use an authentication method suitable for your app to validate app users who want to use the Teams app.

Choose to add authentication for your app in one of the two ways:

- **Enable single sign-on (SSO) in a Teams app**:
  SSO within Teams is an authentication method that uses an app user's Teams identity to provide them access to your app. A user who has logged into Teams doesn't need to log in again to your app within the Teams environment. With only a consent required from the app user, the Teams app retrieves access details for them from Azure Active Directory (AD). After the app user has given consent, they can access the app even from other devices without having to be validated again.

- **Enable authentication using third-party OAuth provider**:
  You can use a third-party OAuth Identity Provider (IdP) to authenticate your app users. The app user is registered with the identity provider, which has a trust relationship with your app. When the user attempts to log in, the identity provider validates the app user and provides them access to your app. Azure AD is one such third party OAuth provider. You can use other providers, such as Google, Facebook, GitHub, or any other provider.

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

- [Enable single sign-on in a tab app](../../tabs/how-to/authentication/tab-sso-overview.md)
- [Microsoft Teams authentication flow for tabs](~/tabs/how-to/authentication/auth-flow-tab.md)
- [Single sign-on support for bots](~/bots/how-to/authentication/auth-aad-sso-bots.md)
- [Add authentication to your message extension](~/messaging-extensions/how-to/add-authentication.md)
- [Glossary](../../get-started/glossary.md)
- [Microsoft Graph authentication provider based on scenario](/graph/sdks/choose-authentication-providers)
