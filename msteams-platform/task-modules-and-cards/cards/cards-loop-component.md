---
title: Adaptive Card loop component
description: In this module, learn and build Adaptive Card loop components.
ms.localizationpriority: high
ms.topic: reference
ms.date: 08/16/2023
---

# Adaptive Card loop component

Loop component is an evolution of Fluid component - a way to collaborate with a team through loop whether it’s in chat, email, meeting, or Loop page. Loop component stays in sync no matter how many places the content lives across Microsoft 365 apps.

Adaptive Card-based Loop component allows Microsoft 365 developers to build Loop experiences while building upon their existing message extension-based Microsoft 365 integrations. With AC-based Loop components, users are empowered to bring live business data into chats and email messages, and complete workflows without switching apps. For developers, components adhere to Microsoft 365 platform's 'build once, works everywhere' philosophy, which ensures that your Loop component will automatically work seamlessly across Teams and Outlook, and in every additional host app enabled, including the new Loop app.

> [!NOTE]
> Adaptive Card-based Loop components are available in public preview.

## Get started

There are a few pre-requisites needed before building an Adaptive Card-based Loop component:

1.[Build a Message Extension with a Search command and Link unfurling](~/messaging-extensions/what-are-messaging-extensions.md).

1. Add [link unfurling](~/messaging-extensions/how-to/link-unfurling.md) support to the Message Extension

1. Use [Universal Actions for Adaptive Cards](~/task-modules-and-cards/cards/Universal-actions-for-adaptive-cards/Work-with-Universal-Actions-for-Adaptive-Cards.md)

1. [Extend your Teams message across Microsoft 365](../../m365-apps/extend-m365-teams-message-extension.md)

## Build Loop components

Once you have met all the requirements, you can now upgrade the Adaptive Card into a Loop component that is rich, actionable, and portable across Microsoft 365 applications. There are two steps to building a Loop component based Adaptive Card:

