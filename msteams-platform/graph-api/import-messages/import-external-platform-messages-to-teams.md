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

## Understand the migration workflow

You can ensure a seamless transition of historical messages, in both existing and newly created channels or chats by performing the following steps:

* [Step 1: Create or select an existing channel or chat](#step-1-create-or-select-an-existing-channel-or-chat)
* [Step 2: Use startMigration API to import messages](#step-2-use-startmigration-api-to-import-messages)
* [Step 3: Call GET API to check migrationMode status](#step-3-call-get-api-to-check-migrationmode-status)
* [Step 4: Import messages using POST API](#step-4-import-messages-using-post-api)
* [Step 5: Complete channel and chat migration](#step-5-complete-channel-and-chat-migration)
* [Step 6: Call GET API to verify migrationMode](#step-6-call-get-api-to-verify-migrationmode)

### Permissions

Delegated authentication isn't supported.

|ScopeName|DisplayName| Type|APIs covered|
|---------|---------|---------|---------|
| `Teamwork.Migrate.All`|  Manage migration to Microsoft Teams | Application-only  |`POST /teams`|

### Supported channel and chat types

|Entities |Sub type  |Migration mode support |Notes|
|---------|---------|---------|---------|
|**Channels** | Standard, Private, Shared | New and existing | Must be created or already in migration mode |
|**Chats** | Group, 1:1 | New and existing | Meeting chats not supported; external members supported |

## Step 1: Create or select an existing channel or chat

You can create a new channel or chat in a Team, or use an existing one, to migrate users' message history from an external application to Teams.

## Step 2: Use startMigration API to import messages

* Use `startMigration` API, to enable migration mode on Teams channels or chats, and allow import of historical messages. Previously, import operations were restricted to newly created standard channels and chats in an empty state.
* Define a minimum timestamp for messages to be migrated. The provided timestamp must be older than the channel or chat’s current `creationDateTime` and replaces it during migration.

### [Channel migration](#tab/channelmigration)

You can provide a request body to specify the minimum timestamp for the messages to be migrated, optionally.

#### Channel request

```HTTP
POST  /teams/{team-id}/channels/{channel-id}/startMigration
{
  
"conversationcreationDateTime": "2024-01-01T00:00:00Z"
}
```

#### Channel response

If the request is successful, the method returns the following status:

```http
HTTP/1.1 204 No Content
```

The response body is empty.

Example:

```HTTP
POST https://graph.microsoft.com/beta/teams/57fb72d0-d811-46f4-8947-305e6072eaa5/channels/19:4b6bed8d24574f6a9e436813cb2617d8@thread.tacv2/startMigration
{
“conversationcreationDateTime”: “2024-01-01T00:00:00Z”
}

```

### [Chat migration](#tab/chatmigration)

* `startMigration` API initiates the message migration process by setting the migrationMode property to 'inProgress' for a specified chat.

#### Chat request

```HTTP
POST   /chats/{chat-id}/startMigration 
{
   
"conversationcreationDateTime": "2024-01-01T00:00:00Z"
}
```

#### Chat response

If the request is successful, the method returns the following status:

```http
HTTP/1.1 204 No Content
```

The response body is empty.

Example:

```HTTP
POST https://graph.microsoft.com/beta/teams/57fb72d0-d811-46f4-8947-305e6072eaa5/channels/19:4b6bed8d24574f6a9e436813cb2617d8@thread.tacv2/startMigration 

{ 
“conversationcreationDateTime”: “2024-01-01T00:00:00Z” 
} 

```

### End Tabset {.tabset}

## Step 3: Call GET API to check migrationMode status

Call `GET channel` or `GET chat` APIs to confirm that the `migrationMode` property is set to `inProgress`. For more information on the APIs, see:

* [GET channel](/graph/api/channel-get?view=graph-rest-1.0&tabs=http&preserve-view=true)
* [GET chat](/graph/api/chat-get?view=graph-rest-1.0&tabs=http&preserve-view=true)

## Step 4: Import messages using POST API

Use POST API to import back-in-time messages using the `createdDateTime`  and `from` keys in the request body.

> [!NOTE]
>
> * Messages imported with `createdDateTime` earlier than the message thread `createdDateTime` isn't supported.
> * `createdDateTime` must be unique across messages in the same thread.
> * `createdDateTime` supports timestamps with milliseconds precision. For example, if the incoming request message has the value of `createdDateTime` set as *2020-09-16T05:50:31.0025302Z*, then it would be converted to *2020-09-16T05:50:31.002Z* when the message is ingested.

### Request (POST message that is text-only)

```http
POST https://graph.microsoft.com/v1.0/teams/team-id/channels/channel-id/messages

{
   "createdDateTime":"2019-02-04T19:58:15.511Z",
   "from":{
      "user":{
         "id":"id-value",
         "displayName":"Joh Doe",
         "userIdentityType":"aadUser"
      }
   },
   "body":{
      "contentType":"html",
      "content":"Hello World"
   }
}
```

#### Response

```http
HTTP/1.1 200 OK

{
   "@odata.context":"https://graph.microsoft.com/v1.0/$metadata#teams('team-id')/channels('channel-id')/messages/$entity",
   "id":"id-value",
   "replyToId":null,
   "etag":"id-value",
   "messageType":"message",
   "createdDateTime":"2019-02-04T19:58:15.58Z",
   "lastModifiedDateTime":null,
   "deleted":false,
   "subject":null,
   "summary":null,
   "importance":"normal",
   "locale":"en-us",
   "policyViolation":null,
   "from":{
      "application":null,
      "device":null,
      "conversation":null,
      "user":{
         "id":"id-value",
         "displayName":"Joh Doe",
         "userIdentityType":"aadUser"
      }
   },
   "body":{
      "contentType":"html",
      "content":"Hello World"
   },
   "attachments":[
   ],
   "mentions":[
   ],
   "reactions":[
   ]
}
```

#### Error message

```http
400 Bad Request
```

#### Request (POST a message with inline image)

> [!NOTE]
>
> * There are no special permission scopes in this scenario since the request is part of `chatMessage`.
> * The scopes for `chatMessage` apply here.

```http
POST https://graph.microsoft.com/v1.0/teams/team-id/channels/channel-id/messages

{
  "body": {
        "contentType": "html",
        "content": "<div><div>\n<div><span><img height=\"250\" src=\"../hostedContents/1/$value\" width=\"176.2295081967213\" style=\"vertical-align:bottom; width:176px; height:250px\"></span>\n\n</div>\n\n\n</div>\n</div>"
    },
    "hostedContents":[
        {
            "@microsoft.graph.temporaryId": "1",
            "contentBytes": "iVBORw0KGgoAAAANSUhEUgAAANcAAAExCAYAAADvFzeeAAAXjklEQVR4Ae2d/XNU1RnH+9e0FFrA0RCIyaS8hRA0HV5KbS1gHRgVpjMClY4GHJ3yYm1HCmXaWttaaZUZtIIFKYi8lFAkvOQ9u5vN225IARVBbX9/Os9NbrLZbMjmhCfJPX5+2Lmb3T25y3O+n/M599x7w9f+++UXwoMakIF7n4GvUdR7X1RqSk01A8CFuZm5GGUAuIwKi72wF3ABF+YyygBwGRUWc2Eu4AIuzGWUAeAyKizmwlzABVyYyygDwGVUWMyFuYALuDCXUQaAy6iwmAtzARdwfWXMdeuzT+TGxz3Sfb1LunrapL07IW3pePDQ5/qavqef0c+OdYAELuAac4jGGkLL9rdvfyo9N9ODQAqBGmmrwGlb/R0u3xG4gMspOC5hG882CoRaaCSA8n1ff9doIQMu4PIOrus3u+8ZVNnw6e/Od5AALuDKOyz5hmqiPnfnzi1J9bSbgRWCpvvQfY307wQu4BoxJCOFaDK8rwsQmQsUIQhWW93XSIsewAVckYdLQ24F0Ui/926AARdwRRounZ6Np7GyYdN9DzdFBC7gijRc43GMlQ1U9s/6HXJNjYELuHI<<-----Removed----->>>>",
            "contentType": "image/png"
        }
    ]
}
```

#### Response

```http
HTTP/1.1 200 OK

{
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#teams('team-id')/channels('channel-id')/messages/$entity",
    "id": "id-value",
    "replyToId": null,
    "etag": "id-value",
    "messageType": "message",
    "createdDateTime": "2019-02-04T19:58:15.511Z",
    "lastModifiedDateTime": null,
    "deleted": false,
    "subject": null,
    "summary": null,
    "importance": "normal",
    "locale": "en-us",
    "policyViolation": null,
    "from": {
        "application": null,
        "device": null,
        "conversation": null,
        "user": {
            "id": "id-value",
            "displayName": "Joh Doe",
            "userIdentityType": "aadUser"
        }
    },
      "body": {
        "contentType": "html",
        "content": "<div><div>\n<div><span><img height=\"250\" src=\"https://graph.microsoft.com/teams/teamId/channels/channelId/messages/id-value/hostedContents/hostedContentId/$value\" width=\"176.2295081967213\" style=\"vertical-align:bottom; width:176px; height:250px\"></span>\n\n</div>\n\n\n</div>\n</div>"
    },
    "attachments": [],
    "mentions": [],
    "reactions": []
}
```

## Step 5: Complete channel and chat migration

Use `completeMigration` API to finish the migration process for both new and existing channels and chats:
Previously, this operation was limited to newly created standard channels and chats, initiated for the initial migration flow.

### Complete channel migration

* When a channel is created in migration mode for the initial import flow, calling the `completeMigration` API updates the `migrationMode` property to completed. This change is permanent and marks the channel as fully migrated.
* After calling `completeMigration`, you can still import extra messages by using the `startMigration` API.

#### Request for completing channel migration

```HTTP
POST /teams/{team-id}/channels/{channel-id}/completeMigration 
```

### Complete chat migration

* For existing chats, which are already in migration mode, call `completeMigration` API to update the `migrationMode` property to completed. This process marks the chat as fully migrated.
* After calling `completeMigration` on a new or existing chat, you can continue importing messages by using `startMigration` API.

#### Request for completing chat migration

```HTTP
POST /chats/{chat-id}/completeMigration 
```

## Step 6: Call GET API to verify migrationMode

Call `GET channel` or `GET chat` API, to verify that the `migrationMode` property is marked as completed.

### Import content scope

The following table provides the content scope:

|In-scope | Out-of-scope|
|----------|--------------------------|
|Team and channel messages|1:1 and group chat messages|
|Created time of the original message|Private channels|
|Inline images as part of the message|At mentions|
|Links to existing files in SPO or OneDrive|Reactions|
|Messages with rich text|Videos|
|Message reply chain|Announcements|
|High throughput processing|Code snippets|
||Stickers|
||Emojis|
||Quotes|
||Cross posts between channels|
||Shared channels|

## See also

* [Microsoft Graph and Teams integration](/graph/teams-concept-overview)
* [Export content with the Microsoft Teams Export APIs](/microsoftteams/export-teams-content)
* [Microsoft Teams service limits](/graph/throttling-limits#microsoft-teams-service-limits)
* [Licensing and payment requirements for the Microsoft Teams API](/graph/teams-licenses)
