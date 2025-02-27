---
title: Tabs in Microsoft Teams
author: surbhigupta
description: Learn about types of tabs, different tab context and it's benefits, tab features and user scenarios, custom tabs, and tools used to build tabs.
ms.localizationpriority: high
ms.topic: overview
ms.date: 02/06/2025
---

# Build tabs for Teams

| - Introduce tab apps in Team

    | - Key features/benefits and scopes
    | - Usage of tab apps
    | - Examples/scenarios of tab apps

| - How APIs and SDKs work together

    | - Introduce the SDKs
    | - Add example

| - Types of tab apps

    | - Examples of tab apps
----

The Teams Tab App lets developers embed web content right into Microsoft Teams, making it interactive. Tabs are HTML elements pointing to external sites, and you can add them to channels, group chats, or personal apps. This means you can show custom web apps or content directly in Teams, boosting productivity and collaboration.

Tabs are great for embedding tools, services, or dashboards, so users don't have to leave Teams to access external content. Here’s a breakdown of how the various applications of Microsoft Teams tab apps can be used:

* Enhance collaboration
* Access web apps and content
* Tab customization
* Real-time collaboration

Examples of Tab Apps:

* Planner: Add a Planner tab to manage tasks and projects.
* Power BI: Embed a Power BI report or dashboard for easy access to analytics.
* Trello: Bring your Trello boards into Teams for seamless project management.
* OneNote: Create a shared space for notes within the team.

## Features and benefits of Teams tab app

Teams tabs offer several key features that help enhance collaboration and productivity:

* Embedded web content: With custom tabs, organizations can embed their own web content, applications, or dashboards directly into Teams.
* Single app tab limit: In channels or meetings, you can pin only one instance of an app per tab. For example, a YouTube tab can only be pinned once per meeting, ensuring a clean and focused experience.
* Pre-pinned tabs: IT admins can pre-pin tabs in meetings or channels, ensuring that necessary tools and resources are easily accessible to users.
* Adaptive and responsive: Tabs are designed to adapt to the user’s environment, ensuring content fits seamlessly into the Teams experience.
* Collaboration: Reuse of SharePoint web parts within the tab.
* Multi-capability apps: If a tab is added to an app that also has a bot, the bot is also added to the team.
* Locale awareness: The users can indicate language that is `en-us`.
* Deep links:
  * Ability to use bots or app notifications to deep link to the tab or to a sub-entity within the service, for example an individual work item.
  * The ability to open a modal dialog from links within a tab.
* Authentication:
  * Single sign-on (SSO) capability, if supported.
  * Awareness of Microsoft Entra ID of the current user.

Using tab apps in Teams has the following benefits:

* **Streamlined Workflows**: Keep all your important tools and content in one place, so you don't have to switch between apps.
* **Improved Collaboration**: Receive live updates, chat integration, and shared data, all within Teams.
* **Customization**: Design custom tabs to fit your business needs, embedding both internal tools and third-party services.
* **Consistency Across Platforms**: Access tabs across Teams, Outlook, and Microsoft 365 for a seamless experience.

## Types and scope of Teams tab app

There are two main types of tabs you can use:

* Static Tabs: These show fixed content, perfect for dashboards, reports, or documents. They can be added in:
  * **Personal Scope**: For individual users, pinned to the left navigation bar.
  * **Group Chat, Channel, or Meeting Scope**: For group chats, channels, or meetings, extending the same user experience for collaboration.
* **Configurable Tabs**: These adjust content based on user input or settings, ideal for apps like project management tools or customer service applications.

These tabs in Teams can be used in three scopes:

* **Personal**: Scoped to individual users, usually pinned to the left navigation bar.
* **Group Chat**: Behave like apps and can be pinned to each chat.
* **Teams**: Serve a similar function as apps in team channels, with one instance per app.

Static tabs in meetings can also be pre-pinned by IT admins for a consistent experience.

The following table helps you determine the best fit for your app:

| &nbsp; | Personal | Channels | Group chat | Meetings | Calling |
|---|---|---|
|[Static tabs](~/tabs/how-to/create-personal-tab.md)|✔️|✔️|✔️|✔️| ✔️ |
|[Configurable tabs](~/tabs/how-to/create-channel-group-tab.md)|❌|✔️|✔️|✔️| ❌ |

## User scenarios

**Scenario:** Bring an existing web-based resource inside Teams.<br>
**Example:** You create a static tab in your Teams app that presents an informational corporate website to users.

**Scenario:** Add support pages to a Teams bot or messaging extension.<br>
**Example:** You create static tabs that provide **about** and **help** webpage content to users.

**Scenario:** Provide access to items that your users interact with regularly for cooperative dialogue and collaboration.<br>
**Example:** You create a channel or group tab with deep linking to individual items.

**Scenario 1**: A project manager needs to track the progress of multiple ongoing projects and collaborate with her team in real-time:

