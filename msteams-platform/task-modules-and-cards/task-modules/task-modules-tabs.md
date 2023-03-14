---
title: Use dialogs in Microsoft Teams tabs
description: Learn how to invoke dialogs from Teams tabs and submit results using the Microsoft Teams client library (TeamsJS).
ms.localizationpriority: medium
ms.topic: how-to
---

# Use dialogs in tabs

You can add modal dialogs (formerly known as *task modules*) to your tabs to simplify the user experience for workflows that require data input. Dialogs allow you to gather user input in a Microsoft Teams-aware modal window. A good example of this is editing planner cards. You can use dialogs to create a similar experience.

The two main operations of dialogs involve opening and closing (submitting) them. The functions are slightly different for earlier versions (prior to v2.x.x) of the TeamsJS library:

# [TeamsJs v1](#tab/teamsjs1)

```typescript
// Same function is used for both HTML and Adaptive Card dialogs
microsoftTeams.tasks.startTask(
    taskInfo: TaskInfo,
    submitHandler?: (err: string, result: string | any) => void
): void;

// Only works for HTML dialogs (AC dialogs send result from Action.Submit)
microsoftTeams.tasks.submitTask(
    result?: string | any,
    appIds?: string | string[]
): void;
```

# [TeamsJs v2](#tab/teamsjs)

```typescript
// Open HTML dialog
microsoftTeams.dialog.url.open(
    urlDialogInfo: UrlDialogInfo, 
       submitHandler?: DialogSubmitHandler, 
       messageFromChildHandler?: PostMessageChannel
): void;

// Open Adaptive Card dialog
microsoftTeams.dialog.adaptiveCard.open(
    adaptiveCardDialogInfo: AdaptiveCardDialogInfo,
    submitHandler?: DialogSubmitHandler
): void;

// Submit HTML dialog (AC dialogs send result from Action.Submit)
   microsoftTeams.dialog.url.submit(
    result?: string | any,
    appIds?: string | string[]
): void;

```

> [!NOTE]
> The `dialog.submit` property can only be called within a dialog.

---

The following sections explain the process of invoking a dialog from a tab and submitting the result.

## Invoke a dialog from a tab

