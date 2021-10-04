---
title: Build your first Teams bot app
author: adrianhall
description: Build a Microsoft Teams bot app using the Microsoft Teams Toolkit and JavaScript.
ms.author: adhal
ms.date: 05/27/2021
ms.topic: quickstart
ms.localizationpriority: none
---

# Build your bot project

After you set up your project workspace with Teams Toolkit, build your bot project. Ensure that you've signed in to your Microsoft 365 account.

:::image type="content" source="../assets/images/get-started/app-roadmap/roadmap-p3.png" alt-text="Image showing phase 3 of building an app." border="false":::

In this page, you'll learn to:
- [Build and run your first bot app](#build-and-run-your-first-bot-app-locally)

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

## Build and run your first bot app locally

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

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/f5-build-and-run.png" alt-text="Screenshot showing when F5 key is pressed.":::

   > When you run the app for the first time, all dependencies are downloaded and the app is built. A browser window automatically opens when the build is complete. This can take 3-5 minutes to complete.

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
<summary>Learn how to troubleshoot if your app doesn't run locally.</summary>

To successfully run your app in Teams, ensure that you've enabled sideloading in your Teams account. For more information on sideloading, see [Prerequisites](prerequisites.md#set-up-your-teams-development-tenant).

> [!IMPORTANT]
> Currently, sideloading apps are available in Government Community Cloud (GCC), GCC-High, and DOD.

> [!TIP]
> Check for issues before sideloading your app, using the [app validation tool](https://dev.teams.microsoft.com/appvalidation.html). This tool is included in the toolkit. Fix the errors to sideload the app.
</details>

| &nbsp; | &nbsp; |
|:--- | ---:|
| **Back** : [Create your first Teams bot app](first-app-bot.md) | [Create your first message extension app](first-message-extension.md) : **Next**|
|