---
title: Get started - Build your first messaging extension
author: adrianhall
description: Create a messaging extension for Microsoft Teams using the Teams Toolkit.
ms.author: adhal
ms.date: 05/20/2021
ms.topic: quickstart
ms.localizationpriority: none
---

# Build and run your first messaging extension for Microsoft Teams

This tutorial walks you through the steps to create a *search command*. You use it to search for external data and insert the results into a message.

There are two types of Teams **messaging extensions**:

- [Search commands](../messaging-extensions/how-to/search-commands/define-search-command.md): You can search external systems. Then, you can insert its results into a message in the form of a card.
- [Action commands](../messaging-extensions/how-to/action-commands/define-action-command.md): You can present your users with a modal popup to collect or display information. Then, you can process their interaction and send information back to Teams.

## Before you begin

Make sure your development environment is set up by installing the Prerequisites.

> [!div class="nextstepaction"]
> [Install Prerequisites](prerequisites.md)

## Create your project

Use the Teams Toolkit to create your first project:

# [Visual Studio Code](#tab/vscode)

1. Open Visual Studio Code.
1. Select the Teams icon in the sidebar to open the Teams Toolkit.

    :::image type="content" source="../assets/images/teams-toolkit-v2/sidebar-icon.png" alt-text="The Teams Icon in the Visual Studio Code sidebar.":::

1. Select **Create New Project**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-project.png" alt-text="Location of the Create New Project link in the Teams Toolkit sidebar.":::

1. Select **Create a new Teams app**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-new-project-intro.png" alt-text="Wizard start for Create New Project":::

1. In the **Select capabilities** section, select **Message Extension**, deselect **Tab**, and select **OK**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/msgextn-create-project-capabilities.png" alt-text="Screenshot showing how to add capabilities to your new app.":::

1. In the **Bot registration** section, select **Create a new bot registration**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-bot-registration.png" alt-text="Select create a new bot registration":::

   > [!NOTE]
   > Messaging extensions rely on bots to provide a dialog between the user and your code.

1. In the **Programming Language** section, select **JavaScript**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/create-project-programming-languages.png" alt-text="Screenshot showing how to select the programming language.":::

1. Select a workspace folder.  A folder is created in your workspace folder for the project.

1. Enter a suitable name for your app, like `helloworld`. Ensure that the app's name is alphanumeric. Select **Enter** to continue.

   Teams Toolkit creates the app in a few seconds.

# [Command line](#tab/cli)

Use the `teamsfx` CLI to create your first project.  Start from the folder where you want to create the project folder.

``` bash
teamsfx new
```

You can use the CLI to create a new Teams app. The CLI leads you through a series of questions. Every question includes an instruction on answering it.

For example, Use arrow keys to select an option. After you make the choice, select **Enter** to confirm it.


1. Select **Create a new Teams app**.
1. Select the **Message Extension** and deselect **Tab**.
1. Select **Create a new bot registration**.
1. Select **JavaScript** as the programming language.
1. Select **Enter** to select the default workspace folder.
1. Enter a suitable name for your app, like `helloworld`.  The name of the app must consist only of alphanumeric characters.

   After all the questions have been answered, your project is created.

---

## Take a tour of the source code

