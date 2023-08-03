---
title: Build Adaptive Card Tabs
author: KirtiPereira
description: Learn to build tabs using Adaptive Cards where front end is rendered with Adaptive Cards, the backend is powered by a bot. Explore invoke activities and handle submits. 
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
ms.date: 05/02/2023
---

# Build tabs with Adaptive Cards

> [!WARNING]
> Adaptive Card tabs will be deprecated in the new Microsoft Teams. Apps are expected to be available in the new Microsoft Teams by June 2023. If your app is using Adaptive Card tabs, it's recommended to rebuild the tab as a web-based tab. For more information, see [Build tabs for Teams](../what-are-tabs.md).

When developing a tab using the traditional method, you might run into these issues:

* HTML and CSS considerations
* Slow load times
* iFrame constraints
* Server maintenance and costs

You can build Adaptive Card tabs in Teams. Instead of embedding web content in an iFrame, you can render Adaptive Cards to a tab. While the front end is rendered with Adaptive Cards, the backend is powered by a bot. The bot is responsible for accepting requests and responding appropriately with the Adaptive Card that is rendered.

You can build your tabs with ready-made user interface (UI) building blocks native on desktop, web, and mobile. This article helps you understand the changes required to be made to the app manifest. The article also identifies how the invoke activity requests and sends information in tab with Adaptive Cards, and its effect on the task module workflow.

The following image shows build tabs with Adaptive Cards in desktop and mobile:

:::image type="content" source="../../assets/images/adaptive-cards-rendered-in-tabs.png" alt-text="Example of Adaptive Card rendered in tabs.":::

## Prerequisites

Before you start using Adaptive Cards to build tabs, you must:

