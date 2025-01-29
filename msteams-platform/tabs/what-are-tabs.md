# Microsoft Teams Tabs Overview

Discover how to integrate tabs into Microsoft Teams, allowing the embedding of webpages that cater to teams, groups, or personal spaces.

## Types of Tabs

1. **Static Tabs**: Tabs that provide constant content, available across personal, group chat, channel, and meeting scopes.
2. **Configurable Tabs**: Customizable tabs meant for collaborative spaces, typically used in team channels and group chats.

### Usage Scenarios

- **Personal Tabs**: Web content pinned for individual users, accessible directly from the left navigation.
- **Channel/Group Chat Tabs**: Facilitate collaboration by offering shared web-based content.
- **Meeting Tabs**: Enhance meetings by embedding a single tab per app used collaboratively.

## Key Features and Benefits

- **Pinnable**: Easily pin and unpin static tabs across various contexts without a configuration dialog.
- **Unified Experience**: Designed to integrate uniformly across different scopes - personal and group.
- **Customizable URLs**: Enable personalized content by modifying `contentUrl` within Teams.

## Example Scenarios

- **Scenario:** Integrate an existing resource into Teams.
  - **Example:** Embed a corporate website within a static tab for quick access.
  
- **Scenario:** Enhance a Teams bot with support resources.
  - **Example:** Static tabs within a bot offering help and FAQ content.

- **Scenario:** Provide shared workspace tools.
  - **Example:** A channel tab linking to crucial project documents or tools.

## Implementing Custom Tabs

To add custom tabs to Teams:

1. **Define URLs and Scopes** in your app manifest.
2. **Leverage Teams JavaScript Client** to harness Teams-specific capabilities like theme awareness.
3. **Configure Tab URLs**: Set or alter tab URLs for specific deployment environments, such as channels or meetings.

> **Note**: Teams apps are sandboxed and cannot use native plugins.

## Tools and Resources

Utilize the following tools:

- **Teams Toolkit for Visual Studio Code**: Facilitates tab development within VS Code.
- **Teams Toolkit for Visual Studio**: Supports tab development in Visual Studio.

### Real-World Application

Integrate tabs in a corporate messaging system to streamline workflows, improve data sharing across collaborative tasks, and enhance user engagement via easily accessible web-based resources.

## Further Exploration

Explore more through:

- **Tab Design**: [Design your tab for Microsoft Teams](design/tabs.md)
- **Mobile Tab Usage**: [Explore mobile compatibility](design/tabs-mobile.md#tabs-on-mobile)
- **Enhanced Tab Functionality**: Learn about [extending apps with Microsoft Graph APIs](how-to/authentication/tab-sso-graph-api.md).

Enhance your understanding of integrating tabs into the Microsoft Teams environment to create more efficient and cohesive user experiences.