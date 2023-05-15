---
title: Debug your Teams app v4
author: surbhigupta 
description: In this module, learn how to debug your Teams app, and key features of Teams Toolkit v4.
ms.author: surbhigupta 
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/21/2022
zone_pivot_groups: teams-app-platform
---

# Debug your Teams app v4

> [!IMPORTANT]
>
> We've introduced the Teams Toolkit v5 extension within Visual Studio Code. This version comes to you with many new app development features. We recommend that you use Teams Toolkit v5 for building your Teams app.
>
> [Teams Toolkit v4](~/toolkit-v4/teams-toolkit-fundamentals-v4.md) extension will soon be deprecated.

Teams Toolkit helps you to debug and preview your Microsoft Teams app. Debug is the process of checking, detecting, and correcting issues or bugs to ensure the program runs successfully in Teams.

::: zone pivot="visual-studio-code"

## Debug your Teams app for Visual Studio Code

Teams Toolkit in Microsoft Visual Studio Code automates the debug process. You can detect errors and fix them as well as preview the teams app. You can also customize debug settings to create your tab or bot.

During the debug process:

* Teams Toolkit automatically starts app services, launches debuggers, and sideloads the Teams app.
* Teams Toolkit checks the prerequisites during the debug background process.
* Your Teams app is available for preview in Teams web client locally after debugging.
* You can also customize debug settings to use your bot endpoints, development certificate, or debug partial component to load your configured app.
* Visual Studio Code allows you to debug tab, bot, message extension, and Azure Functions.

## Key debug features of Teams Toolkit

Teams Toolkit supports the following debug features:

