---
title: Teams Connects Shared Channels
author: surbhigupta
description: Learn about Teams Connect shared channels to securely collaborate with internal and external users in a shared space without switching tenants.
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: conceptual
ms.date: 04/09/2025
---

# Microsoft Teams connects shared channels

Microsoft Teams connects shared channels, which allow members of a channel to collaborate with users across other teams and organizations. You can create and share a shared channel with:

* Members of another team within the same organization.
* Individuals within the same organization.
* Individuals and other teams of other organizations.

> [!NOTE]
>
> * Tab apps in shared channels are available in [Government Community Cloud (GCC), GCC High, Department of Defense (DoD)](../cloud-overview.md#teams-app-capabilities), and [Teams operated by 21Vianet](../sovereign-cloud.md) environments.
> * SharePoint and the SharePoint pages apps aren't supported for shared channels in GCC, GCC High, DoD, and Teams operated by 21Vianet environments.

Teams connects shared channels, which facilitates secure collaboration seamlessly. Allow external users outside of your organization to collaborate with internal users in Teams without changing their user context. Enhance user experience through cross-tenanants collaboration, secure granular access control, and real-time membership syncing.

:::image type="content" source="~/assets/images/app-fundamentals/shared-channels-teams.png" alt-text="Diagram shows Team B from organization A and Team C from organization B collaborating in a shared channel as Team A.":::

## Enable your app for shared channels

SupportedChannelTypes is an optional property that enables your app in nonstandard channels. If your app supports the team scope and the property is defined, Teams enables your app in each channel type accordingly. Private and shared channels are supported. For more information, see [supportedChannelTypes](../../resources/schema/manifest-schema.md#supportedchanneltypes).

```JSON
    "supportedChannelTypes": [
        "sharedChannels",
        "privateChannels"
    ]
```

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

* **Direct Members**: Users who are added directly to the channel, including users from other tenants (cross-tenants).

* **Indirect Members**: Users who are members of the team, with which the channel is shared, including teams in the same tenant or in a cross-tenant.

Additionally, you can identify whether a member of a shared channel is direct or indirect by checking the **@microsoft.graph.originalSourceMembershipUrl** annotation. This property identifies the source of a member’s access to a shared channel, as shown in the following table.

|Member Type |Annotation Present?  |Description  |
|---------|---------|---------|
|Direct Member  |  **Yes**      |  The user is added directly to the shared channel.  |
|Indirect Member|  **Yes**     | The user accesses the shared channel through another team. The  **@microsoft.graph.originalSourceMembershipUrl** property includes a URL that points to the source team and indicates that the user is an indirect member of the shared channel.    |

> [!NOTE]
> You might receive duplicate notifications when a member is added to a shared channel. This scenario can happen if the member is already part of the shared channel directly or through another linked team. Use the **List allMembers API** to view all the direct and indirect members.
> Ignore the notification if the member already exists; either directly or indirectly.

## Get app notifications for direct and indirect membership changes

Apps installed in shared channels receive notifications when users are added to or removed from a team that shares the channel. To receive these notifications, you must:

1. [Install the app](../deploy-and-publish/apps-upload.md) in a host team and enable it for the shared channel.
1. Create a valid Microsoft Graph change notification subscription to monitor associated team membership changes and shared or unshared events using supported APIs.

To receive both direct and indirect member update notifications, you must include **both the query string parameters** when creating a subscription. If the query strings aren't provided, the subscription only delivers notifications for direct member updates. To learn more, see [Channel membership access](/graph/teams-changenotifications-channelmembership).

```http
`/teams/{team-id}/channels/getAllMembers?notifyOnIndirectMembershipUpdate=true&suppressNotificationWhenSharedUnsharedWithTeam=true`
```

This subscription enables apps to monitor membership changes in shared channels and its associated teams. For more information on how to create a Microsoft Graph change notification subscription, see [Create a subscription.](/graph/teams-changenotifications-teammembership)

### Validate user access for membership updates

When an app receives a notification for an indirect membership update, it’s important to verify whether the user still has access to the shared channel as the same user might have both direct and indirect membership. For example, if a user is removed from a team that shares a channel, the app should confirm whether the user's access is truly lost. Use the **doesUserHaveAccess** API to determine whether the user still has access to the shared channel.

```http
GET /teams/{team-id}/channels/{channel-id}/doesUserHaveAccess(userId='@userid',tenantId='@TenantID',userPrincipalName='@UserPrincipalName')
```

See [doesUserHaveAccess API](/graph/api/channel-doesuserhaveaccess?view=graph-rest-beta&tabs=http) to learn more about user accesses and relevant permissions.

### Handle bulk membership changes

In case of bulk memebership changes, Teams curbs individual membership update notifications when a channel is shared or unshared with a team. This feature reduces notification volume and improves performance.

#### Use sharedWithTeams Subscription for Bulk Membership Changes

To reduce notification overload during membership updates, such as when a shared channel is added to or removed from a team with thousands of members, use the new SharedWithTeams subscription resource:

`/teams/{team-id}/channels/{channel-id}/sharedWithTeams`

The sharedWithTeams subscription sends a single notification when a channel is shared or unshared with a team. It avoids thousands of per-user notifications and improves performance for apps that monitor membership changes. Ensure that you update the shared channel member list using the /allMembers API after receiving a 'shared with' or 'unshared from' team notification.

> [!NOTE]
> To support membership updates in shared channels, apps using resource-specific consent (RSC) must request extended permissions.
> These permissions let the app:
>
> * Access membership data (both direct and indirect members).
> * Receive and respond to membership change notifications.

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

## Classify members in the shared channel as in-tenant or out-tenant

You can classify members as in-tenant or out-tenant by comparing the `tenantID` of the member or team with `hostTeamTenantID` as follows:

1. Get the tenantID of the member you wish to compare.

    ```http
    GET /teams/{host-team-group-id}/channels/{channel-id}/members
    ```

 >[!NOTE]
 >You get the list of direct members of the channel only.

1. Call microsoftTeams.app.getContext() from the Teams JavaScript client library (**TeamsJS SDK**).
 The Teams context page opens with details such as **displayName**, **membershipType**, **ownerGroupID** and **tenantGroupID**.

1. Compare the `tenantGroupID` of the member to the `hostTenantID` property
<a name='azure-ad-native-identity'></a> and determine if the member is in-tenant or out-tenant.

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
| Membership change notification | The sample application demonstrates how to send notifications for shared channel events in Microsoft Teams. Scenarios include users being added, removed, or  membership being updated and when channel is shared or unshared with a team. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/membershipChangeNotificationNodejs/samples/graph-membership-change-notification/csharp) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/membershipChangeNotificationNodejs/samples/graph-membership-change-notification/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/membershipChangeNotificationNodejs/samples/graph-membership-change-notification/python) |

## See also

* [Build tabs for Teams](../../tabs/what-are-tabs.md)
* [App manifest schema for Teams](../../resources/schema/manifest-schema.md)
* [Shared channels in Microsoft Teams](/microsoftteams/shared-channels)
* [Channel resource type](/graph/api/resources/channel)
* [Retention policy for Teams locations](/microsoft-365/compliance/create-retention-policies)
* [Use guest access and external access to collaborate with people outside your organization](/microsoftteams/communicate-with-users-from-other-organizations)
* [Manage external meetings and chat with people and organizations using Microsoft identities](/microsoftteams/trusted-organizations-external-meetings-chat?tabs=organization-settings)
