---
title: Authenticating app users
description: Describes authentication in Teams and how to use it in the apps
ms.topic: conceptual
ms.localizationpriority: medium
keywords: teams authentication OAuth SSO Microsoft Azure Active Directory (Azure AD)
---
# Authenticate users in Microsoft Teams

Authentication is all about validating app users, and securing the app and app users against unwarranted access. You can use an authentication method suitable for your app to validate app users who want to use the Teams app.

Choose to add authentication for your app in one of the two ways:

- **Enable single sign-on (SSO) in a Teams app**
  SSO within Teams is an authentication method that uses an app user's Teams identity to provide them access to your app. A user who has logged into Teams doesn't need to log in again to your app within the Teams environment. With only a consent required from the user, the Teams app retrieves access details for them from Azure Active Directory (AD). After the app user has given consent, they can access the app even from different devices without having to be validated again.

- **Enable authentication using third-party OAuth provider**
  You can use a third-party OAuth Identity Provider (IdP) to authenticate your app users. This is a non-SSO authentication method. The app user is registered with the identity provider, which has a trust relationship with your app. When the user attempts to log in, the identity provider validates the app user and provides them access to the app. Azure AD is one such third party OAuth provider. You can use other providers, such as Google, Facebook, GitHub, or any other provider.

These authentication methods are available for tabs, bots, and messaging extension.

You can implement authentication in your app using one of the following methods:

<!--
| Authentication method | Tab | Bot | Message extension |
| --- | --- | --- | --- |
|**Single sign-on** | [SSO in a tab](../../tabs/how-to/authentication/tab-sso-overview.md) | [SSO in a bot](../../bots/how-to/authentication/auth-aad-sso-bots.md) | [SSO in a message extension](../../messaging-extensions/how-to/enable-SSO-auth-me.md) |

| **Third party OAuth provider authentication** | [Third party authentication in a tab](../../tabs/how-to/authentication/auth-tab-aad.md) | [Third party authentication in a bot](../../bots/how-to/authentication/add-authentication.md) | [Third party authentication in a message extension](../../messaging-extensions/how-to/add-authentication.md) |
-->

<!--
:::row:::
    :::column span="":::
        **Enable SSO**
    :::column-end:::
    :::column span="":::
        &nbsp;
    :::column-end:::
    :::column span="":::
        **Use third party OAuth provider**
    :::column-end:::
:::row-end:::
-->

:::row:::
    :::column span="":::
        :::image type="content" source="../../assets/images/authentication/tab-sso-icon.png" alt-text="SSO for tab app" link="../../tabs/how-to/authentication/tab-sso-overview.md" border="false":::
    :::column-end:::
    :::column span="":::
        :::image type="content" source="../../assets/images/authentication/tab-app.png" alt-text="tab app authentication" border="false":::
    :::column-end:::
    :::column span="":::
        :::image type="content" source="../../assets/images/authentication/tab-app-idp.png" alt-text="Authentication with third-party OAuth provider for tab app." link="../../tabs/how-to/authentication/auth-tab-aad.md" border="false":::
    :::column-end:::
:::row-end:::
:::row:::
    :::column span="":::
        :::image type="content" source="../../assets/images/authentication/bot-sso-icon.png" alt-text="SSO for bot app" link="../../bots/how-to/authentication/auth-aad-sso-bots.md" border="false":::
    :::column-end:::
    :::column span="":::
        :::image type="content" source="../../assets/images/authentication/bot-app.png" alt-text="Bot app authentication" border="false":::
    :::column-end:::
    :::column span="":::
        :::image type="content" source="../../assets/images/authentication/bot-app-idp.png" alt-text="Authentication with third-party OAuth provider for bot app." link="../../bots/how-to/authentication/add-authentication.md" border="false":::
    :::column-end:::
:::row-end:::
:::row:::
    :::column span="":::
        :::image type="content" source="../../assets/images/authentication/mex-sso-icon.png" alt-text="SSO for messaging extension app" link="../../messaging-extensions/how-to/enable-SSO-auth-me.md" border="false":::
    :::column-end:::
    :::column span="":::
        :::image type="content" source="../../assets/images/authentication/mex-app.png" alt-text="message extension app authentication" border="false":::
    :::column-end:::
    :::column span="":::
        :::image type="content" source="../../assets/images/authentication/mex-app-idp.png" alt-text="Authentication with third-party oAuth IdPs for messaging extension app." link="../../messaging-extensions/how-to/add-authentication.md" border="false":::
    :::column-end:::
:::row-end:::

<!--
| &nbsp; | &nbsp; | &nbsp; |
| --- | --- | --- |
| :::image type="content" source="../../assets/images/authentication/tab-sso-icon.png" alt-text="SSO for tab app" link="../../tabs/how-to/authentication/tab-sso-overview.md" border="false"::: | :::image type="content" source="../../assets/images/authentication/tab-app.png" alt-text="tab app authentication" border="false"::: | :::image type="content" source="../../assets/images/authentication/tab-app-idp.png" alt-text="Authentication with third-party OAuth provider for tab app." link="../../tabs/how-to/authentication/auth-tab-aad.md" border="false"::: |
| :::image type="content" source="../../assets/images/authentication/bot-sso-icon.png" alt-text="SSO for bot app" link="../../bots/how-to/authentication/auth-aad-sso-bots.md" border="false"::: | :::image type="content" source="../../assets/images/authentication/bot-app.png" alt-text="Bot app authentication" border="false"::: | :::image type="content" source="../../assets/images/authentication/bot-app-idp.png" alt-text="Authentication with third-party OAuth provider for bot app." link="../../bots/how-to/authentication/add-authentication.md" border="false"::: |
| :::image type="content" source="../../assets/images/authentication/mex-sso-icon.png" alt-text="SSO for messaging extension app" link="../../messaging-extensions/how-to/enable-SSO-auth-me.md" border="false"::: | :::image type="content" source="../../assets/images/authentication/mex-app.png" alt-text="message extension app authentication" border="false"::: | :::image type="content" source="../../assets/images/authentication/mex-app-idp.png" alt-text="Authentication with third-party oAuth IdPs for messaging extension app." link="../../messaging-extensions/how-to/add-authentication.md" border="false"::: | -->

> [!NOTE]
> Please note that the Silent authentication page is moved to Resources. For more information, please see [Silent authentication](../../tabs/how-to/authentication/auth-silent-aad.md).

## See also

- [Microsoft Teams authentication flow for tabs](~/tabs/how-to/authentication/auth-flow-tab.md)
- [Single sign-on support for bots](~/bots/how-to/authentication/auth-aad-sso-bots.md)
- [Add authentication to your message extension](~/messaging-extensions/how-to/add-authentication.md)
