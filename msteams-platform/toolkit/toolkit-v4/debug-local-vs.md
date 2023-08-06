---
title: Debug your Teams app locally using Visual Studio
author: surbhigupta 
description: In this module, learn how to debug your Teams app locally in Teams Toolkit using Visual Studio.
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/21/2022
---

# Debug your Teams app locally VS

Teams Toolkit helps you to debug and preview your Microsoft Teams app locally. During the debug process, Teams Toolkit automatically starts app services, launches debuggers, and side-loads the Teams app. You can preview your Teams app in Teams web client locally after debugging.

## Debug your Teams app locally using Visual Studio

Teams Toolkit helps you to debug and preview your Microsoft Teams app locally. Visual Studio allows you to debug tab, bot, and message extension. You can debug your app locally in Visual Studio using Teams Toolkit by performing:

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
