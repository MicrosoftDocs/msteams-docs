---
title: Get started - Build a conversational bot for Microsoft Teams
author: adrianhall
description: Create a conversational bot for Microsoft Teams using the Teams Toolkit.
ms.author: adhal
ms.date: 05/14/2021
ms.topic: quickstart
---

# Build a conversational bot for Microsoft Teams

A bot acts as an intermediary between a Teams user and a web service.  Users can chat with a bot to quickly get information, initiate workflows, or anything else your web service can do.  In this tutorial, you will learn how to build, run, and deploy a Teams bot app.

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

1. On the **Select capabilities** step, select **Bot** and deselect **Tab**.  Press **OK**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-project-capabilities-bot.png" alt-text="Screenshot showing how to add capabilities to your new app.":::

1. On the **Bot registration** step, select **Create a new bot registration**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-bot-registration.png" alt-text="Select create a new bot registration":::

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
1. Select the **Bot** capability and deselect the **Tab** capability.
1. Select **Create a new bot registration**.
1. Select **JavaScript** as the programming language.
1. Press **Enter** to select the default workspace folder.
1. Enter a suitable name for your app, like `helloworld`.  The name of the app must consist only of alphanumeric characters.

Once all the questions have been answered, your project will be created.

---

## Take a tour of the source code

If you wish to skip this section for now, you can [run your app locally](#run-your-app-locally).

A message extension uses the [Bot Framework](https://docs.botframework.com) to allow the user to interact with your service via a conversation.  After scaffolding, your project will look like this:

:::image type="content" source="../assets/images/teams-toolkit-v2/bot-file-layout.png" alt-text="File layout of a bot project.":::

The bot code is stored in the `bot` directory.  The `bots/teamsBot.js` is the main entry point for the bot, and the dialogs are stored in the `dialogs` directory.

> [!Tip]
> Familiarize yourself with bots outside of Teams before you integrate your first bot within Teams.  You can find more information about bots by reviewing the [Azure Bot Service](https://docs.microsoft.com/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&preserve-view=true) tutorials.

## Run your app locally

Teams Toolkit allows you to host your app locally.  To do this:

- An Azure Active Directory Application is registered within the M365 tenant.
- An app manifest is submitted to the Teams Developer Center.
- An API is run locally using Azure Functions Core Tools to support your app.
- [ngrok](https://ngrok.io) is installed and used to provide a tunnel between Teams and your bot code.

To build and run your app locally:

1. From Visual Studio Code, press **F5** to run your application in debug mode.

   > When you run the app for the first time, all dependencies are downloaded and the app is built.  A browser window automatically opens when the build is complete.  This can take 3-5 minutes to complete.

1. Your web browser is started to run the application.  When prompted, select **Use the web app instead**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/launch-web-browser-and-pick-webapp.png" alt-text="Screenshot showing how to pick the web version of teams when launched":::

1. You may be prompted to sign in.  If so, sign in with your M365 account.
1. When prompted to install the app onto Teams, press **Add**.

Once the app is loaded, you will be taken directly to a chat session with the bot.  You can type `login` to authenticate with the bot (showing an additional permissions request), and then say `hello`.  

Debugging works as you normally would expect - try it yourself! Open the `bot/dialogs/rootDialog.js` file and locate the `triggerCommand(...)` method.  Set a breakpoint on the default case.  Then type some text.

<!-- markdownlint-disable MD033 -->
<details>
<summary>Learn what happens when you run your app locally in the debugger.</summary>

When you pressed F5, the Teams Toolkit:

1. Registered your application with Azure Active Directory.
1. Registered your application for "side loading" in Microsoft Teams.
1. Started your application backend running locally using [Azure Function Core Tools](https://docs.microsoft.com/azure/azure-functions/functions-run-local?#start).
1. Started an ngrok tunnel so Teams can communicate with your app.
1. Started Microsoft Teams with a command to instruct Teams to sideload the application.

</details>

<!-- markdownlint-disable MD033 -->
<details>
<summary>Learn how to troubleshoot common issues when running your app locally.</summary>

To successfully run your app in Teams, you must have a Microsoft 365 development account that allows app sideloading. For more information on account opening, see [Prerequisites](prerequisites.md#enable-side-loading).

> [!TIP]
> Check for issues before sideloading your app, using the [app validation tool](https://dev.teams.microsoft.com/appvalidation.html), which is included in the toolkit. Fix the errors to successfully sideload the app.
</details>

[!INCLUDE (./azure-provisioning-instructions.md)]

<!-- markdownlint-disable MD033 -->

<details>
<summary>Learn what happens when you deployed your app to Azure</summary>

Before deployment, the application has been running locally:

1. The backend runs using _Azure Functions Core Tools_.
1. The application HTTP endpoint, where Microsoft Teams loads the application, runs locally.

Deployment involves provisioning resources on an active Azure subscription and deploying (uploading) the backend and frontend code for the application to Azure. The backend uses a variety of Azure services, including Azure App Service and Azure Bot Service.

</details>

## Next steps

Learn about other methods for creating tab apps:

- [Create a Teams app with React](first-app-react.md).
- [Create a Teams app as a SharePoint Web Part](first-app-spfx.md) (Azure not required).
- [Create a messaging extension](first-message-extension.md).
