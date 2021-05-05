---
title: Get started - Build your first Teams app with React
author: adrianhall
description: Quickly create a Microsoft Teams app that displays a "Hello, World!" message using the Microsoft Teams Toolkit and React.
ms.author: adhal
ms.date: 05/05/2021
ms.topic: quickstart
---

# Build and run your first Microsoft Teams app with React

In this tutorial, you will create a new Microsoft Teams app in React that implements a simple tab to pull information from the Microsoft Graph.  During the tutorial, you will learn about the structure of a Teams app, how to run an app locally, and how to deploy the app to Azure.

The app that is built displays basic user information for the current user.  When permission is granted, the app will connect to the Microsoft Graph as the current user to get the complete profile.

## Before you begin

Make sure your development environment is set up by installing the [Prerequisites](prerequisites.md)

> [!div class="nextstepaction"]
> [Install Prerequisites](prerequisites.md)

## Create your project

Use the Teams Toolkit to create your first project:

# [Visual Studio Code](#tab/vscode)

1. Open Visual Studio code.
1. Open the Teams Toolkit by selecting the Teams icon in the sidebar:

    :::image type="content" source="../assets/images/teams-toolkit-v2/sidebar-icon.png" alt-text="The Teams Icon in the Visual Studio Code sidebar.":::

1. Select **Create New Project**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-project.png" alt-text="Location of the Create New Project link in the Teams Toolkit sidebar.":::

1. Select **Create a new Teams app**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-new-project-intro.png" alt-text="Wizard start for Create New Project":::

1. On the **Select capabilities** step, the **Tab** capability will already be selected.  Press **OK**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-project-capabilities.png" alt-text="Screenshot showing how to add capabilities to your new app.":::

1. On the **Frontend hosting type** step, select **Azure**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-project-hosting.png" alt-text="Screenshot showing how to select hosting for your new app.":::

1. On the **Cloud resources** step, press **OK**.  We do not need additional cloud resources for this tutorial.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-project-cloud-resources.png" alt-text="Screenshot showing how to add cloud resources for your new app.":::

1. On the **Programming Language** step, select **JavaScript**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/create-project-programming-languages.png" alt-text="Screenshot showing how to select the programming language.":::

1. Select a workspace folder.  A folder will be created within your workspace folder for the project you are creating.

1. Enter a suitable name for your app, like `helloworld`.  The name of the app must consist only of alphanumeric characters.  Press **Enter** to continue.

Your Teams app will be created within a few seconds.

# [Command Line](#tab/cli)

Use the `teamsfx` CLI to create your first project.  Start from the folder where you want to create the project folder.

``` bash
teamsfx new
```

The CLI walks through some questions to create the project.  Each question will tell you how to answer it (for example, to use arrow keys to select an option).  When you have answered the question, confirm your choice by pressing **Enter**.

1. Select **Create a new Teams app**.
1. Choose the **Tab** capability.
1. Select **Azure** frontend hosting.
1. Do not select any cloud resources.
1. Select **JavaScript** as the programming language.
1. Press **Enter** to select the default workspace folder.
1. Enter a suitable name for your app, like `helloworld`.  The name of the app must consist only of alphanumeric characters.

Once all the questions have been answered, your project will be created.

---

## Take a tour of the source code

