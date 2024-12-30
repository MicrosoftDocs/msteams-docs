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

Tabs are client-aware webpages embedded in Microsoft Teams, Outlook, and Microsoft 365. They're simple HTML `<iframe/>` tags pointing to domains declared in the app manifest. Tabs can be added as part of a channel inside a team, group chat, or personal app for an individual user. You can include custom tabs with your app to embed your own web content in Teams or add Teams-specific functionality.

For more information, see [Teams JavaScript Client Library](/javascript/api/overview/msteams-client#microsoft-teams-javascript-client-library).

> [!IMPORTANT]
> Custom tabs are available in Government Community Cloud (GCC), GCC-High, and Department of Defense (DOD).

### Types of Tabs

There are two types of tabs: static and configurable. These tabs can be used in three distinct scopes:

1. `Personal`
2. `Group chat`
3. `Teams`

- [Personal (static) tabs](~/tabs/how-to/create-personal-tab.md): Provide personal experience; extendable to group chats, channels, or meetings with a [customizable experience](~/tabs/how-to/create-personal-tab.md#extend-static-tabs-to-group-chat-channels-and-meetings).

- Tabs in chats, channels, or meetings behave like apps, as you can pin only one tab per app (e.g., a single YouTube app tab in a meeting). Static tabs in meetings can be pre-pinned by IT Admins.

### Benefits of Static Tabs

* **Pinnable and Instant**: You can pin apps with static tabs from the **+** icon in chats, channels, and meetings with optional configuration dialog.
* **Unified**: Create one static tab that works across personal and group scopes.
* **Optional Configuration**: Changing the `contentUrl` property changes the default URL.

### Best Fit for Your App

| &nbsp;                                | Personal  | Channels | Group chat | Meetings |
|---------------------------------------|-----------|----------|------------|----------|
| [Static tabs](~/tabs/how-to/create-personal-tab.md)     | ✔️       | ✔️       | ✔️       | ✔️       |
| [Configurable tabs](~/tabs/how-to/create-channel-group-tab.md) | ❌       | ✔️       | ✔️       | ✔️       |

> [!NOTE]
> If both [configurable tab](~/tabs/how-to/create-tab-pages/configuration-page.md) and [static tab](~/tabs/how-to/create-personal-tab.md) are defined in your app manifest for a specific scope, Teams pins the static tab by default.

## Create Content and Configuration Pages

- [Create a content page](~/tabs/how-to/create-tab-pages/content-page.md) for personal static tab, channel or group tab, or dialog (task module in TeamsJS v1.x).
- [Create a configuration page](~/tabs/how-to/create-tab-pages/configuration-page.md) to configure Microsoft Teams app.
- Permit users to reconfigure your tab after installation and [create a tab removal page](~/tabs/how-to/create-tab-pages/removal-page.md) for your application.

### Tab Features

* Awareness of Microsoft Entra ID of the current user.
* Locale awareness indicating the user's language (e.g., `en-us`).
* Single sign-on (SSO) capability, where supported.
* Ability to deep link to the tab or a subentity with bots or app notifications.
* Open modal dialog from links within a tab.
* Reuse of SharePoint web parts within the tab.

## Tabs User Scenarios

- **Bring a web-based resource inside Teams**: Create a static tab in your Teams app that presents an informational corporate website to users.
- **Add support pages**: Add static tabs providing **about** and **help** webpage content to users for a Teams bot or messaging extension.
- **Access to items for collaboration**: Use a channel or group tab with deep linking to individual items.

### Understand How Tabs Work

- **Declare Custom Tab in App Manifest**: Define a URL and scope for each webpage included as a tab. Add the [Teams JavaScript Client Library](/javascript/api/overview/msteams-client) to your page and initialize it with `microsoftTeams.initialize()`.

- **Static Tabs**: Pin a `contentUrl` without configuration dialog to chat, channel, or meeting tabs; change the `contentUrl` at runtime.

### Tools to Build Tabs

* [Teams Toolkit for Visual Studio Code](../toolkit/teams-toolkit-fundamentals.md)
* [Teams Toolkit for Visual Studio](../toolkit/visual-studio-overview.md)

## Next Steps

> [!div class="nextstepaction"]
> [Prerequisites](~/tabs/how-to/tab-requirements.md)

## See Also

- [Design Your Tab for Microsoft Teams](design/tabs.md)
- [Device Capabilities](../concepts/device-capabilities/device-capabilities-overview.md)
- [Tabs on Mobile](design/tabs-mobile.md#tabs-on-mobile)
- [App Capabilities Mapped to Features](../concepts/design/map-use-cases.md#app-capabilities-mapped-to-features)
- [Extend Tab App with Microsoft Graph Permissions and Scopes](how-to/authentication/tab-sso-graph-api.md)

> [!NOTE]
> **Posts** and **Files** can't be moved from their positions.
```