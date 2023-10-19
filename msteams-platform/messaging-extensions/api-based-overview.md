---
title: Build message extension using API (API-based)
author: v-ypalikila
description: Learn how to build an message extension using an OpenAPI description document (API).
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
ms.date: 10/19/2023
---

# Build message extension using API (API-based)

> [!NOTE]
> API-based message extensions only support search commands.

Message extensions built using API (API-based) use a web service to manage user requests and responses and don't require a bot registration or a Bot Framework. You can configure and deploy API-based message extensions using Teams Toolkit. API-based message extensions help your apps to interact directly with third-party data, apps, and services, enhancing its capabilities. With APIs for message extension, you can:

* Retrieve real-time information, such as latest news coverage on a product launch.
* Retrieve knowledge-based information, for example, my team’s design files in Figma.
* Perform actions on behalf of the user, for example, create a Jira ticket.

You can create an API-based message extension using an [OpenAPI Description (OAD)](https://learn.openapis.org/specification/) document. After you've created an OpenAPI Description document, upload the OpenAPI Description document to Teams Toolkit to generate and integrate the client code in your app's project. Create or generate a response rendering template to manage the responses from the API.

>[!IMPORTANT]
> You can build an API-based message extension now and starting early next year, the extensions will function as plugins within Copilot and enhance Copilot experience for your extensions.

## Prerequisites

Before you get started, ensure that you adhere to the following requirements:

> [!div class="checklist"]
>
> * [OpenAPI Description (OAD)](#openapi-specification)
> * [Update app manifest](#update-app-manifest)

### OpenAPI Description

The OpenAPI Description (OAD) is the industry-standard specification that details the structure and outline of OpenAPI files. It's a language-agnostic, human-readable format for describing APIs. It's designed to be easily read and written by both humans and machines. The schema is machine-readable and can be represented in either YAML or JSON. An OpenAPI Description document is required before creating an API-driven message extension.

The following code is an example of an OpenAPI Description document: <br/>
<br/>
<details><summary>OpenAPI Description example</summary>

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
          description: Used to search for AI tools by their category based on the keywords. For example, ?search="tool to create music" will give tools that can create music.
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

   For more information, see [OpenAPI structure.](https://swagger.io/docs/specification/basic-structure/)

</details>

### Response rendering template

A response rendering template maps JSON responses to a preview card and an Adaptive Card. When a user selects a search result, the preview cards appear as results. The preview card then expands into an Adaptive Card in the message compose box.

Each search command command must have a corresponding response rendering template, and each command must correspond to an operation in the OpenAPI Description. However, not every operation defined in an OpenAPI Description must be a command. The response rendering template consists of an Adaptive Card template, preview card template, and metadata.

**Preview Card**

:::image type="content" source="../assets/images/Copilot/api-based-message-extension-preview-card.png" alt-text="Screenshot shows an example of how the compose extension looks like, displaying an array of preview cards when searching for a specific word. In this case, searching for 'a' in the  'SME test app' returns five cards showing 'Title', 'Description' (truncated) and 'AssignedTo' properties and values in each one.":::

**Expanded Adaptive Card**

:::image type="content" source="../assets/images/Copilot/api-based-message-extension-expanded-adaptive-card.png" alt-text="Example of how the adaptive card looks like expanded once a user selects a preview card. The adaptive card shows the 'Title', the full 'Description', 'AssignedTo', 'RepairId' and 'Date' values.":::

The following code is an example of a Response rendering template: <br/>
<br/>
<details><summary>Response rendering template example</summary>

```json
    {
        "version": "1.0",
        "responseLayout": "grid",
        "responseCardTemplate": {
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.4",
            "body": [
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "ColumnSet",
                            "columns": [
                                {
                                    "type": "Column",
                                     "width": "stretch",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "Title: ${if(title, title, 'N/A')}",
                                            "wrap": true
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "Description: ${if(description, description, 'N/A')}",
                                            "wrap": true
                                        },
                                        {
                                            "type": "TextBlock",
                                            "text": "Assigned To: ${if(assignedTo, assignedTo, 'N/A')}",
                                            "wrap": true
                                        },
                                        {
                                            "type": "Image",
                                            "url": "${image}",
                                            "size": "Medium",
                                            "$when": "${image != null}"
                                        }
                                    ]
                                },
                                {
                                    "type": "Column",
                                    "width": "auto",
                                    "items": [
                                        {
                                            "type": "Image",
                                            "url": "${if(image, image, '')}",
                                            "size": "Medium"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "FactSet",
                            "facts": [
                                {
                                    "title": "Repair ID:",
                                    "value": "${if(id, id, 'N/A')}"
                                },
                                {
                                    "title": "Date:",
                                    "value": "${if(date, date, 'N/A')}"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "previewCardTemplate": {
            "title": "Title: ${if(title, title, 'N/A')}",
            "subtitle": "Description: ${if(description, description, 'N/A')}",
            "text": "Assigned To: ${if(assignedTo, assignedTo, 'N/A')}",
            "image": {
            "url": "${image}",
            "$when": "${image != null}"
              }
            }
        }
    }
```

</details>

#### Parameters

|Property  |Type  |Description  |Required  |
|--------- |---------|---------|---------|
|`version` |  `string` | The schema version of the current response rendering template.        |  Yes       |
|`jsonPath`     | `string`        | The path  to the relevant section in the results to which the responseCardTemplate and previewCardTemplate should be applied. If not set, the root object is treated as the relevant section. If the relevant section is an array, each entry is mapped to the responseCardTemplate and the previewCardTemplate.        |   No      |
|`responseLayout`    | `responseLayoutType`        |  Specifies the layout of the results in the message extension flyout. The Supported types are `list` and `grid`.       |    Yes     |
|`responseCardTemplate`    |  `adaptiveCardTemplate`  | A template for creating an adaptive card from a result entry.      |   Yes      |
|`previewCardTemplate`     |  `previewCardTemplate`       | A template for creating a preview card from a result entry. The resulting preview card is displayed in the message extension flyout menu.        |  Yes       |

#### Schema mapping

The properties in OpenAPI Description document are mapped to the Adaptive Card template as follows:

* `string`, `number`, `integer`, `boolean` types are converted to a TextBlock.

  <details><summary>Example</summary>
  
  * **Source Schema**: `string`, `number`, `integer`, and `boolean`

       ```yml
        name:
          type: string
          example: doggie

  * **Target Schema**: `Textblock`

      ```json
      {
      "type": "TextBlock",
      "text": "name: ${if(name, name, 'N/A')}",
      "wrap": true
    }
      ```

</details>

* `array`: An array is converted to a container inside Adaptive Card.

  <details><summary>Example</summary>

  * **Source schema**: `array`

    ```yml
        type: array
                  items:
                  required:
                    - name
                  type: object
                    properties:
                    id:
                      type: integer
                    category:
                      type: object
                      properties:
                      name:
                        type: string
    ```

  * **Target Schema**: `Container`

    ```json
        {
                  "type": "Container",
                  "$data": "${$root}",
                  "items": [
                    {
                      "type": "TextBlock",
                      "text": "id: ${if(id, id, 'N/A')}",
                      "wrap": true
                    },
                    {
                      "type": "TextBlock",
                      "text": "category.name: ${if(category.name, category.name, 'N/A')}",
                      "wrap": true
                    }
                  ]
                }
                
    ```

</details>

* `object`: An object is converted to a nested property in Adaptive Card.

  <details><summary>Example</summary>

  * **Source Schema**: `object`

    ```yml
    components:
      schemas:
        Pet:
            category:
              type: object
            properties:
              id:
                type: integer
              name:
                type: string

    ```

  * **Target Schema**: Nested property in an Adaptive Card

    ```json
    {
      "type": "TextBlock",
      "text": "category.id: ${if(category.id, category.id, 'N/A')}",
      "wrap": true
    },
    {
      "type": "TextBlock",
      "text": "category.name: ${if(category.name, category.name, 'N/A')}",
      "wrap": true
    }

    ```

</details>

* `image`: If a property is a image URL, then it's converted to an Image element in the Adaptive Card.

  <details><summary>Example</summary>

  * **Source schema**: `image`

    ```yml
        image:
          type: string
          format: uri
          description: The URL of the image of the item to be repaired

    ```

  * **Target Schema**: `"Image"`

    ```json
    {
          "type": "Image",
          "url": "${image}",
          "$when": "${image != null}"
        }

    ```

</details>

### Update app manifest

Update app manifest (previously called Teams app manifest) with the `composeExtensions` property. The following code is an example of the app manifest with the `composeExtensions` property:

```json
{
    "$schema": "https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json",
    "manifestVersion": "devPreview",
    "version": "1.0.3",
    "id": "55490e7f-xxxx-xxxx-xxxx-9eea9281b0fa",
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
        "short": "sampletest2809-dev",
        "full": "Full name for sampletest2809"
    },
    "description": {
        "short": "Open AI Klarna product Api",
        "full": "Full description for sampletest2809"
    },
    "accentColor": "#FFFFFF",
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

|Name  |Description  |
|---------|---------|
|`composeExtension.type`     |  Compose extension type.  Update the value to `apiBased`. |
|`composeExtension.apiSpecificationFile`     |  References an OpenAPI Description file in the app package. Include when type is `apiBased`.      |
|`composeExtension.command.ID`      | Unique ID that you assign to search command. The user request includes this ID. The ID must match the `OperationID` available in the OpenAPI Description.       |
|`composeExtension.command.context`      | Array where the entry points for message extension is defined. The default values are `compose` and `commandBox`. |
|`composeExtension.command.parameters`    | Defines a static list of parameters for the command. The name must map to the `parameters.name` in the OpenAPI Description. If you're referencing a property in the request body schema, then the name must map to `properties.name` or query parameters.     |
|`composeExtension.command.apiResponseRenderingTemplateFile`| Template used to format the JSON response from developer’s API to Adaptive Card response. *[Mandatory]* |

For more information, see [composeExtensions](../resources/schema/manifest-schema-dev-preview.md#composeextensions).

## Next step

> [!div class="nextstepaction"]
> [Build from an API](build-api-based-message-extension.md)

## See also

* [Build message extensions](what-are-messaging-extensions.md)
* [Bot-based Message extension](build-bot-based-message-extension.md)
