---
title: Prepare to build apps with Teams Toolkit
author: surbhigupta
description:  In this article, you'll learn how to build environment of Teams Toolkit and manage the app in Developer Portal
ms.author: v-amprasad
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Prepare to build apps using Microsoft Teams Toolkit

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/teams-toolkit-VSC/vsc-build-environment/buildapps-TTK.png" alt-text="Prepare to build apps using teams toolkit":::

Teams Toolkit in Microsoft Visual Studio Code offers set of environments to build your Teams app. If you create an app using Teams Toolkit for Visual Studio Code, you can choose anyone of the following environment that best suits your app:

* JavaScript/TypeScript
* SharePoint Framework (SPFx)

## Create your Teams app using JavaScript or TypeScript

The apps built with JavaScript have the following advantages:

* App comes with its own UI and UX capabilities that are rich and user friendly.
* Provides quick upgrades to existing apps.
* Distributes apps on multiple platforms, such as Android and iOS.
* Compatible for creating an app with existing APIs.

Teams Toolkit in Visual Studio Code supports building the following apps using JavaScript/TypeScript:

* Tab app: Your tab app can have web-based content, you can have a custom tab for your web content in Teams or add Teams-specific functionality to your web content.
* Bot app: Bots can be chat bot or conversational bot that allows you to do simple and repetitive tasks like customer service or support staff.
* Notification bot: You can send messages in Teams channel or group or personal chat by Notification bots with HTTP request.
* Command bot: You can automate repetitive tasks using command bot. Command bots help you to answers simple queries or commands sent in chats.
* Message extensions: You can interact with your web service through buttons and forms. Capability provided by message extension.

## Create your Teams app using SPFx

Teams Toolkit in Visual Studio Code allows you to create tab apps using SPFx. These apps have the following advantages:

* Provides you easy integration with data residing in SharePoint to your Teams.
* You can integrate your SPFx solution with your business APIs secured with Microsoft Azure Active Directory (Azure AD).
* Gives you Accesses to various open-source tools.
* Creates for your powerful applications that can deliver a great UX.
* Integrates with other Microsoft (Office) 365 workloads easily.
* Delivers flexibility to host applications wherever needed.

## Support for Azure Functions

You can use Teams Toolkit to integrate [Azure Functions](/azure/azure-functions/functions-overview) capabilities into building apps. You can focus on the pieces of code that matter most and Azure Functions do the rest.
Azure functions allow you to implement:

1. System logic into your readily available blocks of code. These blocks are called functions.
1. As the requests increases, Azure Functions meets the requirement with as many demands as necessary.

Azure Function integrates with an array of [cloud services](add-resource.md#types-of-cloud-resources) provide feature-rich implementations. The following are just a few common scenarios for Azure functions:

* When building a web API
* Processing to database changes
* Processing Iot data streams
* Managing message queues

## See also

* [Teams Toolkit for Visual Studio](visual-studio-overview.md)
* [Manage your Teams apps using Developer Portal](../concepts/build-and-test/teams-developer-portal.md)
* [Create a new Teams app using Teams Toolkit](create-new-project.md)
