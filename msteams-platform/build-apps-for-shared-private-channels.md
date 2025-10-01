---
title: Teams connect shared and private channels
author: surbhigupta
description: Learn about Teams Connect shared channels to securely collaborate with internal and external users in a shared space without switching tenants.
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: conceptual
ms.date: 04/09/2025
---
> [!NOTE]
>
> * Apps in shared and private channel is currently in developer preview [Public developer preview](resources/dev-preview/developer-preview-intro.md).

# Apps for shared and private channels

Shared and private channels in Microsoft Teams enable flexible collaboration within teams and across  organizations. You can experience multiple benefits:

* **Shared channels**: Allow seamless communication with internal or external members, without changing the user’s context. These channels ensure secure granular access control and real-time membership syncing.

* **Private channels**: Provide secure space for selected team members to collaborate on sensitive or confidential content, ensuring privacy and focused discussions within the team.

Bot and tab apps are supported in shared and private channels.

## Understand channels for app integration

When you're building or integrating apps with Microsoft Teams, understanding channel types is crucial, as different channels determine app visibility, user access, and data storage behavior:

| Channels | Access                          | Collaboration                                                                 | File storage location               |
|----------|----------------------------------|--------------------------------------------------------------------------------|-------------------------------------|
| Standard | All team members by default     | Ideal for team-wide collaboration where bots or tabs must be available to everyone | Team’s SharePoint site              |
| Private  | Only to selected team members   | Suitable for scenarios requiring restricted access to bots, connectors, or files     | Private channel’s SharePoint site   |
| Shared   | Cross-team and cross-organization | Enables interaction with users outside the host team without requiring them to join the team | Shared channel’s SharePoint site    |

### Capabilities across channels

Here’s an outline of the different channels and their capabilities, across various parameters:

| Model         | Channel capabilities                                             | Standard channel                          | Shared and private channels                          |
|---------------|------------------------------------------------------------------|-------------------------------------------|-------------------------------------------------------|
| **Membership**| Can add people to the channel without adding to the host team    | ❌                                        | ✔️ <br> (not supported for private channels)           |
|               | Channel membership can be limited to a subset of the host team   | ❌                                        | ✔️                                                  |
|               | Channel can be shared with other teams to inherit members        | ❌                                        | ✔️ <br> (not supported for private channels)           |
|               | Channel can be shared directly with its parent team              | N/A                                       | ✔️ <br> (not supported for private channels)           |
|               | External users can participate in the channel                    | ✔️ <br> (B2B collaboration users)           | ✔️                                                  |
|               | Channel is hosted under a host team                              | ✔️                                       | ✔️                                                  |
| **Storage**   | Each channel has a dedicated SharePoint site                     | ❌ <br> (inherits team site)                | ✔️                                                  |
| **App Model** | App must be installed in the host team                           | ✔️                                       | ✔️                                                  |
|               | App installed to host team automatically available in channel    | ✔️                                       | ❌                                                   |
|               | App must be added to each channel                                | ❌                                        | ✔️                                                  |

> [!IMPORTANT]
>
> Check your app’s capabilities such as membership boundaries, storage location, and external access. Don't make any code changes, based on channel type.

### Understand how different channels determine app functionality

Ensure that you understand that how different channels determine app functionality, membership, storage, or privacy, else can lead to broken functionality or unintended data exposure:

* **Use channel-specific membership APIs**

    Don't assume that team membership is equal to channel membership. Only members who are added to the channel can participate in shared and private channels. If your bot targets everyone, it might violate privacy or miss external members.

* **Distinguish between users and roles**

    Channel members might include in-tenant users, guests, or cross-tenant users (external users from other tenants). Your app must distinguish between these roles to manage access, data visibility, and feature availability. Validate user roles and tenant ids before granting permissions.

* **Don't assume a single SharePoint site tied to a team**

    Private and shared channels have their own SharePoint sites. Always use the correct URL for each channel, to avoid missing files or unauthorized access errors.

