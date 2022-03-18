---
title: Debug your Teams app 
description: Debug your Teams app locally in Teams Toolkit
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/02/2022
---

# Debug your Teams app using Teams Toolkit

Teams Toolkit helps you to debug and preview your Teams app locally. Debug is the process of checking, detecting, and correcting issues or bugs to ensure the program runs successfully. Visual Studio Code allows you to debug tab, bot, messaging extension, and Azure functions. Teams Toolkit supports the following debugging features:

* One-click start
* Multi-target debugging  
* Toggle breakpoints
* Hot reloading
* Stop debugging

The Teams app is available for preview in Teams web client locally after the debugging process.

## Prerequisite

Install the [latest version of Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension).

## Advantages

### One-click start

You can perform only one operation, select **F5** to start debugging. The Teams Toolkit starts checking prerequisites, registering AAD app, registering Teams app, registering bot, starting services and launching browser.

### Multi-target debugging

Multi-target debugging is a Visual Studio Code debugging feature. Teams Toolkit utilizes this feature to debug tab, bot, messaging extension, and Azure functions at the same time.

### Toggle breakpoints

You can toggle breakpoints on the source codes of tabs, bots, messaging extensions, and Azure functions. The breakpoints execute when you interact with the Teams app in a web browser. The following image shows the toggle breakpoints:

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/toggle.png" alt-text="toggle breakpoints":::

### Hot reload

You can update the source codes of tab, bot, messaging extension, and Azure functions at the same time when you are debugging the Teams app. Update the code and save the changes. The app re-loads and the debugger re-attaches to the programming languages.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/hot-reload.png" alt-text="hot-reload for source codes":::

### Stop debugging

When you complete local debug, you can select **Stop** or **Disconnect** from the floating debugging toolbar to stop all debug sessions and terminate tasks. The following image shows the stop debug action:

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/stop-debug.png" alt-text="stop debugging":::

## Debug locally using Teams Toolkit

After creating a new app using Teams Toolkit:

1. Select **Debug (Edge)** or **Debug (Chrome)** from **Run and Debug** in the activity bar.
1. Select **Start Debugging (F5)** to run your Teams app in debug mode.

   The following image shows the browser options in the dropdown list:

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/debug.png" alt-text="browser default" border="false":::

3. Select **Sign in** to Microsoft 365 account.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/microsoft365-signin.png" alt-text="Alternate capabilities" border="true":::

   > [!TIP]
   > You can select **Read more** to learn about Microsoft 365 Developer Program. Your default web browser opens to let you sign in to your Microsoft 365 account using your credentials.

4. Select **Install** for installing the development certificate for localhost.

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug/install-certificate.png" alt-text="certificate" border="true":::

   > [!TIP]
   > You can select **Learn More** to know about the development certificate.

5. A dialog box appears depending on your operating system. For Windows, select **Yes**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug/development-certificate.png" alt-text="certification authority" border="true":::

For macOS, in **Certificate Trust Settings** dialog box, enter your **User Name** and **Password**, then select **Update Settings**.

  :::image type="content" source="../assets/images/teams-toolkit-v2/debug/mac-settings.png" alt-text="mac sign in" border="true":::

After the initial set up process, the Teams Toolkit starts the following processes:

