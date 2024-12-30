```markdown
---
title: Microsoft Teams Tabs
author: Surbhi Gupta
description: Learn to build tabs, embedded webpages for Microsoft Teams. Create a content page as a personal, channel, or group tab.
ms.localizationpriority: high
ms.topic: overview
ms.date: 05/04/2023
---

# Microsoft Teams Tabs Overview

Tabs in Microsoft Teams are web pages embedded within the Teams environment. They serve as interfaces to display web content and add functionality directly to Teams. Depending on how you want to deploy them, they can be set as part of a channel, a group chat, or as a personal app for individual users.

## Key Features of Tabs

- **Scope Flexibility:** Tabs can be static or configurable and used across different contexts such as personal, group chat, or team channels.
- **Custom Domain:** They require specifying domains in the app manifest since they're presented in `<iframe/>` elements.
- **Government Availability:** Accessible in Government Community Cloud (GCC), GCC-High, and the Department of Defense (DoD) environments.

## Types of Tabs

### Static Tabs

Static tabs are set once and do not change based on user interaction, appearing as consistent web pages within Teams. These are often pinned by users for frequent access without needing any configuration dialogs.

### Configurable Tabs

Configurable tabs adapt to user demands and contexts, allowing for unique configurations when added to channels or chats. They offer a personalized user experience through configuration pages.

## Use Cases

1. **Integrate Corporate Websites:**
   - Use static tabs to showcase existing web resources such as your corporate homepage within Teams for easy access by employees.

2. **Support and Information Access:**
   - Provide quick access to support documentation or FAQ pages within Teams, allowing users to find help without leaving the app.

3. **Collaboration Enhancement:**
   - Develop collaborative web-based tools that can be deployed as tabs in team channels, integrating directly into the workflow of your users.

## Creating Tabs

### Basics

1. **Declare in Manifest:**
   - Specify each tab's URL and scope within your app's manifest file. Use scripts like `microsoftTeams.initialize()` to make pages Teams-responsive.

2. **Use JavaScript Libraries:**
   - The [Teams JavaScript client library](https://learn.microsoft.com/javascript/api/overview/msteams-client) assists in providing tab functionality within the Teams infrastructure.

For each tab, your app might need a [content page](https://learn.microsoft.com/microsoftteams/platform/tabs/how-to/create-tab-pages/content-page) and optionally a [configuration page](https://learn.microsoft.com/microsoftteams/platform/tabs/how-to/create-tab-pages/configuration-page) to tailor the content.

3. **Ensure Mobile Compatibility:**
   - Test tabs on both Android and iOS versions of Teams to ensure a consistent user experience.

## FAQ

### Can I Move the Tabs' Position?

No, positions for **Posts** and **Files** in Teams cannot be moved.

### How Do I Test My App?

Consider testing apps on both desktop and mobile clients of Microsoft Teams to ensure compatibility.

### Do I Need Extra Tools to Build Tabs?

While not necessary, tools like the [Teams Toolkit for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) facilitate the process.

## Additional Resources

- [Teams Tab Design Guide](https://learn.microsoft.com/microsoftteams/platform/tabs/design/tabs)
- [Enable Tab SSO with Graph API](https://learn.microsoft.com/microsoftteams/platform/tabs/how-to/authentication/tab-sso-graph-api)
- [Deep Linking to Tabs](https://learn.microsoft.com/microsoftteams/platform/tabs/how-to/access-teams-context)

---

For further insights into app development for Teams, check out the possible use cases and scenarios available on the [Teams Developer Platform](https://developer.microsoft.com/en-us/microsoft-teams).
```