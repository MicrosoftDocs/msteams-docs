---
title: Import external platform messages to Teams with Microsoft Graph
description: Learn how to use Microsoft Graph to import messages such as message history and data from any third-party platform to Teams.
ms.localizationpriority: high
author: "surbhigupta"
ms.topic: overview
ms.owner: mehakagarwal
ms.date: 11/10/2025
---

# Import external messages into Teams with Microsoft Graph APIs

Use Microsoft Graph to import users' existing message history and data from any third-party platform into Teams. Users can continue their conversations seamlessly without interruption, as their messaging hierarchy from the third-party platform is recreated directly within Teams.

> [!NOTE]
> In the future, Microsoft might require you or your customers to pay extra fees based on the amount of data imported.

## Permissions

|ScopeName|DisplayName|Type|APIs covered|
|---------|---------|---------|---------|
| `Teamwork.Migrate.All`| Manage migration to Teams | Application-only|`POST/teams`|

> [!NOTE]
> Delegated authentication isn't supported.
>

## Supported channel and chat types

Migration mode supports all new and existing channels and chats. Here's how you can use it:

* **New channels or chats**: You can create a new team and its standard channels in migration mode to import content.

* **Existing channels or chats**: You can use any team or channel that already exists in Teams, regardless of when you created it.

|Entities |Sub type  |Migration mode support |Notes|
|---------|---------|---------|---------|
|**Channels** | Standard, Private, Shared | New and existing | Channels must be created or already in migration mode |
|**Chats** | Group, 1:1 | New and existing | Meeting chats not supported; external members supported |

> [!NOTE]
> Federated content can't be imported for chats, channels, or messages. Only one app can manage a thread, and all imported content must come from the authenticated tenant. If another app needs to import content, the first app must complete migration before the second app restarts the process.

## Content scope for import

The following table provides the content scope.

|In-scope | Out-of-scope|
|----------|--------------------------|
|Team and channel messages|At mentions|
|Created time of the original message|Announcements|
|Inline images as part of the message|Videos|
|Links to existing files in SPO or Microsoft OneDrive (OD)|Code snippets|
|Messages with rich text|Sticker|
|Message reply chain|Quotes|
|High throughput processing|Cross posts between channels|
|1:1 and group chat messages||
|Shared and private channels||
|Reactions and emojis||

## Prerequisites

Before you set up your Microsoft 365 (M365) tenant:

* Verify that a M365 tenant exists for the import data. For more information on setting up a M365 tenancy for Teams, see [prepare your Microsoft 365 tenant](../../concepts/build-and-test/prepare-your-o365-tenant.md).
* Verify that team members are in Microsoft Entra ID (Entra ID). For more information, see [add a new user](/azure/active-directory/fundamentals/add-users-azure-active-directory) to Entra ID.

## Import historical messages into Teams

You can import historical messages seamlessly into both existing and newly created channels or chats by performing the following steps:

