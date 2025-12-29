---
title: Hello World with JavaScript
description: Learn how to build and deploy a Teams message extension app with JavaScript by setting up a new project with Microsoft 365 Agents Toolkit.
ms.localizationpriority: high
ms.topic: reference
ms.date: 12/29/2025
---

<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD024 -->
<!-- markdownlint-disable MD001 -->

# Build your first message extension app using JavaScript

Start Microsoft Teams app development with your first Teams app using JavaScript.

In this tutorial, you'll learn:

- How to set up a new project with Microsoft 365 Agents Toolkit (previously known as Teams Toolkit).
- How to build a message extension app.
- How to deploy your app.

This step-by-step guide helps you to build a message extension Teams app with Agents Toolkit in Visual Studio Code. You'll see the following output after you complete this guide:

:::image type="content" source="../assets/images/toolkit-v2/first-msgext/app-added-mex-local-debug.png" alt-text="Screenshot shows the final output of the message extension app in Teams." lightbox="../assets/images/toolkit-v2/first-msgext/app-added-mex-local-debug.png":::

## Prerequisites

Ensure you install the following tools for building and deploying your apps.

| &nbsp; | Install | For using... |
| --- | --- | --- |
| **Required** | &nbsp; | &nbsp; |
| &nbsp; | [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript or TypeScript build environments. Use the latest version. |
| &nbsp; | [Microsoft 365 Agents Toolkit](../toolkit/install-Agents-Toolkit.md) | Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest version. |
| &nbsp; | [Node.js](https://nodejs.org/en/download/) | Backend JavaScript runtime environment. For more information, see [Node.js version compatibility table](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type). |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Collaborate with people you work with through apps for chats, meetings, and calls in one place. |
| &nbsp; | [Microsoft Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools essential for debugging and testing. |
| &nbsp; | [Microsoft 365 developer account](/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant) | Access to Teams account with appropriate permissions to install a custom app. |
| **Optional** | &nbsp; | &nbsp; |
| &nbsp; | [Azure Tools for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) and [Azure CLI](/cli/azure/install-azure-cli) | Azure tools to access stored data or to deploy a cloud-based backend for your Teams app in Azure. |
| &nbsp; | [React Developer Tools for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) or [React Developer Tools for Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil) | A browser DevTools extension for the open-source React JavaScript library. |

## Prepare development environment

After you install the required tools, set up the development environment.

### Install Microsoft 365 Agents Toolkit

Microsoft 365 Agents Toolkit (previously known as Teams Toolkit) helps simplify the development process with tools to provision and deploy cloud resources for your app and publish to the Teams Store.

You can use Agents Toolkit with Visual Studio Code or a command-line interface called Microsoft 365 Agents Toolkit CLI (previously known as TeamsFx CLI).

# [Visual Studio Code](#tab/vscode)

1. Open Visual Studio Code and select **Extensions** (**Ctrl+Shift+X** or **View** > **Extensions**).
2. In the search box, enter **Microsoft 365 Agents Toolkit**.
3. Select **Install**.

   :::image type="content" source="../assets/images/include-files/install-toolkit-vs.png" alt-text="Screenshot shows the Agents Toolkit extension installation.":::

   The Microsoft 365 Agents Toolkit :::image type="icon" source="../assets/images/include-files/toolkit-sidebar-icon.PNG"::: icon appears in the Visual Studio Code Activity Bar.

You can also install Agents Toolkit from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension).

# [Command Line](#tab/cli)

To install Agents Toolkit CLI, use the `npm` package manager and enter the following command in Command prompt:

``` bash
npm install -g @microsoft/m365agentstoolkit-cli
```

Depending on your configuration, you might need to use `sudo` to install the CLI:

``` bash
sudo npm install -g --unsafe-perm @microsoft/m365agentstoolkit-cli
```

This condition is more common on Linux and macOS systems.

Ensure you add the npm global cache to your PATH. This step is normally done as part of the Node.js installer.

You can use the CLI with the `atk` command. Verify that the command is working by running`atk -h`.

> [!CAUTION]
> Before you can run TeamsFx in PowerShell terminals, you must enable the **remote signed** execution policy for PowerShell.

---

### Set up your Teams development tenant

A tenant is a space or a container for your organization in Teams, where you chat, share files, and run meetings. This space is also where you upload and test your app. Let's verify if you're ready to develop with the tenant.

#### Check for upload an app option

After creating your custom app, you must upload your app to Teams with the **Upload a custom app** option. Sign in to your Microsoft 365 account to check if this option is enabled.

The following steps help you verify if you can upload apps in Teams:

1. In the Teams client, select the **Apps** icon.
2. Select **Manage your apps**.
3. Select **Upload an app**.
4. Look for the option to **Upload a custom app**. If the option is visible, you can upload custom apps.

   :::image type="content" source="../assets/images/toolkit-v2/prerequisites/upload-custom-app.png" alt-text="Screenshot shows the option to upload a custom app in Teams." :::

      > [!NOTE]
      > If you don't find the option to upload a custom app, contact your Teams administrator.

#### Create a free Teams developer tenant (optional)

If you don't have a Teams developer account, join the Microsoft 365 developer program.

1. Go to the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
1. Select **Join Now** and follow the onscreen instructions.
1. In the welcome screen, select **Set up E5 subscription**.
1. Set up your administrator account. After you finish, the following screen appears:

   :::image type="content" source="../assets/images/include-files/microsoft-365.png" alt-text="Screenshot shows the Microsoft 365 Developer Program.":::

1. Sign in to Teams using the administrator account you just set up. Verify that you have the **Upload a custom app** option in Teams.

#### Get a free Azure account

If you want to host your app or access resources in Azure, you must have an Azure subscription. [Create a free account](https://azure.microsoft.com/free/) before you begin.

## Create project workspace for your message extension app

Now, let's create your first message extension app.

The message extension capability lets you interact with a web service through buttons and forms. Use the message compose area, command box, or a message directly in Teams client to search and initiate actions in an external system. Message extensions rely on bots to provide a dialog between the user and your code.

:::image type="content" source="../assets/images/toolkit-v2/first-msgext/your-helloworld-app-msgext.png" alt-text="Diagram shows Screenshot shows the different types of app features with message extension highlighted.":::

There are two types of Teams message extensions:

- [Search commands](../messaging-extensions/how-to/search-commands/define-search-command.md): You can search external systems and insert the results into a message in the form of a card.
- [Action commands](../messaging-extensions/how-to/action-commands/define-action-command.md): You can present your users with a modal pop-up to collect or display information. Then, you can process their interaction and send the information back to Teams.

Let's create a message extension app with a search command. First, set up a new Teams project for creating the message extension app.

In this tutorial, you'll learn:

1. [How to set up a new message extension project with Agents Toolkit.](#create-your-message-extension-project-workspace)
1. [About the directory structure of your app project.](#take-a-tour-of-the-message-extension-app-source-code)

### Create your message extension project workspace

If the prerequisites are in place, let's begin!

> [!NOTE]
> The Visual Studio Code UI shown may differ for you depending on your operating system, Toolkit version, theme, and environment.

# [Visual Studio Code](#tab/vsc1)

1. Open Visual Studio Code.

1. Select the Microsoft 365 Agents Toolkit :::image type="icon" source="../assets/images/toolkit-v2/toolkit-sidebar-icon.png"::: icon in the Visual Studio Code activity bar.

1. Select **Create a New Agent/App** > **Teams App**.

    :::image type="content" source="../assets/images/toolkit-v2/first-msgext/create-project.png" alt-text="Screenshot shows the option to create a new app from the Agents Toolkit sidebar.":::

1. Select **Message Extension**.

    :::image type="content" source="../assets/images/toolkit-v2/first-msgext/create-new-app1.png" alt-text="Screenshot shows the option to create a new Teams app.":::

1. Select **Custom Search Results**.

    :::image type="content" source="../assets/images/toolkit-v2/first-msgext/select-capabilities-mex1.png" alt-text="Screenshot shows the option to select the capabilities of a new app.":::

1. Select **Start with a Bot**.

    :::image type="content" source="../assets/images/toolkit-v2/first-msgext/select-architecture-mex.png" alt-text="Screenshot shows the options for the architecture of the message extension.":::

1. Select **JavaScript**.

    :::image type="content" source="../assets/images/toolkit-v2/first-msgext/select-language-tab.png" alt-text="Screenshot shows the option to select the programming language.":::

1. Select **Default folder** to store your project root folder in default location.

    :::image type="content" source="../assets/images/toolkit-v2/first-msgext/select-default-location.png" alt-text="Screenshot shows the selection of default location.":::

    You can also change the default location by the following steps:

    1. Select **Browse**.

        :::image type="content" source="../assets/images/toolkit-v2/first-msgext/select-browse.png" alt-text="Screenshot shows the browse option.":::

    1. Select the location for project workspace.

    1. Select **Select Folder**.

        :::image type="content" source="../assets/images/toolkit-v2/select-folder.png" alt-text="Screenshot shows how to select the location for the project workspace folder.":::

1. Enter a suitable name for your app. Select **Enter**.

    :::image type="content" source="../assets/images/toolkit-v2/first-msgext/enter-project-name.png" alt-text="Screenshot shows the option to enter the app name.":::

    Agents Toolkit creates the app in a few seconds.

    :::image type="content" source="../assets/images/toolkit-v2/first-msgext/app-created-mex.png" alt-text="Screenshot shows the newly created message extension app." lightbox="../assets/images/toolkit-v2/first-msgext/app-created-mex.png":::

    After your app is created, Agents Toolkit displays the following message:

    :::image type="content" source="../assets/images/toolkit-v2/preview-project-msg.png" alt-text="Screenshot shows a dialog saying that the message extension app is created.":::

# [Command Line](#tab/cli1)

Use the `atk' CLI to create your first project.

1. Go to the folder where you want to create the project folder and open Command Prompt.

1. Enter the following command to create a new Teams app:

    ``` bash
    atk new
    ```

1. CLI provides you with a series of options to choose from. Use arrow keys to select an option. After you make the choice, select Enter to confirm.

    1. Select **Message Extension** for **New Project**.
    1. Select **Custom Search Results** for **App Features Using a Message Extension**.
    1. Select **Start with a Bot** for **Architecture of Search Based Message Extension**.
    1. Select **JavaScript** for **Programming Language**.
    1. Select **Enter** to select the default workspace folder for your app.
    1. Enter a suitable name for your app. The name of the app must consist only of alphanumeric characters.

CLI creates the project after you answer all the questions.

### Take a tour of the message extension app source code

A message extension uses Bot Framework to interact with your service through a conversation. After scaffolding, view the project directories and files under **EXPLORER**.

:::image type="content" source="../assets/images/toolkit-v2/first-msgext/folder-structure-mex-app.png" alt-text="Screenshot shows the files of the message extension app.":::

| Folder / File | Contents |
| --- | --- |
| `m365agents.yml` | Main project file describes your application configuration and defines the set of actions to run in each lifecycle stage. |
| `m365agents.local.yml` | Overrides `m365agents.yml` with actions that enable local execution and debugging. |
| `.vscode/` | Visual Studio Code files for local debug. |
| `appPackage/` | Templates for the Teams application manifest. |
| `infra/` | Templates for provisioning Azure resources. |
| `index.js` | Application entry point and `express` handler. |

> [!Tip]
> Familiarize yourself with bots and message extension outside of Teams before you integrate your app within Teams.

## Build and run your first message extension app

After you set up your project workspace with Agents Toolkit, it's time to build your project. You need to sign in to your Microsoft 365 account.

### Sign in to your Microsoft 365 account

Sign in with the admin account you created while joining the Microsoft 365 developer program.

# [Visual Studio Code](#tab/vsc2)

1. Open Visual Studio Code.

1. Select the Microsoft 365 Agents Toolkit  :::image type="icon" source="../assets/images/toolkit-v2/toolkit-sidebar-icon.png"::: icon in the activity bar.

1. Select **Sign in to Microsoft 365** using your credentials. Your default web browser opens to let you sign in.

    :::image type="content" source="../assets/images/toolkit-v2/toolkit-sign-in-m365.png" alt-text="Screenshot shows where to sign in to Microsoft 365 and Azure.":::

1. Close the browser after signing in using your credentials.

1. Return to Agents Toolkit within Visual Studio Code.

The **ACCOUNTS** section of the sidebar shows your Microsoft 365 account name. If custom app upload is enabled for your Microsoft 365 account, Agents Toolkit displays **Custom App Upload Enabled**.

:::image type="content" source="../assets/images/toolkit-v2/first-tab/m365-uploading-enabled-msg.png" alt-text="Screenshot shows the user signed in to Microsoft 365 and the uploading enabled message.":::

Now you're ready to build the app and run it locally!

# [Command Line](#tab/cli2)

1. Go to the project folder of your message extension app and open Command Prompt.

1. Sign in to Microsoft 365 with Microsoft 365 Agents Toolkit CLI (previously known as TeamsFx CLI) command:

    ``` bash
    atk account login m365
    ```

Your default web browser opens to let you sign in. Sign in to your Azure account using your credentials. Close the browser when you're prompted.

---

### Build and run your app in the local environment

Now you can build and debug your first Teams message extension app locally.

#### Build and run your app locally

1. Select the **F5** key in Visual Studio Code to run your application in debug mode.

    > [!NOTE]
    > If Agents Toolkit is unable to verify a particular prerequisite, it prompts you to check.

    <br>
    <details>
    <summary>Learn what happens when you run your app locally in the debugger.</summary>

    When you select **F5**, Agents Toolkit performs the following functions:

    1. Checks the following prerequisites:

        1. You're signed in with a Microsoft 365 account.
        1. Custom app upload is enabled for your Microsoft 365 account.
        1. Supported Node.js version is installed.
        1. Port required by bot app is available.

    2. Installs npm packages
    3. Starts Dev Tunnel to create an HTTP tunnel.
    4. Registers the app in Microsoft Entra ID and configures the app.
    5. Registers the bot app in Bot Framework and configures the app.
    6. Registers the app in Teams Developer Portal and configures the app.
    7. Starts the message extension app hosted locally.
    8. Starts Teams in a web browser and uploads the Teams app.

    </details>

    :::image type="content" source="../assets/images/toolkit-v2/first-msgext/f5-build-and-run-mex.png" alt-text="Screenshot shows the debug process of the message extension app." lightbox="../assets/images/toolkit-v2/first-msgext/f5-build-and-run-mex.png":::

    When you debug the app for the first time, Teams downloads the dependencies and builds the app. This process can take 3 to 5 minutes to complete.

1. Teams opens in a browser window when the build is complete. Sign in with your Microsoft 365 account, if prompted.

1. A dialog box opens to let you add the message extension app to Teams. Select **Add**.

    :::image type="content" source="../assets/images/toolkit-v2/first-msgext/add-mex-app-local-debug-latest.png" alt-text="Screenshot shows the option to add the custom app in Teams." lightbox="../assets/images/toolkit-v2/first-msgext/add-mex-app-local-debug.png":::

    Teams loads the message extension app.

    :::image type="content" source="../assets/images/toolkit-v2/first-msgext/app-added-mex-local-debug-2.png" alt-text="Screenshot shows the message extension app open in a Teams bot chat." lightbox="../assets/images/toolkit-v2/first-msgext/app-added-mex-local-debug-2.png":::

    As message extension apps rely on bots for enabling communication between the user and the web service, your app loads in to a chat feature of a bot.

    - If you created a bot app before you created the message extension app, Teams loads the message extension in the bot app you created. Previous chat messages of the bot app are visible.
    - If you created a message extension first, Teams loads your app in the most recent chat that is open on Teams.

#### Test your app

The first time your app loads, the message extension app is open for you to test. This sample app lets you search open-source npm packages from the software registry.

##### How to run a search query

# [Message Extension](#tab/msgext)

1. Enter the name of an open-source npm package in the search box of the message extension, such as **cli**. The message extension displays a list of the matching items.

    :::image type="content" source="../assets/images/toolkit-v2/first-msgext/mex-search-string.png" alt-text="Screenshot shows a search string in the message extension app.":::

1. Select one of the items from the list. The app creates an Adaptive Card with the item in the message compose area so you can send it in a chat or channel.

    :::image type="content" source="../assets/images/toolkit-v2/first-msgext/mex-search-result.png" alt-text="Screenshot shows the search result in the message compose area.":::

1. Select **Enter**. The message extension app sends the Adaptive Card with the item in the chat or channel.

    :::image type="content" source="../assets/images/toolkit-v2/first-msgext/mex-search-sent.png" alt-text="Screenshot shows the search result sent in chat.":::

# [Command Box](#tab/cmdbox)

1. Enter **/** followed by your message extension app's name in the command box.

    :::image type="content" source="../assets/images/toolkit-v2/first-msgext/mention-mex-app.png" alt-text="Screenshot shows how to invoke the message extension app.":::

    The message extension app opens in the command box.

1. Enter a name of an open-source npm package and select one of the search results.

    :::image type="content" source="../assets/images/toolkit-v2/first-msgext/command-box-search.png" alt-text="Screenshot shows a search string in the command box.":::

    The message extension displays the search result as an Adaptive Card in the command box.

    :::image type="content" source="../assets/images/toolkit-v2/first-msgext/command-search-card.png" alt-text="Screenshot shows the search result as a card in the command box.":::

1. Copy the Adaptive Card to paste it in the message compose area.

    :::image type="content" source="../assets/images/toolkit-v2/first-msgext/command-search-card-send.png" alt-text="Screenshot shows search result in a card in the message compose area.":::

1. Select **Enter**. The message extension app sends the Adaptive Card with the search result in the most recent chat.

    :::image type="content" source="../assets/images/toolkit-v2/first-msgext/command-search-card-sent.png" alt-text="Screenshot shows the search result sent in a chat.":::

---

#### How to open your message extension app

You tested the search feature of the message extension app in the previous step. Now, learn the different ways to open the message extension app.
<br>
<br>
<details>
<summary>Open your app from command box</summary>

1. Enter **/** followed by your message extension app's name in the command box.

    :::image type="content" source="../assets/images/toolkit-v2/first-msgext/mention-mex-app.png" alt-text="Screenshot shows how to invoke the message extension app.":::

    The app opens in the command box and you can use it to run a query.

    > [!NOTE]
    > - Using **/** to open your message extension app from the command box only works in the new Teams client.
    > - Use **@** to open your message extension app from the command box in the classic Teams client.

</details>

<br>
<details>
<summary>Open your app from message compose area</summary>

1. Select the three dots at the bottom of the message compose area.

1. Select your message extension app.

    :::image type="content" source="../assets/images/toolkit-v2/first-msgext/three-dot-mex.png" alt-text="Screenshot shows how to open the message extension app from message compose area.":::

    The message extension app loads with the options to run a search.

</details>

<br>
<details>
<summary>Open your app from uploaded custom apps</summary>

1. Select **Apps** > **Manage your apps**.

1. Select the dropdown for your app from the list of apps and select **Personal app**.

    :::image type="content" source="../assets/images/toolkit-v2/first-msgext/uploaded-apps.png" alt-text="Screenshot shows the uploaded apps in Teams.":::

1. A dialog box appears suggesting you to try out your app. If you select **Got it**, the dialog box disappears. Select **Try it**.

    :::image type="content" source="../assets/images/toolkit-v2/first-msgext/mex-try-it.png" alt-text="Screenshot shows the message to try the message extension app now or later.":::

1. A list of your message extension apps appears in your most recent Teams chat. Select your message extension app from the list.

</details>

#### Learn how to troubleshoot if your app doesn't run locally

To run your app in Teams, you must have a Microsoft 365 development account that allows custom app upload. You can learn more about custom app upload in the Prerequisites section.

## Deploy your first Teams app

Let's deploy your first message extension app on Azure using Agents Toolkit.

### Sign in to your Azure account

Sign in to your Azure account to access the Microsoft Azure portal and provision new cloud resources to support your app.

# [Visual Studio Code](#tab/vsc3)

1. Open Visual Studio Code.

1. Open the project folder in which you created the message extension app.

1. Select the Microsoft 365 Agents Toolkit  :::image type="icon" source="../assets/images/toolkit-v2/toolkit-sidebar-icon.png"::: icon in the activity bar.

1. Select **Sign in to Azure** using your credentials. Your default web browser opens to let you sign in.

    > [!TIP]
    > If you have the AZURE ACCOUNT extension installed and are using the same account, you can skip this step.

1. Close the browser when prompted and return to Visual Studio Code.

The **ACCOUNTS** section of the sidebar lists the number of usable Azure subscriptions available to you. Ensure that you have at least one usable Azure subscription available. If not, sign out and use a different account.

# [Command Line](#tab/cli3)

1. Go to the project folder of your message extension app and open Command Prompt.

1. Sign in to Azure with Agents Toolkit CLI command:

    ``` bash
    atk account login azure
    ```

1. Your default web browser opens to let you sign in. Sign in to your Azure account using your credentials. Close the browser when you're prompted.

Now, let's learn how to deploy the app to Azure using Agents Toolkit.

---

## Deploy your app to Azure

Deployment consists of two steps. First, necessary cloud resources are created (also known as provisioning). Then, your app's code is copied into the created cloud resources. You deploy the message extension app in this tutorial.
<br>
<br>
<details>
<summary>What's the difference between <b>Provision</b> and <b>Deploy</b>?</summary>
<br>
The <b>Provision</b> step creates resources in Azure and Microsoft 365 for your app, but no code (such as HTML, CSS, or JavaScript) is copied to the resources. The <b>Deploy</b> step copies the code for your app to the resources you created during the provision step. It's common to deploy multiple times without provisioning new resources. Since the provision step takes some time to complete, it's separate from the deployment step.
</details>
<br>

# [Visual Studio Code](#tab/vsc4)

Select the Microsoft 365 Agents Toolkit :::image type="icon" source="../assets/images/toolkit-v2/toolkit-sidebar-icon.png"::: icon in the Visual Studio Code activity bar.

1. Select **Provision**.

   :::image type="content" source="../assets/images/toolkit-v2/provisioning-commands.png" alt-text="Screenshot shows the selection of provision in the cloud under Agents toolkit.":::

1. Select a subscription.

   :::image type="content" source="../assets/images/toolkit-v2/select-azure-subscription-group.png" alt-text="Screenshot shows the Azure subscription group options to choose from.":::

1. Select a resource group.

   :::image type="content" source="../assets/images/toolkit-v2/deploy-azure/select-resource.png" alt-text="Screenshot shows the subscription to use for the Azure resources.":::

   If you don't have a resource group to select, you can create a new resource group with the following steps:

   1. Select **+ New resource group**.

      :::image type="content" source="../assets/images/toolkit-v2/first-msgext/select-resource-new-resource.png" alt-text="Screenshot shows the option to create a new Azure resource group.":::

   1. Select the default name or enter a suitable name for your resource group.

      :::image type="content" source="../assets/images/toolkit-v2/first-msgext/new-resource-group-name.png" alt-text="Screenshot shows the default name of the new Azure resource group.":::

   1. Select the location for your resource group.

      :::image type="content" source="../assets/images/toolkit-v2/first-msgext/new-resource-group-location.png" alt-text="Screenshot shows the options for the location of the new Azure resource group.":::

1. A dialog box warns you that costs might be incurred when running resources in Azure. Select **Provision**.

   :::image type="content" source="../assets/images/toolkit-v2/deploy-azure/provision-warning.png" alt-text="Screenshot shows a dialog box that warns the user that a cost might be incurred while provisioning Azure resources.":::

   The provisioning process creates resources in the Azure cloud. It might take some time. After a few minutes, you see the following message:

   :::image type="content" source="../assets/images/toolkit-v2/deploy-azure/deploy-provision-successmsgext.png" alt-text="Screenshot shows a notice that displays the message extension app successfully provisioned in the cloud.":::

   If you want, you can view the provisioned resources. For this tutorial, you don't need to view resources.

   The provisioned resource appears under **ENVIRONMENT**.

   :::image type="content" source="../assets/images/toolkit-v2/deploy-azure/provisioned-resources-env.png" alt-text="Screenshot shows the resource being provisioned in the environment section.":::

1. Under **LIFECYCLE**, select **Deploy**.

   :::image type="content" source="../assets/images/toolkit-v2/deploy-azure/deploy-cloud.png" alt-text="Screenshot shows the app deploys to the cloud.":::

1. A dialog box appears that asks you if you want to deploy resources in the dev environment. Select **Deploy**.

   :::image type="content" source="../assets/images/toolkit-v2/deploy-azure/deploy-azure-confirm.png" alt-text="Screenshot shows the confirmation dialog box to deploy app in Azure.":::

   As with provisioning, deployment takes some time. After a few minutes, you see a completion message.

# [Command Line](#tab/cli4)

1. Go to the folder where you created your message extension app and open Command Prompt.

1. Run `atk provision`.

   ``` bash
   atk provision
   ```

   When prompted, select an Azure subscription and resource group to use Azure resources. Your app is hosted using Azure resources.

1. Run `atk deploy`.

   ``` bash
   atk deploy
   ```

   Your message extension app is deployed.

---

## Run the deployed app

After the provisioning and deployment steps are complete, go to **Run and Debug** (**Ctrl+Shift+D** or **View > Run**) in Agents Toolkit.

1. Select the **RUN AND DEBUG** dropdown menu.
1. Select **Launch Remote in Teams (Edge)**.
1. Select the **▷** button.

   :::image type="content" source="../assets/images/toolkit-v2/deploy-azure/launch-remote.png" alt-text="Screenshot shows the launch app remotely in Teams option.":::

1. A dialog box opens to install your deployed app to Teams. Select **Add**.

   :::image type="content" source="../assets/images/toolkit-v2/deploy-azure/mex-added-dev.png" alt-text="Screenshot shows message to add the deployed app.":::

   Teams opens the message extension app in the most recent chat.

   :::image type="content" source="../assets/images/toolkit-v2/first-msgext/mex-loaded-chat-app.png" alt-text="Screenshot shows the message extension open in a chat.":::

#### Learn what happens when you deployed your app to Azure

Before deployment, the app runs locally.

- The backend runs using Azure Functions Core Tools.
- The application HTTP endpoint, where Microsoft Teams loads the application, runs locally.

Deployment is a two-step process. You provision the resources on an active Azure subscription and then deploy or upload the backend and frontend code of the app to Azure.

- The backend, if configured, uses various Azure services including Azure App Service and Azure Storage.
- The frontend app is deployed to an Azure Storage account configured for static web hosting.

## Congratulations

You completed the tutorial to build a message extension app with JavaScript!

Did you come up with something like this?

:::image type="content" source="../assets/images/toolkit-v2/first-msgext/app-added-mex-local-debug.png" alt-text="Screenshot shows the final output of the message extension app in Teams." lightbox="../assets/images/toolkit-v2/first-msgext/app-added-mex-local-debug.png":::
