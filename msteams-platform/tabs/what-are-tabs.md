## Microsoft Teams Tabs

Tabs are client-aware webpages embedded in Microsoft Teams, Outlook, and Microsoft 365. They use simple HTML `<iframe/>` tags that point to domains declared in the app manifest. Tabs can be added as part of a:

- **Channel** inside a team
- **Group chat**
- **Personal app** for an individual user

You can include custom tabs with your app to embed your web content in Teams or add Teams-specific functionality to your web content.

For more information, refer to the [Teams JavaScript client library](https://docs.microsoft.com/javascript/api/overview/msteams-client#microsoft-teams-javascript-client-library).

### Important Considerations:

- Custom tabs are available in Government Community Cloud (GCC), GCC High, Department of Defense (DoD), and Teams operated by 21Vianet.

## Types of Tabs

1. **Static Tabs:** Fixed tabs available in any scope.
2. **Configurable Tabs:** Can be customized per channel, group chat, or meeting.

### Tab Scopes

- **Personal Scope:** Static tabs are pinned for individual users. You can extend them to group chats, channels, or meetings for customization.
- **Group Chat and Channel Scope:** Acts like apps; only one tab per app can be pinned.

### Visual Examples in Teams

1. **Personal Tabs**
   - On desktop and mobile
   - Screenshots available for reference

2. **Channel Tabs**
   - On desktop and mobile
   - Screenshots available for reference

3. **Meeting Tabs**
   - On desktop and mobile
   - Screenshots available for reference

### Benefits of Static Tabs

- **Pinnable and Instant:** Add tabs using the `+` icon without needing configuration dialogs.
- **Unified Experience:** One tab for personal and group scopes.
- **Optional Configuration:** Modify the `contentUrl` property post-installation.

## Choosing the Right Tab for Your App

| Feature | Personal | Channel | Group Chat | Meetings |
|---------|----------|---------|------------|----------|
| Static Tabs | ✔️ | ✔️ | ✔️ | ✔️ |
| Configurable Tabs | ❌ | ✔️ | ✔️ | ✔️ |

> Note: Both configurable and static tabs in your app manifest default to static.

## Creating Tabs

You can create a content page as part of any tab or dialog in Teams. Consider:

- Providing reconfiguration options.
- Testing on both Android and iOS.
- Fetching context, locale, and theme data for the tab.

## Tab Features

- Bots are added to the team if included.
- Awareness of Microsoft Entra ID and user locale.
- Single sign-on potential.
- Ability to open modal dialogs and deep link from bots.

## User Scenarios

1. **Scenario:** Bringing existing web resources into Teams, e.g., a company's website.
2. **Scenario:** Add support pages to a Teams bot or extension.
3. **Scenario:** Provide access for collaboration in items users often interact with.

## Custom Tab Declaration in the App Manifest

Define a custom tab by specifying a URL and scope. Use the [Teams JavaScript client library](https://docs.microsoft.com/javascript/api/overview/msteams-client) and call `microsoftTeams.initialize()` for Teams-specific information.

### Tools for Building Tabs

- [Teams Toolkit for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension)
- [Teams Toolkit for Visual Studio](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension)

## Next Steps

- [Prerequisites](https://docs.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/tab-requirements)

## Additional Resources

- [Design Tabs for Microsoft Teams](https://docs.microsoft.com/en-us/microsoftteams/platform/design/designing-tabs)
- [Tabs on Mobile](https://docs.microsoft.com/en-us/microsoftteams/platform/design/tabs-mobile)
- [Extend Tab App with Graph API](https://docs.microsoft.com/en-us/microsoftteams/platform/m365-apps/extend-tab-api)
- [Grant Tab Device Permission](https://docs.microsoft.com/en-us/microsoftteams/platform/sbs/sbs-tab-device)