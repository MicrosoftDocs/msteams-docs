## Build Tabs for Teams

Tabs are web pages embedded in Microsoft Teams, Outlook, and Microsoft 365 utilizing simple HTML `<iframe/>` tags. Tabs can be added as a channel, group chat, or personal app. They're client-aware and ensure smooth interaction within the app, allowing custom web content or Teams-specific functionality to be embedded.

> **Note:** Custom tabs are available in Government Community Cloud (GCC), GCC High, Department of Defense (DoD), and Teams operated by 21Vianet.

### Types of Tabs
1. **Static Tabs**: Accessible to a single user, pinned to the left navigation bar.
2. **Configurable Tabs**: Can deliver content to channels and group chats, promoting collaborative environments.

### Context Scope
- **Personal**: Targets individual users.
- **Group Chats/Channels**: Acts as additional app components.
- **Meetings**: Functions similarly to apps, with the capability for pre-pinning by IT admins.

### Example Use Cases
- **Personal Scope**
    - Teams Desktop: Visual integration on individual screens.
    - Teams Mobile: Relevant context for mobile accessibility.

- **Channel**
    - Integration within both desktop and mobile environments.

- **Meeting**
    - Configurable and interactive in desktop and mobile scenarios.

### Tab Features

- **Pinnable**: Easily includes static tabs from the tab icon and can be removed or changed.
- **Unified Experience**: Single configuration works across personal and group contexts.
- **Configuration Options**: Default URL configurations in the tab instance can be modified.

### Benefits of Tabs
- Allow for centralized access to specific web content.
- Use bots for enriched user interaction and engagement.
- Leverage single sign-on (SSO) capabilities for secure access.
  
### Scenarios and Use Cases

- **Web Resource Integration**: Embed existing corporate websites for insight sharing.
- **Support Pages**: Enhance bots with help and informational pages.
- **Collaboration Tools**: Utilize deep linking for specific items in group tabs.
  
### Tab Implementation Guidelines

For **custom tabs**, the app manifest describes necessary URLs and respective scope needed. Deploying static tabs utilizes a `contentUrl` that establishes app content for all users. Tabs don't use native plugins due to sandbox restrictions and should present iframes for content.

For **configurable tabs**, additional setup may be needed that involves multiple teams or chats, enabling context-based configurations or modifications.

### Tools for Tab Development

- **Visual Studio Code**: Use Teams Toolkit for an enhanced setup experience.
- **Visual Studio**: Follow similar steps as Visual Studio Code for tab creation.

### Next Steps

- [Prerequisite Setup](/tabs/how-to/tab-requirements.md)

### Additional Resources

- [Design Tabs for Microsoft Teams](design/tabs.md)
- [Tab Integration on Mobile](/tabs/design/tabs-mobile.md)
- [Microsoft Teams Feature Updates](../resources/teams-updates.md)
- [Tab Device Permissions](~/sbs-tab-device-permissions.yml)

This serves as a comprehensive guide to building, integrating, and utilizing tabs within Microsoft Teams environments: whether personal, chat, or meeting-based contexts.

---

This cleaned-up content focuses on clarity, compelling presentation, and practical application, integrating feature lists, tab scopes, and setting up development environments with tools.