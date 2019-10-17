---
title: Respond to the task module submit action
author: clearab
description: Describes how to respond to the task module submit action from an action-based messaging extension command
ms.topic: conceptual
ms.author: anclear
---
# Respond to the task module submit action

Once a user completes entering their input your web service will receive a `composeExtension/submitAction` event with the command id and parameter values set. You have the following options for responding.

* No response - You can choose to use the submit action to trigger a process in an external system, and not provide any feedback to the user. This can be useful for long-running processes, and you may choose to provide feedback in another manner (for example, with a [proactive message](~/foo.md)).
* [Another task module](#respond-with-a-task-module) - You can respond with an additional task module as part of a multi-step interaction.
* [Card response](#respond-with-a-card) - You can respond with a card that the user can then interact with and/or insert into a message.
* [Adaptive Card from bot](#bot-response-with-adaptive-card) - Insert an Adaptive Card directly into the conversation.
* [Request the user authenticate](~/messaging-extensions/how-to/add-authentication.md)
* [Request the user provide additional configuration](~/messaging-extensions/how-to/add-configuration.md)

The table below shows which types of responses are available based on the invoke context of the messaging extension. For authentication or configuration, once the user completes the flow the original invoke will be re-sent to your web service.

|Response Type | compose | command bar | message |
|--------------|:-------------:|:-------------:|:---------:|
|Card response | x | x | x |
|Another task module | x | x | x |
|Bot with Adaptive Card | x |  | x |
| No response | x | x | x |

## The submitAction event

# [C#/.NET](#tab/dotnet)

```csharp
protected override async Task<MessagingExtensionActionResponse> OnTeamsMessagingExtensionSubmitActionAsync(ITurnContext<IInvokeActivity> turnContext, MessagingExtensionAction action, CancellationToken cancellationToken) {
  //code to handle the submit action
}
```

# [TypeScript/Node.js](#tab/typescript)

```typescript
protected async onTeamsMessagingExtensionSubmitAction(context, action: MessagingExtensionAction): Promise<MessagingExtensionActionResponse> {
  //code to handle the submit action
}
```

# [JSON](#tab/json)

This is an example of the JSON object you will receive. The `commandContext` parameter indicates where your messaging extension was triggered from.

```json
{
  "name": "composeExtension/submitAction",
  "imdisplayname": "Bob Smith",
  "value": {
    "commandId": "giveKudos",
    "commandContext": "compose",
    "context": {
      "theme": "default"
    }
  },
  "conversation": {
    "id": "19:7705841b240044b297123ad7f9c99217@thread.skype"
  }
}
```

* * *

## Respond with a card inserted into the compose message area

The most common way to respond to the `composeExtension/fetchtask` request is with a card inserted into the compose message area. The user can then choose to submit the card to the conversation. For more information see [cards and card actions](~/bots/how-to/cards-and-formatting/send-cards-and-card-actions.md).

# [C#/.NET](#tab/dotnet)

```csharp
protected override async Task<MessagingExtensionActionResponse> OnTeamsMessagingExtensionSubmitActionAsync(ITurnContext<IInvokeActivity> turnContext, MessagingExtensionAction action, CancellationToken cancellationToken)
{
    dynamic Data = JObject.Parse(action.Data.ToString());
    var response = new MessagingExtensionActionResponse
    {
        ComposeExtension = new MessagingExtensionResult
        {
            AttachmentLayout = "list",
            Type = "result",
        },
    };
    var card = new HeroCard
    {
        Title = Data["title"],
        Subtitle = Data["subtitle"],
        Text = Data["text"],
    };

    var attachments = new List<MessagingExtensionAttachment>();
    attachments.Add(new MessagingExtensionAttachment
    {
        Content = card,
        ContentType = HeroCard.ContentType,
        Preview = card.ToAttachment(),
    });

    response.ComposeExtension.Attachments = attachments;

}
```

# [TypeScript/Node.js](#tab/typescript)

```typescript
protected async onTeamsMessagingExtensionSubmitAction(context, action: MessagingExtensionAction): Promise<MessagingExtensionActionResponse> {
  const data = action.data;
  let body: MessagingExtensionActionResponse;

  const preview = CardFactory.thumbnailCard('Created Card', `Title was: ${data.title}`);
  const heroCard = CardFactory.heroCard('Created Card', `${sharedMessage}Your input: <pre>${data.userText}</pre>`);
  body = {
      composeExtension: {
          attachmentLayout: 'list',
          attachments: [
              { ...heroCard, preview }
          ],
          type: 'result'
      }
  };
}
```

# [JSON](#tab/json)

```json
{
  "composeExtension": {
    "type": "result",
    "attachmentLayout": "list",
    "preview": {
          "contentType": "application/vnd.microsoft.card.thumbnail",
          "content": {
            "title": "85069: Create a cool app",
            "images": [
              {
                "url": "https://placekitten.com/200/200"
              }
            ]
          }
        },
    "attachments": [
      {  
        "contentType": "application/vnd.microsoft.teams.card.o365connector",
        "content": {
          "sections": [
            {
              "activityTitle": "[85069]: Create a cool app",
              "activityImage": "https://placekitten.com/200/200"
            },
            {
              "title": "Details",
              "facts": [
                {
                  "name": "Assigned to:",
                  "value": "[Larry Brown](mailto:larryb@example.com)"
                },
                {
                  "name": "State:",
                  "value": "Active"
                }
              ]
            }
          ]
        }
      }
    ]
  }
}
```

* * *

## Respond with another task module

You can choose to respond to the `submitAction` event with an additional task module. This can be useful when you need to collect large amounts of information, or if you need to dynamically change what information you're collecting based on user input. The method for response is the same as [responding to the initial `fetchTask` event](~/messaging-extensions/how-to/action-based-commands/create-task-module.md).

## Bot response with Adaptive Card

>[!Note]
>This flow requires that you add the `bot` object to your app manifest, and that you have the necessary scope defined for the bot. Use the same Id as your messaging extension for your bot.

You can also respond to the submit action by inserting a message with an Adaptive Card into the channel with a bot. Your user will be able to preview the message before submitting it, and potentially edit/interact with it as well. This can be very useful in scenarios where you need to gather information from your users before creating an adaptive card response. The following scenario shows how the app Polly uses this flow to configure a poll without including the configuration steps in the channel message.

1. The user clicks the messaging extension to trigger the task module.
2. The user uses the task module to configure the poll.
3. After submitting the task module the app uses the information provided to craft an adaptive card and sends it as a `botMessagePreview` response to the client.
4. The user can then preview the adaptive card message before the bot will inserts it into the channel. If the app is not already a member of the channel, clicking `Send` will add the it.
5. Interacting with the adaptive card will change the message before sending it.
6. Once the user clicks `Send` the bot will post the message to the channel.

To enable this flow your task module should respond as in the example below, which will present the preview message to the user.

# [C#/.NET](#tab/dotnet)

```csharp
csharp
```

# [TypeScript/Node.js](#tab/typescript)

```typescript
typescript
```

# [JSON](#tab/json)

>[!Note]
>The `activityPreview` must contain a `message` activity with exactly 1 adaptive card attachment. The `<< Card Payload >>` value is a placeholder for the card you wish to send.

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

* * *

Your message extension will now need to respond to two new types of interactions, `value.botMessagePreviewAction = "send"` and `value.botMessagePreviewAction = "edit"`. Below is an example of the `value` object you will need to process:

# [C#/.NET](#tab/dotnet)

```csharp
csharp
```

# [TypeScript/Node.js](#tab/typescript)

```typescript
typescript
```

# [JSON](#tab/json)

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

* * *

When responding to the `edit` request you should respond with a `task` response with the values populated with the information the user has already submitted. When responding to the `send` request you should send a message to the channel containing the finalized adaptive card. The example below shows how to do this using the [Node.js Teams Bot Builder SDK](https://www.npmjs.com/package/botbuilder-teams).

# [C#/.NET](#tab/dotnet)

```csharp
asdf
```

# [TypeScript/Node.js](#tab/typescript)

```typescript
asdf
```

# [JSON](#tab/json)

```json
sample
```

* * *

## Next Steps

Add a search based command

* [Define search based commands](~/messaging-extensions/how-to/search-based-commands/define-search-based-command.md)

Deploy your app package

* [Deploy your app package](~/foo.md)

[!Includes[messaging extension learn more block](~/includes/messaging-extensions/learn-more.md)]
