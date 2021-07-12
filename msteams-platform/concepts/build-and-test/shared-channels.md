---
title: Shared channels
author: Rajeshwari-v
description:  Collaborating with shared channels.
ms.author: surbhigupta
localization_priority: Normal
ms.topic: conceptual
---

# Shared channels

Team members use chats and channels to communicate among themselves and share information. There are scenarios, when the team must communicate with external members. The users used to create new chats with the external members or add the external members to the existing chats or channels for communication, which resulted in the following:
* The external users can access the entire team content.
* The chats with external member give limited compliance controls to the system admin.

To resolve the preceding issues, a combination to share channel across the organization along with the ability to invite people to a specific channel has been introduced. Currently, people across and outside the organization can collaborate effectively using shared channels. The shared channel provides easy collaboration and allows to work efficiently with agencies, vendors, or clients. The following image illustrates the concept of shared channels: 

   
# Features 

You can share a channel across the organizational boundaries and invite people to a specific channel for effective collaboration and required information. Bot users are accessible to all users in the workspace with apps installed and any external members in a channel between organizations with specified bot. The team parameter informs your app of the message origin for external users. You can use Conversations API and `users.info` method to determine appropriate data access of your app. By default, your app must expose less information in shared channels to protect your users’ data. You must change the app's behavior for external members if your app shares sensitive information. You can have unique set of tools and apps for multiple companies working together.

## Limitations 

* Private channels: Shared channels have similar isolation challenges as private channels for users who do not belong to the parent team. Use an **allow list** for a set of tabs that functions independent of user groups.
    > [!NOTE]
    > Private channels can be used as Shared channels.    

* Federated users: In Shared channels, the federated tenants encounter the issue of users from multiple organizations accessing the same app. You can follow the `parentTeam/tenant` pattern for app roster, and app management.

## JS SDK and Bot SDK

When the content UX is loaded in a shared channel, the data received from the `getContext` call must account for shared channel changes. If the tab makes use of any of the following values, the `channelType` field must be populated to determine if the tab is loaded in a shared channel, and respond appropriately.
To populate the `channelType` field with `sharedChannel`, you must populate the following  `getContext` properties:

**PROPERTIES:**

|Property name|Description|
|----------|--------------|
|`channelId`| This property is set to the SC channel thread ID.|
|`groupId`|This property is blank for Shared Channels.|
|`hostTeamTenantId`| This property describes the host team’s tenant ID. |
|`hostTeamGroupId`|This property describes the host team’s AAD group ID. This property is distinctly called out from groupID. |
|`tid`|  This property describes the current user’s tenant ID. This matches with the `homeTid` in the token.|
|`teamId`|This property is set to the thread ID of the current shared team. | 
|`teamName`|This property is set to current shared teamName. |
|`teamType`|This property is set to current shared team type.|
|`teamSiteUrl`|This property describes `channelSiteUrl`.| 
|`teamSitePath`| This property describes `channelSitePath`.| 
|`teamSiteDomain`| This property describes  `channelSiteDomain`.| 
|`tenantSKU`| This property describes the host team’s tenant SKU.|
|`userObjectId`|  This property describes current user’s ID, regardless of tenant.|
|`userPrincipalName`| This property describes the current user’s UPN, regardless of tenant.|
|`userTeamRole`| This property describes user’s role in host team:</br>admin </br>user </br> guest </br> [New] sharedChannelMember  |

**APIs**

1.	Get direct members with the `GET channel members` API
1.	Iterate through each shared Team with the `GET sharedWithTeam` API
1.	Use the `GET channel members` API on each `sharedWithTeam` to retrieve full membership.

