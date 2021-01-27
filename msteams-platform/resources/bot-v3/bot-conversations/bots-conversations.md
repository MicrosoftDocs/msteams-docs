---
title: Send and receive messages with a bot
description: Describes how to send and receive messages with bots in Microsoft Teams
ms.topic: overview
keywords: teams bots messages
ms.date: 05/20/2019
---
# Have a conversation with a Microsoft Teams bot

[!include[v3-to-v4-SDK-pointer](~/includes/v3-to-v4-pointer-bots.md)]

A conversation is a series of messages sent between your bot and one or more users. There are three kinds of conversations (also called scopes) in Teams:

* `teams` Also called channel conversations, visible to all members of the channel.
* `personal` Conversations between bots and a single user.
* `groupChat` Chat between a bot and two or more users.

A bot behaves slightly differently depending on what kind of conversation it is involved in:

* [Bots in channel and group chat conversations](~/resources/bot-v3/bot-conversations/bots-conv-channel.md) require the user to @ mention the bot to invoke it in a channel.
* [Bots in single user conversations](~/resources/bot-v3/bot-conversations/bots-conv-personal.md) do not require an @ mention -  the user can just type.

In order for the bot to work in a particular scope it should be listed as supporting that scope in the manifest. Scopes are defined and discussed further in the [Manifest Reference](~/resources/schema/manifest-schema.md).

## Proactive messages

Bots can participate in a conversation or initiate one. Most communication is in response to another message. If a bot initiates a conversation it is called a *proactive message*. Examples include:

* Welcome messages
* Event notifications
* Polling messages

## Conversation basics

Each message is an `Activity` object of type `messageType: message`. When a user sends a message, Teams posts the message to your bot; specifically, it sends a JSON object to your bot's messaging endpoint. Your bot examines the message to determine its type and responds accordingly.

Bots also support event-style messages. See [Handle bot events in Microsoft Teams](~/resources/bot-v3/bots-notifications.md) for more details. Speech is currently not supported.

Messages are for the most part the same in across all scopes, but there are differences in how the bot is accessed in the UI and differences behind the scenes which you will need to know about.

Basic conversation is handled through the Bot Framework Connector, a single REST API to enable your bot to communicate with Teams and other channels. The Bot Builder SDK provides easy access to this API, additional functionality to manage conversation flow and state, and simple ways to incorporate cognitive services such as natural language processing (NLP).

## Message content

Your bot can send rich text, pictures, and cards. Users can send rich text and pictures to your bot. You can specify the type of content your bot can handle in the Microsoft Teams settings page for your bot.

| Format | From user to bot  | From bot to user |  Notes |
| --- | :---: | :---: | --- |
| Rich text | ✔ | ✔ |  |
| Pictures | ✔ | ✔ | Maximum 1024×1024 and 1 MB in PNG, JPEG, or GIF format; animated GIF are not supported |
| Cards | ✖ | ✔ | See the [Teams Card Reference](~/task-modules-and-cards/cards/cards-reference.md) for supported cards |
| Emojis | ✖ | ✔ | Teams currently supports emojis via UTF-16 (such as U+1F600 for grinning face) |
|

For more information on the types of bot interaction supported by the Bot Framework (which bots in teams are based on), see the Bot Framework documentation on [conversation flow](/azure/bot-service/dotnet/bot-builder-dotnet-manage-conversation-flow?view=azure-bot-service-3.0) and related concepts in the documentation for [the Bot Builder SDK for .NET](/azure/bot-service/dotnet/bot-builder-dotnet-overview?view=azure-bot-service-3.0) and [the Bot Builder SDK for Node.js](/azure/bot-service/nodejs/bot-builder-nodejs-overview?view=azure-bot-service-3.0).

## Message formatting

