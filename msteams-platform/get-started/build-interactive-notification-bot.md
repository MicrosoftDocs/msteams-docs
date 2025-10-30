---
title: Build Interactive Notification Bot
description: Learn to build an interactive notification bot with the help of GitHub Codespaces, which sends messages in Teams channel, group chat, or personal chat.
ms.localizationpriority: medium
ms.date: 02/06/2025
ms.topic: reference
---

# Build an interactive notification bot app

For an interactive notification, a bot sends messages in a Teams channel, group chat, or personal chat. You can trigger an interactive notification bot with an HTTP request, such as cards or texts. For proactive notifications from tab apps, use [activity feed notifications](/graph/teams-send-activityfeednotifications).

:::image type="content" border="false" source="../assets/images/get-started/get-started-bot.png" alt-text="Screenshot shows you the conceptual notification bot in Teams client":::

 In this tutorial, you learn:

* How to create a new notification bot with Microsoft 365 Agents Toolkit (previously known as Teams Toolkit).
* About the directory structure of your app.
* How to send multiple notifications.

This step-by-step guide helps you to build notification bot with Agents Toolkit. You can see the following output:

:::image type="content" source="../assets\images\sbs-notification-bot\trigger-output.png" alt-text="Trigger Output"border="true":::

Here's a list of tools you need for building and deploying your apps.

   | &nbsp; | Install | For using |
   | --- | --- | --- |
   | &nbsp; | [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, or TypeScript, build environments. Use the latest version. |
   | &nbsp; | [Microsoft 365 Agents Toolkit](toolkit-v4/install-Agents-Toolkit-vs.md) | Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest version. |
   | &nbsp; | [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
   | &nbsp; | [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings, and call all in one place.|
   | &nbsp; | [Microsoft&nbsp;Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |
   | &nbsp; | [Microsoft 365](https://developer.microsoft.com/en-us/microsoft-365/dev-program) | Access to Teams account with the appropriate permissions to install an app. |

   > [!NOTE]
   > The guide is tested on Agents Toolkit latest version and Nodejs version 18 and 20. The steps in this guide may work with other versions, but that isn't tested.

[Set up prerequisites](../get-started/prepare-toolkit.md)

 > [!div class="nextstepaction"]
 > [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+an+interactive+notification+bot+app+using+GitHub+Codespaces&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fget-started%2Fbuild-interactive-notification-bot%3Ftabs%3Dagentstoolkitcodespaces&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fget-started%2Fbuild-interactive-notification-bot.md&documentVersionIndependentId=e5653869-a83d-3558-0896-b88c45816a22&platformId=eee097dd-e3f6-d51e-48d6-fc448f59cf0d&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Build notification bot

To build notification bot using Visual Studio Code:

1. Open Visual Studio Code.

1. Select the Microsoft 365 Agents Toolkit :::image type="icon" source="../assets/images/toolkit-v2/toolkit-sidebar-icon.png"::: icon in the Visual Studio Code **Activity Bar**.

1. Select **Create a New Agent/App** > **Teams App*.

:::image type="content" source="../assets/images/sbs-notification-bot/create-new-teams-app.png" alt-text="Location of the Create New Project link in the Agents Toolkit sidebar.":::

1. Select **Bot** to create a new bot project.

:::image type="content" source="../assets/images/sbs-notification-bot/create-new-app.png" alt-text="Wizard starts for creating a new project":::

1. Ensure that **Chat Notification Message** is selected as the App feature that you want to build in your app.

:::image type="content" source="../assets/images/sbs-notification-bot/select-notification-bot.png" alt-text="Select App Capability":::

1. Select **HTTP Trigger Express Server** as the trigger.

:::image type="content" source="../assets/images/sbs-notification-bot/select-trigger.png" alt-text="Screenshot showing how to select the programming language.":::  

1. Select **JavaScript** as the programming language.

:::image type="content" source="../assets/images/sbs-command-bot/select-script.png" alt-text="Screenshot showing how to select JavaScript as the programming language.":::

1. Select **Default folder** to store your project root folder in default location.

:::image type="content" source="../assets/images/sbs-notification-bot/select-default-location.png" alt-text="Select default location":::

You can also change the default location by the following steps:

1. Select **Browse**.

:::image type="content" source="../assets/images/sbs-notification-bot/select-browse.png" alt-text="Select browse location":::

1. Select the location for project workspace.

1. Select the **Select Folder**.

:::image type="content" source="../assets/images/sbs-notification-bot/select-folder.png" alt-text="Select Folder":::

1. Enter a suitable name for your app.
1. Select **Enter**.

:::image type="content" source="../assets/images/sbs-notification-bot/type-notfication-name.png" alt-text="Screenshot showing where to enter the app name.":::

1. After your app is created, Agents Toolkit displays the following message:

:::image type="content" source="../assets/images/sbs-notification-bot/new-window-notification.png" alt-text="New window notification":::

The notification bot app is created in a few seconds.

:::image type="content" source="../assets/images/sbs-notification-bot/my-notification-bot.png" alt-text="Screenshot showing the app created.":::
  
1. Select **Run and Debug** :::image type="icon" source="../assets/images/toolkit-v2/run-debug-icon.png"::: icon from the Visual Studio Code **Activity Bar**.

1. Select **Debug in Teams (Edge)** or **Debug in Teams (Chrome)** from the dropdown list.

1. Select **Start Debugging** button.

:::image type="content" source="../assets/images/sbs-command-bot/debug-app.png" alt-text="The screenshot shows how to debug your app in Agents Toolkit." border="true":::

1. Select **Add**.

:::image type="content" source="../assets/images/sbs-notification-bot/my-notification-output.png" alt-text="Screenshot of the app details dialog to add the notification bot.":::

1. Select **Open** to open the app in personal scope.

Alternatively, you can either search and select the required scope or select a channel, chat, or meeting from the list, and move through the dialog to select **Go**.

:::image type="content" source="../assets/images/sbs-notification-bot/add-scope.png" alt-text="Screenshot of the scope selection dialog with the list of shared scopes.":::

 Your notification bot app is uploaded into Teams client.

In real time, events are triggered by an external source, such as a third party API that cause the notification bot to send the user a notification. To emulate an event trigger, you can send an event manually using powershell or terminal.

To invoke an event to trigger a notification, use one of the following ways:

* If you use Windows, follow the steps:
  1. Open **Windows PowerShell**.
  1. Run the `Invoke-Webrequest -Method POST -URI http://localhost:3978/api/notification` command.

  :::image type="content" source="../assets/images/sbs-notification-bot/windows-powershell.png" alt-text="Powershell Trigger"border="true" lightbox="../assets/images/sbs-notification-bot/windows-powershell-1.png":::

* If you don't use Windows, follow the steps:
  1. In Visual Studio Code, go to **Terminal** > **New Terminal** to open another terminal.
  1. Run the `curl -X POST http://localhost:3978/api/notification` command.

  You'll get the following output in Teams:

  :::image type="content" source="../assets/images/sbs-notification-bot/trigger-output.png" alt-text="Trigger Output"border="true" lightbox="../assets/images/sbs-notification-bot/trigger-output.png":::

    > [!NOTE]
    > If you want to extend your app to Outlook and Microsoft 365, you can choose to debug your app with Outlook and Microsoft 365 from **RUN AND DEBUG** dropdown in Visual Studio Code.

 > [!div class="nextstepaction"]
 > [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+To+build+notification+bot+using+Visual+Studio+Code&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fsbs-gs-notificationbot%3Ftabs%3Dvscode%26tutorial-step%3D2&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fsbs-gs-notificationbot.yml&documentVersionIndependentId=4680d8ea-8210-67e0-7a1f-f24e94d58985&platformId=dd058113-fb02-e03e-07e6-edb5a32216f4&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Take tour of source code

Agents Toolkit provides components for building an app. After creating the project, you can view the project folders and files in the **Explorer** area of Visual Studio Code.

:::image type="content" source="../assets/images/sbs-notification-bot/folder-structure1.png" alt-text="structure tab":::

The new project folder contains following content:

| Folder/file name | Contents |
| --- | --- |
| `.vscode` | VSCode files for debugging. |
| `appPackage` | Templates for the app manifest (previously called Teams app manifest). |
| `env` | Name/value pairs stored in environment files and used by `m365agents.yml` to customize provisioning and deployment rules. |
| `infra` | Templates for provisioning Azure resources. |
| `src\` | The source code for the notification Teams application. |
| `src\index.js` | Application entry point and `restify` handlers for notifications. |
| `src\teamsbot.js` | An empty Teams activity handler for bot customization. |
| `src\adaptiveCards\notification-default.json` | A generated Adaptive Card that is sent to Teams. |
| `m365agents.yml` | Main project file describing your application configuration and defining actions for each lifecycle stage. |
| `m365agents.local.yml` | Overrides `m365agents.yml` with actions enabling local execution and debugging. |

[Back to Top](#build-an-interactive-notification-bot-app)

## Send notification to Teams channel

To send notification to Teams channel:

1. In Visual Studio Code, under **EXPLORER**, select **MYNOTIFICATIONBOT> src> index.js**.

:::image type="content" source="../assets/images/sbs-notification-bot/file-path.png" alt-text="File path":::

You can see the following page:

:::image type="content" source="../assets/images/sbs-notification-bot/default-program.png" alt-text="Default Program" lightbox="../assets/images/sbs-notification-bot/default-program.png":::

1. Use the following code after `for (const target of installations) {` in Visual Studio Code:

```
        if (target.type === "Channel") {
              const members = await target.members();
              await target.sendMessage("This is a message to channel: " + members.length + " members.");
              for (const member of members) {
              await member.sendMessage("This is a message to Member: " + member.account.email);
            }
          }
        ```

:::image type="content" source="../assets/images/sbs-notification-bot/code-add.png" alt-text="Code Add" lightbox="../assets/images/sbs-notification-bot/code-add.png":::

**To customize storage (Optional):**

1. In Visual Studio Code, under **EXPLORER**, select **MYNOTIFICATIONBOT> src> internal> initialize.js**.

:::image type="content" source="../assets/images/sbs-notification-bot/initialize-storage.png" alt-text="Storage Initialize":::

You can see the following page:

:::image type="content" source="../assets/images/sbs-notification-bot/storage-code.png" alt-text="Storage Code" lightbox="../assets/images/sbs-notification-bot/storage-code-1.png":::

1. Update the following code in **initialize.js** file to customize the storage.

```bash
const myStorage = new MyStorage(...);

// Initialize ConversationBot with notifications enabled and customized storage
const bot = new ConversationBot({
    // The bot ID and password to create the BotFrameworkAdapter.
    // See https://aka.ms/about-bot-adapter to learn more about adapters.
    adapterConfig: {
        appId: process.env.BOT_ID,
        appPassword: process.env.BOT_PASSWORD,
    },
    // Enable notifications
    notification: {
        enabled: true,
        storage: myStorage,
    },
});
 ```

1. Use your own storage location instead of **MyStorage**.

    > [!NOTE]
    > It's required to use your own storage for production environment. If storage isn't provided, default local file storage is considered.

1. Select **Run and Debug** :::image type="icon" source="../assets/images/toolkit-v2/run-debug-icon.png"::: icon from the Visual Studio Code sidebar.

1. Select **Debug in Teams (Edge)** or **Debug in Teams (Chrome)** from the dropdown list.

1. Select **Start Debugging** button.

:::image type="content" source="../assets/images/sbs-command-bot/debug-app.png" alt-text="The screenshot shows how to debug your app in Agents Toolkit.":::

A dialog appears in Teams to upload the app.

1. Select **Add**.

:::image type="content" source="../assets/images/sbs-notification-bot/my-notification-output.png" alt-text="Screenshot of the app details dialog to add the notification bot.":::

1. Select **Open** to open the app in personal scope.
Alternatively, you can either search and select the required scope or select a channel from the list, and move through the dialog to select **Go**.

:::image type="content" source="../assets/images/sbs-notification-bot/add-scope.png" alt-text="Screenshot of the scope selection dialog with the list of shared scopes.":::

The following screen appears:

:::image type="content" source="../assets/images/sbs-notification-bot/channel-notification.png" alt-text="Channe1 Notification":::

1. Open **Windows PowerShell**.

1. Run the `Invoke-Webrequest -Method POST -URI http://localhost:3978/api/notification` command.

:::image type="content" source="../assets/images/sbs-notification-bot/windows-powershell.png" alt-text="Powershell Trigger"border="true" lightbox="../assets/images/sbs-notification-bot/windows-powershell-1.png":::

You get the notification in the Teams channel:

:::image type="content" source="..\assets\images\sbs-notification-bot\channel-output.png" alt-text="Channel Output" lightbox="../assets/images/sbs-notification-bot/channel-output.png":::

You get the notification in the personal chat:

:::image type="content" source="../assets/images/sbs-notification-bot/member-output.png" alt-text="member-output" lightbox="../assets/images/sbs-notification-bot/member-output.png"..:::

 > [!div class="nextstepaction"]
 > [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+To+send+notification+to+Teams+channel&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fsbs-gs-notificationbot%3Ftabs%3Dvscode%26tutorial-step%3D3&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fsbs-gs-notificationbot.yml&documentVersionIndependentId=4680d8ea-8210-67e0-7a1f-f24e94d58985&platformId=dd058113-fb02-e03e-07e6-edb5a32216f4&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

[Back to Top](#build-an-interactive-notification-bot-app)

## Deploy your first Teams app

You've learned to build and run Teams app with notification bot capability. The final step is to deploy your app to Azure.

Let's deploy the first app with notification bot capability on Azure using Agents Toolkit.

### Sign in to your Azure account

Use your account to access the Microsoft Azure portal and to provide provision new cloud resources to support your app.

1. Open Visual Studio Code.
1. Open the project folder where you created the notification bot app.
1. Select the Microsoft 365 Agents Toolkit  :::image type="icon" source="../assets/images/toolkit-v2/toolkit-sidebar-icon.png"::: icon in the sidebar.
1. Select **Sign in to Azure** using your credentials.

> [!TIP]
> If you have the AZURE ACCOUNT extension installed and are using the same account, you can skip this step.

Your default web browser opens to let you sign in to the account.

1. Close the browser when prompted and return to Visual Studio Code.

The **ACCOUNTS** section of the sidebar shows the two accounts separately. It also lists the number of usable Azure subscriptions available to you. Ensure you have at least one usable Azure subscription available. If not, sign out and use a different account.

Congratulations, you have created a Teams app! Now let's go ahead and learn how to deploy one of the apps to Azure using Agents Toolkit.

 > [!div class="nextstepaction"]
 > [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Sign+in+to+your+Azure+account&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fsbs-gs-notificationbot%3Ftabs%3Dvscode%26tutorial-step%3D4&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fsbs-gs-notificationbot.yml&documentVersionIndependentId=4680d8ea-8210-67e0-7a1f-f24e94d58985&platformId=dd058113-fb02-e03e-07e6-edb5a32216f4&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

### Deploy your app to Azure

Under **DEPLOYMENT**, you can provision for necessary cloud resources and your app's code is copied into the created cloud resources.

# [Visual Studio Code](#tab/vscode)

1. Select the Microsoft 365 Agents Toolkit :::image type="icon" source="~/assets/images/toolkit-v2/toolkit-sidebar-icon.png"::: icon in the Visual Studio Code sidebar.

1. Select **Provision** under **LIFECYCLE**.

:::image type="content" source="../assets/images/sbs-notification-bot/provision-cloud.png" alt-text="Screenshot showing the provisioning commands":::

1. Select an existing resource group or create new resource group. For more information, see [Create resource group](/azure/azure-resource-manager/management/manage-resource-groups-portal#create-resource-groups).

1. Select anyone of the existing subscription.

:::image type="content" source="../assets/images/sbs-notification-bot/select-subscription.png" alt-text="Screenshot showing the selection of existing subscription.":::

1. Select an existing or create new resource group.

:::image type="content" source="../assets/images/sbs-notification-bot/subscription-cloud.png" alt-text="Screenshot showing resources for provisioning.":::

> [!NOTE]
> A dialog appears mentioning that costs may be incurred when running resources in Azure.

1. Select **Provision**.

:::image type="content" source="../assets/images/sbs-notification-bot/provision-confirm1.png" alt-text="Screenshot of the provisioning dialog.":::

The provisioning process creates resources in Azure cloud. You can monitor the progress by observing the dialogs in the lower-right corner.

:::image type="content" source="../assets/images/sbs-notification-bot/deploy-provision-success.png" alt-text="Screenshot showing the provisioning complete dialog.":::

You see the option to view the provisioned resources. For this tutorial, you don't need to view resources.

1. Select **Deploy** under **LIFECYCLE** after provisioning is complete.

:::image type="content" source="../assets/images/sbs-notification-bot/deploy-cloud.png" alt-text="Screenshot showing where to select to deploy to cloud.":::

1. Select **Deploy**.

:::image type="content" source="../assets/images/sbs-notification-bot/Deploy-confirm.png" alt-text="Deploy to confirm.":::

Deployment takes some time. You can monitor the progress in the dialogs in lower-right corner.

:::image type="content" source="../assets/images/sbs-notification-bot/deploy-confirmation-cloud.png" alt-text="Deploy confirmation.":::

 > [!div class="nextstepaction"]
 > [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Deploy+your+app+to+Azure+using+Visual+Studio+Code&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fsbs-gs-notificationbot%3Ftabs%3Dvscode%26tutorial-step%3D4&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fsbs-gs-notificationbot.yml&documentVersionIndependentId=4680d8ea-8210-67e0-7a1f-f24e94d58985&platformId=dd058113-fb02-e03e-07e6-edb5a32216f4&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

# [Command Line](#tab/cli)

In your terminal window:

1. Run `atk new` to create new project.

```bash
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

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Deploy+your+app+to+Azure+using+Command+Line&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fsbs-gs-notificationbot%3Ftabs%3Dcli%26tutorial-step%3D4&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fsbs-gs-notificationbot.yml&documentVersionIndependentId=4680d8ea-8210-67e0-7a1f-f24e94d58985&platformId=dd058113-fb02-e03e-07e6-edb5a32216f4&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Complete Challenge

Did you come up with something like this?

:::image type="content" source="../assets/images/sbs-notification-bot/trigger-output.png" alt-text="Trigger Output"border="true":::

You've completed the tutorial to build a notification bot. You can extend your notification bot to add the command response and workflow features.
