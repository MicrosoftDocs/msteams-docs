---
title: Build notification bot
description: Sends messages in Teams channel or group chat or personal chat.
ms.localizationpriority: medium
ms.topic: reference
---
# Build notification bot

The notification bot proactively sends messages in Teams channel or group chat or personal chat. You can trigger the notification bot with an HTTP request, such as cards or texts.

:::image type="content" border="false" source="../assets/images/get-started/get-started-bot.png" alt-text="Screenshot shows you the conceptual notification bot in Teams client":::

In this tutorial, get familiarized with a notification bot app in one of the following ways:

* **GitHub Codespaces**: The codespace instance allows you to experience a Teams app instantaneously. It opens Visual Studio Code (VS Code), where the Teams Toolkit extension, the app source code, and all the dependencies are pre-packaged for you.
* **Step-by-step guide**: Allows you to create a Teams app from scratch with all development environment setup.

# [GitHub Codespaces](#tab/teamstoolkitcodespaces)

Before you create your codespace, ensure that you have:

* A GitHub account to create your codespace instance.
* A [Microsoft 365 account](https://developer.microsoft.com/microsoft-365/dev-program) with sideloading permission.
* A [Microsoft 365 tenant](../concepts/build-and-test/prepare-your-o365-tenant.md)

> [!TIP]
> [GitHub Codespaces](https://github.com/features/codespaces) offers free plan up to a fixed amount of usage every month. If you need to free up the space, go to [github.com/codespaces](https://github.com/codespaces) and delete the codespace that you no longer need.

To create a Teams notification bot with GitHub Codespaces, follow the steps:

1. Select the following button to open GitHub Codespaces.

   <a href="https://github.com/codespaces/new?hide_repo_select=true&ref=v3&repo=348288141&machine=basicLinux32gb&location=WestUs2&devcontainer_path=.devcontainer%2Fnotification-codespaces%2Fdevcontainer.json&resume=1" target="_blank"><img src="https://github.com/codespaces/badge.svg" alt="Open hello-world tab in GitHub Codespaces"></a>

   You might be asked to sign in to GitHub account if you haven't.

1. Select **Create new codespace**.

   :::image type="content" source="../assets/images/get-started/codespace.png" alt-text="Screenshot shows you the GitHub page to create a codespace for bot."lightbox="../assets/images/get-started/codespace.png":::

   The **Setting up your codespace** page appears.

   :::image type="content" source="../assets/images/get-started/building-codespace.png" alt-text="Screenshot shows you the codespace building your notification bot.":::

   Teams Toolkit prepares the notification bot project for you and opens it in VS Code in the browser. Teams Toolkit icon appears in the activity bar of VS Code.

1. Select **Sign in to your Microsoft 365** and **Sign in to Azure** to sign in with your Microsoft 365 account.

   :::image type="content" source="../assets/images/get-started/toolkit-in-browser-sign-in.png" alt-text="Screenshot shows you the Teams Toolkit window in browser to sign in."lightbox="../assets/images/get-started/add-tab-in-teams.png":::

    > [!NOTE]
    >
    > When you build your app, GitHub Codespaces loads it to Teams client in a new tab. If your browser blocks pop-up tabs or windows, you'll need to allow pop-ups to let your app open.

1. Select **Preview your Teams App (F5)** to build your notification bot.

      :::image type="content" source="../assets/images/get-started/toolkit-in-browser.png" alt-text="Screenshot shows you the Teams Toolkit window in browser with your notification bot."lightbox="../assets/images/get-started/toolkit-in-browser.png":::

   GitHub Codespaces builds your notification bot app, loads it to Teams client, and opens in another browser tab or window.

1. Once the app dialog appears, select **Add** to install your notification bot in Teams.

   :::image type="content" source="../assets/images/get-started/codespace/bot-teams.png" alt-text="Screenshot shows you the notification bot loaded in the Teams client.":::

1. Open a new terminal in your codespace and run the following command to trigger an event for sending a notification to your bot:

   ```bash
   curl -X POST http://localhost:3978/api/notification
   ```

    > [!Tip]
    >
    > In real time, events are triggered by an external source, such as a third-party API that cause the notification bot to send the user a notification. To emulate an event trigger, you can send an event manually via curl commands on terminal.

   The notification bot app sends a notification as an Adaptive Card to your Teams client:

   :::image type="content" source="../assets/images/get-started/codespace/notification-bot.png" alt-text="Screenshot shows your notification bot loaded in the Teams client.":::

   You've successfully created the notification bot and loaded it in the Teams client.

# [Step-by-step guide](#tab/step-by-step-guide)

If you would want to learn how to start a project with Teams Toolkit from scratch, let's go through the step-by-step guide.

Unlike GitHub Codespaces, you need to set up your development environment. Let's start building your notification bot app.

> [!div class="nextstepaction"]
> [Start building a notification bot](../sbs-gs-notificationbot.yml)

---

If you want to build a message extension, go to:

> [!div class="nextstepaction"]
> [Build message extension](build-message-extension.md)

If you want to build basic tab app, go to:

> [!div class="nextstepaction"]
> [Build your basic tab app](build-basic-tab-app.md)
