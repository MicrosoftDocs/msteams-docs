---
title: Build API-based message extension
author: v-ypalikila
description: Learn about the requirements and troubleshooting guidelines for an API-based message extension.
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
ms.date: 10/19/2023
---

# Build API-based message extension

> [!NOTE]
> API-based message extensions only support search commands.

API-based message extensions are a Microsoft Teams app capability that integrates external APIs directly into Teams, enhancing your app's usability and offering a seamless user experience. API-based message extensions support search commands and can be used to fetch and display data from external services within Teams, streamlining workflows by reducing the need to switch between applications.


|Traditional bot-based message extensions  |API-based message extensions  |
|---------|---------|
|Developers need to build, deploy, and maintain a service to handle invoke commands from the Teams client.     | If the end-service's APIs can be described using the Open API specification, developers can eliminate the need for the middle-layer handling service.         |
|This service processes the incoming query and makes a call to the developer’s end-service.     | Teams can directly use the [Open API specification](https://swagger.io/resources/open-api/) to build requests and communicate with the developer's end-service.        |

<br>

:::image type="content" source="../assets/images/Copilot/api-based-me-flow.png" alt-text="Screenshot shows the interaction between a user, Teams Client, and Teams bot service. The diagra also shows how the API spec, the rendering templates, the API relate to each other." lightbox="../assets/images/Copilot/api-based-me-flow.png":::
*User query flow using Traditional Message Extensions. The developer must maintain a custom bot handler service which handles the requests from a Teams bot. The handler service sends a request to the developer’s service when a query is invoked.*

<br>

:::image type="content" source="../assets/images/Copilot/api-based-me-flow-2.png" alt-text="Screenshot shows the interaction between a user, Teams Client, and Teams bot service. The diagra also shows how the API spec, the rendering templates, the API relate to each other." lightbox="../assets/images/Copilot/api-based-me-flow-2.png":::
*User query flow using API Message Extensions. There is no need for a developer maintained handler service as long as the interaction is clearly outlined in the Open API specification in the App Package.*

<br>
<br>

The app definition package contains several interesting artifacts which help facilitate this feature:

1. Open API specification: Contains details to communicate with the developer’s service.

1. App Manifest: Contains query command definition.

1. Response Rendering Template: Contains details to convert the response from developer’s service back to UI for end-user.

<br>
<br>

Here is a high-level sequence of events that occur during a query command invocation:

1. When a user invokes a query command, the parameters of the query command are received by the Teams Bot Service.

1. The query command is defined inside the app manifest file. The command definition contains a reference to the operation_id inside the Open API specification file along with the details of the parameters that need to be rendered by the Teams client for that command. For reference, the operation_id inside the Open API specification file is unique to a particular HTTP operation.

1. The Teams Bot Service then uses the parameters supplied by the user along with the copy of the Open API specification for the associated operation_id to build an HTTP request for the developer’s endpoint.

1. If authentication is required and is configured in the manifest, it is resolved to the appropriate token or key. This token or key is used as part of the outgoing request. *[Optionally]*

1. The Teams Bot Service performs the HTTP request to the developer’s service.

1. The developer’s service should respond in accordance with the schema outlined in the Open API specification. This is in JSON format.

1. The Teams client needs to show the results back to the user. To convert the JSON results from the previous step to UI, the Teams Bot Service uses the Response Rendering Template to build an adaptive card for each result.

1. The adaptive cards are sent to the client which renders them in the UI.

:::image type="content" source="../assets/images/Copilot/api-based-me-query-sequence-diagram.png" alt-text="Diagram shows the high-level sequence flow when a query is invoked in an API-based message extension.":::


Before you get started, ensure that you meet the following requirements:

</br>
<details><summary id="oad">1. OpenAPI Description (OAD) </summary>

Ensure that you adhere to following guidelines for OpenAPI Description (OAD) document:

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

For more information on how to write OpenAPI definitions in YAML, see [OpenAPI structure.](https://swagger.io/docs/specification/basic-structure/)

</details>

</br>

<details><summary id="app-manifest">2. App manifest</summary>

Ensure that you adhere to following guidelines for app manifest:

* Set the app manifest version to `1.17`.
* Set `composeExtensions.composeExtensionType` to `apiBased`.
* Define `composeExtensions.apiSpecificationFile` as the relative path to the OpenAPI Description file within the folder. This links the app manifest to the API specification.
* Define `apiResponseRenderingTemplateFile` as the relative path to the response rendering template. This specifies the location of the template used for rendering API responses.
* Each command must have a link to the response rendering template. This connects each command to its corresponding response format.
* The `Commands.id` property in the app manifest must match the `operationId` in the OpenAPI Description.
* If a required parameter is without a default value, the command `parameters.name` in the app manifest must match the `parameters.name` in the OpenAPI Description document.
* If there’s no required parameter, the command `parameters.name` in the app manifest must match the optional `parameters.name` in the OpenAPI Description.
* Ensure that the name of parameters for each command in the app manifest match exactly with the corresponding name of the parameter defined for the operation in the OpenAPI spec.
* A response rendering template must be defined per command, which is used to convert responses from an API.
* The command and parameter descriptions must not exceed 128 characters.

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

### Parameters

|Name  |Description                                    |
|:---------|               ---------------------------------------------------------|
|`composeExtensions.composeExtensionType`     |  Compose extension type. Update the value to `apiBased`. |
|`composeExtensions.authorization`|Authorization related information for the API-based message extension|
|`composeExtensions.authorization.authType`|Enum of possible authorization types. Supported values are `none`, `apiSecretServiceAuth`, and `microsoftEntra`.|
|`composeExtensions.authorization.apiSecretServiceAuthConfiguration`|Object capturing details needed to do service auth. Applicable only when auth type is `apiSecretServiceAuth`.|
|`composeExtensions.authorization.apiSecretServiceAuthConfiguration.apiSecretRegistrationId`| Registration ID returned when developer submits the API key through Developer Portal.|
|`composeExtensions.apiSpecificationFile`     |  References an OpenAPI Description file in the app package. Include when type is `apiBased`.      |
|`composeExtensions.commands.id`      | Unique ID that you assign to search command. The user request includes this ID. The ID must match the `OperationId` available in the OpenAPI Description.       |
|`composeExtensions.commands.context`      | Array where the entry points for message extension is defined. The default values are `compose` and `commandBox`. |
|`composeExtensions.commands.parameters`    | Defines a static list of parameters for the command. The name must map to the `parameters.name` in the OpenAPI Description. If you're referencing a property in the request body schema, then the name must map to `properties.name` or query parameters.     |
|`composeExtensions.commands.apiResponseRenderingTemplateFile`| Template used to format the JSON response from developer’s API to Adaptive Card response. *[Mandatory]* |

For more information, see [composeExtensions](../resources/schema/manifest-schema-dev-preview.md#composeextensions).

</details>

</br>

<details><summary>3. Response rendering template</summary>

> [!NOTE]
>
> Teams supports Adaptive Cards up to version 1.5. When using Adaptive Card designer, ensure that you change the target version to 1.5.

* **Define the schema reference URL** in the `$schema` property to establish the structure of your template to the [response rendering template schema](https://developer.microsoft.com/json-schemas/teams/v1.17/MicrosoftTeams.ResponseRenderingTemplate.schema.json).
* **The supported values for `responseLayout`** are `list` and `grid`, which determine how the response is visually presented. For more information on the layout, see [respond to user requests](how-to/search-commands/respond-to-search.md#respond-to-user-requests).
* **A `jsonPath` is rerequired** for arrays or when the data for the Adaptive Card isn't the root object. For example, if your data is nested under `productDetails`, your JSON path would be `productDetails`.
* **Define `jsonPath` as the path** to the relevant data or array in the API response. If the path points to an array, then each entry in the array binds with the Adaptive Card template and returns as a separate result. *[Optional]*
* **Get a sample response** for validating the response rendering template. This serves as a test to ensure your template works as expected.
* **Use tools such as Fiddler or Postman** to call the API and ensure that the request and the response are valid. This step is crucial for troubleshooting and confirming that your API is functioning correctly.
* **You can use the Adaptive Card Designer** to bind the API response to the response rendering template and preview the Adaptive Card. Insert the Adaptive Card template in the **CARD PAYLOAD EDITOR** and insert the sample response entry in the **SAMPLE DATA EDITOR**.

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

  :::image type="content" source="../assets/images/Copilot/api-based-message-extension-preview-card.png" alt-text="Screenshot shows an example of compose extension displaying an array of preview cards when searching for a specific word. In this case, searching for 'a' in the 'SME test app' returns five cards showing 'Title', 'Description' (truncated) and 'AssignedTo' properties and values in each one.":::

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

The [JSON path](https://www.newtonsoft.com/json/help/html/QueryJsonSelectToken.htm) is optional but should be used for arrays or where the object to be used as the data for the adaptive card isn't the root object. The JSON path should follow the format defined by Newtonsoft. This tool can be used. You can use the [JSON tool](https://jsonpath.com/) to validate a JSON path is correct given an example JSON token. If the JSON path points to an array, then each entry in that array is bound with the adaptive card template and returns as separate results.

**Example**
Let's say you have the below JSON for a list of products and you want to create a card result for each entry.

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

Use <https://adaptivecards.io/designer/> to preview the adaptive card by inserting the template into Card Payload Editor, and take a sample response entry from your array or for your object and insert it into the Same Data editor on the right. Make sure that the card renders properly and is to your liking.
Note that Teams supports cards up to version 1.5 while the designer supports 1.6.

#### OpenAPI schema conversion

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

## Authentication

Authentication is a fundamental aspect of security and serves as the first line of defense, ensuring that access to systems, applications, and data is granted only to those with verified credentials. Authentication for API-based message extensions is crucial for several reasons:

* **Security**: It protects against unauthorized access and potential breaches, safeguarding both user data and the integrity of the system.
* **Data Privacy**: Ensures that personal and sensitive information is only accessible to users with the correct permissions.

* **User Trust**: Builds confidence among users that their interactions with the app are secure, which is essential for user adoption and engagement.

You can implement authentication in API-based message extensions to provide secure and seamless access to applications. If your message extension requires authentication, add the `authorization` property under `composeExtensions` in app manifest and define the type of authentication for your application by setting the `authType` property under `authorization`. To enable authentication for your message extension, update your app manifest with any of the following authentication methods:

<details><summary id="none">none</summary>
<br>

You can update `none` as a value for `authorization` in an API-based message extension when the API doesn't require any authentication for the user. When Teams service sends a request to the API, it doesn't supply any authentication information.

```json
    "authorization": {
      "authType": "none"
      }
    },
```

</details>
<br/>

<details><summary id="secret-service-auth">Secret service auth</summary>

API secret service authentication is a method that allows your app to authenticate with your API. You can configure your endpoint to accept a secret to authenticate requests. The API secret must be registered in Microsoft Teams and when a user interacts with your message extension, Teams uses the secret to authenticate with your API. The following API key registration properties help you to secure your key and ensure it's limited to your application:

* **Base URL**: Teams transmits the secrets to endpoints where the URL begins with the value in this field.
* **Target Tenant**: To limit API access to your Microsoft 365 tenant.
* **App ID**: To limit the key access to a specific app.
* **Secret key**: To authorize access between your app and OpenAPI endpoints.

API secret service authentication is a secure method for your app to authenticate with API. You can [register an API key](#register-an-api-key) through the Developer Portal for Teams, and generate an API key registration ID. [Update the app manifest](#update-app-manifest) with the `apiSecretServiceAuthConfiguration` object with an `apiSecretRegistrationId` property. This property should contain the API key registration ID returned when you submitted the API key through the portal.

> [!NOTE]
> The API secret registration ID is not a secret itself and can be retrieved from the Teams app manifest. For more information on securing your secret, see [best practices](#best-practices).

When an API request is initiated, the system retrieves the encrypted API key before storage and is stored in a secured location and includes it in the authorization header using the bearer token scheme and sends it to the endpoint defined in the app manifest. The user must verify the validity of the API key.

The following is an example of the payload with the authorization header using the bearer token scheme:

```https
GET https://example.com/search?myQuery=test
Accept-Language: en-US
Authorization: Bearer <MY_API_KEY>
```

### Register an API key

To register an API Key, follow these steps:

1. Go to **Tools** > **API key registration**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-api-key-registration.png" alt-text="Screenshot shows the API key registration option in Developer Portal for Teams.":::

1. Select **+ New API key**.

1. In the **API key registration** page, select **+ Add Secret**. A **Add an API key** dialog appears.

1. Enter a value for the secret and select **Save**.

   > [!NOTE]
   >
   > * You can maintain up to two secrets. If you need to replace one, you can do so without service interruption, as Teams will use the other configured key during the update process.

   :::image type="content" source="../assets/images/Copilot/api-based-me-api-key-secret.png" alt-text="Screenshot shows the Enter the value for this secret option to add a secret to the API key.":::

1. Under **API key name**, add a meaningful name for the API Key. For example, API key for Contoso message extension.

1. Under **Base URL**, specify a path that initiates all the API endpoints. The path must start with https, include a fully qualified domain name, and optionally, a path. Teams only transmits the secrets to endpoints where the URL begins with this value. For example, `https://api.yelp.com`. *[Mandatory]*

   Base URL ensures that the key remains secure and isn't leaked to random endpoints, even if another app illicitly acquires the API secret registration ID and incorporates it into their own app. We enforce this URL constraint on API keys. If the path registered here doesn't prefix the target endpoint defined in the app manifest, the call gets dropped.

   :::image type="content" source="../assets/images/Copilot/api-based-me-register-key-domain.png" alt-text="Screenshot shows the Description and Add domain options in the API key registration page in Developer Portal for Teams.":::

1. Under **Target tenant**, select any of the following:

   * **Home tenant**: The API key is only functional within the tenant where it's registered.
   * **Any tenant**: The API key t is usable in any tenant.

   :::image type="content" source="../assets/images/Copilot/api-based-me-api-key-tenant.png" alt-text="Screenshot shows the Home tenant and Any tenant options under set a target tenant heading in Developer Portal for Teams.":::

1. Under **Target Teams app**, select any of the following:

   * **Existing Teams app**: The **Existing Teams app** option binds the API secret registration to your specific Teams app.
   * **Any Teams app**: The API key can be used with any Teams app.

   Adding a domain ensures that the key isn't exposed to endpoints. However, the API secret registration ID is publicly accessible and can be added to random apps, potentially sending unwanted data to a developer's endpoint. To prevent this, you can bind the registration to a specific app and Teams rejects requests for any app other than the one specified in the secret registration.

   :::image type="content" source="../assets/images/Copilot/api-based-me-api-key-teams-app.png" alt-text="Screenshot shows the Any Teams app and Existing Teams app options under Set a Teams app heading in Developer Portal for Teams.":::

   An **API key registration ID** is generated.

   :::image type="content" source="../assets/images/Copilot/api-based-me-api-key-reg-id.png" alt-text="Screenshot shows the API key registration ID generated in Developer Portal for Teams.":::

1. In Developer portal for Teams, select **Apps** and select an app where you want to add the API key.

1. Go to **App features** > **Message extension**.

1. Under **Authentication**, select **API key** and add the API key registration ID.

   :::image type="content" source="../assets/images/Copilot/api-based-me-auth-add-key.png" alt-text="Screenshot shows an example of the Authentication section with none and API key options in Developer Portal for Teams.":::

1. Select **Save**.

The API key registration ID is update as the value for the `apiSecretRegistrationId` property in the app manifest.

### Update app manifest

Add an `apiSecretServiceAuthConfiguration` object with an `apiSecretRegistrationId` property, which contains the reference ID when you submit the API key through the Developer portal for Teams. For more information, see [composeExtensions.commands.](../resources/schema/manifest-schema.md#composeextensionscommands)

```json
"composeExtensions": [
    {
      "composeExtensionType": "apiBased",
      "authorization": {
        "authType": "apiSecretServiceAuth",
        "apiSecretServiceAuthConfiguration": {
            "apiSecretRegistrationId": "9xxxxb0f-xxxx-40cc-xxxx-15xxxxxxxxx3"
        }
      },
```

### Best practices

* **Secret**:
  * The secret value must have at least 10 characters and at most 128 characters.
  * After you update the secret, it will take upto for one hour for the key to reflect throughout the system.

* **Base URL**:
  * The Base URL must begin with https, ensuring secure communication.
  * Include the full host name to specify the exact domain.
  * An optional path can be added to define a specific entry point for the API.

   This structure is crucial for the security of your API secret(s), as Teams will only send secrets to endpoints that start with the specified Base URL.

* **Target tenant**: As you develop your app within your Microsoft 365 tenant, you'll initially test it as a custom app built for your org (LoB) or custom app. During this stage, you must create the API secret registration with your **Home tenant** as the target tenant, ensuring the key remains exclusive to your tenant.

  After you've completed testing and are ready to submit your app manifest to the Partner Center for the Teams Store, you'll need to switch the target tenant setting to **Any tenant**. This change allows your API secret registration to be used across various tenants once your app is available in the Teams Store.

* **Teams app ID**: As you develop your app within your Microsoft 365 tenant and start to test it as a custom app built for your org (Lob) or custom app, you must set the API key registration with the Teams app ID as **Any Teams app**. This configuration allows the key to be used with any Teams app as custom app built for your org (Lob) or custom apps generate IDs after they're uploaded, and you won't have the app's ID at this stage.

  Your key's security is still maintained through the **Home Tenant** and **Base URL**. When you're ready to release your app to the world, you need to change the Teams app ID setting to **Existing Teams app** and enter your manifest ID. Finally, submit your app manifest to the Partner Center for inclusion in the Teams Store. Later, your API secret registration is tied to your specific Teams app and can't be used with others.

</details>
<br/>

<details><summary id="microsoft-entra">Microsoft Entra </summary>

`microsoftEntra` authentication method uses an app user's Teams identity to provide them with access to your app. A user who has signed into Teams doesn't need to sign in again to your app within the Teams environment. Microsoft Entra SSO enables the app to silently obtain a user token that is issued for its resource by Microsoft Entra. The app can then authenticate this token and retrieve the user profile information without the user's consent.

### Prerequisites

Before you start, ensure you have the following:

* An Azure account with an active subscription.
* Basic familiarity with Microsoft Entra ID and Teams app development.

The following image shows how SSO works when a Teams app user attempts to access API-bsed message extension app:

:::image type="content" source="../assets/images/Copilot/api-me-entra-sso.png" alt-text="Screenshot shows how Microsoft Entra SSO authorization works to authentication API." lightbox="../assets/images/Copilot/api-me-entra-sso.png" :::

* The user invokes the API-based message extension app from a message extension in Teams and requests a command that requires authentication.
* The app sends a request to the Teams backend service with the app ID and the required scope (access_as_user).
* The Teams backend service checks if the user consented to the app and the scope. If not, it shows a consent screen to the user and asks for permission.
* If the user consents, Microsoft Entra generates an access token for the user and the app, and sends it to the app in the authorization header of the request.
* The app validates the token. The user can extract the user information from the token, such as the name, email, and object ID.
* The app returns the response to the user in Teams.

To enable `microsoftEntra` authentication method for API-based message extension, follow these steps:

### Register a new app in Microsoft Entra ID

1. Open the [Azure portal](https://ms.portal.azure.com/) on your web browser.

2. Select the **App registrations** icon.

   :::image type="content" source="../assets/images/authentication/teams-sso-tabs/azure-portal.png" alt-text="Microsoft Entra admin center page.":::

   The **App registrations** page appears.

3. Select **+ New registration** icon.

    :::image type="content" source="../assets/images/authentication/teams-sso-tabs/app-registrations.png" alt-text="New registration page on Microsoft Entra admin center.":::

    The **Register an application** page appears.

4. Enter the name of your app that you want to be displayed to the app user. You can change the name at a later stage if you want to.

    :::image type="content" source="../assets/images/authentication/teams-sso-tabs/register-app.png" alt-text="App registration page on Microsoft Entra admin center.":::

5. Select the type of user account that can access your app. You can select from single or multitenant options in organizational directories, or restrict the access to personal Microsoft accounts only.

    <details>
    <summary><b>Options for supported account types</b></summary>

    | Option | Select this to... |
    | --- | --- |
    | Accounts in this organizational directory only (Microsoft only - Single tenant) | Build an application for use only by users (or guests) in your tenant. <br> Often called custom app built for your org (LOB app), this app is a single-tenant application in the Microsoft identity platform. |
    | Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant) | Let users in any Microsoft Entra tenant use your application. This option is appropriate if, for example, you're building a SaaS application, and you intend to make it available to multiple organizations. <br> This type of app is known as a multitenant application in the Microsoft identity platform.|
    | Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant) and personal Microsoft accounts (for example, Skype, Xbox) | Target the widest set of customers. <br> By selecting this option, you're registering a multitenant application that can support app users who have personal Microsoft accounts also. |
    | Personal Microsoft accounts only | Build an application only for users who have personal Microsoft accounts. |

    </details>

    > [!NOTE]
    > You don't need to enter **Redirect URI** for enabling SSO for an API-based message extension app.

7. Select **Register**.
    A message pops up on the browser stating that the app was created.

    :::image type="content" source="../assets/images/Copilot/api-me-entra-sso-register.png" alt-text="Screenshot shows an example of the notification after the app registration is successful on Azure portal.":::

    The page with app ID and other configurations is displayed.

    :::image type="content" source="../assets/images/Copilot/api-me-entra-sso-app-details.png" alt-text="Screenshot shows the app details page in Azure portal.":::

8. Note and save the app ID from **Application (client) ID** to update the app manifest later.

    Your app is registered in Microsoft Entra ID. You now have the app ID for your API-based message extension app.

### Configure scope for access token

After you've created a new app registration, configure scope (permission) options for sending access token to Teams client, and authorizing trusted client applications to enable SSO.

To configure scope and authorize trusted client applications, you need:

* [Add Application ID URI](#application-id-uri): Configure scope (permission) options for your app. Expose a web API and configure the application ID URI.
* [Configure API scope](#configure-api-scope): Define scope for the API, and the users who can consent for a scope. You can only let admins provide consent for higher-privileged permissions.
* [Configure authorized client application](#configure-authorized-client-application): Create authorized client IDs for applications that you want to preauthorize. It allows the app user to access the app scopes (permissions) you've configured, without requiring any further consent. Preauthorize only those client applications you trust as your app users don't have the opportunity to decline consent.

#### Application ID URI

1. Select **Manage** > **Expose an API** from the left pane.

    The **Expose an API** page appears.

1. Select **Add** to generate application ID URI in the form of `api://{AppID}`.

    :::image type="content" source="../assets/images/Copilot/api-based-me-entra-sso-expose-api.png" alt-text="Set app ID URI":::

    The section for setting application ID URI appears.

1. Enter the **Application ID URI** in the format explained here.

    :::image type="content" source="../assets/images/Copilot/api-based-me-entra-sso-app-id-uri.png" alt-text="Application ID URI":::

    * The **Application ID URI** is prefilled with app ID (GUID) in the format `api://{AppID}`.
    * The application ID URI format must be: `api://fully-qualified-domain-name.com/{AppID}`.
    * Insert the `fully-qualified-domain-name.com` between `api://` and `{AppID}` (which is, GUID). For example, api://example.com/{AppID}.

    > [!IMPORTANT]
    >
    > * If you're building a standalone bot, enter the application ID URI as api://botid-{YourBotId}. Here, {YourBotId} is your Microsoft Entra application ID.
    > * If you're building an app with a bot, a message extension, and a tab, enter the application ID URI as api://fully-qualified-domain-name.com/botid-{YourClientId}, where {YourClientId} is your bot app ID.
    > * If you're building an app with a message extension or tab capabilities without the bot,  enter the application ID URI as api://fully-qualified-domain-name.com/{YourClientId}, where {YourClientId} is your Microsoft Entra application ID.

    > * **Application ID URI for app with multiple capabilities**: If you're building an API-based message extension, enter the application ID URI as `api://fully-qualified-domain-name.com/{YourClientId}`, where {YourClientId} is your Microsoft Entra app ID.
    >
    > * **Format for domain name**: Use lower case letters for domain name. Don't use upper case.

1. Select **Save**.

    A message pops up on the browser stating that the application ID URI was updated.

    :::image type="content" source="../assets/images/authentication/teams-sso-tabs/app-id-uri-msg.png" alt-text="Application ID URI message":::

    The application ID URI displays on the page.

    :::image type="content" source="../assets/images/Copilot/api-based-me-entra-sso-app-id-uri-final.png" alt-text="Application ID URI updated":::

1. Note and save the Application ID URI to update the app manifest later.

#### Configure API scope

> [!NOTE]
>
> * API-based message extension support **access_as_user** scope only.
> * The API receives a Microsoft Entra access token with the scope set to `access_as_user` as registered in the Azure portal. However, the token isn't authorized to call any other downstream APIs, such as Microsoft Graph.

1. Select **+ Add a scope** in the **Scopes defined by this API** section.

    :::image type="content" source="../assets/images/authentication/teams-sso-tabs/select-scope.png" alt-text="Select scope":::

    The **Add a scope** page appears.

1. Enter the details for configuring scope.

    :::image type="content" source="../assets/images/authentication/teams-sso-tabs/add-scope.png" alt-text="The screenshot shows how to add scope details in Azure.":::

    1. Enter the scope name. This field is mandatory.
    2. Select the user who can give consent for this scope. The default option is **Admins only**.
    3. Enter the **Admin consent display name**. This field is mandatory.
    4. Enter the description for admin consent. This field is mandatory.
    5. Enter the **User consent display name**.
    6. Enter the description for user consent description.
    7. Select the **Enabled** option for state.
    8. Select **Add scope**.

    A message pops up on the browser stating that the scope was added.

    :::image type="content" source="../assets/images/authentication/teams-sso-tabs/scope-added-msg.png" alt-text="Scope added message":::

    The new scope you defined displays on the page.

    :::image type="content" source="../assets/images/Copilot/api-based-me-entra-sso-scopes.png" alt-text="Screenshot shows an example of the scope added to the app in Azure portal.":::

#### Configure authorized client application

1. Move through the **Expose an API** page to the **Authorized client application** section, and select **+ Add a client application**.

    :::image type="content" source="../assets/images/authentication/teams-sso-tabs/auth-client-apps.png" alt-text="Authorized client application":::

    The **Add a client application** page appears.

1. Enter the appropriate Microsoft 365 client ID for the applications that you want to authorize for your app’s web application.

    :::image type="content" source="../assets/images/Copilot/api-based-me-entra-sso-client-app.png" alt-text="Screenshot shows the Client ID and Authorized scopes option to add a client application to the app in Azure portal.Add a client application":::

    > [!NOTE]
    >
    > The Microsoft 365 client IDs for mobile, desktop, and web applications for Teams are the actual IDs that you must add.

    1. Select one of the following client IDs:

       | Use client ID | For authorizing... |
       | --- | --- |
       | 1fec8e78-bce4-4aaf-ab1b-5451cc387264 | Teams mobile or desktop application |
       | 5e3ce6c0-2b1f-4285-8d4b-75ee78787346 | Teams web application |

    1. Select the application ID URI you created for your app in **Authorized scopes** to add the scope to the web API you exposed.

    1. Select **Add application**.

       A message pops up on the browser stating that the authorized client app was added.

       :::image type="content" source="../assets/images/authentication/teams-sso-tabs/update-app-auth-msg.png" alt-text="Client application added message":::

       The authorized app's client ID displays on the page.

       :::image type="content" source="../assets/images/authentication/teams-sso-tabs/client-app-added.png" alt-text="Client app added and displayed":::

> [!NOTE]
> You can authorize more than one client application. Repeat the steps of this procedure for configuring another authorized client application.

You've successfully configured app scope, permissions, and client applications. Ensure that you note and save the application ID URI. Next, you configure the access token version.

### Update app manifest

Update the following properties in the app manifest file:

* `webApplicationInfo`: The `webApplicationInfo` property is used to enable SSO for your app to help app users access your API-based message extension app seamlessly. The application ID URI that you registered in Microsoft Entra ID is configured with the scope of the API you exposed. For more information, see [webApplicationInfo](../resources/schema/manifest-schema.md#webapplicationinfo).

   &nbsp;&nbsp;:::image type="content" source="../assets/images/authentication/teams-sso-tabs/sso-manifest.png" alt-text="Screenshot shows the app manifest configuration.":::

* `microsoftEntraConfiguration`: Enables Single sign-on authentication for your app. Configure the `supportsSingleSignOn` property to `true` to support SSO and reduce the need for multiple authentications. If the property is set to `false` or is left empty, the user can't upload the app to Teams and the app fails validation.

To configure app manifest:

1. Open the API-based message extension app.
2. Open the app manifest folder.

    > [!NOTE]
    >
    > * The app manifest folder should be at the root of your app folder. For more information, see [Create a Microsoft Teams app package](../concepts/build-and-test/apps-package.md).
    > * For more information on learning how to create a manifest.json, see [the app manifest schema](../resources/schema/manifest-schema.md).

1. Open the `manifest.json` file
1. Add the following code snippet to the app manifest file:

   **webApplicationInfo**

    ```json
    "webApplicationInfo":
    {
    "id": "{Microsoft Entra AppId}",
    "resource": "api://subdomain.example.com/{Microsoft Entra AppId}"
    }
    ```

    where,
    * `{Microsoft Entra AppId}` is the app ID you created when you registered your app in Microsoft Entra ID. It's the GUID.
    * `api://subdomain.example.com/{Microsoft Entra AppId}` is the application ID URI that you registered when creating scope in Microsoft Entra ID.

    **MicrosoftEntraConfiguration**

    ```json
    "authorization": {
      "authType": "microsoftEntra",
      “microsoftEntraConfiguration”: {
        “supportsSingleSignOn”: true
      }
    },
    ```
  
1. Save the app manifest file.

For more information, see [composeExtensions.commands](../resources/schema/manifest-schema.md#composeextensionscommands).

#### Authenticate token

When the message extension calls the API during authentication, it receives a request with the user’s access token. The message extension then adds the token in the authorization header of the outgoing HTTP request. The header format is `Authorization: Bearer <token_value>`. For example, when a message extension makes an API call to a service that requires authentication. The extension constructs an HTTP request as follows:

```http
GET /api/resource HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

After the API-based message extension gets a request header with token, perform the following steps:

* **Authenticate**: Verify the token for the audience, scope, issuer, and signature claims to check if the token is for your app. For more claims, see [ID token claims](/entra/identity-platform/access-tokens#validate-tokens).

  The following is an example of a JSON Web Token (JWT) with a header and response:

  # [Token V2](#tab/token-v2)

  ```json
  {
  "typ": "JWT",
  "rh": "0.AhoAv4j5cvGGr0GRqy180BHbR6Rnn7s7iddIqxdA7UZsDxYaABY.",
  "alg": "RS256",
  "kid": "q-23falevZhhD3hm9CQbkP5MQyU"
  }.{
    "aud": "00000002-0000-0000-c000-000000000000",
    "iss": "https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47/v2.0",
    "iat": 1712509315,
    "nbf": 1712509315,
    "exp": 1712513961,
    "aio": "Y2NgYEjJqF0stqv73u41a6ZmxPEvBgA=",
    "azp": "1fec8e78-bce4-4aaf-ab1b-5451cc387264",
    "azpacr": "0",
    "name": "John Doe",
    "oid": "00000000-0000-0000-0000-000000000000",
    "preferred_username": "john.doe@contoso.com",
    "rh": "I",
    "scp": "access_as_user",
    "sub": "e4uM7JgAEm08GBuasSltQjvPuMX1fR5TqxopJpqZJB8",
    "tid": "12345678-aaaa-bbbb-cccc-9876543210ab",
    "uti": "h7DMQwSPAEeiEe62JJUGAA",
    "ver": "2.0"
    }
  ```

  # [Token V1](#tab/token-v1)

  ```json
  {
  "typ": "JWT",
  "rh": "0.AhoAv4j5cvGGr0GRqy180BHbR6Rnn7s7iddIqxdA7UZsDxYaABY.",
  "alg": "RS256",
  "kid": "q-23falevZhhD3hm9CQbkP5MQyU"
  }.{
    "aud": "api://00000002-0000-0000-c000-000000000000",
    "iss": "https://sts.windows.net/{tenantid}/",
    "iat": 1537231048,
    "nbf": 1537231048,
    "exp": 1537234948,
    "acr": "1",
    "aio": "AXQAi/8IAAAA",
    "amr": ["pwd"],
    "appid": "c44b4083-3bb0-49c1-b47d-974e53cbdf3c",
    "appidacr": "0",
    "ipaddr": "192.168.1.1",
    "name": "John Doe",
    "oid": "00000000-0000-0000-0000-000000000000",
    "scp": "access_as_user",
    "sub": "AAAAAAAAAAAAAAAAAAAAAIkzqFVrSaSaFHy782bbtaQ",
    "tid": "12345678-aaaa-bbbb-cccc-9876543210ab",
    "uti": "fqiBqXLPj0eQa82S-IYFAA",
    }
  ```

* **Use the token**: Extract the user information from the token, such as name, email, and object ID and use the token to call the message extension app's own API. For more information on claims reference with details on the claims included in access tokens, see [access token claims](/entra/identity-platform/access-token-claims-reference).

</details>
<br/>

### Troubleshooting

* If you get a **Manifest parsing has failed** error message when uploading the app to teams, use [Teams app validator](https://dev.teams.microsoft.com/validation) to validate the app package, including the app manifest and OpenAPI spec file. Review the [app manifest](#app-manifest) and the [OpenAPI Description document](#oad) requirements to resolve errors or warnings and try uploading your app.

   :::image type="content" source="../assets/images/Copilot/api-me-troubleshoot-sideload.png" alt-text="Screenshot shows the error message when uploading an app to Teams along with the option to copy the error details to clipboard.":::

* If you encounter any issues while running your app in Teams, use the following troubleshooting steps to identify and resolve your issue:

  * **Network**: Select the **Network** tab in Developer tools to inspect network activity

     1. Open [Teams web client](https://teams.microsoft.com).
     1. Sign in with your Microsoft 365 credentials.
     1. Go to a chat, and run your message extension app.
     1. At the top-right, select **Settings and more (...)**. Go to **More tools** > **Developer tools**.
     1. Select **Network**. Select the **filter** option and enter **invoke** in the search field.
     1. Select an error from the list.
     1. In the right pane, select the **Response** tab.

     1. A JSON object representing an error response from a service or API is displayed. It contains a `standardizedError` object with `errorCode`, `errorSubCode`, and `errorDescription`, which have more details about the error.

        :::image type="content" source="../assets/images/Copilot/api-me-troubleshoot-network.png" alt-text="Screenshots shows the network tab, the list of Invoke Errors, and the error details in the response tab in Developer tools while running a message extension in Teams and getting an error.":::

      **Common HTTP Error Responses**:

    * A 400 Bad Request error might occur if a request parameter is missing or incorrectly formatted.
    * A 401 Unauthorized or 403 Forbidden error suggests issues with the API key, such as it being missing or unauthorized.
    * A 500 Internal Server Error indicates that the service doesn't know how to respond, due to a server-side issue.

* **Troubleshooting with Tools**: If the information from the network trace is insufficient, you can construct a request following the OpenAPI description document and use tools like Swagger Editor or Postman to test the request, including the authorization header for the API key if necessary.

If you’re unable to resolve the errors, we recommend contacting [Microsoft Teams product support](../feedback.md#product-support-and-service-issues) for further assistance.
