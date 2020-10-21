---
title: Use Microsoft Graph to import external platform messages to Teams 
description: Describes how to use Microsoft Graph to import messages from an external platform to Teams
localization_priority:  Normal
author: laujan 
ms.author: lajanuar
ms.topic: Overview
keywords: teams import messages api graph microsoft migrate migration post
---

# Import third-party platform messages to Teams using Microsoft Graph

>[!IMPORTANT]
> Microsoft Graph and Microsoft Teams public previews are available for early-access and feedback. Although this release has undergone extensive testing, it is not intended for use in production.

With Microsoft Graph, you can migrate users' existing message history and data from an external system into a Teams channel. By enabling the recreation of a third-party platform messaging hierarchy inside Teams, users can continue their communications in a seamless manner and proceed without interruption.

## Import overview

At a high level, the import process consists of the following:

1. [Create a team with a back-in-time timestamp](#step-one-create-a-team)
1. [Create a channel with a back-in-time timestamp](#step-two-create-a-channel)  
1. [Import external back-in-time dated messages](#step-three-import-messages)
1. [Complete the team and channel migration process](#step-four-complete-migration-mode)
1. [Add team members](#step-five-add-team-members)

## Necessary requirements

### Analyze and prepare message data

✔ Review the third-party data to decide what will be migrated.  
✔ Extract the selected data from the third-party chat system.  
✔ Map the third-party chat structure to the Teams structure.  
✔ Convert import data into format needed for migration.  

### Set up your Office 365 tenant

✔ Ensure that an Office 365 tenant exists for the import data. For more information on setting up an Office 365 tenancy for Teams, *see*, [Prepare your Office 365 tenant](../../concepts/build-and-test/prepare-your-o365-tenant.md).  
✔ Make sure that team members are in Azure Active Directory (AAD).  For more information *see* [Add a new user](/azure/active-directory/fundamentals/add-users-azure-active-directory) to Azure Active Directory.

## Step One: Create a team

Since existing data is being migrated, maintaining the original message timestamps and preventing messaging activity during the migration process are key to recreating the user's existing message flow in Teams. This is achieved as follows:

> [Create a new team](/graph/api/team-post?view=graph-rest-beta&tabs=http&preserve-view=true) with a back-in-time timestamp using the team resource  `createdDateTime`  property. Place the new team in `migration mode`, a special state that bars users from most activities within the team until the migration process is complete. Include the `teamCreationMode` instance attribute with the `migration` value in the POST request to explicitly identify the new team as being created for migration.  

> **NOTE**:  The `createdDateTime` field will only be populated for instances of a team or channel that have been migrated.

<!-- markdownlint-disable MD001 -->

#### Permissions

|ScopeName|DisplayName|Description|Type|Admin Consent?|Entities/APIs covered|
|-|-|-|-|-|-|
|`Teamwork.Migrate.All`|Manage migration to Microsoft Teams|Creating, managing resources for migration to Microsoft Teams|**Application-only**|**Yes**|`POST /teams`|

#### Request (create a team in migration state)

```http
POST https://graph.microsoft.com/beta/teams

Content-Type: application/json
{
  "@microsoft.graph.teamCreationMode": "migration",
  "template@odata.bind": "https://graph.microsoft.com/beta/teamsTemplates('standard')",
  "displayName": "My Sample Team",
  "description": "My Sample Team’s Description"
  "createdDateTime": "2020-03-14T11:22:17.043Z"
}
```

#### Response

```http
HTTP/1.1 202 Accepted
Location: /teams/{teamId}/operations/{operationId}
Content-Location: /teams/{teamId}
```

#### Error messages

```http
400 Bad Request
```

* `createdDateTime`  set for future.
* `createdDateTime`  correctly specified, but `teamCreationMode`  instance attribute  is missing or set to invalid value.

## Step Two: Create a channel

Creating a channel for the imported messages is similar to the create team scenario:

> [Create a new channel](/graph/api/channel-post?view=graph-rest-beta&tabs=http&preserve-view=true) with a back-in-time timestamp using the channel resource `createdDateTime` property. Place the new channel in `migration mode`, a special state that bars users from most chat activities within the channel until the migration process is complete.  Include the `channelCreationMode` instance attribute with the `migration` value in the POST request to explicitly identify the new team as being created for migration.  
<!-- markdownlint-disable MD024 -->
#### Permissions

|ScopeName|DisplayName|Description|Type|Admin Consent?|Entities/APIs covered|
|-|-|-|-|-|-|
|`Teamwork.Migrate.All`|Manage migration to Microsoft Teams|Creating, managing resources for migration to Microsoft Teams|**Application-only**|**Yes**|`POST /teams`|

#### Request (create a channel in migration state)

```http
POST https://graph.microsoft.com/beta/teams/{id}/channels

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
   "@odata.context":"https://canary.graph.microsoft.com/testprodbetateamsgraphsvcncus/$metadata#teams('9cc6d6ab-07d8-4d14-bc2b-7db8995d6d23')/channels/$entity",
   "id":"19:e90f6814ce674072a4126206e7de485e@thread.tacv2",
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

* `createdDateTime`  set for future.
* `createdDateTime`  correctly specified but `channelCreationMode`  instance attribute  is missing or set to invalid value.

## Step Three: Import messages

After the team and channel have been created, you can begin sending back-in-time messages using the `createdDateTime`  and `from`  keys in the request body. **NOTE**: messages imported with `createdDateTime` earlier than the message thread `createdDateTime` is not supported.

> [!NOTE]
> createdDateTime must be unique across messages in the same thread.

#### Request (POST message that is text-only)

```http
POST https://graph.microsoft.com/beta/teams/teamId/channels/channelId/messages

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
   "@odata.context":"https://graph.microsoft.com/beta/$metadata#teams('teamId')/channels('channelId')/messages/$entity",
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

#### Error messages

```http
400 Bad Request
```

#### Request (POST a message with inline image)

> **Note**: There are no special permission scopes in this scenario since the request is part of chatMessage; scopes for chatMessage apply here as well.

```http
POST https://graph.microsoft.com/beta/teams/teamId/channels/channelId/messages

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
    "@odata.context": "https://graph.microsoft.com/beta/$metadata#teams('teamId')/channels('channelId')/messages/$entity",
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

## Step Four: Complete migration mode

Once the message migration process has completed, both the team and channel are taken out of migration mode using the  `completeMigration`  method. This step opens the team and channel resources for general use by team members. The action is bound to the `team` instance.

#### Request (end team migration mode)

```http
POST https://graph.microsoft.com/beta/teams/teamId/completeMigration

```

#### Response

```http
HTTP/1.1 204 NoContent
```

#### Request (end channel migration mode)

```http
POST https://graph.microsoft.com/beta/teams/teamId/channels/channelId/completeMigration

```

#### Response

```http
HTTP/1.1 204 NoContent
```

#### Error response

```http
400 Bad Request
```

* Action called on a `team` or `channel` that is not in `migrationMode`.

## Step Five: Add team members

You can add a member to a team [using the Teams UI](https://support.microsoft.com/office/add-members-to-a-team-in-teams-aff2249d-b456-4bc3-81e7-52327b6b38e9) or Microsoft Graph [Add member](/graph/api/group-post-members?view=graph-rest-beta&tabs=http&preserve-view=true) API:

#### Request (add member)

```http
POST https://graph.microsoft.com/beta/teams/{id}/members
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

* You can import messages from users who are not in Teams. **NOTE**: Messages imported for users not present in the tenant will not be searchable in the Teams client or compliance portals during Public Preview.

* Once the `completeMigration` request is made, you cannot import further messages into the team.

* Team members can only be added to the new team after the `completeMigration` request has returned a successful response.

* Throttling: Messages import at 5 RPS per channel.

* If you need to make a correction to the migration results, you need to delete the team and repeat the steps to create the team and channel and re-migrate the messages.

> [!NOTE]
> Currently, inline images are the only type of media supported by the import message API schema.

##### Import content scope

|In-scope | Currently out-of-scope|
|----------|--------------------------|
|Team and channel messages|1:1 and group chat messages|
|Created time of the original message|Private channels|
|Inline images as part of the message|At mentions|
|Links to existing files in SPO/OneDrive|Reactions|
|Messages with rich text|Videos|
|Message reply chain|Announcements|
|High throughput processing|Code snippets|
||Adaptive cards|
||Stickers|
||Emojis|
||Quotes|
||Cross posts between channels|

> [!div class="nextstepaction"]
>[Learn more about Microsoft Graph and Teams integration](/graph/teams-concept-overview)
