---
title: Build your first app
description: Build your first Teams message extension, tab, or bot app with Github Codespaces or following the step-by-step guides.
ms.localizationpriority: high
ms.date: 03/25/2024
ms.topic: reference
---

# Build your first Teams app

Build your first Teams message extension, tab, or bot app with Github Codespaces or following the step-by-step guides.

# [Message Extension](#tab/msgext)

A message extension allows the users to interact with your web service through buttons and forms in Teams. They can search or initiate actions in an external system from the compose message area, the command box, or directly from a message. You can send back the results of that interaction to Teams in the form of a richly formatted card.

:::image type="content" border="false" source="../assets/images/get-started/get-started-me.png" alt-text="Screenshot shows you the conceptual message extension in Teams client.":::

In this tutorial, you'll learn to build a search-based message extension app, and the app allows users to search Node Package Manager (npm) packages from the npm directory.

Create a search based message extension app in one of the following ways:

# [GitHub Codespaces](#tab/codespaces1)

Before you create your codespace, ensure that you have the following prerequisites:

* A GitHub account to create your codespace instance
* A [Microsoft 365 account](https://developer.microsoft.com/microsoft-365/dev-program) with custom app upload permission
* A [Microsoft 365 developer tenant](../concepts/build-and-test/prepare-your-o365-tenant.md)

> [!TIP]
> [GitHub Codespaces](https://github.com/features/codespaces) offers a free plan with a fixed amount of usage per month. If you reach the maximum number of allowed codespaces, go to [github.com/codespaces](https://github.com/codespaces) and delete the codespaces that you no longer need.

To create a search-based message extension app with GitHub Codespaces, follow these steps:

1. Select the following button to open GitHub Codespaces.

    <a href="https://github.com/codespaces/new?hide_repo_select=true&ref=v3&repo=348288141&machine=basicLinux32gb&location=WestUs2&devcontainer_path=.devcontainer%2Fnpm-search-message-extension-codespaces%2Fdevcontainer.json&resume=1" target="_blank"><img src="https://github.com/codespaces/badge.svg" alt="Open message extension in GitHub Codespaces"></a>

   You might be asked to sign in to GitHub account if you haven't already.

2. Select **Create new codespace**.

   :::image type="content" source="../assets/images/get-started/codespace.png" alt-text="Screenshot shows you the GitHub page to create a codespace for message extension.":::

   The **Setting up your codespace** page appears.

   :::image type="content" source="../assets/images/get-started/building-codespace.png" alt-text="Screenshot shows you the codespace building your message extension.":::

   Teams Toolkit prepares the message extension for you and opens it in VS Code in the browser. The Teams Toolkit icon appears in the activity bar of VS Code.

3. Select **Sign in to your Microsoft 365** and **Sign in to Azure** to sign in with your Microsoft 365 account.

   :::image type="content" source="../assets/images/get-started/codespace/me-sign-in.png" alt-text="Screenshot shows you the Teams Toolkit window in browser to sign in."lightbox="../assets/images/get-started/add-tab-in-teams.png":::

    > [!NOTE]
    >
    > When you build your app, GitHub Codespaces loads it to the Teams client in a new tab. If your browser blocks pop-up tabs or windows, you'll need to allow pop-ups for your app to open.

4. Select **Preview your Teams App (F5)** to build your message extension.

      :::image type="content" source="../assets/images/get-started/codespace/me-preview-teams.png" alt-text="Screenshot shows you the Teams Toolkit window in browser with your message extension."lightbox="../assets/images/get-started/codespace/me-preview-teams.png":::

      GitHub Codespaces builds your message extension app, loads it to Teams client, and opens in a separate browser tab.

   Your message extension app is uploaded to Teams.

5. Once the app dialog appears in Teams, select **Add** to install your message extension in Teams.

   :::image type="content" source="../assets/images/get-started/codespace/me-in-teams.png" alt-text="Screenshot shows you the message extension loaded in the Teams client.":::

   You've successfully created the search-based message extension and loaded in the Teams client.

   :::image type="content" source="../assets/images/get-started/codespace/me-teams-chat.png" alt-text="Screenshot shows your message extension loaded in the Teams client.":::

# [Step-by-step guide](#tab/sbsguide1)

If you want to learn how to start a project with Teams Toolkit from the beginning, you'll need to set up your development environment. Select the following button to start building your message extension app.

> [!div class="nextstepaction"]
> [Build your first message extension app using JavaScript](../sbs-gs-msgext.yml)

---

For more information on message extensions, see [message extensions](../messaging-extensions/what-are-messaging-extensions.md).

---
