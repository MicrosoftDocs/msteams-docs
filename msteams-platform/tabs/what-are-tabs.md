---
title: Microsoft Teams tabs
author: surbhigupta
description: Learn to build tabs, webpages embedded in Microsoft Teams. Create a content page as part of personal, channel, or group tab.
ms.localizationpriority: high
ms.topic: overview
ms.date: 05/04/2023
---

# Build tabs for Teams

Tabs are Teams-aware webpages embedded in Microsoft Teams. They're simple HTML `<iframe/>` tags that point to domains declared in the app manifest and can be added as part of a channel inside a team, group chat, or personal app for an individual user. You can include custom tabs with your app to embed your own web content in Teams or add Teams-specific functionality to your web content. For more information, see [Teams JavaScript client library](/javascript/api/overview/msteams-client).

> [!IMPORTANT]
> Custom tabs are available in Government Community Cloud (GCC), GCC-High, and Department of Defense (DOD).

The following image shows static tabs:

# [Desktop](#tab/desktop)

:::image type="content" source="../assets/images/tabs/personaltab.png" alt-text="Screenshot shows an example of a personal (static) tab in Teams desktop client.":::

# [Mobile](#tab/mobile)

:::image type="content" source="~/assets/images/tabs/personal-tab-mobile.png" alt-text="Example shows a mobile tab being added in Teams mobile client.":::

The following image shows Contoso channel tabs:

# [Desktop](#tab/desktop2)

:::image type="content" source="../assets/images/tabs/tabs.png" alt-text="Channel or group tabs" lightbox="../assets/images/tabs/tabs.png":::

# [Mobile](#tab/mobile2)

:::image type="content" source="~/assets/images/tabs/mobile-design-static-tab.png" alt-text="Example shows a mobile tab being added in a channel.":::

---

There are few prerequisites that you must go through before working on tabs.

