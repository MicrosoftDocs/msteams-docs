---
title: Create API-based Message Extension
author: v-ypalikila
description: Learn to build a message extension from OpenAPI description document (OAD) with Developer Portal for Teams, Visual Studio Code, Teams Toolkit CLI, or Visual Studio.
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
ms.date: 10/19/2023
---

# API-based message extension

> [!NOTE]
>
> * API-based message extensions support only search commands.
> * API-based message extensions aren't supported in Microsoft 365 Copilot. If you want to create API-based message extensions compatible with Microsoft 365 Copilot, see [API agents for Microsoft 365 Copilot](/microsoft-365-copilot/extensibility/overview-api-plugins).

Message extensions built using API (API-based) use a web service to manage user requests and responses and don't require a bot registration. API-based message extensions are a Microsoft Teams app capability that integrates external APIs directly into Teams, enhancing your app's usability and offering a seamless user experience. API-based message extensions support search commands and can be used to fetch and display data from external services within Teams, streamlining workflows by reducing the need to switch between applications. API-based message extensions help your apps to interact directly with third-party data, apps, and services, enhancing its capabilities. With API-based message extension, you can:

* Retrieve real-time information, such as latest news coverage on a product launch.
* Retrieve knowledge-based information, for example, my team’s design files in Figma.

See the video to learn more about building an API-based message extension using Teams Toolkit:
</br>
</br>

