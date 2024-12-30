```markdown
---
title: Microsoft Teams Tabs
author: Surbhi Gupta
description: Learn to build tabs, webpages embedded in Microsoft Teams. Create a content page as part of personal, channel, or group tab.
ms.localizationpriority: high
ms.topic: overview
ms.date: 05/04/2023
---

# Build Tabs for Teams

Tabs are client-aware webpages embedded in Microsoft Teams, Outlook, and Microsoft 365. They're simple HTML `<iframe/>` tags pointing to domains declared in the app manifest. Tabs can be added inside a team, group chat, or personal app for an individual user.

**Key Uses:**
- Embed your web content in Teams
- Add Teams-specific features to your content

For more information, see the [Teams JavaScript client library](/javascript/api/overview/msteams-client#microsoft-teams-javascript-client-library).

> [!IMPORTANT]
> Custom tabs are available in Government Community Cloud (GCC), GCC-High, and Department of Defense (DOD).

## Types of Tabs

1. **Static Tabs**
2. **Configurable Tabs**

### Scopes

Tabs can be utilized in three scopes:
- `personal`
- `groupchat`
- `teams`

For personal (static) tabs, explore [this link](~/tabs/how-to/create-personal-tab.md) to understand static tabs, and learn about [extension](~/tabs/how-to/create-personal-tab.md#extend-static-tabs-to-group-chat-channels-and-meetings).

Tabs act like apps, allowing for one tab per app at a time. Example: YouTube tab in a meeting.

### Static Tabs Features

- **Pinnable & Instant Access**: Easily pin apps with static tabs.
- **Unified Experience**: One static tab works across various scopes.
- **Optional Configuration**: Change default URL using `contentUrl` in Teams.

### Configurable Tabs

Deliver content to channels and group chats, creating collaborative spaces around web content.

### Use Cases

| &nbsp; | Personal | Channels | Group Chat | Meetings |
|---|---|---|---|
| [Static Tabs](~/tabs/how-to/create-personal-tab.md) | ✔️ | ✔️ | ✔️ | ✔️ |
| [Configurable Tabs](~/tabs/how-to/create-channel-group-tab.md) | ❌ | ✔️ | ✔️ | ✔️ |

> [!NOTE]
> If both a configurable tab and static tab are defined, Teams defaults to the static tab.

Create a [content page](~/tabs/how-to/create-tab-pages/content-page.md) or a [configuration page](~/tabs/how-to/create-tab-pages/configuration-page.md) for personal, channel, or group chat tabs. Ensure your tab is compatible with both Android and iOS by [testing](~/tabs/design/tabs-mobile.md). Utilize locale and theme information as needed.

> [!NOTE]
> **Posts** and **Files** can't be moved from their set positions.

## Tab Features

- Bot integration within apps
- Awareness of Microsoft Entra ID
- Locale awareness (`en-us`)
- Single Sign-On (SSO) when supported
- Deep linking with bots or app notifications
- Modal dialog opening from links within a tab
- SharePoint web parts reuse

## Real-world Scenarios

**Scenario:** Incorporate a corporate website as a tab in Teams.
**Example:** A static tab displays company information directly in Teams.

**Scenario:** Add support pages to a Teams bot.
**Example:** Static tabs provide access to **about** and **help** sections for users.

**Scenario:** Simplify access for collaboration needs.
**Example:** Create a channel tab to deep-link content items like work items.

## How Tabs Work

### Create Tabs

1. **Declare a Custom Tab**: Specify a URL and scope in your app manifest.
2. **Use Adaptive Cards**: Build tabs using [Adaptive Cards](~/tabs/how-to/build-adaptive-card-tabs.md).

### Declare Custom Tab in the App Manifest

Set URLs and scopes for each tab. Add the [Teams JavaScript client library](/javascript/api/overview/msteams-client). Use `<iframe>` HTML for content pages. 

For staticTabs, configure the `contentUrl` in the [app manifest](../resources/schema/manifest-schema.md#statictabs).

> [!NOTE]
> Use sandboxed iframes, avoiding native plugins.

For configurable channels or group tabs, allow users to set parameters, tailoring content URLs for their needs using `configurationUrl` in `configurableTabs`.

Static tabs offer a fast way to integrate content across Teams, using `contentUrl` pinned to chats, channels, and meetings. Consider [migrating configurable tabs](~/tabs/how-to/create-channel-group-tab.md#migrate-your-configurable-tab-to-static-tab).

Multiple channels or group tabs, and up to 16 static tabs per app are supported.

## Tools to Build Tabs

- [Teams Toolkit for Visual Studio Code](../toolkit/teams-toolkit-fundamentals.md)
- [Teams Toolkit for Visual Studio](../toolkit/visual-studio-overview.md)

## Next Step

> [!div class="nextstepaction"]
> [Prerequisites](~/tabs/how-to/tab-requirements.md)

## See Also

- [Designing Teams Tabs](design/tabs.md)
- [Device Capabilities](../concepts/device-capabilities/device-capabilities-overview.md)
- [Mobile Tabs](design/tabs-mobile.md#tabs-on-mobile)
- [Feature Mapping](../concepts/design/map-use-cases.md#app-capabilities-mapped-to-features)
- [Analytics for Teams Apps](../concepts/design/overview-analytics.md#instrumenting-for-teams-app-specific-analytics)
- [Microsoft Graph Permissions](how-to/authentication/tab-sso-graph-api.md)
- [Microsoft Teams Updates](../resources/teams-updates.md)
- [Granting Device Permissions](~/sbs-tab-device-permissions.yml)
```