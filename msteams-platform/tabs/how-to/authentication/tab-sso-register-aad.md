---
title: Register your tab app with Azure AD
description: Describes registering your tab app with Azure AD
ms.topic: how-to
ms.localizationpriority: medium
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD)
---
# Register your tab application in Azure AD

Your Teams app users are authenticated using their Teams user credentials and Azure AD provides an access token for them. You'll need to create a new tab app registration in Azure AD.

The tasks involved in creating a Teams tab that uses SSO are language- and framework-agnostic.

   > [!NOTE]
   > The Microsoft Teams Toolkit can to register the Azure AD application in a SSO project.

In this section, you'll learn:

- [How to register and configure the Azure AD app](#register-your-app)

- [How to configure admin consent](#configure-admin-consent)

- [How to configure authentication for different platforms](#configure-authentication-for-different-platforms)

## Register your app

In this section, you'll learn to create and register an Azure-based Teams tab app.

To register your tab app in Azure AD:

1. Open a web browser to the [Azure portal](https://ms.portal.azure.com/).
   The Microsoft Azure AD Portal page opens.

1. Select **App registrations** icon.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/azure-portal.png" alt-text="Azure AD Portal page." border="false":::

   The **App registrations** page appears.

1. Select **+ New registration** icon.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/app-registrations.png" alt-text="New registration page on Azure AD Portal." border="false":::

    The **Register an application** page appears.

1. Enter the app details for your tab app.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/register-app.png" alt-text="App registration page on Azure AD Portal." border="false":::

    1. Enter the name of your app that will be displayed to the user.
        You can change this name at a later stage, if you want to.

    1. Select the intended types of user accounts that can access your app. For this section, select **Accounts in this organizational directory only (Microsoft only - Single tenant)**.

1. Select the **Redirect URI** details.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/redirect-uri.png" alt-text="redirect URI." border="true":::

    1. Select the platform where your app will be accessible.
    2. Enter URL for your app. After user authentication is successful, Teams uses this URL to open your app.
       You can change this URL at a later stage, if needed.

1. Select **Register**.
    A message pops up on the browser stating that the app was created.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/app-created-msg.png" alt-text="Register app on Azure AD Portal." border="true":::

    The app is created and displayed.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/tab-app-created.png" alt-text="App registration is successful." border="false":::

1. Note and save the **Application ID**. You'll need it for updating the app manifest.

    Your Teams tab app is created.

## Configure admin consent

You can define app scope for an exposed API and determine if users can consent to this scope in directories where user consent is enabled. You can let only admins provide consent for higher-privileged permissions.

In this section, you'll learn:

- [To expose an API](#to-expose-an-api)

 [To configure API scope](#to-configure-api-scope)

- [To configure authorized client application](#to-configure-authorized-client-application)

### To expose an API

1. Select **Manage** > **Expose an API** from the left pane.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/expose-api-menu.png" alt-text="Expose an API menu option." border="false":::

    The **Expose an API** page appears.

1. Select **Set** to generate app ID URI.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/expose-an-api.png" alt-text="Set app ID URI" border="false":::

    The section for setting app ID URI appears.

1. Enter the app ID URI, and then select **Save**.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/set-app-id-uri.png" alt-text="App ID URI" border="true":::

    A message pops up on the browser stating that the app ID URI was updated.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/app-id-uri-msg.png" alt-text="App ID URI message" border="false":::

    The app ID URI displays on the page.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/app-id-uri-added.png" alt-text="App ID URI updated" border="false":::

### To configure API scope

1. Select **+ Add a scope** in the **Scopes defined by this API** section.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/select-scope.png" alt-text="Select scope" border="true":::

    The **Add a scope** page appears.

1. Enter the app details for your app scope.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/add-scope.png" alt-text="Add scope details" border="true":::

    1. Enter the scope name. This is a mandatory field.
    1. Select **Admins and users** to configure the users who can give consent to use user's login credentials. The default option is **Admins only**.
    1. Enter the **Admin consent display name**. This is a mandatory field.
    1. Enter the description for admin consent. This is a mandatory field.
    1. Enter the **User consent display name**.
    1. Enter the description for user consent description.
    1. Select the **Enabled** option for state.
    1. Select **Add scope**.

    A message pops up on the browser stating that the scope was added.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/scope-added-msg.png" alt-text="Scope added message" border="false":::

    The app ID URI displays on the page.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/scope-added.png" alt-text="Scope added and displayed" border="false":::

### To configure authorized client application

1. Move through the **Expose an API** page to the **Authorized client application** section, and select **+ Add a client application**.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/auth-client-apps.png" alt-text="Authorized client application" border="true":::

    The **Add a client application** page appears.

1. Enter the details for adding a client application. For this section, you'll add two client applications.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/add-client-app.png" alt-text="Add a  client application" border="true":::

    1. Enter **1fec8e78-bce4-4aaf-ab1b-5451cc387264** as client ID for Teams mobile or desktop application.
    1. Select the app ID you created for your app for the **Authorized scopes**.
    1. Select **Add application**.

    A message pops up on the browser stating that the client app was added.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/update-app-auth-msg.png" alt-text="Client application added message" border="false":::

    The client app IDs display on the page.

1. Repeat the previous step to add client app for Teams web application.

    1. Enter **5e3ce6c0-2b1f-4285-8d4b-75ee78787346** as client ID for web app.
    1. Select the app ID you created for your app for the **Authorized scopes**.
    1. Select **Add application**.

    A message pops up on the browser stating that the client app was added.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/update-app-auth-msg.png" alt-text="Client application added message for web app" border="false":::

    The client app IDs display on the page.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/client-app-added.png" alt-text="Client app added and displayed" border="true":::

## Configure authentication for different platforms

Depending on the platform or device on which you want to target your your app, additional configuration may be required such as redirect URIs, specific authentication settings, or fields specific to the platform.

### To configure authentication for a platform

1. Select **Manage** > **Authentication** from the left pane.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/azure-portal-platform.png" alt-text="Authenticate for platforms" border="false":::

    The **Platform configurations** page appears.

1. Select **+ Add a platform**.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/add-platform.png" alt-text="Add a platforms" border="false":::

    The **Configure platforms** page appears.

1. Select **Web** to configure the app as a web app.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/configure-platform.png" alt-text="Select web platform" border="true":::

    The **Configure Web** page appears.

1. Enter the configuration details for the web platform.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/config-web-platform.png" alt-text="Configure web platform" border="true":::

    1. Enter the Application ID URI as the **Redirect URIs**.
    2. Enter the API route where an authentication response should be sent as **Front-channel logout URL**.

1. Select **Configure**.

    The platform is configured and displayed in the **Platform configurations** page.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/web-platform-configured.png" alt-text="Web platform configured" border="false":::

Congratulations! You've completed the app registration prerequisites to continue with your tab SSO app.
