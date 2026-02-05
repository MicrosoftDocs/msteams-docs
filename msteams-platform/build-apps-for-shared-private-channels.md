---
title: Teams connects shared and private channels
author: vikasalmal
description: Learn about apps for shared and private channels to securely collaborate with internal and external users in a shared space.
ms.author: vikasalmal
ms.localizationpriority: high
ms.topic: conceptual
ms.date: 01/20/2026
---

# Apps for shared and private channels

> [!NOTE]
>
> * Support for apps in **Shared channels** is now generally available.  
> * Support for apps in **Private channels** is available in [public developer preview](resources/dev-preview/developer-preview-intro.md).

Shared and private channels in Microsoft Teams enable flexible collaboration within teams and across organizations. Currently, bot and tab apps are supported in shared and private channels. By using this update, you can experience multiple benefits:

* **Shared channels**: Allow seamless communication with internal or external members, without changing the user’s context. These channels ensure secure granular access control and real-time membership syncing.

* **Private channels**: Provide secure space for selected team members to collaborate on sensitive or confidential content, ensuring privacy and focused discussions within the team.

## Understand channels for app integration

 Different channels determine app visibility, user access, and data storage behavior:

| Channels | Access                          | Collaboration                                                                 | File storage location               |
|----------|----------------------------------|--------------------------------------------------------------------------------|-------------------------------------|
| Standard | All team members by default     | Ideal for team-wide collaboration where bots or tabs must be available to everyone | Team’s SharePoint site              |
| Private  | Only to selected team members   | Suitable for scenarios requiring restricted access to bots, connectors, or files     | Private channel’s SharePoint site   |
| Shared   | Cross-team and cross-organization | Enables interaction with users outside the host team without requiring them to join the team | Shared channel’s SharePoint site    |

### Capabilities across channels

Here's an outline of the different channels and their capabilities across various parameters:

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
> * Avoid relying on channel type values for app logic.
> * Teams channel experiences continue to evolve. To ensure your app remains compatible over time, don't build logic that depends on specific `membershipType` or `channelType` values returned by Microsoft Graph, Agents SDK, or Teams SDK. Instead, rely on the capability‑based APIs and events provided by the platform to determine how your app should behave within a channel.

> [!NOTE]
>
> * Check your app’s capabilities such as membership boundaries, storage location, and external access before enabling support for Shared and Private channels.
> * Message extension–only apps that operate exclusively in personal scope do not require updates to be available for users in Shared and Private channels.

### Understand how different channels determine app functionality

Ensure that you understand how different channels determine app functionality, membership, storage, or privacy. Otherwise, you might encounter broken functionality or unintended data exposure:

* **Use channel-specific membership APIs**

    Don't assume that team membership is equal to channel membership. Only members you add to the channel can participate in shared and private channels.

* **Distinguish between users and roles**

    Channel members might include in-tenant users, guests, or cross-tenant users (external users from other tenants). If your app needs to distinguish between various users to manage access, data visibility, and feature availability, then you must validate user roles and tenant IDs before granting permissions.

* **Don't assume a single SharePoint site tied to a team**

    Unlike standard channels, which share a SharePoint site with the team, private and shared channels have their own SharePoint sites. Always use the correct URL for each channel, to avoid missing files or unauthorized access errors.

* **Keep data scoped to channels**

    Aggregate or cross-post data across channels only when necessary, to prevent accidental leaks. For example, analytics apps shouldn't include private channel data in team-wide reports unless permissions are clearly defined.

