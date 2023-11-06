---
title: Build API-based message extension
author: v-ypalikila
description: Learn how to build an API message extension using Teams Visual Studio Code and Teams Toolkit.
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
ms.date: 10/19/2023
---

# Build API-based message extension

> [!NOTE]
>
> * API-based message extensions only support search commands.
> * API-based message extensions are available only in [public developer preview](../resources/dev-preview/developer-preview-intro.md).

API-based message extensions are a type of Teams app that integrates your chat functionality directly into Teams, enhancing your app's usability and offering a seamless user experience.

Before you get started, ensure that you meet the following requirements:
</br>
<details><summary>1. OpenAPI Description (OAD)</summary>

Developers must not require users to enter a parameter for a header or cookie. If you need to pass headers, a default value for the header can be set in the specification. This simplifies the user experience and reduces the risk of errors.

* The `auth` property must not be specified.
* JSON and YAML are the supported formats.
* OpenAPI versions 2.0 and 3.0.x are supported.
* Teams doesn't support the `oneOf`, `anyOf`, `allOf`, and `not` (swagger.io) constructs.
* Constructing arrays for the request isn't supported, however, nested objects within a JSON request body are supported.
* The request body, if present, must be application/Json to ensure compatibility with a wide range of APIs.
* Define an HTTPS protocol server URL for the `servers.url` property.
* Only single parameter search is supported.
* Only one required parameter without a default value is allowed.
* Only POST and GET HTTP methods are supported.
* OpenAPI Description document must have an `operationId`.
* The operation must not have required Header or Cookie parameters without default values.
* A command must have exactly one parameter.
* Ensure that there are no remote references in the OpenAPI Description document.
* A required parameter with a default value is considered optional.

</details>

</br>

<details><summary>2. App manifest</summary>

* Set `composeExtension.Type` to `apiBased`.
* Define `composeExtension.apiSpecificationFile` as the relative path to the OpenAPI Description file within the folder.
* Define `apiResponseRenderingTemplateFile`  as the relative path to the response rendering template.
* Each command must have a link to the response rendering template.
* Full description must not exceed 128 characters.
* A command must have exactly one parameter.

</details>

</br>

<details><summary>3. Response rendering template</summary>

* Define the schema reference URL in the `$schema` property.
* Define `jsonPath` as the path to the relevant data/array in API response. if the path points to an array, then each entry in the array will be a separate result and if the path points to an object, there will only be a single result. *[Optional]*
* The supported values for `responseLayout` are `list` and `grid`.

The `JsonPath` property in response rendering template is $ to indicate the root object of the response data is used to render the Adaptive Card, and you can update the `jsonPath` property to point another property in response data.

If the root object of the OpenAPI schema contains well-known array property name, then Teams Toolkit uses the array property as root element to generate an Adaptive Card, and the array property name is used as `JsonPath` property for response rendering template. For example, if the property name contains `result`, `data`, `items`, `root`, `matches`, `queries`, `list`, `output` and the type is `array`, then it's used as root element.

</details>
</br>

<details><summary>4. API message extension</summary>

API-based message extensions are a potent tool that enhances your Teams app's functionality by integrating with external APIs. This enhances the capabilities of your app and provides a richer user experience. To implement message extension from an API, you need to follow these guidelines:

* The `Commands.id` property in app manifest must match the corresponding `operationId` in the OpenAPI Description.
* If a required parameter is without a default value, the command `parameter.name` in the app manifest must match the `parameter.name` in the OpenAPI Description.
* If there's no required parameter, the command `parameter.name` in the app manifest must match the optional `parameter.name` in the OpenAPI Description.
* A command can't have more than one parameter.
* A response rendering template must be defined per command, which is used to convert responses from an API. The command section of the manifest must point to this template file under `composeExtension.command.apiResponseRenderingTemplateFile` within the app manifest. Each command points to a different response rendering template file.

</details>

You can create an API-based message extension using Visual Studio Code and Teams Toolkit CLI.

# [Developer Portal for Teams](#tab/developer-portal-for-teams)

To create an API base message extension using Developer Portal, follow these steps:

1. Go to **Teams Developer Portal**.
1. Go to **Apps**.
1. Select **Create a new app**.
1. Under **Configure**, select **App features**.
1. Select **Messaging extension**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-app-feature.png" alt-text="Screenshot shows the message extension option in Teams Developer Portal.":::

