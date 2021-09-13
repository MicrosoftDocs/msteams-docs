---
title: Get started - Build your first Teams app with React
author: adrianhall
description: Quickly create a Microsoft Teams app that displays a "Hello, World!" message using the Microsoft Teams Toolkit and React.
ms.author: adhal
ms.date: 05/27/2021
ms.topic: quickstart
ms.localizationpriority: none
---

# Build and run your first Microsoft Teams app with React

This tutorial walks you through the steps to create, build, and deploy a Teams app using React.

## Before you begin

Make sure the development environment is set up by installing the prerequisites.

> [!div class="nextstepaction"]
> [Install prerequisites](prerequisites.md)

## Create your project

Use the Teams Toolkit to create your first project:

# [Visual Studio Code](#tab/vscode)

:::row:::

   :::column span="3":::
1. Open Visual Studio code.
1. Select the Teams icon in the sidebar.
1. From the **Development** section, select **Create a new Teams app**.
1. Select **Create a new Teams app** to create an app using the Teams Toolkit.
1. Verify that **Tab UI-based app** is selected as the capability, and select **OK**.
1. Select **Azure** as the Frontend hosting type.
1. You don't need other cloud resources for this tutorial. Select **OK** to continue. 
1. Select **JavaScript** as the programming language.
1. Select a workspace folder for the app. The Toolkit creates a folder in this workspace for your project.
1. Enter `HelloWorld` as the application name. Ensure that you use only alphanumeric characters. Select **Enter** to continue.

   The Teams app is created within a few seconds.
:::column-end:::

:::column span="3":::
Watch this video to follow through the steps to create and run a Teams app.

