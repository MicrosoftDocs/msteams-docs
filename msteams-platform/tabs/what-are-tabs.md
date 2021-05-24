---
title: What are custom tabs in Teams?
author: laujan
description: An overview of custom tabs on the Teams platform
localization_priority: Normal
ms.topic: overview
ms.author: lajanuar
---
# Microsoft Teams tabs

Tabs are simple HTML <iframe\> tags which point to domains declared in the app manifest, embedded in Microsoft Teams. They are added as part of a channel inside a team, group chat, or as a personal app for an individual user. You can include custom tabs to embed your own web content in Teams or add Teams-specific functionality to your web content.

The following image shows the tabs added in a channel:

![Tabs in channel screenshot](~/assets/images/tab-images/tabs-pinned-in-a-channel.png)

The following image shows the tabs added in a group chat:

![Tabs in group chat screenshot](~/assets/images/tab-images/tabs-in-groupchat.png)

The following image shows **myQuiz** added in a personal chat:

![Tabs in personal chat screenshot](~/assets/images/tab-images/tabs-in-personal-chat.png)

> [!NOTE]
> Chrome 80 introduces new cookie values and imposes cookie policies. It is recommended that you set the intended use for your cookies. You need not rely on default browser behavior. For more information, See [SameSite cookie attribute (2020 update)](../resources/samesite-cookie-update.md).

There are two types of tabs available in Teams: channel or group and personal. The channel or group tabs provide content in channels and group chats and create collaborative spaces around dedicated web-based content.

Personal tabs with personally-scoped bots are part of a personal apps and are intended for a single user. You can pin them to the left navigation bar in Teams for easy access.

## Tab features

> [!div class="checklist"]
>
> * If a tab is added to an app that also has a bot, the bot is added to the team as well.
> * Awareness of Azure Active Directory ID (Azure AD) of the current user.
> * Locale awareness for the user to indicate language. For example, `en-us`. 
> * Single sign-on (SSO) capability, if supported.
> * Ability to use bots or app notifications to deep link to the tab or to a sub-entity within the service. For example, an individual work item.
> * Ability to open a task module from links within a tab.
> * Reuse of SharePoint web parts within the tab.

## Tabs user scenarios

| **Scenario** | **Example** |
|--------------|-------------|
| Bring an existing web-based resource inside Teams. | Create a personal tab in your Teams app that presents an informational corporate website to users. |
| Add support pages to a Teams bot or messaging extension. | Create personal tabs that provide **about** and **help** webpage content to users. |
| Provide access to items that your users interact with regularly for cooperative dialogue and collaboration. | Create a channel or group tab with deep linking to individual items. |

## Understand how tabs work

A custom tab is declared in the app manifest of your app package. To include each webpage as a tab in your app, you must define a URL and a scope, add [Teams JavaScript client SDK](/javascript/api/overview/msteams-client) to your page and call `microsoftTeams.initialize()` after your page loads. Teams display your page, give you access to Teams-specific information, and allows you to take action based on the results. For example, the Teams client is running the **dark theme**.

If you choose to expose your tab within the channel or group or personal scope, you must present an <iframe\> HTML [content page](~/tabs/how-to/create-tab-pages/content-page.md) in your tab. For personal tabs, the content URL is set directly in your Teams app manifest by the `contentUrl` property in the `staticTabs` array. Your tab's content is same for all the users.

For channel or group tabs, create an additional configuration page that allows users to configure your content page URL by using URL query string parameters to load the appropriate content for that context. This is because your channel or group tab is added to multiple different teams or group chats. On each subsequent installation, your users can configure the tab and allows you to tailor the experience as needed.

When users add or configure a tab, an URL associated with the tab is presented in the Teams UI. To configure a tab, add additional parameters to that URL. For example, when you add the Azure Boards tab, the configuration page allows you to choose the board that the tab loads. The configuration page URL is specified by the `configurationUrl` property in the `configurableTabs` array in your app manifest.

You can have multiple channels or group tabs, and up to sixteen personal tabs per app.

## Mobile considerations

If you choose to have your channel or group tab to appear in Teams mobile clients, the `setSettings()` configuration must have a value for the `websiteUrl` property. To ensure optimal user experience, you must follow the [guidance for tabs on mobile](~/tabs/design/tabs-mobile.md) when creating your tabs.

Apps [distributed through the Teams store](~/concepts/deploy-and-publish/appsource/publish.md) have a separate approval process for mobile clients. The default behavior of such apps is as follows:

| **App capability** | **Behavior if app is approved** | **Behavior if app is not approved** |
| --- | --- | --- |
| **Personal tabs** | App appears in the bottom bar of the mobile clients. Tabs open in the Teams client. | App does not appear in the bottom bar of the mobile clients. |
| **Channel and group tabs** | The tab opens in the Teams client using `contentUrl`. | The tab opens in a browser outside the Teams client using `websiteUrl`. |

> [!NOTE]
>
> * [Apps submitted to the AppSource for publishing on Teams ](../concepts/deploy-and-publish/overview.md#publish-to-appsource) are evaluated automatically for mobile responsiveness. For any queries, reach out to teamsubm@microsoft.com.
> * For all [apps that are not distributed through the AppSource](../concepts/deploy-and-publish/overview.md), the tabs open in an in-app webview within the Teams clients by default and there is no separate approval process required.
> * The default behavior of apps is only applicable if distributed through the Teams store. All tabs open in the Teams client.
> * To initiate an evaluation of your app for mobile-friendliness, reach out to teamsubm@microsoft.com with your app details.

## See also

* [Request device permissions](../concepts/device-capabilities/native-device-permissions.md)
* [Integrate media capabilities](../concepts/device-capabilities/mobile-camera-image-permissions.md)
* [Integrate a QR or barcode scanner](../concepts/device-capabilities/qr-barcode-scanner-capability.md)
* [Integrate location capabilities](../concepts/device-capabilities/location-capability.md)

## Next step

> [!div class="nextstepaction"]
> [Tab requirements](~/tabs/how-to/tab-requirements.md)
