```markdown
---
title: Microsoft Teams Tabs
author: Surbhigupta
description: Learn how to build tabs as webpages embedded in Microsoft Teams for personal, channel, or group use.
ms.localizationpriority: high
ms.topic: overview
ms.date: 05/04/2023
---

# Build Tabs for Teams

Tabs are client-aware webpages embedded in Microsoft Teams, Outlook, and Microsoft 365. They are simple HTML `<iframe/>` tags that link to domains specified in the app manifest. Tabs can be included in a channel within a team, a group chat, or as a personal app for individual users. You can embed custom tabs within your apps to include web content in Teams or to add Teams-specific functionalities. For details, refer to [Teams JavaScript client library](/javascript/api/overview/msteams-client#microsoft-teams-javascript-client-library).

> [!IMPORTANT]
> Custom tabs are supported in Government Community Cloud (GCC), GCC-High, and Department of Defense (DOD).

## Types of Tabs

There are two types of tabs: **Static** and **Configurable**. Tabs can be used in three scopes:

1. **Personal**
2. **Group Chat**
3. **Teams**

### Static Tabs

- Part of personal apps, designed for a single user.
- Pinned to the left navigation bar for quick access.
- Can be extended to group chats, channels, or meetings.
- Behave more like apps since only one tab per app is pinnable.

### Configurable Tabs

- Ideal for collaborative content in channels and group chats.
- Allow creating spaces around web-based content for teamwork.

## Benefits of Static Tabs

- **Pinnable and Instant**: Easily pin apps with static tabs without mandated configuration dialogs.
- **Unified Functionality**: Create a single tab that works across personal and group scopes.
- **Configurable**: Adjust the default URL by altering the `contentUrl` post-installation.

## Usage Considerations

| &nbsp; | Personal | Channels | Group chat | Meetings |
|---|---|---|---|
|[Static tabs](~/tabs/how-to/create-personal-tab.md)|✔️|✔️|✔️|✔️|
|[Configurable tabs](~/tabs/how-to/create-channel-group-tab.md)|❌|✔️|✔️|✔️|

> [!NOTE]
> If both configurable and static tabs are defined for a scope, Teams defaults to the static tab.

## Scenarios and Use Cases

**Scenario 1: Web-Based Resource Integration**
- *Example:* Present an informational corporate website via a static tab in Teams.

**Scenario 2: Support Page Extensions**
- *Example:* Add **about** and **help** pages as static tabs in your Teams bot.

**Scenario 3: Regularly Accessed Items**
- *Example:* Create tabs with deep links to individual items for collaboration.

## Creating Tabs

- **Custom Tab Declaration:** Defined in the app manifest, where URLs and scopes are specified.
- **Use Adaptive Cards:** To build interactive and responsive tabs.

## Resources and Tools

- **Visual Studio Code:** Use with Teams Toolkit for quick tab development.
- **Teams Toolkit:** Available for both Visual Studio Code and Visual Studio.
- **Tunneling Solutions:** (e.g., Dev Tunnels, NGROK) to facilitate local development.

## Next Steps

- Familiarize with [Prerequisites for using Tabs](~/tabs/how-to/tab-requirements.md).

## Additional Resources

- [Design Your Tab for Microsoft Teams](design/tabs.md)
- [Device Capabilities Overview](../concepts/device-capabilities/device-capabilities-overview.md)
- [Tabs on Mobile Devices](design/tabs-mobile.md#tabs-on-mobile)
- [Mapping App Capabilities to Features](../concepts/design/map-use-cases.md#app-capabilities-mapped-to-features)
- [Implement Analytics for Teams Apps](../concepts/design/overview-analytics.md#instrumenting-for-teams-app-specific-analytics)
- [Extended Tab Permissions with Microsoft Graph](how-to/authentication/tab-sso-graph-api.md)
- [Microsoft Teams Updates](../resources/teams-updates.md)
- [Granting Tab Device Permissions](~/sbs-tab-device-permissions.yml)
```
