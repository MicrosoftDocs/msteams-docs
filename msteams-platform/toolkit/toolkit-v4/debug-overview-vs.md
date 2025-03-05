---
title: Debug Teams App
author: surbhigupta 
description: In this module, learn how to debug Teams app both locally and using Teams App Test tool, launch Teams app as web app, and about key features of Teams Toolkit.
ms.author: surbhigupta 
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/21/2022
---

# Debug your Microsoft Teams app using Microsoft Visual Studio

Microsoft Teams Toolkit automates app startup services, initiates debugging, and uploads Teams app. After debugging, you can preview the Teams app in Teams web client. You can also customize debug settings to use your bot endpoints, or environment variables to load your configured app. Visual Studio allows you to debug tabs, bots, and message extensions.

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
* [Debug background process](debug-background-process-vs.md)
* [Use Teams Toolkit to provision cloud resources](provision-vs.md)
* [Deploy to the cloud](deploy-vs.md)
* [Preview and customize Teams app manifest](TeamsFx-preview-and-customize-app-manifest-vs.md)
