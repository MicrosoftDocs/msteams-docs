---
title: Get started - Build your first Teams app with React
author: adrianhall
description: Quickly create a Microsoft Teams app that displays a "Hello, World!" message using the Microsoft Teams Toolkit and React.
ms.author: adhal
ms.date: 05/27/2021
ms.topic: quickstart
---

# Build and run your first Microsoft Teams app with React

In this tutorial, you will learn how to create a new Microsoft Teams app in React that implements a simple personal app to pull information from the Microsoft Graph. For example, a *personal app* includes a set of tabs for individual use. During the tutorial, you will learn about the structure of a Teams app, how to run an app locally, and how to deploy the app to Azure.

The app that is built displays basic user information for the current user. When permission is granted, the app will connect to the Microsoft Graph as the current user to get the complete profile.

## Before you begin

Make sure your development environment is set up by installing the prerequisites.

> [!div class="nextstepaction"]
> [Install prerequisites](prerequisites.md)

## Create your project

Use the Teams Toolkit to create your first project:

# [Visual Studio Code](#tab/vscode)

1. Open Visual Studio code.
1. Open the Teams Toolkit and select the Teams icon in the sidebar:

    :::image type="content" source="../assets/images/teams-toolkit-v2/sidebar-icon.png" alt-text="The Teams Icon in the Visual Studio Code sidebar.":::

1. Select **Create New Project**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-project.png" alt-text="Location of the Create New Project link in the Teams Toolkit sidebar.":::

1. Select **Create a new Teams app**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-new-project-intro.png" alt-text="Wizard start for Create New Project":::

1. In the **Select capabilities** section, varify that **Tab** is selected and select **OK**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-project-capabilities.png" alt-text="Screenshot showing how to add capabilities to your new app.":::

1. In the **Frontend hosting type** section, select **Azure**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-project-hosting.png" alt-text="Screenshot showing how to select hosting for your new app.":::

1. In the **Cloud resources** section, select **OK**.  We do not need additional cloud resources for this tutorial.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-project-cloud-resources.png" alt-text="Screenshot showing how to add cloud resources for your new app.":::

1. In the **Programming Language** section, select **JavaScript**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/create-project-programming-languages.png" alt-text="Screenshot showing how to select the programming language.":::

1. Select a workspace folder. A folder is created within your workspace folder for the project you are creating.

1. Enter a suitable name for your app, like `helloworld`. The name of the app must consist only of alphanumeric characters.  Press **Enter** to continue.

   Your Teams app is created within a few seconds.

# [Command line](#tab/cli)

Use the `teamsfx` CLI to create your first project.  Start from the folder where you want to create the project folder.

``` bash
teamsfx new
```

The CLI walks through some questions to create the project. Each question will tell you how to answer it, for example, use arrow keys to select an option. When you have answered the question, confirm your choice by pressing **Enter**.

1. Select **Create a new Teams app**.
1. Select the **Tab** capability.
1. Select **Azure** frontend hosting. Do not select any cloud resources.
1. Select **JavaScript** as the programming language.
1. Press **Enter** to select the default workspace folder.
1. Enter a suitable name for your app, like `helloworld`.  The name of the app must consist only of alphanumeric characters.

   After all the questions have been answered, your project is created.

---

## Take a tour of the source code

