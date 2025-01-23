---
title: Microsoft Teams tabs
author: surbhigupta
description: Learn to build tabs, webpages embedded in Microsoft Teams. Create a content page as part of personal, channel, or group tab.
ms.localizationpriority: high
ms.topic: overview
ms.date: 05/04/2023
---

## Build Tabs for Teams

Tabs are client-aware webpages embedded in Microsoft Teams, Outlook, and Microsoft 365. These are simple HTML `<iframe/>` tags pointing to domains declared in the app manifest. Tabs can be added to channels inside a team, group chats, or as personal apps for individual users. 

- **Usage**: Embed your own web content in Teams or add Teams-specific functionalities to your web content.
- **Availability**: Custom tabs are available in Government Community Cloud (GCC), GCC-High, and Department of Defense (DOD).

### Types of Tabs

1. **Static Tabs**: Part of personal apps scoped to a single user, pinned to the left navigation bar.
2. **Configurable Tabs**: Deliver content to channels and group chats, creating collaborative spaces around web-based content.

You can use tabs in the following scopes:
- Personal
- Groupchart
- Teams

For detailed information on extending static tabs, visit [extend static tabs](~/tabs/how-to/create-personal-tab.md#extend-static-tabs-to-group-chat-channels-and-meetings).

### Tab Characteristics in Teams

- **Personal Tabs**: These tabs in personal scope remain unchanged but now support extension to group chats, channels, and meetings for a customizable experience.
- **Channel and Group Tabs**: Behave like apps; only one tab can be pinned per app (e.g., a single YouTube tab in a meeting).
- **Meeting Tabs**: Static tabs in meetings can be pre-pinned by IT Admins.

---

## Benefits of Using Static Tabs

- **Pinnable and Instant**: Can be pinned from the add a tab **+** icon in chats, channels, and meetings. They allow creating tabs that function like apps without mandatory configuration dialogs.
  
- **Unified Experience**: Static tabs work across personal, group, channel, and meeting scopes.

- **Optional Configuration**: Default URL can be changed after it's pinned by altering the `contentUrl` property.

Consult [migrate your configurable tab to static tab](~/tabs/how-to/create-channel-group-tab.md#migrate-your-configurable-tab-to-static-tab) for guidance.

### Best Fit Table for App Scope

| Scope                 | Personal | Channels | Group Chat | Meetings |
|-----------------------|----------|----------|------------|----------|
| Static Tabs           | ✔️       | ✔️       | ✔️         | ✔️       |
| Configurable Tabs     | ❌       | ✔️       | ✔️         | ✔️       |

### Key Features of Tabs

- Awareness of Microsoft Entra ID, locale, and theme of the current user.
- Supports Single Sign-On (SSO) if available.
- Integration with bots or app notifications for deep linking.
- Capability to open a modal dialog from links within a tab.

---

## Use Case Scenarios

- **Bringing Web Resources to Teams**: Create a static tab that presents a corporate website.
  
- **Adding Support to Bots or Extensions**: Provide static tabs with about and help content.

- **Collaborative Access**: Enable deep linking to individual items, fostering cooperative dialogue and collaboration.

### Example Implementation

To create a custom tab, define it in the app manifest. Specify a URL and a scope for each webpage tab. Employ the [Teams JavaScript client library](/javascript/api/overview/msteams-client) and call `microsoftTeams.initialize()` to access Teams-specific information.

### Build Tools

- [Teams Toolkit for Visual Studio Code](../toolkit/teams-toolkit-fundamentals.md)
- [Teams Toolkit for Visual Studio](../toolkit/toolkit-v4/teams-toolkit-fundamentals-vs.md)

## Next Steps

Check the [prerequisites](~/tabs/how-to/tab-requirements.md) to get started with your tab development.

## See Also

- [Design your tab for Microsoft Teams](design/tabs.md)
- [Tabs on mobile](design/tabs-mobile.md#tabs-on-mobile)
- [Extend tab app with Microsoft Graph permissions and scopes](how-to/authentication/tab-sso-graph-api.md)
- [Microsoft Teams update](../resources/teams-updates.md)
- [Grant tab device permission in Teams](~/sbs-tab-device-permissions.yml)