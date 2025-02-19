---
title: Preapproval of RSC permissions
description: Learn about PowerShell setup & how to create, manage, & delete preapprovals of RSC enabled app in Microsoft Teams. Also how to manage an existing preapproval policy.
ms.localizationpriority: medium
author: MSFTRickyCastaneda
ms.author: rcastaneda
ms.topic: conceptual
ms.date: 08/29/2023
---

# Preapproval of RSC permissions

Resource-Specific Consent (RSC) permissions preapproval provides admins with granular control over the RSC permissions an app can request upon installation. RSC permissions are granted to an app at the time the app gets installed. Through the use of pre-approval policies, admins can declare ahead of time the maximum permissions an app can request from the end user and be consented to during installation time.

For an RSC permission pre-approval policy to take effect for an app, the admin must ensure that the app is enabled (installable) in their organization. If the app is not installable, then the permission pre-approval for that specific app becomes irrelevant. For more information on enabling apps in Teams Admin Center, see [managing apps in Teams Admin Center](/microsoftteams/apps-in-teams).

Admins can create a detailed preapproval policy, based on the app ID, permissions, and the sensitivity of the accessed data. Preapproval of RSC permissions are designed for admins seeking to create advanced custom policies for their organization.

By default, the preapproval policies are managed by Microsoft, and we recommend that organizations maintain `ManagedByMicrosoft` state. This state allows Microsoft's security team to deliver the best security for your organization.

> [!NOTE]
>
> * Preapproval of RSC permissions are available only in [public developer preview](../../resources/dev-preview/developer-preview-intro.md).
> * Preapproval of RSC permissions and its operating procedures are subject to change.

## Set up PowerShell to manage preapproval of RSC permissions

Preapproval of RSC permissions are managed through Microsoft Graph PowerShell. You can learn more about managing Microsoft Teams with PowerShell [here](/powershell/microsoftgraph/get-started).

To create, manage, and delete RSC preapproval policies, you must grant the following permissions to the PowerShell cmdlet:

* `TeamworkAppSettings.ReadWrite.All`
* `Policy.ReadWrite.Authorization`
* `AppCatalog.Read.All`
* `Policy.ReadWrite.PermissionsGrant`
* `InformationProtectionPolicy.Read`
* `Application.ReadWrite.All`

> [!NOTE]
> You need Global Administrator level privileges to connect Graph with your organization for the first time.

The following is an example of the PowerShell setup to manage preapproval policies of RSC permissions:

```powershell
Connect-MgGraph -Scopes @('TeamworkAppSettings.ReadWrite.All', 'Policy.ReadWrite.Authorization', 'AppCatalog.Read.All', 'Policy.ReadWrite.PermissionGrant', 'InformationProtectionPolicy.Read', 'Application.ReadWrite.All')
```

## Allow RSC permissions for apps in your organization

For both team and chat specific RSC permissions, admins can set four different states for their organization. Apart from `DisabledForAllApps` state, all the other states allow RSC permissions to different degrees. These states can be set through `Set-MgBetaChatRscConfiguration` and `Set-MgBetaTeamRscConfiguration` cmdlets.

For example, to allow RSC permissions for all unblocked apps in your organization, use the `Set-MgBetaTeamRscConfiguration -State EnabledForAllApps` cmdlets.

The following are the different states that allow and disallow RSC permissions in your organization:

|Configuration| Description|
|---|---|
|`ManagedByMicrosoft`|A dynamic policy administered by Microsoft. It might be updated based on best security practices. By default, this state enables RSC for all unblocked apps in the organization. |
|`EnabledForAllApps`|Users can consent to RSC permissions for any unblocked apps in the organization. |
|`EnabledForPreApprovedAppsOnly`| Users in the organization can consent to only those unblocked apps that also have an explicit preapproval policy associated with them. This option must be used only if the admin wants to explicitly limit the allowed RSC permissions on a per app basis. |
|`DisabledForAllApps`| Users can't consent to the RSC permissions required by any app even if the app is unblocked in the organization. **Warning:** This state doesn't allow installation for apps that need RSC permissions. |

   >[!WARNING]
   > If you change your chat or team RSC configuration to `DisabledForAllApps`, it disables preapproval in your tenant and users run into errors when they install RSC enabled apps.

