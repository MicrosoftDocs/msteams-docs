# Changelog (Microsoft Teams developer platform)

This changelog covers what's changed in the Microsoft Teams developer platform and documentation, including updates to the APIs as well as new features and tools available to developers.

## September 2017

| **Category** | **Description** | **Link** |
| --- | --- | --- |
| Bots | Added details about Markdown and XML formatting in messages | [Formatting text content](botsconversation.md#formatting-text-content) |
| Connectors | Added information about actionable messages and the `activityImageType` property | [Office 365 Connectors](connectors.md) |
| Bots | Moved information about messages from former "Messages, cards, and actions" topic. | [Send and receive messages](botsconversation.md) |
| Bots | Moved information about cards and card actions from former "Messages, cards, and actions" topic. | [Use cards and card actions](teams-bots-cards.md) |

## August 2017

| **Category** | **Description** | **Link** |
| --- | --- | --- |
| All | Updated table of contents (to enhance discoverability) and topic titles (to enhance search results). | All topics |
| Bots | Added new card action `messageBack`. | [Card actions](teams-bots-cards.md#card-actions) |
| Bots | Added `localTimestamp`; similar to `timestamp` but uses the sender's time zone. | [Receiving messages](botsconversation.md#receiving-messages) |
| Compose extensions | Added section on handling events, including `onQuery` and new events `onQuerySettingsUrl` and `onSettingsUpdate`. | [Add event handlers](composeextensions.md#add-event-handlers) |

## July 2017

| **Category** | **Description** | **Link** |
| --- | --- | --- |
| Bot APIs | The Fetch Roster command no longer requires tenant ID in the `X-MsTeamsTenantId` HTTP request header. New helper function in Teams extension packages. | [Fetching the team roster](botapis.md#fetching-the-team-roster) |
| Bots | Bots menus are now public. | [Add a bot menu](botmenu.md) |
| Debugging | Added a new page on debugging tools and techniques. | [Run and debug](debugging.md) |
| Samples | Added more information on running samples, and added a new sample for running new Microsoft Teams Graph APIs. | [Sample applications](samples.md) |
| Sideloading | Add updated troubleshooting guidance for errors when sideloading a package. | [Packaging and sideloading](troubleshooting.md#error-while-reading-manifestjson) |
| Tabs | Update auth breaking change, now published. | [Authenticate a user](auth.md) | 

## June 2017

| **Category** | **Description** | **Link** |
| --- | --- | --- |
| Bots | Fetch Channel API call now returning General channel ID. | [Fetching the list of channels in a team](botapis.md#fetching-the-list-of-channels-in-a-team) |
| Bots | Added note on creating a deep link to launch a bot in 1:1 chat. | [Adding a bot for 1:1 chat only](botsadd.md#adding-a-bot-for-11-chat-only) |
| Compose extensions | Updated supported layout types. | [Compose extensions](composeextensions.md) |
| Compose extensions | Update to call out that only one command is supported currently. | [Compose extensions](composeextensions.md) |
| Packaging | Removed 2-KB limit on icon sizes that prevented sideloading&mdash;no restrictions on size now. | [Icons](createpackage.md#icons) |
| Packaging | Changed recommendation to use a Microsoft app ID as the main manifest ID. | [Schema](schema.md#id) |
| Submission | Clarified Dev Center/Seller Dashboard account requirements. | [Register as an app developer](submission.md#register-as-an-app-developer) |
| Tabs | Update on breaking change in tab authentication implementation. | [Authenticate a user](auth.md) |
