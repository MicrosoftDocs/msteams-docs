---
title: Create API-based Message Extension
author: surbhigupta
description: Learn to build a message extension from OpenAPI description document (OAD) with Developer Portal for Teams, Visual Studio Code, Agents Toolkit CLI, or Visual Studio.
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

API-based message extensions use a web service to manage user requests and responses without requiring a bot registration. This Microsoft Teams app capability integrates external APIs directly into Teams, enhancing app usability and delivering a seamless user experience. API-based message extensions support search commands and enable developers to fetch and display data from external services within Teams, streamlining workflows by reducing application switching. They allow apps to interact directly with third-party data, applications, and services, extending functionality. With an API-based message extension, developers can:

* Retrieve real-time information, such as the latest news coverage on a product launch.
* Retrieve knowledge-based information, for example, team design files in Figma.

See the video to learn more about building an API-based message extension using Microsoft 365 Agents Toolkit (previously known as Teams Toolkit):
</br>
</br>

> [!VIDEO https://www.youtube.com/embed/jSYNHz6hz4Y?si=htmfWtlY9bYH_RT2]

<br>

|Traditional bot-based message extensions  |API-based message extensions  |
|---------|---------|
|Developers need to build, deploy, and maintain a service to handle invoke commands from the Teams client.     |If the end-service's APIs can be described using the OpenAPI Specification, developers eliminate the need for a middle-layer handling service.         |
|This service processes the incoming query and calls the developer’s end-service.     |Teams directly use the [OpenAPI Specification](https://swagger.io/resources/open-api/) to build requests and communicate with the developer's end-service.        |

The images illustrate the flow of user queries through Traditional message extensions and API message extensions:

:::image type="content" source="../assets/images/Copilot/api-based-me-flow.png" alt-text="Screenshot shows user query flow between a user, Teams Client, and Teams bot service using Traditional message extensions. The diagram also shows how the API spec, the rendering templates, and the API relate to each other." lightbox="../assets/images/Copilot/api-based-me-flow.png":::
*User query flow using Traditional Message Extensions. Developers must maintain a custom bot handler service that processes requests from a Teams bot. The handler service sends a request to the developer’s service upon query invocation.*

<br>

:::image type="content" source="../assets/images/Copilot/api-based-me-flow-2.png" alt-text="Screenshot shows the query flow between a user, Teams Client, and Teams bot service using API Message Extensions. The diagram also shows how the API spec, the rendering templates, and the API relate to each other." lightbox="../assets/images/Copilot/api-based-me-flow-2.png":::
*User query flow using API Message Extensions. No developer-maintained handler service is required if the interaction is clearly outlined in the OpenAPI Specification in the App Package.*

<br>
<br>

The high-level sequence of events during a query command invocation is as follows:

1. A user invokes a query command, and Teams Bot Service receives the command parameters.
2. The query command, defined in the app manifest file, references an `operationId` inside the OpenAPI Specification file and details the parameters rendered by the Teams client. The `operationId` in the OpenAPI Specification file uniquely identifies a particular HTTP operation.
3. Teams Bot Service uses the user-supplied parameters along with the OpenAPI Specification copy for the associated `operationId` to build an HTTP request for the developer’s endpoint.
4. If authentication is configured in the manifest and required, the process resolves it to the appropriate token or key, which then becomes part of the outgoing request. *[Optionally]*
5. Teams Bot Service performs the HTTP request to the developer’s service.
6. The developer’s service responds in accordance with the schema specified in the OpenAPI Specification in JSON format.
7. Teams client displays the results back to the user. Teams Bot Service converts the JSON results to UI elements using the response Rendering template to build an Adaptive Card for each result.
8. Teams client renders the Adaptive Cards in the UI.

:::image type="content" source="../assets/images/Copilot/api-based-me-query-sequence-diagram.png" alt-text="Diagram shows the high-level sequence flow when a query is invoked in an API-based message extension." lightbox="../assets/images/Copilot/api-based-me-query-sequence-diagram.png":::

## Prerequisites

The app definition package includes several artifacts that support this feature. Before proceeding, ensure an understanding of the following files:

> [!div class="checklist"]
>
> * [OpenAPI Description (OAD)](#openapi-description-oad)
> * [App manifest](#app-manifest)
> * [Response rendering template](#response-rendering-template)

### OpenAPI Description (OAD)

The OpenAPI description document is an industry-standard model for describing APIs. It abstracts APIs from their implementation, providing language-agnostic definitions that are human-readable and machine-readable. The document outlines the interactions the extension supports, allowing Teams to build requests and communicate directly with the service without a middle-layer handling service.

The document contains details for communicating with the developer’s service. Developers must adhere to the following guidelines for the OpenAPI Description (OAD) document:

* OpenAPI versions 2.0 and 3.0.x are supported.
* JSON and YAML formats are supported.
* The request body, if present, must be application/Json.
* Define an HTTPS protocol server URL for the servers.url property.
* Only POST and GET HTTP methods are supported.
* The OpenAPI Description document must include an `operationId`.
* Only one required parameter without a default value is allowed.
* A required parameter with a default value is considered optional.
* Users must not enter a parameter for a header or cookie.
* The operation must not have required header or cookie parameters without default values.
* Avoid remote references in the OpenAPI Description document.
* Constructing arrays for the request isn’t supported; however, nested objects within a JSON request body are supported.
* Teams doesn't support the oneOf, anyOf, allOf, and not (swagger.io) constructs.

The following code provides an example of an OpenAPI Description document:

<details><summary>Sample OpenAPI Description document</summary>

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

</details>
<br>

Developers refer to [OpenAPI structure.](https://swagger.io/docs/specification/basic-structure/) for details on writing OpenAPI definitions in YAML.

### App manifest

The app manifest serves as the blueprint for a Teams app. It defines how and where the message extension is invoked within the Teams client. The manifest includes the supported commands and the locations from which they can be accessed, such as the compose message area, command bar, and message. It links to the OpenAPI Specification and the Response Rendering Template to ensure proper functionality.

The app manifest contains the query command definition. Developers must adhere to the following guidelines for the app manifest:

* Set the app manifest version to 1.17.
* Set composeExtensions.composeExtensionType to apiBased.
* Define composeExtensions.apiSpecificationFile as the relative path to the OpenAPI Description document within the folder. This links the app manifest to the API specification.
* Define apiResponseRenderingTemplateFile as the relative path to the response rendering template. This specifies the location of the template used for rendering API responses.
* Each command must include a link to a response rendering template. This associates each command with its corresponding response format.
* The Commands.id property in the app manifest must match the operationId in the OpenAPI Description document.
* If a required parameter is without a default value, the command parameters.name in the app manifest must match the parameters.name in the OpenAPI Description document.
* If no parameter is required, the command parameters.name in the app manifest must match the optional parameters.name in the OpenAPI Description document.
* The names for parameters in each command of the app manifest must exactly match their corresponding names in the OpenAPI Description document.
* A response rendering template is required for each command to convert API responses to UI elements.
* The command and parameter descriptions must not exceed 128 characters.

The following provides a sample app manifest with definitions for API-based message extensions:

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
|`composeExtensions.composeExtensionType`     | Compose extension type. Update the value to apiBased. |
|`composeExtensions.authorization`|Authorization related information for the API-based message extension.|
|`composeExtensions.authorization.authType`|Enum of possible authorization types. Supported values are none, apiSecretServiceAuth, and microsoftEntra.|
|`composeExtensions.authorization.apiSecretServiceAuthConfiguration`|Object capturing details needed to do service auth. Applicable only when auth type is apiSecretServiceAuth.|
|`composeExtensions.authorization.apiSecretServiceAuthConfiguration.apiSecretRegistrationId`| Registration ID returned when a developer submits the API key through Developer Portal.|
|`composeExtensions.apiSpecificationFile`     | References an OpenAPI Description file in the app package. Include when type is apiBased.      |
|`composeExtensions.commands.id`      | Unique ID assigned to the search command. The user request includes this ID. The ID must match the operationId available in the OpenAPI Description.       |
|`composeExtensions.commands.context`      | Array defining the entry points for the message extension. The default values are compose and commandBox. |
|`composeExtensions.commands.parameters`    | Static list of parameters for the command. The name must map to parameters.name in the OpenAPI Description. If referencing a property in the request body schema, the name must map to properties.name or query parameters.     |
|`composeExtensions.commands.apiResponseRenderingTemplateFile`| Template used to format the JSON response from the developer’s API into an Adaptive Card response. *[Mandatory]* |

Developers refer to [composeExtensions](../resources/schema/manifest-schema-dev-preview.md#composeextensions) for more details.

### Response rendering template

The response rendering template defines how the API results display within Teams. It uses templates to create Adaptive Cards or other UI elements from the API’s response, ensuring an integrated user experience. The template outlines layout and style details, including text, images, and interactive elements. Developers must adhere to the following guidelines for the response rendering template:

* Define the schema reference URL in the $schema property to establish the structure using [response rendering template schema](https://developer.microsoft.com/json-schemas/teams/v1.17/MicrosoftTeams.ResponseRenderingTemplate.schema.json).
* Set responseLayout to either list or grid to determine how results appear. Developers refer to [respond to user requests](how-to/search-commands/respond-to-search.md#respond-to-user-requests) for layout details.
* Use jsonPath for arrays or when the data for the Adaptive Card is nested. For instance, if data is under productDetails, use jsonPath as productDetails.
* Define jsonPath as the path to the relevant data or array in the API response. If the path points to an array, each entry binds with the Adaptive Card template and returns as a separate result. *[Optional]*
* Provide a sample response for validating the response rendering template, ensuring the template performs as expected.
* Use tools such as Fiddler or Postman to call the API, validating both requests and responses. This helps troubleshoot and confirm API functionality.
* Use Adaptive Card Designer to bind the API response to the response rendering template and preview the Adaptive Card by inserting the template in the CARD PAYLOAD EDITOR and a sample response in the SAMPLE DATA EDITOR.

The following example illustrates a Response rendering template:

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

A preview card template in the response rendering template schema maps JSON responses to a preview card that developers see when a search result is selected. The preview card then expands into an Adaptive Card in the message compose box. The preview card template is part of the overall response rendering template, which includes an Adaptive Card template and metadata.

  :::image type="content" source="../assets/images/Copilot/api-based-message-extension-preview-card.png" alt-text="Screenshot shows an example of compose extension displaying an array of preview cards when searching for a specific word. In this case, searching for 'a' in the 'test app' returns five cards showing 'Title', 'Description' (truncated) and 'AssignedTo' properties and values in each one.":::

 **Expanded Adaptive Card**

  :::image type="content" source="../assets/images/Copilot/api-based-message-extension-expanded-adaptive-card.png" alt-text="Example of how the Adaptive Card looks like expanded once a user selects a preview card. The Adaptive Card shows the Title, the full Description, AssignedTo, RepairId, and Date values.":::

#### Parameters

|Property  |Type  |Description  |Required  |
|--------- |---------|---------|---------|
|`version` |  `string` | The schema version of the current response rendering template.        |  Yes       |
|`jsonPath`     | `string`        | The path to the relevant section in the results to which the responseCardTemplate and previewCardTemplate apply. If not set, the root object is considered as the relevant section. If the section is an array, each entry maps to the responseCardTemplate and previewCardTemplate.        |   No      |
|`responseLayout`    | `responseLayoutType`        | Specifies the layout of the results in the message extension flyout. Supported types are list and grid.       |    Yes     |
|`responseCardTemplate`    |  `adaptiveCardTemplate`  | Template for creating an Adaptive Card from a result entry.      |   Yes      |
|`previewCardTemplate`     |  `previewCardTemplate`       | Template for creating a preview card from a result entry. The preview card displays in the message extension flyout menu.        |  Yes       |

#### Json path

The [JSON path](https://www.newtonsoft.com/json/help/html/QueryJsonSelectToken.htm) remains optional but is recommended for arrays or when the object to be utilized as the data for the Adaptive Card is nested. The JSON path must follow the format defined by Newtonsoft. Developers can use the [JSON tool](https://jsonpath.com/) to verify a JSON path. When the JSON path points to an array, each entry in the array binds to the Adaptive Card template and returns as separate results.

**Example**
Given the following JSON for a list of products where each product maps to a card result:

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

Since the results array resides under "products" nested within "warehouse", the JSON path becomes "warehouse.products".

Developers use [Adaptive Card Designer](https://adaptivecards.microsoft.com/designer.html) to preview an Adaptive Card by inserting the template into the Card Payload Editor and sample response entry into the Sample Data Editor, ensuring the card renders properly.

## OpenAPI schema conversion

> [!NOTE]
> The process sends an accept-language header in the HTTP request to the endpoint defined in the OpenAPI description document. The accept-language header derives from the Teams client locale and allows the developer to return a localized response.

The following data types in the OpenAPI description document convert into Adaptive Card elements:

* string, number, integer, boolean types convert to a TextBlock.

  <details><summary>Example</summary>
  
  * **Source Schema**: string, number, integer, and boolean

       ```yml
        name:
          type: string
          example: doggie
       ```

  * **Target Schema**: TextBlock

      ```json
      {
      "type": "TextBlock",
      "text": "name: ${if(name, name, 'N/A')}",
      "wrap": true
    }
      ```

  </details>

* array: An array converts to a container within an Adaptive Card.

  <details><summary>Example</summary>

  * **Source schema**: array

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

  * **Target Schema**: Container

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

* object: An object converts to a nested property in an Adaptive Card.

  <details><summary>Example</summary>

  * **Source Schema**: object

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

* image: A property that contains an image URL converts to an Image element in the Adaptive Card.

  <details><summary>Example</summary>

  * **Source schema**: image

    ```yml
        image:
          type: string
          format: uri
          description: The URL of the image of the item to be repaired

    ```

  * **Target Schema**: Image

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