> [!NOTE]
> Starting with TeamsJS v2.8.x, the [dialog](/javascript/api/@microsoft/teams-js/dialog) namespace supports Adaptive Card-based dialogs, and thus fully replaces the functionality of the `tasks` namespace. The `tasks` namespace is still supported for backward-compatibility, however best practice is to update `tasks.startTask()` calls to `dialog.url.open` or `dialog.adaptiveCard.open` for HTML- and Adaptive Card-based dialogs, respectively. For more info, see the [dialog namespace](../../tabs/how-to/using-teams-client-library.md#dialog-namespace).

You can invoke either an HTML or Adaptive Card dialog from a tab.

### HTML dialog

```typescript
 microsoftTeams.dialog.url.open(urlDialogInfo, submitHandler);
```

The value of `UrlDialogInfo.url` is set to the location of the content of your dialog. The dialog window opens and `UrlDialogInfo.url` is loaded as an `<iframe>` inside it. JavaScript in the dialog page calls `microsoftTeams.app.initialize()`. If there's a `submitHandler` function on the page and there's an error when invoking `microsoftTeams.dialog.url.open()`, then `submitHandler` is invoked with `err` set to the error string indicating the same.

### Adaptive Card dialog

```typescript
 microsoftTeams.dialog.adaptiveCard.open(adaptiveCardDialogInfo, submitHandler);
```

The value of `adaptiveCardDialogInfo.card` is the [JSON for an Adaptive Card](../../task-modules-and-cards/task-modules/invoking-task-modules.md#adaptive-card-or-adaptive-card-bot-card-attachment). You can specify a `submitHandler` to be called with an *err* string, if there was an error when invoking open() or if the user closes the dialog using the **X** (Exit) button.

The next section gives an example of invoking a dialog.

## Example of invoking a dialog

The following image displays the dialog (task module):

:::image type="content" source="../../assets/images/task-module/task-module-custom-form.png" alt-text="Task Module Custom Form":::

The following code is adapted from [the task module sample](~/task-modules-and-cards/task-modules/invoking-task-modules.md#code-sample):

# [TeamsJs v1](#tab/teamsjs2)

```typescript
let taskInfo = {
    title: null,
    height: null,
    width: null,
    url: null,
    card: null,
    fallbackUrl: null,
    completionBotId: null,
};

taskInfo.url = "https://contoso.com/teamsapp/customform";
taskInfo.title = "Custom Form";
taskInfo.height = 510;
taskInfo.width = 430;
submitHandler = (err, result) => {
    console.log(`Submit handler - err: ${err}`);
    console.log(`Submit handler - result\rName: ${result.name}\rEmail: ${result.email}\rFavorite book: ${result.favoriteBook}`);
};
microsoftTeams.tasks.startTask(taskInfo, submitHandler);
```

# [TeamsJs v2](#tab/teamsjs3)

```typescript
let urlDialogInfo = {
    title: null,
    height: null,
    width: null,
    url: null,
    fallbackUrl: null
};

urlDialogInfo.url = "https://contoso.com/teamsapp/customform";
urlDialogInfo.title = "Custom Form";
urlDialogInfo.height = 510;
urlDialogInfo.width = 430;
submitHandler = (submitHandler) => {
        console.log(`Submit handler - err: ${submitHandler.err}`);
        alert("Result = " + JSON.stringify(submitHandler.result) + "\nError = " + JSON.stringify(submitHandler.err));
};

microsoftTeams.dialog.url.open(urlDialogInfo, submitHandler);
```

---

The `submitHandler` echoes the values of `err` or `result` to the console.

## Submit the result of a dialog

If there's an error when invoking the dialog, your `submitHandler` function is immediately invoked with an `err` string indicating what [error occurred](#task-module-invocation-errors). The `submitHandler` function is also called with an `err` string when the user selects **X** on the dialog to exit.

If there's no invocation error and the user doesn't select **X** to dismiss the dialog, the user selects a submit button when finished. The following sections explain what happens next for HTML and Adaptive Card dialog types.

### HTML or JavaScript dialogs

After validating user input, call `microsoftTeams.dialog.url.submit()`. You can call `submit()` without any parameters if you simply want Teams to close the dialog, or you can pass an object or string `result` back to your app as the first parameter, and an `appId` of the app that opened the dialog as the second parameter. If you call `submit()` with a `result` parameter, you must pass an `appId` (or an array of `appId` strings of apps authorized to receive the result of the dialog). This enables Teams to validate that the app sending the result is the same as the invoked dialog.

Teams will then invoke your `submitHandler` where `err` is *null* and `result` is the object or string you passed to `submit()`.

### Adaptive Card dialogs

When you invoke the dialog with a `submitHandler` and the user selects an `Action.Submit` button, the values in the card are returned as its `data` object. If the user presses the **Esc** key or selects **X** to exit the dialog, your `submitHandler` is called with the `err` string. If your app contains a bot in addition to a tab, you can include the `appId` of the bot as the value of `completionBotId` in the `TaskInfo` ([BotAdaptiveCardDialogInfo](/javascript/api/@microsoft/teams-js/botadaptivecarddialoginfo)) object.

The Adaptive Card body as filled in by the user is sent to the bot using a `task/submit invoke` message when the user selects an `Action.Submit` button. The schema for the object you receive is similar to [the schema you receive for task/fetch and task/submit messages](../../task-modules-and-cards/task-modules/task-modules-bots.md#payload-of-taskfetch-and-tasksubmit-messages).
The only difference is that the schema of the JSON object is an Adaptive Card object as opposed to an object containing an Adaptive Card object as [when Adaptive cards are used with bots](../../task-modules-and-cards/task-modules/task-modules-bots.md#payload-of-taskfetch-and-tasksubmit-messages).

The following is an example payload:

```json
{
  "task": {
    "type": "continue",
    "value": {
      "title": "Title",
      "height": "height",
      "width": "width",
      "url": null,
      "card": "Adaptive Card or Adaptive Card bot card attachment",
      "fallbackUrl": null,
      "completionBotID": "bot App ID"
    }
  }
}
```

The following is the example of Invoke request:

```javascript
let adaptiveCardDialogInfo = {
    title: "Dialog Demo",
    height: "medium",
    width: "medium",
    card: null
};

adaptiveCardDialogInfo.card = {
    "type": "AdaptiveCard",
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.5",
    "body": [
        {
            "type": "TextBlock",
            "text": "This is a sample adaptive card.",
            "wrap": true
        }
    ]
}

submitHandler = (err, result) => {
    console.log(`Submit handler - err: ${err}`);
    alert(
        "Result = " + JSON.stringify(result) + "\nError = " + JSON.stringify(err)
    );
};

microsoftTeams.dialog.adaptiveCard.open(adaptiveCardDialogInfo, submitHandler);

```

The next section provides an example of submitting the result of a dialog.

## Example of submitting the result of a dialog

Taking up the previous [example of invoking an HTML dialog](#example-of-invoking-a-dialog), here's an example of the HTML form embedded in the dialog:

```html
<form method="POST" id="customerForm" action="/register" onSubmit="return validateForm()">
```

There are five fields on this form but for this example only three values are required, `name`, `email`, and `favoriteBook`.

The following code gives an example of the `validateForm()` function that calls `submit()`:

```javascript
function validateForm() {
    var customerInfo = {
        name: document.forms["customerForm"]["name"].value,
        email: document.forms["customerForm"]["email"].value,
        favoriteBook: document.forms["customerForm"]["favoriteBook"].value
    }
    microsoftTeams.dialog.url.submit(customerInfo, "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"); // Valid AppId that should receive the result of the submitted dialog
    return true;
}
```

## Task module invocation errors

> [!NOTE]
> This section pertains to usage patterns for the `tasks` (task module) namespace, which is now deprecated in favor of the `dialog` namespace and its HTML (`url`), Adaptive Card (`adaptiveCard`), and bot (`dialog.url.bot` and `dialog.adaptiveCard.bot`) sub-namespaces.

The following table provides the possible values of `err` that can be received by your `submitHandler`:

| Problem | Error message that is value of `err` |
| ------- | ------------------------------ |
| Values for both `TaskInfo.url` and `TaskInfo.card` were specified. | Values for both card and URL were specified. One or the other, but not both, are allowed. |
| Neither `TaskInfo.url` nor `TaskInfo.card` specified. | You must specify a value for either card or URL. |
| Invalid `appId`. | Invalid app ID. |
| User selected X button, closing it. | User canceled or closed the task module. |

## Code sample

|Sample name | Description | .NET | Node.js|Manifest|
|----------------|-----------------|--------------|----------------|----------------|
|Task module sample using bot and tab | Samples for creating task modules. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-task-module/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-task-module/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-task-module/csharp/demo-manifest/bot-task-module.zip)|

## Next step

> [!div class="nextstepaction"]
> [Using dialogs from bots](~/task-modules-and-cards/task-modules/task-modules-bots.md)

## See also

* [Cards and dialogs](../cards-and-task-modules.md)
* [Invoke and dismiss dialogs](~/task-modules-and-cards/task-modules/invoking-task-modules.md)