> [!VIDEO https://www.youtube.com/embed/jSYNHz6hz4Y?si=htmfWtlY9bYH_RT2]

<br>

|Traditional bot-based message extensions  |API-based message extensions  |
|---------|---------|
|Developers need to build, deploy, and maintain a service to handle invoke commands from the Teams client.     | If the end-service's APIs can be described using the OpenAPI Specification, developers can eliminate the need for the middle-layer handling service.         |
|This service processes the incoming query and makes a call to the developer’s end-service.     | Teams can directly use the [OpenAPI Specification](https://swagger.io/resources/open-api/) to build requests and communicate with the developer's end-service.        |

The following images show the flow of user queries through Traditional message extensions and API message extensions:

:::image type="content" source="../assets/images/Copilot/api-based-me-flow.png" alt-text="Screenshot shows user query flow between a user, Teams Client, and Teams bot service using Traditional message extensions. The diagram also shows how the API spec, the rendering templates, the API relate to each other." lightbox="../assets/images/Copilot/api-based-me-flow.png":::
*User query flow using Traditional Message Extensions. The developer must maintain a custom bot handler service, which handles the requests from a Teams bot. The handler service sends a request to the developer’s service when a query is invoked.*

<br>

:::image type="content" source="../assets/images/Copilot/api-based-me-flow-2.png" alt-text="Screenshot shows the query flow between a user, Teams Client, and Teams bot service using API Message Extensions. The diagram also shows how the API spec, the rendering templates, the API relate to each other." lightbox="../assets/images/Copilot/api-based-me-flow-2.png":::
*User query flow using API Message Extensions. There's no need for a developer maintained handler service as long as the interaction is clearly outlined in the OpenAPI Specification in the App Package.*

<br>
<br>

Here's a high-level sequence of events that occur during a query command invocation:

1. When a user invokes a query command, the parameters of the query command are received by the Teams Bot Service.

1. The query command is defined inside the app manifest file. The command definition contains a reference to the `operationId` inside the OpenAPI Specification file along with the details of the parameters that the Teams client renders for that command. For reference, the `operationId` inside the OpenAPI Specification file is unique to a particular HTTP operation.

1. The Teams Bot Service then uses the parameters supplied by the user along with the copy of the OpenAPI Specification for the associated `operationId` to build an HTTP request for the developer’s endpoint.

1. If authentication is required and is configured in the manifest. It's resolved to the appropriate token or key. This token or key is used as part of the outgoing request. *[Optionally]*

1. The Teams bot service performs the HTTP request to the developer’s service.

1. The developer’s service should respond in accordance with the schema outlined in the OpenAPI Specification. This is in JSON format.

1. The Teams client must show the results back to the user. To convert the JSON results from the previous step to UI, the Teams bot service uses the response Rendering template to build an Adaptive Card for each result.

1. The Adaptive Cards are sent to the client, which renders them in the UI.

:::image type="content" source="../assets/images/Copilot/api-based-me-query-sequence-diagram.png" alt-text="Diagram shows the high-level sequence flow when a query is invoked in an API-based message extension." lightbox="../assets/images/Copilot/api-based-me-query-sequence-diagram.png":::

## Prerequisites

The app definition package includes various compelling artifacts that support the functionality of this feature. Before you get started, ensure that have a basic understanding of the following files:

> [!div class="checklist"]
>
> * [OpenAPI Description (OAD)](#openapi-description-oad)
> * [App manifest](#app-manifest)
> * [Response rendering template](#response-rendering-template)

### OpenAPI Description (OAD)

OpenAPI description documenat is an adopted industry standard for describing APIs. It allows you to abstract your APIs from their implementation, providing language-agnostic definitions that are both human-readable and machine-readable. The OpenAPI description documenat outlines the interactions your extension supports, enabling Teams to build requests and communicate directly with your service without the need for a middle-layer handling service.

An OpenAPI description document contains details to communicate with the developer’s service. Ensure that you adhere to following guidelines for OpenAPI Description (OAD) document:

* OpenAPI versions 2.0 and 3.0.x are supported.
* JSON and YAML are the supported formats.
* The request body, if present, must be application/Json.
* Define an HTTPS protocol server URL for the `servers.url` property.
* Only POST and GET HTTP methods are supported.
* The OpenAPI Description document must have an `operationId`.
* Only one required parameter without a default value is allowed.
* A required parameter with a default value is considered optional.
* Users must not enter a parameter for a header or cookie.
* The operation must not have a required header or cookie parameters without default values.
* Ensure that there are no remote references in the OpenAPI Description document.
* Constructing arrays for the request isn’t supported; however, nested objects within a JSON request body are supported.
* Teams doesn't support the `oneOf`, `anyOf`, `allOf`, and `not` (swagger.io) constructs.

The following code is an example of an OpenAPI Description document:

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

For more information on how to write OpenAPI definitions in YAML, see [OpenAPI structure.](https://swagger.io/docs/specification/basic-structure/)

### App manifest

App manifest is a blueprint for your Teams app, defining how and where the message extension is invoked within the Teams client. It includes the commands your extension supports and the locations from which they can be accessed, such as the compose message area, command bar, and message. The manifest links to the OpenAPI Specification and the Response Rendering Template to ensure proper functionality.

App manifest contains query command definition. Ensure that you adhere to following guidelines for app manifest:

* Set the app manifest version to `1.17`.
* Set `composeExtensions.composeExtensionType` to `apiBased`.
* Define `composeExtensions.apiSpecificationFile` as the relative path to the OpenAPI Description document within the folder. This links the app manifest to the API specification.
* Define `apiResponseRenderingTemplateFile` as the relative path to the response rendering template. This specifies the location of the template used for rendering API responses.
* Each command must have a link to the response rendering template. This connects each command to its corresponding response format.
* The `Commands.id` property in the app manifest must match the `operationId` in the OpenAPI Description document.
* If a required parameter is without a default value, the command `parameters.name` in the app manifest must match the `parameters.name` in the OpenAPI description document.
* If there’s no required parameter, the command `parameters.name` in the app manifest must match the optional `parameters.name` in the OpenAPI Description document.
* Ensure that the name of parameters for each command in the app manifest match exactly with the corresponding name of the parameter defined for the operation in the OpenAPI Description document.
* A response rendering template must be defined per command, which is used to convert responses from an API.
* The command and parameter descriptions must not exceed 128 characters.

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
|`composeExtensions.composeExtensionType`     |  Compose extension type. Update the value to `apiBased`. |
|`composeExtensions.authorization`|Authorization related information for the API-based message extension|
|`composeExtensions.authorization.authType`|Enum of possible authorization types. Supported values are `none`, `apiSecretServiceAuth`, and `microsoftEntra`.|
|`composeExtensions.authorization.apiSecretServiceAuthConfiguration`|Object capturing details needed to do service auth. Applicable only when auth type is `apiSecretServiceAuth`.|
|`composeExtensions.authorization.apiSecretServiceAuthConfiguration.apiSecretRegistrationId`| Registration ID returned when developer submits the API key through Developer Portal.|
|`composeExtensions.apiSpecificationFile`     |  References an OpenAPI Description file in the app package. Include when type is `apiBased`.      |
|`composeExtensions.commands.id`      | Unique ID that you assign to search command. The user request includes this ID. The ID must match the `operationId` available in the OpenAPI Description.       |
|`composeExtensions.commands.context`      | Array where the entry points for message extension is defined. The default values are `compose` and `commandBox`. |
|`composeExtensions.commands.parameters`    | Defines a static list of parameters for the command. The name must map to the `parameters.name` in the OpenAPI Description. If you're referencing a property in the request body schema, then the name must map to `properties.name` or query parameters.     |
|`composeExtensions.commands.apiResponseRenderingTemplateFile`| Template used to format the JSON response from developer’s API to Adaptive Card response. *[Mandatory]* |

For more information, see [composeExtensions](../resources/schema/manifest-schema-dev-preview.md#composeextensions).

### Response rendering template

> [!NOTE]
>
> Teams supports Adaptive Cards up to version 1.5. When using Adaptive Card designer, ensure that you change the target version to 1.5.

Response rendering template is a predefined format that dictates how the results from your API are displayed within Teams. It uses templates to create Adaptive Cards or other UI elements from the API’s response, ensuring a seamless and integrated user experience within Teams. The template defines the layout and style of the information presented, which can include text, images, and interactive components. Ensure that you adhere to following guidelines for response rendering template:

* Define the schema reference URL in the `$schema` property to establish the structure of your template to the [response rendering template schema](https://developer.microsoft.com/json-schemas/teams/v1.17/MicrosoftTeams.ResponseRenderingTemplate.schema.json).
* The supported values for `responseLayout` are `list` and `grid`, which determine how the response is visually presented. For more information on the layout, see [respond to user requests](how-to/search-commands/respond-to-search.md#respond-to-user-requests).
* A `jsonPath` is rerequired for arrays or when the data for the Adaptive Card isn't the root object. For example, if your data is nested under `productDetails`, your JSON path would be `productDetails`.
* Define `jsonPath` as the path to the relevant data or array in the API response. If the path points to an array, then each entry in the array binds with the Adaptive Card template and returns as a separate result. *[Optional]*
* Get a sample response for validating the response rendering template. This serves as a test to ensure your template works as expected.
* Use tools such as Fiddler or Postman to call the API and ensure that the request and the response are valid. This step is crucial for troubleshooting and confirming that your API is functioning correctly.
* You can use the Adaptive Card Designer to bind the API response to the response rendering template and preview the Adaptive Card. Insert the Adaptive Card template in the **CARD PAYLOAD EDITOR** and insert the sample response entry in the **SAMPLE DATA EDITOR**.

The following code is an example of a Response rendering template: <br/>
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

A preview card template in the response rendering template schema is used to map JSON responses to a preview card that users see when they select a search result. The preview card then expands into an Adaptive Card in the message compose box. The preview card template is part of the response rendering template, which also includes an Adaptive Card template and metadata.

  :::image type="content" source="../assets/images/Copilot/api-based-message-extension-preview-card.png" alt-text="Screenshot shows an example of compose extension displaying an array of preview cards when searching for a specific word. In this case, searching for 'a' in the 'test app' returns five cards showing 'Title', 'Description' (truncated) and 'AssignedTo' properties and values in each one.":::

 **Expanded Adaptive Card**

  :::image type="content" source="../assets/images/Copilot/api-based-message-extension-expanded-adaptive-card.png" alt-text="Example of how the Adaptive Card looks like expanded once a user selects a preview card. The Adaptive Card shows the Title, the full Description, AssignedTo, RepairId, and Date values.":::

#### Parameters

|Property  |Type  |Description  |Required  |
|--------- |---------|---------|---------|
|`version` |  `string` | The schema version of the current response rendering template.        |  Yes       |
|`jsonPath`     | `string`        | The path to the relevant section in the results to which the responseCardTemplate and previewCardTemplate should be applied. If not set, the root object is treated as the relevant section. If the relevant section is an array, each entry is mapped to the responseCardTemplate and the previewCardTemplate.        |   No      |
|`responseLayout`    | `responseLayoutType`        |  Specifies the layout of the results in the message extension flyout. The supported types are `list` and `grid`.       |    Yes     |
|`responseCardTemplate`    |  `adaptiveCardTemplate`  | A template for creating an Adaptive Card from a result entry.      |   Yes      |
|`previewCardTemplate`     |  `previewCardTemplate`       | A template for creating a preview card from a result entry. The resulting preview card is displayed in the message extension flyout menu.        |  Yes       |

#### Json path

The [JSON path](https://www.newtonsoft.com/json/help/html/QueryJsonSelectToken.htm) is optional but should be used for arrays or where the object to be used as the data for the Adaptive Card isn't the root object. The JSON path should follow the format defined by Newtonsoft. This tool can be used. You can use the [JSON tool](https://jsonpath.com/) to validate if a JSON path is correct. If the JSON path points to an array, then each entry in that array is bound with the Adaptive Card template and returns as separate results.

**Example**
Let's say you have the following JSON for a list of products and you want to create a card result for each entry.

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

As you can see, the array of results is under "products", which is nested under "warehouse", so the JSON path would be "warehouse.products".

Use [Adaptive Card Designer](https://adaptivecards.microsoft.com/designer.html) to preview the Adaptive Card by inserting the template into Card Payload Editor, and take a sample response entry from your array or for your object and insert it into the Same Data editor on the right. Make sure that the card renders properly and is to your liking. Teams supports cards up to version 1.5 while the designer supports 1.6.

## OpenAPI schema conversion

> [!NOTE]
> We send an accept-language header in the HTTP request that is sent to the endpoint defined in the OpenAPI description document. The accept-language is based on the Teams client locale and can be used by the developer for returning back a localized response.

The following data types in the OpenAPI description document are converted into elements within an Adaptive Card as follows:

* `string`, `number`, `integer`, `boolean` types are converted to a TextBlock.

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

* `image`: If a property is an image URL, then it converts to an Image element in the Adaptive Card.

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

</details>

## Next step

> [!div class="nextstepaction"]
> [Build API-based message extension](build-api-based-message-extension.md)

## See also

* [Build a custom engine agent](/microsoft-365-copilot/extensibility/overview-custom-engine-agent?toc=/microsoftteams/platform/toc.json&bc=/microsoftteams/platform/breadcrumb/toc.json)
* [Build a declarative agent](/microsoft-365-copilot/extensibility/overview-declarative-agent)
