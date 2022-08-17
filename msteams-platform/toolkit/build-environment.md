---
title: Prepare to build apps with Teams Toolkit
author: surbhigupta
description:  In this article, you'll learn how to build environment of Teams Toolkit and manage the app in Developer Portal
ms.author: v-amprasad
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Prepare to build apps with Teams Toolkit

Microsoft Teams Toolkit in Visual Studio Code offers set of environments to build your Teams app. If you create an app using Teams Toolkit for Visual Studio Code, then you can manage the app in the Developer Portal. You can choose anyone of the following environment that best suits your app:

* JavaScript/TypeScript
* SharePoint Framework (SPFx)

## Create your Teams app using JavaScript or TypeScript

Teams Toolkit in Visual Studio Code supports building apps using JavaScript/TypeScript. The apps built with JavaScript have the following advantages:

* App comes with its own UI and UX capabilities that are rich and user friendly.
* Provides quick upgrades to existing apps.
* Distributes apps on multiple platforms, such as Android and iOS.
* Compatible for creating an app with existing APIs.

## Create your Teams app using SPFx

Teams Toolkit in Visual Studio Code allows you to create apps using SPFx. These apps have the following advantages:

* Provides you easy integration with data residing in SharePoint to your Teams.
* You can integrate your SPFx solution with your business APIs secured with Azure Active Directory.
* Gives you Accesses to various open-source tools.
* Creates for your powerful applications that can deliver a great UX.
* Integrates with other Microsoft (Office) 365 workloads easily.
* Delivers flexibility to host applications wherever needed.

## App types built with Teams Toolkit

Teams Toolkit allows you to build different app types using JavaScript and SPFx:

* Tab app using JavaScript
* Bot app using JavaScript
* Notification bot with JavaScript
* Message extension app with JavaScript
* Apps using SPFx

## Manage your apps using Developer Portal

As Teams Toolkit is integrated with developer portal, you can configure, distribute, and manage your app using <a href="https://dev.teams.microsoft.com" target="_blank">Developer Portal for Teams</a> under **DEPLOYMENT** after creating an app. For more information, see [manage your Teams apps using Developer Portal](../concepts/build-and-test/teams-developer-portal.md).

:::image type="content" source="../assets/images/Tools-and-SDK-revamp/teams-toolkit-VSC/vsc-build-environment/build-environment-developer-portal-1.png" alt-text="Steps to build environment using developer portal":::

## Support for Azure functions

Teams Toolkit provides Azure functions capabilities to integrate into building apps. Azure functions help to focus on the pieces of code that matter most and it does the rest.
Azure functions allow you to implement:

1. System logic into your readily available blocks of code. These blocks are called functions.
1. As the requests increases, Azure functions meet the demand with as many demands as necessary.

A function integrates with an array of cloud services to provide feature-rich implementations. The following are just a few common scenarios for Azure functions:

* When building a web API.
* Processing to database changes.
* Processing Iot data streams.
* Managing message queues.

## See also

* [Teams Toolkit for Visual Studio](visual-studio-overview.md)
* [Manage your Teams apps using Developer Portal](../concepts/build-and-test/teams-developer-portal.md)
* [Create a new Teams app using Teams Toolkit](create-new-project.md)
