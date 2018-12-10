---
title: Handle bot events
description: Describes how to handle events in bots for Microsoft Teams
keywords: teams bots events
ms.date: 11/11/2018
---
# Handle bot events in Microsoft Teams

Microsoft Teams sends notifications to your bot for changes or events that happen in contexts where your bot is active. You can use these events to trigger service logic, such as the following:

* Trigger a welcome message when your bot is added to a team
* Query and cache team information when the bot is added to a team
* Update cached information on team membership or channel information
* Remove cached information for a team if the bot is removed
* When a bot message is liked by a user

Each bot event is sent as an `Activity` object in which `messageType` defines what information is in the object. For messages of type `message`, see [Sending and receiving messages](~/concepts/bots/bot-conversations/bots-conversations).

Teams-specific events, usually triggered off the `conversationUpdate` type, have additional Teams event information passed as part of the `channelData` object, and therefore your event handler must query the `channelData` payload for the Teams `eventType` and additional event-specific metadata.

The following table lists the events that your bot can receive and take action on.

|Type|Payload object|Teams eventType |Description|
|---|---|---|---|
| `conversationUpdate` |`membersAdded`| `teamMemberAdded`|[Bot or team member was added to team](~/concepts/bots/bots-notifications#team-member-or-bot-addition)|
| `conversationUpdate` |`membersRemoved`| `teamMemberRemoved`|[Bot or team member was removed from team](~/concepts/bots/bots-notifications#team-member-or-bot-removed)|
| `conversationUpdate` | |`teamRenamed`| [Team in which bot is member was renamed](~/concepts/bots/bots-notifications#team-name-updates)|
| `conversationUpdate` | |`channelCreated`| In a team where bot is member, [a channel was created](~/concepts/bots/bots-notifications#channel-updates)|
| `conversationUpdate` | |`channelRenamed`| In a team where bot is member, [a channel was renamed](~/concepts/bots/bots-notifications#channel-updates)|
| `conversationUpdate` | |`channelDeleted`| In a team where bot is member, [a channel was deleted](~/concepts/bots/bots-notifications#channel-updates)|
| `messageReaction` |`reactionsAdded`|| [A user adds his or her reaction to a bot message](~/concepts/bots/bots-notifications#reactions)|
| `messageReaction` |`reactionsRemoved`|| [A user removes his or her reaction to a bot message](~/concepts/bots/bots-notifications#reactions)|
| _`contactRelationUpdate`_ | | | This [Bot Framework–provided activity type](https://docs.microsoft.com/en-us/bot-framework/dotnet/bot-builder-dotnet-activities#contactrelationupdate) is not directly supported in Microsoft Teams |
| _`deleteUserData`_ | | | This [Bot Framework–provided activity type](https://docs.microsoft.com/en-us/bot-framework/dotnet/bot-builder-dotnet-activities#deleteuserdata) is not directly supported in Microsoft Teams |

## Team member or bot addition

The [`conversationUpdate`](https://docs.microsoft.com/en-us/bot-framework/dotnet/bot-builder-dotnet-activities#conversationupdate) event is sent to your bot when it receives information on membership updates for teams where it has been added. It also receives an update when it has been added for the first time specifically for personal conversations. Note that the user information (`Id`) is unique for your bot and can be cached for future use by your service (such as sending a message to a specific user).

### Bot or user added to a team

The `conversationUpdate` event with the `membersAdded` object in the payload is sent when either a bot is added to a team or a new user is added to a team where a bot has been added. Microsoft Teams also adds `eventType.teamMemberAdded` in the `channelData` object.

Because this event is sent in both cases, you should parse the `membersAdded` object to determine whether the addition was a user or the bot itself. For the latter, a best practice is to send a [welcome message](~/concepts/bots/bot-conversations/bots-conv-channel#best-practice-welcome-messages-in-teams) to the channel so users can understand the features your bot provides.

#### Example code: Checking whether bot was the added member

##### .NET

```csharp
    for (int i = 0; i < sourceMessage.MembersAdded.Count; i++)
    {
        if (sourceMessage.MembersAdded[i].Id == sourceMessage.Recipient.Id)
        {
            addedBot = true;
            break;
        }
    }
```

##### Node.js

```javascript
const builder = require('botbuilder');

var c = new builder.ChatConnector({appId: BOT_APP_ID, appPassword: .BOT_SECRET});
var bot = new builder.UniversalBot(c);

bot.on('conversationUpdate', (msg) => {
    var members = msg.membersAdded;
    // Loop through all members that were just added to the team
    for (var i = 0; i < members.length; i++) {

        // See if the member added was our bot
        if (members[i].id.includes(BOT_APP_ID)) {
            var botmessage = new builder.Message()
                .address(msg.address)
                .text('Hello World!');

            bot.send(botmessage, function(err) {});
        }
    }
});
```

#### Schema example: Bot added to team

```json
{
    "membersAdded": [
        {
            "id": "28:f5d48856-5b42-41a0-8c3a-c5f944b679b0"
        }
    ],
    "type": "conversationUpdate",
    "timestamp": "2017-02-23T19:38:35.312Z",
    "localTimestamp": "2017-02-23T12:38:35.312-07:00",
    "id": "f:5f85c2ad",
    "channelId": "msteams",
    "serviceUrl": "https://smba.trafficmanager.net/amer-client-ss.msg/",
    "from": {
        "id": "29:1I9Is_Sx0OIy2rQ7Xz1lcaPKlO9eqmBRTBuW6XzkFtcjqxTjPaCMij8BVMdBcL9L_RwWNJyAHFQb0TRzXgyQvA"
    },
    "conversation": {
        "isGroup": true,
        "id": "19:efa9296d959346209fea44151c742e73@thread.skype"
    },
    "recipient": {
        "id": "28:f5d48856-5b42-41a0-8c3a-c5f944b679b0",
        "name": "SongsuggesterBot"
    },
    "channelData": {
        "team": {
            "id": "19:efa9296d959346209fea44151c742e73@thread.skype"
        },
        "eventType": "teamMemberAdded",
        "tenant": {
            "id": "72f988bf-86f1-41af-91ab-2d7cd011db47"
        }
    }
}
```

### Bot added for personal context only

Your bot receives a `conversationUpdate` with `membersAdded` when a user adds it directly for personal chat. In this case, the payload that your bot receives doesn't contain the `channelData.team` object. You should use this as a filter in case you want your bot to offer a different [welcome message](~/concepts/bots/bot-conversations/bots-conv-personal#best-practice-welcome-messages-in-11-conversations) depending on scope.

## Team member or bot removed

The `conversationUpdate` event with the `membersRemoved` object in the payload is sent when either your bot is removed from a team, or a user is removed from a team where a bot has been added. Microsoft Teams also adds `eventType.teamMemberRemoved` in the `channelData` object. As with the `membersAdded` object, you should parse the `membersRemoved` object for your bot's App ID to determine who was removed.

#### Schema example: Team member removed

```json
{
    "membersRemoved": [
        {
            "id": "29:1_LCi5Up14pAy65yZuaJzG1uIT7ujYhjjSTsUNqjORsZHjLHKiQIBJa4cX2XsAsRoaY7va2w6ZymA9-1VtSY_g"
        }
    ],
    "type": "conversationUpdate",
    "timestamp": "2017-02-23T19:37:06.96Z",
    "localTimestamp": "2017-02-23T12:37:06.96-07:00",
    "id": "f:d8a6a4aa",
    "channelId": "msteams",
    "serviceUrl": "https://smba.trafficmanager.net/amer-client-ss.msg/",
    "from": {
        "id": "29:1I9Is_Sx0OIy2rQ7Xz1lcaPKlO9eqmBRTBuW6XzkFtcjqxTjPaCMij8BVMdBcL9L_RwWNJyAHFQb0TRzXgyQvA"
    },
    "conversation": {
        "isGroup": true,
        "id": "19:efa9296d959346209fea44151c742e73@thread.skype"
    },
    "recipient":
    {
        "id": "28:f5d48856-5b42-41a0-8c3a-c5f944b679b0",
        "name": "SongsuggesterBot"
    },
    "channelData": {
        "team": {
            "id": "19:efa9296d959346209fea44151c742e73@thread.skype"
        },
        "eventType": "teamMemberRemoved",
        "tenant": {
            "id": "72f988bf-86f1-41af-91ab-2d7cd011db47"
        }
    }
}
```

## Team name updates

> [!NOTE]
> At this time, there is no functionality to query all team names, and team name is not returned in payloads from other events.

Your bot is notified when the team it is in has been renamed. It receives a `conversationUpdate` event with `eventType.teamRenamed` in the `channelData` object. Please note that there are no notifications for team creation or deletion, because bots exist only as part of teams and have no visibility outside the scope in which they have been added.

#### Schema example: Team renamed

```json
{ 
    "type": "conversationUpdate",
    "timestamp": "2017-02-23T19:35:56.825Z",
    "localTimestamp": "2017-02-23T12:35:56.825-07:00",
    "id": "f:1406033e",
    "channelId": "msteams",
    "serviceUrl": "https://smba.trafficmanager.net/amer-client-ss.msg/", 
    "from": { 
        "id": "29:1I9Is_Sx0O-Iy2rQ7Xz1lcaPKlO9eqmBRTBuW6XzkFtcjqxTjPaCMij8BVMdBcL9L_RwWNJyAHFQb0TRzXgyQvA"
    }, 
    "conversation": {
        "isGroup": true,
        "id": "19:efa9296d959346209fea44151c742e73@thread.skype"
    },
    "recipient": { 
        "id": "28:f5d48856-5b42-41a0-8c3a-c5f944b679b0",
        "name": "SongsuggesterLocal"
    },
    "channelData": {
        "team": {
            "id": "19:efa9296d959346209fea44151c742e73@thread.skype", 
            "name": "New Team Name"
        },
        "eventType": "teamRenamed",
        "tenant": { 
           "id": "72f988bf-86f1-41af-91ab-2d7cd011db47"
        }
    }
}
```

## Channel updates

Your bot is notified when a channel is created, renamed, or deleted in a team where it has been added. Again, the `conversationUpdate` event is received, and a Teams-specific event identifier is sent as part of the `channelData.eventType` object, where the channel data's  `channel.id` is the GUID for the channel, and `channel.name` contains the channel name itself.

The channel events are as follows:

* **channelCreated**&emsp;A user adds a new channel to the team
* **channelRenamed**&emsp;A user renames an existing channel
* **channelDeleted**&emsp;A user removes a channel

### Full schema example: channelCreated

```json
{
    "type": "conversationUpdate",
    "timestamp": "2017-02-23T19:34:07.478Z",
    "localTimestamp": "2017-02-23T12:34:07.478-07:00",
    "id": "f:dd6ec311",
    "channelId": "msteams",
    "serviceUrl": "https://smba.trafficmanager.net/amer-client-ss.msg/",
    "from": {
        "id": "29:1wR7IdIRIoerMIWbewMi75JA3scaMuxvFon9eRQW2Nix5loMDo0362st2IaRVRirPZBv1WdXT8TIFWWmlQCizZQ"
    },
    "conversation": {
        "isGroup": true,
        "id": "19:efa9296d959346209fea44151c742e73@thread.skype"
    },
    "recipient": {
        "id": "28:f5d48856-5b42-41a0-8c3a-c5f944b679b0",
        "name": "SongsuggesterBot"
    },
    "channelData": {
        "channel": {
            "id": "19:6d97d816470f481dbcda38244b98689a@thread.skype",
            "name": "FunDiscussions"
        },
        "team": {
            "id": "19:efa9296d959346209fea44151c742e73@thread.skype"
        },
        "eventType": "channelCreated",
        "tenant": {
            "id": "72f988bf-86f1-41af-91ab-2d7cd011db47"
        }
    }
}
```

### Schema excerpt: channelData for channelRenamed

```json
⋮
"channelData": {         
    "channel": {             
        "id": "19:6d97d816470f481dbcda38244b98689a@thread.skype",             
        "name": "PhotographyUpdates"         
    },         
    "team": {             
        "id": "19:efa9296d959346209fea44151c742e73@thread.skype"         
    },         
    "eventType": "channelRenamed",         
    "tenant": {             
        "id": "72f988bf-86f1-41af-91ab-2d7cd011db47"         
    }     
} 
⋮
```

### Schema excerpt: channelData for channelDeleted

```json     
⋮
"channelData": {         
    "channel": {             
        "id": "19:6d97d816470f481dbcda38244b98689a@thread.skype",               
        "name": "PhotographyUpdates"       
    },         
    "team": {             
        "id": "19:efa9296d959346209fea44151c742e73@thread.skype"         
    },         
    "eventType": "channelDeleted",         
    "tenant": {             
        "id": "72f988bf-86f1-41af-91ab-2d7cd011db47"         
    }     
} 
⋮
```

## Reactions

The `messageReaction` event is sent when a user adds or removes his or her reaction to a message which was originally sent by your bot. `replyToId` contains the ID of the specific message.

### Schema example: A user likes a message

```json
{
    "reactionsAdded": [
        {
            "type": "like"
        }
    ],
    "type": "messageReaction",
    "timestamp": "2017-10-16T18:45:41.943Z",
    "id": "f:9f78d1f3",
    "channelId": "msteams",
    "serviceUrl": "https://smba.trafficmanager.net/amer-client-ss.msg/",
    "from": {
        "id": "29:1I9Is_Sx0O-Iy2rQ7Xz1lcaPKlO9eqmBRTBuW6XzkFtcjqxTjPaCMij8BVMdBcL9L_RwWNJyAHFQb0TRzXgyQvA",
        "aadObjectId": "c33aafc4-646d-4543-9d4c-abd28e4d2110"
    },
    "conversation": {
        "isGroup": true,
        "id": "19:3629591d4b774aa08cb0887902eee7c1@thread.skype"
    },
    "recipient": {
        "id": "28:f5d48856-5b42-41a0-8c3a-c5f944b679b0",
        "name": "SongsuggesterLocal"
    },
    "channelData": {
        "channel": {
            "id": "19:3629591d4b774aa08cb0887902eee7c1@thread.skype"
        },
        "team": {
            "id": "19:efa9296d959346209fea44151c742e73@thread.skype"
        },
        "tenant": {
            "id": "72f988bf-86f1-41af-91ab-2d7cd011db47"
        }
    },
    "replyToId": "1:19uJ8TZA1cZcms7-2HLOW3pWRF4nSWEoVnRqc0DPa_kY"
}
```

### Schema example: A user unlikes a message

```json
{
    "reactionsRemoved": [
        {
            "type": "like"
        }
    ],
    "type": "messageReaction",
    "timestamp": "2017-10-16T18:45:41.943Z",
    "id": "f:9f78d1f3",
    "channelId": "msteams",
    "serviceUrl": "https://smba.trafficmanager.net/amer-client-ss.msg/",
    "from": {
        "id": "29:1I9Is_Sx0O-Iy2rQ7Xz1lcaPKlO9eqmBRTBuW6XzkFtcjqxTjPaCMij8BVMdBcL9L_RwWNJyAHFQb0TRzXgyQvA",
        "aadObjectId": "c33aafc4-646d-4543-9d4c-abd28e4d2110"
    },
    "conversation": {
        "isGroup": true,
        "id": "19:3629591d4b774aa08cb0887902eee7c1@thread.skype"
    },
    "recipient": {
        "id": "28:f5d48856-5b42-41a0-8c3a-c5f944b679b0",
        "name": "SongsuggesterLocal"
    },
    "channelData": {
        "channel": {
            "id": "19:3629591d4b774aa08cb0887902eee7c1@thread.skype"
        },
        "team": {
            "id": "19:efa9296d959346209fea44151c742e73@thread.skype"
        },
        "tenant": {
            "id": "72f988bf-86f1-41af-91ab-2d7cd011db47"
        }
    },
    "replyToId": "1:19uJ8TZA1cZcms7-2HLOW3pWRF4nSWEoVnRqc0DPa_kY"
}
```
