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
2. [Enabling RSC for all unblocked apps in the organization](#enabling-rsc-for-all-unblocked-apps-in-the-organization)
1. [Enabling RSC for a specific set of apps only](#enabling-rsc-for-a-specific-set-of-apps-only)
    * [Create a pre-approval policy based on app id and permissions](#create-a-pre-approval-policy-based-on-app-id-and-permissions)
    * [Create a pre-approval policy based on app id, permissions and sensitivity label](#create-a-pre-approval-policy-based-on-app-id-permissions-and-sensitivity-label)
    * [Change RSC configuration to honor explicitly defined pre-approval policies only](#change-rsc-configruation-to-honor-explicitly-defined-pre-approval-policies-only)
1. [Managing existing pre-approval policies](#managing-existing-pre-approval-policies)
    * [Updating an existing pre-approval policy](#modify-an-existing-pre-approval-policy)
    * [Deleting an existing pre-approval policy](#delete-an-existing-pre-approval-policy)

# What is preapproval of RSC permissions?

RSC preapproval provides admins with granular control over the resource-specific consent (RSC) permissions an app can request upon installation. Today, RSC permissions are granted to an app only when the app gets installed. Through the use of pre-approval policies, admins can declare ahead of time the max permissions an app can request from the end user and be consented to during installation. For a permission pre-approval policy to take affect for an app, the admin still needs to ensure that the app is enabled (installable) in their organization (link to managing apps in TAC). If the app is not installable, then the permission pre-approval with respect to that specific app is moot.

Admins have the ability to create finely tuned pre-approval policies based on dimensions such as app id, permissions and sensitivity of the data being accessed. Pre-approval for RSC permissions is an advanced feature meant for admins who have a need to creating advanced custom policies for their organization. Out of the box, the preapproval policies are managed by Microsoft, and it is recommended that organizations leave it in that state. This allows the security team at Microsoft to provide the best security posture for your organization.

   > [!NOTE]
   > RSC Pre-approval is currently in public preview, features and operating procedures are subject to change.

# Setting up PowerShell to manage preapprovals

Preapproval of RSC permissions is managed through Microsoft Graph PowerShell. You can learn more about managing Microsoft Teams with PowerShell [here](/../../../powershell/microsoftgraph/get-started?view=graph-powershell-1.0l)

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
|`ManagedByMicrosoft`|This is a dynamic policy administered by Microsoft. It is subject to evolve based on best security practices. Currently, this policy defaults to enabling RSC for all unblocked apps in the organization.
|`ApprovedForAllApps`|Users can consent to RSC permissions by any unblocked app in the organization
|`ApprovedForPreApprovedAppsOnly`|Users in the organization can consent to only those unblocked apps that also have an explicit pre-approval policy associated with them. This option should be used only if the admin wants to explicitly limit the allowed RSC permissions on a per app basis.
|`DisabledForAllApps`| Users will not be able to consent to the RSC permissions required by any app even if the app has been unblocked in the organization. Warning: This will break the installation of all apps that need RSC permissions.

   >[!WARNING]
   >Changing your Chat RSC or Team RSC configuration to DisabledForAllApps will disable pre-approval in your tenant and users will encounter errors when attempting to install RSC enabled apps.

# Enable RSC for all unblocked apps in the organization
You can allow RSC for all unblocked apps in your organization using PowerShell cmdlets to change your RSC permission setting state to `ApprovedForAllApps`. You need to set the state for both Chat and Team RSC settings in your organization, the example below shows what PowerShell cmdlets would look like to achieve this: 

```powershell
`Set-MgBetaTeamRscConfiguration -State ApprovedForAllApps`
`Set-MgBetaChatRscConfiguration -State ApprovedForAllApps`
```

# Enable RSC for a specific set of apps only

### Create a preapproval policy based on app id and permissions
Preapprovals can be created to allow users in you orginzation to consent to RSC permissions for a specific set of apps only. This means you can choose what RSC enabled apps your organization has access to without restricting all RSC in your organization. 

To create a pre-approval policy without a sensitivity label you will need the following information:

1. The Teams App ID of the app you wish to pre-approve
2. The RSC permissions associated with the app you want to pre-approve
4. Global administrator privilege in your tenant

Creating a pre-approval is done with PowerShell cmdlets. To create the cmdlet you need to piece together the information provided above with a `New-MgBetaTeamAppPreApproval` command. 
You must distinguish what type of RSC permissions you are pre-approving in the cmdlet you create. There are two options when pre-approving an app:

|Configuration| Description|
|---|---|
|`ResourceSpecificApplicationPermissionsAllowedForChats`|Use this option when creating a pre-approval for RSC permissions for a team. A listing of these permissions can be found [here](/platform/graph-api/rsc/resource-specific-consent)
|`ResourceSpecificApplicationPermissionsAllowedForTeams`|Use this option when creating a pre-approval for RSC permissions for a team. A listing of these permissions can be found [here](/platform/graph-api/rsc/resource-specific-consent)

Preapprove an app with Team RSC permissions:

```powershell
New-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForTeams @('ChannelMessage.Read.Group')
```
Preapprove an app with Chat RSC permissions:

```powershell
New-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForChats @('OnlineMeeting.ReadBasic.Chat')
```
Preapprove an app with both Team and Chat RSC permissions:

```powershell
New-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForChats @('OnlineMeeting.ReadBasic.Chat') -ResourceSpecificApplicationPermissionsAllowedForTeams @(‘ChannelMessage.Read.Group’)
```

>[!WARNING]
>Your pre-approval creation may fail if you associate the wrong permissions with the wrong permission type in your cmdlet. Chat RSC permissions end in .Chat and Team RSC permissions end in .Group


### Create a preapproval policy based on app id and permissions and sensitivity label
Preapprovals can be created to preapprove RSC permissions against certain sensitivity labels in your tenant. This means you can dictate what data RSC-enabled apps have access to. In this section we will create a pre-approval with a sensitivity label for use against certain data. 

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

You can use the `TeamLevelSensitivityLabelCondition` and `SpecificSensitivityLabel` arguments to define specific sensitivity labels to apply the RSC pre-approval policy to. An example of a cmndlet using these arguments is below:

```powershell
New-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForTeams @('ChannelMessage.Read.Group') -TeamLevelSensitivityLabelCondition SpecificSensitivityLabel -SpecificSensitivityLabelIdsApplicableToTeams @('4de11089-adb9-4be8-9b7a-8336be68f3c4')
```
## Change RSC configuration to honor explicilty defined pre-approval policies only

Once you've created your pre-approval policies you need to change your organizations RSC settings to use the new policy. This setting is more restrictive and enabling it may cause some apps not to function correctly for your end users. You can achieve this by changing the state of your organizations RSC settings, the example below shows what PowerShell cmdlets would look like to achieve this: 

```powershell
`Set-MgBetaTeamRscConfiguration -State ApprovedForPreApprovedAppsOnly`
`Set-MgBetaChatRscConfiguration -State ApprovedForPreApprovedAppsOnly`
```

# Managing existing pre-approval policies

After you’ve created a pre-approval policy you can edit the policy to change the permissions being allowed, and the sensitivity label of the policy. When apps are released with additional permissions, you must update the pre-approval for that app to include the new permissions for the app to continue to be installable in your tenant. You need the same information to manage an existing pre-approval and create a new pre-approval. You can also delete existing pre-approval policies if you no longer wish to grant them the ability to be consented by users in your organization

## Updating an existing pre-approval policy

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

## Delete an existing pre-approval policy 
If you no longer wish to pre-approve an applications RSC permissions you can delete the pre-approval policy for an app.
To delete a pre-approval policy you will need the following information

1. Team App ID of the app you no longer want to pre-approve
   
You can delete the pre-approval policy associated with an app by using the following PowerShell cmdlet:

`remove-MgBetaTeamAppPreApproval`

```powershell
Remove-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e
```
