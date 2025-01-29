## Microsoft Teams Tabs Overview

This guide explores how to build and implement tabs in Microsoft Teams. Tabs are client-aware webpages embedded in Teams that enhance the user experience by bringing custom web content into channels, meetings, and personal spaces.

### Types of Tabs

1. **Static Tabs**: These are fixed and don't require user configuration. They're ideal for content consistent across all users.
2. **Configurable Tabs**: These tabs allow customization during or after installation, tailoring content to specific teams or projects.

### Tab Scenarios

- **Personal Tabs**: Part of personal apps for a single user. These tabs are pinned for easy access.
- **Group Chat Tabs**: Used in group chats to enhance collaboration and focus on shared content.
- **Channel Tabs**: Embedded in channels to organize team resources and web content.

### Benefits of Static Tabs

- **Quick Access**: Instantly pinnable and don't require setup dialogs.
- **Unified Design**: One tab can be used across personal and group scopes.
- **Optional Configuration**: Customize the default URL or content.

### Real-world Use Cases

**Scenario 1**: Integrate an existing company dashboard.
- **Example**: A static tab showcases a corporate dashboard, providing team members with direct access to vital metrics.

**Scenario 2**: Support page for a Teams bot.
- **Example**: Static tabs offer help and FAQ sections for bot users.

**Scenario 3**: Link specific tasks or projects.
- **Example**: Configurable tabs in a channel allow teams to set and access project-specific boards directly within Teams.

### Implementing a Custom Tab

A custom tab involves:
- Defining the webpage and scope in your app manifest.
- Optionally using the Teams JavaScript client library to access enhanced Teams functionalities.
- Ensuring compatibility in various devices and contexts, including mobile access.

### Tab Features

- Automatic bot installation when a tab with a bot is used.
- Awareness of user locales and ID.
- Single Sign-On (SSO) support under certain conditions.

### Tools for Development

- **Teams Toolkit for Visual Studio Code**: Simplifies the development and deployment of Teams apps.
- **Teams Toolkit for Visual Studio**: Offers integrated development environment options for Teams apps creation.

### Next Steps

Explore further resources to enhance your Teams app development:
- [Prerequisites for Tab Development](~/tabs/how-to/tab-requirements.md)
- [Design Considerations for Teams Tabs](~/design/tabs.md)
- [Tabs on Mobile](~/design/tabs-mobile.md#tabs-on-mobile)
- [Extend Tabs Using Microsoft Graph](~/how-to/authentication/tab-sso-graph-api.md)
- [Microsoft Teams Updates and Permissions](../resources/teams-updates.md)

This streamlined approach to learning and implementing Microsoft Teams tabs will assist developers and administrators in enhancing their Teams environments with customized content and improved user experience.