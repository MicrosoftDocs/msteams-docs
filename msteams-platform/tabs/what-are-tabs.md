# Overview of Microsoft Teams Tabs

Tabs are webpages embedded in Microsoft Teams, Outlook, and Microsoft 365, allowing you to integrate custom or existing web content directly into Teams. By leveraging simple HTML `<iframe/>` elements, these tabs are defined within your app’s manifest and can be included in channels, group chats, or personal apps. Tabs enhance functionality by bringing web-based resources into the Teams environment.

> [!IMPORTANT]
> Custom tabs are supported in Government Community Cloud (GCC), GCC-High, and Department of Defense (DOD).

## Types of Tabs

There are two primary types of tabs: **Static Tabs** and **Configurable Tabs**. They can function across various scopes: `personal`, `groupchat`, and `teams`.

### Static Tabs

Available across personal, channel, or group chat contexts, static tabs allow for a unified and immediate experience. They do not require mandatory configuration, functioning like apps within Teams.

#### Key Features
- **Pinnable and Instant:** Easily pin and unpin apps without needing a configuration dialog.
- **Unified Experience:** A single static tab can cover personal, chat, channel, and meeting contexts.
- **Optional Configuration:** Adjust the `contentUrl` dynamically for customizable experiences.

### Configurable Tabs

Essential for delivering content across channels and group chats, configurable tabs help in crafting collaborative environments based on web-based content.

## Tab Benefits and Use Cases

**Benefits:**
- **Efficiency:** Static tabs streamline access and maintain a consistent user experience across multiple contexts.
- **Versatility:** Suitable for various scenarios such as sharing corporate information or providing embedded help.
- **Configurability:** Customizable URLs enhance adaptability for different user needs and scenarios.

**Use Cases:**
- Bringing existing web resources into Teams.
- Integrating support pages into a bot or messaging extension.
- Facilitating access to frequently used collaborative tools or pages.

## Creating Tabs

Tabs can be created in two main ways:

1. **Declare Custom Tab in App Manifest:** 
   - Define URLs for each webpage tab, with the required scope, in the app manifest.
   - Use the Teams JavaScript client library for features like theme recognition.

2. **Use Adaptive Cards:** 
   - Employ adaptive cards to build rich cards with interactive elements within your tab.

## Tools for Development

- **Teams Toolkit for Visual Studio Code**
- **Teams Toolkit for Visual Studio**

## Getting Started

- **Prerequisites:** Set up and familiarize yourself with Microsoft Teams client installations, NodeJS, tunneling solutions, and Microsoft Teams Developer Tools.
- **Installation:** Utilize the Teams Toolkit for a streamlined setup and launch experience.

## Operational Considerations

When building Teams apps with tabs, consider functionalities such as user localization, single sign-on capabilities, inclusion of bots, app notifications, and supporting modal dialogs. Each tab must cater to the context of both Android and iOS Teams clients.

## Next Steps

Explore the detailed guides on [designing tabs for Microsoft Teams](design/tabs.md), understanding [device capabilities](../concepts/device-capabilities/device-capabilities-overview.md), and learning about tab analytics and permissions.

By understanding and implementing Microsoft Teams tabs, you can significantly enhance your app's integration with Teams, offering users a seamless and rich experience.