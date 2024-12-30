title: Microsoft Teams Tabs
author: Surbhi Gupta
description: Learn how to build tabs, which are webpages embedded in Microsoft Teams. Create a content page as part of personal, channel, or group tabs.
ms.localizationpriority: high
ms.topic: overview
ms.date: 05/04/2023

# Build Tabs for Teams

Tabs are client-aware webpages embedded into Microsoft Teams, Outlook, and Microsoft 365. These tabs are simple HTML `<iframe/>` tags pointing to domains declared in the app manifest. They can be added as part of a channel inside a team, group chat, or as a personal app for individual users. Use custom tabs with your app to embed web content in Teams or add Teams-specific functionality to your web content. For further reference, see the [Teams JavaScript client library](/javascript/api/overview/msteams-client#microsoft-teams-javascript-client-library).

> **Important:** Custom tabs are available in Government Community Cloud (GCC), GCC-High, and Department of Defense (DOD).

## Types of Tabs

- **Static Tabs**: Part of personal apps, scoped to a single user, and pinned to the left navigation bar for easy access.
- **Configurable Tabs**: Deliver content to channels and group chats, creating collaborative spaces around dedicated web-based content.

Tabs apply in three scopes: `personal`, `groupchat`, and `teams`.

### Extend Static Tabs

Personal (static) tabs continue to operate in the personal scope. However, you can now extend static tabs to group chats, channels, or meetings with a customizable experience. For more details, refer to how to [extend static tabs](~/tabs/how-to/create-personal-tab.md#extend-static-tabs-to-group-chat-channels-and-meetings).

Tabs in chats, channels, or meetings behave more like apps, allowing you to pin only one tab per app (e.g., a single YouTube app tab in a meeting). IT Admins can pre-pin static tabs in meetings.

### Benefits of Static Tabs

- **Pinnable and Instant**: Easily pin apps with static tabs across chats, channels, and meetings via the add tab **+** icon.
- **Unified Experience**: Create one static tab usable across personal and group scopes.
- **Optional Configuration**: Adjust the default URL in your tab instance by modifying the `contentUrl` property after pinning in Teams.

For channel or group tabs, configurable tabs are used to deliver content, enhancing group communication and collaboration. The table below helps determine the best fit for your app:

| | Personal | Channels | Group Chat | Meetings |
|---|---|---|---|---|
| Static Tabs | ✅ | ✅ | ✅ | ✅ |
| Configurable Tabs | ❌ | ✅ | ✅ | ✅ |

> **Note**: If a configurable and static tab are defined for the same scope, Teams defaults to pinning the static tab.

## Creating Pages

- **Content Pages**: Part of personal static tabs, channel or group tabs.
- **Configuration Pages**: Allow users to configure a Microsoft Teams app, personal, channel, or group chat tab.
- **Tab Removal Pages**: Provided for your application.
- **Testing**: Ensure your tab functions properly on both Android and iOS Teams clients.

> **Note**: "Posts" and "Files" cannot be relocated from their positions.

## Features of Tabs

- If a tab is added to an app already containing a bot, the bot is added to the team as well.
- Awareness of Microsoft Entra ID of the current user.
- Locale awareness to indicate language as `en-us`.
- Single sign-on (SSO) capability, if supported.

Tabs can use bots or app notifications to deep link to the tab or a subentity, and open modal dialogues from links within the tab. Moreover, SharePoint web parts reuse within the tab is possible.

## Use Case Scenarios

- **Scenario**: Integrate an existing web-based resource into Teams.
  - **Example**: Create a static tab in your Teams app to present a corporate website.

- **Scenario**: Add support pages to a Teams bot or messaging extension.
  - **Example**: Provide **about** and **help** webpage content via static tabs.

- **Scenario**: Facilitate regular interactions with collaborative items.
  - **Example**: Create a channel/group tab enabling deep linking to specific items.

## Understanding Tab Functionality

Tabs can be created using:

- **Declare Custom Tab in App Manifest**
- **Use Adaptive Card to Build Tabs**

### Declare Custom Tab

Define a custom tab in the app manifest by specifying a URL and scope for each webpage to be included. Add the [Teams JavaScript client library](/javascript/api/overview/msteams-client) to call `microsoftTeams.initialize()` post-page load. Use an `<iframe/>` HTML content page in your tab. For static tabs, the `contentUrl` property in the `staticTabs` array in your Teams app manifest is critical.

### Tools for Building Tabs

- **Teams Toolkit for Visual Studio Code**
- **Teams Toolkit for Visual Studio**

## Next Steps

> [Explore Prerequisites](~/tabs/how-to/tab-requirements.md)

## Additional Resources

- [Design Your Tab for Microsoft Teams](design/tabs.md)
- [Device Capabilities Overview](../concepts/device-capabilities/device-capabilities-overview.md)
- [Tabs on Mobile](design/tabs-mobile.md#tabs-on-mobile)
- [App Capabilities Mapped to Features](../concepts/design/map-use-cases.md#app-capabilities-mapped-to-features)
- [Analytics for Teams App](../concepts/design/overview-analytics.md#instrumenting-for-teams-app-specific-analytics)
- [Extend Tab App with Graph API](how-to/authentication/tab-sso-graph-api.md)
- [Microsoft Teams Updates](../resources/teams-updates.md)
- [Grant Tab Device Permissions in Teams](~/sbs-tab-device-permissions.yml)