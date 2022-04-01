---
title: Authentication for tabs using Teams SSO with Azure AD
description: Describes SSO authentication in Teams and how to use it in tabs
ms.topic: how-to
ms.localizationpriority: medium
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD)
---
# Enable Teams single sign-on (SSO) in a tab application

Users sign in to Microsoft Teams through their work, school, or Microsoft account that is Office 365, Outlook, you can take the advantage by allowing a single sign on to authorize your Teams tab or task module on desktop or mobile clients. If a user signs in once, they don't have to sign in again on another device as they're signed in automatically. Also, your access token is pre-fetched to improve performance and load times.

> [!NOTE]
> Teams SSO can be implemented only with Azure AD.

> [!NOTE]
> **Teams mobile client versions supporting SSO**  
>
> ✔Teams for Android (1416/1.0.0.2020073101 and later)
>
> ✔Teams for iOS (_Version_: 2.0.18 and later)  
>
> ✔Teams JavaScript SDK (_Version_: 1.11 and later) for SSO to work in meeting side panel.
>
> For the best experience with Teams, use the latest version of iOS and Android.
> [!NOTE]
> **Quickstart**  
>
> The simplest path to get started with Teams tab SSO is with the Teams toolkit for Microsoft Visual Studio Code. For more information, see [SSO with Teams toolkit and Visual Studio Code for tabs](../../../toolkit/visual-studio-code-tab-sso.md)

## Teams SSO for tabs at runtime

The following image shows how the Teams SSO with Azure AD process works:

<!-- markdownlint-disable MD033 -->

:::image type="content" source="../../../assets/images/tabs/tabs-sso-diagram.png" alt-text="Tab single sign-on SSO diagram":::

1. In the tab, a JavaScript call is made to `getAuthToken()`. `getAuthToken()` tells Teams to obtain an access token for the tab application.
2. If the current user is using your tab application for the first time, there's a request prompt to consent if consent is required. Alternately, there's a request prompt to handle step-up authentication such as two-factor authentication.
3. Teams requests the tab access token from the Azure AD endpoint for the current user.
4. Azure AD sends the tab access token to the Teams application.
5. Teams sends the tab access token to the tab as part of the result object returned by the `getAuthToken()` call.
6. The token is parsed in the tab application using JavaScript, to extract required information, such as the user's email address.

