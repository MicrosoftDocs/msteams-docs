---
title: Build Interactive Notification Bot
description: Learn to build an interactive notification bot with the help of GitHub Codespaces which sends messages in Teams channel, group chat, or personal chat.
ms.localizationpriority: medium
ms.date: 02/06/2025
ms.topic: reference
---

# Build an Interactive Notification Bot App

An interactive notification bot sends messages to a Teams channel, group chat, or personal chat. This bot can be triggered through an HTTP request that sends either adaptive cards or simple text messages. To learn more about proactive notifications from tab apps, refer to [activity feed notifications](/graph/teams-send-activityfeednotifications).

:::image type="content" border="false" source="../assets/images/get-started/get-started-bot.png" alt-text="Screenshot shows you the conceptual notification bot in Teams client":::

This tutorial explains how to build an interactive notification bot app. You can choose one of the following methods:

* **GitHub Codespaces**: Quickly experience a pre-configured Teams app. This option opens Visual Studio Code (VS Code) in your browser with the Teams Toolkit extension, app source code, and all required dependencies readily available.
* **Step-by-step guide**: Set up your development environment and build a Teams app from scratch with detailed instructions.

# [GitHub Codespaces](#tab/teamstoolkitcodespaces)

Before you create your Codespace, confirm that you have the following prerequisites:

* A GitHub account to create your Codespace instance.
* A [Microsoft 365 account](https://developer.microsoft.com/microsoft-365/dev-program) that includes the permission to upload custom apps.
* A [Microsoft 365 tenant](../concepts/build-and-test/prepare-your-o365-tenant.md).

> [!TIP]
> [GitHub Codespaces](https://github.com/features/codespaces) offers a free plan with a fixed amount of usage per month. If you need to reclaim space, visit [github.com/codespaces](https://github.com/codespaces) and delete any Codespaces that are no longer in use.

To create an interactive Teams notification bot using GitHub Codespaces, follow these steps:

1. **Open GitHub Codespaces:**  
   Click the button below to launch GitHub Codespaces with your new project setup:

   <a href="https://github.com/codespaces/new?hide_repo_select=true&ref=v3&repo=348288141&machine=basicLinux32gb&location=WestUs2&devcontainer_path=.devcontainer%2Fnotification-codespaces%2Fdevcontainer.json&resume=1" target="_blank"><img src="https://github.com/codespaces/badge.svg" alt="Open hello-world tab in GitHub Codespaces"></a>

   If you haven't signed in to GitHub yet, you will be prompted to do so.

2. **Create a New Codespace:**  
   Click **Create new codespace**. You will see the "Setting up your codespace" page as shown below.

   :::image type="content" source="../assets/images/get-started/codespace.png" alt-text="Screenshot shows you the GitHub page to create a codespace for bot.":::

   Shortly afterward, the following screen appears as the Codespace builds your environment:

   :::image type="content" source="../assets/images/get-started/building-codespace.png" alt-text="Screenshot shows you the codespace building your notification bot.":::

   The Teams Toolkit automatically prepares an interactive notification bot project for you and opens it in VS Code (in your browser). Look for the Teams Toolkit icon in the VS Code activity bar.

3. **Sign in to Microsoft 365 and Azure:**  
   Within VS Code, select **Sign in to your Microsoft 365** and **Sign in to Azure**. Use your Microsoft 365 account credentials to sign in.

   :::image type="content" source="../assets/images/get-started/toolkit-in-browser-sign-in.png" alt-text="Screenshot shows you the Teams Toolkit window in browser to sign in." lightbox="../assets/images/get-started/add-tab-in-teams.png":::

   > [!NOTE]
   > When you build your app, GitHub Codespaces loads it into the Teams client in a new tab. If your browser blocks pop-up tabs or windows, ensure that you allow pop-ups so your app window can open properly.

4. **Preview Your Teams App:**  
   Click **Preview your Teams App (F5)**. 

   :::image type="content" source="../assets/images/get-started/toolkit-in-browser.png" alt-text="Screenshot shows you the Teams Toolkit window in browser with your notification bot." lightbox="../assets/images/get-started/toolkit-in-browser.png":::

   At this stage, GitHub Codespaces builds your interactive notification bot app, loads it into the Teams client, and opens it in a separate browser tab. This step helps you verify that the app is functioning as expected during the development process.

5. **Add the Bot to Teams:**  
   Click **Add** to install your interactive notification bot into the Teams environment.

   :::image type="content" source="../assets/images/get-started/codespace/bot-teams.png" alt-text="Screenshot of the app details dialog to install the notification bot app in Teams.":::

   After the app is added, a dialog appears allowing you to choose the scope in which to use your app.

6. **Select the App Scope:**  
   Choose **Open** to run the app in the personal scope. Alternatively, you can search and select a different scope or opt for a channel, chat, or meeting from the list. Continue through the dialog until you confirm by clicking **Go**.

   :::image type="content" source="../assets/images/get-started/codespace/bot-teams-scope.png" alt-text="Screenshot of the scope selection dialog with the options to select from shared scopes.":::

7. **Trigger the Interactive Notification:**  
   Open a new terminal in your Codespace and execute the following command to trigger an event that sends an interactive notification to your bot:

   ```bash
   curl -X POST http://localhost:3978/api/notification
   ```

   > [!TIP]
   > In a real-world scenario, events are typically triggered by external sources, such as third-party APIs. These events cause the bot to send interactive notifications to the user. The `curl` command here simulates an event trigger manually for testing purposes.

   After running the command, the notification bot app sends an interactive Adaptive Card notification to your Teams client:

   :::image type="content" source="../assets/images/get-started/codespace/notification-bot.png" alt-text="Screenshot shows your notification bot loaded in the Teams client.":::

   Congratulations! You have successfully created and deployed an interactive notification bot in the Teams client using GitHub Codespaces.

# [Step-by-step guide](#tab/step-by-step-guide)

If you prefer to build your interactive notification bot from scratch using the Teams Toolkit, you will need to set up your development environment first. To get started with the complete process, click the button below:

> [!div class="nextstepaction"]
> [Start building an interactive notification bot](../sbs-gs-notificationbot.yml)

---

For additional functionalities, consider exploring the following related topics:

If you want to build a message extension, go to:

> [!div class="nextstepaction"]
> [Build message extension](build-message-extension.md)

If you want to build a basic tab app, go to:

> [!div class="nextstepaction"]
> [Build your basic tab app](build-basic-tab-app.md)