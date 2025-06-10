---
title: Specify App Runtime Requirements
description: Specify app runtime requirements, such as one-way or mutual dependencies and capabilities, to tailor user experience in different Microsoft 365 hosts.
ms.date: 1/21/2025
ms.author: mosdevdocs
author: erikadoyle
ms.topic: conceptual
ms.localizationpriority: medium
ms.subservice: m365apps
---
# Specify Microsoft 365 host runtime requirements in app manifest

When you upgrade your Microsoft Teams personal tab or message extension app to use app manifest version 1.13 or later, it's available in other Microsoft 365 application hosts by default. However, if your app also includes capabilities not yet supported in certain hosts, your app might only partially load, resulting in unplanned user experiences.

For example, consider an app that is defined with app manifest schema version 1.17 and includes a bot and a configuration tab that represents the bot's settings. The app would load in Outlook and Microsoft 365 (Office) app, but only surface the bot configuration tab to the user without the bot itself.

To ensure that high-quality app experiences reach your intended user base, specify your app's runtime requirements in app manifest. This allows you to tailor its behavior in applicable Microsoft 365 hosts, or omit it from surfacing in contexts you're not ready to support.

Specifying your app's runtime requirements is useful in scenarios such as:

- **One-way dependencies**: When the sole purpose of one app capability is to support another capability in your app, you can ensure it only surfaces if the primary app capability is loaded. For example, if your app includes both a tab and message extension, and the tab functions as a settings page for users to configure message extension functionality, you can specify that the settings tab doesn't load in hosts that don't support your message extension.

- **Mutual dependencies:** When your app has specific app capabilities that must be loaded together to function properly, you can ensure your app is *only available* in Microsoft 365 hosts that support all capabilities. For example, if tab, bot, and message extension capabilities all work together to support a core user scenario in your app, you can specify that those capabilities are always loaded together, or not at all.

- **Capability requirements:** When your app has capabilities with runtime requirements that aren't supported across specific Microsoft 365 hosts, you can ensure those capabilities are *seamlessly omitted* (rather than loaded, but not functional) from your app experience running in those hosts. For example, if your app includes a tab-based dashboard view of items that can each be opened as a dialog, and each dialog contains information that is then submitted to a bot, you can specify that bot-based dialogs are core capabilities required for your app to load in a given host.

## Microsoft 365 host support

The following Microsoft 365 host applications support the ability to specify runtime requirements in app manifest:

|Microsoft 365 host application| Web | Desktop | Mobile |
|---|---|---|---|
| Teams| ✔️| ✔️| ✔️|
| Outlook| ✔️| ✔️ (New Outlook only)| ✔️|
| Microsoft 365 (Office)| | | |
| Microsoft 365 Copilot | | | |

[!INCLUDE [m365-app-rename](~/includes/m365-app-rename.md)]

## Specify relationships between app capabilities (`elementRelationshipSet`)

