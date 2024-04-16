---
title: Build message extensions using API
author: v-ypalikila
description: Learn how to build a message extension from an OpenAPI description document (OAD) using using Developer Portal for Teams, Visual Studio Code, Teams Toolkit CLI, or Visual Studio.
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
ms.date: 10/19/2023
---

# Build message extensions using API

> [!NOTE]
> API-based message extensions only support search commands.

Message extensions built using API (API-based) use a web service to manage user requests and responses and don't require a bot registration. API-based message extension is a simple and efficient way to communicate with a web service without any complex logic. If users need to access information from your app using search commands in Teams, API-based message extensions are faster to create and easier to mainten than bot-based message extensions. In scenarios where traffic needs to be private, API-based message extensions are the preferred choice as they don't depend on Azure's bot infrastructure. With API-based message extension, you can:

* Retrieve real-time information, such as latest news coverage on a product launch.
* Retrieve knowledge-based information, for example, my team’s design files in Figma.

See the video to learn more about building an API-based message extension using Teams Toolkit:
</br>
</br>

> [!VIDEO https://www.youtube.com/embed/jSYNHz6hz4Y?si=htmfWtlY9bYH_RT2]


An API-based message extension uses the OpenAPI description to define how it interacts with external services. The message extension populates the inputs by taking user input or other data sources and sending them as parameters to the API endpoints defined in the OpenAPI description. The API processes these inputs and returns the response, which the message extension then transforms into an Adaptive Card format to display within Teams. This process allows for a seamless integration of external services into the Teams platform, enhancing the user experience by providing quick access to information and functionalities from within the chat interface.

To create Adaptive Cards based on the API response, the message extension uses a response rendering template, which defines how to format the data into an Adaptive Card layout. This template ensures that the information is presented in a user-friendly and consistent manner across different message extensions and services.

## Prerequisites

Before you get started, ensure that you adhere to the following requirements:

> [!div class="checklist"]
>
> * [OpenAPI Description (OAD)](#openapi-description)
> * [Response rendering template](#response-rendering-template)
> * [Update app manifest](#update-app-manifest)

### OpenAPI Description

The [OpenAPI Description (OAD)](https://learn.openapis.org/specification/) is the industry-standard specification that details the structure and outline of OpenAPI files. It's a language-agnostic, human-readable format for describing APIs. Both humans and machines can easily read and write the openAPI Description. The schema is machine-readable and can be represented in either YAML or JSON. An OpenAPI Description document is required before creating an API-driven message extension.

### Response rendering template

A response rendering template maps JSON responses to a preview card and an Adaptive Card. When a user selects a search result, the preview cards appear as results. The preview card then expands into an Adaptive Card in the message compose box.

Each search command must have a corresponding response rendering template, and each command must correspond to an operation in the OpenAPI Description. However, not every operation defined in an OpenAPI Description must be a command. The response rendering template consists of an Adaptive Card template, preview card template, and metadata and must conform to the Response rendering template schema hosted at [`https://developer.microsoft.com/json-schemas/teams/vDevPreview/MicrosoftTeams.ResponseRenderingTemplate.schema.json`](https://developer.microsoft.com/json-schemas/teams/vDevPreview/MicrosoftTeams.ResponseRenderingTemplate.schema.json).

### Update app manifest

Update app manifest (previously called Teams app manifest) with the `composeExtensions` property. The following code is an example of the app manifest with the `composeExtensions` property:

```json
{
  "composeExtensions": [
    {
      "composeExtensionType": "apiBased",
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
  ]
}
```

## Next step

> [!div class="nextstepaction"]
> [Build API-based message extension](build-api-based-message-extension.md)
