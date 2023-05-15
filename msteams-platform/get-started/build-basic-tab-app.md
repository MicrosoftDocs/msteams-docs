---
title: Build your basic tab app
description: Build your basic tab app
ms.localizationpriority: high
ms.topic: reference
---
# Build your basic tab app

Start Microsoft Teams app development with your first Teams tab app.

:::image type="content" border="false" source="../assets/images/get-started/get-started-tab.png" alt-text="Illustration showing a conceptual tab app":::

In this tutorial, get familiarized with a basic Teams tab app in one of the following ways:

* **Teams Toolkit codespaces**: The codespace instance allows you to experience a Teams app almost instantaneously. It opens Visual Studio Code, where the Teams Toolkit extension, the app source code, and all dependencies are pre-packaged for you.
* **Step-by-step guide**: Allows you to create a Teams app from scratch with all development environment setup.

# [Teams Toolkit codespaces](#tab/teamstoolkitcodespaces)

Before you create your codespace, ensure that you have:

* A GitHub account to create your codespace instance.
* A [Microsoft 365 account](https://developer.microsoft.com/microsoft-365/dev-program) with sideloading permission.
* A [Microsoft 365 tenant](../concepts/build-and-test/prepare-your-o365-tenant.md)

> [!TIP]
> [GitHub codespaces](https://github.com/features/codespaces) offers the free plan up to a fixed amount of usage every month. If you need to free up the space, go to [github.com/codespaces](https://github.com/codespaces) and delete the codespaces that you no longer need.

To create a Teams tab app with codespaces, follow the steps:

1. Select the following button to open codespaces.

    <a href="https://github.com/codespaces/new?hide_repo_select=true&amp;ref=dol%2Fcodespaces&amp;repo=348288141&amp;machine=standardLinux32gb&amp;devcontainer_path=.devcontainer%2Fhello-world-tab-codespaces%2Fdevcontainer.json&amp;location=WestUs2" target="_blank"><img src="https://github.com/codespaces/badge.svg" alt="Open hello-world tab in GitHub Codespaces"></a>

   You may be asked to sign in to GitHub account if you haven't.

1. Select **Create codespaces**.

   :::image type="content" source="../assets/images/get-started/codespace.png" alt-text="Screenshot shows you the GitHub page to create a codespace for tab."lightbox="../assets/images/get-started/codespace.png":::

   The **Setting up your codespace** page appears.

   :::image type="content" source="../assets/images/get-started/building-codespace.png" alt-text="Screenshot shows you the codespace building your tab.":::

   Teams Toolkit prepares the tab app project for you and opens it in Visual Studio Code in the browser. Teams Toolkit icon appears in the activity bar of Visual Studio Code.

1. Select **Sign in to your Microsoft 365** and **Sign in to Azure** to sign in with your Microsoft 365 account.

   :::image type="content" source="../assets/images/get-started/toolkit-in-browser-sign-in.png" alt-text="Screenshot shows you the Teams Toolkit window in browser to sign in."lightbox="../assets/images/get-started/add-tab-in-teams.png":::

    > [!NOTE]
    >
    > When you build your app, codespace loads it to Teams client in a new tab. If your browser blocks pop-up tabs or windows, you'll need to allow pop-ups to let codespace open your app.

1. Select **Preview your Teams App (F5)** to build your tab app.

      :::image type="content" source="../assets/images/get-started/toolkit-in-browser.png" alt-text="Screenshot shows you the Teams Toolkit window in browser with your tab app."lightbox="../assets/images/get-started/toolkit-in-browser.png":::

   Teams Toolkit codespaces builds your tab app, loads it to Teams client, and opens in the another browser tab or window.

1. When the app dialog appears, select **Add** to install your tab app in Teams.

   :::image type="content" source="../assets/images/get-started/tab-in-teams.png" alt-text="Screenshot shows you the tab app loaded in the Teams client.":::

   The Tab app is installed in the Teams client and opens.

   You've successfully created the tab app and loaded in the Teams client.

   :::image type="content" source="../assets/images/get-started/tab-app-in-teams.png" alt-text="Screenshot shows your tab app loaded in the Teams client."lightbox="../assets/images/get-started/tab-app-in-teams.png":::

# [Step-by-step guide](#tab/step-by-step-guide)

If you would like to learn how to start a project with Teams Toolkit from scratch, let's go through the step-by-step guide.

Unlike codespaces, you need to set up your development environment. Let's start building your basic tab app.

> [!div class="nextstepaction"]
> [Start building a basic tab app](../sbs-gs-javascript.yml)

---

If a bot is what you are interested in, go to:

> [!div class="nextstepaction"]
> [Start building a bot](build-notification-bot.md)

If you want to build message extension app, go to:

> [!div class="nextstepaction"]
> [Build message extension](build-message-extension.md)
