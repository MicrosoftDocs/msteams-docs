---
title: Teams Connects Shared Channels
author: surbhigupta
description: Learn about Teams Connect shared channels to securely collaborate with internal and external users in a shared space without switching tenants.
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: conceptual
ms.date: 04/09/2025
---

# Adapting Microsoft Teams App for Shared and Private Channels

Microsoft Teams apps need to adapt to shared and private channels, which bring new collaboration patterns. This guide helps developers in understanding the changes required so that their apps work smoothly across all channel types.

Microsoft Teams Connect shared and private channels allow members of a channel to collaborate with users across other teams and organizations. You can create and share a shared channel with:

* Members of another team within the same organization.
* Members of teams of other organizations.

> [!NOTE]
>
> * Tab apps in Shared channels are available in [Government Community Cloud (GCC), GCC High, Department of Defense (DoD)](../cloud-overview.md#teams-app-capabilities), and [Teams operated by 21Vianet](../sovereign-cloud.md) environments.
> * SharePoint and the SharePoint pages apps aren't supported for Shared channels in GCC, GCC High, DoD, and Teams operated by 21Vianet environments.

Teams Connects Shared channels facilitate secure collaboration seamlessly. Allow external users outside of your organization to collaborate with internal users in Teams without changing their user context. Enhance user experience unlike using guest accounts, for example, the members must sign out of Teams and sign in again using a guest account. Teams applications extend the powerful collaboration space.

:::image type="content" source="~/assets/images/app-fundamentals/shared-channels-teams.png" alt-text="Diagram shows Team B from organization A and Team C from organization B collaborating in a Shared channel as Team A.":::

## Understanding Shared and Private Channels in Microsoft Teams

### Shared Channel

Shared channels in Microsoft Teams let you collaborate with people who aren’t part of your team. Only users added as owners or members can access the shared channel. You can’t add regular guest accounts (via Microsoft Entra) to shared channels. However, you can still invite people from outside your organization through Microsoft Entra B2B direct connect, which enables secure external collaboration with no need to add them as guests.

### Private Channel

Private channels in Microsoft Teams are special spaces for focused collaboration within a team. The system allows only people added as owners or members of the private channel to access it. You can include guests (users with Microsoft Entra guest accounts) in a private channel, but only if they're already part of the host team.

### Feature Differences between Shared and Private Channels

| Features             | Standard Channel       | Shared Channel                                      | Private Channel                                  |
|---------------------|------------------------|-----------------------------------------------------|--------------------------------------------------|
| People can be added to channel without adding to team        | No         | Yes   | No                       |
|Channel membership can be limited to a subset of the team   | No        | Yes           | Yes                |
|Channel can be shared directly with other teams   | No       | Yes                                      | No                                  |
|Channel can be shared directly with its parent team      | NA               | Yes                      | No                    |
|Guests can participate in the channel      |Yes            | No                   | Yes                    |
|External participants (Direct Connect) can participate in channel       |No            | Yes                 | No                    |
|Each channel has a dedicated SharePoint site       |No           | Yes                   | Yes                    |

## Reimagining App's Functionality for Shared and Private Channels

As an app developer, it’s important to rethink how your app works within shared and private channels in Microsoft Teams. Since these channels provide new way for users to collaborate, your app must adapt to support their unique features.

## Why you should Adapt Apps to Shared and Private Channels

As a developer, it's important to rethink how your app works in Microsoft Teams' shared and private channels. These channels offer new ways for users to collaborate—across teams and even across organizations—so your app needs to be flexible and aware of these environments.

Why Adapting Your App Matters:

1. Beyond Standard Channels: Without updates, your app doesn't appear or function in shared or private channels. Some changes are mandatory for compatibility.
2. Wider Collaboration: Shared channels allow external users to join via Microsoft Entra B2B Direct Connect. Your app can support broader collaboration if properly configured.
3. Tailored Functionalities: You can highlight or build features that support cross-team workflows, like role-based permissions or scoped notifications.
4. Future-Proofing: These channels are the future of collaboration in Teams. Updating your app now ensures it remains relevant and competitive.

## A Strategic Approach to Change

Microsoft Teams is developing with shared and private channels, and that means apps need to develop too. To keep your app working smoothly across all channel types—standard, shared, and private—you need a logical strategy.

### Mandatory Changes

If you don’t update the app to support shared and private channels in Microsoft Teams, it might not work properly in those spaces.  

Note- Assess whether your app relies on specific requirements. If it doesn't, enable support for shared and private channels in the app manifest. You can apply functional changes later.

|Requirement|Description|Examples|
|------------------------|-----------------------------------------------------|--------------------------------------------------|
| Getting members of channel in which app functions|All members of team are also part of standard channels. But in Shared or private channels it's flexible depending on the channel owner's choice. So make sure you use channel specific members APIs rather than using team members APIs, else your app can work unexpectedly for members outside the channel and leak content.| In a project management app, assigning tasks in a Shared channel means targeting channel members—not the full team.|
|Accessing and storing data in Shared & private channels|All standard channels share the same SharePoint site. But each Shared and private channel has its own SharePoint site for storing files or app content. So, make sure you use APIs available to access channel’s sharepoint site vs Team’s sharepoint site, else your app breaks and can leak data across channels.|A document management app typically stores files on the team’s SharePoint site when working in standard channels. Shared and private channels have their own dedicated SharePoint sites, which are separate from the team’s site. The app saves and retrieves files from the SharePoint site that is linked to the specific channel, rather than using the team’s SharePoint site when operating within Shared or private channels.|
|Limit content access based on channels|As Shared and private channels can have sensitive or restricted content not to be Shared outside channel, so ensure you don't cross-post or cross-access data across channels and think carefully on your app scenarios.|A summarization app can summarize nonconfidential chats/messages from all channels inside a team and post in a standard channel or to a group of team members. This app makes changes to not access private or Shared channel messages for this scenario and only get messages from standard channels.|
|Make your app available for Teams users in Shared and private channels|After you make necessary changes to your app, you must mark in App manifest that your app now is also supported in Shared and private channels. Else, your app isn't discoverable in these channels anymore. **This is a Must-Do step for all apps.**

### Optional Enhancements to Improve User Experience

These updates aren't required, but they can make your app work better in shared and private channels:

|Requirement|Description|Examples|
|------------------------|-----------------------------------------------------|--------------------------------------------------|
|Privacy & Access Controls for app features| Implement conditional privacy & access controls within your app modules to cater to mix of internal and external users, protecting sensitive information as warranted for your app use-case.|In a poll or survey app, internal members create polls and view results. External members in Shared channels and guests in Private channels only respond to polls. They can't create polls or see past results.|
|Collaboration| Make it easier for people to work together in Shared channels. Add task lists that everyone can see. If they are from the host team, they can add and change tasks. If they are from another team, they may have fewer rights. Guests inside the company and people from outside can see tasks, but can't change them.| Whiteboarding apps introduce a feature that lets external users in shared channels or guests in private channels add to the canvas. These users don't erase or edit contributions made by internal members.|
|Notification / Nudges| Refine your app's notification systems to avoid overloading users with irrelevant updates, possibly segmenting alerts by user group or channel type.| Helpdesk app used in a Shared channel, internal IT staff might receive immediate alerts for high-priority tickets or infrastructure issues, whereas external vendors might only receive notifications for tickets assigned to them or for maintenance schedules affecting their services.|

## Technical Changes for App Compatibility with Shared and Private Channels

With an enhanced understanding of how users interact in shared and private channels, you can now focus on the technical steps to update your app. Microsoft Teams offers APIs to work with these channels.

### Identify Channels

When your app runs inside Microsoft Teams, it needs to know what kind of channel it’s operating in. This check helps the app adjust its functionality accordingly.

|Tabs| Bots|
|--------------------------------------|----------------------------------------|
|When content UX is loaded in a Shared channel, use data received from [getContext](../../tabs/how-to/access-teams-context.md) call <br> For Shared channel, channel.membershipType == “Shared,”<br> For private channel channel.membershipType =="Private,"|Use turnContext.activity.channelData.channel.type type property from any of the bot activity handlers event generated for shared channel activities, to get context of where bot was invoked or bot activity originated from.<br> For Shared Channel  turnContext.activity.channelData.channel.type == “shared”<br> For Private ChannelturnContext.activity.channelData.channel.type == “private” You can learn more from [(Bot activity handlers - Teams  Microsoft Learn)](../../bots/bot-concepts.md)

SupportedChannelTypes is an optional property that enables your app in nonstandard channels. If your app supports the team scope and you define the property, Teams enables your app in each channel type accordingly. The apps support private and shared channels. For more information, see [supportedChannelTypes](../../resources/schema/manifest-schema.md#supportedchanneltypes).

```JSON
    "supportedChannelTypes": [
        "sharedChannels",
        "privateChannels"
    ]
```

> [!NOTE]
>
> * If your app supports the team scope, it functions in standard channels, regardless of what this property defines.
> * To work well in all channel types, your app should handle the special rules and settings of each one.

### Get Context for Shared Channels

When loading the content UX in a shared or private channel, use the data received from `getContext` call for shared or private channel changes. `getContext` call publishes two new properties, `hostTeamGroupID` and `hostTenantID`, which are used to retrieve channel membership using Microsoft Graph APIs. `hostTeam` is the team that creates the shared channel.

For more information to enable your tab, see:

* [Get context for your tab for private channels](../../tabs/how-to/access-teams-context.md#retrieve-context-in-private-channels)
* [Get context in shared channels](../../tabs/how-to/access-teams-context.md#get-context-in-shared-channels)

### Managing Channel Members and Permissions in Microsoft Teams Apps

To ensure your app functions correctly in shared and private channels, you must use channel-specific APIs to gather accurate member information. Usage of channel-specific APIS is important because:

Team membership APIs aren't equal to shared or private Channel membershipShared and private channels have their own membership models, which aren't the same as the parent team’s membership.

Each channel has its own SharePoint site with its own permissions. Apps must follow these rules to prevent data leaks or access problems.

### Get Host Team Group ID & Channel ID

| Tabs                                | Bots                                  |
|--------------------------------------|----------------------------------------|
|You can use below mentioned parameters received in getContext call to get host team ID and channel ID required for any Graph calls <br> 1. JSv1: hostTeamGroupID and channelId <br> 2. JSv2: channel.ownerGroupId and channel.id  | For any event payload or action payload received for a bot, <br>Get host team group ID from: turnContext.Activity.TeamsGetTeamInfo().AadGroupId received in event payloads. <br> Get channel ID from: turnContext.Activity.TeamsGetChannelId() or turnContext.Activity.ChannelId received in event payloads.

Note: Don't store these parameters, because the channel owner can change the host team of a shared channel, which updates the values. Recommended to always fetch these dynamically when needed.

Then, call APIs listed below based on your app requirements:

### Get All Members of a Private or Shared Channel

If you're using Graph

Pass the teamID and channelID fetched above in GET teams/{team-ID}/channels/{channel-ID}/allMembers to get all members of a Shared or a private channel.

If you are using Bots SDK

Pass the channel ID you received above in [getConversationMembers](../../resources/team-chat-member-api-changes.md) API to get all members of a Shared or private channel.  

Note: Use the following APIs only if your app needs to create specific permissions or experiences based on the member type in a shared channel. Otherwise, you can skip them.

## Apps and permissions in Shared Channels

You can collaborate with external members outside of your organization using Shared channels. App permissions in Shared channels follow the host team's app roster and host tenant's app policy.

> [!NOTE]
> The [activity feed notification API](/graph/teams-send-activityfeednotifications) doesn't support cross-tenant notifications for apps in a Shared channel.

### Get Shared Channel Membership

You can get direct shared channel membership by using the `hostTeamGroupID` from `getContext` and following these steps:

Note: This returns both internal and external users added to the Shared channel.

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
## Retrieve Members of a Shared Channel in Microsoft Teams

In Microsoft Teams, when you share a channel with another team, the channel includes that team’s members. The system doesn’t add users directly to the shared channel; instead, it grants access through their team’s connection to the channel.

Get each shared team with GET sharedWithTeams API.
GET /teams/{host-team-group-id}/channels/{channel-id}/sharedWithTeams

Use GET members of each shared team (Team X) with GET sharedWithTeams API.
GET /teams/{host-team-group-id}/channels/{channel-id}/sharedWithTeams/{teamX}/members

With this information, structure your app to interpret member details and apply appropriate permissions as per your app use-case.

For instance, Once your app identifies the channel type (standard, private, or shared) and retrieves member details using Microsoft Graph or Bot APIs, you can ensure that features like editing and task creation are selectively enabled based on user roles (Owners vs members vs External participants) determined through the preceding API responses.

## Classify Members in the Shared channel as In-tenant or Out-tenant

You can classify members as in-tenant or out-tenant by comparing `tenantID` of the member or team with `hostTeamTenantID` as follows:

1. Get the member you wish to compare.

    ```http
    GET /teams/{host-team-group-id}/channels/{channel-id}/members
    ```

2. Use `getContext`, compare the `tenantID` of the member to the `hostTenantID` property.

<a name='azure-ad-native-identity'></a>

## Handling External Users (B2B Direct connect) in Shared Channels

Each Teams channel links to its own SharePoint site with separate permissions. When building apps, make sure to check these limits so you don’t run into access issues or cause data leaks.

For this, perform the following steps:

Step 1: Identify External Users
To do this, get tenant ID of the channel in which your app is operating inside.

|Tabs|Bots|
|--------------------------------------|----------------------------------------|
|You can use below mentioned parameters received in [getContext](../../tabs/how-to/access-teams-context.md) call to get host team ID and channel ID required for any Graph calls <br>•JSv1: hostTeamGroupID and channelId <br>•JSv2: channel.ownerGroupId and channel.id  | For any event payload or action payload received for a bot,<br>•Get host team group ID from turnContext.Activity.TeamsGetTeamInfo().AadGroupId received in event payloads.<br>•Get channel ID from turnContext.Activity.TeamsGetChannelId() or turnContext.Activity.ChannelId received in event payloads.
 
Then, identify external users from direct members list you received for Shared channel.

Get members of a shared or a private channel.  
GET /teams/{host-team-group-id}/channels/{channel-id}/members

Compare tenantID of each member with the hostTenantID property from above to classify member as out-of-tenant if TenantIds don’t match.

## Authenticate External Users to Access your App Content in SharePoint

Note: This step is only required when requesting the SharePoint token that is your app stores content in SharePoint service of the tenant in which channel is hosted.  

 |Tabs|Bots|
|--------------------------------------|----------------------------------------|
|Save host tenant ID of Shared channel where tab is configured. You can get host tenant ID from channel.ownerTenantId for JSv2 or hostTenantId for JSv1 received under getContext call. | For any event payload or action payload received for a bot, use Get hostTenant ID, from turnContext.activity.conversation.tenantId|

Now, send saved host tenant ID inside tenantId parameter of getAuthToken call to allow cross-tenant users to access content hosted inside Sharepoint site attached to the Shared channel.

## Identify Guest Users (B2B Guests) in Private Channels

You can identify if a member of private channel is guest user, invited to your tenant from external organization, using 'roles' property received for each [conversationMember](https://learn.microsoft.com/graph/api/resources/conversationmember?view=graph-rest-1.0) object in [List members of a channel - Microsoft Graph v1.0 | Microsoft Learn](https://learn.microsoft.com/graph/api/channel-list-members?view=graph-rest-1.0&tabs=http) response.  

For guests, “roles” = “guest”

## Microsoft Entra Native Identity

Apps must function cross-tenants in installation and usage. The following table lists the channel types and their corresponding group IDs:

|Channel type| groupId | hostTeamGroupId |
|----------|---------|-----------------|
|Regular | Team Microsoft Entra group ID | Team Microsoft Entra group ID |
|Shared | Empty | Host Team Microsoft Entra group ID |

## Access SharePoint Data in Shared and Private Channels

If you're building an app using [SharePoint](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/integrate-with-teams-introduction) Framework, you need to use the SharePoint Online (SPO) site linked to the Shared channel—not the one linked to the host team group. Each private channel has its own SPO site that is only accessible to members of that specific Shared or private channel.

Use the Graph API to access the document library of the SharePoint Online (SPO) site linked to a Shared or private channel. Ensure you pass the Team ID and Channel ID received from the [Get Host Team Group ID & Channel ID](#get-host-team-group-id--channel-id) and pass in [Get filesFolder - Microsoft Graph v1.0 | Microsoft Learn](../../channel-get-filesfolder.md).

## Declare your App Works in Shared and Private Channels

After making all the preceding changes, you need to declare your app’s manifest to declare that your app works in Shared and private channels.

This declaration will make your app visible to users in Shared and private channels. Else, your app won't be discoverable to users in those channels. This is a mandatory update.

supportsChannelFeatures is an optional property that enables your app in nonstandard channels along with standard channels.  

Put supportsChannelFeatures as “level2” For more information, see <Link to manifest’s public documentation section>.

Json
{
  "supportsChannelFeatures": [
    "Tier1"
  ]
}


Note: If your app supports team scope, it functions in standard channels, regardless of what values are defined in this property.

Note:

- When you declare support for "Tier1" in your app manifest.
  - You're assuming the channel's roster matches the parent team.
  - To get the full list of users with access—including direct and transitive members—use the API: GET/teams/{team-id}/channels/{channel-id}/allMembers
  - This is the only API that returns everyone who can access the channel. Check the official documentation for more details.

- Don't assume the type of users (e.g., guest, external, internal) in a channel’s roster.
  - a. When using the GET/teams/{team-id}/channels/{channel-id}/allMembers API:
    - Check the "roles" property to identify if the user is a guest.
    - Check the "tenantId" property to determine if the user is:<br>*From the same tenant (intra-tenant), or<br>*From a different tenant (cross-tenant).
 - This API returns both direct and transitive members—ensuring a complete view of channel access.

- Do not assume that a channel’s storage location is the same as its parent team’s SharePoint site.
  - Instead, always use the Microsoft Graph API endpoint:
GET /teams/{team-id}/channels/{channel-id}/filesFolder
  - This API call returns the current and correct SharePoint document library location for the specified channel—especially important for shared and private channels, which have their own dedicated SharePoint sites.

## Apps in Federated Group Chats with External Users

> [!NOTE]
>
> * Apps in federated group chats with external users aren't available in [Government Community Cloud (GCC), GCC High, Department of Defense (DoD)](../cloud-overview.md#teams-app-capabilities), and [Teams operated by 21Vianet](~/concepts/sovereign-cloud.md) environments.
> * Apps aren't supported in one-on-one chats, channels, or meetings with external users.

Teams supports the use of apps in federated group chats with external users. These users can't add, update, or remove apps from the group chat. Only the host of the group chat can add, update, or remove apps. However, all members of the chat, including external users, can use apps under the following conditions:

* The tenant admin of the group chat host's organization and the tenant admin of the external user's organization must allow the use of the app in federated group chats. For more information, see [Teams apps for external attendees or guests from outside an organization](/microsoftteams/apps-external-users).
* The app allows access to external users in federated group chats.

If you're developing an app for use in federated group chats with external users, register your app as a multitenant app in Microsoft Entra ID. This action allows users across multiple organizations to access your app.

> [!NOTE]
> If you want to test the [code sample](#code-sample) with an external user in a federated group chat, you must first add the external user as a guest to your tenant. For more information, see [Quickstart: Add a guest user and send an invitation](/entra/external-id/b2b-quickstart-add-guest-users-portal). After adding the user to the tenant, go to the federated group chat and add the guest to test the app.

## Code sample

|Sample name|Description|Node.js|
|-------------|-------------|------|
|Teams Conversation Bot|This sample app displays the names of the members in a federated group chat with external users.|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-feed-members/nodejs/)|

## See also

* [Build tabs for Teams](../../tabs/what-are-tabs.md)
* [App manifest schema for Teams](../../resources/schema/manifest-schema.md)
* [Shared channels in Microsoft Teams](/microsoftteams/shared-channels)
* [Channel resource type](/graph/api/resources/channel)
* [Retention policy for Teams locations](/microsoft-365/compliance/create-retention-policies)
* [Use guest access and external access to collaborate with people outside your organization](/microsoftteams/communicate-with-users-from-other-organizations)
* [Manage external meetings and chat with people and organizations using Microsoft identities](/microsoftteams/trusted-organizations-external-meetings-chat?tabs=organization-settings)
