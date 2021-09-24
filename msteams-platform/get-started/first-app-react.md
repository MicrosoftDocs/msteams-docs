---
title: Get started - Hello World
author: adrianhall
description: Quickly create a Microsoft Teams app using the Microsoft Teams Toolkit and React.
ms.author: adhal
ms.date: 05/27/2021
ms.topic: quickstart
ms.localizationpriority: none
---

# Build your first Microsoft Teams app

Start Microsoft Teams app development by building your first app, "Hello World!".  

In this tutorial, you'll learn:

1. [How to set up a new project with Teams Toolkit](#create-your-app-project)
1. [About the directory structure of your app project](#take-a-tour-of-the-source-code)
1. [How to run an app locally.](#build-and-run-your-app-locally-in-visual-studio-code)

## Create your app project

If the [prerequisites](prerequisites.md) are in place, let's begin!

> [!NOTE]
> The Visual Studio Code UI shown is from Mac. It may differ depending on whether your operating system is Windows or Linux.

# [Visual Studio Code](#tab/vsc)

1. Open Visual Studio Code.
1. Select the Teams Toolkit :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.png"::: icon in the Visual Studio Code sidebar.

1. Select **Create a new Teams app**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/create-project.png" alt-text="Location of the Create New Project link in the Teams Toolkit sidebar." border="false":::

1. Select **Create a new Teams app** to create an app using the Teams Toolkit.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/create-new-app.png" alt-text="Wizard start for Create New Project" border="false":::

1. Ensure that **Tab UI-based app** is selected as the capability that you want to build in your app, and select **OK**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/select-capabilities-tab.png" alt-text="Select App Capability" border="false":::

1. Select **Azure** as the Frontend hosting type.
    
    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/create-project-hosting.png" alt-text="Select Hosting Type" border="false":::
    
    If you want to host your app on SharePoint, you can select SharePoint Framework (SPFx) in this option.

1. Select **OK** to continue. You don't need other cloud resources for this tutorial.
    
    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/create-project-cloud-resources.png" alt-text="Cloud Resources" border="false":::

1. Select **JavaScript** as the programming language.
    
    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/select-language.png" alt-text="Screenshot showing how to select the programming language." border="false":::

1. Select a workspace folder for the app. Teams Toolkit creates the app's directory structure in this workspace for your project.

1. Enter `HelloWorld` as the application name. Ensure that you use only alphanumeric characters. Select **Enter** to continue.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/create-project-name.png" alt-text="Screenshot showing where to enter the app name." border="false":::

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

Teams Toolkit provides all components for building an app. After creating the project, you can view the project folders and files in the Explorer area of Visual Studio Code.

:::image type="content" source="../assets/images/teams-toolkit-v2/hw-folder-structure.png" alt-text="Project files scaffolded for the app with Tab capability in Visual Studio Code.":::

Although you're free to choose any UI framework you want (or not to use any), this sample template code provides a scaffolding with React components.

Among other items in this directory structure, the Toolkit maintains:

- The state for your app in the `.fx` folder.
- The app icons in the `appPackage` folder. The icons are `color.png` and `outline.png`.
- The app manifest for publishing to the Developer Portal for Teams in `manifest.source.json`.
- The app settings, which you selected during project creation, in `settings.json`.
- The code for the Tab capability in the `Tabs` folder. Some of the important files in this folder are:

  - `tabs/src/index.jsx` is the front-end app's entry point, where the main `App` component is rendered with `ReactDOM.render()`.
  - `tabs/src/components/App.jsx` handles URL routing in the app. It calls the [Microsoft Teams JavaScript client SDK](../tabs/how-to/using-teams-client-sdk.md) to establish communication between the app and Teams.
  - `tabs/src/components/Tab.jsx` contains the code to implement the UI of your app.
  - `tabs/src/components/TabConfig.jsx` contains the code to implement the UI that configures your app.
  - This folder also holds the code for tabs needed at runtime. Some of them are the privacy notice, terms of use, and configuration tabs.

When you add the cloud functionality, Teams Toolkit adds the necessary folders to the project. The `api` folder holds the code to any Azure Functions you write.

## Sign in to your Microsoft 365 account

Use this account to sign in to Teams. If you're using a Microsoft 365 developer program tenant, the admin account you set up while registering is your Microsoft 365 account.


# [Visual Studio Code](#tab/viscode)

1. Open Visual Studio Code.
1. Select the Teams Toolkit  :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.png"::: icon in the sidebar.
1. Select **Sign in to M365**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/account-signin.png" alt-text="Screenshot showing where to sign in to Microsoft 365 and Azure." border="false":::

    Your default web browser opens to let you sign in to the account.

1. Sign in to your Microsoft 365 account using your credentials.
1. Close the browser when prompted, and return to Visual Studio Code.
1. Return to Teams Toolkit within Visual Studio Code.

    The **ACCOUNTS** section of the sidebar shows your Microsoft 365 account name.

    Now you're ready to build the app and run it locally!

# [Visual Studio 2019](#tab/vscode)

Visual Studio 2019 prompts you to log into each service as required. You don't need to sign in to your Microsoft 365 and Azure accounts in advance.

# [Command line](#tab/cline)

1. Sign in to Microsoft 365 with the TeamsFx CLI:

    ``` bash
    teamsfx account login m365
    ```

    Your default web browser opens to let you sign in to the account. Sign in to your Azure account using your credentials. Close the browser when you're prompted.

2. Sign in to Azure with the TeamsFx CLI:

    ``` bash
    teamsfx account login azure
    ```

    Your default web browser opens to let you sign in to the account. Sign in to your Azure account using your credentials. Close the browser when you're prompted.

    The account logins are shared between Visual Studio Code and the TeamsFx CLI.

    Now that the development environment is configured, you can create, build, and deploy your first Teams app.

---

## Build and run your app locally in Visual Studio Code

To build and run your app locally:

1. From Visual Studio Code, select **F5** to run the application in debug mode.

    <!-- markdownlint-disable MD033 -->

    <details>
    <summary>Learn what happens when you run your app locally in the debugger.</summary>

    In case you're wondering, when you press the **F5** key the Teams Toolkit:

    - Registers your app with Azure Active Directory. This app has permissions for the location that the app is loaded from and the backend resources.
    - *Sideloads* the app in Teams.
    - Starts the app's backend running locally using [Azure Function Core Tools](/azure/azure-functions/functions-run-local?#start).
    - Starts the app's frontend hosted locally.
    - Starts Microsoft Teams in a web browser with a command to instruct Teams to side load the app from `https://localhost:3000/tab`. This URL is registered in the app's manifest.
    - An app manifest is generated and exists in the Developer Portal for Teams. Teams uses the app manifest to tell connected clients where to load the app from.

    </details>

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/f5-build-and-run.png" alt-text="Screenshot showing when F5 key is pressed.":::

   > When you run the app for the first time, all dependencies are downloaded and the app is built.  A browser window opens when the build is complete. This can take 3-5 minutes to complete.

   The Toolkit prompts you to install a local certificate, if necessary. This certificate allows Teams to load your application from `https://localhost`. 

1. Select **Yes** if the following dialog appears:

   :::image type="content" source="../assets/images/teams-toolkit-v2/ssl-prompt.png" alt-text="Screenshot showing the prompt to install an SSL certificate to enable Teams to load your application from localhost.":::

    Or select **Continue**, depending on your operating system:

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/ssl-prompt-mac.png" alt-text="Screenshot showing the prompt to install an SSL certificate to enable Teams to load your application from localhost on Mac.":::

1. Teams web client opens in a browser window. Sign in with your Microsoft 365 account when prompted.

1. Select **Add** when prompted to sideload the app onto Teams on your local machine.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/launch-web-browser-add.png" alt-text="Add the app to Teams":::
 
1. Select the web app version, if you're asked to switch to Teams desktop. Run your app in the Teams web client. You can see the HTML, CSS, and JavaScript code in a standard web development environment.
    
    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/launch-web-browser-and-pick-webapp.png" alt-text="Screenshot showing how to pick the web version of teams when launched":::

1. Congratulations, your first app is running on Teams!

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/launch-web-browser-congratulations.png" alt-text="Screenshot of the completed app":::

You can do normal debugging activities, such as setting breakpoints, as if it were any other web application. The app supports hot reloading. If you change any file within the project, the page will be reloaded.

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

| **<<** | **>>** |
|:--- | ---:|
| **Back** : [Prerequisites](prerequisites.md) | [Create your first bot app](first-app-bot.md) : **Next**|
|


## See also

- [Tutorials Overview](code-samples.md)
- [Create a conversational bot app](first-app-bot.md)
- [Create a messaging extension](first-message-extension.md)
- [Code Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples)