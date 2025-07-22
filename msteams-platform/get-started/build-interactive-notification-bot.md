---
title: Build Interactive Notification Bot
description: Learn to build an interactive notification bot with the help of GitHub Codespaces which sends messages in Teams channel, group chat, or personal chat.
ms.localizationpriority: medium
ms.date: 02/06/2025
ms.topic: reference
---

# Build an interactive notification bot app

Develop an interactive notification bot that sends messages in a Teams channel, group chat, or personal chat. Developers can trigger an interactive notification bot using an HTTP request, such as sending cards or text messages. For proactive notifications from tab apps, refer to the [activity feed notifications](/graph/teams-send-activityfeednotifications).

:::image type="content" border="false" source="../assets/images/get-started/get-started-bot.png" alt-text="Screenshot shows you the conceptual notification bot in Teams client":::

Developers can learn about the interactive notification bot app in one of the following ways:

* **GitHub Codespaces**: The codespace instance provides an instantaneous Teams app experience by opening Visual Studio Code (VS Code) with the Microsoft 365 Agents Toolkit extension, the app source code, and all dependencies already configured.
* **Step-by-step guide**: Set up the development environment from the beginning to build a Teams app.

# [GitHub Codespaces](#tab/agentstoolkitcodespaces)

Before creating the codespace, ensure that developers have the following prerequisites:

* A GitHub account to create the codespace instance
* A [Microsoft 365 account](https://developer.microsoft.com/microsoft-365/dev-program) with custom app upload permission
* A [Microsoft 365 tenant](../concepts/build-and-test/prepare-your-o365-tenant.md)

> [!TIP]
> 
> [GitHub Codespaces](https://github.com/features/codespaces) offers a free plan with a fixed usage limit per month. Developers who need more space can visit [github.com/codespaces](https://github.com/codespaces) and delete any codespace that is no longer required.

To create an interactive Teams notification bot with GitHub Codespaces, follow these steps:

1. Select the following button to open GitHub Codespaces:

   <a href="https://github.com/codespaces/new?hide_repo_select=true&ref=v3&repo=348288141&machine=basicLinux32gb&location=WestUs2&devcontainer_path=.devcontainer%2Fnotification-codespaces%2Fdevcontainer.json&resume=1" target="_blank"><img src="https://github.com/codespaces/badge.svg" alt="Open hello-world tab in GitHub Codespaces"></a>

   Developers might need to sign in to their GitHub account if they are not already signed in.

2. Select **Create new codespace**.

   :::image type="content" source="../assets/images/get-started/codespace.png" alt-text="Screenshot shows you the GitHub page to create a codespace for bot.":::

   The **Setting up your codespace** page appears.

   :::image type="content" source="../assets/images/get-started/building-codespace.png" alt-text="Screenshot shows you the codespace building your notification bot.":::

   The Agents Toolkit prepares an interactive notification bot project and opens it in VS Code in the browser. The Microsoft 365 Agents Toolkit icon appears in the VS Code activity bar.

3. Select **Sign in to your Microsoft 365** and **Sign in to Azure** to authenticate using the Microsoft 365 account.

   :::image type="content" source="../assets/images/get-started/toolkit-in-browser-sign-in.png" alt-text="Screenshot shows you the Agents Toolkit window in browser to sign in." lightbox="../assets/images/get-started/add-tab-in-teams.png":::

   > [!NOTE]
   >
   > When building the app, GitHub Codespaces loads it to the Teams client in a new tab. Developers need to allow pop-ups if the browser blocks new tabs or windows.

4. Select **Preview your Teams App (F5)**.

   :::image type="content" source="../assets/images/get-started/toolkit-in-browser.png" alt-text="Screenshot shows you the Agents Toolkit window in browser with your notification bot." lightbox="../assets/images/get-started/toolkit-in-browser.png":::

   GitHub Codespaces builds the interactive notification bot app, loads it to the Teams client, and opens it in a separate browser tab.

5. Select **Add** to install the interactive notification bot in Teams.

   :::image type="content" source="../assets/images/get-started/codespace/bot-teams.png" alt-text="Screenshot of the app details dialog to install the notification bot app in Teams.":::

   Once the app installs, a dialog appears for developers to select the scope to use the app.

6. Select **Open** to open the app in the personal scope.

   Alternatively, developers can search and select the required scope or choose a channel, chat, or meeting from the options provided, and then follow the dialog to select **Go**.

   :::image type="content" source="../assets/images/get-started/codespace/bot-teams-scope.png" alt-text="Screenshot of the scope selection dialog with the options to select from shared scopes.":::

7. Open a new terminal in the codespace and run the following command to trigger an event that sends an interactive notification to the bot:

   ```bash
   curl -X POST http://localhost:3978/api/notification
   ```

   > [!TIP]
   >
   > In a production environment, external sources such as third-party APIs trigger events that cause the notification bot to send interactive notifications. Developers can emulate event triggers by manually sending events using cURL commands in the terminal.

   The notification bot app sends an interactive notification as an Adaptive Card to the Teams client:

   :::image type="content" source="../assets/images/get-started/codespace/notification-bot.png" alt-text="Screenshot shows your notification bot loaded in the Teams client.":::

   Developers have successfully created an interactive notification bot and loaded it in the Teams client.

   > [!div class="nextstepaction"]
   > [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+an+interactive+notification+bot+app+using+GitHub+Codespaces&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fget-started%2Fbuild-interactive-notification-bot%3Ftabs%3Dagentstoolkitcodespaces&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fget-started%2Fbuild-interactive-notification-bot.md&documentVersionIndependentId=e5653869-a83d-3558-0896-b88c45816a22&platformId=eee097dd-e3f6-d51e-48d6-fc448f59cf0d&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

# [Step-by-step guide](#tab/step-by-step-guide)

Developers who want to start a project with Agents Toolkit from scratch need to set up the development environment. Select the following button to begin building the interactive notification bot:

> [!div class="nextstepaction"]
> [Start building an interactive notification bot](../sbs-gs-notificationbot.yml)

---

Developers wanting to build a message extension can refer to the following:

> [!div class="nextstepaction"]
> [Build message extension](build-message-extension.md)

Developers wanting to build a basic tab app can refer to the following:

> [!div class="nextstepaction"]
> [Build your basic tab app](build-basic-tab-app.md)