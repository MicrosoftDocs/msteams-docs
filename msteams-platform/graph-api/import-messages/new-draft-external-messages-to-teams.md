---
title: Import External Platform Messages Using Microsoft Graphs
description: Learn how to use Microsoft Graph to import historical messages and data from all third-party platforms to Teams.
ms.localizationpriority: high
author: "surbhigupta"
ms.topic: overview
ms.owner: mehakagarwal
ms.date: 26/09/2025
---

# Import messages from external Platforms to Teams through Microsoft Graph

Use Microsoft Graph to migrate users' existing message history and data from an external system into Teams. Users can continue their conversations seamlessly without interruption, by recreating the messaging hierarchy from a third-party platform directly within Teams.

> [!NOTE]
> In future, Microsoft might require you or your customers to pay extra fees based on the amount of data imported.

## Understand API migration workflow

You can ensure a seamless transition of historical messages, in both existing and newly created channels or chats by performing the following steps:

1. [1. Create or select a channel or chat](#1-create-or-select-a-channel-or-chat)
1. [2. Use startMigration API to bring channel and chat into migration mode](#2-use-startmigration-api-to-bring-channel-and-chat-into-migration-mode)
1.
1.

Delegated authentication isn't supported. Permissions required for both channel and chat APIs are tabulated as follows:

|APIs |Permission required  |Auth Type  |
|---------|---------|---------|
|startMigration   |    Teamswork.Migrate.All |  Application |
|completeMigration | Teamswork.Migrate.All |   Application      |

### 1. Create or select a channel or chat

Namespace: microsoft.graph

You can either create a new channel or chat in a Team or use an existing channel or chat.

### 2. Use startMigration API to bring channel and chat into migration mode

* Use the startMigration API, to enable migration mode on existing Teams channels or chats, and allow import of historical messages. Previously, import operations were restricted to newly created standard channels and chats in an empty state. See [Import third-party platform messages to Teams using Microsoft Graph](import-external-messages-to-teams.md)

* Define a minimum timestamp for messages to be migrated. The provided timestamp must be older than the channel or chat’s current createdDateTime and replaces it during migration.

#### 2.1 Channel migration

* The supported channels are all the existing Shared, Private, and Public channels. You can optionally provide a request body to specify the minimum timestamp for the messages to be migrated.

#### Channel request

```HTTP
POST  /teams/{team-id}/channels/{channel-id}/startMigration
{
  
"conversationCreationDateTime": "2024-01-01T00:00:00Z"
}
```

#### Channel response

If the request is successful, the method returns a **204 No Content** status code. The response body is empty.

#### 2.2 Chat migration

* The supported chat types include Group chats and One-on-one (1:1) chats. Meeting chats are not supported. External members are supported in all applicable chat types.
* The startMigration API initiates the message migration process by setting the migrationMode property to **inProgress** for a specified chat.

#### Chat request

```HTTP
POST   /chats/{chat-id}/startMigration 
{
   
"conversationCreationDateTime": "2024-01-01T00:00:00Z"
}
```

#### Chat response

If the request is successful, the method returns a **204 No Content** status code. The response body is empty.

**Example of a request**:

```HTTP
POST https://graph.microsoft.com/beta/teams/57fb72d0-d811-46f4-8947-305e6072eaa5/channels/19:4b6bed8d24574f6a9e436813cb2617d8@thread.tacv2/startMigration 

{ 
“conversationCreationDateTime”: “2024-01-01T00:00:00Z” 
} 
```

Response of the request:
**HTTP/1.1 204 No Content**

> [!NOTE]
>
> * If no request body is provided, the API uses the current date and time as the minimum timestamp.
> * `conversationCreationDateTime` must be:
>   * Greater than the minimum value for `DateTimeOffset`.
>   * Less than the current value of the channel or chat's `CreatedDateTime`.

### 3. Call the GET /channel/chat API to confirm that the **migrationMode** property is set to **inProgress**, after completing step 2

### 4. Import messages using POST API

Go to [Import third-party platform messages to Teams using Microsoft Graph](import-external-messages-to-teams.md) and use the POST API, to begin sending back-in-time messages.

### 5. Complete channel and chat migration

Namespace: microsoft.graph

Use the **completeMigration** API to finish the migration process for both new and existing channels and chats. Previously, this operation was limited to newly created Standard channels and chats initiated for the initial migration flow.

#### 5.1 Complete Channel Migration

* When a channel is created in migration mode for the initial import flow, calling the **completeMigration** API updates the migrationMode property to completed. **This change is permanent and marks the channel as fully migrated.**
* After calling completeMigration, you can still import extra messages by using the startMigration API.

#### Request for Completing Channel Migration

```HTTP
POST /teams/{team-id}/channels/{channel-id}/completeMigration 
```

#### 5.2 Complete Chat Migration

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

#### Supported channel or chat types

|Entity Type |Sub Type  |Migration Mode Support |Notes|
|---------|---------|---------|---------|
|**Channels**   |  General, Standard, Private, Shared   | New and existing  |  Must be created or already in migration mode    |
|**Chats**    |   Group, One-on-one (1:1)   | New and existing  | Meeting chats not supported; external members supported        |

### 6. Call the GET /channel/chat API to verify that the migrationMode property is marked as **completed**

## See also

* [Microsoft Graph and Teams integration](/graph/teams-concept-overview)
* [Export content with the Microsoft Teams Export APIs](/microsoftteams/export-teams-content)
* [Microsoft Teams service limits](/graph/throttling-limits#microsoft-teams-service-limits)
* [Licensing and payment requirements for the Microsoft Teams API](/graph/teams-licenses)
