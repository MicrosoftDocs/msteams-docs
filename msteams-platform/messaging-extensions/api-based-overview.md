---
title: API-based Message extension
author: v-ypalikila
description: Learn how to build an API message extension.
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
ms.date: 09/07/2023
---

# API-based Message extension

> [!NOTE]
>
> * API-based message extensions is available in [public preview](../resources/dev-preview/developer-preview-intro.md).
> * API-based message extension only supports search commands.

API-based message extensions use a web service to handle user requests and responses and don't require a bot registration or a bot framework SDK. They can be configured and deployed using the Developer Portal for Teams or the Teams Toolkit.

You can create an API-based message extension in Teams using an [OpenAPI Specification](https://learn.openapis.org/specification/) document. After you've created an OpenAPI Specification document for the APIs you want to use, upload the OpenAPI Specification document to Teams Toolkit or Developer portal for Teams to generate and integrate the client code in your app's project. Create or generate an Adaptive Card template to handle the responses from the API.

API-based message extensions help your apps to interact directly with third-party data, apps, and services, enhancing its capabilities. With APIs for message extension, you can:

* Retrieve real-time information, for example, latest news coverage on a product launch.
* Retrieve knowledge-based information, for example, my team’s design files in Figma.
* Perform actions on behalf of the user, for example, create a Jira ticket.

## Prerequisites

Before you get started, ensure that you adhere to the following requirements:

* [OpenAPI Specification (OAS)](#openapi-specification)

* [Update app manifest](#update-app-manifest)

### OpenAPI Specification

OpenAPI specification (OAS) is the industry-standard specification that outlines how OpenAPI files are structured and outlined. It's a language-agnostic, human-readable format for describing APIs. It's easy for both humans and machines to read and write. The schema is machine-readable and represented in either YAML or JSON. You must have an OpenAPI specification document before you create an API-based message extension.

The following code is an example of an OpenAPI specification document in YAML format: <br/>
<br/>
<details><summary>OpenAPI specification example</summary>

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

</details>

### Response rendering template

A response rendering template is used to map the JSON responses to a preview card and Adaptive Card. The preview cards are shown for the results and when a user selects a search result. The preview is expanded to show an Adaptive Card in the compose box.

A response rendering template must be present for each search command and each command must correspond to an operation in the OpenAPI spec but not every operation defined in an API spec has to be a command. The response rendering template consists of an Adaptive Card template, Preview card template, and metadata.

**Preview Card**

:::image type="content" source="../assets/images/Copilot/api-based-message-extension-preview-card.png" alt-text="Screenshot shows an example of how the compose extension looks like, displaying an array of preview cards when searching for a specific word. In this case, searching for 'a' in the  'SME test app' returns five cards showing 'Title', 'Description' (truncated) and 'AssignedTo' properties and values in each one.":::

**Expanded Adaptive Card**

:::image type="content" source="../assets/images/Copilot/api-based-message-extension-expanded-adative-card.png" alt-text="Example of how the adaptive card looks like expanded once a user selects a preview card. The adaptive card shows the 'Title', the full 'Description', 'AssignedTo', 'RepairId' and 'Date' values.":::

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

#### Details and Schema changes

|Property  |Type  |Description  |Required  |
|--------- |---------|---------|---------|
|`version` |  `string` | The schema version of the current response rendering template.        |  Yes       |
|`jsonPath`     | `string`        | The path  to the relevant section in the results to which the responseCardTemplate and previewCardTemplate should be applied. If not set, the root object is treated as the relevant section. If the relevant section is an array, each entry is mapped to the responseCardTemplate and the previewCardTemplate.        |   No      |
|`responseLayout`    | `responseLayoutType`        |  Specifies the layout of the results in the message extension flyout. The Supported types are `list` and `grid`.       |    Yes     |
|`responseCardTemplate`    |  `adaptiveCardTemplate`  | A template for creating an adaptive card from a result entry.      |   Yes      |
|`previewCardTemplate`     |  `previewCardTemplate`       | A template for creating a preview card from a result entry. The resulting preview card is shown in the message extension flyout.        |  Yes       |

#### Schema mapping

The properties in OpenAPI specification document are mapped to the Adaptive Card template as follows:

* `string`, `number`, `integer`, `boolean` types are converted to a TextBlock.

  <details><summary>Schema mapping</summary>
  
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

* `array`: An array is converted as a container inside Adaptive Card.

  <details><summary>Schema mapping</summary>

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

  <details><summary>Schema mapping</summary>

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

* `image`: If a property is an image url, then it will be converted to an Image element in adaptive card.

  <details><summary>Schema mapping</summary>

  * **Source schema**

    ```yml
        image:
          type: string
          format: uri
          description: The URL of the image of the item to be repaired

    ```

  * **Target Schema**

    ```json
    {
          "type": "Image",
          "url": "${image}",
          "$when": "${image != null}"
        }

    ```

</details>

### Update app manifest

Update app manifest with the `composeExtensions` property. The following code is an example of the app manifest with the `composeExtensions` property:

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
|`composeExtension.type`     |  The compose extension type.  Update the value to `ApiBased`. |
|`composeExtension.apiSpecificationFile`     |  References an OpenAPI spec file in the app package. Include when type is `ApiBased`.      |
|`composeExtension.command.ID`      | A unique ID that you assign to search command. The user request includes this ID. The ID must  match the `OperationID` available in the  OpenAPI spec.       |
|`composeExtension.command.context`      | An existing array where the entry points for message extension is defined.  The possible values are `compose` or `commandBox`. The default is `["compose", "commandBox"]`. |
|`composeExtension.command.parameters`    | This property defines a static list of parameters for the command. The name must map to the `parameters.name` in the OpenAPI spec. If you're referencing a property in the request body schema, then the name must map to `properties.name` or query parameters.     |
|`composeExtension.command.apiResponseRenderingTemplateFile`| A template used to format the JSON response from developer’s API to Adaptive Card response. *Mandatory* |

For more information, see [app manifest schema](~/resources/schema/manifest-schema.md).

## Next step

> [!div class="nextstepaction"]
> [Build from an API](build-api-based-message-extension.md)

## See also

* [Build message extensions](what-are-messaging-extensions.md)
* [Bot-based Message extension](build-bot-based-message-extension.md)
