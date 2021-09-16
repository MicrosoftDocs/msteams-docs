---
title: Get started - Build your first bot
author: adrianhall
description: Create a bot for Microsoft Teams using the Teams Toolkit.
ms.author: adhal
ms.date: 05/27/2021
ms.topic: quickstart
ms.localizationpriority: none
---

# Build your first bot for Microsoft Teams

This tutorial covers the steps to build, run, and deploy a Teams bot app. A bot talks with a web service to help you do anything that web service offers.

> [!IMPORTANT]
> Currently, bots are available in Government Community Cloud (GCC) but not available in GCC-High and Department of Defense (DOD).

## Before you begin

Make sure your development environment is set up by installing the Prerequisites.

> [!div class="nextstepaction"]
> [Install Prerequisites](prerequisites.md)

## Create your project

Use the Teams Toolkit to create your first project:

# [Visual Studio Code](#tab/vscode)

1. Open Visual Studio code.
1. Select the Teams icon in the sidebar to open the Teams Toolkit.

    :::image type="content" source="../assets/images/teams-toolkit-v2/sidebar-icon.png" alt-text="The Teams Icon in the Visual Studio Code sidebar.":::

1. Select **Create New Project**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-project.png" alt-text="Location of the Create New Project link in the Teams Toolkit sidebar.":::

1. Select **Create a new Teams app**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-new-project-intro.png" alt-text="Wizard start for Create New Project":::

1. In the **Select capabilities** section, select **Bot**, deselect **Tab**, and select **OK**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-project-capabilities-bot.png" alt-text="Screenshot showing how to add capabilities to your new app.":::

1. In the **Bot registration** section, select **Create a new bot registration**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-bot-registration.png" alt-text="Select create a new bot registration":::

1. In the **Programming Language** section, select **JavaScript**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/create-project-programming-languages.png" alt-text="Screenshot showing how to select the programming language.":::

1. Select a workspace folder. A folder is created in your workspace folder for the project.

1. Enter a suitable name for your app, like `helloworld`. Ensure that your app's name is alphanumeric. Select **Enter** to continue.

Your Teams app is created in a few seconds.

# [Command line](#tab/cli)

Use the `teamsfx` CLI to create your first project.  Start from the folder where you want to create the project folder.

``` bash
teamsfx new
```

You can use the CLI to create a new Teams app. The CLI leads you through a series of questions. Every question includes an instruction on answering it.

For example, Use arrow keys to select an option. After you make the choice, select **Enter** to confirm it.


1. Select **Create a new Teams app**.
1. Select **Bot** and deselect **Tab**.
1. Select **Create a new bot registration**.
1. Select **JavaScript** as the programming language.
1. Press **Enter** to select the default workspace folder.
1. Enter a suitable name for your app, like `helloworld`.  The name of the app must consist only of alphanumeric characters.

After all the questions have been answered, your project is created.

---

## Take a tour of the source code

If you wish to skip this section for now, you can [run your app locally](#run-your-app-locally).

A messaging extension uses the [Bot Framework](https://docs.botframework.com). You can interact with your service via a conversation. After scaffolding is done, view the project directories and files in the Explorer area of Visual Studio Code.

:::image type="content" source="../assets/images/teams-toolkit-v2/bot-file-layout.png" alt-text="File layout of a bot project.":::

The bot code is stored in the `bot` directory. The `bot/teamsBot.js` is the main entry point for the bot.

> [!Tip]
> Familiarize yourself with bots outside of Teams before you integrate your first bot within Teams.  For more information about bots, see the [Azure Bot Service](/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&preserve-view=true) tutorials.

## Run your app locally

You can use the Teams Toolkit to run your app in the local environment. To prepare the environment, ensure that:

- An Azure Active Directory Application is registered in the Microsoft 365 tenant.
- An app manifest is submitted to the Developer Center for Teams.
- [ngrok](https://ngrok.io) is installed and used to provide a tunnel between Teams and your bot code.

To build and run your app in the local environment:

1. From Visual Studio Code, select the **F5** key to run your application in debug mode.

   > When you run the app for the first time, all dependencies are downloaded and the app is built.  A browser window automatically opens when the build is complete.  This can take 3-5 minutes to complete.

1. Your web browser starts to run the app. If you're prompted to open Teams desktop, select **Cancel** to remain in the browser. You may also be prompted to switch to Teams desktop at other times; select the Teams web app when prompted.

   :::image type="content" source="../assets/images/teams-toolkit-v2/launch-web-browser-and-pick-webapp.png" alt-text="Screenshot showing how to pick the web version of teams when launched":::

1. Sign in with your Microsoft 365 account, if prompted.
1. When prompted to install the app to Teams, select **Add**.

   After the app is loaded, a chat session with the bot opens. You can type `welcome` to show an introduction card, and `learn` to go to adaptive card and bot command documentation.

   You can do normal debugging activities, such as setting breakpoints, as with any other web application. Open the `bot/teamsBot.js` file and locate the `onMessage()` method. Set a breakpoint on any case. Then type some text.

<!-- markdownlint-disable MD033 -->
<details>
<summary>Learn what happens when you run your app locally in the debugger.</summary>

When you select the **F5** key, the Teams Toolkit:

1. Registers your application with Azure Active Directory.
1. Registers your application for "side loading" in Microsoft Teams.
1. Starts ngrok tunnel so Teams can communicate with your app.
1. Starts Microsoft Teams with a command to instruct Teams to sideload the application.

</details>

<!-- markdownlint-disable MD033 -->
<details>
<summary>Learn how to troubleshoot common issues when running your app locally.</summary>

To run your app in Teams, use your Microsoft 365 development account that allows app sideloading. For more information about account opening, see [Prerequisites](prerequisites.md#set-up-your-teams-development-tenant).

> [!IMPORTANT]
> Currently, sideloading apps are available in Government Community Cloud (GCC), GCC-High, and DOD.

> [!TIP]
> Check for issues before sideloading your app, using the [app validation tool](https://dev.teams.microsoft.com/appvalidation.html). This tool is included in the toolkit. Fix the errors to sideload the app.
</details>

<!-- markdownlint-disable MD033 -->

<details>
<summary>Learn what happens when you deployed your app to Azure</summary>

Before deployment, the application has been running in your local environment:

- The application HTTP endpoint, where Microsoft Teams loads the application, runs locally.

   Deployment involves two steps. First, you provision resources on an active Azure subscription. Then, you deploy (upload) the backend and frontend code for the application to Azure. The backend uses various Azure services, including Azure App Service and Azure Bot Service.

</details>


## Next step

Next, let's try building another type of Teams app, or go ahead and see how to deploy your bot to Azure!

> [!div class="nextstepaction"]
> [Build your first Message Extension](../get-started/first-message-extension.md)

> [!div class="nextstepaction"]
> [Deploy your app in Azure](../get-started/get-started-deploy-teams-app-azure.md)

## See also

* [Tutorials Overview](code-samples.md) 
* [Create an app using React](first-app-react.md)
* [Create an app using Blazor](first-app-blazor.md)
* [Create an app using SPFx](first-app-spfx.md)
* [Create an app using C# or .NET](get-started-dotnet-app-studio.md)
* [Create an app using Node.js](get-started-nodejs-app-studio.md)
* [Create an app using Yeoman generator](get-started-yeoman.md)
* [Create a messaging extension](first-message-extension.md)
* [Code Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples)
