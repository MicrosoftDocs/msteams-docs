---
title: Tabs in Microsoft Teams
author: surbhigupta
description: Learn about types of tabs, different tab context and it's benefits, tab features and user scenarios, custom tabs, and tools used to build tabs.
ms.localizationpriority: high
ms.topic: overview
ms.date: 02/06/2025
ms.owner: ryanbliss
---

# Build tabs for Teams

Tabs are client-aware webpages embedded in Microsoft Teams, Outlook, and Microsoft 365. They use simple HTML `<iframe/>` tags that point to domains declared in the app manifest and can be added as a channel tab within a team, group chat tab, or personal tab for an individual developer. Developers include custom tabs with their app to embed web content in Teams or add Teams-specific functionality to existing web content. For more information, see [Teams JavaScript client library](/javascript/api/overview/msteams-client#microsoft-teams-javascript-client-library).

> [!IMPORTANT]
> Custom tabs are available in Government Community Cloud (GCC), GCC High, Department of Defense (DoD), and Teams operated by 21Vianet.

Developers work with two types of tabs: static and configurable. Developers use these tabs in three distinct scopes: `personal`, `groupchat`, and `teams`. [Personal (static) tabs](~/tabs/how-to/create-personal-tab.md) and personal-scoped bots form part of the personal apps that serve a single developer and remain pinned to the left navigation bar for quick access. Personal (static) tabs continue to operate the same way. However, developers now [extend static tabs](~/tabs/how-to/create-personal-tab.md#extend-static-tabs-to-group-chat-channels-and-meetings) to group chats, channels, or meetings with a [customizable experience.](~/tabs/how-to/create-personal-tab.md#customizing-your-static-tab-in-chats-or-meetings)

Tabs in chats, channels, or meetings operate more like apps, as developers can pin only one tab per app. For example, a single YouTube app tab appears in a meeting. Static tabs in meetings also support prepinned configurations by IT Admins.

The following images show tabs added in various Teams contexts:

# [Personal](#tab/personal)

**Teams desktop**

:::image type="content" source="~/assets/images/tabs/personal-tab-configure.png" alt-text=" Screenshot shows the tab added to a personal scope." lightbox="~/assets/images/tabs/personal-tab-configure.png":::

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

* **Pinnable and instant**: Developers pin apps with static tabs using the add a tab **+** icon in chats, channels, and meetings. These tabs remain unpinned and omit the mandatory configuration dialog, allowing developers to create tabs that act more like standalone apps.
* **Unified**: Developers create one static tab that operates in personal and group scopes such as chat, channel, and meeting tabs.
* **Optional configuration**: Developers change the default URL in the tab instance by updating the `contentUrl` property in the app after the tab is pinned in Teams.

[Channel or group tabs](~/tabs/how-to/create-channel-group-tab.md) (configurable tabs) deliver content to channels and group chats and create collaborative spaces around web-based content.

The following table helps developers determine the best fit for an app:

| &nbsp; | Personal | Channels | Group chat | Meetings | Calling |
| --- |:---:|:---:|:---:|:---:|:---:|
|[Static tabs](~/tabs/how-to/create-personal-tab.md)|✔️|✔️|✔️|✔️|✔️|
|[Configurable tabs](~/tabs/how-to/create-channel-group-tab.md)|❌|✔️|✔️|✔️|❌|

> [!NOTE]
> If both [configurable tab](~/tabs/how-to/create-tab-pages/configuration-page.md) and [static tab](~/tabs/how-to/create-personal-tab.md) are defined in the app manifest for a specific scope, Teams pins the static tab by default.

Developers create a [content page](~/tabs/how-to/create-tab-pages/content-page.md) as part of a personal static tab, channel tab, group tab, or dialog (referred to as task module in TeamsJS v1.x). Developers also build a [configuration page](~/tabs/how-to/create-tab-pages/configuration-page.md) that enables users to configure a Microsoft Teams app. This page applies to personal, channel, or group chat tabs, messaging extensions, or connector cards for Microsoft 365 Groups. Developers permit users to reconfigure a tab after installation and [create a tab removal page](~/tabs/how-to/create-tab-pages/removal-page.md) for the app. When building a Teams app that includes a tab, developers test how the [tab functions on both the Android and iOS Teams clients](~/tabs/design/tabs-mobile.md). The tab retrieves context through basic information, locale and theme details, and an `entityId` or `subEntityId` that identifies tab content.

> [!NOTE]
> **Posts** and **Files** can't be moved from their positions.

## Tab features

The tab features include:

* Adding a tab to an app that also has a bot automatically adds the bot to the team.
* Awareness of Microsoft Entra ID for the current developer.
* Locale awareness to indicate language, such as `en-us`.
* Single sign-on (SSO) capability, if supported.
* Support for bots or app notifications to deep link to the tab or to a subentity within the service, such as an individual work item.
* The ability to open a modal dialog from links within a tab.
* Reuse of SharePoint web parts within a tab.

## Tabs user scenarios

**Scenario:** Bring an existing web-based resource inside Teams.<br>
**Example:** Developers create a static tab in the Teams app that presents informational corporate website content to users.

**Scenario:** Add support pages for a Teams bot or messaging extension.<br>
**Example:** Developers create static tabs that supply **about** and **help** webpage information to users.

**Scenario:** Provide access to items that developers and users interact with regularly for collaborative dialogue.<br>
**Example:** Developers build a channel or group tab with deep linking to individual items.

## Declare custom tab in app manifest

A custom tab declares in the app manifest of the app package. For each webpage developers include as a tab in the app, a URL and a scope define the tab. Additionally, developers add the [Teams JavaScript client library](/javascript/api/overview/msteams-client) to the page and call `microsoftTeams.initialize()` after the page loads. This call informs Teams that the app has loaded.

When exposing a tab in either the channel or group scope or the personal scope, developers present an `<iframe>` HTML [content page](~/tabs/how-to/create-tab-pages/content-page.md) in the tab. For static tabs, the content URL appears directly in the Teams [app manifest](../resources/schema/manifest-schema.md#statictabs) via the `contentUrl` property in the `staticTabs` array. The tab's content remains identical for all users.

> [!NOTE]
> Teams apps can't use native plugins because they run inside sandboxed iframes.

For channel or group tabs, developers also create an optional configuration page. The page enables developers to configure the content page URL by using URL query string parameters that load the appropriate content for the context. Because a channel or group tab installs to multiple teams or group chats, each subsequent install permits developers to tailor the experience. Adding or configuring a tab associates a URL with the tab that appears in the Teams user interface (UI). Configuring a tab simply adds more parameters to that URL. For instance, when adding the Azure Boards tab, the configuration page allows selection of the board the tab loads. The configuration page URL specifies in the `configurationUrl` property in the `configurableTabs` array in the [app manifest](../resources/schema/manifest-schema.md#configurabletabs).

For static tabs, developers pin a `contentUrl` to chat, channel, or meeting tabs. This approach skips the mandatory configuration dialog and accelerates app usage. Developers can also change the `contentUrl` at runtime to create one tab object that operates across all Teams surfaces. For more information, see [migrate your configurable tab to static tab.](~/tabs/how-to/create-channel-group-tab.md#migrate-your-configurable-tab-to-static-tab)

Developers can include multiple channel or group tabs and up to 16 static tabs per app.

## Build a tab app

Developers build a personal tab app or a configurable tab app using Microsoft 365 Agents Toolkit (previously known as Teams Toolkit) or Codespaces.

For more information, see [build your basic tab app](../get-started/build-basic-tab-app.md).

<!--
## Tools to build tabs

| &nbsp; | Install | For using... |
| --- | --- | --- |
| **Required** | &nbsp; | &nbsp; |
| &nbsp; | [Node.js](https://nodejs.org/en/download/) | Back-end JavaScript runtime environment. Use the latest v16 LTS release.|
| &nbsp; | [Microsoft Edge](https://www.microsoft.com/edge/) (recommended) or [Google Chrome](https://www.google.com/chrome/) | A browser with developer tools. |
| &nbsp; | [Visual Studio Code](https://code.visualstudio.com/download) | JavaScript, TypeScript, or SharePoint Framework (SPFx) build environments. |
| &nbsp; | [Visual Studio 2022](https://visualstudio.microsoft.com), **ASP.NET and web development** workload| .NET. Developers install the free community edition of Visual Studio 2022. |
| &nbsp; | [Git](https://git-scm.com/downloads) | Git to use the sample apps repo from GitHub. |
| &nbsp; | [Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/download-app) | Microsoft Teams to collaborate through apps for chat, meetings, or calls in one place. |
| &nbsp; | [ngrok](https://ngrok.com/download) | Ngrok is a reverse proxy software tool that creates a tunnel to the locally running web server's publicly available HTTPS endpoints. The server's web endpoints remain available during the current session. Upon shutdown or device sleep, the service stops. |
| &nbsp; | [Developer Portal for Teams](https://dev.teams.microsoft.com/) | A web-based portal to configure, manage, and distribute Teams apps to an organization or the Microsoft Teams Store. |

### Build your Teams tab
-->

Now let's build your tab. But first select the choice of tab to build:

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