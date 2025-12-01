---
title: Create API-based Message Extension
author: surbhigupta
description: Learn to build message extension from OpenAPI description document (OAD) with Developer Portal for Teams, Visual Studio Code, Agents Toolkit CLI, or Visual Studio.
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
ms.owner: slamba
ms.date: 02/26/2025
---

# API-based message extension

> [!NOTE]
>
> * API-based message extensions support only search commands.
> * API-based message extensions aren't supported in Microsoft 365 Copilot. If developers want to create API-based message extensions compatible with Microsoft 365 Copilot, see [API agents for Microsoft 365 Copilot](/microsoft-365-copilot/extensibility/overview-api-plugins).

Message extensions built using API (API-based) use web service to manage user requests and responses and require no bot registration. API-based message extensions are Microsoft Teams app capability that integrates external APIs directly into Teams, enhances app usability, and offers seamless user experience. API-based message extensions support search commands and fetch and display data from external services within Teams, streamlining workflows by reducing need to switch between applications. API-based message extensions help apps interact directly with third-party data, apps, and services, enhancing capabilities. With API-based message extension, developers can:

* Retrieve real-time information, such as latest news coverage on product launch.
* Retrieve knowledge-based information, for example, my team’s design files in Figma.

See the video to learn more about building API-based message extension using Microsoft 365 Agents Toolkit (previously known as Teams Toolkit):
</br>
</br>