If you wish to skip this section for now, you can [run your app locally](#run-your-app-locally).

Once the Teams Toolkit configures your project, you have the components to build a basic personal tab for Teams. The project directories and files display in the Explorer area of Visual Studio Code.

:::image type="content" source="../assets/images/teams-toolkit-v2/react-app-project.png" alt-text="Screenshot showing app project files for a personal tab in Visual Studio Code.":::

The Toolkit automatically creates scaffolding for you in the project directory based on the capabilities you added during setup. The Teams Toolkit maintains its state for your app in the `.fx` directory.  Among other items in this directory:

- The application icons are stored as PNG files in `color.png` and `outline.png`.
- The application manifest for publishing to Teams App Portal is stored in `manifest.remote.json`.
- The settings you chose when creating the project are stored in `settings.json`.

Since you created a tab app during setup, the Teams Toolkit scaffolds all the necessary code for a basic tab in the `tabs` directory. Within this directory there are several important files:

- `tabs/src/index.js` is the front-end application's entry point, where the main `App` component is rendered with `ReactDOM.render()`.
- `tabs/src/components/App.js` handles URL routing in your app. It calls the [Microsoft Teams JavaScript client SDK](../tabs/how-to/using-teams-client-sdk.md) to establish communication between your app and Teams.
- `tabs/src/Tab.js` contains the code to implement the UI of your application.
- `tabs/src/TabConfig.js` contains the code to implement the UI that configures your application.

Several tabs are required by the Teams runtime, including the privacy notice, terms of use, and configuration tabs.  The code for the privacy notice and terms of use are located in the `about` directory.

When you add cloud functionality, additional directories are added to the project.  Most notably, the `api` directory holds the code to any Azure Functions you write.

## Run your app locally

Teams Toolkit allows you to run your app locally.  This consists of several parts that are necessary to provide the correct infrastructure that Teams expects:

- An application is registered with Azure Active Directory.  This application has permissions associated with the location that the app is loaded from and any backend resources it accesses.
- A Web API is hosted to assist with authentication tasks, acting as a proxy between the app and Azure Active Directory.  This is run by Azure Functions Core Tools.  It can be accessed at the URL `https://localhost:5000`.
- The HTML, CSS, and JavaScript resources that make up the front end of the app are hosted on a local service. It can be accessed at `https://localhost:3000`.
- An app manifest is generated and submitted to the Teams App Portal.  Teams uses the app manifest to tell connected clients where to load the app from.

Once this is done, the app can be loaded within the Teams client.  We use the Teams web client so that we can see the HTML, CSS, and JavaScript code within a standard web development environment.

### (Optional) Adjust your browser launch settings

When developing a Teams app, it is common to run your app in an alternate developer tenant or with alternate credentials.  Both Microsoft Edge and Google Chrome provide facilities to adjust the launch settings for your browser.  For example, to update the project to support InPrivate mode (Microsoft Edge), open the `.vscode/launch.json` file in your project.  Look for the appropriate launch settings, and add the following block to each one:

``` json
"runtimeArgs": [ "--inprivate" ]
```

For instance, the launch setting for running locally looks like this:

``` json
{
   "name": "Start and Attach to Frontend (Edge)",
   "type": "pwa-msedge",
   "request": "launch",
   "url": "https://teams.microsoft.com/_#/l/app/${localTeamsAppId}?installAppPackage=true",
   "preLaunchTask": "Start Frontend",
   "postDebugTask": "Stop All Services",
   "presentation": {
         "group": "all",
         "hidden": true
   },
   "runtimeArgs": [ "--inprivate" ]
},
```

Alternatively, you can configure your browser to use the last known profile. [Create a new profile](https://support.microsoft.com/topic/sign-in-and-create-multiple-profiles-in-microsoft-edge-df94e622-2061-49ae-ad1d-6f0e43ce6435) in Microsoft Edge.  Then adjust the settings to use the last known profile for new links:

- In Microsoft Edge, open `edge://settings/profiles/multiProfileSettings`.
- Turn off **Automatic profile switching**.
- For the **Default profile for external links**, select **Last used (default)**.

Ensure your browser is opened to the correct profile before debugging your app.

### Build and run your app locally in Visual Studio Code

To build and run your app locally:

1. From Visual Studio Code, press **F5** to run your application in debug mode.

   > When you run the app for the first time, all dependencies are downloaded and the app is built.  A browser window automatically opens when the build is complete.  This can take 3-5 minutes to complete.

   >[!NOTE]
   > The Toolkit will prompt you to install a local certificate if needed. This certificate allows Teams to load your application from `https://localhost`. Select yes when the following dialog appears:

   :::image type="content" source="../assets/images/teams-toolkit-v2/ssl-prompt.png" alt-text="Screenshot showing how the prompt to install a SSL certificate to enable Teams to load your application from localhost.":::

1. Teams will be loaded in a web browser, and you will be prompted to sign in.  Sign in with your M365 account.
1. When prompted to install the app onto Teams, press **Add**.

Your app will now be displayed:

:::image type="content" source="../assets/images/teams-toolkit-v2/react-finished-app.png" alt-text="Screenshot of the completed app":::

You can do normal debugging activities as if this were any other web application (such as setting breakpoints). The app supports hot reloading.  If you change any file within the project, the page will be reloaded.

<!-- markdownlint-disable MD033 -->
<details>
<summary>Learn what happens when you run your app locally in the debugger.</summary>

When you pressed F5, the Teams Toolkit:

1. Registered your application with Azure Active Directory.
1. Registered your application for "side loading" in Microsoft Teams.
1. Started your application backend running locally using [Azure Function Core Tools](https://docs.microsoft.com/azure/azure-functions/functions-run-local?#start).
1. Started your application front-end hosted locally.
1. Started Microsoft Teams in a web browser with a command to instruct Teams to side load the application from `https://localhost:3000/tab` (the URL is registered inside the application manifest).

</details>

<!-- markdownlint-disable MD033 -->
<details>
<summary>Learn how to troubleshoot common issues when running your app locally.</summary>

To successfully run your app in Teams, you must have a Microsoft 365 development account that allows app side loading. For more information on account opening, see [Prerequisites](prerequisites.md#enable-side-loading).

</details>

## Deploy your app to Azure

Deployment consists of two steps.  First, necessary cloud resources are created (also known as provisioning), then the code that makes up your app is copied into the created cloud resources.

# [Visual Studio Code](#tab/vscode)

1. Open Visual Studio Code.
2. Select the Teams Toolkit from the sidebar by selecting the Teams icon.
3. Select **Provision in the Cloud**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/provisioning-commands.png" alt-text="Screenshot showing the provisioning commands":::

4. If required, select a subscription to use for the Azure resources.

   > [!NOTE]
   > There are always some Azure resources used for hosting your app.

   The provisioning process will create resources in the Azure cloud.  This will take some time.  You can monitor the progress by watching the dialogs in the bottom right corner.  After a few minutes, you will see the following notice:

   :::image type="content" source="../assets/images/teams-toolkit-v2/provision-complete.png" alt-text="Screenshot showing the provisioning complete dialog.":::

5. Once provisioning is complete, select **Deploy to the Cloud**.  As with provisioning, this process takes some time.  You can monitor the process by watching the dialogs in the bottom right corner. After a few minutes, you will see a completion notice.

# [Command Line](#tab/cli)

In your terminal window:

1. Run `teamsfx provision`.

   ``` bash
   teamsfx provision
   ```

   You may be prompted to log in to your Azure subscription.  If required, you will be prompted to select an Azure subscription to use for the Azure resources.

   > [!NOTE]
   > There are always some Azure resources used for hosting your app.

2. Run `teamsfx deploy`.

   ``` bash
   teamsfx deploy
   ```

---

> [!NOTE]
> **What's the difference between Provision and Deploy?**
>
> The **Provision** step will create resources in Azure and M365 for your app, but no code (HTML, CSS, JavaScript, etc.) is copied to the resources.  The **Deploy** step will copy the code for your app to the resources you created during the provision step.  It is common to deploy multiple times without provisioning new resources. Since the provision step can take some time to complete, it is separate from the deployment step.

Once the provisioning and deployment steps are finished:

1. From Visual Studio Code, open the debug panel (**Ctrl+Shift+D** / **⌘⇧-D** or **View > Run**)
2. Select **Launch Remote (Edge)** from the launch configuration drop-down.
3. Press the Play button to launch your app - now running remotely from Azure!

<!-- markdownlint-disable MD033 -->
<details>
<summary>Learn what happens when you deployed your app to Azure</summary>

Before deployment, the application has been running locally:

1. The backend runs using _Azure Functions Core Tools_.
1. The application HTTP endpoint, where Microsoft Teams loads the application, runs locally.

Deployment involves provisioning resources on an active Azure subscription and deploying (uploading) the backend and frontend code for the application to Azure.

1. The backend (if configured) uses a variety of Azure services, including Azure App Service and Azure Storage.
1. The frontend application will be deployed to an Azure Storage account configured for static web hosting.

</details>

## Next steps

Learn about other methods for creating tab apps:

- [Create a Teams app as a SharePoint Web Part](first-app-spfx.md) (Azure not required).
- [Create a Blazor Teams app](first-app-blazor.md).
- [Create a conversational bot app](first-app-bot.md).
- [Create a messaging extension](first-message-extension.md).