* [Start debugging](#start-debugging)
* [Multi-target debugging](#multi-target-debugging)
* [Toggle breakpoints](#toggle-breakpoints)
* [Hot reload](#hot-reload)
* [Stop debugging](#stop-debugging)

Teams Toolkit performs background functions during debug process, which include verifying the prerequisites required for debug. You can see the progress of the verification process in the output channel of Teams Toolkit. In the setup process you can register and configure your Teams app.

### Start debugging

You can press **F5** as a single operation to start debugging. Teams Toolkit starts to check prerequisites, registers Microsoft Azure Active Directory (Azure AD) app, Teams app, and registers bot, starts services, and launches browser.

### Multi-target debugging

Teams Toolkit utilizes multi-target debugging feature to debug tab, bot, message extension, and Azure Functions at the same time.

### Toggle breakpoints

You can toggle breakpoints on the source codes of tabs, bots, message extensions, and Azure Functions. The breakpoints execute when you interact with the Teams app in a web browser. The following image shows toggle breakpoint:

   :::image type="content" source="images/toggle-points-v4.png" alt-text="toggle breakpoints":::

### Hot reload

You can update and save the source codes of tab, bot, message extension, and Azure Functions at the same time when you're debugging the Teams app. The app reloads and the debugger reattach to the programming languages.

   :::image type="content" source="images/hot-reload-v4.png" alt-text="hot-reload for source codes" lightbox="images/hot-reload-v4.png":::

### Stop debugging

When you complete local debug, you can select **Stop (Shift+F5)** or **[Alt] Disconnect (Shift+F5)** from the floating debugging toolbar to stop all debug sessions and terminate tasks. The following image shows the stop debug action:

   :::image type="content" source="images/stop-debug-v4.png" alt-text="stop debugging":::

## Prepare for debug

The following steps help you to prepare for debug:

### Sign in to Microsoft 365

If you've signed up for Microsoft 365 already, sign in to Microsoft 365. For more information, see [Microsoft 365 developer program](tools-prerequisites-v4.md#microsoft-365-developer-program)

### Toggle breakpoints

Ensure that you can toggle breakpoints on the source codes of tabs, bots, message extensions, and Azure Functions for more information, see [Toggle breakpoints](#toggle-breakpoints)

## Customize debug settings

Teams Toolkit allows you to customize the debug settings to create your tab or bot. For more information on the full list of customizable options, see [debug settings doc](https://aka.ms/teamsfx-debug-tasks).

You can also customize debug settings for your existing bot app.
<br>

<details>

<summary><b>Learn how to use an existing bot for debugging</b></summary>

To use an existing bot, you can set it up using its `botId` and `botPassword` arguments in Set up bot task. This task is to register resources and prepare local launch information for Bot.

Use the following code snippet example to setup an existing bot for debugging:

```json
{
    "label": "Set up Bot",
    "type": "teamsfx",
    "command": "debug-set-up-bot",
    "args": {
        //// Use your own AAD App for bot
        // "botId": "",
        // "botPassword": "", // use plain text or environment variable reference like ${env:BOT_PASSWORD}
        "botMessagingEndpoint": "api/messages"
    }
}
```

1. Update `botId` with the Azure AD app client id for your existing bot.
1. Update `botPassword` with the Azure AD app client secret for your bot.

</details>

### Customize Scenarios

Here's a list of debug scenarios that you can use:
<br>
<details>

<summary><b>Skip prerequisite checks</b></summary>

In `.fx/configs/tasks.json` under `"Validate & install prerequisites"` > `"args"` > `"prerequisites"`, update the prerequisite checks you wish to skip.

  :::image type="content" source="images/skip-prerequisite-checks-v4.png" alt-text="skip the prerequisite checks":::

</details>

<details>
<summary><b>Use your development certificate</b></summary>

1. In `.fx/configs/tasks.json`, uncheck `"devCert"` under `"Validate & install prerequisites"` > `"args"` > `"prerequisites"`.
1. Set "SSL_CRT_FILE" and "SSL_KEY_FILE" in `.env.teamsfx.local` to your certificate file path and key file path.

</details>

<details>
<summary><b>Customize npm install args</b></summary>

In `.fx/configs/tasks.json`, set npmInstallArgs under `"Install npm packages"`.
  
   :::image type="content" source="images/customize-npm-install-v4.png" alt-text="Install npm package":::

</details>

<details>
<summary><b>Modify ports</b></summary>

* Bot
  1. Search for `"3978"` across your project and look for appearances in `tasks.json`, `ngrok.yml` and `index.js`.
  1. Replace it with your port.
     :::image type="content" source="images/modify-ports-bot-v4.png" alt-text="Replace your port for bot":::
* Tab
  1. In `.fx/configs/tasks.json`, search for `"53000"`.
  1. Replace it with your port.
     :::image type="content" source="images/modify-ports-tab-v4.png" alt-text="Replace your port for tab":::

</details>

<details>
<summary><b>Use your own app package</b></summary>

In `.fx/configs/tasks.json`, set `"appPackagePath"` under `"Build & upload Teams manifest"` to your app package's path.

  :::image type="content" source="images/app-package-path-v4.png" alt-text="use your own app package path":::

</details>

<details>
<summary><b>Use your own tunnel</b></summary>

1. In `.fx/configs/tasks.json` under `"Start Teams App Locally"`, you can update `"Start Local tunnel"`.

   :::image type="content" source="images/start-local-tunnel-v4.png" alt-text="Use your own tunnel":::
1. Launch your own tunnel service then update `"botMessagingEndpoint"` to your own message endpoint in `.fx/configs/tasks.json` under `"Set up bot"`.

   :::image type="content" source="images/set-up-bot-v4.png" alt-text="update messaging endpoint":::

</details>

<details>

<summary><b>Add environment variables</b></summary>

You can add environment variables to `.env.teamsfx.local` file for tab, bot, message extension, and Azure Functions. Teams Toolkit loads the environment variables you added to start services during local debug.

 > [!NOTE]
 > Ensure to start a new local debug after you add new environment variables, as the environment variables don't support hot reload.

</details>

<details>
<summary><b>Debug partial component</b></summary>

Teams Toolkit utilizes Visual Studio Code multi-target debugging to debug tab, bot, message extension, and Azure Functions at the same time. You can update `.vscode/launch.json` and `.vscode/tasks.json` to debug partial component. If you want to debug tab only in a tab plus bot with Azure Functions project, use the following steps:

1. Update `"Attach to Bot"` and `"Attach to Backend"` from debug compound in `.vscode/launch.json`.

   ```json
   {
       "name": "Debug (Edge)",
        "configurations": [
           "Attach to Frontend (Edge)",
           // "Attach to Bot",
           // "Attach to Backend""
           ],
           "preLaunchTask": "Pre Debug Check & Start All",
           "presentation": {
               "group": "all",
               "order": 1
           },
           "stopAll": true

   }
   ```

2. Update `"Start Backend"` and `"Start Bot"` from Start All task in .vscode/tasks.json.

   ```json
   {
                                           
       "label": "Start All",
       "dependsOn": [
           "Start Frontend",
             // "Start Backend",
             // "Start Bot"

         ]
              
   }
   ```

</details>

::: zone-end

::: zone pivot="visual-studio"

## Debug your Teams app using Visual Studio

Teams Toolkit automates app startup services, initiates debug, and side loads Teams app. After debug, you can preview the Teams app in Teams web client. You can also customize debug settings to use your bot endpoints, or environment variables to load your configured app. Visual Studio allows you to debug tab, bot, and message extension. During the debug process, Teams Toolkit supports the following debug features:

* Prepare Teams app dependencies
* Start debugging
* Toggle breakpoints
* Hot reload
* Stop debugging

## Prerequisites

| &nbsp; | Install | For using... |
| --- | --- | --- |
| &nbsp; | **Required** | &nbsp; |
| &nbsp; | Visual Studio 2022 version 17.3 | You can install the enterprise edition of Visual Studio, and install the "ASP.NET "workload and Microsoft Teams Development Tools. |
| &nbsp; | Teams Toolkit | A Visual Studio extension that creates a project scaffolding for your app. Use latest version. |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings, call - all in one place. |
| &nbsp; | [Prepare your Microsoft 365 tenant](~/concepts/build-and-test/prepare-your-o365-tenant.md) | Access to Teams account with the appropriate permissions to install an app. |
| &nbsp; | [Microsoft 365 developer account](~/concepts/build-and-test/prepare-your-o365-tenant.md) | Access to Teams account with the appropriate permissions to install an app. |
| &nbsp; | Azure Tools and [Microsoft Azure CLI](/cli/azure/install-azure-cli) | Azure tools to access stored data or to deploy a cloud-based backend for your Teams app in Azure. |
|&nbsp;  | **Optional** | &nbsp; |
|&nbsp; |[Ngrok](https://ngrok.com/) | Ngrok is used to forward external messages from Azure Bot Framework to your local machine.|

## Key features of Teams Toolkit

You can see the following key features of Teams Toolkit, that automates the local debugging process of your Teams app:

### Prepare Teams app dependencies

Teams Toolkit prepares local debug dependencies and registers your Teams app in the tenant in your account. For Bot and Message Extension apps, Teams Toolkit will register and configure bot.

### Start debugging

You can perform debugging with a single operation, press **F5** to start debugging. Teams Toolkit builds code, starts services, and launches the app in your browser.

### Toggle breakpoints

You can toggle breakpoints in the source codes of tabs, bots, message extensions, and Azure Functions. The breakpoints execute when you interact with the Teams app in your web browser.
The following image shows the toggle breakpoints:

:::image type="content" source="images/vs-localdebug-toggle-breakpoint-v4.png" alt-text="Local debug toggle breakpoints" lightbox="images/vs-localdebug-toggle-breakpoint-v4.png":::

### Hot reload

Select **Hot Reload** to apply your changes in your Teams app when you want to update and save the source codes simultaneously during debugging.

:::image type="content" source="images/vs-localdebug-hot-reload-v4.png" alt-text="Select hot reload icon":::

Select the option **Hot Reload on File Save** from the drop-down to enable auto hot reload.

:::image type="content" source="images/vs-localdebug-hot-reload-filesave-v4.png" alt-text="Select hot reload on file save":::
  
   > [!Tip]
   > To learn more about Hot Reload function of Visual Studio during debug you can visit <https://aka.ms/teamsfx-vs-hotreload>.

### Stop debugging

Select **Stop Debugging (Shift+F5)** when the local debug is complete.

:::image type="content" source="images/vs-localdebug-Stopdebug-v4.png" alt-text="Select stop debug icon":::

## Customize debug settings

You can customize debug setting for your Teams app to use your bot endpoints and add environment variables:

### Use your bot endpoint

You can set `siteEndpoint` configuration in the `.fx/configs/config.local.json` file to your endpoint.

```JSON
"bot": {
    "siteEndpoint": "https://baidu.com"
}
```

### Add environment variables

You can add `environmentVariables` to `launchSettings.json` file.

:::image type="content" source="images/vs-localdebug-environment-variables-v4.png" alt-text="Add custom environment variables":::

### Launch Teams app as a web app

You can launch Teams app as a web app instead of running in Teams client.

1. Select **Properties** > **launchSettings.json** in Solution Explorer panel under your project.
1. Remove the `launchUrl` from the file.

   :::image type="content" source="images/vs-localdebug-launch-teamsapp-webapp-v4.png" alt-text="Launch teams as a web app by removing launchurl" lightbox="images/vs-localdebug-launch-teamsapp-webapp-v4.png":::

1. Right-click on **Solution** and select **Properties**.

   :::image type="content" source="images/vs-localdebug-solution-properties-v4.png" alt-text="Right click solution and select properties" lightbox="images/vs-localdebug-solution-properties-v4.png":::

1. Select **Configuration Properties** > **Configuration** in the dialog box.
1. Clear the **Deploy** checkbox.
1. Select **OK**.

   :::image type="content" source="images/vs-localdebug-disable-deploy-v4.png" alt-text="Uncheck deploy in configuration properties" lightbox="images/vs-localdebug-disable-deploy-v4.png":::

::: zone-end

## Next

> [!div class="nextstepaction"]
> [Debug your app locally](debug-local-v4.md)

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals-v4.md)
* [Debug background process](debug-background-process-v4.md)
* [Use Teams Toolkit to provision cloud resources](provision-v4.md)
* [Deploy to the cloud](deploy-v4.md)
* [Preview and customize Teams app manifest](TeamsFx-preview-and-customize-app-manifest-v4.md)