[Back to Top](#apps-for-shared-and-private-channels)

## Enable apps for shared and private channels

Most apps can support shared and private channels with a simple manifest update. Based on either of the following scenarios, decide the approach:

* [Apps with no dependence on specified parameters](#apps-with-no-dependence-on-specified-parameters)
* [Apps with dependence on specified parameters](#apps-with-dependence-on-specified-parameters)

### Apps with no dependence on specified parameters

If your app doesn’t:

* Use channel or team membership to determine message delivery, task assignment, or permissions
* Access or manage files stored in Teams or SharePoint
* Combine or share data across multiple channels or teams
* Customize experience, based on users (internal, guests, or external members)

Then, you only need to:

1. Add `supportsChannelFeatures`: `tier1` to your app manifest
2. Verify expected behavior, and test your app across channels

There's no dependence on classical and admin access for `supportsChannelFeatures`: `tier1`.

### Apps with dependence on specified parameters

If your app handles advanced scenarios, or depends on the specified parameters listed in the [Apps with no dependence on specified parameters](#apps-with-no-dependence-on-specified-parameters) section, then read through this guide for targeted updates and the best practices. Don't rewrite your code.

### Get context for shared and private channels

When loading the user experience in a shared or private channel, use the data received from the `getContext` call for shared or private channels. The `getContext` call publishes two new properties, `hostTeamGroupID` and `hostTenantID`, which are used to retrieve channel membership using Microsoft Graph APIs. Every channel is created within a host team. For more information, see [Get context in shared channels](tabs/how-to/access-teams-context.md#get-context-in-shared-channels) and [Get context for your tab for private channels](tabs/how-to/access-teams-context.md#retrieve-context-in-private-channels).
  
### Manage channel membership

Use the `allMembers` API to manage and monitor channel memberships across standard, shared, and private channels. It enhances accuracy by correctly reflecting direct and indirect members. For more information, see [List allMembers](/graph/api/channel-list-allmembers?view=graph-rest-1.0&tabs=http&preserve-view=true).

```HTTP
GET /teams/{team-id}/channels/{channel-id}/allMembers
```

### Identify members

* **Direct members:** Users who are added directly to the channel, including users from other tenants (cross-tenants).
* **Indirect members:** Users who are members of the team, with which the channel is shared, including teams in the same tenant or in a cross-tenant.

You can identify whether a member of a shared or private channel is direct or indirect by checking the `@microsoft.graph.originalSourceMembershipUrl` annotation. This property identifies the source of a member’s access to the channels:

|Member Type  |Annotation scope |
|---------|---------|
|Direct member    |  The `@microsoft.graph.originalSourceMembershipUrl` property shows that the user is directly added to the channels       |
|Indirect member    |The `@microsoft.graph.originalSourceMembershipUrl` property includes a URL that points to the source team and indicates indirect membership.  |

  > [!NOTE]
  > You might receive duplicate notifications when a member is added to a shared channel. This scenario can happen if the member is already part of the shared channel directly or indirectly. Use the `allMembers` API to view all the direct and indirect members. Ignore the notification if the member already exists, either directly or indirectly.

### Manage indirect membership across channels

You can manage indirect membership in channels by using the following Microsoft Graph APIs:

* Use the `allMembers` API to get all users who are members of a specific channel.

    ```HTTP
    GET /teams/{team-id}/channels/{channel-id}/allMembers
    ```

* Use the `doesUserHaveAccess` API to check if the user is removed from the channel and can view all user accesses and relevant permissions. Apps with classic application permissions and RSC permissions can use this API.

    ```HTTP
    GET /teams/{team-id}/channels/{channel-id}/doesUserHaveAccess(userId='@userid',tenantId='@TenantID',userPrincipalName='@UserPrincipalName')
    ```

* Use the `sharedWithTeams` API to list all teams a channel is shared with.

    ```HTTP
    GET /teams/{team-id}/channels/{channel-id}/sharedWithTeams
    ```

* Use the `allowedMembers` API to get users from a shared team who can access a shared channel.

    ```HTTP
    GET /teams/{team-id}/channels/{channel-id}/sharedWithTeams/{sharewithteamsId}/allowedMembers
    ```

    >[!NOTE]
    >The `allowedMembers` API returns only newly associated users and doesn't apply to unshared events.

[Back to Top](#apps-for-shared-and-private-channels)

## Get app notifications for Microsoft Graph membership changes

Apps installed in shared and private channels receive notifications when users are added to or removed from a team that shares the channel.

To receive app notifications, you must:

1. Install the app in a host team and enable it for the shared or private channel. For more information on installing the app, see [Install the app](concepts/deploy-and-publish/apps-upload.md).
2. Create a valid Microsoft Graph change notification subscription to monitor associated team membership changes and shared or unshared events using supported APIs.

To receive both direct and indirect member update notifications, you must include both the query string parameters when creating a subscription. If you don't provide the query strings, the subscription only delivers notifications for direct member updates. For more information, see [Channel membership access](/graph/teams-changenotifications-channelmembership).

```HTTP
/teams/{team-id}/channels/getAllMembers?notifyOnIndirectMembershipUpdate=true&suppressNotificationWhenSharedUnsharedWithTeam=true
```

By using this subscription, apps can monitor membership changes in channels and their associated teams. For more information on how to create a Microsoft Graph change notification subscription, see [Create a subscription.](/graph/teams-changenotifications-teammembership)

## Get app notifications for bot membership changes

Your bot receives the `conversationUpdate` event when it gets notifications about membership updates for teams where it's added. To get both direct and indirect member update notifications, set up your bot with the following prerequisites:

1. Update the app manifest to v1.25. Add `supportsChannelFeatures`: `tier1` to declare app readiness.

1. Request Resource-Specific Consent (RSC) permission

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

1. Add the bot in the shared channel

    To get member event notifications, install the bot at the Teams level and manually allow it in the shared channel.

    This process ensures the bot is active and authorized to receive notifications for both direct and indirect members.

### Manage member added and removed events

A member added event is sent to your bot in the following scenarios:

1. When you install the bot and add it to a conversation.
1. When you add a user to a conversation where the bot is installed.

Your bot receives a member removed event in the following scenarios:

1. When you uninstall the bot and remove it from a conversation.
1. When you remove a user from a conversation where the bot is installed.

For more information, see [Conversation events](/graph/teams-changenotifications-teammembership).

If you install the bot in the team or channel, the Agents SDK receives a `conversationUpdate` activity through the `OnConversationUpdateActivityAsync` method when you add a shared channel to another team.

When you add a new member to a shared channel, the ```OnMembersAddedAsync``` method is called. This method provides the context and details of the user who was added, so the bot can respond accordingly.

The following Agents SDK examples apply to both direct and indirect member add and remove events.

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

## Handle bulk membership changes for graph

If there are bulk membership changes, Teams curbs individual membership update notifications when a channel is shared or unshared with a team. To reduce notification overload during membership updates, such as when a shared channel is added to or removed from a team with thousands of members, use the `sharedWithTeams` subscription resource:

```HTTP
/teams/{team-id}/channels/{channel-id}/sharedWithTeams
```

The `sharedWithTeams` subscription sends a single notification when a channel is shared or unshared with a team. It avoids thousands of per-user notifications and improves performance for apps that monitor membership changes. Ensure that you update the shared channel member list by using the [allMembers](/graph/api/channel-list-allmembers?view=graph-rest-1.0&tabs=http&preserve-view=true) API after receiving a *shared with* or *unshared from* team notification.

## Validate user access for graph membership updates

When an app receives a *member removed* notification for an indirect membership update, it’s important to verify whether the user is removed from the channel, especially since the same user might have both direct and indirect membership. For example, if a user is removed from a team that shares a channel, your app must confirm whether the user's access to the shared channel is revoked. Use the `doesUserHaveAccess` API to determine whether the user is removed from the shared channel. See [doesUserHaveAccess](/graph/api/channel-doesuserhaveaccess?view=graph-rest-beta&tabs=http&preserve-view=true ) API to learn more about user accesses and relevant permissions.

```HTTP
GET /teams/{team-id}/channels/{channel-id}/doesUserHaveAccess(userId='@userid',tenantId='@TenantID',userPrincipalName='@UserPrincipalName')
```

When an app receives a *member added* notification for an indirect membership update, see the [allMembers](/graph/api/channel-list-allmembers?view=graph-rest-1.0&tabs=http&preserve-view=true ) API to refresh the list of all members.

```HTTP
GET /teams/{team-id}/channels/{channel-id}/allMembers
```

### Classify members as in-tenant or out-tenant

You can classify members as in-tenant or out-tenant by comparing the `TenantId` of the member or team with `ownerTenantId` as follows:

1. Get the `TenantId` of the member you want to compare.

    ```HTTP
    GET /teams/{host-team-group-id}/channels/{channel-id}/allMembers
    ```

1. Call `microsoftTeams.app.getContext()` in your tab from the Teams JavaScript client library. The getContext() call returns context of the shared channel, which contains the details such as `displayName`, `membershipType`, `ownerGroupId`, and `ownerTenantId`.

1. Compare the `TenantId` of the member to the `ownerTenantId` property and determine if the member is an in-tenant or out-tenant.

[Back to Top](#apps-for-shared-and-private-channels)

## Understand app permissions in shared channels

You can collaborate with external members outside of your organization by using shared channels. App permissions in shared channels follow the host team's app roster and host tenant's app policy.

> [!NOTE]
> The [activity feed notification API](/graph/teams-send-activityfeednotifications) doesn't support cross-tenant notifications for apps in a shared channel.

## Verify bot installation in a channel

When a shared channel is added to another team, the Agents SDK receives a `conversationUpdate` activity through the `OnConversationUpdateActivityAsync` method, only if the bot is installed in the team. There’s no dedicated API to check if your app is part of a channel. Bots can detect when your app is added to a channel indirectly.

Use this `channelMemberAdded` event to trigger app-specific logic such as:

* Sending a welcome message
* Fetching the channel roster
* Configuring tabs
* Starting scheduled jobs

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

## Authenticate external users to access app content in SharePoint

Complete this step when your app stores content in the SharePoint site of the tenant that hosts the channel and requests a SharePoint token.

### [Tabs](#tab/tabs)

1. Save host tenant ID of shared channel where tab is configured.
1. Retrieve the host tenant ID by using `channel.ownerTenantId` in JSv2 or from the `getContext` call in JSv1.

### [Bots](#tab/bots1)

To retrieve the host tenant ID for any event or action payload received by a bot, use `turnContext.activity.conversation.tenantId`.

---

Now, send saved host `tenantId` inside `tenantId` parameter of `getAuthToken` call to allow cross-tenant users to access content hosted inside SharePoint site attached to the shared channel.

## Identify guest users in channels using Graph API

You can identify if a member of a channel is a guest user, invited to your tenant from external organization, by using the `roles` property for each object in the [List members of a channel](/graph/api/channel-list-members) response.

For guests, `roles` = `guest`.

To accurately retrieve all guest users in a channel, use the following `allMembers` API:

```HTTP
GET /teams/{team-id}/channels/{channel-id}/allMembers
```

This API works across standard and other channels and is recommended for reliably identifying guest members.

## Access SharePoint data in shared and private channels

If you're building an app using [SharePoint](/sharepoint/dev/spfx/integrate-with-teams-introduction) Framework, you need to use the SharePoint in Microsoft 365 (SPO) site linked to the shared channel, not the one linked to the host team group. Both shared and private channels have their own SharePoint site that only members of that specific shared or private channel can access.

Use the Microsoft Graph invite API to access the document library of the SharePoint in Microsoft 365 site linked to a shared or private channel.

> [!NOTE]
> For any requirements on Mailbox or Calendar scenarios, see [Feature request and general help](feedback.md).

[Back to Top](#apps-for-shared-and-private-channels)

### Access SharePoint storage for channel files by using Graph API

To access a channel’s SharePoint files root, use the following API:

```HTTP
GET /teams/{teamId}/channels/{channelId}/filesFolder
```

This API returns a DriveItem object for that channel's files root. For more information, see [channel files](/graph/api/channel-get-filesfolder?view=graph-rest-1.0&tabs=http&preserve-view=true).

Use the following properties for all subsequent file operations:

* `parentReference.driveId`: The SharePoint driveId for the channel’s site.
* `itemId`: The folderId for the channel’s root.

The expected drive behavior of the channels is as follows:

* Standard channels use the team site’s driveId.
* Other channels use a separate `driveId` for their individual sites.

> [!NOTE]
>
> Always store and reuse the `driveId` and `itemId` returned by the API.
> Don't hardcode library names or URLs based on assumptions about the team site, as the team site location can change.
> Use this `GET /teams/{teamId}/channels/{channelId}/filesFolder` API for all channel types.

### Manage file access for external or guest users by using Graph API

#### [External users](#tab/external-users)

External users stay in their tenant when they access the host channel’s SharePoint site. To enable access:

1. Configure cross-tenant access on both sides.
1. Ensure your app is multitenant and receives consent in the host tenant.

#### [Guest users](#tab/guest-users)

The channel’s SharePoint site automatically grants access to all channel members, including tenants.

Ensure that you:

* Avoid using organization-wide sharing links because they typically exclude external users.
* Use specific-people sharing, or rely on membership-based permissions.
* Check tenant or site policies, as they might block anonymous or organization-wide links.

To grant access to specific users or groups, use the following API:

```HTTP
POST /drives/{driveId}/items/{itemId}/invite
```

---

### Authenticate external users in tabs or task modules

When your tab or task module needs to access SharePoint resources in the channel’s home tenant, perform the following steps:

1. Detect external users
Use `getContext()` to retrieve channel context. Compare `user.tenant.id` with `channel.ownerTenantId` or `channel.hostTenantId`. If they differ, the user is external.

1. Request token from home tenant
Call [getAuthToken()](tabs\how-to\authentication\tab-sso-code.md) with the external user's tenant ID (`user.tenant.id` or `tid`) to ensure the token is issued from their home tenant.

[Back to Top](#apps-for-shared-and-private-channels)

## Test your app across channels

Before publishing updates, ensure your app works correctly across all channel types in real situations.

### Standard channel

Confirm that the existing functionality remains intact after your changes. Ensure tabs, bots, and messaging extensions continue to work as expected.

### Shared channel
  
### [Shared channel (same tenant)](#tab/sharedchannel)

Create a shared channel in Team A, and then share it with Team B (requires owner permissions).

Perform the following steps to validate the private channel support:

1. Add the app to Team A (host team), and then to Channel X.
1. Validate that the members from Team B:

* Can see the tab and receive bot responses.

1. Unshare the channel from Team B and confirm:
   * Your bot receives a `channelUnshared` event.
   * Membership updates are handled correctly.

### [Shared channel (external tenant)](#tab/sharedchannel-externaltenant)

Use two tenants or collaborate with a colleague from another organization via Teams Connect.

Perform the following steps to validate the private channel support:

1. Have an external user send a message to your bot and confirm that it responds. The bot must receive the message, provided it's added to the appropriate scope (personal chat, group chat, or channel).
1. Have the external user trigger a task module or tab interaction and verify that the authentication succeeds.
   * If using single sign-on authentication (SSO), ensure `getAuthToken` handles the user's home tenant ID correctly.
1. Attempt to send a direct message from your bot to the external user:
   * This functionality fails if the user is outside your tenant.
   * Confirm that in-channel communication still works.

---

### Private channel

Create a private channel in Team A with at least two members (owner and member).

Perform the following steps to validate the private channel support:

1. Add the app to Team A, and then add it to the private channel.
1. Verify that your tab loads correctly in the private channel.
1. Test bot responses for different user types:
   * In-tenant member
   * Guest user or external user
1. If your app lists members or assigns tasks, confirm it only uses channel members and not the complete team.
5. Add a new member to the private channel and check:
   * Whether your app receives a membership change event
   * Whether your membership API reflects the new member

Testing across these scenarios helps you spot any problems with functionality, permissions, and user experience.

> [!NOTE]  
> Support for apps in **Private channel** is available in public developer preview.

## Best practices for supporting all channels

### Dos

* **Always get the current channel’s member list and roles** before you perform actions. For example, when you send notifications or assign tasks, target only the actual channel members and not the entire team.
* **Control data access and sharing** based on channel membership and permissions. For more information, see [Manage channel membership](#manage-channel-membership).
* **Determine** whether users are internal, guests, or external (cross-tenant), and authenticate them in their home tenant. Always validate permissions for cross-tenant scenarios, especially when accessing files. For more information, see [Identify guest users in channels using Graph API](#identify-guest-users-in-channels-using-graph-api).
* **Update help text and user guides** to explain how your app behaves in different channel types, including any limitations for guests or external users.
* **Review Teams documentation and changelogs** to stay aligned with the latest updates to APIs, permissions, and channel configurations.

### Don'ts

* **Restrict sensitive actions** to owners or internal users and offer limited features to guests or external participants.
* **Never include private channel data** in broader reports or public channels unless explicitly authorized.

## Frequently asked questions

<details>
<summary>Why isn't the app visible when I try to add it to a channel?</summary>

The app might not appear if the manifest is missing required support, such as `supportsChannelFeatures: tier1`. Additionally, the installer might not have sufficient permissions. Only team members or owners can add apps, and local policies must allow app installation. If the channel is an incoming shared channel (shared into a team), you can't add apps directly from that location. In such cases, switch to the host team to add the app to the channel. You can detect whether a channel is shared-in by checking the channel metadata for the host team ID.
<br>
&nbsp;
</details>
<details>
<summary>Why am I getting a 403 error stating 'app not enabled in this channel' when calling channel APIs?</summary>

This error occurs if the app is installed at the team level but isn't added to the channel. To resolve this issue, confirm that the app is added to the channel. If your app uses resource-specific consent (RSC), verify that the permissions declared in the manifest match the API calls you're making, for example, `ChannelMember.Read.Group` for reading channel membership. After adding the app, retry the operation. For bots, initiate channel-specific logic when the bot receives the `channelMemberAdded` event to verify successful addition to the channel.
<br>
&nbsp;
</details>
<details>
<summary>Why does the channel roster appear incomplete, showing only owners or missing users?</summary>

The channel roster appears incomplete because the team members API is used instead of the correct channel-specific API. To resolve this issue, use the `/channels/{id}/allMembers` API to retrieve the full channel roster. If the response still shows only owners, the app likely isn't added to the channel. Prompt the user to add the app to the channel, then retry the request to fetch the updated roster.
<br>
&nbsp;
</details>
<details>
<summary>Why does file access fail for some users even though they're part of the channel?</summary>

This failure can happen if the app is using the team's main SharePoint site instead of the channel's specific site. Your organization's sharing policies might block the type of link, or external users might lack the necessary permissions. To resolve this issue, make sure your app uses the channel's `filesFolder` property to get the correct `driveId` and `itemId` for file operations. When you're sharing files, use **people with existing access** links or the invite API to give access to specific users or groups.
<br>
&nbsp;
</details>
<details>
<summary>Why are external users experiencing authentication issues in tabs or task modules?</summary>

Authentication issues often occur when the app requests a token for the host tenant instead of the user's home tenant. To resolve this issue, check whether the user is external by comparing `context.user.tenant.id` with the host or owner tenant ID. If they're different, the user is external, and your app must request the token for the user's home tenant. You can do this step by passing the correct tenant ID (tid) when calling `getAuthToken`.
<br>
&nbsp;
</details>
<details>
<summary>How do I know my app was added to a channel?</summary>

This issue might occur if the app expects a centralized list of installed apps at the channel level or relies on team-level installation behavior. Currently, there's no channel-level `installedApps` list available. Instead, bots must listen for the `channelMemberAdded` event within the channel to detect when they're added. When the app gets a 403 error and misses the event, it asks the user to add the bot to the channel and manages the error.
<br>
&nbsp;
</details>
<details>
<summary>Why is my app failing to create message change notifications in shared or private channels?</summary>

Message change notifications might fail in shared or private channels because subscriptions to `/channels/{id}/messages` are blocked when using resource-specific consent (RSC) in these types of channels. If your app receives a 403 error when attempting to create a subscription, this behavior is expected. To resolve this issue, use on-demand message reads after the app is successfully added to the channel.
<br>
&nbsp;
</details>
<details>
<summary>Why do file links still fail for external users even after the app is added to the channel?</summary>

The message change notification failure happens when the tenant's sharing policy blocks the link type, or when the user doesn't have access to the item, even if they're a member of the channel. Another common cause is that the app might generate links pointing to the team drive instead of the channel's dedicated drive. To resolve this issue, reissue the links using the **people with existing access** option or use the invite API to grant access to specific users. Also, ensure the links reference the channel drive, which can be identified using the `filesFolder` property, rather than the team site.
<br>
&nbsp;
</details>

[Back to Top](#apps-for-shared-and-private-channels)

## Code samples

| Sample Name                   | Description                                                                                                                                                                                                 | .NET | Node.js | Python |
|------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------|---------|--------|
| Bot Shared Channel Events | This sample app displays the Teams bot transitive member add and remove events in shared channels. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-shared-channel-events/csharp) | NA   | NA     |
| Membership Change Notification | The sample application demonstrates how to send notifications for shared channel events in Teams. Scenarios include users being added, removed, or membership being updated and when channel is shared or unshared with a team. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/graph-membership-change-notification/csharp) |  [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/graph-membership-change-notification/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/graph-membership-change-notification/python)   |

## See also

* [Manage channel membership](#manage-channel-membership)
* [Understand app permissions in shared channels](#understand-app-permissions-in-shared-channels)
* [Build tabs for Teams](tabs/what-are-tabs.md)
* [Shared channels in Microsoft Teams](/microsoftteams/shared-channels)
* [Channel resource type](/graph/api/resources/channel)
* [Retention policy for Teams locations](/microsoft-365/compliance/create-retention-policies)
* [Use guest access and external access to collaborate with people outside your organization](/microsoftteams/communicate-with-users-from-other-organizations)
* [Manage external meetings and chat with people and organizations using Microsoft identities](/microsoftteams/trusted-organizations-external-meetings-chat?tabs=organization-settings)
