---
title: Action-based Message Extension Tutorial
description: With this learning module, learn how to set up action message extension for Teams to initiate actions from compose message and message area.
ms.author: surbhigupta
ms.topic: article
ms.localizationpriority: high
ms.date: 12/22/2025
---

<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD024 -->
<!-- markdownlint-disable MD001 -->

# Build action based message extension

Teams action based message extension allow users to interact with web services in the Microsoft Teams client. Message extensions help to initiate actions in an external system from the compose message area, the command box, or directly from a message.

**Key features of action based message extension**:

* Presents the user with a modal pop-up to collect or display information.
* Triggers the action commands from the compose message area, the command box, or from a message.

This step-by-step guide helps you to build Teams action-based message extension to initiate actions from compose message and message area. By the end of this tutorial, you can achieve the following output:

:::image type="content" source="../assets/images/sbs-messagingextension-action/sharemessageoutput1.png" alt-text="Screenshot of the message extension output after you have successfully completed the step-by-step guide.":::

## Prerequisites

Ensure that you install the following tools and set up your development environment:

| &nbsp; | Install | For using... |
| --- | --- | --- |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings, and call all in one place. |
| &nbsp; | [Visual Studio 2022](https://visualstudio.microsoft.com) |You can install the enterprise version in Visual Studio 2022, and install the ASP.NET and web development workloads. Use the latest version. |
| &nbsp; | [.NET Core SDK](https://dotnet.microsoft.com/en-us/download) | Customized bindings for local debugging and Azure Functions app deployments. If you haven't installed the latest version, install the portable version. |
| &nbsp; | Dev tunnel | Teams app features (conversational bots, message extensions, and incoming webhooks) need inbound connections. A tunnel connects your development system to Teams. Dev tunnel is a powerful tool to securely open your localhost to the internet and control who has access. Dev tunnel is available in Visual Studio 2022 version 17.7.0 or later. <br> or </br> You can also use [ngrok](https://ngrok.com/downloads) as a tunnel to connect your development system to Teams. It isn't required for apps that only include tabs. This package is installed within the project directory (using npm `devDependencies`). |

> [!NOTE]
> After downloading ngrok, sign up and install [authtoken](https://ngrok.com/downloads).

### Set up local environment

1. Open [Microsoft-Teams-Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples).
1. Select **Code**.
1. From the dropdown menu, select **Open with GitHub Desktop**.

   :::image type="content" source="../../assets/images/include-files/clone-repository.png" alt-text="Screenshot show the option to clone repository in local.":::

1. Select **Clone**.

### Register Microsoft Entra app

The following steps help you to create and register your bot in Azure portal:

* Create and register your Azure app.
* Create client secret to enable SSO authentication of the bot.
* Add Teams channel to deploy the bot.
* Create a tunnel to your web server's endpoints using dev tunnel (recommended) or ngrok.
* Add messaging endpoint to the dev tunnel that you created.

#### Add App registration

1. Go to [Azure portal](https://ms.portal.azure.com/).

1. Select **App registrations**.

    :::image type="content" source="../../assets/images/include-files/azure-app-registration.png" alt-text="Screenshot shows the Azure services to select App registrations.":::

1. Select **+ New registration**.

    :::image type="content" source="../../assets/images/include-files/new-registration.png" alt-text="Screenshot shows the New registration page on Microsoft Entra admin center.":::

1. Enter the name of your app.

1. Select **Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant)**.

1. Select **Register**.

    :::image type="content" source="../../assets/images/include-files/app-register.png" alt-text="Screenshot shows the option to register the bot in Microsoft Entra admin center.":::

    Your app is registered in Microsoft Entra ID. The app overview page appears.

    :::image type="content" source="../../assets/images/include-files/app-registration-overview.png" alt-text="Screenshot shows the app registration overview page.":::

    > [!NOTE]
    > Save the app ID from **Application (client) ID** and **Directory (tenant) ID** for further use.

#### Create a tunnel

Follow one of the following two methods to create a tunnel.

# [dev tunnel](#tab/dev)

1. Open Visual Studio.
1. Select **Create a new project**.

    :::image type="content" source="../assets/images/include-files/create-new-project.png" alt-text="Screenshot shows the selection to create a new project.":::

1. In the search box, enter **ASP.NET**. From the search results, select **ASP.NET Core Web App**.

1. Select **Next**.

    :::image type="content" source="../assets/images/include-files/template-search.png" alt-text="Screenshot shows the search and selection of the template.":::

1. Enter **Project name** and select **Next**.

    :::image type="content" source="../assets/images/include-files/project-name.png" alt-text="Screenshot shows the project name to enter.":::

1. Select **Create**.

    :::image type="content" source="../assets/images/include-files/additional-information.png" alt-text="Screenshot shows the project additional information." lightbox="../assets/images/include-files/additional-information.png":::

    An overview window appears.

    :::image type="content" source="../assets/images/include-files/asp-net-output.png" alt-text="Screenshot shows the overview window.":::

1. In the debug dropdown list, select **Dev Tunnels (no active tunnel)** > **Create a Tunnel...**.

    :::image type="content" source="../assets/images/include-files/create-tunnel.png" alt-text="Screenshot shows the dropdown to select the dev tunnels.":::

    A pop-up window appears.

1. Update the following details in the pop-up window:

    1. **Account**: Enter a Microsoft or GitHub account.
    1. **Name**: Enter a name for your tunnel.
    1. **Tunnel Type**: From the dropdown list, select **Temporary**.
    1. **Access**: From the dropdown list, select **Public**.

1. Select **OK**.

    :::image type="content" source="../assets/images/include-files/create-tunnel-details.png" alt-text="Screenshot shows the details to update for creation of tunnel.":::

    A pop-up window appears showing that dev tunnel is successfully created.

1. Select **OK**.

    :::image type="content" source="../assets/images/include-files/tunnel-created.png" alt-text="Screenshot shows the pop-up message that the tunnel is created.":::

    You can find the tunnel you've created in the debug dropdown list as follows:

    :::image type="content" source="../assets/images/include-files/tunnel-active.png" alt-text="Screenshot shows the tunnel is active and selected.":::

1. Select **F5** to run the application in the debug mode.

1. If a **Security Warning** dialog appears, select **Yes**.

    :::image type="content" source="../assets/images/include-files/security-warning.png" alt-text="Screenshot shows the dialog box to accept the security warning.":::

    A pop-up window appears.

1. Select **Continue**.

    :::image type="content" source="../assets/images/include-files/developer-tunnel.png" alt-text="Screenshot shows the url for the tunnel.":::

    The dev tunnel home page opens in a new browser window and the dev tunnel is now active.

    :::image type="content" source="../assets/images/include-files/developer-tunnel-web.png" alt-text="Screenshot shows the dev tunnel welcome page in browser.":::

1. Go to Visual Studio, select **View > Output**.

1. From the **Output** console dropdown menu, select **Dev Tunnels**.

    The **Output** console shows the dev tunnel URL.

    :::image type="content" source="../assets/images/include-files/output-console-url.png" alt-text="Screenshot shows the url in the Visual Studio output console.":::

# [ngrok](#tab/ngrok)

Use ngrok or Command Prompt to create a tunnel to your locally running web server's publicly available HTTPS endpoints. Run the following command in ngrok:

```bash
ngrok http --host-header=localhost 3978
```

> [!TIP]
> If you encounter **ERR_NGROK_4018**, follow the steps provided in the Command Prompt to sign up and authenticate ngrok. Then run the `ngrok http --host-header=localhost 3978` command.

The window shows the HTTPS URL.

 :::image type="content" source="../assets/images/include-files/ngrok-url.png" alt-text="Screenshot shows the ngrok HTTPS URL.":::

---

#### Add web authentication

1. In the left pane, under **Manage**, select **Authentication**.

1. Select **Add a platform** > **Web**.

   :::image type="content" source="../assets/images/include-files/platform-web.png" alt-text="Screenshot shows the selection of web authentication.":::

1. Enter the redirect URI for your app by appending `auth-end` to the fully qualified domain name. For example, `https://your-devtunnel-domain/auth-end` or `https://your-ngrok-domain/auth-end`.

1. Under **Implicit grant and hybrid flows**, select the **Access tokens** and **ID tokens** checkboxes.

1. Select **Configure**.

   :::image type="content" source="../assets/images/include-files/configure-web.png" alt-text="Screenshot shows the option to add redirect URI and select implicit grant and hybrid flows.":::

1. Under **Web**, select **Add URI**.

1. Enter `https://token.botframework.com/.auth/web/redirect`.

1. Select **Save**.

    :::image type="content" source="../assets/images/include-files/web-add-uri.png" alt-text="Screenshot shows the option to add the redirect URI and select implicit grant and hybrid flows.":::

#### Create a client secret

> [!NOTE]
> If you encounter the error **Client secrets are blocked by tenant-wide policy. Contact your tenant administrator for more information.**, you can create a certificate instead. For step-by-step instructions, refer to [create a certificate for app registration.](/graph/auth-register-app-v2#add-credentials)

1. In the left pane, under **Manage**, select **Certificates & secrets**.

1. Under **Client secrets**, select **+ New client secret**.

    :::image type="content" source="../assets/images/include-files/new-client-secret.png" alt-text="Screenshot show the selection of new client secret.":::

    The **Add a client secret** window appears.

1. Enter **Description**.

1. Select **Add**.

    :::image type="content" source="../assets/images/include-files/add-client-secret.png" alt-text="Screenshot show the client secret description option to add.":::

1. Under **Value**, select **Copy to clipboard** to save the client secret value for further use.

    :::image type="content" source="../assets/images/include-files/client-secret-value.png" alt-text="Screenshot show the option to copy the client secret ID value to copy value to clipboard.":::

#### Add API permissions

1. In the left pane, select **API permissions**.

1. Select **+ Add a permission**.

   :::image type="content" source="../assets/images/teams-file-upload-bot/add-api-permission.png" alt-text="Screenshot shows the option to select Add permission.":::

1. Select **Microsoft Graph**.

1. Select **Delegated permissions**.

1. Select **User** > **User.Read**.

1. Select **Add permissions**.

   :::image type="content" source="../assets/images/teams-file-upload-bot/select-api-permission.png" alt-text="Screenshot shows the option to select permissions.":::

    > [!NOTE]
    >
    > * If an app isn't granted IT admin consent, users must provide consent the first time they use an app.
    > * Users need to consent to the API permissions only if the Microsoft Entra app is registered in a different tenant.

#### Add application ID URI

1. In the left pane, under **Manage**, select **Expose an API**.

1. Next to **Application ID URI**, select **Add**.

   :::image type="content" source="../assets/images/bots/expose-api-add-uri.png" alt-text="Screenshot shows the option to add Application ID URI for your app.":::

1. Update the **Application ID URI** in the `api://botid-{AppID}` format and select **Save**.

   :::image type="content" source="../assets/images/bots/app-id-uri1.png" alt-text="Screenshot shows the option to add the app ID URI and save.":::

#### Add a scope

1. In the left pane, under **Manage**, select **Expose an API**.

1. Select **+ Add a scope**.

   :::image type="content" source="../assets/images/include-files/select-add-scope.png" alt-text="Screenshot shows the selection to Add a Scope.":::

1. Enter **access_as_user** as the **Scope name**.

1. Under **Who can consent?**, select **Admins and users**.

1. Update the values for the rest of the fields as follows:

   * Enter **Teams can access the user’s profile** as **Admin consent display name**.

   * Enter **Allows Teams to call the app’s web APIs as the current user** as **Admin consent description**.

   * Enter **Teams can access the user profile and make requests on the user’s behalf** as **User consent display name**.

   * Enter **Enable Teams to call this app’s APIs with the same rights as the user** as **User consent description**.

1. Ensure that **State** is set to **Enabled**.

1. Select **Add scope**.

   The following image shows the fields and the values:

   :::image type="content" source="../assets/images/include-files/set-add-scope.png" alt-text="Screenshot shows the values filled in the field to Add a scope.":::

   > [!NOTE]
   > The **Scope name** must match with the **Application ID** URI with `/access_as_user` appended at the end.

    <!--  `api://d4b8****.ngrok.io/00000000-0000-0000-0000-000000000000/access_as_user`-->  

   :::image type="content" source="../assets/images/include-files/add-scope.png" alt-text="Screenshot shows the details in Scopes.":::

#### Add client application

1. In the left pane, under **Manage**, select **Expose an API**.

   Under **Authorized client applications**, identify the applications that you want to authorize for your app’s web application.

1. Select **+ Add a client application**.

   :::image type="content" source="../assets/images/include-files/add-client-application.png" alt-text="Screenshot shows the option to Select client application.":::

1. Add Teams mobile or desktop and Teams web application.

    1. For Teams mobile or desktop: Enter the **Client ID** as `1fec8e78-bce4-4aaf-ab1b-5451cc387264`.

       :::image type="content" source="../assets/images/include-files/client-id-mobile-desktop.png" alt-text="Screenshot shows the mobile or desktop Client ID application.":::

    1. For Teams web: Enter the **Client ID** as `5e3ce6c0-2b1f-4285-8d4b-75ee78787346`.

       :::image type="content" source="../assets/images/include-files/client-id-web.png" alt-text="Screenshot shows the web Client ID application.":::

1. Select the **Authorized scopes** checkbox.

1. Select **Add application**.

   :::image type="content" source="../assets/images/include-files/authorized-scope-add.png" alt-text="Screenshot shows the option to select authorized scopes and add application.":::

   The following image displays the **Client Id**:

   :::image type="content" source="../assets/images/include-files/add-client-application-output.png" alt-text="Screenshot shows the output of Client applications.":::

### Create your bot

#### Create an Azure bot resource

> [!NOTE]
> If you're already testing your bot in Teams, sign out of this app and Teams. To see this change, sign in again.

1. Go to **Home**.
1. Select **+ Create a resource**.
1. In the search box, enter **Azure Bot**.
1. Select **Enter**.
1. Select **Azure Bot**.
1. Select **Create**.

    :::image type="content" source="../assets/images/include-files/azure-bot.png" alt-text="Screenshot shows the creation of Azure bot.":::

1. Enter the bot name in **Bot handle**.
1. Select your **Subscription** from the dropdown list.
1. Select your **Resource group** from the dropdown list.

    :::image type="content" source="../assets/images/include-files/create-azure-bot.png" alt-text="Screenshot shows the option resource group and subscription in the Azure portal.":::

    If you don't have an existing resource group, you can create a new resource group. To create a new resource group, follow these steps:

    1. Select **Create new**.
    1. Enter the resource name and select **OK**.
    1. Select a location from **New resource group location** dropdown list.

    :::image type="content" source="../assets/images/include-files/new-resource-location.png" alt-text="Screenshot shows the new resource group option in Azure portal.":::

1. Under **Pricing**, select **Change plan**.

    :::image type="content" source="../assets/images/include-files/pricing-tier.png" alt-text="Screenshot shows the pricing option in Azure portal.":::

1. Select **FO Free** > **Select**.

    :::image type="content" source="../assets/images/include-files/pricing-free.png" alt-text="Screenshot shows the option to select free.":::

1. Under **Microsoft App ID**, select **Type of App** as **Multi Tenant**.

1. In the **Creation type**, select **Use existing app registration**.

1. Enter the **App ID**.

   <!-- You can also select **Use existing app registration** and enter existing **App ID**, **App tenant ID**, and **MSI resource ID**. -->

    > [!NOTE]
    > You can't create more than one bot with the same **Microsoft App ID**.

1. Select **Review + create**.

    :::image type="content" source="../assets/images/include-files/review-create-app-id.png" alt-text="Screenshot shows the creation of new bot.":::

1. After the validation passes, select **Create**.

    The bot takes a few minutes to provision.

1. Select **Go to resource**.

    :::image type="content" source="../assets/images/include-files/resource-deployment.png" alt-text="Screenshot shows the Go to resource option in the Azure portal.":::

    You've successfully created your Azure bot.

    :::image type="content" source="../assets/images/include-files/azure-bot-created-output.png" alt-text="Screenshot shows the output of a bot.":::

### Add a Teams channel

1. In the left pane, select **Channels**.
1. Under **Available Channels**, select **Microsoft Teams**.

    :::image type="content" source="../assets/images/include-files/channels-teams.png" alt-text="Screenshot shows the selection of Teams in channels.":::

1. Select the checkbox to accept the **Terms of Service**.

1. Select **Agree**.

    :::image type="content" source="../assets/images/include-files/terms-service.png" alt-text="Screenshot shows the acceptance of terms of service.":::

1. Select **Apply**.

    :::image type="content" source="../assets/images/include-files/teams-apply.png" alt-text="Screenshot shows the Microsoft Teams as messaging to apply.":::

#### Add a messaging endpoint

Use one of the following ways to add a messaging endpoint:

# [dev tunnel](#tab/dev)

1. Use the dev tunnel URL in the **Output** console as the messaging endpoint.

    :::image type="content" source="../assets/images/include-files/output-console-url.png" alt-text="Screenshot shows the url in the Visual studio output console.":::

1. In the left pane, under **Settings**, select **Configuration**.

1. Update the **Messaging endpoint** in the format `https://your-devtunnel-domain/api/messages`.

    :::image type="content" source="../assets/images/include-files/devtunnels-messaging-endpoint.png" alt-text="Screenshot shows the messaging endpoint adding api.":::

1. Select **Apply**.

    You've successfully set up a bot in Azure Bot service.

    > [!NOTE]
    > If the **Application Insights Instrumentation key** shows an error, update with **App ID**.

# [ngrok](#tab/ngrok)

1. From ngrok, copy the HTTPS URL.

    :::image type="content" source="../assets/images/include-files/ngrok-url.png" alt-text="Screenshot shows the ngrok HTTPS URL.":::

    > [!NOTE]
    > The HTTPS URL in your ngrok is a fully qualified domain name.
    > The `WebAppDomain` is a fully qualified domain name that doesn't include `https://` in it.

1. In the left pane, under **Settings**, select **Configuration**.

1. Update the **Messaging endpoint** in the format `https://your-ngrok-domain/api/messages`.

    :::image type="content" source="../assets/images/include-files/ngrok-messaging-endpoint.png" alt-text="Screenshot shows the messaging endpoint adding api.":::

1. Select **Apply**.

    You have successfully set up a bot in Azure Bot service.

    > [!NOTE]
    > If the **Application Insights Instrumentation key** shows an error update with **App ID**.

---

### Set up app settings and manifest files

1. Go to the **appsettings.json** file in the cloned repository.

   :::image type="content" source="~/assets/images/teams-file-upload-bot/appsettings-file-location-bot-sso.png" alt-text="Screenshot shows the location of appsettings json file.":::

1. Open the **appsettings.json** file and update the following information:

   * Set `"MicrosoftAppId"` to your bot's **Microsoft App ID**.
   * Set `"MicrosoftAppPassword"` to your bot's client secret ID **value**.
   * Set `ConnectionName` as OAuth connection name.
   * Set `"MicrosoftAppType"` to **MultiTenant**.
   * Set `"MicrosoftAppTenantId"` to **common**.

   :::image type="content" source="~/assets/images/teams-file-upload-bot/appsettings-json-bot-sso.png" alt-text="Screenshot shows the appsettings json.":::

1. Go to the **manifest.json** file in the cloned repository.

   :::image type="content" source="../assets/images/teams-file-upload-bot/manifest-file-location.png" alt-text="Screenshot shows the selection of manifest json file.":::

1. Open the **manifest.json** file and update the following changes:

   * Replace all occurrences of `"{TODO: MicrosoftAppId}"` with your **Microsoft App ID**.
   * Set `"<<domain-name>>"` to your ngrok or dev tunnel domain.

   :::image type="content" source="../assets/images/teams-file-upload-bot/manifest-bot-id-botsso.png" alt-text="Screenshot shows the details filled in the manifest file in visual studio.":::

### Build and run the service

To build and run the service, use Visual Studio or Command line.

# [Visual Studio](#tab/vs2019)

1. Open Visual Studio.

1. Go to **File** > **Open** > **Project/Solution....**.

    :::image type="content" source="./assets/images/sbs-messagingextension-action/VSopenfile.png" alt-text="Screenshot of Visual Studio with the Project/Solution highlighted in red.":::

1. From **csharp** folder, select the **TeamsMessagingExtensionsAction.csproj** file.

    :::image type="content" source="./assets/images/sbs-messagingextension-action/openproject.png" alt-text="Screenshot of cloned repository with the TeamsMessagingExtensionsAction.csproj highlighted in red.":::

1. Press **F5** to run the project.

1. Select **Yes** if the following dialog appears:

    :::image type="content" source="./assets/images/sbs-messagingextension-action/certificate.png" alt-text="Screenshot of Security Warning with the Yes option highlighted in red.":::

    A webpage appears with a message **Your bot is ready!**.

    :::image type="content" source="./assets/images/sbs-messagingextension-action/appisready.png" alt-text="Screenshot of the webpage that displays Your bot is ready!.":::

# [Command line](#tab/cli)

Go to **samples** > **msgext-action** > **csharp** in Command Prompt window and enter the following command:

```bash
    dotnet run
```

:::image type="content" source="./assets/images/sbs-messagingextension-action/dotnetruncmd.png" alt-text="Screenshot of Command Prompt - dotnet run with the dotnet run command.":::

---

### Add Action Message Extension app to Teams

1. In your cloned repository, go to **samples** > **msgext-action** > **csharp** > **TeamsAppManifest**.

1. Create a .zip with the following files that are present in the **Manifest** folder:
    * manifest.json
    * icon-outline.png
    * icon-color.png

    :::image type="content" source="../assets/images/sbs-messagingextension-action/zipfile.png" alt-text="Screenshot of cloned repository with the Messaging extension zip file highlighted in red.":::

1. In the Teams client, select the **Apps** icon.

1. Select **Manage your apps**.

1. Select **Upload an app**.

1. Look for the option to **Upload a custom app**. If you see the option, custom app upload is enabled.

    :::image type="content" source="../assets/images/tab-device-permission/custom-upload.png" alt-text="Screenshot shows the upload a custom app.":::

    > [!NOTE]
    > Contact your Teams administrator, if you don't find the option to upload a custom app.

1. Select **Open** to upload the messaging.zip file that you created in the TeamsAppManifest folder.

    :::image type="content" source="../assets/images/sbs-messagingextension-action/openzipfile.png" alt-text="Screenshot of the cloned repository displaying the messaging zip file.":::

1. Select **Add**.

    :::image type="content" source="../assets/images/sbs-messagingextension-action/add-app.png" alt-text="Screenshot of the app details dialog to add the message extension app.":::

1. Select **Open** to open the app in personal scope.

    Alternatively, you can either search and select the required scope or select a channel, chat, or meeting from the list, and move through the dialog to select **Go**.

    :::image type="content" source="../assets/images/sbs-messagingextension-action/add-scope.png" alt-text="Screenshot of the scope selection dialog to select the required scope.":::

### Interact with the app in Teams

1. Select **Create Card** command from the compose box command list.

   :::image type="content" source="../assets/images/sbs-messagingextension-action/create-card.png" alt-text="Screenshot of message compose box overflow menu with Create Card highlighted in red.":::

1. Enter your information in the modal pop-up window.

   :::image type="content" source="../assets/images/sbs-messagingextension-action/output-card.png" alt-text="The Screenshot shows the Create Card model pop-up of the Action Messaging Extension.":::

1. Select **Submit**.

   :::image type="content" source="../assets/images/sbs-messagingextension-action/submit.png" alt-text="Screenshot of Create Card model pop-up with the Submit option highlighted in red.":::

1. Select More options (...) from the overflow menu.

1. Select **More actions** > **Share Message**.

   :::image type="content" source="../assets/images/sbs-messagingextension-action/sharemessage.png" alt-text="Screenshot shows the message overflow menu. The Share Message and More actions are highlighted in red.":::

1. If you want to include an image, select the **Include image in Hero Card** checkbox and then select **Submit**.

   :::image type="content" source="../assets/images/sbs-messagingextension-action/sharemessageoutput.png" alt-text="Screenshot of Action Messaging Extension with the include image in Hero Card checkbox and Submit option highlighted in red.":::

### Complete challenge

Did you come up with something like this?

:::image type="content" source="../assets/images/sbs-messagingextension-action/sharemessageoutput1.png" alt-text="Screenshot of the message extension output after you have successfully completed the step-by-step guide.":::

You've completed the tutorial to get started with a **Action Message Extension** app!
