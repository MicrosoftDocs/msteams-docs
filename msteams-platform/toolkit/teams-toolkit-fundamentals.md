---
title: Teams Toolkit Overview
author: zyxiaoyuer
description: In this module, learn Teams Toolkit, Installation of Teams Toolkit, and User journey of Teams Toolkit
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/24/2022
---

# Teams Toolkit Overview

Teams Toolkit lets you create, debug, and deploy your Teams app right from Visual Studio Code.App development with the toolkit has the following advantages:

* Integrated identity
* Access to cloud storage
* Data from Microsoft Graph
* Azure and Microsoft 365 services with zero-configuration approach.

For Teams app development, similar to Teams Toolkit for Visual Studio, you can use [CLI tool](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/cli/user-manual.md), which consists of Toolkit `teamsfx`.

## User journey of Teams Toolkit

Teams Toolkit automates manual work and provides great integration of Teams and Azure resources. The following image shows Teams Toolkit user journey:

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/teams-toolkit-user-journey2.png" alt-text="User Journey of the Teams Toolkit" lightbox="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/teams-toolkit-user-journey2.png":::

The main milestones of this journey are:

1. Start by creating a new project or trying a sample Teams app.
1. Add capabilities or edit manifest file as needed.
1. Use Microsoft 365 account to build and debug your Teams app.
1. Use Azure account to provision and deploy your app to cloud.
1. Publish your app to Teams.

The following table helps you to get the overview of Teams Toolkit in Visual Studio Code:

| Process | Description |
| ---- | ---- |
| Install Teams Toolkit | You can install Teams Toolkit in two ways <br> - Using Visual Studio Code <br> - Using Visual Studio Code Marketplace|
| Support for build environments | You have two different types of environment <br> - Javascript or Typescript <br> - SPFx |
| Support for app types and Azure function | There are two different types of apps <br> - Capability based app such as tab, bot, message extension  <br> - Scenerio based Teams app such as notification bot, command bot and SSO enabled personal tab |
| Develop your Teams app | It contains <br> - Add and manage environment <br> - Create multi-capability app <br> - Create capability based cloud resources <br> - Integrate third party API <br> - Customize manifest file <br> - TeamsFx SDK |
| Debug your Teams app | It contains <br> - Debug your Teams app locally <br> - Debug background process|
| Host your Teams app | It contains <br> - Provision resources to the cloud <br> - Deploy to the cloud|
| Test your Teams app | It contains <br> - Integrate and collabrate <br> - Zip Teams metadata package <br> - Sideload and test app in Teams environment <br> - Test app behavior in different environment|
| Publish your Teams app | It contains <br> - Publish your app <br> - Manage admin approval <br> - Publish to store <br> - Integrate with Developer Portal |

### Entities integrated with Teams Toolkit

Teams Toolkit is an extension in Visual Studio Code. It is integrated with the following entities within Teams Toolkit.such as Azure AD and Microsoft 365, Developer Portal and Microsoft graph. All the entities are integrated within Teams Toolkit and help users to create an app.

| Entities | Description |
| ---- | ---- |
| Azure AD  | Azure Active Directory (Azure AD) is a cloud-based identity and access management service. This service helps your employees access external resources, such as Microsoft 365, the Azure portal, and thousands of other SaaS applications. |
| Microsoft 365  | Teams developer account while developing an app.|
| Developer Portal | The Developer Portal for Teams is the primary tool for configuring, distributing, and managing your Microsoft Teams apps. With the Developer Portal, you can collaborate with colleagues on your app, set up runtime environments, and much more. |
| Microsoft Graph | Microsoft Graph is the gateway to data and intelligence in Microsoft 365. It provides a unified programmability model that you can use to access the tremendous amount of data in Microsoft 365, Windows, and Enterprise Mobility + Security. |

Teams Toolkit brings all tools needed for building a Teams app in one place.

## Manage your apps using Developer Portal

As Teams Toolkit is integrated with Developer Portal, you can configure, distribute, and manage your app using [Developer Portal for Teams](../concepts/build-and-test/teams-developer-portal.md) under DEPLOYMENT after creating an app. For more information, see [manage your Teams apps using Developer Portal](../concepts/build-and-test/manage-your-apps-in-developer-portal.md).

:::image type="content" source="../assets/images/teams-toolkit-v2/build-environment-developer-portal-1.png" alt-text="Developer Portal":::

## See also

* [Create a new Teams project](create-new-project.md)
* [Install Teams Toolkit](install-Teams-Toolkit.md)
* [Explore Teams Toolkit](explore-Teams-Toolkit.md)
* [Prepare to build apps using Microsoft Teams Toolkit](build-environments.md)
