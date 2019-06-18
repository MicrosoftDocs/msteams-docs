---
title: What are custom tabs in Microsoft Teams?
author: laujan
description: An overview of custom tabs on the Microsoft Teams platform
ms.topic: overview
ms.author: v-laujan
ms.topic: overview
---
# What are custom tabs in Microsoft Teams?

Custom tabs enable you to embed web-based content directly into Teams in a single page format. You can build your own tab or expand your existing app's UI experience. An app can have one group/channel tab and up to sixteen personal tabs.

## Tabs Scope

Conversations, content, and collaboration objectives are essential considerations in your tab design. There are two tab schema available in Teams - group/channel (configurable) and personal (static). Both group/channel and personal tabs require a [content page](/msteams-platform/_old/concepts/tabs/tabs-content.md). In addition, the group/channel tab also requires a [configuration page](/msteams-platform/_old/concepts/tabs/tabs-configuration.md). A tab's capabilities are based on scope which maps to your intended users:

|Tab Scope|Tab User|Tab Type| Tab Functionality |
| --- | ---| --- | --- |
|"personal"|individual|personal|static only|
|"groupchat"|group| group/channel|configurable only|
|"teams"|channel| group/channel|configurable only|

## Tabs user scenarios

I am building a sales tracking app for a midsize company' Microsoft Teams application . The company operates in four regional areas comprised of multiple sales teams. I want to add tabs to support individuals, groups, and channels. \
\
**Scenario:** personal \
**Example:** I need to build tabs for individual users to create personal to-do lists, track  personal sales goals, record hours worked, track expenses, and view the daily cafeteria menu.

**Scenario:** group chat \
**Example:** I need a tab for all members of travelling sales teams to select their current location and view that region's sales trends and goals.

**Scenario:** team \
**Example:** I need to create a tab with current and vital company information that can be configured to support a multilingual employee base.

## How are tabs added to a Teams app package?

All Teams development (custom tabs, connectors, extensions, or bots) needs to be bundled in a [Teams app package](/msteams-platform/_old/concepts/apps/apps-package.md) for distribution either in the Teams App Store or within a team. A custom tab is declared directly in the manifest of your app package. Your app can have a maximum of one (1) group/channel tab and up to sixteen (16) personal tabs.

**Your app manifest must conform to the [Manifest schema for Microsoft Teams](/msteams-platform/_old/resources/schema/manifest-schema.md) and will include the following required keys:**

1. "schema"
1. "manifestVersion"
1. "id"
1. "packageName"
1. "developer" ("name", "websiteURL","privacyURL","termsOfUseURL")
1. "name" ("short", "full")
1. "description" ("short", "full")
1. "icons" ("outline", "color")
1. "accentColor"

In addition to the basic template, you declare the group/channel tab schema in the configurableTabs section and the personal tab schema in the staticTabs section of your app manifest with the following key/value pairs:

```json
"configurableTabs": [
    {
      "configurationUrl": "[The https://URL to use when configuring your tab.]",
      "canUpdateConfiguration": "A boolean value indicating whether an instance of your tab's configuration can be updated by the user after creation. Default: "true"]",
      "scopes": [ "team", "groupchat" ]
    }
  ],
```

```json
  "staticTabs": [
    {
      "entityId": "[Required. A unique identifier for the entity that your tab displays]",
      "name": "Display name of tab",
      "contentUrl": "https://contoso.com/content?host=msteams",
      "websiteUrl": "https://contoso.com/content",
      "scopes": [ "personal" ]
    }
  ],
}
```

## Get Started

Ready to get started building custom tabs? Here are a few guidelines:

- [Requirements for tab pages in Microsoft Teams](/msteams-platform/_old/concepts/tabs/tabs-requirements.md)

- [Content and conversations, all at once using tabs](/msteams-platform/_old/resources/design/framework/tabs.md)

- [QuickStart create custom tabs with node.js](/msteams-platform/tabs/quickstarts/create-custom-tabs-with-node-js.md)

- [QuickStart create custom tabs with c-sharp](quickstart/foo.md)

## Learn more

Learn more about how tabs function with other Teams app capabilities:

- [Combine bots with tabs](/msteams-platform/_old/concepts/bots/bots-with-tabs.md)

- [Design a great Microsoft Teams app - Designing a great tab](/msteams-platform/_old/get-started/design.md)

- foo.md
