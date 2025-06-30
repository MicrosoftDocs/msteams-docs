| App type | TeamsJS version | App manifest version | Next steps|
|---|---|---|---|
|**Teams apps extended across Outlook and Microsoft 365**| TeamsJS v2.19.0 or later | v1.13 or later | [Extend a Teams app to run across Microsoft 365](../m365-apps/extend-m365-teams-personal-tab.md) or [Create a new Microsoft 365 app](../m365-apps/extend-m365-teams-personal-tab.md#quickstart) |
|**Existing Teams-only apps**| Update to TeamsJS v2.19.0 or later*  | v1.12 or later** | [Understand TeamsJS backwards compatibility](../tabs/how-to/using-teams-client-library.md#backwards-compatibility) and [Update to TeamsJS v2.0](../tabs/how-to/using-teams-client-library.md#updating-to-teamsjs-version-20)|
|**New Teams-only apps**| TeamsJS v2.19.0 or later | v1.12 or later** | [Create a new Teams app using Microsoft 365 Agents Toolkit](../toolkit/create-new-project.md)|

**Use the latest TeamsJS to take advantage of the latest improvements and new feature support including Teams-only apps. No new features or improvements will be added to TeamsJS v1.13.0. New app submissions and updates now require TeamsJS v2.19.0 or later. For more information, see [TeamsJS library](../tabs/how-to/using-teams-client-library.md).*

***When upgrading your Teams personal tab or message extension app to manifest version 1.13 or later, it becomes available across Microsoft 365 hosts by default. To avoid partial loading in unsupported hosts and ensure a consistent user experience, define runtime requirements in the manifest to control where and how your app appears. For more information, see [Specify Microsoft 365 host runtime requirements in app manifest](../m365-apps/specify-runtime-requirements.md).*
