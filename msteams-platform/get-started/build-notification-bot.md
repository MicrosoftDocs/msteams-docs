---
title: Build notification bot
description: Sends messages in Teams channel or group chat or personal chat.
ms.localizationpriority: medium
ms.topic: reference
---
# Build notification bot

The notification bot proactively sends messages in Teams channel or group chat or personal chat. You can trigger the notification bot with an HTTP request, such as cards or texts.

:::image type="content" border="false" source="../assets/images/get-started/get-started-bot.png" alt-text="Illustration showing a conceptual notification bot":::

In this tutorial, get familiarize with the scenario-based Teams app in one of the following ways:

* [Use Teams Toolkit codespaces to build a notification bot](#use-teams-toolkit-codespaces-to-build-a-notification-bot) or
* [Use step-by-step guide to build a notification bot](#use-step-by-step-guide-to-build-a-notification-bot)

## Use Teams Toolkit codespaces to build a notification bot

The codespace instance allows you to experience a Teams app almost instantaneously. It opens Visual Studio Code, where Teams Toolkit extension, the app source code, and all dependencies are pre-packaged for you. You just need to select the following button to begin.

But before you create your codespace, ensure that you have:

* A GitHub account to create your codespace instance
* A [Microsoft 365 account](https://developer.microsoft.com/microsoft-365/dev-program) with sideloading permission
* A [Microsoft 365 tenant](../concepts/build-and-test/prepare-your-o365-tenant.md)

To use codespaces for creating a Teams notification bot:

<a href="https://github.com/codespaces/new?hide_repo_select=true&ref=dol%2Fcodespaces&repo=348288141&machine=basicLinux32gb&devcontainer_path=.devcontainer%2Fnotification-codespaces%2Fdevcontainer.json&location=WestUs2" target="_blank"><img src="https://github.com/codespaces/badge.svg" alt="Open hello-world tab in GitHub Codespaces"></a>

1. Select the button above to open codespaces. You may be asked to sign in to GitHub account if you haven't.
1. Select **Create codespaces**.

   :::image type="content" source="../assets/images/get-started/codespace.png" alt-text="Screenshot shows you the GitHub page to create a codespace for bot.":::

   The **Setting up your codespace** page appears.

   :::image type="content" source="../assets/images/get-started/building-codespace.png" alt-text="Screenshot shows you the codespace building your notification bot.":::

   Teams Toolkit prepares the notification bot project for you and opens it in Visual Studio Code in the browser. Teams Toolkit icon appears in the activity bar of Visual Studio Code.

1. Select **Sign in to your Microsoft 365** and **Sign in to Azure** to sign in with your Microsoft 365 account.

   :::image type="content" source="../assets/images/get-started/toolkit-in-browser-sign-in.png" alt-text="Screenshot shows you the Teams Toolkit window in browser to sign in."lightbox="../assets/images/get-started/add-tab-in-teams.png":::

1. Select **Preview your Teams App (F5)** to build your notification bot.

      :::image type="content" source="../assets/images/get-started/toolkit-in-browser.png" alt-text="Screenshot shows you the Teams Toolkit window in browser with your notification bot.":::

   Teams Toolkit codespaces builds the app. A dialog appears to prompt you to open the app in a browser.

    > [!NOTE]
    >
    > Your browser may block a pop-up to prevent to open a new browser tab or window. You need to allow pop-ups so that the codespace can sideload the app to Teams client in another tab.

1. Select **Open in Browser** to preview your notification bot in the browser.

   :::image type="content" source="../assets/images/get-started/open-in-browser.png" alt-text="Screenshot shows you to open your notification bot in browser.":::

   Your notification bot is sideloaded to Teams and opens in the browser.

   :::image type="content" source="../assets/images/get-started/tab-in-browser.png" alt-text="Screenshot shows your bot opened in the browser window.":::

1. Once the app dialog appears, select **Add** to install your notification bot in Teams.

   :::image type="content" source="../assets/images/get-started/tab-in-teams.png" alt-text="Screenshot shows you the notification bot loaded in the Teams client.":::

   You've successfully created the notification bot and loaded in the Teams client.

   :::image type="content" source="../assets/images/get-started/tab-app-in-teams.png" alt-text="Screenshot shows your notification bot loaded in the Teams client.":::

> [!TIP]
> [GitHub codespaces](https://github.com/features/codespaces) offers the free plan up to a fixed amount of usage every month. If you need to free up the space, go to [github.com/codespaces](https://github.com/codespaces) and delete the codespaces that you no longer need.

## Use step-by-step guide to build a notification bot

If you would like to learn how to start a project with Teams Toolkit from scratch, let's go through the step-by-step guide together.

Unlike codespaces, where everything you need is packaged for you already, you'll need to set you your development environment. Let's start with prerequisites section first before start building.

> [!div class="nextstepaction"]
> [Prerequisites](../toolkit/tools-prerequisites.md)

> [!div class="nextstepaction"]
> [Start building a notification bot](../sbs-gs-notificationbot.yml)
