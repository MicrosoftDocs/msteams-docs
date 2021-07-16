---
title: Shared channels
author: Rajeshwari-v
description:  Collaborating with shared channels.
ms.author: surbhigupta
localization_priority: Normal
ms.topic: conceptual
---

# Shared channels

> [!NOTE]     
> Shared channels are currently available in [developer preview](~/resources/dev-preview/developer-preview-intro.md) only.

Shared channels in Teams allow members of an organization to collaborate with external members with access permissions. You can create a channel and share the channel with:

* Members of another team within the same organization
* Members of other organizations 

For example, organization A is the host tenant and team A is the host team. Team A creates a channel and shares it with team B within the same organization. Consider organization B is external and consists of members with access permissions. Team A shares the channel with members of organization B. The following image illustrates the concept of shared channels:

![Shared channels](~/assets/images/shared-channels.png)

## Get context in shared channels

When the content UX is loaded in a shared channel, use the data received from `getContext` call for  shared channel changes. If tab makes use of any of the following values, you must populate the `channelType` field to determine if the tab is loaded in a shared channel, and respond appropriately.

Use the following `getContext` properties to populate the `channelType` field with `sharedChannel`:

|Property name|Description|
|----------|--------------|
|`channelId`| The property is set to the SC channel thread ID.|
|`groupId`|The property is blank for shared Channels.|
|`hostTeamTenantId`| The property describes the host team’s tenant ID. |
|`hostTeamGroupId`|The property describes the host team’s AAD group ID and is called out from groupID. |
|`tid`|  The property describes the current user’s tenant ID, which matches the `homeTid` in the token.|
|`teamId`|The property is set to the thread ID of the current shared team. | 
|`teamName`|The property is set to current shared `teamName`. |
|`teamType`|The property is set to current shared `teamType`.|
|`teamSiteUrl`|The property describes `channelSiteUrl`.| 
|`teamSitePath`| The property describes `channelSitePath`.| 
|`teamSiteDomain`| The property describes  `channelSiteDomain`.| 
|`tenantSKU`| The property describes the host team’s `tenantSKU`.|
|`userObjectId`|  The property describes current user’s ID.|
|`userPrincipalName`| The property describes the current user’s UPN.|
|`userTeamRole`| The property describes user’s role in host team, such as admin, user, guest, and `sharedChannelMember`.  |

## App permissions 

App permissions in shared channels follow host team's app roster and host tenant's app policy. You can customize the app permission for external members, if your app shares important information. You can use `Conversations API` and `users.info` method to determine appropriate data access of your app.

## Get direct shared channel membership

You can get direct shared channel membership by following the steps:

1. Get direct members with [GET channel members](/graph/api/channel-list-members?view=graph-rest-beta&tabs=http&preserve-view=true) API. 

    ```http
    GET /teams/{host-team-group-id}/channels/{channel-id}/members
    ```
2. Get each shared team with `GET sharedWithTeam` API.

    ```http
    GET /teams/{host-team-group-id}/channels/{channel-id}/sharedWithTeams
    ```
3. Use [GET channel members](/graph/api/channel-list-members?view=graph-rest-beta&tabs=http&preserve-view=true) API on each `sharedWithTeam` to get full membership.

## AAD native identity 

The apps must function cross-tenant in installation and usage. The following table lists the channel types and their corresponding group IDs:

|  Channel type  | groupId | hostTeamGroupId |
|-----------------|----------|----------------------|
|Regular|	Team AAD group ID|	Team AAD group ID|
|Private|Empty|	Host Team AAD group ID|
|Shared|	Empty|	Host Team AAD group ID|

## Manifest update 

You can use `supportsSharedChannels` boolean property in the app manifest to control app access in shared channel. You can set the property value to `true` or `false` and give apps permissions. 
