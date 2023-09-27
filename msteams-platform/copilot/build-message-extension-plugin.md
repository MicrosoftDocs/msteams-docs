---
title: Build Message extension plugin
author: v-ypalikila
description: Learn how to build an API and bot based message extensions for Teams with openAPI specification or chatGPT plugin manifest.
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
ms.date: 09/05/2023
---

# Build Message extension plugin

Meetings users can interact with copilot to perform search and action-based scenarios with Microsoft and third-party plugins (existing bot-based message extensions) using natural language and custom prompts. For example, users can perform an action with a  plugin in a meeting or query and discover content from the plugins.

Meetings copilot will process these actions and render them appropriately and provide extensibility actions such - open URL, share content in meeting, launch task module and app acquisition without leaving meeting copilot.

Message extensions and plugins are a way to extend the functionality of  Microsoft Teams by allowing users to interact with your app or service from the message compose box. They can be used to insert content, trigger actions, or display information in a task module or a card. For more information, see [Build message extensions](../messaging-extensions/what-are-messaging-extensions.md).

## Prerequisites

1. **App manifest**: Use app manifest version 1.13 or later.
2. **Microsoft 365** (For bot based plugin): You need to register your Bot on Azure bot service under Microsoft 365 Channel.
3. **Single Sign-on (SSO)**: if your apps need SSO authentication then need to configure authorized client application.

## Build message extension plugin

**OpenAPI Specification (OAS)** defines a standard, language-agnostic interface to HTTP APIs, which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection. An OpenAPI Specification be used by documentation generation tools to display the API, code generation tools to generate servers and clients in various programming languages, testing tools, and many other use cases.

**OpenAI plugins** connect ChatGPT to third-party applications. These plugins enable ChatGPT to interact with APIs defined by developers, enhancing ChatGPT's capabilities and allowing it to perform a wide range of actions.

Create a ChatGPT plugin or OpenAPI Specification document in JSON or YAML format.

   The following code is an example of an API spec in YAML format:

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

If you've created an OpenAPI specification document, you must create an Adaptive Card template for the bot to respond to the Get requests.

The following is an example of the Adaptive Card template:

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
            "url": "${if(image, image, '')}"
        }
    }
}
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

## Best practices

Message extension plugins are a type of Teams app that allows you to integrate your business chat functionality directly into Teams. This can enhance your app's usability and provide a seamless user experience. To implement this feature, you need to set specific parameters in the composeExtension section of your Teams app manifest:

* Set composeExtension.composeExtensionType to `apiBased`.
* Define `composeExtension.apiSpecificationFile` as the relative path to the OpenAPI specification file within the folder.

### API based Message Extensions

API based Message Extensions (MEs) are a powerful tool that allows you to extend the functionality of your Teams app by integrating with external APIs. This can greatly enhance the capabilities of your app and provide a richer user experience. To implement OpenAPI MEs, you need to follow these guidelines:

* The ID for the command in the Teams app manifest must match the corresponding operationId in the OpenAPI specification.
* If there's a required parameter without a default value, the parameter name of the command defined in the Teams app manifest must match this parameter name.
* If there's no required parameter without a default value, the parameter name in the Teams app manifest must match the name of an optional parameter defined for that operation.
Neither zero nor more than one parameter is supported.
* A response rendering template must be defined per command. This file, used to convert responses from an API, must be local just like the OpenAPI specification. The command portion of the manifest must point to this template file under composeExtension.command.apiResponseRenderingTemplateFile within the app manifest. Each command will point to a different response rendering template file.

### General Guidelines

Regardless of whether you're implementing an API plugin or API ME, follow these guidelines:

* The server URL must be an absolute endpoint. This ensures that your app can reliably connect to the server regardless of the user's location or network conditions.
* The endpoint must be HTTPS. This is a security requirement that ensures the integrity and confidentiality of the data exchanged between your app and the server.
Additional Guidelines for MEs

### Best practices for OpenAPI specification

Developers can't require users to enter a parameter for a header or cookie. If headers need to be passed, a default value for the header can be set in the specification. This simplifies the user experience and reduces the risk of errors.
* `oneOf`, `anyOf`, `allOf`, `not ` (swagger.io) aren't supported. These constructs aren't compatible with the Teams platform.
* Constructing arrays for the request aren't supported, but nested objects within a JSON request body are supported. This allows for complex data structures while maintaining compatibility with the Teams platform.
* The request body (if present) can only be application/json. This is a common standard that ensures compatibility with a wide range of APIs.
* Only one required parameter without a default value is allowed. We're only supporting single parameter search right now. This simplifies the user experience and reduces the risk of errors.
* The operation must have an operationId. This is a unique identifier that allows the Teams platform to correctly route and process the operation.
* Only HTTP methods POST and GET are allowed. These are the most commonly used methods for interacting with APIs, and they're supported by the Teams platform.

## See also

[Copilot](copilot-overview.md)
