---
title: Use Microsoft Graph to import external platform messages to Teams
description: Describes how to use Microsoft Graph to import messages from an external platform to Teams.
ms.localizationpriority: high
author: "akjo"
ms.topic: Overview
ms.date: 09/02/2022
---

# Import third-party platform messages to Teams using Microsoft Graph

With Microsoft Graph, you can migrate users' existing message history and data from an external system into a Teams channel. By enabling the recreation of a third-party platform messaging hierarchy inside Teams, users can continue their communications in a seamless manner and proceed without interruption.

> [!NOTE]
> In the future, Microsoft may require you or your customers to pay additional fees based on the amount of data imported.

## Import overview

At a high level, the import process consists of the following:

1. [Create a team with a back-in-time timestamp](#step-1-create-a-team).
1. [Create a channel with a back-in-time timestamp](#step-2-create-a-channel).
1. [Import external back-in-time dated messages](#step-3-import-messages).
1. [Complete the team and channel migration process](#step-4-complete-migration-mode).
1. [Add team members](#step-five-add-team-members).

## Prerequisites

### Analyze and prepare message data

* Review the third-party data to decide what will be migrated.  
* Extract the selected data from the third-party chat system.  
* Map the third-party chat structure to the Teams structure.  
* Convert import data into format needed for migration.  

### Set up your Microsoft 365 tenant

* Ensure that a Microsoft 365 tenant exists for the import data. For more information on setting up a Microsoft 365 tenancy for Teams, see [prepare your Microsoft 365 tenant](../../concepts/build-and-test/prepare-your-o365-tenant.md).
* Make sure that team members are in Azure Active Directory. For more information, see [add a new user](/azure/active-directory/fundamentals/add-users-azure-active-directory) to Azure AD.

## Step 1: Create a team

Since you're migrating existing data, maintaining the original message timestamps, and preventing messaging activity during the migration process are key to recreating the user's existing message flow in Teams. This is achieved as follows:

> [Create a new team](/graph/api/team-post?view=graph-rest-beta&tabs=http&preserve-view=true) with a back-in-time timestamp using the team resource `createdDateTime` property. Place the new team in `migration mode`, a special state that restricts users from most activities within the team until the migration process is complete. Include the `teamCreationMode` instance attribute with the `migration` value in the POST request to explicitly identify the new team as being created for migration.  

> [!NOTE]
> The `createdDateTime` field will only be populated for instances of a team or channel that have been migrated.

<!-- markdownlint-disable MD001 -->

#### Permission

|ScopeName|DisplayName|Description|Type|Admin Consent?|Entities/APIs covered|
|-|-|-|-|-|-|
|`Teamwork.Migrate.All`|Manage migration to Microsoft Teams|Creating and managing resources for migration to Teams.|**Application-only**|**Yes**|`POST /teams`|

#### Request (create a team in migration state)

```http
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

#### Response

```http
HTTP/1.1 202 Accepted
Location: /teams/{team-id}/operations/{operation-id}
Content-Location: /teams/{team-id}
```

#### Error message

```http
400 Bad Request
```

You can receive the error message in the following scenarios:

* If `createdDateTime` is set for future.
* If `createdDateTime` is correctly specified, but `teamCreationMode` instance attribute is missing or set to invalid value.

## Step 2: Create a channel

Creating a channel for the imported messages is similar to the create team scenario:

> [Create a new channel](/graph/api/channel-post?view=graph-rest-v1.0&tabs=http&preserve-view=true) with a back-in-time timestamp using the channel resource `createdDateTime` property. Place the new channel in `migration mode`, a special state that restricts users from most chat activities within the channel until the migration process is complete. Include the `channelCreationMode` instance attribute with the `migration` value in the POST request to explicitly identify the new team as being created for migration.  
<!-- markdownlint-disable MD024 -->
#### Permission

|ScopeName|DisplayName|Description|Type|Admin Consent?|Entities/APIs covered|
|-|-|-|-|-|-|
|`Teamwork.Migrate.All`|Manage migration to Microsoft Teams|Creating and managing resources for migration to Teams.|**Application-only**|**Yes**|`POST /teams`|

#### Request (create a channel in migration state)

```http
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

```http
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

```http
400 Bad Request
```

You can receive the error message in the following scenarios:

* If `createdDateTime` is set for future.
* If `createdDateTime` is correctly specified but `channelCreationMode` instance attribute is missing or set to invalid value.

## Step 3: Import messages

After the team and channel have been created, you can begin sending back-in-time messages using the `createdDateTime`  and `from` keys in the request body.

> [!NOTE]
>
> * Messages imported with `createdDateTime` earlier than the message thread `createdDateTime` is not supported.
> * `createdDateTime` must be unique across messages in the same thread.
> * `createdDateTime` supports timestamps with milliseconds precision. For example, if the incoming request message has the value of `createdDateTime` set as *2020-09-16T05:50:31.0025302Z*, then it would be converted to *2020-09-16T05:50:31.002Z* when the message is ingested.

#### Request (POST message that is text-only)

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

## Step 4: Complete migration mode

After the message migration process has completed, both the team and channel are taken out of migration mode using the  `completeMigration` method. This step opens the team and channel resources for general use by team members. The action is bound to the `team` instance. Before the team completes, all channels must be completed out of migration mode.

#### Request (end channel migration mode)

```http
POST https://graph.microsoft.com/v1.0/teams/team-id/channels/channel-id/completeMigration
```

#### Response

```http
HTTP/1.1 204 NoContent
```

#### Request (end team migration mode)

```http
POST https://graph.microsoft.com/v1.0/teams/team-id/completeMigration
```

#### Response

```http
HTTP/1.1 204 NoContent
```

Action called on a `team` or `channel` that isn't in `migrationMode`.

## Step five: Add team members

You can add a member to a team [using the Teams UI](https://support.microsoft.com/office/add-members-to-a-team-in-teams-aff2249d-b456-4bc3-81e7-52327b6b38e9) or Microsoft Graph [add member](/graph/api/group-post-members?view=graph-rest-beta&tabs=http&preserve-view=true) API:

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

## Tips and additional information

<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD026 -->

* After the `completeMigration` request is made, you can't import further messages into the team.

* You can only add team members to the new team after the `completeMigration` request has returned a successful response.

* Throttling: Messages import at five RPS per channel.

* If you need to make a correction to the migration results, you must delete the team, repeat the steps to create the team and channel and re-migrate the messages.

> [!NOTE]
> Currently, inline images are the only type of media supported by the import message API schema.

##### Import content scope

The following table provides the content scope:

|In-scope | Currently out-of-scope|
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
