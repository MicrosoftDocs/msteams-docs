---
title: Message extension plugin
author: v-ypalikila
description: Learn how to build an API and bot based message extensions for Teams with openAPI specification or chatGPT plugin manifest.
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
ms.date: 09/05/2023
---

# Message extension plugin

Meetings users can interact with copilot to perform search and action-based scenarios with Microsoft and third-party plugins (existing bot-based message extensions) via natural language and custom prompts. For example, users can perform an action with a  plugin in a meeting or query and discover content from the plugins.

Meetings copilot will process these actions and render them appropriately and provide extensibility actions such - open URL, share content in meeting, launch task module and app acquisition without leaving meeting copilot.

## Build message extension plugin

1. Create a ChatGPT plugin or OpenAPI specification document in JSON or YAML format.

   The following is an example of an API spec in YAML format:

   ```yml
   openapi: 3.0.0
    info:
      title: Repair Service
      description: A simple service to manage repairs for various items
      version: 1.0.0
    servers:
      - url: https://repairs-api-2023.azurewebsites.net/
    paths:
      /repairs:
        get:
          operationId: listRepairs
          summary: List all repairs
          description: Returns a list of repairs with their details and images
          parameters:
            - name: assignedTo
              in: query
              description: Filter repairs by who they're assigned to
              schema:
                type: string
              required: false
          responses:
            '200':
              description: A successful response
              content:
                application/json:
                  schema:
                    type: array
                    items:
                      type: object
                      properties:
                        id:
                          type: integer
                          description: The unique identifier of the repair
                        title:
                          type: string
                          description: The short summary of the repair
                        description:
                          type: string
                          description: The detailed description of the repair
                        assignedTo:
                          type: string
                          description: The user who is responsible for the repair
                        date:
                          type: string
                          format: date-time
                          description: The date and time when the repair is scheduled or completed
                        image:
                          type: string
                          format: uri
                          description: The URL of the image of the item to be repaired or the repair process
        post:
          operationId: createRepair
          summary: Create a new repair
          description: Adds a new repair to the list with the given details and image URL
          requestBody:
            required: true
            content:
              application/json:
                schema:
                  type: object
                  properties:
                    title:
                      type: string
                      description: The short summary of the repair
                    description:
                      type: string
                      description: The detailed description of the repair
                    assignedTo:
                      type: string
                      description: The user who is responsible for the repair
                    date:
                      type: string
                      format: date-time
                      description: The optional date and time when the repair is scheduled or completed
                    image:
                      type: string
                      format: uri
                      description: The URL of the image of the item to be repaired or the repair process
                  required:
                    - title
                    - description
                    - assignedTo
          responses:
            '201':
              description: A successful response indicating that the repair was created
   ```

## Manifest Update

 Update the app manifest with the composeExtensions property. The following is an example of the app manifest with the `composeExtensions` property:

   ```json
   {
      "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.17/MicrosoftTeams.schema.json",
      "manifestVersion": "1.17",
      "version": "1.0.0",
      "id": "%MICROSOFT-APP-ID%",
      "localizationInfo": {
        "defaultLanguageTag": "en-us",
        "additionalLanguages": [
          {
            "languageTag": "es-es",
            "file": "en-us.json"
          }
        ]
      },
      "developer": {
        "name": "Publisher Name",
        "websiteUrl": "https://example.com/",
        "privacyUrl": "https://example.com/privacy",
        "termsOfUseUrl": "https://example.com/app-tos",
        "mpnId": "1234567890"
      },
      "name": {
        "short": "Name of your app (<=30 chars)",
        "full": "Full name of app, if longer than 30 characters (<=100 chars)"
      },
      "description": {
        "short": "Short description of your app (<= 80 chars)",
        "full": "Full description of your app (<= 4000 chars)"
      },
      "icons": {
        "outline": "A relative path to a transparent .png icon — 32px X 32px",
        "color": "A relative path to a full color .png icon — 192px X 192px"
      },
      "accentColor": "A valid HTML color code.",
      "composeExtensions": [
        {
          "type": "ApiBased",
          "apiSpecFile": "listrepairsapispec.yaml",
          "commands": [
            {
              "context": [
                "compose"
              ],
              "type": "query",
              "id": "listRepairs",
              "title": "List repairs",
              "parameters": [
                {
                  "title": "Filter",
                  "name": "filter",
                  "description": "Filter repairs by who they're assigned to."
                }
              ],
              "apiResponseRenderingTemplateFile": "listrepairsresponsetemplate.json"
            }
          ]
        }
      ],
      "validDomains": [
        "repairs-api-2023.azurewebsites.net"
      ]
    }

   ```

