---
title: Build message extension
description: In this module, learn how to build your first message extension for your Teams app.
ms.localizationpriority: medium
ms.topic: reference
---

# Build message extension

A message extension allows the users to interact with your web service through buttons and forms in the Microsoft Teams client. They can search or initiate actions in an external system from the compose message area, the command box, or directly from a message. You can send back the results of that interaction to the Teams client in the form of a richly formatted card.

:::image type="content" border="false" source="../assets/images/get-started/get-started-me.png" alt-text="Screenshot shows you the conceptual message extension in Teams client.":::

In this tutorial, you'll learn to build a search based message extension app, this app allows the users to search npm packages from the Node Package Manager (npm) directory.

Get familiarized with search based message extension app in one of the following ways:

* **GitHub Codespaces**: The codespace instance allows you to experience a Teams app almost instantaneously. It opens Visual Studio Code, where the Teams Toolkit extension, the app source code, and all dependencies are pre-packaged for you.
* **Step-by-step guide**: Allows you to create a Teams app from scratch with all development environment setup.

# [GitHub Codespaces](#tab/teamstoolkitcodespaces)

Before you create your codespace, ensure that you have:

* A GitHub account to create your codespace instance.
* A [Microsoft 365 account](https://developer.microsoft.com/microsoft-365/dev-program) with sideloading permission.
* A [Microsoft 365 tenant](../concepts/build-and-test/prepare-your-o365-tenant.md)

> [!TIP]
> [GitHub Codespaces](https://github.com/features/codespaces) offers the free plan up to a fixed amount of usage every month. If you need to free up the space, go to [github.com/codespaces](https://github.com/codespaces) and delete the codespaces that you no longer need.

To use codespace for creating a search based message extension:

1. Select the following button to open codespace.

    <a href="https://github.com/codespaces/new?hide_repo_select=true&ref=v3&repo=348288141&machine=basicLinux32gb&location=WestUs2&devcontainer_path=.devcontainer%2Fnpm-search-message-extension-codespaces%2Fdevcontainer.json&resume=1" target="_blank"><img src="https://github.com/codespaces/badge.svg" alt="Open message extension in GitHub Codespaces"></a>

   You may be asked to sign in to GitHub account if you haven't.

1. Select **Create codespaces**.

   :::image type="content" source="../assets/images/get-started/codespace.png" alt-text="Screenshot shows you the GitHub page to create a codespace for message extension."lightbox="../assets/images/get-started/codespace.png":::

   The **Setting up your codespace** page appears.

   :::image type="content" source="../assets/images/get-started/building-codespace.png" alt-text="Screenshot shows you the codespace building your message extension.":::

   Teams Toolkit prepares the message extension for you and opens it in Visual Studio Code in the browser. Teams Toolkit icon appears in the activity bar of Visual Studio Code.

1. Select **Sign in to your Microsoft 365** and **Sign in to Azure** to sign in with your Microsoft 365 account.

   :::image type="content" source="../assets/images/get-started/codespace/me-sign-in.png" alt-text="Screenshot shows you the Teams Toolkit window in browser to sign in."lightbox="../assets/images/get-started/add-tab-in-teams.png":::

    > [!NOTE]
    >
    > When you build your app, codespace loads it to Teams client in a new tab. If your browser blocks pop-up tabs or windows, you'll need to allow pop-ups to let codespace open your app.

1. Select **Preview your Teams App (F5)** to build your message extension.

      :::image type="content" source="../assets/images/get-started/codespace/me-preview-teams.png" alt-text="Screenshot shows you the Teams Toolkit window in browser with your message extension."lightbox="../assets/images/get-started/codespace/me-preview-teams.png":::

      GitHub Codespaces builds your message extension app, loads it to Teams client, and opens in the another browser tab or window.

   Your message extension app is sideloaded to Teams.

1. Once the app dialog appears in Teams, select **Add** to install your message extension in Teams.

   :::image type="content" source="../assets/images/get-started/codespace/me-in-teams.png" alt-text="Screenshot shows you the message extension loaded in the Teams client.":::

   You've successfully created the search based message extension and loaded in the Teams client.

   :::image type="content" source="../assets/images/get-started/codespace/me-teams-chat.png" alt-text="Screenshot shows your message extension loaded in the Teams client.":::

# [Step-by-step guide](#tab/step-by-step-guide)

If you would like to learn how to start a project with Teams Toolkit from scratch, let's go through the step-by-step guide.

Unlike codespace, you need to set up your development environment. Let's start building your message extension app.

> [!div class="nextstepaction"]
> [Build your first message extension app using JavaScript](../sbs-gs-msgext.yml)

---

If a bot is what you are interested in, go to:

> [!div class="nextstepaction"]
> [Start building a bot](build-notification-bot.md)

If you want to build basic tab app, go to:

> [!div class="nextstepaction"]
> [Build your basic tab app](build-basic-tab-app.md)

## Next step

> [!div class="nextstepaction"]
> [Choose what suits you](choose-what-suits-you.md)

## See also

[npm directory](https://www.npmjs.com/)
