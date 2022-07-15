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

For Teams app development, similar to Teams Toolkit for Visual Studio Code, you can use [CLI tool](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/cli/user-manual.md), which consists of Toolkit `teamsfx`.
Teams Toolkit brings all tools needed for building a Teams app in one place.

## User journey of Teams Toolkit

Teams Toolkit automates manual work and provides great integration of Teams and Azure resources. The following image shows Teams Toolkit user journey:

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/teams-toolkit-user-journey1.png" alt-text="User Journey of the Teams Toolkit" lightbox="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/teams-toolkit-user-journey2.png":::

The main milestones of this journey are:

1. Start by creating a new project or trying a sample Teams app.
1. Add capabilities or edit manifest file as needed.
1. Use Microsoft 365 account to build and debug your Teams app.
1. Use Azure account to provision and deploy your app to cloud.
1. Publish your app to Teams.

## Teams Toolkit Features

The following list of provides the list of features available in Teams Toolkit:

 |Features|Functionalities|
 |---------------|----------|
 | Javascript app | You can build Tab, Bot, and message extension app |
 | Multiple build environments | By default you have dev and local environment and you can create your own environment to develop Teams app |
 | SPFx tab | Webpages with sharepoint framework embeded in MS Teams |
 | SSO-enabled tab | Identity aware webpages |
 | Azure functions | Event driven compute solution |
 | Azure API management | Hybrid, multicloud management platform for APIs across all environments |
 | Azure SQL Database | Up to date relational database service for cloud |
 | Azure Key Vault | Cloud service for securely storing and accession secrets |
 | Single sign-on | |
 | API connection | Connect to an API with authentication support using TeamsFx SDK |
 | CI/CD workflow | Add CI/CD workflows for Github, ADO or Jenkins |
 | Provision in the cloud | Using multiple environments and subscriptions |
 | Edit manifest | Updating manifest based on the requirements |
 | Preview and debug adaptive cards | Preview and debug our own adaptive card |
 | Developer Portal for Teams | Create a new app and import an existing app |
