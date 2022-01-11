---
description: Learn to build Hello World app with JavaScript.
title: Create a new project that uses the Windows App SDK 
ms.date: 01/11/2022
zone_pivot_groups: teams-app-type
ms.topic: article
keywords: Teams app, tab, bots, messaging extension, JavaScript
---

# Create and build your first Teams apps

::: zone pivot="tab-app"

## Create your tab app

Start Microsoft Teams app development by creating your first app. This app uses the Tab capability.

:::image type="content" source="~/assets/images/teams-toolkit-v2/first-tab/your-helloworld-app-tab.png" alt-text="Diagram showing this app has three features. Tab is highlighted." border="false":::

In this page, you'll learn:
1. [How to set up a new Tab project with Teams Toolkit](#create-your-tab-project-workspace)
1. [About the directory structure of your app](#take-a-tour-of-the-tab-app-source-code)

### Create your tab project workspace

If the prerequisites are in place, let's begin!

> [!NOTE]
> The Visual Studio Code UI shown is from Mac. It may differ depending on your operating system, Teams Toolkit version, and environment.

# [Visual Studio Code](#tab/vscd)

1. Open Visual Studio Code.
1. Select the Teams Toolkit :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.png"::: icon in the Visual Studio Code sidebar.

1. Select **Create a new Teams app**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/create-project.png" alt-text="Location of the Create New Project link in the Teams Toolkit sidebar." border="false":::

1. Select **Create a new Teams app** to create an app using Teams Toolkit.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/create-new-app.png" alt-text="Wizard starts for creating a new project" border="false":::

1. Ensure that **Tab** is selected as the capability that you want to build in your app. Select **OK**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/select-capabilities-tab.png" alt-text="Select App Capability" border="false":::

1. Select **JavaScript** as the programming language.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/select-language-tab.png" alt-text="Screenshot showing how to select the programming language." border="false":::

1. Enter `helloworld` as the application name. Ensure that you use only alphanumeric characters. Select **Enter** to continue.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/enter-name-tab.png" alt-text="Screenshot showing where to enter the app name." border="false":::

    The Teams tab app is created in a few seconds.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/app-created.png" alt-text="Screenshot showing the app created." border="false":::

    After your app is created, Teams Toolkit displays a message to indicate the location where the project workspace is created. This folder is the default location specified in Visual Studio Code settings.

    :::image type="content" source="../assets/images/teams-toolkit-v2/location-change.png" alt-text="Location message":::

    The message offers two options:
        
    - **Change location**
    - **Local Debug**
        
    For this tutorial, you don't need to use these options.

    > [!NOTE]
    > If you choose to change the location for workspace, it is reflected only for projects you create after reloading Visual Studio Code. No change is made to the location of existing projects.

    <details>
    <summary>A quick recap of creating a Teams app.</summary>
    Watch this short recap for creating a Teams app.

    ![Create a Teams app](~/assets/videos/javascript-tab-app.gif)
        </details>

    # [Command line](#tab/cli)

    Use the `teamsfx` CLI to create your first project. Start from the folder where you want to create the project folder.

    ``` bash
    teamsfx new
    ```

    You can use the CLI to create a new Teams app. The CLI leads you through a series of questions. Every question includes an instruction on answering it.

    For example, use arrow keys to select an option. After you make the choice, select **Enter** to confirm it.

    1. Select **Create a new Teams app**.
    1. Select the **Tab** capability.
    1. Select **Azure** frontend hosting.
    1. Don't select any cloud resources.
    1. Select **JavaScript** as the programming language.
    1. Press **Enter** to select the default workspace folder.
    1. Enter `helloworld` as the name for your app. The name of the app must have only alphanumeric characters.

    After you've answered all the questions, your project is created.

    ---

    ### Take a tour of the tab app source code

    Teams Toolkit provides all components for building an app. After creating the project, you can view the project folders and files in the **Explorer** area of Visual Studio Code.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/hw-folder-structure-tab.png" alt-text="Project files scaffolded for the app with Tab capability in Visual Studio Code.":::

    Although you're free to choose any UI framework (or not to use any), this sample template code provides a scaffolding with React components.

    Among other items in this directory structure, the Toolkit maintains:

    | Folder name | Contents |
    | --- | --- |
    | `.fx/configs` | Configuration files that user can customize for the Teams app. |
    | - `.fx/configs/config.<envName>.json` | Configuration file for every environment. |
    | - `.fx/configs/azure.parameters.<envName>.json` | Parameters file for Azure BICEP provision for every environment. |
    | - `.fx/configs/projectSettings.json` | Global project settings that apply to all environments. |
    | - `.fx/configs/localSettings.json` | Configuration file for local debugging. |
    | - `.fx/states` | Provision output that is generated by Teams Toolkit.  The toolkit creates this folder after you provision resources for your app. |
    | - `.fx/states/state.<envName>.json` | Provision output file for every environment. |
    | - `.fx/states/<env>.userdata` | Sensitive user data for the provision output for every environment. |
    | `tabs` | Code for the Tab capability needed at runtime, such as the privacy notice, terms of use, and configuration tabs. |
    | - `tabs/src/index.jsx` | Entry point for the front-end app, where the main App component is rendered with `ReactDOM.render()` |
    | - `tabs/src/components/App.jsx` | Code for handling URL routing in the app. It calls the [Microsoft Teams JavaScript client SDK](../tabs/how-to/using-teams-client-sdk.md) to establish communication between your app and Teams. |
    | - `tabs/src/components/Tab.jsx` | Code to implement the UI of your app. |
    | - `tabs/src/components/TabConfig.jsx` | Code to implement the UI that configures your app. |
    | `templates/appPackage` | App manifest template files, and the app icons: color.png and outline.png. |
    | - `templates/appPackage/manifest.local.template.json` | App manifest for running the app in local environment  |
    | - `templates/appPackage/manifest.remote.template.json` | App manifest for running the app in remote environment, such as an Azure site |
    | `templates/azure` | BICEP template files |
    |

    When you add the cloud functionality, Teams Toolkit adds the necessary folders to the project. The `api` folder holds the code to any Azure Functions you write.

    ### Build and run your tab app locally
    
    After you set up your project workspace with Teams Toolkit, build your tab project. 
    You'll need to sign in to your Microsoft 365 account.

    #### Sign in to your Microsoft 365 account

    Use your Microsoft 365 account to sign in to Teams. If you're using a Microsoft 365 developer program tenant, the admin account you set up while registering is your Microsoft 365 account.

    # [Visual Studio Code](#tab/viscode)

    1. Open Visual Studio Code.
    1. Select the Teams Toolkit :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.png"::: icon in the sidebar.
    1. Select **Sign in to M365**.

        Your default web browser opens to let you sign in to the account.

    1. Sign in to your Microsoft 365 account using your credentials.
    1. Close the browser when prompted and return to Visual Studio Code.
    1. Return to Teams Toolkit within Visual Studio Code.

        The **ACCOUNTS** section of the sidebar shows your Microsoft 365 account name. Teams Toolkit displays **Sideloading enabled** if sideloading is enabled for your Microsoft 365 account.

        :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/m365-sideloading-enabled.png" alt-text="Screenshot showing where to sign in to Microsoft 365 and Azure." border="false":::

        Now you're ready to build the app and run it in the local environment!

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

    #### Build and run your app in local environment

    To build and run your app locally:

    1. From Visual Studio Code, select **F5** to run the application in debug mode.

        <!-- markdownlint-disable MD033 -->

        <details>
        <summary>Learn what happens when you run your app locally in the debugger.</summary>

        In case you're wondering, when you press the **F5** key, Teams Toolkit:

        - Registers your app with Azure Active Directory. This app has permissions for the location that the app is loaded from and the backend resources.
        - *Sideloads* the app in Teams.
        - Starts the app's backend running locally using [Azure Function Core Tools](/azure/azure-functions/functions-run-local?#start).
        - Starts the app's frontend hosted locally.
        - Starts Microsoft Teams in a web browser with a command to instruct Teams to side load the app from `https://localhost:3000/tab`. This URL is registered in the app's manifest.
        - An app manifest is generated and exists in the Developer Portal for Teams. Teams uses the app manifest to tell connected clients where to load the app from.

        </details>

        :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/f5-build-and-run.png" alt-text="Screenshot showing when F5 key is pressed.":::

    > [!NOTE]
    > When you run the app for the first time, all dependencies are downloaded, and the app is built. A browser window opens when the build is complete. This process can take 3-5 minutes to complete.

    The toolkit prompts you to install a local certificate, if necessary. This certificate allows Teams to load your application from `https://localhost`.

    1. Select **Yes** if the following dialog appears:

    :::image type="content" source="../assets/images/teams-toolkit-v2/ssl-prompt.png" alt-text="Screenshot showing the prompt to install an SSL certificate to enable Teams to load your application from localhost.":::

    Or select **Continue**, depending on your operating system:

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/ssl-prompt-mac.png" alt-text="Screenshot showing the prompt to install an SSL certificate to enable Teams to load your application from localhost on Mac.":::

    Teams web client opens in a browser window.

    1. Sign in with your Microsoft 365 account, if prompted.

    1. Select **Add** when prompted to sideload the app onto Teams on your local machine.

        :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/add-tab-app-local-debug.png" alt-text="Add the app to Teams":::

    1. Congratulations, your first app is running on Teams!

        :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/tab-app-local-debug.png" alt-text="Screenshot of the completed app":::

    1. Move through the page to view the user details.

        :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/tab-app-local-authorize.png" alt-text="Screenshot of the user information section on tab":::
        
    1. Select **Authorize** to let your app retrieve user details using Microsoft Graph.

        The app requests permission to grant access for displaying user details.

        :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/tab-app-graph-permission.png" alt-text="Screenshot of authorizing app for accessing user details":::

    1. Select **Accept** to let your app access user details.

        Your photograph and details appear in your personal tabs.

        :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/tab-app-user-info.png" alt-text="Screenshot of the user information on tab":::

        You can do normal debugging activities, such as setting breakpoints, as if it were any other web application. The app supports hot reloading. If you change any file within the project, the page will be reloaded.

      <!-- markdownlint-disable MD033 -->

      <details>
      <summary>Learn how to troubleshoot if your app doesn't run locally.</summary>

      To successfully run your app in Teams, ensure that you've enabled sideloading in your Teams account. You can learn more about sideloading in the Prerequisites section.

      </details>

      You know how to use Toolkit to set up a tab app and run it locally. Next, let's learn how to build a conversational chat bot with Toolkit!

   ::: zone-end

   ::: zone pivot="bot-app"

## Create your bot app

You've built your tab app. Now let's create your first bot app.
    
The bot capability of a Teams app creates a chatbot or a conversational bot. You use it to run simple and automated tasks, like providing customer service. A bot talks with a web service and helps you use its offerings. You can get weather forecast, make reservations, or any other service offered using a conversational bot.

:::image type="content" source="~/assets/images/teams-toolkit-v2/first-bot/your-helloworld-app-bot.png" alt-text="Diagram showing this app has three features. Bot is highlighted." border="false":::
    
As you've already prepared for creating these apps, you can set up a new Teams project for creating the bot app.

In this tutorial, you'll learn:

1. [How to set up a new Bot project with Teams Toolkit.](#create-your-bot-project-workspace)
1. [About the directory structure of your app project.](#take-a-tour-of-the-bot-app-source-code)

> [!IMPORTANT]
> Currently, bots are available in Government Community Cloud (GCC) but not available in GCC-High and Department of Defense (DOD).

### Create your bot project workspace

If the prerequisites are in place, let's begin!

> [!NOTE]
> The Visual Studio Code UI shown is from Mac. It may differ depending on your operating system, Teams Toolkit version, and environment.

# [Visual Studio Code](#tab/vs)

1. Open Visual Studio Code.
1. Select the Teams Toolkit :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.png"::: icon in the Visual Studio Code sidebar.

1. Select **Create a new Teams app**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/create-project.png" alt-text="Location of the Create New Project link in the Teams Toolkit sidebar." border="false":::

1. Select **Create a new Teams app** to create an app using the Teams Toolkit.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/create-new-app.png" alt-text="Wizard start for Create New Project" border="false":::

1. Select **Bot**, deselect **Tab**, and select **OK**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/select-capabilities-bot.png" alt-text="Screenshot showing how to add capabilities to your new app." border="false":::

1. Select **JavaScript** in the **Programming Language** section.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/select-language-bot.png" alt-text="Screenshot showing how to select the programming language." border="false":::

1. Enter a suitable name for your app, like `hellobot`. Ensure that your app's name is alphanumeric. Select **Enter** to continue.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/enter-name-bot.png" alt-text="Screenshot showing where to enter the app name." border="false":::

    Your Teams app with a Bot capability is created in a few seconds.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/app-created-bot.png" alt-text="Screenshot showing the app created." border="false":::

    After your app is created, the Teams Toolkit displays a message to indicate the location where the project workspace is created. This folder is the default location specified in Visual Studio Code settings.

    :::image type="content" source="../assets/images/teams-toolkit-v2/location-change.png" alt-text="Location message":::

    The message offers two options:

    - **Change location**
    - **Local Debug**

    For this tutorial, you don't need to use these options.

    > [!NOTE]
    > If you choose to change the location for workspace, it is reflected only for projects you create after reloading Visual Studio Code. No change is made to the location of existing projects.

    <details>
    <summary>A quick recap of creating a Teams app.</summary>
    Watch this short recap for creating a Teams app.

    ![Create a Teams app](~/assets/videos/javascript-bot-app.gif)
    </details>

    # [Command line](#tab/cli)

    Use the `teamsfx` CLI to create your first project.  Start from the folder where you want to create the project folder.

    ``` bash
    teamsfx new
    ```

    You can use the CLI to create a new Teams app. The CLI leads you through a series of questions. Every question includes an instruction on answering it.

    For example, use arrow keys to select an option. After you make the choice, select **Enter** to confirm it.

    1. Select **Create a new Teams app**.
    1. Select **Bot** and deselect **Tab**.
    1. Select **JavaScript** as the programming language.
    1. Select **Enter** to select the default workspace folder.
    1. Enter a suitable name for your app, like `HelloBot`.  The name of the app must consist only of alphanumeric characters.

    After you've answered all questions, your project is created.

    ---

### Take a tour of the bot app source code

After scaffolding is done, view the project directories and files in the Explorer area of Visual Studio Code.

:::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/hw-folder-structure-bot.png" alt-text="Project files scaffolded for bot in Visual Studio Code." border="false":::

| Folder name | Contents |
| --- | --- |
| `.fx/configs` | Configuration files that user can customize for the Teams app. |
| `.fx/configs/config.<envName>.json` | Configuration file for every environment. |
| `.fx/configs/azure.parameters.<envName>.json` | Parameters file for Azure BICEP provision for every environment. |
| `.fx/configs/projectSettings.json` | Global project settings that apply to all environments. |
| `.fx/configs/localSettings.json` | Configuration file for local debugging. |
| `.fx/states` | Provision output that is generated by the Toolkit.  The toolkit creates this folder after you provision resources for your app. |
| `.fx/states/state.<envName>.json` | Provision output file for every environment. |
| `.fx/states/<env>.userdata` | Sensitive user data for the provision output for every environment. |
| `bot` |  Code for the Bot capability needed at runtime. |
| `bot/teamsBot.js` | Main entry point for the bot app. |
| `templates/appPackage` | App manifest template files, and the app icons, color.png and outline.png. |
| `templates/appPackage/manifest.local.template.json` | App manifest for running the app in local environment  |
| `templates/appPackage/manifest.remote.template.json` | App manifest for running the app in remote environment, such as Azure site |
| `templates/azure` | BICEP template files |

> [!Tip]
> Familiarize yourself with bots outside of Teams before you integrate your first bot within Teams.

### Build and run your first bot app locally

After you set up your project workspace with Teams Toolkit, build your bot project. Ensure that you've signed in to your Microsoft 365 account.

#### Sign in to your Microsoft 365 account

Use this account to sign in to Teams. If you're using a Microsoft 365 developer program tenant, the admin account you set up while registering is your Microsoft 365 account.

# [Visual Studio Code](#tab/viscode)

1. Open Visual Studio Code.
1. Select the Teams Toolkit  :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.png"::: icon in the sidebar.
1. Select **Sign in to M365**.

    Your default web browser opens to let you sign in to the account.

1. Sign in to your Microsoft 365 account using your credentials.
1. Close the browser when prompted and return to Visual Studio Code.
1. Return to Teams Toolkit within Visual Studio Code.

    Use this account to sign in to Teams. If you're using a Microsoft 365 developer program tenant, the admin account you set up while registering is your Microsoft 365 account.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/m365-sideloading-enabled.png" alt-text="Screenshot showing where to sign in to Microsoft 365 and Azure." border="false":::

    Now you're ready to build the app and run it locally!

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

#### Build and run your first bot app locally

To build and run your app in the local environment:

1. Select **F5** in Visual Studio Code to run your app in debug mode.

    <!-- markdownlint-disable MD033 -->

<details>
<summary>Learn what happens when you run your app locally in the debugger.</summary>

In case you're wondering, when you press the **F5** key, the Teams Toolkit:

- Registers your app with Azure Active Directory. This app has permissions for the location that the app is loaded from and the backend resources.
- *Sideloads* the app in Teams.
- Starts the app's backend running locally using [Azure Function Core Tools](/azure/azure-functions/functions-run-local?#start).
- Starts the app's frontend hosted locally.
- Starts Microsoft Teams in a web browser with a command to instruct Teams to side load the app from `https://localhost:3000/tab`. This URL is registered in the app's manifest.
- An app manifest is generated and exists in the Developer Portal for Teams. Teams uses the app manifest to tell connected clients where to load the app from.

</details>

:::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/f5-build-and-run.png" alt-text="Screenshot showing when F5 key is pressed for debugging.":::

> When you run the app for the first time, all dependencies are downloaded, and the app is built. A browser window automatically opens when the build is complete. This process can take 3-5 minutes to complete.

Your web browser starts to run the app.

1. Sign in with your Microsoft 365 account, if prompted.

1. Select **Add** when prompted to sideload the app onto Teams on your local machine.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/add-bot-app-local-debug.png" alt-text="Screenshot showing the bot is being added on Teams client.":::

    Now the bot is successfully running on Teams! After the app is loaded, a chat session with the bot opens.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/app-added-bot-local-debug.png" alt-text="Screenshot showing the bot is running on Teams client.":::

    You can type `welcome` to show an introduction card, and type `learn` to go to adaptive card and bot command documentation.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/bot-app-learn-local-debug.png" alt-text="Screenshot showing the learn card in the bot on Teams client.":::       

    You can do normal debugging activities, such as setting breakpoints, as with any other web application. Open the `bot/teamsBot.js` file and locate the `onMessage()` method. Set a breakpoint on any case. Then, type some text.

      <!-- markdownlint-disable MD033 -->
<details>
<summary>Learn how to troubleshoot if your app doesn't run locally.</summary>

To successfully run your app in Teams, ensure that you've enabled sideloading in your Teams account. You can learn more about sideloading in the Prerequisites section.

> [!IMPORTANT]
> Currently, sideloading apps are available in Government Community Cloud (GCC), GCC-High, and DOD.

> [!TIP]
> Check for issues before sideloading your app, using the [app validation tool](https://dev.teams.microsoft.com/appvalidation.html). This tool is included in the toolkit. Fix the errors to sideload the app.
</details>

::: zone-end

::: zone pivot="mex-app"

## Create your Messaging Extension app

You've built your bot app. Now, let's create your first messaging extension app.

Messaging Extension capability lets you interact with a web service. Use the compose area, command box, or a messaging in Teams client to search and initiate actions in an external system.

:::image type="content" source="~/assets/images/teams-toolkit-v2/first-msgext/your-helloworld-app-msgext.png" alt-text="Diagram showing this app has three features. messaging extension is highlighted." border="false":::

There are two types of Teams **messaging extensions**:

- [Search commands](../messaging-extensions/how-to/search-commands/define-search-command.md): You can search external systems. Then, you can insert its results into a message in the form of a card.
- [Action commands](../messaging-extensions/how-to/action-commands/define-action-command.md): You can present your users with a modal popup to collect or display information. Then, you can process their interaction and send information back to Teams.

Let's create a messaging extension app with a *search command*. Use it to search for external data and insert the results into a message within Teams client.

As you've already prepared for creating these apps, you can set up a new Teams project for creating the messaging extension app.

> [!NOTE]
> Messaging extensions rely on bots to provide a dialog between the user and your code.

In this tutorial, you'll learn:

1. [How to set up a new Messaging Extension project with Teams Toolkit.](#create-your-messaging-extension-project-workspace)
1. [About the directory structure of your app project.](#take-a-tour-of-the-messaging-extension-app-source-code)

### Create your messaging extension project workspace

If the prerequisites are in place, let's begin!

> [!NOTE]
> The Visual Studio Code UI shown is from Mac. It may differ depending on your operating system, Toolkit version, and environment.

# [Visual Studio Code](#tab/vsc)

1. Open Visual Studio Code.
1. Select the Teams Toolkit :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.png"::: icon in the Visual Studio Code sidebar.

1. Select **Create New Project** from the left-hand side of the Toolkit.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/create-project.png" alt-text="Location of the Create New Project link in the Teams Toolkit sidebar." border="false":::

1. Select **Create New Project** to create an app using the Teams Toolkit.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/create-new-app.png" alt-text="Wizard start for Create New Project" border="false":::

1. Select **Messaging Extension**, deselect **Tab**, and select **OK**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/select-capabilities-mex.png" alt-text="Screenshot showing how to add capabilities to your new app." border="false":::

1. Select **JavaScript** as the programming language.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/select-language-mex.png" alt-text="Screenshot showing how to select the programming language." border="false":::

1. Enter a suitable name for your app. Ensure that the app's name is alphanumeric. Select **Enter** to continue.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/enter-name-mex.png" alt-text="Screenshot showing how to enter the app name." border="false":::

    Teams Toolkit creates the app in a few seconds.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/app-created-mex.png" alt-text="Screenshot showing the app created." border="false":::

    After your app is created, the Teams Toolkit displays a message to indicate the location where the project workspace is created. This is the default location specified in Visual Studio Code settings.

    :::image type="content" source="../assets/images/teams-toolkit-v2/location-change.png" alt-text="Location message":::

    The message offers two options:

    - **Change location**
    - **Local Debug**

    For this tutorial, you don't need to use these options.

    > [!NOTE]
    > If you choose to change the location for workspace, it is reflected only for projects you create after reloading Visual Studio Code. No change is made to the location of existing projects.

    <details>
    <summary>A quick recap of creating a Teams app.</summary>
      Watch this short recap for creating a Teams app.

    ![Create a Teams app](~/assets/videos/javascript-msg-ext-app.gif)
      </details>

# [Command line](#tab/cli)

Use the `teamsfx` CLI to create your first project. Start from the folder where you want to create the project folder.

``` bash
teamsfx new
```

You can use the CLI to create a new Teams app. The CLI leads you through a series of questions. Every question includes an instruction on answering it.

For example, Use arrow keys to select an option. After you make the choice, select **Enter** to confirm it.


1. Select **Create a new Teams app**.
1. Select **Message Extension** and deselect **Tab**.
1. Select **JavaScript** as the programming language.
1. Select **Enter** to select the default workspace folder.
1. Enter a suitable name for your app, like `HelloMsgExtn`.  The name of the app must consist only of alphanumeric characters.

    After all the questions have been answered, your project is created.

---

### Take a tour of the messaging extension app source code

A messaging extension uses the Bot Framework. You use it to interact with your service via a conversation. After scaffolding is done, view the project directories and files in the Explorer area of Visual Studio Code.

:::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/hw-folder-structure-mex.png" alt-text="File layout of a bot project" border="false":::

| Folder name | Contents |
| --- | --- |
| `.fx/configs` | Configuration files that user can customize for the Teams app. |
| `.fx/configs/config.<envName>.json` | Configuration file for every environment. |
| `.fx/configs/azure.parameters.<envName>.json` | Parameters file for Azure BICEP provision for every environment. |
| `.fx/configs/projectSettings.json` | Global project settings that apply to all environments. |
| `.fx/configs/localSettings.json` | Configuration file for local debugging. |
| `.fx/states` | Provision output that is generated by the Toolkit.  The toolkit creates this folder after you provision resources for your app. |
| `.fx/states/state.<envName>.json` | Provision output file for every environment. |
| `.fx/states/<env>.userdata` | Sensitive user data for the provision output for every environment. |
| `bot` |  Code for the Bot needed at runtime. |
| `bot/messageExtensionBot.js` | Main entry point for the messaging extension app. |
| `templates/appPackage` | App manifest template files, and the app icons, color.png and outline.png. |
| `templates/appPackage/manifest.local.template.json` | App manifest for running the app in local environment  |
| `templates/appPackage/manifest.remote.template.json` | App manifest for running the app in remote environment, such as Azure site |
| `templates/azure` | BICEP template files |

> [!Tip]
> Familiarize yourself with bots and messaging extension outside of Teams before you integrate your app within Teams.

### Build and run your first Messaging Extension app locally

After you set up your project workspace with Teams Toolkit, build your project. You'll need to sign in to your Microsoft 365 account.

#### Sign in to your Microsoft 365 account

Use this account to sign in to Teams. If you're using a Microsoft 365 developer program tenant, the admin account you set up while registering is your Microsoft 365 account.

# [Visual Studio Code](#tab/vcode)

1. Open Visual Studio Code.
1. Select the Teams Toolkit  :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.png"::: icon in the sidebar.
1. Select **Sign in to M365**.

    Your default web browser opens to let you sign in to the account.

1. Sign in to your Microsoft 365 account.
    1. Close the browser when prompted and return to Visual Studio Code.
    1. Return to Teams Toolkit within Visual Studio Code.

    The **ACCOUNTS** section of the sidebar shows your Microsoft 365 account name. The Teams Toolkit displays **Sideloading enabled** if sideloading is enabled for your Microsoft 365 account.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/m365-sideloading-enabled.png" alt-text="Screenshot showing where to sign in to Microsoft 365 and Azure." border="false":::

    Now you're ready to build the app and run it locally!

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

### Build and run your app in the local environment

A messaging extension lets you interact with a web service. It takes advantage of the messaging feature and secure communication of a bot. The messaging extension app is added to a web service registered as a bot. 
    
### Build and run your app locally

1. Select **F5** in Visual Studio Code to run your application in debug mode.
        <!-- markdownlint-disable MD033 -->
<details>
<summary>Learn what happens when you run your app locally in the debugger.</summary>

When you select **F5**, the Teams Toolkit:

1. Registers your application with Azure Active Directory.
1. Registers your application for "side loading" in Teams.
1. Starts your application backend running locally using [Azure Function Core Tools](/azure/azure-functions/functions-run-local?#start).
1. Starts ngrok tunnel so Teams can communicate with your app.
1. Starts Microsoft Teams with a command to instruct Teams to sideload the application.

</details>

:::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/f5-build-and-run-mex.png" alt-text="Screenshot showing when F5 key is pressed to debug.":::

> [!NOTE]
> When you run the app for the first time, all dependencies are downloaded, and the app is built. A browser window opens when the build is complete. This process can take 3-5 minutes to complete.

Teams opens in a web browser.
        
1. Sign in with your Microsoft 365 account, if prompted.
1. Select **Add** to add the app to your account.
    
    :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/add-mex-app-local-debug.png" alt-text="Screenshot shows message to add the app" border="false":::

    The toolkit displays a message to indicate that the app is added to Teams.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/mex-added-local-debug.png" alt-text="Screenshot shows message to try the app now or later" border="true":::

    - If you select **Got it**, you can try the app later from the list of Sideloaded apps.
    - If you select **Try it**, Teams loads your app.

1. Select **Try it**.

    The Messaging Extension app is loaded in a chat bot app.

    :::image type="content" source="../assets/images/teams-toolkit-v2//first-msgext/app-added-mex-local-debug.png" alt-text="Screenshot that shows app sideloaded in Teams" border="false":::

    As messaging extension apps rely on bots for enabling communication between the user and the web service,, your app loads in to a chat feature of a bot.

    - If you've created a bot app before you created the messaging extension app, you can see that it is loaded in the same bot app you created. Previous chat messages are visible.
    - If you created a messaging extension first, your app is loaded in any chat that is open on Teams.

### Test your app

The first time your app loads, the messaging extension app is open for you to test. This sample app lets you search open-source npm packages from the software registry.
    
#### To run a search query

1. Let's enter a search string in the search box, such as "cli". You will get a list of the matching items:

    :::image type="content" source="../assets/images/teams-toolkit-v2//first-msgext/mex-search-string.png" alt-text="Screenshot that shows how to use the app for search" border="true":::

1. Select one from the search results. It will be displayed in the compose area so you can send the result to the channel.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/mex-search-result.png" alt-text="Screenshot that shows the search result" border="false":::

1. Select the **Send** instructions.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/mex-search-sent.png" alt-text="Screenshot that shows the search result sent on chat" border="false":::
    
    Now, you've learned how to build and run a basic messaging extension app!         

## Optional scenarios

You've tested the search feature of a basic messaging extension app. Now, you can try out some other functionalities of this app. These are optional scenarios in this app.
    <br>
    <br>
<details>
<summary>To create a card</summary>

1. Select **Create Card**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/app-added-mex-local-debug.png" alt-text="Screenshot that shows how to create a card" border="false":::

1. Enter the card details as shown, and select **Submit**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/mex-card-details.png" alt-text="Screenshot that shows how to add a card details" border="true":::

    Your card details appear in the compose area.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/mex-card-added.png" alt-text="Screenshot that shows adding a card details" border="true":::

1. Select the **Send** icon from the compose area.

    The app sends the card on the bot chat.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/mex-card-sent.png" alt-text="Screenshot that shows the card sent" border="false":::
</details>
<br>
<details>
<summary>To open your app from compose area</summary>

Choose one of the following ways to open your app.

**Using `@mention`:**

1. Enter `@your-app-name` in the command area of your app.

    The app opens the search box and you can use it to run a query.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/mention-mex-app.png" alt-text="Screenshot that shows how to @mention the messaging extension app" border="false":::

1. Enter a search string, and select one from the search result.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/command-box-search.png" alt-text="Screenshot that shows how to run a search using the messaging extension app" border="false":::

It displays in the command area as a card.

1. Copy the card to paste it in the compose area.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/command-search-card.png" alt-text="Screenshot that shows search result in a card" border="false":::
        
1. Send the card using the compose area.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/command-search-card-sent.png" alt-text="Screenshot that shows search result in a chat" border="false":::

**Using three-dot icon:**

1. Launch the messaging extension from three dots at the bottom of the composing area.
1. Select your messaging extension app.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/three-dot-mex.png" alt-text="Screenshot that shows how to open the sample messaging extension app" border="false":::

    The messaging extension app loads with the options to run a search and create adaptive cards.
</details>
    <br>
<details>
<summary>Run the app from sideloaded apps</summary>

You can open a sideloaded Teams app from the list of sideloaded apps. 

1. Select the **Store** icon from the Teams sidebar.
1. Select the **Manage apps**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/sideloaded-apps.png" alt-text="Screenshot that shows sideloaded apps" border="false":::

1. Select the three dots icon for your app, and then select **View details**. You can also copy link to the app and use it to open the app.
1. Select **Open** to load the app, and then select **Try it**. 
        
The app loads in Teams.
</details>
    <br>
    <br>
    <!-- markdownlint-disable MD033 -->
<details>
<summary>Learn how to troubleshoot if your app doesn't run locally.</summary>

To run your app in Teams, you must have a Microsoft 365 development account that allows app sideloading. You can learn more about sideloading in the Prerequisites section.
</details>

::: zone-end
