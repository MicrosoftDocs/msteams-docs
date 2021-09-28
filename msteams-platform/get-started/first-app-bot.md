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

The bot capability of a Teams app creates a chatbot or a conversational bot. You use it to run simple and automated tasks, like providing customer service. A bot talks with a web service and helps you use its offerings. You can get weather information, make reservations, or any other service offered.

In this tutorial, you'll learn:

1. [How to set up a new project with Teams Toolkit.](#create-your-bot-project)
1. [About the directory structure of your app project.](#take-a-tour-of-the-source-code)
1. [How to run an app locally.](#build-and-run-your-app-locally-in-visual-studio-code)

> [!IMPORTANT]
> Currently, bots are available in Government Community Cloud (GCC) but not available in GCC-High and Department of Defense (DOD).

## Create your bot project

If the [prerequisites](prerequisites.md) are in place, let's begin!

> [!NOTE]
> The Visual Studio Code UI shown is from Mac. It may differ depending on whether your operating system is Windows or Linux.

# [Visual Studio Code](#tab/vscode)

1. Open Visual Studio Code.
1. Select the Teams Toolkit :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.png"::: icon in the Visual Studio Code sidebar.

1. Select **Create a new Teams app**. The UI may look different, depending on your operating system.

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/create-project.png" alt-text="Location of the Create New Project link in the Teams Toolkit sidebar." border="false":::

1. Select **Create a new Teams app**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/create-new-app.png" alt-text="Wizard start for Create New Project" border="false":::

1. Select **Bot**, deselect **Tab**, and select **OK**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/select-capabilities.png" alt-text="Screenshot showing how to add capabilities to your new app." border="false":::

1. Select **Create a new bot registration** in the **Bot registration** section.

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/create-bot-registration.png" alt-text="Select create a new bot registration" border="false":::

1. Select **JavaScript** in the **Programming Language** section.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/select-language.png" alt-text="Screenshot showing how to select the programming language." border="false":::

1. Select a workspace folder. Teams Toolkit creates a folder in your workspace folder for the app project.

1. Enter a suitable name for your app, like `hellobot`. Ensure that your app's name is alphanumeric. Select **Enter** to continue.

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/enter-name.png" alt-text="Screenshot showing where to enter the app name." border="false":::

    Your Teams app is created in a few seconds.

# [Command line](#tab/cli)

Use the `teamsfx` CLI to create your first project.  Start from the folder where you want to create the project folder.

``` bash
teamsfx new
```

You can use the CLI to create a new Teams app. The CLI leads you through a series of questions. Every question includes an instruction on answering it.

For example, use arrow keys to select an option. After you make the choice, select **Enter** to confirm it.

1. Select **Create a new Teams app**.
1. Select **Bot** and deselect **Tab**.
1. Select **Create a new bot registration**.
1. Select **JavaScript** as the programming language.
1. Press **Enter** to select the default workspace folder.
1. Enter a suitable name for your app, like `HelloBot`.  The name of the app must consist only of alphanumeric characters.

After all the questions have been answered, your project is created.

---

## Take a tour of the source code

After scaffolding is done, view the project directories and files in the Explorer area of Visual Studio Code.

:::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/bot-code-tree.png" alt-text="Project files scaffolded for bot in Visual Studio Code." border="false":::

The bot code is stored in the `bot` directory. The `bot/teamsBot.js` is the main entry point for the bot.

> [!Tip]
> Familiarize yourself with bots outside of Teams before you integrate your first bot within Teams.  For more information about bots, see the [Azure Bot Service](/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&preserve-view=true) tutorials.

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

To build and run your app in the local environment:

1. Select **F5** in Visual Studio Code to run your app in debug mode.

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

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/f5-build-and-run.png" alt-text="Screenshot showing when F5 key is pressed.":::

   > When you run the app for the first time, all dependencies are downloaded and the app is built.  A browser window automatically opens when the build is complete. This can take 3-5 minutes to complete.

    Your web browser starts to run the app.

1. Sign in with your Microsoft 365 account, if prompted.

   > You may be asked to open Teams desktop, select **Cancel** to remain in the browser.

1. Select **Add** when prompted to sideload the app onto Teams on your local machine.

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/install-bot.png" alt-text="Screenshot showing the bot is being added on Teams client.":::

   Now the bot is successfully running on Teams! After the app is loaded, a chat session with the bot opens.

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/run-bot.png" alt-text="Screenshot showing the bot is running on Teams client.":::

   You can type `welcome` to show an introduction card, and `learn` to go to adaptive card and bot command documentation.

   You can do normal debugging activities, such as setting breakpoints, as with any other web application. Open the `bot/teamsBot.js` file and locate the `onMessage()` method. Set a breakpoint on any case. Then type some text.

<!-- markdownlint-disable MD033 -->
<details>
<summary>Learn how to troubleshoot if your doesn't app run locally.</summary>

To successfully run your app in Teams, ensure that you've enabled sideloading in your Teams account. For more information on sideloading, see [Prerequisites](prerequisites.md#set-up-your-teams-development-tenant).

> [!IMPORTANT]
> Currently, sideloading apps are available in Government Community Cloud (GCC), GCC-High, and DOD.

> [!TIP]
> Check for issues before sideloading your app, using the [app validation tool](https://dev.teams.microsoft.com/appvalidation.html). This tool is included in the toolkit. Fix the errors to sideload the app.
</details>

## Next step

Next, let's try building another type of Teams app, or go ahead and see how to deploy your bot to Azure!

> [!div class="nextstepaction"]
> [Build your first Message Extension](../get-started/first-message-extension.md)

> [!div class="nextstepaction"]
> [Deploy your app in Azure](../get-started/get-started-deploy-teams-app-azure.md)

| **<<** | **>>** |
|:--- | ---:|
| **Back** : [Create your first Teams app](first-app-react.md) | [Create your first message extension app](first-message-extension.md) : **Next**|
|

## See also

- [Tutorials Overview](code-samples.md)
- [Create an app using React](first-app-react.md)
- [Create an app using Blazor](first-app-blazor.md)
- [Create an app using SPFx](first-app-spfx.md)
- [Create an app using C# or .NET](get-started-dotnet-app-studio.md)
- [Create an app using Node.js](get-started-nodejs-app-studio.md)
- [Create an app using Yeoman generator](get-started-yeoman.md)
- [Create a messaging extension](first-message-extension.md)
- [Code Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples)
