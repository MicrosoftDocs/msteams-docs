---
title: Explore Microsoft Teams Tutorials
description: Learn about tutorials to build apps with various capabilities such as AI, UI, and various languages, to prepare your environment.
ms.localizationpriority: high
ms.date: 11/14/2025
ms.topic: reference
---

# Teams app tutorials

Learn more about building Teams app capabilities.

## Debug your AI chat bot using Microsoft 365 Agents Playground

<details>
<summary><b>Tutorial: Debug your AI chat bot</b></summary>

### Prerequisites

Start Microsoft Teams app development with your Teams AI chat bot app and debug with Microsoft 365 Agents Playground (previously known as Teams App Test Tool). Agents Playground makes debugging bot-based apps effortless. You don't need a Microsoft 365 developer account, tunneling, or Teams app and bot registration to use Agents Playground.

You can chat with your bot and view the messages and Adaptive Cards as they appear in Teams. You can also mock an activity in Agents Playground using activity triggers.

> [!NOTE]
>
> * Agents Playground is available only in v5.4.0 of Microsoft 365 Agents Toolkit (previously known as Teams Toolkit).
> * Agents Playground is supported only for desktop and web clients.

This step-by-step guide helps you to build an AI chat bot using Agents Toolkit and debug with the Test Tool. You'll see the following output after you've completed this guide, where the user can access and use the AI chat bot:

:::image type="content" source="../assets/images/toolkit-v2/debug/test-tool.png" alt-text="Screenshot shows the bot open in Test Tool." lightbox="../assets/images/toolkit-v2/debug/test-tool.png":::

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

### Create project workspace for your AI chat bot app

The bot capability of a Teams app creates a chatbot or a conversational bot. It communicates with a web service, facilitating the use of its services. The bot can execute simple, automated tasks such as delivering customer service. You can get weather forecast, make reservations, or any other service offered using a conversational bot.

:::image type="content" source="~/assets/images/toolkit-v2/first-bot/your-helloworld-app-bot.png" alt-text="Screenshot shows you the app with three features. Bot is highlighted.":::

As you've already prepared for creating these apps, you can set up a new Teams project for creating the AI chat bot app.

In this tutorial, learn:

