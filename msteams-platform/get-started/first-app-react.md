---
title: Get started - Build your first Teams app with React
author: adrianhall
description: Quickly create a Microsoft Teams app that displays a "Hello, World!" message using the Microsoft Teams Toolkit and React.
ms.author: adhal
ms.date: 05/27/2021
ms.topic: quickstart
ms.localizationpriority: none
---

# Build your first Microsoft Teams app - Hello world with tabs

Start Microsoft Teams development by building a personal tab as the "Hello, world!".  

In this tutorial, you'll learn: 

- how to set up a new project with Teams Toolkit.
- the structure of a basic tab app and how it's built with JavaScript using React.
- how to run an app locally.

## Before you begin

Before you begin, make sure your development environment is set up by installing the prerequisites.

> [!div class="nextstepaction"]
> [Install prerequisites](prerequisites.md)

## Create your project

If the prerequisites are in place, let's begin! Use the Teams Toolkit to create your first project:

# [Visual Studio Code](#tab/vsc)

1. Select the Teams Toolkit :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.png"::: icon in the Visual Studio Code sidebar.

1. Select **Create a new Teams app**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/create-project.png" alt-text="Location of the Create New Project link in the Teams Toolkit sidebar." border="false":::

1. Select **Create a new Teams app** from the dropdown menu to create an app using the Teams Toolkit.
    :::image type="content" source="../assets/images/teams-toolkit-v2/hw-create-teams-app.png" alt-text="Create App":::

1. Ensure that **Tab UI-based app** is selected as the capability, and select **OK**.
    :::image type="content" source="../assets/images/teams-toolkit-v2/hw-app-capability.png" alt-text="Select App Capability":::

1. Select **Azure** as the Frontend hosting type.
    :::image type="content" source="../assets/images/teams-toolkit-v2/hw-hosting-type.png" alt-text="Select Hosting Type":::

1. Select **OK** to continue. You don't need other cloud resources for this tutorial. 
    :::image type="content" source="../assets/images/teams-toolkit-v2/hw-cloud-resources.png" alt-text="Cloud Resources":::

1. Select **JavaScript** as the programming language.
    :::image type="content" source="../assets/images/teams-toolkit-v2/hw-programming-language.png" alt-text="Programming Language":::

1. Select a workspace folder for the app. The Toolkit creates a folder in this workspace for your project.
1. Enter `HelloWorld` as the application name. Ensure that you use only alphanumeric characters. Select **Enter** to continue.

    The Teams app is created in a few seconds.


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

After project creation, you have the components to build a basic personal app. You can view the project directories and files in the Explorer area of Visual Studio Code.

:::image type="content" source="../assets/images/teams-toolkit-v2/hw-folder-structure.png" alt-text="Project files scaffolded for the app with Tab capability in Visual Studio Code.":::

You can find the code for the tab capability scaffolded in the **Tab** folder. Although you're free to choose any UI framework you want (or not to use any), this sample template code provides scaffolding with React components.

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

## Prepare the local environment

You can use Teams Toolkit to run the app in the local environment. To prepare the environment, ensure that:

- An application is registered with Azure Active Directory. This application has permissions for the location that the app is loaded from and for any backend resources it accesses.
- A web api is hosted to assist with authentication tasks. This API acts as a proxy between the app and Azure Active Directory. You can access it from `https://localhost:5000`
- The HTML, CSS, and JavaScript resources that make up the front end of the app are hosted on a local service. You can access the local service from `https://localhost:3000`.
- An app manifest is generated and exists in the Developer Portal for Teams. Teams uses the app manifest to tell connected clients where to load the app from.

After it's done, load your app in the Teams client. You can see the HTML, CSS, and JavaScript code using the Teams web client.


## Sign in to your Microsoft 365 and Azure accounts

You must have access to two accounts:

- Your Microsoft 365 account credentials: Use this account to sign in to Teams. If you're using a Microsoft 365 developer program tenant, the admin account you set up while registering is your Microsoft 365 account.
- Your Azure credentials: Use this account to access the Azure portal and to provision new cloud resources to support your app.

# [Visual Studio Code](#tab/viscode)

1. Open Visual Studio Code.
1. Select the Teams Toolkit  :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.png":::  icon in the sidebar.

1. Select **Sign in to M365**.

    :::image type="content" source="~/assets/images/teams-toolkit-v2/hw-M365-sign-in.png" alt-text="Sign in to Microsoft 365 and Azure.":::

    The sign-in process starts using your normal web browser. Complete the sign-in process for your Microsoft 365 account. When you're prompted, close the browser, and return to Visual Studio Code.

1. Return to the Teams Toolkit within Visual Studio Code.
1. Select **Sign in to Azure**.

    > [!TIP]
    > If you have the Azure Account extension installed and are using the same account, you can skip this step. Use the same account as you are using in other extensions.

