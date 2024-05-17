---
title: Teams Connect shared channels
description:  Learn about Teams Connect shared channels to securely collaborate with internal and external users in a shared space without switching tenants.
localization_priority: Normal
ms.topic: conceptual
ms.date: 11/02/2022
---

# Teams Connect shared channels

Microsoft Teams Connect shared channels allow members of a channel to collaborate with users across other teams and organizations. You can create and share a shared channel with:

* Members of another team within the same organization.
* Individuals within the same organization.
* Individuals and other teams of other organizations.

> [!NOTE]
> Tab apps in shared channels are available in [Government Community Cloud (GCC), GCC-High, and Department of Defense (DOD)](~/concepts/app-fundamentals-overview.md#government-community-cloud) environments.

Teams Connect shared channels facilitate secure collaboration seamlessly. Allow external users outside of your organization to collaborate with internal users in Teams without changing their user context. Enhance user experience unlike using guest accounts, for example, the members must sign out of Teams and sign in again using a guest account. Teams applications extend the powerful collaboration space.

:::image type="content" source="~/assets/images/app-fundamentals/shared-channels-teams.png" alt-text="Diagram that shows Team B from organization A and Team C from organization B collaborating in a shared channel as Team A.":::

## Enable your app for shared channels

SupportedChannelTypes is an optional property that enables your app in non-standard channels. If your app supports the team scope and the property is defined, Teams enables your app in each channel type accordingly. Private and shared channels are currently supported. For more information, see [supportedChannelTypes](../../resources/schema/manifest-schema.md#supportedchanneltypes).

```JSON
    "supportedChannelTypes": [
        "sharedChannels",
        "privateChannels"
    ]
```

> [!NOTE]
>
> * If your app supports the team scope, it functions in standard channels, regardless of what values are defined in this property.
> * Your app may need to account for the unique properties of each of these channel types in order to function properly.

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

2. Use `getContext`, compare the `tenantID` of the member to the `hostTenantID` property.

<a name='azure-ad-native-identity'></a>

## Microsoft Entra native identity

Apps must function cross-tenants in installation and usage. The following table lists the channel types and their corresponding group IDs:

|Channel type| groupId | hostTeamGroupId |
|----------|---------|-----------------|
|Regular | Team Microsoft Entra group ID | Team Microsoft Entra group ID |
|Shared | Empty | Host Team Microsoft Entra group ID |

## Apps in group chats with external users

Teams supports the use of apps in group chats that include external users. However, these external users aren't permitted to add, update, or remove apps from the group chat. This permission is reserved for the host of the group chat. However, all members of the chat, including external users, can use these apps. Support for apps doesn't extend to one-on-one chats or channel chats with external users.

If you’re developing an app for use in group chats that include external users, we recommend using a multitenant registration. Ensure that you register your app in Microsoft Entra ID to allow users from multiple organizations (tenants) to use it. If you're using a single tenant registration, you need to handle situations where users are unauthenticated. This could be because they’re from an external organization that your app isn’t registered with. In these cases, you might show a placeholder page or response.

When you use a multitenant registration, the Microsoft Entra object ID that your app receives for a user isn't housed in your own tenant. This is because the user could be from an external organization. You need to handle these Microsoft Entra object IDs that can’t be resolved in your own directory.

This might involve asking for additional permissions from the user to resolve the ID, or asking for consent to access the user’s email address for authentication purposes. If you can’t authenticate a user or resolve their Microsoft object ID, you need to provide a fallback experience, such as a guest user experience or other types of unauthenticated experiences.

The following code snippet prevents external users from signing in and displays a failure message when they attempt to sign in:

```javascript
// This is a placeholder code snippet
function placeholderFunction() {
    console.log("This is a placeholder code snippet");
}

placeholderFunction();
```

The following code snippets show how to allow external users to sign-in and handle two distinct sign-in scenarios for host and external users:

# [Bot](#tab/bot)

```javascript
// This is a placeholder code snippet
function placeholderFunction() {
    console.log("This is a placeholder code snippet");
}

placeholderFunction();
```

# [Tab](#tab/tab)

```javascript
// This is a placeholder code snippet
function placeholderFunction() {
    console.log("This is a placeholder code snippet");
}

placeholderFunction();
```

---

## See also

* [Build tabs for Teams](../../tabs/what-are-tabs.md)
* [App manifest schema for Teams](../../resources/schema/manifest-schema.md)
* [Shared channels in Microsoft Teams](/microsoftteams/shared-channels)
* [Channel resource type](/graph/api/resources/channel)
* [Retention policy for Teams locations](/microsoft-365/compliance/create-retention-policies)
