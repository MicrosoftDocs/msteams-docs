---
title: Create API based Message extension
author: v-ypalikila
description: Learn how to build an API message extension and API plugin using Teams developer portal and Teams Toolkit.
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
ms.date: 09/07/2023
---

# Build API based Message extension

API based plugins are message extensions that use a web service to handle user requests and responses. They do not require a bot registration or a bot framework SDK. They can be configured and deployed using the Developer Portal for Teams or the Teams Toolkit.

You can create an message extension in Teams using an OpenAPI Specification. After you've created an OpenAPI Specification document for the APIs you want to use, upload the OpenAPI Specification document to Teams Toolkit or Developer portal for Teams to generate and integrate the client code in your app's project. Create an Adaptive Card template to handle the responses from the API.

# [Developer portal for Teams](#tab/developer-portal-for-teams)

To create an API base message extension using Developer portal, follow these steps:

1. Go to **Teams developer portal**.
1. Go to **Apps**.
1. Select **Create a new app**.
1. Under **Configure**, select **App features**.
1. Select **Plugin for copilot**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-app-feature.png" alt-text="Screenshot shows the plugin of copilot option in Teams developer portal.":::

1. Select **Upload now**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-upload.png" alt-text="Screenshot shows the Upload now option in Teams developer portal.":::

1. Select the Open API specification file in JSON or YAML and select **Open**.

   A list of all the available APIs from the Open API specification are uploaded as commands and displayed in the page.

1. Select the APIs that you want to convert as a command and select **Save**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-convert-api-commands.png" alt-text="Screenshot shows the list of APIs from the Open API spec document converted as commands.":::

**Update command details**

To update the command details for each command listed in the API:

1. Select the arrow next to any of the Get commands.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-edit-get-commands.png" alt-text="Screenshit shows the option to edit get commands in Teams developer portal.":::

1. Select **View details**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-commands-view-details.png" alt-text="Screenshot shows the view details option for the Get command.":::

   A command details page appears.

1. In the Command details page, update the following:
   * Command type
   * Command ID
   * Command title
   * Command description
   * Context in which the command works
   * Parameter name
   * Parameter title
   * Parameter description
   * Parameter description type

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-command-details.png" alt-text="Screenshot shows the fields available in the command details page.":::

1. Select **Save**. The API based message extension plugin for copilot is created.

:::image type="content" source="../assets/images/Copilot/api-based-me-tdp-plugin-copilot.png" alt-text="Screenshot shows the plugin for copilot app created in the app features page in Teams developer portal.":::

## Create message extension when copilot plugin already exists

If you already have an existing copilot plugin and you want to create a message extension, follow these steps:

1. Go to **Teams developer portal**.
1. Go to **Apps**.
1. Select **Create a new app**.
1. Under **Configure**, select **App features**.
1. Select **Messaging extension**. An Adaptive Card with the **Copilot plugin already exist in app** warning appears.
1. Select **Create a new message extension and publish it** or **Create a new message extension while keeping my existing copilot plugin in published state**.
1. Select **Continue**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-copilot-exists-warning.png" alt-text="Screenshot shows an Adative Card with a warning message and two options for the user to select in the message extension setup page.":::

   The message extension page appears.

1. Select **Messaging extension (bot) ID**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-copilot-select-bot.png" alt-text="Screenshot shows the select an existing bot option to add message extension in the message extension setup page.":::

1. From the **select an existing bot** dropdown, select a bot.
   1. If you don't have an existing bot, you can create a new bot by selecting **Create a bot** next to the dropdown.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-copilot-create-bot.png" alt-text="Screenshot shows the list of bots in the dropdown and the create a bot option in the message extension setup page.":::

1. Select **Save**. A message extension with a default tag is created in the App features page.

> [!NOTE]
> The app that has the **Default** tag is published to the users.

:::image type="content" source="../assets/images/Copilot/api-based-me-tdp-copilot-message-extension-created.png" alt-text="Screenshot shows the message extension app created in the App features page in Teams developer portal.":::

## Create an API plugin

An API plugin requires a ChatGPT plugin manifest, which needs to be hosted on the API’s domain.

Before you an API plugin, ensure that you have the following:

* An API document in the OpenAPI yaml or JSON format.
* A JSON manifest file that defines the relevant metadata such as name, logo, and OpenAPI spec for the endpoints for the plugin and host the file in a domain.

If you have a chatGPT plugin manifest. You can build an API plugin using Teams developer portal.

<font color="red">Need more information and tool mock images</font>

# [Teams toolkit](#tab/Teams-toolkit)

1. Open **Visual Studio Code**.
1. From the left pane, Select **Teams Toolkit**.
1. Select **Create a New App**.
1. Select **Plugin for Copilot**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-plugin-copilot.png" alt-text="Screenshot shows the Plugin for copilot option in the Team Toolkit.":::

1. Select any of the following options:
    1. Start with a new API.
    1. Start with an OpenAPI specification.
    1. Start with an OpenAI plugin.

     :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-plugin-copilot-options.png" alt-text="Screenshot shows the plugin options to create a plugin for copilot.":::

1. Follow these steps for the respective API types:

   # [New API](#tab/new-api)

   1. Select a programming language.

       :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-plugin-programming language.png" alt-text="Screenshot shows the programming language options.":::

   1. Select **Default folder**.

   1. Enter the name of your app and select **Enter**. Teams Toolkit creates a new plugin with API from Azure functions.

   # [OpenAPI specification](#tab/openapi-specification)

   1. Enter or browse the OpenAPI specification doc location.

      :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-plugin-copilot-openapi-spec-location.png" alt-text="Screenshot shows the option to select OpenAPI spec location.":::

   1. From the API list, select the GET API and select **OK**.
   1. Select **Default folder**.
   1. Enter the name of your app and select **Enter**. Teams Toolkit scaffolds the OpenAPI spec file and created a API based message extension.
   ---

You can also build bot based message extensions.

---

## Best practices

* The ID for the command in the Teams app manifest must match the corresponding operationId in the openAPI spec.

* If there is a required parameter without a default value, then the parameter name of the command defined in the Teams app manifest, must match this parameter name.

* If there is no required parameter without a default value, then the parameter name in the Teams app manifest must match the name of an optional parameter defined for that operation.

* There must be exactly one parameter defined for the operation. Zero or more than one parameter are not supported.

* There must also be a response rendering template defined per command. The details and the schema for this file which is used to convert responses from an API can be found at Template Response Schema.docx. This file must be local just like the openAPI spec and the command portion of the manifest must also point to this template file under composeExtension.command.apiResponseRenderingTemplateFile with the app manifest. Each command will point to a different response rendering template file.

## Best practices for openAPI spec

* Regardless of Plugin-only or ME

* Server url must be absolute endpoint

* Endpoint must be HTTPS

Only for operations to be used as MEs

* Developers cannot require users to enter a parameter for a header or cookie

* If they need headers passed, they can put a default value for the header in the spec

* oneOf, anyOf, allOf, not (swagger.io)

* Construcuting arrays for the request are not supported, nest objects with a JSON request body are supported.

* Request body (if present) can only be application/json

* Only one required parameter without a default value is allowed. We are only supporting single parameter search right now

6. The operation must have an operationId

7. Only HTTP methods POST and GET are allowed

## See also
