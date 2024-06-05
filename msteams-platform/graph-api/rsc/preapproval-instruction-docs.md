---
title: Add, update, and remove preapprovals for RSC enabled applications in Teams
description: In this article, learn more about creating, managing, and deleting preapprovals for RSC enabled applications in MS Teams
ms.localizationpriority: medium
author: MSFTRickyCastaneda
ms.author: rcastaneda
ms.topic: Conceptual
ms.date: 08/29/2023
---

# What is preapproval of RSC permissions?

RSC preapproval provides admins with granular control over the resource-specific consent (RSC) permissions an app can request upon installation. Today, RSC permissions are granted to an app only when the app gets installed. By using preapproval policies, admins can declare ahead of time the max permissions an app can request from the end user and be consented to during installation. For a permission preapproval policy to take effect for an app, the admin still needs to ensure that the app is enabled (installable) in their organization (link to managing apps in Teams Admin Center). If the app isn't installable, then the permission preapproval with respect to that specific app is moot.

Admins have the ability to create finely tuned preapproval policies based on dimensions such as app ID, permissions and sensitivity of the data being accessed. Preapproval for RSC permissions is an advanced feature meant for admins who have a need to creating advanced custom policies for their organization. Out of the box, the preapproval policies are managed by Microsoft, and it's recommended that organizations leave it in that state. This state allows the security team at Microsoft to provide the best security posture for your organization.

   > [!NOTE]
   > RSC Preapproval is currently in public preview, features and operating procedures are subject to change.

## Setting up PowerShell to manage preapprovals

preapproval of RSC permissions is managed through Microsoft Graph PowerShell. You can learn more about managing Microsoft Teams with PowerShell [here](/powershell/microsoftgraph/get-started).

Before you can create and manage preapprovals, You need to connect PowerShell to your tenant using Microsoft Graph. You can use the `Connect-MgGraph` cmdlet to do this action. You need to connect with the following permissions to create, manage, and delete preapproval policies.

1. `TeamworkAppSettings.ReadWrite.All`
1. `Policy.ReadWrite.Authorization`
1. `AppCatalog.Read.All`
1. `Policy.ReadWrite.PermissionsGrant`
1. `InformationProtectionPolicy.Read`
1. `Application.ReadWrite.All`

```powershell
connect-MgGraph -Scopes @('TeamworkAppSettings.ReadWrite.All', 'Policy.ReadWrite.Authorization', 'AppCatalog.Read.All', 'Policy.ReadWrite.PermissionsGrant', 'InformationProtectionPolicy.Read', 'Application.ReadWrite.All')
```

## Allowing RSC permissions in your organization

For both team-specific and chat-specific RSC permissions, there are four distinct states an admin can set for their organization. Apart from `DisabledForAllApps`, all the other states allow RSC permissions to different degrees. These states can be set via `Set-MgBehatRscConfiguration` and `Set-MgBetaTeamRscConfiguration` commandlets.

For example, to allow RSC permissions for all unblocked apps in your organization, use the command `Set-MgBetaTeamRscConfiguration -State EnabledForPreApprovedAppsOnly`.

The various states for allowing and disallowing RSC permission in your organization are described below:

|Configuration| Description|
|---|---|
|`ManagedByMicrosoft`|This is a dynamic policy administered by Microsoft. It's subject to evolve based on best security practices. Currently, this policy defaults to enabling RSC for all unblocked apps in the organization.
|`ApprovedForAllApps`|Users can consent to RSC permissions by any unblocked app in the organization
|`ApprovedForPreApprovedAppsOnly`|Users in the organization can consent to only those unblocked apps that also have an explicit preapproval policy associated with them. This option should be used only if the admin wants to explicitly limit the allowed RSC permissions on a per app basis.
|`DisabledForAllApps`| Users can't consent to the RSC permissions required by any app even if the app is unblocked in the organization. Warning: This state breaks the installation of all apps that need RSC permissions.

   >[!WARNING]
   >Changing your Chat RSC or Team RSC configuration to DisabledForAllApps will disable preapproval in your tenant and users will encounter errors when attempting to install RSC enabled apps.

