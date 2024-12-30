```markdown
---
title: Microsoft Teams Tabs
author: Surbhi Gupta
description: Learn to build tabs, webpages embedded in Microsoft Teams. Create a content page as part of a personal, channel, or group tab.
ms.localizationpriority: high
ms.topic: overview
ms.date: 05/04/2023
---

## Build Tabs for Teams

Tabs are client-aware webpages embedded in Microsoft Teams, Outlook, and Microsoft 365. They're simple HTML `<iframe/>` tags that point to domains declared in the app manifest and can be added as part of a channel inside a team, group chat, or personal app for an individual user. You can include custom tabs with your app to embed your web content in Teams or add Teams-specific functionality.

For more information, see [Teams JavaScript Client Library](/javascript/api/overview/msteams-client#microsoft-teams-javascript-client-library).

> [!IMPORTANT]
> Custom tabs are available in Government Community Cloud (GCC), GCC-High, and Department of Defense (DOD).

### Types of Tabs

There are two types of tabs: static and configurable tabs. These tabs can be used in three different scopes:

- **Personal:** Used for personal apps scoped to a single user, pinned to the left navigation bar.
- **Group Chat and Teams:** Behave like apps, allowing only one tab per app.

[Personal (static) tabs](~/tabs/how-to/create-personal-tab.md) can also be extended to group chats, channels, or meetings with a [customizable experience](~/tabs/how-to/create-personal-tab.md#customizing-your-static-tab-in-chats-or-meetings).

##### Example Tabs in Different Contexts

- **Personal:**

    ![Personal Tab](~/assets/images/tabs/personal-tab-configure.png)

- **Channel:**

    ![Channel Tab](~/assets/images/tabs/tabs.png)

- **Meeting:**

    ![Meeting Tab](~/assets/images/tabs/personal-tab-meeting.png)

## Benefits of Static Tabs

- **Pinnable and Instant:** Pin apps with static tabs, which can be unpinned easily without mandatory configuration.
- **Unified:** Create one static tab for both personal and group scopes, such as chat, channel, and meeting tabs.
- **Optional Configuration:** Change the default URL by altering the `contentUrl` property of your app.

## Best Fit for Your App

| &nbsp; | Personal | Channels | Group Chat | Meetings |
|---|---|---|---|
| [Static Tabs](~/tabs/how-to/create-personal-tab.md) | ✔️ | ✔️ | ✔️ | ✔️ |
| [Configurable Tabs](~/tabs/how-to/create-channel-group-tab.md) | ❌ | ✔️ | ✔️ | ✔️ |

> [!NOTE]
> If both [configurable](~/tabs/how-to/create-tab-pages/configuration-page.md) and [static](~/tabs/how-to/create-personal-tab.md) tabs are defined for a specific scope, Teams defaults to the static tab.

## Creating Tab Pages

- **Content Page:** Build part of a personal static tab, channel or group tab, or dialog/task module in TeamsJS v1.x.
- **Configuration Page:** Enable tab configuration for Microsoft Teams or connectors for Microsoft 365 Groups.
- **Tab Removal Page:** Permit reconfiguration post-installation and create a removal page.

## Tab Features

- Bots included in the app are added to the team.
- Awareness of Microsoft Entra ID and locale.
- SSO capability, if supported.
- Bots/app notifications for deep linking.
- Modal dialog access from tab links.
- Reuse SharePoint web parts within tabs.

## Tabs User Scenarios

- **Scenario:** Bring web-based resources inside Teams.
  **Example:** A static tab in your app presenting an informational website.

- **Scenario:** Add support pages to a bot/messaging extension.
  **Example:** Static tabs providing ~about~ and ~help~ content.

- **Scenario:** Provide access to collaborative items.
  **Example:** A channel/group tab with deep linking to specific items.

## Creating Tabs

### Methods to Create Tabs

- [Declare Custom Tab in App Manifest](#declare-custom-tab-in-app-manifest)
- [Use Adaptive Card to Build Tabs](~/tabs/how-to/build-adaptive-card-tabs.md)

### Declare Custom Tab in App Manifest

In your app package's manifest, define each webpage as a tab with its URL and scope. Add the [Teams JavaScript Client Library](/javascript/api/overview/msteams-client) and initialize the page with `microsoftTeams.initialize()`.

Ensure your tab functions within the required scopes using an `<iframe>` HTML content page. For static tabs, set the `contentUrl` property in the `staticTabs` array of your app manifest.

> [!NOTE]
> Teams apps can't use native plugins as they run inside sandboxed iframes.

### Tools to Build Tabs

- [Teams Toolkit for Visual Studio Code](../toolkit/teams-toolkit-fundamentals.md)
- [Teams Toolkit for Visual Studio](../toolkit/visual-studio-overview.md)

## Next Steps

> [!div class="nextstepaction"]
> [Prerequisites](~/tabs/how-to/tab-requirements.md)

## See Also

- [Design Your Tab for Microsoft Teams](design/tabs.md)
- [Device Capabilities](../concepts/device-capabilities/device-capabilities-overview.md)
- [Tabs on Mobile](design/tabs-mobile.md#tabs-on-mobile)
- [App Capabilities Mapped to Features](../concepts/design/map-use-cases.md#app-capabilities-mapped-to-features)
- [Instrumenting for Teams App Specific Analytics](../concepts/design/overview-analytics.md#instrumenting-for-teams-app-specific-analytics)
- [Extend Tab App with Microsoft Graph Permissions and Scopes](how-to/authentication/tab-sso-graph-api.md)
- [Microsoft Teams Update](../resources/teams-updates.md)
- [Grant Tab Device Permission in Teams](~/sbs-tab-device-permissions.yml)
```