1. The sign-in process starts using your normal web browser. Complete the sign-in process for your Azure account. When are prompted, you can close the browser, and return to Visual Studio Code.

    When complete, the **ACCOUNTS** section of the sidebar shows the two accounts separately, together with the number of usable Azure subscriptions available to you. Ensure you have at least one usable Azure subscription available. If not, sign out and use a different account.

    Now you're ready to build the app and run it locally!

# [Visual Studio 2019](#tab/vscode)

Visual Studio 2019 prompts you to log into each service as required. You don't need to sign in to your Microsoft 365 and Azure accounts in advance.

# [Command line](#tab/cline)

1. Sign in to Microsoft 365 with the TeamsFx CLI:

    ``` bash
    teamsfx account login m365
    ```

    The sign-in process starts using your normal web browser. Complete the sign-in process for your Microsoft 365 account. Close the browser when you're prompted.

2. Sign in to Azure with the TeamsFx CLI:

    ``` bash
    teamsfx account login azure
    ```

    The sign-in process starts using your normal web browser. Complete the sign-in process for your Azure account. Close the browser when you're prompted.

    The account logins are shared between Visual Studio Code and the TeamsFx CLI.


    Now that the development environment is configured, you can create, build, and deploy your first Teams app.

---

## Build and run your app locally in Visual Studio Code

To build and run your app locally:

1. From Visual Studio Code, select **F5** to run the application in debug mode.

   *Debug can take up a few minutes to complete as all dependencies are downloaded and the app is built for the first time.* 

   The Toolkit prompts you to install a local certificate, if necessary. This certificate allows Teams to load your application from `https://localhost`. Select **Yes** (or **Continue**, depending on your operating system) when the following dialog appears:

   :::image type="content" source="../assets/images/teams-toolkit-v2/ssl-prompt.png" alt-text="Screenshot showing the prompt to install an SSL certificate to enable Teams to load your application from localhost.":::

1. Teams web client opens in a browser window. Sign in with your Microsoft 365 account when prompted.

1. When prompted to install the app onto Teams, select **Add**.
    :::image type="content" source="../assets/images/teams-toolkit-v2/hw-add-app.png" alt-text="Add the app to Teams":::
 
    If you're asked to switch to Teams desktop, select the web app version to run your app. You can see the HTML, CSS, and JavaScript code in a standard web development environment.
    
    :::image type="content" source="../assets/images/teams-toolkit-v2/launch-web-browser-and-pick-webapp.png" alt-text="Screenshot showing how to pick the web version of teams when launched":::

1. Congratulations, your first app is running on Teams!

    :::image type="content" source="../assets/images/teams-toolkit-v2/react-finished-app.png" alt-text="Screenshot of the completed app":::

You can do normal debugging activities, such as setting breakpoints, as if it were any other web application. The app supports hot reloading. If you change any file within the project, the page will be reloaded.

<!-- markdownlint-disable MD033 -->

<details>
<summary>Learn what happens when you run your app locally in the debugger.</summary>

In case you're wondering, when you press the F5 key the Teams Toolkit:

* Registers your application with Azure Active Directory. This application has permissions for the location that the app is loaded from and the backend resources. 
* *Sideloads* the app in Teams.
* Starts the application backend running locally using [Azure Function Core Tools](/azure/azure-functions/functions-run-local?#start).
* Starts the application front-end hosted locally.
* Starts Microsoft Teams in a web browser with a command to instruct Teams to side load the application from `https://localhost:3000/tab`. This URL is registered in the application manifest.
* An app manifest is generated and exists in the Developer Portal for Teams. Teams uses the app manifest to tell connected clients where to load the app from.

</details>

<!-- markdownlint-disable MD033 -->
<details>
<summary>Learn how to troubleshoot common issues when running your app locally.</summary>

To successfully run your app in Teams, you must have a Teams account that allows app sideloading. For more information on account opening, see [Prerequisites](prerequisites.md#set-up-your-teams-development-tenant).

</details>

You know how to use Toolkit to set up a tab app and run it locally. Next, let’s learn how to build a conversational chat bot with Toolkit!

## Next step

> [!div class="nextstepaction"]
> [Build your first Bot](../get-started/first-app-bot.md)

> [!div class="nextstepaction"]
> [Build your first Message Extension](../get-started/first-message-extension.md)

> [!div class="nextstepaction"]
> [Deploy your app in Azure](../get-started/get-started-deploy-teams-app-azure.md)

## See also

* [Tutorials Overview](code-samples.md)
* [Create a conversational bot app](first-app-bot.md)
* [Create a messaging extension](first-message-extension.md)
* [Code Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples)