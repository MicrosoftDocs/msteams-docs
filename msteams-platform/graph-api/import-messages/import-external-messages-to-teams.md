---
title: Use Microsoft Graph to import external platform messages to Teams 
description: Describes how to use Microsoft Graph to import messages from an external platform to Teams
localization_priority:  Normal
author: laujan
ms.author: lajanuar
ms.topic: Overview
keywords: teams slack import messages api graph microsoft migrate migration post
---

# Import third-party platform messages to Teams using Microsoft Graph

>[!IMPORTANT]
> Microsoft Graph and Microsoft Teams public previews are available for early-access and feedback. Although this release has undergone extensive testing, it is not intended for use in production.

With Microsoft Graph APIs, you can enable new Teams users to migrate  their existing messaging history and data messages from an external system into a Teams channel and continue communications exactly where they left off.

## Import process

1. [Create a Team with a back-in-time timestamp](#create-a-team)
1. [Create a Channel with a back-in-time timestamp](#create-a-channel)
1.[Complete the team and channel migration process](#complete-migration-process)

## Create a team

Since existing data is being migrated, maintaining the original message timestamps is key to recreating the user's existing message hierarchy in Teams. This is achieved as follows:

✔ [Create a new team](/graph/api/team-post?view=graph-rest-beta&tabs=http) with a timestamp from the past using the team resource  `createdDateTime`  property.  
&emsp; &#11200; Disable Teams logins at the tenant level.  
&emsp; &#11200;  Ensure that all team users have an Azure Active Directory (Azure AD) ID. Messages can be only be imported from Azure AD members.  
&emsp; &#11200; Add team members.

 ✔ Place the new team in `migration mode`, a special state that bars users from most activities within the team until the migration process is complete. Include the `teamCreationMode` instance attribute with the `migration` value in the POST request to explicitly identify the new team as being created for migration.  

Additionally, teams created for migration will have a [teamsAsyncOperation](/graph/api/resources/teamsasyncoperation?view=graph-rest-beta) operation running on them representing that the team is being used for migration.

<!-- markdownlint-disable MD024 -->

### Request

```http
POST https://graph.microsoft.com/beta/teams

Content-Type: application/json
{
  "@microsoft.graph.teamCreationMode": "migration",
  "template@odata.bind": "https://graph.microsoft.com/beta/teamsTemplates('standard')",
  "displayName": "My Sample Team",
  "description": "My Sample Team’s Description"
  "createdDateTime": "2020-03-14T11:22:17.067Z"
}
```

### Response

```http
HTTP/1.1 202 Accepted
Location: /teams/{teamId}/operations/{operationId}
Content-Location: /teams/{teamId}
```

### Error response

```http
400 Bad Request
```

* createdDateTime`  set for future.
* `createdDateTime`  correctly specified but `teamCreationMode`  instance attribute  is missing or set to invalid value.

## Create a channel

Creating a channel for the imported messages is similar to the team scenario: 

✔ [Create a new channel](graph/api/channel-post?view=graph-rest-beta&tabs=http) with a creation timestamp from the past.  

✔ Place the new channel in `migration mode`, a special state that bars users from most chat activities within the channel such as posting and reading messages until the migration process is complete.  Include the `channelCreationMode` instance attribute with the `migration` value in the POST request to explicitly identify the new team as being created for migration.  

### Request

```http
``
POST https://graph.microsoft.com/beta/teams/{id}/channels

Content-Type: application/json
{
  "@microsoft.graph.channelCreationMode": "migration",
  "displayName": "Architecture Discussion",
  "description": "This channel is where we debate all future architecture plans",
  "membershipType": "standard",
  "createdDateTime": "2020-03-14T11:22:17.067Z"
}
```

### Response

```http
HTTP/1.1 202 Accepted
Location: /teams/{teamId}/channels/{channelId}/operations/{operationId}
Content-Location: /teams/{teamId}/channels/{channelId}
```

### Error response

```http
400 Bad Request
```

* createdDateTime`  set for future.
* `createdDateTime`  correctly specified but `channelCreationMode`  instance attribute  is missing or set to invalid value.

## Complete migration process

Once the migration process is complete, both the team and channel are taken out of migration mode using the  `completeMigration`  method to open the resources for general use by team members. The action is bound to the `team` instance.

### Request (team)

```http
``
POST https://graph.microsoft.com/beta/teams/teamId/completeMigration

HTTP/1.1 204 NoContent
```

### Request (channel)

```http
``
POST https://graph.microsoft.com/beta/teams/teamId/channels/channelId/completeMigration

HTTP/1.1 204 NoContent
```


### Error response

```http
400 Bad Request
```

* Action called on a `team` or `channel` that is not in `migrationMode`.

### Import content scope

|In-scope | Currently not in-scope|
|----------|--------------------------|
|Team and channel messages|1:1 and group chat messages|
|Created time of the original message|Private Channels|
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
>[Learn more about Teams and Microsoft Graph integration](/graph/teams-concept-overview)
