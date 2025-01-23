# Microsoft Teams Tabs

Tabs are client-aware webpages embedded within Microsoft Teams, Outlook, and Microsoft 365. Implemented as simple HTML `<iframe/>` tags, they point to specified domains in the app manifest and can be added to a team channel, group chat, or personal app for individual users. Tabs enable the embedding of custom web content or the addition of Teams-specific functionality to existing web content.

## Types of Tabs

- **Static Tabs:** Offered to individual users for personal access and can be placed in various contexts like group chats, channels, or meetings.
- **Configurable Tabs:** Allow integration with team channels and chat groups, which necessitates configuration by users.

## Scopes

- **Personal**
- **Group Chat**
- **Teams**

## Benefits of Static Tabs

- **Pinnable and Instant:** Easily pinned or unpinned, omitting the need for a configuration dialog, functioning similarly to apps.
- **Unified Experience:** Create one static tab that operates across personal, group, and meeting contexts.
- **Flexible Configuration:** Users can modify the content URL post-pinning.

## Use Cases and Scenarios

- **Enhancing Resource Accessibility:** Integrate an existing corporate website as a static tab for easy user access.
- **Adding Support Pages:** Use static tabs to include pages such as "About" and "Help" in Teams bots or messaging extensions.
- **Collaborative Engagement:** Develop a channel or group tab enabling deep links to specific items for shared dialogue and collaboration.

## Declaring a Custom Tab

- Define URLs and scopes for webpages in your app manifest.
- Use the Teams JavaScript client library to enhance pages with Teams-specific functionality.
- Implement `<iframe>` HTML content pages for web embedding.

## Real-world Application Examples

### Personal Tabs

Integrate web-based resources, like internal tools or dashboards, within an employee's personal app space.

### Channel Tabs

Offer collaborative project tools accessible by teams to manage tasks collectively.

### Meeting Tabs

Embed business partnerships or presentations directly into meeting contexts, enriching the collaborative environment.

## Relevant Tools

- **Teams Toolkit for Visual Studio Code:** Simplifies development within Visual Studio Code.
- **Teams Toolkit for Visual Studio:** Focused on the Teams app integration within Visual Studio.

## Additional Features and Capabilities

- **Integration with Bots:** Tabs can be linked to existing bot functionalities.
- **Awareness Features:** Access Microsoft Entra ID, locale, and support for SSO when applicable.
- **Deep Linking and Modal Dialogs:** Deep link capabilities and modal dialog access from within tabs.

## Next Steps and Recommendations

- Familiarize yourself with [tab prerequisites](~/tabs/how-to/tab-requirements.md) and other essential resources for a deeper understanding.
- Explore additional examples to design and extend your tabs efficiently using [Microsoft Teams design guides](design/tabs.md) and other extension capabilities like Microsoft Graph.

Utilize these guidelines and examples to effectively integrate and harness the potential of tabs within Microsoft Teams, ensuring an enriched and cohesive user experience.