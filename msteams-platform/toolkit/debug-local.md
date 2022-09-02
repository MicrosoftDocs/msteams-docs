---
title: Debug your Teams app locally
author: surbhigupta 
description: In this module, learn how to debug your Teams app locally in Teams Toolkit and key features of Teams Toolkit
ms.author: v-amprasad
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/21/2022
---

# Debug your Microsoft Teams app locally

Microsoft Teams Toolkit helps you to debug and preview your Teams app locally. Debug is the process of checking, detecting, and correcting issues or bugs to ensure the program runs successfully. Microsoft Visual Studio Code allows you to debug tab, bot, message extension, and Azure Functions.
During the debug process, Teams Toolkit automatically starts app services, launches debuggers, and side-loads the Teams app. The Teams app is available for preview in Teams web client locally after debugging. You need to set up Teams Toolkit before you debug your app.

## Set up your Teams Toolkit for debugging

The following steps help you to set up your Teams Toolkit before you initiate the debug process:

# [Windows](#tab/Windows)

1. Select **Debug (Edge)** or **Debug (Chrome)** in the activity bar from the **RUN AND DEBUG ▷** drop down.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/debug-run.png" alt-text="Browser option":::

1. Select **Run** > **Start Debugging (F5)**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/start-debugging.png" alt-text="Start debugging":::

3. Select **Sign in** to Microsoft 365 account.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/microsoft365-signin.png" alt-text="Sign in":::

   > [!TIP]
   > You can select **Read more** to learn about Microsoft 365 Developer Program. Your default web browser opens to let you sign-in to your Microsoft 365 account with your credentials.

4. Select **Install** to install the development certificate for localhost.

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug/install-certificate.png" alt-text="certificate":::

   > [!TIP]
   > You can select **Learn More** to know about the development certificate.

5. Select **Yes** in the **Security Warning** dialog box appears:

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug/development-certificate.png" alt-text="certification authority":::

Toolkit launches a new Edge or Chrome browser instance based on your selection and opens a web page to load Teams client.  

# [macOS](#tab/macOS)

1. Select **Debug Edge** or **Debug Chrome** from the **Run and Debug** in the activity bar.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/debug-run.png" alt-text="Browser lists":::

1. Select **Start Debugging (F5)** or  **Run** to run your Teams app in debug mode.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/start-debugging.png" alt-text="Debug your app":::

3. Select **Sign in** to Microsoft 365 account.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/microsoft365-signin.png" alt-text="Sign into M365 account":::

   > [!TIP]
   > You can select **Read more** to learn about Microsoft 365 Developer Program. Your default web browser opens to let you sign-in to your Microsoft 365 account using your credentials.

4. Select **Install** to install the development certificate for localhost.

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug/install-certificate.png" alt-text="certificate":::

   > [!TIP]
   > You can select **Learn More** to know about the development certificate.

5. Enter your **User Name** and **Password**, then select **Update Settings**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug/mac-settings.png" alt-text="mac sign in":::

Teams Toolkit launches your browser instance and opens a web page to load Teams client.

---

## Debug your app

After the initial set up process, Teams Toolkit starts the following processes:

