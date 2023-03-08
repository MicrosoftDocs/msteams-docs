---
title: Register your tab app with Azure AD
description: Configure Single sign-on (SSO) with Azure AD by configuring App ID URI, scope for access token, and pre-authorize trusted clients.
ms.topic: how-to
ms.localizationpriority: high
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD) access token SSO tenancy scope 
---
# Configure your tab app in Azure AD

Azure Active Directory provides access to your tab app based on the app user's Teams identity. You'll need to register your tab app with Azure AD so that the app user who has signed into Teams can be given access to your tab app.

## Enabling SSO in Azure AD

Register your tab app in Azure AD and enable it for SSO requires making app configurations, such as generating app ID, defining API scope, and pre-authorize client IDs for trusted applications.

:::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/register-azure-ad.png" alt-text="Configure Azure AD to send access token to Teams Client app":::

Create a new app registration in Azure AD, and expose its (web) API using scopes (permissions). Configure a trust relationship between the exposed API on Azure AD and your app. It allows Teams Client to obtain an access token on behalf of your application and the logged-in user. You can add client IDs for the trusted mobile, desktop, and web applications that you want to pre-authorize.

You may also need to configure additional details, such as authenticating app users on the platform or device where you want to target your tab app.

User-level Graph API permissions are supported, that is, email, profile, offline_access, and OpenId. If you require access to additional Graph scopes, such as `User.Read` or `Mail.Read`, see [Get an access token with Graph permissions](tab-sso-graph-api.md).

Azure AD configuration enables SSO for your tab app in Teams. It responds with an access token for validating the app user.

### Before you configure your app

It's helpful if you learn about the configuration for registering your app on Azure AD beforehand. Ensure that you've prepared to configure the following details prior to registering your app:

- **Single- or multi-tenant options**: Will your application be used in only the Microsoft 365 tenant where it's registered, or will many Microsoft 365 tenants use it? Applications written for one enterprise are typically single-tenant. Applications written by an independent software vendor and used by many customers need to be multi-tenant so each customer's tenant can access the application.
- **Application ID URI**: It's a globally unique URI that identifies the web API you expose for your app's access through scopes. It's also referred to as an identifier URI. The application ID URI includes the app ID and the subdomain where your app is hosted. Your application's domain name and the domain name you register for your Azure AD application must be the same. Currently, multiple domains per app aren't supported.
- **Scope**: It's the permission that an authorized app user or your app can be granted for accessing a resource exposed by the API.

> [!NOTE]
>
> - **LOB applications**: Your organization can make LOB applications available through Microsoft Store. These apps are custom to your organization. They are internal or specific within your organization or business.
> - **Customer-owned apps**: SSO is also supported for customer-owned apps within the Azure AD B2C tenants.

To create and configure your app in Azure AD for enabling SSO:

