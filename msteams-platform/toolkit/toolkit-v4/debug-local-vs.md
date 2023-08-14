---
title: Debug your Teams app locally using Visual Studio
author: surbhigupta 
description: In this module, learn how to debug your Teams app locally in Teams Toolkit using Visual Studio.
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/21/2022
zone_pivot_groups: teams-toolkit-platform-vs
---

:::zone  pivot="visual-studio-v17-7"

## Debug your Teams app locally using Visual Studio

Visual Studio allows you to debug tabs, bots, and message extensions. You can debug your app locally in Visual Studio using Teams Toolkit by performing:

### Set up dev tunnel (Only for bot and message extension)

In the debug dropdown menu:

1. Select **Dev Tunnels**.

1. If you have already have an existing dev tunnel, select the existing tunnel from the list. For example, in the following image **PublicDevTunnel** is an existing dev tunnel.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/vs-devtunnel.PNG" alt-text="Screenshot shows the dev tunnel for debug option.":::

1. If you haven't already created a tunnel, select **Create a Tunnel...**. A new window appears.
1. Enter the name of the dev tunnel and under **Access** select **Public** from the dropdown.1. Select **OK**.

### Set up your Teams Toolkit

To debug your app after you create a project, perform the following steps:

1. Right-click on your project.
1. Select **Teams Toolkit** > **Prepare Teams App Dependencies**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/vs-localdebug-teamsappdependencies.png" alt-text="Screenshot shows the local debug teams app dependencies.":::

   > [!NOTE]
   > In this scenario the project name is MyTeamsApp1.

   Your Microsoft 365 account needs to have the side loading permission before you sign in. Ensure that your Teams app can be uploaded to the tenant, otherwise your Teams app can fail to run in Teams Client.

1. Sign in to your **Microsoft 365 Account** and then select **Continue**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/vs-localdebug-signin-m365.png" alt-text="Screenshot shows sign in to Microsoft 365 account.":::

   > [!NOTE]
   > Learn more about sideloading permission, see [Prepare your Microsoft 365 tenant](../../concepts/build-and-test/prepare-your-o365-tenant.md).

1. Select **Debug** > **Start Debugging** or select **F5**.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/vs-localdebug-Startdebug.png" alt-text="Screenshot shows start debugging.":::

   Visual Studio launches the Teams app inside Microsoft Teams client in your browser. For more information, see [Teams Toolkit Overview](teams-toolkit-fundamentals-vs.md).

1. Select **Add** to install your app in Teams.

   :::image type="content" source="../../assets/images/teams-toolkit-v2/teams-toolkit-vs/vs-localdebug-add-loadapp.png" alt-text="Screenshot shows to add app.":::

   You can also use the hot reload function of Visual Studio during debug. For more information, see [.NET hot reload](https://devblogs.microsoft.com/dotnet/introducing-net-hot-reload/).

   > [!NOTE]
   > When you debug a notification bot app, ensure that you post HTTP request to `http://localhost:5130/api/notification` in order to trigger notification. If you've selected HTTP trigger when creating the project, you can use any API tools such as, cURL (Windows Command Prompt), Postman, or any other API tool.

   Before you try to run the Teams app locally, if you make any changes to the Teams app manifest file `/appPackage/manifest.json`, ensure that you perform the **Prepare Teams App Dependencies** command.

## Next step

> [!div class="nextstepaction"]
> [Debug background process](debug-background-process-v4.md)

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals-vs.md)
* [Introduction to Azure Functions](/azure/azure-functions/functions-overview)
* [Use Teams Toolkit to provision cloud resources](provision-vs.md)
* [Add capabilities to your Teams apps](add-capability-v4.md)
* [Deploy to the cloud](deploy-vs.md)
* [Manage multiple environments in Teams Toolkit](TeamsFx-multi-env-v4.md)

:::zone-end

:::zone  pivot="visual-studio-v17-6"

# Debug your Teams app locally using Visual Studio

Teams Toolkit helps you to debug and preview your Microsoft Teams app locally. During the debug process, Teams Toolkit automatically starts app services, launches debuggers, and side-loads the Teams app. You can preview your Teams app in Teams web client locally after debugging.

Visual Studio allows you to debug tab, bot, and message extension. You can debug your app locally in Visual Studio using Teams Toolkit by performing:

### Set up ngrok (Only for Bot and Message Extension app)

Use command prompt to run this command:

```
ngrok http 5130
```

### Set up your Teams Toolkit

Perform the following steps using the Teams Toolkit to debug your app after you create a project:

1. Right-click on your project.
1. Select **Teams Toolkit** > **Prepare Teams App Dependencies**.

   :::image type="content" source="images/vs-localdebug-teamsappdependencies-v4.png" alt-text="Teams app dependencies for local debug" lightbox="images/vs-localdebug-teamsappdependencies-v4.png":::

   > [!NOTE]
   > In this scenario the project name is MyTeamsApp1.

   Your Microsoft 365 account needs to have the side loading permission before you sign in.  Ensure your Teams app can be uploaded to the tenant, otherwise your Teams app can fail to run in Teams Client.

1. Sign in to your **Microsoft 365 Account**, then select **Continue**.

   :::image type="content" source="images/vs-localdebug-signin-m365-v4.png" alt-text="Sign in to Microsoft 365 account":::

   > [!Note]
   > Learn more about sideloading permission by visiting [Prepare your Microsoft 365 tenant](~/concepts/build-and-test/prepare-your-o365-tenant.md).

1. Select **Debug** > **Start Debugging**, or directly select **F5**.

   :::image type="content" source="images/vs-localdebug-Startdebug-v4.png" alt-text="Start Debugging":::

   Visual Studio launches the Teams app inside Microsoft Teams client in your browser.

   > [!Note]
   > Learn more by visiting [Teams Toolkit Overview](teams-toolkit-fundamentals-vs.md).

1. After Microsoft Teams is loaded, select **Add** to install your app in Teams.

   :::image type="content" source="images/vs-localdebug-add-loadapp-v4.png" alt-text="Select add to load app":::

   > [!TIP]
   > You can also use hot reload function of Visual Studio during debug. Learn more by visiting <https://aka.ms/teamsfx-vs-hotreload>.

   > [!NOTE]
   > Ensure to post HTTP request to `http://localhost:5130/api/notification` to trigger notification, when you're debugging Notification Bot app. If you've selected HTTP trigger when creating the project, you can use any API tools such as curl (Windows Command Prompt), Postman, or any other API tool.

   > [!TIP]
   > If you make any changes to Teams app manifest file (/templates/appPackage/manifest.template.json), ensure that you perform the Prepare Teams App Dependencies command. Before you try to run the Teams app again locally.

## Next step

> [!div class="nextstepaction"]
> [Debug background process](debug-background-process-v4.md)

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals-vs.md)
* [Introduction to Azure Functions](/azure/azure-functions/functions-overview)
* [Use Teams Toolkit to provision cloud resources](provision-vs.md)
* [Add capabilities to your Teams apps](add-capability-v4.md)
* [Deploy to the cloud](deploy-vs.md)
* [Manage multiple environments in Teams Toolkit](TeamsFx-multi-env-v4.md)

:::zone-end
