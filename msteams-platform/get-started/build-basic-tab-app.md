---

title: Create Basic Tab App  
description: Learn how to build your basic tab app in Microsoft Teams using GitHub Codespaces, with the Teams Toolkit extension and a step-by-step guide.  
ms.localizationpriority: high  
ms.date: 12/11/2024  
ms.topic: reference  

---

## Build Your Basic Tab App

Tabs are Teams-aware webpages embedded in Microsoft Teams, providing an excellent entry point for Teams development. You can integrate them within a channel inside a team, a group chat, or as a personal app for an individual user.

:::image type="content" border="false" source="../assets/images/get-started/get-started-tab.png" alt-text="Screenshot shows you the conceptual tab app in Teams client.":::

In this tutorial, you'll learn how to create a basic Teams tab app using one of the following methods:

- **GitHub Codespaces**: Experience a Teams app instantly by opening Visual Studio Code (VS Code), where the Teams Toolkit extension, app source code, and all dependencies are pre-packaged.
- **Step-by-step guide**: Set up your development environment and create a Teams app from scratch.

## GitHub Codespaces

Before creating your codespace, ensure you meet the following prerequisites:

- A GitHub account to create your codespace instance.  
- A [Microsoft 365 account](https://developer.microsoft.com/microsoft-365/dev-program) with custom app upload permission.  
- A [Microsoft 365 tenant](../concepts/build-and-test/prepare-your-o365-tenant.md).  

> [!TIP]
> 
> [GitHub Codespaces](https://github.com/features/codespaces) offers a free plan with limited monthly usage. To free up space, visit [github.com/codespaces](https://github.com/codespaces) and delete unused codespaces.

Follow these steps to create a Teams tab app using GitHub Codespaces:

1. Open GitHub Codespaces by selecting the following button:

    <a href="https://github.com/codespaces/new?hide_repo_select=true&ref=v3&repo=348288141&machine=standardLinux32gb&location=WestUs2&devcontainer_path=.devcontainer%2Fhello-world-tab-codespaces%2Fdevcontainer.json&resume=1" target="_blank">
    <img src="https://github.com/codespaces/badge.svg" alt="Open hello-world tab in GitHub Codespaces">
    </a>

   *You may be prompted to sign in to your GitHub account if not already logged in.*

2. Select **Create new codespace**.

   :::image type="content" source="../assets/images/get-started/codespace.png" alt-text="Screenshot shows you the GitHub page to create a codespace for tab.":::

   The **Setting up your codespace** page appears.

   :::image type="content" source="../assets/images/get-started/building-codespace.png" alt-text="Screenshot shows you the codespace building your tab.":::

   Teams Toolkit sets up the tab app project for you, opening it in VS Code within the browser. The Teams Toolkit icon appears in the activity bar of VS Code.

3. Sign in with your Microsoft 365 account by selecting **Sign in to your Microsoft 365** and **Sign in to Azure**.

   :::image type="content" source="../assets/images/get-started/toolkit-in-browser-sign-in.png" alt-text="Screenshot shows you the Teams Toolkit window in browser to sign in." lightbox="../assets/images/get-started/add-tab-in-teams.png":::

   > [!NOTE]
   >
   > When building your app, GitHub Codespaces loads it into the Teams client in a new tab. If your browser blocks pop-ups, allow pop-ups to open your app.

4. Build your tab app by selecting **Preview your Teams App (F5)**.

   :::image type="content" source="../assets/images/get-started/toolkit-in-browser.png" alt-text="Screenshot shows you the Teams Toolkit window in browser with your tab app." lightbox="../assets/images/get-started/toolkit-in-browser.png":::

   GitHub Codespaces builds your tab app, loads it into the Teams client, and opens it in a separate browser tab.

5. Install your tab app in Teams by selecting **Add**.

   :::image type="content" source="../assets/images/get-started/tab-in-teams.png" alt-text="Screenshot of the app details dialog to install the tab app in Teams.":::

   After adding the tab app, a dialog appears allowing you to choose the app's scope.

6. Open your app in personal scope by selecting **Open**.

   *Alternatively, search and select the desired scope or choose a channel or chat from the list, then proceed by clicking **Go**.*

   :::image type="content" source="../assets/images/get-started/tab-in-teams-scope.png" alt-text="Screenshot of the scope selection dialog with the options to open the app from the list of suggested scopes.":::

   You have successfully created and loaded your tab app within the Teams client.

   :::image type="content" source="../assets/images/get-started/tab-app-in-teams.png" alt-text="Screenshot shows your tab app loaded in the Teams client." lightbox="../assets/images/get-started/tab-app-in-teams.png":::

## Step-by-Step Guide

For those interested in starting a project with Teams Toolkit from the ground up, set up your development environment by selecting the following button:

> [!div class="nextstepaction"]
> [Start building a basic tab app](../sbs-gs-javascript.yml)

---

For those interested in building a bot, select the following option:

> [!div class="nextstepaction"]
> [Start building a bot](build-notification-bot.md)

For building a message extension app, select this option:

> [!div class="nextstepaction"]
> [Build message extension](build-message-extension.md)