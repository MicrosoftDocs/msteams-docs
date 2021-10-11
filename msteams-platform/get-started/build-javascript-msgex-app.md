---
title: Build your first Teams messaging extension app
author: adrianhall
description: Build a messaging extension for Microsoft Teams using the Teams Toolkit.
ms.author: adhal
ms.date: 05/20/2021
ms.topic: quickstart
ms.localizationpriority: none
---
# Build your message extension project

After you set up your project workspace with Teams Toolkit, build your tab project. You'll need to sign in to your Microsoft 365 account.

:::image type="content" source="../assets/images/get-started/app-roadmap/roadmap-p3.png" alt-text="Image showing phase 3 of building an app." border="false":::

In this page, you'll learn to:
- [Build and run your first app](#build-and-run-your-app-locally-in-visual-studio-code)

## Sign in to your Microsoft 365 account

Use this account to sign in to Teams. If you're using a Microsoft 365 developer program tenant, the admin account you set up while registering is your Microsoft 365 account.

# [Visual Studio Code](#tab/vcode)

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

1. Select **F5** in Visual Studio Code to run your application in debug mode.
    <!-- markdownlint-disable MD033 -->
    <details>
    <summary>Learn what happens when you run your app locally in the debugger.</summary>

    When you select **F5**, the Teams Toolkit:

    1. Registers your application with Azure Active Directory.
    1. Registers your application for "side loading" in Microsoft Teams.
    1. Starts your application backend running locally using [Azure Function Core Tools](/azure/azure-functions/functions-run-local?#start).
    1. Starts ngrok tunnel so Teams can communicate with your app.
    1. Starts Microsoft Teams with a command to instruct Teams to sideload the application.

    </details>

   > When you run the app for the first time, all dependencies are downloaded and the app is built. A browser window opens when the build is complete. This can take 3-5 minutes to complete.

   Teams opens in a web browser.
1. Select **Cancel** to remain in the browser, if you're prompted to open Microsoft Teams.
1. Sign in with your Microsoft 365 account, if prompted.
 
    :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/hmx-add-app.png" alt-text="Screenshot that shows the button Add the app to Teams" border="false":::
    
1. Select **Add** to add the app to your account.
    
    :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/hmx-app-added.png" alt-text="Screenshot that shows confirmation that app is added" border="false":::

   The app is added to Teams, and is loaded.

<!-- markdownlint-disable MD033 -->
<details>
<summary>Learn how to troubleshoot if your app doesn't run locally.</summary>

To run your app in Teams, you must have a Microsoft 365 development account that allows app sideloading. For more information on account opening, see [Prerequisites](prerequisites.md#set-up-your-teams-development-tenant).

> [!TIP]
> Check for issues before sideloading your app, using the [app validation tool](https://dev.teams.microsoft.com/appvalidation.html), which is included in the toolkit. Fix the errors to sideload the app.
</details>

### Test the Bot app

Try the following steps in the app to start a new conversation.
1. Launch the message extension from three dots in the composing area.
1. Select the message extension app you installed.       

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/msgext-app-sample-open.png" alt-text="Screenshot that shows how to open the sample messaging extension app" border="false":::

   This sample app lets you search npm packages.

1. Enter a search string in the search box, such as "cli":

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/msgext-app-sample-search.png" alt-text="Screenshot that shows how to use the sample app" border="false":::

1. Select one of the search results. You can send the result displayed in the Adaptive Card to the channel as a message!

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/msgext-app-sample-result.png" alt-text="Screenshot that shows the search result" border="false":::

Now, you've learned how to build and run a basic message extension.

<details>
<summary>Add a configuration page to your messaging extension</summary>

[!include[v4-to-v3-SDK-pointer](~/includes/v4-to-v3-pointer-me.md)]

### Code sample

Use the Teams Search Auth Config for sample projects on GitHub to see how to:
- Create messaging extensions that include a configuration page and [Bot Service authentication](https://github.com/microsoft/BotBuilder-Samples#teams-samples).
- Create message extensions that accept search requests and return the results after the user has signed in.

| **Sample name** | **Description** | **.NET** | **Node.js** | **Python** |
|-----------------|-----------------|-------------|--------------|--------|
| Bot builder | To create messaging extensions. | [View](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/52.teams-messaging-extensions-search-auth-config) | [View](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/52.teams-messaging-extensions-search-auth-config) | [View]( https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/python/50.teams-messaging-extension-search) |

### More code samples

> [!div class="nextstepaction"]
> [View more Bot Framework Samples on GitHub](https://github.com/OfficeDev/microsoft-teams-samples#messaging-extensions-samples-using-the-v4-sdk)
</details>

| &nbsp; | &nbsp; |
|:--- | ---:|
|[:::image type="icon" source="../assets/images/get-started/app-roadmap/back-create-msgext.png":::](first-message-extension.md) | [:::image type="icon" source="../assets/images/get-started/app-roadmap/next-deploy.png":::](get-started-deploy-teams-app-azure.md)|
|