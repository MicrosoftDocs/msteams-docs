---
title: Teams Toolkit Overview
author: zyxiaoyuer
description: In this module, learn Teams Toolkit, Installation of Teams Toolkit, and User journey of Teams Toolkit
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/24/2022
zone_pivot_groups: teams-app-platform
---

# Teams Toolkit Overview

Teams Toolkit is a capability feature which allows you to perform multi-functions in both Microsoft Visual Studio Code as well as Visual Studio. With the help of Teams Toolkit you can automate the process from creating to deploying and customizing your app. The various features and advantages of Teams Toolkit are discussed in the respective documentation for the environments you choose.

::: zone pivot="visual-studio-code"

## Teams Toolkit Overview for  Visual Studio Code

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
| Install Teams Toolkit | You can install Teams Toolkit in two ways: <br> - Using Visual Studio Code <br> - Using Visual Studio Code Marketplace|
| Support for build environments | You have two different types of environment: <br> - Javascript or Typescript <br> - SPFx |
| Support for app types and Azure function | There are two different types of apps: <br> - Capability-based app such as tab, bot, message extension  <br> - Scenario-based Teams app such as notification bot, command bot and SSO enabled personal tab |
| Develop your Teams app | It contains: <br> - Add and manage environment <br> - Create multi-capability app <br> - Create capability based cloud resources <br> - Integrate third party API <br> - Customize manifest file <br> - TeamsFx SDK |
| Debug your Teams app | It contains: <br> - Debug your Teams app locally <br> - Debug background process|
| Host your Teams app | It contains: <br> - Provision resources to the cloud <br> - Deploy to the cloud|
| Test your Teams app | It contains: <br> - Integrate and collabrate <br> - Zip Teams metadata package <br> - Sideload and test app in Teams environment <br> - Test app behavior in different environment|
| Publish your Teams app | It contains: <br> - Publish your app <br> - Manage admin approval <br> - Publish to store <br> - Integrate with Developer Portal |

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

::: zone-end

::: zone pivot="visual-studio"

## Teams Toolkit overview for Visual Studio

Teams Toolkit for Visual Studio helps you to create, debug and deploy Microsoft Teams apps. Teams Toolkit for Visual Studio is GA in Visual Studio 2022 version 17.3. App development with Teams Toolkit has the advantages of:

* Integrated identity
* Access to cloud storage
* Data from Microsoft Graph
* Azure and Microsoft 365 services with zero-configuration approach

For Teams app development, you can also use [CLI tool](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/cli/user-manual.md), similar to Teams Toolkit for Microsoft Visual Studio code that includes Toolkit `teamsfx`.

Teams Toolkit brings all the tools needed to build a Teams app in one place.

> [!NOTE]
> Teams Toolkit is not available in other versions.

## User Journey of Teams Toolkit

Teams Toolkit automates manual work and provides you with great integration of Teams and Azure resources. The following image shows the user journey:

:::image type="content" source="../assets/images/teams-toolkit-overview/teams-toolkit-user-journey.png" alt-text="Teams toolkit user journey" lightbox="../assets/images/teams-toolkit-overview/teams-toolkit-user-journey.png":::

The main milestones of this journey are:

1. You can start by creating a new project or try building a sample Teams app.
1. You can then edit code or the manifest file as required.
1. For building and debugging the Teams app you can use your Microsoft 365 account.
1. For provisioning and deploying your app to cloud you can use your Azure account.
1. You can finally publish your app to Teams.

The following operations aren't supported in Teams Toolkit for Visual Studio yet compared to Teams Toolkit for Microsoft Visual Studio Code, however they're planned in the future product road map.

* Add another Teams capabilities to your Teams app
* Add more Azure resources to your Teams app
* Add Single Sign-on (SSO) to your Teams app
* Add API connection to your Teams app
* Customize Microsoft Azure Active Directory (Azure AD) manifest
* Add CI/CD pipelines
* Manage multiple cloud environments
* Collaborate on Teams projects
* Publish Teams app

### TeamsFx .NET SDK Reference docs

* [Microsoft.Extensions.DependencyInjection Namespace](/../dotnet/api/Microsoft.Extensions.DependencyInjection)
* [Microsoft.TeamsFx Namespace](/../dotnet/api/Microsoft.TeamsFx)
* [Microsoft.TeamsFx.Configuration Namespace](/../dotnet/api/Microsoft.TeamsFx.Configuration)
* [Microsoft.TeamsFx.Conversation Namespace](/../dotnet/api/Microsoft.TeamsFx.Conversation)
* [Microsoft.TeamsFx.Helper Namespace](/../dotnet/api/Microsoft.TeamsFx.Helper)

::: zone-end

## See also

* [Create new Teams app in Visual Studio](create-new-teams-app-for-Visual-Studio.md)
* [Provision cloud resources using Visual Studio](provision-cloud-resources.md)
* [Deploy Teams app to the cloud using Visual Studio](deploy-teams-app.md)

