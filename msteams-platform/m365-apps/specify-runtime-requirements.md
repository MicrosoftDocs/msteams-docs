---
title: Specify Microsoft 365 host runtime requirements in your app manifest
description: Specify your app's runtime requirements in the app manifest to provide a deliberate experience on supported Microsoft 365 hosts. 
ms.date: 6/21/2024
ms.author: mosdevdocs
author: erikadoyle
ms.topic: conceptual
ms.localizationpriority: medium
ms.subservice: m365apps
---
# Specify Microsoft 365 host runtime requirements in your app manifest (preview)

TODO: Crosslinking to applicable reference and conceptual articles, more visually appealing formatting.

> [!NOTE]
>
> The ability to specify Microsoft 365 host runtime requirements in the app manifest is currently in [public developer preview](../resources/schema/manifest-schema-dev-preview.md) and supported in Teams and Outlook mobile hosts.

If you have a Teams app that contains a personal tab or message extension, you can easily [extend it to run across additional Microsoft 365 hosts](./overview.md), including Outlook and Microsoft 365 (Office) app across web, desktop, and mobile experiences. When you upgrade your Teams app to use app manifest version 1.13 or higher, your app is available in other Microsoft 365 application hosts by default. However, if your app also includes components that aren't yet supported across other Microsoft 365 hosts, your app might only partially load, resulting in unplanned and unsupported user experiences.

To ensure intentional and deliberate customer experiences with your app, you can specify your app's runtime requirements in the app manifest to tailor its behavior in applicable Microsoft 365 hosts, or omit it from surfacing in contexts that you're not ready to support. Describing your app's runtime requirements in the app manifest also helps ensure your production-ready app experience will reach wider audiences in additional Microsoft 365 host applications in the future.

Specifying your app's runtime requirements is useful in scenarios such as:


- **One-way dependencies**: If your app includes a message extension component with an action command that requires bot-sent Adaptive Card functionality, you can ensure that particular command isn't available in message extension hosts that don't support bots, such as Outlook.

- **Mutual dependencies:** When your app has specific app components that must be loaded together in order to function properly, you can ensure your app is *only available* in Microsoft 365 hosts that support all components.  

- **Capability requirements:** When your app has component parts with runtime requirements that aren't supported across all applicable Microsoft 365 hosts, you can ensure those components are *seamlessly omitted* (rather than loaded, yet not functional) from your app experience running in those hosts.

## Microsoft 365 host support

Currently, a subset of Microsoft 365 host applications support the ability to specify runtime requirements in the app manifest. This support will expand over time. The following hosts will ensure only applicable apps and their applicable components are made available to end-users:

|Microsoft 365 host application| Web | Desktop | Mobile | Notes|
|---|---|---|---|---|
| Microsoft Teams| ✔️| ✔️| ✔️| |
| Microsoft Outlook| | | ✔️| |

## Specify relationships between components of your app (`elementRelationshipSet`)

You can specify relationships among the individual components of your app by including a `elementRelationshipSet` in your app manifest. Use this object to specify both [one-way dependencies](#one-way-dependencies) and [mutual dependencies](#mutual-dependencies) among app components.

Currently, a subset of Teams app elements can be specified as runtime requirements in the app manifest. This support will expand over time. The following app manifest elements can be specified as having one-way or mutual dependencies:

- Personal tabs (`staticTabs`)
- Message extensions (`composeExtensions`), including individual commands
- Bots (`bots`)
- Configurable tabs (`configurableTabs`)

Each app element is denoted by an `id`, which maps to `botId` for bots, `entityId` for staticTabs, `id` for configurableTabs, and `id` for composeExtensions.

> [!NOTE]
> This feature introduces `id` properties to configurableTabs and composeExtensions definitions. Currently, Teams and other Microsoft 365 hosts only support apps containing a single configurableTab and/or single composeExtension. These ID properties were added to future-proof your app in case host support expands to accommodate multiple instances of these components.
>
> The `id` property must be specified on a configurableTab or composeExtension for it to be recognized in an `elementRelationshipSet`.

### One-way dependencies

Use the `oneWayDependencies` array to describe cases where one component of your app depends upon another component. For each object in the array, specify the dependent component (`element`) and the component it depends on (`dependsOn`). For example:

```json
    "elementRelationshipSet": {
      "oneWayDependencies" : [
        {
          "element" : {
            "name" : "composeExtensions",
            "id" : "composeExtension-id",
            "commandIds": ["command-1-id", "command-2-id"]  // Developers can add more commands.
          },
          "dependsOn" : [
              {"name" : "bots", "id" : "bot-id"}
            ]
        }
      ]
    }
```

For message extensions, you can optionally specify individual commands that require support for specific app components. If those components aren't supported in the runtime host, they will not be made available to the end-user (though all other commands will run).

### Mutual dependencies

Use the `mutualDependencies` array to group app components that must load together in order to support their intended function. Each object in the array represents a mutually dependent app component. For example:

```json
    "elementRelationshipSet": {
      "mutualDependencies" : [
                {"name" : "bots", "id" : "bot-id"}, 
                {"name" : "staticTabs", "id" : "static-Tab-id"},
                {"name" : "composeExtensions", "id" : "composeExtension-id"},
      ]
    },
```

## Specify runtime capability requirements for specific app components (`requirementSet`)

When you're defining an individual app component, you can specify it's specific TeamsJS runtime requirements using a `requirementSet`. This will ensure the component only loads in Microsoft 365 hosts with support for the critical TeamsJS capabilities. For example:

```json
    "staticTabs": [
        {
            "entityId": "idForPage",
            "name": "Display name of tab",
            "contentUrl": "https://contoso.com/content?host=msteams",
            "contentBotId": "Specifies to the app that tab is an Adaptive Card Tab. You can either provide the contentBotId or contentUrl.",
            "websiteUrl": "https://contoso.com/content",
            "scopes": [
                "personal"
            ],
            "requirementSet": {
                "hostMustSupportFunctionalities": [
                  {"name": "dialogUrl"},
                  {"name": "dialogUrlBot"}
                ]
            }
        }
    ],
```

Currently, a subset of TeamsJS capabilities can be specified as runtime requirements for individual components of an app. This support will expand over time. The following TeamsJS capabilities can be specified as runtime requirements for `staticTabs`, `composeExtensions`, and `bots`:

- HTML-based dialogs (`dialog.url`)
- HTML-based dialogs for Bot Framework (`dialog.url.bot`)
- Adaptive Card dialogs (`dialog.adaptiveCard`)
- Adaptive Card dialogs for Bot Framework (`dialog.adaptiveCard.bot`)

## Frequently Asked Questions

- Q: What will be the behavior of the app in the host if all the elements of the app require some sort of element or runtime support from the host, but the host can’t meet any of the app’s requirements?
  A: The app will not be available on the host in this case. This is already true today. In-product store will not display apps with zero compatible elements to the host.

- Q: What is the relationship these new manifest properties to the Outlook Add-ins 'requirements' property in the `extensions` section of the manifest?
  A: for now, the two are independent, but this design is parallel and might converge in the future

- Q: How can I target specific host applications?
  A: You can't, and this is by design. Best practice is to target runtime requirements in a host-agnostic way so your app is flexible as possible and take advantage of reach of future hosts. Check the latest host support in [TeamsJS support across Microsoft 365](teamsjs-support-m365.md).

## See also

- [Extend Teams apps across Microsoft 365](overview.md)
- [Use TeamsJS to differentiate your app experience](../tabs/how-to/using-teams-client-library.md#differentiate-your-app-experience)