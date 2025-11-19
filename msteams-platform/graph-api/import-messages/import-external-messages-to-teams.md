---
title: Import third-party platform messages to Teams using Microsoft Graph
description: Learn how to use Microsoft Graph to import messages such as message history and data from any third-party platform to Teams.
ms.localizationpriority: high
author: "surbhigupta"
ms.topic: overview
ms.owner: mehakagarwal
ms.date: 11/17/2025
---

# Import third-party platform messages to Teams using Microsoft Graph

With Microsoft Graph, you can migrate users' existing message history and data from an external system into Teams. By enabling the recreation of a third-party platform messaging hierarchy inside Teams, users can continue their communications in a seamless manner and proceed without interruption.

> [!NOTE]
> In the future, Microsoft might require you or your customers to pay extra fees based on the amount of data imported.

## Permissions

| Scope name | Display name | Description | Type | Admin consent required | Entities/APIs covered |
|---------- |-------------|-------------|------|----------------|-------------------------|
| Teamwork.Migrate.All  | [Manage migration to Microsoft Teams](/graph/permissions-reference#teamworkmigrateall)| Creating and managing resources for migration to Teams. | **Application-only** | Yes            | POST /team             |

> [!NOTE]
> Delegated authentication isn't supported.

## Supported channel and chat types

Teams supports migrating external messages to the following channel and chat types:

* **New team and standard channel**: Create a new team and its standard channels in migration mode to import content. This approach lets you import the exact structure of your external system into the new channel.
To enable `migrationMode` for a new standard team and channel, see [Create a team and standard channel in migration mode](#create-a-team-and-standard-channel-in-migration-mode).

* **Existing channel or chat**: Use any channel or chat that already exists in Teams, regardless of when you created it. This approach lets you add existing context to channels that are already active in Teams and maintains continuity for ongoing conversations.
To enable migration mode in an existing channel or chat, see [Existing channel migration](#existing-channel-migration).

> [!NOTE]
>
> * Only standard channels are supported when creating a channel in migration mode from scratch.
> * Federated content can't be imported. All imported content must come from the authenticated tenant and only one app can manage a thread at a time. Another app can import content only after the first app completes migration.

`migrationMode` is a special state that ensures data integrity by preventing the following operations during data migration.

* For new teams and standard channels:
  * It restricts receipt of new messages
  * It prevents adding or removing members
* For all supported channels and chat types:
  * It allows importing historical messages with custom timestamps
  * It maintains the original conversation structure and hierarchy

## Content scope for import

The following table provides the content scope for existing channels and chats.

|In-scope | Out-of-scope|
|----------|--------------------------|
|Team (general)|Announcements|
|Created time of the original message|Videos|
|Inline images as part of the message|Code snippets|
|Links to existing files in Microsoft 365 (Microsoft 365) SharePoint Online (SPO) or OneDrive (OD)|Stickers|
|Messages with rich text|Cross posts between channels|
|Message reply chain|Quotes|
|High throughput processing||
|1:1 and group chat messages||
|Standard, private, and shared channel messages||
|Up to 250 reactions||
|@mentions and emojis||

## Prerequisites

### Analyze and prepare message data

* Review the third-party data to decide what to migrate.
* Extract the selected data from the third-party chat system.
* Map the third-party chat structure to the Teams structure.
* Convert import data into the format needed for migration.

### Set up your Microsoft 365 tenant

* Ensure that a Microsoft 365 tenant exists for the import data. For more information on setting up a Microsoft 365 tenancy for Teams, see [prepare your Microsoft 365 tenant](../../concepts/build-and-test/prepare-your-o365-tenant.md).
* Make sure that team members are in Microsoft Entra ID (Entra ID). For more information, see [add a new user](/azure/active-directory/fundamentals/add-users-azure-active-directory) to Entra ID.

## Import historical messages into Teams

You can import historical messages seamlessly into both existing and newly created channels or chats by performing the following steps:

1. [Start migration](#step-1-start-migration)
1. [Check migration status](#step-2-check-migration-status)
1. [Import messages](#step-3-import-messages)
1. [Complete migration mode](#step-4-complete-migration-mode)
1. [Verify migration mode completion](#step-5-verify-migration-mode-completion)

## Step 1: Start migration

To start migrating a user's message history from any third-party platform to Teams, you can either create a new team and standard channel or use an existing channel or chat. Depending on your scenario, choose either of the following options:

* [Create a team and standard channel in migration mode](#create-a-team-and-standard-channel-in-migration-mode)
* [Start migration on existing channels and chats](#start-migration-on-existing-channels-and-chats)

### Create a team and standard channel in migration mode

In this scenario, create a new team and standard channel under it in migration mode to proceed with importing existing messages. Migration mode is supported only for standard channels.

#### Create a new team

* [Create a new team](/graph/api/team-post?view=graph-rest-beta&tabs=http&preserve-view=true) with a back-in-time timestamp using the `createdDateTime` property.
* Place the new team in migration mode by setting `teamCreationMode` to `migration`.

> [!NOTE]
> The `createdDateTime` field is only populated for migrated teams or channels. If you update `createdDateTime` to a past timestamp, you can't move it to a future timestamp again.
> Migration mode ensures that the original message timestamps are preserved, and prevents new messages from being sent when the migration is in progress.

##### Request (create a team in migration mode)

```HTTP
POST https://graph.microsoft.com/v1.0/teams
Content-Type: application/json

{
  "@microsoft.graph.teamCreationMode": "migration",
  "template@odata.bind": "https://graph.microsoft.com/v1.0/teamsTemplates('standard')",
  "displayName": "My Sample Team",
  "description": "My Sample Team’s Description",
  "createdDateTime": "2020-03-14T11:22:17.043Z"
}
```

##### Response

```HTTP
HTTP/1.1 202 Accepted
Location: /teams/{team-id}/operations/{operation-id}
Content-Location: /teams/{team-id}
```

##### Error message

```HTTP
400 Bad Request
```

You can receive the error message in the following scenarios:

* If `createdDateTime` is set for future.
* If `createdDateTime` is correctly specified, but `teamCreationMode` instance attribute is missing or set to invalid value.

#### Create a new channel

* [Create a new channel](/graph/api/channel-post?view=graph-rest-1.0&viewFallbackFrom=graph-rest-v1.0&tabs=http&preserve-view=true) with a back-in-time timestamp using the `createdDateTime` property of the channel resource.
* Place the new channel in migration mode by setting `channelCreationMode` to `migration`.

#### Request (create a channel in migration mode)

```HTTP
POST https://graph.microsoft.com/v1.0/teams/{team-id}/channels
Content-Type: application/json

{
  "@microsoft.graph.channelCreationMode": "migration",
  "displayName": "Architecture Discussion",
  "description": "This channel is where we debate all future architecture plans",
  "membershipType": "standard",
  "createdDateTime": "2020-03-14T11:22:17.047Z"
}
```

#### Response

```HTTP
HTTP/1.1 202 Accepted

{
   "@odata.context":"https://graph.microsoft.com/v1.0/$metadata#teams('team-id')/channels/$entity",
   "id":"id-value",
   "createdDateTime":null,
   "displayName":"Architecture Discussion",
   "description":"This channel is where we debate all future architecture plans",
   "isFavoriteByDefault":null,
   "email":null,
   "webUrl":null,
   "membershipType":null,
   "moderationSettings":null
}
```

#### Error message

```HTTP
400 Bad Request
```

You can receive the error message in the following scenarios:

* If `createdDateTime` is set for future.
* If `createdDateTime` is correctly specified but `channelCreationMode` instance attribute is missing or set to invalid value.

After you create a new team and standard channel, complete migration with the following steps:

1. [Check migration status](#step-2-check-migration-status)
1. [Import messages](#step-3-import-messages)
1. [Complete migration mode](#step-4-complete-migration-mode)
1. [Verify migration mode completion](#step-5-verify-migration-mode-completion)

### Start migration on existing channels and chats

On existing channels or chats, use the `startMigration` API to [enable migration mode](/graph/api/channel-startmigration?view=graph-rest-beta&branch=pr-en-us-26836&preserve-view=true ). `startMigration` sets the migration state to `InProgress` and begins the message import process. For more information, see:

* [Existing channel migration](#existing-channel-migration)
* [Existing chat migration](#existing-chat-migration)

#### Existing channel migration

To enable migration mode on existing channels, use the `startMigration` API.

##### Request (existing channel in migration mode)

```HTTP
POST https://graph.microsoft.com/beta/teams/{team-id}/channels/{channel-id}/startMigration
{
  "conversationCreationDateTime": "2024-01-01T00:00:00Z"
}
```

> [!TIP]
> Microsoft Graph uses `DateTimeOffset` to represent date and time with a UTC offset for an accurate time zone.
>The `conversationCreationDateTime` value must be greater than the minimum value for `DateTimeOffset` and less than the current value of the channel's `createdDateTime`.

##### Response

If the request is successful, the method returns an empty HTTP response.

```http
HTTP/1.1 204 No Content
```

##### Example

```HTTP
POST https://graph.microsoft.com/beta/teams/57fb72d0-d811-46f4-8947-305e6072eaa5/channels/19:4b6bed8d24574f6a9e436813cb2617d8@thread.tacv2/startMigration
{
“conversationCreationDateTime”: “2024-01-01T00:00:00Z”
}

```

#### Existing chat migration

To enable migration mode on existing chats, use the `startMigration` API.

##### Request (existing chat in migration mode)

```HTTP
POST https://graph.microsoft.com/beta/chats/{chat-id}/startMigration
{
  "conversationCreationDateTime": "2024-01-01T00:00:00Z"
}
```

> [!TIP]
> Microsoft Graph uses `DateTimeOffset` to represent date and time with a UTC offset for an accurate time zone.
>The `conversationCreationDateTime` must be greater than the minimum value for `DateTimeOffset` and less than the current value of the chat's `createdDateTime`.

##### Response

If the request is successful, the method returns an empty HTTP response.

```http
HTTP/1.1 204 No Content
```

##### Example

```HTTP
POST https://graph.microsoft.com/beta/teams/57fb72d0-d811-46f4-8947-305e6072eaa5/chats/19:4b6bed8d24574f6a9e436813cb2617d8@thread.tacv2/startMigration 

{ 
“conversationCreationDateTime”: “2024-01-01T00:00:00Z” 
} 

```

Consider the following important points:

* Define a minimum timestamp for messages to migrate. The provided timestamp must be older than the channel or chat's current `createdDateTime`. This timestamp replaces the existing `createdDateTime` of the channel. If you update `createdDateTime` to a past timestamp, you can't move it to a future timestamp again.
* The `creationDateTime` property is optional in a request body. If omitted, the `startMigration` API uses the current date and time as the minimum timestamp.
* The `startMigration` API starts the message migration process by setting the migration mode to `InProgress` for a specified channel or chat.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Step+5%3A+Add+team+members&&author=%40AkJo&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fgraph-api%2Fimport-messages%2Fimport-external-messages-to-teams%23step-five-add-team-members&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fgraph-api%2Fimport-messages%2Fimport-external-messages-to-teams.md&documentVersionIndependentId=ce77e760-90cf-e6b1-3cec-ae55ee50c33e&platformId=c9cc8ad3-6c28-7c8c-af03-219bbefa1d38&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Step 2: Check migration status

Call `Get channel` or `Get chat` to confirm that the `migrationMode` state is set to `InProgress`. For more information, see:

* [Get channel](/graph/api/channel-get?view=graph-rest-1.0&tabs=http&preserve-view=true)
* [Get chat](/graph/api/chat-get?view=graph-rest-1.0&tabs=http&preserve-view=true)

## Step 3: Import messages

Now you can import back-in-time messages by including the `createdDateTime` and `from` keys in the request body.

> [!NOTE]
>
> * The API doesn't support messages imported with a creation date and time earlier than the `createdDateTime` for the message thread.
> * `createdDateTime` must be unique across messages in the same thread.
> * `createdDateTime` supports timestamps with milliseconds precision. For example, if the incoming request message has `createdDateTime` set to *2020-09-16T05:50:31.0025302Z*, the API converts it to *2020-09-16T05:50:31.002Z* when ingesting the message.

### Request (POST message that is text-only)

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

### Response

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

### Error message

You receive the following error message if you set the `createdDateTime` property to a future date and time.

```http
400 Bad Request
```

#### Request (POST message with an inline image)

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

### Response

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

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Step+5%3A+Add+team+members&&author=%40AkJo&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fgraph-api%2Fimport-messages%2Fimport-external-messages-to-teams%23step-five-add-team-members&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fgraph-api%2Fimport-messages%2Fimport-external-messages-to-teams.md&documentVersionIndependentId=ce77e760-90cf-e6b1-3cec-ae55ee50c33e&platformId=c9cc8ad3-6c28-7c8c-af03-219bbefa1d38&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Step 4: Complete migration mode

Use the `completeMigration` API to finish the migration process for new and existing channels and chats. For more information, see:

* [Complete new team and channel migration](#complete-new-team-and-channel-migration)
* [Complete existing channel or chat migration](#complete-existing-channel-or-chat-migration)

### Complete new team and channel migration

Use the `completeMigration` API to [complete migration for the new team and channel](/graph/api/chat-completemigration?view=graph-rest-beta&viewFallbackFrom=graph-rest-1.0&branch=pr-en-us-26836&preserve-view=true ). This action opens the team and channel resources for general use by team members. The action is bound to the `team` instance. Before you complete the team message migration, you must complete migration on all channels.

#### Request (end channel migration mode)

```http
POST https://graph.microsoft.com/beta/teams/team-id/channels/channel-id/completeMigration
```

#### Response

```http
HTTP/1.1 204 NoContent
```

#### Request (end team migration mode)

```http
POST https://graph.microsoft.com/beta/teams/team-id/completeMigration
```

#### Response

```http
HTTP/1.1 204 NoContent
```

### Add team members

After completing migration of external messages, you can add a single member to a team by using the [Teams UI](https://support.microsoft.com/en-us/office/add-members-to-a-team-in-microsoft-teams-aff2249d-b456-4bc3-81e7-52327b6b38e9&preserve-view=true ). You can also use Microsoft Graph to [add single member](/graph/api/team-post-members?view=graph-rest-1.0&branch=pr-en-us-26836&tabs=http&preserve-view=true ) or [add members in bulk](/graph/api/conversationmembers-add?view=graph-rest-1.0&tabs=http&preserve-view=true ).

#### Request (add member)

```http
POST https://graph.microsoft.com/beta/teams/{team-id}/members
Content-type: application/json
Content-length: 30

{
   "@odata.type": "#microsoft.graph.aadUserConversationMember",
   "roles": [],
   "user@odata.bind": "https://graph.microsoft.com/beta/users/{user-id}"
}
```

#### Response

```http
HTTP/1.1 204 No Content
```

Once you complete new team and channel migration, [verify migration mode completion](#step-5-verify-migration-mode-completion).

### Complete existing channel or chat migration

For existing channels or chats already in migration mode, use the `completeMigration` API to [mark the migration state as completed](/graph/api/channel-completemigration?view=graph-rest-beta&branch=pr-en-us-26836&tabs=http&preserve-view=true ). This process ensures that the channel or chat remains permanently available instead of being dropped after migration.

#### Request (complete existing channel migration)

```HTTP
POST https://graph.microsoft.com/beta/teams/{team-id}/channels/{channel-id}/completeMigration
 
```

#### Response

```http
HTTP/1.1 204 NoContent
```

#### Request (complete existing chat migration)

```HTTP
POST https://graph.microsoft.com/beta/chats/{chat-id}/completeMigration 
```

#### Response

```http
HTTP/1.1 204 NoContent
```

## Step 5: Verify migration mode completion

Call [Get channel](/graph/api/channel-get?view=graph-rest-1.0&tabs=http&preserve-view=true) or
[Get chat](/graph/api/chat-get?view=graph-rest-1.0&tabs=http&preserve-view=true) to verify that the `migrationMode` is marked as `Completed`.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Step+5%3A+Add+team+members&&author=%40AkJo&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fgraph-api%2Fimport-messages%2Fimport-external-messages-to-teams%23step-five-add-team-members&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fgraph-api%2Fimport-messages%2Fimport-external-messages-to-teams.md&documentVersionIndependentId=ce77e760-90cf-e6b1-3cec-ae55ee50c33e&platformId=c9cc8ad3-6c28-7c8c-af03-219bbefa1d38&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Tips and additional information

<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD026 -->

* After calling `completeMigration` on an existing channel or chat, you can continue importing messages by using the `startMigration` API.

* You can only add team members to the new Teams after the `completeMigration` request returns a successful response. This rule applies only to the newly created team and standard channel.

* Throttling: Messages import at five RPS per channel.

* If you need to correct the migration results, you must delete the Teams, repeat the steps to create the Teams and channel, and re-migrate the messages.

> [!NOTE]
> Inline images are the only type of media supported by the import message API schema.

## Code sample

| Sample name | Description | Node.js | C# | Python |
| --- | --- | --- | --- | --- |
| Graph chat migration | This sample app can be used to migrate historical messages from external platforms to Teams. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/graph-chat-migration/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/graph-chat-migration/csharp) | NA |

## See also

* [Microsoft Graph and Teams integration](/graph/teams-concept-overview)
* [Export content with the Microsoft Teams Export APIs](/microsoftteams/export-teams-content)
* [Microsoft Teams service limits](/graph/throttling-limits#microsoft-teams-service-limits)
* [Licensing and payment requirements for the Microsoft Teams API](/graph/teams-licenses)
