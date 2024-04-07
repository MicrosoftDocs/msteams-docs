---
title: Build your first Teams app
description: Learn how to build your first Microsoft Teams app using GitHub Codespaces, step-by-step guide, or code samples.
ms.localizationpriority: high
ms.date: 06/07/2023
ms.topic: reference
---

# Build your first Teams app

Get started with building apps for Microsoft Teams and beyond!

Use GitHub Codespaces or walk through the step-by-step guide to build a basic, real-world Teams app. This article introduces you to fundamental concepts, common tools, and more advanced functionalities.

Here's an idea of what you'll learn:

* Build tab, scenario-based bot, and message extension with GitHub Codespaces or step-by-step guide.
* Learn about tutorials and code samples available for building your Teams app.
* Learn about various tools and SDKs available for building your Teams app.

## Choose your path

In this section, learn how to build a Teams app with different capabilities, such as tab, scenario-based bot app, and message extension.

1. Select the type of Teams app that you want to build:

   * **Build a basic Teams tab app**: Get started with building a Teams app with a basic tab app.
   * **Build a scenario-based Teams bot app**: Build a Teams app that is suitable for a particular scenario or use-case. For example, a notification bot is suitable for sending notifications but not to chat.
   * **Build message extension Teams app**: Build a search-based message extension Teams app.

2. Choose your path to build your selected app.

   * **GitHub Codespaces**: Allows you to run, test, and debug your app in a development environment without the need for any extra setup.
   * **Step-by-step guide**: Allows you to create a Teams app from the ground up including setting up your development environment.

   :::image type="content" border="false" source="../assets/images/get-started/codescpaces-vs-manual.png" alt-text="Diagram shows the choice to build a Teams app with Codespaces or step-by-step guide." lightbox="../assets/images/get-started/codescpaces-vs-manual.png":::

## GitHub Codespaces

Before you create your codespace to build an app, ensure that you have the following prerequisites:

