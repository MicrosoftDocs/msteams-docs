---
title: Debug your Teams app locally v4
author: surbhigupta 
description: In this module, learn how to debug your Teams app locally in Teams Toolkit v4.
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/21/2022
zone_pivot_groups: teams-app-platform
---

# Debug your Teams app locally v4

Teams Toolkit helps you to debug and preview your Microsoft Teams app locally. During the debug process, Teams Toolkit automatically starts app services, launches debuggers, and side-loads the Teams app. You can preview your Teams app in Teams web client locally after debugging.

::: zone pivot="visual-studio-code"

## Debug your Teams app locally for Visual Studio Code

Teams Toolkit in Microsoft Visual Studio Code gives you the features to automate debugging of your Teams app locally. Visual Studio Code allows you to debug tab, bot, and message extension. You need to set up Teams Toolkit before you debug your app.

> [!NOTE]
> You can upgrade your old Teams Toolkit project to use new tasks, for more information, see [debug settings doc](https://aka.ms/teamsfx-debug-upgrade-new-tasks)

## Set up your Teams Toolkit for debugging

The following steps help you set up your Teams Toolkit before you initiate the debug process:

# [Windows](#tab/Windows)

1. Select **Debug (Edge)** or **Debug (Chrome)** from the **RUN AND DEBUG ▷** drop down.

   :::image type="content" source="images/debug-run-v4.png" alt-text="Browser option":::

1. Select **Run** > **Start Debugging (F5)**.

   :::image type="content" source="images/start-debugging-v4.png" alt-text="Start debugging":::

3. Select **Sign in** to Microsoft 365 account.

   :::image type="content" source="images/microsoft365-signin-v4.PNG" alt-text="Sign in":::

   > [!TIP]
   > You can select **Read more** to learn about Microsoft 365 Developer Program. Your default web browser opens to let you sign-in to your Microsoft 365 account with your credentials.

4. Select **Install** to install the development certificate for localhost.

    :::image type="content" source="images/install-certificate-v4.PNG" alt-text="certificate":::

   > [!TIP]
   > You can select **Learn More** to know about the development certificate.

5. Select **Yes** in the **Security Warning** dialog box:

    :::image type="content" source="images/development-certificate-v4.PNG" alt-text="certification authority":::

Toolkit launches a new Microsoft Edge or Chrome browser instance based on your selection and opens a web page to load Teams client.  

# [macOS](#tab/macOS)

1. Select **Debug Edge** or **Debug Chrome** from the **RUN AND DEBUG ▷** drop down.

   :::image type="content" source="images/debug-run-v4.png" alt-text="Browser lists":::

1. Select **Start Debugging (F5)** or  **Run** to run your Teams app in debug mode.

   :::image type="content" source="images/start-debugging-v4.png" alt-text="Debug your app":::

3. Select **Sign in** to Microsoft 365 account.

   :::image type="content" source="images/microsoft365-signin-v4.PNG" alt-text="Sign into M365 account":::

   > [!TIP]
   > You can select **Read more** to learn about Microsoft 365 Developer Program. Your default web browser opens to let you sign-in to your Microsoft 365 account using your credentials.

4. Select **Install** to install the development certificate for localhost.

    :::image type="content" source="images/install-certificate-v4.PNG" alt-text="certificate":::

   > [!TIP]
   > You can select **Learn More** to know about the development certificate.

5. Enter your **User Name** and **Password**, then select **Update Settings**.

    :::image type="content" source="images/mac-settings-v4.png" alt-text="mac sign in":::

Teams Toolkit launches your browser instance and opens a web page to load Teams client.

---

## Debug your app

After the initial setup process, Teams Toolkit starts the following processes:

* [Starts app services](#starts-app-services)
* [Launches debug configurations](#launches-debug-configurations)
* [Sideloads the Teams app](#sideloads-the-teams-app)

### Starts app services

Runs tasks as defined in `.vscode/tasks.json`.

|  Component |  Task name  | Folder |
| --- | --- | --- |
|  Tab |  **Start Frontend** |  tabs |
|  Bot or message extensions |  **Start Bot** |  bot |
|  Azure Functions |  **Start Backend** |  API |

The following image displays task names in the **OUTPUT** and **TERMINAL** tabs of the Visual Studio Code while running tab, bot or message extension, and Azure Functions.

:::image type="content" source="images/Terminal1-v4.png" alt-text="Start app services" lightbox="images/Terminal1-v4.png":::

### Launches debug configurations

Launches the debug configurations as defined in `.vscode/launch.json`.

:::image type="content" source="images/launch-debuggers-v4.png" alt-text="Launch debugger":::

The following table lists the debug configuration names and types for project with tab, bot or message extension app, and Azure Functions:

|  Component |  Debug configuration name  | Debug configuration type |
| --- | --- | --- |
|  Tab |  **Attach to Frontend (Edge)** or  **Attach to Frontend (Chrome)**  |  pwa-msedge or pwa-chrome  |
|  Bot or message extensions |   **Attach to Bot** |  pwa-node |
| Azure Functions |   **Attach to Backend** |  pwa-node |

The following table lists the debug configuration names and types for project with bot app, Azure Functions and without tab app:

|  Component |  Debug configuration name  | Debug configuration type  |
| --- | --- | --- |
|  Bot or message extension  | **Launch Bot (Edge)** or  **Launch Bot (Chrome)**  |   pwa-msedge or pwa-chrome  |
|  Bot or message extension  |   **Attach to Bot** |  pwa-node  |
|  Azure Functions |  **Attach to Backend** |  pwa-node |

### Sideloads the Teams app

The configuration **Attach to Frontend** or **Launch Bot** launches Microsoft Edge or Chrome browser instance to load Teams client in web page. After the Teams client is loaded, Teams side-loads the Teams app that is controlled by the sideloading URL defined in the launch configurations [Microsoft Teams](https://teams.microsoft.com/l/app/>${localTeamsAppId}?installAppPackage=true&webjoin=true&${account-hint}). When Teams client loads in the web browser, select **Add** or select an option from the dropdown as per your requirement.

   :::image type="content" source="images/hello-local-debug-v4.png" alt-text="Add local debug" lightbox="images/hello-local-debug-v4.png":::

   Your app is added to Teams!

::: zone-end

::: zone pivot="visual-studio"

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
   > Learn more by visiting [Teams Toolkit Overview](teams-toolkit-fundamentals-v4.md).

1. After Microsoft Teams is loaded, select **Add** to install your app in Teams.

   :::image type="content" source="images/vs-localdebug-add-loadapp-v4.png" alt-text="Select add to load app":::

   > [!TIP]
   > You can also use hot reload function of Visual Studio during debug. Learn more by visiting <https://aka.ms/teamsfx-vs-hotreload>.

   > [!NOTE]
   > Ensure to post HTTP request to `http://localhost:5130/api/notification` to trigger notification, when you're debugging Notification Bot app. If you've selected HTTP trigger when creating the project, you can use any API tools such as curl (Windows Command Prompt), Postman, or any other API tool.

   > [!TIP]
   > If you make any changes to Teams app manifest file (/templates/appPackage/manifest.template.json), ensure that you perform the Prepare Teams App Dependencies command. Before you try to run the Teams app again locally.

::: zone-end

## Next step

> [!div class="nextstepaction"]
> [Debug background process](debug-background-process-v4.md)

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals-v4.md)
* [Introduction to Azure Functions](/azure/azure-functions/functions-overview)
* [Use Teams Toolkit to provision cloud resources](provision-v4.md)
* [Add capabilities to your Teams apps](add-capability-v4.md)
* [Deploy to the cloud](deploy-v4.md)
* [Manage multiple environments in Teams Toolkit](TeamsFx-multi-env-v4.md)
