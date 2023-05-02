---
title: Collaborate on TeamsFx Project using Teams Toolkit
author: surbhigupta
description: In this article, learn how to collaborate on TeamsFx Project using Teams Toolkit and collaborate with other developers.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Collaborate on Teams project using Microsoft Teams Toolkit

Multiple developers can work together to debug, provision, and deploy the same Teams Toolkit project, but it requires manually setting the right permissions of Teams App and Microsoft Azure Active Directory (Azure AD). Teams Toolkit's collaboration feature simplifies this process between developers and project owners.

## Collaborate with other developers

The following sections guide us to understand the collaboration process as project owner or collaborator:

### As project owner

  > [!NOTE]
  > Before adding collaborators for an environment, project owner needs to [provision](provision.md) the project first.

  1. Select **Teams Toolkit** in the activity bar.
  
     :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/select-teams-toolkit.png" alt-text="Select teams toolkit from activity bar":::

  1. In **ENVIRONMENT** section, select Manage Collaborators button as shown in the following image:

     :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/add collaborators.png" alt-text="collaborators":::

  1. Select **Add App Owners** to add other Microsoft 365 account email address as collaborator.

     :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/add-owner.png" alt-text="Add project owner":::

        * Select the apps you want to add app owners for. [image]
        * (Optional) Select and confirm Teams `manifest.json` file. [image]
        * (Optional) Select and confirm Azure AD app `aad.manifest.json` file. [image]
        * Input the M365 account email address you want to add as app owner. The account to be added must be on the same tenant as project owner for remote debug as shown in the image. [image]

  1. Select **List App Owners** to view collaborators in current environment.

     :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/list of collaborators.png" alt-text="list":::

        * Select the apps you want to add app owners for. [image]
        * (Optional) Select and confirm Teams `manifest.json` file. [image]
        * (Optional) Select and confirm Azure AD app `aad.manifest.json` file. [image]
        * Input the M365 account email address you want to add as app owner. The account to be added must be on the same tenant as project owner for remote debug as shown in the image. [image]
        * Then you can see collaborators listed in the output channel as shown in following image: [image]

  1. Push the project to GitHub.

     > [!NOTE]
     > The newly added collaborators don't receive any notification. The Project owner needs to notify collaborator.

### As project collaborator

  1. Clone the project from GitHub.
  2. Log in to Microsoft 365 account.
  3. Log in to Azure account, it has contributor permission required by the project for all Azure resources.
  4. To preview your Teams app, deploy the project to remote.
  5. Launch remote to have a preview of the Teams app.

     > [!NOTE]
     > Collaborators must log in using the account that project owner adds under the same tenant with project owner. For more information, see [build and run your Teams app in remote environment](/microsoftteams/platform/sbs-gs-javascript?tabs=vscode%2Cvsc%2Cviscode%2Cvcode&tutorial-step=3).

## Remove Collaborators

Removing collaborators requires the following manual steps:

* Using Developer Portal

  * Go to [Teams Developer Portal](https://dev.teams.microsoft.com/home) and select your Teams app by name or app ID.
  * Select **Owners** from left panel.
  * Select and remove the collaborator.

* Using Azure Active Directory

  * Go to [Azure Active Directory](https://ms.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps), select **App registration** from left panel, and find your Azure AD app.
  * Select **Owners** from left panel in Azure AD app management page.
  * Select and remove the collaborator.

    > [!NOTE]
    >
    > * Collaborator added to your project doesn't receive any notification. Project owner needs to notify collaborator offline.
    > * Azure related permissions must be set manually by Azure subscription administrator on Azure portal.
    > * Azure account must have contributor role for the subscription so that developers can work together to provision and deploy TeamsFx project.

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Provision cloud resources](provision.md)
* [Deploy Teams app to the cloud](deploy.md)
* [Manage multiple environments](TeamsFx-multi-env.md)
