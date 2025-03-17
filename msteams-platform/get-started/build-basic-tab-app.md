---
title: Create Basic Tab App
description: Learn how to build your basic tab app in Microsoft Teams with the help of GitHub codespaces that opens Toolkit extension and step-by-step guides.
ms.localizationpriority: high
ms.date: 12/11/2024
ms.topic: reference
author: (Keep this field unchanged)
---

## Build Your Basic Tab App

Tabs are Teams-aware webpages embedded in Microsoft Teams and a great way to begin developing for Teams. You can add them as part of a channel inside a team, group chat, or personal app for an individual user.

:::image type="content" border="false" source="../assets/images/get-started/get-started-tab.png" alt-text="Screenshot shows you the conceptual tab app in Teams client.":::

In this tutorial, you'll learn about a basic Teams tab app using one of the following methods:

- **GitHub Codespaces**: Experience a Teams app instantly. It opens Visual Studio Code (VS Code), where the Teams Toolkit extension, the app source code, and all dependencies are pre-packaged for you.
- **Step-by-step guide**: Set up your development environment and create a Teams app from scratch.

## [GitHub Codespaces](#tab/teamstoolkitcodespaces)

**Prerequisites:**

- A GitHub account to create your codespace instance.
- A [Microsoft 365 account](https://developer.microsoft.com/microsoft-365/dev-program) with custom app upload permission.
- A [Microsoft 365 tenant](../concepts/build-and-test/prepare-your-o365-tenant.md).

> [!TIP]
> 
> [GitHub Codespaces](https://github.com/features/codespaces) offers a free plan with a fixed amount of usage per month. If more space is needed, visit [github.com/codespaces](https://github.com/codespaces) to delete unnecessary codespaces.

### Steps to Create a Teams Tab App with GitHub Codespaces:

1. **Open GitHub Codespaces:**

    <a href="https://github.com/codespaces/new?hide_repo_select=true&ref=v3&repo=348288141&machine=standardLinux32gb&location=WestUs2&devcontainer_path=.devcontainer%2Fhello-world-tab-codespaces%2Fdevcontainer.json&resume=1" target="_blank"><img src="https://github.com/codespaces/badge.svg" alt="Open hello-world tab in GitHub Codespaces"></a>

    You may be asked to sign in to your GitHub account if not already signed in.

2. **Create New Codespace:**

    - Click **Create new codespace**.

      :::image type="content" source="../assets/images/get-started/codespace.png" alt-text="Screenshot shows the GitHub page to create a codespace for tab.":::

    - The **Setting up your codespace** page will appear.

      :::image type="content" source="../assets/images/get-started/building-codespace.png" alt-text="Screenshot shows the codespace building your tab.":::

    - Teams Toolkit prepares the tab app project for you and opens it in VS Code in the browser.

3. **Sign in to Microsoft 365 and Azure:**

    - Select **Sign in to your Microsoft 365** and **Sign in to Azure**.
 
      :::image type="content" source="../assets/images/get-started/toolkit-in-browser-sign-in.png" alt-text="Screenshot shows you the Teams Toolkit window in browser to sign in."lightbox="../assets/images/get-started/add-tab-in-teams.png":::

    > [!NOTE]
    >
    > GitHub Codespaces opens your app in a new tab within the Teams client. Allow pop-ups in your browser to enable this feature.

4. **Preview the Teams App:**

    - Select **Preview your Teams App (F5)** to build your tab app.

      :::image type="content" source="../assets/images/get-started/toolkit-in-browser.png" alt-text="Screenshot shows you the Teams Toolkit window in browser with your tab app."lightbox="../assets/images/get-started/toolkit-in-browser.png":::

    - Your tab app is built and loaded in the Teams client, opening in a separate browser tab.

5. **Install the Tab App in Teams:**

    - Select **Add** to install your tab app.

      :::image type="content" source="../assets/images/get-started/tab-in-teams.png" alt-text="Screenshot of the app details dialog to install the tab app in Teams.":::

    - Choose the scope for your app from the dialog options.

6. **Open the App in Teams:**

    - Select **Open** to launch it in a personal scope or choose another scope option.

      :::image type="content" source="../assets/images/get-started/tab-in-teams-scope.png" alt-text="Screenshot of the scope selection dialog with options to open the app from the list of suggested scopes.":::

    - The tab app is now successfully created and loaded in the Teams client.

      :::image type="content" source="../assets/images/get-started/tab-app-in-teams.png" alt-text="Screenshot shows your tab app loaded in the Teams client."lightbox="../assets/images/get-started/tab-app-in-teams.png":::

## [Step-by-step Guide](#tab/step-by-step-guide)

For a project start with Teams Toolkit, set up your development environment. Click the following button to start building your basic tab app:

> [!div class="nextstepaction"]
> [Start building a basic tab app](../sbs-gs-javascript.yml)

---

If you are interested in building a bot, choose the following:

> [!div class="nextstepaction"]
> [Start building a bot](build-notification-bot.md)

For building a message extension app, select:

> [!div class="nextstepaction"]
> [Build message extension](build-message-extension.md)