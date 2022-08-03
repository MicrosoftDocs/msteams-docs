---
author: surbhigupta
title: Debug your Teams app for Visual Studio
description: In this module, learn how to debug your Teams app locally in Visual Studio using Teams Toolkit
ms.author: v-amprasad
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/21/2022
---

# Debug your Teams app locally using Visual Studio

Teams Toolkit helps you to debug and preview your Microsoft Teams app locally. Debug is a process of building, checking, detecting, and correcting issues or bugs in your app. Debug ensures that the program runs successfully. Visual Studio allows you to debug tab, bot, message extension. Teams Toolkit supports the following debug features:

* Prepare Teams app dependencies
* Start debugging
* Toggle breakpoints
* Hot reload
* Stop debugging

During the debug process, Teams Toolkit automatically starts app services, launches debuggers, and side loads the Teams app. After debug, you can preview the Teams app in Teams web client. You can also customize debug settings to use your bot endpoints, or environment variables to load your configured app.

## Prerequisites

| &nbsp; | Install | For using... |
| --- | --- | --- |
| &nbsp; | **Required** | &nbsp; |
| &nbsp; | Visual Studio | You can install the free community edition of Visual Studio, and install the workload. |
| &nbsp; | Teams Toolkit | A Visual Studio extension that creates a project scaffolding for your app. Use latest version. |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings, call - all in one place. |
| &nbsp; | Azure Tools and [Microsoft Azure CLI](/cli/azure/install-azure-cli) | Azure tools to access stored data or to deploy a cloud-based backend for your Teams app in Azure. |
|&nbsp;  | **Optional** | &nbsp; |
|&nbsp; |[Ngrok](https://ngrok.com/) | Ngrok is used to forward external messages from Azure Bot Framework to your local machine.|

## Debug your app locally

You can debug your app locally in Visual Studio using Teams Toolkit by performing the following:

### Set up Ngrok (Only for Bot and Message Extension app)

Use a Command Prompt to run this command:

```
ngrok http 5130.
```

### Set up your Teams Toolkit

Perform the following steps using the Teams Toolkit to debug your app after you create a project:

1. Right-click on your **project**.
1. Select **Teams Toolkit**.
1. Select **Prepare Teams App Dependencies**.

   :::image type="content" source="../assets/images/debug-teams-app/vs-localdebug-teamsappdependencies.png" alt-text="Teams app dependencies for local debug":::

   > [!NOTES]
   > [In this scenario the project name is MyTeamsApp1]

Before you sign in to your Microsoft 365 account needs to have the sideloading permission. Ensure your Teams app can be uploaded to the tenant, otherwise your Teams app can fail to run in Teams Client.

4. Sign in to your Microsoft 365 Account.
5. Select **Continue"
   :::image type="content" source="../assets/images/debug-teams-app/vs-localdebug-signin-m365.png" alt-text="Sign in to Microsoft 365 account":::

   > [!Note]
   > Learn more about sideloading permission by visiting <https://aka.ms/teamsfx-sideloading-option>.

6. Select **Debug**.
7. Select **Start Debugging**, or directly press **F5**.

   :::image type="content" source="../assets/images/debug-teams-app/vs-localdebug-Startdebug.png" alt-text="Start Debugging":::

Visual Studio launches the Teams app inside Microsoft Teams client in a browser.

   > [!Note]
   > Learn more by visiting <https://aka.ms/teamsfx-vs-debug>.

8. After Microsoft Teams is loaded, select **Add** to install your app in Teams.

   :::image type="content" source="../assets/images/debug-teams-app/vs-localdebug-add-loadapp.png" alt-text="Select add to load app":::

   > [!TIP]
   > You can also use hot reload function of Visual Studio during debug. Learn more by visiting <https://aka.ms/teamsfx-vs-hotreload>.

Ensure to post HTTP request to <http://localhost:5130/api/notification> to trigger notification, when you're debugging Notification Bot app. You can use any API tool: curl (Windows Command Prompt), Postman, etc., if you selected http trigger when creating the project.

   > [!TIP]
   > If you make any changes to Teams app manifest file (/templates/appPackage/manifest.template.json), ensure that you perform the Prepare Teams App Dependencies command. Before you locally try to run the Teams app again.

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
