---
title: Build API-based Message Extension
author: surbhigupta
description: Learn how to create or build an API-based message extension using Developer Portal for Teams, Teams Toolkit for Visual Studio, Visual Studio Code, and CLI.
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
ms.date: 02/26/2025
---
# Create an API-based message extension

> [!NOTE]
> API-based message extensions only support search commands.

API-based message extensions are a Microsoft Teams app capability that integrates external APIs directly into Teams, enhancing your app's usability and offering a seamless user experience. API-based message extensions support search commands and can be used to fetch and display data from external services within Teams, streamlining workflows by reducing the need to switch between applications.

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

For more information, see [OpenAPI structure.](https://swagger.io/docs/specification/basic-structure/)

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
* Make sure that the parameters for each command match exactly with the names of the parameters defined for the operation in the OpenAPI spec.
* A [response rendering template](#response-template) must be defined per command, which is used to convert responses from an API.
* Full description must not exceed 128 characters.

  ```json
   {
   "$schema": "https://developer.microsoft.com/json-schemas/teams/v1.17/MicrosoftTeams.schema.json",
   +  "manifestVersion": "1.17",
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
   +            "apiSecretRegistrationId": "9xxxxxxx-7xxx-4xxx-bxxx-1xxxxxxxxxxx"
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

<details><summary id="response-template">3. Response rendering template</summary>

* **Define the schema reference URL** in the `$schema` property to establish the structure of your template.
* **The supported values for `responseLayout`** are `list` and `grid`, which determine how the response is visually presented.
* **A `jsonPath` is recommended** for arrays or when the data for the Adaptive Card isn't the root object. For example, if your data is nested under `productDetails`, your JSON path would be `productDetails`.
* **Define `jsonPath` as the path** to the relevant data or array in the API response. If the path points to an array, then each entry in the array binds with the Adaptive Card template and returns as a separate result. *[Optional]*
* **Get a sample response** for validating the response rendering template. This serves as a test to ensure your template works as expected.
* **Use tools such as Fiddler or Postman** to call the API and ensure that the request and the response are valid. This step is crucial for troubleshooting and confirming that your API is functioning correctly.
* **You can use the Adaptive Card Designer** to bind the API response to the response rendering template and preview the Adaptive Card. Insert the template in the **CARD PAYLOAD EDITOR** and insert the sample response entry in the **SAMPLE DATA EDITOR**.

The following code is an example of a Response rendering template: <br/>
<br/>
  <details><summary>Response rendering template example</summary>

  ```json
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

  **Preview Card**

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

The JSON path is optional but should be used for arrays or where the object to be used as the data for the adaptive card isn't the root object. The JSON path should follow the format defined by Newtonsoft. If the JSON path points to an array, then each entry in that array is bound with the adaptive card template and returns as separate results.

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

Use [Adaptive Card Designer](https://adaptivecards.microsoft.com/designer.html) to preview an Adaptive Card by inserting the template into Card Payload Editor. Take a sample response entry from your array or for your object and insert it into Sample Data Editor. Ensure that the card renders properly and is to your liking.

#### Schema mapping

The properties in OpenAPI Description document are mapped to the Adaptive Card template as follows:

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

You can create an API-based message extension using Developer Portal for Teams, Teams Toolkit for Visual Studio Code, command line interface (CLI), or Visual Studio.

# [Developer Portal for Teams](#tab/developer-portal-for-teams)

To create an API-based message extension using Developer Portal, follow these steps:

1. Go to **[Developer Portal](https://dev.teams.microsoft.com/home)**.
1. Go to **Apps**.
1. Select **+ New app**.
1. Enter a name of the app and select the **Manifest version** as **Public developer preview (devPreview)**.
1. Select **Add**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-manifest-version.png" alt-text="Screenshot shows the app name and the manifest version selected as Latest prerelease (devPreview) in Developer Portal.":::

1. In the left pane, under **Configure**, update the following **Basic information**:

   1. Full name
   1. Short description
   1. Long description
   1. Developer or company name
   1. Website (must be a valid HTTPS URL)
   1. Privacy policy
   1. Terms of use

1. Select **Save**.

1. Select **App features**.
1. Select **Message extension**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-app-feature.png" alt-text="Screenshot shows the message extension option in Developer Portal." lightbox="../assets/images/Copilot/api-based-me-tdp-app-feature.png":::

1. Under **Message extension type**, select **API**.

   1. If you get a disclaimer that reads **Bot message extension is already in use by users. Would you like to change message extension type to API?**, select **Yes, change**.

1. Under **OpenAPI spec**, select **Upload now**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-upload.png" alt-text="Screenshot shows the Upload now option in Developer Portal." lightbox="../assets/images/Copilot/api-based-me-tdp-upload.png":::

1. Select the OpenAPI Description document in the JSON or YAML format and select **Open**.

1. Select **Save**. A pop-up appears with the message **API spec saved successfully**.
1. Select **Got it**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-api-saved.png" alt-text="Screenshot shows an example of the API spec saved successfully message and Got it button.":::

**Add commands**

> [!NOTE]
> Message extensions built from an API only support a single parameter.

You can add commands and parameters to your message extension, to add commands:

1. Under **Message extension type**, select **Add**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-add-commands.png" alt-text="Screenshot shows the add option to add commands in Developer Portal." lightbox="../assets/images/Copilot/api-based-me-tdp-add-commands.png":::

   An **Add a command** pop-up appears with a list of all the available APIs from the OpenAPI Description document.

1. Select an API from the list and select **Next**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-commands-api-list.png" alt-text="Screenshot shows the list of APIs from the OpenAPI Description Document in the Add a command pop-up window.":::

1. Under **Response template**, select **Upload now**.

    :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-adaptive-card-template.png" alt-text="Screenshot shows the Upload now option to add the Adaptive Card template in for the command.":::

   > [!NOTE]
   > If you have more than one API, ensure that you upload the Adaptive Card response template for each API.

1. Select the Adaptive Card response template file in JSON format and select **Open**.

   The following attributes are updated automatically from the Adaptive Card template:
   * Command Type
   * Command ID
   * Command title
   * Parameter name
   * Parameter description

1. Under **Details**, update the **Command description**.

1. If you want to launch a command using a trigger in Microsoft 365 Copilot, turn on the **Automatically run this command when a user opens the extension** toggle.

1. Select **Add**. The command is added successfully.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-command-details.png" alt-text="Screenshot shows the fields available in the command details page.":::

1. Select **Save**.

1. Under **Authentication and authorization**, select any of the following options:

   * **No Authentication (not recommended)**
   * **API key**
   * **OAuth**

An API-based message extension is created.

:::image type="content" source="../assets/images/Copilot/api-based-me-tdp-plugin-copilot.png" alt-text="Screenshot shows the plugin for Microsoft 365 Copilot created in the app features page in Developer Portal." lightbox="../assets/images/Copilot/api-based-me-tdp-plugin-copilot.png":::

To test your API-based message extension created in Developer Portal, you can use the following methods:

* **Preview in Teams**: Open your message extension and select **Preview in Teams** in the upper-right corner. You're redirected to Teams, where you can add the app to Teams to preview the app.

* **Download app package**: On the message extension page, select **App package** from the left pane and then, in the upper-left corner of the window, select **Download app package**. The app package is downloaded to your local machine in a .zip file. You can upload the app package to teams and test the message extension.

# [Visual Studio Code](#tab/visual-studio-code)

> [!NOTE]
> Teams Toolkit supports OpenAPI Specification version 2.0 and 3.0.x.

To build an API-based message extension using Teams Toolkit for Visual Studio Code, follow these steps:

1. Open **Visual Studio Code**.
1. From the left pane, select **Teams Toolkit**.
1. Select **Create a New App**.
1. Select **Message Extension**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/create-me.png" alt-text="Screenshot shows the message extension option in Teams Toolkit.":::

1. Select **Custom Search Results**.

1. Select one of the following options:
    1. To build from the beginning, select **Start with a new API**.
    1. If you already have an OpenAPI description document, select **Start with an OpenAPI Description Document**.

     :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-plugin-copilot-options.png" alt-text="Screenshot shows the options to create a search based message extension.":::

1. Based on the options selected in **step 6**, select the following:

   # [New API](#tab/new-api)

   > [!NOTE]
   > The authentication flow for Microsoft Entra is only functional in remote environments. You can't test it in a local environment due to the lack of authentication support in Azure Function core tools. The repair API can be invoked anonymously in a local environment.

   1. Select the authentication type:
      * **None**: Select if you don't want any authentication for the user to access the API.
      * **API Key**: Select if you want to authenticate using an API key.
      * **Microsoft Entra**: Select if you want to authenticate using app user's Teams identity.

      :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-auth-type.png" alt-text="Screenshot shows the authentication options for API-based message extension.":::

   1. Select a programming language.

       :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-plugin-programming language.png" alt-text="Screenshot shows the programming language options.":::

   1. Select **Default folder**.

   1. Enter the name of your app and select **Enter**. Teams Toolkit creates a new plugin with API from Azure functions.
   1. To get started, you must update the source code in the following files:

      | File | Contents |
      | --- | --- |
      | `src/functions/repair.ts` | The main file of a function in Azure Functions. Defines an Azure Function that retrieves and filters repair records based on a query parameter from an HTTP GET request, and returns the results as a JSON response. |
      | `src/repairsData.json` | The data source for the repair API. |
      | `src/keyGen.ts` | Designed to generate an API key used for authorization. |
      | `appPackage/apiSpecificationFile/repair.yml` | A file that describes the structure and behavior of the repair API. |
      | `appPackage/responseTemplates/repair.json` | A template file for rendering API response. |
      | `teamsapp.yml` | The main Teams Toolkit project file. The project file defines two primary things: Properties and configuration Stage definitions.|
      |`teamsapp.local.yml` | Overrides teamsapp.yml with actions that enable local execution and debugging.|
      |`aad.manifest.json` | Defines the configuration of Microsoft Entra app. This template only provisions a single tenant Microsoft Entra app.|

   1. Based on the options selected in **step a**, follow these steps:

      * If you've selected **none** or **Microsoft Entra**, skip to the next step.

      * If you've selected API key, follow these steps:

         Generate and set up your API key as follows:

        1. In Visual Studio Code, go to **View** > **Terminal**.
        2. Run the following command to install dependency packages:

           ```
           npm install
           ```

        3. Run the following command to generate your API key:

           ```
           npm run keygen
           ```

           The API key is generated as **Generated a new API Key: xxx...**. The generated API key is registered and recorded in the [API key registration tool](https://dev.teams.microsoft.com/api-key-registration) in Developer Portal. For more information on API key registration, see [register an API key](api-based-secret-service-auth.md#register-an-api-key).

        4. Enter the generated API key into your `env/.env.*.user` file. Replace `<your-api-key>` with the actual key:

           ```
           SECRET_API_KEY=<your-api-key>
           ```

      </details>

   # [OpenAPI Description](#tab/openapi-specification)

   1. Enter or browse the OpenAPI Description document location.

      :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-plugin-copilot-openapi-spec-location.png" alt-text="Screenshot shows the option to select OpenAPI Description document location.":::

   1. From the API list, select the required APIs and select **OK**.

      > [!NOTE]
      > GET and POST APIs are supported for API-based message extensions.

   1. Select **Default folder**.
   1. Enter the name of your app and select **Enter**. Teams Toolkit scaffolds the OpenAPI Description document and created an API-based message extension.
   1. Under **LIFECYCLE**, select **Provision**.
   1. If your OpenAPI specification document has a security scheme `bearerAuth`, which uses the HTTP bearer scheme, enter the API key in the command window and select **Enter**.

        :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-api-key.png" alt-text="Screenshot shows the Enter API key command that appears in Teams Toolkit for Visual Studio Code.":::

      > [!NOTE]
      > The API key must be a string with 10 to 2048 characters.

    ---

     > [!NOTE]
     > Teams toolkit source file includes a security check to ensure that an incoming request is authorized. It uses a function `isApiKeyValid(req)` to verify if the request contains a valid API key. If the API key isn't valid, the code returns an 401 HTTP status code, indicating an Unauthorized response.

1. From the left pane, select **Teams Toolkit**.
1. Under **ACCOUNTS**, sign in with your [Microsoft 365 account](/microsoftteams/platform/toolkit/accounts) and Azure account if you haven't already.

   :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-accounts.png" alt-text="Screenshot shows the Microsoft 365 and Azure sign in option in Teams Toolkit.":::

1. From the left pane, select **Run and Debug (Ctrl+Shift+D)**.
1. From the launch configuration dropdown, select `Preview in Teams (Edge)` or `Preview in Teams (Chrome)`. Teams Toolkit launches Teams web client in a browser window.
1. Go to a chat message and select the **Actions and apps** icon. In the flyout menu, search for your app.
1. Select your message extension from the list and enter a search command in the search box.

   :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-invoke-teams.png" alt-text="Screenshot shows that a message extension app is invoked from the plus icon in the chat and the app is displayed in the message extension flyout menu.":::

1. Select an item from the list. The item unfurls into an Adaptive Card in the message compose area.

1. Select the **Enter** key and Teams sends the search result as an Adaptive Card in the chat message.

   :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-sbs-result.png" alt-text="Screenshot shows the Adaptive Card with the search results in the chat message in Teams.":::

# [Teams Toolkit CLI](#tab/teams-toolkit-cli)

To create an API-based message extension using Teams Toolkit CLI, follow these steps:

1. Go to **Command Prompt**.

1. Enter the following command:

   ```
   npm install -g @microsoft/teamsapp-cli
   ```

1. Type `teamsapp new` in the terminal

1. Select **Message Extension**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-CLI-new-project-me.png" alt-text="Screenshot shows Teams capabilities as options in the CLI interface.":::

1. Select **Custom Search Results**.

1. Select **Start from an OpenAPI Description Document**.

1. Enter a valid URL or local path of your OpenAPI Description document.

1. Select the APIs from the list and select **Enter**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-CLI-API-options-me.png" alt-text="Screenshot shows the list of API extracted from the OprnOpenAPI Description document in the command prompt.":::

1. Enter the location for your project and select **Enter**.

1. Enter the name of your application and select **Enter**.

   :::image type="content" source="../assets/images/Copilot/api-based-CLI-project-done-me.png" alt-text="Screenshot shows the message that the project is created in the required project folder.":::

1. Go to the folder path where your project is created and enter the following command to provision your app in Azure:

   ```teamsapp provision --env dev```

   Teams Toolkit CLI opens a browser window and requests you to sign in to your Microsoft Account.

1. Sign in to your Microsoft account. Teams Toolkit CLI executes validation and provisions your app on Azure.

   :::image type="content" source="../assets/images/Copilot/api-based-CLI-provision-me.png" alt-text="Screenshot shows the sign in request and the provision stages in the command prompt window.":::

1. In the command prompt window, enter the following command to preview your app in Teams:

   ```teamsapp preview --env dev```

   A new browser window with Teams web client opens. You can add your app to Teams.

# [Visual Studio](#tab/visual-studio)

Before you get started, ensure that you install Visual Studio Enterprise 2022 Preview version 17.9.0 Preview 1.0 and install the **Microsoft Teams development tools** under **ASP.NET and web development** workload.

To create an API-based message extension using Teams Toolkit for Visual Studio, follow these steps:

1. Open **Visual Studio**.
1. Go to **File** > **New** > **Project...** or **New Project**.

1. Search for **Teams** and select **Microsoft Teams App**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-vs-teams.png" alt-text="Screenshot shows the Microsoft Teams app option in Visual Studio.":::

1. Enter the **Project name** and **Location**.
1. Select **Create**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-vs-new-app.png" alt-text="Screenshot shows the project name, Location, and Create option in Visual Studio.":::

1. Select **Search Results from API**.

1. Select any of the following options:
   * If you want to start without an API, select **Start with a new API**.
   * If you have an existing OpenAPI Description document, select **Start with an OpenAPI Description**.

1. Select **Create**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-vs-create-project.png" alt-text="Screenshot shows the Search results from API, New API, OpenAPI Description Document, and Create options in Visual Studio to create a new Project.":::

1. Based on the options selected in **step 7**, select the following:

   # [New API](#tab/new-api2)

   1. To get started, you must update the source code in the following files:

      |File  |Contents |
      |---------|---------|
      |`Repair.cs` | The main file of a function in Azure Functions. Defines an Azure Function that retrieves and filters repair records based on a query parameter from an HTTP GET request, and returns the results as a JSON response.|
      |`RepairData.cs`|The data source for the repair API. Contains a method that returns a hardcoded list of car repair tasks. |
      |`Models/RepairModel.cs`|Defines a data model that represents a repair task with properties such as ID, Title, Description, AssignedTo, Date, and Image.|
      |`appPackage/apiSpecificationFile/repair.yml` |  A file that describes the structure and behavior of the repair API.|
      |`appPackage/responseTemplates/repair.json` |  A generated Adaptive Card that used to render API response.|
      |`appPackage/responseTemplates/repair.data.json` | The data source for the repair API.|
      | `teamsapp.yml` | The main Teams Toolkit project file. The project file defines two primary things: Properties and configuration Stage definitions.|
      |`teamsapp.local.yml` | Overrides teamsapp.yml with actions that enable local execution and debugging.|

   1. After you've updated the source code, in the debug dropdown menu, select **Dev Tunnels (no active tunnel)** > **Create a Tunnel...**.

      :::image type="content" source="../assets/images/Copilot/bot-based-VS-dev-tunnel.png" alt-text="Screenshot shows the create a tunnel option in Visual Studio.":::

   1. Select an account to create the tunnel. The supported account types are Azure, Microsoft Account (MSA), and GitHub.
      1. **Name**: Enter a name for the tunnel.
      1. **Tunnel Type**: Select **Persistent** or **Temporary**.
      1. **Access**: Select **Public**.
      1. Select **OK**. Visual Studio displays a confirmation message that a tunnel is created.

       The tunnel you created is listed under **Dev Tunnels**.

   1. Go to **Solution Explorer** and select your project.
   1. Right-click the menu and select **Teams Toolkit** > **Prepare Teams App Dependencies**.

      If prompted, sign in with a Microsoft 365 account. A message appears that the app is successfully prepared.

   1. Select the **F5** key or select **Debug** > **Start Debugging**. Visual Studio launches a Teams web client.

   # [OpenAPI Description](#tab/openapi-specification2)

   1. Enter OpenAPI specification URL or select **Browse..** to upload a file from your local machine.
   1. Select the dropdown and select the APIs from the list.
   1. Select **Create**. The project is scaffolded and you can find API specification, manifest, and response template files in the **appPackage** folder.
   1. Go to **Solution Explorer** and select your project.
   1. Right-click the menu and select **Teams Toolkit** > **Provision in the Cloud**.

      :::image type="content" source="../assets/images/Copilot/api-based-VS-provision-cloud.png" alt-text="Screenshot shows the Provision in the Cloud option under Teams Toolkit in Visual Studio.":::

      If prompted, sign in with a Microsoft 365 account. A message appears that the app is successfully prepared.

   1. Right-click your project and select **Teams Toolkit** > **Preview in** > **Teams**.
   1. Select the **manifest.json** file and select **Open**. Visual Studio launches a Teams web client.

    ---

1. Go to a chat and select **Actions and apps**.

1. From the message extension fly-out menu, enter the name of your message extension in the search box.

   :::image type="content" source="../assets/images/Copilot/api-based-me-vs-invoke-app.png" alt-text="Screenshot shows an example of message extension flyout menu invoked from the Plus icon and MyTeamsApp entered in the search filed. The app is displayed in the search results.":::

1. Select the message extension and enter your search query.

1. Select an item from the list. The item unfurls into an Adaptive Card in the message compose area.

1. Select the **Enter** key and Teams sends the search result as an Adaptive Card in the chat message.

   :::image type="content" source="../assets/images/Copilot/api-based-me-vs-adaptive-card-chat.png" alt-text="Screenshot shows an example of Adaptive Card sent to the user's chat in Teams." lightbox="../assets/images/Copilot/api-based-me-vs-adaptive-card-chat.png":::

---

## Multi parameters

Multi parameters allow API-based message extensions to have more than one input type for query commands. For example, you can search for anime by genre, rating, status, and date.

# [App manifest](#tab/app-manifest)

You can specify the input types, titles, descriptions, and required fields for the parameters in the manifest.

* The `isRequired` property in the parameter field indicates if a parameter is mandatory for the query command.
* The `name` property of the `parameters` field in the app manifest must match the `id` field in the OpenAPI Description document for the corresponding parameter.

**Example**

```json
"composeExtensions": [
        {
            "composeExtensionType": "apiBased",
            "apiSpecificationFile": "apiSpecificationFiles/openapi.json",
            "commands": [
                {
                    "context": [
                        "compose"
                    ],
                    "type": "query",
                    "title": "Search Animes",
                    "id": "getAnimeSearch",
                    "parameters": [
                        {
                            "name": "q",
                            "title": "Search Query",
                            "description": "The search query",
                            "isRequired": true
                        },
                        {
                            "name": "type",
                            "inputType": "choiceset",
                            "title": "Type",
                            "description": "Available anime types",
                            "choices": [
                                {
                                    "title": "TV",
                                    "value": "tv"
                                },
                                {
                                    "title": "OVA",
                                    "value": "ova"
                                },
                                {
                                    "title": "Movie",
                                    "value": "movie"
                                },
                                {
                                    "title": "Special",
                                    "value": "special"
                                },
                                {
                                    "title": "ONA",
                                    "value": "ona"
                                },
                                {
                                    "title": "Music",
                                    "value": "music"
                                }
                            ]
                        },
                        {
                            "name": "status",
                            "inputType": "choiceset",
                            "title": "Status",
                            "description": "Available airing statuses",
                            "choices": [
                                {
                                    "title": "Airing",
                                    "value": "airing"
                                },
                                {
                                    "title": "Completed",
                                    "value": "complete"
                                },
                                {
                                    "title": "Upcoming",
                                    "value": "upcoming"
                                }
                            ]
                        },
                        {
                            "name": "rating",
                            "inputType": "choiceset",
                            "title": "Rating",
                            "description": "Available ratings",
                            "choices": [
                                {
                                    "title": "G",
                                    "value": "g"
                                },
                                {
                                    "title": "PG",
                                    "value": "pg"
                                },
                                {
                                    "title": "PG-13",
                                    "value": "pg13"
                                },
                                {
                                    "title": "R",
                                    "value": "r17"
                                },
                                {
                                    "title": "R+",
                                    "value": "r"
                                },
                                {
                                    "title": "Rx",
                                    "value": "rx"
                                }
                            ]
                        }
                    ],
                    "description": "Search animes",
                    "apiResponseRenderingTemplateFile": "response_json/getAnimeSearch.json"
                },
                {
                    "context": [
                        "compose"
                    ],
                    "type": "query",
                    "title": "Search mangas",
                    "id": "getMangaSearch",
                    "parameters": [
                        {
                            "name": "q",
                            "title": "Search Query",
                            "description": "The search query",
                            "isRequired": true
                        },
                        {
                            "name": "type",
                            "inputType": "choiceset",
                            "title": "Type",
                            "description": "Available manga types",
                            "choices": [
                                {
                                    "title": "Manga",
                                    "value": "manga"
                                },
                                {
                                    "title": "Novel",
                                    "value": "novel"
                                },
                                {
                                    "title": "Light Novel",
                                    "value": "lightnovel"
                                },
                                {
                                    "title": "One Shot",
                                    "value": "oneshot"
                                },
                                {
                                    "title": "Doujin",
                                    "value": "doujin"
                                },
                                {
                                    "title": "Manhwa",
                                    "value": "manhwa"
                                },
                                {
                                    "title": "Manhua",
                                    "value": "manhua"
                                }
                            ]
                        },
                        {
                            "name": "status",
                            "inputType": "choiceset",
                            "title": "Status",
                            "description": "Available manga statuses",
                            "choices": [
                                {
                                    "title": "Publishing",
                                    "value": "publishing"
                                },
                                {
                                    "title": "Complete",
                                    "value": "complete"
                                },
                                {
                                    "title": "Hiatus",
                                    "value": "hiatus"
                                },
                                {
                                    "title": "Discontinued",
                                    "value": "discontinued"
                                },
                                {
                                    "title": "Upcoming",
                                    "value": "upcoming"
                                }
                            ]
                        },
                        {
                            "name": "start_date",
                            "title": "Start Date",
                            "description": "Start date of the manga",
                            "inputType": "date"
                        },
                        {
                            "name": "end_date",
                            "title": "End Date",
                            "description": "End date of the manga",
                            "inputType": "date"
                        }
                    ],
```

# [Teams Toolkit](#tab/teams-toolkit)

To build an API-based message extension with multiple parameters using Teams Toolkit for Visual Studio Code, follow these steps:

1. Open **Visual Studio Code**.
1. From the left pane, select **Teams Toolkit**.
1. Select **Create a New App**.
1. Select **Message Extension**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/first-msgext/create-new-app1.png" alt-text="Screenshot shows the message extension option in Teams Toolkit.":::

1. Select **Custom Search Results**.

1. Select one of the following options:
    1. To build from the beginning, select **Start with a new API**.
    1. If you already have an OpenAPI description document, select **Start with an OpenAPI Description Document**.

     :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-plugin-copilot-options.png" alt-text="Screenshot shows the options to create a search based message extension.":::

1. Enter or browse the OpenAPI Description document location.

      :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-plugin-copilot-openapi-spec-location.png" alt-text="Screenshot shows the option to select OpenAPI Description document location.":::

1. From the API list, select the required APIs and select **OK**.

      > [!NOTE]
      > GET and POST APIs are supported for API-based message extensions.

1. Select **Default folder**.
1. Enter the name of your app and select **Enter**. Teams Toolkit scaffolds the OpenAPI Description document and created an API-based message extension.
1. Under **LIFECYCLE**, select **Provision**.
1. From the left pane, select **Teams Toolkit**.
1. Under **ACCOUNTS**, sign in with your [Microsoft 365 account](/microsoftteams/platform/toolkit/accounts) and Azure account if you haven't already.

   :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-accounts.png" alt-text="Screenshot shows the Microsoft 365 and Azure sign in option in Teams Toolkit.":::

1. From the left pane, select **Run and Debug (Ctrl+Shift+D)**.
1. From the launch configuration dropdown, select `Preview in Teams (Edge)` or `Preview in Teams (Chrome)`. Teams Toolkit launches Teams web client in a browser window.
1. Go to a chat message and select the **Actions and apps** icon. In the flyout menu, search for your app.
1. Select your message extension from the list and enter a search command in the search box.
1. Select the required parameter from the **PetId** dropdown and enter required details as the secondary parameter in the **Text** box.

    :::image type="content" source="../assets/images/messaging-extension/me-petid.png" alt-text="Screenshot shows you the message extension card in Teams to add petId and text.":::

1. Select **Search** and then select the output from the flyout menu.

    :::image type="content" source="../assets/images/messaging-extension/me-plugin-petid.png" alt-text="Screenshot shows you the message extension in Teams plugins.":::

1. The Adaptive Card with required detail appears in the message compose area. Select **Enter**.

    :::image type="content" source="../assets/images/messaging-extension/me-multi-parameter.png" alt-text="Screenshot shows you the multi-parameter result in the message compose area." lightbox="../assets/images/messaging-extension/me-multi-output.png":::

Now you've succesfully created multi paramter in message extension.

---

## Step-by-step guides

To build an API-based message extension, follow these step-by-step guides:

* [For beginners](../sbs-api-msg-ext-ttk.yml): Build an API-based message extension using Teams Toolkit.
* [For advanced users](../sbs-api-based-message-extensions.yml): Build an API-based message extension from the ground up.

## See also

[Authentication for API-based message extensions](build-api-based-message-extension.md)
