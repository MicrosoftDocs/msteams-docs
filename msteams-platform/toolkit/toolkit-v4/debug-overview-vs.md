---
title: Debug your Teams app using Visual Studio
author: surbhigupta 
description: In this module, learn how to debug your Teams app, and key features of Teams Toolkit using Visual Studio.
ms.author: surbhigupta 
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/21/2022
zone_pivot_groups: teams-toolkit-platform-vs
---

# Debug your Teams app using Visual Studio

:::zone  pivot="visual-studio-v17-7"

Teams Toolkit automates app startup services, initiates debugging, and uploads Teams app. After debugging, you can preview the Teams app in Teams web client. You can also customize debug settings to use your bot endpoints, or environment variables to load your configured app. Visual Studio allows you to debug tabs, bots, and message extensions.

## Prerequisites

| &nbsp; | Install | For using... |
| --- | --- | --- |
| &nbsp; | Visual Studio 2022 | You can install the enterprise edition of Visual Studio, and install the **ASP.NET** workload and Microsoft Teams Development Tools. Use the latest version |
| &nbsp; | Teams Toolkit | A Visual Studio extension that creates a project scaffolding for your app. Use latest version. |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings, and call-all in one place. |
| &nbsp; | [Prepare your Microsoft 365 tenant](~/concepts/build-and-test/prepare-your-o365-tenant.md) | Access to Teams account with the appropriate permissions to install an app. |
| &nbsp; | [Microsoft 365 developer account](~/concepts/build-and-test/prepare-your-o365-tenant.md) | Access to Teams account with the appropriate permissions to install an app. |
| &nbsp; | Azure Tools and [Microsoft Azure CLI](/cli/azure/install-azure-cli) | Azure tools to access stored data or deploy a cloud-based backend for your Teams app in Azure. |

## Key features of Teams Toolkit

Teams Toolkit automates the local debugging process for the following key features:

* Prepare Teams app dependencies: Teams Toolkit prepares local debug dependencies and registers your Teams app in your tenant account. For Bot and Message Extension apps, Teams Toolkit will register and configure bot.

* Start debugging: You can perform debugging with a single operation, press **F5** to start debugging. Teams Toolkit builds code, starts services, and launches the app in your browser.

* Toggle breakpoints: You can toggle breakpoints in the source code of tabs, bots, message extensions, and Azure Functions. The breakpoints execute when you interact with the Teams app in your web browser.

  The following image shows the toggle breakpoints:

    :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/vs-localdebug-toggle-breakpoint.png" alt-text="Screenshot shows the local debug toggle breakpoints." lightbox="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/vs-localdebug-toggle-breakpoint.png":::

* Hot Reload: Select **Hot Reload** to apply your changes in your Teams app when you want to update and save the source code during debugging.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/vs-localdebug-hot-reload.png" alt-text="Screenshot shows the select hot reload icon.":::

    To enable auto Hot Reload, select **Hot Reload on File Save** from the dropdown.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/vs-localdebug-hot-reload-filesave.png" alt-text="Screenshot shows the select hot reload on file save.":::
  
   > [!Tip]
   > To learn more about the Hot Reload function, see [.NET Hot Reload experience](https://devblogs.microsoft.com/dotnet/introducing-net-hot-reload/).

* Stop debugging: Select **Stop Debugging (Shift+F5)** when the local debug is complete.

    :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/vs-localdebug-Stopdebug.png" alt-text="Screenshot shows the select stop debug icon.":::

### Add environment variables

You can add the `environmentVariables` to the `launchSettings.json` file.

:::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/vs-localdebug-environment-variables.png" alt-text="Screenshot shows the add custom environment variables.":::

### Launch Teams app as a web app

You can launch Teams app as a web app instead of running the app in Teams client. To launch your Teams app as a web app, follow these steps:

1. In Solution Explorer, under Project, select **Properties** > **launchSettings.json**.

1. Remove the `launchUrl` property.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/vs-localdebug-launch-teamsapp-webapp.png" alt-text="Screenshot shows the launch teams as a web app by removing launchurl." lightbox="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/vs-localdebug-launch-teamsapp-webapp.png":::

1. Right-click on **Solution** (in this scenario the project name is MyTeamsApp1) and select **Properties**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/vs-localdebug-solution-properties.png" alt-text="Screenshot shows the right click solution and select properties." lightbox="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/vs-localdebug-solution-properties.png":::

   A solution property pages dialog box appears.

1. Select **Configuration Properties** > **Configuration** in the dialog box.
1. Clear the **Deploy** checkbox.
1. Select **OK**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/vs-localdebug-disable-deploy.png" alt-text="Screenshot shows the uncheck deploy in configuration properties." lightbox="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/vs-localdebug-disable-deploy.png":::

## Next

> [!div class="nextstepaction"]
> [Debug your app locally](debug-local-vs.md)

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals-vs.md)
* [Debug background process](debug-background-process-v4.md)
* [Use Teams Toolkit to provision cloud resources](provision-vs.md)
* [Deploy to the cloud](deploy-vs.md)
* [Preview and customize Teams app manifest](TeamsFx-preview-and-customize-app-manifest-vs.md)

:::zone-end

:::zone  pivot="visual-studio-v17-6"

Teams Toolkit helps you to debug and preview your Microsoft Teams app. Debug is the process of checking, detecting, and correcting issues or bugs to ensure the program runs successfully in Teams.

Teams Toolkit automates app startup services, initiates debug, and uploads Teams app. After debug, you can preview the Teams app in Teams web client. You can also customize debug settings to use your bot endpoints, or environment variables to load your configured app. Visual Studio allows you to debug tab, bot, and message extension. During the debug process, Teams Toolkit supports the following debug features:

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

## Next

> [!div class="nextstepaction"]
> [Debug your app locally](debug-local-vs.md)

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals-vs.md)
* [Debug background process](debug-background-process-v4.md)
* [Use Teams Toolkit to provision cloud resources](provision-vs.md)
* [Deploy to the cloud](deploy-vs.md)
* [Preview and customize Teams app manifest](TeamsFx-preview-and-customize-app-manifest-vs.md)

:::zone-end
