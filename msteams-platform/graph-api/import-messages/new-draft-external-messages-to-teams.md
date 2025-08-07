---
title: Import External Platform Messages Using Microsoft Graphs
description: Learn how to use Microsoft Graph to import historical messages and data from all third-party platforms to Teams.
ms.localizationpriority: high
author: "surbhigupta"
ms.topic: overview
ms.owner: TBD
ms.date: 01/08/2025
---

# Use Microsoft Graph to Import Messages from External Platforms to Teams

You can use Microsoft Graph to migrate users' existing message history and data from an external system into a Teams channel. This feature enables users to continue conversations without interruption, by recreating the messaging hierarchy from a third-party platform directly within Teams.

> [!NOTE]
> In the future, Microsoft might require you or your customers to pay extra fees based on the amount of data imported.

## API Migration Workflow

Use the step-by-step migration flow to ensure a seamless transition of historical messages in both existing and newly created channels or chats by enabling migration mode.

## Step-by-Step Migration Flow

### Step 1: Create or select a channel/chat

Namespace: microsoft.graph

You can either create a new channel or chat in a Team or use an existing channel or chat.

> [!NOTE]
> All APIs listed in the following sections require the `Teamswork.Migrate.All` permission in the application context. Delegated authentication isn't supported.

### Step 2: Use startMigration API to start channel and chat migration

* Use the startMigration API, to enable migration mode on existing Teams channels/chats, and allow import of historical messages. Previously, import operations were restricted to newly created standard channels and chats in an empty state. Refer [Import third-party platform messages to Teams using Microsoft Graph](import-external-messages-to-teams.md)

* Define a minimum timestamp for messages to be migrated. The provided timestamp must be older than the channel or chat’s current createdDateTime and replaces it during migration.

#### Channel Migration

* The supported channels are all the existing Shared, Private, and Public channels. You can optionally provide a request body to specify the minimum timestamp for the messages to be migrated.

#### Channel Request

```https
POST  /teams/{team-id}/channels/{channel-id}/startMigration
{
   ACTUAL CODE
"conversationCreationDateTime": "2024-01-01T00:00:00Z"
}
```

#### Chat Migration

* The supported chat types include Group chats and One-on-one (1:1) chats. **Meeting chats are not supported. External members are supported in all applicable chat types.**
* The startMigration API initiates the message migration process by setting the migrationMode property to **inProgress** for a specified chat.

#### Chat Request

```https
POST   /chats/{chat-id}/startMigration 
{
   ACTUAL CODE
"conversationCreationDateTime": "2024-01-01T00:00:00Z"
}
```

#### Channel and Chat Response

For both channels and chats, if the request is successful, the method returns a **204 No Content** status code. The response body is empty.

> [!NOTE]
>
> * If no request body is provided, the API uses the current date and time as the minimum timestamp.
> * `conversationCreationDateTime` must be:
>   * Greater than the minimum value for `DateTimeOffset`.
>   * Less than the current value of the channel's `CreatedDateTime`.
