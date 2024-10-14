---
title: Debug Teams App Locally 
author: surbhigupta 
description: Learn how to set up dev tunnel for bots and message extensions and prepare Teams Toolkit to debug your Teams app locally using Visual Studio.
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/21/2022
---

# Debug your Microsoft Teams app locally using Microsoft Visual Studio

Visual Studio allows you to debug tabs, bots, and message extensions. You can debug your app locally in Visual Studio using Microsoft Teams Toolkit by performing:

## Set up dev tunnel (Only for bot and message extension)

In the debug dropdown menu:

1. Select **Dev Tunnels**.

1. If you have already an existing dev tunnel, select the existing tunnel from the list. For example, in the following image **PublicDevTunnel** is an existing dev tunnel.

1. If you haven't created a tunnel, select **Create a Tunnel...**. A new window appears.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/vs-devtunnel.PNG" alt-text="Screenshot shows the dev tunnel for debug option.":::

1. Enter the name of the dev tunnel and under **Access** select **Public** from the dropdown.
1. Select **OK**.

### Set up your Teams Toolkit

To debug your app after you create a project, perform the following steps:

1. Right-click on your project.
1. Select **Teams Toolkit** > **Prepare Teams App Dependencies**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/vs-localdebug-teamsappdependencies.png" alt-text="Screenshot shows the local debug teams app dependencies.":::

   > [!NOTE]
   > In this scenario the project name is MyTeamsApp1.

   Your Microsoft 365 account needs to have the custom app upload permission before you sign in. Ensure that your Teams app can be uploaded to the tenant, otherwise your Teams app can fail to run in Teams Client.

1. Sign in to your **Microsoft 365 Account** and then select **Continue**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/vs-localdebug-signin-m365.png" alt-text="Screenshot shows sign in to Microsoft 365 account.":::

   > [!NOTE]
   > Learn more about the custom app upload permission, see [prepare your Microsoft 365 tenant](../../concepts/build-and-test/prepare-your-o365-tenant.md).

1. Select **Debug** > **Start Debugging** or select **F5**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/vs-localdebug-Startdebug.png" alt-text="Screenshot shows start debugging.":::

   Visual Studio launches the Teams app inside Microsoft Teams client in your browser. For more information, see [Teams Toolkit Overview](teams-toolkit-fundamentals-vs.md).

1. Select **Add** to install your app in Teams.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/vs-localdebug-add-loadapp.png" alt-text="Screenshot shows the option to add app.":::

   You can also use the hot reload function of Visual Studio during debug. For more information, see [.NET hot reload](https://devblogs.microsoft.com/dotnet/introducing-net-hot-reload/).

   > [!NOTE]
   > When you debug a notification bot app, ensure that you post HTTP request to `http://localhost:5130/api/notification` in order to trigger notification. If you've selected HTTP trigger when creating the project, you can use any API tools such as, cURL (Windows Command Prompt), Postman, or any other API tool.

   Before you try to run the Teams app locally, if you make any changes to the app manifest (previously called Teams app manifest) file `/appPackage/manifest.json`, ensure that you perform the **Prepare Teams App Dependencies** command.

## Next step

> [!div class="nextstepaction"]
> [Debug background process](debug-background-process-vs.md)

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals-vs.md)
* [Introduction to Azure Functions](/azure/azure-functions/functions-overview)
* [Use Teams Toolkit to provision cloud resources](provision-vs.md)
* [Deploy to the cloud](deploy-vs.md)
* [Manage multiple environments in Teams Toolkit](teamsfx-multi-env-v4.md)
