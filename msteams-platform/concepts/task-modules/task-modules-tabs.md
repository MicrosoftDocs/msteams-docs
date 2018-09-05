---
title: Using Task Modules in Microsoft Teams tabs
description: Explains how invoke task modules from Teams tabs using the Microsoft Teams client SDK.
keywords: task modules teams tabs client sdk
ms.date: 09/05/2018
---
# Using task modules in tabs

Many, if not most, Microsoft Teams tabs use the [Microsoft Teams client SDK](https://docs.microsoft.com/en-us/javascript/api/overview/msteams-client). To support the task module feature, two new functions were added:

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

Let's see how each of them work.

## Invoking a task module from a tab

To invoke a task module from a tab, use `microsoftTeams.tasks.startTask()` from the tab, passing a [TaskInfo object](~\concepts\task-modules\task-modules-overview#the-taskinfo-object) and an optional `submitHandler` callback function. As described earlier, there are two cases to consider:

1. The value of `TaskInfo.url` is set to a URL. The task module window appears and `TaskModule.url` is loaded as an `<iframe>` inside it. JavaScript on that page should call `microsoftTeams.initialize()`. If there is a `submitHandler` function on the page and there is an error when invoking `microsoftTeams.tasks.startTask()`, then `submitHandler` is invoked with `err` set to the error string indicating the error as described [below]((#task-module-invocation-errors)).
1. The value of `taskInfo.card` is the [JSON for an Adaptive card](~\concepts\task-modules\task-modules-overview#adaptive-card-or-adaptive-card-bot-card-attachment). In this case there's obviously not any JavaScript `submitHandler` function to call when the user closes or presses a button on the Adaptive card; the only way to receive what the user entered is by passing the result to a bot. In other words, to use an Adaptive card task module from a tab, your app must include a bot if you want to get any information back from the user. This is explained below.

## Example: invoking a task module

The code below is adapted from [the task module sample](~\concepts\task-modules\task-modules-overview#task-module-sample). Here's what the task module looks like: it's a simple HTML form.

![Task Module - Custom Form](~/assets/images/task-module/task-module-custom-form.png)

The `submitHandler` is very simple; it just echoes the value of `err` or `result` to the console:

```javascript
let taskInfo = {
    appId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
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

[Below](#example-submitting-the-result-of-a-task-module) you'll see the code for the value of `result` is set.

## Submitting the result of a task module

The `submitHandler` function is used with `TaskInfo.url`: the `submitHandler` function resides in the `TaskInfo.url` web page. If there's an error when invoking the task module, your `submitHandler` function will be immediately invoked with an `err` string [indicating which error occurred](#task-module-invocation-errors). The `submitHandler` function is also called with an `err` string when the user presses the X at the upper right of task module, if you want to detect that.

If there's no invocation error and the user doesn't press X to dismiss it, the user presses a button when finished. Depending on whether it's a URL or an Adaptive card in the task module, here's what happens:

* **HTML/JavaScript (`TaskInfo.url`)**. Once you've validated what the user has entered, you call the `microsoftTeams.tasks.submitTask()` SDK function (referred to hereafter as `submitTask()` for readability purposes). You can call `submitTask()` without any parameters if you just want Teams to close the task module, but most of the time you'll want to pass an object or a string to your `submitHandler`. Simply pass it as the first parameter, `result`. Teams will invoke `submitHandler`: `err` will be `null` and `result` will be the object/string you passed to `submitTask()`. If you do call `submitTask()` with a `result` parameter, you **must** pass an `appId` or an array of `appId` strings: this allows Teams to validate that the app sending the result is the same one which invoked the task module.
* **Adaptive card (`TaskInfo.card`)**. As mentioned briefly above, if your app contains a bot in addition to a tab, simply include the `appId` of the bot as the value of `completionBotId` in the `TaskInfo` object. The Adaptive card body (as filled in by the user) will be sent to the bot via a `task/submit invoke` message when the user presses an `Action.Submit` button. The schema for the object you receive is very similar to [the schema you receive for task/fetch and task/submit messages](~/concepts/task-modules/task-modules-bots#payload-of-task-fetch-and-task-submit-messages); the only difference is that the schema of the JSON object is slightly different: it's an Adaptive card object as opposed to an object *containing* an Adaptive card object as [when Adaptive cards are used with bots](~/concepts/task-modules/task-modules-bots#payload-of-task-fetch-and-task-submit-messages).

## Example: submitting the result of a task module

Recall the [form in the task module above](#example-invoking-a-task-module) with an HTML form. Here's where the form is defined:

```html
<form method="POST" id="customerForm" action="/register" onSubmit="return validateForm()">
```

There are five fields on this form, but we're only interested in the values of three of them for this example: `name`, `email`, and `favoriteBook`.

Here's the `validateForm()` function that calls `submitTask()`:

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

## Task module invocation errors

Here are the possible values of `err` that can be received by your `submitHandler`:

| Problem | Error message (value of `err`) |
| ------- | ------------------------------ |
| Values for both `TaskInfo.url` and `TaskInfo.card` were specified. | "Values for both card and url were specified. One or the other, but not both, are allowed." |
| Neither `TaskInfo.url` nor `TaskInfo.card` specified. | "You must specify a value for either card or url." |
| Invalid appId. | "Invalid appId." |
| User pressed X button, closing it. | "User cancelled/closed the task module." |