---
title: Debug your Teams app 
description: In this module, learn how to debug your Teams app in Teams Toolkit and key features of Teams Toolkit
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/21/2022
---

# Debug your Teams app

Teams Toolkit helps you to debug and preview your Teams app. Debug is the process of checking, detecting, and correcting issues or bugs to ensure the program runs successfully.

* During the debug process, Teams Toolkit automatically starts app services, launches debuggers, and sideloads the Teams app.
* The Teams app is available for preview in Teams web client locally after debugging.
* You can also customize debug settings to use your bot endpoints, development certificate, or debug partial component to load your configured app.
* Visual Studio Code allows you to debug tab, bot, message extension, and Azure Functions.

## Key features of Teams Toolkit

Teams Toolkit supports the following debug features:

* [Start debugging](#start-debugging)
* [Multi-target debugging](#multi-target-debugging)
* [Toggle breakpoints](#toggle-breakpoints)
* [Hot reload](#hot-reload)
* [Stop debugging](#stop-debugging)

### Start debugging

You can perform single operation, press **F5** to start debugging. The Teams Toolkit starts to check prerequisites, registers Azure AD app, Teams app, and registers bot, starts services, and launches browser.

### Multi-target debugging

Teams Toolkit utilizes multi-target debugging feature to debug tab, bot, message extension, and Azure Functions at the same time.

### Toggle breakpoints

You can toggle breakpoints on the source codes of tabs, bots, message extensions, and Azure Functions. The breakpoints execute when you interact with the Teams app in a web browser. The following image shows the toggle breakpoints:

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/toggle-points.png" alt-text="toggle breakpoints":::

### Hot reload

You can update and save the source codes of tab, bot, message extension, and Azure Functions at the same time when you are debugging the Teams app. The app reloads and the debugger reattaches to the programming languages.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/hot-reload.png" alt-text="hot-reload for source codes":::

### Stop debugging

When you complete local debug, you can select **Stop** or **Disconnect** from the floating debugging toolbar to stop all debug sessions and terminate tasks. The following image shows the stop debug action:

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/stop-debug.png" alt-text="stop debugging":::

## Prepare for debug

The following steps helps you to prepare for debug.

### Login to M365

If you've signed up for M365 already, log-in to M365. For more information, see [Microsoft 365 developer program](tools-prerequisites.md#microsoft-365-developer-program)

### Toggle breakpoints

Ensure that you can toggle breakpoints on the source codes of tabs, bots, message extensions, and Azure Functions for more information, see [Toggle breakpoints](#toggle-breakpoints)

### Customize debug settings

Teams Toolkit unchecks some prerequisites and allows you to customize the debug settings to create your tab or bot:

<br>

<details>
<summary><b>Use your bot endpoint</b></summary>

1. In Visual Studio Code settings, clear **Ensure Ngrok is installed and started (ngrok)**.

1. Set `siteEndpoint` configuration in `.fx/configs/config.local.json` to your endpoint.

```json
{
    "bot": {
        "siteEndpoint": "https://your-bot-tunneling-url"
    }
}

```

:::image type="content" source="../assets/images/teams-toolkit-v2/debug/bot-endpoint.png" alt-text="Customize bot endpoint":::

</details>

<details>
<summary><b>Use your development certificate</b></summary>

1. In Visual Studio Code settings, clear **Ensure development certificate is trusted (devCert)**.

1. Set `sslCertFile` and `sslKeyFile` configuration in `.fx/configs/config.local.json` to your certificate file path and key file path.

```json
{
    "frontend": {
        "sslCertFile": "",
        "sslKeyFile": ""
    }
}
```

:::image type="content" source="../assets/images/teams-toolkit-v2/debug/development-certificate-customize.png" alt-text="Customize certificate":::

</details>

<details>
<summary><b>Use your start scripts to start app services</b></summary>

1. For tab, update `dev:teamsfx` script in `tabs/package.json`.

1. For bot or message extension, update `dev:teamsfx` script in `bot/package.json`.

1. For Azure Functions, update `dev:teamsfx` script in `api/package.json` and for TypeScript update `watch:teamsfx` script.

   > [!NOTE]
   > Currently, the tab, bot, message extension apps, and Azure Functions ports don't support customization.

</details>

<details>
<summary><b>Add environment variables</b></summary>

You can add environment variables to `.env.teamsfx.local` file for tab, bot, message extension, and Azure Functions. Teams Toolkit loads the environment variables you added to start services during local debug.

 > [!NOTE]
 > Ensure to start a new local debug after you add new environment variables as the environment variables don't support hot reload.

</details>

<details>
<summary><b>Debug partial component</b></summary>

Teams Toolkit utilizes Visual Studio Code multi-target debugging to debug tab, bot, message extension, and Azure Functions at the same time. You can update `.vscode/launch.json` and `.vscode/tasks.json` to debug partial component. If you want to debug tab only in a tab plus bot with Azure Functions project, use the following steps:

1. Comment **Attach to Bot** and **Attach to Backend** from debug compound in `.vscode/launch.json`.

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

2. Comment **Start Backend** and Start Bot from Start All task in .vscode/tasks.json.

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

## See also

* [Debug your app locally](debug-local.md)
* [Debug background process](debug-background-process.md)
