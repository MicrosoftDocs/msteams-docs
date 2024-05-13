---
title: Build message extensions using Bot Framework
author: v-ypalikila
description: Learn about Bot-based message extension using Bot Framework to interact with your web service from different locations in the Teams client.
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
ms.date: 10/19/2023
---

# Build message extensions using Bot Framework

Message extensions built using Bot Framework (Bot-based) use a web service as a bot. You can use message extensions to enable users to interact with your web service from different locations in the Teams client, such as the compose message area, the command box, or directly from a message and send back structured data, such as cards.

Bot-based message extension takes advantage of the Bot Framework's messaging schema and secure communication protocol. The bot is defined in the app manifest for the Teams app and you can also define different types of commands for your message extension, such as action commands or search commands.

There are two types of message extension commands, action command and search command. The message extension command type defines the UI elements and interaction flows available to your web service. You can use a search command or an action command to interact with your web service through a bot in Teams.

:::image type="content" source="../assets/images/Copilot/bot-based-action-search-command.png" alt-text="Screenshot shows the the way for a developer to select between action commands and search commands.":::

# [Search commands](#tab/search-commands)

Message extension search commands allow users to search external systems and insert the results of that search into a message in the form of a card. This document guides you on how to select search command invoke locations, and add the search command to your app manifest.

> [!NOTE]
> The result card size limit is 28 KB. The card isn't sent if its size exceeds 28 KB.