1. [Create a new channel or chat or use an existing one](#step-1-create-a-new-channel-or-chat-or-use-an-existing-one)
1. [Enable migration mode to import messages](#step-2-enable-migration-mode-to-import-messages)
1. [Check migration status](#step-3-check-migration-status)
1. [Import messages](#step-4-import-messages)
1. [Complete migration](#step-5-complete-migration)
1. [Verify migration mode completion](#step-6-verify-migration-mode-completion)

### Step 1: Create a new channel or chat or use an existing one

You can create a new channel or chat, or use an existing one, to migrate a user's message history from any third-party platform to Teams.

**When to use new vs. existing channels:**

* **New channels**: Create when you want to establish a fresh space specifically for migrated content. This option is ideal for recreating the exact structure from your external platform.
* **Existing channels**: Use when you want to add historical context to channels that are already active in Teams. This approach maintains continuity for ongoing conversations.

### Step 2: Enable migration mode to import messages

The `startMigration` API enables migration mode on Teams channels or chats, which allows import of historical messages. Migration mode is a special state that prevents certain operations during the data migration process to ensure data integrity.

**What migration mode does:**

* Temporarily restricts sending new messages to the channel or chat
* Prevents adding or removing members during migration
* Allows importing historical messages with custom timestamps
* Maintains the original conversation structure and hierarchy

For more information, see:

* [Channel migration](#channel-migration)
* [Chat migration](#chat-migration)

### Channel migration

Use the `startMigration` API to enable migration mode on new or existing channels. This API sets the channel’s migration state to `inProgress` and begins the message import process.

#### Request

```HTTP
POST /teams/{team-id}/channels/{channel-id}/startMigration
{
  "conversationCreationDateTime": "2024-01-01T00:00:00Z"
}
```

> [!TIP]
> Microsoft Graph uses DateTimeOffset to represent date and time with a UTC offset for an accurate time zone.
>The `conversationCreationDateTime` value must be greater than the minimum value for `DateTimeOffset` and less than the current value of the channel's `createdDateTime`.

#### Channel migration response

If the request is successful, the method returns an empty status.

```http
HTTP/1.1 204 No Content
```

##### Channel migration example

```HTTP
POST https://graph.microsoft.com/beta/teams/57fb72d0-d811-46f4-8947-305e6072eaa5/channels/19:4b6bed8d24574f6a9e436813cb2617d8@thread.tacv2/startMigration
{
“conversationCreationDateTime”: “2024-01-01T00:00:00Z”
}

```

### Chat migration

Use the `startMigration` API to enable migration mode on new or existing chats. This API sets the chat's migration state to `inProgress` and begins the message import process.

#### Chat migration request

```HTTP
POST /chats/{chat-id}/startMigration
{
  "conversationCreationDateTime": "2024-01-01T00:00:00Z"
}
```

> [!TIP]
> Microsoft Graph uses DateTimeOffset to represent date and time with a UTC offset for an accurate time zone.
>The `conversationCreationDateTime` must be greater than the minimum value for `DateTimeOffset` and less than the current value of the chat's `createdDateTime`.

#### Response

If the request is successful, the method returns an empty status:

```http
HTTP/1.1 204 No Content
```

##### Chat migration example

```HTTP
POST https://graph.microsoft.com/beta/teams/57fb72d0-d811-46f4-8947-305e6072eaa5/chats/19:4b6bed8d24574f6a9e436813cb2617d8@thread.tacv2/startMigration 

{ 
“conversationCreationDateTime”: “2024-01-01T00:00:00Z” 
} 

```

Consider the following important points:

* Define a minimum timestamp for messages to migrate. The provided timestamp must be older than the channel or chat's current `createdDateTime`. This timestamp replaces the existing `createdDateTime` of the channel.
* The `creationDateTime` property is optional in a request body. If omitted, the `startMigration` API uses the current date and time as the minimum timestamp.
* The `startMigration` API starts the message migration process by setting the migration mode to `inProgress` for a specified channel or chat.

### Step 3: Check migration status

Call the `Get channel` or `Get chat` API to confirm that the migration mode state is set to `inProgress`. For more information, see:

* [Get channel](/graph/api/channel-get?view=graph-rest-1.0&tabs=http&preserve-view=true)
* [Get chat](/graph/api/chat-get?view=graph-rest-1.0&tabs=http&preserve-view=true)

### Step 4: Import messages

Use the `POST` API to import back-in-time messages by including the `createdDateTime` and `from` properties in the request body.

> [!NOTE]
>
> * The API doesn't support messages imported with `createdDateTime` earlier than the message thread `createdDateTime`.
> * `createdDateTime` must be unique across messages in the same thread.
> * `createdDateTime` supports timestamps with milliseconds precision. For example, if the incoming request message has `createdDateTime` set to *2020-09-16T05:50:31.0025302Z*, the API converts it to *2020-09-16T05:50:31.002Z* when ingesting the message.

#### Send a text-only message using POST

```http
POST https://graph.microsoft.com/v1.0/teams/team-id/channels/channel-id/messages

{
   "createdDateTime":"2019-02-04T19:58:15.511Z",
   "from":{
      "user":{
         "id":"id-value",
         "displayName":"John Doe",
         "userIdentityType":"aadUser"
      }
   },
   "body":{
      "contentType":"html",
      "content":"Hello World"
   }
}
```

#### Send text message response

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

You receive an error message if you set the `createdDateTime` property to a future date and time.

#### Send a message with an inline image using POST

> [!NOTE]
>
> Use the standard `chatMessage` scopes. No other permission scopes are required.

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

#### Send inline image response

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
            "displayName": "John Doe",
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

### Step 5: Complete migration

Use the `completeMigration` API to finish the migration process for both new and existing channels and chats. For more information, see:

* [Complete channel migration](#complete-channel-migration)
* [Complete chat migration](#complete-chat-migration)

#### Complete channel migration

When you create a channel in migration mode for the initial import, use the `completeMigration` API to update its migration state to completed. This change ensures that the channel remains permanently available instead of being dropped after migration.

For existing channels already in migration mode, use the `completeMigration` API to mark the migration state as completed. After you send a `completeMigration` request for new or existing channels, you can still import more messages by calling the `startMigration` API.

#### Complete channel migration request

```HTTP
POST /teams/{team-id}/channels/{channel-id}/completeMigration 
```

#### Complete chat migration

For existing chats already in migration mode, call the `completeMigration` API to update the migration mode state to completed. This process marks the chat as fully migrated. After calling `completeMigration` on a new or existing chat, you can continue importing messages by using the `startMigration` API.

#### Complete chat migration request

```HTTP
POST /chats/{chat-id}/completeMigration 
```

### Step 6: Verify migration mode completion

Call the `Get channel` or the `Get chat` API to verify that the migration mode state is marked as completed. For more information, see [Get channel](/graph/api/channel-get?view=graph-rest-1.0&tabs=http&preserve-view=true) or
[Get chat](/graph/api/chat-get?view=graph-rest-1.0&tabs=http&preserve-view=true).

## Tips and additional information

<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD026 -->

* After you make the `completeMigration` request, you can't import more messages into the Teams.

* You can only add team members to the new Teams after the `completeMigration` request returns a successful response.

* Throttling: Messages import at five RPS per channel.

* If you need to correct the migration results, you must delete the Teams, repeat the steps to create the Teams and channel, and re-migrate the messages.

> [!NOTE]
> Inline images are the only type of media supported by the import message API schema.

## See also

* [Microsoft Graph and Teams integration](/graph/teams-concept-overview)
* [Export content with the Microsoft Teams Export APIs](/microsoftteams/export-teams-content)
* [Microsoft Teams service limits](/graph/throttling-limits#microsoft-teams-service-limits)
* [Licensing and payment requirements for the Microsoft Teams API](/graph/teams-licenses)
