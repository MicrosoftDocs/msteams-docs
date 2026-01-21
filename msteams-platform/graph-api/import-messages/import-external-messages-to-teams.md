---
title: Import Messages from Third-Party Platforms to Teams via Microsoft Graph
description: Discover how to utilize Microsoft Graph for importing message histories and data from any third-party platform into Teams.
ms.localizationpriority: high
author: "vikasalmal"
ms.topic: overview
ms.owner: mehakagarwal
ms.date: 12/17/2025
---

# Import Messages from Third-Party Platforms to Teams via Microsoft Graph

Microsoft Graph allows you to transfer users' existing message histories and data from an external system into Teams. This enables users to continue their communications seamlessly, without any disruptions, by replicating the messaging hierarchy of a third-party platform within Teams.

## Permissions

| Scope name | Display name | Description | Type | Admin consent required | Entities/APIs covered |
|------------|--------------|-------------|------|------------------------|-----------------------|
| Teamwork.Migrate.All  | [Manage migration to Microsoft Teams](/graph/permissions-reference#teamworkmigrateall)| Creating and managing resources for migration to Teams. | **Application-only** | Yes            | POST /team             |

> [!NOTE]
> Delegated authentication is not supported.

## Supported Channel and Chat Types

Teams facilitates the migration of external messages to the following channel and chat types:

* **New team and standard channel**: Establish a new team and its standard channels in migration mode to import content. This method allows you to import the exact structure of your external system into the new channel. To activate `migrationMode` for a new standard team and channel, refer to [Create a team and standard channel in migration mode](#create-a-team-and-standard-channel-in-migration-mode).

* **Existing channel or chat**: Utilize any channel or chat that already exists in Teams, regardless of its creation date. This method allows you to add existing context to channels that are already active in Teams, maintaining continuity for ongoing conversations. To activate migration mode in an existing channel or chat, refer to [Existing channel migration](#existing-channel-migration).

> [!NOTE]
>
> * Only standard channels are supported when creating a channel in migration mode from scratch.
> * Federated content cannot be imported. All imported content must originate from the authenticated tenant, and only one app can manage a thread at a time. Another app can import content only after the first app completes migration.

`migrationMode` is a unique state that ensures data integrity by preventing the following operations during data migration:

* For new teams and standard channels:
  * It restricts the receipt of new messages.
  * It prevents adding or removing members.
* For all supported channels and chat types:
  * It allows importing historical messages with custom timestamps.
  * It maintains the original conversation structure and hierarchy.

## Content Scope for Import

The table below outlines the content scope for existing channels and chats:

| In-scope | Out-of-scope |
|----------|--------------|
| Team (general) | Announcements |
| Created time of the original message | Videos |
| Inline images as part of the message | Code snippets |
| Links to existing files in Microsoft 365 SharePoint Online (SPO) or OneDrive (OD) | Stickers |
| Messages with rich text | Cross posts between channels |
| Message reply chain | Quotes |
| High throughput processing | |
| 1:1 and group chat messages | |
| Standard, private, and shared channel messages | |
| Up to 250 reactions | |
| @mentions and emojis | |

## Prerequisites

### Analyze and Prepare Message Data

* Review the third-party data to determine what to migrate.
* Extract the selected data from the third-party chat system.
* Map the third-party chat structure to the Teams structure.
* Convert import data into the format required for migration.

### Set Up Your Microsoft 365 Tenant

* Ensure that a Microsoft 365 tenant exists for the import data. For more information on setting up a Microsoft 365 tenancy for Teams, see [prepare your Microsoft 365 tenant](../../concepts/build-and-test/prepare-your-o365-tenant.md).
* Ensure that team members are in Microsoft Entra ID. For more information, see [add a new user](/azure/active-directory/fundamentals/add-users-azure-active-directory) to Microsoft Entra ID.

## Import Historical Messages into Teams

You can import historical messages seamlessly into both existing and newly created channels or chats by performing the following steps:

1. [Start migration](#step-1-start-migration)
2. [Check migration status](#step-2-check-migration-status)
3. [Import messages](#step-3-import-messages)
4. [Complete migration mode](#step-4-complete-migration-mode)
5. [Verify migration mode completion](#step-5-verify-migration-mode-completion)

## Step 1: Start Migration

To begin migrating a user's message history from any third-party platform to Teams, you can either create a new team and standard channel or use an existing channel or chat. Depending on your scenario, choose one of the following options:

* [Create a team and standard channel in migration mode](#create-a-team-and-standard-channel-in-migration-mode)
* [Start migration on existing channels and chats](#start-migration-on-existing-channels-and-chats)

### Create a Team and Standard Channel in Migration Mode

In this scenario, create a new team and standard channel in `migrationMode` to proceed with importing existing messages. `migrationMode` is supported only for standard channels.

#### Create a New Team

* [Create a new team](/graph/api/team-post?view=graph-rest-beta&tabs=http&preserve-view=true) with a back-in-time timestamp using the `createdDateTime` property.
* Place the new team in `migrationMode` by setting `teamCreationMode` to `migration`.

> [!NOTE]
> The `createdDateTime` field is only populated for migrated teams or channels. If you update `createdDateTime` to a past timestamp, you cannot move it to a future timestamp again. `migrationMode` ensures that the original message timestamps are preserved and prevents new messages from being sent when the migration is in progress.

##### Request (Create a Team in Migration Mode)

```HTTP
POST https://graph.microsoft.com/v1.0/teams
Content-Type:application/json

{
  "@microsoft.graph.teamCreationMode":"migration",
  "template@odata.bind":"https://graph.microsoft.com/v1.0/teamsTemplates('standard')",
  "displayName":"My Sample Team",
  "description":"My Sample Team’s Description",
  "createdDateTime":"2020-03-14T11:22:17.043Z"
}
```

##### Response

```HTTP
HTTP/1.1 202 Accepted
Location: /teams/{team-id}/operations/{operation-id}
Content-Location: /teams/{team-id}
```

##### Error Message

```HTTP
400 Bad Request
```

You may receive the error message in the following scenarios:

* If `createdDateTime` is set for the future.
* If `createdDateTime` is correctly specified, but `teamCreationMode` instance attribute is missing or set to an invalid value.

#### Create a New Channel

* [Create a new channel](/graph/api/channel-post?view=graph-rest-1.0&viewFallbackFrom=graph-rest-v1.0&tabs=http&preserve-view=true) with a back-in-time timestamp using the `createdDateTime` property of the channel resource.
* Place the new channel in migration mode by setting `channelCreationMode` to `migration`.

#### Request (Create a Channel in Migration Mode)

```HTTP
POST https://graph.microsoft.com/v1.0/teams/{team-id}/channels
Content-Type: application/json

{
  "@microsoft.graph.channelCreationMode":"migration",
  "displayName":"Architecture Discussion",
  "description":"This channel is where we debate all future architecture plans",
  "membershipType":"standard",
  "createdDateTime":"2020-03-14T11:22:17.047Z"
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

#### Error Message

```HTTP
400 Bad Request
```

You may receive the error message in the following scenarios:

* If `createdDateTime` is set for the future.
* If `createdDateTime` is correctly specified but `channelCreationMode` instance attribute is missing or set to an invalid value.

After creating a new team and standard channel, complete migration with the following steps:

1. [Check migration status](#step-2-check-migration-status)
2. [Import messages](#step-3-import-messages)
3. [Complete migration mode](#step-4-complete-migration-mode)
4. [Verify migration mode completion](#step-5-verify-migration-mode-completion)

### Start Migration on Existing Channels and Chats

On existing channels or chats, use the `startMigration` API to [enable channel migration mode](/graph/api/channel-startmigration?view=graph-rest-beta&preserve-view=true) or to [enable chat migration mode](/graph/api/chat-startmigration?view=graph-rest-beta&preserve-view=true). `startMigration` sets the migration state to `InProgress` and begins the message import process. For more information, see:

* [Existing channel migration](#existing-channel-migration)
* [Existing chat migration](#existing-chat-migration)

#### Existing Channel Migration

To enable migration mode on existing channels, use the `startMigration` API.

##### Request (Existing Channel in Migration Mode)

```HTTP
POST https://graph.microsoft.com/beta/teams/{team-id}/channels/{channel-id}/startMigration
{
  "conversationCreationDateTime":"2024-01-01T00:00:00Z"
}
```

> [!TIP]
> Microsoft Graph uses `DateTimeOffset` to represent date and time with a UTC offset for an accurate time zone. The `conversationCreationDateTime` value must be greater than the minimum value for `DateTimeOffset` and less than the current value of the channel's `createdDateTime`.

##### Response

If the request is successful, the method returns an empty HTTP response.

```http
HTTP/1.1 204 No Content
```

##### Example

```HTTP
POST https://graph.microsoft.com/beta/teams/57fb72d0-d811-46f4-8947-305e6072eaa5/channels/19:4b6bed8d24574f6a9e436813cb2617d8@thread.tacv2/startMigration
{
  "conversationCreationDateTime":"2024-01-01T00:00:00Z"
}
```

#### Existing Chat Migration

To enable migration mode on existing chats, use the `startMigration` API.

##### Request (Existing Chat in Migration Mode)

```HTTP
POST https://graph.microsoft.com/beta/chats/{chat-id}/startMigration
{
  "conversationCreationDateTime":"2024-01-01T00:00:00Z"
}
```

> [!TIP]
> Microsoft Graph uses `DateTimeOffset` to represent date and time with a UTC offset for an accurate time zone. The `conversationCreationDateTime` must be greater than the minimum value for `DateTimeOffset` and less than the current value of the chat's `createdDateTime`.

##### Response

If the request is successful, the method returns an empty HTTP response.

```http
HTTP/1.1 204 No Content
```

##### Example

```HTTP
POST https://graph.microsoft.com/beta/teams/57fb72d0-d811-46f4-8947-305e6072eaa5/chats/19:4b6bed8d24574f6a9e436813cb2617d8@thread.tacv2/startMigration 

{ 
  "conversationCreationDateTime":"2024-01-01T00:00:00Z" 
} 
```

Consider the following important points:

* Define a minimum timestamp for messages to migrate. The provided timestamp must be older than the channel or chat's current `createdDateTime`. This timestamp replaces the existing `createdDateTime` of the channel. If you update `createdDateTime` to a past timestamp, you cannot move it to a future timestamp again.
* The `creationDateTime` property is optional in a request body. If omitted, the `startMigration` API uses the current date and time as the minimum timestamp.
* The `startMigration` API starts the message migration process by setting the migration mode to `InProgress` for a specified channel or chat.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Step+5%3A+Add+team+members&&author=%40AkJo&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fgraph-api%2Fimport-messages%2Fimport-external-messages-to-teams%23step-five-add-team-members&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fgraph-api%2Fimport-messages%2Fimport-external-messages-to-teams.md&documentVersionIndependentId=ce77e760-90cf-e6b1-3cec-ae55ee50c33e&platformId=c9cc8ad3-6c28-7c8c-af03-219bbefa1d38&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Step 2: Check Migration Status

Call `Get channel` or `Get chat` to confirm that the `migrationMode` state is set to `InProgress`. For more information, see:

* [Get channel](/graph/api/channel-get?view=graph-rest-1.0&tabs=http&preserve-view=true)
* [Get chat](/graph/api/chat-get?view=graph-rest-1.0&tabs=http&preserve-view=true)

## Step 3: Import Messages

Now you can import back-in-time messages by including the `createdDateTime` and `from` keys in the request body.

> [!NOTE]
>
> * The API does not support messages imported with a creation date and time earlier than the `createdDateTime` for the message thread.
> * `createdDateTime` must be unique across messages in the same thread.
> * `createdDateTime` supports timestamps with milliseconds precision. For example, if the incoming request message has `createdDateTime` set to *2020-09-16T05:50:31.0025302Z*, the API converts it to *2020-09-16T05:50:31.002Z* when ingesting the message.

### Request (POST Message that is Text-Only)

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

### Error Message

You receive the following error message if you set the `createdDateTime` property to a future date and time.

```http
400 Bad Request
```

#### Request (POST Message with an Inline Image)

> [!NOTE]
>
> * There are no special permission scopes in this scenario since the request is part of `chatMessage`.
> * The scopes for `chatMessage` apply here.

```http
POST https://graph.microsoft.com/v1.0/teams/team-id/channels/channel-id/messages

{
  "body": {
        "contentType":"html",
        "content": "<div><div>\n<div><span><img height=\"250\" src=\"../hostedContents/1/$value\" width=\"176.2295081967213\" style=\"vertical-align:bottom; width:176px; height:250px\"></span>\n\n</div>\n\n\n</div>\n</div>"
    },
    "hostedContents":[
        {
            "@microsoft.graph.temporaryId":"1",
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
    "@odata.context":"https://graph.microsoft.com/v1.0/$metadata#teams('team-id')/channels('channel-id')/messages/$entity",
    "id":"id-value",
    "replyToId":null,
    "etag":"id-value",
    "messageType":"message",
    "createdDateTime": "2019-02-04T19:58:15.511Z",
    "lastModifiedDateTime":null,
    "deleted":false,
    "subject":null,
    "summary":null,
    "importance":"normal",
    "locale":"en-us",
    "policyViolation":null,
    "from": {
        "application":null,
        "device":null,
        "conversation":null,
        "user": {
            "id":"id-value",
            "displayName":"John Doe",
            "userIdentityType":"aadUser"
        }
    },
      "body": {
        "contentType":"html",
        "content":"<div><div>\n<div><span><img height=\"250\" src=\"https://graph.microsoft.com/teams/teamId/channels/channelId/messages/id-value/hostedContents/hostedContentId/$value\" width=\"176.2295081967213\" style=\"vertical-align:bottom; width:176px; height:250px\"></span>\n\n</div>\n\n\n</div>\n</div>"
    },
    "attachments":[],
    "mentions":[],
    "reactions":[]
}
```

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Step+5%3A+Add+team+members&&author=%40AkJo&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fgraph-api%2Fimport-messages%2Fimport-external-messages-to-teams%23step-five-add-team-members&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fgraph-api%2Fimport-messages%2Fimport-external-messages-to-teams.md&documentVersionIndependentId=ce77e760-90cf-e6b1-3cec-ae55ee50c33e&platformId=c9cc8ad3-6c28-7c8c-af03-219bbefa1d38&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Step 4: Complete Migration Mode

Use the `completeMigration` API to finish the migration process for new and existing channels and chats. For more information, see:

* [Complete new team and channel migration](#complete-new-team-and-channel-migration)
* [Complete existing channel or chat migration](#complete-existing-channel-or-chat-migration)

### Complete New Team and Channel Migration

Use the `completeMigration` API to [complete migration for the new team and channel](/graph/api/channel-completemigration?view=graph-rest-1.0&tabs=http&preserve-view=true). This action opens the team and channel resources for general use by team members. The action is bound to the `team` instance. Before you complete the team message migration, you must complete migration on all channels.

#### Request (End Channel Migration Mode)

```http
POST https://graph.microsoft.com/beta/teams/team-id/channels/channel-id/completeMigration
```

#### Response

```http
HTTP/1.1 204 NoContent
```

#### Request (End Team Migration Mode)

```http
POST https://graph.microsoft.com/beta/teams/team-id/completeMigration
```

#### Response

```http
HTTP/1.1 204 NoContent
```

### Add Team Members

After completing the migration of external messages, you can add a single member to a team by using the [Teams UI](https://support.microsoft.com/en-us/office/add-members-to-a-team-in-microsoft-teams-aff2249d-b456-4bc3-81e7-52327b6b38e9).

You have the option to utilize Microsoft Graph to [add a single member](/graph/api/team-post-members?view=graph-rest-1.0&branch=pr-en-us-26836&tabs=http&preserve-view=true) or [add multiple members at once](/graph/api/conversationmembers-add?view=graph-rest-1.0&tabs=http&preserve-view=true).

#### Request (add a member)

```http
POST https://graph.microsoft.com/beta/teams/{team-id}/members
Content-type:application/json
Content-length:30

{
   "@odata.type":"#microsoft.graph.aadUserConversationMember",
   "roles":[],
   "user@odata.bind":"https://graph.microsoft.com/beta/users/{user-id}"
}
```

#### Response

```http
HTTP/1.1 204 No Content
```

After you have finalized the migration for new teams and channels, proceed to [verify the completion of migration mode](#step-5-verify-migration-mode-completion).

### Complete Migration for Existing Channels or Chats

For channels or chats that are already in migration mode, employ the `completeMigration` API to [finalize the migration status](/graph/api/channel-completemigration?view=graph-rest-beta&branch=pr-en-us-26836&tabs=http&preserve-view=true). This ensures that the channel or chat remains accessible and is not discarded post-migration.

#### Request (finalize existing channel migration)

```HTTP
POST https://graph.microsoft.com/beta/teams/{team-id}/channels/{channel-id}/completeMigration
 
```

#### Response

```http
HTTP/1.1 204 NoContent
```

#### Request (finalize existing chat migration)

```HTTP
POST https://graph.microsoft.com/beta/chats/{chat-id}/completeMigration 
```

#### Response

```http
HTTP/1.1 204 NoContent
```

#### Optional: Update Group Chat Member History Post-Migration

Upon completing message migration in a group chat, you have the option to update members' shared history using the `visibleHistoryStartDateTime` property in Microsoft Graph. This property determines the earliest point in time from which a chat member can view messages. If imported messages predate the specified value, they will not be visible unless the property is updated.

To modify the `visibleHistoryStartDateTime` property:

1. [Remove the member](/graph/api/chat-delete-members?view=graph-rest-1.0&tabs=http&preserve-view=true) from the chat.
1. [Re-add the member](/graph/api/chat-post-members?view=graph-rest-1.0&tabs=http&preserve-view=true) with a new `visibleHistoryStartDateTime` that encompasses the imported messages.

##### Example

Imagine a situation where the original chat was initiated at 10 PM, updated at 1 AM, messages were imported at 9 AM, and member A’s shared history begins at 10 AM.
To ensure member A can access the 9 AM imported messages:

1. Remove member A from the chat.
1. Re-add member A with the `visibleHistoryStartDateTime` property set to a time before 9 AM.

## Step 5: Verify Migration Mode Completion

Invoke [Get channel](/graph/api/channel-get?view=graph-rest-1.0&tabs=http&preserve-view=true) or
[Get chat](/graph/api/chat-get?view=graph-rest-1.0&tabs=http&preserve-view=true) to confirm that the `migrationMode` is indicated as `Completed`.

> [!div class="nextstepaction"]
> [I encountered an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+encountered+an+issue%5D+Step+5%3A+Add+team+members&&author=%40AkJo&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fgraph-api%2Fimport-messages%2Fimport-external-messages-to-teams%23step-five-add-team-members&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fgraph-api%2Fimport-messages%2Fimport-external-messages-to-teams.md&documentVersionIndependentId=ce77e760-90cf-e6b1-3cec-ae55ee50c33e&platformId=c9cc8ad3-6c28-7c8c-af03-219bbefa1d38&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Tips and Additional Information

<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD026 -->

* After executing `completeMigration` on an existing channel or chat, you can continue to import messages using the `startMigration` API.

* Team members can only be added to new Teams after the `completeMigration` request yields a successful response. This condition applies solely to newly created teams and standard channels.

* Throttling: Messages are imported at a rate of five requests per second per channel.

* If you need to rectify migration outcomes, you must delete the Teams, repeat the steps to create the Teams and channel, and re-import the messages.

> [!NOTE]
> Inline images are the sole type of media supported by the import message API schema.

## Code Sample

| Sample Name | Description | Node.js | C# | Python |
| --- | --- | --- | --- | --- |
| Graph Chat Migration | This sample application can be utilized to migrate historical messages from external platforms to Teams. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/graph-chat-migration/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/graph-chat-migration/csharp) | NA |

## See Also

* [Microsoft Graph and Teams Integration](/graph/teams-concept-overview)
* [Export Content with the Microsoft Teams Export APIs](/microsoftteams/export-teams-content)
* [Microsoft Teams Service Limits](/graph/throttling-limits#microsoft-teams-service-limits)
* [Licensing and Payment Requirements for the Microsoft Teams API](/graph/teams-licenses)