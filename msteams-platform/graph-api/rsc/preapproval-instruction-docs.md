---
title: Add, update, and remove preapprovals for RSC enabled applications in Teams
description: In this article, learn more about creating, managing, and deleting preapprovals for RSC enabled applications in MS Teams
ms.localizationpriority: medium
author: MSFTRickyCastaneda
ms.author: rcastaneda
ms.topic: Conceptual
ms.date: 08/29/2023
---

# Preapproval of RSC permissions

Preapproval of resource-specific consent (RSC) permissions allows admins to approve RSC on an app-by-app basis in Microsoft Teams. Previously, admins had the ability to toggle RSC on or off in their tenant. Admins had to approve or block all RSC enabled apps with no granularity to declare which apps they wanted to allow.

Through preapproved RSC, admins can choose which RSC-enabled apps they allow their tenant users to install in Teams without having to allow or block all apps that utilize RSC permissions.

> [!NOTE]
> Preapproval of RSC permissions is available in [public developer preview](../../resources/dev-preview/developer-preview-intro.md).

## PowerShell set up to manage preapproval of RSC permissions

Preapproval of RSC permissions is managed through Microsoft Teams PowerShell. For more information, see [Manage Teams with Microsoft Teams Powershell](/microsoftteams/teams-powershell-managing-teams)

Before you can create and manage preapprovals, connect PowerShell to your tenant using Microsoft Graph `Connect-MgGraph` cmdlet. To create, manage, and delete preapproval policies, use the following permissions to connect:

* `TeamworkAppSettings.ReadWrite.All`
* `Policy.ReadWrite.Authorization`
* `AppCatalog.Read.All`

The following snippet is an example of the PowerShell setup to manage preapproval of RSC permissions:

```powershell
connect-MgGraph -Scopes @('TeamworkAppSettings.ReadWrite.All', 'Policy.ReadWrite.Authorization', 'AppCatalog.Read.All','InformationProtectionPolicy.Read', 'ServicePrincipalEndpoint.ReadWrite.All', 'Policy.ReadWrite.PermissionGrant', 'Policy.ReadWrite.ApplicationConfiguration', 'Application.ReadWrite.All')
```

## Enable preapproval for RSC permissions

Change your RSC settings using the `Set-MgBetaChatRscConfiguration` and `Set-MgBetaTeamRscConfiguration` cmdlets to allow preapproved apps only. The following are the available configurations:

|Configuration| Description|
|---|---|
|`ApprovedForAllApps`|Any RSC enabled app can be consented to by users in your tenant. When you enable the settings, preapproval of RSC permissions isn't needed as all RSC enabled apps are approved for use.|
|`ApprovedForPreApprovedAppsOnly`|RSC enabled apps can be consented on an app-by-app basis. Admins can choose which apps are approved for which RSC permissions.|
|`DisabledForAllApps`| No RSC permissions can be consented to by users. In this state, preapproval of RSC permissions have no effect on users ability to consent to RSC enabled apps.|

   > [!WARNING]
   > If you change your chat RSC or team RSC configuration to DisabledForAllApps, it disables preapproval in your tenant and users encounter errors when they attempt to install RSC enabled apps.

### Enable preapproval for chat RSC permissions

You can check and change the current state of your chat RSC configurations using the following cmdlets:

1. `Get-MgBetaChatRscConfiguration`
1. `Set-MgBetaChatRscConfiguration -State EnabledForPreApprovedAppsOnly`

### Enable preapproval for team RSC permissions

You can check the current state of your team RSC configurations by using the following cmdlets:

1. `Get-MgBetaTeamRscConfiguration`
1. `Set-MgBetaTeamRscConfiguration -State EnabledForPreApprovedAppsOnly`

## Create a preapproval of RSC permissions

You can create a preapproval to preapprove RSC permissions against certain sensitivity labels in your tenant. You can dictate what data RSC-enabled apps have access to. In this section, we'll create a preapproval without a sensitivity label for use with any sensitivity group, and with a sensitivity label for use against certain data. To create a preapproval, ensure that you have the following information:

1. The Teams App ID of the app you wish to preapprove.
2. The RSC permissions associated with the app you want to preapprove.
3. The sensitivity label ID associated with the sensitivity label you’d like to associate with the preapproval policy, if preapproving team RSC permissions (you don’t need this if you want the policy to apply to all sensitivity labels or are preapproving only chat RSC permissions).
4. Global administrator privilege in your tenant.

You can create preapproval with PowerShell cmdlets. To create a cmdlet, you must collate the information provided earlier with a `New-MgBetaTeamAppPreApproval` command and distinguish what type of RSC permissions you're preapproving in the cmdlet you create. There are two options when preapproving an app:

|Configuration| Description|
|---|---|
|`ResourceSpecificApplicationPermissionsAllowedForChats`|Use this option when creating a preapproval for RSC permissions for a team. A listing of these permissions can be found here
|`ResourceSpecificApplicationPermissionsAllowedForTeams`|Use this option when creating a preapproval for RSC permissions for a team. A listing of these permissions can be found here

### Create a preapproval without a sensitivity label

