---
title: What's new
description: Describes all the new developer features in Microsoft Teams
ms.topic: reference
keywords: teams what's new latest
---
# What's new for developers in Microsoft Teams

>[!TIP]
> Check out our production-ready templates in the   [**Teams App Templates catalog**](samples/app-templates.md). The catalog is alphabetized and the newest additions are tagged with a  star **&#9734;**.

## Change Log

The change log lists changes to the Microsoft Teams platform and this document set. At times entries may be used to call attention to a new feature that is simply of interest to Teams developers.

| **Date** | **Notes** | **Changed topics** |
| -------- | --------- | ------------------ |
|11/30/2020|New: Identity platform integration with Teams Toolkit and Visual Studio Code for tabs|[Single sign-on authentication with Teams Toolkit and Visual Studio Code for tabs](toolkit/visual-studio-code-tab-sso.md)|
|11/16/2020|Teams app manifest updated to version 1.8|[Reference: Manifest schema for Microsoft Teams](resources/schema/manifest-schema.md)|
|11/10/2020|Teams bot design guidelines|[Bot design guidelines](bots/design/bots.md)|
|9/30/2020|Sending and receiving files to bots on mobile devices is now supported.|[Send and receive files through your bot](resources/bot-v3/bots-files.md)|
|09/22/2020|New "Get Started with Teams" guidance|[Build your first Teams app overview](build-your-first-app/build-first-app-overview.md)|
|9/18/2020|Support for in-meeting Teams apps (Release Preview)|[Create apps for Teams meetings](apps-in-teams-meetings/create-apps-for-teams-meetings.md) and [Apps in Teams meetings](apps-in-teams-meetings/teams-apps-in-meetings.md)|
|8/19/2020|Import Teams messages with Microsoft Graph|[Import third-party platform messages to Teams using Microsoft Graph](graph-api/import-messages/import-external-messages-to-teams.md)
| 08/12/2020 |Adaptive Cards support in incoming webhook moved to GA.|[Send adaptive cards using an incoming webhook](~/webhooks-and-connectors/how-to/connectors-using.md#send-adaptive-cards-using-an-incoming-webhook) |
|08/10/2020|Get started building Teams apps with the Visual Studio Toolkit.|[Build apps with the Microsoft Teams Toolkit and Visual Studio Code](toolkit/visual-studio-overview.md) |
|08/06/2020|Support for Tabs SSO authentication|[Develop an SSO Microsoft Teams Tab](tabs/how-to/authentication/auth-aad-sso.md#develop-an-sso-microsoft-teams-tab) |
|07/27/2020 | Graph proactive bots and messages (Public Preview)|[Enable proactive bot installation and proactive messaging in Teams with Microsoft Graph](graph-api/proactive-bots-and-messages/graph-proactive-bots-and-messages.md)|
| 07/22/2020 |Mobile device capability updates.|[Request device permissions for your Microsoft Teams tab](concepts/device-capabilities/native-device-permissions.md) |
|07/20/2020|Teams App Validation Tool for AppSource submissions.|[Teams App Validation Tool](concepts/deploy-and-publish/appsource/prepare/submission-checklist.md#teams-app-validation-tool)
|07/15/2020|Create a virtual assistant for Teams|[Virtual Assistant for Microsoft Teams](samples/virtual-assistant.md)|
|07/14/2020|Surfacing a native loading indicator documentation|[Showing a native loading indicator](tabs/how-to/create-tab-pages/content-page.md#show-a-native-loading-indicator)
|07/01/2020|Get started building Teams apps with the Visual Studio Code Toolkit.|[Build apps with the Microsoft Teams Toolkit and Visual Studio Code](toolkit/visual-studio-code-overview.md) |
|07/01/2020|Single sign-on for tabs GA for Teams web and desktop clients|[Single Sign-On (SSO)](tabs/how-to/authentication/auth-aad-sso.md)|
|06/05/2020| Manifest Schema updated to version 1.7| [Reference: Manifest schema for Microsoft Teams](resources/schema/manifest-schema.md)|
| 05/20/2020 | Resource-specific consent permissions using Microsoft Graph APIs is in developer preview. |[Resource-specific consent (RSC) — Developer Preview](graph-api/rsc/resource-specific-consent.md) |
|5/18/2020|Integrate Power Virtual Agents with Teams|[Integrate a Power Virtual Agents chatbot with Microsoft Teams](bots/how-to/add-power-virtual-agents-bot-to-teams.md)|
|04/01/2020|Integrate WFM systems with Shifts Connector for Teams|[Microsoft Teams Shifts WFM connectors](samples/shifts-wfm-connectors.md)
| 03/24/2020 | Added support for retrieving a single member of a conversation, and additional support for retrieving paged members. | [Get Teams context for your bot](~/bots/how-to/get-teams-context.md)
| 12/26/2019 | The `replyToId` parameter in payloads sent to a bot is no longer encrypted, allowing you to use this value to construct deeplinks to these messages. Message payloads include the encrypted values in the parameter. `legacy.replyToId`.  |
| 11/5/2019 | Single sign-on using the Teams JavaScript SDK in a web content page is in developer preview. | [Single sign-on](tabs/how-to/authentication/auth-aad-sso.md) |
| 10/31/2019 | Conversational bots and messaging extension documentation updated to reflect the 4.6 Bot Framework SDK. Documentation for the v3 SDK is available in the Resources section. | All bot and messaging extension documentation. |
| 10/31/2019 | New documentation structure, and major article refactoring. Please report any dead links or 404's by creating a GitHub Issue. | All of them! |
| 9/13/2019 | Request bot is installed from action-based messaging extension. | [Initiate actions with messaging extensions](resources/messaging-extension-v3/create-extensions.md#request-to-install-your-conversational-bot)
| 8/28/2019 | Support for private channels in tabs and Connectors. | [Get context for your tab](tabs/how-to/access-teams-context.md#retrieving-context-in-private-channels) |
| 06/20/2019 | Share an external website, from an external website, into a Teams channel. | [Share to Teams](~/share-to-teams.md) |
| 05/25/2019 | Respond with bot message from task module. | [Respond with bot message from task module](resources/messaging-extension-v3/create-extensions.md#respond-with-an-adaptive-card-message-sent-from-a-bot) |
| 05/25/2019 | Bots in group chats. | [Interact with a bot in group chat or channel](~/concepts/bots/bot-conversations/bots-conv-channel.md) |
| 05/20/2019 | App manifest localization. | [App localization](~/publishing/apps-localization.md) |
| 05/20/2019 | Message actions. | [Message Actions](resources/messaging-extension-v3/create-extensions.md#action-type-message-extensions) |
| 05/20/2019 | Link unfurling (custom URL previews). | [Link unfurling](messaging-extensions/how-to/link-unfurling.md)|
| 05/06/2019 | Application Certification program for store apps. | [Application Certification](~/publishing/application-certification.md) |
| 05/06/2019 | App Templates are now available. | [App Templates](~/samples/app-templates.md) |
| 04/23/2019 | Action-based Messaging Extensions are now available. | [Action-based Message Extensions](~/concepts/messaging-extensions/create-extensions.md) |
| 02/18/2019 | Creating deep links to private chat is out of developer preview and available. | [Deep linking to a chat](concepts/build-and-test/deep-links.md#deep-linking-to-a-chat) |
| 01/23/2019 | Surfacing SKU and licenceType information in the tab context. | [Tab Context](~/concepts/tabs/tabs-context.md) |
| 11/12/2018 | Tabs in group chat is now available in the released version of Teams, and has been moved out of developer preview. As part of this work, the tabs section has been reworked for clarity.| [Configurable tabs](~/concepts/tabs/tabs-configurable.md) |
| 11/11/2018 | Getting started for Node JS and for .NET/C# has been updated to use App Studio in Teams, and a new section has been added on hosting Node based Teams apps in Azure. | [Get started on the Microsoft Teams platform with C#/.NET and App Studio](~/get-started/get-started-dotnet-app-studio.md),  [Get started on the Microsoft Teams platform with Node JS and App Studio](~/get-started/get-started-nodejs-app-studio.md), [Host your Node Teams app in Azure](~/get-started/get-started-nodejs-in-azure.md)|
| 11/09/2018 | You can now create deep links to private chats between users. | [Deep linking to a chat](concepts/build-and-test/deep-links.md#deep-linking-to-a-chat) |
| 11/08/2018 | SharePoint Framework 1.7 has shipped and with it a new feature to use Microsoft Teams tab as a SharePoint Framework web part. | [Tabs in SharePoint](~/concepts/tabs/tabs-in-sharepoint.md) |
| 11/05/2018 | The "task module" feature was released. A task module allows you to create modal popup experiences in your Teams application, from both bots and tabs. Inside the popup, you can run your own custom HTML/JavaScript code, show an `<iframe>`-based widget such as a YouTube or Microsoft Stream video, or display an [Adaptive card](https://docs.microsoft.com/adaptive-cards/). | [Task module Overview](~/concepts/task-modules/task-modules-overview.md), [task module in tabs](~/concepts/task-modules/task-modules-tabs.md),  [task module in bots](~/concepts/task-modules/task-modules-bots.md) |
| 10/05/2018 | Formatting information for cards has been updated, and tested in the desktop, iOS and Android clients for Teams. | [Cards](~/concepts/cards/cards.md), [Card formatting](~/concepts/cards/cards-format.md) |
| 09/24/2018 | Calls and online meetings APIs for Microsoft Graph were released to beta, and Teams apps can now interact with users in rich ways using voice and video. | [Calls and online meetings bots](~/concepts/calls-and-meetings/registering-calling-bot.md), [Real-time media concepts](~/concepts/calls-and-meetings/real-time-media-concepts.md), [Registering a calling bot](~/concepts/calls-and-meetings/registering-calling-bot.md), [Debugging and local testing](~/concepts/calls-and-meetings/debugging-local-testing-calling-meeting-bots.md), [Application-hosted media](~/concepts/calls-and-meetings/requirements-considerations-application-hosted-media-bots.md), [Handling incoming call notifications](~/concepts/calls-and-meetings/call-notifications.md) |
| 09/11/2018 | Tab configuration pages are now significantly taller. | [Tab Design](tabs/design/tabs.md) |
| 08/15/2018 | Adaptive cards are now supported in Teams.|[Adaptive card actions in Teams](task-modules-and-cards/cards/cards-reference.md#adaptive-card) |
| 08/10/2018 | Client support for DevTools has been documented for Developer Preview.| [DevTools for the Microsoft Teams Desktop Client](~/resources/dev-preview/developer-preview-tools.md)|
| 08/08/2018 | Messaging extensions now supports multiple commands. This feature has been in Developer Preview, and is now released to all users.| [composeExtensions.commands](~/resources/schema/manifest-schema.md#composeextensionscommands)|
| 08/07/2018 | Inline configuration is now supported in Connectors. The Connectors documentation has also been revised and expanded for clarity.| [Connectors](~/concepts/connectors/connectors.md)|
| 08/06/2018 | Your bot can now send and receive files.| [Send and receive files through your bot](~/concepts/bots/bots-files.md)|
| 07/27/2018 | The developer preview now supports multiple commands in messaging extensions. | [Messaging extensions have been extended](~/resources/dev-preview/developer-preview-features.md)|
| 07/23/2018 | Information about app re-certification has been added to the Publishing section. |[Manifest permissions](resources/schema/manifest-schema.md#permissions)|
| 07/16/2018 | In developer preview, more space has been allocated to the tab configuration page. | [The tab configuration page is significantly taller](tabs/design/tabs.md)|
| 07/12/2018 | Information on guest access. | [Guest access in Microsoft Teams](https://docs.microsoft.com/microsoftteams/guest-access#guest-access-overview)|
| 06/07/2018 | Pre-release information for the Microsoft Teams Tenant App Catalog has been added. | [Publish your Microsoft Teams app](~/publishing/apps-publish.md)|
| 05/31/2018 | The Teams developer preview (ring 3.6) has been updated to include the ability to add bots and tabs to group chat. | [Features in the developer preview](~/resources/dev-preview/developer-preview-features.md), [Developer preview schema](~/resources/schema/manifest-schema-dev-preview.md)|
| 05/29/2018 | Adaptive cards are now supported in Teams in the [Adaptive card actions in Teams](task-modules-and-cards/cards/cards-reference.md). |
| 05/29/2018 | If you are using the [developer preview](~/resources/dev-preview/developer-preview-intro.md), your bot can now send and receive files.| [Send and receive files through your bot](~/concepts/bots/bots-files.md), [Features in the Public Developer Preview for Microsoft Teams](~/resources/dev-preview/developer-preview-features.md)|
| 04/17/2018 | replyToID has been added to the payload for the `Invoke` and `MessageBack` card actions. This is especially useful if you need to update the message that the card action came from. | [Card actions](~/concepts/cards/cards-actions.md)|
| 04/12/2018 | Added this topic to track changes to the Teams programming interface and this documentation set. | [What's new](~/whats-new.md)|
| 04/10/2018 | Changed authentication URLs to consistently use the tenant ID in the path. | [Authentication flow for Tabs](~/concepts/authentication/auth-flow-tab.md), [AAD Tab authentication](~/concepts/authentication/auth-tab-AAD.md)|
| 04/06/2018 | Added design guidelines for using the Command Box. |[Command box](~/resources/design/framework/command-box.md)|
| 04/02/2018 | Using bots to send notifications for your app. |[Notification-only bots](~/concepts/bots/bots-notification-only.md)|
| 03/27/2018 | Expanded documentation for proactive messaging. |[Starting a conversation](./concepts/bots/bot-conversations/bots-conv-proactive.md)|
| 03/15/2018 | Refactored documentation for cards. |[Cards](~/concepts/cards/cards.md), [Card actions](~/concepts/cards/cards-actions.md), [Card formatting](~/concepts/cards/cards-format.md), [Card reference](~/concepts/cards/cards-reference.md)|
| 03/03/2018 | Added documentation for Teams App Studio. |[Quickly develop apps with Teams App Studio](~/get-started/get-started-app-studio.md), [Using the control library in App Studio](~/get-started/app-studio-component-library.md)|
| 02/27/2018 | Added sample code to demonstrate AsTeamsChannelAccounts() method. |[Get context for your bot](~/concepts/bots/bots-context.md)|
| 02/05/2018 | Added topics for getting started using C#. |[Get started on the Microsoft Teams platform with C#/.NET](./get-started/get-started-dotnet-app-studio.md)|

## Submit your questions, bugs, feature requests, and contributions

We listen to the developer community across [several channels](feedback.md).
