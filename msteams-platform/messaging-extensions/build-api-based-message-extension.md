---
title: Build API-based Message extension
author: v-ypalikila
description: Learn how to build an API message extension using Teams developer portal and Teams Toolkit.
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
ms.date: 09/07/2023
---

# Build API-based message extension

Message extension are a type of Teams app that allows you to integrate your chat functionality directly into Teams. This can enhance your app's usability and provide a seamless user experience. We recommend you to follow the following requirements:

<details><summary>API-based message extensions</summary>

API-based message extensions are a powerful tool that allows you to extend the functionality of your Teams app by integrating with external APIs. This can greatly enhance the capabilities of your app and provide a richer user experience. To implement API-based message extension, you need to follow these guidelines:

* `Commands.id` in app manifest must match the corresponding `operationId` in the OpenAPI specification.
* If there's a required parameter without a default value, the parameter name of the command defined in the Teams app manifest must match this parameter name.
* If there's no required parameter without a default value, the parameter name in the Teams app manifest must match the name of an optional parameter defined for that operation.
* A command can't have more than one parameter.
* A response rendering template must be defined per command. This file, used to convert responses from an API, must be local just like the OpenAPI specification. The command portion of the manifest must point to this template file under`composeExtension.command.apiResponseRenderingTemplateFile` within the app manifest. Each command will point to a different response rendering template file.
* Add a `jsonPath` in the Adaptive Card template. The JSON path to the relevant data/array.

</details>

</br>

<details><summary>OpenAPI specification</summary>

Developers can't require users to enter a parameter for a header or cookie. If headers need to be passed, a default value for the header can be set in the specification. This simplifies the user experience and reduces the risk of errors.

* The `oneOf`, `anyOf`, `allOf`, `not` (swagger.io) construct aren't supported in Teams.
* Constructing arrays for the request aren't supported, but nested objects within a JSON request body are supported.
* The request body (if present) can only be application or json to ensure compatibility with a wide range of APIs.
* Only single parameter search is supported.
* Only one required parameter without a default value is allowed.
* The operation must have an `operationId`.
* Only POST and GET HTTP methods are supported.

</details>

</br>

<details><summary>App manifest</summary>

* Set composeExtension.composeExtensionType to `apiBased`.
* Define `composeExtension.apiSpecificationFile` as the relative path to the OpenAPI specification file within the folder.
*

</details>


You can create an API-based message extension using Developer Portal for Teams, Teams Toolkit and Teams CLI.

# [Developer portal for Teams](#tab/developer-portal-for-teams)

To create an API base message extension using Developer portal, follow these steps:

1. Go to **Teams developer portal**.
1. Go to **Apps**.
1. Select **Create a new app**.
1. Under **Configure**, select **App features**.
1. Select **Messaging extension**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-app-feature.png" alt-text="Screenshot shows the plugin of copilot option in Teams developer portal.":::

1. Under **Message extension type**, select **API-based**.

1. Under **Open API spec**, select **Upload API spec**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-upload.png" alt-text="Screenshot shows the Upload now option in Teams developer portal.":::

1. Select the Open API specification file in JSON or YAML and select **Open**.

1. Select **Save**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-convert-api-commands.png" alt-text="Screenshot shows the list of APIs from the Open API spec document converted as commands.":::

**Add commands**

To extend copilot plugin as a message extension, add commands:

1. Under the Open API spec file, select **Add**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-edit-get-commands.png" alt-text="Screenshot shows the option to edit get commands in Teams developer portal.":::

   A list of all the available APIs from the Open API specification are displayed.

1. Select an API from the list and select **Next**.

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

1. Select **Save**. The command is added successfully.

:::image type="content" source="../assets/images/Copilot/api-based-me-tdp-plugin-copilot.png" alt-text="Screenshot shows the plugin for copilot app created in the app features page in Teams developer portal.":::

An API-based ME is created.

# [Visual Studio Code](#tab/visual-studio-code)

1. Open **Visual Studio Code**.
1. From the left pane, Select **Teams Toolkit**.
1. Select **Create a New App**.
1. Select **Message Extension**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-plugin-copilot.png" alt-text="Screenshot shows the Plugin for copilot option in the Team Toolkit.":::

1. Select **API-based Search Message Extension**.

1. Select any of the following options:
    1. **Start with a new API**.
    1. **Start with an OpenAPI Description Document**.

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
   1. Enter the name of your app and select **Enter**. Teams Toolkit scaffolds the OpenAPI spec file and created an API-based message extension.

    ---

# [Teams Toolkit CLI](#tab/teams-toolkit-cli)

1. Go to **Command Prompt**.

1. Enter the following command:

   ```
   npm install -g @microsoft/teamsfx-cli@2.0.3-beta.2023092709.0
   ```

1. Type `teamsfx new` in the terminal

1. Select **Message Extension** >  **API-based Search Message Extension**.

1. Select **Start from an OpenAPI Description Document**.

1. Enter a valid url or local path of your API specification.

1. Generate a project.

1. Provision resources: teamsfx provision --env dev

1. Preview the app: teamsfx preview --env dev

1. Test your MEs in Teams

# [Visual Studio](#tab/visual-studio)

1. Open Visual Studio.
1. Go to **File** > **New** > **Project...** or **New Project**.

1. Search for **Teams** and select **Microsoft Teams App**.

1. Select **Plugin for Copilot**.

1. Select any of the following options:
   * Start with a new API
   * Start with an OpenAPI Specification

1. Select **Next**.
1. Enter OpenAPI Specification URL or select **Browse..** to upload a file from your local machine.
1. Select the APIs from the list you want the app to interact with.
1. Select **Create**. The project is scaffolded and you can find API spec, manifest and response template files in the **appPackage** folder.
1. To provision, select **Project** > **Teams Toolkit** > **Provision in the cloud...**.
1. To preview your app in Teams, Select **Project** > **Teams Toolkit** > **Preview in** > **Teams**.

---

## Step-by-step guide

You can go through the [step-by-step](../sbs-api-me-ttk.yml) guide to build an API-based message extension.

You can also build bot based message extensions.

## See also