1. [Starts app services](#starts-app-services)
1. [Launches debuggers](#launches-debuggers)
1. [Sideloads the Teams app](#sideloads-the-teams-app)

### Starts app services

Runs the tasks defined in `.vscode/tasks.json` as follows:

|  Component |  Task name  | Folder |
| --- | --- | --- |
|  Tab |  **Start Frontend** |  tabs |
|  Bot or messaging extensions |  **Start Bot** |  bot |
|  Azure Functions |  **Start Backend** |  api |

:::image type="content" source="../assets/images/teams-toolkit-v2/debug/Terminal.png" alt-text="Start app services":::

### Launches debuggers

Launches the debug configurations defined in `.vscode/launch.json` as follows:

:::image type="content" source="../assets/images/teams-toolkit-v2/debug/launch-debuggers.png" alt-text="Launch debugger":::

The table lists debug configuration type for project with tab app and bot app:

|  Component |  Debug configuration name  | Debug configuration type |
| --- | --- | --- |
|  Tab |  Attach to Frontend (Edge) or  Attach to Frontend (Chrome)  |  pwa-msedge or pwa-chrome  |
|  Bot or messaging extensions |   Attach to Bot |  pwa-node |
|  Azure Functions |   Attach to Backend |  pwa-node |

The table lists debug configuration type for project with bot app and without tab app:

|  Component |  Debug configuration name  | Debug configuration type  |
| --- | --- | --- |
|  Bot or messaging extension  | Launch Bot (Edge) or  Launch Bot (Chrome)  |   pwa-msedge or pwa-chrome  |
|  Bot or messaging extension  |   Attach to Bot |  pwa-node  |
|  Azure Functions |  Attach to Backend |  pwa-node |

### Sideloads the Teams app

The configuration **Attach to Frontend** or **Launch Bot**, launches a new Edge or Chrome browser instance and opens a web page to load Teams client. After the Teams client is loaded, Teams sideloads the Teams app controlled by the sideloading url defined in the launch configurations
[Microsoft Teams](https://teams.microsoft.com/l/app/>${localTeamsAppId}?installAppPackage=true&webjoin=true&${account-hint}).

7. When Teams client loads in the web browser, select **Add** or select one from the dropdown list as per your requirement.

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug/hello-local-debug.png" alt-text="local debug" border="true":::

   Your app is added to Teams!

## Customize local debug settings

Teams Toolkit allows you to customize the debug settings to create your own tab or bot.

### Clear prerequisites

You can clear some of the prerequisites in the Visual Studio Code settings.

1. Select **Settings**.

1. Navigate to **Extensions** in the list and expand it, then select **Teams Toolkit (Preview)** and **Prerequisite Check**.

1. Clear the checkbox you want to skip during debug.

:::image type="content" source="../assets/images/teams-toolkit-v2/debug/prerequisites-check.png" alt-text="vsc setting":::

### Use your own bot endpoint

1. In Visual Studio Code settings, clear **Ensure Ngrok is installed and started (ngrok)**.

1. Set botDomain and botEndpoint configuration in `.fx/configs/localSettings.json` to your own domain and endpoint.

:::image type="content" source="../assets/images/teams-toolkit-v2/debug/bot-endpoint.png" alt-text="Customize bot endpoint":::

### Use your own development certificate

1. In Visual Studio Code settings, clear **Ensure development certificate is trusted (devCert)**.

1. Set sslCertFile and sslKeyFile configuration in `.fx/configs/localSettings.json` to your own certificate file path and key file path.

:::image type="content" source="../assets/images/teams-toolkit-v2/debug/development-certificate-customize.png" alt-text="Customize certificate":::

### Use your own start scripts to start app services

1. For tab, update `dev:teamsfx` script in `tabs/package.json`.

1. For bot or messaging extension, update `dev:teamsfx` script in `bot/package.json`.

1. For Azure functions, update `dev:teamsfx` script in `api/package.json` and for TypeScript update `watch:teamsfx` script.

 > [!NOTE]
 > Currently, the tab, bot, messaging extension apps, and Azure functions ports don't support customization.

### Add environment variables

You can add environment variables to `.env.teamsfx.local` file for tab, bot, messaging extension and Azure functions. Teams Toolkit loads the environment variables you added to start services during local debug.

 > [!NOTE]
 > Ensure to start a new local debug after adding new environment variables as the environment variables don't support hot reload.

### Debug partial component

Teams Toolkit utilizes Visual Studio Code multi-target debugging to debug tab, bot, messaging extension and Azure functions at the same time. You can update `.vscode/launch.json` and `.vscode/tasks.json` to debug partial component. If you want to debug tab only in a tab plus bot with Azure functions project, use the following steps:

1. Comment **Attach to Bot** and **Attach to Backend** from debug compound in `.vscode/launch.json`


       ```json
           {
           "name": "Debug (Edge)",
            "configurations": [
              "Attach to Frontend (Edge)",
              // "Attach to Bot",
              // "Attach to Backend""
              ],
              "preLaunchTask": "Pre Debug Check and Start All",
              "presentation": {
                  "group": "all",
                  "order": 1
              },
              "stopAll": true
                 
         }
        ```

2. Comment **Start Backend** and Start Bot from Start All task in .vscode/tasks.json


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

## Next step

> [!div class="nextstepaction"]
> [Debug background process](debug-background-process.md).

## See also

* [Use Teams Toolkit to provision cloud resources](provision.md)
* [Add capabilities to your Teams apps](add-capability.md)
* [Deploy to the cloud](deploy.md)
* [Manage multiple environments in Teams Toolkit](TeamsFx-multi-env.md)
