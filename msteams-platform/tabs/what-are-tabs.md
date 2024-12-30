```markdown
---
title: Microsoft Teams Tabs
author: surbhigupta
description: Learn to build tabs, webpages embedded in Microsoft Teams as a content page in personal, channel, or group tab.
ms.localizationpriority: high
ms.topic: overview
ms.date: 05/04/2023
---

## Build Tabs for Teams

Tabs are client-aware webpages embedded in Microsoft Teams, Outlook, and Microsoft 365. They use simple HTML `<iframe/>` tags that point to domains declared in the app manifest. Tabs can be added as part of a channel inside a team, group chat, or personal app for individual users. You can include custom tabs with your app for embedding web content in Teams or adding Teams-specific functionality to your web content. For more details, see [Teams JavaScript client library](/javascript/api/overview/msteams-client#microsoft-teams-javascript-client-library).

> [!IMPORTANT]
> Custom tabs are available in Government Community Cloud (GCC), GCC-High, and Department of Defense (DOD).

## Types of Tabs

There are two types of tabs:

- **Static Tabs**
- **Configurable Tabs**

These tabs can be utilized in three distinct scopes: `personal`, `groupchat`, and `teams`.

### Personal (Static) Tabs

Personal tabs, together with personal-scoped bots, are part of personal apps scoped to a single user and pinned to the left navigation bar for easy access. Personal tabs work the same way in the personal scope. You can now [extend static tabs](~/tabs/how-to/create-personal-tab.md#extend-static-tabs-to-group-chat-channels-and-meetings) to group chats, channels, or meetings with a [customizable experience.](~/tabs/how-to/create-personal-tab.md#customizing-your-static-tab-in-chats-or-meetings)

### Tabs in Chats, Channels, or Meetings

Tabs in these environments behave more like apps, as only one tab per app can be pinned. For example, you can only pin a single YouTube app tab in a meeting. Static tabs in meetings can also be prepinned by IT Admins.

## Use Cases and Scenarios

### Scenarios

- **Bringing an existing web-based resource inside Teams.**
  - Example: Create a static tab in your Teams app to present an informational corporate website to users.
  
- **Adding support pages to a Teams bot or messaging extension.**
  - Example: Create static tabs providing **about** and **help** webpage content to users.
  
- **Providing access to items for collaborative dialogue and cooperation.**
  - Example: Create a channel or group tab with deep linking to individual items.

### Benefits of Static Tabs

- **Pinnable and Instant:** Pin apps with static tabs from the **+** icon in chats, channels, and meetings. These tabs can be unpinned and don't require mandatory configuration dialogs, enabling tab functionality similar to apps.
- **Unified Experience:** Create one static tab that works in both personal and group scopes like chat, channel, and meeting tabs.
- **Optional Configuration:** Change the default URL in your tab instance by modifying the `contentUrl` property of your app after pinning in Teams.

## How to Create Tabs

### Declare Custom Tab in App Manifest

Create a custom tab by declaring it in your app package's app manifest. For each webpage you want in your app as a tab, define a URL and a scope. You can also add the [Teams JavaScript client library](/javascript/api/overview/msteams-client) to your page and call `microsoftTeams.initialize()` after your page loads. This enables Teams-specific information access. 

#### Static Tabs

Set the content URL directly in your Teams [app manifest](../resources/schema/manifest-schema.md#statictabs) by the `contentUrl` property in the `staticTabs` array. The content is the same for all users.

#### Configurable Tabs

For channel or group tabs, create a configuration page allowing you to alter content page URLs using URL query string parameters for appropriate context. This configuration helps tailor the experience. 

> [!NOTE]
> Configurable tabs allow additional user configuration upon adding or setting up the tab. 

### Tools to Build Tabs

- [Teams Toolkit for Visual Studio Code](../toolkit/teams-toolkit-fundamentals.md)
- [Teams Toolkit for Visual Studio](../toolkit/visual-studio-overview.md)

## Next Steps

> [!div class="nextstepaction"]
> [Explore Prerequisites](~/tabs/how-to/tab-requirements.md)

## Further Reading

- [Design Your Tab for Microsoft Teams](design/tabs.md)
- [Explore Device Capabilities](../concepts/device-capabilities/device-capabilities-overview.md)
- [Tabs on Mobile Devices](design/tabs-mobile.md#tabs-on-mobile)
- [Map Use Cases to App Features](../concepts/design/map-use-cases.md#app-capabilities-mapped-to-features)
- [Instrumenting for Teams App-Specific Analytics](../concepts/design/overview-analytics.md#instrumenting-for-teams-app-specific-analytics)
- [Extend Tab App with Microsoft Graph Permissions and Scopes](how-to/authentication/tab-sso-graph-api.md)
- [Microsoft Teams Updates](../resources/teams-updates.md)
- [Grant Tab Device Permission in Teams](~/sbs-tab-device-permissions.yml)
```