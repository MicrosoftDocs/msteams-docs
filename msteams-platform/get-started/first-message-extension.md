---
title: Get started - Build your first messaging extension
author: adrianhall
description: Create a messaging extension for Microsoft Teams using the Teams Toolkit.
ms.author: adhal
ms.date: 05/20/2021
ms.topic: quickstart
---

# Build and run your first messaging extension for Microsoft Teams

There are two types of Teams **messaging extensions**:

- [Search commands](../messaging-extensions/how-to/search-commands/define-search-command.md) allow you to search external systems and insert the results of that search into a message in the form of a card.
- [Action commands](../messaging-extensions/how-to/action-commands/define-action-command.md) allow you present your users with a modal popup to collect or display information, then process their interaction and send information back to Teams.

In this tutorial, you will create a *search command* to search for external data and insert the results into a message.  

## Before you begin

Make sure your development environment is set up by installing the [Prerequisites](prerequisites.md)

> [!div class="nextstepaction"]
> [Install Prerequisites](prerequisites.md)

## Create your project

Use the Teams Toolkit to create your first project:

# [Visual Studio Code](#tab/vscode)

1. Open Visual Studio Code.
1. Open the Teams Toolkit by selecting the Teams icon in the sidebar:

    :::image type="content" source="../assets/images/teams-toolkit-v2/sidebar-icon.png" alt-text="The Teams Icon in the Visual Studio Code sidebar.":::

1. Select **Create New Project**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-project.png" alt-text="Location of the Create New Project link in the Teams Toolkit sidebar.":::

1. Select **Create a new Teams app**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-new-project-intro.png" alt-text="Wizard start for Create New Project":::

1. On the **Select capabilities** step, select **Message Extension** and deselect **Tab**.  Press **OK**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/msgextn-create-project-capabilities.png" alt-text="Screenshot showing how to add capabilities to your new app.":::

1. On the **Bot registration** step, select **Create a new bot registration**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-bot-registration.png" alt-text="Select create a new bot registration":::

   > [!NOTE]
   > Messaging extensions rely on bots to provide a dialog between the user and your code.

1. On the **Programming Language** step, select **JavaScript**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/create-project-programming-languages.png" alt-text="Screenshot showing how to select the programming language.":::

1. Select a workspace folder.  A folder will be created within your workspace folder for the project you are creating.

1. Enter a suitable name for your app, like `helloworld`.  The name of the app must consist only of alphanumeric characters.  Press **Enter** to continue.

Your Teams app will be created within a few seconds.

# [Command line](#tab/cli)

Use the `teamsfx` CLI to create your first project.  Start from the folder where you want to create the project folder.

``` bash
teamsfx new
```

The CLI walks through some questions to create the project.  Each question will tell you how to answer it (for example, to use arrow keys to select an option).  When you have answered the question, confirm your choice by pressing **Enter**.

1. Select **Create a new Teams app**.
1. Select the **Message Extension** capability and deselect the **Tab** capability.
1. Select **Create a new bot registration**.
1. Select **JavaScript** as the programming language.
1. Press **Enter** to select the default workspace folder.
1. Enter a suitable name for your app, like `helloworld`.  The name of the app must consist only of alphanumeric characters.

Once all the questions have been answered, your project will be created.

---

## Take a tour of the source code

