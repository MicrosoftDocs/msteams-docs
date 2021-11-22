---
title: Collaborate on TeamsFx Project using Teams Toolkit
author: yanliang
description:  Collaborate on TeamsFx Project using Teams Toolkit
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Collaborate on TeamsFx Project using Teams Toolkit

Multiple developers can work together to debug, provision and deploy for the same TeamsFx project, but it requires manually setting the right permissions of Teams App and AAD App, which is not easy to do.

Teams Toolkit now supports collaboration feature to allow a developer (project owner) to invite other developers (collaborators) to the TeamsFx project to debug, provision and deploy the same TeamsFx project.

## Prerequisite

1. Account prerequisites

    To provision cloud resources in Azure and Microsoft 365, you must have the following accounts with proper permissions. Refer to [Prepare accounts to build Teams app](accounts.md) for more information.

* Microsoft 365
* Azure with valid subscription

2. [Install Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) version v3.0.0+.

## How to collaborate with other developers

### As a project owner

* In **ENVIRONMENT** section on Teams Toolkit treeview, expand an environment name to find a **Collaborators** node.

  ![collaborator-node](https://user-images.githubusercontent.com/5545529/137440190-d247dcc2-efec-4050-b1ab-bbfd9ee8d0bf.png)

* Click grant permission button on the right side of Collaborators node and add another M365 account email address as collaborator. The account to be added must be on the same tenant as project owner for remote debug.

  ![input-collaborator-email](https://user-images.githubusercontent.com/5545529/137440192-6e418e28-70fc-4130-b710-601104cdcffa.png)

* Push project to GitHub.

> [!NOTE]
> Newly added collaborator will not receive any notification. Project owner needs to notify collaborator.

### As a project collaborator

* Clone the project from GitHub.
* Login M365 account

> [!NOTE]
> Collaborators should log in using the account under the same tenant with project owner).

* Login Azure account which has contributor permission for all the Azure resources being used in this project.
* Working on project code, then deploy the project to remote when you think it's time to preview your Teams app.
* Launch remote to have a preview of the Teams app. Refer to get-start tutorial for details steps to [build and run your Teams app in remote environment](https://docs.microsoft.com/microsoftteams/platform/sbs-gs-javascript?tabs=vscode%2Cvsc%2Cviscode%2Cvcode&tutorial-step=3).

### Limitations of Using Collaboration

> [!NOTE]
> Azure related permissions should be set manually by Azure subscription administrator on Azure portal. Azure account should have contributor role for the subscription at least so that developers can work together to provision and deploy TeamsFx project.

1. Cannot delete
 You cannot remove collaborators directly from Teams Toolkit extension. If you want to remove collaborators manually, please follow the steps below:

      1. Go to [Teams Developer Portal](https://dev.teams.microsoft.com/apps), find your Teams App by name or app id.
      2. Inside the Teams App management page, click **Owners** from left panel.
      3. Find and remove the collaborator.
      4. Go to [Azure Active Directory](https://ms.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps), click **App registration** from left panel, and find your AAD App.
      5. Inside the AAD App management page, click **Owners** from left panel.
      6. Find and remove the collaborator.

1. Collaboration feature only supports project hosted on Azure, SPFx hosted project will be supported in the future.

1. Collaborator added to your project will not receive any notification. Project owner needs to notify collaborator offline.

## See Also

> [!div class="nextstepaction"]
> [Provision cloud resources](provision.md)
> [!div class="nextstepaction"]
> [Deploy Teams app to the cloud](deploy.md)
> [!div class="nextstepaction"]
> [Manage multiple environments](TeamsFx-multi-env.md)
