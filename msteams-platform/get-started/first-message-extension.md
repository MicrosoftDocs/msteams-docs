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

1. Select the Teams Toolkit :::image type="icon" source="../assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.png"::: icon in the Visual Studio Code sidebar.

1. Select **Create New Project** from the left-hand side of the Toolkit. The UI may look different, depending on your operating system.

1. Then, select **Create New Project** from the dropdown menu in the Teams Toolkit.

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/create-new-app.png" alt-text="Wizard start for Create New Project" border="false":::

1. In the **Select capabilities** section, select **Message Extension**, deselect **Tab**, and select **OK**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/select-capabilities-msgext.png" alt-text="Screenshot showing how to add capabilities to your new app." border="false":::

1. In the **Bot registration** section, select **Create a new bot registration**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/create-bot-registration.png" alt-text="Select create a new bot registration" border="false":::

   > [!NOTE]
   > Messaging extensions rely on bots to provide a dialog between the user and your code.

1. In the **Programming Language** section, select **JavaScript**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-bot/select-language.png" alt-text="Screenshot showing how to select the programming language." border="false":::

1. Select a workspace folder.  A folder is created in your workspace folder for the project.

1. Enter a suitable name for your app. Ensure that the app's name is alphanumeric. Select **Enter** to continue.

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

:::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/code-tree.png" alt-text="File layout of a bot project" border="false":::

The bot code is stored in the `bot` directory. The `bot/messageExtensionBot.js` is the main entry point for the messaging extension.

> [!Tip]
> Familiarize yourself with bots outside of Teams before you integrate your first bot within Teams.  You can find more information about bots by reviewing the [Azure Bot Service](/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0&preserve-view=true) tutorials.

## Prepare the local environment

You can use the Teams Toolkit to run your app in the local environment. 

When you completed the [Hello world](first-app-react.md), in your Toolkit you should already have:

- signed in to Microsoft 365 account
- signed in to Azure account

Also you need:

- Install [ngrok](https://ngrok.io), which is used to provide a tunnel between Teams and your bot code
- Set up and authenticate ngrok on your local environment. (Please refer the instructions on [ngrok](https://ngrok.io) website)

## Run your app locally

To build and run your app locally:

1. From Visual Studio Code, select **F5** to run your application in debug mode.

   > When you run the app for the first time, all dependencies are downloaded and the app is built.  A browser window opens when the build is complete. This can take 3-5 minutes to complete.

1. Teams opens in a web browser. If you're prompted to open Microsoft Teams, select **Cancel** to remain in the browser. Sign in with your Microsoft 365 account when prompted.

1. Select **Add** to add the app to your account.

1. Once the sample app is loaded, try the app: 
   
   1. Initiate a new conversation
   2. Launch the message extension from three dots in the composing area 
   3. Select the message extension app you just installed 

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/msgext-app-sample-open.png" alt-text="Screenshot that shows how to open the sample messaging extension app" border="false":::
   
   This sample app lets you search npm packages. Let's type some name in the search box, such as "cli":

    :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/msgext-app-sample-search.png" alt-text="Screenshot that shows how to use the sample app" border="false":::

   Then, select one of the search results. You can send the result displayed in the Adaptive Card to the channel as a message!
   
   :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/msgext-app-sample-result.png" alt-text="Screenshot that shows the search result" border="false":::

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

To run your app in Teams, you must have a Microsoft 365 development account that allows app sideloading. For more information on account opening, see [Prerequisites](prerequisites.md#set-up-your-teams-development-tenant).

> [!TIP]
> Check for issues before sideloading your app, using the [app validation tool](https://dev.teams.microsoft.com/appvalidation.html), which is included in the toolkit. Fix the errors to sideload the app.
</details>

<!-- markdownlint-disable MD033 -->

<details>
<summary>Learn what happens when you deployed your app to Azure</summary>

Before deployment, the application runs in the local environment:

1. The backend runs using _Azure Functions Core Tools_.
1. The application HTTP endpoint, where Microsoft Teams loads the application, runs locally.

Deployment involves two steps. First, you provision resources on an active Azure subscription. Then, you deploy (upload) the backend and frontend code for the application to Azure. The backend uses various Azure services, including Azure App Service and Azure Bot Service.

</details>

Now, you have learned how to build and run a basic message extension.

## Next step

> [!div class="nextstepaction"]
> [Deploy your app in Azure](../get-started/get-started-deploy-teams-app-azure.md)

Or keep reading to add more features to the app.

## Add a configuration page to your messaging extension

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
