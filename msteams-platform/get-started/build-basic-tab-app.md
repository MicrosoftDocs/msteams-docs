---
title: Create Basic Tab App
description: Learn how to build your basic tab app in Microsoft Teams with the help of GitHub Codespaces that opens Toolkit extension and step-by-step guides.
ms.localizationpriority: high
ms.date: 12/11/2024
ms.topic: reference
---

# Build your basic tab app

Tabs are Teams-aware webpages embedded within Microsoft Teams. They offer a seamless way to integrate content and functionality into Microsoft Teams. You can add tabs as part of a channel inside a team, group chat, or even deploy them as personal apps for individual users.

:::image type="content" border="false" source="../assets/images/get-started/get-started-tab.png" alt-text="Screenshot shows you the conceptual tab app in Teams client.":::

In this tutorial, you'll learn about a basic Teams tab app using one of the following approaches:

* **GitHub Codespaces**: This approach leverages a pre-configured codespace instance, which gives you immediate access to a complete development environment. It launches Visual Studio Code (VS Code) in your browser with the Teams Toolkit extension, the app source code, and all the necessary dependencies already set up.
* **Step-by-step guide**: This method walks you through setting up your local development environment from scratch and building a Teams app from the ground up.

---

# [GitHub Codespaces](#tab/teamstoolkitcodespaces)

Before starting, ensure that you have the following prerequisites in place:

* **A GitHub account:** You must have a GitHub account in order to create a codespace instance. If you don't have one already, sign up for a free account.
* **A Microsoft 365 account:** This guide requires a Microsoft 365 account with permission to upload custom apps. More information is available on the [Microsoft 365 developer program page](https://developer.microsoft.com/microsoft-365/dev-program).
* **A Microsoft 365 tenant:** You need to have an active tenant. Learn more about how to set up your tenant by referring to [Prepare your O365 tenant](../concepts/build-and-test/prepare-your-o365-tenant.md).

> [!TIP]
> 
> [GitHub Codespaces](https://github.com/features/codespaces) provides a free plan with a limited monthly usage quota. If you require additional space, you can manage your codespaces by visiting [github.com/codespaces](https://github.com/codespaces) and deleting any codespaces that are no longer needed.

To create a Teams tab app with GitHub Codespaces, follow these steps:

1. **Open GitHub Codespaces:**

   Select the button below to open GitHub Codespaces. This action will launch your codespace instance pre-configured with the tutorial's starter code.

    <a href="https://github.com/codespaces/new?hide_repo_select=true&ref=v3&repo=348288141&machine=standardLinux32gb&location=WestUs2&devcontainer_path=.devcontainer%2Fhello-world-tab-codespaces%2Fdevcontainer.json&resume=1" target="_blank">
      <img src="https://github.com/codespaces/badge.svg" alt="Open hello-world tab in GitHub Codespaces">
    </a>

    If you have not already signed in to GitHub, you will be prompted to do so.

2. **Create a New Codespace:**

   After clicking the above link, select **Create new codespace**. 

   :::image type="content" source="../assets/images/get-started/codespace.png" alt-text="Screenshot shows you the GitHub page to create a codespace for tab.":::

   You will see the **Setting up your codespace** page. After a few moments, the following message appears:

   :::image type="content" source="../assets/images/get-started/building-codespace.png" alt-text="Screenshot shows you the codespace building your tab.":::

   During this time, Teams Toolkit prepares the tab app project and opens it in VS Code in your browser. The Teams Toolkit icon becomes visible in the activity bar of VS Code.

3. **Sign in to your Microsoft 365 and Azure Accounts:**

   Next, select **Sign in to your Microsoft 365** and **Sign in to Azure**. You will use your Microsoft 365 account credentials for these sign-ins.

   :::image type="content" source="../assets/images/get-started/toolkit-in-browser-sign-in.png" alt-text="Screenshot shows you the Teams Toolkit window in browser to sign in." lightbox="../assets/images/get-started/add-tab-in-teams.png":::

   > [!NOTE]
   > 
   > When building your app, GitHub Codespaces uploads and loads it to the Teams client in a new browser tab. If your browser is configured to block pop-ups, you may need to allow pop-ups to enable the app to open.

4. **Preview and Build your Teams App:**

   Once signed in, select **Preview your Teams App (F5)**. This will initiate the build process for your tab app.

   :::image type="content" source="../assets/images/get-started/toolkit-in-browser.png" alt-text="Screenshot shows you the Teams Toolkit window in browser with your tab app." lightbox="../assets/images/get-started/toolkit-in-browser.png":::

   GitHub Codespaces compiles your tab app, loads it into the Teams client, and opens it in a separate browser tab.

5. **Install the Tab App in Teams:**

   After the preview, select **Add** to install your tab app directly into Teams.

   :::image type="content" source="../assets/images/get-started/tab-in-teams.png" alt-text="Screenshot of the app details dialog to install the tab app in Teams.":::

   A dialog will appear allowing you to select the scope in which you want to use your app.

6. **Choose the App Scope:**

   For a personal installation, select **Open** to run the app in the personal scope. Alternatively, you can search for and choose the required scope or even select a channel or chat from the available list. Follow the subsequent prompts and select **Go** to confirm your installation.

   :::image type="content" source="../assets/images/get-started/tab-in-teams-scope.png" alt-text="Screenshot of the scope selection dialog with the options to open the app from the list of suggested scopes.":::

   Once you complete this step, your tab app will be successfully created and loaded in the Teams client.

   :::image type="content" source="../assets/images/get-started/tab-app-in-teams.png" alt-text="Screenshot shows your tab app loaded in the Teams client." lightbox="../assets/images/get-started/tab-app-in-teams.png":::

---

# [Step-by-step guide](#tab/step-by-step-guide)

If you prefer to set up your development environment from scratch and start with Teams Toolkit, this guide provides detailed instructions for creating your basic tab app manually. 

Select the following button to start building your basic tab app using the step-by-step guide:

> [!div class="nextstepaction"]
> [Start building a basic tab app](../sbs-gs-javascript.yml)

---

If you are interested in building a bot instead of a tab app, you can start with the bot guide:

> [!div class="nextstepaction"]
> [Start building a bot](build-notification-bot.md)

Additionally, if your goal is to create a message extension app, use the following guide:

> [!div class="nextstepaction"]
> [Build message extension](build-message-extension.md)