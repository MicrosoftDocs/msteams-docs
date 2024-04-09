---
title: Preapproval of RSC permissions
description: In this article, learn more about to create, manage, and delete preapprovals of RSC enabled app in Microsoft Teams.
ms.localizationpriority: medium
ms.author: v-sdhakshina
ms.topic: Conceptual
ms.date: 08/29/2023
---

# Preapproval of RSC permissions

Preapproval of resource-specific consent (RSC) permissions allows admins to approve RSC based on an individual app in Microsoft Teams. Initially, admins had the ability to turn on or turn off RSC permission in the Teams Admin Center to either approve or block all RSC enabled apps.

Admins can use preapproved RSC permissions to select specific apps for their users to install in Teams, without needing to approve or deny every app that requires these permissions.

> [!NOTE]
> Preapproval of RSC permissions is available only in [public developer preview](../../resources/dev-preview/developer-preview-intro.md).

## Set up PowerShell to manage preapproval of RSC permissions

Preapproval of RSC permissions is managed through Microsoft Teams PowerShell. For more information, see [manage Teams with Teams PowerShell](/microsoftteams/teams-powershell-managing-teams).

Use `Connect-MgGraph` to connect your PowerShell to Microsoft Graph and add the following permissions to create, manage, and delete preapproval policies:

* `TeamworkAppSettings.ReadWrite.All`
* `Policy.ReadWrite.Authorization`
* `AppCatalog.Read.All`

The following is an example of the PowerShell set up to manage preapproval of RSC permissions:

```powershell
connect-MgGraph -Scopes @('TeamworkAppSettings.ReadWrite.All', 'Policy.ReadWrite.Authorization', 'AppCatalog.Read.All','InformationProtectionPolicy.Read', 'ServicePrincipalEndpoint.ReadWrite.All', 'Policy.ReadWrite.PermissionGrant', 'Policy.ReadWrite.ApplicationConfiguration', 'Application.ReadWrite.All')
```

## Enable the preapproval of RSC permissions

To enable preapproval for RSC permissions, change your RSC settings with the `Set-MgBetaChatRscConfiguration` and `Set-MgBetaTeamRscConfiguration` cmdlets to allow preapproved apps. The following table list the available configurations for RSC settings:

|Configuration| Description|
|---|---|
|`ApprovedForAllApps`|You can allow users in your tenant to access any RSC enabled app. After you enable this configuration, there's no need for preapproval of RSC permissions, as all RSC enabled apps are automatically approved for use.|
|`ApprovedForPreApprovedAppsOnly`|RSC enabled apps can be allowed on an individual basis. Admins can determine which apps are authorized for specific RSC permissions.|
|`DisabledForAllApps`| No RSC permissions can be consented to by users. In this case, preapproval of RSC permissions doesn't affect on users ability to consent to RSC enabled apps.|
| ManagedByMicrosoft | This is the default state for all tenants. It allows chat and team RSC permissions to be consented for all users but can be changed at any time at Microsoft's discretion. |

   > [!WARNING]
   > If you change your chat or team RSC configuration to `DisabledForAllApps`, it disables preapproval in your tenant and users run into errors when they install RSC enabled apps.

<br>
<details>

<summary><b>Preapproval for chat RSC permissions</b></summary>

Use the following cmdlets to check and modify the current state of your chat RSC configurations.

1. `Get-MgBetaChatRscConfiguration`
1. `Set-MgBetaChatRscConfiguration -State EnabledForPreApprovedAppsOnly`

</details>

<br>
<details>

<summary><b>Preapproval for team RSC permissions</b></summary>

Use the following cmdlets to check and modify the current state of your team RSC configurations.

1. `Get-MgBetaTeamRscConfiguration`
1. `Set-MgBetaTeamRscConfiguration -State EnabledForPreApprovedAppsOnly`

</details>

## Create the preapproval of RSC permissions

You can create a preapproval, which preapproves RSC permissions for certain sensitivity labels within your tenant. This allows you to control the data that RSC enabled apps can access.

In this section, you learn to:

