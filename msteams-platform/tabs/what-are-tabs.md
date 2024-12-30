### Updated Markdown Documentation

---

# Microsoft Teams Tabs Development Guide

## Overview

Microsoft Teams tabs are client-aware webpages embedded securely within Teams and other Microsoft 365 products, like Outlook. They are implemented as simple HTML `<iframe/>` tags, pointing to specified domains from the app manifest. Tabs facilitate the extension of functionalities by embedding your custom web content directly into Teams, tailored for use in channels, group chats, or personal user contexts.

### Key Features of Tabs

- Embed custom web content in Teams.
- Offer a consistent web experience across Microsoft 365 apps.
- Easily integrate existing web resources into Teams.

### Availability

Custom tabs are available for Government Community Cloud (GCC), GCC-High, and the Department of Defense (DOD).

## Types of Tabs

1. **Static Tabs:** Permanent and visible in a fixed location.
2. **Configurable Tabs:** Allow setup preferences and can adapt based on context.

Tabs can scope across three main contexts:

- **Personal**: Individual user's experience.
- **Group Chat**: Collaborative group interactions.
- **Team**: Integrated within a channel for team-wide visibility.

---

## Benefits of Static Tabs

- **Pinnable and Instant:** Static tabs can be pinned, exist without configuration dialogs, and hence function akin to mini-apps.
- **Unified Experience:** Ideal for personal and group exposure, maintain consistent UX throughout.
- **Optional Configuration:** Modify default URLs post-installation for instance-specific customization.

For more detail:

- [Personal Tabs](~/tabs/how-to/create-personal-tab.md) 
- [Channel/Group Tabs](~/tabs/how-to/create-channel-group-tab.md)

![Personal Tabs Example](~/assets/images/tabs/personal-tab-configure.png)
*Teams desktop view showing a personal tab.*

![Channel Tabs Example](~/assets/images/tabs/tabs.png)
*Teams desktop view showing channel tabs.*

---

## Scenarios and Use Cases

### Common Use Case Scenarios

1. **Bringing existing resources:** Integrate a corporate website as a tab.
2. **Support Pages for Bots/Messaging Extensions:** Provide user guides/help as accessible tabs.
3. **Collaborative Workspaces:** Enable discussion and access to frequently used resources.

### Why Use Tabs?

- **Seamless Integration:** A central point for team collaboration and resource access.
- **Flexible Customization:** Adapt to user and organizational needs with ease.

---

## How Tabs Work

1. **Declare in App Manifest:** Define URLs and app scopes within the Teams application manifest.
2. **Use Adaptive Cards:** Develop interactive content lending to more dynamic user engagement.

### For Developers

- **App Manifest Configuration:** The backbone for tab functionality; carefully outline both `contentUrl` and `configurationUrl`.

- **JavaScript client library integration:** Leveraging [Teams JavaScript client library](/javascript/api/overview/msteams-client) enhances feature access, e.g., theme context.

- **Static Tabs Extension:** From personal-use overrides to adaptive group integration, explore how to leverage [Extend Static Tabs](~/tabs/how-to/create-personal-tab.md#extend-static-tabs-to-group-chat-channels-and-meetings).

## Conclusion

Effective use of Teams tabs significantly elevates the application UX by delivering tailored web content directly within Teams apps. Before deployment, ensure comprehensive testing across all platforms (Android, iOS) for optimized performance.

For detailed app setup and capabilities across Microsoft Technologies, refer to the following resources:

- [Design Your Tab](design/tabs.md)
- [Device Capabilities Overview](../concepts/device-capabilities/device-capabilities-overview.md)
- [Deep link Tabs Utilizing Bots](how-to/deep-link.md)

Unlock full potential with these integrated app features, broadening your team's digital workspace seamlessly within the Microsoft Teams ecosystem.