[![My First App]({../assets/videos/AppReact_Sample_0.3} "My First App")

:::column-end:::

:::row-end:::

# [Command line](#tab/cli)

Use the `teamsfx` CLI to create your first project. Start from the folder where you want to create the project folder.

``` bash
teamsfx new
```

You can use the CLI to create a new Teams app. The CLI leads you through a series of questions. Every question includes an instruction on answering it.

For example, Use arrow keys to select an option. After you make the choice, select **Enter** to confirm it.

1. Select **Create a new Teams app**.
1. Select the **Tab** capability.
1. Select **Azure** frontend hosting. 
1. Don't select any cloud resources.
1. Select **JavaScript** as the programming language.
1. Press **Enter** to select the default workspace folder.
1. Enter `helloworld` as the name for your app. The name of the app must have only alphanumeric characters.

   After you've answered all the questions, your project is created.

---

## Take a tour of the source code

If you wish to skip this section for now, you can [run your app locally](#run-your-app-locally).

After project creation, you have the components to build a basic personal app. You can view the project directories and files in the Explorer area of Visual Studio Code.


:::image type="content" source="../assets/images/teams-toolkit-v2/react-app-project.png" alt-text="Screenshot showing app project files for a personal app in Visual Studio Code.":::

The Teams Toolkit creates a scaffolding for your project based on the capabilities you selected.

Among other items in this directory, the Toolkit maintains:

- The state for your app in the `.fx` directory. 
- The app icons in the `appPackage` directory. The icons are `color.png` and `outline.png`.
- The app manifest for publishing to the Developer Portal for Teams in `manifest.source.json`.
- The app settings, which you selected during project creation, in `settings.json`.
- The code for the Tab capability in the `tabs` directory. The important files in this directory are:

  - `tabs/src/index.jsx` is the front-end app's entry point, where the main `App` component is rendered with `ReactDOM.render()`.
  - `tabs/src/components/App.jsx` handles URL routing in the app. It calls the [Microsoft Teams JavaScript client SDK](../tabs/how-to/using-teams-client-sdk.md) to establish communication between the app and Teams.
  - `tabs/src/components/Tab.jsx` contains the code to implement the UI of your app.
  - `tabs/src/components/TabConfig.jsx` contains the code to implement the UI that configures your app.
  - This directory also holds the code for tabs needed at runtime. Some of them are the privacy notice, terms of use, and configuration tabs.

When you add the cloud functionality, the Teams Toolkit adds the necessary directories to the project. The `api` directory holds the code to any Azure Functions you write.

## Run your app locally

You can use Teams Toolkit to run the app in the local environment. To prepare the environment, ensure that:

- The app is registered with Azure Active Directory. This application has permissions for the location that the app is loaded from and for any backend resources it accesses.

- The Azure Functions Core Tools hosts a web API that assists with authentication tasks. This API acts as a proxy between the app and the Azure Active Directory. You can access it from `https://localhost:5000`

- The HTML, CSS, and JavaScript resources that make up the front end of the app are hosted on a local service. You can access the local service from `https://localhost:3000`.

- An app manifest is generated and exists in the Developer Portal for Teams. Teams uses the app manifest to tell connected clients where to load the app from.

After it's done, load your app in the Teams client. You can see the HTML, CSS, and JavaScript code using the Teams web client.

### Build and run your app locally in Visual Studio Code

To build and run your app locally:

1. From Visual Studio Code, select **F5** to run the application in debug mode.

   > When you run the app for the first time, all dependencies are downloaded and the app is built. A web browser window opens when the build is complete.  This can take 3-5 minutes to complete.

   The Toolkit prompts you to install a local certificate, if necessary. This certificate allows Teams to load your application from `https://localhost`. Select **Yes** when the following dialog appears:

   :::image type="content" source="../assets/images/teams-toolkit-v2/ssl-prompt.png" alt-text="Screenshot showing the prompt to install an SSL certificate to enable Teams to load your application from localhost.":::

1. The web browser runs the app. If you're prompted to open Teams desktop, select **Cancel** to remain in the browser. You may also be prompted to switch to Teams desktop at other times; select the Teams web app when it happens.

   :::image type="content" source="../assets/images/teams-toolkit-v2/launch-web-browser-and-pick-webapp.png" alt-text="Screenshot showing how to pick the web version of teams when launched":::

1. Sign in with your Microsoft 365 account when prompted.
1. When prompted to install the app onto Teams, select **Add**.

You can view the app:

:::image type="content" source="../assets/images/teams-toolkit-v2/react-finished-app.png" alt-text="Screenshot of the completed app":::

You can do normal debugging activities, such as setting breakpoints, as if it were any other web application. The app supports hot reloading. If you change any file within the project, the page will be reloaded.

<!-- markdownlint-disable MD033 -->
<details>
<summary>Learn what happens when you run your app locally in the debugger.</summary>

When you select **F5**, the Teams Toolkit:

* Registers the application with Azure Active Directory.
* *Sideloads* the app in Teams.
* Starts the application backend running locally using [Azure Function Core Tools](/azure/azure-functions/functions-run-local?#start).
* Starts the application front-end hosted locally.
* Starts Microsoft Teams in a web browser with a command to instruct Teams to side load the application from `https://localhost:3000/tab`. This URL is registered in the application manifest.

</details>

<!-- markdownlint-disable MD033 -->
<details>
<summary>Learn how to troubleshoot common issues when running your app locally.</summary>

To successfully run your app in Teams, you must have a Teams account that allows app sideloading. For more information on account opening, see [Prerequisites](prerequisites.md#set-up-your-teams-development-tenant-optional).

</details>

[!INCLUDE [Provision and Deploy your app on Azure](~/includes/get-started/azure-provisioning-instructions.md)]

<!-- markdownlint-disable MD033 -->
<details>
<summary>Learn what happens when you deployed your app to Azure</summary>

Before deployment, the application has been running locally:

* The backend runs using **Azure Functions Core Tools**.
* The application HTTP endpoint, where Microsoft Teams loads the application, runs locally.

Deployment is a two-step process. You provision the resources on an active Azure subscription, and then deploy or upload the backend and frontend code for the application to Azure.

* The backend, if configured, uses various Azure services, including Azure App Service and Azure Storage.
* The frontend application will be deployed to an Azure Storage account configured for static web hosting.

</details>

## See also

* [Tutorials Overview](code-samples.md)
* [Create a conversational bot app](first-app-bot.md)
* [Create a messaging extension](first-message-extension.md)
* [Code Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples)