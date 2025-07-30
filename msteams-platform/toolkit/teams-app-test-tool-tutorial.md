---
title: Microsoft 365 Agents Playground to Debug AI Chatbot
author: surbhigupta 
description: Learn how to create project workspace, build, run, and debug AI chat bot using Microsoft 365 Agents Playground and about activity triggers.
ms.author: surbhigupta 
ms.localizationpriority: high
ms.topic: overview
ms.date: 07/30/2025
---

# Debug your AI chat bot using Microsoft 365 Agents Playground

Start Microsoft Teams app development with your Teams AI chat bot app and debug with Microsoft 365 Agents Playground (previously known as Teams App Test Tool). Agents Playground makes debugging bot-based apps effortless. You don't need a Microsoft 365 developer account, tunneling, or Teams app and bot registration to use Agents Playground.

You can chat with your bot and view the messages and Adaptive Cards as they appear in Teams. You can also mock an activity in Agents Playground using activity triggers.

> [!NOTE]
>
> * Agents Playground is available only in v5.4.0 of Microsoft 365 Agents Toolkit (previously known as Teams Toolkit).
> * Agents Playground is supported only for desktop and web clients.

This step-by-step guide helps you to build an AI chat bot using Agents Toolkit and debug with the Test Tool. You'll see the following output after you've completed this guide, where the user can access and use the AI chat bot:

:::image type="content" source="../assets/images/toolkit-v2/debug/test-tool.png" alt-text="Screenshot shows the bot open in Test Tool." lightbox="../assets/images/toolkit-v2/debug/test-tool.png":::

## Prerequisites

<details>
<summary><b>Ensure you install the following tools for building and deploying your apps.</b></summary>