* [Starts app services](#starts-app-services)
* [Launches debuggers](#launches-debuggers)
* [Sideloads the Teams app](#sideloads-the-teams-app)

### Starts app services

Runs tasks as defined in `.vscode/tasks.json`.

|  Component |  Task name  | Folder |
| --- | --- | --- |
|  Tab |  **Start Frontend** |  tabs |
|  Bot or message extensions |  **Start Bot** |  bot |
|  Azure Functions |  **Start Backend** |  API |

The following image displays task names in the **OUTPUT** and **TERMINAL** tabs of the Visual Studio Code while running tab, bot or message extension, and Azure Functions.

:::image type="content" source="../assets/images/teams-toolkit-v2/debug/Terminal.png" alt-text="Start app services":::

### Launches debuggers

Launches the debug configurations as defined in `.vscode/launch.json`.

:::image type="content" source="../assets/images/teams-toolkit-v2/debug/launch-debuggers.png" alt-text="Launch debugger":::

The following table lists the debug configuration names and types for project with tab, bot or message extension app, and Azure Functions:

|  Component |  Debug configuration name  | Debug configuration type |
| --- | --- | --- |
|  Tab |  **Attach to Frontend (Edge)** or  **Attach to Frontend (Chrome)**  |  pwa-msedge or pwa-chrome  |
|  Bot or message extensions |   **Attach to Bot** |  pwa-node |
| Azure Functions |   **Attach to Backend** |  pwa-node |

The following table lists the debug configuration names and types for project with bot app, Azure Functions and without tab app:

|  Component |  Debug configuration name  | Debug configuration type  |
| --- | --- | --- |
|  Bot or message extension  | **Launch Bot (Edge)** or  **Launch Bot (Chrome)**  |   pwa-msedge or pwa-chrome  |
|  Bot or message extension  |   **Attach to Bot** |  pwa-node  |
|  Azure Functions |  **Attach to Backend** |  pwa-node |

### Sideloads the Teams app

The configuration **Attach to Frontend** or **Launch Bot** launches a Edge or Chrome browser instance to load Teams client in web page. After the Teams client is loaded, Teams side-loads the Teams app that is controlled by the sideloading URL defined in the launch configurations [Microsoft Teams](https://teams.microsoft.com/l/app/>${localTeamsAppId}?installAppPackage=true&webjoin=true&${account-hint}). When Teams client loads in the web browser, then select **Add** or select an option from the dropdown as per your requirement.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/hello-local-debug.png" alt-text="local debug":::

   Your app is added to Teams!

## Customize debug settings

Teams Toolkit unchecks some prerequisites and allows you to customize the debug settings to create your tab or bot:

<br>

<details>
<summary><b>Use your bot endpoint</b></summary>

1. In Visual Studio Code settings, you need to uncheck **Ensure Ngrok is installed and started. (ngrok)**

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/bot-endpoint.png" alt-text="Customize bot endpoint":::

1. You can set `siteEndpoint` configuration in `.fx/configs/config.local.json` to your endpoint.

```json
{
    "bot": {
        "siteEndpoint": "https://your-bot-tunneling-url"
    }
}

```

</details>

<details>
<summary><b>Use your development certificate</b></summary>

1. In Visual Studio Code settings, you need to uncheck **Ensure development certificate is trusted. (devCert)**

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/development-certificate-customize.png" alt-text="Customize certificate":::

1. You can set `sslCertFile` and `sslKeyFile` configuration in `.fx/configs/config.local.json` to your certificate file path and key file path.

```json
{
    "frontend": {
        "sslCertFile": "",
        "sslKeyFile": ""
    }
}
```

</details>

<details>
<summary><b>Use your start scripts to start app services</b></summary>

1. For tab, you need to update `dev:teamsfx` script in `tabs/package.json`.

1. For bot or message extension, you need to update `dev:teamsfx` script in `bot/package.json`.

1. For Azure Functions, you need to update `dev:teamsfx` script in `api/package.json` and for TypeScript update `watch:teamsfx` script.

   > [!NOTE]
   > Currently, the tab, bot, message extension apps, and Azure Functions ports don't support customization.

</details>

<details>
<summary><b>Add environment variables</b></summary>

You can add environment variables to `.env.teamsfx.local` file for tab, bot, message extension, and Azure Functions. Teams Toolkit loads the environment variables that you added to start services during local debug.

 > [!NOTE]
 > Ensure to start a new local debug after you add new environment variables as the environment variables don't support hot reload.

</details>

<details>
<summary><b>Debug partial component</b></summary>

Teams Toolkit utilizes Visual Studio Code multi-target debugging to debug tab, bot, message extension, and Azure Functions at the same time. You can update `.vscode/launch.json` and `.vscode/tasks.json` to debug partial component. If you only need to debug tab with Azure Functions in a tab plus bot project, use the following steps:

1. You can Comment **Attach to Bot** and **Attach to Backend** from debug compound in `.vscode/launch.json`.

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

2. You can Comment **Start Backend** and **Start Bot** from Start All task in .vscode/tasks.json.

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
