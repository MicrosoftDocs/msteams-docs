---
title: Register your tab app with Azure AD
description: Describes registering your tab app with Azure AD
ms.topic: how-to
ms.localizationpriority: medium
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD)
---
# Register your app in Azure AD

Your Teams app users are authenticated and authorized by Azure AD for using your app. Azure AD provides them access to your app based on their Teams identity. You'll need to register your app with Azure AD so that the user who has signed into Teams can be given access to your app.

## Configuration on Azure AD

Registering your app in Azure AD and enabling it for SSO requires making app configurations, such as generating app ID, defining API scope, permissions, and more.

Create a new app registration in Azure AD, and expose its (web) API using scopes (permissions). Configure a trust relationship between the exposed API on Azure AD and your app. It lets users access your app without any further need of consent when your app calls the API using On-behalf-of (OBO) flow. You can add client IDs for the trusted mobile, desktop, and web application that you want to pre-authorize.

These configurations will enable SSO for your app in Teams.

You may also need to configure additional configuration for authenticating users on the platform or device where you want to target your app.

### Before you register with Azure AD

It's helpful to learn about the configuration required for registering your app on Azure AD. It includes the following:

- Single- or multi-tenant options.
- Platform for your app and the URL from where your app is accessible.
- App ID URI, a globally-unique URI used to identify the web API you expose for your app's access through scopes. It's also referred to as an identifier URI.
- Scope, which defines the permissions that an authorized user or your app can be granted for accessing a resource exposed by the API.

Ensure that you've prepared to configure these details before you start registering your app.

The tasks involved in registering a Teams tab app that uses SSO are language- and framework-agnostic.

> [!NOTE]
> The Microsoft Teams Toolkit registers the Azure AD application in an SSO project.

> [!IMPORTANT]
> There are some important restrictions that you must know:
>
> - Only user-level Graph API permissions are supported, that is, email, profile, offline_access, OpenId. If you require access to other Graph scopes, such as User.Read or Mail.Read, see [Get an access token with Graph permissions](tab-sso-graph-api.md).
> - Your application's domain name should be the same as the domain name you've registered for your Azure AD application.
> - Currently, multiple domains per app are not supported.

In this section, you'll learn:

