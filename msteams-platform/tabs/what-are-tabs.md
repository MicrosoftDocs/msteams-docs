---
title: Microsoft Teams Tabs
author: Surbhi Gupta
description: Learn to build tabs, webpages embedded in Microsoft Teams. Create a content page as part of personal, channel, or group tab.
ms.localizationpriority: high
ms.topic: overview
ms.date: 05/04/2023
---

# Build Tabs for Teams

Tabs are client-aware webpages embedded in Microsoft Teams, Outlook, and Microsoft 365. They use simple HTML `<iframe/>` tags that point to domains declared in the app manifest. Tabs can be added to channels, group chats, or as personal apps for individual users. Custom tabs allow embedding of your own web content in Teams and adding Teams-specific functionality. For more information, refer to the [Teams JavaScript client library](/javascript/api/overview/msteams-client#microsoft-teams-javascript-client-library).

> **Important:** Custom tabs are available in Government Community Cloud (GCC), GCC-High, and Department of Defense (DOD).

## Types and Scopes of Tabs

There are two types of tabs:

1. **Static Tabs**
2. **Configurable Tabs**

Tabs can be used in different scopes:

- **Personal**
- **Group Chat**
- **Teams**

[Personal (static) tabs](~/tabs/how-to/create-personal-tab.md) are apps scoped to a single user and pinned to the left navigation bar. These can be extended to group chats, channels, or meetings by [customizing your static tab](~/tabs/how-to/create-personal-tab.md#customizing-your-static-tab-in-chats-or-meetings).

Tabs in chats, channels, or meetings behave like apps, allowing only one tab per app. For instance, only a single YouTube app tab can be pinned in a meeting. Admins can also pre-pin static tabs in meetings.

## Visualizing Tabs in Different Scopes

### Personal

**Teams desktop**

![Screenshot of a tab added to a personal scope.](~/assets/images/tabs/personal-tab-configure.png)

**Teams mobile**

![Example of a mobile tab in a personal context.](~/assets/images/tabs/mobile-design-access-tab.png)

### Channel

**Teams desktop**

![Channel or group tabs.](~/assets/images/tabs/tabs.png)

**Teams mobile**

![Mobile tab added in a channel.](~/assets/images/tabs/mobile-design-static-tab.png)

### Meeting

**Teams desktop**

![Configurable tab added to a meeting.](~/assets/images/tabs/personal-tab-meeting.png)

**Teams mobile**

![Configurable tab added to a meeting on mobile.](~/assets/images/tabs/mobile-personal-tab-meeting.png)

## Benefits of Static Tabs in Chats, Channels, and Meetings

- **Pinnable and Instant**: Easily pin apps with static tabs and customize them without mandatory configuration dialogs.
- **Unified**: Create one static tab for personal, chat, channel, and meeting scopes.
- **Optional Configuration**: Change the default URL post-configuration by updating the `contentUrl`.

[Channel or group tabs](~/tabs/how-to/create-channel-group-tab.md) deliver content to collaborative spaces in channels and group chats, revolving around dedicated web-based content.

### Choosing the Right Tab Type for Your App

|                       | Personal | Channels | Group Chat | Meetings |
|-----------------------|----------|----------|------------|--------|
| [Static Tabs](~/tabs/how-to/create-personal-tab.md)        | ✔️       | ✔️       | ✔️         | ✔️     |
| [Configurable Tabs](~/tabs/how-to/create-channel-group-tab.md) | ❌     | ✔️       | ✔️         | ✔️     |

> **Note:** If both configurable and static tabs are defined in the app manifest for a scope, Teams defaults to the static tab.

## Creating Tab Pages

- Create a [content page](~/tabs/how-to/create-tab-pages/content-page.md) for personal static tabs, channels, or group tabs.
- Develop a [configuration page](~/tabs/how-to/create-tab-pages/configuration-page.md) to let users set up a tab, messaging extension, or connector card.
- Allow tab reconfiguration post-installation and set up a [tab removal page](~/tabs/how-to/create-tab-pages/removal-page.md).
- Test tab functionality on both Android and iOS Teams clients, ensuring your tab [gets context](~/tabs/how-to/access-teams-context.md) with necessary information like locale and theme.

> **Note:** Posts and Files cannot be moved from their positions.

## Tab User Scenarios

### Scenarios

- **Bring web resources into Teams:** For example, a static tab showcasing a corporate website.
- **Support pages for bots or messaging extensions:** Provide about/help content through static tabs.
- **Collaborative item access:** Use channel/group tabs for deep-linked collaboration items.

### Building Custom Tabs

Learn to create tabs using:

- **App Manifest:** Define custom tabs with URLs and scopes. Use the [Teams JavaScript client library](/javascript/api/overview/msteams-client) and `microsoftTeams.initialize()` on page load.
  
  - Channel/Group Tabs: Add URL configuration through a configuration page—users can configure tabs during each install.

- **Adaptive Cards:** Build tabs using Adaptive Cards for dynamic interactivity.

## Building Tools for Tabs

- Use [Teams Toolkit for Visual Studio Code](../toolkit/teams-toolkit-fundamentals.md).
- Utilize [Teams Toolkit for Visual Studio](../toolkit/visual-studio-overview.md).

## Next Steps

Continue with [Prerequisites](~/tabs/how-to/tab-requirements.md) to further your understanding.

## Additional Resources

- [Design your tab for Microsoft Teams](design/tabs.md)
- [Device capabilities](../concepts/device-capabilities/device-capabilities-overview.md)
- [Tabs on mobile](design/tabs-mobile.md#tabs-on-mobile)
- [App capabilities mapped to features](../concepts/design/map-use-cases.md#app-capabilities-mapped-to-features)
- [Instrumentation for Teams app analytics](../concepts/design/overview-analytics.md#instrumenting-for-teams-app-specific-analytics)
- [Add Microsoft Graph permissions](how-to/authentication/tab-sso-graph-api.md)
- [Microsoft Teams updates](../resources/teams-updates.md)
- [Grant tab device permissions in Teams](~/sbs-tab-device-permissions.yml)
