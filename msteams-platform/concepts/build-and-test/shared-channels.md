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

The external members, outside of your organizations collaborate with internal members in Teams without changing their user context. This is adventageous because, when using guest accounts, members must sign out of Teams and sign in again using the guest account. Switching between internal and external identities takes time, and members can miss important communications when they sign out of their organization. 

[Place holder for image]

## Get context in shared channels

When the content UX is loaded in a shared channel, use the data received from `getContext` call for  shared channel changes. `getContext` call publishes two new properties, `hostTeamGroupID ` and `hostTenantID`, which are used to get channel membership. For more information, see [Get context in shared channels](~/tabs/how-to/access-teams-context.md#get-context-in-shared-channels).  

## Apps and permissions in shared channels

You can collaborate with external members outside of your organization using shared channels. App permissions in shared channels follow the host team's app roster and host tenant's app policy. 

## Get shared channel membership

You can get direct shared channel membership by using the `hostTeamGroupID` from `getContext` and following these steps:

1. Get direct members with [GET channel members API](/graph/api/channel-list-members?view=graph-rest-beta&tabs=http&preserve-view=true) API. 

    ```http
    GET /teams/{host-team-group-id}/channels/{channel-id}/members
    ```
2. Get each shared team with GET `sharedWithTeams` API.

    ```http
    GET /teams/{host-team-group-id}/channels/{channel-id}/sharedWithTeams
    ```
3. Use GET members of each shared team (Team X) with GET `sharedWithTeams` API.

    ```http
   GET /teams/{host-team-group-id}/channels/{channel-id}/sharedWithTeams/{teamX}/members
    ```

## Classify members in the shared channel as in-tenant or out-tenant

You can classify members as in-tenant or out-tenant by comparing `tenantID` of the member or team with `hostTeamTenantID` as follows: 

1. Get the member you wish to compare.
```http
GET /teams/{host-team-group-id}/channels/{channel-id}/members
```
2.	Using `getContext`, compare the `tenantID` of the member to the `hostTenantID` property.

## AAD native identity

Apps must function cross-tenant in installation and usage. The following table lists the channel types and their corresponding group IDs: 
     
|Channel type| groupId | hostTeamGroupId |
|----------|---------|-----------------|
|Regular | Team AAD group ID | Team AAD group ID |
|Shared	| Empty | Host Team AAD group ID |
