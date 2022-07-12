---
title: Configure Admin consent
description: Describes configuring Admin consent
ms.topic: how-to
ms.localizationpriority: medium
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD) Graph API
---
# Configure admin consent

You can define app scope for an exposed API and determine if users can consent to this scope in directories where user consent is enabled. You can let only admins provide consent for higher-privileged permissions.

## To expose an API

1. Select **Manage** > **Expose an API** from the left pane.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/expose-api-menu.png" alt-text="Expose an API menu option.":::

    The **Expose an API** page appears.

1. Select **Set** to generate app ID URI.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/expose-an-api.png" alt-text="Setting app ID URI.":::

    The section for setting app ID URI appears.

1. Enter the app ID URI, and then select **Save**.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/set-app-id-uri.png" alt-text="Entering app ID URI.":::

    A message pops up on the browser stating that the app ID URI was updated.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/app-id-uri-msg.png" alt-text="App ID URI message.":::

    The app ID URI displays on the page.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/app-id-uri-added.png" alt-text="App ID URI updated.":::

## To configure API scope

1. Select **+ Add a scope** in the **Scopes defined by this API** section.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/select-scope.png" alt-text="Selecting scope.":::

    The **Add a scope** page appears.

1. Enter the app details for your app scope.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/add-scope.png" alt-text="Adding scope details.":::

    1. Enter the scope name. This is a mandatory field.
    1. Select **Admins and users** to configure the users who can give consent to use user's login credentials. The default option is **Admins only**.
    1. Enter the **Admin consent display name**. This is a mandatory field.
    1. Enter the description for admin consent. This is a mandatory field.
    1. Enter the **User consent display name**.
    1. Enter the description for user consent description.
    1. Select the **Enabled** option for state.
    1. Select **Add scope**.

    A message pops up on the browser stating that the scope was added.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/scope-added-msg.png" alt-text="Scope added message.":::

    The app ID URI displays on the page.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/scope-added.png" alt-text="Scope added and displayed.":::

## To configure authorized client application

1. Move through the **Expose an API** page to the **Authorized client application** section, and select **+ Add a client application**.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/auth-client-apps.png" alt-text="Authorized client application.":::

    The **Add a client application** page appears.

1. Enter the details for adding a client application. For this section, you'll add two client applications.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/add-client-app.png" alt-text="Adding a client application.":::

    1. Enter **1fec8e78-bce4-4aaf-ab1b-5451cc387264** as client ID for Teams mobile or desktop application.
    1. Select the app ID you created for your app for the **Authorized scopes**.
    1. Select **Add application**.

    A message pops up on the browser stating that the client app was added.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/update-app-auth-msg.png" alt-text="Client application added message.":::

    The client app IDs display on the page.

1. Repeat the previous step to add client app for Teams web application.

    1. Enter **5e3ce6c0-2b1f-4285-8d4b-75ee78787346** as client ID for web app.
    1. Select the app ID you created for your app for the **Authorized scopes**.
    1. Select **Add application**..

    A message pops up on the browser stating that the client app was added.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/update-app-auth-msg.png" alt-text="Client application added message for web app.":::

    The client app IDs display on the page.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/client-app-added.png" alt-text="Client app added and displayed.":::