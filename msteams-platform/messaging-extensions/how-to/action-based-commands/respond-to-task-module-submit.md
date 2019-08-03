---
title: Respond to the task module submit action
author: clearab
description: Describes how to respond to the task module submit action from an action-based messaging extension command
ms.topic: conceptual
ms.author: anclear
---
# Respond to the task module submit action

Once a user completes entering their input your bot will receive a `composeExtension/submitAction` event with the command id and parameter values set. You have the following options for responding to the submit action:

* No response - You can choose to use the submit action to trigger a process in an external system, and not provide any feedback to the user. This can be useful for long-running processes, and you may choose to provide feedback in another manner (for example, with a [proactive message](~/foo.md))
* [Another task module](#respond-with-a-task-module) - You can respond with an additional task module as part of a multi-step interaction.
* [Card response](#respond-with-a-card) - You can respond with a card that the user can then interact with and/or insert into a message.
* [Adaptive Card from bot](#bot-response-with-adaptive-card) - The bot can insert an Adaptive Card directly into the conversation.

The table below shows which types of responses are available based on the invoke context of the messaging extension.

|Response Type | compose | command bar | message |
|--------------|:-------------:|:-------------:|:---------:|
|Card response | x | x | x |
|Another task module | x | x | x |
|Bot with Adaptive Card | x |  | x |
| No response | x | x | x |

## The submitAction event

```json
i is an example
```

## Respond with a card

asdf

## Respond with another task module

You can choose to respond to the `submitAction` event with an additional task module. This can be useful when you need to collect large amounts of information, or if you need to dynamically change what information you're collecting based on user input. The method for response is the same as [responding to the initial `fetchTask` event](~/messaging-extensions/how-to/action-based-commands/create-task-module.md).

## Bot response with Adaptive Card

You can also respond to the submit action by inserting a message with an Adaptive Card into the channel with a bot. Your user will be able to preview the message before submitting it, and potentially edit/interact with it as well. This can be very useful in scenarios where you need to gather information from your users before creating an adaptive card response. The following scenario shows how you can use this flow to configure a poll without including the configuration steps in the channel message.

1. The user clicks the messaging extension to trigger the task module.
1. The user uses the task module to configure the poll.
1. After submitting the configuration task module the app uses the information provided in the task module to craft an adaptive card and sends it as a `botMessagePreview` response to the client.
1. The user can then preview the adaptive card message before the bot will inserts it into the channel. If the bot is not already a member of the channel, clicking `Send` will add the bot.
1. Interacting with the adaptive card will change the message before sending it.
1. Once the user clicks `Send` the bot will post the message to the channel.

To enable this flow your task module should respond as in the example below, which will present the preview message to the user.

>[!Note]
>The `activityPreview` must contain a `message` activity with exactly 1 adaptive card attachment.

```json
{
  "composeExtension": {
    "type": "botMessagePreview",
    "activityPreview": {
      "type": "message",
      "attachments":  [
        {
          "contentType": "application/vnd.microsoft.card.adaptive",
          "content": << Card Payload >>
        }
      ]
    }
  }
}
```

Your message extension will now need to respond to two new types of interactions, `value.botMessagePreviewAction = "send"` and `value.botMessagePreviewAction = "edit"`. Below is an example of the `value` object you will need to process:

```json
{
  "name": "composeExtension/submitAction",
  "type": "invoke",
  "conversation": { "id": "19:c366b75791784100b6e8b515fd55b063@thread.skype" },
  "imdisplayname": "Pranav Smith",
  ...
  "value": {
    "botMessagePreviewAction": "send" | "edit",
    "botActivityPreview": [
      {
        "type": "message/card",
        "attachments": [
          {
            "content":
              {
                "type": "AdaptiveCard",
                "body": [{<<card payload>>}]
              },
            "contentType" : "application/vnd.microsoft.card.adaptive"
          }
        ],
        "context": { "theme": "default" }
      }
    ],
  }
}
```

When responding to the `edit` request you should respond with a `task` response with the values populated with the information the user has already submitted. When responding to the `send` request you should send a message to the channel containing the finalized adaptive card. The example below shows how to do this using the [Node.js Teams Bot Builder SDK](https://www.npmjs.com/package/botbuilder-teams).

```typescript
teamChatConnector.onComposeExtensionSubmitAction((
    event: builder.IEvent,
    request: teamBuilder.IComposeExtensionActionCommandRequest,
    callback: (err: Error, result: any, statusCode: number) => void) => {
        let invokeValue = (<any> event).value;

        if (invokeValue.botMessagePreviewAction ) {
            let attachment = invokeValue.botActivityPreview[0].attachments[0];

            if (invokeValue.botMessagePreviewAction === 'send') {
                let msg = new builder.Message()
                    .address(event.address)
                    .addAttachment(attachment);
                teamChatConnector.send([msg.toMessage()],
                    (error) => {
                        if(error){
                            //TODO: Handle error and callback
                        }
                        else {
                            callback(null, null, 200);
                        }
                    }
                );
            }

            else if (invokeValue.botMessagePreviewAction === 'edit') {
              // Create the card and populate with user-inputted information
              let card = { ... }

              let taskResponse = {
                task: {
                  type: "continue",
                  value: {
                    title: "Card Preview",
                    card: {
                      contentType: 'application/vnd.microsoft.card.adaptive',
                      content: card
                    }
                  }
                }
              }
              callback(null, taskResponse, 200);
            }

        else {
            let attachment = {
                  //create adaptive card
                };
            let activity = new builder.Message().addAttachment(attachment).toMessage();
            let response = teamBuilder.ComposeExtensionResponse.messagePreview()
                .preview(activity)
                .toResponse();
            callback(null, response, 200);
        }
    });
```

## Next Steps

Add a search based command

* [Define search based commands](~/messaging-extensions/how-to/search-based-commands/define-search-based-command.md)

Deploy your app package

* [Deploy your app package](~/foo.md)

[!Includes(~/includes/messaging-extensions/learn-more.md)]
