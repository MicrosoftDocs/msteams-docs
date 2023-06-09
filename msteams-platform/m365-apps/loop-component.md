---
title: Technical Guidelines for building Loop
description:
ms.author: mobajemu
ms.date: 02/28/2023
ms.topic: tutorial
ms.custom: m365apps
ms.localizationpriority: medium
---

# Technical Guidelines for building Loop components (Developer Preview)

## Overview

Loop components are live and actionable units of productivity that allow users to bring external content that always stays in sync as it moves across Microsoft 365 apps starting with Teams chat and Outlook Web app. At Microsoft Build 2022, Microsoft introduced the ability for developers to create Loop components by evolving an existing Adaptive Card into a Loop component or creating a new Adaptive Card-based Loop component. This guidance applies to the developer preview of Adaptive Card-based Loop components, beginning in July 2022.

For more detail on this new capability, see [Microsoft Blog: Create Loop components by updating Adaptive Cards](https://www.microsoft.com/en-us/microsoft-365/blog/2022/05/24/build-collaborative-apps-with-microsoft-teams/) and [Breakout Session: Build collaborative apps with Microsoft Teams and Microsoft 365 services, beginning](https://mybuild.microsoft.com/en-US/sessions/5ff4ebc7-c631-4a67-9a47-279539b07d09?source=sessions) at 10:57. 

## Pre-Requisites

Below is the list of pre-requisites you need to meet before you can start building an Adaptive Card-based Loop component. 
In the subsequent sections we dive deeper into these pre-requisites

1. Build a search-based Message Extension and add link unfurling support
1. Use Universal Actions
1. Extend your Teams Message Extension to Outlook

### Build a search-based Message Extension and add link unfurling support

Before you can build an Adaptive Card-based Loop component ensure you have a Message Extension in place implementing Link unfurling and Search command. If you already have a Message Extension and have implemented a search command and added link unfurling support, you can skip to the next step.

Search commands allow end-users to search an external system for information. The users can select an item from the search result and insert them in chats and emails as a rich interactive card. The inserted card is the Adaptive Card-based Loop component.

Link unfurling allows for unfurling URLs inserted in a mail or chat message body, into a rich, live, and actionable card. Please make sure to use [Adaptive Card](https://docs.microsoft.com/en-us/microsoftteams/platform/task-modules-and-cards/cards/cards-reference#adaptive-card) as the response card since we only support Adaptive-Card based Loop components. Link unfurling improves the user experience by letting users complete a task in the context they are in while also providing a rich preview of the underlying content. Additionally, link unfurling support is essential to make the experience portable across Teams and Outlook.

To learn more about Message Extensions, Search Commands and Link Unfurling refer to the following links-

* [Message extensions - Teams | Microsoft Docs](https://docs.microsoft.com/en-us/microsoftteams/platform/messaging-extensions/what-are-messaging-extensions?tabs=dotnet)
* [Define message extension search commands - Teams | Microsoft Docs](https://docs.microsoft.com/en-us/microsoftteams/platform/messaging-extensions/how-to/search-commands/define-search-command)
    * [Step-by-step guide to build search-based message extension - Teams | Microsoft Docs](https://docs.microsoft.com/en-us/microsoftteams/platform/sbs-messagingextension-searchcommand?tabs=latestversionofvisualstudio)
* [Link unfurling - Teams | Microsoft Docs](https://docs.microsoft.com/en-us/microsoftteams/platform/messaging-extensions/how-to/link-unfurling?tabs=dotnet)
    * [Step-by-step guide to build link unfurling support using bot](https://docs.microsoft.com/en-us/microsoftteams/platform/sbs-botbuilder-linkunfurling?tabs=vs)

### Use Universal Actions

Your Message Extension app must use AC spec 1.4 in your AC payloads to support actionability across Teams and Outlook hubs. For details, refer to [Work with Universal Actions for Adaptive Cards - Teams | Microsoft Docs](https://docs.microsoft.com/en-us/microsoftteams/platform/task-modules-and-cards/cards/universal-actions-for-adaptive-cards/work-with-universal-actions-for-adaptive-cards)

### Extend your Teams Message Extension to Outlook

Once you have a Message Extension with Search command enabled in Teams, you need to extend it to Outlook. If you already have your Message Extension enabled in Teams and Outlook, skip to the next step. For details, refer to [Extend a Teams message extension across Microsoft 365 - Teams | Microsoft Docs](https://docs.microsoft.com/en-us/microsoftteams/platform/m365-apps/extend-m365-teams-message-extension?tabs=manifest-teams-toolkit)

## Build Loop Components

Once you meet all the pre-requisites you can now evolve the Adaptive Card into a Loop component that is rich, actionable and portable across M365 applications (for now Teams and Outlook). There are two steps to building a Loop component:

1. Ensure the Adaptive Card adheres to the Loop component UX guidelines
1. Enable Loop component

### Ensure the Adaptive Card adheres to the Loop component UX guidelines

Along with this document you should have received another document covering UX guidelines for building Loop components. It is essential that you follow these guidelines to ensure you build an actionable and coherent Adaptive Card based experience for your end users such that it meets the Loop component end-user promises.

### Enable Loop component

Once you have met all the pre-requisites and your Adaptive Card is built as per the guidelines, you can go ahead and enable the experience as a Loop component by including the URL that uniquely identifies the card in the metadata.webUrl field of your Adaptive Card payload. This is required to support portability via the Copy button present in the Loop header. For details on the new Adaptive Card property refer to: [Adaptive Card v1.6](https://github.com/microsoft/adaptivecards/pull/7105)

## Test your Loop Component

### Setup your dev environment to test in Teams

To set up and test your application and the component experience in Teams please use the developer portal. The Developer Portal provides options for testing and debugging your app:

* On the **Overview page**, you can see a snapshot of whether your app's configurations validate against Teams store 
test cases.
* The **Preview in Teams** button lets you launch your app quickly in the Teams client for debugging.

Detailed instructions can be found at- [Manage your apps with the Developer Portal - Teams | Microsoft Docs](https://learn.microsoft.com/en-us/microsoftteams/platform/concepts/build-and-test/teams-developer-portal#test-your-app-directly-in-teams)

### Setup your dev environment to test in Outlook

Follow these steps to turn on the AC-based Loop component in Outlook.com:

1. [Launch Outlook Web with feature flight override](https://outlooksdf.office.com/mail/?&cardLoop.componentEnabled=on)
1. Login with the test tenant credentials shared with you by Microsoft
1. Click on rollout overrider button in the top ribbon
1. Make sure to **turn on** these flights - **cmp-fluid-devOnlyGenericLoaderAllLinks, cmp-fluid-chapterThree** and to 
turn off this flight - **cmp-fluid-useProvidersForME**

> [!NOTE]
> The above flags should be turned on/ off at both sender’s and receiver’s end for the experiences to work seamlessly.

1. The Adaptive Card generated by your app now should be rendered as a Loop component

Contact Us
If you have any follow-up questions or want to report an issue, please reach out to us at acloops-previewhelp@microsoft.com