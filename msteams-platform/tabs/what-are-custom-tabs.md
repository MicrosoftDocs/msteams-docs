---
title: What are custom tabs in Microsoft Teams?
author: laujan
description: An overview of custom tabs on the Microsoft Teams platform
ms.topic: overview
ms.author: v-laujan
ms.topic: overview
---
# What are custom tabs in Microsoft Teams?

Custom tabs enable you to embed web-based content directly into Teams. You can build your own tab or expand your existing app's UI experience.

There are two tabs schema available in Teams - group/channel(configurable) and personal(static). A group/channel tab delivers dynamic content to group chats and channels and requires both a [content page](https://docs.microsoft.com/microsoftteams/platform/concepts/tabs/tabs-content) and a [configuration page](https://docs.microsoft.com/microsoftteams/platform/concepts/tabs/tabs-configuration). A personal tab delivers static content to individuals and requires only a [content page](https://docs.microsoft.com/microsoftteams/platform/concepts/tabs/tabs-content).

## Tabs Scope

Conversations, content, and collaboration objectives are essential considerations in your tabs design. Your tab's capabilities are based on scope which maps to your intended users:

|Tab Scope|Tab User|Tab Type| Tab Functionality |
| --- | ---| --- | --- |
|"personal"|individual|personal|static only|
|"groupchat"|group| group/channel|configurable only|
|"teams"|channel| group/channel|configurable only|

## Tabs user scenarios

I am building a sales tracking app and I want to add tabs to support individuals, groups, and channels. \
\
**Scenario:** personal \
**Example:** I need a tab for individual users to list personal goals and strategies without having to share them with the entire team.

**Scenario:** group chat \
**Example:** I need a tab for members of traveling sales groups to select their current location and view regional sales trends and goals.

**Scenario:** team \
**Example:** I need a tab for team members to select the company's daily, weekly, monthly or quarterly sales metrics in a comparison view.

## How are tabs added to a Teams app package?

All Teams development (custom tabs, connectors, extensions, or bots) needs to be bundled in a [Teams app package](https://docs.microsoft.com/microsoftteams/platform/concepts/apps/apps-package)  for distribution either in the Teams App Store or within a team. A custom tab is declared directly in the manifest of your app package. Your app can have a maximum of one (1) group/channel tab and up to sixteen (16) personal tabs.

**Your app manifest must conform to the [Manifest schema for Microsoft Teams](https://docs.microsoft.com/en-us/microsoftteams/platform/resources/schema/manifest-schema) and will include the following template:**

```json
{
  "$schema": "[Optional, but specifying the schema at the beginning of your manifest enables IntelliSense or similar support from your code editor.]",
  "manifestVersion": "[Required. The current version of the manifest schema your app manifest is using.]",
  "version": "[Required. The version of your app]",
  "packageName": "[Required. A unique identifier for the your app in reverse domain notation.]",
  "developer": {
    "name": "[Required. Your display name.]",
    "websiteUrl": "[Required. The https:// URL to your website.]",
    "privacyUrl": "[Required. The https:// URL to your privacy policy.]",
    "termsOfUseUrl": "[Required. The https:// URL to your terms of use.]",
    "mpnId": "[Optional.  ]"
  },
  "name": {
    "short": "[Required. The short display name for your app. It must be <=30 characters]",
    "full": "[Required if the full name of your app exceeds 30 characters.]"
  },
  "description": {
    "short": "[Required. A short description of your app to users. ]",
    "full": "[Required. The full description of your app to provide additional useful information to users.]"
  },
  "icons": {
    "outline": "[Required. A relative path to a transparent 32X32 PNG outline icon.]",
    "color": "[Required. A relative path to a full-color 192X192 PNG icon.]"
  },
  "accentColor": "[Required. A valid HTML color code for use with and as a background for your outline icons.]",
```

***In addition to the basic template, you declare the group/channel tab schema in the configurableTabs section and the personal tab schema in the staticTabs section of your manifest with the following name/value pairs:**

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

Ready to get started building? Here are a few guidelines:

- [Content and conversations, all at once using tabs](https://docs.microsoft.com/microsoftteams/platform/resources/design/framework/tabs)

- [QuickStart/staticTabs/foo.md](https://quickstart/statictabs)
- [QuickStart/configurableTabs/foo.md](https://quickstart/configurabletabs)


## Learn more

Learn more about how tabs function with other Teams app capabilities:

- [Combine bots with tabs](https://docs.microsoft.com/microsoftteams/platform/concepts/bots/bots-with-tabs)

- [Design a great Microsoft Teams app - Designing a great tab](https://docs.microsoft.com/en-us/microsoftteams/platform/get-started/design#designing-a-great-tab)

- foo.md
