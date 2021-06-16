---
title: Build Adaptive Card Tabs
author: KirtiPereira
description: Build tabs using Adaptive Cards
ms.topic: conceptual
ms.author: surbhigupta
---

# Build tabs with Adaptive Cards

> [!IMPORTANT]
> * This feature is in [Public Developer Preview](~/resources/dev-preview/developer-preview-intro.md) and is supported in desktop and mobile. Support in the web browser is coming soon.
> * Tabs with Adaptive Cards are currently only supported as personal apps.

When developing a tab using the traditional method, you must consider these issues, such as HTML and Cascading Style Sheets (CSS) considerations, slow load times, iFrame constraints, and server maintenance and costs. Adaptive Card tabs is a new way to build tabs in Teams. Instead of embedding web content in an IFrame, you can render Adaptive Card to a tab. While the front-end is rendered as Adaptive Card, the backend is powered by a bot. The bot is responsible for accepting requests and responding appropriately with the Adaptive Card that is rendered.

Use Adaptive Cards to build tabs with ease. You can build your tabs with ready-made user interface (UI) Lego-blocks that look and feel native on desktop, web, and mobile. Building tabs with Adaptive Cards centralizes all Teams app capabilities around a bot backend and Adaptive Card frontend. This eliminates the need for a different backend for your bot and tabs. It greatly reduces server and maintenance costs of your Teams app. This article helps you understand the changes required to be made to the app manifest, how the invoke activity requests and sends information in tab with Adaptive Cards, and the impact on the task module workflow.

The following image depicts build tabs with Adaptive Cards in desktop and mobile:

:::image type="content" source="../../assets/images/tabs/adaptive-cards-rendered-in-tabs.jpg" alt-text="Example of Adaptive Card rendered in tabs." border="false":::

## Prerequisites

Before you start using Adaptive Cards to build tabs, you must:

* Be familiar with, [bot development](../../bots/what-are-bots.md), [Adaptive Cards](../../task-modules-and-cards/what-are-cards.md#adaptive-cards), and [task modules](../../task-modules-and-cards/task-modules/task-modules-bots.md) in Teams.
* Have a bot running in Teams for your development.
* Be in [Public Developer Preview](~/resources/dev-preview/developer-preview-intro.md).

## Changes to app manifest

Personal apps that render tabs must include a `staticTabs` array in their app manifest. Adaptive Card tabs are rendered when the `contentBotId` property is provided in the `staticTab` definition. Static tab definitions must contain either a `contentBotId`, specifying an Adaptive Card tab or a `contentUrl`, specifying a typical hosted web content tab experience.

> [!NOTE]
> The `contentBotId` property is currently available in manifest version 1.9 or later.

Provide the `contentBotId` property with the `botId` that the Adaptive Card tab must communicate with. The `entityId` configured for the Adaptive Card tab is sent in the `tabContext` parameter of each invoke request, and can be used to differentiate Adaptive Card Tabs that are powered by the same bot. For more information about other static tab definition fields, see [manifest schema](../../resources/schema/manifest-schema.md#statictabs).

Following is a sample Adaptive Card tab manifest:

```json
{
  "$schema": "https://raw.githubusercontent.com/OfficeDev/microsoft-teams-app-schema/preview/DevPreview/MicrosoftTeams.schema.json",
  "manifestVersion": "1.9",
  "id": "00000000-0000-0000-0000-000000000000",
  "version": "0.0.1",
  "packageName": "acprototype",
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

### Handle submits from Adaptive Card

After an Adaptive Card is rendered in the tab, it must be able to respond to user interactions. This response is handled by the `tab/submit` invoke request.

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

With the introduction of Adaptive Card tab, there is a change in how the bot responds to a `task/submit` request. If you are using an Adaptive Card tab, the bot responds to the `task/submit` invoke request with the standard tab **continue** response, and closes the task module. The Adaptive Card tab is updated by rendering the new list of cards provided in the tab **continue** response body.

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

The following code provide examples of `task/submit` request and response:

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

In the previous sections of this article, you have seen that most of the development paradigms can be extended from the task module requests and responses into tab requests and responses. When it comes to handling authentication, the workflow for Adaptive Card tab follows the authentication pattern for messaging extensions. For more information, see [add authentication](../../messaging-extensions/how-to/add-authentication.md).

`tab/fetch` requests can have either a **continue** or an **auth** response. When a `tab/fetch` request is triggered and receives a tab **auth** response, the sign-in page is shown to the user.

**To get an authentication code through `tab/fetch` invoke**

1. Open your app. The sign in page appears.

    > [!NOTE]
    > The app logo is provided through the `icon` property defined in the app manifest. The title appearing after the logo is defined in the `title` property returned in the tab **auth** response body.

1. Select **Sign in**. You are redirected to the authentication URL provided in the `value` property of the **auth** response body.
1. A pop-up window appears. This pop-up window hosts your web page using the authentication URL.
1. After you sign in, close the window. An **authentication code** is sent to the Teams client.
1. The Teams client then reissues the `tab/fetch` request to your service, which includes the authentication code provided by your hosted web page.

### `tab/fetch` authentication data flow

The following image provides an overview of how the authentication data flow works for a `tab/fetch` invoke.

:::image type="content" source="../../assets/images/tabs/adaptive-cards-tab-auth-flow.png" alt-text="Example of Adaptive Card Tab auth flow." border="false":::

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

## See also

* [Adaptive Card](../../task-modules-and-cards/what-are-cards.md#adaptive-cards)
* [Teams tabs](~/tabs/what-are-tabs.md)
* [Prerequisites](~/tabs/how-to/tab-requirements.md)
* [Create a personal tab](~/tabs/how-to/create-personal-tab.md)
* [Create a channel or group tab](~/tabs/how-to/create-channel-group-tab.md)
* [Create a content page](~/tabs/how-to/create-tab-pages/content-page.md)
* [Create a configuration page](~/tabs/how-to/create-tab-pages/configuration-page.md)
* [Create a removal page for your tab](~/tabs/how-to/create-tab-pages/removal-page.md)
* [Tabs on mobile](~/tabs/design/tabs-mobile.md)
* [Get context for your tab](~/tabs/how-to/access-teams-context.md)
* [Create conversational tabs](~/tabs/how-to/conversational-tabs.md)
* [Tab margin changes](~/resources/removing-tab-margins.md)

## Next step

> [!div class="nextstepaction"]
> [Tabs link unfurling and Stage View](~/tabs/tabs-link-unfurling.md)