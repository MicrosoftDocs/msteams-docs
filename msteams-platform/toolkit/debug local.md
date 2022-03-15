---
title: Debug your Teams app 
description: Debug your Teams app locally in Teams Toolkit
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/02/2022
---

# Debug your Teams app using Teams Toolkit

Teams Toolkit helps you to debug and preview your Teams app locally. Debug is the process of checking, detecting, and correcting issues or bugs to ensure that the program runs as per the requirements. Visual Studio Code allows you to debug tab, bot, messaging extension, and Azure functions. Toolkit supports debugging features including start, multi-target debugging, toggle breakpoints, hot reloading, and stop. The Teams app is available for preview in Teams web client locally after the debugging process.

## Prerequisite

Install [Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) version v3.0.0+ or later.


## Visual Studio Code debugging features


### Toggle breakpoints

In Visual Studio Code, you can toggle breakpoints on the source codes of tabs, bots, messaging extensions, and Azure functions. The breakpoints execute when you interact with the Teams app in a web browser. The following image shows the toggle breakpoints:

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/toggle.png" alt-text="toggle breakpoints":::

### Hot reload

You can update the source codes of tab, bot, messaging extension, and Azure functions at the same time when you are debugging the Teams app. Update the code and save the changes. The project re-loads and the debugger re-attaches to the programming languages.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/hot reload.png" alt-text="hot-reload for source codes":::

### Stop debugging

When you complete local debug, you can select **Stop or Disconnect** in the floating debugging toolbar to stop all debug sessions and terminate tasks. The following image shows stop debugging action:

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/stop-debugging.png" alt-text="stop debugging":::


## Debug locally using Teams Toolkit

After creating a new app using Teams Toolkit, select **F5** to run your Teams app in debug mode. The following steps to perform during local debug:

1. Select **Debug (Edge)** or **Debug (Chrome)** from the **Run and Debug** in the activity bar.
1. Select **Start Debugging (F5)**. 

The following image displays the browser options in the dropdown list:

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/debug.png" alt-text="browser default" border="true"::: 

3. Select **Sign in** to Microsoft 365 account in the pop-up window.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/microsoft365-signin.png" alt-text="Alternate capabilities" border="true":::

> [!TIP]
> You can also select **Read more** to learn more about Microsoft 365 Developer Program. Your default web browser opens to let you sign into Microsoft 365. Sign in to your Microsoft 365 account using your credentials.

4. Select **Install** in the pop-up dialog box to let you install the development certificate for localhost.

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug/install-certificate.png" alt-text="certificate" border="true":::

> [!TIP]
> You can also select **Learn More** to know about the development certificate.

5. A system dialog box appears depending on your operating system. For Windows, select **Yes**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug/development-certificate.png" alt-text="certification authority" border="true":::

6. For macOS, enter your **User Name** and **Password**, then select **Update Settings**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug/mac-settings.png" alt-text="mac sign in" border="true":::


Visual Studio Code starts the following processes:

1. [Starts app services](#starts-app-services).
1. [Launches debuggers](#launches-debuggers).
1. [Sideloads the Teams app](#sideloads-the-teams-app).

## Starts app services

It runs the tasks defined in `.vscode/tasks.json` as follows:

|  Component |  Task name  | Folder |
| --- | --- | --- |
|  Tab |  Start Frontend |  Tabs |
|  Bot or messaging extensions |  Start Bot |  Bot |
|  Azure Functions |  Start Backend |  Api |

## Launches debuggers

It launches the debug configurations defined in `.vscode/launch.json` as follows:

:::image type="content" source="../assets/images/teams-toolkit-v2/debug/Terminal.png" alt-text="Start frontend task":::

The table lists debug configuration type for project with tab app and bot app:

|  Component |  Debug configuration name  | Debug configuration type |
| --- | --- | --- |
|  Tab |  Attach to Frontend (Edge) or Attach to Frontend (Chrome)  |  pwa-msedge or pwa-mschrome  |
|  Bot or messaging extensions |  Attach to Bot |  pwa-node |
|  Azure Functions |  Attach to Backend |  pwa-node |

The table lists debug configuration type for project with bot app and without tab app:

|  Component |  Debug configuration name  | Debug configuration type  |
| --- | --- | --- |
|  Bot or messaging extension  |  Launch Bot (Edge) or Launch Bot (Chrome)  |   pwa-msedge or pwa-mschrome  |
|  Bot or messaging extension  |  Attach to Bot |  pwa-node  |
|  Azure Functions |  Attach to Backend |  pwa-node |


## Sideloads the Teams app

The configuration **Attach to Frontend** or **Launch Bot**, launches a new Edge or Chrome browser instance and opens a web page to load Teams client. After the Teams client is loaded, Teams sideloads the Teams app controlled by the sideloading url defined in the launch configurations,
[Microsoft Teams](https://teams.microsoft.com/l/app/>${localTeamsAppId}?installAppPackage=true&webjoin=true&${account-hint}).


7. When Teams client loads in the web browser, select **Add** or select one from the dropdown list as per your requirement.

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug/hello-local-debug.png" alt-text="local debug" border="true":::


Your app is added to Teams.

## Customize local debug settings

Teams Toolkit allows you to customize the debug settings to create your own tab or bot.

### Uncheck few prerequisites

You can uncheck some of the prerequisites in the Visual Studio Code settings.

1. Select **Settings**.

1. Navigate to **Extensions** in the list and expand it, then select **Teams Toolkit (Preview)** and **Prerequisite Check**.

1. Uncheck the checkbox you want to skip during debug.

The following image shows the list that can be unchecked:

:::image type="content" source="../assets/images/teams-toolkit-v2/debug/prerequisites-check.png" alt-text="vsc setting":::

### Use your own bot endpoint

1. In Visual Studio Code settings, uncheck **Ensure Ngrok is installed and started (ngrok)**.

1. Set botDomain and botEndpoint configuration in `.fx/configs/localSettings.json` to your own domain and endpoint.

### Use your own development certificate

1. In Visual Studio Code settings, uncheck **Ensure development certificate is trusted (devCert)**.

1. Set sslCertFile and sslKeyFile configuration in `.fx/configs/localSettings.json` to your own certificate file path and key file path.

### Use your own start scripts to start app services

1. For tab, update `dev:teamsfx script in tabs/package.json`.

1. For bot or messaging extension, update`dev:teamsfx script in bot/package.json`.

1. For Azure functions, update `dev:teamsfx script in api/package.json` and for TypeScript update `watch:teamsfx script`.


 > [!NOTE]
 > Currently, the tab, bot, messaging extension apps, and Azure functions ports don't support customization.

### Add environment variables

1. You can add environment variables to `.env.teamsfx.local` file for tab, bot, messaging extension and Azure functions. Teams Toolkit loads the environment variables you added to start services during local debug.

 > [!NOTE]
 > Ensure to start a new local debug after adding new environment variables as the environment variables doesn't support hot reload.

### Debug partial component

Teams Toolkit utilizes Visual Studio Code multi-target debugging to debug tab, bot, messaging extension and Azure functions at the same time. You can update `.vscode/launch.json`` and .vscode/tasks.json` to debug partial component. If you want to debug tab only in a tab plus bot with Azure functions project, use the following steps:

1. Comment **Attach to Bot** and **Attach to Backend** from Debug compound in `.vscode/launch.json`

 ```json
{
  "name": "Debug (Edge)",
    "configurations": [
      "Attach to Frontend (Edge)",
      // "Attach to Bot",
       // "Attach to Backend"
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

## See also

 [Debug background process](debug%20background%20process.md).