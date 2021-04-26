---
title: Use Task Modules in Microsoft Teams tabs
description: Explains how to invoke task modules from Teams tabs using the Microsoft Teams client SDK.
localization_priority: Normal
ms.topic: how-to
keywords: task modules teams tabs client sdk
---

# Use task modules in tabs

Add a task module to your tab to simplify your user's experience for any workflows that require data input. Task modules allow you to gather their input in a Teams-aware pop-up. A good example of this is editing Planner cards. You can use task modules to create a similar experience.

To support the task module feature, two new functions are added to the [Microsoft Teams client SDK](/javascript/api/overview/msteams-client). The following code shows an example of these two new functions:

```typescript
microsoftTeams.tasks.startTask(
    taskInfo: TaskInfo,
    submitHandler?: (err: string, result: string | any) => void
): void;

microsoftTeams.tasks.submitTask(
    result?: string | any,
    appIds?: string | string[]
): void;
```

Now, you can see how invoking a task module from a tab and submitting the result of a task module works.

## Invoke a task module from a tab

To invoke a task module from a tab use `microsoftTeams.tasks.startTask()` passing a [TaskInfo object](~/task-modules-and-cards/task-modules/invoking-task-modules.md#the-taskinfo-object) and an optional `submitHandler` callback function. There are two cases to consider:

1. The value of `TaskInfo.url` is set to a URL. The task module window appears and `TaskModule.url` is loaded as an `<iframe>` inside it. JavaScript on that page calls `microsoftTeams.initialize()`. If there is a `submitHandler` function on the page and there is an error when invoking `microsoftTeams.tasks.startTask()`, then `submitHandler` is invoked with `err` set to the error string indicating the error. For more information, see [task module invocation errors](#task-module-invocation-errors).
1. The value of `taskInfo.card` is the [JSON for an Adaptive Card](~/task-modules-and-cards/task-modules/invoking-task-modules.md#adaptive-card-or-adaptive-card-bot-card-attachment). In this case there is no JavaScript `submitHandler` function to call when the user closes or presses a button on the Adaptive Card. The only way to receive what the user entered is by passing the result to a bot. To use an Adaptive Card task module from a tab your app must include a bot to get any information back from the user.

The next section gives an example of invoking a task module.

## Example of invoking a task module

The following image displays what the task module looks like:

![Task Module - Custom Form](~/assets/images/task-module/task-module-custom-form.png)

The following code is adapted from [the task module sample](~/task-modules-and-cards/task-modules/invoking-task-modules.md#code-sample).

```javascript
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

The `submitHandler` is very simple and it echoes the value of `err` or `result` to the console.

## Submit the result of a task module

The `submitHandler` function is used with `TaskInfo.url`. The `submitHandler` function resides in the `TaskInfo.url` web page. If there is an error when invoking the task module your `submitHandler` function is immediately invoked with an `err` string indicating what [error occurred](#task-module-invocation-errors). The `submitHandler` function is also called with an `err` string when the user presses the X at the upper right of task module.

If there is no invocation error and the user does not press X to dismiss it, the user presses a button when finished. Depending on whether it is a URL or an Adaptive Card in the task module, the next sections provide details on what occurs.

### HTML or JavaScript `TaskInfo.url`

Once you have validated what the user has entered, you call the `microsoftTeams.tasks.submitTask()` SDK function referred to hereafter as `submitTask()` for readability purposes. You can call `submitTask()` without any parameters if you just want Teams to close the task module. You can pass an object or a string to your `submitHandler`.

Pass your result as the first parameter. Teams invokes `submitHandler` where `err` is `null` and `result` is the object or string you passed to `submitTask()`. If you do call `submitTask()` with a `result` parameter, you must pass an `appId` or an array of `appId` strings. This allows Teams to validate that the app sending the result is the same one which invoked the task module.

### Adaptive Card `TaskInfo.card`

If you invoked the task module with a `submitHandler`, when the user presses an `Action.Submit` button the values in the card are returned as the value of `result`. If the user presses the Esc button or presses the X, `err` is returned instead. Alternatively, if your app contains a bot in addition to a tab you can simply include the `appId` of the bot as the value of `completionBotId` in the `TaskInfo` object. The Adaptive Card body as filled in by the user is sent to the bot using a `task/submit invoke` message when the user presses an `Action.Submit` button. The schema for the object you receive is very similar to [the schema you receive for task/fetch and task/submit messages](~/task-modules-and-cards/task-modules/task-modules-bots.md#payload-of-taskfetch-and-tasksubmit-messages). The only difference is that the schema of the JSON object is an Adaptive Card object as opposed to an object containing an Adaptive Card object as [when Adaptive cards are used with bots](~/task-modules-and-cards/task-modules/task-modules-bots.md#payload-of-taskfetch-and-tasksubmit-messages).

The next section gives an example of submitting the result of a task module.

## Example of submitting the result of a task module

See the [form in the task module](#example-of-invoking-a-task-module) with an HTML form. The following code gives an example of where the form is defined:

```html
<form method="POST" id="customerForm" action="/register" onSubmit="return validateForm()">
```

There are five fields on this form but for this example only three values are required, `name`, `email`, and `favoriteBook`.

The following code gives an example of the `validateForm()` function that calls `submitTask()`:

```javascript
function validateForm() {
    var customerInfo = {
        name: document.forms["customerForm"]["name"].value,
        email: document.forms["customerForm"]["email"].value,
        favoriteBook: document.forms["customerForm"]["favoriteBook"].value
    }
    microsoftTeams.tasks.submitTask(customerInfo, "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");
    return true;
}
```

The next section provides task module invocation problems and their error messages.

## Task module invocation errors

The following table provides the possible values of `err` that can be received by your `submitHandler`:

| Problem | Error message that is value of `err` |
| ------- | ------------------------------ |
| Values for both `TaskInfo.url` and `TaskInfo.card` were specified. | Values for both card and URL were specified. One or the other, but not both, are allowed. |
| Neither `TaskInfo.url` nor `TaskInfo.card` specified. | You must specify a value for either card or URL. |
| Invalid `appId`. | Invalid appId. |
| User pressed X button, closing it. | User cancelled or closed the task module. |

## See also

> [!div class="nextstepaction"]
> [Using task modules in bots](~/task-modules-and-cards/task-modules/task-modules-bots.md)