## Enable RSC permissions for all unblocked apps in the organization

You can enable RSC for all unblocked apps in your organization using PowerShell cmdlets by changing your RSC permission setting state to `EnabledForAllApps`. You can set the state for both chat and team RSC settings in your organization as follows:

```powershell
Set-MgBetaTeamRscConfiguration -State EnabledForAllApps
Set-MgBetaChatRscConfiguration -State EnabledForAllApps
```

## Enable RSC for a specific set of apps only

You can create preapproval policy for specific apps with the permissions and sensitivity labels of the data you wish you preapprove. The following sections show how to create a preapproval policy with and without a sensitivity label attached.

### Create a preapproval policy based on app ID and permissions

Preapproval policies allow users in your organization to consent to RSC permissions for a specific set of apps. This implies that you can determine which RSC-enabled apps your organization can access, without limiting RSC permissions for all apps within your organization.

To create a preapproval policy without a sensitivity label, ensure that you have the following information:

* Teams App ID.
* The RSC permissions associated with the app.
* Team or Global Administrator privilege in your tenant.

You can use PowerShell cmdlets to create a preapproval policy. To create the cmdlet, you must get the information mentioned earlier with the `New-MgBetaTeamAppPreApproval` command and specify the one of the following RSC permissions you want to preapprove in the cmdlet:

|Configuration| Description|
|---|---|
|`ResourceSpecificApplicationPermissionsAllowedForChats`|Use this configuration when creating a preapproval policy for RSC permissions for a chat. For a list of all permissions, see [RSC permissions](resource-specific-consent.md).|
|`ResourceSpecificApplicationPermissionsAllowedForTeams`|Use this configuration when creating a preapproval policy for RSC permissions for a team. For a list of all permissions, see [RSC permissions](resource-specific-consent.md).|

**Preapprove an app with team RSC permissions**

```powershell
New-MgBetaTeamAppPreapproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForTeams @('ChannelMessage.Read.Group') -TeamLevelSensitivityLabelCondition AnySensitivityLabel
```

**Preapprove an app with chat RSC permissions**

```powershell
New-MgBetaTeamAppPreapproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForChats @('OnlineMeeting.ReadBasic.Chat')
```

**Preapprove an app with both team and chat RSC permissions**

```powershell
New-MgBetaTeamAppPreapproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForChats @('OnlineMeeting.ReadBasic.Chat') -ResourceSpecificApplicationPermissionsAllowedForTeams @(‘ChannelMessage.Read.Group’) -TeamLevelSensitivityLabelCondition AnySensitivityLabel
```

>[!WARNING]
> Your preapproval policy creation might fail if you link the wrong permissions with the wrong permission type in your cmdlet. Ensure that the chat RSC permissions end with `.Chat` and the team RSC permissions end with `.Group`.

### Create a preapproval policy based on app ID, permissions and sensitivity labels

Preapproval policies can be created to preapprove RSC permissions against certain sensitivity labels in your tenant. This enables you to control the data that RSC-enabled apps can access. Here, you can learn the process to create a preapproval policy based on the sensitivity of the data.

You can also create a preapproval policy for specific permissions in addition to specific sensitivity labels. You can allow all RSC consent requests to be approved for a particular permission. To create a preapproval policy, ensure that you have the following information:

* Teams App ID.
* The RSC permissions associated with the app.
* The sensitivity label ID associated with the sensitivity label. This isn't required if you want the policy to apply to all sensitivity labels or if you preapprove only chat RSC permissions.
* Team or Global Administrator privilege in your tenant.

You can use PowerShell cmdlets to create a preapproval policy. To create the cmdlet, you must get the information mentioned earlier with the `New-MgBetaTeamAppPreApproval` command and specify the one of the following RSC permissions you want to preapprove in the cmdlet:

|Configuration| Description|
|---|---|
|`ResourceSpecificApplicationPermissionsAllowedForChats`|Use this configuration when you create a preapproval policy for RSC permissions for a chat. For the list of all permissions, see [RSC permissions](resource-specific-consent.md).|
|`ResourceSpecificApplicationPermissionsAllowedForTeams`|Use this configuration when you create a preapproval policy for RSC permissions for a team. For the list of all permissions, see [RSC permissions](resource-specific-consent.md).|