You can specify relationships among the individual capabilities of your app by including an `elementRelationshipSet` in your app manifest. Use this object to specify both [one-way dependencies](#one-way-dependencies) and [mutual dependencies](#mutual-dependencies) among app capabilities.

The following app manifest capabilities can be specified as having one-way or mutual dependencies:

- Tabs: personal (`staticTabs`) and configurable (`configurableTabs`)
- Message extensions (`composeExtensions`), including individual commands
- Bots (`bots`)

Each app capability is defined by the newly introduced property, `id`, which maps to `botId` for bots, `entityId` for static tabs, and `id` for configurable tabs and message extensions. Teams and other Microsoft 365 hosts support apps that contain either a single configurable tab, a single message extension, or both. The `id` property future-proofs your app if host support expands to accommodate multiple instances of these capabilities.

> [!IMPORTANT]
> Ensure the relationships you create adhere to the following validation rules:
>
> 1. Elements specified under `elementRelationshipSet` must have definitions in app manifest. For example, an `element` or `commandId` listed in the `dependsOn` section of a `oneWayDependencies` object that doesn't have a corresponding definition in app manifest (with a matching `id` value) results in a manifest validation error. The `id` property must be specified in a `configurableTab` or a `composeExtension` to be recognized in an `elementRelationshipSet`.
> 1. A given set of capabilities can only be grouped by a `mutualDependency` or `oneWayDependency`, but not both. For example, specifying both a one-way dependency (*A* depends on *B*) and a mutual dependency (*A* and *B* depend on each other) results in a manifest validation error, because the *A depends on B* relationship is represented twice.
> 1. Cyclical one-way dependencies aren't permitted. For example, specifying both an *A depends on B* relationship and a *B depends on A* relationship results in a manifest validation error.

### One-way dependencies

Use the `oneWayDependencies` array to describe cases where one component of your app depends upon another component. For each object in the array, specify the dependent component (`element`) and the component it depends on (`dependsOn`). You can also specify individual commands that require support for specific app capabilities. If those capabilities aren't supported in the runtime host, they aren't made available to the user (though all other commands run).

 The following JSON snippet shows specific message extension commands that have a one-way dependency on a bot:

```json
    "elementRelationshipSet": {
      "oneWayDependencies" : [
        {
          "element" : {
            "name" : "composeExtensions",
            "id" : "composeExtension-id",
            "commandIds": ["exampleCmd1", "exampleCmd2"]
          },
          "dependsOn" : [
              {"name" : "bots", "id" : "bot-id"}
            ]
        }
      ]
    }
```

### Mutual dependencies

Use the `mutualDependencies` array to group app capabilities that must load together to support their intended function. Each object in the array represents a set of mutually dependent app capabilities. The following JSON snippet shows a bot, static tab, message extension, and configurable tab that are mutually dependent on each other:

```json
    "elementRelationshipSet": {
      "mutualDependencies" : [
        [
                {"name" : "bots", "id" : "bot-id"}, 
                {"name" : "staticTabs", "id" : "staticTab-id"},
                {"name" : "composeExtensions", "id" : "composeExtension-id"},
                {"name" : "configurableTabs", "id": "configurableTab-id"}
        ]
      ]
    },
```

## Specify runtime requirements for specific app capabilities (`requirementSet`)

Within individual app capability definitions, you can specify specific TeamsJS runtime requirements using a [`requirementSet`](../resources/schema/manifest-schema-dev-preview.md#statictabsrequirementset). This ensures that the app capability only loads in Microsoft 365 hosts with support for the critical TeamsJS capabilities.

The following TeamsJS capabilities can be specified as runtime requirements for [`staticTabs`](../resources/schema/manifest-schema-dev-preview.md#statictabsrequirementset), [`composeExtensions`](../resources/schema/manifest-schema-dev-preview.md#composeextensionsrequirementset), and [`bots`](../resources/schema/manifest-schema-dev-preview.md#botsrequirementset):

- HTML-based dialogs ([`dialog.url`](/javascript/api/@microsoft/teams-js/dialog.url))
- HTML-based dialogs for Bot Framework ([`dialog.url.bot`](/javascript/api/@microsoft/teams-js/dialog.url.bot))
- Adaptive Card dialogs ([`dialog.adaptiveCard`](/javascript/api/@microsoft/teams-js/dialog.adaptivecard))
- Adaptive Card dialogs for Bot Framework ([`dialog.adaptiveCard.bot`](/javascript/api/@microsoft/teams-js/dialog.adaptivecard.bot))

The following JSON snippet shows a static tab that requires its host to support HTML dialogs (referred to as task modules in TeamsJS v1.x) invoked from tabs and bots:

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

## Code samples

| Sample name | Description | JavaScript |
|----------------|-----------------|--------------|
| Requirements targeting: One-way dependency | This sample app illustrates how to specify one-way dependency relationships between app capabilities in Microsoft Teams using the "elementRelationshipSet" property and functionality requirements with "hostMustSupportFunctionalities". | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/requirement-targeting-oneway-dependency/nodejs) |
| Requirements targeting: Mutual dependency | This sample Node.js app showcases how to specify mutual-dependency relationships between app capabilities in Microsoft Teams using the 'elementRelationshipSet' property in the app manifest. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/requirement-targeting-mutual-dependency/nodejs)

## See also

- [Developer preview app manifest schema](../resources/schema/manifest-schema-dev-preview.md)
- [Extend Teams apps across Microsoft 365](overview.md)
- [Build dialogs](/microsoftteams/platform/task-modules-and-cards/what-are-task-modules)
- [Use TeamsJS to differentiate your app experience](../tabs/how-to/using-teams-client-library.md#differentiate-your-app-experience)
