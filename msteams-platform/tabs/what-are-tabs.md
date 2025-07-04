---
title: Tabs in Microsoft Teams
author: surbhigupta
description: Learn about types of tabs, different tab context and its benefits, tab features and user scenarios, custom tabs, and tools used to build tabs.
ms.localizationpriority: high
ms.topic: overview
ms.date: 02/06/2025
ms.owner: ryanbliss
---

# Build tabs for Teams

Tabs are client-aware webpages embedded in Microsoft Teams, Outlook, and Microsoft 365. They are essentially simple HTML `<iframe/>` tags that point to domains declared in the app manifest and can be added as part of a channel inside a team, group chat, or personal app for an individual developer. Developers can include custom tabs in an app to embed web content in Teams or add Teams-specific functionality to that content. For more information, see [Teams JavaScript client library](/javascript/api/overview/msteams-client#microsoft-teams-javascript-client-library).

> [!IMPORTANT]
> Custom tabs are available in Government Community Cloud (GCC), GCC High, Department of Defense (DoD), and Teams operated by 21Vianet.

There are two types of tabs: static and configurable. These tabs can be utilized in three distinct scopes: `personal`, `groupchat`, and `teams`. [Personal (static) tabs](~/tabs/how-to/create-personal-tab.md), along with personal-scoped bots, are part of personal apps scoped to a single developer and pinned to the left navigation bar for easy access. Personal (static) tabs in personal scope continue to work the same way, but developers can now [extend static tabs](~/tabs/how-to/create-personal-tab.md#extend-static-tabs-to-group-chat-channels-and-meetings) to group chats, channels, or meetings with a [customizable experience](~/tabs/how-to/create-personal-tab.md#customizing-your-static-tab-in-chats-or-meetings).

Tabs in chats, channels, or meetings behave more like apps, since only one tab per app can be pinned. For example, only a single YouTube app tab can be pinned in a meeting. Static tabs in meetings can also be prepinned by IT Admins.

The following images show tabs added to different contexts in Teams:

# [Personal](#tab/personal)

**Teams desktop**

:::image type="content" source="~/assets/images/tabs/personal-tab-configure.png" alt-text="Screenshot shows the tab added to a personal scope." lightbox="~/assets/images/tabs/personal-tab-configure.png":::

**Teams mobile**

:::image type="content" source="~/assets/images/tabs/mobile-design-access-tab.png" alt-text="Example shows a mobile tab being added in a personal context." lightbox="~/assets/images/tabs/mobile-design-access-tab.png":::

# [Channel](#tab/channel)

**Teams desktop**

:::image type="content" source="~/assets/images/tabs/tabs.png" alt-text="Channel or group tabs" lightbox="~/assets/images/tabs/tabs.png":::

**Teams mobile**

:::image type="content" source="~/assets/images/tabs/mobile-design-static-tab.png" alt-text="Example shows a mobile tab being added in a channel." lightbox="~/assets/images/tabs/mobile-design-static-tab.png":::

# [Meeting](#tab/meeting)

**Teams desktop**

:::image type="content" source="~/assets/images/tabs/personal-tab-meeting.png" alt-text="Example shows a configurable tab added to a meeting." lightbox="~/assets/images/tabs/personal-tab-meeting.png":::

**Teams mobile**

:::image type="content" source="~/assets/images/tabs/mobile-personal-tab-meeting.png" alt-text="Example shows a configurable tab added to a meeting in mobile." lightbox="~/assets/images/tabs/mobile-personal-tab-meeting.png":::

---

Following are a few benefits of static tabs in chats, channels, and meetings:

* **Pinnable and instant**: Developers can pin apps with static tabs using the add a tab **+** icon in chats, channels, and meetings. These tabs can be unpinned and bypass the mandatory configuration dialog, allowing them to function more like standalone apps.
* **Unified**: A single static tab can work across multiple scopes, including personal, chat, channel, and meeting contexts.
* **Optional configuration**: Developers can update the default URL for a tab instance by changing the `contentUrl` property after the tab is pinned in Teams.

[Channel or group tabs](~/tabs/how-to/create-channel-group-tab.md), also known as configurable tabs, deliver content to channels and group chats, creating collaborative spaces around dedicated web-based content.

The following table helps determine the best fit for an app:

| &nbsp; | Personal | Channels | Group chat | Meetings | Calling |
| --- |:---:|:---:|:---:|:---:|:---:|
|[Static tabs](~/tabs/how-to/create-personal-tab.md)|✔️|✔️|✔️|✔️|✔️|
|[Configurable tabs](~/tabs/how-to/create-channel-group-tab.md)|❌|✔️|✔️|✔️|❌|

> [!NOTE]
> If both a [configurable tab](~/tabs/how-to/create-tab-pages/configuration-page.md) and a [static tab](~/tabs/how-to/create-personal-tab.md) are defined in the app manifest for a specific scope, Teams pins the static tab by default.

Developers can [create a content page](~/tabs/how-to/create-tab-pages/content-page.md) as part of a personal static tab, channel or group tab, or dialog (referred to as a task module in TeamsJS v1.x). Developers can also [create a configuration page](~/tabs/how-to/create-tab-pages/configuration-page.md) to help users configure a Teams app for personal, channel, or group chat tabs, a messaging extension, or a connector card for Microsoft 365 Groups. Additionally, it's possible to permit users to reconfigure a tab after installation and [create a tab removal page](~/tabs/how-to/create-tab-pages/removal-page.md) for the application. When building a Teams app that includes a tab, developers must test how the [tab functions on both the Android and iOS Teams clients](~/tabs/design/tabs-mobile.md). A tab must [get context](~/tabs/how-to/access-teams-context.md) by obtaining basic information, locale and theme settings, and an `entityId` or `subEntityId` that identifies the content within the tab.

> [!NOTE]
> **Posts** and **Files** can't be moved from their positions.

## Tab features

The tab features include:

* When a tab is added to an app that also includes a bot, the bot is added to the team.
* Awareness of Microsoft Entra ID for the current user.
* Locale awareness to indicate a user's language (e.g., `en-us`).
* Single sign-on (SSO) capability, if supported.
* Capability to use bots or app notifications to deep link to the tab or a sub-entity within the service, such as an individual work item.
* Ability to open a modal dialog from links within a tab.
* Reuse of SharePoint web parts within the tab.

## Tabs user scenarios

**Scenario:** Bring an existing web-based resource inside Teams.<br>
**Example:** A static tab in a Teams app presents an informational corporate website to developers.

**Scenario:** Add support pages to a Teams bot or messaging extension.<br>
**Example:** Static tabs provide **about** and **help** webpage content.

**Scenario:** Provide access to items that developers interact with regularly for cooperative dialogue and collaboration.<br>
**Example:** A channel or group tab with deep linking to individual items facilitates quick access.

## Declare custom tab in app manifest

A custom tab is declared in the app manifest of the app package. For each webpage to include as a tab, developers define a URL and a scope. Additionally, add the [Teams JavaScript client library](/javascript/api/overview/msteams-client) to the page and call `microsoftTeams.initialize()` after the page loads. This call informs Teams that the app has loaded.

Whether developers choose to expose a tab within channel/group or personal scope, the app must present an <iframe> HTML [content page](~/tabs/how-to/create-tab-pages/content-page.md) in the tab. For static tabs, the content URL is set directly in the Teams [app manifest](../resources/schema/manifest-schema.md#statictabs) using the `contentUrl` property within the `staticTabs` array. The tab's content remains the same for all developers.

> [!NOTE]
> Teams apps can't use native plugins because they run inside sandboxed iframes.

For channel or group tabs, developers can also create an additional configuration page. This page enables configuration of the content page URL, typically by using URL query string parameters to load the relevant content based on context. This is useful because a channel or group tab can be added to multiple teams or group chats. Every subsequent install lets developers configure the tab, tailoring the experience as needed. When configuring a tab, a URL with additional parameters is presented in the Teams user interface (UI). For instance, when adding the Azure Boards tab, the configuration page allows selection of the board to load. The configuration page URL is specified by the `configurationUrl` property in the `configurableTabs` array within the [app manifest](../resources/schema/manifest-schema.md#configurabletabs).

Static tabs can also be pinned to chat, channel, or meeting scopes by specifying a `contentUrl`. This approach bypasses the mandatory configuration dialog, enabling developers to deliver the experience quickly. The `contentUrl` can be updated at runtime, allowing a single tab object to function across all Teams surface areas. For more information, see [migrate your configurable tab to static tab](~/tabs/how-to/create-channel-group-tab.md#migrate-your-configurable-tab-to-static-tab).

Developers can include multiple channel or group tabs, and each app can include up to 16 static tabs.

## Build a tab app

Developers can build either a personal tab app or a configurable tab app using Microsoft 365 Agents Toolkit (previously known as Teams Toolkit) or Codespaces.

For more information, see [build your basic tab app](../get-started/build-basic-tab-app.md).

<!--
## Tools to build tabs

| &nbsp; | Install | For using... |
| --- | --- | --- |
| **Required** | &nbsp; | &nbsp; |
| &nbsp; | [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. Use the latest v16 LTS release.|
| &nbsp; | [Microsoft Edge](https://www.microsoft.com/edge/) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |
| &nbsp; | [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or SharePoint Framework (SPFx) build environments. |
| &nbsp; | [Visual Studio 2022](https://visualstudio.microsoft.com), **ASP.NET and web development** workload| .NET. You can install the free community edition of Visual Studio 2022. |
| &nbsp; | [Git](https://git-scm.com/downloads) | Git to use the sample apps repo from GitHub. |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/download-app) | Microsoft Teams to collaborate with everyone you work with through apps for chat, meetings, call - all in one place. |
| &nbsp; | [ngrok](https://ngrok.com/download) | Ngrok is a reverse proxy software tool. Ngrok creates a tunnel to your locally running web server's publicly available HTTPS endpoints. Your server's web endpoints are available during the current session on your computer. When you shut down or put your device to sleep, the service is no longer available. |
| &nbsp; | [Developer Portal for Teams](https://dev.teams.microsoft.com/) | Web-based portal to configure, manage, and distribute your Teams app including to your organization or the Microsoft Teams Store. |

### Build your Teams tab
-->

Now let's build a tab. But first, select the choice of tab to build:

> [!div class="nextstepaction"]
> [Build a personal tab](~/tabs/how-to/create-personal-tab.md)
> [!div class="nextstepaction"]
> [Build a channel or group tab](~/tabs/how-to/create-channel-group-tab.md)

## Next step

> [!div class="nextstepaction"]
> [Prerequisites](~/tabs/how-to/tab-requirements.md)

## See also

* [Design your tab for Microsoft Teams](design/tabs.md)
* [Tabs on mobile](design/tabs-mobile.md#tabs-on-mobile)
* [Extend tab app with Microsoft Graph permissions and scopes](how-to/authentication/tab-sso-graph-api.md)
* [Microsoft Teams updates](../resources/teams-updates.md)
* [Grant tab device permission in Teams](~/sbs-tab-device-permissions.yml)
* [Agents Toolkit for Visual Studio Code](../toolkit/agents-toolkit-fundamentals.md)
* [Agents Toolkit for Visual Studio](../toolkit/visual-studio-overview.md)