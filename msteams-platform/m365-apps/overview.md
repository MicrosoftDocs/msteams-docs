---
title: Use Agents and Apps across Microsoft 365
description: Learn how to extend Teams agents and apps across Microsoft 365 (running in Teams, Outlook, Word, Excel, PowerPoint and Microsoft 365 as application hosts).
ms.date: 03/27/2026
ms.author: mosdevdocs
author: rick-kirkham
ms.topic: overview
ms.localizationpriority: medium
ms.subservice: m365apps
---
# Extend agents and apps across Microsoft 365

A Teams app is an App for Microsoft 365, just as an Office Add-in and a custom Copilot agent are. This enables you to combine an add-in with one or more of these other types of Microsoft 365 extensions. Your combined solution uses a single manifest that configures all of its parts, and a single app package (a ZIP file) that serve as the unit of sideloading and of publishing to [Microsoft Marketplace](https://marketplace.microsoft.com/) or the Microsoft 365 Admin center.

With the latest releases of [Microsoft Teams JavaScript client library](../tabs/how-to/using-teams-client-library.md) (TeamsJS version 2.0.0 and later), the [unified app manifest for Microsoft 365](/microsoft-365/extensibility/schema/) (previously called Teams app manifest) (version 1.13 and later), and [Microsoft 365 Agents Toolkit](../toolkit/visual-studio-code-overview.md) (previously known as Teams Toolkit), you can build and update Teams apps to run in any of the three Microsoft 365 hub applications (the applications that have an **App bar**).

- Teams
- Microsoft 365 Copilot
- Outlook

You can also combine into a single distributable app package a Teams app with a custom Copilot extension or a Office Add-in for Excel, PowerPoint, Word, or Outlook.

Use this packaging system to combine closely related functionality and experiences into a single app for Microsoft 365. Some possible scenarios include: 

- Make a page experience available in both your add-in task pane and in a custom personal tab in one or more of the Microsoft 365 hub applications.
- Create a Copilot agent that gets Microsoft Graph data and is available in Excel and Teams. 
- Include similar handlers for similar events, such as a user being added to a Teams conversation and a recipient being added to an Outlook message.
- Record in a database discrete user actions in an Office application, and view the accumulated data in a custom tab that is opened from the **App bar** in one or more of the Microsoft 365 hubs.

> [!TIP]
> You can't include a [SharePoint Framework app](/sharepoint/dev/spfx/sharepoint-framework-overview) in the Microsoft extension's app package, but you can bundle your Microsoft 365 extension with one or more SharePoint Framework apps into a single Software as a Service (SaaS) offering. The SaaS is installed and managed as a unit using the integrated apps portal in the admin center. For more information, see [SaaS linked apps](/microsoft-365/admin/manage/saas-linked-apps) and [Integrated Apps portal](/microsoft-365/admin/manage/test-and-deploy-microsoft-365-apps).

* For more information on admin guidance and options for managing your app for Microsoft 365, see [Apps for Microsoft 365 that work across application hosts](/microsoft-365/admin/manage/teams-apps-work-on-outlook-and-m365).
* For more information on app manifest, TeamsJS versioning, and Teams platform capability support across Microsoft 365, see [Teams JavaScript client library overview](../tabs/how-to/using-teams-client-library.md).

The following sections introduce some of the Microsoft 365 development features that cross the boundaries between Office, Teams, and Copilot. For a matrix of support on various platforms, see [Platform support](#platform-support).

## Personal tabs

Reach your users where they are, right in the context of their work by extending your web app as a [personal tab](extend-m365-teams-personal-tab.md) application that also runs in Outlook, Teams, and the Microsoft 365 Copilot application. 

:::image type="content" source="images/outlook-office-teams-personal-tab.png" alt-text="The screenshot is an example that shows Personal tab running in Outlook, Microsoft 365, and Teams.":::

The following images show the personal tab running on Microsoft 365 for [iOS](/microsoftteams/platform/m365-apps/extend-m365-teams-personal-tab#microsoft-365-for-ios) and [Android app](/microsoftteams/platform/m365-apps/extend-m365-teams-personal-tab#microsoft-365-for-android-app). (It will also run in Outlook for [iOS](/microsoftteams/platform/m365-apps/extend-m365-teams-personal-tab#outlook-app-for-ios) and [Android app](/microsoftteams/platform/m365-apps/extend-m365-teams-personal-tab#outlook-for-android-app).)

# [Android](#tab/Android)

:::image type="content" source="images/office-mobile-personal-tab.png" alt-text="The screenshot is an example that shows personal tab running in Microsoft 365 on Android app.":::

# [iOS](#tab/iOS)

:::image type="content" source="images/m365-mobile-personal-tab.png" alt-text="The screenshot is an example that shows personal tab running in Microsoft 365 on iOS.":::

---

> [!TIP]
> Personal tabs can be built and hosted with [SharePoint Framework](/microsoftteams/platform/m365-apps/extend-m365-teams-personal-tab#sharepoint-framework-spfx-apps) (SPFx) version 1.16 and later as an alternative to hosting them on a web server or web service. See [Add Teams tab to SharePoint](/microsoftteams/platform/tabs/how-to/tabs-in-sharepoint) and [Build Microsoft Teams tab using SharePoint Framework - Tutorial](/sharepoint/dev/spfx/web-parts/get-started/using-web-part-as-ms-teams-tab). Although these articles use the term "Teams tab" they apply also to personal tabs in Outlook and Microsoft 365 Copilot.

## Message extensions and link unfurling

Message extensions enable users to interact with your web service using buttons and forms. Users can search or initiate actions in an external system from chat messages in Teams and email messages in Outlook.

:::image type="content" source="images/outlook-teams-messaging-ext.png" alt-text="The screenshot is an example that shows Message extension running in Outlook and Teams.":::

Link unfurling works in both Outlook messages and Teams chat messages. You can also unfurl links with cards that launch Stageview.

:::image type="content" source="images/outlook-teams-link-unfurling.png" alt-text="The screenshot is an example that shows Link unfurling running in Outlook and Teams.":::

For more information, see [Build message extensions](/microsoftteams/platform/messaging-extensions/what-are-messaging-extensions) and [Teams message extensions](/microsoftteams/platform/m365-apps/extend-m365-teams-message-extension). See also the guidance in [Scenarios for creating an Outlook add-in and a message extension](/microsoftteams/platform/m365-apps/me-or-outlook-add-in) to learn when to use a Outlook add-in and when to use a message extension in Outlook.

## Meeting apps

Meeting apps are essentially [personal tabs](#personal-tabs) that are designed to foster collaboration before, during, and after meetings. You can configure and add meeting apps to the Teams meetings scheduled from Outlook and also run meeting apps within the Outlook calendar.

:::image type="content" source="images/outlook-teams-meeting-app.png" alt-text="Screenshot of a sample meeting app running in both Teams and Outlook":::

For more information, see [Apps for meetings and calls](/microsoftteams/platform/apps-in-teams-meetings/teams-apps-in-meetings) and [Extend a meeting app to Outlook](/microsoftteams/platform/m365-apps/extend-m365-meeting-app).

## Actions in Microsoft 365

Actions aim to integrate your app into your user's workflow by enabling easy discoverability and seamless interaction with their content. By directing users to your app with their intent and contextual content, Actions enable efficient task completion. This integration enhances the visibility and engagement of your app with minimal development effort.

For more information, see [Actions in Microsoft 365](actions-in-m365.md).

## Platform support

The following table shows platforms supporting the various types of apps for Microsoft 365.

| Teams app features| Teams support |Outlook as a hub support |Microsoft 365 Copilot support |Word, Excel, Outlook, PowerPoint add-in support| Notes |
|--|--|--|--|--|--|--|
| [**Tabs-personal scope**](/microsoftteams/platform/tabs/how-to/create-personal-tab)     |Web, Desktop, Mobile | Web, Desktop, Mobile (Android, iOS) | Web, Desktop, Mobile (Android, iOS)|-|Channel and group scopes aren't supported for Microsoft 365. For more information, see [Teams JavaScript client library](/microsoftteams/platform/tabs/how-to/using-teams-client-sdk#microsoft-365-support-running-teams-apps-in-office-and-outlook).
| [**Meeting apps**](/microsoftteams/platform/m365-apps/extend-m365-meeting-app)|Web, Desktop, Mobile|Desktop|-|-|Meeting Stageview isn't supported in Outlook. See [Extend a meeting app to Outlook](/microsoftteams/platform/m365-apps/extend-m365-meeting-app).|
| [**Message extensions-search-based**](/microsoftteams/platform/messaging-extensions/how-to/search-commands/define-search-command)| Web, Desktop, Mobile| Web, Desktop | - |-|For limitations and troubleshooting, see [Limitations](/microsoftteams/platform/m365-apps/extend-m365-teams-message-extension#limitations). |
| [**Action-based message extensions**](/microsoftteams/platform/messaging-extensions/how-to/action-commands/define-action-command)| Web, Desktop, Mobile| Web | - |-| Viewable/actionable (not composable) in Teams/Outlook mobile preview (iOS, Android). For limitations and troubleshooting, see [Limitations](/microsoftteams/platform/m365-apps/extend-m365-teams-message-extension#limitations). |
| [**Link unfurling (including Stageview)**](/microsoftteams/platform/tabs/tabs-link-unfurling) | Web, Desktop | Web, Desktop | - | -|See notes on [link unfurling](/microsoftteams/platform/m365-apps/extend-m365-teams-message-extension) and [Stageview](/microsoftteams/platform/m365-apps/extend-m365-teams-message-extension)|
| [**Adaptive Card Loop components**](/microsoftteams/platform/m365-apps/design-loop-components)|Web, Desktop |Web, Desktop (only for [new Outlook](https://support.microsoft.com/office/getting-started-with-the-new-outlook-for-windows-656bb8d9-5a60-49b2-a98b-ba7822bc7627)) |-|-| Viewable (not composable) in Teams/Outlook mobile preview (iOS, Android). See [Adaptive Card-based Loop components](/microsoftteams/platform/m365-apps/cards-loop-component).|
| [**Stageview**](/microsoftteams/platform/m365-apps/extend-m365-teams-message-extension)|Web, Desktop, Mobile|Web (preview), Desktop (preview)|-|-| Viewable/actionable (not composable) in Outlook mobile preview (iOS, Android). See [Message extensions](/microsoftteams/platform/m365-apps/extend-m365-teams-message-extension).|
| [**Office Add-ins**](/office/dev/add-ins/overview/office-add-ins) | - | - | - | Web, Desktop | See [Office Add-ins platform overview](/office/dev/add-ins/overview/office-add-ins).|
| [**Copilot agents**](/microsoft-365-copilot/extensibility/ecosystem) | Web, Desktop | - | Web, Desktop | Web, Desktop | See [Declarative agents for Microsoft 365 Copilot](/microsoft-365-copilot/extensibility/overview-declarative-agent) |

## App planning and design

To create an app within the Microsoft 365 ecosystem, consider how it helps your users to perform their work and complete their daily tasks. By being thoughtful in your app planning and design, you can create an experience that is more integrated and introduces less friction for users with their app.

To get started with apps extended across Microsoft 365, see [app playbooks](/microsoft-365-copilot/extensibility/plugins-are-apps#planning-your-app) and [Microsoft 365 UI Kit (Figma) preview](https://aka.ms/M365UIKit).

## Microsoft commercial marketplace submission

Join the growing number of production Teams apps in the [Microsoft Marketplace](https://marketplace.microsoft.com/) store as apps for Microsoft 365. The app [submission process for Teams apps enabled for Outlook and Microsoft 365](../concepts/deploy-and-publish/appsource/publish.md) is the same as for traditional Teams apps. The only difference is to use app manifest [version 1.13 or later](../tabs/how-to/using-teams-client-sdk.md) in your app package, which introduces support for Teams apps that run across Microsoft 365.

After your Teams app is published as an app for Microsoft 365, your app will be discoverable as an installable app in the Outlook and Microsoft 365 app stores, in addition to the Microsoft Teams Store. And if the app includes an add-in for Excel, PowerPoint, or Word, it will be in their stores too. When running in Outlook and Microsoft 365 app, your app uses the same permissions granted in Teams. Teams admins can [manage access to Teams apps across Microsoft 365](/microsoftteams/manage-third-party-teams-apps) for users in their organization.

For more information, see [publish Teams apps for Microsoft 365](publish.md).

## Next step

Set up your dev environment to build Teams apps for Microsoft 365.

> [!div class="nextstepaction"]
> [Install prerequisites](prerequisites.md)

## See also

* [Manage access to the enhanced apps](/microsoftteams/manage-third-party-teams-apps#manage-users-access-to-the-enhanced-apps)
* [Validation of Teams apps extensible across Microsoft 365](/training/modules/microsoft-teams-metaos-app/)
