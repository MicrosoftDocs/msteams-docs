---
title: Register your tab app with Azure AD
description: Describes registering your tab app with Azure AD
ms.topic: how-to
ms.localizationpriority: medium
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD)
---
# Register your app in Azure AD

Your Teams app users are authenticated and authorized by Azure AD for using your app. Azure AD provides them access to your app based on their Teams identity. You'll need to register your app with Azure AD so that the user who has signed into Teams can be given access to your app.

 

## Prerequisites

Azure AD provides an access token for the users based on their identity token in Teams.

You'll need to create a new app registration in Azure AD, and expose its (web) API using scopes (permissions). Then, you'll configure a trust relationship between the exposed API on Azure AD and your app. It lets your app users access the app without any further need of consent when your app calls the API using On-behalf-of (OBO) flow. 

You may also need to configure additional configuration for the platform or device where you want to target your app.

It's helpful to learn about the details that you'll configure for your app when you register it on Azure AD. It includes the following:

- Single- or multi-tenant option
- App's platform and the URL from where your app is accessible.
- App ID URI, a globally-unique URI used to identify the web API you expose for your app's access through scopes. It's also referred to as an identifier URI.
- Scope, which defines the permissions that an authorized user or your app can be granted for accessing a resource exposed by the API.

Ensure that you learn about these configurations before you start registering your app.

The tasks involved in registering a Teams tab app that uses SSO are language- and framework-agnostic.

> [!NOTE]
> The Microsoft Teams Toolkit can register the Azure AD application in an SSO project.

> [!NOTE]
> There are some important restrictions that you must know:
> - Only user-level Graph API permissions are supported, that is, email, profile, offline_access, OpenId. If you must have access to other Graph scopes such as User.Read or Mail.Read, see Get an access token with Graph permissions.
> - It is important that your application's domain name is the same as the domain name you have registered for your Azure AD application.
> - Currently, multiple domains per app are not supported.
> - The user must set `accessTokenAcceptedVersion` to 2 for a new application. This configuration is made to the Manifest file on Azure AD portal.

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

    1. Select the intended types of user accounts that can access your app. You can choose from single- or multi-tenant options.

2. Select the **Redirect URI** details.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/redirect-uri.png" alt-text="redirect URI." border="true":::

    1. Select the platform where your app will be accessible.
    2. Enter URL for your app. After user authentication is successful, Teams uses this URL to open your app.
       You can change this URL at a later stage, if needed.

3. Select **Register**.
    A message pops up on the browser stating that the app was created.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/app-created-msg.png" alt-text="Register app on Azure AD Portal." border="true":::

    The app is created and displayed.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/tab-app-created.png" alt-text="App registration is successful." border="false":::

4. Note and save the **Application ID**. You'll need it for updating the app manifest.

    Your Teams tab app is registered in Azure AD.

You should now have Application ID for your tab app.

## Configure admin consent

You can define app scope for an exposed API and determine if users can consent to this scope in directories where user consent is enabled. You can let only admins provide consent for higher-privileged permissions.

In this section, you'll learn:

- [To expose an API](#to-expose-an-api)

- [To configure API scope](#to-configure-api-scope)

- [To configure authorized client application](#to-configure-authorized-client-application)

### To expose an API

1. Select **Manage** > **Expose an API** from the left pane.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/expose-api-menu.png" alt-text="Expose an API menu option." border="false":::

    The **Expose an API** page appears.

1. Select **Set** to generate app ID URI in the form of `api://{AppID}`.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/expose-an-api.png" alt-text="Set app ID URI" border="false":::

    The section for setting app ID URI appears.

2. Enter the app ID URI in the format shown here.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/set-app-id-uri.png" alt-text="App ID URI" border="true":::

    - The app ID URI displays pre-filled with application ID in the format `api://{AppID}`.
    - The app ID URI format should be: `api://fully-qualified-domain-name.com/{AppID}`.
    - Insert the `fully-qualified-domain-name.com` between `api://` and `{AppID}`.

    where,
    - `fully-qualified-domain-name.com` is the human readable domain name from which your app is served.
      If you're using a tunneling service such as ngrok, you must update this value whenever your ngrok subdomain changes.
    - `AppID` is the **Application (client) ID** that was generated when you registered your app. You can view it in the **Overview** section.

3. Select **Save**.

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

    1. Enter the client ID for Teams mobile or desktop application.
    1. Select the app ID you created for your app for the **Authorized scopes**.
    1. Select **Add application**.

    A message pops up on the browser stating that the client app was added.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/update-app-auth-msg.png" alt-text="Client application added message" border="false":::

    The client app IDs display on the page.

1. Repeat the previous step to add client app for Teams web application.

    1. Enter the client ID for web app.
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

Congratulations! You've completed the app configuration in Azure AD required to enable SSO for your tab app.

## Next step

> [!div class="nextstepaction"]
> [Configure code to enable Teams SSO](tab-sso-code.md)

## See also

- [Tenancy in Azure Active Directory](/azure/active-directory/develop/single-and-multi-tenant-apps)
- [App scopes](/azure/active-directory/develop/v2-permissions-and-consent.md#openid-connect-scopes)
- [Get an access token with Graph permissions](/tabs/how-to/authentication/auth-aad-sso?tabs=dotnet#get-an-access-token-with-graph-permissions)
