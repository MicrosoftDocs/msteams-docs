---
title: Teams Connect Shared Channels
author: surbhigupta
description: Learn about Teams Connect shared channels to securely collaborate with internal and external users in a shared space without switching tenants.
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: conceptual
ms.date: 04/09/2025
---

# Microsoft Teams Connects shared channels

Microsoft Teams Connect shared channels allow members of a channel to collaborate with users across other teams and organizations. You can create and share a shared channel with:

* Members of another team within the same organization.
* Individuals within the same organization.
* Individuals and other teams of other organizations.

> [!NOTE]
>
> * Tab apps in shared channels are available in [Government Community Cloud (GCC), GCC High, Department of Defense (DoD)](../cloud-overview.md#teams-app-capabilities), and [Teams operated by 21Vianet](../sovereign-cloud.md) environments.
> * SharePoint and the SharePoint pages apps aren't supported for shared channels in GCC, GCC High, DoD, and Teams operated by 21Vianet environments.

Teams Connect shared channels facilitate secure collaboration seamlessly. Allow external users outside of your organization to collaborate with internal users in Teams without changing their user context. Enhance user experience unlike using guest accounts, for example, the members must sign out of Teams and sign in again using a guest account. Teams applications extend the powerful collaboration space.

:::image type="content" source="~/assets/images/app-fundamentals/shared-channels-teams.png" alt-text="Diagram shows Team B from organization A and Team C from organization B collaborating in a shared channel as Team A.":::

## Enable your app for shared channels

SupportedChannelTypes is an optional property that enables your app in non-standard channels. If your app supports the team scope and the property is defined, Teams enables your app in each channel type accordingly. Private and shared channels are supported. For more information, see [supportedChannelTypes](../../resources/schema/manifest-schema.md#supportedchanneltypes).

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

## Get context for shared channels

When the content UX is loaded in a shared channel, use the data received from `getContext` call for  shared channel changes. `getContext` call publishes two new properties, `hostTeamGroupID` and `hostTenantID`, which are used to retrieve channel membership using Microsoft Graph APIs. `hostTeam` is the team that creates the shared channel.

For more information to enable your tab, see:

* [Get context for your tab for private channels](../../tabs/how-to/access-teams-context.md#retrieve-context-in-private-channels)
* [Get context in shared channels](../../tabs/how-to/access-teams-context.md#get-context-in-shared-channels)

## Apps and permissions in shared channels

You can collaborate with external members outside of your organization using shared channels. App permissions in shared channels follow the host team's app roster and host tenant's app policy.

> [!NOTE]
> The [activity feed notification API](/graph/teams-send-activityfeednotifications) doesn't support cross-tenant notifications for apps in a shared channel.

## Get shared channel membership

Use the [List allMembers API](/graph/api/channel-list-allmembers?view=graph-rest-beta&tabs=http) to retrieve all members (**direct** and **indirect**) of a shared channel.

### Identify Direct vs. Indirect Members

You can identify whether a member of a shared channel is direct or indirect by checking the **@microsoft.graph.originalSourceMembershipUrl** annotation.
This property identifies the source of a member’s access to a shared channel, as shown in the following table.

|Member Type |Annotation Present?  |Description  |
|---------|---------|---------|
|Direct Member  |  **No**      |  The user is added directly to the shared channel.  |
|Indirect Member|  **Yes**     | The user accesses the shared channel through another team. The annotation includes a URL that points to the source team.     |

> [!NOTE]
> You might receive duplicate notifications when a member is added to a shared channel. This can happen if the member is already part of the shared channel directly or through another linked team.
>
> To avoid duplicate notifications:
>
> * Cache the **/allMembers** list for the shared channel.
> * Compare incoming indirect membership notifications against the cached list.
> * Ignore the notification if the member already exists; either directly or indirectly.

You can get direct shared channel membership by using the `hostTeamGroupID` from `getContext` and following these steps:

1. Get direct members with [GET channel members API](/graph/api/channel-list-members?view=graph-rest-beta&tabs=http&preserve-view=true) API.

    ```http
    GET /teams/{host-team-group-id}/channels/{channel-id}/members
    ```

2. Get each shared team with GET `sharedWithTeams` API.

    ```http
    GET /teams/{host-team-group-id}/channels/{channel-id}/sharedWithTeams
    ```

3. Use GET members of each shared team (sharewithteamsId) with GET `sharedWithTeams` API.

    ```http
    GET /teams/{host-team-group-id}/channels/{channel-id}/sharedWithTeams/{sharewithteamsId}/allowedMembers
    ```

## Get App notifications for direct and indirect membership changes

Users become part of a shared channel either directly, by being added to the channel, or indirectly, through membership in a team that the channel is shared with. Apps installed in shared channels receive notifications when users are added to or removed from a team that shares the channel. To receive these notifications, you must:

* [Install the app](../deploy-and-publish/apps-upload.md) in a host team and enable it for the shared channel.
* Create a valid Microsoft Graph change notification subscription to monitor associated team membership changes and shared or unshared events using supported APIs.

To receive both direct and indirect member update notifications, you must include both the query string parameters when creating a subscription. If the query strings are not provided, the subscription only delivers notifications for direct member updates.

`/teams/{team-id}/channels/getAllMembers?notifyOnIndirectMembershipUpdate=true&suppressNotificationWhenSharedUnsharedWithTeam=true`

This subscription enables apps to monitor membership changes in shared channels and its associated teams. For more information on how to create a Microsoft Graph change notification subscription, see [Create a subscription.](/graph/teams-changenotifications-teammembership)

### Manage indirect membership in shared channels

You can manage indirect membership in shared channels using the following Microsoft Graph APIs:

* Use [allMembers](/graph/api/channel-list-allmembers?branch=main&branchFallbackFrom=pr-en-us-13010&view=graph-rest-1.0&tabs=http&preserve-view=true) API to retrieve all users who are members of a specific channel.

    ```http
    GET /teams/{team-id}/channels/{channel-id}/allMembers
    ```

* Use [sharedWithTeams](/graph/api/sharedwithchannelteaminfo-list?branch=main&branchFallbackFrom=pr-en-us-13010&view=graph-rest-1.0&tabs=http&preserve-view=true) API to list all teams a channel is shared with.

    ```http
    GET /teams/{team-id}/channels/{channel-id}/sharedWithTeams
    ```

* Use the [allowedMembers](/graph/api/sharedwithchannelteaminfo-list-allowedmembers?branch=main&branchFallbackFrom=pr-en-us-13010&view=graph-rest-1.0&tabs=http&preserve-view=true) API to retrieve users from a shared team who can access a shared channel.

    ```http
    GET /teams/{team-id}/channels/{channel-id}/sharedWithTeams/{sharewithteamsId}/allowedMembers
    ```

> [!NOTE]
> `allowedMembers` API returns only newly associated users and doesn't apply to unshared events.

### Validate user access

When an app receives a notification for an indirect membership update, it must validate user access to the shared channel. For example, if a user is removed from a team associated with a shared channel, use the following API to determine whether the user still has access to the shared channel. The API verifies whether the user still has access to the shared channel.

```http
GET /DoesUserHaveAccessAsync
```

### Handle bulk membership changes

Teams suppresses individual notifications when a channel is shared with a team or when multiple users are removed. This helps reduce notification volume and improve performance.

#### Use sharedWithTeams Subscription for Bulk Membership Changes

To reduce notification overload during membership updates, such as when a shared channel is added to or removed from a team with thousands of members, use the new SharedWithTeams subscription resource:

`/teams/{team-id}/channels/{channel-id}/sharedWithTeams`

The sharedWithTeams subscription sends a single notification when a channel is shared or unshared with a team, avoiding thousands of per-user notifications and improving performance for apps that monitor membership changes.

> [!NOTE]
> Apps using resource-specific consent (RSC) must request extended permissions to support both direct and indirect membership updates. These permissions are required to query membership data and respond to notifications.

## Classify members in the shared channel as in-tenant or out-tenant

You can classify members as in-tenant or out-tenant by comparing `tenantID` of the member or team with `hostTeamTenantID` as follows:

1. Get the member you wish to compare.

    ```http
    GET /teams/{host-team-group-id}/channels/{channel-id}/members
    ```

2. Use `getContext`, compare the `tenantID` of the member to the `hostTenantID` property.

<a name='azure-ad-native-identity'></a>

## Microsoft Entra native identity

Apps must function cross-tenants in installation and usage. The following table lists the channel types and their corresponding group IDs:

|Channel type| groupId | hostTeamGroupId |
|----------|---------|-----------------|
|Regular | Team Microsoft Entra group ID | Team Microsoft Entra group ID |
|Shared | Empty | Host Team Microsoft Entra group ID |

## Apps in federated group chats with external users

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

| Sample name | Description | .NET | Node.js | Python |
|-------------|-------------|------|----|------|----|
| Teams Conversation Bot | This sample app displays the names of the members in a federated group chat with external users.| NA |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-feed-members/nodejs/) | NA |
| Membership change notification | This sample application demonstrates how to send notifications for shared channel events in Microsoft Teams, such as users being added, removed, or having their membership updated and when channel is shared/unshared with a team. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/membershipChangeNotificationNodejs/samples/graph-membership-change-notification/csharp) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/membershipChangeNotificationNodejs/samples/graph-membership-change-notification/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/membershipChangeNotificationNodejs/samples/graph-membership-change-notification/python) |

## See also

* [Build tabs for Teams](../../tabs/what-are-tabs.md)
* [App manifest schema for Teams](../../resources/schema/manifest-schema.md)
* [Shared channels in Microsoft Teams](/microsoftteams/shared-channels)
* [Channel resource type](/graph/api/resources/channel)
* [Retention policy for Teams locations](/microsoft-365/compliance/create-retention-policies)
* [Use guest access and external access to collaborate with people outside your organization](/microsoftteams/communicate-with-users-from-other-organizations)
* [Manage external meetings and chat with people and organizations using Microsoft identities](/microsoftteams/trusted-organizations-external-meetings-chat?tabs=organization-settings)
