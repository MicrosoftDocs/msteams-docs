---
title: Guidelines for building Loop components
description:
ms.author: mobajemu
ms.date: 06/15/2023
ms.topic: tutorial
ms.custom: m365apps
ms.localizationpriority: medium
---

# Guidelines for building Loop components 

## Overview

Loop component is an evolution of Fluid component - a way to collaborate with a team through loop whether it’s in chat, email, meeting, or Loop page. Loop component stays in sync no matter how many places the content lives across Microsoft 365 apps.

## Getting started

Steps to build an Adaptive Card-based Loop component.

1. Build a search-based Message Extension
1. Add link unfurling support to the Message Extension
1. Use Universal Actions for Adaptive Cards
1. Extend your Teams Message Extension to Outlook

In the subsequent sections we dive deeper into these pre-requisites

### Build a search-based Message Extension

To begin building an Adaptive Card-based Loop component, firstly follow the steps to [build a Message Extension with a Search command and Link unfurling](../messaging-extensions/what-are-messaging-extensions.md ). 

[Search commands](../sbs-messagingextension-searchcommand.yml) allow end-users to search an external system for information. The users can select an item from the search result and insert them in chats and emails as a rich interactive card. The inserted card is the [Adaptive Card](../task-modules-and-cards/cards/cards-reference.md#adaptive-card)-based Loop component.

### Add link unfurling support

[Link unfurling](../messaging-extensions/how-to/link-unfurling.md) allows for unfurling URLs inserted in a mail or chat message body, into a rich, live, and actionable card. Link unfurling improves the user experience by letting users complete a task in the context they are in while also providing a rich preview of the underlying content. Additionally, link unfurling support is essential to make the experience portable across Teams and Outlook.

### Use Universal Actions for Adaptive Cards

[Universal Actions](../task-modules-and-cards/cards/Universal-actions-for-adaptive-cards/Work-with-Universal-Actions-for-Adaptive-Cards.md) for Adaptive Cards provides a way to implement Adaptive Card based scenarios for both, Teams and Outlook. Your Message Extension app must use [Adaptive Card spec 1.6](https://github.com/microsoft/adaptivecards/pull/7105) in your AC payloads to support actionability across Teams and Outlook hubs.

### Extend your Teams Message Extension across Microsoft 365

Extending your message across Microsoft 365 products allows you build your extension once and run it everywhere available within Microsoft 365. It entails updating the app manifest, adding the Microsoft 365 channel to your bot, and sideloading it into Microsoft Teams. For more details, refer to the topic, [Extending a Teams message across Microsoft 365](extend-m365-teams-message-extension.md).

## Build Loop Components

Once you have met all the requirements you can now evolve the Adaptive Card into a Loop component that is rich, actionable, and portable across Microsoft 365 applications. There are two steps to building a Loop component:

1. Ensure the Adaptive Card adheres to the [Loop component UX guidelines](loop-ux-guide.md) to build an actionable and coherent Adaptive Card based experience for your end users.
1. Enable Loop component by including the URL that uniquely identifies the card in the metadata.webUrl field of your Adaptive Card payload. This is required to support portability via the Copy button present in the Loop header.

> [!NOTE]  
> For details on the new Adaptive Card property refer to: [Adaptive Card v1.6](https://github.com/microsoft/adaptivecards/pull/7105).

## Test your Loop Component

### Setup your dev environment to test in Teams

To configure, distribute and manage your application use the Developer Portal for Teams. For more detailed instruction on how to register your application can be found at [Manage your apps with the Developer Portal](../concepts/build-and-test/teams-developer-portal.md#test-your-app-directly-in-teams). The Developer Portal provides options for testing and debugging your app:

* On the **Overview page**, you can see a snapshot of whether your app's configurations validate against Teams store 
test cases.
* The **Preview in Teams** button lets you launch your app quickly in the Teams client for debugging.

### Setup your dev environment to test in Outlook

To turn on the Adaptive Card based Loop component in Outlook.com:

1. [Launch Outlook Web with feature flight override](https://outlook-sdf.office.com/mail/?&cardLoop.componentEnabled=on)
1. Login with the test tenant credentials shared with you by Microsoft
1. Click on rollout overrider button in the top ribbon
1. Make sure to **turn on** these flights - **cmp-fluid-devOnlyGenericLoaderAllLinks, cmp-fluid-chapterThree** and to 
turn off this flight, **cmp-fluid-useProvidersForME**
    > [!NOTE]
    > The above flags should be turned on/ off at both sender’s and receiver’s end for the experiences to work seamlessly.

1. The Adaptive Card generated by your app now should be rendered as a Loop component