- [Configure scope for access token.](#configure-scope-for-access-token)
- [Configure access token version.](#configure-access-token-version)

## Configure your app in Azure AD

You can configure your tab app in Azure AD to configure the scope and permissions for access tokens.

You'll need to register your app in Azure AD and configure the tenancy and app's platform, before you can enable it for SSO. Azure AD generates a new app ID that you must note. You'll need to update it later in the Teams app manifest file.

> [!NOTE]
> Microsoft Teams Toolkit registers the Azure AD application in an SSO project. You can skip this section if you've used Teams Toolkit to create your app. However, you would need to configure permissions and scope, and trust client applications.

<details>
<summary><b>Learn how to register your app in Azure AD</b></summary>

### To register a new app in Azure AD

1. Open the [Azure portal](https://ms.portal.azure.com/) on your web browser.
   The Microsoft Azure AD Portal page opens.

2. Select the **App registrations** icon.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/azure-portal.png" alt-text="Azure AD Portal page.":::

   The **App registrations** page appears.

3. Select **+ New registration** icon.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/app-registrations.png" alt-text="New registration page on Azure AD Portal.":::

    The **Register an application** page appears.

4. Enter the name of your app that you want to be displayed to the app user. You can change this name at a later stage, if you want to.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/register-app.png" alt-text="App registration page on Azure AD Portal.":::

5. Select the type of user account that can access your app. You can choose from single- or multi-tenant options, or Private Microsoft account.

    <details>
    <summary><b>Options for supported account types</b></summary>

    | Option | Select this to... |
    | --- | --- |
    | Accounts in this organizational directory only  (Microsoft only - Single tenant) | Build an application for use only by users (or guests) in your tenant. <br> Often called LOB application, this app is a single-tenant application in the Microsoft identity platform. |
    | Accounts in any organizational directory (Any Azure AD directory - Multi-tenant) | Let users in any Azure AD tenant use your application. This option is appropriate if, for example, you're building a SaaS application, and you intend to make it available to multiple organizations. <br> This type of app is known as a multi-tenant application in the Microsoft identity platform.|
    | Accounts in any organizational directory (Any Azure AD directory - Multi-tenant) and personal Microsoft accounts | Target the widest set of customers. <br> By selecting this option, you're registering a multi-tenant application that can support app users who have personal Microsoft accounts also. |
    | Personal Microsoft accounts only | Build an application only for users who have personal Microsoft accounts. |

    </details>

    > [!NOTE]
    > You don't need  to enter **Redirect URI** for enabling SSO for a tab app.

7. Select **Register**.
    A message pops up on the browser stating that the app was created.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/app-created-msg.png" alt-text="Register app on Azure AD Portal.":::

    The page with app ID and other configurations is displayed.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/tab-app-created.png" alt-text="App registration is successful.":::

8. Note and save the app ID from **Application (client) ID**. You'll need it for updating the Teams app manifest later.

    Your app is registered in Azure AD. You now have app ID for your tab app.

</details>

### Configure scope for access token

After you've created a new app registration, configure scope (permission) options for sending access token to Teams Client, and authorizing trusted client applications to enable SSO.

To configure scope and authorize trusted client applications, you'll need:

- [To expose an API](#to-expose-an-api): Configure scope (permission) options for your app. You'll expose a web API, and configure the application ID URI.
- [To configure API scope](#to-configure-api-scope): Define scope for the API, and the users who can consent for a scope. You can let only admins provide consent for higher-privileged permissions.
- [To configure authorized client application](#to-configure-authorized-client-application): Create authorized client IDs for applications that you want to pre-authorize. It allows the app user to access the app scopes (permissions) you've configured, without requiring any further consent. Pre-authorize only those client applications you trust as your app users won't have the opportunity to decline consent.

#### To expose an API

1. Select **Manage** > **Expose an API** from the left pane.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/expose-api-menu.png" alt-text="Expose an API menu option.":::

    The **Expose an API** page appears.

1. Select **Set** to generate application ID URI in the form of `api://{AppID}`.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/expose-an-api.png" alt-text="Set app ID URI":::

    The section for setting application ID URI appears.

1. Enter the application ID URI in the format explained here.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/set-app-id-uri.png" alt-text="Application ID URI":::

    - The **Application ID URI** is pre-filled with app ID (GUID) in the format `api://{AppID}`.
    - The application ID URI format must be: `api://fully-qualified-domain-name.com/{AppID}`.
    - Insert the `fully-qualified-domain-name.com` between `api://` and `{AppID}` (which is, GUID). For example, api://example.com/{AppID}.

    where,
    - `fully-qualified-domain-name.com` is the human-readable domain name from which your tab app is served. Your application's domain name and the domain name you register for your Azure AD application must be the same.

      If you're using a tunneling service, such as ngrok, you must update this value whenever your ngrok subdomain changes.
    - `AppID` is the app ID (GUID) that was generated when you registered your app. You can view it in the **Overview** section.

    > [!IMPORTANT]
    >
    > - **Application ID URI for app with multiple capabilities**: If you're building an app with a bot, a messaging extension, and a tab, enter the application ID URI as `api://fully-qualified-domain-name.com/BotId-{YourClientId}`, where the BotID is your bot app ID.
    >
    > - **Format for domain name**: Use lower case letters for domain name. Don't use upper case.
    >
    >   For example, to create an app service or web app with resource name, 'demoapplication':
    >
    >   | If base resource name used is | URL will be... | Format is supported on... |
    >   | --- | --- | --- |
    >   | *demoapplication* | `https://demoapplication.example.net` | All platforms.|
    >   | *DemoApplication* | `https://DemoApplication.example.net` | Desktop, web, and iOS only. It isn't supported in Android. |
    >
    >    Use the lower case option *demoapplication* as base resource name.

1. Select **Save**.

    A message pops up on the browser stating that the application ID URI was updated.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/app-id-uri-msg.png" alt-text="Application ID URI message":::

    The application ID URI displays on the page.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/app-id-uri-added.png" alt-text="Application ID URI updated":::

1. Note and save the Application ID URI. You'll need it for updating the Teams app manifest later.

#### To configure API scope

1. Select **+ Add a scope** in the **Scopes defined by this API** section.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/select-scope.png" alt-text="Select scope":::

    The **Add a scope** page appears.

1. Enter the details for configuring scope.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/add-scope.png" alt-text="The screenshot shows how to add scope details in Azure.":::

    1. Enter the scope name. This is a mandatory field.
    2. Select the user who can give consent for this scope. The default option is **Admins only**.
    3. Enter the **Admin consent display name**. This is a mandatory field.
    4. Enter the description for admin consent. This is a mandatory field.
    5. Enter the **User consent display name**.
    6. Enter the description for user consent description.
    7. Select the **Enabled** option for state.
    8. Select **Add scope**.

    A message pops up on the browser stating that the scope was added.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/scope-added-msg.png" alt-text="Scope added message":::

    The new scope you defined displays on the page.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/scope-added.png" alt-text="Scope added and displayed":::

#### To configure authorized client application

1. Move through the **Expose an API** page to the **Authorized client application** section, and select **+ Add a client application**.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/auth-client-apps.png" alt-text="Authorized client application":::

    The **Add a client application** page appears.

1. Enter the appropriate Microsoft 365 client ID for the applications that you want to authorize for your app’s web application.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/add-client-app.png" alt-text="Add a client application":::

    > [!NOTE]
    >
    > - The Microsoft 365 client IDs for mobile, desktop, and web applications for Teams, Microsoft 365 app, and Outlook are the actual IDs that you must add.
    > - For a Teams tab app, you'll need either Web or SPA, as you can't have a mobile or desktop client application in Teams.

    1. Choose one of the following client IDs:

       | Use client ID | For authorizing... |
       | --- | --- |
       | 1fec8e78-bce4-4aaf-ab1b-5451cc387264 | Teams mobile or desktop application |
       | 5e3ce6c0-2b1f-4285-8d4b-75ee78787346 | Teams web application |
       | 4765445b-32c6-49b0-83e6-1d93765276ca | Microsoft 365 web application |
       | 0ec893e0-5785-4de6-99da-4ed124e5296c | Microsoft 365 desktop application |
       | d3590ed6-52b3-4102-aeff-aad2292ab01c | Outlook desktop application |
       | bc59ab01-8403-45c6-8796-ac3ef710b3e3 | Outlook web application |
       | 27922004-5251-4030-b22d-91ecd9a37ea4 | Outlook mobile application |

    1. Select the application ID URI you created for your app in **Authorized scopes** to add the scope to the web API you exposed.

    1. Select **Add application**.

    A message pops up on the browser stating that the authorized client app was added.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/update-app-auth-msg.png" alt-text="Client application added message":::

    The authorized app's client ID displays on the page.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/client-app-added.png" alt-text="Client app added and displayed":::

> [!NOTE]
> You can authorize more than one client application. Repeat the steps of this procedure for configuring another authorized client application.

You've successfully configured app scope, permissions, and client applications. Ensure that you note and save the application ID URI. Next, you configure the access token version.

### Configure access token version

You must define the access token version for your app. This configuration is made in the Azure AD application manifest.

#### To define the access token version

1. Select **Manage** > **Manifest** from the left pane.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/azure-portal-manifest.png" alt-text="Azure AD portal Manifest":::

    The Azure AD application manifest appears.

1. Enter **2** as the value for the `accessTokenAcceptedVersion` property.

    > [!NOTE]
    > If you've selected "Personal Microsoft accounts only" or "Accounts in any organizational directory (Any Azure AD directory - Multitenant) and personal Microsoft accounts (e.g. Skype, Xbox)" during app registration, update the value for the `accessTokenAcceptedVersion` property as 2.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/azure-manifest-value.png" alt-text="Value for accepted access token version":::

1. Select **Save**

    A message pops up on the browser stating that the manifest was updated successfully.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/update-aad-manifest-msg.png" alt-text="Manifest updated message":::

Congratulations! You've completed the app configuration in Azure AD required to enable SSO for your tab app.

## Next step

> [!div class="nextstepaction"]
> [Configure code to enable SSO](tab-sso-code.md)

## See also

- [Tenancy in Azure Active Directory](/azure/active-directory/develop/single-and-multi-tenant-apps)
- [Extend tab app with Microsoft Graph permissions and scope](tab-sso-graph-api.md)
- [Quickstart - Register an application with the Microsoft identity platform](/azure/active-directory/develop/quickstart-register-app)
- [Quickstart: Configure an application to expose a web API](/azure/active-directory/develop/quickstart-configure-app-expose-web-apis)
- [OAuth 2.0 authorization code flow](/azure/active-directory/develop/v2-oauth2-auth-code-flow)