If you wish to skip this section for now, you can [run your app locally](#run-your-app-locally).

After the Teams Toolkit configures your project, you have the components to build a basic personal app for Teams. The project directories and files display in the Explorer area of Visual Studio Code.

:::image type="content" source="../assets/images/teams-toolkit-v2/react-app-project.png" alt-text="Screenshot showing app project files for a personal app in Visual Studio Code.":::

The Toolkit automatically creates scaffolding for you in the project directory based on the capabilities you added during setup. The Teams Toolkit maintains its state for your app in the `.fx` directory.  Among other items in this directory:

- The app icons are stored as PNG files in `color.png` and `outline.png`.
- The app manifest for publishing to the Developer Portal for Teams is stored in `manifest.source.json`.
- The settings you chose when creating the project are stored in `settings.json`.

Since you selected the tab capability during setup, the Teams Toolkit scaffolds all the necessary code for a basic tab in the `tabs` directory. Within this directory there are several important files:

- `tabs/src/index.jsx` is the front-end app's entry point, where the main `App` component is rendered with `ReactDOM.render()`.
- `tabs/src/components/App.jsx` handles URL routing in your app. It calls the [Microsoft Teams JavaScript client SDK](../tabs/how-to/using-teams-client-sdk.md) to establish communication between your app and Teams.
- `tabs/src/components/Tab.jsx` contains the code to implement the UI of your app.
- `tabs/src/components/TabConfig.jsx` contains the code to implement the UI that configures your app.

Several tabs are required by the Teams runtime, including the privacy notice, terms of use, and configuration tabs.  The code for the privacy notice and terms of use are located in the same directory.

When you add cloud functionality, additional directories are added to the project.  Most notably, the `api` directory holds the code to any Azure Functions you write.

## Run your app locally

Teams Toolkit allows you to run your app locally.  This consists of several parts that are necessary to provide the correct infrastructure that Teams expects:

- An application is registered with Azure Active Directory.  This application has permissions associated with the location that the app is loaded from and any backend resources it accesses.
- A web API is hosted to assist with authentication tasks, acting as a proxy between the app and Azure Active Directory.  This is run by Azure Functions Core Tools.  It can be accessed at the URL `https://localhost:5000`.
- The HTML, CSS, and JavaScript resources that make up the front end of the app are hosted on a local service. It can be accessed at `https://localhost:3000`.
- An app manifest is generated and exists in the Developer Portal for Teams.  Teams uses the app manifest to tell connected clients where to load the app from.

After this is done, the app can be loaded within the Teams client.  We use the Teams web client so that we can see the HTML, CSS, and JavaScript code within a standard web development environment.

### Build and run your app locally in Visual Studio Code

To build and run your app in the local environment:
test

   > When you run the app for the first time, all dependencies are downloaded and the app is built.  A browser window automatically opens when the build is complete.  This can take 3-5 minutes to complete.

   The Toolkit prompts you to install a local certificate if required. This certificate allows Teams to load your application from `https://localhost`. Select yes when the following dialog appears:

   :::image type="content" source="../assets/images/teams-toolkit-v2/ssl-prompt.png" alt-text="Screenshot showing how the prompt to install a SSL certificate to enable Teams to load your application from localhost.":::

1. Your web browser starts to run the app. If prompted to open Teams desktop, select **Cancel** to remain in the browser. You may also be prompted to switch to Teams desktop at other times; select the Teams web app when this happens.

   :::image type="content" source="../assets/images/teams-toolkit-v2/launch-web-browser-and-pick-webapp.png" alt-text="Screenshot showing how to pick the web version of teams when launched":::

1. Sign in with your M365 account when prompted.
1. When prompted to install the app onto Teams, press **Add**.

Your app is now displayed:

:::image type="content" source="../assets/images/teams-toolkit-v2/react-finished-app.png" alt-text="Screenshot of the completed app":::

You can do normal debugging activities as if this were any other web application, such as setting breakpoints. The app supports hot reloading. If you change any file within the project, the page will be reloaded.

<!-- markdownlint-disable MD033 -->
<details>
<summary>Learn what happens when you run your app locally in the debugger.</summary>

When you press the **F5** key, the Teams Toolkit:

* Registers your application with Azure Active Directory.
* *Sideloads* your app in Teams.
* Starts your application backend running locally using [Azure Function Core Tools](/azure/azure-functions/functions-run-local?#start).
* Starts your application front-end hosted locally.
* Starts Microsoft Teams in a web browser with a command to instruct Teams to side load the application from `https://localhost:3000/tab`. This is the URL registered in the application manifest.

</details>

<!-- markdownlint-disable MD033 -->
<details>
<summary>Learn how to troubleshoot common issues when running your app locally.</summary>

To successfully run your app in Teams, you must have a Teams account that allows app sideloading. For more information on account opening, see [prerequisites](prerequisites.md#enable-sideloading).

</details>

[!INCLUDE [Provision and Deploy your app on Azure](~/includes/get-started/azure-provisioning-instructions.md)]

<!-- markdownlint-disable MD033 -->
<details>
<summary>Learn what happens when you deployed your app to Azure</summary>

Before deployment, the application has been running locally:

* The backend runs using **Azure Functions Core Tools**.
* The application HTTP endpoint, where Microsoft Teams loads the application, runs locally.

Deployment involves provisioning resources on an active Azure subscription and deploying or uploading the backend and frontend code for the application to Azure.

* The backend if configured uses a variety of Azure services, including Azure App Service and Azure Storage.
* The frontend application will be deployed to an Azure Storage account configured for static web hosting.

</details>

## See also

* [Tutorials Overview](code-samples.md)
* [Create a conversational bot app](first-app-bot.md)
* [Create a messaging extension](first-message-extension.md)
* [Code Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples)
