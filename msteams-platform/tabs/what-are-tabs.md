---
title: Microsoft Teams Tabs
author: Surbhi Gupta
description: Learn to build tabs, webpages embedded in Microsoft Teams. Create a content page as part of personal, channel, or group tab.
ms.localizationpriority: high
ms.topic: overview
ms.date: 05/04/2023
---

# Build Tabs for Teams

Tabs are client-aware webpages embedded in Microsoft Teams, Outlook, and Microsoft 365. They are simple HTML `<iframe/>` tags pointing to domains declared in the app manifest. You can add them as part of a channel, group chat, or personal app for an individual user. Include custom tabs with your app to embed your own web content in Teams or add Teams-specific functionality to your web content. For more details, see [Teams JavaScript client library](/javascript/api/overview/msteams-client#microsoft-teams-javascript-client-library).

> [!IMPORTANT]
> Custom tabs are available in Government Community Cloud (GCC), GCC-High, and Department of Defense (DOD).

## Types of Tabs

There are two types of tabs: static and configurable. These can be utilized in three scopes:

1. **Personal**
2. **Group Chat**
3. **Teams**

### Personal (Static) Tabs

Static tabs in personal scope are part of apps scoped to a single user and pinned to the left navigation bar for easy access. You can extend static tabs to group chats, channels, or meetings.

### Channel or Group Tabs

Tabs in chats, channels, or meetings behave more like apps, as you can pin only one tab per app. For example, only one YouTube app tab can be pinned in a meeting. IT Admins can also pre-pin static tabs in meetings.

## Benefits of Static Tabs

- **Pinnable and Instant:** Pin apps quickly without a mandatory configuration dialog, making tabs function more like apps.
- **Unified Experience:** A single static tab can work across personal and group scopes such as chat, channel, and meeting tabs.
- **Optional Configuration:** Change the default URL in your tab instance post-pinning by modifying the `contentUrl` property.

## Tabs Utilization

| &nbsp;                     | Personal | Channels | Group Chat | Meetings |
|----------------------------|----------|----------|------------|----------|
| Static Tabs                | ✔️       | ✔️       | ✔️         | ✔️       |
| Configurable Tabs          | ❌       | ✔️       | ✔️         | ✔️       |

> [!NOTE]
> If both a configurable tab and a static tab are defined in your app manifest for a specific scope, Teams pins the static tab by default.

## Tab Creation

You can create the following types of pages related to tabs:

- **Content Page:** For personal static tab, channel or group tab, or task modules.
- **Configuration Page:** Allow users to configure the tabs or app settings.
- **Tab Removal Page:** Options for reconfiguring or removing tabs post-installation.

## Application Scenarios

- **Scenario:** Integrate existing web-based resources into Teams.
  - **Example:** Use a static tab to present an informational corporate website.

- **Scenario:** Add informational support pages alongside a Teams bot or extension.
  - **Example:** Use static tabs to provide **about** and **help** content.

- **Scenario:** Facilitate regular collaboration and dialogue among users.
  - **Example:** Create a channel or group tab with deep linking capabilities for specific items.

## Creating Custom Tabs

To create custom tabs:

1. **In App Manifest:** Define a URL and scope for your tab in the app manifest.
2. **Channel or Group Tabs:** Provide an additional configuration page using parameters to load context-specific content.

## Tab Features

- Inherently includes a bot if an app has both a tab and the bot.
- Awareness of Microsoft Entra ID and locale for each user.
- Optional single sign-on (SSO).
- Supports deep linking to specific subentities within a tab.
- Options to open modal dialogs and reuse SharePoint web content.

## Tools and Additional Resources

- [Teams Toolkit for Visual Studio Code](../toolkit/teams-toolkit-fundamentals.md)
- [Teams Toolkit for Visual Studio](../toolkit/visual-studio-overview.md)

## Next Steps

> [!div class="nextstepaction"]
> [Prerequisites](~/tabs/how-to/tab-requirements.md)

## See Also

- [Design your tab for Microsoft Teams](design/tabs.md)
- [Device capabilities](../concepts/device-capabilities/device-capabilities-overview.md)
- [Tabs on mobile](design/tabs-mobile.md#tabs-on-mobile)
- [Extend tab app with Microsoft Graph permissions and scopes](how-to/authentication/tab-sso-graph-api.md)