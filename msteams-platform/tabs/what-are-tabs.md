### Microsoft Teams Tabs

Learn to develop tabs for Microsoft Teams, which are web pages integrated directly into the Teams interface. These pages can be added to channels, group chats, or personal apps. Tabs can enhance your apps by embedding custom content or providing Teams-specific functions.

## Types of Tabs

1. **Static Tabs**: Fixed content, ideal for personal apps.
2. **Configurable Tabs**: Customizable content, used in channels or group chats.

### Usage Scopes

- **Personal**: Individual user focus, pinned to the sidebar.
- **Group Chat**: Shared tabs within group chats.
- **Channel**: Integrated within team channels.

### Key Features

- **Pinnable and Instant Access**: Easily pin apps in Teams interfaces.
- **Unified Experience**: One tab across personal, chat, channel, and meeting scopes.
- **Configurable**: Customize the URL for different contexts.

### Creating Tabs

#### Code Implementation

Tabs require setting up URLs and corresponding iframes in the app manifest. Optionally, integrate the Teams JavaScript client library to enrich functionalities.

#### Development Tools

- **[Teams Toolkit for Visual Studio Code](../toolkit/teams-toolkit-fundamentals.md)**
- **[Teams Toolkit for Visual Studio](../toolkit/visual-studio-overview.md)**

---

### Scenarios and Use Cases

- **Web Integration**: Insert a corporate web page into Teams.
- **Support Tools**: Add help and about pages to extensions.
- **Collaboration**: Enable access to shared content in a team setting.

### Tabs in Use

- Static tabs in meetings, prepinned by administrators.
- Possible applications include easy access to documents, project boards, or informational websites right within Teams.

### Tab Features

- Awareness of Microsoft Entra ID and locale settings.
- Possible configuration for accessible, shared resources.

### Extended Usage

For best results, test tabs on Android and iOS. Ensure compatibility across various platforms to utilize the full potential of Microsoft Teams' capabilities.

---

For more information, exploring these resources may provide further insights:

- [Design your tab for Microsoft Teams](design/tabs.md)
- [Device capabilities](../concepts/device-capabilities/device-capabilities-overview.md)
- [App capabilities and analytics](../concepts/design/map-use-cases.md#app-capabilities-mapped-to-features)
- [Microsoft Graph permissions](how-to/authentication/tab-sso-graph-api.md)

This refactor aims to create a streamlined and accessible guide for users looking to integrate tabs into Microsoft Teams effectively.