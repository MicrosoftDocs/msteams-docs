---
title: Tab features
author: surbhigupta
description: Learn about tab features
ms.localizationpriority: high
ms.topic: quickstart
ms.date: 01/03/2025
---

# Teams tab app features

## Developer experience for building a Teams tab app

Step-by-step to a Dev’s progress in building a Teams tab app and important information they may need:

:::image type="content" source="../../assets/images/tab-images/tab-progress-1.png" alt-text="tab-progress-1":::

:::image type="content" source="../../assets/images/tab-images/tab-progress-2.png" alt-text="tab progress 2":::

<!--
1. Understand key concepts and prerequisites:
    - Introduction to Tabs, authentication and permissions for access to Graph APIs, and User authentication with AAD.
2. Set up Environment:
    - M365 Dev account
    - AAD app
    - TTK for VSC: Install TTK and set up project using the toolkit
3. Create a basic tab app [Add link to how-to guide]
4. Set up Web app
    - Set up SPA or HTML content of the tab
    - Design for desktop and mobile
    - Use support for Adaptor Card, deep links, and more to structure content, format, navigation in the app
5. Configure app in Teams using app manifest
    - Define tab ID, scope, and website and content URLs
    - Example of app manifest code snippet
6. Add authentication (optional step)
    - Cross-link to authentication module
    - Code snippet or examples, if and as needed
7. Add support for building tabs for Teams Meetings
    - Cross-link to Build tabs for meetings page
    - Code snippet or examples, if and as needed
8. Test and debug app
9. Publish app
-->

### Information required during app building

1. AAD registration
2. Teams app manifest understanding
3. Teams APIs: Teams specific APIs (JS SDK, Graph APIs)
4. Authentication types/methods
5. Dev tools such as VSC and TTK
6. Web app development for desktop, mobile
7. Debugging tools

## Features and benefits of Teams tab app

A tab is a specific area in a channel or chat that displays content or functionality from an integrated app or website. These apps can be either built-in apps (like Planner, SharePoint, or Excel) or custom apps created by your organization or third-party developers.

Teams tabs offer several key features that help enhance collaboration and productivity:

- **Embedded web content**: With custom tabs, organizations can embed their own web content, applications, or dashboards directly into Teams.
- **Single app tab limit**: In channels or meetings, you can pin only one instance of an app per tab. For example, a YouTube tab can only be pinned once per meeting, ensuring a clean and focused experience.
- **Pre-pinned tabs**: IT admins can pre-pin tabs in meetings or channels, ensuring that necessary tools and resources are easily accessible to users.
- **Adaptive and responsive**: Tabs are designed to adapt to the user’s environment, ensuring content fits seamlessly into the Teams experience.
- **Collaboration**: Reuse of SharePoint web parts within the tab.
- **Multi-capability apps**: If a tab is added to an app that also has a bot, the bot is also added to the team.
- **Locale awareness**: The users can indicate language that is `en-us`.
- **Deep links**:
  - Ability to use bots or app notifications to deep link to the tab or to a sub-entity within the service, for example an individual work item.
  - The ability to open a modal dialog from links within a tab.
- **Authentication**:
  - Single sign-on (SSO) capability, if supported.
  - Awareness of Microsoft Entra ID of the current user.

Using tab apps in Teams has the following benefits:

- **Streamlined Workflows**: Keep all your important tools and content in one place, so you don't have to switch between apps.
- **Improved Collaboration**: Receive live updates, chat integration, and shared data, all within Teams.
- **Customization**: Design custom tabs to fit your business needs, embedding both internal tools and third-party services.
- **Consistency Across Platforms**: Access tabs across Teams, Outlook, and Microsoft 365 for a seamless experience.

By building a Teams tab app, you can:

- Integrate your tab app with advanced features
- Enable your app to reach a vast user base and enhance app visibility
- Enhance user engagement and productivity

| # | To ... | Try ... | Here's how |
| --- | --- | --- | --- |
| 1. | Customize UI (Tab as a web app): The tab hosts a web app that is fully customizable with HTML, CSS, and JS. | Pin only one tab per application to the left pane for convenient access within chats, channels, or meetings, as tabs function similarly to applications. | [Link to relevant section and API] |
| 2. | Build access to Teams context - Teams tab can access the current context of the team, channel, and user information. | Use context-specific data to build personalized and relevant UX. For example, display team or channel-specific data. | [Link to relevant section and API] |
| 3. | Pin or share a tab for easier access - A user can pin a tab app to left-hand navigation or add it to individual channel or chat. | Pin a tab to provide easy access to the app and improve workflow efficiency. Make the app available for day-to-day access. | [Link to relevant section and API] |
| 4. | Build support for Adaptive Card and provide UI capability - embed content using AC, etc. | Use Adaptive Cards to provide a flexible way to show dynamic data such as notifications or forms.  It can show relevant and updated information and user interaction. | [Link to relevant section and API] |
| 5. | Build authentication to protect user data and help user access | Tabs can use AAD for authentication (SSO, OAuth, and more) | [Link to relevant section and API] |
| 6. | Ensure data is shared securely with permission control, and prevent security risks. | App permissions and access resources like SharePoint, Graph APIs, etc. | [Link to relevant section and API] |
| 7. | Build collaboration and integration so users can use multiple tools or datasets without having to switch between apps. | Multi-tab support for collaboration with web app or content | [Link to relevant section and API] |
| 8. | Create custom apps for desktop and mobile devices, adjust UI, and have flexible UX for all environment, and provide remote access | Mobile support | [Link to relevant section and API] |
| 9. | Provide latest info to the user. Beneficial in scenarios where data monitoring or timely update is required. | Integration with real-time data from backend servers or databases directly into tabs | [Link to relevant section and API] |
| 10. | Easy navigation for enhanced UX, reduce search time, improve collaboration and communication | Support for deep linking – Devs can add deep links to open specific tabs | [Link to relevant section and API] |
| 11. | Streamline communication, all interaction in one consolidated place | Collaboration workflow - @mentions, notifications, comments, and more. | [Link to relevant section and API] |
| 12. | Build support for meetings and calls in tab apps | Tabs for Teams meeting | [Link to relevant section and API] |

## See also

## Next step