1. [Create your bot project workspace.](#create-your-bot-project-workspace)
1. [Take a tour of the bot app source code.](#take-a-tour-of-the-bot-app-source-code)

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

    :::image type="content" source="../assets/images/toolkit-v2/first-bot/vsc-trust-authors.png" alt-text="Screenshot shows the dialog to trust or not the authors of the files in this folder.":::

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

[Back to top](#debug-your-ai-chat-bot-using-microsoft-365-agents-playground)

### Build and run your AI chat bot app

#### Create Open AI key and endpoint for your AI chat bot

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

##### Get Azure Open AI keys and endpoint

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

#### Update Azure Open AI key and endpoints

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

#### Debug and run your AI chat bot app

1. From the left pane, select **RUN and DEBUG** (Ctrl+Shift+D), and then select **Debug in Agents Playground** from the dropdown list.

    :::image type="content" source="~/assets/images/toolkit-v2/debug/select-debug-in-test-tool.png" lightbox="~/assets/images/toolkit-v2/debug/select-debug-in-test-tool.png" alt-text="Screenshot shows the option to select debug in Agents Playground.":::

1. Agents Playground opens your AI chat bot in a webpage.

    :::image type="content" source="~/assets/images/toolkit-v2/debug/test-tool.png" lightbox="~/assets/images/toolkit-v2/debug/test-tool.png" alt-text="Screenshot shows the bot open in Test Tool.":::

[Back to top](#debug-your-ai-chat-bot-using-microsoft-365-agents-playground)

### Activity triggers

There are two types of activity triggers:

1. [Predefined activity triggers](#predefined-activity-triggers)
1. [Custom activity triggers](#custom-activity-triggers)

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

[Back to top](#debug-your-ai-chat-bot-using-microsoft-365-agents-playground)

#### Complete challenge

Did you come up with output like this?

:::image type="content" source="~/assets/images/toolkit-v2/debug/test-tool.png" lightbox="~/assets/images/toolkit-v2/debug/test-tool.png" alt-text="Screenshot shows the bot open in Test Tool.":::

Congratulations! You've successfully created an AI chat bot app. Now, you've learned to debug your AI chat bot app in Agents Playground.

> [!div class="nextstepaction"]
> [Microsoft 365 Agents Playground](debug-your-agents-playground.md)

</details>

## Build API-based message extension

<details>
<summary><b>Tutorial: Build API-based message extension</b></summary>

> [!NOTE]
> API-based message extensions only support search commands.

Message extensions built using API (API-based) significantly enhance the functionality of your Teams apps by allowing them to interact with external services. API-based message extensions can help streamline workflows by reducing the need to switch between different applications.

You can use API-based message extensions to integrate external services that are commonly used in the business workflow. For example, a business that frequently uses a CRM system for customer management could use a message extension to fetch and display customer data directly from Teams. This app helps save time and improves efficiency by reducing the need to switch between different applications. This feature is supported on all platforms where Teams is available, including desktop, web, and mobile.

### Prerequisites

Here's a list of tools you need for building and deploying your apps.

| Install | For using... |
| --- | --- |
|[Microsoft Teams](https://www.microsoft.com/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings, or call - all in one place.|
|[Microsoft Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |
|[Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or SharePoint Framework (SPFx) build environments. Use version 1.55 or later. |
|[Microsoft 365 developer account](../concepts/build-and-test/prepare-your-o365-tenant.md) | Access to Teams account with the appropriate permissions to install an app. |
|[Azure account](https://azure.microsoft.com/free/) | Access to Azure resources.|
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
> Contact your Teams administrator, if you don't find the option to upload a custom app.

#### Create a free Teams developer tenant (optional)

If you don't have a Teams developer account, you can get it free. Join the Microsoft 365 developer program!

1. Go to the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
1. Select **Join Now** and follow the onscreen instructions.
1. In the welcome screen, select **Set up E5 subscription**.
1. Set up your administrator account. After you finish, the following screen appears.

    :::image type="content" source="~/assets/images/toolkit-v2/prerequisites/microsoft-365.png" alt-text="Screenshot shows the Microsoft 365 Developer Program.":::

1. Sign in to Teams using the administrator account you just set up. Verify that you have the **Upload a custom app** option in Teams.

#### Get a free Azure account

If you want to host your app or access resources in Azure, you must have an Azure subscription. [Create a free account](https://azure.microsoft.com/free/) before you begin.

You have all the tools to set up your account. Next, let's set up your development environment and start building! Select the app you want to build first.

### Create OpenAPI Description document

#### OpenAPI Description

OpenAPI Description (OAD) is the industry-standard specification that outlines how OpenAPI files are structured and outlined. It's a language-agnostic, human-readable format for describing APIs. It's easy for both humans and machines to read and write. The schema is machine-readable and represented in either YAML or JSON.

To interact with the APIs, an OpenAPI Description document is necessary. The OpenAPI Description document must meet the following criteria:

* The `auth` property must not be specified.
* JSON and YAML are the supported formats.
* OpenAPI Versions 2.0 and 3.0.x are supported.
* Teams doesn't support the oneOf, anyOf, allOf, and not (swagger.io) constructs.
* Constructing arrays for the request isn't supported, however, nested objects within a JSON request body are supported.
* The request body, if present, must be application/Json to ensure compatibility with a wide range of APIs.
* Define an HTTPS protocol server URL for the `servers.url` property.
* Only single parameter search is supported.
* Only one required parameter without a default value is allowed.
* Only POST and GET HTTP methods are supported.
* The OpenAPI Description document must have an `operationId`.
* The operation mustn't require Header or Cookie parameters without default values.
* A command must have exactly one parameter.
* Ensure that there are no remote references in the OpenAPI Description document.
* A required parameter with a default value is considered optional.

We used the following OpenAPI Description as an example for this tutorial:

<details><summary>OpenAPI Description</summary>

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
                $ref: '#/components/schemas/searchToolsError'
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

1. Go to [Swagger/OpenAPI validator](https://apitools.dev/swagger-parser/) and validate the OpenAPI Description document.
1. Save the OpenAPI Description document.
1. Go to [Swagger Editor](https://editor.swagger.io/).
1. In the left pane, paste the OpenAPI Description in the editor.
1. In the right pane, select **GET**.
1. Select **Try it out**.
1. Enter the values for the **search** parameter as **Tool to create music**.
1. Select **Execute**. The swagger editor displays a response with a list of products.

    :::image type="content" source="../assets/images/Copilot/api-me-sbs-execute-get-response.png" alt-text="Screenshots shows the parameters, its values and the **EXECUTE** option in the swagger editor.":::

1. Go to **Server response** > **Response Body**.
1. Under `products`, copy the first product from the list and save it for future reference.

    :::image type="content" source="../assets/images/Copilot/api-me-sbs-product-response.png" alt-text="Screenshots shows the highlighted product that is selected from the response body.":::

### Create response rendering template

An OpenAPI Description document requires a response rendering template for the app to respond to the GET or POST requests. The response rendering template consists of an Adaptive Card template, Preview card template, and metadata.

#### Adaptive Card template

To create an Adaptive Card template, follow these steps:

1. Go to [ChatGPT](https://chat.openai.com/) and ask the following query in the message compose area:

    ```text
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

<details><summary>Adaptive Card template</summary>

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

<details><summary>Preview card template</summary>

```json
   "previewCardTemplate": {
        "title": "${if(name, name, 'N/A')}",
        "subtitle": "$${if(price, price, 'N/A')}"
    } 
```

Create an if condition for the `title` and `subtitle`, where:

* If name exists, the bot uses the name.
* If name doesn't exist, the bot uses NA.

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

   1. `"$schema"`: `"https://developer.microsoft.com/json-schemas/teams/v1.20/MicrosoftTeams.ResponseRenderingTemplate.schema.json"`
   1. `"version"`: `"1.0"`

      `version` is the version of the rendering template to use

   1. `"jsonPath"`: `"tools"`

      `jsonPath` is the path to one or more results in the response JSON response. Add the `jsonPath` to the relevant data/array from the product list in the API response. In this case, the `jsonPath` is tools. For more information on how to determiner the JSON path, see [Querying JSON with JSON path](https://www.newtonsoft.com/json/help/html/QueryJsonSelectToken.htm).

   1. `"responseLayout"`: `"list"`

       `responseLayout` specifies the layout of the attachments. Used for responses of type result. Supported types are list and grid. If the response body contains an object with multiple elements like text, title, and image, then the response layout must be set to `list`. If the API response contains only images or thumbnails, then the response layout must be set to `grid`.

   1. `"responseCardTemplate"`: Paste the Adaptive Card template code that you saved earlier.

       `responseCardTemplate` is an Adaptive Card template to map the JSON response to an Adaptive Card.

   1. `"previewCardTemplate"`: Paste the preview card template code that you saved earlier.

       `previewCardTemplate` is a preview card template is used to show a preview of results in the message extension flyout.

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

   <details><summary>App manifest</summary>

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

     * Replace `<<YOUR-MICROSOFT-APP-ID>>` with bot's Microsoft App ID.
     * Update the value for `composeExtensionType` to `apiBased`.
     * Update the value for `apiSpecificationFile` to the path of your OpenAPI Description file.
     * Update the value for `commands.id` to `searchTools`.
     * Update the value for `commands.title` to `Search for AI Tools`.
     * Update the value for `commands.description` to `Search for AI Tools`.
     * Update the value for `parameters.name` to `search`. If there are no parameters, then the values must be query parameters or `properties.name` if referencing a property in the request body schema.
     * Update the `apiResponseRenderingTemplateFile` to the path of your response rendering template file.
     * Update the value for `validDomains` to the `service URL` endpoint defined in the OpenAPI Description file.

1. Save the Teams app manifest in the same folder you saved the OpenAPI Description document and the response rendering template.
    * You need a color image and outline image. These images should be included in the folder and referenced in your Teams app manifest.
    * Zip up the contents of the folder. The zip file must include the following files:
      * OpenAPI Description document
      * Response rendering template
      * App manifest
      * Color icon
      * Outline icon

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

[Back to top](#teams-app-tutorials)