- [How to register and configure the Azure AD app.](#create-an-app-registration-in-azure-ad)

- [How to configure scope for access token.](#configure-scope-for-access-token)

- [How to configure authentication for different platforms.](#configure-authentication-for-different-platforms)

- [How to configure access token version.](#configure-access-token-version)

## Create an app registration in Azure AD

Register a new app in Azure AD, and configure the tenancy and app's platform and URI options. You'll generate a new application ID that will be updated later in your Teams app manifest file.

### To register a new app in Azure AD

1. Open a web browser to the [Azure portal](https://ms.portal.azure.com/).
   The Microsoft Azure AD Portal page opens.

2. Select **App registrations** icon.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/azure-portal.png" alt-text="Azure AD Portal page." border="false":::

   The **App registrations** page appears.

3. Select **+ New registration** icon.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/app-registrations.png" alt-text="New registration page on Azure AD Portal." border="false":::

    The **Register an application** page appears.

4. Enter the name of your app that will be displayed to the user. You can change this name at a later stage, if you want to.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/register-app.png" alt-text="App registration page on Azure AD Portal." border="false":::

5. Select the types of user accounts that can access your app. You can choose from single- or multi-tenant options, or Private Microsoft account.

    <details>
    <summary>Options for supported account types</summary>

    | Option | Select this to... |
    | --- | --- |
    | Accounts in this organizational directory only  (Microsoft only - Single tenant) | Build an application for use only by users (or guests) in your tenant. <br> Often called a line-of-business (LOB) application, this app is a single-tenant application in the Microsoft identity platform. |
    | Accounts in any organizational directory (Any Azure AD directory - Multitenant) | Let users in any Azure Active Directory (Azure AD) tenant to be able to use your application. This option is appropriate if, for example, you're building a software-as-a-service (SaaS) application that you intend to provide to multiple organizations. <br> This type of app is known as a multi-tenant application in the Microsoft identity platform.|
    | Accounts in any organizational directory (Any Azure AD directory - Multitenant) and personal Microsoft accounts | Target the widest set of customers. <br> By selecting this option, you're registering a multi-tenant application that can also support users who have personal Microsoft accounts. |
    | Personal Microsoft accounts only | Build an application only for users who have personal Microsoft accounts. Personal Microsoft accounts. |

    </details>

6. Select the **Redirect URI** details.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/redirect-uri.png" alt-text="redirect URI." border="true":::

    1. Select the platform where your app will be accessible. You can choose from **Public client/native (mobile & desktop)**, **Web**, **Single-page application (SPA)**.
    2. Enter URL for your app. After user authentication is successful, Teams uses this URL to open your app.
       You can change this URL at a later stage, if needed.

    <details>
    <summary>Platform and redirect URI options</summary>

    | Option | Select this to... |
    | --- | --- |
    | Web | Configure a redirect URI for your app where client app is redirected. It's also where access token is sent after authentication. <br> Select this platform for standard web applications that run on a server. |
    | Mobile and desktop applications | Configure a redirect URI for mobile applications that aren't using the latest Microsoft Authentication Library (MSAL) or for desktop applications. |
    | Single-page application | Configure a redirect URI for a client-side web app by using JavaScript or a framework like Angular, Vue.js, React.js, or Blazor WebAssembly. |
    </details>

7. Select **Register**.
    A message pops up on the browser stating that the app was created.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/app-created-msg.png" alt-text="Register app on Azure AD Portal." border="true":::

    The app is created and displayed.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/tab-app-created.png" alt-text="App registration is successful." border="false":::

8. Note and save the **Application ID**. You'll need it for updating the app manifest.

    Your app is registered in Azure AD. You should now have application ID for your tab app.

## Configure scope for access token

After you've created a new registration, configure scope (permission) options for sending access token to client app. In this section, you'll learn:

- [To expose an API](#to-expose-an-api): Configure scope (permission) options for your app. To do this, you'll expose a web API, and configure the app ID URI.
- [To configure API scope](#to-configure-api-scope): Define scope for the API, and configure the users who can consent for a scope. You can let only admins provide consent for higher-privileged permissions.
- [To configure authorized client application](#to-configure-authorized-client-application): Create an authorized client ID for the applications that you want to pre-authorize for your app’s web application. It lets the user to access the app scopes (permissions) you've configured, without requiring any further consent. Pre-authorize only those client applications you trust as your users won't have the opportunity to decline consent.

### To expose an API

1. Select **Manage** > **Expose an API** from the left pane.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/expose-api-menu.png" alt-text="Expose an API menu option." border="false":::

    The **Expose an API** page appears.

1. Select **Set** to generate app ID URI in the form of `api://{AppID}`.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/expose-an-api.png" alt-text="Set app ID URI" border="false":::

    The section for setting app ID URI appears.

1. Enter the app ID URI in the format shown here.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/set-app-id-uri.png" alt-text="App ID URI" border="true":::

    - The app ID URI displays pre-filled with application ID in the format `api://{AppID}`.
    - The app ID URI format should be: `api://fully-qualified-domain-name.com/{AppID}`.
    - Insert the `fully-qualified-domain-name.com` between `api://` and `{AppID}`.

    where,
    - `fully-qualified-domain-name.com` is the human readable domain name from which your app is served.
      If you're using a tunneling service such as ngrok, you must update this value whenever your ngrok subdomain changes.
    - `AppID` is the **Application (client) ID** that was generated when you registered your app. You can view it in the **Overview** section.

    > [!IMPORTANT]
    >
    > - If you're building an app with a bot, a messaging extension, and a tab, enter the Application ID URI as `api://fully-qualified-domain-name.com/BotId-{YourClientId}`, where the BotID is your bot app ID.
    > - Use lower case letters for domain name. Don't use upper case.
    >
    >   For example, to create an app service or web app, enter base resource name as *demoapplication*. Then, the URL will be <https://demoapplication.azurewebsites.net>. This format is supported for all platforms.
    >
    >   If you use base resource name as *DemoApplication*, the URL will be <https://DemoApplication.azurewebsites.net>. This format is supported in desktop, web, and iOS only. It isn't supported in android.

2. Select **Save**.

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
    2. Select the users who can give consent for this scope. The default option is **Admins only**.
    3. Enter the **Admin consent display name**. This is a mandatory field.
    4. Enter the description for admin consent. This is a mandatory field.
    5. Enter the **User consent display name**.
    6. Enter the description for user consent description.
    7. Select the **Enabled** option for state.
    8. Select **Add scope**.

    A message pops up on the browser stating that the scope was added.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/scope-added-msg.png" alt-text="Scope added message" border="false":::

    The app ID URI displays on the page.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/scope-added.png" alt-text="Scope added and displayed" border="false":::

### To configure authorized client application

1. Move through the **Expose an API** page to the **Authorized client application** section, and select **+ Add a client application**.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/auth-client-apps.png" alt-text="Authorized client application" border="true":::

    The **Add a client application** page appears.

1. Enter the details for adding a client application.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/add-client-app.png" alt-text="Add a  client application" border="true":::

1. Enter the client ID for the Teams client for the applications that you want to authorize for your app’s web application.

   | Add client ID | For authorizing... |
   | --- | --- |
   | 1fec8e78-bce4-4aaf-ab1b-5451cc387264 | Teams mobile or desktop application |
   | 5e3ce6c0-2b1f-4285-8d4b-75ee78787346 | Teams web application |

    > [!NOTE]
    > The client IDs for Teams mobile, desktop, and web application are the actual IDs that you should add.

    > [!IMPORTANT]
    > For a teams tab, you'll need either Web or SPA, as you can't have a mobile or desktop client application in Teams. You might need this detail, if you're using the same Azure AD app for a mobile or desktop client also.

1. Select the app ID you created for your app for the **Authorized scopes**.
2. Select **Add application**.

    A message pops up on the browser stating that the client app was added.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/update-app-auth-msg.png" alt-text="Client application added message" border="false":::

    The client app ID displays on the page.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/client-app-added.png" alt-text="Client app added and displayed" border="true":::

> [!NOTE]
> You can authorize more than one client application. Repeat the steps for configuring authorized client application.

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

## Configure access token version

You must define the access token version that is acceptable for your app. This configuration is made in the Azure AD application manifest.

### To define the access token version

1. Select **Manage** > **Manifest** from the left pane.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/azure-portal-manifest.png" alt-text="Azure AD portal Manifest":::

    The Azure AD application manifest appears.

1. Enter **2** as the value for the `accessTokenAcceptedVersion` property.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/azure-manifest-value.png" alt-text="Value for accepted access token version ":::

1. Select **Save**

    A message pops up on the browser stating that the manifest was updated successfully.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/update-aad-manifest-msg.png" alt-text="Manifest updated message":::

Congratulations! You've completed the app configuration in Azure AD required to enable SSO for your tab app.

## Next step

> [!div class="nextstepaction"]
> [Configure code to enable SSO](tab-sso-code.md)

## See also

- [Tenancy in Azure Active Directory](/azure/active-directory/develop/single-and-multi-tenant-apps)
- [App scopes](/azure/active-directory/develop/v2-permissions-and-consent.md#openid-connect-scopes)
- [Get an access token with Graph permissions](/tabs/how-to/authentication/auth-aad-sso?tabs=dotnet#get-an-access-token-with-graph-permissions)
- [Quickstart - Register an application with the Microsoft identity platform](/azure/active-directory/develop/quickstart-register-app)
- [Quickstart: Configure an application to expose a web API](/azure/active-directory/develop/quickstart-configure-app-expose-web-apis)