When you create your cmdlet, you should use the option appropriate to the permissions included in the app you're trying to preapprove. If the app you're preapproving has both chat RSC and team RSC permissions, you can also include both the options. The following examples show multiple ways to build cmdlets to preapprove apps with varying permissions without specifying a sensitivity label:

**Preapprove an app with team RSC permissions:**

```powershell
New-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForTeams @('OnlineMeeting.ReadBasic.Group')
```

**Preapprove an app with chat RSC permissions:**

```powershell
New-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e  -ResourceSpecificApplicationPermissionsAllowedForChats @('OnlineMeeting.ReadBasic.Chat')
```

**Preapprove an app with both team and chat RSC permissions:**

```powershell
New-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForChats @('OnlineMeeting.ReadBasic.Chat') -ResourceSpecificApplicationPermissionsAllowedForTeams @(‘example.permissions.group’)
```

> [!WARNING]
>
> * If you associate the wrong permissions with the wrong permission type in your cmdlet, the preapproval creation may fail. Chat RSC permissions end in chat and team RSC permissions end in .Group.
> * Create a preapproval with a sensitivity label.

### Create a preapproval with a sensitivity label

The same process can be used to create a preapproval that applies to data within certain sensitivity labels in Teams. You can use the `TeamLevelSensitivityLabelCondition` and `SpecificSensitivityLabel` arguments to define specific sensitivity labels to apply the RSC preapproval policy to. The following are examples of cmdlets using these arguments:

**Preapprove an app with team RSC permissions and a defined sensitivity label:**

```powershell
New-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForTeams @('OnlineMeeting.ReadBasic.Group') -TeamLevelSensitivityLabelCondition SpecificSensivityLabel -SpecificSensitivityLabelIdsApplicableToTeams @('4de11089-adb9-4be8-9b7a-8336be68f3c4')
```

**Preapprove an app with chat RSC permissions and a defined sensitivity label:**

```powershell
New-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForChats @('OnlineMeeting.ReadBasic.Chat') -TeamLevelSensitivityLabelCondition Spe```cificSensivityLabel -SpecificSensitivityLabelIdsApplicableToTeams @('4de11089-adb9-4be8-9b7a-8336be68f3c4')
```

**Preapprove an app with both team and chat RSC permissions and a defined sensitivity label:**

```powershell
New-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForChats @('OnlineMeeting.ReadBasic.Chat') -ResourceSpecificApplicationPermissionsAllowedForTeams @(‘example.permissions.group’) -TeamLevelSensitivityLabelCondition SpecificSensivityLabel -SpecificSensitivityLabelIdsApplicableToTeams @('4de11089-adb9-4be8-9b7a-8336be68f3c4')
```

## Modify a preapproval

After you’ve created a preapproval policy you can edit the policy to change the permissions being allowed, and the sensitivity label of the policy. When apps are released with additional permissions, you must update the preapproval for that app to include the new permissions for the app to continue to be installable in your tenant. You need the same information to manage an existing preapproval and create a new preapproval.

You can update a preapproval policy by using the `Update-MgBetaTeamAppPreApproval` cmdlet. When declaring which permissions are to be updated, you must distinguish what type of RSC permissions are being edited. There are two options when managing an existing preapproval:

|Configuration| Description|
|---|---|
|`ResourceSpecificApplicationPermissionsAllowedForChats`|Use this option when creating a preapproval for RSC permissions for a team. A listing of these permissions can be found here
|`ResourceSpecificApplicationPermissionsAllowedForTeams`|Use this option when creating a preapproval for RSC permissions for a team. A listing of these permissions can be found here

**Updating a preapproval for chat RSC:**

```powershell
Update-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForChats @('OnlineMeeting.ReadBasic.Chat', 'TeamsAppInstallation.Read.Chat ')
```

**Updating a preapproval for team RSC:**

```powershell
Update-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForTeams @('OnlineMeeting.ReadBasic.Group', 'TeamsAppInstallation.Read.Group)
```

If you're changing your preapproval from a defined sensitivity label to all sensitivity labels, you must reset the value of the `SpecificSensitivityLabel` argument to null in your preapproval as follows:

```powershell
New-MgBetaTeamAppPreApproval  -TeamsAppId d46d75f9-d445-457e-b555-24bd2f54c15a -ResourceSpecificApplicationPermissionsAllowedForTeams @('ChannelMessage.Read.Group') -TeamLevelSensitivityLabelCondition SpecificSensivityLabel -SpecificSensitivityLabelIdsApplicableToTeams @(‘null’)
```

> [!NOTE]
> You must include all relevant permissions in your Update-MgBetaTeamAppPreApproval cmdlet, even if you’ve already declared them in the original preapproval.

## Delete a preapproval

If you no longer wish to preapprove an application's RSC permission, you can delete the preapproval policy for an app.

To delete a preapproval policy, ensure that you have the Teams App ID of the app you no longer want to preapprove.

You can delete the preapproval policy associated with an app by using `remove-MgBetaTeamAppPreApproval` PowerShell cmdlet:

```powershell
Remove-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e
```

## See also

* [Grant RSC permissions to your app](grant-resource-specific-consent.md)
* [Test resource-specific consent permissions in Teams](test-resource-specific-consent.md)