You can use the `SpecificSensitivityLabel` arguments to define specific sensitivity labels to apply the RSC preapproval policy to.

The following are an example of cmdlets that use these arguments:

```powershell
New-MgBetaTeamAppPreapproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForTeams @('ChannelMessage.Read.Group') -TeamLevelSensitivityLabelCondition SpecificSensitivityLabel -SpecificSensitivityLabelIdsApplicableToTeams @('4de11089-adb9-4be8-9b7a-8336be68f3c4')
```

### Change RSC configuration to only allow apps with custom defined preapproval policies

After creating your preapproval policies, change your organization's RSC settings to use the new policy. This setting is more restrictive and might cause some apps not to function for your end users. To make this change, change the state of your organization's RSC settings. The following example shows the required PowerShell cmdlets:

```powershell
Set-MgBetaTeamRscConfiguration -State EnabledForPreApprovedAppsOnly
Set-MgBetaChatRscConfiguration -State EnabledForPreApprovedAppsOnly
```

## Manage the existing preapproval policies

After you create a preapproval policy, you can modify the policy to change the permissions and the sensitivity label of the policy. When apps are released with additional permissions, you must update the preapproval policy for that app to add the new permissions, ensuring that the app can be installed in your tenant. You need the same information to manage an existing preapproval policy and create a new preapproval policy.

You can also delete an existing preapproval policy if you want to stop preapproving an existing app’s RSC permission.

### Update an existing preapproval policy

You can update a preapproval policy with the `Update-MgBetaTeamAppPreApproval` cmdlet. When you specify the permissions to be updated, you must distinguish the type of RSC permissions.

The following RSC configurations are available to manage an existing preapproval policy:

|Configuration| Description|
|---|---|
|`ResourceSpecificApplicationPermissionsAllowedForChats`| Use this configuration when you create a preapproval policy for RSC permissions for a chat. For the list of all permissions, see [RSC permissions](resource-specific-consent.md).|
|`ResourceSpecificApplicationPermissionsAllowedForTeams`| Use this configuration when you create a preapproval policy for RSC permissions for a team, use this configuration. For the list of all permissions, see [RSC permissions](resource-specific-consent.md).|

#### Update the preapproval policy for chat RSC

```powershell
Update-MgBetaTeamAppPreapproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForChats @('OnlineMeeting.ReadBasic.Chat', 'TeamsAppInstallation.Read.Chat')
```

#### Update the preapproval policy for team RSC

```powershell
Update-MgBetaTeamAppPreapproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForTeams @('ChannelMessage.Read.Group', 'TeamsAppInstallation.Read.Group') -TeamLevelSensitivityLabelCondition AnySensitivityLabel
```

If you want to change your preapproval policy from a defined sensitivity label to all sensitivity labels, you must reset the value of the `SpecificSensitivityLabel` argument in your preapproval policy. You can do so by setting the `AnySensitivityLabel` argument to null as follows:

```powershell
Update-MgBetaTeamAppPreapproval  -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForTeams @('ChannelMessage.Read.Group') -TeamLevelSensitivityLabelCondition AnySensitivityLabel -SpecificSensitivityLabelIdsApplicableToTeams $null
```

   >[!NOTE]
   > You must include all relevant permissions in your `Update-MgBetaTeamAppPreApproval` cmdlet, even if you’ve already declared them in the existing preapproval.

### Delete an existing preapproval policy

If you want to stop preapproving an existing app’s RSC permission, you can delete the preapproval policy for that app. To delete a preapproval policy, ensure that you have the App ID.

You can delete the preapproval policy associated with an app by using the following PowerShell cmdlet:

`Remove-MgBetaTeamAppPreapproval`

```powershell
Remove-MgBetaTeamAppPreapproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e
```

## See also

* [Grant RSC permissions to your app](grant-resource-specific-consent.md)
* [Test resource-specific consent permissions in Teams](test-resource-specific-consent.md)
