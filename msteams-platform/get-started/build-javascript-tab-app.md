---
title: Build your first Teams tab app
author: adrianhall
description: Build a Microsoft Teams tab app using the Microsoft Teams Toolkit and JavaScript.
ms.author: adhal
ms.date: 05/27/2021
ms.topic: quickstart
ms.localizationpriority: none
---

# Build your tab project

After you set up your project workspace with Teams Toolkit, build your tab project. You'll need to sign in to your Microsoft 365 account.

:::image type="content" source="../assets/images/get-started/app-roadmap/roadmap-p3.png" alt-text="Image showing phase 3 of building an app." border="false":::

In this page, you'll learn to:
- [Build and run your first app](#build-and-run-your-app-locally-in-visual-studio-code)

## Sign in to your Microsoft 365 account

Use your Microsoft 365 account to sign in to Teams. If you're using a Microsoft 365 developer program tenant, the admin account you set up while registering is your Microsoft 365 account.

# [Visual Studio Code](#tab/viscode)

1. Open Visual Studio Code.
1. Select the Teams Toolkit  :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.png"::: icon in the sidebar.
1. Select **Sign in to M365**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/account-signin.png" alt-text="Screenshot showing where to sign in to Microsoft 365 and Azure." border="false":::

    Your default web browser opens to let you sign in to the account.

1. Sign in to your Microsoft 365 account using your credentials.
1. Close the browser when prompted, and return to Visual Studio Code.
1. Return to Teams Toolkit within Visual Studio Code.

    The **ACCOUNTS** section of the sidebar shows your Microsoft 365 account name.

    Now you're ready to build the app and run it locally!

# [Visual Studio 2019](#tab/vscode)

Visual Studio 2019 prompts you to log into each service as required. You don't need to sign in to your Microsoft 365 and Azure accounts in advance.

# [Command line](#tab/cline)

1. Sign in to Microsoft 365 with the TeamsFx CLI:

    ``` bash
    teamsfx account login m365
    ```

    Your default web browser opens to let you sign in to the account. Sign in to your Azure account using your credentials. Close the browser when you're prompted.

2. Sign in to Azure with the TeamsFx CLI:

    ``` bash
    teamsfx account login azure
    ```

    Your default web browser opens to let you sign in to the account. Sign in to your Azure account using your credentials. Close the browser when you're prompted.

    The account logins are shared between Visual Studio Code and the TeamsFx CLI.

    Now that the development environment is configured, you can create, build, and deploy your first Teams app.

---

## Build and run your app locally in Visual Studio Code

To build and run your app locally:

1. From Visual Studio Code, select **F5** to run the application in debug mode.

    <!-- markdownlint-disable MD033 -->

    <details>
    <summary>Learn what happens when you run your app locally in the debugger.</summary>

    In case you're wondering, when you press the **F5** key the Teams Toolkit:

    - Registers your app with Azure Active Directory. This app has permissions for the location that the app is loaded from and the backend resources.
    - *Sideloads* the app in Teams.
    - Starts the app's backend running locally using [Azure Function Core Tools](/azure/azure-functions/functions-run-local?#start).
    - Starts the app's frontend hosted locally.
    - Starts Microsoft Teams in a web browser with a command to instruct Teams to side load the app from `https://localhost:3000/tab`. This URL is registered in the app's manifest.
    - An app manifest is generated and exists in the Developer Portal for Teams. Teams uses the app manifest to tell connected clients where to load the app from.

    </details>

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/f5-build-and-run.png" alt-text="Screenshot showing when F5 key is pressed.":::

   > When you run the app for the first time, all dependencies are downloaded and the app is built.  A browser window opens when the build is complete. This can take 3-5 minutes to complete.

   The Toolkit prompts you to install a local certificate, if necessary. This certificate allows Teams to load your application from `https://localhost`.

1. Select **Yes** if the following dialog appears:

   :::image type="content" source="../assets/images/teams-toolkit-v2/ssl-prompt.png" alt-text="Screenshot showing the prompt to install an SSL certificate to enable Teams to load your application from localhost.":::

    Or select **Continue**, depending on your operating system:

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/ssl-prompt-mac.png" alt-text="Screenshot showing the prompt to install an SSL certificate to enable Teams to load your application from localhost on Mac.":::

   Teams web client opens in a browser window.

1. Sign in with your Microsoft 365 account, if prompted.

1. Select **Add** when prompted to sideload the app onto Teams on your local machine.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/launch-web-browser-add.png" alt-text="Add the app to Teams":::

1. Select the web app version, if you're asked to switch to Teams desktop. Run your app in the Teams web client. You can see the HTML, CSS, and JavaScript code in a standard web development environment.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/launch-web-browser-and-pick-webapp.png" alt-text="Screenshot showing how to pick the web version of teams when launched":::

1. Congratulations, your first app is running on Teams!

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/launch-web-browser-congratulations.png" alt-text="Screenshot of the completed app":::

You can do normal debugging activities, such as setting breakpoints, as if it were any other web application. The app supports hot reloading. If you change any file within the project, the page will be reloaded.

<!-- markdownlint-disable MD033 -->

<details>
<summary>Learn how to troubleshoot if your app doesn't run locally.</summary>

To successfully run your app in Teams, ensure that you've enabled sideloading in your Teams account. For more information on sideloading, see [Prerequisites](prerequisites.md#set-up-your-teams-development-tenant).

</details>

You know how to use Toolkit to set up a tab app and run it locally. Next, let’s learn how to build a conversational chat bot with Toolkit!

| &nbsp; | &nbsp; |
|:--- | ---:|
| [:::image type="icon" source="../assets/images/get-started/app-roadmap/back-create-tab.png":::](first-app-react.md) | [:::image type="icon" source="../assets/images/get-started/app-roadmap/next-create-bot.png":::](first-app-bot.md)|
|