> [!VIDEO https://www.youtube.com/embed/jSYNHz6hz4Y?si=htmfWtlY9bYH_RT2]

<br>

|Traditional bot-based message extensions  |API-based message extensions  |
|---------|---------|
|Developers need to build, deploy, and maintain service to handle invoke commands from Teams client.     | If end-service's APIs can be described using OpenAPI Specification, developers can eliminate need for middle-layer handling service.         |
|This service processes incoming query and calls developer’s end-service.     | Teams can directly use the [OpenAPI Specification](https://swagger.io/resources/open-api/) to build requests and communicate with developer's end-service.        |

The following images show flow of user queries through Traditional message extensions and API message extensions:

:::image type="content" source="../assets/images/Copilot/api-based-me-flow.png" alt-text="Screenshot shows user query flow between user, Teams Client, and Teams bot service using Traditional message extensions. The diagram also shows how API spec, rendering templates, and API relate to each other." lightbox="../assets/images/Copilot/api-based-me-flow.png":::
*User query flow using Traditional Message Extensions. Developers must maintain custom bot handler service, which handles requests from Teams bot. Handler service sends request to developer’s service when query is invoked.*

<br>

:::image type="content" source="../assets/images/Copilot/api-based-me-flow-2.png" alt-text="Screenshot shows query flow between user, Teams Client, and Teams bot service using API Message Extensions. The diagram also shows how API spec, rendering templates, and API relate to each other." lightbox="../assets/images/Copilot/api-based-me-flow-2.png":::
*User query flow using API Message Extensions. No developer maintained handler service is needed as long as interaction is clearly outlined in OpenAPI Specification in App Package.*

<br>
<br>

Here's high-level sequence of events that occur during query command invocation:

1. When user invokes query command, parameters of query command are received by Teams Bot Service.
1. Query command is defined inside app manifest file. Command definition contains reference to `operationId` inside OpenAPI Specification file along with details of parameters that Teams client renders for that command. For reference, `operationId` inside OpenAPI Specification file is unique to particular HTTP operation.
1. Teams Bot Service uses parameters supplied by user along with copy of OpenAPI Specification for associated `operationId` to build HTTP request for developer’s endpoint.
1. If authentication is required and configured in manifest, it resolves to appropriate token or key. This token or key is used as part of outgoing request. *[Optionally]*
1. Teams Bot Service performs HTTP request to developer’s service.
1. Developer’s service responds in accordance with schema outlined in OpenAPI Specification in JSON format.
1. Teams client shows results back to user. To convert JSON results from previous step to UI, Teams Bot Service uses response Rendering template to build Adaptive Card for each result.
1. Adaptive Cards are sent to client, which renders them in UI.

:::image type="content" source="../assets/images/Copilot/api-based-me-query-sequence-diagram.png" alt-text="Diagram shows high-level sequence flow when query is invoked in API-based message extension." lightbox="../assets/images/Copilot/api-based-me-query-sequence-diagram.png":::

## Prerequisites

App definition package includes various compelling artifacts that support functionality of this feature. Before getting started, ensure developers have basic understanding of following files:

> [!div class="checklist"]
>
> * [OpenAPI Description (OAD)](#openapi-description-oad)
> * [App manifest](#app-manifest)
> * [Response rendering template](#response-rendering-template)

### OpenAPI Description (OAD)

OpenAPI description document is adopted industry standard for describing APIs. It allows abstraction of APIs from their implementation, providing language-agnostic definitions that are both human-readable and machine-readable. OpenAPI description document outlines interactions extension supports, enabling Teams to build requests and communicate directly with developer’s service without need for middle-layer handling service.

OpenAPI description document contains details to communicate with developer’s service. Ensure adherence to following guidelines for OpenAPI Description (OAD) document:

* OpenAPI versions 2.0 and 3.0.x are supported.
* JSON and YAML are supported formats.
* Request body, if present, must be application/Json.
* Define HTTPS protocol server URL for `servers.url` property.
* Only POST and GET HTTP methods are supported.
* OpenAPI Description document must have an `operationId`.
* Only one required parameter without default value is allowed.
* A required parameter with default value is considered optional.
* Users must not enter parameter for header or cookie.
* Operation must not have required header or cookie parameters without default values.
* Ensure there are no remote references in OpenAPI Description document.
* Constructing arrays for request isn’t supported; however, nested objects within JSON request body are supported.
* Teams doesn't support `oneOf`, `anyOf`, `allOf`, and `not` (swagger.io) constructs.

The following code is example of OpenAPI Description document:

<details><summary>Sample OpenAPI Description document</summary>

```yml
openapi: 3.0.1
info:
  title: OpenTools Plugin
  description: A plugin that allows user to find most appropriate AI tools for their use cases, with their pricing information.
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
          description: Used to search for AI tools by their category based on keywords. For example, ?search="tool to create music" will give tools that can create music.
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

</details>
<br>

For more information on how to write OpenAPI definitions in YAML, see [OpenAPI structure.](https://swagger.io/docs/specification/basic-structure/)

### App manifest

App manifest is blueprint for Teams app, defining how and where message extension is invoked within Teams client. It includes commands extension supports and locations from which they can be accessed, such as compose message area, command bar, and message. Manifest links to OpenAPI Specification and Response Rendering Template to ensure proper functionality.

App manifest contains query command definition. Ensure adherence to following guidelines for app manifest:

* Set app manifest version to `1.17`.
* Set `composeExtensions.composeExtensionType` to `apiBased`.
* Define `composeExtensions.apiSpecificationFile` as relative path to OpenAPI Description document within folder. This links app manifest to API specification.
* Define `apiResponseRenderingTemplateFile` as relative path to response rendering template. This specifies location of template used for rendering API responses.
* Each command must have link to response rendering template. This connects each command to its corresponding response format.
* `Commands.id` property in app manifest must match `operationId` in OpenAPI Description document.
* If required parameter is without default value, command `parameters.name` in app manifest must match `parameters.name` in OpenAPI Description document.
* If there’s no required parameter, command `parameters.name` in app manifest must match optional `parameters.name` in OpenAPI Description document.
* Ensure that name of parameters for each command in app manifest match exactly with corresponding name of parameter defined for operation in OpenAPI Description document.
* A response rendering template must be defined per command, which is used to convert responses from API.
* Command and parameter descriptions must not exceed 128 characters.

The following is an app manifest example with definitions for API-based message extensions:

<details><summary>App manifest example</summary>

  ```json
   {
   "$schema": "https://developer.microsoft.com/json-schemas/teams/vDevPreview/MicrosoftTeams.schema.json",
   +  "manifestVersion": "devPreview",
   "version": "1.0.0",
   "id": "04805b4b-xxxx-xxxx-xxxx-4dbc1cac8f89",
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
      "short": "AI tools",
      "full": "AI tools"
   },
   "description": {
      "short": "AI tools",
      "full": "AI tools"
   },
   "accentColor": "#FFFFFF",
   "composeExtensions": [
      {
   +      "composeExtensionType": "apiBased",
   +      "authorization": {
   +        "authType": "apiSecretServiceAuth ",
   +        "apiSecretServiceAuthConfiguration": {
   +            "apiSecretRegistrationId": "96270b0f-7298-40cc-b333-152f84321813"
   +        }
   +      },
   +      "apiSpecificationFile": "aitools-openapi.yml",
         "commands": [
         {
            "id": "searchTools",
            "type": "query",
            "context": [
               "compose",
               "commandBox"
            ],
            "title": "search for AI tools",
            "description": "search for AI tools",
            "parameters": [
               {
               "name": "search",
               "title": "search query",
               "description": "e.g. search='tool to create music'"
               }
            ],
   +          "apiResponseRenderingTemplateFile": "response-template.json"
         }
         ]
      }
   ],
   "validDomains": []
   }
   ```

</details>

#### Parameters

|Name  |Description                                    |
|:---------|               ---------------------------------------------------------|
|`composeExtensions.composeExtensionType`     |  Compose extension type. Update value to `apiBased`. |
|`composeExtensions.authorization`|Authorization related information for API-based message extension|
|`composeExtensions.authorization.authType`|Enum of possible authorization types. Supported values are `none`, `apiSecretServiceAuth`, and `microsoftEntra`.|
|`composeExtensions.authorization.apiSecretServiceAuthConfiguration`|Object capturing details needed to do service auth. Applicable only when auth type is `apiSecretServiceAuth`.|
|`composeExtensions.authorization.apiSecretServiceAuthConfiguration.apiSecretRegistrationId`| Registration ID returned when developer submits API key through Developer Portal.|
|`composeExtensions.apiSpecificationFile`     |  References OpenAPI Description file in app package. Include when type is `apiBased`.      |
|`composeExtensions.commands.id`      | Unique ID assigned to search command. User request includes this ID. ID must match corresponding `operationId` in OpenAPI Description.       |
|`composeExtensions.commands.context`      | Array where entry points for message extension are defined. Default values are `compose` and `commandBox`. |
|`composeExtensions.commands.parameters`    | Defines static list of parameters for command. Name must map to `parameters.name` in OpenAPI Description. If referencing property in request body schema, name must map to `properties.name` or query parameters.     |
|`composeExtensions.commands.apiResponseRenderingTemplateFile`| Template used to format JSON response from developer’s API to Adaptive Card response. *[Mandatory]* |

For more information, see [composeExtensions](/microsoft-365/extensibility/schema/root-compose-extensions).

### Response rendering template

Response rendering template is predefined format that dictates how results from API are displayed within Teams. It uses templates to create Adaptive Cards or other UI elements from API response, ensuring seamless and integrated user experience within Teams. Template defines layout and style of information presented, which can include text, images, and interactive components. Ensure adherence to following guidelines for response rendering template:

* Define schema reference URL in `$schema` property to establish structure of template to [response rendering template schema](https://developer.microsoft.com/json-schemas/teams/v1.17/MicrosoftTeams.ResponseRenderingTemplate.schema.json).
* Supported values for `responseLayout` are `list` and `grid`, which determine how response is visually presented. For more information on layout, see [respond to user requests](how-to/search-commands/respond-to-search.md#respond-to-user-requests).
* A `jsonPath` is required for arrays or when data for Adaptive Card is not root object. For example, if data is nested under `productDetails`, JSON path is `productDetails`.
* Define `jsonPath` as path to relevant data or array in API response. If path points to an array, then each entry in array binds with Adaptive Card template and returns as separate result. *[Optional]*
* Get sample response for validating response rendering template. This serves as test to ensure template works as expected.
* Use tools such as Fiddler or Postman to call API and ensure that request and response are valid. This step is crucial for troubleshooting and confirming that API is functioning correctly.
* Use Adaptive Card Designer to bind API response to response rendering template and preview Adaptive Card. Insert Adaptive Card template in **CARD PAYLOAD EDITOR** and insert sample response entry in **SAMPLE DATA EDITOR**.

The following code is example of a Response rendering template: <br/>
<br/>
  <details><summary>Response rendering template example</summary>

  ```json
  {
  "version": "1.0",
  "$schema": "developer.microsoft.com/json-schemas/teams/v1.17/MicrosoftTeams.ResponseRenderingTemplate.schema.json",
  "jsonPath": "repairs",
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
   ```

  </details>

  **Preview Card**

A preview card template in response rendering template schema is used to map JSON responses to preview card that users see when they select search result. Preview card then expands into Adaptive Card in message compose box. Preview card template is part of response rendering template, which also includes Adaptive Card template and metadata.

  :::image type="content" source="../assets/images/Copilot/api-based-message-extension-preview-card.png" alt-text="Screenshot shows example of compose extension displaying array of preview cards when searching for specific word. In this case, searching for 'a' in 'test app' returns five cards showing 'Title', 'Description' (truncated) and 'AssignedTo' properties and values in each one.":::

 **Expanded Adaptive Card**

  :::image type="content" source="../assets/images/Copilot/api-based-message-extension-expanded-adaptive-card.png" alt-text="Example of how Adaptive Card looks when expanded once user selects a preview card. Adaptive Card shows Title, full Description, AssignedTo, RepairId, and Date values.":::

#### Parameters

|Property  |Type  |Description  |Required  |
|--------- |---------|---------|---------|
|`version` |  `string` | Schema version of current response rendering template.        |  Yes       |
|`jsonPath`     | `string`        | Path to relevant section in results to which responseCardTemplate and previewCardTemplate should be applied. If not set, root object is treated as relevant section. If relevant section is an array, each entry is mapped to responseCardTemplate and previewCardTemplate.        |   No      |
|`responseLayout`    | `responseLayoutType`        | Specifies layout of results in message extension flyout. Supported types are `list` and `grid`.       |    Yes     |
|`responseCardTemplate`    |  `adaptiveCardTemplate`  | Template for creating an Adaptive Card from a result entry.      |   Yes     |
|`previewCardTemplate`     |  `previewCardTemplate`       | Template for creating preview card from a result entry. Resulting preview card is displayed in message extension flyout menu.        |  Yes       |

#### Json path

[JSON path](https://www.newtonsoft.com/json/help/html/QueryJsonSelectToken.htm) is optional but should be used for arrays or when object to be used as data for Adaptive Card is not root object. JSON path follows format defined by Newtonsoft. This tool can be used. Developers can use [JSON tool](https://jsonpath.com/) to validate if JSON path is correct. If JSON path points to an array, then each entry in that array binds with Adaptive Card template and returns as separate results.

**Example**
Assume following JSON for list of products and developers want to create card result for each entry.

```json
{
   "version": "1.0",
   "title": "All Products",
   "warehouse": {
      "products": [
        ...
      ]
   }
}
```

As seen, array of results is under "products", which is nested under "warehouse", so JSON path is "warehouse.products".

Use [Adaptive Card Designer](https://adaptivecards.microsoft.com/designer.html) to preview an Adaptive Card by inserting template into Card Payload Editor. Take sample response entry from array or for object and insert it into Sample Data Editor. Ensure that card renders properly and meets requirements.

## OpenAPI schema conversion

> [!NOTE]
> API sends accept-language header in HTTP request to endpoint defined in OpenAPI description document. Accept-language is based on Teams client locale and can be used by developer for returning localized response.

Following data types in OpenAPI description document are converted into elements within Adaptive Card as follows:

* `string`, `number`, `integer`, `boolean` types are converted to TextBlock.

  <details><summary>Example</summary>
  
  * **Source Schema**: `string`, `number`, `integer`, and `boolean`

       ```yml
        name:
          type: string
          example: doggie
       ```

  * **Target Schema**: `Textblock`

      ```json
      {
      "type": "TextBlock",
      "text": "name: ${if(name, name, 'N/A')}",
      "wrap": true
    }
      ```

  </details>

* `array`: An array is converted to container inside Adaptive Card.

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

* `object`: An object is converted to nested property in Adaptive Card.

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

  * **Target Schema**: Nested property in Adaptive Card

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

* `image`: If property is image URL, then it converts to Image element in Adaptive Card.

  <details><summary>Example</summary>

  * **Source schema**: `image`

    ```yml
        image:
          type: string
          format: uri
          description: URL of image of item to be repaired

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

## Next step

> [!div class="nextstepaction"]
> [Build API-based message extension](build-api-based-message-extension.md)

## See also

* [Build a custom engine agent](/microsoft-365-copilot/extensibility/overview-custom-engine-agent?toc=/microsoftteams/platform/toc.json&bc=/microsoftteams/platform/breadcrumb/toc.json)
* [Build a declarative agent](/microsoft-365-copilot/extensibility/overview-declarative-agent)