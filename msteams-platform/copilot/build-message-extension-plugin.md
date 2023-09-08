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

## Prerequisites

1. **App manifest**: The app manifest version should 1.13 or later.
2. **Microsoft 365** (For bot based plugin): You need to register your Bot on Azure bot service under Microsoft 365 Channel. 
3. **Single Sign-on (SSO)**: if your apps needs SSO authentication then need to configure authorized client application.


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


# See also


