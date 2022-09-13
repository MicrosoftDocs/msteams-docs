---
author: surbhigupta
title: Debug your Microsoft Teams app using Visual Studio
description: In this module, learn how to debug your Teams app in Teams Toolkit and key features of Teams Toolkit in Visual Studio
ms.author: v-amprasad
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/21/2022
---

# Debug your Microsoft Teams app using Visual Studio

Debug is a process of building, checking, detecting, and correcting issues or bugs in your app. Debug ensures that the program runs successfully. Teams Toolkit automates app startup services, initiates debug, and side loads Teams app. After debug, you can preview the Teams app in Teams web client.  

You can also customize debug settings to use your bot endpoints, or environment variables to load your configured app. Visual Studio allows you to debug tab, bot, and message extension. During the debug process, Teams Toolkit supports the following debug features:

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
| &nbsp; | [Prepare your Microsoft 365 tenant](../concepts/build-and-test/prepare-your-o365-tenant.md) | Access to Teams account with the appropriate permissions to install an app. |
| &nbsp; | [Microsoft 365 developer account](/../concepts/build-and-test/prepare-your-o365-tenant) | Access to Teams account with the appropriate permissions to install an app. |
| &nbsp; | Azure Tools and [Microsoft Azure CLI](/cli/azure/install-azure-cli) | Azure tools to access stored data or to deploy a cloud-based backend for your Teams app in Azure. |
|&nbsp;  | **Optional** | &nbsp; |
|&nbsp; |[Ngrok](https://ngrok.com/) | Ngrok is used to forward external messages from Azure Bot Framework to your local machine.|

## Key features of Teams Toolkit

You can see the following key features of Teams Toolkit, that automate the local debugging process of your Teams app:

### Prepare Teams app dependencies

Teams Toolkit prepares local debug dependencies and registers your Teams app in the tenant in your account. For Bot and Message Extension apps, Teams Toolkit will register and configure bot.

### Start debugging

You can perform debugging with a single operation, press **F5** to start debugging. Teams Toolkit builds code, starts services, and the launches app in your browser.

### Toggle breakpoints

You can toggle breakpoints in the source codes of tabs, bots, message extensions, and Azure functions. The breakpoints execute when you interact with the Teams app in your web browser.
The following image shows the toggle breakpoints:

:::image type="content" source="../assets/images/debug-teams-app/vs-localdebug-toggle-breakpoint.png" alt-text="Local debug toggle breakpoints" lightbox="../assets/images/debug-teams-app/vs-localdebug-toggle-breakpoint.png":::

### Hot reload

Select **Hot Reload** to apply your changes in your Teams app when you want to update and save the source codes simultaneously during debugging.

:::image type="content" source="../assets/images/debug-teams-app/vs-localdebug-hot-reload.png" alt-text="Select hot reload icon":::

Select the option **Hot Reload on File Save** from the drop-down to enable auto hot reload.

:::image type="content" source="../assets/images/debug-teams-app/vs-localdebug-hot-reload-filesave.png" alt-text="Select hot reload on file save":::
  
   > [!Tip]
   > To learn more about Hot Reload function of Visual Studio during debug you can visit <https://aka.ms/teamsfx-vs-hotreload>.

### Stop debugging

Select **Stop Debugging** when the local debug is complete.

:::image type="content" source="../assets/images/debug-teams-app/vs-localdebug-Stopdebug.png" alt-text="Select stop debug icon":::

## Customize debug settings

You can customize debug setting for your Teams app to use your bot endpoints and add environment variables:

### Use your bot endpoint

You can set siteEndpoint configuration in **.fx/configs/config.local.json** to your endpoint.

```
"bot": {
    "siteEndpoint": "https://baidu.com"
}
```

### Add environment variables

You can add **environmentVariables** to **launchSettings.json** file.

:::image type="content" source="../assets/images/debug-teams-app/vs-localdebug-environment-variables.png" alt-text="Add custom environment variables":::

### Launch Teams app as a web app

You can launch Teams app as a web app instead of running in Teams client.

1. Select **Properties** > **launchSettings.json** in Solution Explorer panel under your project.
1. Remove the **'launchUrl'** from the file.

   :::image type="content" source="../assets/images/debug-teams-app/vs-localdebug-launch-teamsapp-webapp.png" alt-text="Launch teams as a web app by removing launchurl" lightbox="../assets/images/debug-teams-app/vs-localdebug-launch-teamsapp-webapp.png":::

1. Right-click on **Solution** and select **Properties**.

   :::image type="content" source="../assets/images/debug-teams-app/vs-localdebug-solution-properties.png" alt-text="Right click solution and select properties" lightbox="../assets/images/debug-teams-app/vs-localdebug-solution-properties.png":::

1. Select **Configuration Properties** > **Configuration** in the dialog.
1. Select uncheck the **Deploy** process box.
1. Select **OK**.

   :::image type="content" source="../assets/images/debug-teams-app/vs-localdebug-disable-deploy.png" alt-text="Uncheck deploy in configuration properties" lightbox="../assets/images/debug-teams-app/vs-localdebug-disable-deploy.png":::

## Next

> [!div class="nextstepaction"]
> [Debug your Teams app locally using Visual Studio](debug-teams-app-visual-studio.md)

## See also

* [Provision cloud resources using Visual Studio](provision-cloud-resources.md)
* [Deploy Teams app to the cloud using Visual Studio](deploy-teams-app.md)
* [Edit Teams app manifest using Visual Studio](VS-TeamsFx-preview-and-customize-app-manifest.md)
