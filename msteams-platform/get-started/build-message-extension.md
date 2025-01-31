# Building a Message Extension

Message extensions allow users to interact with your web service via Microsoft Teams client. Through buttons, forms, from the compose message area, the command box or even directly from a message, users can initiate actions or search an external system. The results of such interactions are sent back to the Teams client in a card format.

![Conceptual message extension in Teams client](https://learn.microsoft.com/en-us/microsoftteams/platform/assets/images/get-started/get-started-me.png)

In this guide, we will discuss the construction of a search-based message extension application which permits users to search npm packages from the Node Package Manager (npm) directory.

You can learn about the search-based message extension application in two ways:

- **Directly in GitHub Codespaces**: This instance offers a ready-to-use Teams application. It provides a pre-packaged version of Visual Studio Code (VS Code), along with the Teams Toolkit extension, the source code of the app, and its dependencies. 
- **By following a step-by-step guide**: This method involves setting up your local development environment to build a Teams application from scratch.

## Using GitHub Codespaces

To use GitHub Codespaces, you need to have:

- A GitHub account
- A [Microsoft 365 account](https://developer.microsoft.com/microsoft-365/dev-program) that has app upload permissions
- A [Microsoft 365 tenant](../concepts/build-and-test/prepare-your-o365-tenant.md)

> Note: [GitHub Codespaces](https://github.com/features/codespaces) provides a plan that offers free services up to a certain usage limit per month. If required, you can free up more space by deleting unnecessary or unused codespaces at [github.com/codespaces](https://github.com/codespaces).

Below are the steps to create a search-based message extension app using GitHub Codespaces:

1. Open GitHub Codespaces by clicking on the following button:

   [![Open GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=v3&repo=348288141&machine=basicLinux32gb&location=WestUs2&devcontainer_path=.devcontainer%2Fnpm-search-message-extension-codespaces%2Fdevcontainer.json&resume=1)

   If you haven't already signed in, you will be asked to do so.
   
2. Click on **Create new codespace**.

   The message extension app will be prepared by the Teams Toolkit and opened in VS Code in your browser.

3. Sign in to your Microsoft 365 account.

   > Important: When building your app, GitHub Codespaces opens it in a new tab on the Teams client. Make sure to allow pop-ups in your browser to open your app.

4. Select **Preview your Teams App (F5)** to build your message extension app.

   GitHub Codespaces builds your app and loads it onto the Teams client. It then opens in a different browser tab.

5. Click **Add** to install the message extension in Teams.

6. Click **Open** to use the app in personal scope.

   You have now successfully created and loaded a search-based message extension in the Teams client.

## Step-by-Step Guide Usage

If you'd prefer to create a project from scratch using Teams Toolkit, you'll need to set up your development environment. Use the following button to start building your message extension app:

[Build your first message extension app using JavaScript](../sbs-gs-msgext.yml)

For additional information about message extensions, check out [message extensions](../messaging-extensions/what-are-messaging-extensions.md).

To learn more about building bots or creating basic tab apps, use the following links:

[Start building a bot](build-notification-bot.md)

[Build your basic tab app](build-basic-tab-app.md)

## Next Step and Additional Resources

Tool options and code samples can be found [here](tool-options-and-code-samples.md).

You might also want to check out the [npm directory](https://www.npmjs.com/).