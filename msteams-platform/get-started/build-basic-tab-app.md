---
title: Build your basic tab app
description: Build your basic tab app
ms.localizationpriority: high
ms.date: 06/07/2023
ms.topic: reference
---

# Build your basic tab app

Tabs are Teams-aware webpages embedded in Microsoft Teams and a good way to begin developing for Teams. You can add them as part of a channel inside a team, group chat, or personal app for an individual user.

:::image type="content" border="false" source="../assets/images/get-started/get-started-tab.png" alt-text="Screenshot shows you the conceptual tab app in Teams client.":::

In this tutorial, you'll learn about a basic Teams tab app in one of the following ways:

* **GitHub Codespaces**: The codespace instance allows you to experience a Teams app instantaneously. It opens Visual Studio Code (VS Code), where the Teams Toolkit extension, the app source code, and all the dependencies are pre-packaged for you.
* **Step-by-step guide**: Allows you to create a Teams app from scratch with all development environment setup.

# [GitHub Codespaces](#tab/teamstoolkitcodespaces)

Before you create your codespace, ensure that you have the following prerequisites.

* A GitHub account to create your codespace instance
* A [Microsoft 365 account](https://developer.microsoft.com/microsoft-365/dev-program) with sideloading permission
* A [Microsoft 365 tenant](../concepts/build-and-test/prepare-your-o365-tenant.md)

> [!TIP]
> 
> [GitHub Codespaces](https://github.com/features/codespaces) offers a free plan with a fixed amount of usage per month. If you need to free up more space, go to [github.com/codespaces](https://github.com/codespaces) and delete the codespace that you no longer need.

To create a Teams tab app with GitHub Codespaces, follow the steps.

1. To open GitHub Codespaces, select the following button.

    <a href="https://github.com/codespaces/new?hide_repo_select=true&ref=v3&repo=348288141&machine=standardLinux32gb&location=WestUs2&devcontainer_path=.devcontainer%2Fhello-world-tab-codespaces%2Fdevcontainer.json&resume=1" target="_blank"><img src="https://github.com/codespaces/badge.svg" alt="Open hello-world tab in GitHub Codespaces"></a>

   You might be asked to sign in to GitHub account if you haven't already.

1. Select **Create new codespace**.

   :::image type="content" source="../assets/images/get-started/codespace.png" alt-text="Screenshot shows you the GitHub page to create a codespace for tab."lightbox="../assets/images/get-started/codespace.png":::

   The **Setting up your codespace** page appears.

   :::image type="content" source="../assets/images/get-started/building-codespace.png" alt-text="Screenshot shows you the codespace building your tab."lightbox="../assets/images/get-started/building-codespace.png":::

   Teams Toolkit prepares the tab app project for you and opens it in VS Code in the browser. The Teams Toolkit icon appears in the activity bar of VS Code.

1. Select **Sign in to your Microsoft 365** and **Sign in to Azure** to sign in with your Microsoft 365 account.

   :::image type="content" source="../assets/images/get-started/toolkit-in-browser-sign-in.png" alt-text="Screenshot shows you the Teams Toolkit window in browser to sign in."lightbox="../assets/images/get-started/add-tab-in-teams.png":::

    > [!NOTE]
    >
    > When you build your app, GitHub Codespaces loads it to Teams client in a new tab. If your browser blocks pop-up tabs or windows, you'll need to allow pop-ups to let your app open.

1. Select **Preview your Teams App (F5)** to build your tab app.

      :::image type="content" source="../assets/images/get-started/toolkit-in-browser.png" alt-text="Screenshot shows you the Teams Toolkit window in browser with your tab app."lightbox="../assets/images/get-started/toolkit-in-browser.png":::

   GitHub Codespaces builds your tab app, loads it to Teams client, and opens it in a separate browser tab.

1. When the app dialog appears, select **Add** to install your tab app in Teams.

   :::image type="content" source="../assets/images/get-started/tab-in-teams.png" alt-text="Screenshot shows you the tab app loaded in the Teams client.":::

   The tab app is installed in the Teams client and opens.

   You've successfully created the tab app and loaded in the Teams client.

   :::image type="content" source="../assets/images/get-started/tab-app-in-teams.png" alt-text="Screenshot shows your tab app loaded in the Teams client."lightbox="../assets/images/get-started/tab-app-in-teams.png":::

# [Step-by-step guide](#tab/step-by-step-guide)

If you would want to learn how to start a project with Teams Toolkit from scratch, go through the step-by-step guide.

Unlike GitHub Codespaces, you need to set up your development environment.

> [!div class="nextstepaction"]
> [Start building a basic tab app](../sbs-gs-javascript.yml)

---

If a bot is what you're interested in, go to:

> [!div class="nextstepaction"]
> [Start building a bot](build-notification-bot.md)

If you want to build a message extension app, go to:

> [!div class="nextstepaction"]
> [Build message extension](build-message-extension.md)
