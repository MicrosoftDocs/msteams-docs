---
title: Get started - Build your first Teams app with React
author: adrianhall
description: Quickly create a Microsoft Teams app that displays a "Hello, World!" message using the Microsoft Teams Toolkit and React.
ms.author: adhal
ms.date: 05/27/2021
ms.topic: quickstart
ms.localizationpriority: none
---

# Build and test your first app

You can use Teams Toolkit to run the app in the local environment.

## Sign in to your Microsoft 365 and Azure accounts

You must have access to two accounts:

- Your Microsoft 365 account credentials: Use this account to sign in to Teams. If you're using a Microsoft 365 developer program tenant, the admin account you set up while registering is your Microsoft 365 account.
- Your Azure credentials: Use this account to access the Azure portal and to provision new cloud resources to support your app.

# [Visual Studio Code](#tab/viscode)

1. Open Visual Studio Code.
1. Select the Teams Toolkit  :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.png"::: icon in the sidebar. 

1. Select **Sign in to M365**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/account-signin.png" alt-text="Screenshot showing where to sign in to Microsoft 365 and Azure." border="false":::

    The sign-in process starts using your normal web browser. Complete the sign-in process for your Microsoft 365 account. When you're prompted, close the browser, and return to Visual Studio Code.

1. Return to the Teams Toolkit within Visual Studio Code.
1. Select **Sign in to Azure**.

    > [!TIP]
    > If you have the Azure Account extension installed and are using the same account, you can skip this step. Use the same account as you are using in other extensions.

1. The sign-in process starts using your normal web browser. Complete the sign-in process for your Azure account. When are prompted, you can close the browser, and return to Visual Studio Code.

    When complete, the **ACCOUNTS** section of the sidebar shows the two accounts separately, together with the number of usable Azure subscriptions available to you. Ensure you have at least one usable Azure subscription available. If not, sign out and use a different account.

    Now you're ready to build the app and run it locally!

# [Visual Studio 2019](#tab/vscode)

Visual Studio 2019 prompts you to log into each service as required. You don't need to sign in to your Microsoft 365 and Azure accounts in advance.

# [Command line](#tab/cline)

1. Sign in to Microsoft 365 with the TeamsFx CLI:

    ``` bash
    teamsfx account login m365
    ```

    The sign-in process starts using your normal web browser. Complete the sign-in process for your Microsoft 365 account. Close the browser when you're prompted.

2. Sign in to Azure with the TeamsFx CLI:

    ``` bash
    teamsfx account login azure
    ```

    The sign-in process starts using your normal web browser. Complete the sign-in process for your Azure account. Close the browser when you're prompted.

    The account logins are shared between Visual Studio Code and the TeamsFx CLI.


    Now that the development environment is configured, you can create, build, and deploy your first Teams app.

---

## Build and run your app locally in Visual Studio Code

To build and run your app locally:

1. From Visual Studio Code, select **F5** to run the application in debug mode.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/f5-build-and-run.png" alt-text="Screenshot showing when F5 key is pressed.":::

   > When you run the app for the first time, all dependencies are downloaded and the app is built.  A browser window automatically opens when the build is complete.  This can take 3-5 minutes to complete.

   The Toolkit prompts you to install a local certificate, if necessary. This certificate allows Teams to load your application from `https://localhost`. Select **Yes** when the following dialog appears:

   :::image type="content" source="../assets/images/teams-toolkit-v2/ssl-prompt.png" alt-text="Screenshot showing the prompt to install an SSL certificate to enable Teams to load your application from localhost.":::

    Or click **Continue**, depending on your operating system:

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/ssl-prompt-mac.png" alt-text="Screenshot showing the prompt to install an SSL certificate to enable Teams to load your application from localhost on Mac.":::

1. Teams web client opens in a browser window. Sign in with your Microsoft 365 account when prompted.

1. When prompted to install the app onto Teams, select **Add**.
    :::image type="content" source="../assets/images/teams-toolkit-v2/all-capabilities/hwa-add-app.png" alt-text="Add the app to Teams":::
 
    If you're asked to switch to Teams desktop, select the web app version to run your app. You can see the HTML, CSS, and JavaScript code in a standard web development environment.
    
    :::image type="content" source="../assets/images/teams-toolkit-v2/first-tab/launch-web-browser-and-pick-webapp.png" alt-text="Screenshot showing how to pick the web version of teams when launched":::

1. Congratulations, your first app is running on Teams!

    :::image type="content" source="../assets/images/teams-toolkit-v2/all-capabilities/hwa-app-running.png" alt-text="Screenshot of the completed app":::

    You can see the app’s capabilities:
    - Chat bot is running and a message notification is sent to you
    - Personal Tab is visible next to Chat
    - Message extension can be accessed from the […] button under the message box.

    Hover the mouse cursor over the app name to see the description of its capabilities.

    :::image type="content" source="../assets/images/teams-toolkit-v2/all-capabilities/hwa-app-desc.png" alt-text="Screenshot of app description":::

You can do normal debugging activities, such as setting breakpoints, as if it were any other web application. The app supports hot reloading. If you change any file within the project, the page will be reloaded.

<!-- markdownlint-disable MD033 -->

<details>
<summary>Learn what happens when you run your app locally in the debugger.</summary>

In case you're wondering, when you press the F5 key the Teams Toolkit:

* Registers your application with Azure Active Directory. This application has permissions for the location that the app is loaded from and the backend resources. 
* *Sideloads* the app in Teams.
* Starts the application backend running locally using [Azure Function Core Tools](/azure/azure-functions/functions-run-local?#start).
* Starts the application front-end hosted locally.
* Starts Microsoft Teams in a web browser with a command to instruct Teams to side load the application from `https://localhost:3000/tab`. This URL is registered in the application manifest.
* An app manifest is generated and exists in the Developer Portal for Teams. Teams uses the app manifest to tell connected clients where to load the app from.

</details>

<!-- markdownlint-disable MD033 -->
<details>
<summary>Learn how to troubleshoot common issues when running your app locally.</summary>

To successfully run your app in Teams, you must have a Teams account that allows app sideloading. For more information on account opening, see [Prerequisites](prerequisites.md#set-up-your-teams-development-tenant).

</details>



## Test your Hello World app

You can test the capabilities of the Hello World app after the app is running.

To test the Bot:
- Type a message, like welcome, to show an introduction card.
    :::image type="content" source="../assets/images/teams-toolkit-v2/all-capabilities/hwa-app-bot.png" alt-text="Screenshot of bot":::
    
To test the Message Extension:
1. Click the […] button in the composing area to launch the message extension.
1.	Enter a search string, like cli, in the search bar, and select Enter.
    :::image type="content" source="../assets/images/teams-toolkit-v2/all-capabilities/hwa-app-mex-query.png" alt-text="Screenshot of message extension query":::
    
    The search returns result.
    :::image type="content" source="../assets/images/teams-toolkit-v2/all-capabilities/hwa-app-mex-query-resp.png" alt-text="Screenshot of message extension query response":::
    
    You can also try to @ your message extension instance. You can find it in the search bar in the top row of Teams and search for npm package.

To test the Tab:
- Select **Personal Tab**.
        :::image type="content" source="../assets/images/teams-toolkit-v2/all-capabilities/hwa-app-tab-editusername.png" alt-text="Screenshot of app tab":::


## Next step

> [!div class="nextstepaction"]
> [Hello World - Deploy your app on Azure](../get-started/get-started-deploy-teams-app-azure.md)