| Install | For using... |
| --- | --- |
| [Visual Studio Code](https://code.visualstudio.com/download) or  [Visual Studio](https://visualstudio.microsoft.com/downloads/) | JavaScript, TypeScript, or C# build environments. Use the latest version. |
| [Microsoft 365 Agents Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) | Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use Agents Toolkit v5.4.0. For more information, see [install Agents Toolkit](/microsoftteams/platform/toolkit/install-agents-toolkit?tabs=vscode&pivots=visual-studio-code-v5#install-agents-toolkit-for-visual-studio-code).|
| [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
| [OpenAI](https://openai.com/api/) or  [Azure OpenAI](https://oai.azure.com/portal)| First create your OpenAI API key to use OpenAI's GPT. If you want to host your app or access resources in Azure, you must create an Azure OpenAI service.|
| [Microsoft Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |

</details>

## Create project workspace for your AI chat bot app

<details>
<summary><b>Let's create your AI chat bot app.</b></summary>

The bot capability of a Teams app creates a chatbot or a conversational bot. It communicates with a web service, facilitating the use of its services. The bot can execute simple, automated tasks such as delivering customer service. You can get weather forecast, make reservations, or any other service offered using a conversational bot.

:::image type="content" source="~/assets/images/toolkit-v2/first-bot/your-helloworld-app-bot.png" alt-text="Screenshot shows you the app with three features. Bot is highlighted.":::

As you've already prepared for creating these apps, you can set up a new Teams project for creating the AI chat bot app.

In this tutorial, learn:

1. [Create your bot project workspace.](#create-your-bot-project-workspace)
1. [Take a tour of the bot app source code.](#take-a-tour-of-the-bot-app-source-code)

### Create your bot project workspace

If the prerequisites are in place, let's begin!

1. Open **Visual Studio Code**.

1. Select the Microsoft 365 Agents Toolkit :::image type="icon" source="~/assets/images/toolkit-v2/toolkit-sidebar-icon.PNG" border="false"::: icon in the Visual Studio Code **Activity Bar**.

1. Select **Create a New Agent/App**.

    :::image type="content" source="~/assets/images/toolkit-v2/create-project.png" alt-text="Screenshot shows the location of the Create New Project link in the Agents Toolkit sidebar.":::

1. Select **Agents for Teams** > **Azure OpenAI** > enter an input in **Input Azure API service key now**

    :::image type="content" source="~/assets/images/toolkit-v2/first-bot/create-newapp.png" alt-text="Screenshot shows the Agents Toolkit app templates.":::

1. Select **Basic Agents for Teams**. If you need a different functionality for your bot, select the required option.

    :::image type="content" source="~/assets/images/toolkit-v2/debug/ai-chat-bot.png" alt-text="Screenshot shows the app feature to add to your new app.":::

1. Select the programming language as **JavaScript**.

    :::image type="content" source="~/assets/images/agents-playground/select-language-bot.png" alt-text="Screenshot shows the option to select the programming language.":::

1. Select **Default folder**.

    :::image type="content" source="~/assets/images/toolkit-v2/first-bot/select-default-location.png" alt-text="Screenshot shows the selection of default location.":::

To change the default location, follow these steps:

1. Select **Browse**.

    :::image type="content" source="~/assets/images/toolkit-v2/first-bot/select-browse.png" alt-text="Screenshot shows the selection of browse location option.":::

1. Select the location for the project workspace.
1. Select **Select Folder**.

    :::image type="content" source="~/assets/images/toolkit-v2/select-folder.png" alt-text="Screenshot shows the folder to select.":::

1. Enter a suitable name for your app and then select the **Enter** key.

    :::image type="content" source="../assets/images/toolkit-v2/first-bot/hello-bot.png" alt-text="Screenshot shows where to enter the app name.":::

    A dialog appears, where you need to choose yes or no to trust the authors of the files in this folder.

    :::image type="content" source="../assets/images/toolkit-v2/first-bot/vsc-trust-authors.png" alt-text="Screenshot shows the dialog to trust or not the authors of the files in this folder.":::

Now, you've successfully created your AI chat bot project workspace.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Create+your+bot+project+workspace&author=surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fsbs-teams-app-test-tool%3Ftutorial-step%3D2&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fsbs-teams-app-test-tool.yml%23&documentVersionIndependentId=c3a2f604-cd95-7c37-210d-699e7cccec5e&platformId=ff9aea10-b1b0-f61e-abba-675eaefa2144&metadata=%2A%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A%2A%2BService%253A%2B%2Amsteams)

#### Take a tour of the bot app source code

After you finish scaffolding, explore the project directories and files in the **EXPLORER** section of the Visual Studio Code.

:::image type="content" source="../assets/images/agents-playground/source-code.png" alt-text="Screenshot shows the Teams Toolkit sample bot folder Structure.":::

| Folder or file name | Contents |
| --- | --- |
| `env/.env.playground` | The configuration file with environment variables that can be committed to Git.  |
| `env/.env.playground.user` |The configuration file with environment variables, including credentials, which aren't committed to Git by default.  |
| `appPackage` | App manifest template files and app icons (color.png and outline.png). |
| `appPackage/manifest.json` | App manifest for running the app in local and remote environment.  |
|`src/app.js`| Handles business logics for the AI chat bot.|
|`m365agents.yml`| This is the main Agents Toolkit project file. The project file defines two primary things:  Properties and configuration and stage definitions. |
|`m365agents.local.yml`|This overrides `m365agents.yml` with actions that enable local execution and debugging.|
|`m365agents.playground.yml`|This overrides `m365agents.yml` with actions that enable local execution and debugging in Test Tool.|

[Back to top](#debug-your-ai-chat-bot-using-microsoft-365-agents-playground)

</details>

## Build and run your AI chat bot app

<details>
<summary><b>After you set up your project workspace with Agents Toolkit, build your AI chat bot project.</b></summary>

### Create Open AI key and endpoint for your AI chat bot

1. Go to [Azure portal](https://ms.portal.azure.com/).

1. Select **Create a resource** and search for Azure Open AI.

1. Select **Azure Open AI** and select **Create**.

    :::image type="content" source="~/assets/images/agents-playground/azure-open-ai.png" alt-text="Screenshot shows the Azure open AI in Azure portal.":::

1. Fill the required details and select **Next**.

    :::image type="content" source="~/assets/images/agents-playground/azure-open-ai-resource.png" alt-text="Screenshot shows you the Azure open AI subscription and resource group.":::

1. Select **All networks, including the internet, can access this resource** and then select **Next**.

    :::image type="content" source="~/assets/images/agents-playground/azure-open-ai-network.png" alt-text="Screenshot shows the Azure open AI network details.":::

1. Fill the required details and select **Next**.

    :::image type="content" source="../assets/images/agents-playground/azure-open-ai-tags.png" alt-text="Screenshot shows the Azure open AI tags details.":::

1. Select **Create**.

    :::image type="content" source="../assets/images/agents-playground/review-create.png" alt-text="Screenshot shows you to preview and create Azure open AI.":::

You've successfully created key and endpoint for your AI chat bot.

:::image type="content" source="~/assets/images/agents-playground/deployment.png" alt-text="Screenshot shows the deployment of the Azure open AI.":::

>[!NOTE]
> You can also get OpenAI API key to debug your AI chat bot. For more information, see [setup your API key](https://platform.openai.com/docs/quickstart/step-2-setup-your-api-key).

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Create+Open+AI+key+and+endpoint+for+your+AI+chat+bot&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftoolkit%2Fteams-app-test-tool-tutorial%23create-open-ai-key-and-endpoint-for-your-ai-chat-bot&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fsbs-teams-test-app-tool-debug-ai-chatbot%2Fmsteams-platform%2Ftoolkit%2Fteams-app-test-tool-tutorial.md&documentVersionIndependentId=f9d53e1b-f03a-4ec3-07b7-f79b8ec9cc40&platformId=6855fa3b-30da-5749-8371-2461b1c0ec29)

#### Get Azure Open AI keys and endpoint

1. Select **Go to resources**.

    :::image type="content" source="../assets/images/agents-playground/deployment-azure.png" alt-text="Screenshot shows you the deployment of the Azure open AI.":::

1. Select **Keys and Endpoint** from the left pane and copy the **KEY** and **Endpoint**. You can copy either **KEY 1** or **KEY 2**.

    :::image type="content" source="~/assets/images/agents-playground/key-endpoints.png" lightbox="~/assets/images/agents-playground/key-endpoints.png" alt-text="Screenshot shows the keys and endpoints.":::

    Save the **KEY** and **Endpoint** for further use.

1. Select **Model deployments** from the left pane and select **Manage Deployments**.

    :::image type="content" source="~/assets/images/agents-playground/model-deployments.png" lightbox="~/assets/images/agents-playground/model-deployments.png" alt-text="Screenshot shows the model deployment for Azure open AI.":::

    The Azure Open AI Studio window appears.

1. Select **Deployments** from the left pane and select **+ Create new deployments**.

    :::image type="content" source="~/assets/images/agents-playground/ai-studio.png" lightbox="~/assets/images/agents-playground/ai-studio.png" alt-text="Screenshot shows the model deployments for Azure open AI.":::

1. Select the following details:

1. Select **gpt-35-turbo** from the **Select a model** dropdown list.

    > [!NOTE]
    > Only **gpt-35-turbo** model is supported for the AI chat bot.

1. Select **0301 (Default)** from the **Model version** dropdown list.
1. Enter **Deployment name** and select **Create**.

    :::image type="content" source="~/assets/images/agents-playground/model-version.png" lightbox="~/assets/images/agents-playground/model-version.png" alt-text="Screenshot shows the model and version for Azure open AI deployment.":::

1. Copy and save the **Deployment name** for further use.

    :::image type="content" source="~/assets/images/agents-playground/copy-deployment.png" lightbox="~/assets/images/agents-playground/copy-deployment.png" alt-text="Screenshot shows the deployment name for Azure open AI deployment.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Create+Open+AI+key+and+endpoint+for+your+AI+chat+bot&author=surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftoolkit%2Fteams-app-test-tool-tutorial%23get-azure-open-ai-keys-and-endpoint&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fsbs-teams-test-app-tool)

### Update Azure Open AI key and endpoints

1. Open your project in Visual Studio Code.

1. Under **EXPLORER**, go to **env** > **.env.playground.user** file.

1. Enter your **SECRET_AZURE_OPENAI_API_KEY** and **SECRET_AZURE_OPENAI_ENDPOINT**.

    ```text
    ...
    SECRET_AZURE_OPENAI_API_KEY=<azure-openai-api-key>
    SECRET_AZURE_OPENAI_ENDPOINT=<azure-openai-endpoint>
    ```

1. Go to **src** > **app.js** file.

1. Comment the `OpenAI` code and uncomment the `Azure OpenAI` code.

1. Enter your Azure Open AI deployment name in `azureDefaultDeployment`.

    ```JavaScript
    ...
    // Use OpenAI
    // apiKey: config.openAIKey,
    // defaultModel: "gpt-3.5-turbo",

    azureApiKey: config.azureOpenAIKey,
    azureDefaultDeployment: "gpt-35-turbo",
    azureEndpoint: config.azureOpenAIEndpoint,
    ...
    ```

### Debug and run your AI chat bot app

1. From the left pane, select **RUN and DEBUG** (Ctrl+Shift+D), and then select **Debug in Agents Playground** from the dropdown list.

    :::image type="content" source="~/assets/images/toolkit-v2/debug/select-debug-in-test-tool.png" lightbox="~/assets/images/toolkit-v2/debug/select-debug-in-test-tool.png" alt-text="Screenshot shows the option to select debug in Agents Playground.":::

1. Agents Playground opens your AI chat bot in a webpage.

    :::image type="content" source="~/assets/images/toolkit-v2/debug/test-tool.png" lightbox="~/assets/images/toolkit-v2/debug/test-tool.png" alt-text="Screenshot shows the bot open in Test Tool.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Create+Open+AI+key+and+endpoint+for+your+AI+chat+bot&author=surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftoolkit%2Fteams-app-test-tool-tutorial%23debug-and-run-your-ai-chat-bot-app&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fsbs-teams-test-app-tool-debug-ai-chatbot%2Fmsteams-platform%2Ftoolkit%2Fteams-app-test-tool-tutorial.md&documentVersionIndependentId=f9d53e1b-f03a-4ec3-07b7-f79b8ec9cc40&platformId=6855fa3b-30da-5749-8371-2461b1c0ec29&metadata=%2A%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A%2A%2BService%253A%2B%2Amsteams)

[Back to top](#debug-your-ai-chat-bot-using-microsoft-365-agents-playground)

</details>

## Activity triggers

<details>
<summary><b>You can mock an activity in Agents Playground using activity triggers.</b></summary>

There are two types of activity triggers:

1. [Predefined activity triggers](#predefined-activity-triggers)
1. [Custom activity triggers](#custom-activity-triggers)

### Predefined activity triggers

Agents Playground provides predefined activity triggers to test the functionalities of your bot.

| Category | Activity | Handler |
| --- | --- | --- |
| Trigger Installation Update Activity | Install bot <br><br><br> Uninstall bot | `onInstallationUpdate` <br> `onInstallationUpdateAdded` <br><br> `onInstallationUpdate` <br> `onInstallationUpdateRemove`|
| Trigger Conversation Update Activity | Add user <br><br><br> Add bot <br><br><br> Add channel | `onMembersAdded` <br> `onTeamsMembersAddedEvent` <br><br> `onMembersAdded` <br> `onTeamsMembersAddedEvent` <br><br> `onTeamsChannelCreatedEvent` |
| | Remove user <br><br><br> Remove bot <br><br><br> Remove channel <br><br> Remove team | `onMembersRemoved` <br> `onTeamsMembersRemovedEvent` <br><br> `onMembersRemoved` <br> `onTeamsMembersRemovedEvent` <br><br> `onTeamsChannelDeletedEvent` <br><br> `onTeamsTeamDeletedEvent` |
| | Rename channel <br><br> Rename team | `onTeamsChannelRenamedEvent` <br><br> `onTeamsTeamRenamedEvent` |

> [!NOTE]
> All types of activities aren't available in all scopes. For example, you can't add or remove a channel in a personal chat or a group chat.

Predefined activity triggers are available in the **Mock an Activity** menu in Agents Playground.

To mock an **Add user** activity, follow these steps:

1. In Agents Playground, go to **Mock an Activity** > **Add user**.

    :::image type="content" source="../assets/images/toolkit-v2/debug/add-user.png" alt-text="Screenshot shows the add user option under mock an activity.":::

    A dialog appears to preview the activity handler.

1. Select **Send activity**.

    :::image type="content" source="../assets/images/toolkit-v2/debug/add-a-user-request.png" alt-text="Screenshot shows the option to send activity for predefined mock activity add user.":::

    Bot sends the following response:

    :::image type="content" source="~/assets/images/toolkit-v2/debug/add-a-user-response.png" alt-text="Screenshot shows the response of predefined mock activity add user.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Create+Open+AI+key+and+endpoint+for+your+AI+chat+bot&author=surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftoolkit%2Fteams-app-test-tool-tutorial%23predefined-activity-triggers&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fsbs-teams-test-app-tool-debug-ai-chatbot%2Fmsteams-platform%2Ftoolkit%2Fteams-app-test-tool-tutorial.md&documentVersionIndependentId=f9d53e1b-f03a-4ec3-07b7-f79b8ec9cc40&platformId=6855fa3b-30da-5749-8371-2461b1c0ec29&metadata=%2A%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A%2A%2BService%253A%2B%2Amsteams)

### Custom activity triggers

You can use **Custom activity** to customize activity triggers, for example, `reactionsAdded` to meet the requirements of your bot app. Agents Playground automatically populates the required properties of the activity. You can also modify the activity type and add more properties.

1. Select **Mock an Activity** > **Custom activity**.

    :::image type="content" source="../assets/images/toolkit-v2/debug/mock-activity.png" alt-text="Screenshot shows the list of option under mock an activity.":::

1. Add `messageReaction` to customize the activity under the `type` property:

    ```json
    {
        "type": "messageReaction",
        "reactionsAdded": [
        {
            "type": "like"
        }
        ],
        "replyToId": "d60fd1cb-3e8f-44ef-849c-404806ba1b47"
    }
    ```

1. Select **Send activity**.

    :::image type="content" source="~/assets/images/toolkit-v2/debug/custom-activity-request.png" alt-text="Screenshot shows the option to send activity after customization on mock activity.":::

    Bot sends an `onReactionsAdded` handler in response.

    :::image type="content" source="../assets/images/toolkit-v2/debug/custom-activity-response.png" alt-text="Screenshot shows the response of custom mock activity.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Create+Open+AI+key+and+endpoint+for+your+AI+chat+bot&author=surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftoolkit%2Fteams-app-test-tool-tutorial%23custom-activity-triggers&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fsbs-teams-test-app-tool-debug-ai-chatbot%2Fmsteams-platform%2Ftoolkit%2Fteams-app-test-tool-tutorial.md&documentVersionIndependentId=f9d53e1b-f03a-4ec3-07b7-f79b8ec9cc40&platformId=6855fa3b-30da-5749-8371-2461b1c0ec29&metadata=%2A%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A%2A%2BService%253A%2B%2Amsteams)

[Back to top](#debug-your-ai-chat-bot-using-microsoft-365-agents-playground)

</details>

## Complete challenge

<details>
<summary><b>Test your app</b></summary>
Did you come up with output like this?

:::image type="content" source="~/assets/images/toolkit-v2/debug/test-tool.png" lightbox="~/assets/images/toolkit-v2/debug/test-tool.png" alt-text="Screenshot shows the bot open in Test Tool.":::

Congratulations! You've successfully created an AI chat bot app. Now, you've learned to debug your AI chat bot app in Agents Playground.

</details>

> [!div class="nextstepaction"]
> [Back to Microsoft 365 Agents Playground](debug-your-agents-playground.md)
