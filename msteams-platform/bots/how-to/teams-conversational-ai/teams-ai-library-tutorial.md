---
title: Tutorial - Build Custom Engine Agent
description: Learn how to create a custom engine agent using Microsoft 365 Agents Toolkit and configure custom engine agent.
ms.localizationpriority: high
ms.date: 07/29/2025
ms.topic: conceptual
ms.author: surbhigupta
---

# Build a custom engine agent

This tutorial shows how to create a custom engine agent using Microsoft 365 Agents Toolkit (previously known as Teams Toolkit) with OpenAI.

In this tutorial, learn:

* How to create a new custom engine agent with Agents Toolkit.
* How to interact with your Large Language Models (LLMs) and data.
* How the project workspace of your custom engine agent is structured.
* How to configure your custom engine agent and test it in Agent Playground

> [!NOTE]
>
> * Custom engine agent support for Microsoft 365 Copilot Chat is available only in [Public developer preview for Teams](../../../resources/dev-preview/developer-preview-intro.md)
> * Custom engine agent isn't supported in Python.

## Prerequisites

<details>
<summary><b>Ensure you install the following tools for building and deploying your apps.</b></summary>

| Install | For using... |
| --- | --- |
| [Agents Toolkit](~/toolkit/install-Teams-Toolkit.md) | A Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use the latest version. |
| [Node.js and Node Package Manager (NPM)](https://nodejs.org/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
| [Microsoft Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |
| [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or SharePoint Framework (SPFx) build environments. Use the latest version. |
| [OpenAI](https://platform.openai.com/docs/quickstart/build-your-application) |First create your OpenAI API key to use OpenAI's  Generative Pre-trained Transformer (GPT). If you want to host your app or access resources in Microsoft Azure, you must create an [Azure OpenAI service](/azure/ai-services/openai/how-to/create-resource?pivots=web-portal) before you begin. |

[!INCLUDE [custom-engine-agent](../../../includes/custom-engine-agent.md)]

[Back to top](#build-a-custom-engine-agent)

</details>

## Create your custom engine agent

<details>
<summary><b>Use Agents Toolkit to create a new custom engine agent.</b></summary>

1. Go to **Visual Studio Code**.

1. Select the Microsoft 365 Agents Toolkit :::image type="icon" source="../../../assets/images/toolkit-v2/toolkit-sidebar-icon.png" border="false"::: icon in the Visual Studio Code Activity Bar.

1. Select **Create a New App**.

    :::image type="content" source="../../../assets/images/bots/create-a-new-app.png" alt-text="Screenshot shows how to create a new app in Visual Studio Code.":::

1. Select **Custom Engine Agent**.

    :::image type="content" source="../../../assets/images/bots/custom-copilot.png" alt-text="Screenshot shows custom engine agent option in Visual Studio Code.":::

1. Select **Basic AI Chatbot**.

    :::image type="content" source="../../../assets/images/bots/basic-ai-chatbot.png" alt-text="Screenshot shows basic ai chatbot in Visual Studio Code.":::

1. Select **JavaScript** as the programming language.

    :::image type="content" source="../../../assets/images/bots/programming-language.png" alt-text="Screenshot shows programming language in Visual Studio Code.":::

1. Select **OpenAI**.

    :::image type="content" source="../../../assets/images/bots/service-for-llm.png" alt-text="Screenshot shows the TypeScript option for programming language in Agents Toolkit.":::

1. Enter **OpenAI Key**.

1. Select **Default folder** to store your project root folder in default location.

    :::image type="content" source="../../../assets/images/sbs-command-bot/select-default-location.png" alt-text="Screenshot shows the selection of default location.":::

    You can also change the default location by the following steps:

1. Select **Browse**.

    :::image type="content" source="../../../assets/images/toolkit-v2/first-bot/select-browse.png" alt-text="Screenshot shows the selection of browse location option.":::

1. Select the location for project workspace.

1. Select the **Select Folder**.

    :::image type="content" source="../../../assets/images/toolkit-v2/select-folder.png" alt-text="Screenshot shows the folder to select.":::

1. Enter a suitable name for your app and then select **Enter**.

    :::image type="content" source="../../../assets/images/toolkit-v2/first-bot/hello-bot.png" alt-text="Screenshot shows where to enter the app name.":::

    A dialog appears. Select **Yes, I trust the authors** or **No, I don’t trust the authors** based on your requirement.

    :::image type="content" source="../../../assets/images/toolkit-v2/first-bot/vsc-trust-authors.png" alt-text="Screenshot shows the dialog to trust or not the authors of the files in this folder." lightbox="../../../assets/images/toolkit-v2/first-bot/vsc-trust-authors.png":::

Your custom engine agent is created in a few seconds.

:::image type="content" source="../../../assets/images/toolkit-v2/first-bot/app-created-bot.png" alt-text="Screenshot shows the app created." lightbox="../../../assets/images/toolkit-v2/first-bot/app-created-bot.png":::

After your app is created, Agents Toolkit displays the following message:

:::image type="content" source="../../../assets/images/toolkit-v2/first-bot/preview-project.png" alt-text="Screenshot shows the message that the feature is successfully created.":::

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI%20ran%20into%20an%20issue%5D%20Create%20your%20custom%20engine%20agent&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fteams-conversational-ai%2Fteams-ai-library-tutorial%23create-your-custom-engine-agent&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fsbs-custom-engine-agent%2Fmsteams-platform%2Fbots%2Fhow-to%2Fteams-conversational-ai%2Fteams-ai-library-tutorial.md&documentVersionIndependentId=30520f47-60d6-893d-3020-e23a933334b2&platformId=f32e246a-131e-6b79-26c8-fd7f79709de2)

### Take a tour of the source code

Have a look at what's inside this custom engine agent > Basic AI Chatbot template.

| Folder name | Contents |
| --- | --- |
| `.vscode` | Visual Studio Code files for debugging. |
| `appPackage` | Templates for the Teams application manifest. |
| `env` | Name or value pairs are stored in environment files and used by m365agents.yml to customize the provisioning and deployment rules. |
| `infra` | Templates for provisioning Azure resources. |
| `src/`| The source code for the notification Teams application. |
| `src/index.js`| Sets up the bot app server. |
| `src/adapter.js`| Sets up the bot adapter. |  
| `src/config.js`| Defines the environment variables. |
| `src/prompts/chat/skprompt.txt`| Defines the prompt. |
| `src/prompts/chat/config.json`| Configures the prompt. |
| `src/app/app.js`| Handles business logics for the Basic AI Chatbot. |
| `m365agents.yml` | Main project file describes your application configuration and defines the set of actions to run in each lifecycle stages. |
| `m365agents.local.yml` | This override `m365agents.yml` with actions that enable local execution and debugging. |
| `m365agents.playground.yml` | This override `m365agents.yml` with actions that enable local execution and debugging in Microsoft 365 Agents Playground (previously known as Teams App Test Tool).|

[Back to top](#build-a-custom-engine-agent)

</details>

## Configure and debug your custom engine agent

<details>

<summary><b>Customize the prompt for your custom engine agent.</b></summary>

After you create your custom engine agent, let's configure it.

1. Go to `src/prompts/chat/skprompt.txt` and update the following code in `skprompt.txt` file:

    ```skprompt.txt
    The following is a conversation with an AI assistant, who is an expert on answering questions over the given context.
    Responses should be in a short journalistic style with no more than 80 words. 
    ```

    :::image type="content" source="../../../assets/images/bots/prompts-chat.png" alt-text="Screenshot shows skprompt in explorer in Visual Studio Code.a":::

1. From the left pane, select **Run and Debug (Ctrl+Shift+D)**.

1. Select **Debug in Microsoft 365 Agents Playground**.

    > [!NOTE]
    > If you want to debug in either Teams or Copilot, select **"Debug in Teams** or **Debug in Copilot**.

1. Select the **F5** key.

    :::image type="content" source="../../../assets/images/bots/debug-in-test-tool.png" alt-text="Screenshot shows the debug in Agents Playground.":::

1. Custom engine agent runs within Agents Playground, which opens in your browser.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI%20ran%20into%20an%20issue%5D%20Create%20your%20custom%20engine%20agent&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fteams-conversational-ai%2Fteams-ai-library-tutorial%23configure-and-debug-your-custom-engine-agent&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fsbs-custom-engine-agent%2Fmsteams-platform%2Fbots%2Fhow-to%2Fteams-conversational-ai%2Fteams-ai-library-tutorial.md&documentVersionIndependentId=30520f47-60d6-893d-3020-e23a933334b2&platformId=f32e246a-131e-6b79-26c8-fd7f79709de2)

[Back to top](#build-a-custom-engine-agent)

</details>

## Complete challenge

<details>
<summary><b>Test your custom engine agent.</b></summary>

In Agents Playground, ask questions related to your document and chat with your custom engine agent to learn more about your data.

:::image type="content" source="../../../assets/images/bots/teams-app-test-tool.png" alt-text="Screenshot shows the Agents Playground.":::

Congratulations, you completed this tutorial!

[Back to top](#build-a-custom-engine-agent)

</details>

> [!div class="nextstepaction"]
> [Back to Custom engine agent overview](/microsoft-365-copilot/extensibility/overview-custom-engine-agent)
