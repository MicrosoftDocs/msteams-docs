---
title: Build Adaptive Cards Tabs
author: KirtiPereira
description: Build tabs using Adaptive Cards
ms.topic: conceptual
ms.author: surbhigupta
---


# Build Adaptive Cards Tabs

Use Adaptive Cards to build tabs with ease. Build your tab with ready-made UI Lego-blocks that look and feel native on desktop, web, and mobile. Adaptive Cards Tabs centralizes all Teams app capabilities around a bot backend, thus, eliminating the need for a different backend for your bot and tabs. This will greatly reduce server and maintenance costs of your Teams app.
This article helps you understand the changes required to be made to the app manifest, how the invoke activity requests and sends information in Adaptive Cards Tabs, and the impact on the task module workflow. It also includes information about authentication.

## Prerequisites

Before you start using Adaptive Cards to build tabs, you must:

* Be familiar with, [bot development](../../bots/what-are-bots.md), [Adaptive Cards](../../task-modules-and-cards/what-are-cards.md#adaptive-cards), and [Task Modules](../../task-modules-and-cards/task-modules/task-modules-bots.md) in Teams.
* Have a bot running in Teams for your development.
* Have a tenant that is enrolled in ring 1.6.

## Changes to app manifest

Personal apps that render tabs must include a `staticTabs` array in their app manifest. Adaptive Cards Tabss are rendered when the `contentBotId` property is provided in the `staticTab` definition. Static tab definitions must contain either a `contentBotId`, specifying an Adaptive Cards Tabs or a `contentUrl`, specifying a typical hosted web content tab experience.

> [!NOTE]
> The `contentBotId` property is currently available in the developer preview manifest schema only. 

Provide the `contentBotId` property with the `botId` the Adaptive Cards Tabs must communicate with. The `entityId` configured for the Adaptive Cards Tabs is sent in the `tabContext` parameter of each invoke request, and can be used to differentiate different Adaptive Cards Tabs that are powered by the same bot. For more information about other static tab definition fields, see [manifest schema](../../resources/schema/manifest-schema.md#statictabs).

Following is a sample Adaptive Cards Tabs manifest:

```json
{
  "$schema": "https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json",
  "manifestVersion": "devPreview",
  "id": "4b0b7c70-d2bc-11ea-a813-bfc190db5187",
  "version": "0.0.1",
  "packageName": "acprototype",
  "developer": {
    "name": "proto",
    "websiteUrl": "https://acprototype.azurewebsites.net",
    "privacyUrl": "https://acprototype.azurewebsites.net/privacy.html",
    "termsOfUseUrl": "https://acprototype.azurewebsites.net/tou.html"
  },
  "name": {
    "short": "Workday",
    "full": "Workday Prototype"
  },
  "description": {
    "short": "TODO: add short description here",
    "full": "TODO: add full description here"
  },
  "icons": {
    "outline": "icon-outline.png",
    "color": "icon-color.png"
  },
  "accentColor": "#D85028",
  "configurableTabs": [],
  "staticTabs": [
    {
      "entityId": "workday",
      "name": "Home",
      "contentBotId": "eda13c8b-ec36-4ef5-a600-999c9531a536",
      "scopes": ["personal"]
    },
    {
      "entityId": "samples",
      "name": "More",
      "contentBotId": "eda13c8b-ec36-4ef5-a600-999c9531a536",
      "scopes": ["personal"]
    }
  ],
  "connectors": [],
  "composeExtensions": [],
  "permissions": ["identity", "messageTeamMembers"],
  "validDomains": [
    "andhillo-relay.servicebus.windows.net",
    "acprototype.azurewebsites.net",
    "token.botframework.com"
  ]
}
```

## Invoke activities

Communication between your Adaptive Cards Tabs and your bot is done through `invoke` activities. Each `invoke` activity has a corresponding **name**. Use the name of each activity to differentiate each request. `tab/fetch` and `tab/submit` are the activities covered in this section.

### Fetch Adaptive Cards to render to a tab

`tab/fetch` is the first invoke request that your bot receives when a user opens an Adaptive Cards Tabs. When your bot receives the request, it will either send a tab **continue** response or a tab **auth** response.
The **continue** response includes an array for **cards**, which is rendered vertically to the tab in the order of the array.

> [!NOTE]
> The **auth** response is explained in detail in the [authentication](#authentication) section.

The following image is an example of the **continue** response, where each card is an Adaptive Card:

:::image type="content" source="../../assets/images/tabs/adaptive-cards-rendered-in-tabs.png" alt-text="Example of Adaptive Cards rendered in tabs." border="false":::

The following code snippets are examples of `tab/fetch` request and response:

**`tab/fetch` request**

```json
// tab/fetch POST request: agents/{botId}/invoke
{
    "name": "tab/fetch",
    "value: {
        "tabContext": {
            "tabEntityId": "{tab_entity_id}"
        },
        "context": {
            "theme": "default"
            }
    },
    "conversation": {
        "id": "tab:hash(tabId_appId_userId)"
    },
    "imdisplayname": "{user_display_name}"
}
```

**`tab/fetch` response**

```json
// tab/fetch **continue** POST response:
{
    "tab": {
        "type": "continue",
        "value": {
            "cards": [
                {
                    "card": adaptiveCard1,
                },
                {
                    "card": adaptiveCard2,
                }
                {
                    "card": adaptiveCard3
                }  
            ]
        },
    },
    "responseType": "tab"
}
```

### Handle submits from Adaptive Cards

After an Adaptive Cards is rendered in the tab, it must be able to respond to user interactions. This response is handled by the `tab\submit` invoke request.

When a user selects a button on the Adaptive Cards Tabs, the `tab/submit` request is triggered to your bot with the corresponding data through the *Action.Submit* function of Adaptive Cards. The Adaptive Cards data is available through the data property of the `tab/submit` request. You will receive either of the following responses to your request:

* A http status code `200` response with no body. An empty 200 response will result in no action taken by the client.
* The standard `200` tab **continue** response, as explained in [Fetch Adaptive Cards](#fetch-adaptive-cards-to-render-to-a-tab) section. A tab **continue** response triggers the client to update the rendered Adaptive Cards Tabs with the Adaptive Cards provided in the cards array of the **continue** response.

The following image is an example of the **continue** response after the *Action.Submit* function is triggered:

:::image type="content" source="../../assets/images/tabs/adaptive-cards-submit-action.png" alt-text="Example of handling submits from Adaptive Cards." border="false":::

The following code snippets are examples of `tab/submit` request and response:

**`tab/submit` request**

```json
// tab/submit POST request: agents/{botId}/invoke:
{
    "name": "tab/submit",
    "value": {
        "data": {
            "type": "tab/submit",
            //...<data properties>
            },
        "context": {
            "theme": "default"
            },
        "tabContext": {
            "tabEntityId": "{tab_entity_id}"
            },
        },
    "conversation": {
           "id": "{static_tab_thread_id?}" 
        },
    "imdisplayname": "{user_display_name}"
}
```

**`tab/submit` response**

```json
//tab/fetch **continue** POST response:
{
    "tab": {
        "type": "continue",
        "value": {
            "cards": [
              {
                "card": adaptiveCard1,
                },
              {
                "card": adaptiveCard2,
                } 
            ]
        },
    },
    "responseType": "tab"
}
```

## Understand task module workflow

The task module also uses Adaptive Cards to invoke `task/fetch` and `task/submit` requests and responses. For more information, see [Using Task Modules in Microsoft Teams bots](../../task-modules-and-cards/task-modules/task-modules-bots.md).

However, with the introduction of Adaptive Cards Tabs there is a change in how the bot responds to a `task/submit` request. If you are using an Adaptive Cards Tabs, the bot responds to the `task/submit` invoke request with the standard tab **continue** response, and closes the task module. The Adaptive Cards Tabs is updated by rendering the new list of cards provided in the tab **continue** response body.

### Invoke `task/fetch`

The following code snippets are examples of `task/fetch` request and response:

**`task/fetch` request**
```json
// task/fetch POST request: agents/{botId}/invoke
{
    "name": "task/fetch",
    "value": {
        "data": {
            "type": "task/fetch"
        },
        "context": {
            "theme": "default",
        },
        "tabContext": {
            "tabEntityId": "{tab_entity_id}"
        }
    },
    "imdisplayname": "{user_display_name}",
    "conversation": {
        "id": "{static_tab_thread_id?}"
    } 
}
```

**`task/fetch` response**

```json
// task/fetch POST response: agents/{botId}/invoke
{
    "task": {
        "value": {
            "title": "Ninja Cat",
            "height": "small",
            "width": "small",
            "card": {
                "contentType": "application/vnd.microsoft.card.adaptive",
                "content": adaptiveCard,
            }
        },
    "type": "continue"
    },
    "responseType": "task"
}
```

### Invoke `task/submit`

The following code snippets are examples of `task/submit` request and response:

**`task/submit` request**

```json
// task/submit POST request: agent/{botId}/invoke:
{
    "name": "task/submit",
    "value": {
        "data": {serialized_data_object},
        "context": {
            "theme": "default"
        },
    "tabContext": {
        "tabEntityId": "{tab_entity_id}"
        },
    },
    "conversation": {
        "id": "{static_tab_thread_id?}"
    },
    "imdisplayname": "{user_display_name}",
}
```

**`task/submit` tab response type**

```json
// tab/fetch **continue** POST response: 
{
    "task":{
        "value": {
            "tab": {
                "type": "continue",
                "value": {
                    "cards": [
                        {
                            "card": adaptiveCard1
                        },
                        {
                            "card": adaptiveCard2
                        }
                    ]
                }
            }
        },
        "type": "continue"
    },
    "responseType": "task"
}
```

## Authentication

In the previous sections of this article, you have seen that most of the development paradigms could be extrapolated from Task Module requests and responses into tab requests and responses. However, when it comes to handling authentication, the workflow for Adaptive Cards Tabs follows the authentication pattern for messaging extensions. For more information, see [add authentication](../../messaging-extensions/how-to/add-authentication.md). 
When a `tab/fetch` request is triggered and receives a tab **auth** response a sign-in page is rendered.  

**To get an authentication code through `tab/fetch` invoke**

1. Open your app. The sign in page appears.

    > [!NOTE]
    > The app logo is provided through the `icon` property defined in the app manifest, and the title appearing after the logo is defined in the `title` property returned in the tab **auth** response body.

1. Select **Sign in**. You are redirected to the authentication URL provided in the `value` property of the **auth** response body. 
1. A pop-up window appears. This pop-up window hosts your web page using the authentication URL.
1. After you sign in, close the window. An *authentication code* is sent to the Teams client.
1. The Teams client then reissues the `tab/fetch` request to your service, which includes the authentication code provided by your hosted web page. 

### `tab/fetch` authentication data flow

The following image provides an overview of how the authentication data flow works for a `tab/fetch` invoke.

:::image type="content" source="../../assets/images/tabs/adaptive-cards-tab-auth-flow.png" alt-text="Example of handling authentication." border="false":::

**`tab/fetch` auth response**

The following code snippet is an example of `tab/fetch` auth response:

```json
// tab/auth POST response (openURL)
{
    "tab": {
        "type": "auth",
        "suggestedActions":{
            "actions":[
                {
                    "type": "openUrl",
                    "value": "https://example.com/auth",
                    "title": "Sign in to this app"
                }
            ]
        }
    }
}
```

### Example

The following image shows a reissued request example:

:::image type="content" source="../../assets/images/tabs/adaptive-cards-tab-reissued-request.png" alt-text="Example of reissued request." border="false":::

## See also

> [!div class="nextstepaction"]
> [Adaptive Cards](../../task-modules-and-cards/what-are-cards.md#adaptive-cards)

