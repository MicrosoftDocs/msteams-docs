---
title: Teams Connect Shared Channels
author: surbhigupta
description: Learn about Teams Connect shared channels to securely collaborate with internal and external users in a shared space without switching tenants.
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: conceptual
ms.date: 02/06/2025
---

# Microsoft Teams Connect shared channels

Microsoft Teams Connect shared channels allow members of a channel to collaborate with users across other teams and organizations. You can create and share a shared channel with:

* Members of another team within the same organization.
* Individuals within the same organization.
* Individuals and other teams of other organizations.

> [!NOTE]
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

Teams supports the use of apps in group chats that include external users. External users can't add, update, or remove apps from the group chat. Only the host of the group chat can add, update, or remove apps. However, all members of the chat, including external users, can use these apps. Support for apps doesn't extend to one-on-one chats or channel chats with external users.

> [!NOTE]
> If you're developing an app for use in group chats that include external users, register your app as a multitenant app in Microsoft Entra ID. This action allows users across multiple organizations to access your app.

### Handling external users in a single tenant app

For a single tenant app for a group chat, you need to handle unauthenticated external users in the group chat. In these cases, you must show a placeholder page or response.

The following code snippet prevents external users from signing in and displays a failure message when they attempt to sign in:

```javascript
// This is a placeholder code snippet
function placeholderFunction() {
    console.log("This is a placeholder code snippet");
}

placeholderFunction();
```

### Handling external users in a multitenant app

For a multitenant app, you must handle the Microsoft Entra object ID that your app receives for an external user that isn't in your home tenant. These Microsoft Entra object IDs can't be resolved in your own directory. You must ask for extra permissions from the external user to resolve their Microsoft Entra object ID, or obtain consent to access the user's email address for authentication.

To learn how to retrieve the details of a user's Microsoft Entra object ID for a bot, see [get single member details](../../bots/how-to/get-teams-context.md#get-single-member-details). To learn how to retrieve the details of a user's Microsoft Entra object ID for a tab, see [Get context by using the Microsoft Teams JavaScript library](../../tabs/how-to/access-teams-context.md#get-context-by-using-the-microsoft-teams-javascript-library). If you're unable to authenticate a user or resolve their Microsoft Entra object ID, provide a fallback experience, such as a guest experience or other types of unauthenticated experiences.

The following code snippets show how to allow external users to sign-in and handle two distinct sign-in scenarios for users in the home tenant and external users:

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

## Code sample

| Sample name | Description | Node.js |
|-------------|-------------|------|----|
| Teams Conversation Bot | This sample displays the names of the members in a group chat. It proactively sends a welcome message when a new user is added to the group chat. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-feed-members/nodejs/)|

## See also

* [Build tabs for Teams](../../tabs/what-are-tabs.md)
* [App manifest schema for Teams](../../resources/schema/manifest-schema.md)
* [Shared channels in Microsoft Teams](/microsoftteams/shared-channels)
* [Channel resource type](/graph/api/resources/channel)
* [Retention policy for Teams locations](/microsoft-365/compliance/create-retention-policies)
* [Use guest access and external access to collaborate with people outside your organization](/microsoftteams/communicate-with-users-from-other-organizations)
* [Manage external meetings and chat with people and organizations using Microsoft identities](/microsoftteams/trusted-organizations-external-meetings-chat?tabs=organization-settings)
