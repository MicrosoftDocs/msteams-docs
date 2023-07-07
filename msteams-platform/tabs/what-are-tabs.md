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

The following image shows personal tabs:

:::image type="content" source="../assets/images/tabs/personaltab.png" alt-text="Screenshot shows an example of a personal tab in Teams desktop client.":::

The following image shows Contoso channel tabs:

# [Desktop](#tab/desktop)

:::image type="content" source="../assets/images/tabs/tabs.png" alt-text="Channel or group tabs" lightbox="../assets/images/tabs/tabs.png":::

# [Mobile](#tab/mobile)

:::image type="content" source="~/assets/images/tabs/mobile-design-access-tab.png" alt-text="Example shows a mobile tab being added in a channel.":::

---

There are few prerequisites that you must go through before working on tabs.

There are two types of tabs available in Teams, personal and channel or group. [Personal tabs](~/tabs/how-to/create-personal-tab.md), along with personal-scoped bots, are part of personal apps and are scoped to a single user. They can be pinned to the left navigation bar for easy access. [Channel or group tabs](~/tabs/how-to/create-channel-group-tab.md) deliver content to channels and group chats, and are a great way to create collaborative spaces around dedicated web-based content.

You can [create a content page](~/tabs/how-to/create-tab-pages/content-page.md) as part of a personal tab, channel or group tab, or task module. You can [create a configuration page](~/tabs/how-to/create-tab-pages/configuration-page.md) that enables users to configure Microsoft Teams app and use it to configure a channel or group chat tab, a messaging extension, or a connector card for Microsoft 365 Groups. You can permit users to reconfigure your tab after installation and [create a tab removal page](~/tabs/how-to/create-tab-pages/removal-page.md) for your application. When you build a Teams app that includes a tab, you must test how your [tab functions on both the Android and iOS Teams clients](~/tabs/design/tabs-mobile.md). Your tab must [get context](~/tabs/how-to/access-teams-context.md) through basic information, locale and theme information, and `entityId` or `subEntityId` that identifies what is in the tab.

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
**Example:** You create a personal tab in your Teams app that presents an informational corporate website to users.

**Scenario:** Add support pages to a Teams bot or messaging extension. \
**Example:** You create personal tabs that provide **about** and **help** webpage content to users.

**Scenario:** Provide access to items that your users interact with regularly for cooperative dialogue and collaboration. \
**Example:** You create a channel or group tab with deep linking to individual items.

## Understand how tabs work

You can use one of the following methods to create tabs:

* [Declare custom tab in app manifest](#declare-custom-tab-in-app-manifest)
* [Use Adaptive Card to build tabs](~/tabs/how-to/build-adaptive-card-tabs.md)

### Declare custom tab in app manifest

A custom tab is declared in the app manifest of your app package. For each webpage you want included as a tab in your app, you define a URL and a scope. Additionally, you can add the [Teams JavaScript client library](/javascript/api/overview/msteams-client) to your page, and call `microsoftTeams.initialize()` after your page loads. Teams displays your page and provides access to Teams-specific information, for example, the Teams client is running the dark theme.

Whether you choose to expose your tab within the channel or group, or personal scope, you must present an <iframe\> HTML [content page](~/tabs/how-to/create-tab-pages/content-page.md) in your tab. For personal tabs, the content URL is set directly in your Teams app manifest by the `contentUrl` property in the `staticTabs` array. Your tab's content is the same for all users.

> [!Note]
> Teams app doesn't recognize sub iframes. Therefore, it'll not load if there is an iframe within the tab app.

For channel or group tabs, you can also create an extra configuration page. This page allows you to configure content page URL, typically by using URL query string parameters to load the appropriate content for that context. This is because your channel or group tab can be added to multiple teams or group chats. On each subsequent install, your users can configure the tab, allowing you to tailor the experience as required. When users add or configure a tab, a URL is associated with the tab that is presented in the Teams user interface (UI). Configuring a tab simply adds more parameters to that URL. For example, when you add the Azure Boards tab, the configuration page allows you to choose, which board the tab loads. The configuration page URL is specified by the  `configurationUrl` property in the `configurableTabs` array in your [app manifest](../resources/schema/manifest-schema.md#configurabletabs).

You can have multiple channels or group tabs, and up to 16 personal tabs per app.

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