* **Keep data scoped to channels**

    Aggregate or cross-post data across channels only when necessary, to prevent accidental leaks. For example, analytics apps shouldn't include private channel data in team-wide reports unless permissions are clearly defined.

[Back to Top](#microsoft-teams-connect-shared-and-private-channels)

## Enable your app for shared and private channels

Enabling app support in shared and private channels is easy for most apps. If your apps don't depend on channel membership, channel-specific file storage, or deal with cross-channel data access scenarios, you can enable app support with a simple configuration change.

You can enable your app for shared and private channels, even if your apps don't support the following:  

* Use channel or team membership to determine message delivery, task assignment, or permissions
* Access or manage files stored in Teams or SharePoint
* Combine or share data across multiple channels or teams
* Customize experience, based on users (internal, guests, or external participants)

To enable app support in shared and private channels, perform the following steps:

1. Add `supportsChannelFeatures`: `tier1` to your app manifest, to enable support for shared and private channels.
2. To verify expected behavior, test your app in standard, private, and shared channels.

> [!NOTE]
>
> * Tab and bot apps in shared and private channels are available in [Government Community Cloud (GCC), GCC High, Department of Defense (DoD)](concepts/cloud-overview.md), and [Teams operated by 21Vianet](concepts/sovereign-cloud.md) environments.
> * SharePoint and the SharePoint pages apps aren't supported for shared channels in GCC, GCC High, DoD, and Teams operated by 21Vianet environments.

### Get context for shared and private channels

When loading the user experience in a shared or private channel, use the data received from the `getContext` call for shared or private channel changes. `getContext` call publishes two new properties, `hostTeamGroupID` and `hostTenantID`, which are used to retrieve channel membership using Microsoft Graph APIs. `hostTeam` is the team that creates the shared channel.

See more:

* [Get context in shared channels](tabs/how-to/access-teams-context.md)
* [Get context for your bot](bots/how-to/get-teams-context.md)
  
## Manage channel membership

Use the `allMembers` API that manages and monitors channel memberships across standard, shared, and private channels. It enhances accuracy by reflecting direct and indirect members correctly.

```HTTP
GET /teams/{team-id}/channels/{channel-id}/allMembers
```

### Identify members

* **Direct members:** Users who are added directly to the channel, including users from other tenants (cross-tenants).
* **Indirect members:** Users who are members of the team, with which the channel is shared, including teams in the same tenant or in a cross-tenant.
* **External members:** Guest users, who aren't part of your organization but are granted access to a shared channel through guest access or cross-tenant collaboration.

Additionally, you can identify whether a member of a shared channel is direct or indirect by checking the `@microsoft.graph.originalSourceMembershipUrl` annotation. This property identifies the source of a member’s access to a shared channel, as shown in the following table:

| Member Type | Annotation | Description                                                                                                                                                                                                 |
|-----------------|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Direct Member   | Yes                 | The user is added directly to the shared channel.                                                                                                                                                           |
| Indirect Member | Yes                 | The user accesses the shared channel through another team. The `@microsoft.graph.originalSourceMembershipUrl` property includes a URL that points to the source team and indicates indirect membership. |

> [!NOTE]
> You might receive duplicate notifications when a member is added to a shared channel. This scenario can happen if the member is already part of the shared channel directly or indirectly. Use the `List allMembers` API to view all the direct and indirect members. Ignore the notification if the member already exists; either directly or indirectly.

### Manage direct and indirect membership across channels

You can manage indirect membership in channels using the following Microsoft Graph APIs:

* Use  the `allMembers` API to retrieve all users who are members of a specific channel.

```HTTP
GET /teams/{team-id}/channels/{channel-id}/allMembers
```

* Use the `doesUserHaveAccess API` to determine whether the user is removed from the channel and can view all user accesses and relevant permissions.

```HTTP
GET /teams/{team-id}/channels/{channel-id}/doesUserHaveAccess(userId='@userid',tenantId='@TenantID',userPrincipalName='@UserPrincipalName')
```

* Use the`sharedWithTeams` API to list all teams a channel is shared with.

```HTTP
GET /teams/{team-id}/channels/{channel-id}/sharedWithTeams
```

* Use the `allowedMembers` API to retrieve users from a shared team who can access a shared channel.

```HTTP
GET /teams/{team-id}/channels/{channel-id}/sharedWithTeams/{sharewithteamsId}/allowedMembers
```

>[!NOTE]
>`allowedMembers` API returns only newly associated users and doesn't apply to unshared events.

[Back to Top](#microsoft-teams-connect-shared-and-private-channels)

## Get app notifications for direct and indirect membership changes

Apps installed in shared channels receive notifications when users are added to or removed from a team that shares the channel.
Depending on how you install your apps, go to the following section:

* [Installing apps using Microsoft Graph APIs](#installing-apps-using-microsoft-graph-apis)

### Installing apps using Microsoft Graph APIs

To receive app notifications, you must:

1. [Install the app](concepts/deploy-and-publish/apps-upload.md) in a host team and enable it for the shared channel.
2. Create a valid Microsoft Graph change notification subscription to monitor associated team membership changes and shared or unshared events using supported APIs.

To receive both direct and indirect member update notifications, you must include both the query string parameters when creating a subscription. If the query strings aren't provided, the subscription only delivers notifications for direct member updates. To learn more, see [Channel membership access](/graph/teams-changenotifications-channelmembership.md).

```HTTP
/teams/{team-id}/channels/getAllMembers?notifyOnIndirectMembershipUpdate=true&suppressNotificationWhenSharedUnsharedWithTeam=true`
```

This subscription enables apps to monitor membership changes in shared channels and its associated teams. For more information on how to create a Microsoft Graph change notification subscription, see [Create a subscription.](/graph/teams-changenotifications-teammembership)

### Installing apps using BOT APIs

Microsoft Teams supports bot notifications for both direct and indirect members. 
This enhancement expands its Bot Framework SDK to support notifications for indirect members in shared channels. This update improves visibility into membership changes across teams, enabling bots to more effectively track user access in collaborative environments. It builds on the existing capability for bots to subscribe to `conversationUpdate` events in channels.

### Manage member added and removed events

A member added event is sent to your bot in the following scenarios:

1. When the bot, itself, is installed and added to a conversation
2. When a user is added to a conversation where the bot is installed

For more information, see [Conversation events - Teams | Microsoft Learn]()

To receive `conversationUpdate` event notifications when indirect members are added or removed, configure your bot with the following prerequisites:

1. Update the App manifest

    To declare support for shared channels, add the `supportedChannelTypes` property to your app manifest:

```JSON
    "supportedChannelTypes": [
        "sharedChannels",
    ]
```
2. Request Resource-Specific Consent (RSC) permission 

    Your app must request the following RSC permission to access channel membership information:

```json
{
  "authorization": {
    "permissions": {
      "resourceSpecific": [
        {
          "name": "ChannelMember.Read.Group",
          "type": "Application"
        }
      ]
    }
  }
}
```

3. Ensure the bot is enabled in the shared channel

    To receive member event notifications, install the bot at the team level and manually allow it in the shared channel.


    This process ensures the bot is active and authorized to receive notifications for both direct and indirect members.

When a new member is added to a shared channel, the ```OnMembersAddedAsync``` method is called. This method provides the context and details of the user who was added, allowing the bot to respond accordingly.

The following Bot Framework SDK examples apply to both direct and indirect member add and remove events.
Member added event

```csharp
public async Task OnMembersAddedAsync(ITurnContext turnContext, AppState turnState, CancellationToken cancellationToken)
{
    var membersAdded = turnContext.Activity.MembersAdded;

    List<string> addedMembers = new List<string>();
    foreach (var member in membersAdded)
    {
        if (member.Id != turnContext.Activity.Recipient.Id)
        {
            addedMembers.Add($"Member {member.Name} (ID {member.Id}) added.");
        }
    }

    await ActivityUtils.SendAdaptiveCard(
        "Member Added",
        addedMembers,
        new List<object> { "membersAdded", membersAdded },
        turnContext,
        cancellationToken).ConfigureAwait(false);
```

Member removed event

```csharp
public async Task OnMembersRemovedAsync(ITurnContext turnContext, AppState turnState, CancellationToken cancellationToken)
{
    var membersRemoved = turnContext.Activity.MembersRemoved;

    List<string> removedMembers = new List<string>();
    foreach (var member in membersRemoved)
    {
        if (member.Id != turnContext.Activity.Recipient.Id)
        {
            removedMembers.Add($"Member {member.Name} (ID {member.Id}) removed.");
        }
    }

    await ActivityUtils.SendAdaptiveCard(
        "Member Removed",
        removedMembers,
        new List<object> { "membersRemoved", membersRemoved },
        turnContext,
        cancellationToken).ConfigureAwait(false);
}
```

---

### Shared and unshared with team events

When a shared channel is added to another team, the Bot Framework might receive a `conversationUpdate` activity through the `OnConversationUpdateActivityAsync` method, but only if the bot is installed in the team or channel.

```csharp
        protected override async Task OnConversationUpdateActivityAsync(
            ITurnContext<IConversationUpdateActivity> turnContext,
            CancellationToken cancellationToken)
        {
            var tcd = turnContext.Activity.GetChannelData<TeamsChannelData>();
            var eventType = tcd?.EventType?.ToLowerInvariant();

            var extended = turnContext.Activity.GetChannelData<SharedChannelChannelData>();

            var raw = turnContext.Activity.ChannelData as JObject
                      ?? (turnContext.Activity.ChannelData != null
                          ? JObject.FromObject(turnContext.Activity.ChannelData)
                          : new JObject());

            _logger.LogInformation("ConversationUpdate eventType={EventType}, channelId={ChannelId}, teamId={TeamId}",
                eventType, tcd?.Channel?.Id, tcd?.Team?.Id);

            switch (eventType)
            {
                case "channelshared":
                {
                    var hostTeam = extended?.Team; 
                    var sharedWith = extended?.SharedWithTeams ?? new List<TeamInfoEx>();

                    _logger.LogInformation("ChannelShared: hostTeam={HostTeamId}, sharedWithCount={Count}",
                        hostTeam?.Id, sharedWith.Count);

                    foreach (var team in sharedWith)
                    {
                        _logger.LogInformation("SharedWithTeam: id={Id}, name={Name}, aadGroupId={AadGroupId}, tenantId={TenantId}",
                            team.Id, team.Name, team.AadGroupId, team.TenantId);
                    }

                    await turnContext.SendActivityAsync(
                        MessageFactory.Text($" Channel shared with {sharedWith.Count} team(s)."),
                        cancellationToken);
                    break;
                }

                case "channelunshared":
                {
                    var unsharedFrom = extended?.UnsharedFromTeams ?? new List<TeamInfoEx>();

                    _logger.LogInformation("ChannelUnshared: unsharedFromCount={Count}", unsharedFrom.Count);

                    foreach (var team in unsharedFrom)
                    {
                        _logger.LogInformation("UnsharedFromTeam: id={Id}, name={Name}, aadGroupId={AadGroupId}, tenantId={TenantId}",
                            team.Id, team.Name, team.AadGroupId, team.TenantId);
                    }

                    await turnContext.SendActivityAsync(
                        MessageFactory.Text($" Channel unshared from {unsharedFrom.Count} team(s)."),
                        cancellationToken);
                    break;
                }

                default:
                    break;
            }

            await base.OnConversationUpdateActivityAsync(turnContext, cancellationToken);
        }
```

## Validate user access for membership updates

When an app receives a 'member removed' notification for an indirect membership update, it’s important to verify whether the user is removed from the shared channel, especially since the same user might have both direct and indirect membership. For example, if a user is removed from a team that shares a channel, your app should confirm whether the user's access to the shared channel is revoked. Use the `doesUserHaveAccess` API to determine whether the user is removed from the shared channel. See [doesUserHaveAccess API](/graph/api/channel-doesuserhaveaccess?view=graph-rest-beta&tabs=http) API to learn more about user accesses and relevant permissions.

```HTTP
GET /teams/{team-id}/channels/{channel-id}/doesUserHaveAccess(userId='@userid',tenantId='@TenantID',userPrincipalName='@UserPrincipalName')
```

When an app receives a 'member added' notification for an indirect membership update, see `allMembers API` to refresh the list of all members.

```HTTP
GET /teams/{team-id}/channels/{channel-id}/allMembers
```

### Handle bulk membership changes

If there are bulk membership changes, Teams curbs individual membership update notifications when a channel is shared or unshared with a team. This feature reduces notification volume and improves performance.

### Use `sharedWithTeams` subscription for bulk membership changes

To reduce notification overload during membership updates, such as when a shared channel is added to or removed from a team with thousands of members, use the new `sharedWithTeams` subscription resource:

```HTTP
/teams/{team-id}/channels/{channel-id}/sharedWithTeams
```

The `sharedWithTeams` subscription sends a single notification when a channel is shared or unshared with a team. It avoids thousands of per-user notifications and improves performance for apps that monitor membership changes. Ensure that you update the shared channel member list using the allMembers API after receiving a 'shared with' or 'unshared from' team notification.

[Back to Top](#microsoft-teams-connect-shared-and-private-channels)

## Classify channels as in-tenant or out-tenant

You can classify members as in-tenant or out-tenant by comparing the 'TenantId' of the member or team with `ownerTenantId` as follows:

1. Get the 'TenantId' of the member you wish to compare.

```HTTP
GET /teams/{host-team-group-id}/channels/{channel-id}/allMembers
```

2. Call `microsoftTeams.app.getContext()` in your tab from the Teams JavaScript client library (TeamsJS SDK). The getContext() call returns context of the shared channel, which contains the details such as displayName, membershipType, ownerGroupId, and ownerTenantId.

3. Compare the TenantId of the member to the ownerTenantId property and determine if the member is an in-tenant or out-tenant.

## Understand app permissions in shared channels

You can collaborate with external members outside of your organization using shared channels. App permissions in shared channels follow the host team's app roster and host tenant's app policy.

> [!NOTE]
> The [activity feed notification API](/graph/teams-send-activityfeednotifications) doesn't support cross-tenant notifications for apps in a shared channel.

## Verify app addition to a channel

When your bot receives a `channelMemberAdded` event for itself in a `conversationUpdate`, your app is added to the channel. There’s no dedicated API to check if your app is part of a channel. Bots can detect when your app is added to a channel indirectly.

Use this `channelMemberAdded` event to trigger app-specific logic such as:

* Sending a welcome message
* Fetching the channel roster
* Configuring tabs
* Starting scheduled jobs

## Authenticate external users to access app content in SharePoint

You need to complete this step when your app stores content in the SharePoint site of the tenant that hosts the channel and requests a SharePoint token.

### [Tabs](#tab/tabs)

1. Save host tenant ID of shared channel where tab is configured.
2. Retrieve the host tenant ID using `channel.ownerTenantId` in JSv2 or from the `getContext` call in JSv1.

### [Bots](#tab/bots1)

To retrieve the host tenant ID for any event or action payload received by a bot, use `turnContext.activity.conversation.tenantId`.

---

Now, send saved host tenantId inside tenantId parameter of getAuthToken call to allow cross-tenant users to access content hosted inside SharePoint site attached to the shared channel.

## Identify guest users in channels

You can identify if a member of a channel is a guest user, invited to your tenant from external organization, using `roles` property received for each object in [List members of a channel](/graph/api/channel-list-members) response.

For guests, 'roles' = 'guest'

To accurately, retrieve the all guest users in a channel use the following `allMembers` API:

```HTTP
GET /teams/{team-id}/channels/{channel-id}/allMembers
```

This API works across standard and other channels and is recommended for reliably identifying guest members.

## Access SharePoint data in shared and private channels

If you're building an app using [SharePoint](/sharepoint/dev/spfx/integrate-with-teams-introduction) Framework, you need to use the SharePoint Online (SPO) site linked to the shared channel, not the one linked to the host team group. Each private channel has its own SPO site that is only accessible to members of that specific shared or private channel.

Use the Graph API to access the document library of the SPO site linked to a shared or private channel. Ensure you pass the Team ID and Channel ID received from the [Get Host Team Group ID & Channel ID](#get-host-team-group-id--channel-id) and pass in [Get filesFolder](/graph/api/channel-get-filesfolder).

[Back to Top](#microsoft-teams-connect-shared-and-private-channels)

### Access SharePoint storage correctly for channel files

To access a channel’s SharePoint files root, use the following API:

```HTTP
GET /teams/{teamId}/channels/{channelId}/filesFolder
```

This API returns a DriveItem object for that channel's files root. For more, see [channel files](/graph/api/channel-get-filesfolder?view=graph-rest-1.0&tabs=http)

Use the following properties for all subsequent file operations:

* `parentReference.driveId`: The SharePoint driveId for the channel’s site.
* `itemId`: The folderId for the channel’s root.

Following is the expected drive behavior of the channels:

* Standard channels use the team site’s driveId.
* Other channels use a separate driveId for their individual sites.

> [!NOTE]
>
> Always store and reuse the `driveId` and `itemId` returned by the API.
> Don't hardcode library names or URLs based on assumptions about the team site, as the team site location can change.
> Use this `GET /teams/{teamId}/channels/{channelId}/filesFolder` API for all channel types.

### Manage file access for external or guest users

#### [External users](#tab/external-users)

External users remain in their tenant while accessing the host channel’s sharepoint site. To enable access:

1. Configure cross-tenant access on both sides.
2. Ensure your app is multitenant and receives consent in the host tenant.

#### [Guest users](#tab/guest-users)

The channel’s SharePoint site automatically grants access to all channel members, including tenants.

Esnure the following:

* Avoid using organization-wide sharing links they typically exclude external users.
* Use specific-people sharing, or rely on membership-based permissions.
* Check tenant or site policies, as they might block anonymous or organization-wide links.

To grant access to specific users or groups, use the following API:

```HTTP
POST /drives/{driveId}/items/{itemId}/invite
```

---

### Authenticate external users in tabs or task modules

When your tab or task module needs to access sharepoint resources in the channel’s home tenant, perform the following steps:

1. Detect external users
Use getContext() to retrieve channel context. Compare `user.tenant.id` with `channel.ownerTenantId or channel.hostTenantId`. If they differ, the user is external.

2. Request token from home tenant
Call getAuthToken() with the external user's tenant ID (`user.tenant.id` or `tid`) to ensure the token is issued from their home tenant.

[Back to Top](#microsoft-teams-connect-shared-and-private-channels)

## Test your app across channels

Before publishing updates, ensure your app works correctly across all channel types in real situations.

### Standard channel

Confirm that the existing functionality remains intact after your changes. Ensure tabs, bots, and messaging extensions continue to work as expected.

### Shared channel
  
### [Shared channel (same tenant)](#tab/sharedchannel)

Create shared channel in Team A, then share it with Team B (requires owner permissions).

Perform the following steps to validate:

1. Add the app to Team A (host team), then to Channel X.
2. Validate that the members from Team B:
Can see the tab and receive bot responses.
1. Unshare the channel from Team B and confirm:
   * Your bot receives a `channelUnshared` event
   * Membership updates are handled correctly

### [Shared channel (external tenant)](#tab/sharedchannel-externaltenant)

Use two tenants or collaborate with a colleague from another organization via Teams Connect.

Perform the following steps to validate:

1. Have an external user send a message to your bot and confirm that it responds. The bot must receive the message, provided added to the appropriate scope (personal chat, group chat, or channel).
1. Have the external user trigger a task module or tab interaction and verify that the authentication succeeds.
   * If using Single Sign-On authentication (SSO), ensure `getAuthToken` handles the user's home tenant ID correctly.
2. Attempt to send a direct message from your bot to the external user:
   * This functionality fails if the user is outside your tenant
   * Confirm that in-channel communication still works.

### Private channel

Create a private channel in Team A with atleast two members (owner and member).

Perform the following steps to validate:

1. Add the app to Team A then add it to private channel.
2. Verify that your tab loads correctly in the private channel.
3. Test bot responses for different user types:
   * In-tenant member
   * Guest user or external user
4. If your app lists members or assigns tasks, confirm it only uses channel members and not the complete team.
5. Add a new member to the private channel and check:
   * Whether your app receives a membership change event.
   * Whether your membership API reflects the new member.
  
---
  
Testings across these scenarios help you spot any issues with functionality, permissions, and user experience.
  
## Best practices for supporting all channels

### Dos

* **Always retrieve the current channel’s member list and roles** before performing actions. For example, when sending notifications or assigning tasks, target only the actual channel members and not the entire team.
* **Adjust app functionality and access controls** based on user roles (owner, member, guest, external).
* **Control data access and sharing** based on channel membership and permissions. For more information, see [Manage channel membership](#manage-channel-membership).
* **Determine** whether users are internal, guests, or external (cross-tenant), and authenticate them in their home tenant. Always validate permissions for cross-tenant scenarios, especially when accessing files. For more information, see [Identify guest users in channels](#identify-guest-users-in-channels)
* **Update help text and user guides** to explain how your app behaves in different channel types, including any limitations for guests or external users.
* **Use cache large member lists and change notifications** to update them, rather than relying on frequent API calls. For example, refresh your cache only when a membership change event occurs.
* **Validate your app's behavior** across all channel types and user roles. Test with owners, members, guests, and external users to ensure correct permissions and consistent functionality.
* **Review Microsoft Teams documentation and changelogs** to stay aligned with the latest updates to APIs, permissions, and channel configurations.

### Don'ts

* **Restrict sensitive actions** to owners or internal users and offer limited features to guests or external participants.
* **Never include private-channel data** in broader reports or public channels unless explicitly authorized.

## Frequently asked questions

<br>
<br>
<details>
<summary>Why isn’t the app visible when trying to add it to a channel?</summary>

The app might not appear if the manifest is missing required support, such as `supportsChannelFeatures: tier1`. Additionally, the installer might not have sufficient permissions, only team members or owners can add apps, and local policies must allow app installation. If the channel is an incoming shared channel (shared into a team), apps can't be added directly from that location. In such cases, switch to the host team to add the app to the channel. You can detect whether a channel is shared-in by checking the channel metadata for the host team ID.

</details>
<br>
<details>
<summary>Why am I getting a 403 error stating 'app not enabled in this channel' when calling channel APIs?</summary>

This error occurs if the app is installed at the team level but hasn’t been added to the channel. To resolve this issue, confirm that the app is added to the channel. If your app uses resource-specific consent (RSC), verify that the permissions declared in the manifest match the API calls being made, for example, `ChannelMember.Read.Group` for reading channel membership. After adding the app, retry the operation. For bots, initiate channel-specific logic when the bot receives the `channelMemberAdded` event to verify successfully addition to the channel.

</details>
<br>
<details>
<summary>Why does the channel roster appear incomplete, showing only owners or missing users?</summary>

The channel roster appears incomplete because the team members API is used instead of the correct channel-specific API. To resolve this issue, use the `/channels/{id}/allMembers` API to retrieve the full channel roster. If the response still shows only owners, the app likely isn't added to the channel. Prompt the user to add the app to the channel, then retry the request to fetch the updated roster.

</details>
<br>
<details>
<summary>Why does file access fail for some users even though they're part of the channel?</summary>

This failure can happen if the app is using the team’s main SharePoint site instead of the channel's specific site. Your organization’s sharing policies might block the type of link, or external users might lack the necessary permissions. To resolve this issue, make sure your app uses the channel’s filesFolder property to get the correct driveId and itemId for file operations. When you're sharing files, use **people with existing access** links or the invite API to give access to specific users or groups.

</details>
<br>
<details>
<summary>Why are external users experiencing authentication issues in tabs or task modules?</summary>

Authentication issues often occur when the app requests a token for the host tenant instead of the user’s home tenant. To resolve this issue, check whether the user is external by comparing `context.user.tenant.id` with the host or owner tenant ID. If they're different, the user is external, and your app must request the token for the user’s home tenant. You can do this step by passing the correct tenant ID (tid) when calling `getAuthToken`.

</details>
<br>
<details>
<summary>How do I know my app was added to a channel?</summary>

This issue might occur if the app is expects a centralized list of installed apps at the channel level or relies on team-level installation behavior. Currently, there's no channel-level installedApps list available. Instead, bots must listen for the `channelMemberAdded` event within the channel to detect when they're added. When the app gets a 403 error and misses the event, it asks the user to add the bot to the channel and manages the error.

</details>
<br>
<details>
<summary>Why is my app failing to create message change notifications in shared or private channels?</summary>

Message change notifications might fail in shared or private channels because subscriptions to `/channels/{id}/messages` are blocked when using resource-specific consent (RSC) in these types of channels. If your app receives a 403 error when attempting to create a subscription, this behavior is expected. To resolve this issue, use on-demand message reads after the app is successfully added to the channel.

</details>
<br>
<details>
<summary>Why do file links still fail for external users even after the app is added to the channel?</summary>

This failure happens when the tenant’s sharing policy blocks the link type, or when the user doesn’t have access to the item, even if they’re a member of the channel. Another common cause is that the app might generate links pointing to the team drive instead of the channel’s dedicated drive. To resolve this issue, reissue the links using the 'people with existing access' option or use the invite API to grant access to specific users. Also, ensure the links reference the channel drive, which can be identified using the filesFolder property, rather than the team site.

</details>

[Back to Top](#microsoft-teams-connect-shared-and-private-channels)

## Code sample

| Sample Name                   | Description                                                                                                                                                                                                 | .NET | Node.js | Python |
|------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------|---------|--------|
| Teams Conversation Bot       | This sample app displays the names of the members in a federated group chat with external users.                                                                                                           | NA   | View    | NA     |
| Membership Change Notification | The sample application demonstrates how to send notifications for shared channel events in Microsoft Teams. Scenarios include users being added, removed, or membership being updated and when channel is shared or unshared with a team. | View | View    | View   |

## See also

* [Manage channel membership](#manage-channel-membership)
* [Understand app permissions in shared channels](#understand-app-permissions-in-shared-channels)
* [Build tabs for Teams](../../tabs/what-are-tabs.md)
* [App manifest schema for Teams](../../resources/schema/manifest-schema.md)
* [Shared channels in Microsoft Teams](/microsoftteams/shared-channels)
* [Channel resource type](/graph/api/resources/channel)
* [Retention policy for Teams locations](/microsoft-365/compliance/create-retention-policies)
* [Use guest access and external access to collaborate with people outside your organization](/microsoftteams/communicate-with-users-from-other-organizations)
* [Manage external meetings and chat with people and organizations using Microsoft identities](/microsoftteams/trusted-organizations-external-meetings-chat?tabs=organization-settings)
