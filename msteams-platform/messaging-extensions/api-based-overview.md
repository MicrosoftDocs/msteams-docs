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

Message extensions built using API (API-based) use a web service to manage user requests and responses and don't require a bot registration. You can configure and deploy API-based message extensions using Developer Portal for Teams and Teams Toolkit for Visual Studio Code, command line interface (CLI), or Visual Studio. API-based message extensions help your apps to interact directly with third-party data, apps, and services, enhancing its capabilities. With API-based message extension, you can:

* Retrieve real-time information, such as latest news coverage on a product launch.
* Retrieve knowledge-based information, for example, my team’s design files in Figma.

You can create an API-based message extension using an [OpenAPI Description (OAD)](https://learn.openapis.org/specification/) document. After you've created an OpenAPI Description document, use the OpenAPI Description document to generate and integrate the client code in your app's project. Create or generate a response rendering template to manage the responses from the API.

See the video to learn more about building an API-based message extension using Teams Toolkit:
</br>
</br>

> [!VIDEO https://www.youtube.com/embed/jSYNHz6hz4Y?si=htmfWtlY9bYH_RT2]

## Prerequisites

```yml




Before you get started, ensure that you adhere to the following requirements:

> [!div class="checklist"]
>
> * [OpenAPI Description (OAD)](#openapi-description)
> * [Update app manifest](#update-app-manifest)

### OpenAPI Description

The OpenAPI Description (OAD) is the industry-standard specification that details the structure and outline of OpenAPI files. It's a language-agnostic, human-readable format for describing APIs. Both humans and machines can easily read and write the openAPI Description. The schema is machine-readable and can be represented in either YAML or JSON. An OpenAPI Description document is required before creating an API-driven message extension.

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
