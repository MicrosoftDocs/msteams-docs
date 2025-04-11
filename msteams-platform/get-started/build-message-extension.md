---
title: Build Message Extension in Codespaces
description: Learn how to build your first message extension for your Teams app with the help of GitHub Codespaces, which opens the Toolkit extension and provides step-by-step guides.
ms.localizationpriority: medium
ms.date: 02/06/2025
ms.topic: reference
---

# Build a Message Extension App

A message extension allows users to interact with your web service directly from within the Microsoft Teams client. Users can search for information or execute actions in an external system through the compose message area, the command box, or directly from a message. The results of these interactions are returned to Teams as richly formatted cards.

:::image type="content" border="false" source="../assets/images/get-started/get-started-me.png" alt-text="Screenshot shows you the conceptual message extension in Teams client.":::

In this tutorial, you'll build a search-based message extension app that lets users search for npm packages from the Node Package Manager (npm) directory.

You can get familiar with the search-based message extension app in one of the following ways:

* **GitHub Codespaces**: Experience an instant Teams app environment with a pre-configured Visual Studio Code (VS Code) instance. The Teams Toolkit extension, source code, and all dependencies are pre-packaged for you.
* **Step-by-step guide**: Follow detailed instructions to set up your development environment and build your Teams app from scratch.

# [GitHub Codespaces](#tab/teamstoolkitcodespaces)

Before you create your codespace, make sure you meet the following prerequisites:

* A GitHub account to create your codespace instance.
* A [Microsoft 365 account](https://developer.microsoft.com/microsoft-365/dev-program) with custom app upload permission.
* A [Microsoft 365 tenant](../concepts/build-and-test/prepare-your-o365-tenant.md).

> [!TIP]
> [GitHub Codespaces](https://github.com/features/codespaces) offers a free plan with a fixed amount of usage per month. If you need to free up space, go to [github.com/codespaces](https://github.com/codespaces) and delete any codespaces you no longer need.

Follow these steps to create your search-based message extension app using GitHub Codespaces:

1. Open GitHub Codespaces by clicking the button below.  
   This button launches a new codespace instance with the environment pre-configured for building a message extension.

   <a href="https://github.com/codespaces/new?hide_repo_select=true&ref=v3&repo=348288141&machine=basicLinux32gb&location=WestUs2&devcontainer_path=.devcontainer%2Fnpm-search-message-extension-codespaces%2Fdevcontainer.json&resume=1" target="_blank"><img src="https://github.com/codespaces/badge.svg" alt="Open message extension in GitHub Codespaces"></a>

   You might be prompted to sign in to your GitHub account if you haven't already.

2. Select **Create new codespace**.  
   After clicking the button, the **Setting up your codespace** page appears.

   :::image type="content" source="../assets/images/get-started/codespace.png" alt-text="Screenshot shows you the GitHub page to create a codespace for message extension.":::

   Next, you'll see:

   :::image type="content" source="../assets/images/get-started/building-codespace.png" alt-text="Screenshot shows you the codespace building your message extension.":::

   Teams Toolkit configures the message extension app and opens it in VS Code in the browser. The Teams Toolkit icon appears in the activity bar of VS Code.

3. Sign in with your Microsoft 365 account.  
   Select **Sign in to your Microsoft 365** and **Sign in to Azure** to authenticate. This step is essential to proceed with building and deploying your app.

   :::image type="content" source="../assets/images/get-started/codespace/me-sign-in.png" alt-text="Screenshot shows you the Teams Toolkit window in browser to sign in." lightbox="../assets/images/get-started/add-tab-in-teams.png":::

   > [!NOTE]
   >
   > When you build your app, GitHub Codespaces loads it into the Teams client in a new tab. If your browser blocks pop-ups, ensure you allow pop-ups for the app to open correctly.

4. Build your message extension.  
   Select **Preview your Teams App (F5)**. This action triggers the build process for your message extension, loads it in the Teams client, and opens it in a new browser tab.

   :::image type="content" source="../assets/images/get-started/codespace/me-preview-teams.png" alt-text="Screenshot shows you the Teams Toolkit window in browser with your message extension." lightbox="../assets/images/get-started/codespace/me-preview-teams.png":::

5. Install the message extension in Teams.  
   Once your message extension app is built, select **Add** to install it in Teams.

   :::image type="content" source="../assets/images/get-started/codespace/me-in-teams.png" alt-text="Screenshot of the app details dialog to add the message extension app in Teams.":::

6. Open the app in the personal scope.  
   Finally, select **Open** when prompted to open the app in your personal scope.

   :::image type="content" source="../assets/images/get-started/codespace/me-in-teams-scope.png" alt-text="Screenshot of the scope selection dialog to open the app in personal scope.":::

   After following these steps, your search-based message extension is successfully created and loaded in the Teams client.

   :::image type="content" source="../assets/images/get-started/codespace/me-teams-chat.png" alt-text="Screenshot shows your message extension loaded in the Teams client.":::

# [Step-by-step guide](#tab/step-by-step-guide)

If you want to start from scratch using Teams Toolkit, follow this step-by-step guide to set up your development environment and build your message extension app:

> [!div class="nextstepaction"]
> [Build your first message extension app using JavaScript](../sbs-gs-msgext.yml)

---

For more information on message extensions, see [message extensions](../messaging-extensions/what-are-messaging-extensions.md).

If you're interested in building a bot instead, check out the instructions below:

> [!div class="nextstepaction"]
> [Start building a bot](build-notification-bot.md)

If you'd like to build a basic tab app, use the following guide:

> [!div class="nextstepaction"]
> [Build your basic tab app](build-basic-tab-app.md)

## Next Step

> [!div class="nextstepaction"]
> [Tool options and code samples](tool-options-and-code-samples.md)

## See Also

[npm directory](https://www.npmjs.com/)