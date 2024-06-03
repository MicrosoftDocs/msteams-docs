---
title: Add, update, and remove pre-approvals for RSC enabled applications in Teams
description: In this article, learn more about creating, managing, and deleting pre-approvals for RSC enabled applications in MS Teams
ms.localizationpriority: medium
author: MSFTRickyCastaneda
ms.author: rcastaneda
ms.topic: Conceptual
ms.date: 08/29/2023
---

In this article:
1. [What is preapproval of RSC permissions](#what-is-preapproval-of-rsc-permissions)
1. [Setting up PowerShell to manage preapprovals](#setting-up-powershell-to-manage-preapprovals)
1. [Enable pre-approval for RSC permissions](#enable-preapproval-for-rsc-permissions)
1. [Create a preapproval](#create-a-preapproval)
      * [With a sensitivity label](#create-a-preapproval-with-a-sensitivity-label)
      * [Without a sensitivity label](#create-a-preapproval-without-a-sensitivity-label)
1. [Modify a preapproval](#modify-a-preapproval)
1. [Delete a preapproval](#delete-a-preapproval)

# What is preapproval of RSC permissions?

RSC preapproval provides admins with granular control over the resource-specific consent (RSC) permissions an app can request upon installation. Today, RSC permissions are granted to an app only when the app gets installed. Through the use of pre-approval policies, admins can declare ahead of time the max permissions an app can request from the end user and be consented to during installation. For a permission pre-approval policy to take affect for an app, the admin still needs to ensure that the app is enabled (installable) in their organization (link to managing apps in TAC). If the app is not installable, then the permission pre-approval with respect to that specific app is moot.

Admins have the ability to create finely tuned pre-approval policies based on dimensions such as app id, permissions and sensitivity of the data being accessed. Pre-approval for RSC permissions is an advanced feature meant for admins who have a need to creating advanced custom policies for their organization. Out of the box, the preapproval policies are managed by Microsoft, and it is recommended that organizations leave it in that state. This allows the security team at Microsoft to provide the best security posture for your organization.

   > [!NOTE]
   > RSC Pre-approval is currently in public preview, features and operating procedures are subject to change.

# Setting up PowerShell to manage preapprovals

Preapproval of RSC permissions is managed through Microsoft Graph PowerShell. You can learn more about managing Microsoft Teams with PowerShell [here](/../../powershell/microsfotgraph/get-started?view=graph-powershell-1.0l)

Before you can create and manage pre-approvals, You need to connect PowerShell to your tenant using Microsoft Graph. You can use the `Connect-MgGraph` cmdlet to do this. You will need to connect with the following permissions to create, manage, and delete pre-approval policies. 

1. `TeamworkAppSettings.ReadWrite.All`
1. `Policy.ReadWrite.Authorization`
1. `AppCatalog.Read.All`
1. `Policy.ReadWrite.PermissionsGrant`

```powershell
connect-MgGraph -Scopes @('TeamworkAppSettings.ReadWrite.All', 'Policy.ReadWrite.Authorization', 'AppCatalog.Read.All', 'Policy.ReadWrite.PermissionsGrant')
```

# Allowing RSC permissions in your organization

For both team-specific and chat-specific RSC permissions, there are four distinct states an admin can set for their organization. Apart from `DisabledForAllApps`, all the other states allow RSC permissions to different degrees. These states can be set via `Set-MgBetaChatRscConfiguration` and `Set-MgBetaTeamRscConfiguration` commandlets.

For example, to allow RSC permissions for all unblocked apps in your organization, use the command `Set-MgBetaTeamRscConfiguration -State EnabledForPreApprovedAppsOnly`.

The various states for allowing and disallowing RSC permission in your organization are described below:

|Configuration| Description|
|---|---|
|`ManagedByMicrosoft`|This is the default state of Teams RSC when you first create your tenant. It is dynamic and can be changed by Microsoft, it is currently default to approve RSC
|`ApprovedForAllApps`|Users can consent to RSC permissions by any unblocked app in the organization
|`ApprovedForPreApprovedAppsOnly`|Users in the organization can consent to only those unblocked apps that also have an explicit pre-approval policy associated with them. This option should be used only if the admin wants to explicitly limit the allowed RSC permissions on a per app basis.
|`DisabledForAllApps`| Users will not be able to consent to the RSC permissions required by any app even if the app has been unblocked in the organization. Warning: This will break the installation of all apps that need RSC permissions.

   >[!WARNING]
   >Changing your Chat RSC or Team RSC configuration to DisabledForAllApps will disable pre-approval in your tenant and users will encounter errors when attempting to install RSC enabled apps.

## Enable preapproval for Chat RSC
You can check and change the current state of your Chat RSC configurations by using `Get-MgBetaChatRscConfiguration` and `Set-MgBetaChatRscConfiguration` cmndlets. 

1. `Get-MgBetaChatRscConfiguration`
1. `Set-MgBetaChatRscConfiguration -State EnabledForPreApprovedAppsOnly`

## Enable preapproval for Team RSC
You can check the current state of your Team RSC configurations by using the `Get-MgBetaTeamsRscConfiguration` and `Set-MgBetaTeamRscConfiguration` cmndlets. 

1. `Get-MgBetaTeamRscConfiguration`
1. `Set-MgBetaTeamRscConfiguration -State EnabledForPreApprovedAppsOnly`

# Create a preapproval policy

Preapprovals can be created to preapprove RSC permissions against certain sensitivity labels in your tenant. This means you can dictate what data RSC-enabled apps have access to. In this section we will create a pre-approval without a sensitivity label for use with any sensitivity group, and with a sensitivity label for use against certain data. 

You can also create a preapproval policy for specific permissions in addition to specific sensitivity labels. This means you can allow all RSC consent requests to be approved for a particular permissions. To create a pre-approval you will need the following information:

1. The Teams App ID of the app you wish to pre-approve
2. The RSC permissions associated with the app you want to pre-approve
3. The sensitivity label ID associated with the sensitivity label you’d like to associate with the pre-approval policy if pre-approving Team RSC permissions (you don’t need this if you want the policy to apply to all sensitivity labels or are pre-approving only chat RSC permissions)
4. Global administrator privilege in your tenant
   
Creating a pre-approval is done with PowerShell cmdlets. To create the cmdlet you need to piece together the information provided above with a `New-MgBetaTeamAppPreApproval` command. 
You must distinguish what type of RSC permissions you are pre-approving in the cmdlet you create. There are two options when pre-approving an app:

|Configuration| Description|
|---|---|
|`ResourceSpecificApplicationPermissionsAllowedForChats`|Use this option when creating a pre-approval for RSC permissions for a team. A listing of these permissions can be found [here](/platform/graph-api/rsc/resource-specific-consent)
|`ResourceSpecificApplicationPermissionsAllowedForTeams`|Use this option when creating a pre-approval for RSC permissions for a team. A listing of these permissions can be found [here](/platform/graph-api/rsc/resource-specific-consent)


## Create a preapproval without a sensitivity label

When you create your cmdlet you should use the option appropriate to the permissions included in the app you are trying to pre-approve. You can also include both if the app you are pre-approving has both Chat RSC and Team RSC permissions. Examples below show multiple ways to build cmndlets to pre-approve apps with varying permissions without specifying a sensitivity label:

### Preapprove an app with Team RSC permissions:

```powershell
New-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForTeams @('ChannelMessage.Read.Group')
```
### Preapprove an app with Chat RSC permissions:

```powershell
New-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForChats @('OnlineMeeting.ReadBasic.Chat')
```
### Preapprove an app with both Team and Chat RSC permissions:

```powershell
New-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForChats @('OnlineMeeting.ReadBasic.Chat') -ResourceSpecificApplicationPermissionsAllowedForTeams @(‘ChannelMessage.Read.Group’)
```

>[!WARNING]
>Your pre-approval creation may fail if you associate the wrong permissions with the wrong permission type in your cmdlet. Chat RSC permissions end in .Chat and Team RSC permissions end in .Group

## Create a preapproval with a sensitivity label

The same process can be used to create a pre-approval that applies to data within certain sensitivity labels in Microsoft Teams. You can use the `TeamLevelSensitivityLabelCondition` and `SpecificSensitivityLabel` arguments to define specific sensitivity labels to apply the RSC pre-approval policy to. Examples of cmndlets using these arguments are below:

### Preapprove an app with Team RSC permissions and a defined sensitivity label:
```powershell
New-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForTeams @('ChannelMessage.Read.Group') -TeamLevelSensitivityLabelCondition SpecificSensitivityLabel -SpecificSensitivityLabelIdsApplicableToTeams @('4de11089-adb9-4be8-9b7a-8336be68f3c4')
```

# Modify a preapproval 

After you’ve created a pre-approval policy you can edit the policy to change the permissions being allowed, and the sensitivity label of the policy. When apps are released with additional permissions, you must update the pre-approval for that app to include the new permissions for the app to continue to be installable in your tenant. You need the same information to manage an existing pre-approval and create a new pre-approval. 

You can update a pre-approval policy by using the `Update-MgBetaTeamAppPreApproval` cmdlet. When declaring which permissions are to be updated, you must distinguish what type of RSC permissions are being edited. There are two options when managing an existing pre-approval: 

|Configuration| Description|
|---|---|
|`ResourceSpecificApplicationPermissionsAllowedForChats`|Use this option when creating a pre-approval for RSC permissions for a team. A listing of these permissions can be found here
|`ResourceSpecificApplicationPermissionsAllowedForTeams`|Use this option when creating a pre-approval for RSC permissions for a team. A listing of these permissions can be found here

### Updating a preapproval for Chat RSC
```powershell
Update-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForChats @('OnlineMeeting.ReadBasic.Chat', 'TeamsAppInstallation.Read.Chat ')
```
### Updating a preapproval for Team RSC
```powershell
Update-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForTeams @('ChannelMessage.Read.Group', 'TeamsAppInstallation.Read.Group)
```
If you are changing your pre-approval from a defined sensitivity label to all sensitivity labels you must reset the value of the `SpecificSensitivityLabel` argument in your pre-approval. You can do so by setting the `SpecificSensitivityLabel` argument to null, example below: 

```powershell
Update-MgBetaTeamAppPreApproval  -TeamsAppId d46d75f9-d445-457e-b555-24bd2f54c15a -ResourceSpecificApplicationPermissionsAllowedForTeams @('ChannelMessage.Read.Group') -TeamLevelSensitivityLabelCondition SpecificSensivityLabel -SpecificSensitivityLabelIdsApplicableToTeams @(‘null’)
```

   >[!NOTE]
   >You must include all relevant permissions in your Update-MgBetaTeamAppPreApproval cmdlet, even if you’ve already declared them in the original pre-approval

# Delete a preapproval
If you no longer wish to pre-approve an applications RSC permissions you can delete the pre-approval policy for an app.
To delete a pre-approval policy you will need the following information

1. Team App ID of the app you no longer want to pre-approve
   
You can delete the pre-approval policy associated with an app by using the following PowerShell cmdlet:

`remove-MgBetaTeamAppPreApproval`

```powershell
Remove-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e
```
