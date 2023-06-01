---
title: Use dialogs (task modules) in Microsoft Teams bots
description: Learn how to use dialogs with Microsoft Teams bots, including Bot Framework cards, Adaptive cards, and deep links.
ms.localizationpriority: medium
ms.topic: how-to
---

# Use dialogs with bots

Dialogs (formerly known as *task modules*) can be invoked from Microsoft Teams bots using buttons on Adaptive Cards and Bot Framework cards that are hero, thumbnail, and connector for Microsoft 365 Groups. Dialogs are often a better user experience than multiple conversation steps. You can keep track of bot state and allow the user to interrupt or cancel the sequence.

There are two ways of invoking dialogs:

* A new invoke message `task/fetch`: Using the `invoke` [card action](~/task-modules-and-cards/cards/cards-actions.md#action-type-invoke) for Bot Framework cards, or the `Action.Submit` [card action](~/task-modules-and-cards/cards/cards-actions.md#adaptive-cards-actions) for Adaptive Cards, with `task/fetch`, either an HTML- or Adaptive Card-based dialog is fetched dynamically from your bot.
* Deep link URLs: Using the [deep link syntax for dialogs](~/concepts/build-and-test/deep-link-application.md#deep-link-to-open-a-dialog), you can use the `openUrl` [card action](~/task-modules-and-cards/cards/cards-actions.md#action-type-openurl) for Bot Framework cards or the `Action.OpenUrl` [card action](~/task-modules-and-cards/cards/cards-actions.md#adaptive-cards-actions) for Adaptive Cards, respectively. With deep link URLs, the dialog URL or Adaptive Card body is already known to avoid a server round-trip relative to `task/fetch`.

The next section provides details on invoking a dialog using `task/fetch`.

## Invoke a dialog using `task/fetch`

When the `value` object of the `invoke` card action or `Action.Submit` is initialized and when a user selects the button, an `invoke` message is sent to the bot. In the HTTP response to the `invoke` message, there's a [DialogInfo object](./invoking-task-modules.md#dialoginfo-object) embedded in a wrapper object, which Teams uses to display the dialog.

:::image type="content" source="../../assets/images/task-module/task-module-invoke-request-response.png" alt-text="task/fetch request or response":::

Here's how a dialog is invoked using `task/fetch`:

1. The image shows a Bot Framework hero card with a **Buy** `invoke` [card action](~/task-modules-and-cards/cards/cards-actions.md#action-type-invoke). The value of the `type` property is `task/fetch` and the rest of the `value` object can be of your choice.
1. The bot receives the `invoke` HTTP POST message.
1. The bot creates a response object and returns it in the body of the POST response with an HTTP 200 response code. For more information on schema for responses, see the [discussion on task/submit](#responses-to-tasksubmit-messages). The following code provides an example of body of the HTTP response that contains a [TaskInfo object](~/task-modules-and-cards/task-modules/invoking-task-modules.md#dialoginfo-object) embedded in a wrapper object:

    ```json
    {
      "task": {
        "type": "continue",
        "value": {
          "title": "Dialog (task module) title",
          "height": 500,
          "width": "medium",
          "url": "https://contoso.com/msteams/taskmodules/newcustomer",
          "fallbackUrl": "https://contoso.com/msteams/taskmodules/newcustomer"
        }
      }
    }
    ```

    The `task/fetch` event and its response for bots is similar to the `microsoftTeams.tasks.startTask()` function in the TeamsJS library.

1. Microsoft Teams displays the dialog.

The next section provides details on submitting the result of a dialog.

## Submit the result of a dialog

When the user is finished with the dialog, submitting the result back to the bot is similar to the way it works with tabs. For more information, see [example of submitting the result of a dialog](./task-modules-tabs.md#example-of-submitting-the-result-of-a-dialog). There are a few differences as follows:

* HTML or JavaScript that is `UrlDialogInfo.url`: Once you've validated what the user has entered, call the `microsoftTeams.dialog.url.submit()`. You can call `submit()` without any parameters if you want Teams to simply close the dialog, but you must pass an object or a string to your `submitHandler` as the first parameter, `result`. Teams will then invoke your submitHandler with `err` as `null`, and `result` as the object or string you passed to `submit()`. If you call `submit()` with a `result` parameter, you must pass an `appId` or an array of `appId` strings. This allows Teams to validate that the app sending the result is the same one that invoked the dialog. Your bot then receives a `task/submit` message including `result`. For more information, see [payload of `task/fetch` and `task/submit` messages](#payload-of-taskfetch-and-tasksubmit-messages).
* Adaptive Card that is `AdaptiveCardDialogInfo.card`: The Adaptive Card body as filled in by the user is sent to the bot through a `task/submit` message when the user selects any `Action.Submit` button.

The next section provides details on how to respond to the `task/submit` messages.

## Responses to `task/submit` messages

When the user finishes with a dialog invoked from a bot, the bot always receives a `task/submit invoke` message. You have several options when responding to the `task/submit` message as follows:

| HTTP body response                      | Scenario                                |
| --------------------------------------- | --------------------------------------- |
| None ignore the `task/submit` message | The simplest response is no response at all. Your bot isn't required to respond when the user is finished with the dialog. |
| <pre>{<br/>  "task": {<br/>    "type": "message",<br/>    "value": "Message text"<br/>  }<br/>}</pre> | Teams displays the value of `value` in a pop-up message box. |
| <pre>{<br/>  "task": {<br/>    "type": "continue",<br/>    "value": &lt;TaskInfo object&gt;<br/>  }<br/>}</pre> | Allows you to chain sequences of Adaptive Cards together in a wizard or multi-step experience. |

> [!NOTE]
> Chaining Adaptive Cards into a sequence is an advanced scenario. The Node.js sample app supports it. For more information, see [Microsoft Teams task module Node.js](https://github.com/OfficeDev/microsoft-teams-sample-task-module-nodejs#implementation-notes).

The next section provides details on payload of `task/fetch` and `task/submit` messages.

## Payload of `task/fetch` and `task/submit` messages

This section defines the schema of what your bot receives when it receives a `task/fetch` or `task/submit` Bot Framework `Activity` object. The following table provides the properties of payload of `task/fetch` and `task/submit` messages:

| Property | Description                          |
| -------- | ------------------------------------ |
| `type`   | Is always `invoke`.           |
| `name`   | Is either `task/fetch` or `task/submit`. |
| `value`  | Is the developer-defined payload. The structure of the `value` object is the same as what is sent from Teams. In this case, however, it's different. It requires support for dynamic fetch that is `task/fetch` from both Bot Framework, which is `value` and Adaptive Card `Action.Submit` actions, which is `data`. A way to communicate Teams `context` to the bot is required in addition to what is included in `value` or `data`.<br/><br/>Combine 'value' and 'data' into a parent object:<br/><br/><pre>{<br/>  "context": {<br/>    "theme": "default" &vert; "dark" &vert; "contrast",<br/>  },<br/>  "data": [value field from Bot Framework card] &vert; [data field from Adaptive Card] <br/>}</pre>  |

The next section provides an example of receiving and responding to `task/fetch` and `task/submit` invoke messages in Node.js.

 The following tabs provides `task/fetch` and `task/submit` invoke messages in Node.js and C#:

# [Node.js](#tab/nodejs)

```typescript
handleTeamsTaskModuleFetch(context, taskModuleRequest) {
    // Called when the user selects an options from the displayed HeroCard or
    // AdaptiveCard.  The result is the action to perform.

    const cardTaskFetchValue = taskModuleRequest.data.data;
    var taskInfo = {}; // TaskModuleTaskInfo

    if (cardTaskFetchValue === TaskModuleIds.YouTube) {
        // Display the YouTube.html page
        taskInfo.url = taskInfo.fallbackUrl = this.baseUrl + '/' + TaskModuleIds.YouTube + '.html';
        this.setTaskInfo(taskInfo, TaskModuleUIConstants.YouTube);
    } else if (cardTaskFetchValue === TaskModuleIds.CustomForm) {
        // Display the CustomForm.html page, and post the form data back via
        // handleTeamsTaskModuleSubmit.
        taskInfo.url = taskInfo.fallbackUrl = this.baseUrl + '/' + TaskModuleIds.CustomForm + '.html';
        this.setTaskInfo(taskInfo, TaskModuleUIConstants.CustomForm);
    } else if (cardTaskFetchValue === TaskModuleIds.AdaptiveCard) {
        // Display an AdaptiveCard to prompt user for text, and post it back via
        // handleTeamsTaskModuleSubmit.
        taskInfo.card = this.createAdaptiveCardAttachment();
        this.setTaskInfo(taskInfo, TaskModuleUIConstants.AdaptiveCard);
    }

    return TaskModuleResponseFactory.toTaskModuleResponse(taskInfo);
}

async handleTeamsTaskModuleSubmit(context, taskModuleRequest) {
    // Called when data is being returned from the selected option (see `handleTeamsTaskModuleFetch').

    // Echo the users input back.  In a production bot, this is where you'd add behavior in
    // response to the input.
    await context.sendActivity(MessageFactory.text('handleTeamsTaskModuleSubmit: ' + JSON.stringify(taskModuleRequest.data)));

    // Return TaskModuleResponse
    return {
        // TaskModuleMessageResponse
        task: {
            type: 'message',
            value: 'Thanks!'
        }
    };
}

setTaskInfo(taskInfo, uiSettings) {
    taskInfo.height = uiSettings.height;
    taskInfo.width = uiSettings.width;
    taskInfo.title = uiSettings.title;
}
```

# [C#](#tab/csharp)

```csharp
protected override Task<TaskModuleResponse> OnTeamsTaskModuleFetchAsync(ITurnContext<IInvokeActivity> turnContext, TaskModuleRequest taskModuleRequest, CancellationToken cancellationToken)
{
    var asJobject = JObject.FromObject(taskModuleRequest.Data);
    var value = asJobject.ToObject<CardTaskFetchValue<string>>()?.Data;

    var taskInfo = new TaskModuleTaskInfo();
    switch (value)
    {
        case TaskModuleIds.YouTube:
            taskInfo.Url = taskInfo.FallbackUrl = _baseUrl + "/" + TaskModuleIds.YouTube;
            SetTaskInfo(taskInfo, TaskModuleUIConstants.YouTube);
            break;
        case TaskModuleIds.CustomForm:
            taskInfo.Url = taskInfo.FallbackUrl = _baseUrl + "/" + TaskModuleIds.CustomForm;
            SetTaskInfo(taskInfo, TaskModuleUIConstants.CustomForm);
            break;
        case TaskModuleIds.AdaptiveCard:
            taskInfo.Card = CreateAdaptiveCardAttachment();
            SetTaskInfo(taskInfo, TaskModuleUIConstants.AdaptiveCard);
            break;
        default:
            break;
    }

    return Task.FromResult(taskInfo.ToTaskModuleResponse());
}

protected override async Task<TaskModuleResponse> OnTeamsTaskModuleSubmitAsync(ITurnContext<IInvokeActivity> turnContext, TaskModuleRequest taskModuleRequest, CancellationToken cancellationToken)
{
    var reply = MessageFactory.Text("OnTeamsTaskModuleSubmitAsync Value: " + JsonConvert.SerializeObject(taskModuleRequest));
    await turnContext.SendActivityAsync(reply, cancellationToken);

    return TaskModuleResponseFactory.CreateResponse("Thanks!");
}

private static void SetTaskInfo(TaskModuleTaskInfo taskInfo, UISettings uIConstants)
{
    taskInfo.Height = uIConstants.Height;
    taskInfo.Width = uIConstants.Width;
    taskInfo.Title = uIConstants.Title.ToString();
}
```

---

### Bot Framework card actions vs. Adaptive Card Action.Submit actions

The schema for Bot Framework card actions is different from Adaptive Card `Action.Submit` actions and the way to invoke dialogs is also different. The `data` object in `Action.Submit` contains an `msteams` object so it doesn't interfere with other properties in the card. The following table shows an example of each card action:

| Bot Framework card action                              | Adaptive Card Action.Submit action                     |
| ------------------------------------------------------ | ------------------------------------------------------ |
| <pre>{<br/>  "type": "invoke",<br/>  "title": "Buy",<br/>  "value": {<br/>    "type": "task/fetch",<br/>    &lt;...&gt;<br/>  }<br/>}</pre> | <pre>{<br/>  "type": "Action.Submit",<br/>  "id": "btnBuy",<br/>  "title": "Buy",<br/>  "data": {<br/>    &lt;...&gt;,<br/>    "msteams": {<br/>      "type": "task/fetch"<br/>    }<br/>  }<br/>}</pre>  |

## Code sample

|Sample name | Description | .NET | Node.js | Manifest|
|----------------|-----------------|--------------|----------------|----------------|
|Task module sample bots-V4 | This sample shows how to create dialogs using bot framework v4 and Teams tab. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-task-module/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-task-module/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-task-module/csharp/demo-manifest/bot-task-module.zip)

## Step-by-step guide

Follow the [step-by-step guide](../../sbs-botbuilder-taskmodule.yml) to create and fetch bot-based dialogs in Teams.

## See also

* [Cards and dialogs](../cards-and-task-modules.md)
* [Microsoft Teams task module sample code in Node.js](https://github.com/OfficeDev/microsoft-teams-sample-task-module-nodejs/blob/master/src/TeamsBot.ts)
* [Bot Framework samples](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/README.md)
