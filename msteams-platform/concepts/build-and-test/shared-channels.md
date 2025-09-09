---
title: Teams Connects Shared Channels
author: surbhigupta
description: Learn about Teams Connect shared channels to securely collaborate with internal and external users in a shared space without switching tenants.
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: conceptual
ms.date: 04/09/2025
---

# Microsoft Teams connects for shared and private channels

Microsoft Teams apps must support shared and private channels, which introduce new collaboration scenarios across teams and organizations. Shared channels in Microsoft Teams Connect can be created and shared with members of other teams within the same organization or with teams from external organizations.

> [!NOTE]
>
> * Tab apps in Shared channels are available in [Government Community Cloud (GCC), GCC High, Department of Defense (DoD)](../cloud-overview.md#teams-app-capabilities), and [Teams operated by 21Vianet](../sovereign-cloud.md) environments.
> * SharePoint and the SharePoint pages apps aren't supported for Shared channels in GCC, GCC High, DoD, and Teams operated by 21Vianet environments.

Teams Connects Shared channels facilitate secure collaboration seamlessly. Allow external users outside of your organization to collaborate with internal users in Teams without changing their user context. Enhance user experience unlike using guest accounts, for example, the members must sign out of Teams and sign in again using a guest account. Teams applications extend the powerful collaboration space.

 ![Diagram shows Team B from organization A and Team C from organization B collaborating in a Shared channel as Team A.](../../assets/images/app-fundamentals/shared-channels-teams.png)

## Understanding shared and private channels in Microsoft Teams

### Shared channel

Shared channels in Microsoft Teams let you collaborate with people who aren’t part of your team. Only users added as owners or members can access the shared channel. You can’t add regular guest accounts (via Microsoft Entra) to shared channels. However, you can still invite people from outside your organization through Microsoft Entra B2B direct connect, which enables secure external collaboration with no need to add them as guests.

### Private channel

Private channels in Microsoft Teams are special spaces for focused collaboration within a team. The system allows only people added as owners or members of the private channel to access it. You can include guests (users with Microsoft Entra guest accounts) in a private channel, but only if they're already part of the host team.

### Feature differences between shared and private channels

| Features             | Standard Channel       | Shared Channel                                      | Private Channel                                  |
|---------------------|------------------------|-----------------------------------------------------|--------------------------------------------------|
| People can be added to channel without adding to team        | No         | Yes   | No                       |
|Channel membership can be limited to a subset of the team   | No        | Yes           | Yes                |
|Channel can be shared directly with other teams   | No       | Yes                                      | No                                  |
|Channel can be shared directly with its parent team      | NA               | Yes                      | No                    |
|Guests can participate in the channel      |Yes            | No                   | Yes                    |
|External participants (Direct Connect) can participate in channel       |No            | Yes                 | No                    |
|Each channel has a dedicated SharePoint site       |No           | Yes                   | Yes                    |

### Teams channels – capabilities comparison

| **Category** | **Capability**                                                                 | **Standard channel** | **Private channel** | **Shared channel** |
|--------------|----------------------------------------------------------------------------------|----------------------|---------------------|---------------------|
| **Membership** | Can add people to the channel without adding to the host team                 | No                   | No                  | Yes                 |
|              | Channel membership can be limited to a subset of the host team                 | No                   | Yes                 | Yes                 |
|              | Channel can be shared with other teams to inherit members from the team        | No                   | No                  | Yes                 |
|              | Channel can be shared directly with its parent team to inherit members         | N/A                  | No                  | Yes                 |
|              | Guests (B2B Guests) can participate in the channel                             | Yes                  | Yes                 | No                  |
|              | External participants (B2B Direct Connect) can participate in the channel      | No                   | No                  | Yes                 |
|              | Channel is hosted under a host team                                            | Yes                  | Yes                 | Yes                 |
| **Storage**   | Each channel has a dedicated SharePoint site                                  | No (inherits team site) | Yes              | Yes                 |
| **App Model** | App must be installed in the host team                                        | Yes                  | Yes                 | Yes                 |
|              | App installed to host team automatically available in channel                 | Yes                  | No                  | No                  |
|              | App must be added to each channel                                              | No                   | Yes                 | Yes                 |

## A strategic approach to change

Microsoft Teams is developing with shared and private channels, and that means apps need to develop too. To keep your app working smoothly across all channel types: standard, shared, and private you need a logical strategy.

## Technical changes for app compatibility with shared and private channels

With an enhanced understanding of how users interact in shared and private channels, you can now focus on the technical steps to update your app. Microsoft Teams offers APIs to work with these channels.

### Identify channels

When your app runs inside Microsoft Teams, it needs to know what kind of channel it’s operating in. This check helps the app adjust its functionality accordingly.

|Tabs| Bots|
|--------------------------------------|----------------------------------------|
|When content UX is loaded in a Shared channel, use data received from [getContext](../../tabs/how-to/access-teams-context.md) call <br> For Shared channel, channel.membershipType == Shared,<br> For private channel channel.membershipType == Private,|To determine where a bot activity originated, especially in shared channel scenarios, use the channel.type property found in turnContext.activity.channelData. This property is available in any bot activity handler and helps identify the channel type, allowing your app to respond appropriately based on the context.<br> For Shared Channel  turnContext.activity.channelData.channel.type == shared<br> For Private ChannelturnContext.activity.channelData.channel.type == private You can learn more from [(Bot activity handlers - Teams  Microsoft Learn)](../../bots/bot-concepts.md)

SupportedChannelTypes is an optional property that enables your app in nonstandard channels. If your app supports the team scope and you define the property, Teams enables your app in each channel type accordingly. The apps support private and shared channels. For more information, see [supportedChannelTypes](../../resources/schema/manifest-schema.md#supportedchanneltypes).

```JSON
    "supportedChannelTypes": [
        "sharedChannels",
        "privateChannels"
    ]
```

> [!NOTE]
>
> * If your app supports the team scope, it functions in standard channels, regardless of what values are defined in this property.
> * Your app might need to account for the unique properties of each of these channel types in order to function properly.
> * Only **tabs** are currently supported in **private** and **shared** channels in Microsoft Teams.

### Get context for shared channels

When loading the content UX in a shared or private channel, use the data received from `getContext` call for shared or private channel changes. `getContext` call publishes two new properties, `hostTeamGroupID` and `hostTenantID`, which are used to retrieve channel membership using Microsoft Graph APIs. `hostTeam` is the team that creates the shared channel.

For more information to enable your tab, see:

* [Get context for your tab for private channels](../../tabs/how-to/access-teams-context.md#retrieve-context-in-private-channels)
* [Get context in shared channels](../../tabs/how-to/access-teams-context.md#get-context-in-shared-channels)

### Managing channel members and permissions in Microsoft Teams apps

To ensure your app functions correctly in shared and private channels, you must use channel-specific APIs to gather accurate member information. Usage of channel-specific APIS is important because:

Team membership APIs aren't equal to shared or private Channel membership Shared and private channels have their own membership models, which aren't the same as the parent team’s membership.

Each channel has its own SharePoint site with its own permissions. Apps must follow these rules to prevent data leaks or access problems.

### Get host team group ID & channel ID

| Tabs                                | Bots                                  |
|--------------------------------------|----------------------------------------|
|You can use below mentioned parameters received in getContext call to get host team ID and channel ID required for any Graph calls <br> 1. JSv1: hostTeamGroupID and channelId <br> 2. JSv2: channel.ownerGroupId and channel.id  | For any event payload or action payload received for a bot, <br>Get host team group ID from: turnContext.Activity.TeamsGetTeamInfo().AadGroupId received in event payloads. <br> Get channel ID from: turnContext.Activity.TeamsGetChannelId() or turnContext.Activity.ChannelId received in event payloads.

> [!NOTE]
>
> * Don't store these parameters, because the channel owner can change the host team of a shared channel, which updates the values. Recommended to always fetch these parameters dynamically when needed.

Then, call following APIs listed based on your app requirements:

### Get all members of a private or shared channel

If you're using Graph

Pass the teamID and channelID fetched in the preceding section in GET teams/{team-ID}/channels/{channel-ID}/allMembers to get all members of a Shared or a private channel.

If you are using Bots SDK

Pass the channel ID you received in [getConversationMembers](../../resources/team-chat-member-api-changes.md) API to get all members of a Shared or private channel.  

Note: Use the following APIs only if your app needs to create specific permissions or experiences based on the member type in a shared channel. Otherwise, you can skip them.

## Apps and permissions in shared channels

You can collaborate with external members outside of your organization using Shared channels. App permissions in Shared channels follow the host team's app roster and host tenant's app policy.

> [!NOTE]
> The [activity feed notification API](/graph/teams-send-activityfeednotifications) doesn't support cross-tenant notifications for apps in a Shared channel.

### Get shared channel membership

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

## Retrieve members of a shared channel in Microsoft Teams

In Microsoft Teams, when you share a channel with another team, the channel includes that team’s members. The system doesn’t add users directly to the shared channel; instead, it grants access through their team’s connection to the channel.

Get each shared team with GET sharedWithTeams API.

```http
GET /teams/{host-team-group-id}/channels/{channel-id}/sharedWithTeams
 ```

Use GET members of each shared team (Team X) with GET sharedWithTeams API.

```http
GET /teams/{host-team-group-id}/channels/{channel-id}/sharedWithTeams/{teamX}/members
 ```

With this information, structure your app to interpret member details and apply appropriate permissions as per your app use-case.

## Classify members in the shared channel as in-tenant or out-tenant

You can classify members as in-tenant or out-tenant by comparing `tenantID` of the member or team with `hostTeamTenantID` as follows:

1. Get the member you wish to compare.

    ```http
    GET /teams/{host-team-group-id}/channels/{channel-id}/members
    ```

2. Use `getContext`, compare the `tenantID` of the member to the `hostTenantID` property.

<a name='azure-ad-native-identity'></a>

## Get app notifications for direct and indirect membership changes

### In graph

Apps installed in shared channels receive notifications when users are added to or removed from a team that shares the channel. To receive these notifications, you must:

1. [Install the app](../deploy-and-publish/apps-upload.md) in a host team and enable it for the shared channel.
1. Create a valid Microsoft Graph change notification subscription to monitor associated team membership changes and shared or unshared events using supported APIs.

To receive both direct and indirect member update notifications, you must include both the query string parameters when creating a subscription. If the query strings aren't provided, the subscription only delivers notifications for direct member updates. To learn more, see [Channel membership access](/graph/teams-changenotifications-channelmembership).

```http
`/teams/{team-id}/channels/getAllMembers?notifyOnIndirectMembershipUpdate=true&suppressNotificationWhenSharedUnsharedWithTeam=true`
```

This subscription enables apps to monitor membership changes in shared channels and its associated teams. For more information on how to create a Microsoft Graph change notification subscription, see [Create a subscription.](/graph/teams-changenotifications-teammembership)

### In Bot SDK

When a new member is added to a shared channel, the OnMembersAddedAsync method is called. This method provides the context and details of the user who was added, allowing the bot to respond accordingly.

Member added

```http
public async Task OnMembersAddedAsync(ITurnContext turnContext, AppState turnState, CancellationToken cancellationToken) 
```

Similarly, when a member is removed from the channel, the OnMembersRemovedAsync method is called. This method allows the bot to handle clean-up tasks or adjust access controls as needed.

Member removed

```http
public async Task OnMembersRemovedAsync(ITurnContext turnContext, AppState turnState, CancellationToken cancellationToken)
```

These Bot SDK endpoints are essential for monitoring membership changes and maintaining accurate membership data across shared and private channel.

## Validate user access for membership updates

### Graph

When an app receives a notification for an indirect membership update, it’s important to verify whether the user still has access to the shared channel as the same user might have both direct and indirect membership. For example, if a user is removed from a team that shares a channel, the app should confirm whether the user's access is truly lost. Use the **doesUserHaveAccess** API to determine whether the user still has access to the shared channel.

```http
GET /teams/{team-id}/channels/{channel-id}/doesUserHaveAccess(userId='@userid',tenantId='@TenantID',userPrincipalName='@UserPrincipalName')
```

See [doesUserHaveAccess API](/graph/api/channel-doesuserhaveaccess?view=graph-rest-beta&tabs=http) to learn more about user accesses and relevant permissions.

## Handle bulk membership changes

If there are bulk membership changes, Teams curbs individual membership update notifications when a channel is shared or unshared with a team. This feature reduces notification volume and improves performance.

### Use sharedWithTeams subscription for bulk membership changes

To reduce notification overload during membership updates, such as when a shared channel is added to or removed from a team with thousands of members, use the new SharedWithTeams subscription resource:

```http
`/teams/{team-id}/channels/{channel-id}/sharedWithTeams`
```

The sharedWithTeams subscription sends a single notification when a channel is shared or unshared with a team. It avoids thousands of per-user notifications and improves performance for apps that monitor membership changes. Ensure that you update the shared channel member list using the /allMembers API after receiving a "shared with" or "unshared from" team notification.

> [!NOTE]
> To support membership updates in shared channels, apps using resource-specific consent (RSC) must request extended permissions.
> These permissions let the app:
>
> * Access membership data (both direct and indirect members).
> * Receive and respond to membership change notifications.

### Bot Framework

Whenever a shared channel is shared with another team, that team receives a notification through the Bot SDK endpoint API Bot SDK endpoint API "OnConversationUpdateActivityAsync."

```http
GET /teams/{team-id}/channels/{channel-id}/doesUserHaveAccess(userId='@userid',tenantId='@TenantID',userPrincipalName='@UserPrincipalName')
```

## Handling external users (B2B Direct connect) in shared channels

Each Microsoft Teams channel is linked to its own SharePoint site, which has separate permission. When building apps, make sure to check these limits so you don’t run into access issues or cause data leaks.

Perform the following steps, for this identification process:

Step 1: Identify External Users
Get tenant ID of the channel in which your app is operating inside.

|Tabs|Bots|
|--------------------------------------|----------------------------------------|
|You can use below mentioned parameters received in [getContext](../../tabs/how-to/access-teams-context.md) call to get host team ID and channel ID required for any Graph calls <br>•JSv1: hostTeamGroupID and channelId <br>•JSv2: channel.ownerGroupId and channel.id  | For any event payload or action payload received for a bot,<br>•Get host team group ID from turnContext.Activity.TeamsGetTeamInfo().AadGroupId received in event payloads.<br>•Get channel ID from turnContext.Activity.TeamsGetChannelId() or turnContext.Activity.ChannelId received in event payloads.
 
Then, identify external users from direct members list you received for Shared channel.

Get members of a shared or a private channel.  
GET /teams/{host-team-group-id}/channels/{channel-id}/members

To classify member as out-of-tenant if TenantIds don’t match, compare tenantID of each member with the hostTenantID property.

## Authenticate external users to access your app content in sharepoint

You need to complete this step when your app stores content in the SharePoint site of the tenant that hosts the channel and requests a SharePoint token.

 |Tabs|Bots|
|--------------------------------------|----------------------------------------|
|Save host tenant ID of Shared channel where tab is configured. You can get host tenant ID from channel.ownerTenantId for JSv2 or hostTenantId for JSv1 received under getContext call. | For any event payload or action payload received for a bot, use Get hostTenant ID, from turnContext.activity.conversation.tenantId|

Now, send saved host tenant ID inside tenantId parameter of getAuthToken call to allow cross-tenant users to access content hosted inside Sharepoint site attached to the Shared channel.

## Identify guest users (B2B guests) in private channels

You can identify if a member of private channel is guest user, invited to your tenant from external organization, using 'roles' property received for each [conversationMember](/graph/api/resources/conversationmember) object in [List members of a channel - Microsoft Graph v1.0 | Microsoft Learn](/graph/api/channel-list-members) response.  

For guests, “roles” = “guest”

## Microsoft Entra native identity

Apps must function cross-tenants in installation and usage. The following table lists the channel types and their corresponding group ids:

|Channel type| groupId | hostTeamGroupId |
|----------|---------|-----------------|
|Regular | Team Microsoft Entra group ID | Team Microsoft Entra group ID |
|Shared | Empty | Host Team Microsoft Entra group ID |

## Access sharepoint data in shared and private channels

If you're building an app using [SharePoint](/sharepoint/dev/spfx/integrate-with-teams-introduction) Framework, you need to use the SharePoint Online (SPO) site linked to the Shared channel—not the one linked to the host team group. Each private channel has its own SPO site that is only accessible to members of that specific Shared or private channel.

Use the Graph API to access the document library of the SharePoint Online (SPO) site linked to a Shared or private channel. Ensure you pass the Team ID and Channel ID received from the [Get Host Team Group ID & Channel ID](#get-host-team-group-id--channel-id) and pass in [Get filesFolder - Microsoft Graph v1.0 | Microsoft Learn](/graph/api/channel-get-filesfolder).

## Declare your app works in shared and private channels

After making all the preceding changes, you need to declare your app’s manifest to declare that your app works in Shared and private channels.

This declaration makes your app visible to users in Shared and private channels. Else, your app is not discoverable to users in those channels. This configuration update is a mandatory requirement.

supportsChannelFeatures are an optional property that enables your app in nonstandard channels along with standard channels.  

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
  - This API is the only API that returns everyone who can access the channel. Check the official documentation for more details.

- Don't assume the type of users (for example, guest, external, internal) in a channel’s roster.
   a. When using the GET/teams/{team-id}/channels/{channel-id}/allMembers API:
    - Check the "roles" property to identify if the user is a guest.
    - Check the "tenantId" property to determine if the user is:<br>*From the same tenant (intra-tenant), or<br>*From a different tenant (cross-tenant).
 - This API returns both direct and transitive members—ensuring a complete view of channel access.

- Do not assume that a channel’s storage location is the same as its parent team’s SharePoint site.
  - Instead, always use the Microsoft Graph API endpoint:
GET /teams/{team-id}/channels/{channel-id}/filesFolder
  - This API call returns the current and correct SharePoint document library location for the specified channel—especially important for shared and private channels, which have their own dedicated SharePoint sites.

## Apps in Federated group chats with external users

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

## Frequently asked questions

<details>
<summary>Why isn’t the app visible when trying to add it to a channel?</summary>
If an app isn’t visible when trying to add it to a channel, there are a few likely causes. The app manifest might be missing required support, such as "supportsChannelFeatures": tier1, which enables compatibility with channel features. Additionally, the installer might not have sufficient permissions, only team members or owners can add apps, and local policies must allow app installation. If the channel is an incoming shared channel (shared into a team), apps cannot be added directly from that location. In such cases, switch to the host team to add the app to the channel. You can detect whether a channel is shared-in by checking the channel metadata for the host team ID.

<br>
&nbsp;
</details>
<details>
<summary>Why am I getting a 403 error stating "app not enabled in this channel" when calling channel APIs?</summary>

A 403 error stating "app not enabled in this channel" typically occurs when the app is installed at the team level but is not added to the specific channel. To fix this issue, first confirm that the app is explicitly added to the channel. If your app uses resource-specific consent (RSC), verify that the permissions declared in the manifest match the API calls being made, for example, ChannelMember.Read.Group for reading channel membership. After adding the app, retry the operation. For bots, initiate channel-specific logic when the bot receives the channelMemberAdded event to confirm it has been successfully added to the channel.

<br>
&nbsp;
</details>
<details>
<summary>Why does the channel roster appear incomplete, showing only owners or missing users?</summary>

If the channel roster appears incomplete showing only owners or missing users, it might be due to using the team members API instead of the correct channel-specific API. To resolve this, use the /channels/{id}/allMembers API to retrieve the full channel roster. If the response still shows only owners, the app likely hasn’t been added to the channel. Prompt the user to add the app to the channel, then retry the request to fetch the updated roster.

<br>
&nbsp;
</details>
<details>
<summary>Why does file access fail for some users even though they are part of the channel?</summary>

This can happen if the app is using the team’s main SharePoint site instead of the specific site linked to the channel. It might also be due to the type of link being blocked by your organization’s sharing policies, or because external users don’t have the right permissions. To fix this, make sure your app uses the channel’s filesFolder property to get the correct driveId and itemId for file operations. When sharing files, use "people with existing access" links or the /invite API to give access to specific users or groups.

<br>
&nbsp;
</details>
<details>
<summary>Why are external users experiencing authentication issues in tabs or task modules?</summary>

Authentication issues in tabs or task modules for external users often occur when the app requests a token for the host tenant instead of the user’s home tenant. To resolve this, check whether the user is external by comparing context.user.tenant.id with the host or owner tenant ID. If they are different, the user is external, and your app should request the token for the user’s home tenant. You can do this by passing the correct tenant ID (tid) when calling getAuthToken.

<br>
&nbsp;
</details>
<details>
<summary>How do I know my app was added to a channel?</summary>

This issue might occur if the app is expecting a centralized list of installed apps at the channel level or relying on team-level installation behavior. Currently, there is no channel-level installedApps list available. Bots should instead listen for the channelMemberAdded event within the channel to detect when they have been added. If this event is not received, and a 403 error is returned during operations, the app should handle the error and prompt the user to add the bot to the channel.

<br>
&nbsp;
</details>
<details>
<summary>Why is my app failing to create message change notifications in shared or private channels?</summary>

Message change notifications might fail in shared or private channels because subscriptions to /channels/{id}/messages are blocked when using resource-specific consent (RSC) in these types of channels. If your app encounters a 403 error when attempting to create a subscription, this behavior is expected. To fix this, use on-demand message reads after the app has been successfully added to the channel.

<br>
&nbsp;
</details>
<details>
<summary>Why do file links still fail for external users even after the app has been added to the channel?</summary>

This can happen if the type of link being used is not allowed by the tenant’s sharing policy, or if the user hasn’t been granted access to the specific item, despite being a member of the channel. Another common cause is that the app might have generated links pointing to the team drive instead of the channel’s dedicated drive. To resolve this, reissue the links using the "people with existing access" option or use the /invite API to grant access to specific users. Also, make sure the links reference the channel drive, which can be identified using the filesFolder property, rather than the team site.

## See also

* [Build tabs for Teams](../../tabs/what-are-tabs.md)
* [App manifest schema for Teams](../../resources/schema/manifest-schema.md)
* [Shared channels in Microsoft Teams](/microsoftteams/shared-channels)
* [Channel resource type](/graph/api/resources/channel)
* [Retention policy for Teams locations](/microsoft-365/compliance/create-retention-policies)
* [Use guest access and external access to collaborate with people outside your organization](/microsoftteams/communicate-with-users-from-other-organizations)
* [Manage external meetings and chat with people and organizations using Microsoft identities](/microsoftteams/trusted-organizations-external-meetings-chat?tabs=organization-settings)
