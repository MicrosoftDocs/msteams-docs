---
title: Build Message Extension in Codespaces
description: Learn how to build your first message extension for your Teams app with the help of GitHub codespaces that opens Toolkit extension and step-by-step guides.
ms.localizationpriority: medium
ms.date: 02/06/2025
ms.topic: reference
---

# Build a message extension app

A message extension allows the users to interact with your web service through buttons and forms in the Microsoft Teams client. They can search or initiate actions in an external system from the compose message area, the command box, or directly from a message. You can send back the results of that interaction to the Teams client in the form of a richly formatted card.

:::image type="content" border="false" source="../assets/images/get-started/get-started-me.png" alt-text="Screenshot shows you the conceptual message extension in Teams client.":::

In this tutorial, you'll learn to build a search-based message extension app, and the app allows users to search npm packages from the Node Package Manager (npm) directory.

Get familiarized with search based message extension app in one of the following ways:

* **GitHub Codespaces**: The codespace instance allows you to experience a Teams app instantaneously. It opens Visual Studio Code (VS Code), where the Teams Toolkit extension, the app source code, and all the dependencies are pre-packaged for you.
* **Step-by-step guide**: Allows you to set up your development environment and build a Teams app from start.

# [GitHub Codespaces](#tab/teamstoolkitcodespaces)

Before you create your codespace, ensure that you have the following prerequisites:

* A GitHub account to create your codespace instance
* A [Microsoft 365 account](https://developer.microsoft.com/microsoft-365/dev-program) with custom app upload permission
* A [Microsoft 365 tenant](../concepts/build-and-test/prepare-your-o365-tenant.md)

> [!TIP]
> [GitHub Codespaces](https://github.com/features/codespaces) offers free plan up to a fixed amount of usage per month. If you need to free up more space, go to [github.com/codespaces](https://github.com/codespaces) and delete the codespaces that you no longer need.

To create a search-based message extension app with GitHub Codespaces, follow these steps:

1. Select the following button to open GitHub Codespaces.

    <a href="https://github.com/codespaces/new?hide_repo_select=true&ref=v3&repo=348288141&machine=basicLinux32gb&location=WestUs2&devcontainer_path=.devcontainer%2Fnpm-search-message-extension-codespaces%2Fdevcontainer.json&resume=1" target="_blank"><img src="https://github.com/codespaces/badge.svg" alt="Open message extension in GitHub Codespaces"></a>

   You might be asked to sign in to GitHub account if you haven't already.

1. Select **Create new codespace**.

   :::image type="content" source="../assets/images/get-started/codespace.png" alt-text="Screenshot shows you the GitHub page to create a codespace for message extension.":::

   The **Setting up your codespace** page appears.

   :::image type="content" source="../assets/images/get-started/building-codespace.png" alt-text="Screenshot shows you the codespace building your message extension.":::

   Teams Toolkit prepares the message extension for you and opens it in VS Code in the browser. The Teams Toolkit icon appears in the activity bar of VS Code.

1. Select **Sign in to your Microsoft 365** and **Sign in to Azure** to sign in with your Microsoft 365 account.

   :::image type="content" source="../assets/images/get-started/codespace/me-sign-in.png" alt-text="Screenshot shows you the Teams Toolkit window in browser to sign in."lightbox="../assets/images/get-started/add-tab-in-teams.png":::

    > [!NOTE]
    >
    > When you build your app, GitHub Codespaces loads it to the Teams client in a new tab. If your browser blocks pop-up tabs or windows, you'll need to allow pop-ups for your app to open.

1. Select **Preview your Teams App (F5)** to build your message extension.

      :::image type="content" source="../assets/images/get-started/codespace/me-preview-teams.png" alt-text="Screenshot shows you the Teams Toolkit window in browser with your message extension."lightbox="../assets/images/get-started/codespace/me-preview-teams.png":::

      GitHub Codespaces builds your message extension app, loads it to Teams client, and opens in a separate browser tab.

1. Select **Add** to install your message extension in Teams.

   :::image type="content" source="../assets/images/get-started/codespace/me-in-teams.png" alt-text="Screenshot of the app details dialog to add the message extension app in Teams.":::

1. Select **Open** to open the app in personal scope.

   :::image type="content" source="../assets/images/get-started/codespace/me-in-teams-scope.png" alt-text="Screenshot of the scope selection dialog to open the app in personal scope.":::

   You've successfully created the search-based message extension and loaded in the Teams client.

   :::image type="content" source="../assets/images/get-started/codespace/me-teams-chat.png" alt-text="Screenshot shows your message extension loaded in the Teams client.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+an+interactive+notification+bot+app&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fget-started%2Fbuild-message-extension%3Ftabs%3Dteamstoolkitcodespaces&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fget-started%2Fbuild-message-extension.md&documentVersionIndependentId=4f4e5027-7a0b-30e1-dc4b-d2bd8daee892&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

# [Step-by-step guide](#tab/step-by-step-guide)

If you want to learn how to start a project with Teams Toolkit from the beginning, you'll need to set up your development environment. Select the following button to start building your message extension app.

> [!div class="nextstepaction"]
> [Build your first message extension app using JavaScript](../sbs-gs-msgext.yml)

---

For more information on message extensions, see [message extensions](../messaging-extensions/what-are-messaging-extensions.md).

If a bot is what you are interested in, select the following:

> [!div class="nextstepaction"]
> [Start building a bot](build-notification-bot.md)

If you want to build basic tab app, select the following:

> [!div class="nextstepaction"]
> [Build your basic tab app](build-basic-tab-app.md)

## Next step

> [!div class="nextstepaction"]
> [Tool options and code samples](tool-options-and-code-samples.md)

## See also

[npm directory](https://www.npmjs.com/)