> [!NOTE]
> The `getAuthToken()` is only valid for consenting to a limited set of user-level APIs that is email, profile, offline_access, and OpenId. It is not used for further Graph scopes such as `User.Read` or `Mail.Read`. For suggested workarounds, see [Get an access token with Graph permissions](#get-an-access-token-with-graph-permissions).

The SSO API also works in [task modules](../../../task-modules-and-cards/what-are-task-modules.md) that embed web content.

## Build a Teams tab app with Teams SSO authentication

This section describes the tasks involved in creating a Teams tab that uses SSO. These tasks are language- and framework-agnostic.

To build a tab app that uses Teams SSO to authenticate users:

:::row:::
    :::column span="":::

      1. **Build your Teams tab app**
    
    :::column-end:::
    :::column span="2":::
        
      For this section, you'll use the Teams tab sample app.

        - [Download the sample app](#download-the-code-sample)
    
    :::column-end:::
:::row-end:::
:::row:::
    :::column span="":::

      2. **Register your app with Azure AD**

    :::column-end:::
    :::column span="2":::

      Your Teams app users are authenticated using their Teams user credentials and Azure AD provides an access token for them.
      You'll need to create a new tab app registration in Azure AD:

      - [Register your new Teams app](#register-your-app)
      - [Configure API permissions](#configure-api-permissions-with-microsoft-graph)
      - [Expose an API](#expose-an-api)
      - [Create client secret](#create-client-secret)

    :::column-end:::
:::row-end:::
:::row:::
    :::column span="":::

      3. **Update sample app code**

    :::column-end:::
    :::column span="2":::

      After you register your app in Azure AD, update the app properties in your app's manifest file.
      Next, you update the sample app with details configured on Azure AD in:

      - [Update the app manifest, `manifest.json`](#update-the-app-manifest)
      - [Update `appsetting.json`](#update-azure-ad-details)

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

## Download the code sample

For this section, use the [Teams Tab SSO](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-sso/csharp) sample in C#. You can download and clone it from GitHub.

To use this sample, clone the sample repo in one of the following ways:

<!--
- [Using Git Bash](#to-use-git-bash-to-clone-the-sample-repo)
- [Using Visual Studio 2022](#to-use-visual-studio-2022-to-clone-the-sample-repo)
- -->

<details>
<summary>To use Git Bash to clone the sample repo</summary>

- Run the following command in a terminal window to clone the sample repository to your computer:

```bash
git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
```

The sample repo for C# app is cloned on your computer in the default location.

> [!TIP]
> You can [fork](https://help.github.com/articles/fork-a-repo/) this [repository](https://github.com/OfficeDev/Microsoft-Teams-Samples) to modify and save your changes to GitHub.

<a name="BuildRun"></a>

You can view the cloned repository by opening it in Visual Studio 2019.
</details>

<details>
<summary>To use Visual Studio 2022 to clone the sample repo</summary>

1. Open Visual Studio 2019.
2. Select **Clone a repository**.
3. Enter `https://github.com/OfficeDev/Microsoft-Teams-Samples.git` as path for cloning the repo:
4. Enter the location where you want to clone the repo, and select **Clone**.

   The sample repo is cloned, and Visual Studio opens. You can view the cloned repo in the **Solution Explorer**.

   Now that you've got the sample repo cloned, let's build your first C# app for Teams.
</details>

## Register tab app with Azure AD

This section describes the tasks involved in creating a Teams tab that uses SSO. These tasks are language- and framework-agnostic.

   > [!NOTE]
   > The Microsoft Teams Toolkit can to register the Azure Active Directory (Azure AD) application in a single sign-in (SSO) project.

   In this section, you'll learn how to register and configure the Azure AD app that can be used to implement SSO in a Microsoft Teams tab app.

   To complete the registration of your tab app in Azure AD:

   1. [Register your app](#register-your-app)
   1. [Configure API permissions with Microsoft Graph](#configure-api-permissions-with-microsoft-graph)
   2. [Expose an API](#expose-an-api)
   3. [Create a client secret](#create-client-secret)

### Register your app

In this section, you'll learn to create and register an Azure-based Teams tab app.

To register your tab app in Azure AD:

1. Open a web browser to the [Azure portal](https://ms.portal.azure.com/).
   The Microsoft Azure AD Portal page opens.

1. Select **App registrations** icon.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/azure-portal.png" alt-text="Azure AD Portal page." border="false":::

   The **App registrations** page appears.

1. Select **+ New registration** icon.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/app-registrations.png" alt-text="New registration page on Azure Portal." border="false":::

    The **Register an application** page appears.

1. Enter the app details for your tab app.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/register-app.png" alt-text="App registration page on Azure Portal." border="false":::

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

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/app-created-msg.png" alt-text="Register app on Azure Portal." border="true":::

    The app is created and displayed.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/tab-app-created.png" alt-text="App registration is successful." border="false":::

1. Note and save the **Application ID**. You'll need it for updating the app manifest.

    Your Teams tab app is created.

### Configure API permissions with Microsoft Graph

In this section, you'll learn to configure API permissions with Microsoft Graph, such as User.Read, email, offline_access, and more.

To configure API permissions:

1. Select **Manage** > **API permission** from the left pane.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/api-permission-menu.png" alt-text="App permissions menu option." border="false":::

    The **API permissions** page appears.

1. Select **+ Add permissions** to add Microsoft Graph API permissions.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/app-permission.png" alt-text="App permissions page." border="false":::

    The **Request API permissions** page appears.

1. Select **Microsoft Graph**.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/request-api-permission.png" alt-text="Request API permissions page." border="true":::

    The options for Graph permissions display.

1. Select **Delegated permissions** to view the list of possible permission that you can select.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/delegated-permission.png" alt-text="Delegated permissions." border="true":::

1. Select relevant permissions for your app. For this section, select **email** and **offline_access**, and then select **Add permissions**.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/select-permission.png" alt-text="Select permissions." border="true":::

    A message pops up on the browser stating that the permissions were updated.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/updated-permission-msg.png" alt-text="Permissions updated message." border="false":::

    The added permissions are displayed in the **API permissions** page.

   :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/configured-permissions.png" alt-text="API permissions are configured." border="true":::

    You've configures API permissions with Microsoft Graph.

### Expose an API

In this section, you'll learn to:

- [Expose an API](#to-expose-an-api)
- [Configure the app scope](#to-configure-api-scope)
- [Configure authorized client application](#to-configure-authorized-client-application)

#### To expose an API

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

#### To configure API scope

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

#### To configure authorized client application

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

### Create client secret

A client secret is a string that the application uses to prove its identity when requesting a token.

1. Select **Manage** > **Certificates & secrets**.

    :::image type="content" source="../../../assets/images/adaptive-cards/client-secret.png" alt-text="Client secret page":::

2. Select **+ New client secret**.

   The **Add a client secret** page appears.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/add-client-secret.png" alt-text="Add a client secret page" border="true":::

3. Enter the description.
4. Select the duration of validity for the secret.
5. Select **Add**.

   A message pops up on the browser stating that the client secret was updated, and the client secret displays on the page.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/client-secret-added.png" alt-text="Client secret added":::

6. Select the copy button next to the **Value** of client secret.
7. Save the value that you copied for later use.

## Update the sample app code

The next step is to update your sample app with the app configuration details you defined in Azure AD.

> [!NOTE]
> **Prerequisites**:
> Before you update the app manifest, you'll need to:
> 
> - Build and debug the sample code
> - Create an ngrok tunnel

In this section, you'll learn to:

- [Update the app manifest](#update-the-app-manifest)
- [Update the Azure AD settings](#update-azure-ad-details)

### Update the app manifest

The Teams app manifest describes how your app integrates into the Microsoft Teams. Your app manifest must conform to the schema hosted at https://developer.microsoft.com/json-schemas/teams/v1.12/MicrosoftTeams.schema.json.

You'll need to add the `webApplicationInfo` property to the app manifest file.

> [!NOTE]
> You must use manifest version 1.5 or higher to implement the `webApplicationInfo` field.

#### To update the app manifest

1. Open the sample app project **TeamsTabSSO.csproj** from the **/Microsoft-Teams-Samples/samples/tab-sso/csharp/** directory of the cloned repo.
2. Open **TeamsTabSSO** > **Manifest** > **manifest.json** from the **Solution Explorer**.
3. Append the following code snippet to the manifest to add the new property:

    ```json
    "webApplicationInfo": {
    "id": "{Azure AD AppId}",
    "resource": "api://{ngrokSubdomain}.ngrok.io/{Azure AD AppId}"
    }
    ```

    where,
    - {Azure AD AppId}* is app ID you created when you registered your app in Azure AD
    - {ngrokSubdomain}* is the ngrok URL

4. Update the Azure app ID in the **id** property.
5. Update the ngrok URL in the following properties:
   1. `contentUrl`
   2. `configurationUrl`
   3. `validDomains`
6. Save the app manifest file.

#### View manifest sample

<details>
<summary>Here's an example of app manifest after it's updated:</summary>

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.11/MicrosoftTeams.schema.json",
  "manifestVersion": "1.11",
  "version": "1.0.0",
  "id": "bccfbe67-e08b-4ec1-a7fd-e0aaf41a097c",
  "packageName": "com.contoso.teamsauthsso",
  "developer": {
    "name": "Microsoft",
    "websiteUrl": "https://www.microsoft.com",
    "privacyUrl": "https://www.microsoft.com/privacy",
    "termsOfUseUrl": "https://www.microsoft.com/termsofuse"
  },
  "name": {
    "short": "Teams Auth SSO",
    "full": "Teams Auth SSO"
  },
  "description": {
    "short": "Teams Auth SSO app",
    "full": "The Teams Auth SSO app"
  },
  "icons": {
    "outline": "outline.png",
    "color": "color.png"
  },
  "accentColor": "#60A18E",
  "staticTabs": [
    {
      "entityId": "auth",
      "name": "Auth",
      "contentUrl": "https://23c3-103-50-148-128.ngrok.io/Home/Index",
      "scopes": [ "personal" ]
    }
  ],
  "configurableTabs": [
    {
      "configurationUrl": "https://23c3-103-50-148-128.ngrok.io/Home/Configure",
      "canUpdateConfiguration": true,
      "scopes": [
        "team"
      ]
    }
  ],
  "permissions": [ "identity", "messageTeamMembers" ],
  "validDomains": [
    "23c3-103-50-148-128.ngrok.io"
  ],
  "webApplicationInfo": {
    "id": "bccfbe67-e08b-4ec1-a7fd-e0aaf41a097c",
    "resource": "api://23c3-103-50-148-128.ngrok.io/bccfbe67-e08b-4ec1-a7fd-e0aaf41a097c"
  }
}
```
</details>

### Update Azure AD details

The `appsettings.json` file includes the configuration for Azure AD app.

To update the app settings:

1. Open **TeamsTabSSO** > **appsettings.json** from the **Solution Explorer**.
2. Update the `AzureAd` code snippet with configured app details on Azure AD portal:

   ```json
     "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
    "TenantId": "[AzureAD Tenant Id]",
    "ClientId": "[AzureAD Client Id]",
    "AppSecret": "[Azure App secret]",
    "ApplicationIdURI": "[Application ID URI]",
    "AuthUrl": "/oauth2/v2.0/token",
    "ValidIssuers": "https://login.microsoftonline.com/TENANT_ID/v2.0,https://sts.windows.net/TENANT_ID/"
    },
    ```
    where,
    - `[AzureAD Tenant Id]` is **Directory (tenant) ID**
    - `[AzureAD Client Id]` is **Application (client) ID**
    - `[Azure App secret]` is the **Value** of **Client credentials**, which is client secret
    - `[Application ID URI]` is **Application ID URI**
    - `TENANT_ID` is **Directory (tenant) ID**

3. Save the file.

#### View the updated file

<details>
<summary>Here's an example of app manifest after it's updated:</summary>

```json
    "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
    "TenantId": "72f988bf-86f1-41af-91ab-2d7cd011db47",
    "ClientId": "bccfbe67-e08b-4ec1-a7fd-e0aaf41a097c",
    "AppSecret": "p-t7Q~wiGyaPdXcmn6E_XnQBmfANChRx5QtZG",
    "ApplicationIdURI": "api://bccfbe67-e08b-4ec1-a7fd-e0aaf41a097c",
    "AuthUrl": "/oauth2/v2.0/token",
    "ValidIssuers": "https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47/v2.0,https://sts.windows.net/72f988bf-86f1-41af-91ab-2d7cd011db47/"
  },
```

This example is updated as per sample details configured in Azure AD:

:::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/azure-app-overview.png" alt-text="Overview of app details on Azure AD portal":::

</details>

## Get an access token with graph permissions

\ Add content \