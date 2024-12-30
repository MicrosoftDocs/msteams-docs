# Microsoft Teams Tabs
Learn how to build tabs, which are webpages embedded in Microsoft Teams. These can be added as personal, channel, or group tabs.

## Overview

Microsoft Teams tabs provide a client-aware webpage experience embedded in Teams, Outlook, and Microsoft 365. They are essentially HTML `<iframe>` elements pointing to domains specified in your app manifest. Tabs can be integrated into team channels, group chats, or individual user apps. This allows you to embed custom web content or add Teams-specific features to your web content. See [Teams JavaScript client library](https://docs.microsoft.com/javascript/api/overview/msteams-client#microsoft-teams-javascript-client-library).

> **NOTE**: Custom tabs are available in Government Community Cloud (GCC), GCC-High, and Department of Defense (DOD).

## Types and Scopes of Tabs

Tabs come in two varieties: static and configurable. They are used across three main scopes:

- **Personal**: Static tabs appear as personal apps for individual users and can be pinned to the left navigation bar.
- **Group Chat and Teams**: Configurable tabs can be customized for specific channels or chats.

## Usage Scenarios

### Real-World Examples

- **Bringing Web Resources into Teams**: Embed a corporate website as a static tab in your Teams app.
- **Adding Support Pages**: Provide 'About' and 'Help' sections as tabs in a Teams bot or messaging extension.
- **Facilitating Collaboration**: Use a channel tab for deep linking to frequently accessed items.

## Tab Types and Usage

### Personal Tabs

These are personal apps meant for a single user's scope and are accessible on both desktop and mobile platforms.

### Channel and Group Tabs

These configurable tabs serve shared content within channels or group chats.

### Meeting Tabs

Include configurable tabs in meetings to enhance collaborative experiences.

## Tab Benefits

- **Pinnable**: Pin apps with static tabs in chats, channels, or meetings quickly and without mandatory configurations.
- **Unified Experience**: Create one static tab that operates in personal and group scopes.
- **Configurable**: Modify the default URL using the `contentUrl` property post-pinning for a tailored user experience.

## Creating Tabs

### Manifest Configuration

Use your app manifest to declare custom tabs by defining URLs and scopes. Integrate the [Teams JavaScript client library](https://docs.microsoft.com/javascript/api/overview/msteams-client) to access Teams-specific data.

### Tools

- **Visual Studio Code**: Use the Teams Toolkit for VSCode for efficient development.
- **Custom Code**: Manually configure your tabs using the app manifest to tailor your Teams app experience.

## Conclusion

Teams Tabs are a versatile way to extend functionality in Microsoft Teams, allowing for greater integration and interaction. By understanding the types and uses of tabs, alongside configuration techniques, you can enhance your Microsoft Teams applications effectively.

## Next Steps

- Familiarize yourself with the [prerequisites](https://docs.microsoft.com/).
- Design your tab to suit [various device capabilities](https://docs.microsoft.com/).

## Further Reading

Explore more with the following resources:

- [Design Your Tab for Microsoft Teams](https://docs.microsoft.com/)
- [App Capabilities](https://docs.microsoft.com/)
- [Instrumenting for Analytics](https://docs.microsoft.com/)
- [Extend Tab App with Microsoft Graph](https://docs.microsoft.com/)

These resources will provide additional guidance on implementing and optimizing Teams Tabs within your applications.