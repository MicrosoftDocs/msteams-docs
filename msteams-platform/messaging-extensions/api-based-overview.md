---
title: Create API-based Message Extension
author: surbhigupta
description: Learn to build an API-based message extension from an OpenAPI Description document (OAD) with Developer Portal for Microsoft Teams, Visual Studio Code, Agents Toolkit CLI, or Visual Studio.
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
> * API-based message extensions aren't supported in Microsoft 365 Copilot. Developers who want to create API-based message extensions compatible with Microsoft 365 Copilot see [API agents for Microsoft 365 Copilot](/microsoft-365-copilot/extensibility/overview-api-plugins).

Message extensions built using API (API-based) use a web service to manage user requests and responses and don't require a bot registration. API-based message extensions are a Microsoft Teams app capability that integrates external APIs directly into Teams, enhancing app usability and providing a seamless user experience. API-based message extensions support search commands and fetch and display data from external services within Teams. This streamlines workflows by reducing the need to switch between applications. API-based message extensions help apps interact directly with third-party data, apps, and services, which enhances their capabilities. With API-based message extensions, developers can:

* Retrieve real-time information, such as the latest news coverage on a product launch.
* Retrieve knowledge-based information, for example, team design files in Figma.

See the video to learn more about building an API-based message extension using Microsoft 365 Agents Toolkit (previously known as Teams Toolkit):  
</br>
</br>