* [GitHub account](https://github.com/) to create your codespace instance
* [Microsoft 365 account](https://developer.microsoft.com/microsoft-365/dev-program) with custom app upload enabled
* [Microsoft 365 developer tenant](../concepts/build-and-test/prepare-your-o365-tenant.md)

> [!TIP]
> [GitHub Codespaces](https://github.com/features/codespaces) offers a free plan with a fixed amount of usage per month. If you reach the maximum number of allowed codespaces, go to [github.com/codespaces](https://github.com/codespaces) and delete codespaces that you don't need.

# [Tab](#tab/tab1)

:::image type="content" border="false" source="../assets/images/get-started/get-started-tab.png" alt-text="Diagram shows a conceptual tab app in Teams client.":::

To create a basic Teams tab app, follow these steps:

1. Select the following button to open GitHub Codespaces.

    <a href="https://github.com/codespaces/new?hide_repo_select=true&ref=v3&repo=348288141&machine=standardLinux32gb&location=WestUs2&devcontainer_path=.devcontainer%2Fhello-world-tab-codespaces%2Fdevcontainer.json&resume=1" target="_blank"><img src="https://github.com/codespaces/badge.svg" alt="Open hello-world tab in GitHub Codespaces"></a>

   You might be asked to sign in to GitHub account if you haven't already.

2. Select **Create new codespace**.

   :::image type="content" source="../assets/images/get-started/codespace.png" alt-text="Screenshot shows the GitHub page to create a codespace for tab.":::

   The **Setting up your codespace** page appears.

   :::image type="content" source="../assets/images/get-started/building-codespace.png" alt-text="Screenshot shows the codespace building your tab.":::

   Microsoft Teams Toolkit prepares the tab app project for you and opens it in Microsoft Visual Studio Code in the browser. The Teams Toolkit icon appears in the activity bar.

3. Select **Sign in to your Microsoft 365** and sign in with your Microsoft 365 account.

   :::image type="content" source="../assets/images/get-started/toolkit-in-browser-sign-in.png" alt-text="Screenshot shows the Teams Toolkit window in browser to sign in." lightbox="../assets/images/get-started/toolkit-in-browser-sign-in.png":::

4. In the panel, select **PORTS**. Right-click on the active port and select **Port Visibility** > **Public** in the dropdown.

   :::image type="content" source="../assets/images/get-started/tab-in-teams.png" alt-text="Screenshot shows how to make port publicly accessible.":::

    > [!NOTE]
    > When you build your app, GitHub Codespaces loads it in a new tab. If your browser blocks pop-up tabs or windows, you'll need to allow pop-ups for your app to open.

5. Select **Preview your Teams App (F5)**.

      :::image type="content" source="../assets/images/get-started/toolkit-in-browser.png" alt-text="Screenshot shows the Teams Toolkit window in browser with your tab app." lightbox="../assets/images/get-started/toolkit-in-browser.png":::

6. Select **Preview (Codespaces)**.

      :::image type="content" source="../assets/images/get-started/codespace/codespace-debug.png" alt-text="Screenshot shows the option to debug your tab app in GitHub Codespaces.":::

      GitHub Codespaces builds your tab app, loads it to Teams, and opens it in a new browser tab. If the browser prompts you, sign in to your Teams account.

7. A dialog box opens to let you add the tab app to Teams. Select **Add**.

      :::image type="content" source="../assets/images/get-started/codespace/codespace-open-in-browser.png" alt-text="Screenshot shows the option to add the tab app to Teams.":::

      Teams loads the tab app.

      :::image type="content" source="../assets/images/get-started/tab-app-in-teams.png" alt-text="Screenshot shows a preview of your tab app in Teams." lightbox="../assets/images/get-started/tab-app-in-teams.png":::

Congratulations! You've successfully built your first Teams tab app.

# [Bot](#tab/bot1)

:::image type="content" border="false" source="../assets/images/get-started/get-started-bot.png" alt-text="Screenshot shows the conceptual notification bot in Teams client":::

Follow these steps to create a notification bot that proactively sends messages in a Teams channel, group chat, or personal chat. You can trigger the notification bot with an HTTP request, such as cards or texts:

1. Select the following button to open GitHub Codespaces.

   <a href="https://github.com/codespaces/new?hide_repo_select=true&ref=v3&repo=348288141&machine=basicLinux32gb&location=WestUs2&devcontainer_path=.devcontainer%2Fnotification-codespaces%2Fdevcontainer.json&resume=1" target="_blank"><img src="https://github.com/codespaces/badge.svg" alt="Open hello-world tab in GitHub Codespaces"></a>

   You might be asked to sign in to your GitHub account if you haven't already.

2. Select **Create new codespace**.

   :::image type="content" source="../assets/images/get-started/codespace.png" alt-text="Screenshot shows the GitHub page to create a codespace for bot.":::

   The **Setting up your codespace** page appears.

   :::image type="content" source="../assets/images/get-started/building-codespace.png" alt-text="Screenshot shows the codespace building your notification bot.":::

   Teams Toolkit prepares the notification bot project for you and opens it in Visual Studio Code in the browser. The Teams Toolkit icon appears in the activity bar.

3. Select **Sign in to your Microsoft 365** and sign in with your Microsoft 365 account.

   :::image type="content" source="../assets/images/get-started/toolkit-in-browser-sign-in.png" alt-text="Screenshot shows the Teams Toolkit window in browser to sign in." lightbox="../assets/images/get-started/toolkit-in-browser-sign-in.png":::

4. In the panel, select **PORTS**. Right-click on the active port and select **Port Visibility** > **Public** in the dropdown.

   :::image type="content" source="../assets/images/get-started/tab-in-teams.png" alt-text="Screenshot shows how to make port publicly accessible.":::

    > [!NOTE]
    > When you build your app, GitHub Codespaces loads it in a new tab. If your browser blocks pop-up tabs or windows, you'll need to allow pop-ups for your app to open.

5. Select **Preview your Teams App (F5)**.

      :::image type="content" source="../assets/images/get-started/toolkit-in-browser.png" alt-text="Screenshot shows the option to preview your notification bot app." lightbox="../assets/images/get-started/toolkit-in-browser.png":::

6. Select **Debug (Codespaces)**.

      :::image type="content" source="../assets/images/get-started/codespace/codespace-debug-bot.png" alt-text="Screenshot shows the option to debug your bot app in GitHub Codespaces.":::

   GitHub Codespaces builds your notification bot app, loads it to Teams, and opens it in a new browser tab.

5. A dialog box opens to let you add the tab app to Teams. Select **Add**.

   :::image type="content" source="../assets/images/get-started/codespace/bot-teams.png" alt-text="Screenshot shows the option to add the notification bot to Teams.":::

6. Open a new terminal in your codespace and run the following command to trigger an event to send a notification to your bot:

   ```bash
   curl -X POST http://localhost:3978/api/notification
   ```

   > [!TIP]
   > In a real-world scenario, external sources such as third-party APIs trigger events that cause the notification bot to send a notification to the user. To emulate an event trigger, you can send an event manually via curl commands on terminal.

   The notification bot app sends a notification with an Adaptive Card in Teams.

   :::image type="content" source="../assets/images/get-started/codespace/notification-bot.png" alt-text="Screenshot shows the notification bot sending a notification in Teams.":::

Congratulations! You've successfully built your first Teams notification bot app.

# [Message Extension](#tab/msgext1)

:::image type="content" border="false" source="../assets/images/get-started/get-started-me.png" alt-text="Diagram shows a conceptual message extension in Teams.":::

Follow these steps to build a search-based message extension app that allows users to search Node Package Manager (npm) packages from the npm directory:

1. Select the following button to open GitHub Codespaces.

    <a href="https://github.com/codespaces/new?hide_repo_select=true&ref=v3&repo=348288141&machine=basicLinux32gb&location=WestUs2&devcontainer_path=.devcontainer%2Fnpm-search-message-extension-codespaces%2Fdevcontainer.json&resume=1" target="_blank"><img src="https://github.com/codespaces/badge.svg" alt="Open message extension in GitHub Codespaces"></a>

   You might be asked to sign in to your GitHub account if you haven't already.

2. Select **Create new codespace**.

   :::image type="content" source="../assets/images/get-started/codespace.png" alt-text="Screenshot shows the GitHub page to create a codespace for message extension.":::

   The **Setting up your codespace** page appears.

   :::image type="content" source="../assets/images/get-started/building-codespace.png" alt-text="Screenshot shows the codespace building your message extension.":::

   Teams Toolkit prepares the message extension for you and opens it in Visual Studio Code in the browser. The Teams Toolkit icon appears in the activity bar.

3. Select **Sign in to your Microsoft 365** and **Sign in to Azure** to sign in with your Microsoft 365 account.

   :::image type="content" source="../assets/images/get-started/codespace/me-sign-in.png" alt-text="Screenshot shows the Teams Toolkit window in browser to sign in." lightbox="../assets/images/get-started/codespace/me-sign-in.png":::

    > [!NOTE]
    >
    > When you build your app, GitHub Codespaces loads it in a new tab. If your browser blocks pop-up tabs or windows, you'll need to allow pop-ups for your app to open.

4. Select **Preview your Teams App (F5)** to build your message extension.

      :::image type="content" source="../assets/images/get-started/codespace/me-preview-teams.png" alt-text="Screenshot shows the Teams Toolkit window in browser with your message extension." lightbox="../assets/images/get-started/codespace/me-preview-teams.png":::

      GitHub Codespaces builds your message extension app and opens it in a new browser tab.

   Your message extension app is uploaded to Teams.

5. Once the app dialog appears in Teams, select **Add** to install your message extension in Teams.

   :::image type="content" source="../assets/images/get-started/codespace/me-in-teams.png" alt-text="Screenshot shows the message extension loaded in the Teams client.":::

   You successfully created the search-based message extension and loaded in the Teams client.

   :::image type="content" source="../assets/images/get-started/codespace/me-teams-chat.png" alt-text="Screenshot shows your message extension loaded in the Teams client.":::

---

## Step-by-step guide

To start building your Teams app from scratch, use the following step-by-step guides:

| &nbsp; |  **Message extension** | **Bot** | **Tab** |
| --- | --- | --- | --- |
| **Basic app** | [Build your first message extension app using JavaScript](../sbs-gs-msgext.yml) | [Build your first bot app using JavaScript](../sbs-gs-bot.yml) | • [Build your first tab app using JavaScript](../sbs-gs-javascript.yml) <br> •  [Build your first tab app using C#](../sbs-gs-csharp.yml) <br> • [Build your first tab app with SPFx](../sbs-gs-spfx.yml) |
| **Scenario-based app** | NA | • [Build notification bot with JavaScript](../sbs-gs-notificationbot.yml) <br> • [Build command bot with JavaScript](../sbs-gs-commandbot.yml) <br> • [Create Teams workflow bot](../sbs-gs-workflow-bot.yml) | NA |

## Code samples

Alternatively, you can also use code samples to build apps. Code samples are designed to help you understand and build your own Teams app with different capabilities and scenarios.

| App type | .NET | Node.js |
|---|---|---|
| Message extension | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/nodejs) |
| Tab | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal-quickstart/js) |
| Bot | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-proactive-messaging/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-proactive-messaging-teamsfx) |

To learn more about the code samples, see [Microsoft Teams samples](https://github.com/OfficeDev/Microsoft-Teams-Samples).

## Next step

> [!div class="nextstepaction"]
> [Explore tools and SDKs](explore-tools-and-sdks.md)

## See also

* [Build message extensions](../messaging-extensions/what-are-messaging-extensions.md)
* [Build tabs for Teams](../tabs/what-are-tabs.md)
* [Build bots for Teams](../bots/what-are-bots.md)
* [Git and GitHub resources](/contribute/additional-resources)
