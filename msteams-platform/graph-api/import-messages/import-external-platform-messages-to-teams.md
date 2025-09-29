---
title: Import External Platform Messages Using Microsoft Graphs
description: Learn how to use Microsoft Graph to import historical messages and data from all third-party platforms to Teams.
ms.localizationpriority: high
author: "surbhigupta"
ms.topic: overview
ms.owner: mehakagarwal
ms.date: 09/26/2025
---

# Import external platform messages to Teams via Microsoft Graph

Use Microsoft Graph to migrate users' existing message history and data from an external system into Teams. Users can continue their conversations seamlessly without interruption, by recreating the messaging hierarchy from a third-party platform directly within Teams.

> [!NOTE]
> In the future, Microsoft might require you or your customers to pay extra fees based on the amount of data imported.

## Prerequisites

### Analyze and prepare message data

* Review the third-party messages to decide what is migrated.  
* Extract the selected data from the third-party channel or chat.  
* Map the third-party channel or chat structure to the Teams structure.  
* Convert imported data into a format that's suitable for migration.  

### Set up your Microsoft 365 tenant

* Ensure that a Microsoft 365 tenant exists for the import data. For more information on setting up a Microsoft 365 tenancy for Teams, see [prepare your Microsoft 365 tenant](../../concepts/build-and-test/prepare-your-o365-tenant.md).
* Make sure that team members are in Microsoft Entra ID. For more information, see [add a new user](/azure/active-directory/fundamentals/add-users-azure-active-directory) to Microsoft Entra ID.

## Understand the API migration workflow

You can ensure a seamless transition of historical messages, in both existing and newly created channels or chats by performing the following steps:

1. [Create or select an existing channel or chat](#create-or-select-an-existing-channel-or-chat)
1. [Use startMigration API to import messages](#use-startmigration-api-to-import-messages)
1. [Call GET API to check migrationMode status](#call-get-api-to-check-migrationmode-status)
1. [Import messages using POST API](#import-messages-using-post-api)
1. [Complete channel and chat migration](#complete-channel-and-chat-migration)
1. [Call GET API to verify migrationMode](#call-get-api-to-verify-migrationmode)

### Permissions

Delegated authentication isn't supported.

|ScopeName|DisplayName| Type|APIs covered|
|---------|---------|---------|---------|
| `Teamwork.Migrate.All`|  Manage migration to Microsoft Teams | Application-only  |`POST /teams`|

### Supported channel or chat types

|Entities |Sub type  |Migration mode Support |Notes|
|---------|---------|---------|---------|
|**Channels** | Standard, Private, Shared | New and existing | Must be created or already in migration mode |
|**Chats** | Group, 1:1 | New and existing | Meeting chats not supported; external members supported |

## Create or select an existing channel or chat

You can create a new channel or chat in a Team, or use an existing one, to migrate users' message history from an external application to Teams.

## Use startMigration API to import messages

* Use the `startMigration` API, to enable migration mode on Teams channels or chats, and allow import of historical messages. Previously, import operations were restricted to newly created standard channels and chats in an empty state. See [Import third-party platform messages to Teams using Microsoft Graph](import-external-messages-to-teams.md).

* Define a minimum timestamp for messages to be migrated. The provided timestamp must be older than the channel or chat’s current createdDateTime and replaces it during migration.

### Channel migration

The supported channels are all the existing Shared, Private, and Public channels. You can optionally provide a request body to specify the minimum timestamp for the messages to be migrated.

### Channel request

```HTTP
POST  /teams/{team-id}/channels/{channel-id}/startMigration
{
  
"conversationCreationDateTime": "2024-01-01T00:00:00Z"
}
```

### Channel response

If the request is successful, the method returns a '204 No Content' status code. The response body is empty.

Example of a channel request:

```HTTP
POST https://graph.microsoft.com/beta/teams/57fb72d0-d811-46f4-8947-305e6072eaa5/channels/19:4b6bed8d24574f6a9e436813cb2617d8@thread.tacv2/startMigration
{
“conversationCreationDateTime”: “2024-01-01T00:00:00Z”
}

```

Response of the request: **HTTP/1.1 204 No Content**

#### Chat migration

* The supported chat types include Group chats and One-on-one (1:1) chats. Meeting chats aren't supported. External members are supported in all applicable chat types.
* The startMigration API initiates the message migration process by setting the migrationMode property to 'inProgress' for a specified chat.

#### Chat request

```HTTP
POST   /chats/{chat-id}/startMigration 
{
   
"conversationCreationDateTime": "2024-01-01T00:00:00Z"
}
```

#### Chat response

If the request is successful, the method returns a *204 No Content* status code. The response body is empty.

Example of a chat request:

```HTTP
POST https://graph.microsoft.com/beta/teams/57fb72d0-d811-46f4-8947-305e6072eaa5/channels/19:4b6bed8d24574f6a9e436813cb2617d8@thread.tacv2/startMigration 

{ 
“conversationCreationDateTime”: “2024-01-01T00:00:00Z” 
} 
```

Response of the request: **HTTP/1.1 204 No Content**

> [!NOTE]
>
> * If no request body is provided, the API uses the current date and time as the minimum timestamp.
> `conversationCreationDateTime` must be:
>   * Greater than the minimum value for `DateTimeOffset`.
>   * Less than the current value of the channel or chat's `CreatedDateTime`.

## Call GET API to check migrationMode status

After completing Step 2, call the `GET channel` or `GET chat` API to confirm that the *migrationMode* property is set to *inProgress*. For more information, see [GET Channel](/graph/api/channel-get?view=graph-rest-1.0&tabs=http)

```HTTP
GET /teams/{team-id}/channels/{channel-id}
```

## Import messages using POST API

Go to [Import third-party platform messages to Teams using Microsoft Graph](import-external-messages-to-teams.md) and use the POST API, to begin sending back-in-time messages.

## Complete channel and chat migration

Namespace: microsoft.graph

Use the `completeMigration` API to finish the migration process for both new and existing channels and chats. Previously, this operation was limited to newly created Standard channels and chats initiated for the initial migration flow.

### Complete Channel Migration

* When a channel is created in migration mode for the initial import flow, calling the **completeMigration** API updates the migrationMode property to completed. **This change is permanent and marks the channel as fully migrated.**
* After calling completeMigration, you can still import extra messages by using the startMigration API.

#### Request for Completing Channel Migration

```HTTP
POST /teams/{team-id}/channels/{channel-id}/completeMigration 
```

### Complete Chat Migration

* For existing chats already in migration mode, call the **completeMigration** API to update the migrationMode property to completed. **This marks the chat as fully migrated.**
* After calling completeMigration on a new or existing chat, you can continue importing messages by using the startMigration API.

#### Request for Completing Chat Migration

```HTTP
POST /chats/{chat-id}/completeMigration 
```

> [!IMPORTANT]
> Don't include a request body when calling this method for channels or chats. If the request is successful, the method returns a 204 No Content status code. The response body is empty.
>
> [!NOTE]
>
> In Migration Mode:
>
> * Certain operations such as sending messages and adding members are restricted.
> * Calling the completeMigration API means that channel or chat migration is complete and normal operations can resume.

## Call GET API to verify migrationMode

To verify that the migrationMode property is marked as **completed**

## See also

* [Microsoft Graph and Teams integration](/graph/teams-concept-overview)
* [Export content with the Microsoft Teams Export APIs](/microsoftteams/export-teams-content)
* [Microsoft Teams service limits](/graph/throttling-limits#microsoft-teams-service-limits)
* [Licensing and payment requirements for the Microsoft Teams API](/graph/teams-licenses)