1. Under **Message extension type**, select **API-based**.

1. Under **Open API spec**, select **Upload API spec**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-upload.png" alt-text="Screenshot shows the Upload now option in Teams Developer Portal.":::

1. Select the Open OpenAPI Description document in JSON or YAML and select **Open**.

1. Select **Save**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-convert-api-commands.png" alt-text="Screenshot shows the list of APIs from the Open API spec document converted as commands.":::

**Add commands**

> [!NOTE]
> Message extensions built from an API only support single parameter.

You can add commands and parameters to your API, to add commands:

1. Under **Message extension type**, select **+ Add**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-edit-get-commands.png" alt-text="Screenshot shows the option to edit get commands in Teams Developer Portal.":::

   Add a command pop-up appears with a list of all the available APIs from the Open API Description are displayed.

1. Select an API from the list and select **Next**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-commands-view-details.png" alt-text="Screenshot shows the view details option for the Get command.":::

   A command details page appears.

1. In the **Add command** page, go to **Adaptive card template** and select **Upload now**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-adaptive-card-template.png" alt-text="Screenshot shows the Upload now option to add the adaptive Card template in for the command.":::

   > [!NOTE]
   > If you have more than one API, ensure that you upload the **Adaptive card template** for all the APIs.

1. Select the Adaptive Card template file in JSON and select **Open**.

1. Turn on the **Automatically run the command when a user opens the extension** toggle.

1. Under **Details**, update the following:
   * Command Type
   * Command ID
   * Command title
   * Command description
   * Parameter name
   * Parameter title
   * Parameter description
   * Parameter description type

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-command-details.png" alt-text="Screenshot shows the fields available in the command details page.":::

1. Select **Add**. The command is added successfully.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-plugin-copilot.png" alt-text="Screenshot shows the plugin for copilot app created in the app features page in Teams Developer Portal.":::

An API message extension is created.

# [Visual Studio Code](#tab/visual-studio-code)

To build a message extension from an API using Visual Studio Code, follow these steps:

1. Open **Visual Studio Code**.
1. From the left pane, Select **Teams Toolkit**.
1. Select **Create a New App**.
1. Select **Message Extension**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-plugin-copilot.png" alt-text="Screenshot shows the message extension option in Team Toolkit.":::

1. Select **Custom Search Results**.

1. Select one of the following options:
    1. To build from the beginning, select **Start with a new API**.
    1. If you already have an OpenAPI description document, select **Start with an OpenAPI Description Document**.

     :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-plugin-copilot-options.png" alt-text="Screenshot shows the options to create a search based message extension.":::

1. Based on the options selected in **step 7**, select the following:

   # [New API](#tab/new-api)

   1. Select a programming language.

       :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-plugin-programming language.png" alt-text="Screenshot shows the programming language options.":::

   1. Select **Default folder**.

   1. Enter the name of your app and select **Enter**. Teams Toolkit creates a new plugin with API from Azure functions.
   1. To get started, you must update the source code in the following files:

        |File  |Contents |
        |---------|---------|
        |`repair/function.json`    |A configuration file that defines the function’s trigger and other settings. For more information, see [Azure Functions](/azure/azure-functions/functions-bindings-http-webhook-trigger?tabs=python-v2%2Cisolated-process%2Cnodejs-v4%2Cfunctionsv2&pivots=programming-language-csharp)        |
        |`repair/index.ts`     | The main file of a function in Azure Functions.        |
        |`appPackage/apiSpecificationFiles/repair.yml`     |  A file that describes the structure and behavior of the repair API.       |
        |`appPackage/responseTemplates/repair.json`     |  A generated Adaptive Card that used to render API response.       |
        |`repairsData.json`    |  The data source for the repair API.       |

   # [OpenAPI Description](#tab/openapi-specification)

   1. Enter or browse the OpenAPI Description document location.

      :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-plugin-copilot-openapi-spec-location.png" alt-text="Screenshot shows the option to select OpenAPI Description document location.":::

   1. From the API list, select the GET API and select **OK**.

      > [!NOTE]
      > GET and POST APIs are supported for API based message extensions.

   1. Select **Default folder**.
   1. Enter the name of your app and select **Enter**. Teams Toolkit scaffolds the OpenAPI Description document and created an API-based message extension.

    ---