## Enable RSC for all unblocked apps in the organization

You can allow RSC for all unblocked apps in your organization using PowerShell cmdlets to change your RSC permission setting state to `ApprovedForAllApps`. You need to set the state for both Chat and Team RSC settings in your organization, the following example shows how you can achieve this state:

```powershell
`Set-MgBetaTeamRscConfiguration -State ApprovedForAllApps`
`Set-MgBetaChatRscConfiguration -State ApprovedForAllApps`
```

## Enable RSC for a specific set of apps only

#### Create a preapproval policy based on app ID and permissions

preapprovals can be created to allow users in you organization to consent to RSC permissions for a specific set of apps only. This means you can choose what RSC enabled apps your organization has access to without restricting all RSC in your organization.

To create a preapproval policy without a sensitivity label, you need the following information:

1. The Teams App ID of the app you wish to preapprove
2. The RSC permissions associated with the app you want to preapprove
4. Global administrator privilege in your tenant

Creating a preapproval is done with PowerShell cmdlets. To create the cmdlet, you need to piece together the information provided earlier with a `New-MgBetaTeamAppPreapproval` command.
You must distinguish what type of RSC permissions you're preapproving in the cmdlet you create. There are two options when preapproving an app:

|Configuration| Description|
|---|---|
|`ResourceSpecificApplicationPermissionsAllowedForChats`|Use this option when creating a preapproval for RSC permissions for a team. A listing of these permissions can be found [here](/graph-api/rsc/resource-specific-consent)|
|`ResourceSpecificApplicationPermissionsAllowedForTeams`|Use this option when creating a preapproval for RSC permissions for a team. A listing of these permissions can be found [here](/graph-api/rsc/resource-specific-consent)|

Preapprove an app with Team RSC permissions:

```powershell
New-MgBetaTeamAppPreapproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForTeams @('ChannelMessage.Read.Group') -TeamLevelSensitivityLabelCondition AnySensitivityLabel
```

Preapprove an app with Chat RSC permissions:

```powershell
New-MgBetaTeamAppPreapproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForChats @('OnlineMeeting.ReadBasic.Chat')
```

Preapprove an app with both Team and Chat RSC permissions:

```powershell
New-MgBetaTeamAppPreapproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForChats @('OnlineMeeting.ReadBasic.Chat') -ResourceSpecificApplicationPermissionsAllowedForTeams @(‘ChannelMessage.Read.Group’) -TeamLevelSensitivityLabelCondition AnySensitivityLabel
```

>[!WARNING]
>Your preapproval creation may fail if you associate the wrong permissions with the wrong permission type in your cmdlet. Chat RSC permissions end in .Chat and Team RSC permissions end in .Group

#### Create a preapproval policy based on app ID and permissions and sensitivity label

preapprovals can be created to preapprove RSC permissions against certain sensitivity labels in your tenant. This means you can dictate what data RSC-enabled apps have access to. In this section, we create a preapproval with a sensitivity label for use against certain data.

You can also create a preapproval policy for specific permissions in addition to specific sensitivity labels. This means you can allow all RSC consent requests to be approved for a particular permissions. To create a preapproval, you need the following information:

1. The Teams App ID of the app you wish to preapprove
2. The RSC permissions associated with the app you want to preapprove
3. The sensitivity label ID associated with the sensitivity label you’d like to associate with the preapproval policy if preapproving Team RSC permissions. You don’t need this step if you want the policy to apply to all sensitivity labels or are preapproving only chat RSC permissions.
4. Global administrator privilege in your tenant

Creating a preapproval is done with PowerShell cmdlets. To create the cmdlet, you need to piece together the information provided earlier with a `New-MgBetaTeamAppPreapproval` command.
You must distinguish what type of RSC permissions you're preapproving in the cmdlet you create. There are two options when preapproving an app:

