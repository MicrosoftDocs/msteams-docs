---
title: Debug your Teams app for Visual Studio
description: In this module, learn how to debug your Teams app locally in Visual Studio using Teams Toolkit
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/21/2022
---

# Debug your Teams app locally using Visual Studio

Teams Toolkit helps you to debug and preview your Teams app locally. Debug is the process of building, checking, detecting, and correcting issues or bugs to ensure the program runs successfully. Visual Studio allows you to debug tab, bot, message extension. Teams Toolkit supports the following debug features:

* Prepare Teams app dependencies
* Start debugging
* Toggle breakpoints
* Hot reload
* Stop debugging

During the debug process, Teams Toolkit automatically starts app services, launches debuggers, and side loads the Teams app. The Teams app is available for preview in Teams web client locally after debugging. You can also customize debug settings to use your bot endpoints, or environment variables to load your configured app.

## Prerequisites

* Install the latest version of Teams Toolkit for Visual Studio.
* To run / debug a Bot or Message Extension app, you'll need to set up [Ngrok](https://ngrok.com/) first.
Ngrok is used to forward external messages from Azure Bot Framework to your local machine.

## Debug your app locally

### Set up Ngrok (Only for Bot and Message Extension app)

Use a Command Prompt to run this command:

```
ngrok http 5130.
```

### Set up your Teams Toolkit

Perform the following steps to debug your app after you create a new app using the Teams Toolkit:

1. In Visual Studio Solution Explorer, right click on your project file and select "Teams Toolkit"

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug-VS/VS-localdebug-selectTeamsToolkit.png" alt-text="localdebug selectTeamsToolkit":::

Then select "Prepare Teams app dependencies".

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug-VS/VS-localdebug-selectTeamsPrepare.png" alt-text="localdebug selectTeamsPrepare":::

You'll be asked to sign in to your Microsoft 365 account.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug-VS/VS-localdebug-selectAccountContinue.png" alt-text="localdebug selectAccountContinue":::

   > [!Note]
   > Your M365 account need to have the sideloading permission to ensure Teams app can be uploaded to your tenant, otherwise you will end up with failure to see your Teams app running in Teams client. Learn more about sideloading permission by visiting <https://aka.ms/teamsfx-sideloading-option>.

2. Go to the "Debug" menu > select "Start Debugging" or directly press **F5**. Visual Studio will launch the Teams app inside Microsoft Teams client in a browser.

:::image type="content" source="../assets/images/teams-toolkit-v2/debug-VS/VS-localdebug-menu-selectDebug.png" alt-text="localdebug menu selectDebug":::

:::image type="content" source="../assets/images/teams-toolkit-v2/debug-VS/VS-localdebug-menu-startDebugging.png" alt-text="localdebug menu startDebug":::

   > [!Note]
   > Learn more by visiting <https://aka.ms/teamsfx-vs-debug>.

3. Once Microsoft Teams is loaded, select the "Add" button to install your app in Teams.

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug-VS/VS-localdebug-addApp.png" alt-text="localdebug addApp":::

   > [!TIP]
   > You can use hotreload function of VS during debug. Learn more by visiting <https://aka.ms/teamsfx-vs-hotreload>.

4. If you're debugging Notification Bot app, and if you selected http trigger when creating the project. You need to post HTTP request to <http://localhost:5130/api/notification> to trigger notification. You can use any API tool: curl (Windows Command Prompt), Postman, etc.

   > [!TIP]
   > If you made changes to Teams app manifest file (/templates/appPackage/manifest.template.json), please right click on your project and select "Teams Toolkit" -> "Prepare Teams app dependencies" command before you try to locally run the Teams app again.

## Key features of Teams Toolkit

### Prepare Teams app dependencies

Teams Toolkit will prepare local debug dependencies and register a Teams app in the tenant, which your account belongs to.
For Bot and Message Extension apps, Teams Toolkit will register and configure a bot.

### Start debugging

You can perform single operation, press **F5** to start debugging. The Teams Toolkit starts to build code, starts services, and launches browser.

### Toggle breakpoints

You can toggle breakpoints on the source codes of tabs, bots, message extensions, and Azure Functions. The breakpoints execute when you interact with the Teams app in a web browser.
The following image shows the toggle breakpoints:

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug-VS/VS-localdebug-togglebreakpoints.png" alt-text="localdebug togglebreakpoints":::

### Hot reload

You can update and save the source codes of tab, bot, message extension, and Azure Functions at the same time when you're debugging the Teams app.
And then select the hot reload button as follow to apply your edits:

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug-VS/VS-localdebug-hotreload.png" alt-text="localdebug hotreload":::

Or you can enable "Hot Reload on File Save" for auto hot reload:

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug-VS/VS-localdebug-hotreload-onSave.png" alt-text="localdebug hotreload onSave":::
  
   > [!Tip]
   > You can use hotreload function of VS during debug. Learn more by visiting <https://aka.ms/teamsfx-vs-hotreload>.

### Stop debugging

When you complete local debug, you can stop debugging. The following image shows the stop debug action:

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug-VS/VS-localdebug-stopDebugging.png" alt-text="localdebug stopDebugging":::

## Customize debug settings

### Use your bot endpoint

Set siteEndpoint configuration in **.fx/configs/config.local.json** to your endpoint.

```
"bot": {
    "siteEndpoint": "https://baidu.com"
}
```

### Add environment variables

You can add environment variables to **Properties/launchSettings.json** file.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug-VS/VS-localdebug-customEnvironmentVariables.png" alt-text="localdebug customEnvironmentVariables":::

### Launch the Teams app as a web app

if you want to launch the Teams app as a web app instead of running in Teams client, first remove the **'launchUrl'** in **Properties/launchSettings.json**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug-VS/vS-localdebug-launchWebApp.png" alt-text="localdebug launchWebApp":::

Then right click on the solution, in Properties > Configuration Properties > Configuration, uncheck the 'Deploy' process and select 'OK'.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug-VS/VS-localdebug-disableDeploy.png" alt-text="localdebug disableDeploy":::