1. From the left pane, select **Teams Toolkit**.
1. Under **ACCOUNTS**, sign in with your [Microsoft 365 account](/microsoftteams/platform/toolkit/accounts) and Azure account if you haven't already.

   :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-accounts.png" alt-text="Screenshot shows the Microsoft 365 and Azure sign in option in Teams Toolkit.":::

1. Under **LIFECYCLE**, select **Provision**. Teams Toolkit provisions the app on Azure and displays a message.

   :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-provision-success.png" alt-text="Screenshot shows the successful completion of the provsion steps in Teams Toolkit.":::

1. From the left pane, Select **Run and Debug (Ctrl+Shift+D)**.
1. From the launch configuration dropdown, select `Preview in Teams (Edge)` or `Preview in Teams (Chrome)` . Teams Toolkit launches Teams web client in a browser window.
1. Go to a chat message and select the **Actions and apps** icon. In the flyout menu, search for your app.
1. Select the app from the list and [trigger your search commands from compose message area](/microsoftteams/platform/messaging-extensions/what-are-messaging-extensions?tabs=dotnet#search-commands).

   :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-invoke-teams.png" alt-text="Screenshot shows that a message extension app  is invoked from the plus icon in the chat  menu and the app is displayed in the flyout menu.":::

Teams sends the search result as an Adaptive Card in the chat message.

:::image type="content" source="../assets/images/Copilot/api-based-me-ttk-sbs-result.png" alt-text="Screenshot shows the Adaptive Card with the search results in the chat message in Teams.":::

# [Teams Toolkit CLI](#tab/teams-toolkit-cli)

1. Go to **Command Prompt**.

1. Enter the following command:

   ```
   npm install -g @microsoft/teamsfx-cli@2.0.3-beta.2023101103.0
   ```

1. Type `teamsfx new` in the terminal

1. Select **Message Extension**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-CLI-new-project-me.png" alt-text="Screenshot shows Teams capabilities as options in the CLI interface.":::

1. Select **Custom Search Results**.

1. Select **Start from an OpenAPI Description Document**.

1. Enter a valid URL or local path of your OpenAPI Description document.

1. Select the APIs from the list and select **Enter**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-CLI-API-options-me.png" alt-text="Screenshot shows the list of API extracted from the OprnOpenAPI Description document document in the command prompt.":::

1. Enter the location for your project and select **Enter**.

1. Enter the name of your application and select **Enter**.

   :::image type="content" source="../assets/images/Copilot/api-based-CLI-project-done-me.png" alt-text="Screenshot shows the message that the project is created in the required project folder.":::

1. Go to the folder path where your project is created and enter the following command to provision your app in Azure:

   ```teamsfx provision --env dev```
   Teams Toolkit CLI opens a browser window and requests you to sign in to your Microsoft Account.

1. Sign in to your Microsoft account. Teams Toolkit CLI will execute validation and provisions your app on Azure.

   :::image type="content" source="../assets/images/Copilot/api-based-CLI-provision-me.png" alt-text="Screenshot shows the sign in request and the provision stages in the command prompt window.":::

1. In the command prompt window, enter the following command to preview your app in Teams:

   ```Preview the app: teamsfx preview --env dev```

 A new browser window with Teams web client opens. You can add your app to Teams.

<!--
# [Visual Studio](#tab/visual-studio)

1. Open Visual Studio.
1. Go to **File** > **New** > **Project...** or **New Project**.

1. Search for **Teams** and select **Microsoft Teams App**.

1. Select **Plugin for Copilot**.

1. Select any of the following options:
   * Start with a new API
   * Start with an OpenAPI Description

1. Select **Next**.
1. Enter OpenAPI Description URL or select **Browse..** to upload a file from your local machine.
1. Select the APIs from the list you want the app to interact with.
1. Select **Create**. The project is scaffolded and you can find API spec, manifest and response template files in the **appPackage** folder.
1. To provision, select **Project** > **Teams Toolkit** > **Provision in the cloud...**.
1. To preview your app in Teams, Select **Project** > **Teams Toolkit** > **Preview in** > **Teams**.
-->

---

## Step-by-step guides

To build an API-based message extension, follow these step-by-step guides:

* [For beginners](../sbs-api-me-ttk.yml): Build an API-based message extension using Teams Toolkit.
* [For advanced users](../sbs-api-based-message-extensions.yml): Build an API-based message extension from the ground up.
