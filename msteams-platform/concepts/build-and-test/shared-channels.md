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

The external members, outside of your organization can collaborate with internal members in Teams without changing their user context. When using guest accounts, the members must sign out of Teams with their account, such as work or school and sign in again using the guest account. The members can also run a separate copy of Teams in a private browser session. The switching between internal and external identities takes time. The members can miss important communications when they sign out of any organization. 

[Place holder for image]

## Get context in shared channels

When the content UX is loaded in a shared channel, use the data received from `getContext` call for  shared channel changes. `getContext` call publishes two new properties, `HostTeamID` and `hostTenantID`, which are used to get channel membership. For more information, see [Get context in shared channels](~/tabs/how-to/access-teams-context.md#get-context-in-shared-channels).  

## Apps in shared channel 

App permissions in shared channels follow host team's app roster and host tenant's app policy. You can collaborate with external members,outside of your organization using shared channels. If your app shares important information, you can also customize the app permission for external members in shared channel.

 ## Get direct shared channel membership

You can get direct shared channel membership by following the steps:

1. Get direct members (Team A) with [GET channel API](/graph/api/channel-list-members?view=graph-rest-beta&tabs=http&preserve-view=true) API. 

    ```http
    GET /teams/{host-team-id}/channels/{channel-id}/members
    ```
2. Get each shared team with GET `sharedWithTeam` API.

    ```http
    GET /teams/{host-team-id}/channels/{channel-id}/sharedWithTeams
    ```
3. Use GET Team member API on each `sharedWithTeam` to get full membership.

    ```http
   GET /teams/{host-team-id}/channels/{channel-id}/sharedWithTeams/{teamA}members
    ```

## Classify list of members in shared channel as in-tenant or out-tenant

You can classify members as in-tenant or out-tenant by comparing `tenantID` of the member or team with `HostTeamTenantID`as follows: 

1. Get tenantID of each direct members
```http
GET /teams/{host-team-id}/channels/{channel-id}/members
```
1. Get tenantID of each shared team with GET sharedWithTeam API.
```http
GET /teams/{host-team-id}/channels/{channel-id}/sharedWithTeams
```
1.	Compare the `tenantID`s of direct members and teams to `HostTenantID`

