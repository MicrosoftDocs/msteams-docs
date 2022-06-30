---
title: Debug your Teams app 
description: In this module, learn how to debug your Teams app locally in Teams Toolkit and key features of Teams Toolkit
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/21/2022
---

# Debug your Teams app locally

Teams Toolkit helps you to debug and preview your Teams app locally. Debug is the process of checking, detecting, and correcting issues or bugs to ensure the program runs successfully. Visual Studio Code allows you to debug tab, bot, message extension, and Azure Functions. Teams Toolkit supports the following debug features:

* [Start debugging](#start-debugging)
* [Multi-target debugging](#multi-target-debugging)
* [Toggle breakpoints](#toggle-breakpoints)
* [Hot reload](#hot-reload)
* [Stop debugging](#stop-debugging)  

During the debug process, Teams Toolkit automatically starts app services, launches debuggers, and sideloads the Teams app. The Teams app is available for preview in Teams web client locally after debugging. You can also customize debug settings to use your bot endpoints, development certificate, or debug partial component to load your configured app.

## Prerequisite

Install the [latest version of Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension).

## Key features of Teams Toolkit

The following list provides the key features of Teams Toolkit:

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

## Debug your app locally

The following steps help you to debug your Teams app locally:

### Set up your Teams Toolkit

Perform the following steps to debug your app after you create a new app using the Teams Toolkit:

# [Windows](#tab/Windows)

1. Select **Debug Edge** or **Debug Chrome** from the **Run and Debug** in the activity bar.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/debug-run.png" alt-text="Browser option":::

1. Select **Start Debugging (F5)** or  **Run** to run your Teams app in debug mode.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/start-debugging.png" alt-text="Start debugging":::

3. Select **Sign in** to Microsoft 365 account.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/microsoft365-signin.png" alt-text="Sign in" border="true":::

   > [!TIP]
   > You can select **Read more** to learn about Microsoft 365 Developer Program. Your default web browser opens to let you sign-in to your Microsoft 365 account using your credentials.

4. Select **Install** to install the development certificate for localhost.

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug/install-certificate.png" alt-text="certificate" border="true":::

   > [!TIP]
   > You can select **Learn More** to know about the development certificate.

5. Select **Yes** if the following dialog box appears:

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug/development-certificate.png" alt-text="certification authority" border="true":::

Toolkit launches a new Edge or Chrome browser instance based on your selection and opens a web page to load Teams client.  

# [macOS](#tab/macOS)

1. Select **Debug Edge** or **Debug Chrome** from the **Run and Debug** in the activity bar.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/debug-run.png" alt-text="Browser lists":::

1. Select **Start Debugging (F5)** or  **Run** to run your Teams app in debug mode.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/start-debugging.png" alt-text="Debug your app":::

3. Select **Sign in** to Microsoft 365 account.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/microsoft365-signin.png" alt-text="Sign into M365 account" border="true":::

   > [!TIP]
   > You can select **Read more** to learn about Microsoft 365 Developer Program. Your default web browser opens to let you sign-in to your Microsoft 365 account using your credentials.

4. Select **Install** to install the development certificate for localhost.

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug/install-certificate.png" alt-text="certificate" border="true":::

   > [!TIP]
   > You can select **Learn More** to know about the development certificate.

5. Enter your **User Name** and **Password**, then select **Update Settings** in the following dialog box:

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug/mac-settings.png" alt-text="mac sign in" border="true":::

Toolkit launches a new Edge or Chrome browser instance depending on your selection and opens a web page to load Teams client.

---

### Debug your app

After the initial set up process, the Teams Toolkit starts the following processes:

<br>

<details>
<summary><b>Starts app services</b></summary>

Runs the tasks defined in `.vscode/tasks.json` as follows:

|  Component |  Task name  | Folder |
| --- | --- | --- |
|  Tab |  **Start Frontend** |  tabs |
|  Bot or message extensions |  **Start Bot** |  bot |
|  Azure Functions |  **Start Backend** |  API |

The following image displays task names on the **Output** **Terminal** tab of the Visual Studio Code while running tab, bot or message extension, and Azure Functions.

:::image type="content" source="../assets/images/teams-toolkit-v2/debug/Terminal.png" alt-text="Start app services":::

</details>
<details>
<summary><b>Launches debuggers</b></summary>

Launches the debug configurations defined in `.vscode/launch.json` as follows:

:::image type="content" source="../assets/images/teams-toolkit-v2/debug/launch-debuggers.png" alt-text="Launch debugger":::

The following table lists the debug configuration names and types for project with tab app and bot app:

|  Component |  Debug configuration name  | Debug configuration type |
| --- | --- | --- |
|  Tab |  **Attach to Frontend (Edge)** or  **Attach to Frontend (Chrome)**  |  pwa-msedge or pwa-chrome  |
|  Bot or message extensions |   **Attach to Bot** |  pwa-node |
| Azure Functions |   **Attach to Backend** |  pwa-node |

The following table lists the debug configuration names and types for project with bot app and without tab app:

|  Component |  Debug configuration name  | Debug configuration type  |
| --- | --- | --- |
|  Bot or message extension  | **Launch Bot (Edge)** or  **Launch Bot (Chrome)**  |   pwa-msedge or pwa-chrome  |
|  Bot or message extension  |   **Attach to Bot** |  pwa-node  |
|  Azure Functions |  **Attach to Backend** |  pwa-node |

</details>
<details>
<summary><b>Sideloads the Teams app</b></summary>

The configuration **Attach to Frontend** or **Launch Bot** launches a new Edge or Chrome browser instance and opens a web page to load Teams client. After the Teams client is loaded, Teams sideloads the Teams app controlled by the sideloading URL defined in the launch configurations [Microsoft Teams](https://teams.microsoft.com/l/app/>${localTeamsAppId}?installAppPackage=true&webjoin=true&${account-hint}). When Teams client loads in the web browser, select **Add** or select one from the dropdown list as per your requirement.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/hello-local-debug.png" alt-text="local debug" border="true":::

   Your app is added to Teams!

</details>

## Customize debug settings

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

## Next step

> [!div class="nextstepaction"]
> [Debug background process](debug-background-process.md).

## See also

* [Use Teams Toolkit to provision cloud resources](provision.md)
* [Add capabilities to your Teams apps](add-capability.md)
* [Deploy to the cloud](deploy.md)
* [Manage multiple environments in Teams Toolkit](TeamsFx-multi-env.md)
