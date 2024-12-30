```markdown
---
title: Microsoft Teams tabs
author: surbhigupta
description: Learn to build tabs, webpages embedded in Microsoft Teams. Create a content page as part of personal, channel, or group tab.
ms.localizationpriority: high
ms.topic: overview
ms.date: 05/04/2023
---

## Build Tabs for Teams

Tabs are client-aware webpages embedded in Microsoft Teams, Outlook, and Microsoft 365. They are simple HTML `<iframe/>` tags pointing to domains declared in the app manifest. Tabs can be part of a channel inside a team, group chat, or personal app for an individual user. You can include custom tabs to embed your web content in Teams or add Teams-specific functionality to your web content.

> [!IMPORTANT]
> Custom tabs are available in Government Community Cloud (GCC), GCC-High, and Department of Defense (DOD).

### Types of Tabs

There are two types of tabs:

1. **Static Tabs**
2. **Configurable Tabs**

These tabs can be used in three distinct scopes: `personal`, `groupchat`, and `teams`.

- **Personal (Static) Tabs**: Scoped to a single user and pinned to the left navigation bar for easy access.
- **Channel or Group (Configurable) Tabs**: Deliver content to channels and group chats, creating collaborative spaces around web-based content.

### Benefits of Static Tabs

- **Pinnable and Instant**: Pin apps with static tabs in chats, channels, and meetings. No mandatory configuration dialog is required.
- **Unified Experience**: Create one static tab that works in personal and group scopes.
- **Optional Configuration**: Change the default URL in your tab instance using the `contentUrl` property after it's pinned in Teams.

### Scopes and Use Cases

- **Personal**: Single user, tasks, and personal bots.
- **Channels**: Team collaboration, project management.
- **Group Chat**: Informal team interactions, quick collaboration.
- **Meetings**: Agenda management, collaborative decision making.

### Features

- Awareness of Microsoft Entra ID of the current user.
- Locale and theme adaptability.
- Single Sign-On (SSO) support.
- Integrated bots or app notifications.
- Reusability of SharePoint web parts.
- Opens modal dialogs from links within the tab.

## Scenarios and Use Cases

**Scenario 1: Embed Existing Web Resource in Teams**
- **Example**: Create a static tab that presents a corporate website.

**Scenario 2: Add Support Pages**
- **Example**: Create static tabs for "about" and "help" pages in a Teams bot.

**Scenario 3: Enable Collaboration on Common Items**
- **Example**: Build a channel or group tab that allows deep linking to shared items.

## Building Tabs

Two main methods to create tabs:

1. **Declare Custom Tab in App Manifest**
   - Define URLs and scopes in your app manifest.
   - Use Teams JavaScript client library for Teams-specific information.

2. **Use Adaptive Card to Build Tabs**
   - For flexible, card-based UI layouts.

### Declare Custom Tab in App Manifest

- Custom tabs are declared in the app manifest of your app package.
- Define a URL and scope for each webpage you want as a tab.
- Possible to add Teams-specific functionalities like dark theme adaptation.

### Tools to Build Tabs

- **Teams Toolkit for Visual Studio Code**
- **Teams Toolkit for Visual Studio**

## Next Steps

- [Prerequisites](~/tabs/how-to/tab-requirements.md) for tab development.

## Additional Resources

- [Design your tab for Microsoft Teams](design/tabs.md)
- [Device capabilities](../concepts/device-capabilities/device-capabilities-overview.md)
- [Tabs on mobile](design/tabs-mobile.md#tabs-on-mobile)
- [Instrumenting for Teams app specific analytics](../concepts/design/overview-analytics.md#instrumenting-for-teams-app-specific-analytics)
- [Extend tab app with Microsoft Graph](how-to/authentication/tab-sso-graph-api.md)
- [Microsoft Teams update](../resources/teams-updates.md)
- [Grant tab device permission](~/sbs-tab-device-permissions.yml)
```