* [Create a preapproval without a sensitivity label](#create-the-preapproval-without-a-sensitivity-label) for use with any sensitivity group.
* [Create a preapproval with a sensitivity label](#create-the-preapproval-with-a-sensitivity-label) for use with specific data.

To create a preapproval, ensure that you have the following information:

1. Teams App ID.
1. The RSC permissions associated with the app.
1. Sensitivty label ID: The sensitivity label ID associated with the sensitivity label you want to link to the preapproval policy.
1. Global or Teams level administrator privilege in your tenant.

You can use PowerShell cmdlets to create a preapproval. To create a cmdlet, you must gather the information mentioned above with the `New-MgBetaTeamAppPreApproval` command and specify the type of RSC permissions you want to preapprove in the cmdlet.

When you preapprove an app, the following RSC configurations are available:

|Configuration| Description|
|---|---|
|`ResourceSpecificApplicationPermissionsAllowedForChats`|When you create a preapproval for RSC permissions for a chat, use this configuration.|
|`ResourceSpecificApplicationPermissionsAllowedForTeams`|When you create a preapproval for RSC permissions for a team, use this configuration.|

### Create the preapproval without a sensitivity label

When you create your cmdlet to preapprove, you must use the required RSC configuration. If the app you're preapproving has both chat RSC and team RSC permissions, you can include both the configurations.

The following examples show the various ways to build cmdlets for preapproving apps with different RSC permissions, without specifying a sensitivity label:

<br>
<details>

<summary><b>Preapprove an app with team RSC permissions</b></summary>

```powershell
New-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForTeams @('OnlineMeeting.ReadBasic.Chat')
```

</details>
<br>
<details>

<summary><b>Preapprove an app with chat RSC permissions</b></summary>

```powershell
New-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e  -ResourceSpecificApplicationPermissionsAllowedForChats @('OnlineMeeting.ReadBasic.Chat')
```

</details>

<br>
<details>

<summary><b>Preapprove an app with both team and chat RSC permissions</b></summary>

```powershell
New-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForChats @('OnlineMeeting.ReadBasic.Chat') -ResourceSpecificApplicationPermissionsAllowedForTeams @(‘TeamsTab.Read.Group’)
```

</details>

### Create the preapproval with a sensitivity label

Use the `TeamLevelSensitivityLabelCondition` and `SpecificSensitivityLabel` arguments to define specific sensitivity labels to apply the RSC preapproval policy to.

The following are examples of cmdlets that use these arguments:

<br>
<details>

<summary><b>Preapprove an app with team RSC permissions and a defined sensitivity label</b></summary>

```powershell
New-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForTeams @('OnlineMeeting.ReadBasic.Group') -TeamLevelSensitivityLabelCondition SpecificSensivityLabel -SpecificSensitivityLabelIdsApplicableToTeams @('4de11089-adb9-4be8-9b7a-8336be68f3c4')
```

</details>

<br>
<details>

<summary><b>Preapprove an app with chat RSC permissions and a defined sensitivity label</b></summary>

```powershell
New-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForChats @('OnlineMeeting.ReadBasic.Chat') -TeamLevelSensitivityLabelCondition Spe```cificSensivityLabel -SpecificSensitivityLabelIdsApplicableToTeams @('4de11089-adb9-4be8-9b7a-8336be68f3c4')
```

</details>

<br>
<details>

<summary><b>Preapprove an app with both team and chat RSC permissions and a defined sensitivity label</b></summary>

```powershell
New-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForChats @('OnlineMeeting.ReadBasic.Chat') -ResourceSpecificApplicationPermissionsAllowedForTeams @(‘example.permissions.group’) -TeamLevelSensitivityLabelCondition SpecificSensivityLabel -SpecificSensitivityLabelIdsApplicableToTeams @('4de11089-adb9-4be8-9b7a-8336be68f3c4')
```

</details>
<br>

## Modify the preapproval of RSC permissions

After you create a preapproval policy, you can modify the policy to change the permissions and the sensitivity label of the policy. When apps are released with additional permissions, you must update the preapproval for that app to add the new permissions, ensuring the app remains installable in your tenant. You need the same information to manage an existing preapproval and create a new preapproval.

You can update a preapproval policy with the `Update-MgBetaTeamAppPreApproval` cmdlet. When you specify which permissions to be updated, you must distinguish the type of RSC permissions is modified.

When you modify an existing preapproval, the following RSC configurations are available:

|Configuration| Description|
|---|---|
|`ResourceSpecificApplicationPermissionsAllowedForChats`|When you create a preapproval for RSC permissions for a chat, use this configuration.|
|`ResourceSpecificApplicationPermissionsAllowedForTeams`|When you create a preapproval for RSC permissions for a team, use this configuration.|

<br>
<details>

<summary><b>Update the preapproval for chat RSC</b></summary>

```powershell
Update-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForChats @('OnlineMeeting.ReadBasic.Chat', 'TeamsAppInstallation.Read.Chat')
```

</details>

<br>
<details>

<summary><b>Update the preapproval for team RSC</b></summary>

```powershell
Update-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e -ResourceSpecificApplicationPermissionsAllowedForTeams @('OnlineMeeting.ReadBasic.Group', 'TeamsAppInstallation.Read.Group')
```

</details>

If you're changing your preapproval from a defined sensitivity label to all sensitivity labels, you must reset the value of the `SpecificSensitivityLabel` argument to null in your preapproval as follows:

```powershell
New-MgBetaTeamAppPreApproval  -TeamsAppId d46d75f9-d445-457e-b555-24bd2f54c15a -ResourceSpecificApplicationPermissionsAllowedForTeams @('ChannelMessage.Read.Group') -TeamLevelSensitivityLabelCondition SpecificSensivityLabel -SpecificSensitivityLabelIdsApplicableToTeams @(‘null’)
```

> [!NOTE]
> You must include all relevant permissions in your `Update-MgBetaTeamAppPreApproval` cmdlet, even if you’ve already declared them in the existing preapproval.

## Get preapproved permissions for an app

Use the following cmdlet to verify the RSC permissions that were preapproved for an app:

```powershell
Get-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e
```

## Delete the preapproval of RSC permissions

If you want to stop preapproving an app’s RSC permission, you can delete the preapproval policy for that app. To delete a preapproval policy, ensure that you have the App ID.

You can delete the preapproval policy of the app with `remove-MgBetaTeamAppPreApproval` cmdlet:

```powershell
Remove-MgBetaTeamAppPreApproval -TeamsAppId c626ce8b-6d15-4c07-bfb1-a5fd0bc3c20e
```

## See also

* [Grant RSC permissions to your app](grant-resource-specific-consent.md)
* [Test resource-specific consent permissions in Teams](test-resource-specific-consent.md)
