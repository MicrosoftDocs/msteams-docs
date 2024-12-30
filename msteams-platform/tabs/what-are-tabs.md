# Microsoft Teams Tabs

## Overview

Tabs in Microsoft Teams are client-aware webpages that integrate Teams-specific functionality and display domains declared in the app manifest. Tabs are offered within channels, group chats, or as personal apps, supporting both static and configurable tabs. Static tabs are primarily for personal use, while configurable tabs adapt to group contexts, such as channels or meetings.

## Types of Tabs

1. **Static Tabs:** 
   - Designated for personal use and visible in the left navigation.
   - Can extend to group chats, channels, or meetings.

2. **Configurable Tabs:**
   - Allow configuration during installation, making them versatile for group and meeting uses.
   - Offer extended configuration capabilities for collaborative spaces.

## Tab Scopes

- **Personal:** Single user with pinned access.
- **Group Chat:** Collaborative context within a private chat.
- **Teams:** Environments where group work takes place.

### Benefits of Using Tabs

- **Pinnable and Instant:** Easily pin tabs without mandatory setup.
- **Unified Integration:** Single tabs function across various scopes.
- **Optional Configuration:** Customize the default URL for diverse needs.

## Creating and Managing Tabs

Tabs can be integrated and managed using:

- **App Manifest:** Basic tab declaration with URL and scope.
- **JavaScript Client Library:** Access Teams information like themes.
- **Configuration Pages:** Allow dynamic input for individual instances.

## Development Tools

- **Teams Toolkit for Visual Studio Code**: Simplifies app creation.
- **Development Tunnels**: For local bot integration and testing.

## Tab Features

- **Integration with Bots:** Seamlessly add bots alongside tabs.
- **User Awareness:** Recognize user identity and locale.
- **Single Sign-On:** For eligible applications.
- **Deep Linking Capabilities:** Direct users to specific content.

## Scenarios and Use Cases

- **Corporate Websites:** Present company information via static tabs.
- **Support Pages:** Add assistance directly in messaging extensions or attached to bots.
- **Collaborative Spaces:** Deep link group tabs for easy access to shared resources.

Ensure tabs are optimized for both desktop and mobile clients. Review the tab's contextual behavior and leverage bot integration for advanced features.

## Next Steps

- **Develop Your First Tab:** Explore required tools and configurations.
- **Explore Microsoft Graph Permissions:** Extend tabs with additional capabilities.

## Additional Resources

- [Designing Tabs](design/tabs.md)
- [Extending App Capabilities](how-to/authentication/tab-sso-graph-api.md)
- [Mobile Optimization](design/tabs-mobile.md#tabs-on-mobile)

Understand how tabs enhance productivity by encapsulating essential information and collaborative tools within the Teams environment, facilitating a seamless blending of web resources and interactive elements. Explore the possibilities to create powerful applications that enhance user engagement and workflow within Microsoft Teams.