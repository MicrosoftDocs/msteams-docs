---
title: Build message extension
description: In this module, learn how to build your first message extension for your Teams app.
ms.localizationpriority: medium
ms.topic: reference
---

# Build message extension

Message extensions allow the users to interact with your web service through buttons and forms in the Microsoft Teams client. They can search or initiate actions in an external system from the compose message area, the command box, or directly from a message. You can send back the results of that interaction to the Teams client in the form of a richly formatted card.

:::image type="content" border="false" source="../assets/images/get-started/get-started-me.png" alt-text="Illustration showing a conceptual message extension":::

In this tutorial, get familiarize with a basic Teams tab app in one of the following ways:

* **Teams Toolkit codespaces**: The codespace instance allows you to experience a Teams app almost instantaneously. It opens Visual Studio Code, where Teams Toolkit extension, the app source code, and all dependencies are pre-packaged for you.
* **Step-by-step guide**

# [Teams Toolkit codespaces](#tab/teamstoolkitcodespaces)

Before you create your codespace, ensure that you have:

* A GitHub account to create your codespace instance
* A [Microsoft 365 account](https://developer.microsoft.com/microsoft-365/dev-program) with sideloading permission
* A [Microsoft 365 tenant](../concepts/build-and-test/prepare-your-o365-tenant.md)

> [!TIP]
> [GitHub codespaces](https://github.com/features/codespaces) offers the free plan up to a fixed amount of usage every month. If you need to free up the space, go to [github.com/codespaces](https://github.com/codespaces) and delete the codespaces that you no longer need.

To use codespaces for creating a search based message extension:

<a href="https://github.com/codespaces/new?hide_repo_select=true&ref=dev&repo=348288141&machine=basicLinux32gb&location=WestUs2&devcontainer_path=.devcontainer%2Fnpm-search-message-extension-codespaces%2Fdevcontainer.json" target="_blank"><img src="https://github.com/codespaces/badge.svg" alt="Open message extension in GitHub Codespaces"></a>

1. Select the button above to open codespaces. You may be asked to sign in to GitHub account if you haven't.
1. Select **Create codespaces**.

   :::image type="content" source="../assets/images/get-started/codespace/me-codespace.png" alt-text="Screenshot shows you the GitHub page to create a codespace for message extension.":::

   The **Setting up your codespace** page appears.

   :::image type="content" source="../assets/images/get-started/building-codespace.png" alt-text="Screenshot shows you the codespace building your message extension.":::

   Teams Toolkit prepares the message extension for you and opens it in Visual Studio Code in the browser. Teams Toolkit icon appears in the activity bar of Visual Studio Code.

1. Select **Sign in to your Microsoft 365** and **Sign in to Azure** to sign in with your Microsoft 365 account.

   :::image type="content" source="../assets/images/get-started/codespace/me-sign-in.png" alt-text="Screenshot shows you the Teams Toolkit window in browser to sign in."lightbox="../assets/images/get-started/add-tab-in-teams.png":::

    > [!NOTE]
    >
    > Your browser may block a pop-up to prevent to open a new browser tab or window. You need to allow pop-ups so that the codespace can sideload the app to Teams client in another tab.

1. Select **Preview your Teams App (F5)** to build your message extension.

      :::image type="content" source="../assets/images/get-started/codespace/me-preview-teams.png" alt-text="Screenshot shows you the Teams Toolkit window in browser with your message extension.":::

   Teams Toolkit codespaces builds the app. A dialog appears to prompt you to open the app in a browser.

   Your message extension is sideloaded to Teams.

1. Once the app dialog appears in Teams, select **Add** to install your message extension in Teams.

   :::image type="content" source="../assets/images/get-started/codespace/me-in-teams.png" alt-text="Screenshot shows you the message extension loaded in the Teams client.":::

   You've successfully created the message extension and loaded in the Teams client.

   :::image type="content" source="../assets/images/get-started/codespace/me-teams-chat.png" alt-text="Screenshot shows your message extension loaded in the Teams client.":::

If you want to build by yourself, or want to create a message extension that can be installed on Outlook and Microsoft 365, follow the step-by-step guide at the next section!

# [Step-by-step guide](#tab/step-by-stepguide)

If you would like to learn how to start a project with Teams Toolkit from scratch, let's go through the step-by-step guide together.

Unlike codespaces, where everything you need is packaged for you already, you'll need to set you your development environment. Let's start building your first message extension app.

> [!div class="nextstepaction"]
> [Build your first message extension app using JavaScript](../sbs-gs-msgext.yml)