In the app manifest, Include a JSON path for the response schema. If you don't have a JSON path, Teams will check the root object/array for the JSON file. Ensure that the app has the following information:

* App name
* App color icon
* App outline icon
* Terms of Service URL
* Privacy policy URL
* The authentication type in `composeExtension.auth`: no auth, aad, oauth, or service_http.

### Query Parameters

|Name  |Description  |
|---------|---------|
|`composeExtension.type`     |   We take an OpenAPI spec and it can either be used by BizChat to figure out how/when to call the API, or used by dev toolkit to help generate manifest/Adaptive Card templates.  Update the value as `apiSpecification`. |
|`composeExtension.apiSpecificationFile`     | Include when type is `ApiBased`. This references an OpenAPI spec file in the app package. Used to get the endpoint url, if not specified, construct the http request and also used by Biz chat to figure out how to call and process a response.        |
|ComposeExtension.supportsConversationalAI     |  If you want the app to work in a BizChat or API Copilot plugins, set the value to **true**.  The default is **false**.  |
|ComposeExtension.auth     | Authentication option when calling an API. Supported options are no, auth, aad, oauth, and service_http|
|`ComposeExtension.LLMdescription`     | For API Plugin. LLM description        |
|`composeExtension.command.ID`      |  For API MEs. The ID must  match the `OperationID` available in the  OpenAPI spec.       |
|`composeExtension.command.context`      |For API MEs.  An existing array where the entry points for ME is defined. The supported values are **compose**: Message Extension to show up as compose extension, **commandBox**: Message Extension to show up in Powerbar, and **message**: Message action |
|`composeExtension.command.parameters`    |For API MEs. Include Title, Name, Description. The Name must map to the parameter name in the OpenAPI spec.     |
|`composeExtension.command.apiResponseRenderingTemplateFile`| A template used to format the JSON response from developer’s API to Adaptive card response. The property is mandatory for `ApiBased` composeExtensions type.   |
|`ComposeExtension.LLMdescription`|Description for the LLM |

### Build API based Message extension

# [Developer Portal for Teams](#tab/developer-portal-for-teams)

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

#### Update command details

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

### Create an API ME or plugin using an existing Bot based ME

1. Go to Teams developer portal.
1. Select an app with an existing bot based ME.
1. Under Configure, select App features.
1. Select Copilot/Messaging extension.
1. Select Add an API based message extension.

   You can only publish a message extension or a copilot plugin at a time. A suggestion dialog opens.

1. Select any of the following options:
   1. Create a new copilot plugin and make this as default.
   1. Create a new copilot plugin and keep my existing message extension as  default.
1. Select Continue.

# [Teams toolkit](#tab/Teams-toolkit)

1. Open Visual Studio Code.
1. From the left pane, Select Teams Toolkit.
1. Select **Plugin for Copilot**.
1. Select any of the following options:
    1. Start with a new API.
    1. Start with an OpenAPI specification.
    1. Start with an OpenAI plugin.
1. Follow these steps for the respective API types:

# [New API](#tab/new-api)

   1. Select a programming language.
   1. Select Default folder.
   1. Enter the name of your app and select Enter.

# [OpenAPI specification](#tab/openapi-specification)

   1. Enter or browse the OpenAPI specification doc location.
   1. From the API list, select the GET API and select OK.
   1. Select Default folder.
   1. Enter the name of your app and select Enter.

# [Open AI plugin](#tab/open-ai-plugin)

   1. Enter your website domain where you've hosted the Open AI plugin manifest.
   1. Select Enter.

   ---

You can also build bot based message extensions.

---

### Build API based Message extension

### Create a bot based message extension using Teams toolkit

1. Open Visual Studio Code.
1. From the left pane, Select Teams Toolkit.
1. Select Create a New App.
1. Select Message Extension.
1. Select Custom Search Results.
1. Select a programming language.
1. Select Default folder.
1. Enter the name of your app and select Enter.