> [Watch video](https://www.youtube.com/embed/jSYNHz6hz4Y?si=htmfWtlY9bYH_RT2)

<br>

|Traditional bot-based message extensions  |API-based message extensions  |
|---------|---------|
|Developers need to build, deploy, and maintain a service to handle invoke commands from the Teams client.     | If the end-service's APIs can be described using the OpenAPI Specification, developers can eliminate the need for a middle-layer handling service.         |
|This service processes the incoming query and makes a call to the developer’s end-service.     | Microsoft Teams directly uses the [OpenAPI Specification](https://swagger.io/resources/open-api/) to build requests and communicate with the developer’s end-service.        |

The following images show the flow of user queries through Traditional Message Extensions and API Message Extensions:

:::image type="content" source="../assets/images/Copilot/api-based-me-flow.png" alt-text="Screenshot shows user query flow between a user, Teams Client, and Teams bot service using Traditional message extensions. The diagram also shows how the API spec, the rendering templates, and the API relate to each other." lightbox="../assets/images/Copilot/api-based-me-flow.png":::
*User query flow using Traditional Message Extensions. The developer maintains a custom bot handler service that handles requests from a Teams bot. The handler service sends a request to the developer’s service when a query is invoked.*

<br>

:::image type="content" source="../assets/images/Copilot/api-based-me-flow-2.png" alt-text="Screenshot shows the query flow between a user, Teams Client, and Teams bot service using API Message Extensions. The diagram also shows how the API spec, the rendering templates, and the API relate to each other." lightbox="../assets/images/Copilot/api-based-me-flow-2.png":::
*User query flow using API Message Extensions. A developer-maintained handler service is not required as long as the interaction is clearly outlined in the OpenAPI Specification in the App Package.*

<br>
<br>

Here's a high-level sequence of events that occur during a query command invocation:

1. A user invokes a query command, and the Teams Bot Service receives the command parameters.
2. The app manifest defines the query command. The command definition references the operationId inside the OpenAPI Description document and details the parameters that the Teams client renders for that command. The operationId in the OpenAPI Description document uniquely identifies a particular HTTP operation.
3. The Teams Bot Service uses the user-supplied parameters along with the OpenAPI Description for the associated operationId to build an HTTP request for the developer’s endpoint.
4. If authentication is required and is configured in the manifest, the service resolves the appropriate token or key, which applies as part of the outgoing request. *[Optionally]*
5. The Teams Bot Service performs the HTTP request to the developer’s service.
6. The developer’s service responds in accordance with the schema outlined in the OpenAPI Description. The response is in JSON format.
7. The Teams client shows the results back to the user. To convert the JSON results from the previous step to UI elements, the Teams Bot Service uses the Response Rendering template to build an Adaptive Card for each result.
8. The Adaptive Cards are sent to the client, which renders them in the UI.

:::image type="content" source="../assets/images/Copilot/api-based-me-query-sequence-diagram.png" alt-text="Diagram shows the high-level sequence flow when a query is invoked in an API-based message extension." lightbox="../assets/images/Copilot/api-based-me-query-sequence-diagram.png":::

## Prerequisites

The app definition package includes various essential artifacts that support the functionality of this feature. Developers must understand the following files:

> [!div class="checklist"]
>
> * [OpenAPI Description (OAD)](#openapi-description-oad)
> * [App manifest](#app-manifest)
> * [Response rendering template](#response-rendering-template)

### OpenAPI Description (OAD)

The OpenAPI Description document is an adopted industry standard for describing APIs. It abstracts APIs from their implementation, providing language-agnostic definitions that are both human-readable and machine-readable. The OpenAPI Description document outlines the interactions the extension supports, enabling Microsoft Teams to build requests and communicate directly with the service without needing a middle-layer handling service.

An OpenAPI Description document contains details required to communicate with the developer’s service. Developers must adhere to the following guidelines for the OpenAPI Description (OAD) document:

* Support OpenAPI versions 2.0 and 3.0.x.
* Use JSON or YAML formats.
* Set the request body, if present, to application/Json.
* Define an HTTPS protocol server URL for the servers.url property.
* Support only POST and GET HTTP methods.
* Include an operationId in the OpenAPI Description document.
* Allow only one required parameter without a default value.
* Consider a required parameter with a default value as optional.
* Prevent users from entering a parameter for a header or cookie.
* Ensure the operation does not have required header or cookie parameters without default values.
* Avoid remote references in the OpenAPI Description document.
* Do not construct arrays for the request; nested objects within a JSON request body are supported.
* Microsoft Teams does not support the oneOf, anyOf, allOf, and not (swagger.io) constructs.

The following code serves as an example of an OpenAPI Description document:

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

For more information on writing OpenAPI definitions in YAML, see [OpenAPI structure](https://swagger.io/docs/specification/basic-structure/).

### App manifest

The app manifest acts as a blueprint for the Microsoft Teams app, defining how and where the message extension is invoked within the Teams client. It lists the commands the extension supports and the locations from which they can be accessed, such as the compose message area, command bar, and message. The manifest links to the OpenAPI Specification and the Response Rendering Template to ensure proper functionality.

The app manifest contains the query command definition. Developers must adhere to the following guidelines for the app manifest:

* Set the app manifest version to 1.17.
* Set composeExtensions.composeExtensionType to apiBased.
* Define composeExtensions.apiSpecificationFile as the relative path to the OpenAPI Description document within the folder. This links the app manifest to the API specification.
* Define apiResponseRenderingTemplateFile as the relative path to the Response Rendering Template. This specifies the location of the template used for rendering API responses.
* Link each command to a Response Rendering Template. This connects each command to its corresponding response format.
* Ensure the Commands.id property in the app manifest matches the operationId in the OpenAPI Description document.
* If a required parameter lacks a default value, the command parameters.name in the app manifest must match the parameters.name in the OpenAPI Description document.
* If no required parameter exists, the command parameters.name in the app manifest must match the optional parameters.name in the OpenAPI Description document.
* Ensure the parameter names for each command in the app manifest exactly match the corresponding names defined in the OpenAPI Description document.
* Define a Response Rendering Template per command to convert API responses.
* Ensure the command and parameter descriptions do not exceed 128 characters.

The following example shows an app manifest with definitions for API-based message extensions:

<details><summary>App manifest example</summary>

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/teams/vDevPreview/MicrosoftTeams.schema.json",
  "manifestVersion": "devPreview",
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
      "composeExtensionType": "apiBased",
      "authorization": {
        "authType": "apiSecretServiceAuth",
        "apiSecretServiceAuthConfiguration": {
          "apiSecretRegistrationId": "96270b0f-7298-40cc-b333-152f84321813"
        }
      },
      "apiSpecificationFile": "aitools-openapi.yml",
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
          "apiResponseRenderingTemplateFile": "response-template.json"
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
|:---------|--------------------------------------------------------------|
|`composeExtensions.composeExtensionType`     |Compose extension type. Update the value to apiBased. |
|`composeExtensions.authorization`|Authorization-related information for the API-based message extension.|
|`composeExtensions.authorization.authType`|Enum of possible authorization types. Supported values are none, apiSecretServiceAuth, and microsoftEntra.|
|`composeExtensions.authorization.apiSecretServiceAuthConfiguration`|Object capturing details needed to perform service auth. Applicable only when authType is apiSecretServiceAuth.|
|`composeExtensions.authorization.apiSecretServiceAuthConfiguration.apiSecretRegistrationId`|Registration ID returned when the developer submits the API key through Developer Portal.|
|`composeExtensions.apiSpecificationFile`     |References an OpenAPI Description file in the app package. Include when the type is apiBased.      |
|`composeExtensions.commands.id`      |Unique ID assigned to the search command. The user request includes this ID. This ID must match the operationId available in the OpenAPI Description.       |
|`composeExtensions.commands.context`      |Array where the entry points for the message extension are defined. The default values are compose and commandBox. |
|`composeExtensions.commands.parameters`    |Defines a static list of parameters for the command. The name must map to the parameters.name in the OpenAPI Description. If referencing a property in the request body schema, the name must map to properties.name or query parameters.     |
|`composeExtensions.commands.apiResponseRenderingTemplateFile`|Template used to format the JSON response from the developer’s API to an Adaptive Card response. *[Mandatory]* |

Developers refer to [composeExtensions](../resources/schema/manifest-schema-dev-preview.md#composeextensions) for more details.

### Response rendering template

A Response Rendering Template dictates how results from an API display within Microsoft Teams. It uses templates to create Adaptive Cards or other UI elements from the API’s response, ensuring a seamless and integrated user experience. The template defines the layout and style of the presented information, which can include text, images, and interactive components. Developers must adhere to the following guidelines for the Response Rendering Template:

* Define the schema reference URL in the $schema property to establish the template structure following the [Response Rendering Template schema](https://developer.microsoft.com/json-schemas/teams/v1.17/MicrosoftTeams.ResponseRenderingTemplate.schema.json).
* Set the supported values for responseLayout to list or grid. These values determine how the response displays visually. Developers refer to [respond to user requests](how-to/search-commands/respond-to-search.md#respond-to-user-requests) for layout guidance.
* Include a jsonPath for arrays or if the data for the Adaptive Card does not reside in the root object. For example, if data nests under productDetails, set the jsonPath as productDetails.
* Define jsonPath as the path to the relevant data or array in the API response. If the path indicates an array, each entry in the array binds with the Adaptive Card template and returns as a separate result. *[Optional]*
* Obtain a sample response for validating the Response Rendering Template. This validation ensures the template operates as expected.
* Use tools such as Fiddler or Postman to call the API and verify the request and response validity. This process is crucial for troubleshooting and confirming that the API functions correctly.
* Use the Adaptive Card Designer to bind the API response to the Response Rendering Template and preview the Adaptive Card. Insert the Adaptive Card template in the CARD PAYLOAD EDITOR and insert the sample response entry in the SAMPLE DATA EDITOR.

The following code serves as an example of a Response Rendering Template:  
<br/>
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

A preview card template in the Response Rendering Template schema maps JSON responses to a preview card that displays when developers select a search result. The preview card then expands into an Adaptive Card inside the message compose area. The preview card template is part of the Response Rendering Template, which also includes an Adaptive Card template and metadata.

:::image type="content" source="../assets/images/Copilot/api-based-message-extension-preview-card.png" alt-text="Screenshot shows an example of a compose extension displaying an array of preview cards. Searching for a specific word, such as 'a' in the 'test app', returns multiple cards showing truncated text for Title, Description, and Assigned To properties.":::

**Expanded Adaptive Card**

:::image type="content" source="../assets/images/Copilot/api-based-message-extension-expanded-adaptive-card.png" alt-text="Example showing the expanded Adaptive Card after a user selects a preview card. The Adaptive Card displays the Title, full Description, Assigned To, Repair ID, and Date details.":::

#### Parameters

|Property  |Type  |Description  |Required  |
|--------- |---------|---------|---------|
|`version` |`string`|The schema version of the current Response Rendering Template.|Yes|
|`jsonPath`|`string`|The path to the relevant section in the results that applies to the responseCardTemplate and previewCardTemplate. If not set, the root object serves as the relevant section. If the section is an array, each entry maps to the responseCardTemplate and previewCardTemplate.|No|
|`responseLayout`|`responseLayoutType`|Specifies the layout of the results in the message extension flyout. Supported types are list and grid.|Yes|
|`responseCardTemplate`|`adaptiveCardTemplate`|Template for creating an Adaptive Card from a result entry.|Yes|
|`previewCardTemplate`|`previewCardTemplate`|Template for creating a preview card from a result entry. The resulting preview card displays in the message extension flyout menu.|Yes|

#### Json path

The [JSON path](https://www.newtonsoft.com/json/help/html/QueryJsonSelectToken.htm) is optional but should be used for arrays or when the data for the Adaptive Card does not reside in the root object. The JSON path follows the format defined by Newtonsoft. Developers can use the [JSON tool](https://jsonpath.com/) to validate a JSON path. If the JSON path points to an array, each entry in that array binds with the Adaptive Card template and returns as separate results.

**Example**  
If the JSON for a list of products resembles:

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

The array of results resides under warehouse.products; thus, the JSON path would be warehouse.products.

Developers use [Adaptive Card Designer](https://adaptivecards.microsoft.com/designer.html) to preview an Adaptive Card by inserting the template into the Card Payload Editor and sample data into the Sample Data Editor. This step confirms that the card renders properly and meets design requirements.

## OpenAPI schema conversion

> [!NOTE]
> Microsoft Teams sends an accept-language header in the HTTP request directed to the endpoint defined in the OpenAPI Description document. The accept-language is based on the Teams client locale and assists developers in returning a localized response.

Microsoft Teams converts the following data types in the OpenAPI Description document into Adaptive Card elements:

* string, number, integer, boolean types convert to a TextBlock.

  <details><summary>Example</summary>
  
  * Source Schema: string, number, integer, and boolean

       ```yml
       name:
         type: string
         example: doggie
       ```

  * Target Schema: TextBlock

      ```json
      {
        "type": "TextBlock",
        "text": "name: ${if(name, name, 'N/A')}",
        "wrap": true
      }
      ```

  </details>

* array converts to a container inside an Adaptive Card.

  <details><summary>Example</summary>

  * Source schema: array

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

  * Target Schema: Container

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

* object converts to nested properties in an Adaptive Card.

  <details><summary>Example</summary>

  * Source Schema: object

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

  * Target Schema: Nested properties in an Adaptive Card

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

* image converts to an Image element in the Adaptive Card if a property is an image URL.

  <details><summary>Example</summary>

  * Source schema: image

    ```yml
    image:
      type: string
      format: uri
      description: The URL of the image of the item to be repaired
    ```

  * Target Schema: Image

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