1. Ensure the Adaptive Card adheres to the [Loop component design guidelines](design-loop-components.md) to build an actionable and coherent Adaptive Card based experience for your end users.
1. Enable Loop component by including the URL that uniquely identifies the card in the [metadata.webUrl](https://adaptivecards.io/explorer/Metadata.html) field of your Adaptive Card payload. This is required to support portability via the Copy button present in the Loop header.

### Adaptive Card based Loop component

Loop components are interactive units that sync across Microsoft 365 apps such as Teams and Outlook. Loop components in Teams chat offer a new way to ideate, create, share, and collaborate content across Microsoft 365, and complete tasks in the flow of work. Send a component such as a table, task list, or paragraph in a chat where everyone can see the latest information and edit in real time. Ant updates made to the loop component are in sync across Microsoft 365 where the loop component is shared. For more information, see [Loop components](https://support.microsoft.com/office/first-things-to-know-about-loop-components-ee2a584b-5785-4dd6-8a2d-956131a29c81).

Adaptive Card based Loop component has actionable content and enables users to make quick updates without switching context. Any changes made in the Adaptive Card based Loop component are synced across Teams where the Adaptive Card is shared.

> [!NOTE]
> Adaptive Card based Loop component is available from Adaptive Card version 1.6.

Following is an example of an Adaptive Card based loop component:

:::image type="content" source="~/assets/images/adaptive-cards/adaptive-card-loop.png" alt-text="Example of an Adaptive Card loop component.":::

To enable an Adaptive Card based Loop component, add the `metadata` and `webUrl` properties to the [Adaptive Card schema](https://adaptivecards.io/explorer/). Following table describes the `metadata` and `webUrl` properties:

|Property|Type|Description|Required|
|---|---|---|---|
| [`metadata`](https://adaptivecards.io/explorer/) | Metadata | Defines various metadata properties typically not used for rendering the card | No |
| [`webUrl`](https://adaptivecards.io/explorer/Metadata.html) | String | URL that uniquely identifies the card and serves as a browser fallback that can be used by some hosts.|No|

The following code shows an example of an Adaptive Card based Loop component with `metadata` and `webUrl` properties:

```json
{
  "type": "AdaptiveCard",
  "version": "1.6",
  "metadata": {
    "webUrl": "https://jarvisacloopsbot.azurewebsites.net/refreshCard"
  },
  "body": [
    {
      "size": "large",
      "text": "Overflow Action Test Card",
      "weight": "bolder",
      "type": "TextBlock"
    },
    {
      "text": "ActionSet **all secondary actions**",
      "type": "TextBlock"
    },
    {
      "actions": [
        {
          "data": {
            "key": "Submit from overflow menu"
          },
          "title": "Action Submit",
          "mode": "secondary",
          "type": "Action.Submit"
        },
        {
          "url": "https://github.com/Microsoft/AdaptiveCards",
          "title": "OpenUrl",
          "iconUrl": "https://us-prod.asyncgw.teams.microsoft.com/urlp/v1/url/content?url=https://toppng.com/uploads/preview/mario-mushroom-free-png-image-super-mario-mushroom-11562945955cv6up3e91x.png",
          "mode": "secondary",
          "type": "Action.OpenUrl"
        },
        {
          "card": {
            "type": "AdaptiveCard",
            "body": [
              {
                "text": "What do you think?",
                "type": "TextBlock"
              }
            ],
            "actions": [
              {
                "title": "Neat!",
                "type": "Action.Submit"
              }
            ]
          },
          "title": "Action.ShowCard",
          "mode": "secondary",
          "type": "Action.ShowCard"
        }
      ],
      "type": "ActionSet"
    },
    {
      "text": "ActionSet **primary + secondary actions**",
      "type": "TextBlock"
    },
    {
      "actions": [
        {
          "data": {
            "key": "View"
          },
          "title": "View",
          "type": "Action.Submit"
        },
        {
          "data": {
            "key": "Edit"
          },
          "title": "Edit",
          "mode": "secondary",
          "type": "Action.Submit"
        },
        {
          "data": {
            "key": "Delete"
          },
          "title": "Delete",
          "mode": "secondary",
          "type": "Action.Submit"
        }
      ],
      "type": "ActionSet"
    },
    {
      "text": "Check actions.length > maxActions",
      "type": "TextBlock"
    },
    {
      "actions": [
        {
          "title": "Action 1",
          "type": "Action.Submit"
        },
        {
          "title": "Action 2",
          "type": "Action.Submit"
        },
        {
          "title": "Action 3",
          "type": "Action.Submit"
        },
        {
          "title": "Action 4",
          "type": "Action.Submit"
        },
        ...
      ],
      "type": "ActionSet"
    },
    {
      "text": "========= I am bottom line of body =========",
      "type": "TextBlock"
    }
  ],
  "actions": [
    {
      "url": "https://adaptivecards.io",
      "title": "OpenUrl 1",
      "type": "Action.OpenUrl"
    },
    {
      "data": {
        "key": "Submit from overflow menu"
      },
      "title": "Action Submit",
      "mode": "secondary",
      "type": "Action.Submit"
    },
    {
      "url": "https://github.com/Microsoft/AdaptiveCards",
      "title": "OpenUrl",
      "iconUrl": "https://us-prod.asyncgw.teams.microsoft.com/urlp/v1/url/content?url=https://toppng.com/uploads/preview/mario-mushroom-free-png-image-super-mario-mushroom-11562945955cv6up3e91x.png",
      "mode": "secondary",
      "type": "Action.OpenUrl"
    },
    {
      "card": {
        "type": "AdaptiveCard",
        "body": [
          {
            "text": "What do you think?",
            "type": "TextBlock"
          }
        ],
        "actions": [
          {
            "title": "Neat!",
            "type": "Action.Submit"
          }
        ]
      },
      "title": "Action.ShowCard",
      "mode": "secondary",
      "type": "Action.ShowCard"
    }
  ],
  "refresh": {
    "action": {
      "verb": "refreshCard",
      "title": "See Latest",
      "type": "Action.Execute"
    }
  }
}
```

## Test your Loop component

### Setup your dev environment to test in Teams

To configure, distribute, and manage your application use the Developer Portal for Teams. More detailed instructions on registering your application can be found at [Manage your apps with the Developer Portal](../../concepts/build-and-test/teams-developer-portal.md). The Developer Portal provides options for testing and debugging your app:

- On the **Overview page**, you can see a snapshot of whether your app's configurations validate against Teams store
  test cases.
- The **Preview in Teams** button lets you launch your app quickly in the Teams client for debugging.

:::image type="content" source="images/developer-portal-overview.png" alt-text="A screenshot of the Developer Portal overview page with the Preview in Teams button highlighted":::

### Set up your dev environment to test in Outlook

To turn on the Adaptive Card based Loop component in Outlook.com:

1. Follow the steps on [Teams App Camp (microsoft.github.io)](https://microsoft.github.io/app-camp/) to create a search-based ME.
1. Create a Microsoft 365 dev tenant following [these steps](https://developer.microsoft.com/en-us/microsoft-365/dev-program) or sign in with your test tenant credentials.
1. In the admin center of your test tenant, [enable Targeted Release for everyone](../microsoft-365/admin/manage/release-options-in-office-365.md).
1. Send an email from the tenant admin account to the help alias: <acloops-preview-help@microsoft.com>. Microsoft will verify the admin user and enable support for Loop components for this tenant.

   > [!NOTE]
   > For any help in building Adaptive Card-based Loop components reach out to <acloops-preview-help@microsoft.com>.

1. The Adaptive Card generated by your app now should be rendered as a Loop component

## See also

[Loop component developer user experience guidelines](design-loop-components.md)
