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

API-based message extensions are a type of Teams app that integrates external APIs directly into Teams, enhancing your app's usability and offering a seamless user experience. API-based message extensions support search commands and can be used to fetch and display data from external services within Teams, streamlining workflows by reducing the need to switch between applications.

Before you get started, ensure that you meet the following requirements:
</br>
<details>
<summary id="OAD" >1. OpenAPI Description (OAD)</summary>

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
* The operation must not have a required Header or Cookie parameters without default values.
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

For more information, see [OpenAPI structure.](https://swagger.io/docs/specification/basic-structure/)

</details>

</br>

<details><summary>2. App manifest</summary>

Ensure that you adhere to following guidelines for app manifest:

* Set the app manifest version to `1.17`.
* Set `composeExtensions.composeExtensionType` to `apiBased`.
* Define `composeExtensions.apiSpecificationFile` as the relative path to the OpenAPI Description file within the folder. This links the app manifest to the API specification.
* Define `apiResponseRenderingTemplateFile` as the relative path to the response rendering template. This specifies the location of the template used for rendering API responses.
* Each command must have a link to the response rendering template. This connects each command to its corresponding response format.
* If a required parameter is without a default value, the command `parameters.name` in the app manifest must match the `parameters.name` in the OpenAPI Description document.
* If there’s no required parameter, the command `parameters.name` in the app manifest must match the optional `parameters.name` in the OpenAPI Description.
* The `Commands.id` property in the app manifest must match the corresponding `operationId` in the OpenAPI Description.
* Make sure that the parameters for each command match exactly with the names of the parameters defined for the operation in the OpenAPI spec.
* A response rendering template must be defined per command, which is used to convert responses from an API.
* Full description must not exceed 128 characters.
* Add `authorization` under the `composeExtensions`.
* Define the type of authentication your application by setting the `authType` property under the `authorization`. The supported values are `none`, `apiSecretServiceAuth`, and `microsoftEntra`.
* Depending on the type of authentication your application uses, you might need to add a corresponding configuration object under the `authorization` node. For example, if your application uses Microsoft Entra SSO, you would add a `microsoftEntraConfiguration` object with a `supportsSingleSignOn` property set to `true`.
* If your application uses API key based authentication, you would add an `apiSecretServiceAuthConfiguration` object with an `apiSecretRegistrationId` property. This property should contain the reference ID returned when you submitted the API key through the portal.
* You can use the Teams Store app validation tool to validate the app package, including the app manifest and the OpenAPI description document. This ensures the app meets Teams Store standards.
* You can use [Teams Store app validation](https://dev.teams.microsoft.com/validation) tool to validate the app package, which includes the app manifest and the OpenAPI description document.


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
|`composeExtensions.authorization.apiSecretServiceAuthConfiguration.apiSecretRegistrationId`| Registration id returned when developer submits the API key through Developer Portal.|
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
> Teams supports Adaptive Cards up to version 1.5, and  the Adaptive Cards Designer supports up to version 1.6.

* **Define the schema reference URL** in the `$schema` property to establish the structure of your template.
* **The supported values for `responseLayout`** are `list` and `grid`, which determine how the response is visually presented.
* **A `jsonPath` is recommended** for arrays or when the data for the Adaptive Card isn't the root object. For example, if your data is nested under `productDetails`, your JSON path would be `productDetails`.
* **Define `jsonPath` as the path** to the relevant data/array in the API response. If the path points to an array, then each entry in the array binds with the Adaptive Card template and returns as separate results. *[Optional]*
* **Get a sample response** for validating the response rendering template. This will serve as a test to ensure your template works as expected.
* **Use tools such as Fiddler or Postman** to call the API and ensure that the request and the response are valid. This step is crucial for troubleshooting and confirming that your API is functioning correctly.
* **You can use the Adaptive Card Designer** to bind the API response to the response rendering template and preview the Adaptive Card. Insert the template in the **CARD PAYLOAD EDITOR** and insert the sample response entry in the **SAMPLE DATA EDITOR**.

The following code is an example of a Response rendering template: <br/>
<br/>
  <details><summary>Response rendering template example</summary>
  {
  "version": "1.0",
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

#### Parameters

|Property  |Type  |Description  |Required  |
|--------- |---------|---------|---------|
|`version` |  `string` | The schema version of the current response rendering template.        |  Yes       |
|`jsonPath`     | `string`        | The path to the relevant section in the results to which the responseCardTemplate and previewCardTemplate should be applied. If not set, the root object is treated as the relevant section. If the relevant section is an array, each entry is mapped to the responseCardTemplate and the previewCardTemplate.        |   No      |
|`responseLayout`    | `responseLayoutType`        |  Specifies the layout of the results in the message extension flyout. The Supported types are `list` and `grid`.       |    Yes     |
|`responseCardTemplate`    |  `adaptiveCardTemplate`  | A template for creating an Adaptive Card from a result entry.      |   Yes      |
|`previewCardTemplate`     |  `previewCardTemplate`       | A template for creating a preview card from a result entry. The resulting preview card is displayed in the message extension flyout menu.        |  Yes       |

#### Json path

The JSON Path is optional but should be used for arrays or where the object to be used as the data for the adaptive card isn't the root object. The JSON path should follow the format defined by Newtonsoft. If the JSON path points to an array, then each entry in that array is bound with the adaptive card template and returns as separate results.

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

You can implement authentication in API-based search message extensions to provide secure and seamless access to applications. To enable authentication for your message extension, update your app manifest with the `none`, `apiSecretServiceAuth`, and `microsoftEntra` authentication methods. For more information, see [composeExtensions](../resources/schema/manifest-schema.md#composeextensions).

# [None](#tab/none)

You can update `none` as a value for `authorization` in an API-based message extension when the message extension does not require any authentication for the user to access the API.

# [API secret service auth](#tab/api-service-auth)

API secret service authentication is a secure method for your app to authenticate with API. You can  [register an API key](#register-an-api-key) through the developer portal for Teams, and generate an API key registration ID. [Update the app manifest](#update-app-manifest) with the `apiSecretServiceAuthConfiguration` object with an `apiSecretRegistrationId` property.

When an API request is initiated, the system retrieves the API key from a secure storage location and includes it in the authorization header using the bearer token scheme. The API endpoint, upon receiving the request, verifies the validity of the API key. If the verification is successful, the endpoint processes the request and returns the desired response, ensuring that only authenticated requests receive access to the API’s resources.

### Register an API key

API key registration allows you to secure their APIs that are behind an auth and use in message extensions. You can register an API key and specify the domain, tenant, and app that can access the APIs, and provide the secrets that are needed to authenticate the API calls.  You can then paste the API key ID in the simplified messaging extension and the API key ID enables the authentication for the API calls that are behind an auth.

To register an API Key, follow these steps:

1. Go to **Tools** > **API Key Registration**.

1. Select **+ New API key**.

1. In the **API key registration** page, under **Register an API key**, update the following:

   1. **Description**: Description of the API Key.
   1. **Add domain**: Update the base path for API endpoints. The path must be a secure HTTPS URL, include a fully qualified domain name, and can optionally include a specific path. For example, `https://api.yelp.com`.

1. Under **Set a target tenant**, select the following:

   |Option   |When to use  | description|
   |---------|---------|----------------|
   |**Home tenant**     | When you develop your app in your tenant and test the app as a custom app or custom app built for your org.        |  The API key is only usable within the tenant where the the API is registered. |
   |**Any tenant**     | After you've completed testing the app and want to enable the app across different tenants. Ensure that you update your target tenant to **Any tenant** before submitting your app package to the Partner Center.        | The API key can be used in other tenants after the app is available in the Teams Store. |

1. Under **Set a Teams app**, select the following:

   |Option   |When to use  | description|
   |---------|---------|----------------|
   |**Any Teams app**     | When you develop your app in your tenant and test the app as a custom app or custom app built for your org.        | The API key is can be used with any Teams app. It's useful when custom app or custom app built for your org have IDs generated after app upload. |
   |**Existing Teams app**     | After you've completed testing of your app within your tenant as a custom app or custom app built for your org. Update your API key registration and select **Existing Teams app** and input your app’s manifest ID.         |The **Existing Teams app** option binds the API secret registration to your specific Teams app. |

1. Select **+ Add Secret** and enter the OpenAI API secret key.

   You can maintain up to two secrets for each API key registration. If one key is compromised, it can be promptly removed and allows Teams to switch to the second key. Also, if the first key results in a 401 error, Teams automatically attempts to use the second key. It helps with uninterrupted service for users and eliminates any potential downtime during the creation of a new secret.

1. Select **Save**. An **API key registration ID** is generated.

### Update app manifest

You can authorize incoming requests to your service by configuring a static API key. The API key is stored securely and added to the API call. Add an `apiSecretServiceAuthConfiguration` object with an `apiSecretRegistrationId` property, which contains the reference ID when you submit the API key through the Developer portal for Teams.

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

# [Microsoft Entra ID](#tab/microsoft-entra-id)

`microsoftEntra` authentication method uses an app user's Teams identity to provide them with access to your app. A user who has logged into Teams doesn't need to log in again to your app within the Teams environment. With only a consent required from the app user, the Teams app retrieves access details for them from Microsoft Entra ID. After the app user has given consent, they can access the app even from other devices without having to be validated again.

### Prerequisites

Before you start, ensure you have the following:

* An Azure account with an active subscription.
* Basic familiarity with Microsoft Entra ID and Teams app development.

:::image type="content" source="../assets/images/Copilot/api-me-entra-sso.png" alt-text="Screenshot shows how Microsoft Entra SSO authorization works to authenticationan API.":::

To enable `microsoftEntra` authentication method for API-based message extension, follow these steps:

1. **Configure App with Microsoft Entra ID**: Create an Microsoft Entra ID app to generate an app ID and application ID URI. This is used to configure scopes and authorize trusted client applications for generating access tokens. You can follow the steps outlined in the [Microsoft Entra ID app creation guide](/azure/active-directory/develop/quickstart-register-app).

1. **Add Code to Handle Access Tokens**: Add the code to handle access tokens. This token should be sent to your app's server code in the Authorization header. Ensure to validate the access token when it's received. Here's an example of how to handle access tokens:

   ```javascript
   // Handle access token
   app.use((req, res, next) => {
   const authHeader = req.headers.authorization;
   const token = authHeader && authHeader.split(' ')[1];
   
   if (token == null) return res.sendStatus(401);
   
   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
   });
   });
   ```

1. **Update app manifest**: Update your Teams client app manifest with the app ID and application ID URI generated on Microsoft Entra ID. This allows Teams to request access tokens on behalf of your app. The "webApplicationInfo" section in the manifest file is where you specify this information.

   ```json
    "webApplicationInfo": {
      "id": "{Microsoft Entra ID AppId}",
      "resource": "api://subdomain.example.com/botId-{guid}"
    }
   ```

1. **Add SSO Support to the Plugin**: Add the following auth section to the plugin part of the manifest. This indicates that the plugin supports SSO.

   ```json
    "authorization": {
      "authType": "microsoftEntra",
      "microsoftEntraConfiguration": {
        "supportsSingleSignOn": true,
    
      }
    },
   ```

1. **Validate the Token**: Before the token is sent to the plugin, validate that the resource URI and the domain the request is sent to be the same. Also, confirm the user ID in the token is the same as the one used for SMBA auth.

1. **Send Invoke Request with Access Token**: The client sends an invoke request with the access token. An invoke request is a type of HTTP request that is used to trigger actions on the server. Here's an example payload that contains the access token.

   ```json
    {
      "name": "composeExtension/query",
      "value": {
        "commandId": "insertWiki",
        "parameters": [
          {
            "name": "searchKeyword",
            "value": "lakers"
          }
        ],
        "authentication": {
          "token": "…"
        },
        "queryOptions": {
          "skip": 0,
          "count": 25
        }
      }
    }
   ```

---

### Validate

Use [Teams app validator](https://dev.teams.microsoft.com/validation) to validate that the package, including the app manifest and OpenAPI spec file are valid.

### Troubleshoot

Analyzing network traces and standardized errors can be instrumental in identifying and resolving API request issues.

* **Network Trace Analysis**: By filtering the network trace for “invoke” actions, you can examine the standardizedError returned in the response. This error provides detailed information about what went wrong with the API request.

* **Error Codes and Messages**: The standardizedError object includes an errorCode, errorSubCode, and an errorDescription. For example, a 412 error code with a description of “Missing required parameter term” indicates that a required parameter was not included in the request.

* **Common HTTP Error Responses**:
  * A 400 Bad Request error may occur if a request parameter is missing or incorrectly formatted.
  * A 401 Unauthorized or 403 Forbidden error suggests issues with the API key, such as it being missing or unauthorized.
  * A 500 Internal Server Error indicates that the service does not know how to respond, possibly due to a server-side issue.

* **Headers and Parameters**: Ensure that all necessary headers are defined in the request and that all required parameters are included.

* **Troubleshooting with Tools**: If the information from the network trace is insufficient, you can construct a request following the API spec and use tools like Fiddler or Postman to test the request, including the authorization header for the API key if necessary.


## See also
