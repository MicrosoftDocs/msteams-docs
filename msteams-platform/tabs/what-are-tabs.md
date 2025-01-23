# Microsoft Teams Tabs

## Overview

Tabs in Microsoft Teams are webpages embedded within the Teams client. They can be part of:

- **Channel Tabs**: Enhance collaboration in group chats or teams.
- **Personal Tabs**: Provide personal and static content for individual users.
- **Meeting Tabs**: Display information specific to meetings.

Tabs can lessen the need to switch between different apps by centralizing functionalities within Teams.

## Types of Tabs

1. **Static Tabs**: 
    - Intended for specific, unchanging content.
    - Can be made available across personal, channel, and group chat contexts.

2. **Configurable Tabs**:
    - Allow user configuration at setup.
    - Suited for dynamic and user-specific content.

## Scenarios and Use Cases

### Real-World Scenarios

1. **Corporate Information Dashboard**:
    - Create a static channel tab displaying key company metrics from a company dashboard.

2. **Personalized Tools**:
    - Use a personal tab to offer a quick access toolkit for project management apps.

3. **Customer Support Integration**:
    - Implement configurable tabs in group chats to integrate customer service tickets and FAQs.

## Implementing Tabs

### Steps to Create a Tab

1. **Declare in App Manifest**:
    - Define a URL and scope for each tab you want to create.

2. **Content and Configuration**:
    - Develop a content page for each tab. Use the [Teams JavaScript client library](/javascript/api/overview/msteams-client) to access Teams-specific information.
    
    - Optionally, create a configuration page for customizable experiences.

3. **Test and Deploy**:
    - Make sure your tab functions smoothly across devices.
    - Deploy your tab using the Teams toolkit.

### Sample Implementation

- **Personal Tab**: Integrate with web services using static content URLs.
- **Channel Tab**: Allow configuration through query string parameters to display specific project details.

## Tools for Development

- [Teams Toolkit for Visual Studio Code](../toolkit/teams-toolkit-fundamentals.md)
- [Teams Toolkit for Visual Studio](../toolkit/toolkit-v4/teams-toolkit-fundamentals-vs.md)

## Next Steps

Explore the [prerequisites](~/tabs/how-to/tab-requirements.md) for tab creation.

## Additional Resources

- [Design tabs for Microsoft Teams](design/tabs.md)
- [Extend tabs with Microsoft Graph permissions](how-to/authentication/tab-sso-graph-api.md)
- [Microsoft Teams updates](../resources/teams-updates.md)
- [Grant tab device permission in Teams](~/sbs-tab-device-permissions.yml)

By understanding these components and scenarios, developers can effectively integrate their web content into Microsoft Teams, enhancing collaboration and productivity within their organizations.