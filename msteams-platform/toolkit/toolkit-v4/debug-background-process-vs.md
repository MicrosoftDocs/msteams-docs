---
title: Debug Background Processes for Apps
author: surbhigupta
description: Learn how Microsoft Visual Studio and Teams Toolkit work during local debug process. Learn how to register and configure your Teams app in Teams Toolkit.
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/03/2022
---

# Debug background processes using Microsoft Visual Studio

Visual Studio uses the `launchSettings.json` file to store configuration information that describes how to start an ASP.NET Core application. The file holds essential application settings used solely during development on the local machine. You can find it in the Properties folder of your project. It specifies details like the command to run, the browser's URL, and the required environment variables to be set.

After selecting **Prepare Teams App Dependencies**, Microsoft Teams Toolkit updates the launchUrl using the real Microsoft Teams app ID, Teams tenant ID, and Microsoft 365 account.

## Start local tunnel

For bot and message extension, you can use Dev Tunnel. It starts a local tunnel service to make the bot messaging endpoint public. For more information, see [Dev tunnels in Visual Studio](/aspnet/core/test/dev-tunnels?view=aspnetcore&preserve-view=true).

In the debug dropdown, select **Dev Tunnels (no active tunnel)** > **Create a Tunnel** or select an existing public dev tunnel.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/vs-create-devtunnel.png" alt-text="Screenshoot shows the steps to create a tunnel.":::

The tunnel creation dialog opens.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/vs-create-devtunnel-detail.png" alt-text="Screenshot shows how to create a dev tunnel.":::

* Select the **Account** to use to create the tunnel. Azure, Microsoft Account (MSA), and GitHub are the account types that are supported.
* Enter a **Name** for the tunnel.
* Select the **Tunnel Type**, Persistent or Temporary.
* From the dropdown, select the  required public authentication in **Access**.
* Select **OK**. Visual Studio displays confirmation of tunnel creation.

The tunnel you create is under **Dev Tunnels(MyPublicDevTunnel)** > **MyPublicDevTunnel**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/vs-select-devtunnel.png" alt-text="Screenshot shows how to select dev tunnel.":::

## Create the debug resources

Teams Toolkit executes lifecycle `provision` defined in the `teamsapp.local.yml` file to create necessary resources for debugging Teams apps. For more information, see [Provision task](https://aka.ms/teamsfx-tasks/provision) and [available actions](https://aka.ms/teamsfx-actions).

## Take a tour of your app source code

You can view the project folders and files under **Explorer** in Visual Studio after debugging. The following table lists the files related to debugging:

| Folder name| Contents| Description |
| --- | --- | --- |
| `teamsapp.local.yml` | The main Teams Toolkit project file for debugging. | This file defines the lifecycles and actions required for debugging. |
| `env/.env.local` | Environment variables file for Teams Toolkit project. | The values of each environment variable are consumed or generated during preparing Teams app dependencies. |
| `appsettings.Development.json` | Environment variables file for the app code. | The values of each environment variable are generated during preparing Teams app dependencies. |

## See also

* [Teams Toolkit Visual Studio Overview](teams-toolkit-fundamentals-vs.md)
* [Debug your Teams app locally using Visual Studio](debug-local-vs.md)
* [Provision cloud resources in Visual Studio](provision-vs.md)
* [Deploy Teams app to the cloud VS](deploy-vs.md)
* [Customize app manifest in Teams Toolkit](TeamsFx-preview-and-customize-app-manifest-vs.md)
