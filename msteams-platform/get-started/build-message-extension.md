---
title: Build Message Extension in Codespaces
description: Learn how to build your first message extension for your Teams app with the help of GitHub Codespaces that opens Toolkit extension and step-by-step guides.
ms.localizationpriority: medium
ms.date: 02/06/2025
ms.topic: reference
---

# Build a Message Extension App

A message extension allows users to interact with your web service through buttons and forms within the Microsoft Teams client. With these extensions, users can search for information or trigger actions in an external system directly from the compose message area, the command box, or even directly from an existing message. The result of these interactions is presented back to the Teams client in the form of a richly formatted card.

:::image type="content" border="false" source="../assets/images/get-started/get-started-me.png" alt-text="Screenshot shows you the conceptual message extension in Teams client." :::

In this tutorial, you will build a search-based message extension app. This app specifically allows users to search for npm packages from the Node Package Manager (npm) directory.

Explore the search-based message extension app using one of the following approaches:

- **GitHub Codespaces**: Experience a seamless development environment where the Teams Toolkit extension, the app’s source code, and all necessary dependencies are pre-packaged and readily available in Visual Studio Code (VS Code).
- **Step-by-step guide**: Follow detailed instructions designed to help you set up your development environment and build a Teams app from scratch.

# [GitHub Codespaces](#tab/teamstoolkitcodespaces)

Before creating your codespace, make sure you have the following prerequisites:

- A GitHub account to create your codespace instance.
- A [Microsoft 365 account](https://developer.microsoft.com/microsoft-365/dev-program) that has custom app upload permissions.
- A [Microsoft 365 tenant](../concepts/build-and-test/prepare-your-o365-tenant.md).

> [!TIP]
> [GitHub Codespaces](https://github.com/features/codespaces) offers a free plan with a fixed amount of usage per month. If you need to free up more space, visit [github.com/codespaces](https://github.com/codespaces) and delete any codespaces that you no longer need.

Follow these steps to create a search-based message extension app using GitHub Codespaces:

1. **Open GitHub Codespaces:**  
   Click the button below to launch GitHub Codespaces.

   <a href="https://github.com/codespaces/new?hide_repo_select=true&ref=v3&repo=348288141&machine=basicLinux32gb&location=WestUs2&devcontainer_path=.devcontainer%2Fnpm-search-message-extension-codespaces%2Fdevcontainer.json&resume=1" target="_blank"><img src="https://github.com/codespaces/badge.svg" alt="Open message extension in GitHub Codespaces"></a>

   If you are not already signed in, you may be prompted to sign in to your GitHub account.

2. **Create a New Codespace:**  
   After launching, select the **Create new codespace** option.

   :::image type="content" source="../assets/images/get-started/codespace.png" alt-text="Screenshot shows you the GitHub page to create a codespace for message extension." :::

   At this stage, the **Setting up your codespace** page will appear.

   :::image type="content" source="../assets/images/get-started/building-codespace.png" alt-text="Screenshot shows you the codespace building your message extension." :::

   The Teams Toolkit will automatically prepare your message extension and open it in VS Code within the browser. You will see the Teams Toolkit icon in the activity bar of VS Code.

3. **Sign In to Required Accounts:**  
   Next, select **Sign in to your Microsoft 365** and **Sign in to Azure** to authenticate with your Microsoft 365 account.

   :::image type="content" source="../assets/images/get-started/codespace/me-sign-in.png" alt-text="Screenshot shows you the Teams Toolkit window in browser to sign in." lightbox="../assets/images/get-started/add-tab-in-teams.png" :::

   > [!NOTE]
   >
   > When you build your app, GitHub Codespaces loads it into the Teams client in a new tab. If your browser blocks pop-up tabs or windows, ensure that you allow pop-ups for your app to open.

4. **Preview Your Teams App:**  
   Select **Preview your Teams App (F5)** to start building your message extension. This action triggers the build process.

   :::image type="content" source="../assets/images/get-started/codespace/me-preview-teams.png" alt-text="Screenshot shows you the Teams Toolkit window in browser with your message extension." lightbox="../assets/images/get-started/codespace/me-preview-teams.png" :::

   GitHub Codespaces will build your message extension app, load it into the Teams client, and open it in a separate browser tab.

5. **Install Your Message Extension:**  
   Once the app is loaded, select **Add** to install your message extension in Teams.

   :::image type="content" source="../assets/images/get-started/codespace/me-in-teams.png" alt-text="Screenshot of the app details dialog to add the message extension app in Teams." :::

6. **Open in Personal Scope:**  
   Finally, select **Open** to launch the app in personal scope.

   :::image type="content" source="../assets/images/get-started/codespace/me-in-teams-scope.png" alt-text="Screenshot of the scope selection dialog to open the app in personal scope." :::

   After completing these steps, you will have successfully created and loaded your search-based message extension in the Teams client.

   :::image type="content" source="../assets/images/get-started/codespace/me-teams-chat.png" alt-text="Screenshot shows your message extension loaded in the Teams client." :::

# [Step-by-step guide](#tab/step-by-step-guide)

If you prefer to start your project with Teams Toolkit from the beginning, you will need to set up your development environment manually. Click the button below to begin building your message extension app using detailed, step-by-step instructions.

> [!div class="nextstepaction"]
> [Build your first message extension app using JavaScript](../sbs-gs-msgext.yml)

---

For more detailed insights into how message extensions work, see [message extensions](../messaging-extensions/what-are-messaging-extensions.md).

If you are more interested in developing a bot rather than a message extension, follow the steps below:

> [!div class="nextstepaction"]
> [Start building a bot](build-notification-bot.md)

Alternatively, if you wish to create a basic tab app, select the link below:

> [!div class="nextstepaction"]
> [Build your basic tab app](build-basic-tab-app.md)

## Next Step

> [!div class="nextstepaction"]
> [Tool options and code samples](tool-options-and-code-samples.md)

## See Also

[npm directory](https://www.npmjs.com/)