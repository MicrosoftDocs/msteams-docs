```markdown
---
title: Building Tabs for Microsoft Teams
author: surbhigupta
description: Understand how to create and manage tabs, client-aware webpages that can be embedded in Microsoft Teams as part of personal, channel, or group tabs.
ms.localizationpriority: high
ms.topic: overview
ms.date: 05/04/2023
---

# Introduction to Microsoft Teams Tabs

Tabs in Microsoft Teams are simple HTML `<iframe/>` tags pointing to URLs specified in the app manifest. These tabs provide a flexible way to incorporate custom web content into Teams, accessible within personal apps, group chats, or team channels. 

> [!IMPORTANT]
> Custom tabs are available in Government Community Cloud (GCC), GCC-High, and Department of Defense (DOD).

## Types of Tabs

There are two primary types of tabs:

1. **Static Tabs**: These are fixed tabs that users can interact with in a personal or group scope.
2. **Configurable Tabs**: These tabs allow a more customizable setup and are ideal for collaborative environments.

## Tab Scopes

Tabs can be deployed in the following contexts:

- **Personal**: For individual users, these tabs are located in the personal apps section, allowing user-specific functionality.
- **Group Chat**: Embedded within group conversations enhancing collaborative discussions.
- **Teams/Channels**: Integrated into team channels, offering dynamic content conducive to team-related activities.

### Personal (Static) Tabs

- Displayed as part of personal apps.
- Easily accessible from the left navigation.
- Configurable for additional use in group chats, channels, or meetings.

### Channel or Group Tabs (Configurable)

- Allow for collaborative interactions within channels or group chats.
- Feature optional configuration settings to tailor content to specific contexts.

## Benefits of Static Tabs

- **Pinnable and Instant**: Users can pin/unpin them without requiring configuration dialogs.
- **Unified Experience**: Single tab design functions across personal and group scopes.
- **Optional Configuration**: Modify content URLs post-installation for context-relevant experiences.

## Examples of Tab Usage

**Personal Tab Example:**
```md
A company informational page in a personal app to share corporate updates with employees.
```

**Channel Tab Example:**
```md
A project management board tab for collaborative task tracking within a team.
```

## Determine the Best Tab for Your App

| Type | Personal | Channels | Group Chat | Meetings |
|------|----------|----------|------------|----------|
| **Static Tabs** | ✔️ | ✔️ | ✔️ | ✔️ |
| **Configurable Tabs** | ❌ | ✔️ | ✔️ | ✔️ |

> [!NOTE]
> If both static and configurable tabs exist in a scope, Teams defaults to the static tab.

## Features of Tabs

- Awareness of Microsoft Entra ID of the current user.
- Locale adaptability to support various languages.
- Single sign-on (SSO) capabilities where applicable.
- The capability to deep link into a subentity within a tab.
- Modal dialog support for interactive elements.
- Reuse of SharePoint web parts where applicable.

## User Scenarios

- **Scenario**: Embedding an existing web resource in Teams for easy access.
- **Example**: A static tab showing the company's internal dashboard.
  
- **Scenario**: Enhancing a Teams bot with additional help pages.
- **Example**: Adding static tabs for help and FAQ sections linked to a Teams bot.

## Building Tabs: Methods

### Declaring a Custom Tab

1. **App Manifest**: Define the URL and scope for each webpage you wish to include.
2. **Teams JavaScript Client Library**: Initialize with `microsoftTeams.initialize()` to leverage Teams-specific functionalities like theme adaptation.

### Utilizing Adaptive Cards

Explore building alongside Adaptive Cards for enriched functionality, utilizing the [Teams JavaScript client library](/javascript/api/overview/msteams-client).

## Tools for Tab Development

- **Teams Toolkit for Visual Studio Code**: Simplifies the tab building and testing process.
- **Teams Toolkit for Visual Studio**: Provides an integrated environment for developing Teams applications.

## Next Steps

- [Learn about Prerequisites](~/tabs/how-to/tab-requirements.md) needed for building tabs in Microsoft Teams.

## Additional Resources

- [Design Considerations for Tabs](design/tabs.md)
- [Device Capabilities in Tabs](../concepts/device-capabilities/device-capabilities-overview.md)
- [Tabs on Mobile Platforms](design/tabs-mobile.md#tabs-on-mobile)

By understanding and utilizing Microsoft Teams' tabs effectively, you can enhance user collaboration and streamline interactions within the Teams environment.
```