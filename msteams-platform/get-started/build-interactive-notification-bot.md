---
title: Build an interactive notification bot
description: Sends messages in Teams channel or group chat or personal chat.
ms.localizationpriority: medium
ms.date: 06/07/2023
ms.topic: reference
---

# Build an interactive notification bot

For an interactive notification, a bot sends messages in a Teams channel, group chat, or personal chat. You can trigger an interactive notification bot with an HTTP request, such as cards or texts. For proactive notifications from tab apps, use [activity feed notifications](/graph/teams-send-activityfeednotifications).

:::image type="content" border="false" source="../assets/images/get-started/get-started-bot.png" alt-text="Screenshot shows you the conceptual notification bot in Teams client":::

In this tutorial, learn about an interactive notification bot app in one of the following ways.

* **GitHub Codespaces**: The codespace instance allows you to experience a Teams app instantaneously. It opens Visual Studio Code (VS Code) where the Teams Toolkit extension, the app source code, and all the dependencies are pre-packaged for you.
* **Step-by-step guide**: Allows you to set up your development environment and build a Teams app from the start.

# [GitHub Codespaces](#tab/teamstoolkitcodespaces)

Before you create your codespace, ensure that you have the following prerequisites:

* A GitHub account to create your codespace instance
* A [Microsoft 365 account](https://developer.microsoft.com/microsoft-365/dev-program) with custom app upload permission
* A [Microsoft 365 tenant](../concepts/build-and-test/prepare-your-o365-tenant.md)

> [!TIP]
>
> [GitHub Codespaces](https://github.com/features/codespaces) offers a free plan with a fixed amount of usage per month. If you need to free up more space, go to [github.com/codespaces](https://github.com/codespaces) and delete the codespace that you no longer need.

To create an interactive Teams notification bot with GitHub Codespaces, follow these steps:

1. Select the following button to open GitHub Codespaces.

   <a href="https://github.com/codespaces/new?hide_repo_select=true&ref=v3&repo=348288141&machine=basicLinux32gb&location=WestUs2&devcontainer_path=.devcontainer%2Fnotification-codespaces%2Fdevcontainer.json&resume=1" target="_blank"><img src="https://github.com/codespaces/badge.svg" alt="Open hello-world tab in GitHub Codespaces"></a>

   You might be asked to sign in to GitHub account if you haven't already.

1. Select **Create new codespace**.

   :::image type="content" source="../assets/images/get-started/codespace.png" alt-text="Screenshot shows you the GitHub page to create a codespace for bot.":::

   The **Setting up your codespace** page appears.

   :::image type="content" source="../assets/images/get-started/building-codespace.png" alt-text="Screenshot shows you the codespace building your notification bot.":::

   Teams Toolkit prepares an interactive notification bot project for you and opens it in VS Code in the browser. The Teams Toolkit icon appears in the activity bar of VS Code.

1. Select **Sign in to your Microsoft 365** and **Sign in to Azure** to sign in with your Microsoft 365 account.

   :::image type="content" source="../assets/images/get-started/toolkit-in-browser-sign-in.png" alt-text="Screenshot shows you the Teams Toolkit window in browser to sign in."lightbox="../assets/images/get-started/add-tab-in-teams.png":::

    > [!NOTE]
    >
    > When you build your app, GitHub Codespaces loads it to the Teams client in a new tab. If your browser blocks pop-up tabs or windows, you need to allow pop-ups for your app to open.

1. Select **Preview your Teams App (F5)**.

      :::image type="content" source="../assets/images/get-started/toolkit-in-browser.png" alt-text="Screenshot shows you the Teams Toolkit window in browser with your notification bot."lightbox="../assets/images/get-started/toolkit-in-browser.png":::

   GitHub Codespaces builds your interactive notification bot app, loads it to Teams client, and opens it in a separate browser tab.

1. Once the app dialog appears, select **Add** to install your interactive notification bot in Teams.

   :::image type="content" source="../assets/images/get-started/codespace/bot-teams.png" alt-text="Screenshot shows you the notification bot loaded in the Teams client.":::

1. Open a new terminal in your codespace and run the following command to trigger an event for sending an interactive notification to your bot:

   ```bash
   curl -X POST http://localhost:3978/api/notification
   ```

   > [!TIP]
   >
   > In real time, events are triggered by an external source, such as a third-party API that cause the notification bot to send the user an interactive notification. To emulate an event trigger, you can send an event manually through curl commands on terminal.

   The notification bot app sends a interactive notification as an Adaptive Card to your Teams client:

   :::image type="content" source="../assets/images/get-started/codespace/notification-bot.png" alt-text="Screenshot shows your notification bot loaded in the Teams client.":::

   You've now successfully created an interactive notification bot and loaded it in the Teams client.

# [Step-by-step guide](#tab/step-by-step-guide)

If you want to learn how to start a project with Teams Toolkit from the beginning, you need to set up your development environment. Select the following button to start building your interactive notification bot.

> [!div class="nextstepaction"]
> [Start building an interactive notification bot](../sbs-gs-notificationbot.yml)

---

If you want to build a message extension, go to:

> [!div class="nextstepaction"]
> [Build message extension](build-message-extension.md)

If you want to build basic tab app, go to:

> [!div class="nextstepaction"]
> [Build your basic tab app](build-basic-tab-app.md)
