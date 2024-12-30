```markdown
---
title: Microsoft Teams Tabs
author: Surbhi Gupta
description: Learn to build tabs, webpages embedded in Microsoft Teams. Create a content page as part of personal, channel, or group tab.
ms.localizationpriority: high
ms.topic: overview
ms.date: 05/04/2023
---

## Build Tabs for Teams

Tabs are client-aware webpages embedded in Microsoft Teams, Outlook, and Microsoft 365. These are simple HTML `<iframe>` tags pointing to domains declared in the app manifest. Tabs can be added as part of a channel, group chat, or personal app for an individual user. Integrate custom tabs with your app to embed web content or add Teams-specific features. Learn more in the [Teams JavaScript client library documentation](/javascript/api/overview/msteams-client#microsoft-teams-javascript-client-library).

### Key Information

- **Governance Cloud Availability**: Custom tabs are available in GCC, GCC-High, and DOD.
- **Types of Tabs**:
  - **Static Tabs**: Personal (static) tabs provide information and functionality scoped to a single user.
  - **Configurable Tabs**: Deliver content in channels and group chats for collaborative experiences.

### Tabs in Different Scopes

- **Personal Tabs**: Pinned to the left navigation, extendable to group chats and meetings.
- **Channel or Group Tabs**: Acts like apps; pin one tab per app, pre-pinned by IT admins.
  
## Benefits of Static Tabs in Chats, Channels, and Meetings

- **Pinnable and Instant**: Quick pinning from the tab icon, with no mandatory configuration.
- **Unified Experience**: Consistency across personal and group scopes.
- **Optional Configuration**: Change the default URL via `contentUrl` after pinning in Teams.

### Tab Types and Use Cases

| &nbsp; | Personal | Channels | Group chat | Meetings |
|---|---|---|
|[Static Tabs](~/tabs/how-to/create-personal-tab.md)|✔️|✔️|✔️|✔️|
|[Configurable Tabs](~/tabs/how-to/create-channel-group-tab.md)|❌|✔️|✔️|✔️|

### Note

If both static and configurable tabs are defined in your app manifest for a scope, Teams prioritizes the static tab.

### Creating Content and Configuration Pages

- **Content Page**: Part of a personal static tab, channel, group tab, or dialog.
- **Configuration Page**: Allows users to configure the Teams app for different tab types and extensions.

### Tab Function and Testing

- Ensure your tab works on both Android and iOS Teams clients.
- Obtain context via basic, locale, theme information, and identifiers.

### Tab Features

- Awareness of Microsoft Entra ID, locale, SSO capabilities.
- Bot or app notifications linking to a tab or subentity.
- Modal dialog opening within tabs.
- Reuse of SharePoint web parts.

## User Scenarios

- **Web Resource Integration**: Embed existing web resources into Teams as static tabs.
- **Support Pages for Bots**: Provide **about** and **help** resources in tabs.
- **Collaboration on Regular Items**: Use deep-linking for collaborative environments in channel tabs.

## Building Tabs

- **Custom Tab in App Manifest**: Define URL and scope in your app package manifest.
- **Adaptive Card Build**: Utilize adaptive cards in tab construction.

### Development Tools

- [Teams Toolkit for Visual Studio Code](../toolkit/teams-toolkit-fundamentals.md)
- [Teams Toolkit for Visual Studio](../toolkit/visual-studio-overview.md)

## Next Steps

> [!div class="nextstepaction"]
> [Prerequisites](~/tabs/how-to/tab-requirements.md)

## Additional Resources

- [Designing Tabs for Microsoft Teams](design/tabs.md)
- [Device Capabilities Overview](../concepts/device-capabilities/device-capabilities-overview.md)
- [Tabs on Mobile](design/tabs-mobile.md#tabs-on-mobile)
- [App Capabilities and Features Mapping](../concepts/design/map-use-cases.md#app-capabilities-mapped-to-features)
- [Teams App Analytics](../concepts/design/overview-analytics.md#instrumenting-for-teams-app-specific-analytics)
- [Graph Permissions for Tabs](how-to/authentication/tab-sso-graph-api.md)
- [Microsoft Teams Updates](../resources/teams-updates.md)
- [Grant Tab Device Permissions](~/sbs-tab-device-permissions.yml)
```