If you wish to skip this section for now, you can [run your app locally](#run-your-app-locally).

A messaging extension uses the [Bot Framework](https://docs.botframework.com) to allow the user to interact with your service via a conversation.  After scaffolding, your project will look like this:

:::image type="content" source="../assets/images/teams-toolkit-v2/msgextn-file-layout.png" alt-text="File layout of a bot project.":::

The bot code is stored in the `bot` directory.  The `bots/messageExtensionBot.js` is the main entry point for the messaging extension.

> [!Tip]
> Familiarize yourself with bots outside of Teams before you integrate your first bot within Teams.  You can find more information about bots by reviewing the [Azure Bot Service](/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&preserve-view=true) tutorials.

## Run your app locally

Teams Toolkit allows you to host your app locally.  To do this:

- An Azure Active Directory Application is registered within the M365 tenant.
- An app manifest is submitted to the Developer Portal for Teams.
- An API is run locally using Azure Functions Core Tools to support your app.
- [ngrok](https://ngrok.io) is installed and used to provide a tunnel between Teams and your messaging extension.

To build and run your app locally:

1. From Visual Studio Code, press **F5** to run your application in debug mode.

   > When you run the app for the first time, all dependencies are downloaded and the app is built.  A browser window automatically opens when the build is complete.  This can take 3-5 minutes to complete.

1. Teams will be loaded in a web browser, and you will be prompted to sign in. If prompted to open Microsoft Teams, select Cancel to remain within the browser. Sign in with your M365 account.

1. Press **Add** to add the app to your account.

Once the app is loaded, you will be taken directly to a search dialog:

:::image type="content" source="../assets/images/teams-toolkit-v2/msgextn-completed-app.png" alt-text="Your Search-based messaging extension in action":::

Type some text in the search box, then select one of the options.  An adaptive card will be added to your input box.

<!-- markdownlint-disable MD033 -->
<details>
<summary>Learn what happens when you run your app locally in the debugger.</summary>

When you pressed F5, the Teams Toolkit:

1. Registered your application with Azure Active Directory.
1. Registered your application for "side loading" in Microsoft Teams.
1. Started your application backend running locally using [Azure Function Core Tools](/azure/azure-functions/functions-run-local?#start).
1. Started an ngrok tunnel so Teams can communicate with your app.
1. Started Microsoft Teams with a command to instruct Teams to sideload the application.

</details>

<!-- markdownlint-disable MD033 -->
<details>
<summary>Learn how to troubleshoot common issues when running your app locally.</summary>

To successfully run your app in Teams, you must have a Microsoft 365 development account that allows app sideloading. For more information on account opening, see [Prerequisites](prerequisites.md#enable-sideloading).

> [!TIP]
> Check for issues before sideloading your app, using the [app validation tool](https://dev.teams.microsoft.com/appvalidation.html), which is included in the toolkit. Fix the errors to successfully sideload the app.
</details>

[!INCLUDE [Provision and Deploy your app on Azure](~/includes/get-started/azure-provisioning-instructions.md)]

<!-- markdownlint-disable MD033 -->

<details>
<summary>Learn what happens when you deployed your app to Azure</summary>

Before deployment, the application has been running locally:

1. The backend runs using _Azure Functions Core Tools_.
1. The application HTTP endpoint, where Microsoft Teams loads the application, runs locally.

Deployment involves provisioning resources on an active Azure subscription and deploying (uploading) the backend and frontend code for the application to Azure. The backend uses a variety of Azure services, including Azure App Service and Azure Bot Service.

</details>

## Add a configuration page to your messaging extension

[!include[v4-to-v3-SDK-pointer](~/includes/v4-to-v3-pointer-me.md)]

## Code sample

The Teams Search Auth Config for sample projects on GitHub, demonstrate how to create messaging extensions that include a configuration page and [Bot Service authentication](https://github.com/microsoft/BotBuilder-Samples#teams-samples). The samples also demonstrate how to create message extensions that accept search requests and return the results after the user has signed in.

| **Sample name** | **Description** | **.NET** | **Node.js** | **Python** |
|-----------------|-----------------|-------------|--------------|--------|
| Bot builder | To create messaging extensions. | [View](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/52.teams-messaging-extensions-search-auth-config) | [View](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/52.teams-messaging-extensions-search-auth-config) | [View]( https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/python/50.teams-messaging-extension-search) |

## Additional code sample

> [!div class="nextstepaction"]
> [View more Bot Framework Samples on GitHub](https://github.com/OfficeDev/microsoft-teams-samples#messaging-extensions-samples-using-the-v4-sdk)

## See also

- [Create a Teams app with React](first-app-react.md)
- [Create a Teams app with Blazor](first-app-blazor.md)
- [Create a Teams app as a SharePoint Web Part](first-app-spfx.md)
- [Create a conversation bot](first-app-bot.md)
