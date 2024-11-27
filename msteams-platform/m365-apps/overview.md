---
title: Use Teams Apps across Microsoft 365
description: Learn how to extend Teams apps across Microsoft 365 that runs in Teams, Outlook, and Microsoft 365 as application hosts.
ms.date: 11/12/2024
ms.author: mosdevdocs
author: erikadoyle
ms.topic: overview
ms.localizationpriority: medium
ms.subservice: m365apps
---
# Extend Teams apps across Microsoft 365

With the latest releases of [Microsoft Teams JavaScript client library](../tabs/how-to/using-teams-client-library.md) (TeamsJS version 2.0.0 and later), [app manifest](../resources/schema/manifest-schema.md) (previously called Teams app manifest) (version 1.13 and later), and [Teams Toolkit](../toolkit/visual-studio-code-overview.md), you can build and update Teams apps to run in other high-usage Microsoft 365 products and publish them to the Microsoft commercial marketplace ([Microsoft AppSource](https://appsource.microsoft.com/)) or your organization's private app store.

Extending your Teams app across Microsoft 365 provides a streamlined way to deliver cross-platform apps to an expanded user audience: from a single codebase, you can create app experiences tailored for Teams, Outlook, and Microsoft 365 app environments. End users don't have to leave the context of their work to use your app, and administrators benefit from a consolidated management and deployment workflow.

The Teams app platform continues to evolve and expand holistically into the Microsoft 365 ecosystem. Here's the current support of Teams app platform elements across Microsoft 365 (Teams, Outlook, and Microsoft 365 as application hosts):

| Teams app features| App manifest element | Teams support |Outlook support | Microsoft 365 app support | Notes |
|--|--|--|--|--|--|
| [**Tabs-personal scope**](../tabs/how-to/create-personal-tab.md)     |`staticTabs`  | Web, Desktop, Mobile | Web, Desktop, Mobile (Android, iOS) | Web, Desktop, Mobile (Android, iOS)| Channel and group scopes aren't supported for Microsoft 365. For more information, see [Teams JavaScript client library](../tabs/how-to/using-teams-client-sdk.md#microsoft-365-support-running-teams-apps-in-office-and-outlook).
| [**Meeting apps**](extend-m365-meeting-app.md)|`configurableTabs`|Web, Desktop, Mobile|Desktop|-|Meeting Stageview isn't supported in Outlook. See [notes](extend-m365-meeting-app.md).|
| [**Message extensions-search-based**](../messaging-extensions/how-to/search-commands/define-search-command.md)| `composeExtensions` | Web, Desktop, Mobile| Web, Desktop | - |For limitations and troubleshooting, see [notes](extend-m365-teams-message-extension.md#limitations). |
| [**Action-based message extensions**](../messaging-extensions/how-to/action-commands/define-action-command.md)| `composeExtensions` | Web, Desktop, Mobile| Web | - | Viewable/actionable (not composable) in Teams/Outlook mobile preview (iOS, Android). For limitations and troubleshooting, see [notes](extend-m365-teams-message-extension.md#limitations). |
| [**Link unfurling (including Stageview)**](../tabs/tabs-link-unfurling.md) | `composeExtensions.messageHandlers` | Web, Desktop | Web, Desktop | - | See notes on [link unfurling](extend-m365-teams-message-extension.md) and [Stageview](extend-m365-teams-message-extension.md)|
| [**Adaptive Card Loop components**](./design-loop-components.md)|`composeExtensions.messageHandlers`|Web, Desktop |Web, Desktop (only for [new Outlook](https://support.microsoft.com/office/getting-started-with-the-new-outlook-for-windows-656bb8d9-5a60-49b2-a98b-ba7822bc7627)) |-| Viewable (not composable) in Teams/Outlook mobile preview (iOS, Android). See [notes](cards-loop-component.md).|
| [**Stageview**](extend-m365-teams-message-extension.md)|`composeExtensions.messageHandlers`|Web, Desktop, Mobile|Web (preview), Desktop (preview)|-| Viewable/actionable (not composable) in Outlook mobile preview (iOS, Android). See [notes](extend-m365-teams-message-extension.md).|
| [**Outlook Add-ins**](/office/dev/add-ins/develop/json-manifest-overview) | `extensions` | - | Web, Desktop | - | See [notes](#outlook-add-ins).|

Enrollment to [Microsoft 365 Targeted Release](/microsoft-365/admin/manage/release-options-in-office-365) and [Microsoft 365 Apps update channel](/deployoffice/change-update-channels) requires admin opt-in for the entire organization or selected users. Update channels are device specific and apply only to installations of Microsoft 365 running on Windows.

> [!NOTE]
> Apps with app manifest version below 1.13 are limited to Teams. However, apps with app manifest version 1.13 or above are compatible with Teams, Outlook, and Microsoft 365 app.

* For more information on admin guidance and options for managing your extended Teams app, see [Teams apps that work on Outlook and Microsoft 365](/microsoft-365/admin/manage/teams-apps-work-on-outlook-and-m365).
* For more information on app manifest, TeamsJS versioning, and Teams platform capability support across Microsoft 365, see [Teams JavaScript client library overview](../tabs/how-to/using-teams-client-library.md).

## Personal tabs in Outlook and Microsoft 365 app

Reach your users where they are, right in the context of their work by extending your web app as a [Teams personal tab](extend-m365-teams-personal-tab.md) application that also runs in both Outlook and Microsoft 365 app. Teams personal tabs built and hosted with [SharePoint Framework](extend-m365-teams-personal-tab.md#sharepoint-framework-spfx-apps) (SPFx) version 1.16 and later are also supported in Outlook and Microsoft 365 app.

:::image type="content" source="images/outlook-office-teams-personal-tab.png" alt-text="The screenshot is an example that shows Personal tab running in Outlook, Microsoft 365, and Teams.":::

On mobile, you can test and debug your Teams personal tab running on Microsoft 365 for [iOS](extend-m365-teams-personal-tab.md#microsoft-365-for-ios) and [Android app](extend-m365-teams-personal-tab.md#microsoft-365-for-android-app), in addition to Outlook for [iOS](extend-m365-teams-personal-tab.md#outlook-app-for-ios) and [Android app](extend-m365-teams-personal-tab.md#outlook-for-android-app).

# [Android](#tab/Android)

:::image type="content" source="images/office-mobile-personal-tab.png" alt-text="The screenshot is an example that shows personal tab running in Microsoft 365 on Android app.":::

# [iOS](#tab/iOS)

:::image type="content" source="images/m365-mobile-personal-tab.png" alt-text="The screenshot is an example that shows personal tab running in Microsoft 365 on iOS.":::

---

## Message extensions in Outlook

You can extend your [Teams message extensions](extend-m365-teams-message-extension.md) to Outlook on the web and Windows in addition to Microsoft Teams clients.

:::image type="content" source="images/outlook-teams-messaging-ext.png" alt-text="The screenshot is an example that shows Message extension running in Outlook and Teams.":::

Link unfurling works in Outlook web and Windows environments the same way it does in Microsoft Teams without any further work than using the app manifest version 1.13 or later. You can also unfurl links with cards that launch Stageview.

:::image type="content" source="images/outlook-teams-link-unfurling.png" alt-text="The screenshot is an example that shows Link unfurling running in Outlook and Teams.":::

Build your app with the latest [app manifest](../resources/schema/manifest-schema.md) and [Teams JavaScript client library](../tabs/how-to/using-teams-client-library.md) to benefit the latest consolidated Microsoft 365 app development process. Then deliver a streamlined deployment, installation, and admin experience for your customers that expands the reach and usage of your app.

## Meeting apps in Outlook

Users can discover and use your meeting app right in the flow of their work when you [extend your meeting app to Outlook](extend-m365-meeting-app.md) for Windows.

:::image type="content" source="images/outlook-teams-meeting-app.png" alt-text="Screenshot of a sample meeting app running in both Teams and Outlook":::

## Use app manifest across Microsoft 365

With an aim toward simplifying and streamlining the Microsoft 365 developer ecosystem, we're continuing to expand the app manifest into other areas of Microsoft 365 with the following.

### Outlook Add-ins

You can now define and deploy Outlook Add-ins in [version 1.17 and later](../resources/schema/manifest-schema.md) of the app manifest.

For more information, see [app manifest for Office Add-ins](/office/dev/add-ins/develop/unified-manifest-overview).

## App planning and design

To create an app within the Microsoft 365 ecosystem, consider how it helps your users to perform their work and complete their daily tasks. By being thoughtful in your app planning and design, you can create an experience that is more integrated and introduces less friction for users with their app.

To get started with apps extended across Microsoft 365, see [app playbooks](/microsoft-365-copilot/extensibility/plugins-are-apps#planning-your-app) and [Microsoft 365 UI Kit (Figma) preview](https://aka.ms/M365UIKit).

## Actions in Microsoft 365

Actions aim to integrate your app into your user's workflow by enabling easy discoverability and seamless interaction with their content. By directing users to your app with their intent and contextual content, Actions enable efficient task completion. This integration enhances the visibility and engagement of your app with minimal development effort.

For more information, see [Actions in Microsoft 365](actions-in-m365.md)

## Microsoft commercial marketplace submission

Join the growing number of production Teams apps in the [Microsoft commercial marketplace](https://appsource.microsoft.com/) (Microsoft AppSource) store with expanded support for Outlook and Microsoft 365 audiences. The app [submission process for Teams apps enabled for Outlook and Microsoft 365](../concepts/deploy-and-publish/appsource/publish.md) is the same as for traditional Teams apps. The only difference is to use app manifest [version 1.13 or later](../tabs/how-to/using-teams-client-sdk.md) in your app package, which introduces support for Teams apps that run across Microsoft 365.

After your app is published as a Microsoft 365-enabled Teams app, your app will be discoverable as an installable app in the Outlook and Microsoft 365 app stores, in addition to the Microsoft Teams Store. When running in Outlook and Microsoft 365 app, your app uses the same permissions granted in Teams. Teams admins can [manage access to Teams apps across Microsoft 365](/microsoftteams/manage-third-party-teams-apps) for users in their organization.

For more information, see [publish Teams apps for Microsoft 365](publish.md).

## Next step

Set up your dev environment to build Teams apps for Microsoft 365:

> [!div class="nextstepaction"]
> [Install prerequisites](prerequisites.md)

## See also

* [Manage access to the enhanced apps](/microsoftteams/manage-third-party-teams-apps#manage-users-access-to-the-enhanced-apps)
* [Validation of Teams apps extensible across Microsoft 365](/training/modules/microsoft-teams-metaos-app/)
