---
title: Build your first app
description: Build your first Teams message extension, tab, or bot app with GitHub Codespaces or following the step-by-step guides.
ms.localizationpriority: high
ms.date: 03/13/2024
ms.topic: reference
---

# Build your first Teams app

Build your first Teams message extension, tab, or bot app with GitHub Codespaces or following the step-by-step guides.

# [Message Extension](#tab/msgext)

A message extension allows the users to interact with your web service through buttons and forms in Teams. They can search or initiate actions in an external system from the compose message area, the command box, or directly from a message. You can send back the results of that interaction to Teams in the form of a richly formatted card.

:::image type="content" border="false" source="../assets/images/get-started/get-started-me.png" alt-text="Screenshot shows the conceptual message extension in Teams client.":::

In this tutorial, you learn to build a search-based message extension app that allows users to search Node Package Manager (npm) packages from the npm directory.

## GitHub Codespaces

Before you create your codespace, ensure that you have the following prerequisites:

* A GitHub account to create your codespace instance
* A [Microsoft 365 account](https://developer.microsoft.com/microsoft-365/dev-program) with custom app upload permission
* A [Microsoft 365 developer tenant](../concepts/build-and-test/prepare-your-o365-tenant.md)

> [!TIP]
> [GitHub Codespaces](https://github.com/features/codespaces) offers a free plan with a fixed amount of usage per month. If you reach the maximum number of allowed codespaces, go to [github.com/codespaces](https://github.com/codespaces) and delete codespaces that you don't need.

To create a search-based message extension app with GitHub Codespaces, follow these steps:

1. Select the following button to open GitHub Codespaces.

    <a href="https://github.com/codespaces/new?hide_repo_select=true&ref=v3&repo=348288141&machine=basicLinux32gb&location=WestUs2&devcontainer_path=.devcontainer%2Fnpm-search-message-extension-codespaces%2Fdevcontainer.json&resume=1" target="_blank"><img src="https://github.com/codespaces/badge.svg" alt="Open message extension in GitHub Codespaces"></a>

   You might be asked to sign in to your GitHub account if you haven't already.

2. Select **Create new codespace**.

   :::image type="content" source="../assets/images/get-started/codespace.png" alt-text="Screenshot shows the GitHub page to create a codespace for message extension.":::

   The **Setting up your codespace** page appears.

   :::image type="content" source="../assets/images/get-started/building-codespace.png" alt-text="Screenshot shows the codespace building your message extension.":::

   Teams Toolkit prepares the message extension for you and opens it in Visual Studio Code in the browser. The Teams Toolkit icon appears in the activity bar.

3. Select **Sign in to your Microsoft 365** and **Sign in to Azure** to sign in with your Microsoft 365 account.

   :::image type="content" source="../assets/images/get-started/codespace/me-sign-in.png" alt-text="Screenshot shows the Teams Toolkit window in browser to sign in."lightbox="../assets/images/get-started/codespace/me-sign-in.png":::

    > [!NOTE]
    >
    > When you build your app, GitHub Codespaces loads it in a new tab. If your browser blocks pop-up tabs or windows, you'll need to allow pop-ups for your app to open.

4. Select **Preview your Teams App (F5)** to build your message extension.

      :::image type="content" source="../assets/images/get-started/codespace/me-preview-teams.png" alt-text="Screenshot shows the Teams Toolkit window in browser with your message extension."lightbox="../assets/images/get-started/codespace/me-preview-teams.png":::

      GitHub Codespaces builds your message extension app and opens it in a new browser tab.

   Your message extension app is uploaded to Teams.

5. Once the app dialog appears in Teams, select **Add** to install your message extension in Teams.

   :::image type="content" source="../assets/images/get-started/codespace/me-in-teams.png" alt-text="Screenshot shows the message extension loaded in the Teams client.":::

   You successfully created the search-based message extension and loaded in the Teams client.

   :::image type="content" source="../assets/images/get-started/codespace/me-teams-chat.png" alt-text="Screenshot shows your message extension loaded in the Teams client.":::

## Step-by-step guide

If you want to learn how to start a project with Teams Toolkit from the beginning, you need to set up your development environment. Select the following button to start building your message extension app.

> [!div class="nextstepaction"]
> [Build your first message extension app using JavaScript](../sbs-gs-msgext.yml)

For more information on message extensions, see [message extensions](../messaging-extensions/what-are-messaging-extensions.md).

# [Tab](#tab/tab)

Tabs are Teams-aware webpages embedded in Microsoft Teams. You can add them as part of a channel inside a team, group chat, or personal app for an individual user.

:::image type="content" border="false" source="../assets/images/get-started/get-started-tab.png" alt-text="Diagram shows a conceptual tab app in Teams client.":::

## GitHub Codespaces

Before you create your codespace, ensure that you have the following prerequisites:

* A GitHub account to create your codespace instance
* A [Microsoft 365 account](https://developer.microsoft.com/microsoft-365/dev-program) with custom app upload enabled
* A [Microsoft 365 developer tenant](../concepts/build-and-test/prepare-your-o365-tenant.md)

> [!TIP]
>
> [GitHub Codespaces](https://github.com/features/codespaces) offers a free plan with a fixed amount of usage per month. If you need to free up more space, go to [github.com/codespaces](https://github.com/codespaces) and delete codespaces that you don't need.

To create a Teams tab app with GitHub Codespaces, follow these steps:

1. Select the following button to open GitHub Codespaces.

    <a href="https://github.com/codespaces/new?hide_repo_select=true&ref=v3&repo=348288141&machine=standardLinux32gb&location=WestUs2&devcontainer_path=.devcontainer%2Fhello-world-tab-codespaces%2Fdevcontainer.json&resume=1" target="_blank"><img src="https://github.com/codespaces/badge.svg" alt="Open hello-world tab in GitHub Codespaces"></a>

   You might be asked to sign in to GitHub account if you haven't already.

1. Select **Create new codespace**.

   :::image type="content" source="../assets/images/get-started/codespace.png" alt-text="Screenshot shows the GitHub page to create a codespace for tab.":::

   The **Setting up your codespace** page appears.

   :::image type="content" source="../assets/images/get-started/building-codespace.png" alt-text="Screenshot shows the codespace building your tab.":::

   Teams Toolkit prepares the tab app project for you and opens it in Visual Studio Code in the browser. The Teams Toolkit icon appears in the activity bar.

1. Select **Sign in to your Microsoft 365** and **Sign in to Azure** to sign in with your Microsoft 365 account.

   :::image type="content" source="../assets/images/get-started/toolkit-in-browser-sign-in.png" alt-text="Screenshot shows the Teams Toolkit window in browser to sign in."lightbox="../assets/images/get-started/toolkit-in-browser-sign-in.png":::

    > [!NOTE]
    >
    > When you build your app, GitHub Codespaces loads it in a new tab. If your browser blocks pop-up tabs or windows, you'll need to allow pop-ups for your app to open.

1. In the panel, select **PORTS**. Right-click on the active port and select **Port Visibility** > **Public** in the drop down.

   :::image type="content" source="../assets/images/get-started/tab-in-teams.png" alt-text="Screenshot shows how to make port publicly accessible.":::

1. Select **Preview your Teams App (F5)**.

      :::image type="content" source="../assets/images/get-started/toolkit-in-browser.png" alt-text="Screenshot shows the Teams Toolkit window in browser with your tab app."lightbox="../assets/images/get-started/toolkit-in-browser.png":::

   GitHub Codespaces builds your tab app and opens it in a new browser tab.

   :::image type="content" source="../assets/images/get-started/tab-app-in-teams.png" alt-text="Screenshot shows your tab app loaded in the Teams client."lightbox="../assets/images/get-started/tab-app-in-teams.png":::

## Step-by-step guide

If you want to learn how to start a project with Teams Toolkit from the beginning, you need to set up your development environment. Select the following button to start building your basic tab app.

> [!div class="nextstepaction"]
> [Start building a basic tab app](../sbs-gs-javascript.yml)

# [Bot](#tab/bot)

The notification bot proactively sends messages in a Teams channel, group chat, or personal chat. You can trigger the notification bot with an HTTP request, such as cards or texts.

:::image type="content" border="false" source="../assets/images/get-started/get-started-bot.png" alt-text="Screenshot shows the conceptual notification bot in Teams client":::

In this tutorial, you learn about a notification bot app in one of the following ways.

* **GitHub Codespaces**: The codespace instance allows you to experience a Teams app instantaneously. It opens Visual Studio Code where the Teams Toolkit extension, the app source code, and all the dependencies are prepackaged for you.
* **Step-by-step guide**: Allows you to set up your development environment and build a Teams app from the start.

## GitHub Codespaces

Before you create your codespace, ensure that you have the following prerequisites:

* A GitHub account to create your codespace instance
* A [Microsoft 365 account](https://developer.microsoft.com/microsoft-365/dev-program) with custom app upload permission
* A [Microsoft 365 tenant](../concepts/build-and-test/prepare-your-o365-tenant.md)

> [!TIP]
>
> [GitHub Codespaces](https://github.com/features/codespaces) offers a free plan with a fixed amount of usage per month. If you need to free up more space, go to [github.com/codespaces](https://github.com/codespaces) and delete the codespace that you no longer need.

To create a Teams notification bot with GitHub Codespaces, follow these steps:

1. Select the following button to open GitHub Codespaces.

   <a href="https://github.com/codespaces/new?hide_repo_select=true&ref=v3&repo=348288141&machine=basicLinux32gb&location=WestUs2&devcontainer_path=.devcontainer%2Fnotification-codespaces%2Fdevcontainer.json&resume=1" target="_blank"><img src="https://github.com/codespaces/badge.svg" alt="Open hello-world tab in GitHub Codespaces"></a>

   You might be asked to sign in to your GitHub account if you haven't already.

1. Select **Create new codespace**.

   :::image type="content" source="../assets/images/get-started/codespace.png" alt-text="Screenshot shows the GitHub page to create a codespace for bot.":::

   The **Setting up your codespace** page appears.

   :::image type="content" source="../assets/images/get-started/building-codespace.png" alt-text="Screenshot shows the codespace building your notification bot.":::

   Teams Toolkit prepares the notification bot project for you and opens it in Visual Studio Code in the browser. The Teams Toolkit icon appears in the activity bar.

1. Select **Sign in to your Microsoft 365** and **Sign in to Azure** to sign in with your Microsoft 365 account.

   :::image type="content" source="../assets/images/get-started/toolkit-in-browser-sign-in.png" alt-text="Screenshot shows the Teams Toolkit window in browser to sign in."lightbox="../assets/images/get-started/toolkit-in-browser-sign-in.png":::

    > [!NOTE]
    >
    > When you build your app, GitHub Codespaces loads it in a new tab. If your browser blocks pop-up tabs or windows, you'll need to allow pop-ups for your app to open.

2. Select **Preview your Teams App (F5)** to build your notification bot.

      :::image type="content" source="../assets/images/get-started/toolkit-in-browser.png" alt-text="Screenshot shows the Teams Toolkit window in browser with your notification bot."lightbox="../assets/images/get-started/toolkit-in-browser.png":::

   GitHub Codespaces builds your notification bot app, loads it to Teams client, and opens it in a separate browser tab.

3. Once the app dialog appears, select **Add** to install your notification bot in Teams.

   :::image type="content" source="../assets/images/get-started/codespace/bot-teams.png" alt-text="Screenshot shows the notification bot loaded in the Teams client.":::

4. Open a new terminal in your codespace and run the following command to trigger an event for sending a notification to your bot:

   ```bash
   curl -X POST http://localhost:3978/api/notification
   ```

   > [!TIP]
   >
   > In real time, events are triggered by an external source, such as a third-party API that cause the notification bot to send the user a notification. To emulate an event trigger, you can send an event manually via curl commands on terminal.

   The notification bot app sends a notification as an Adaptive Card to your Teams client:

   :::image type="content" source="../assets/images/get-started/codespace/notification-bot.png" alt-text="Screenshot shows your notification bot loaded in the Teams client.":::

   You successfully created the notification bot and loaded it in the Teams client.

## Step-by-step guide

If you want to learn how to start a project with Teams Toolkit from the beginning, you'll need to set up your development environment. Select the following button to start building your notification bot.

> [!div class="nextstepaction"]
> [Start building a notification bot](../sbs-gs-notificationbot.yml)

---

## Next step

> [!div class="nextstepaction"]
> [Choose what suits you](choose-what-suits-you.md)

## See also
* [Build message extensions](../messaging-extensions/what-are-messaging-extensions.md)
* [Build tabs for Teams](../tabs/what-are-tabs.md)
* [Build bots for Teams](../bots/what-are-bots.md)