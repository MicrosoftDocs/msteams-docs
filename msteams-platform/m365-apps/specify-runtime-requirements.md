---
title: Specify Microsoft 365 host runtime requirements in your app manifest
description: Specify your app's runtime requirements in the app manifest to provide a deliberate experience on supported Microsoft 365 hosts. 
ms.date: 7/10/2024
ms.author: mosdevdocs
author: erikadoyle
ms.topic: conceptual
ms.localizationpriority: medium
ms.subservice: m365apps
---
# Specify Microsoft 365 host runtime requirements in your app manifest (preview)

> [!NOTE]
>
> The ability to specify Microsoft 365 host runtime requirements in app manifest is currently in [public developer preview](../resources/schema/manifest-schema-dev-preview.md) and supported in Teams and Outlook mobile hosts.

If you have a Teams app that contains a personal tab or message extension, you can easily [extend it to run across additional Microsoft 365 hosts](./overview.md), including Outlook and Microsoft 365 (Office) app across web, desktop, and mobile experiences. When you upgrade your Teams app to use app manifest version 1.13 or higher, your app is available in other Microsoft 365 application hosts by default. However, if your app also includes components that aren't yet supported across other Microsoft 365 hosts, your app might only partially load, resulting in unplanned and unsupported user experiences.

To ensure intentional and deliberate customer experiences with your app, you can specify your app's runtime requirements in the app manifest to tailor its behavior in applicable Microsoft 365 hosts, or omit it from surfacing in contexts that you're not ready to support. Describing your app's runtime requirements in the app manifest also helps ensure your production-ready app experience will reach wider audiences in additional Microsoft 365 host applications in the future.

Specifying your app's runtime requirements is useful in scenarios such as:

- **One-way dependencies**: If your app includes both a tab and message extension, and the tab functions as a settings page for users to configure message extension functionality, you can ensure that your settings tab doesn't load in hosts that don't support your message extension.

- **Mutual dependencies:** When your app has specific app components that must be loaded together in order to function properly, you can ensure your app is *only available* in Microsoft 365 hosts that support all components.  

- **Capability requirements:** When your app has component parts with runtime requirements that aren't supported across all applicable Microsoft 365 hosts, you can ensure those components are *seamlessly omitted* (rather than loaded, yet not functional) from your app experience running in those hosts.

## Microsoft 365 host support

Only a subset of Microsoft 365 host applications supports the ability to specify runtime requirements in the app manifest. This support will expand over time. The following hosts ensure only applicable apps and their applicable components are made available to users:

|Microsoft 365 host application| Web | Desktop | Mobile | Notes|
|---|---|---|---|---|
| Microsoft Teams| ✔️| ✔️| ✔️| |
| Microsoft Outlook| | | ✔️| |

## Specify relationships between components of your app (`elementRelationshipSet`)

You can specify relationships among the individual components of your app by including an [`elementRelationshipSet`](../resources/schema/manifest-schema-dev-preview.md#elementrelationshipset) in your app manifest. Use this object to specify both [one-way dependencies](#one-way-dependencies) and [mutual dependencies](#mutual-dependencies) among app components.

> [!NOTE]
> A given pair of app components can only be grouped once, either by `oneWayDependency` or `mutualDependency`. Similarly, cyclical `oneWayDependencies`—where, for example, components *A* and *B* mutually declare each other as a one-way dependency—aren't allowed and will fail manifest validation.

Only a subset of Teams app capabilities can be specified as runtime requirements in app manifest. This support will expand over time. The following app manifest elements can be specified as having one-way or mutual dependencies:

- Tabs: personal (`staticTabs`) and configurable (`configurableTabs`)
- Message extensions (`composeExtensions`), including individual commands
- Bots (`bots`)

Each app element is denoted by an `id`, which maps to `botId` for bots, `entityId` for static tabs, and `id` for configurable tabs and message extensions.

> [!NOTE]
> This feature introduces `id` properties to `configurableTabs` and `composeExtensions` definitions. Teams and other Microsoft 365 hosts only support apps containing a single configurable tab and/or a single message extension. These ID properties future-proof your app in case host support expands to accommodate multiple instances of these components.
>
> The `id` property must be specified in a `configurableTab` or a `composeExtension` for it to be recognized in an `elementRelationshipSet`.

### One-way dependencies

Use the [`oneWayDependencies`](../resources/schema/manifest-schema-dev-preview.md#elementrelationshipsetonewaydependency) array to describe cases where one component of your app depends upon another component. For each object in the array, specify the dependent component (`element`) and the component it depends on (`dependsOn`). The following JSON snippet shows specific message extension commands that have a one-way dependency on a bot:

```json
    "elementRelationshipSet": {
      "oneWayDependencies" : [
        {
          "element" : {
            "name" : "composeExtensions",
            "id" : "composeExtension-id",
            "commandIds": ["command-1-id", "command-2-id"]
          },
          "dependsOn" : [
              {"name" : "bots", "id" : "bot-id"}
            ]
        }
      ]
    }
```

For message extensions, you can optionally specify individual commands that require support for specific app components. If those components aren't supported in the runtime host, they won't be made available to the user (though all other commands will run).

### Mutual dependencies

Use the [`mutualDependencies`](../resources/schema/manifest-schema-dev-preview.md#elementrelationshipsetmutualdependencies) array to group app components that must load together in order to support their intended function. Each object in the array represents a mutually dependent app component. The following JSON snippet shows a bot, static tab, message extension, and configurable tab that are mutually dependent on each other.

```json
    "elementRelationshipSet": {
      "mutualDependencies" : [
                {"name" : "bots", "id" : "bot-id"}, 
                {"name" : "staticTabs", "id" : "staticTab-id"},
                {"name" : "composeExtensions", "id" : "composeExtension-id"},
                {"name" : "configurableTabs", "id": "configurableTab-id"}
      ]
    },
```

## Specify runtime capability requirements for specific app components (`requirementSet`)

When you're defining an individual app component, you can specify its specific TeamsJS runtime requirements using a [`requirementSet`](../resources/schema/manifest-schema-dev-preview.md#statictabsrequirementset). This ensures that the component only loads in Microsoft 365 hosts with support for the critical TeamsJS capabilities. The following JSON snippet shows a static tab that requires its host to support both HTML dialogs invoked from tabs and HTML dialogs invoked from bots. 

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

Only a subset of TeamsJS capabilities can be specified as runtime requirements for individual components of an app. This support will expand over time. The following TeamsJS capabilities can be specified as runtime requirements for [`staticTabs`](../resources/schema/manifest-schema-dev-preview.md#statictabsrequirementset), [`composeExtensions`](../resources/schema/manifest-schema-dev-preview.md#composeextensionsrequirementset), and [`bots`](../resources/schema/manifest-schema-dev-preview.md#botsrequirementset):

- HTML-based dialogs (`dialog.url`)
- HTML-based dialogs for Bot Framework (`dialog.url.bot`)
- Adaptive Card dialogs (`dialog.adaptiveCard`)
- Adaptive Card dialogs for Bot Framework (`dialog.adaptiveCard.bot`)

## See also

- [Extend Teams apps across Microsoft 365](overview.md)
- [Use TeamsJS to differentiate your app experience](../tabs/how-to/using-teams-client-library.md#differentiate-your-app-experience)