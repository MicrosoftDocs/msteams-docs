```markdown
---
title: Microsoft Teams Tabs
author: Surbhi Gupta
description: Learn how to build tabs, which are webpages embedded inside Microsoft Teams. Create a content page for use in personal, channel, or group tabs.
ms.localizationpriority: high
ms.topic: overview
ms.date: 05/04/2023
---

# Build Tabs for Teams

Tabs in Microsoft Teams are client-aware webpages embedded inside applications like Teams, Outlook, and other Microsoft 365 apps. They function as HTML `<iframe/>` tags pointing to domains specified in the app manifest. You can add these tabs in a channel within a team, a group chat, or as a personal app. Tabs can either simply display web content or can be used to add Teams-specific functionalities. To learn more, refer to the [Teams JavaScript client library](/javascript/api/overview/msteams-client#microsoft-teams-javascript-client-library).

> [!IMPORTANT]
> Custom tabs can be used in Government Community Cloud (GCC), GCC-High, and Department of Defense (DOD) configurations.

## Types of Tabs

There are two types of tabs:

- **Static Tabs:** These are pinned to the left navigation bar and just like personal bots, are specific to a single user. They can be extended to work in group chats, channels, and meetings with custom experiences.
- **Configurable Tabs:** These adapt to channels and group chats to offer web-based collaborative environments.

Tabs operate within three main scopes:

- **Personal**
- **Group Chat**
- **Teams**

### Scopes

- **Personal:** Static tabs for individuals, quick to access from the app's left navigation.
- **Group Chat/Teams:** Configurable tabs behave more like apps with a limit of only one tab per app. For instance, only one YouTube tab can be pinned in a meeting.

Static tabs in meetings can also be set up beforehand by IT admins. This offers the benefit of ready-to-use content without additional setup requirements.

## Benefits of Static Tabs

Some advantages of utilizing static tabs in chats, channels, and meetings include:

- **Pinnable and Instant:** Easily pin apps with static tabs from the tab addition option. Unpinning is flexible and does not require mandatory configurations.
- **Unified Experience:** Develop a single static tab to work across different areas like personal, chat, channel, or meeting.
- **Configurable URL:** Modify the tab's URL with the `contentUrl` property in your app after it's been pinned.

For more comprehensive usage cases, consider these scenarios:

- **Bringing External Resources Inside Teams:** Use static tabs for corporate websites or dashboards.
- **Support Additions:** Add support pages to a Teams bot or messaging extension.

## Deciding on a Tab Type for Your App

Evaluate which tab suits your app scope using the table below:

|                | Personal | Channels | Group Chat | Meetings |
|----------------|----------|----------|------------|----------|
| Static Tabs    | ✔️       | ✔️       | ✔️         | ✔️       |
| Configurable Tabs | ❌     | ✔️       | ✔️         | ✔️       |

> [!NOTE]
> When both configurable and static tabs are defined in the app manifest, Teams defaults to the static tab.

You can create a content page for various Teams tabs, configure the tab experience via a configuration page, and allow users to reconfigure or remove tabs as needed.

## Creating Custom Tabs

### Declare Custom Tabs in App Manifest

A custom tab is established in your app manifest. Define the webpage URL and its intended scope. Include the [Teams JavaScript client library](/javascript/api/overview/msteams-client) to access Teams-specific context settings. Each page must run within an HTML `<iframe>`.

For static tabs, define the `contentUrl` in your manifest's `staticTabs` array. Configurable tabs need an additional configuration page URL specified in `configurableTabs`.

### Tools for Building Tabs

- **Teams Toolkit for Visual Studio Code**: See [essential guide](../toolkit/teams-toolkit-fundamentals.md).
- **Teams Toolkit for Visual Studio**: Visit [overview page](../toolkit/visual-studio-overview.md).

## Next Steps

> [!div class="nextstepaction"]
> [Prepare Your Environment](~/tabs/how-to/tab-requirements.md)

## Additional Resources

- [Designing Tabs for Microsoft Teams](design/tabs.md)
- [Device Capabilities](../concepts/device-capabilities/device-capabilities-overview.md)
- [Tabs on Mobile](design/tabs-mobile.md#tabs-on-mobile)
- [App Capabilities and Features](../concepts/design/map-use-cases.md#app-capabilities-mapped-to-features)
- [Teams App Analytics](../concepts/design/overview-analytics.md#instrumenting-for-teams-app-specific-analytics)
- [Extend Tabs with Microsoft Graph](how-to/authentication/tab-sso-graph-api.md)
- [Teams Update Information](../resources/teams-updates.md)
- [Granting Tab Device Permissions](~/sbs-tab-device-permissions.yml)
```