You can set the optional [`TextFormat`](/azure/bot-service/dotnet/bot-builder-dotnet-create-messages?view=azure-bot-service-3.0#customizing-a-message) property of a `message` to control how your message's text content is rendered. See [Message formatting](~/resources/bot-v3/bots-message-format.md) for a detailed description of supported formatting in bot messages.
You can set the optional [`TextFormat`](/azure/bot-service/dotnet/bot-builder-dotnet-create-messages?view=azure-bot-service-3.0#customizing-a-message) property to control how your message's text content is rendered.

For detailed information on how Teams supports text formatting in teams see [Text formatting in bot messages](~/resources/bot-v3/bots-text-formats.md).

For information on formatting cards in messages, see [Card formatting](~/task-modules-and-cards/cards/cards-format.md).

## Picture messages

Pictures are sent by adding attachments to a message. You can find more information on attachments in the [Bot Framework documentation](/azure/bot-service/dotnet/bot-builder-dotnet-add-media-attachments?view=azure-bot-service-3.0).

Pictures can be at most 1024×1024 and 1 MB in PNG, JPEG, or GIF format; animated GIF is not supported.

We recommend that you specify the height and width of each image by using XML. If you use Markdown, the image size defaults to 256×256. For example:

* Use `<img src="http://aka.ms/Fo983c" alt="Duck on a rock" height="150" width="223"></img>`
* Don't use `![Duck on a rock](http://aka.ms/Fo983c)`

## Receiving messages

Depending on which scopes are declared, your bot can receive messages in the following contexts:

* **personal chat** Users can interact in a private conversation with a bot by simply selecting the added bot in the chat history, or typing its name or app ID in the To: box on a new chat.
* **Channels** A bot can be mentioned ("@_botname_") in a channel if it has been added to the team. Note that additional replies to a bot in a channel require mentioning the bot. It will not respond to replies where it is not mentioned.

For incoming messages, your bot receives an [`Activity`](/azure/bot-service/rest-api/bot-framework-rest-connector-activities?view=azure-bot-service-3.0) object of type `messageType: message`. Although the `Activity` object can contain other types of information, like [channel updates](~/resources/bot-v3/bots-notifications.md#channel-updates) sent to your bot, the `message` type represents communication between bot and user.

Your bot receives a payload that contains the user message `Text` as well as other information about the user, the source of the message, and Teams information. Of note:

* `timestamp` The date and time of the message in Coordinated Universal Time (UTC)
* `localTimestamp` The date and time of the message in the time zone of the sender
* `channelId` Always "msteams". This refers to a bot framework channel, not a teams channel.
* `from.id` A unique and encrypted ID for that user for your bot; suitable as a key if your app needs to store user data. It is unique for your bot and cannot be directly used outside your bot instance in any meaningful way to identify that user
* `channelData.tenant.id` The tenant ID for the user.

> [!NOTE]
> `from.id` is unique for your bot and cannot be directly used outside your bot instance in any meaningful way to identify that user.

## Combining channel and private interactions with your bot

When interacting in a channel, your bot should be smart about taking certain conversations offline with a user. For instance, suppose a user is trying to coordinate a complex task, such as scheduling with a set of team members. Rather than have the entire sequence of interactions visible to the channel, consider sending a personal chat message to the user. Your bot should be able to easily transition the user between personal and channel conversations without losing state.

> [!NOTE]
>Don’t forget to update the channel when the interaction is complete to notify the other team members.

## Full inbound schema example

```json
{
    "type": "message",
    "id": "1485983408511",
    "timestamp": "2017-02-01T21:10:07.437Z",
    "localTimestamp": "2017-02-01T14:10:07.437-07:00",
    "serviceUrl": "https://smba.trafficmanager.net/amer/",
    "channelId": "msteams",
    "from": {
        "id": "29:1XJKJMvc5GBtc2JwZq0oj8tHZmzrQgFmB39ATiQWA85gQtHieVkKilBZ9XHoq9j7Zaqt7CZ-NJWi7me2kHTL3Bw",
        "name": "Megan Bowen",
        "aadObjectId": "7faf8ab2-3d56-4244-b585-20c8a42ed2b8"
    },
    "conversation": {
        "conversationType": "personal",
        "id": "a:17I0kl9EkpE1O9PH5TWrzrLNwnWWcfrU7QZjKR0WSfOpzbfcAg2IaydGElSo10tVr4C7Fc6GtieTJX663WuJCc1uA83n4CSrHSgGBj5XNYLcVlJAs2ZX8DbYBPck201w-"
    },
    "recipient": {
        "id": "28:c9e8c047-2a74-40a2-b28a-b162d5f5327c",
        "name": "Teams TestBot"
    },
    "textFormat": "plain",
    "text": "Hello Teams TestBot",
    "entities": [
      { 
        "locale": "en-US",
        "country": "US",
        "platform": "Windows",
        "timezone": "America/Los_Angeles",
        "type": "clientInfo"
      }
    ],
    "channelData": {
        "tenant": {
            "id": "72f988bf-86f1-41af-91ab-2d7cd011db47"
        }
    },
    "locale": "en-US"
}
```

> [!NOTE]
> The text field for inbound messages sometimes contains mentions. Be sure to properly check and strip those. For more information, see [Mentions](~/resources/bot-v3/bot-conversations/bots-conv-channel.md#-mentions).

## Teams channel data

The `channelData` object contains Teams-specific information and is the definitive source for team and channel IDs. You should cache and use these ids as keys for local storage.

The `channelData` object is not included in messages in personal conversations since these take place outside of any channel.

A typical channelData object in an activity sent to your bot contains the following information:

* `eventType` Teams event type; passed only in cases of [channel modification events](~/resources/bot-v3/bots-notifications.md#channel-updates)
* `tenant.id` Azure Active Directory tenant ID; passed in all contexts
* `team` Passed only in channel contexts, not in personal chat.
  * `id` GUID for the channel
  * `name` Name of the team; passed only in cases of [team rename events](~/resources/bot-v3/bots-notifications.md#team-name-updates)
* `channel` Passed only in channel contexts when the bot is mentioned or for events in channels in teams where the bot has been added
  * `id` GUID for the channel
  * `name` Channel name; passed only in cases of [channel modification events](~/resources/bot-v3/bots-notifications.md#channel-updates).
* `channelData.teamsTeamId` Deprecated. This property is included only for backwards compatibility.
* `channelData.teamsChannelId` Deprecated. This property is included only for backwards compatibility.

### Example channelData object (channelCreated event)

```json
"channelData": {
    "eventType": "channelCreated",
    "tenant": {
        "id": "72f988bf-86f1-41af-91ab-2d7cd011db47"
    },
    "channel": {
        "id": "19:693ecdb923ac4458a5c23661b505fc84@thread.skype",
        "name": "My New Channel"
    },
    "team": {
        "id": "19:693ecdb923ac4458a5c23661b505fc84@thread.skype"
    }
}
```

### .NET example

The [Microsoft.Bot.Connector.Teams](https://www.nuget.org/packages/Microsoft.Bot.Connector.Teams) NuGet package provides a specialized `TeamsChannelData` object, which exposes properties to access Teams-specific information.

```csharp
TeamsChannelData channelData = activity.GetChannelData<TeamsChannelData>();
string tenantId = channelData.Tenant.Id;
```

## Sending replies to messages

To reply to an existing message, call [`ReplyToActivity`](/dotnet/api/microsoft.bot.connector.conversationsextensions.replytoactivityasync?view=botbuilder-dotnet-3.0#Microsoft_Bot_Connector_ConversationsExtensions_ReplyToActivityAsync_Microsoft_Bot_Connector_IConversations_System_String_System_String_Microsoft_Bot_Connector_Activity_System_Threading_CancellationToken_) in .NET or [`session.send`](/javascript/api/botbuilder-core/TurnContext?view=botbuilder-ts-latest&viewFallbackFrom=botbuilder-ts-3.0#sendactivities) in Node.js. The Bot Builder SDK handles all the details.

If you choose to use the REST API, you can also call the [`/v3/conversations/{conversationId}/activities/{activityId}`](/azure/bot-service/rest-api/bot-framework-rest-connector-send-and-receive-messages?view=azure-bot-service-3.0) endpoint.

The message content itself can contain simple text or some of the Bot Framework supplied [cards and card actions](~/task-modules-and-cards/cards/cards-actions.md).

Please note that in your outbound schema you should always use the same `serviceUrl` as the one you received. Be aware that the value of `serviceUrl` tends to be stable but can change. When a new message arrives, your bot should verify its stored value of `serviceUrl`.

## Updating messages

Rather than have your messages be static snapshots of data, your bot can dynamically update messages inline after sending them. You can use dynamic message updates for scenarios such as poll updates, modifying available actions after a button press, or any other asynchronous state change.

The new message need not match the original in type. For instance, if the original message contained an attachment, the new message can be a simple text message.

> [!NOTE]
> You can update only content sent in single-attachment messages and carousel layouts. Posting updates to messages with multiple attachments in list layout is not supported.

### REST API

To issue a message update, simply perform a PUT request against the `/v3/conversations/<conversationId>/activities/<activityId>/` endpoint using a given activity ID. To complete this scenario, you should cache the activity ID returned by the original POST call.

```json
PUT /v3/conversations/19%3Aja0cu120i1jod12j%40skype.net/activities/012ujdo0128
{
    "type": "message",
    "text": "This message has been updated"
}
```

### .NET example

You can use the `UpdateActivityAsync` method in the Bot Builder SDK to update an existing message.

```csharp
public async Task<HttpResponseMessage> Post([FromBody]Activity activity)
{
  if (activity.Type == ActivityTypes.Message)
  {
    ConnectorClient connector = new ConnectorClient(new Uri(activity.ServiceUrl));
    Activity reply = activity.CreateReply($"You sent {activity.Text} which was {activity.Text.Length} characters");
    var msgToUpdate = await connector.Conversations.ReplyToActivityAsync(reply);
    Activity updatedReply = activity.CreateReply($"This is an updated message");
    await connector.Conversations.UpdateActivityAsync(reply.Conversation.Id, msgToUpdate.Id, updatedReply);
  }
}
```

### Node.js example

You can use the `session.connector.update` method in the Bot Builder SDK to update an existing message.

```javascript
function sendCardUpdate(bot, session, originalMessage, address) {

  var origAttachment = originalMessage.data.attachments[0];
  origAttachment.content.subtitle = 'Assigned to Larry Jin';

  var updatedMsg = new builder.Message()
    .address(address)
    .textFormat(builder.TextFormat.markdown)
    .addAttachment(origAttachment)
    .toMessage();

  session.connector.update(updatedMsg, function(err, addresses) {
    if (err) {
      console.log(`Could not update the message`);
    }
  });
}
```

## Starting a conversation (proactive messaging)

You can create a personal conversation with a user or start a new reply chain in a channel for your team bot. This lets you to message your user or users without having them first initiate contact with your bot. For more information, see the following topics:

See [Proactive messaging for bots](~/resources/bot-v3/bot-conversations/bots-conv-proactive.md) for more general information on conversations started by bots.

## Deleting messages

Messages can be deleted using the connectors [`delete()`](https://docs.botframework.com/node/builder/chat-reference/interfaces/_botbuilder_d_.iconnector.html#delete) method in the [BotBuilder SDK](/bot-framework/bot-builder-overview-getstarted).

```typescript
bot.dialog('BotDeleteMessage', function (session: builder.Session) {
  var msg = new teams.TeamsMessage(session).text("Bot will delete this message in 5 sec.")
  bot.send(msg, function (err, response) {
    if (err) {
      console.log(err);
      session.endDialog();
    }

    console.log('Proactive message response:');
    console.log(response);
    console.log('---------------------------------------------------')
    setTimeout(function () {
      var activityId: string = null;
      var messageAddress: builder.IChatConnectorAddress = null;
      if (response[0]){
        messageAddress = response[0];
        activityId = messageAddress.id;
      }

      if (activityId == null)
      {
        console.log('Message failed to send.');
        session.endDialog();
        return;
      }

      // Bot delete message
      let address: builder.IChatConnectorAddress  = {
        channelId: 'msteams',
        user: messageAddress.user,
        bot: messageAddress.bot,
        id : activityId,
        serviceUrl : (<builder.IChatConnectorAddress>session.message.address).serviceUrl,
        conversation: {
          id: session.message.address.conversation.id
        }
      };

      connector.delete(address, function (err) {
        if (err)
        {
          console.log(err);
        }
        else
        {
          console.log("Message: " + activityId + " deleted successfully.");
        }

        // Try editing deleted message would fail
        var newMsg = new builder.Message().address(address).text("To edit message.");
        connector.update(newMsg.toMessage(), function (err, address) {
          if (err)
          {
            console.log(err);
            console.log('Deleted message can not be edited.');
          }
          else
          {
            console.log("There is something wrong. Message: " + activityId + " edited successfully.");
            console.log(address);
          }

          session.endDialog();
        });
      });
    }, 5000);
  });
})
```