There are two types of tabs available in Teams, personal and group. [Personal tabs](~/tabs/how-to/create-personal-tab.md) are also known as static tabs. Personal (static) tabs, along with personal-scoped bots, are part of the personal apps that are scoped to a single user and pinned to the left navigation bar for easy access. Personal (static) tabs in personal scope continue to work the same way. However, you can now [extend static tabs](~/tabs/how-to/create-personal-tab.md#extend-static-tabs-to-group-chat-and-meetings) to group chat or meetings with a [customizable experience.](~/tabs/how-to/create-personal-tab.md#customizing-your-static-tab-in-chats-or-meetings)

You can extend static tabs to different scopes. Static tabs in chats or meetings behave more like apps, as you can pin only one tab per app. For example, you can only pin a single YouTube app tab in a meeting. Static tabs in meetings can also be pre-pinned in meetings by IT Admins.

Following image shows static tabs with customizable experience added to different contexts in Teams:

# [Personal](#tab/personal)

* The following image shows a static tab in personal context in the Teams desktop client:

    :::image type="content" source="~/assets/images/tabs/personal-tab-configure.png" alt-text=" Screenshot shows the configurable tab added to a personal scope."

* The following image shows a static tab in personal context in the Teams mobile client:

    :::image type="content" source="~/assets/images/tabs/mobile-design-access-tab.png" alt-text="Example shows a mobile tab being added in a personal context.":::

# [Meeting](#tab/meeting)

* The following image shows a static tab in meeting context in the Teams desktop client:

    :::image type="content" source="~/assets/images/tabs/personal-tab-meeting.png" alt-text="Example shows a configurable tab added to a meeting.":::

* The following image shows a static tab in meeting context in the Teams mobile client:

    :::image type="content" source="~/assets/images/tabs/mobile-personal-tab-meeting.png" alt-text="Example shows a configurable tab added to a meeting in mobile.":::

---

Following are a few benefits of static tabs in chats and meeting tabs:

* **Pinnable and instant**: You can pin apps with static tabs from the add a tab **+** icon in chats and meetings. These tabs can be unpinned and don't have the mandatory configuration dialog, which allows you to create tabs that function more like apps.

* **Unified**: You can create one static tab that work in personal and group scopes such as chat and meeting tabs. 

* **Optional configuration**: You can change the default URL in your tab instance by changing the `contentUrl` property of your app after it's pinned in Teams.


[Channel or group tabs](~/tabs/how-to/create-channel-group-tab.md) also known as configurable tabs, deliver content to channels and group chats and is a way to create collaborative spaces around dedicated web-based content.

The following table helps you determine best fit for your app:

| &nbsp; | Personal | Channels | Group chat | Meetings |
|---|---|---|
|[Static tabs](~/tabs/how-to/create-personal-tab.md)|✔️|❌|✔️|✔️|
|[Configurable tabs](~/tabs/how-to/create-channel-group-tab.md)|❌|✔️|✔️|✔️|

>[!NOTE] 
> If you have both [configurable tab](~/tabs/how-to/create-tab-pages/configuration-page.md) and [static tab](~/tabs/how-to/create-personal-tab.md) defined in your app manifest for a specific scope, Teams pins the static tab by default.

You can [create a content page](~/tabs/how-to/create-tab-pages/content-page.md) as part of a personal static tab, channel or group tab, or task module. You can [create a configuration page](~/tabs/how-to/create-tab-pages/configuration-page.md) that enables users to configure Microsoft Teams app and use it to configure a personal, channel, or group chat tab, a messaging extension, or a connector card for Microsoft 365 Groups. You can permit users to reconfigure your tab after installation and [create a tab removal page](~/tabs/how-to/create-tab-pages/removal-page.md) for your application. When you build a Teams app that includes a tab, you must test how your [tab functions on both the Android and iOS Teams clients](~/tabs/design/tabs-mobile.md). Your tab must [get context](~/tabs/how-to/access-teams-context.md) through basic information, locale and theme information, and `entityId` or `subEntityId` that identifies what is in the tab.

> [!NOTE]
> **Posts** and **Files** can't be moved from their positions.

## Tab features

The tab features are as follows:

* If a tab is added to an app that also has a bot, the bot is also added to the team.
* Awareness of Microsoft Azure Active Directory (Azure AD) ID of the current user.
* Locale awareness for the user to indicate language that is `en-us`.
* Single sign-on (SSO) capability, if supported.
* Ability to use bots or app notifications to deep link to the tab or to a sub-entity within the service, for example an individual work item.
* The ability to open a task module from links within a tab.
* Reuse of SharePoint web parts within the tab.

## Tabs user scenarios

**Scenario:** Bring an existing web-based resource inside Teams. \
**Example:** You create a static tab in your Teams app that presents an informational corporate website to users.

**Scenario:** Add support pages to a Teams bot or messaging extension. \
**Example:** You create static tabs that provide **about** and **help** webpage content to users.

**Scenario:** Provide access to items that your users interact with regularly for cooperative dialogue and collaboration. \
**Example:** You create a channel or group tab with deep linking to individual items.

## Understand how tabs work

You can use one of the following methods to create tabs:

* [Declare custom tab in app manifest](#declare-custom-tab-in-app-manifest)
* [Use Adaptive Card to build tabs](~/tabs/how-to/build-adaptive-card-tabs.md)

### Declare custom tab in app manifest

A custom tab is declared in the app manifest of your app package. For each webpage you want included as a tab in your app, you define a URL and a scope. Additionally, you can add the [Teams JavaScript client library](/javascript/api/overview/msteams-client) to your page, and call `microsoftTeams.initialize()` after your page loads. Teams displays your page and provides access to Teams-specific information, for example, the Teams client is running the dark theme.

Whether you choose to expose your tab within the channel or group, or personal scope, you must present an <iframe\> HTML [content page](~/tabs/how-to/create-tab-pages/content-page.md) in your tab. For static tabs, the content URL is set directly in your Teams [app manifest](../resources/schema/manifest-schema.md#statictabs) by the `contentUrl` property in the `staticTabs` array. Your tab's content is the same for all users.

> [!Note]
> Teams app doesn't recognize sub iframes. Therefore, it'll not load if there is an iframe within the tab app.

For channel or group tabs, you can also create an extra configuration page. This page allows you to configure content page URL, typically by using URL query string parameters to load the appropriate content for that context. This is because your channel or group tab can be added to multiple teams or group chats. On each subsequent install, your users can configure the tab, allowing you to tailor the experience as required. When users add or configure a tab, a URL is associated with the tab that is presented in the Teams user interface (UI). Configuring a tab simply adds more parameters to that URL. For example, when you add the Azure Boards tab, the configuration page allows you to choose, which board the tab loads. The configuration page URL is specified by the `configurationUrl` property in the `configurableTabs` array in your [app manifest](../resources/schema/manifest-schema.md#configurabletabs).

For static tabs you can pin a `contentUrl` to chat or meeting tabs. This allows you to skip the mandatory configuration dialog and get your users to use the app much faster. You can also change the `contentUrl` at runtime. This allows you to build one tab object that works in all surface areas of Teams. For more information, see [migrate your configurable tab to static tab.](~/tabs/how-to/create-channel-group-tab.md#migrate-your-configurable-tab-to-static-tab)

You can have multiple channels or group tabs, and up to 16 static tabs per app.

### Tools to build tabs

* [Teams Toolkit for Visual Studio Code](../toolkit/teams-toolkit-fundamentals.md)
* [Teams Toolkit for Visual Studio](../toolkit/visual-studio-overview.md)

## Next step

> [!div class="nextstepaction"]
> [Prerequisites](~/tabs/how-to/tab-requirements.md)

## See also

* [Design your tab for Microsoft Teams](design/tabs.md)
* [Device capabilities](../concepts/device-capabilities/device-capabilities-overview.md)
* [Tabs on mobile](design/tabs-mobile.md#tabs-on-mobile)
* [App capabilities mapped to features](../concepts/design/map-use-cases.md#app-capabilities-mapped-to-features)
* [Instrumenting for Teams app specific analytics](../concepts/design/overview-analytics.md#instrumenting-for-teams-app-specific-analytics)
* [Extend tab app with Microsoft Graph permissions and scopes](how-to/authentication/tab-sso-graph-api.md)