|Configuration| Description|
|---|---|
|`ResourceSpecificApplicationPermissionsAllowedForChats`|Use this option when creating a preapproval for RSC permissions for a team. A listing of these permissions can be found [here](/graph-api/rsc/resource-specific-consent)|
|`ResourceSpecificApplicationPermissionsAllowedForTeams`|Use this option when creating a preapproval for RSC permissions for a team. A listing of these permissions can be found [here](/graph-api/rsc/resource-specific-consent)|

You can use the `SpecificSensitivityLabel` arguments to define specific sensitivity labels to apply the RSC preapproval policy to. An example of a cmdlet using the following arguments:

```powershell
New-MgBetaTeamAppPreapproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForTeams @('ChannelMessage.Read.Group') -TeamLevelSensitivityLabelCondition SpecificSensitivityLabel -SpecificSensitivityLabelIdsApplicableToTeams @('4de11089-adb9-4be8-9b7a-8336be68f3c4')
```

### Change RSC configuration to honor explicitly defined preapproval policies only

Once you've created your preapproval policies, you need to change your organizations RSC settings to use the new policy. This setting is more restrictive and enabling it may cause some apps not to function correctly for your end users. You can achieve this by changing the state of your organizations RSC settings. The following example shows what PowerShell cmdlets would look like to achieve this:

```powershell
`Set-MgBetaTeamRscConfiguration -State ApprovedForPreApprovedAppsOnly`
`Set-MgBetaChatRscConfiguration -State ApprovedForPreApprovedAppsOnly`
```

## Managing existing preapproval policies

After you’ve created a preapproval policy you can edit the policy to change the permissions being allowed, and the sensitivity label of the policy. When apps are released with more permissions, you must update the preapproval for that app to include the new permissions for the app to continue to be installable in your tenant. You need the same information to manage an existing preapproval and create a new preapproval. You can also delete existing preapproval policies if you no longer wish to grant them the ability to be consented by users in your organization

### Updating an existing preapproval policy

You can update a preapproval policy by using the `Update-MgBetaTeamAppPreapproval` cmdlet. When declaring which permissions are to be updated, you must distinguish what type of RSC permissions are being edited. There are two options when managing an existing preapproval:

|Configuration| Description|
|---|---|
|`ResourceSpecificApplicationPermissionsAllowedForChats`|Use this option when creating a preapproval for RSC permissions for a team. A listing of these permissions can be found here
|`ResourceSpecificApplicationPermissionsAllowedForTeams`|Use this option when creating a preapproval for RSC permissions for a team. A listing of these permissions can be found here

#### Updating a preapproval for Chat RSC

```powershell
Update-MgBetaTeamAppPreapproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForChats @('OnlineMeeting.ReadBasic.Chat', 'TeamsAppInstallation.Read.Chat ')
```

#### Updating a preapproval for Team RSC

```powershell
Update-MgBetaTeamAppPreapproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForTeams @('ChannelMessage.Read.Group', 'TeamsAppInstallation.Read.Group) -TeamLevelSensitivityLabelCondition AnySensitivityLabel
```

If you're changing your preapproval from a defined sensitivity label to all sensitivity labels, you must reset the value of the `SpecificSensitivityLabel` argument in your preapproval. You can do so by setting the `AnySensitivityLabel` argument to null like in the following example:

```powershell
Update-MgBetaTeamAppPreapproval  -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForTeams @('ChannelMessage.Read.Group') -TeamLevelSensitivityLabelCondition AnySensitivityLabel -SpecificSensitivityLabelIdsApplicableToTeams $null
```

   >[!NOTE]
   >You must include all relevant permissions in your Update-MgBetaTeamAppPreapproval cmdlet, even if you’ve already declared them in the original preapproval

### Delete an existing preapproval policy

If you no longer wish to preapprove an applications RSC permission you can delete the preapproval policy for an app.

To delete a preapproval policy, you need the following information

1. Team App ID of the app you no longer want to preapprove

You can delete the preapproval policy associated with an app by using the following PowerShell cmdlet:

`remove-MgBetaTeamAppPreapproval`

```powershell
Remove-MgBetaTeamAppPreapproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e
```