* Monitor progress
* Manage dashboard
* Add, remove, assign tasks to the team
* View project timeline, and deadline

Teams tab app solution: You create a dashboard tab app so that the manager can do all the tasks in one app without having to switch between multiple apps

**Scenario 2**: A manager needs to review and approve leave requests:

* Leave management
* Calendar with leaves for employees, and approve or reject status
* Leave types available
* Messages or notification for leaves or approvals

Teams tab app solution: You create a channel or group tab to enable management of team leaves, streamline approval process, and maintain communication in real time.

## Declare custom tab in app manifest

A custom tab is declared in the app manifest of your app package. For each webpage you want included as a tab in your app, you define a URL and a scope. Additionally, add the [Teams JavaScript client library](/javascript/api/overview/msteams-client) to your page, and call `microsoftTeams.initialize()` after your page loads. This informs Teams that your app has loaded.

Whether you choose to expose your tab within the channel or group, or personal scope, you must present an <iframe\> HTML [content page](~/tabs/how-to/create-tab-pages/content-page.md) in your tab. For static tabs, the content URL is set directly in your Teams [app manifest](../resources/schema/manifest-schema.md#statictabs) by the `contentUrl` property in the `staticTabs` array. Your tab's content is the same for all users.

> [!NOTE]
> Teams apps can't use native plugins because they run inside sandboxed iframes.

For channel or group tabs, you can also create an extra configuration page. This page allows you to configure content page URL, typically by using URL query string parameters to load the appropriate content for that context. This is because your channel or group tab can be added to multiple teams or group chats. On each subsequent install, your users can configure the tab, allowing you to tailor the experience as required. When users add or configure a tab, a URL is associated with the tab that is presented in the Teams user interface (UI). Configuring a tab simply adds more parameters to that URL. For example, when you add the Azure Boards tab, the configuration page allows you to choose, which board the tab loads. The configuration page URL is specified by the `configurationUrl` property in the `configurableTabs` array in your [app manifest](../resources/schema/manifest-schema.md#configurabletabs).

For static tabs, you can pin a `contentUrl` to chat, channel, or meeting tabs. This allows you to skip the mandatory configuration dialog and get your users to use the app faster. You can also change the `contentUrl` at runtime. This allows you to build one tab object that works in all surface areas of Teams. For more information, see [migrate your configurable tab to static tab.](~/tabs/how-to/create-channel-group-tab.md#migrate-your-configurable-tab-to-static-tab)

You can have multiple channels or group tabs, and up to 16 static tabs per app.

<!--
Tabs are client-aware webpages embedded in Microsoft Teams, Outlook, and Microsoft 365. They're simple HTML `<iframe/>` tags that point to domains declared in the app manifest and can be added as part of a channel inside a team, group chat, or personal app for an individual user. You can include custom tabs with your app to embed your own web content in Teams or add Teams-specific functionality to your web content. For more information, see [Teams JavaScript client library](/javascript/api/overview/msteams-client#microsoft-teams-javascript-client-library).

> [!IMPORTANT]
> Custom tabs are available in Government Community Cloud (GCC), GCC High, Department of Defense (DoD), and Teams operated by 21Vianet.

There are two types of tabs, static and configurable tabs. These tabs can be utilized in three distinct scopes: `personal`, `groupchat`, and `teams`. [Personal (static) tabs](~/tabs/how-to/create-personal-tab.md), along with personal-scoped bots, are part of the personal apps that are scoped to a single user and pinned to the left navigation bar for easy access. Personal (static) tabs in personal scope continue to work the same way. However, you can now [extend static tabs](~/tabs/how-to/create-personal-tab.md#extend-static-tabs-to-group-chat-channels-and-meetings) to group chats, channels, or meetings with a [customizable experience.](~/tabs/how-to/create-personal-tab.md#customizing-your-static-tab-in-chats-or-meetings)

Tabs in chats, channels, or meetings behave more like apps, as you can pin only one tab per app. For example, you can only pin a single YouTube app tab in a meeting. Static tabs in meetings can also be prepinned in meetings by IT Admins.

The following images show tabs added to different contexts in Teams:

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

* **Pinnable and instant**: You can pin apps with static tabs from the add a tab **+** icon in chats, channels, and meetings. These tabs can be unpinned and don't have the mandatory configuration dialog, which allows you to create tabs that function more like apps.

* **Unified**: You can create one static tab that work in personal and group scopes such as chat, channel, and meeting tabs.

* **Optional configuration**: You can change the default URL in your tab instance by changing the `contentUrl` property of your app after it's pinned in Teams.

[Channel or group tabs](~/tabs/how-to/create-channel-group-tab.md) also known as configurable tabs, deliver content to channels and group chats and is a way to create collaborative spaces around dedicated web-based content.

The following table helps you determine the best fit for your app:

| &nbsp; | Personal | Channels | Group chat | Meetings |
|---|---|---|
|[Static tabs](~/tabs/how-to/create-personal-tab.md)|✔️|✔️|✔️|✔️|
|[Configurable tabs](~/tabs/how-to/create-channel-group-tab.md)|❌|✔️|✔️|✔️|

> [!NOTE]
> If you have both [configurable tab](~/tabs/how-to/create-tab-pages/configuration-page.md) and [static tab](~/tabs/how-to/create-personal-tab.md) defined in your app manifest for a specific scope, Teams pins the static tab by default.

You can [create a content page](~/tabs/how-to/create-tab-pages/content-page.md) as part of a personal static tab, channel or group tab, or dialog (referred as task module in TeamsJS v1.x). You can [create a configuration page](~/tabs/how-to/create-tab-pages/configuration-page.md) that enables users to configure Microsoft Teams app and use it to configure a personal, channel, or group chat tab, a messaging extension, or a connector card for Microsoft 365 Groups. You can permit users to reconfigure your tab after installation and [create a tab removal page](~/tabs/how-to/create-tab-pages/removal-page.md) for your application. When you build a Teams app that includes a tab, you must test how your [tab functions on both the Android and iOS Teams clients](~/tabs/design/tabs-mobile.md). Your tab must [get context](~/tabs/how-to/access-teams-context.md) through basic information, locale and theme information, and `entityId` or `subEntityId` that identifies what is in the tab.

> [!NOTE]
> **Posts** and **Files** can't be moved from their positions.

## Tab features

The tab features are as follows:

* If a tab is added to an app that also has a bot, the bot is also added to the team.
* Awareness of Microsoft Entra ID of the current user.
* Locale awareness for the user to indicate language that is `en-us`.
* Single sign-on (SSO) capability, if supported.
* Ability to use bots or app notifications to deep link to the tab or to a subentity within the service, for example an individual work item.
* The ability to open a modal dialog from links within a tab.
* Reuse of SharePoint web parts within the tab.

## Tabs user scenarios

**Scenario:** Bring an existing web-based resource inside Teams.<br>
**Example:** You create a static tab in your Teams app that presents an informational corporate website to users.

**Scenario:** Add support pages to a Teams bot or messaging extension.<br>
**Example:** You create static tabs that provide **about** and **help** webpage content to users.

**Scenario:** Provide access to items that your users interact with regularly for cooperative dialogue and collaboration.<br>
**Example:** You create a channel or group tab with deep linking to individual items.

## Declare custom tab in app manifest

A custom tab is declared in the app manifest of your app package. For each webpage you want included as a tab in your app, you define a URL and a scope. Additionally, add the [Teams JavaScript client library](/javascript/api/overview/msteams-client) to your page, and call `microsoftTeams.initialize()` after your page loads. This informs Teams that your app has loaded.

Whether you choose to expose your tab within the channel or group, or personal scope, you must present an <iframe\> HTML [content page](~/tabs/how-to/create-tab-pages/content-page.md) in your tab. For static tabs, the content URL is set directly in your Teams [app manifest](../resources/schema/manifest-schema.md#statictabs) by the `contentUrl` property in the `staticTabs` array. Your tab's content is the same for all users.

> [!NOTE]
> Teams apps can't use native plugins because they run inside sandboxed iframes.

For channel or group tabs, you can also create an extra configuration page. This page allows you to configure content page URL, typically by using URL query string parameters to load the appropriate content for that context. This is because your channel or group tab can be added to multiple teams or group chats. On each subsequent install, your users can configure the tab, allowing you to tailor the experience as required. When users add or configure a tab, a URL is associated with the tab that is presented in the Teams user interface (UI). Configuring a tab simply adds more parameters to that URL. For example, when you add the Azure Boards tab, the configuration page allows you to choose, which board the tab loads. The configuration page URL is specified by the `configurationUrl` property in the `configurableTabs` array in your [app manifest](../resources/schema/manifest-schema.md#configurabletabs).

For static tabs, you can pin a `contentUrl` to chat, channel, or meeting tabs. This allows you to skip the mandatory configuration dialog and get your users to use the app faster. You can also change the `contentUrl` at runtime. This allows you to build one tab object that works in all surface areas of Teams. For more information, see [migrate your configurable tab to static tab.](~/tabs/how-to/create-channel-group-tab.md#migrate-your-configurable-tab-to-static-tab)

You can have multiple channels or group tabs, and up to 16 static tabs per app.

## Build a tab app

You can build a personal tab app or a configurable tab app using Teams Toolkit or Codespaces.

For more information, see [build your basic tab app](../get-started/build-basic-tab-app.md).

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

Now let's build your tab. But first select your choice of tab to build:

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
* [Teams Toolkit for Visual Studio Code](../toolkit/teams-toolkit-fundamentals.md)
* [Teams Toolkit for Visual Studio](../toolkit/visual-studio-overview.md)
