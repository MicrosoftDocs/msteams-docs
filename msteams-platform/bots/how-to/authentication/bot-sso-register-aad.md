---
title: Register your bot app with Azure AD
description: Describes registering your bot app with Azure AD
ms.topic: how-to
ms.localizationpriority: medium
keywords: teams authentication bots Microsoft Azure Active Directory (Azure AD) access token SSO tenancy scope 
---
# Register your bot app in Azure AD

Azure AD provides access to your bot app based on the app user's Teams identity. You'll need to register your bot app with Azure AD so that the app user who has signed into Teams can be given access to your bot app.

In this section, you will:

1. Create and deploy Bot resource in Azure AD
    1. Create client secret
1. Configure bot app
    1. Configure scope
        1. Set App ID URI
        1. Select scope
        1. Authorize client apps
    1. Configure access token version
1. Update OAuth configuration

## Create and deploy bot resource in Azure AD

/ Add details /

To create and deploy bot resource

1. Open the [Azure portal](https://ms.portal.azure.com/) on your web browser.
   The Microsoft Azure AD Portal page opens.

1. Select the **Create a resource** icon.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/create-resource.png" alt-text="Create a bot resource" border="false":::

    The **Create a resource** page appears.

1. Type **Azure bot** in the search box, and select the Azure bot from the options that appear.

    The **Azure Bot** page appears, and the plan is pre-selected as Azure Bot.

1. Select **Create**.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/azure-bot.png" alt-text="Create azure bot plan" border="false":::

    The **Create an Azure Bot** page appears.

1. Enter the basic project details for the bot app.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/create-azure-bot.png" alt-text="Add an azure bot project details":::

    1. Enter a bot handle. This is a unique identifier for your bot. It's not the display name, and you can choose a different display name later.

    1. Select a subscription plan.

    1. Select the resource group that you want to provision for your bot app.

        You can also create a new resource group.

1. Select the type of app in the **Microsoft App ID** section. Choose from User-assigned managed identity, Multi Tenant, and Single Tenant.

1. Select the creation type.

1. Select **Review + create**.

    Azure AD validates the project details. After successful validation, it creates the project and provisions the selected resources.

/ Add details post-creation. /

## Configure app in Azure AD

You need to configure client secret, permissions and scopes, authorize client applications, and update manifest for your Azure AD app. These configurations help invoke SSO for your bot app.

### Create client secret

A client secret is a string that the application uses to prove its identity when requesting a token.

1. Select **Manage** > **Certificates & secrets**.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/client-secret-menu.png" alt-text="Client secret menu option" border="false":::

    The **Certificates & secrets** page appears.

2. Select **+ New client secret**.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/new-client-secret.png" alt-text="Add new client secret" border="false":::

   The **Add a client secret** page appears.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/add-client-secret.png" alt-text="Add a client secret page" border="true":::

3. Enter the description.
4. Select the duration of validity for the secret.
5. Select **Add**.

   A message pops up on the browser stating that the client secret was updated, and the client secret displays on the page.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/client-secret-added.png" alt-text="Client secret added":::

6. Select the copy button next to the **Value** of client secret.
7. Save the value that you copied for later use.

   > [!NOTE]
   > Ensure that you copy the value of client secret right after you create it. The value is visible only at the time when the client secret is created, and can't be viewed after that.

### Configure scope for access token

Configure scope (permission) options for sending access token to Teams Client, and authorizing trusted client applications to enable SSO.

You need:

- [To configure application ID URI](#to-configure-application-id-uri)
- [To configure API scope](#to-configure-api-scope)
- [To configure authorized client application](#to-configure-authorized-client-application)

#### To configure application ID URI

1. Select **Manage** > **Expose an API** from the left pane.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/expose-api-menu.png" alt-text="Expose an API menu option." border="true":::

    The **Expose an API** page appears.

1. Select **Set** to generate application ID URI in the form of `api://{AppID}`.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/expose-an-api.png" alt-text="Set app ID URI." border="true":::

    The section for setting application ID URI appears.

1. Enter the application ID URI in the format explained here.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/set-app-id-uri.png" alt-text="Application ID URI" border="true":::

    - The **Application ID URI** is pre-filled with app ID (GUID) in the format `api://{AppID}`.

    > [!IMPORTANT]
    >
    > - **Standalone bot**: If you're building a standalone bot, enter the application ID URI as api://botid-{YourBotId}. Here YourBotId is your Azure AD application ID.
    > - **Application ID URI for app with multiple capabilities**: If you're building an app with a bot, a messaging extension, and a tab, enter the application ID URI as `api://fully-qualified-domain-name.com/BotId-{YourClientId}`, where the BotID is your bot app ID.
    >
    > - **Format for domain name**: Use lower case letters for domain name. Don't use upper case.
    >
    >   For example, to create an app service or web app with resource name, 'demoapplication':
    >
    >   | If base resource name used is | URL will be... | Format is supported on... |
    >   | --- | --- | --- |
    >   | *demoapplication* | **<https://demoapplication.example.net>** | All platforms.|
    >   | *DemoApplication* | **<https://DemoApplication.example.net>** | Desktop, web, and iOS only. It isn't supported in Android. |
    >
    >    Use the lower case option *demoapplication* as base resource name.

1. Select **Save**.

    A message pops up on the browser stating that the application ID URI was updated.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/app-id-uri-msg.png" alt-text="Application ID URI message" border="true":::

    The application ID URI displays on the page.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/app-id-uri-added.png" alt-text="Application ID URI updated" border="true":::

1. Note and save the Application ID URI. You'll need it for updating the Teams app manifest later.

#### To configure API scope

1. Select **+ Add a scope** in the **Scopes defined by this API** section.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/select-scope.png" alt-text="Select scope" border="true":::

    The **Add a scope** page appears.

1. Enter the details for configuring scope.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/add-scope.png" alt-text="Add scope details" border="true":::

    1. Enter the scope name. This is a mandatory field.
    2. Select the user who can give consent for this scope. The default option is **Admins only**.
    3. Enter the **Admin consent display name**. This is a mandatory field.
    4. Enter the description for admin consent. This is a mandatory field.
    5. Enter the **User consent display name**.
    6. Enter the description for user consent description.
    7. Select the **Enabled** option for state.
    8. Select **Add scope**.

    A message pops up on the browser stating that the scope was added.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/scope-added-msg.png" alt-text="Scope added message" border="true":::

    The new scope you defined displays on the page.

#### To configure authorized client application

1. Move through the **Expose an API** page to the **Authorized client application** section, and select **+ Add a client application**.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/auth-client-apps.png" alt-text="Authorized client application" border="true":::

    The **Add a client application** page appears.

1. Enter the appropriate client ID for the Teams Client for the applications that you want to authorize for your app’s web application.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/add-client-app.png" alt-text="Add a client application" border="true":::

<!--   
    > [!NOTE]
    >
    > - The client IDs for Teams mobile, desktop, and web application are the actual IDs that you should add.
    > - For a Teams bot app, you'll need either Web or SPA, as you can't have a mobile or desktop client application in Teams.
-->

1. Choose one of the following client IDs:

   | Use client ID | For authorizing... |
   | --- | --- |
   | 1fec8e78-bce4-4aaf-ab1b-5451cc387264 | Teams mobile or desktop application |
   | 5e3ce6c0-2b1f-4285-8d4b-75ee78787346 | Teams web application |

1. Select the application ID URI you created for your app in **Authorized scopes** to add the scope to the web API you exposed.

1. Select **Add application**.

A message pops up on the browser stating that the authorized client app was added.

:::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/update-app-auth-msg.png" alt-text="Client application added message" border="true":::

The client ID displays on the page.

:::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/client-app-added.png" alt-text="Client app added and displayed" border="true":::

> [!NOTE]
> You can authorize more than one client application. Repeat the steps of this procedure for configuring another authorized client application.

### Configure access token version

You must define the access token version that is acceptable for your app. This configuration is made in the Azure AD application manifest.

#### To define the access token version

1. Select **Manage** > **Manifest** from the left pane.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/azure-portal-manifest.png" alt-text="Azure AD portal Manifest" border="true":::

    The Azure AD application manifest appears.

1. Enter **2** as the value for the `accessTokenAcceptedVersion` property.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/azure-manifest-value.png" alt-text="Value for accepted access token version" border="true":::

1. Select **Save**

    A message pops up on the browser stating that the manifest was updated successfully.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/update-aad-manifest-msg.png" alt-text="Manifest updated message":::

### Update OAuth connection

/ Add details /

With the Client ID and Client secret provided, the token store exchanges the token for a graph token with defined permissions.

### To update OAuth connection

1. Open the [Azure portal](https://ms.portal.azure.com/) on your web browser.
   The Microsoft Azure Bot page opens.

1. Enter the name of your Azure AD app in **Search** box, and open your app.

1. Select **Settings** > **Configuration**.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/bot-configuration.png" alt-text="Configure OAUth settings for your bot app" border="false":::

    The **Configuration** page appears.

1. Move through the **Configuration** page and select **Add OAuth Connection Settings**.

    The **New Connection Setting** page appears.

1. Enter the OAuth configuration settings for the Azure bot.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/new-config-setting.png" alt-text="OAuth configuration settings" border="true":::

    1. Enter a name for the configuration setting.
    1. Select **Azure Active Directory v2** as the service provider.
        The remaining configuration details appear.

        :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/new-config-setting-b.png" alt-text="Additional fields for OAuth configuration " border="true":::

    1. Enter the client ID that was generated when you created the bot app.
    1. Enter the client secret that you've created for your bot.
    1. Enter the application ID URI of your bot in the **Token Exchange URL**.
    1. Type **common** as the value for tenant.
    1. Enter the scope that you defined when you configured the permissions.

1. Select **Save**.
1. Select **Apply**.

Congratulations! You've completed the app configuration in Azure AD required to enable SSO for your bot app.

<!-- 
    -    - The application ID URI format should be: `api://fully-qualified-domain-name.com/{AppID}`.
    - Insert the `fully-qualified-domain-name.com` between `api://` and `{AppID}` (which is, GUID). For example, api://example.com/{AppID}.

    where,
    - `fully-qualified-domain-name.com` is the human-readable domain name from which your app is served. Your application's domain name and the domain name you register for your Azure AD application should be the same.

      If you're using a tunneling service, such as ngrok, you must update this value whenever your ngrok subdomain changes.
    - `AppID` is the app ID (GUID) that was generated when you registered your app. You can view it in the **Overview** section.
-->

<!--
## Create a bot app registration in Azure AD

Register a new app in Azure AD.

### To register a new app in Azure AD

1. Open the [Azure portal](https://ms.portal.azure.com/) on your web browser.
   The Microsoft Azure AD Portal page opens.

2. Select the **App registrations** icon.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/azure-portal.png" alt-text="Azure AD Portal page." border="true":::

   The **App registrations** page appears.

3. Select **+ New registration** icon.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/app-registrations.png" alt-text="New registration page on Azure AD Portal." border="true":::

    The **Register an application** page appears.

4. Enter the name of your app that you want to be displayed to the app user. You can change this name at a later stage, if you want to.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/register-app.png" alt-text="App registration page on Azure AD Portal." border="true":::

5. Select the type of user account that can access your app. You can choose from single- or multi-tenant options, or Private Microsoft account.

    <details>
    <summary><b>Options for supported account types</b></summary>

    | Option | Select this to... |
    | --- | --- |
    | Accounts in this organizational directory only  (Microsoft only - Single tenant) | Build an application for use only by users (or guests) in your tenant. <br> Often called LOB application, this app is a single-tenant application in the Microsoft identity platform. |
    | Accounts in any organizational directory (Any Azure AD directory - Multi-tenant) | Let users in any Azure AD tenant use your application. This option is appropriate if, for example, you're building a SaaS application, and you intend make it available to multiple organizations. <br> This type of app is known as a multi-tenant application in the Microsoft identity platform.|
    | Accounts in any organizational directory (Any Azure AD directory - Multi-tenant) and personal Microsoft accounts | Target the widest set of customers. <br> By selecting this option, you're registering a multi-tenant application that can support app users who have personal Microsoft accounts also. |
    | Personal Microsoft accounts only | Build an application only for users who have personal Microsoft accounts. |

    </details>

    > [!NOTE]
    > You don't need  to enter **Redirect URI** for enabling SSO for an app.

7. Select **Register**.
    A message pops up on the browser stating that the app was created.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/app-created-msg.png" alt-text="Register app on Azure AD Portal." border="true":::

    The page with app ID and other configurations is displayed.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/bot-app-created.png" alt-text="App registration is successful." border="true":::

8. Note and save the app ID from **Application (client) ID**. You'll need it for updating the Teams app manifest later.

    Your app is registered in Azure AD. You should now have app ID for your app.
-->