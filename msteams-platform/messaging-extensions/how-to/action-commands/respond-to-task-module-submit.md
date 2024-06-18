---
title: Respond to the dialog submit action
author: surbhigupta
description: Learn how to respond to the dialog (task module) submit action from a message extension action command with Proactive message. Define search commands and respond to searches. Displays the username on the Adaptive Card header of the card response. User attribution for bot.
ms.localizationpriority: medium
ms.topic: conceptual
ms.author: anclear
---

# Respond to the dialog submit action

[!include[v4-to-v3-SDK-pointer](~/includes/v4-to-v3-pointer-me.md)]

This document guides you on how your app responds to the action commands, such as user's dialog (referred as task module in TeamsJS v1.x) submit action.
After a user submits the dialog, your web service receives a `composeExtensions/submitAction` invoke message with the command ID and parameter values. Your app has five seconds to respond to the invoke.

You have the following options to respond:

* No response: Use the submit action to trigger a process in an external system and not provide any feedback to the user. It's useful for long-running processes and to provide feedback alternately. For example, you can give feedback with a [proactive message](~/bots/how-to/conversations/send-proactive-messages.md).
* [Another dialog](#respond-with-another-dialog): You can respond with additional dialog as part of a multi-step interaction.
* [Card response](#respond-with-a-card-inserted-into-the-compose-message-area): You can respond with a card that the user can interact with or insert into a message.
* [Adaptive Card from bot](#bot-response-with-adaptive-card): Insert an Adaptive Card directly into the conversation.
* [Request the user to authenticate](/microsoftteams/platform/messaging-extensions/how-to/add-authentication).
* [Request the user to provide additional configuration](~/messaging-extensions/how-to/search-commands/respond-to-search.md#config-response-type).

If the app doesn't respond within five seconds, the Teams client retries the request twice before it sends an error message **Unable to reach the app**. If the bot replies after the timeout, the response is ignored.

> [!NOTE]
>
>* The app must defer any long-running actions after the bot replies to the invoke request. The long-running action results can be delivered as a message.
>* Your app has five seconds to respond to the invoke message.

For authentication or configuration, after the user completes the process, the original invoke is resent to your web service. The following table shows which types of responses are available, based on the invoke location `commandContext` of the message extension:

|Response Type | Compose | Command bar | Message |
|--------------|:-------------:|:-------------:|:---------:|
|Card response | ✔️ | ✔️ | ✔️ |
|Another dialog | ✔️ | ✔️ | ✔️ |
|Bot with Adaptive Card | ✔️ | ❌ | ✔️ |
| No response | ✔️ | ✔️ | ✔️ |

> [!NOTE]
>
> * When you select **Action.Submit** through ME cards, it sends invoke activity with the name **composeExtensions**, where the value is equal to the usual payload.
> * When you select **Action.Submit** through conversation, you receive message activity with the name **onCardButtonClicked**, where the value is equal to the usual payload.

If the app contains a conversational bot, install the bot in the conversation, and then load the dialog. The bot is useful to get more context for the dialog. To install conversational bot, see [Request to install your conversational bot](create-task-module.md#request-to-install-your-conversational-bot).

## The submitAction invoke event

Examples of receiving the invoke message are as follows:

# [C#/.NET](#tab/dotnet)

```csharp
protected override async Task<MessagingExtensionActionResponse> OnTeamsMessagingExtensionSubmitActionAsync(
  ITurnContext<IInvokeActivity> turnContext, MessagingExtensionAction action, CancellationToken cancellationToken) {
  //code to handle the submit action
}
```

# [JavaScript/Node.js](#tab/javascript)

```javascript
class TeamsMessagingExtensionsActionPreview extends TeamsActivityHandler {
  constructor() {
  handleTeamsMessagingExtensionSubmitAction(context, action) {
  
  //code to handle the submit action
    }
  }
}
```

# [JSON](#tab/json)

The following example is a JSON object that you receive. The `commandContext` parameter indicates where your message extension was triggered from. The `data` object contains the fields on the form as parameters, and the values the user submitted. The JSON object highlights the most relevant fields:

```json
{
  "name": "composeExtension/submitAction",
  "imdisplayname": "Bob Smith",
  "serviceUrl": "https://smba.trafficmanager.net/amer/",
  "value": {
    "commandId": "giveKudos",
    "commandContext": "compose",
    "context": {
      "theme": "default"
    },
    "data": {
      "id": "submitButton",
      "formField1": "formField1_value",
      "formField2": "formField2_value",
      "formField3": "formField3_value"
    }
  },
  "conversation": {
    "id": "19:7705841b240044b297123ad7f9c99217@thread.skype"
  }
}
```

* * *

## Respond with a card inserted into the compose message area

The most common way to respond to the `composeExtensions/submitAction` request is with a card inserted into the compose message area. The user submits the card to the conversation. For more information on using cards, see [cards and card actions](~/task-modules-and-cards/cards/cards-actions.md).

# [C#/.NET](#tab/dotnet)

```csharp
protected override async Task<MessagingExtensionActionResponse> OnTeamsMessagingExtensionSubmitActionAsync(
  ITurnContext<IInvokeActivity> turnContext, MessagingExtensionAction action, CancellationToken cancellationToken)
{
    var response = new MessagingExtensionActionResponse
    {
        ComposeExtension = new MessagingExtensionResult
        {
            AttachmentLayout = "list",
            Type = "result",
        },
    };
    var createCardData = ((JObject)action.Data).ToObject<CreateCardData>();
var card = new HeroCard
{
     Title = createCardData.Title,
     Subtitle = createCardData.Subtitle,
     Text = createCardData.Text,
};
    var attachments = new List<MessagingExtensionAttachment>();
    attachments.Add(new MessagingExtensionAttachment
    {
        Content = card,
        ContentType = HeroCard.ContentType,
        Preview = card.ToAttachment(),
    });
    response.ComposeExtension.Attachments = attachments;
    return response;
}
```

# [JavaScript/Node.js](#tab/javascript)

```javascript
class TeamsMessagingExtensionsActionPreview extends TeamsActivityHandler {
  handleTeamsMessagingExtensionSubmitAction(context, action) {
    const data = action.data;
    const heroCard = CardFactory.heroCard(data.title, data.text);
    heroCard.content.subtitle = data.subTitle;
    const attachment = { contentType: heroCard.contentType, content: heroCard.content, preview: heroCard };

    return {
      composeExtension: {
        type: 'result',
        attachmentLayout: 'list',
        attachments: [
          attachment
        ]
      }
    }
  }
}
```

# [JSON](#tab/json)

```json
{
  "composeExtension": {
    "attachmentLayout": "list",
    "type": "result",
    "attachments": [
      {
        "preview": {
          "contentType": "application/vnd.microsoft.card.hero",
          "content": {
            "title": "formField1_value",
            "subtitle": "formField2_value",
            "text": "formField3_value"
          }
        },
        "contentType": "application/vnd.microsoft.card.hero",
        "content": {
          "title": "formField1_value",
          "subtitle": "formField2_value",
          "text": "formField3_value"
        }
      }
    ]
  }
}
```

* * *

## Respond with another dialog

You can select to respond to the `submitAction` event with additional dialog. It's useful in the following scenarios:

* Collect large amounts of information.
* Dynamically change the information collection based on user input.
* Validate the information submitted by the user and resend the form with an error message if something is wrong.

The method for response is the same as [responding to the initial `fetchTask` event](~/messaging-extensions/how-to/action-commands/create-task-module.md). If you're using the Bot Framework SDK the same event triggers for both submit actions. To make this work, you must add logic that determines the correct response.

## Bot response with Adaptive Card

> [!NOTE]
>
> * The prerequisite to get the bot response with an Adaptive Card is that you must add the `bot` object to your app manifest, and define the required scope for the bot. Use the same ID as your message extension for your bot.
>
> * Outlook doesn't support bot response with Adaptive Card.

You can also respond to the `submitAction` by inserting a message with an Adaptive Card into the channel with a bot. The user can preview the message before submitting it. It's useful in scenarios where you gather information from the users before creating an Adaptive Card response, or when you update the card after someone interacts with it.

The following scenario shows how the app Polly configures a poll without including the configuration steps in the channel conversation:

To configure the poll:

1. The user selects the message extension to invoke the dialog.
1. The user configures the poll with the dialog.
1. When the user submits the dialog, the app uses the information provided to build the poll as an Adaptive Card and sends it as a `botMessagePreview` response to the client.
1. The user can then preview the Adaptive Card message before the bot inserts it into the channel. If the app isn't a member of the channel, select `Send` to add it.

    > [!NOTE]
    >
    > * The users can also select to `Edit` the message, which returns them to the original dialog.
    > * Interaction with the Adaptive Card changes the message before sending it.
    >
1. After the user selects `Send`, the bot posts the message to the channel.

## Respond to initial submit action

Your dialog must respond to the initial `composeExtensions/submitAction` message with a preview of the card that the bot sends to the channel. The user can verify the card before sending, and try to install your bot in the conversation if the bot is already installed.

# [C#/.NET](#tab/dotnet)

```csharp
protected override async Task<MessagingExtensionActionResponse> OnTeamsMessagingExtensionSubmitActionAsync(
  ITurnContext<IInvokeActivity> turnContext, MessagingExtensionAction action, CancellationToken cancellationToken)
{
  dynamic createCardData = ((JObject) action.Data).ToObject(typeof(JObject));
  var response = new MessagingExtensionActionResponse
  {
    ComposeExtension = new MessagingExtensionResult
    {
      Type = "botMessagePreview",
      ActivityPreview = MessageFactory.Attachment(new Attachment
      {
        Content = new AdaptiveCard("1.0")
        {
          Body = new List<AdaptiveElement>()
          {
            new AdaptiveTextBlock() { Text = "FormField1 value was:", Size = AdaptiveTextSize.Large },
            new AdaptiveTextBlock() { Text = Data["FormField1"] as string }
          },
          Height = AdaptiveHeight.Auto,
          Actions = new List<AdaptiveAction>()
          {
            new AdaptiveSubmitAction
            {
              Type = AdaptiveSubmitAction.TypeName,
              Title = "Submit",
              Data = new JObject { { "submitLocation", "messagingExtensionFetchTask" } },
            },
          }
        },
        ContentType = AdaptiveCard.ContentType
      }) as Activity
    }
  };

  return response;
}
```

# [JavaScript/Node.js](#tab/javascript)

```javascript
class TeamsMessagingExtensionsActionPreview extends TeamsActivityHandler {
  handleTeamsMessagingExtensionSubmitAction(context, action) {
    const submittedData = action.data;
    const adaptiveCard = CardFactory.adaptiveCard({
      actions: [
        { type: 'Action.Submit', title: 'Submit', data: { submitLocation: 'messagingExtensionSubmit' } }
      ],
      body: [
          { text: 'Adaptive Card from Task Module', type: 'TextBlock', weight: 'bolder' },
          { text: `${ submittedData.Question }`, type: 'TextBlock', id: 'Question' },
          { id: 'Answer', placeholder: 'Answer here...', type: 'Input.Text' },
        {
          choices: [
            { title: submittedData.Option1, value: submittedData.Option1 },
            { title: submittedData.Option2, value: submittedData.Option2 },
            { title: submittedData.Option3, value: submittedData.Option3 }
          ],
          id: 'Choices',
          isMultiSelect: submittedData.MultiSelect,
          style: 'expanded',
          type: 'Input.ChoiceSet'
        }
      ],
      type: 'AdaptiveCard',
      version: '1.0'
    });
    return {
      composeExtension: {
        activityPreview: MessageFactory.attachment(adaptiveCard, null, null, InputHints.ExpectingInput),
        type: 'botMessagePreview'
      }
    };
  }
}
```

# [JSON](#tab/json)

> [!NOTE]
>
> * The `activityPreview` must contain a `message` activity with exactly one Adaptive Card attachment. The `<< Card Payload >>` value is a placeholder for the card you want to send.

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

### The botMessagePreview send and edit events

Your message extension must respond to two new types of the `composeExtensions/submitAction` invoke, where `value.botMessagePreviewAction = "send"`and `value.botMessagePreviewAction = "edit"`.

# [C#/.NET](#tab/dotnet)

```csharp
protected override async Task<MessagingExtensionActionResponse> OnTeamsMessagingExtensionBotMessagePreviewEditAsync(
  ITurnContext<IInvokeActivity> turnContext, MessagingExtensionAction action, CancellationToken cancellationToken)
{
  //handle the event
}

protected override async Task<MessagingExtensionActionResponse> OnTeamsMessagingExtensionBotMessagePreviewSendAsync(
  ITurnContext<IInvokeActivity> turnContext, MessagingExtensionAction action, CancellationToken cancellationToken)
{
  //handle the event
}

```

# [JavaScript/Node.js](#tab/javascript)

```javascript
class TeamsMessagingExtensionsActionPreview extends TeamsActivityHandler {
  handleTeamsMessagingExtensionBotMessagePreviewEdit(context, action) {

    //handle the event
  }
  
  handleTeamsMessagingExtensionBotMessagePreviewSend(context, action) {

    //handle the event
  }
}

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
    "botMessagePreviewAction": "edit | send",
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

### Respond to botMessagePreview edit

If the user edits the card before sending, by selecting **Edit**, you receive a `composeExtensions/submitAction` invoke with `value.botMessagePreviewAction = edit`. Respond by returning the dialog you sent, in response to the initial `composeExtensions/fetchTask` invoke that began the interaction. The user can start the process by reentering the original information. Use the available information to update the dialog so that the user doesn't need to fill out all information from scratch.
For more information on responding to the initial `fetchTask` event, see [responding to the initial `fetchTask` event](~/messaging-extensions/how-to/action-commands/create-task-module.md).

### Respond to botMessagePreview send

After the user selects the **Send**, you receive a `composeExtensions/submitAction` invoke with `value.botMessagePreviewAction = send`. Your web service must create and send a message with the Adaptive Card to the conversation, and also reply to the invoke.

# [C#/.NET](#tab/dotnet)

```csharp
protected override async Task<MessagingExtensionActionResponse> OnTeamsMessagingExtensionBotMessagePreviewSendAsync(
  ITurnContext<IInvokeActivity> turnContext, MessagingExtensionAction action, CancellationToken cancellationToken)
{
  var activityPreview = action.BotActivityPreview[0];
  var attachmentContent = activityPreview.Attachments[0].Content;
  var previewedCard = JsonConvert.DeserializeObject<AdaptiveCard>(attachmentContent.ToString(),
          new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
  
  previewedCard.Version = "1.0";

  var responseActivity = Activity.CreateMessageActivity();
  Attachment attachment = new Attachment()
  {
    ContentType = AdaptiveCard.ContentType,
    Content = previewedCard
  };
  responseActivity.Attachments.Add(attachment);
  
  // Attribute the message to the user on whose behalf the bot is posting
  responseActivity.ChannelData = new {
    OnBehalfOf = new []
    {
      new
      {
        ItemId = 0,
        MentionType = "person",
        Mri = turnContext.Activity.From.Id,
        DisplayName = turnContext.Activity.From.Name
      }  
    }
  };
  
  await turnContext.SendActivityAsync(responseActivity);

  return new MessagingExtensionActionResponse();
}
```

# [JavaScript/Node.js](#tab/javascript)

```javascript
class TeamsMessagingExtensionsActionPreview extends TeamsActivityHandler {
    async handleTeamsMessagingExtensionBotMessagePreviewSend(context, action) {
      // The data has been returned to the bot in the action structure.
      const activityPreview = action.botActivityPreview[0];
      const attachmentContent = activityPreview.attachments[0].content;
      const userText = attachmentContent.body[1].text;
      const choiceSet = attachmentContent.body[3];

      const submitData = {
        MultiSelect: choiceSet.isMultiSelect ? 'true' : 'false',
        Option1: choiceSet.choices[0].title,
        Option2: choiceSet.choices[1].title,
        Option3: choiceSet.choices[2].title,
        Question: userText
      };

      const adaptiveCard = CardFactory.adaptiveCard({
        actions: [
          { type: 'Action.Submit', title: 'Submit', data: { submitLocation: 'messagingExtensionSubmit' } }
        ],
        body: [
          { text: 'Adaptive Card from Task Module', type: 'TextBlock', weight: 'bolder' },
          { text: `${ submitData.Question }`, type: 'TextBlock', id: 'Question' },
          { id: 'Answer', placeholder: 'Answer here...', type: 'Input.Text' },
          {
            choices: [
                { title: submitData.Option1, value: submitData.Option1 },
                { title: submitData.Option2, value: submitData.Option2 },
                { title: submitData.Option3, value: submitData.Option3 }
            ],
            id: 'Choices',
            isMultiSelect: submitData.MultiSelect,
            style: 'expanded',
            type: 'Input.ChoiceSet'
          }
        ],
        type: 'AdaptiveCard',
        version: '1.0'
      });
      const responseActivity = { type: 'message', attachments: [adaptiveCard], channelData: {
          onBehalfOf: [
              { itemId: 0, mentionType: 'person', mri: context.activity.from.id, displayname: context.activity.from.name }
          ]
      }};

      await context.sendActivity(responseActivity);
    }
}
```

# [JSON](#tab/json)

You receive a new `composeExtensions/submitAction` message similar to the following json:

```json
{
  "name": "composeExtension/submitAction",
  "type": "invoke",
  "conversation": { "id": "19:c366b75791784100b6e8b515fd55b063@thread.skype" },
  "imdisplayname": "Pranav Smith",
  ...
  "value": {
    "botMessagePreviewAction": "send",
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

### User attribution for bots messages

In scenarios where a bot sends messages on behalf of a user, attributing the message to that user helps with engagement and display a more natural interaction flow. This feature lets the bot show messages on behalf of a user with the user's name displayed in the Adaptive Card response header.

The following images display an Adaptive Card message sent by a bot. The left-side image is without user attribution and the right-side image is with user attribution. The image with user attribution displays the name of the user in the format: username via bot **(Megan Bowen via Poll)** in the Adaptive Card header.

:::image type="content" source="../../../assets/images/messaging-extension/user-attribution-bots.png" alt-text="User attribution bots":::

To use the user attribution in teams, you must add the `OnBehalfOf` mention entity to `ChannelData` in your `Activity` payload that is sent to Teams.

# [C#/.NET](#tab/dotnet-1)

```csharp
// Attribute the message to the user on whose behalf the bot is posting
  responseActivity.ChannelData = new {
    OnBehalfOf = new []
    {
      new
      {
        ItemId = 0,
        MentionType = "person",
        Mri = turnContext.Activity.From.Id,
        DisplayName = turnContext.Activity.From.Name
      }  
    }
  };

```

# [JavaScript/Node.js](#tab/javascript-1)

```javascript
    const responseActivity = { type: 'message', attachments: [adaptiveCard], channelData: {
        onBehalfOf: [ { 
            itemId: 0, 
            mentionType: 'person', 
            mri: context.activity.from.id, 
            displayname: context.activity.from.name 
            }
        ]
    }};
```

# [JSON](#tab/json-1)

```json
{
    "text": "Hello World!",
    "ChannelData": {
        "OnBehalfOf": [{
            "itemid": 0,
            "mentionType": "person",
            "mri": "29:orgid:89e6508d-6c0f-4ffe-9f6a-b58416d965ae",
            "displayName": "Sowrabh N R S"
        }]
    }
}
```

* * *

#### Details of  `OnBehalfOf` entity schema

The following section is a description of the entities in the `OnBehalfOf` Array:

|Field|Type|Description|
|:---|:---|:---|
|`itemId`|Integer|Describes identification of the item. Its value must be `0`.|
|`mentionType`|String|Describes the mention of a "person". |
|`mri`|String|Message resource identifier​ (MRI) of the person on whose behalf the message is sent. Message sender name would appear as "\<user\> through \<bot name\>." |
|`displayName`|String|Name of the person. Used as fallback in case name resolution is unavailable.|
  
## Code sample

| Sample name           | Description | .NET    | Node.js   | Manifest|
|:---------------------|:--------------|:---------|:--------|:--------|
|Teams message extension action| This sample shows how to define action commands, create dialog, and respond to dialog submit action. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-action/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-action/nodejs) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-action/csharp/demo-manifest/msgext-action.zip)
|Message extension action preview| This sample shows how to use action preview in Messaging Extensions using Bot Framework v4. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-action-preview/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-action-preview/nodejs) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-action-preview/csharp/demo-manifest/msgext-action-preview.zip) |
|Teams message extension search   |  This sample shows how to build a Search-based Message Extension. It searches NuGet packages and displays the results in search based messaging extension.|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-search/csharp/demo-manifest/msgext-search.zip)

## Next Step

> [!div class="nextstepaction"]
> [Define search commands](~/messaging-extensions/how-to/search-commands/define-search-command.md)

## See also

* [App manifest schema for Teams](../../../resources/schema/manifest-schema.md)
* [Respond to search command](../search-commands/respond-to-search.md)
* [Message extensions](../../what-are-messaging-extensions.md)