* Be familiar with [bot development](../../bots/what-are-bots.md), [Adaptive Cards](https://adaptivecards.io/), and [task modules](../../task-modules-and-cards/task-modules/task-modules-bots.md) in Teams.
* Have a bot running in Teams for your development.

## Changes to app manifest

Personal apps that render tabs must include a `staticTabs` array in their app manifest. Adaptive Card tabs are rendered when the `contentBotId` property is provided in the `staticTab` definition. Static tab definitions must contain either a `contentBotId`, specifying an Adaptive Card tab or a `contentUrl`, specifying a typical hosted web content tab experience.

> [!NOTE]
> The `contentBotId` property is available in manifest version 1.9 or later.

Provide the `contentBotId` property with the `botId` that the Adaptive Card tab must communicate with. The `entityId` configured for the Adaptive Card tab is sent in the `tabContext` parameter of each invoke request, and can be used to differentiate Adaptive Card Tabs that are powered by the same bot. For more information about other static tab definition fields, see [manifest schema](../../resources/schema/manifest-schema.md#statictabs).

Following is a sample Adaptive Card tab manifest:

```json
{
  "$schema": "https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json",
  "manifestVersion": "1.9",
  "id": "00000000-0000-0000-0000-000000000000",
  "version": "0.0.1",
  "developer": {
    "name": "Contoso",
    "websiteUrl": "https://contoso.yourwebsite.com",
    "privacyUrl": "https://contoso.yourwebsite.com/privacy.html",
    "termsOfUseUrl": "https://contoso.yourwebsite.com/terms.html"
  },
  "name": {
    "short": "Contoso",
    "full": "Contoso Home"
  },
  "description": {
    "short": "Add short description here",
    "full": "Add full description here"
  },
  "icons": {
    "outline": "icon-outline.png",
    "color": "icon-color.png"
  },
  "accentColor": "#D85028",
  "configurableTabs": [],
  "staticTabs": [
    {
      "entityId": "homeTab",
      "name": "Home",
      "contentBotId": "00000000-0000-0000-0000-000000000000",
      "scopes": ["personal"]
    },
    {
      "entityId": "moreTab",
      "name": "More",
      "contentBotId": "00000000-0000-0000-0000-000000000000",
      "scopes": ["personal"]
    }
  ],
  "connectors": [],
  "composeExtensions": [],
  "permissions": ["identity", "messageTeamMembers"],
  "validDomains": [
    "contoso.yourwebsite.com",
    "token.botframework.com"
  ]
}
```

## Invoke activities

Communication between your Adaptive Card tab and your bot is done through `invoke` activities. Each `invoke` activity has a corresponding **name**. Use the name of each activity to differentiate each request. `tab/fetch` and `tab/submit` are the activities covered in this section.

> [!NOTE]
>
> * Bots need to send all the responses to [service URL](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference?view=azure-bot-service-4.0#base-uri&preserve-view=true). Service URL is received as part of incoming `activity` payload.
> * The invoke payload size has increased to 80kb.

### Fetch Adaptive Card to render to a tab

`tab/fetch` is the first invoke request that your bot receives when a user opens an Adaptive Card tab. When your bot receives the request, it either sends a tab **continue** response or a tab **auth** response.
The **continue** response includes an array for **cards**, which is rendered vertically to the tab in the order of the array.

> [!NOTE]
> For more information on **auth** response, see [authentication](#authentication).

The following code provides examples of `tab/fetch` request and response:

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
        "id": "{generated_conversation_id}"
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
                },
                {
                    "card": adaptiveCard3
                }  
            ]
        },
    },
    "responseType": "tab"
}
```

### Handle submits from Adaptive Card

After an Adaptive Card is rendered in the tab, it can respond to user interactions. This response is handled by the `tab/submit` invoke request.

When a user selects a button on the Adaptive Card tab, the `tab/submit` request is triggered to your bot with the corresponding data through the `Action.Submit` function of Adaptive Card. The Adaptive Card data is available through the data property of the `tab/submit` request. You receive either of the following responses to your request:

* An HTTP status code `200` response with no body. An empty 200 response results in no action taken by the client.
* The standard `200` tab **continue** response, as explained in [fetch Adaptive Card](#fetch-adaptive-card-to-render-to-a-tab). A tab **continue** response triggers the client to update the rendered Adaptive Card tab with the Adaptive Cards provided in the cards array of the **continue** response.

The following code provides examples of `tab/submit` request and response:

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
           "id": "{generated_conversation_id}" 
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

The task module also uses Adaptive Card to invoke `task/fetch` and `task/submit` requests and responses. For more information, see [using Task Modules in Microsoft Teams bots](../../task-modules-and-cards/task-modules/task-modules-bots.md).

With the introduction of Adaptive Card tab, there's a change in how the bot responds to a `task/submit` request. If you're using an Adaptive Card tab, the bot responds to the `task/submit` invoke request with the standard tab **continue** response, and closes the task module. The Adaptive Card tab is updated by rendering the new list of cards provided in the tab **continue** response body.

### Invoke `task/fetch`

The following code provides examples of `task/fetch` request and response:

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
        "id": "{generated_conversation_id}"
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

The following code provides examples of `task/submit` request and response:

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
        "id": "{generated_conversation_id}"
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

In the previous sections, you've seen that most of the development paradigms can be extended from the task module requests and responses into tab requests and responses. When it comes to handling authentication, the workflow for Adaptive Card tab follows the authentication pattern for message extensions. For more information, see [add authentication](../../messaging-extensions/how-to/add-authentication.md).

`tab/fetch` requests can have either a **continue** or an **auth** response. When a `tab/fetch` request is triggered and receives a tab **auth** response, the sign in page is shown to the user.

**To get an authentication code through `tab/fetch` invoke**

1. Open your app. The sign in page appears.

    > [!NOTE]
    > The app logo is provided through the `icon` property defined in the app manifest. The title appearing after the logo is defined in the `title` property returned in the tab **auth** response body.

1. Select **Sign in**. You're redirected to the authentication URL provided in the `value` property of the **auth** response body.
1. A pop-up window appears. This pop-up window hosts your web page using the authentication URL.
1. After you sign in, close the window. An **authentication code** is sent to the Teams client.
1. The Teams client then reissues the `tab/fetch` request to your service, which includes the authentication code provided by your hosted web page.

### `tab/fetch` authentication data flow

The following image provides an overview of how the authentication data flow works for a `tab/fetch` invoke.

:::image type="content" source="../../assets/images/tabs/adaptive-cards-tab-auth-flow.png" alt-text="Example of Adaptive Card Tab auth flow.":::

**`tab/fetch` auth response**

The following code provides an example of `tab/fetch` auth response:

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

The following code shows a reissued request example:

```json
{
    "name": "tab/fetch",
    "type": "invoke",
    "timestamp": "2021-01-15T00:10:12.253Z",
    "channelId": "msteams",
    "serviceUrl": "https://smba.trafficmanager.net/amer/",
    "from": {
        "id": "{id}",
        "name": "John Smith",
        "aadObjectId": "00000000-0000-0000-0000-000000000000"
    },
    "conversation": {
        "tenantId": "{tenantId}",
        "id": "tab:{guid}"
    },
    "recipients": {
        "id": "28:00000000-0000-0000-0000-000000000000",
        "name": "ContosoApp"
    },
    "entities": [
        {
            "locale": "en-us",
            "country": "US",
            "platform": "Windows",
            "timezone": "America/Los_Angeles",
            "type": "clientInfo"
        }
    ],
    "channelData": {
        "tenant": { "id": "00000000-0000-0000-0000-000000000000" },
        "source": { "name": "message" }
    },
    "value": {
        "tabContext": { "tabEntityId": "homeTab" },
        "state": "0.43195668034524815"
    },
    "locale": "en-US",
    "localTimeZone": "America/Los_Angeles"
}
```

## Code sample

|**Sample name** | **Description** |**.NET** | **Node.js** | **Manifest**|
|----------------|-----------------|--------------|--------------|--------------|
| Show Adaptive Cards in Teams tab | Microsoft Teams tab sample code, which demonstrates how to show Adaptive Cards in Teams. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-adaptive-cards/csharp)| [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-adaptive-cards/nodejs) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-adaptive-cards/csharp/demo-manifest/tab-adaptive-card.zip)|

## Step-by-step guide

Follow the [step-by-step](../../sbs-tab-with-adaptive-cards.yml) guide to build tab with Adaptive Cards.

## Next step

> [!div class="nextstepaction"]
> [Tabs link unfurling and Stage View](~/tabs/tabs-link-unfurling.md)

## See also

* [Build tabs for Teams](../what-are-tabs.md)
* [Tabs on mobile](../design/tabs-mobile.md)
* [Cards](../../task-modules-and-cards/what-are-cards.md)
* [Use task modules in tabs](../../task-modules-and-cards/task-modules/task-modules-tabs.md)
* [Form completion feedback](../../task-modules-and-cards/cards/cards-format.md#form-completion-feedback)