See the following video to learn how to define message extension search commands:
<br>
> [!VIDEO https://www.microsoft.com/en-us/videoplayer/embed/RE4OIvK]
<br>

The search command in a message extension is configured using the `composeExtensions.commands` property and the `query` type in the app manifest (previously called as Teams app manifest). Command and parameter descriptions enhance the usability and effectiveness of a message extension. A good command description offers a clear and concise summary of the app’s features.

The following code is an example of the `composeExtensions` property defining a search command:

```json
{
 "composeExtensions": [
    {
      "botId": "eccdf132-0900-4d36-936b-dec5e6357f11",
      "commands": [
        {
          "id": "Dev",
          "type": "query",
          "title": "Jedi",
          "description": "May the force be with you",
          "initialRun": true,
          "fetchTask": false,
          "context": [
            "commandBox",
            "compose",
            "message"
          ],
          "parameters": [
            {
              "name": "Luke",
              "title": "Skywalker",
              "description": "Jedi master",
              "inputType": "text"
            }
          ]
        }
      ],
      "canUpdateConfiguration": true
    }
  ],
```

### Parameters

You must add the following parameters to your `composeExtensions.commands` array of objects:

| Property name | Purpose | Required? | Manifest version |
|---|---|---|---|
| `id` | Unique ID that you assign to search command. The user request includes this ID. | Yes | 1.0 |
| `title` |Command name. This value appears in the user interface (UI). | Yes | 1.0 |
| `description` | Help text indicating what this command does. This value appears in the UI. | Yes | 1.0 |
|`semanticDescription`|Semantic description of the command for consumption by the large language model.|No|1.17|
| `type` | Type of command. Default is `query`. | No | 1.4 |
|`initialRun` | If this property is set to **true**, it indicates this command should be executed as soon as the user selects this command in the UI. | No | 1.0 |
| `context` | Optional array of values that defines the context the search action is available in. The possible values are `message`, `compose`, or `commandBox`. The default is `compose`,`commandBox`. | No | 1.5 |

You must add the following search parameter details that define the text visible to your user in the Teams client:

| Property name | Purpose | Is required? | Minimum manifest version |
|---|---|---|---|
| `parameters` | Defines a static list of parameters for the command. | No | 1.0 |
| `parameter.name` | Describes the name of the parameter. The `parameter.name` is sent to your service in the user request. | Yes | 1.0 |
| `parameter.description` | Describes the parameter’s purposes or example of the value that must be provided. This value appears in the UI. | Yes | 1.0 |
|`parameter.semanticDescription`|Semantic description of the parameter for consumption by the large language model.|No|1.17|
| `parameter.title` | Short user-friendly parameter title or label. | Yes | 1.0 |
| `parameter.inputType` | Set to the type of the input required. Possible values include `text`, `textarea`, `number`, `date`, `time`, `toggle`. Default is set to `text`. | No | 1.4 |
| `parameters.value` | Initial value for the parameter. Currently the value isn't supported | No | 1.5 |

For more information, see [app manifest schema](~/resources/schema/manifest-schema.md).

## Next step

> [!div class="nextstepaction"]
> [Define message extension search command](how-to/search-commands/define-search-command.md)

# [Action commands](#tab/action-commands)

> [!NOTE]
> When a message action is initiated, attachment details aren't sent as part of the `turncontext` invoke activity.

Action commands allow you to present your users with a modal pop-up called a task module in Teams. The task module collects or displays information, processes the interaction, and sends the information back to Teams. This document guides you on how to select action command invoke locations, create your task module, send final message, or card, create action command using app studio, or create it manually.

The action command in a message extension is configured using the `composeExtensions.commands` property and `action` type in the app manifest.

The following code is an example of the `composeExtensions` property defining an action command:

```json
"composeExtensions": [
        {
            "botId": "xxxxxx-xxx-bot-ID-xxxxxxxx}",
            "commands": [
                {
                    "id": "createCard",
                    "context": [
                        "compose",
                        "message",
                        "commandBox"
                    ],
                    "description": "Command to run action to create a Card from Compose Box",
                    "title": "Create Card",
                    "type": "action",
                    "parameters": [
                        {
                            "name": "title",
                            "title": "Card title",
                            "description": "Title for the card",
                            "inputType": "text"
                        },
                        {
                            "name": "subTitle",
                            "title": "Subtitle",
                            "description": "Subtitle for the card",
                            "inputType": "text"
                        },
                        {
                            "name": "text",
                            "title": "Text",
                            "description": "Text for the card",
                            "inputType": "textarea"
                        }
                    ]
                }
            ]
        }
    ]
```

### Parameters

You must add the following parameters to your `composeExtensions.commands` array of objects:

| Property name | Purpose | Required? | Manifest version |
|---|---|---|---|
| `id` | Unique ID that you assign to this command. The user request includes this ID. | Yes | 1.0 |
| `title` | Command name. This value appears in the UI. | Yes | 1.0 |
| `type` | Message extension type. Default is `action`. | No | 1.4 |
| `fetchTask` | Set to `true` for an Adaptive Card or embedded web view for your task module, and`false` for a static list of parameters or when loading the web view by a `taskInfo`. | No | 1.4 |
| `context` | Optional array of values that defines where the message extension is invoked from. The possible values are `message`, `compose`, or `commandBox`. The default value is `["compose", "commandBox"]`. | No | 1.5 |

If you're using a static list of parameters, you must also add the following parameters:

| Property name | Purpose | Is required? | Minimum manifest version |
|---|---|---|---|
| `parameters` | Describes the static list of parameters for the command. Only use when `fetchTask` is `false`. | No | 1.0 |
| `parameter.name` | Describes the name of the parameter. This is sent to your service in the user request. | Yes | 1.0 |
| `parameter.description` | Describes the parameter’s purposes or example of the value that should be provided. This value appears in the UI. | Yes | 1.0 |
| `parameter.title` | Short user-friendly parameter title or label. | Yes | 1.0 |
| `parameter.inputType` | Set to the type of input required. The possible values include `text`, `textarea`, `number`, `date`, `time`, `toggle`. The default value is set to `text`. | No | 1.4 |

If you're using an embedded web view, you can optionally add the `taskInfo` object to fetch your web view without calling your bot directly. If you select this option, the behavior is similar to that of using a static list of parameters. In that the first interaction with your bot is [responding to the task module submit action](~/messaging-extensions/how-to/action-commands/respond-to-task-module-submit.md). If you're using a `taskInfo` object, you must set the `fetchTask` parameter to `false`.

| Property name | Purpose | Is required? | Minimum manifest version |
|---|---|---|---|
|`taskInfo`|Specify the task module to preload when using a message extension command. | No | 1.4 |
|`taskInfo.title`|Initial task module title. |No | 1.4 |
|`taskInfo.width`|Task module width, either a number in pixels or default layout such as `large`, `medium`, or `small`. |No | 1.4 |
|`taskInfo.height`|Task module height, either a number in pixels or default layout such as `large`, `medium`, or `small`.|No | 1.4 |
|`taskInfo.url`|Initial web view URL.|No | 1.4 |

For more information, see [app manifest schema](~/resources/schema/manifest-schema.md).  

## Next step

> [!div class="nextstepaction"]
> [Define message extension action commands](how-to/action-commands/define-action-command.md)

---

## Best practices to extend message extension to Copilot

If you have Search message extension v1.13 or higher and have enabled the M365 channel, your application will work in Copilot in Teams. To enable your message extensions as a plugin in Microsoft Copilot, we recommed you to implement the following best practices:

* **Upgrade TeamsJS Version**: Upgrade your TeamsJS version to 2.18.0 by installing the `@microsoft/teams-js` package from npm. This will ensure that your application continues to work with Bing domains.

* **Update Microsoft Entra ID app registration for SSO**: Microsoft Entra ID single sign-on (SSO) for message extensions works the same way in Bing as it does in Teams or Outlook. However, you need to add Bing’s client application identifiers to your bot's Azure AD app registration in your tenant's App registrations portal. To do this, follow these steps:

   1. Sign in to the Azure portal with your sandbox tenant account.
   1. Open App registrations.
   1. Select the name of your application to open its app registration.
   1. Select Expose an API (under Manage).
   1. In the Authorized client applications section, ensure that the following Client ID values are listed:

    | Microsoft 365 client application | Client ID |
    | --- | --- |
    | Bing | 9ea1ad79-fdb6-4f9a-8bc3-2b70f96e34c7 |
    | Bing (Staging) | ef47e344-4bff-4e28-87da-6551a21ffbe0 |
    |Teams desktop and mobile|	1fec8e78-bce4-4aaf-ab1b-5451cc387264|
    |Teams web	| 5e3ce6c0-2b1f-4285-8d4b-75ee78787346|
    |Microsoft 365 web |	4765445b-32c6-49b0-83e6-1d93765276ca|
    |Microsoft 365 desktop	| 0ec893e0-5785-4de6-99da-4ed124e5296c|
    |Microsoft 365 mobile	| d3590ed6-52b3-4102-aeff-aad2292ab01c |
    |Outlook desktop	| d3590ed6-52b3-4102-aeff-aad2292ab01c |
    | Outlook Web Access	| bc59ab01-8403-45c6-8796-ac3ef710b3e3 |
    |Outlook mobile	| 27922004-5251-4030-b22d-91ecd9a37ea4 |

* **Configure Content Security Policy Headers**: If your app uses Content Security Policy (CSP) headers, make sure to allow the following frame-ancestors in your CSP headers:

   | Microsoft 365 app host | frame-ancestor permission |
   | --- | --- |
   | Bing | edgeservices.bing.com, <www.bing.com>, <www.staging-bing-int.com>, copilot.microsoft.com |

* Validate that network connectivity to your application endpoints is available.

* Configure [app setup policies](/microsoftteams/teams-app-setup-policies#assign-a-custom-policy-in-app-setup-policy-to-users-and-groups) to allow custom apps upload. *[Optional]*.

* Create a [Teams app package](../concepts/build-and-test/apps-package.md), which consists  an app manifest and app icons.

* Upload the app package for a single developer or for the tenant.

* If your're publishing the app to the tenant, configure an [app permissions policy](/microsoftteams/teams-app-permission-policies) to limit access to specific users.

* Validate that the app works as expected across Micrososft 365 apps such as Teams, Outlook, office.com, mobile, and Microsoft Copilot for Microsoft 365 in Teams and copilot.microsoft.com.

* Complete organization’s formal publishing process for production.

## See also

* [Universal Actions for search based message extensions](how-to/search-commands/universal-actions-for-search-based-message-extensions.md)
* [API-based message extension](api-based-overview.md)
