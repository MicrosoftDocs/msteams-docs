---
title: Teams Developer Documentation Tutorials
description: Learn about the tutorials available for Teams developer documentation.
ms.localizationpriority: high
ms.topic: reference
ms.date: 12/02/2025
---

<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD024 -->
<!-- markdownlint-disable MD001 -->

# Tutorials

In this article, learn more about building Teams app capabilities. Here's a list of the step-by-step guides available for Teams platform capabilities.

| # | Capability | Step-by-step guide |
| --- | --- | --- |
| 1. | Bots  | - [Debug your AI chat bot using Microsoft 365 Agents Playground](#debug-your-ai-chat-bot-using-microsoft-365-agents-playground) <br> - [Build a bot with SSO authentication](#build-a-bot-with-sso-authentication) |
| 2. | Message extension | [Build API-based message extension](#build-api-based-message-extension) |

## Debug your AI chat bot using Microsoft 365 Agents Playground

Start Microsoft Teams app development with your Teams AI chat bot app and debug with Microsoft 365 Agents Playground (previously known as Teams App Test Tool). Agents Playground makes debugging bot-based apps effortless. You don't need a Microsoft 365 developer account, tunneling, or Teams app and bot registration to use Agents Playground.

<br>

<details>
<summary><b>Tutorial: Debug your AI chat bot</b></summary>

### Prerequisites

You can chat with your bot and view the messages and Adaptive Cards as they appear in Teams. You can also mock an activity in Agents Playground using activity triggers.

> [!NOTE]
>
> - Agents Playground is available only in v5.4.0 of Microsoft 365 Agents Toolkit (previously known as Teams Toolkit).
> - Agents Playground is supported only for desktop and web clients.

This step-by-step guide helps you to build an AI chat bot using Agents Toolkit and debug with the Test Tool. You'll see the following output after you've completed this guide, where the user can access and use the AI chat bot:

:::image type="content" source="../assets/images/toolkit-v2/debug/test-tool.png" alt-text="Screenshot shows the bot open in Test Tool." lightbox="../assets/images/toolkit-v2/debug/test-tool.png":::

| Install | For using... |
| --- | --- |
| [Visual Studio Code](https://code.visualstudio.com/download) or  [Visual Studio](https://visualstudio.microsoft.com/downloads/) | JavaScript, TypeScript, or C# build environments. Use the latest version. |
| [Microsoft 365 Agents Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) | Microsoft Visual Studio Code extension that creates a project scaffolding for your app. Use Agents Toolkit v5.4.0. For more information, see [install Agents Toolkit](/microsoftteams/platform/toolkit/install-agents-toolkit?tabs=vscode&pivots=visual-studio-code-v5#install-agents-toolkit-for-visual-studio-code).|
| [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. For more information, see [Node.js version compatibility table for project type](~/toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).|
| [OpenAI](https://openai.com/api/) or  [Azure OpenAI](https://oai.azure.com/portal)| First create your OpenAI API key to use OpenAI's GPT. If you want to host your app or access resources in Azure, you must create an Azure OpenAI service.|
| [Microsoft Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |

### Create project workspace for your AI chat bot app

The bot capability of a Teams app creates a chatbot or a conversational bot. It communicates with a web service, facilitating the use of its services. The bot can execute simple, automated tasks such as delivering customer service. You can get weather forecast, make reservations, or any other service offered using a conversational bot.

:::image type="content" source="~/assets/images/toolkit-v2/first-bot/your-helloworld-app-bot.png" alt-text="Screenshot shows you the app with three features. Bot is highlighted.":::

As you've already prepared for creating these apps, you can set up a new Teams project for creating the AI chat bot app.

#### Create your bot project workspace

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

    :::image type="content" source="../toolkit/toolkit-v4/sbs-v4/images-sbs/teams-toolkit-v4/first-bot/vsc-trust-authors.png" alt-text="Screenshot shows the dialog to trust or not the authors of the files in this folder.":::

Now, you've successfully created your AI chat bot project workspace.

##### Take a tour of the bot app source code

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

### Build and run your AI chat bot app

#### Create Open AI key and endpoint for your AI chat bot

1. Go to [Azure portal](https://ms.portal.azure.com/).
1. Select **Create a resource** and search for Azure Open AI.
1. Select **Azure Open AI** and select **Create**.

    :::image type="content" source="../assets/images/agents-playground/azure-open-ai.png" alt-text="Screenshot shows the Azure open AI in Azure portal.":::

1. Fill the required details and select **Next**.

    :::image type="content" source="../assets/images/agents-playground/azure-open-ai-resource.png" alt-text="Screenshot shows you the Azure open AI subscription and resource group.":::

1. Select **All networks, including the internet, can access this resource** and then select **Next**.

    :::image type="content" source="../assets/images/agents-playground/azure-open-ai-network.png" alt-text="Screenshot shows the Azure open AI network details.":::

1. Fill the required details and select **Next**.

    :::image type="content" source="../assets/images/agents-playground/azure-open-ai-tags.png" alt-text="Screenshot shows the Azure open AI tags details.":::

1. Select **Create**.

    :::image type="content" source="../assets/images/agents-playground/review-create.png" alt-text="Screenshot shows you to preview and create Azure open AI.":::

You've successfully created key and endpoint for your AI chat bot.

:::image type="content" source="~/assets/images/agents-playground/deployment.png" alt-text="Screenshot shows the deployment of the Azure open AI.":::

> [!NOTE]
> You can also get OpenAI API key to debug your AI chat bot. For more information, see [setup your API key](https://platform.openai.com/docs/quickstart/step-2-setup-your-api-key).

##### Get Azure Open AI keys and endpoint

1. Select **Go to resources**.

    :::image type="content" source="../assets/images/agents-playground/deployment-azure.png" alt-text="Screenshot shows you the deployment of the Azure open AI.":::

1. Select **Keys and Endpoint** from the left pane and copy the **KEY** and **Endpoint**. You can copy either **KEY 1** or **KEY 2**.

    :::image type="content" source="../assets/images/agents-playground/key-endpoints.png" lightbox="~/assets/images/agents-playground/key-endpoints.png" alt-text="Screenshot shows the keys and endpoints.":::

    Save the **KEY** and **Endpoint** for further use.

1. Select **Model deployments** from the left pane and select **Manage Deployments**.

    :::image type="content" source="../assets/images/agents-playground/model-deployments.png" lightbox="~/assets/images/agents-playground/model-deployments.png" alt-text="Screenshot shows the model deployment for Azure open AI.":::

    The Azure Open AI Studio window appears.

1. Select **Deployments** from the left pane and select **+ Create new deployments**.

    :::image type="content" source="../assets/images/agents-playground/ai-studio.png" lightbox="~/assets/images/agents-playground/ai-studio.png" alt-text="Screenshot shows the model deployments for Azure open AI.":::

1. Select the following details:

    1. Select **gpt-35-turbo** from the **Select a model** dropdown list.

    > [!NOTE]
    > Only **gpt-35-turbo** model is supported for the AI chat bot.

    1. Select **0301 (Default)** from the **Model version** dropdown list.
    1. Enter **Deployment name** and select **Create**.

        :::image type="content" source="../assets/images/agents-playground/model-version.png" lightbox="~/assets/images/agents-playground/model-version.png" alt-text="Screenshot shows the model and version for Azure open AI deployment.":::

    1. Copy and save the **Deployment name** for further use.

        :::image type="content" source="../assets/images/agents-playground/copy-deployment.png" lightbox="~/assets/images/agents-playground/copy-deployment.png" alt-text="Screenshot shows the deployment name for Azure open AI deployment.":::

#### Update Azure Open AI key and endpoints

1. Open your project in Visual Studio Code.
1. Under **EXPLORER**, go to **env** > **.env.playground.user** file.
1. Enter your **SECRET_AZURE_OPENAI_API_KEY** and **SECRET_AZURE_OPENAI_ENDPOINT**.

    ```json
    ...
    SECRET_AZURE_OPENAI_API_KEY=<azure-openai-api-key>
    SECRET_AZURE_OPENAI_ENDPOINT=<azure-openai-endpoint>
    ```

1. Go to **src** > **app.js** file.
1. Comment the `OpenAI` code and uncomment the `Azure OpenAI` code.
1. Enter your Azure Open AI deployment name in `azureDefaultDeployment`.

    ```JavaScript

    // Use OpenAI
    // apiKey: config.openAIKey,
    // defaultModel: "gpt-3.5-turbo",

    azureApiKey: config.azureOpenAIKey,
    azureDefaultDeployment: "gpt-35-turbo",
    azureEndpoint: config.azureOpenAIEndpoint,

    ```

#### Debug and run your AI chat bot app

1. From the left pane, select **RUN and DEBUG** (Ctrl+Shift+D), and then select **Debug in Agents Playground** from the dropdown list.

    :::image type="content" source="~/assets/images/toolkit-v2/debug/select-debug-in-test-tool.png" lightbox="~/assets/images/toolkit-v2/debug/select-debug-in-test-tool.png" alt-text="Screenshot shows the option to select debug in Agents Playground.":::

1. Agents Playground opens your AI chat bot in a webpage.

    :::image type="content" source="~/assets/images/toolkit-v2/debug/test-tool.png" lightbox="~/assets/images/toolkit-v2/debug/test-tool.png" alt-text="Screenshot shows the bot open in Test Tool.":::

### Activity triggers

There are two types of activity triggers:

#### Predefined activity triggers

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

#### Custom activity triggers

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

#### Complete challenge

Did you come up with output like this?

:::image type="content" source="~/assets/images/toolkit-v2/debug/test-tool.png" lightbox="~/assets/images/toolkit-v2/debug/test-tool.png" alt-text="Screenshot shows the bot open in Test Tool.":::

Congratulations! You've successfully created an AI chat bot app. Now, you've learned to debug your AI chat bot app in Agents Playground.

> [!div class="nextstepaction"]
> [Microsoft 365 Agents Playground](../toolkit/debug-your-agents-playground.md)

</details>

[Tutorials](#tutorials)

## Build API-based message extension

Message extensions built using API (API-based) significantly enhance the functionality of your Teams apps by allowing them to interact with external services. API-based message extensions can help streamline workflows by reducing the need to switch between different applications.

<br>

<details>
<summary><b>Tutorial: Build API-based message extension</b></summary>

> [!NOTE]
> API-based message extensions only support search commands.

You can use API-based message extensions to integrate external services that are commonly used in the business workflow. For example, a business that frequently uses a CRM system for customer management could use a message extension to fetch and display customer data directly from Teams. This app helps save time and improves efficiency by reducing the need to switch between different applications. This feature is supported on all platforms where Teams is available, including desktop, web, and mobile.

### Prerequisites for building a message extension

Here's a list of tools you need for building and deploying your apps.

| Install | For using... |
| --- | --- |
| [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings, or call - all in one place.|
| [Microsoft Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |
| [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or SharePoint Framework (SPFx) build environments. Use version 1.55 or later. |
| [Microsoft 365 developer account](../concepts/build-and-test/prepare-your-o365-tenant.md) | Access to Teams account with the appropriate permissions to install an app. |
| [Azure account](https://azure.microsoft.com/free/) | Access to Azure resources.|
|OpenAPI Description (OAD) document| A document that describes the capabilities of your API. For more information, see [OpenAPI Description](https://learn.openapis.org/specification/structure.html).|

### Set up your Teams development tenant

A **tenant** is like a space, or a container for your organization in Teams, where you chat, share files, and run meetings. This space is also where your upload and test your custom app. Let's verify if you're ready to develop with the tenant.

### Check for custom app upload option

After creating the app, you must load your app in Teams without distributing it. This process is known as custom app upload. Sign in to your Microsoft 365 account to view this option.

> [!NOTE]
> Custom app upload is necessary for previewing and testing apps in Teams local environment. If it isn't enabled, you can't preview and test your app in Teams local environment.

Do you already have a tenant, and do you have the admin access? Let's check if you really do!

Verify if you can upload a custom app in Teams:

1. In the Teams client, select the **Apps** icon.
1. Select **Manage your apps**.
1. Select **Upload an app**.
1. Look for the option to **Upload a custom app**. If you see the option, custom app upload is enabled.

    :::image type="content" source="~/assets/images/toolkit-v2/spfx-custom-new1.png" alt-text="Screenshot shows the bot home.":::

> [!NOTE]
> Contact your Teams administrator if you don't find the option to upload a custom app.

#### Create a free Teams developer tenant (optional)

If you don't have a Teams developer account, you can get it free. Join the Microsoft 365 developer program!

1. Go to the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
1. Select **Join Now** and follow the onscreen instructions.
1. In the welcome screen, select **Set up E5 subscription**.
1. Set up your administrator account. After you finish, the following screen appears.

   :::image type="content" source="../assets/images/toolkit-v2/prerequisites/microsoft-365.png" alt-text="Screenshot shows the Microsoft 365 Developer Program.":::

1. Sign in to Teams using the administrator account you just set up. Verify that you have the **Upload a custom app** option in Teams.

#### Get a free Azure account

If you want to host your app or access resources in Azure, you must have an Azure subscription. [Create a free account](https://azure.microsoft.com/free/) before you begin.

You have all the tools to set up your account. Next, let's set up your development environment and start building! Select the app you want to build first.

### Create OpenAPI Description document

OpenAPI Description (OAD) is the industry-standard specification that outlines how OpenAPI files are structured and outlined. It's a language-agnostic, human-readable format for describing APIs. It's easy for both humans and machines to read and write. The schema is machine-readable and represented in either YAML or JSON.

To interact with the APIs, an OpenAPI Description document is necessary. The OpenAPI Description document must meet the following criteria:

- The `auth` property must not be specified.
- JSON and YAML are the supported formats.
- OpenAPI Versions 2.0 and 3.0.x are supported.
- Teams doesn't support the oneOf, anyOf, allOf, and not (swagger.io) constructs.
- Constructing arrays for the request isn't supported, however, nested objects within a JSON request body are supported.
- The request body, if present, must be application/Json to ensure compatibility with a wide range of APIs.
- Define an HTTPS protocol server URL for the `servers.url` property.
- Only single parameter search is supported.
- Only one required parameter without a default value is allowed.
- Only POST and GET HTTP methods are supported.
- The OpenAPI Description document must have an `operationId`.
- The operation mustn't require Header or Cookie parameters without default values.
- A command must have exactly one parameter.
- Ensure that there are no remote references in the OpenAPI Description document.
- A required parameter with a default value is considered optional.

    We used the following OpenAPI Description as an example for this tutorial:

    <details>
    <summary>OpenAPI Description</summary>

    ```yml
        openapi: 3.0.1
        info:
        title: OpenTools Plugin
        description: A plugin that allows the user to find the most appropriate AI tools for their use cases, with their pricing information.
        version: 'v1'
        servers:
            - url: https://gptplugin.opentools.ai
        paths:
        /tools:
        get:
        operationId: searchTools
        summary: Search for AI Tools
            parameters:
            - in: query
              name: search
              required: true
              schema:
              type: string
              description: Used to search for AI tools by their category based on the keywords. For example, a search for "tool to create music" provides a list of tools that can create music.
            responses:
            "200":
              description: OK
              content:
              application/json:
                schema:
                $ref: '#/components/schemas/searchToolsResponse'
            "400":
              description: Search Error
              content:
              application/json:
                schema:
                ref: '#/components/schemas/searchToolsError'
            components:
            schemas:
            searchToolsResponse:
            required:
            - search
            type: object
            properties:
            tools:
            type: array
            items:
            type: object
            properties:
            name:
            type: string
            description: The name of the tool.
            opentools_url:
            type: string
            description: The URL to access the tool.
            main_summary:
            type: string
            description: A summary of what the tool is.
            pricing_summary:
            type: string
            description: A summary of the pricing of the tool.
            categories:
            type: array
            items:
            type: string
            description: The categories assigned to the tool.
            platforms:
            type: array
            items:
            type: string
            description: The platforms that this tool is available on.
            description: The list of AI tools.
            searchToolsError:
            type: object
            properties:
            message:
            type: string
            description: Message of the error.
    
    ```

    > [!NOTE]
    > Ensure that the `required: true` property is available for only one parameter. If there are more than one required parameters, you can update the required property to `required: false` for the other parameters.

    </details>

You can validate if the OpenAPI Description document is valid. To verify, follow these steps:

1. Go to [Swagger or OpenAPI validator](https://apitools.dev/swagger-parser/) and validate the OpenAPI Description document.
1. Save the OpenAPI Description document.
1. Go to [Swagger Editor](https://editor.swagger.io/).
1. In the left pane, paste the OpenAPI Description in the editor.
1. In the right pane, select **GET**.
1. Select **Try it out**.
1. Enter the values for the **search** parameter as **Tool to create music**.
1. Select **Execute**. The swagger editor displays a response with a list of products.

    :::image type="content" source="../assets/images/Copilot/api-me-sbs-execute-get-response.png" alt-text="Screenshots shows the parameters, its values, and the **EXECUTE** option in the swagger editor.":::

1. Go to **Server response** > **Response Body**.
1. Under `products`, copy the first product from the list and save it for future reference.

    :::image type="content" source="../assets/images/Copilot/api-me-sbs-product-response.png" alt-text="Screenshots shows the highlighted product that is selected from the response body.":::

### Create response rendering template

An OpenAPI Description document requires a response rendering template for the app to respond to the GET or POST requests. The response rendering template consists of an Adaptive Card template, Preview card template, and metadata.

#### Adaptive Card template

To create an Adaptive Card template, follow these steps:

1. Go to [ChatGPT](https://chat.openai.com/) and ask the following query in the message compose area:

    ```http
    
    Create an Adaptive Card Template that binds to the following response:
        "categories": [
            "Music Generation",
            "AI Detection"
        ],
        "chatbot_short_url": "https://goto.opentools.ai/c/ai-music-generator",
        "main_summary": "AI Music Generator is an AI-powered music composing tool that allows users to create original and personalized music for various purposes. It can generate melodies, harmonies, and rhythms tailored to specific needs and preferences, with customization options such as genre, mood, length, and instrumentation. The tool is designed for creative individuals, from beginners to professionals, and can produce high-quality music in seconds. Every generated piece of music is royalty-free and can be used instantly, with no limitations on beat creation. With advanced AI technology, AI Music Generator makes music production accessible to everyone.",
        "name": "AI Music Generator",
        "opentools_url": "https://goto.opentools.ai/ai-music-generator",
        "platforms": [
            "Web",
            "App",
            "API"
        ]
    ```

1. Select **Send message**.

1. ChatGPT generates a response with an Adaptive Card template that binds to the sample data. Save the Adaptive Card template for future reference.

    Following is an example of the Adaptive Card template:

    <details>
    <summary>Adaptive Card template</summary>

    ```json
    
    {
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "type": "AdaptiveCard",
    "version": "1.4",
    "body": [
        {
        "type": "TextBlock",
        "text": "AI Music Generator",
        "weight": "Bolder",
        "size": "Large"
        },
        {
        "type": "TextBlock",
        "text": "Categories",
        "size": "Medium"
        },
        {
        "type": "TextBlock",
         "text": "Music Generation, AI Detection",
         "wrap": true
        },
        {
        "type": "TextBlock",
        "text": "Description",
        "size": "Medium"
        },
        {
        "type": "TextBlock",
        "text": "AI Music Generator is an AI-powered music composing tool that allows users to create original and personalized music for various purposes. It can generate melodies, harmonies, and rhythms tailored to specific needs and preferences, with customization options such as genre, mood, length, and instrumentation. The tool is designed for creative individuals, from beginners to professionals, and can produce high-quality music in seconds. Every generated piece of music is royalty-free and can be used instantly, with no limitations on beat creation. AI Music Generator is powered by advanced AI technology, and it makes music production accessible to everyone.",
        "wrap": true
        },
        {
        "type": "TextBlock",
        "text": "Platform",
        "size": "Medium"
        },
        {
        "type": "TextBlock",
        "text": "Web, App, API",
        "wrap": true
        }
    ],
    "actions": [
        {
        "type": "Action.OpenUrl",
        "title": "Learn More",
        "url": "https://goto.opentools.ai/ai-music-generator"
        },
        {
        "type": "Action.OpenUrl",
        "title": "Try It",
        "url": "https://goto.opentools.ai/c/ai-music-generator"
        }
    ]
    }
    
    ```

    </details>

1. To verify if the Adaptive Card generated binds to the sample data, follow these steps:

   1. Go to [Adaptive Card Designer](https://adaptivecards.io/designer/).
   1. Go to **Select host app**, and then select **Microsoft Teams** from the dropdown.
   1. Go to **CARD PAYLOAD EDITOR** and paste the Adaptive Card template code.
   1. Go to **SAMPLE DATA EDITOR** and paste the GET API response that you saved earlier.

        :::image type="content" source="../assets/images/Copilot/api-me-sbs-adaptive-card-designer.png" alt-text="Screenshots shows the Adaptive Card designer with the Adaptive Card template and the sample data.":::
   1. Select **Preview mode**. The Adaptive Card designer displays an Adaptive Card with the data that binds the response to the template.

        :::image type="content" source="../assets/images/Copilot/api-me-sbs-adaptive-card-preview.png" alt-text="Screenshot shows the Adaptive Card designer with the Adaptive Card template and the sample data.":::

#### Create a preview card template

The preview card template can contain a `title`, `subtitle` and `image` properties. If the API response doesn't have an image, you can remove the image property.

Following is an example of a preview card template:

<details>
<summary>Preview card template</summary>

```json
   "previewCardTemplate": {
        "title": "${if(name, name, 'N/A')}",
        "subtitle": "$${if(price, price, 'N/A')}"
    } 
```

Create an if condition for the `title` and `subtitle`, where:

- If name exists, the bot uses the name.
- If name doesn't exist, the bot uses NA.

For example, `"title": "Name: ${if(name, name, 'N/A')}"`.
Save the preview card template for future reference.

</details>

#### Response rendering template

The response rendering template must conform to the schema hosted at [`https://developer.microsoft.com/json-schemas/teams/v1.20/MicrosoftTeams.ResponseRenderingTemplate.schema.json`](https://developer.microsoft.com/json-schemas/teams/v1.20/MicrosoftTeams.ResponseRenderingTemplate.schema.json).

To create a response rendering template, follow these steps:

1. Create a JSON file and add the following code to the file:

   ```json
   { 
     "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.20/MicrosoftTeams.ResponseRenderingTemplate.schema.json", 
     "version": "1.0", 
     "jsonPath": "", 
     "responseLayout": "", 
     "responseCardTemplate": { 
    },
    "previewCardTemplate": {
        }
    }
    ```

1. Update the properties in the response rendering template as follows:

    | # | Property name | Value |
    | --- | --- | --- |
    | 1. | `"$schema"` | `"https://developer.microsoft.com/json-schemas/teams/v1.20/MicrosoftTeams.ResponseRenderingTemplate.schema.json"` |
    | 2. | `"version"`| `"1.0"` <br> `version` is the version of the rendering template to use. |
    | 3. | `"jsonPath"` | `"tools"` <br> `jsonPath` is the path to one or more results in the response JSON response. Add the `jsonPath` to the relevant data/array from the product list in the API response. In this case, the `jsonPath` is tools. For more information on how to determiner the JSON path, see [Querying JSON with JSON path](https://www.newtonsoft.com/json/help/html/QueryJsonSelectToken.htm). |
    | 4. | `"responseLayout"` | `"list"` <br> `responseLayout` specifies the layout of the attachments. Used for responses of type result. Supported types are list and grid. If the response body contains an object with multiple elements like text, title, and image, then the response layout must be set to `list`. If the API response contains only images or thumbnails, then the response layout must be set to `grid`. |
    | 5. | `"responseCardTemplate"` | Paste the Adaptive Card template code that you saved earlier. <br> `responseCardTemplate` is an Adaptive Card template to map the JSON response to an Adaptive Card. |
    | 6. |  `"previewCardTemplate"` | Paste the preview card template code that you saved earlier. <br> `previewCardTemplate` is a preview card template is used to show a preview of results in the message extension flyout. |

1. Save the response rendering template in the same folder you saved the OpenAPI Description document.

The following code is an example of a Response rendering template:

<details>
<summary>Response rendering template</summary>

```json

{
    "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.20/MicrosoftTeams.ResponseRenderingTemplate.schema.json",
    "version": "1.0",
    "jsonPath": "tools",
    "responseLayout": "list",
    "responseCardTemplate": {
        "type": "AdaptiveCard",
        "version": "1.4",
        "body": [
            {
            "type": "TextBlock",
            "text": "AI Music Generator",
            "weight": "Bolder",
            "size": "Large"
            },
            {
            "type": "TextBlock",
            "text": "Categories",
            "size": "Medium"
            },
            {
            "type": "TextBlock",
            "text": "Music Generation, AI Detection",
            "wrap": true
            },
            {
            "type": "TextBlock",
            "text": "Description",
            "size": "Medium"
            },
            {
            "type": "TextBlock",
            "text": "AI Music Generator is an AI-powered music composing tool that allows users to create original and personalized music for various purposes. It can generate melodies, harmonies, and rhythms tailored to specific needs and preferences, with customization options such as genre, mood, length, and instrumentation. The tool is designed for creative individuals, from beginners to professionals, and can produce high-quality music in seconds. Every generated piece of music is royalty-free and can be used instantly, with no limitations on beat creation. With advanced AI technology, AI Music Generator makes music production accessible to everyone.",
            "wrap": true
            },
            {
            "type": "TextBlock",
            "text": "Platform",
            "size": "Medium"
            },
            {
            "type": "TextBlock",
            "text": "Web, App, API",
            "wrap": true
            }
        ],
        "actions": [
            {
            "type": "Action.OpenUrl",
            "title": "Learn More",
            "url": "https://goto.opentools.ai/ai-music-generator"
            },
            {
            "type": "Action.OpenUrl",
            "title": "Try It",
            "url": "https://goto.opentools.ai/c/ai-music-generator"
            }
        ]
    },
    "previewCardTemplate": {
        "title": "${if(name, name, 'N/A')}",
        "subtitle": "$${if(price, price, 'N/A')}"
    } 
}
```

</details>

### Create app manifest

Now, you need to create an app manifest (previously called Teams app manifest). The app manifest describes how your app integrates into the Microsoft Teams product.

#### Create a Teams app manifest

To create the manifest, follow these steps:

1. Create a new JSON file. Your app manifest must conform to the 1.20 version of the schema defined in [App manifest schema](/microsoft-365/extensibility/schema/?view=m365-app-1.24&viewFallbackFrom=m365-app-1.23%3Ftoc%3D%2Fmicrosoftteams%2Fplatform%2Ftoc.json&bc=%2Fmicrosoftteams%2Fplatform%2Fbreadcrumb%2Ftoc.json&preserve-view=true).
1. Add the following code to the JSON file:

   <details>
   <summary>App manifest</summary>

   ```json
   {
    "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.20/MicrosoftTeams.schema.json",
    "manifestVersion": "1.20",
    "version": "1.0.3",
    "id": "<<YOUR-MICROSOFT-APP-ID>>",
    "packageName": "com.microsoft.teams.extension",
    "developer": {
        "name": "Teams App, Inc.",
        "websiteUrl": "https://www.example.com",
        "privacyUrl": "https://www.example.com/termofuse",
        "termsOfUseUrl": "https://www.example.com/privacy"
    },
    "icons": {
        "color": "color.png",
        "outline": "outline.png"
    },
    "name": {
        "short": "Search ME API",
        "full": "Search ME API full"
    },
    "description": {
        "short": "product app for testing API Message Extensions",
        "full": "product app for testing API Message Extensions"
    },
    "accentColor": "#FFFFFF",
    "composeExtensions": [
        {
            "composeExtensionType": "",
            "apiSpecificationFile": "",
            "commands": [
                {
                    "context": [
                        "compose"
                    ],
                    "type": "query",
                    "title": "API for fetching Klarna.",
                    "id": "",
                    "parameters": [
                        {
                            "name": "",
                            "title": "",
                            "description": ""
                        }
                    ],
                    "description": "",
                    "apiResponseRenderingTemplateFile": ""
                }
            ]
        }
    ],
    "permissions": [
        "identity",
        "messageTeamMembers"
    ],
    "validDomains": []
   }
   ```

   </details>

1. Update the app manifest properties as follows:

    - Replace `<<YOUR-MICROSOFT-APP-ID>>` with bot's Microsoft App ID.
    - Update the value for `composeExtensionType` to `apiBased`.
    - Update the value for `apiSpecificationFile` to the path of your OpenAPI Description file.
    - Update the value for `commands.id` to `searchTools`.
    - Update the value for `commands.title` to `Search for AI Tools`.
    - Update the value for `commands.description` to `Search for AI Tools`.
    - Update the value for `parameters.name` to `search`. If there are no parameters, then the values must be query parameters or `properties.name` if referencing a property in the request body schema.
    - Update the `apiResponseRenderingTemplateFile` to the path of your response rendering template file.
    - Update the value for `validDomains` to the `service URL` endpoint defined in the OpenAPI Description file.

1. Save the Teams app manifest in the same folder you saved the OpenAPI Description document and the response rendering template.

    - You need a color image and outline image. These images should be included in the folder and referenced in your Teams app manifest.
    - Zip up the contents of the folder. The zip file must include the following files:

      - OpenAPI Description document
      - Response rendering template
      - App manifest
      - Color icon
      - Outline icon

### Upload a custom app to Teams

Sign into Teams test environment to test your app in Teams. To upload a custom app in Teams, follow these steps:

1. Go to **Microsoft Teams** and sign in using your test tenant credentials.
1. Go to **Apps** > **Manage your app** > **Upload an app**.
1. Select **Upload a customized app**.
1. Select the zip file created and select **Open**.
1. Select **Add**.

    :::image type="content" source="../assets/images/Copilot/api-me-sbs-add-app-teams.png" alt-text="Screenshot of message extension app with the Add option highlighted.":::

1. Select **Open**.

    :::image type="content" source="../assets/images/Copilot/api-me-open.png" alt-text="Screenshot of message extension app with the Open option highlighted.":::

1. Go to a chat, then select **+** from the message compose area, and search for your app.
1. Select the app and make a search query.

    :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-invoke-teams.png" alt-text="Screenshot shows that from the plus icon in the chat menu, users can invoke the message extension app that is displayed in the flyout menu.":::

1. The app responds with an Adaptive Card in the chat window.
1. Select **Send**.

    :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-sbs-result.png" alt-text="Screenshot shows the Adaptive Card with the search results in the chat message in Teams.":::

Congratulations! You did it!
You learned to create an API-based message extension using OpenAPI Description document.

> [!div class="nextstepaction"]
> [Create an API-based message extension](../messaging-extensions/create-api-message-extension.md)

</details>

[Tutorials](#tutorials)

## Build a bot with SSO authentication

Conversational bots in Microsoft Teams perform repetitive automated tasks initiated by users, such as customer service. The user needs to sign in multiple times without single sign-on (SSO) authentication. With SSO authentication methods, the users don't need to sign in to the bot multiple times.

<br>

<details>
<summary><b>Tutorial: Build a bot with SSO authentication</b></summary>

A bot behaves differently depending on the conversation it's involved in:

- Bots in channel and group chat conversations require the users to @mention the bot.
- Bots in a one-to-one conversation don't require an @mention. All messages sent by the user routes to the bot.

This step-by-step guide helps you to build a bot with SSO authentication. You'll see the following output:

:::image type="content" source="~/assets/images/bots/sbs-desktop-mobile.png" alt-text=" Screenshot of the bot with SSO authentication output after you’ve successfully completed the step-by-step guide.":::

### Prerequisites for building a bot

Ensure that you install the following tools and set up your development environment:

| Install | For using... |
| --- | --- |
| [Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) |  Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings, and calls all in one place. |
| [Visual Studio 2022](https://visualstudio.microsoft.com) | You can install the enterprise version in Visual Studio 2022, and install the ASP.NET and web development workloads. Use the latest version. |
| [Microsoft 365 developer account](/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant) | Access to Teams account with the appropriate permissions to install an app. |
| Dev tunnel | Teams app features (conversational bots, message extensions, and incoming webhooks) need inbound connections. A tunnel connects your development system to Teams. Dev tunnel is a powerful tool to securely open your localhost to the internet and control who has access. Dev tunnel is available in Visual Studio 2022 version 17.7.0 or later. <br> or </br> You can also use [ngrok](https://ngrok.com/download) as a tunnel to connect your development system to Teams. It isn't required for apps that only include tabs. This package is installed within the project directory (using npm `devDependencies`). |

> [!NOTE]
> After downloading ngrok, sign up, and install [authtoken](https://ngrok.com/download).

### Set up the Teams development tenant

A tenant is like a space or a container where you chat, share files, and run meetings for your organization in Teams. You can also upload and test the custom app.

#### Check for a custom app upload option

After creating the app, you must load your app in Teams without distributing it. This process is known as custom app upload. Sign in to your Microsoft 365 account to view this option.

> [!NOTE]
> Custom app upload is necessary for previewing and testing apps in Teams local environment. Enable app upload to preview and test your app in Teams locally.

Do you already have a tenant, and do you have the admin access? Let's check if you really do!

To verify custom upload apps in Teams:

1. In the Teams client, select the **Apps** icon.
1. Select **Manage your apps**.
1. Select **Upload an app**
1. Look for the option **Upload a custom app**. If you see the option, custom app upload is enabled.

    :::image type="content" source="../assets/images/bots/upload-a-custom-app-sso-bot-authentication.png" alt-text="Screenshot showing the Teams apps, Manage your apps, Upload an app, and Upload a custom app highlighted in red.":::

> [!NOTE]
> Contact Teams administrator, if you don't have the option to upload a custom app.

#### Create a free Teams developer tenant

If you don't have a Teams developer account, you can get it for free. Join the Microsoft 365 developer program!

1. Go to the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
1. Select **Join Now** and follow the onscreen instructions.
1. In the welcome screen, select **Setup E5 subscription**.
1. Set up an administrator account. After you finish, the following screen displays.

    :::image type="content" source="../assets/images/toolkit-v2/prerequisites/microsoft-365.png" alt-text="Screenshot of the Microsoft 365 Developer Program subscription.":::

1. Sign in to Teams using the new administrator account you just set up. Verify that you have the **Upload a custom app** option in Teams.

### Set up local environment

Follow these steps to clone the repository:

1. Open [Microsoft-Teams-Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples).
1. Select **Code**.
1. From the dropdown menu, select **Open with GitHub Desktop**.

   :::image type="content" source="../assets/images/include-files/clone-repository.png" alt-text="Screenshot show the option to clone repository in local.":::

1. Select **Clone**.

### Register Microsoft Entra app

The following steps help you to create and register your bot in the Azure portal:

- Create and register your Azure app.
- Create client secret to enable SSO authentication of the bot.
- Add Teams channel to deploy the bot.
- Create a tunnel to your web server's endpoints using dev tunnel (recommended) or ngrok.
- Add messaging endpoint to the dev tunnel that you created.

#### Add App registration

1. Go to [Azure portal](https://ms.portal.azure.com/).

1. Select **App registrations**.

    :::image type="content" source="../assets/images/include-files/azure-app-registration.png" alt-text="Screenshot shows the Azure services to select App registrations.":::

1. Select **+ New registration**.

    :::image type="content" source="../assets/images/include-files/new-registration.png" alt-text="Screenshot shows the New registration page on Microsoft Entra admin center.":::

1. Enter the name of your app.

1. Select the tenant option, as required.

1. Select **Register**.

    :::image type="content" source="../assets/images/include-files/app-register.png" alt-text="Screenshot shows the option to register the bot in Microsoft Entra admin center.":::

    Your app is registered in Microsoft Entra ID. The app overview page appears.

    :::image type="content" source="../assets/images/include-files/app-registration-overview.png" alt-text="Screenshot shows the app registration overview page.":::

    > [!NOTE]
    > Save the app ID from **Application (client) ID** and **Directory (tenant) ID** for further use.

#### Create a tunnel

Follow one of the following two methods to create a tunnel.

# [dev tunnel](#tab/dev)

1. Open Visual Studio.
1. Select **Create a new project**.

    :::image type="content" source="../assets/images/include-files/create-new-project.png" alt-text="Screenshot shows the selection to create a new project.":::

1. In the search box, enter **ASP.NET**. From the search results, select **ASP.NET Core Web App**.

1. Select **Next**.

    :::image type="content" source="../assets/images/include-files/template-search.png" alt-text="Screenshot shows the search and selection of the template.":::

1. Enter **Project name** and select **Next**.

    :::image type="content" source="../assets/images/include-files/project-name.png" alt-text="Screenshot shows the project name to enter.":::

1. Select **Create**.

    :::image type="content" source="../assets/images/include-files/additional-information.png" alt-text="Screenshot shows the project additional information." lightbox="../assets/images/include-files/additional-information.png":::

    An overview window appears.

    :::image type="content" source="../assets/images/include-files/asp-net-output.png" alt-text="Screenshot shows the overview window.":::

1. In the debug dropdown list, select **Dev Tunnels (no active tunnel)** > **Create a Tunnel...**.

    :::image type="content" source="../assets/images/include-files/create-tunnel.png" alt-text="Screenshot shows the dropdown to select the dev tunnels.":::

    A pop-up window appears.

1. Update the following details in the pop-up window:

    1. **Account**: Enter a Microsoft or GitHub account.
    1. **Name**: Enter a name for your tunnel.
    1. **Tunnel Type**: From the dropdown list, select **Temporary**.
    1. **Access**: From the dropdown list, select **Public**.

1. Select **OK**.

    :::image type="content" source="../assets/images/include-files/create-tunnel-details.png" alt-text="Screenshot shows the details to update for creation of tunnel.":::

    A pop-up window appears showing that dev tunnel is successfully created.

1. Select **OK**.

    :::image type="content" source="../assets/images/include-files/tunnel-created.png" alt-text="Screenshot shows the pop-up message that the tunnel is created.":::

    You can find the tunnel you've created in the debug dropdown list as follows:

    :::image type="content" source="../assets/images/include-files/tunnel-active.png" alt-text="Screenshot shows the tunnel is active and selected.":::

1. Select **F5** to run the application in the debug mode.

1. If a **Security Warning** dialog appears, select **Yes**.

    :::image type="content" source="../assets/images/include-files/security-warning.png" alt-text="Screenshot shows the dialog box to accept the security warning.":::

    A pop-up window appears.

1. Select **Continue**.

    :::image type="content" source="../assets/images/include-files/developer-tunnel.png" alt-text="Screenshot shows the url for the tunnel.":::

    The dev tunnel home page opens in a new browser window and the dev tunnel is now active.

    :::image type="content" source="../assets/images/include-files/developer-tunnel-web.png" alt-text="Screenshot shows the dev tunnel welcome page in browser.":::

1. Go to Visual Studio, select **View > Output**.

1. From the **Output** console dropdown menu, select **Dev Tunnels**.

    The **Output** console shows the dev tunnel URL.

    :::image type="content" source="../assets/images/include-files/output-console-url.png" alt-text="Screenshot shows the url in the Visual Studio output console.":::

# [ngrok](#tab/ngrok)

Use ngrok or Command Prompt to create a tunnel to your locally running web server's publicly available HTTPS endpoints. Run the following command in ngrok:

```bash
ngrok http --host-header=localhost 3978
```

> [!TIP]
> If you encounter **ERR_NGROK_4018**, follow the steps provided in the Command Prompt to sign up and authenticate ngrok. Then run the `ngrok http --host-header=localhost 3978` command.

The window shows the HTTPS URL.

 :::image type="content" source="../assets/images/include-files/ngrok-url.png" alt-text="Screenshot shows the ngrok HTTPS URL.":::

---

#### Add web authentication

1. In the left pane, under **Manage**, select **Authentication**.

1. Select **Add a platform** > **Web**.

   :::image type="content" source="../assets/images/include-files/platform-web.png" alt-text="Screenshot shows the selection of web authentication.":::

1. Enter the redirect URI for your app by appending `auth-end` to the fully qualified domain name. For example, `https://your-devtunnel-domain/auth-end` or `https://your-ngrok-domain/auth-end`.

1. Under **Implicit grant and hybrid flows**, select the **Access tokens** and **ID tokens** checkboxes.

1. Select **Configure**.

   :::image type="content" source="../assets/images/include-files/configure-web.png" alt-text="Screenshot shows the option to add redirect URI and select implicit grant and hybrid flows.":::

1. Under **Web**, select **Add URI**.

1. Enter `https://token.botframework.com/.auth/web/redirect`.

1. Select **Save**.

    :::image type="content" source="../assets/images/include-files/web-add-uri.png" alt-text="Screenshot shows the option to add the redirect URI and select implicit grant and hybrid flows.":::

#### Create a client secret

> [!NOTE]
> If you encounter the error **Client secrets are blocked by tenant-wide policy. Contact your tenant administrator for more information.**, you can create a certificate instead. For step-by-step instructions, refer to [create a certificate for app registration.](/graph/auth-register-app-v2#add-credentials)

1. In the left pane, under **Manage**, select **Certificates & secrets**.

1. Under **Client secrets**, select **+ New client secret**.

    :::image type="content" source="../assets/images/include-files/new-client-secret.png" alt-text="Screenshot show the selection of new client secret.":::

    The **Add a client secret** window appears.

1. Enter **Description**.

1. Select **Add**.

    :::image type="content" source="../assets/images/include-files/add-client-secret.png" alt-text="Screenshot show the client secret description option to add.":::

1. Under **Value**, select **Copy to clipboard** to save the client secret value for further use.

    :::image type="content" source="../assets/images/include-files/client-secret-value.png" alt-text="Screenshot show the option to copy the client secret ID value to copy value to clipboard.":::

#### Add API permissions

1. In the left pane, select **API permissions**.

1. Select **+ Add a permission**.

   :::image type="content" source="../assets/images/teams-file-upload-bot/add-api-permission.png" alt-text="Screenshot shows the option to select Add permission.":::

1. Select **Microsoft Graph**.

1. Select **Delegated permissions**.

1. Select **User** > **User.Read**.

1. Select **Add permissions**.

   :::image type="content" source="../assets/images/teams-file-upload-bot/select-api-permission.png" alt-text="Screenshot shows the option to select permissions.":::

    > [!NOTE]
    >
    > - If an app isn't granted IT admin consent, users must provide consent the first time they use an app.
    > - Users need to consent to the API permissions only if the Microsoft Entra app is registered in a different tenant.

#### Add application ID URI

1. In the left pane, under **Manage**, select **Expose an API**.

1. Next to **Application ID URI**, select **Add**.

   :::image type="content" source="../assets/images/bots/expose-api-add-uri.png" alt-text="Screenshot shows the option to add Application ID URI for your app.":::

1. Update the **Application ID URI** in the `api://botid-{AppID}` format and select **Save**.

   :::image type="content" source="../assets/images/bots/app-id-uri1.png" alt-text="Screenshot shows the option to add the app ID URI and save.":::

#### Add a scope

1. In the left pane, under **Manage**, select **Expose an API**.

1. Select **+ Add a scope**.

   :::image type="content" source="../assets/images/include-files/select-add-scope.png" alt-text="Screenshot shows the selection to Add a Scope.":::

1. Enter **access_as_user** as the **Scope name**.

1. Under **Who can consent?**, select **Admins and users**.

1. Update the values for the rest of the fields as follows:

   - Enter **Teams can access the user’s profile** as **Admin consent display name**.

   - Enter **Allows Teams to call the app’s web APIs as the current user** as **Admin consent description**.

   - Enter **Teams can access the user profile and make requests on the user’s behalf** as **User consent display name**.

   - Enter **Enable Teams to call this app’s APIs with the same rights as the user** as **User consent description**.

1. Ensure that **State** is set to **Enabled**.

1. Select **Add scope**.

   The following image shows the fields and the values:

   :::image type="content" source="../assets/images/include-files/set-add-scope.png" alt-text="Screenshot shows the values filled in the field to Add a scope.":::

   > [!NOTE]
   > The **Scope name** must match with the **Application ID** URI with `/access_as_user` appended at the end.

    <!--  `api://d4b8****.ngrok.io/00000000-0000-0000-0000-000000000000/access_as_user`-->  

   :::image type="content" source="../assets/images/include-files/add-scope.png" alt-text="Screenshot shows the details in Scopes.":::

#### Add client application

1. In the left pane, under **Manage**, select **Expose an API**.

   Under **Authorized client applications**, identify the applications that you want to authorize for your app’s web application.

1. Select **+ Add a client application**.

   :::image type="content" source="../assets/images/include-files/add-client-application.png" alt-text="Screenshot shows the option to Select client application.":::

1. Add Teams mobile or desktop and Teams web application.

    1. For Teams mobile or desktop: Enter the **Client ID** as `1fec8e78-bce4-4aaf-ab1b-5451cc387264`.

       :::image type="content" source="../assets/images/include-files/client-id-mobile-desktop.png" alt-text="Screenshot shows the mobile or desktop Client ID application.":::

    1. For Teams web: Enter the **Client ID** as `5e3ce6c0-2b1f-4285-8d4b-75ee78787346`.

       :::image type="content" source="../assets/images/include-files/client-id-web.png" alt-text="Screenshot shows the web Client ID application.":::

1. Select the **Authorized scopes** checkbox.

1. Select **Add application**.

   :::image type="content" source="../assets/images/include-files/authorized-scope-add.png" alt-text="Screenshot shows the option to select authorized scopes and add application.":::

   The following image displays the **Client Id**:

   :::image type="content" source="../assets/images/include-files/add-client-application-output.png" alt-text="Screenshot shows the output of Client applications.":::

### Update the manifest

1. In the left pane, select **Manifest**.

1. Set the value for the `requestedAccessTokenVersion` to `2` and select **Save**.

    :::image type="content" source="../assets/images/include-files/manifest-token.png" alt-text="Screenshot shows the manifest option and accesstoken details in Azure portal.":::

### Create your bot

#### Create an Azure bot resource

> [!NOTE]
> If you're already testing your bot in Teams, sign out of this app and Teams. To see this change, sign in again.

1. Go to **Home**.
1. Select **+ Create a resource**.
1. In the search box, enter **Azure Bot**.
1. Select **Enter**.
1. Select **Azure Bot**.
1. Select **Create**.

    :::image type="content" source="../assets/images/include-files/azure-bot.png" alt-text="Screenshot shows the creation of Azure bot.":::

1. Enter the bot name in **Bot handle**.
1. Select your **Subscription** from the dropdown list.
1. Select your **Resource group** from the dropdown list.

    :::image type="content" source="../assets/images/include-files/create-azure-bot.png" alt-text="Screenshot shows the option resource group and subscription in the Azure portal.":::

    If you don't have an existing resource group, you can create a new resource group. To create a new resource group, follow these steps:

    1. Select **Create new**.
    1. Enter the resource name and select **OK**.
    1. Select a location from **New resource group location** dropdown list.

    :::image type="content" source="../assets/images/include-files/new-resource-location.png" alt-text="Screenshot shows the new resource group option in Azure portal.":::

1. Under **Pricing**, select **Change plan**.

    :::image type="content" source="../assets/images/include-files/pricing-tier.png" alt-text="Screenshot shows the pricing option in Azure portal.":::

1. Select **FO Free** > **Select**.

    :::image type="content" source="../assets/images/include-files/pricing-free.png" alt-text="Screenshot shows the option to select free.":::

1. Under **Microsoft App ID**, select **Type of App** as **Multi Tenant**.

1. In the **Creation type**, select **Use existing app registration**.

1. Enter the **App ID**.

   <!-- You can also select **Use existing app registration** and enter existing **App ID**, **App tenant ID**, and **MSI resource ID**. -->

    > [!NOTE]
    > You can't create more than one bot with the same **Microsoft App ID**.

1. Select **Review + create**.

    :::image type="content" source="../assets/images/include-files/review-create-app-id.png" alt-text="Screenshot shows the creation of new bot.":::

1. After the validation passes, select **Create**.

    The bot takes a few minutes to provision.

1. Select **Go to resource**.

    :::image type="content" source="../assets/images/include-files/resource-deployment.png" alt-text="Screenshot shows the Go to resource option in the Azure portal.":::

    You've successfully created your Azure bot.

    :::image type="content" source="../assets/images/include-files/azure-bot-created-output.png" alt-text="Screenshot shows the output of a bot.":::

### Add a Teams channel

1. In the left pane, select **Channels**.
1. Under **Available Channels**, select **Microsoft Teams**.

    :::image type="content" source="../assets/images/include-files/channels-teams.png" alt-text="Screenshot shows the selection of Teams in channels.":::

1. Select the checkbox to accept the **Terms of Service**.

1. Select **Agree**.

    :::image type="content" source="../assets/images/include-files/terms-service.png" alt-text="Screenshot shows the acceptance of terms of service.":::

1. Select **Apply**.

    :::image type="content" source="../assets/images/include-files/teams-apply.png" alt-text="Screenshot shows the Microsoft Teams as messaging to apply.":::

#### Add a messaging endpoint

Use one of the following ways to add a messaging endpoint:

# [dev tunnel](#tab/dev)

1. Use the dev tunnel URL in the **Output** console as the messaging endpoint.

    :::image type="content" source="../assets/images/include-files/output-console-url.png" alt-text="Screenshot shows the url in the Visual studio output console.":::

1. In the left pane, under **Settings**, select **Configuration**.

1. Update the **Messaging endpoint** in the format `https://your-devtunnel-domain/api/messages`.

    :::image type="content" source="../assets/images/include-files/devtunnels-messaging-endpoint.png" alt-text="Screenshot shows the messaging endpoint adding api.":::

1. Select **Apply**.

    You've successfully set up a bot in Azure Bot service.

    > [!NOTE]
    > If the **Application Insights Instrumentation key** shows an error, update with **App ID**.

# [ngrok](#tab/ngrok)

1. From ngrok, copy the HTTPS URL.

    :::image type="content" source="../assets/images/include-files/ngrok-url.png" alt-text="Screenshot shows the ngrok HTTPS URL.":::

    > [!NOTE]
    > The HTTPS URL in your ngrok is a fully qualified domain name.
    > The `WebAppDomain` is a fully qualified domain name that doesn't include `https://` in it.

1. In the left pane, under **Settings**, select **Configuration**.

1. Update the **Messaging endpoint** in the format `https://your-ngrok-domain/api/messages`.

    :::image type="content" source="../assets/images/include-files/ngrok-messaging-endpoint.png" alt-text="Screenshot shows the messaging endpoint adding api.":::

1. Select **Apply**.

    You have successfully set up a bot in Azure Bot service.

    > [!NOTE]
    > If the **Application Insights Instrumentation key** shows an error update with **App ID**.

---

</details>