If you wish to skip this section for now, you can [run your app locally](#run-your-app-locally).

A messaging extension uses the [Bot Framework](https://docs.botframework.com). You use it to interact with your service via a conversation. After scaffolding is done, view the project directories and files in the Explorer area of Visual Studio Code.

:::image type="content" source="../assets/images/teams-toolkit-v2/msgextn-file-layout.png" alt-text="File layout of a bot project.":::

The bot code is stored in the `bot` directory. The `bot/messageExtensionBot.js` is the main entry point for the messaging extension.

> [!Tip]
> Familiarize yourself with bots outside of Teams before you integrate your first bot within Teams.  You can find more information about bots by reviewing the [Azure Bot Service](/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&preserve-view=true) tutorials.

## Run your app locally

You can use Teams Toolkit to host your app in the local environment. To prepare the environment, ensure that:

- An Azure Active Directory Application is registered within the Microsoft 365 tenant.
- An app manifest is submitted to the Developer Portal for Teams.
- An API is run in the local environment using Azure Functions Core Tools to support your app.
- [ngrok](https://ngrok.io) is installed. You use it to provide a tunnel between Teams and your messaging extension.

To build and run your app locally:

1. From Visual Studio Code, select **F5** to run your application in debug mode.

   > When you run the app for the first time, all dependencies are downloaded and the app is built.  A browser window opens when the build is complete. This can take 3-5 minutes to complete.

1. Teams opens in a web browser. If you're prompted to open Microsoft Teams, select **Cancel** to remain in the browser. Sign in with your Microsoft 365 account when prompted.

1. Select **Add** to add the app to your account.

   After the app is loaded, you can try to use the sample functionality:
   You can launch the message extension from three dots in the composing area. Use the search npm packages from the search bar.

   :::image type="content" source="../assets/images/teams-toolkit-v2/search-message-extension.png" alt-text="This image shows your Search-based messaging extension in action":::
   
   You can also try to @ your message extension instance. You can find it in the search bar in the top row of Teams and search for npm package.
    :::image type="content" source="../assets/images/teams-toolkit-v2/msgext-teams-search-bar.png" alt-text="The Search-based messaging extension in action":::

   Type some text in the search box, then select one of the options. you can create and send adaptive cards of the search results.
    :::image type="content" source="../assets/images/teams-toolkit-v2/msgext-adptive-card.png" alt-text="Your Search-based messaging extension in action":::

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

<!-- markdownlint-disable MD033 -->
<details>
<summary>Learn how to troubleshoot common issues when running your app locally.</summary>

To run your app in Teams, you must have a Microsoft 365 development account that allows app sideloading. For more information on account opening, see [Prerequisites](prerequisites.md#set-up-your-teams-development-tenant-optional).

> [!TIP]
> Check for issues before sideloading your app, using the [app validation tool](https://dev.teams.microsoft.com/appvalidation.html), which is included in the toolkit. Fix the errors to sideload the app.
</details>

[!INCLUDE [Provision and Deploy your app on Azure](~/includes/get-started/azure-provisioning-instructions.md)]

<!-- markdownlint-disable MD033 -->

<details>
<summary>Learn what happens when you deployed your app to Azure</summary>

Before deployment, the application runs in the local environment:

1. The backend runs using _Azure Functions Core Tools_.
1. The application HTTP endpoint, where Microsoft Teams loads the application, runs locally.

Deployment involves two steps. First, you provision resources on an active Azure subscription. Then, you deploy (upload) the backend and frontend code for the application to Azure. The backend uses various Azure services, including Azure App Service and Azure Bot Service.

</details>

## Add a configuration page to your messaging extension

[!include[v4-to-v3-SDK-pointer](~/includes/v4-to-v3-pointer-me.md)]

## Code sample

Use the Teams Search Auth Config for sample projects on GitHub to see how to: 
- Create messaging extensions that include a configuration page and [Bot Service authentication](https://github.com/microsoft/BotBuilder-Samples#teams-samples).
- Create message extensions that accept search requests and return the results after the user has signed in.

| **Sample name** | **Description** | **.NET** | **Node.js** | **Python** |
|-----------------|-----------------|-------------|--------------|--------|
| Bot builder | To create messaging extensions. | [View](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/52.teams-messaging-extensions-search-auth-config) | [View](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/javascript_nodejs/52.teams-messaging-extensions-search-auth-config) | [View]( https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/python/50.teams-messaging-extension-search) |

## More code sample

> [!div class="nextstepaction"]
> [View more Bot Framework Samples on GitHub](https://github.com/OfficeDev/microsoft-teams-samples#messaging-extensions-samples-using-the-v4-sdk)

## See also

* [Tutorials Overview](code-samples.md) 
* [Create an app using React](first-app-react.md)
* [Create an app using Blazor](first-app-blazor.md)
* [Create an app using SPFx](first-app-spfx.md)
* [Create an app using C# or .NET](get-started-dotnet-app-studio.md)
* [Create an app using Node.js](get-started-nodejs-app-studio.md)
* [Create an app using Yeoman generator](get-started-yeoman.md)
* [Create a conversational bot app](first-app-bot.md)
* [Code Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples)
