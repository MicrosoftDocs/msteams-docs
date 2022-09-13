---
title: Teams Toolkit overview for Visual Studio
author: surbhigupta
description: In this module, learn Teams Toolkit Overview for Visual Studio
ms.author: v-amprasad
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/24/2022
---

# Teams Toolkit overview for Microsoft Visual Studio

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

* Add another Teams capabilities to your Teams app.
* Add more Azure resources to your Teams app
* Add Single Sign-on (SSO) to your Teams app.
* Add API connection to your Teams app.
* Customize Microsoft Azure Active Directory (Azure AD) manifest.
* Add CI/CD pipelines.
* Manage multiple cloud environments.
* Collaborate on Teams projects.
* Publish Teams app.

### TeamsFx .NET SDK Reference docs

* [Microsoft.Extensions.DependencyInjection Namespace](/../dotnet/api/Microsoft.Extensions.DependencyInjection)
* [Microsoft.TeamsFx Namespace](/../dotnet/api/Microsoft.TeamsFx)
* [Microsoft.TeamsFx.Configuration Namespace](/../dotnet/api/Microsoft.TeamsFx.Configuration)
* [Microsoft.TeamsFx.Conversation Namespace](/../dotnet/api/Microsoft.TeamsFx.Conversation)
* [Microsoft.TeamsFx.Helper Namespace](/../dotnet/api/Microsoft.TeamsFx.Helper)

## See also

* [Create new Teams app in Visual Studio](create-new-teams-app-for-Visual-Studio.md)
* [Provision cloud resources using Visual Studio](provision-cloud-resources.md)
* [Deploy Teams app to the cloud using Visual Studio](deploy-teams-app.md)
