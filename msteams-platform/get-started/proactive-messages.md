---
title: Send Proactive Messages
description: In this module, learn how to send proactive messages, such as welcome messages, scheduled messages, and notifications from a bot.
ms.author: surbhigupta
ms.topic: article
ms.localizationpriority: high
ms.date: 12/22/2025
---

<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD024 -->
<!-- markdownlint-disable MD001 -->

# Send Proactive Messages

A proactive message is a message sent by a bot in response to simple commands sent in the chat from a user. The message response can be in one of the following formats:

- Welcome messages
- Scheduled messages
- Notifications

This step-by-step guide helps you to send a proactive message from a bot. You'll see the following output:

:::image type="content" source="~/assets/images/proactive-scenario/proactive-msg-result.png" alt-text="Screenshot shows the proactive hello message in Teams chat.":::

## Prerequisites

Ensure that you install the following tools for building and deploying your apps.

| &nbsp; | Install | For using |
| --- | --- | --- |
| &nbsp; | [Microsoft Visual Studio Code](https://code.visualstudio.com/download) | JavaScript or TypeScript, build environments. Use the latest version. |
| &nbsp; | [Microsoft 365 Agents Toolkit](../toolkit/install-Agents-Toolkit.md) (previously known as Teams Toolkit) | Visual Studio Code extension that creates a project scaffolding for your app. Use the latest version. |
| &nbsp; | [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type). |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Teams to collaborate with everyone you work with through apps for chat, meetings, call and all in one place. |
| &nbsp; | [Microsoft Edge](https://www.microsoft.com/edge/) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |
| &nbsp; | [Microsoft 365 developer account](/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant) | Access to Teams account with the appropriate permissions to install an app. |

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

## Set up your Teams development tenant

A tenant is a space or a container for your organization in Teams, where you chat, share files, and run meetings. This space is also where you upload and test your app. Let's verify if you're ready to develop with the tenant.

### Check for upload an app option

After creating your custom app, you must upload your app to Teams with the **Upload a custom app** option. Sign in to your Microsoft 365 account to check if this option is enabled.

The following steps help you verify if you can upload apps in Teams:

1. In the Teams client, select the **Apps** icon.
2. Select **Manage your apps**.
3. Select **Upload an app**.
4. Look for the option to **Upload a custom app**. If the option is visible, you can upload custom apps.

   :::image type="content" source="../../assets/images/toolkit-v2/prerequisites/upload-custom-app.png" alt-text="Screenshot shows the option to upload a custom app in Teams." :::

      > [!NOTE]
      > If you don't find the option to upload a custom app, contact your Teams administrator.

### Create a free Teams developer tenant (optional)

If you don't have a Teams developer account, join the Microsoft 365 developer program.

1. Go to the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
1. Select **Join Now** and follow the onscreen instructions.
1. In the welcome screen, select **Set up E5 subscription**.
1. Set up your administrator account. After you finish, the following screen appears:

   :::image type="content" source="../../assets/images/include-files/microsoft-365.png" alt-text="Screenshot shows the Microsoft 365 Developer Program.":::

1. Sign in to Teams using the administrator account you just set up. Verify that you have the **Upload a custom app** option in Teams.

## Build Proactive Message bot

To build proactive message bot using Visual Studio Code, follow these steps:

1. Open Visual Studio Code.

1. Select the Microsoft 365 Agents Toolkit :::image type="icon" source="../msteams-platform/assets/images/toolkit-v2/toolkit-sidebar-icon.png"::: icon in the Visual Studio Code Activity Bar.

1. In the left pane, select **View Samples**.

    :::image type="content" source="../msteams-platform/assets/images/proactive-scenario/view-samples.png" alt-text="Screenshot shows the View Samples option in Visual Studio Activity Bar.":::

1. From the list of samples, select **Proactive Messaging**. A prebuilt sample that's ready for debugging opens.

    :::image type="content" source="../msteams-platform/assets/images/proactive-scenario/select-proactive-msg.png" alt-text="Screenshot shows the prebuilt Proactive Messaging bot sample in the list of samples.":::

1. Select **Create**.

    :::image type="content" source="../msteams-platform/assets/images/proactive-scenario/create-proactive-bot.png" alt-text="Screenshot shows the Create option to create a proactive messaging bot.":::

1. Select **Default folder** to store your project root folder in the default location.

     :::image type="content" source="../msteams-platform/assets/images/sbs-notification-bot/select-default-location.png" alt-text="Screenshot shows the option to select the default location.":::

    If you want to change the default location, perform the following steps:

    1. Select **Browse**.

        :::image type="content" source="../msteams-platform/assets/images/sbs-notification-bot/select-browse.png" alt-text="Screenshot shows the option to browse the location.":::

    1. Select the location for project workspace.

    1. Select **Select Folder**.

       :::image type="content" source="../msteams-platform/assets/images/sbs-notification-bot/select-folder.png" alt-text="Screenshot shows the option to select the folder.":::

    The proactive message bot is created in a few seconds and displays the proactive message bot successful dialog in the lower-right corner with the option to debug:

    :::image type="content" source="../msteams-platform/assets/images/proactive-scenario/proactive-bot-created.png" alt-text="Screenshot shows the proactive message bot created."lightbox="../msteams-platform/assets/images/proactive-scenario/proact-bot-created-1.png"::::::

1. Select **Run and Debug** :::image type="icon" source="../msteams-platform/assets/images/proactive-scenario/run-debug-icon.png"::: icon from the top-left corner.

1. Select **Debug (Edge)** or **Debug (Chrome)** from the dropdown list.

    :::image type="content" source="../msteams-platform/assets/images/proactive-scenario/debug-option-edge.png" alt-text="Screenshot shows the debugging options to choose from.":::

    When debugging is successful, you'll be prompted to upload the proactive message bot to Teams on your local machine.

1. Select **Add**.

    :::image type="content" source="~/assets/images/proactive-scenario/add.png" alt-text="Screenshot of message extension details dialog with the Add option highlighted.":::

1. Search and select the required scope or select a channel, chat, or meeting from the list, and move through the dialog to select **Go**.

    :::image type="content" source="~/assets/images/proactive-scenario/add-to-teams.png" alt-text="Screenshot of the scope selection dialog with the list of shared scopes.":::

    The proactive message bot app is uploaded to Teams client and the following message appears in response to the message sent.

    :::image type="content" source="~/assets/images/proactive-scenario/proactive-msg-sent.png" alt-text="Screenshot shows the proactive message bot response in the chat.":::

1. Copy and paste the URL or navigate to the URL in browser. A proactive hello message is triggered and shared in the chat.

    :::image type="content" source="~/assets/images/proactive-scenario/pro-msg-browser.png" alt-text="Screenshot shows the browser that triggers bot to respond with a proactive message in Teams.":::

1. Go to Teams. You'll receive a **proactive hello** message from the bot.

    :::image type="content" source="~/assets/images/proactive-scenario/pro-msg-response.png" alt-text="Screenshot shows the bot response on the chat.":::

### Take a tour of the source code

Agents Toolkit provides components for building an app. After creating the project, you can view the project folders and files in the **EXPLORER** area of Visual Studio Code.

:::image type="content" source="../assets/images/proactive-scenario/file-structure.png" alt-text="Screenshot shows the structure tab.":::

The new project folder contains the following content:

| Folder / File | Contents |
| - | - |
| `.vscode/` | Visual Studio Code files for debugging. |
| `appManifest/` | Templates for the app manifest (previously called Teams app manifest). |
| `env/` | Name / value pairs are stored in environment files and used by `m365agents.yml` to customize the provisioning and deployment rules. |
| `manifest.json` | App manifest for publishing through the Developer Portal for Teams is stored in `Properties/manifest.json`. |
| `m365agents.yml` | Main project file describes your app configuration and defines the set of actions to run in each lifecycle stage. |
| `m365agents.local.yml` | This overrides `m365agents.yml` with actions that enable local execution and debugging. |

## Deploy your Proactive message bot

You've learnt to build and run Teams app with proactive message bot capability. Let's deploy the first app with proactive message bot capability on Azure using Agents Toolkit.

### Sign in to your Azure account

Use your account to access the Microsoft Azure portal and provision new cloud resources to support your app.

1. Open Visual Studio Code.
1. Open the project folder where you created the proactive message bot app.
1. Select the Microsoft 365 Agents Toolkit  :::image type="icon" source="../msteams-platform/assets/images/toolkit-v2/toolkit-sidebar-icon.png"::: icon in the Visual Studio Code Activity Bar.
1. Select **Sign in to Azure** using your credentials.

    > [!TIP]
    > If you have the AZURE ACCOUNT extension installed and are using the same account, you can skip this step.

    Your default web browser opens to let you sign in to the account.

1. Close the browser when prompted and return to Visual Studio Code.

The **ACCOUNTS** section of the sidebar shows the two accounts separately. It also lists the number of usable Azure subscriptions available to you. Ensure that you have at least one usable Azure subscription available. If not, sign out and use a different account.

### Deploy your app to Azure

Deployment consists of two steps. First, necessary cloud resources are created (also known as provisioning). Then, your app's code is copied into the created cloud resources. For this tutorial, you'll deploy the bot app.
<br>
<br>
<details>
<summary>What's the difference between Provision and Deploy?</summary>
<br>
<b>Provision</b> creates resources in Azure and Microsoft 365 for your app, but no code (HTML, CSS, and JavaScript) is copied to the resources. <b>Deploy</b> copies the code for your app to the resources you created during provisioning. It's common to deploy multiple times without provisioning new resources. Since provisioning can take some time to complete, it's separate from deployment.
</details>
<br>

# [Visual Studio Code](#tab/vscode)

1. Select the Microsoft 365 Agents Toolkit :::image type="icon" source="../assets/images/toolkit-v2/toolkit-sidebar-icon.png"::: icon in the Visual Studio Code Activity Bar.

1. Select **Provision** under **LIFECYCLE**.

    :::image type="content" source="../assets/images/sbs-command-bot/provision-cloud.png" alt-text="Screenshot shows the provisioning commands.":::

1. Select one of the existing subscriptions.

    :::image type="content" source="../assets/images/proactive-scenario/select-subscription.png" alt-text="Screenshot shows the subscription option for provisioning.":::

1. Select an existing resource group or create new resource group. For more information, see [create resource group](/azure/azure-resource-manager/management/manage-resource-groups-portal#create-resource-groups).

    :::image type="content" source="../assets/images/proactive-scenario/select-resource-group.png" alt-text="Screenshot show the resource group option for provisioning.":::

    > [!NOTE]
    > A dialog appears mentioning that costs might be incurred when running resources in Azure.

1. Select **Provision**.

    :::image type="content" source="../assets/images/sbs-command-bot/provision-confirm1.png" alt-text="Screenshot of the provisioning dialog.":::

    The provisioning process creates resources in the Azure cloud. You can monitor the progress in the dialogs that appear in lower-right corner. After few minutes, the following dialog appears:

    :::image type="content" source="../assets/images/proactive-scenario/deploy-provision-proactive.png" alt-text="Screenshot shows the provisioning complete dialog.":::

1. Select **Deploy** under **LIFECYCLE**.

    :::image type="content" source="~/assets/images/sbs-command-bot/deploy-cloud.png" alt-text="Screenshot shows the Deploy option under LIFECYCLE.":::

1. Select **Deploy**.

    :::image type="content" source="~/assets/images/sbs-command-bot/Deploy-confirm.png" alt-text="Screenshot shows the confirmation dialog to deploy.":::

    Deployment takes some time. You can monitor the progress in the dialogs that appear in lower-right corner. After a few minutes, the following dialog appears.

    :::image type="content" source="~/assets/images/proactive-scenario/deploy-confirmation-proactive.png" alt-text="Screenshot shows the deployment confirmation dialog.":::

1. Open the debug panel (**Ctrl+Shift+D** / **⌘⇧-D** or **View** > **Run**) from Visual Studio Code.

1. Select **Launch Remote (Edge)** from the launch configuration dropdown list.

    :::image type="content" source="~/assets/images/proactive-scenario/debug-option-remote.png" alt-text="Screenshot shows the remote debug option highlighted.":::

    When debugging is successful, you'll be prompted to upload the proactive message bot app to Teams.

1. Select **Add**.

    :::image type="content" source="~/assets/images/proactive-scenario/add.png" alt-text="Screenshot of message extension app dialog with the Add option highlighted.":::

1. Search and select the required scope or select a channel, chat, or meeting from the list, and move through the dialog to select **Go**.

    :::image type="content" source="~/assets/images/proactive-scenario/add-to-teams.png" alt-text="Screenshot of the scope selection dialog with the list of shared scopes.":::

    The proactive message bot app is uploaded to Teams client and the following message appears in response to the message sent.

    :::image type="content" source="~/assets/images/proactive-scenario/proactive-msg-sent.png" alt-text="Screenshot shows the proactive message bot response in the chat.":::

1. Copy and paste the URL or navigate to the URL in browser. A proactive hello message is triggered and shared in the chat.

    :::image type="content" source="~/assets/images/proactive-scenario/pro-msg-browser.png" alt-text="Screenshot shows the browser that triggers bot to respond with a proactive message in Teams.":::

1. Go to Teams. You'll receive a **proactive hello** message from the bot.

    :::image type="content" source="~/assets/images/proactive-scenario/pro-msg-response.png" alt-text="Screenshot shows the bot response on the chat.":::

# [Command Line](#tab/cli)

In your terminal window:

1. Run `atk new` to create new project.

``` bash
atk new
```

1. Run `atk provision` to create azure resource.

``` bash
atk provision
```

1. Run `atk deploy` to deploy the app.

``` bash
atk deploy
```

1. Run `atk preview` to run the app.

``` bash
atk preview
```

---

### Complete challenge

Did you come up with something like this?

:::image type="content" source="~/assets/images/proactive-scenario/proactive-msg-result.png" alt-text="Screenshot shows the proactive hello message.":::

You've completed the scenario.

- You can send notifications on a daily basis or request for feedback from users on a periodic basis.
- You can handle throttling limits to avoid multiple notifications.
