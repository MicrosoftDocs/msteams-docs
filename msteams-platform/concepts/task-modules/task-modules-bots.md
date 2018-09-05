---
title: Using Task Modules in Microsoft Teams bots
description: $TODO
keywords: task modules teams bots
ms.date: 09/04/2018
---
# Using task modules from Microsoft Teams bots

Task modules can also be invoked from Microsoft Teams bots using buttons on Adaptive cards and Bot Framework cards (Hero, Thumbnail, and Office 365 Connector). There are two ways of invoking task modules:

* **A new kind of invoke message, task/fetch.** Using the `invoke` [card action](~/concepts/cards/cards-actions#invoke) for Bot Framework cards, or the `Action.Submit` [card action](~/concepts/cards/cards-actions#adaptive-card-actions) for Adaptive cards. With `task/fetch`, the task module (either a URL or an Adaptive card) is fetched dynamically from your bot.
* **Deep link URLs.** Using the [deep link syntax for task modules](~/concepts/task-modules/task-modules-overview#task-module-deep-link-syntax), you can use the `openUrl` [card action](~/concepts/cards/cards-actions#openurl) for Bot Framework cards, or the `Action.OpenUrl` [card action](~/concepts/cards/cards-actions#adaptive-card-actions) for Adaptive cards. With deep link URLs, the task module URL or Adaptive card body is obviously known in advance, avoiding a server round-trip relative to `task/fetch`.

## Invoking a task module via task/fetch

When the `value` object of the `invoke` card action or `Action.Submit` is initialized in the proper way (explained in more detail below), when a user presses the button an `invoke` message is sent to the bot. In the HTTP response to the `invoke` message, there's a [TaskInfo object](~/concepts/task-modules/task-modules-overview#the-taskinfo-object) object, which Teams uses to display the task module.

![task/fetch request/response](~/assets/images/task-module/task-module-invoke-request-response.png)

Let's look at each step in a bit more detail:

1. This example shows a Bot Framework Hero card with a "Buy" `invoke` [card action](~/concepts/cards/cards-actions#invoke). The value of the `type` property is `task/fetch` - the rest of the `value` object can be whatever you like.
2. The bot receives the `invoke` HTTP POST message.
3. The bot creates a response object and returns it in the body of the POST response with an HTTP 200 response code. The schema for responses is described below $TODO, but the important thing to remember now is that the body of the HTTP response contains a [TaskInfo object](~/concepts/task-modules/task-modules-overview#the-taskinfo-object). The `task/fetch` for bots is similar, conceptually, to the `microsoftTeams.tasks.startTask()` function in the client SDK.
4. Microsoft Teams displays the task module.

## Submitting the result of a task module

When the user is finished with the task module, submitting the result back to the bot is similar [to the way it works with tabs](~/concepts/task-modules/task-modules-tabs#example-submitting-the-result-of-a-task-module), but there are a few differences, so it's described here completely.

For HTML/JavaScript task modules, there's a `submitHandler` function on the `TaskInfo.url` web page. If there's an error when invoking the task module, your `submitHandler` function will be immediately invoked with an `err` string [indicating which error occurred](~/concepts/task-modules/task-modules-tabs#task-module-invocation-errors). The `submitHandler` function is also called with an `err` string when the user presses the X at the upper right of task module, if you want to detect that.

If there's no invocation error and the user doesn't press X to dismiss it, the user presses a button when finished. Depending on whether it's a URL or an Adaptive card in the task module, here's what happens:

* **HTML/JavaScript (`TaskInfo.url`)**. Once you've validated what the user has entered, you call the `microsoftTeams.tasks.submitTask()` SDK function (referred to hereafter as `submitTask()` for readability purposes). You can call `submitTask()` without any parameters if you just want Teams to close the task module, but most of the time you'll want to pass an object or a string to your `submitHandler`. Simply pass it as the first parameter, `result`. Teams will invoke `submitHandler`: `err` will be `null` and `result` will be the object/string you passed to `submitTask()`. If you do call `submitTask()` with a `result` parameter, you **must** pass an `appId` or an array of `appId` strings: this allows Teams to validate that the app sending the result is the same one which invoked the task module. Your bot will receive a `task/submit` message including `result` as described below $TODO.
* **Adaptive card (`TaskInfo.card`)**. Unlike with tabs, `completionBotId` is not needed in the `TaskInfo` object since Teams knows what bot it was invoked from. The Adaptive card body (as filled in by the user) will be sent to the bot via a `task/submit` message when the user presses an `Action.Submit` button.

## The flexibility of `task/submit`

In the previous section, you learned that when the user finishes with a task module invoked from a bot, the bot always receives a `task/submit invoke` message. As a developer, you have several options when *responding* to the `task/submit` message:

| HTTP Body Response | Scenario |
| --- | --- |
| None (ignore the `task/submit` message) | The simplest response is no response at all. Your bot is not required to respond when the user is finished with the task module. |
| `{`<br/>`  "task": {`<br/>`    "type": "message",`<br/>`    "value": "Message text to display to user"`<br/>`  }`<br/> | Teams will display the value of `value` in a popup message box. |
| `{`<br/>`  "task": {`<br/>`    "type": "continue",`<br/>`    "value": <TaskInfo object>`<br/>`  }`<br/> | Allows you to "chain" sequences of Adaptive cards together in a wizard/multi-step experience. |

## Payload of `task/fetch` and `task/submit` messages

This section defines the schema of what your bot receives when it receives a `task/fetch` or `task/submit` Bot Framework `Activity` object. The important top-level appear below:

| Property | Description |
| --- | --- |
| `type` | Will always be `invoke` |
| `name` | Either `task/fetch` or `task/submit` |
| `value` | The developer-defined payload. Normally the structure of the `value` object mirrors what was sent from Teams. In this case, however, it's different because we want to support dynamic fetch (`task/fetch`) from both Bot Framework (`value`) and Adaptive card `Action.Submit` actions (`data`), and we need a way to communicate Teams `context` to the bot in addition to what was included in `value`/`data`. <br/>We do this by combining the two into a parent object:<br/>`{  "context": {`<br/>`    "theme": "default" | "dark" | "contrast",`<br/>`  },`<br>`  "data": [value field from Bot Framework card] | `<br/>`          [data field from Adaptive Card]`<br/>} |


## Example: Receiving and responding to `task/fetch` and `task/submit` messages

Dealing with `invoke` messages in Bot Framework can be a little tricky because there's no formal support for them in the Bot Framework SDK. To make it easier, Teams has created `onInvoke()` helper functions in the [Microsoft.Bot.Connector.Teams NuGet package (for C#)](https://www.nuget.org/packages/Microsoft.Bot.Connector.Teams) and in the [botbuilder-teams npm package (for Node.js)](https://www.npmjs.com/package/botbuilder-teams). The Node.js example below shows the latter:

```typescript
// Handle requests and responses for a "Custom Form" task module.
// Assumes request is coming from an Adaptive card Action.Submit button that has a "taskModule" property indicating what to invoke
private async onInvoke(event: builder.IEvent, cb: (err: Error, body: any, status?: number) => void): Promise<void> {
    let invokeType = (event as any).name;
    let invokeValue = (event as any).value;
    if (invokeType === undefined) {
        invokeType = null;
    }
    switch (invokeType) {
        case "task/fetch": {
            if (invokeValue !== undefined && invokeValue.taskModule === "customform") {
                // Return the specified task module response to the bot
                let fetchTemplate: any = "task": {
                    "type": "continue",
                    "value": {
                        "title": "Custom Form",
                        "height": 510,
                        "width": 430,
                        "fallbackUrl": "https://contoso.com/teamsapp/customform",
                        "url": "https://contoso.com/teamsapp/customform",
                    },
                };
                cb(null, fetchTemplate, 200);
            };
            break;
        }
        case "task/submit": {
            if (invokeValue.data !== undefined) {
                // It's a valid task module response
                let submitResponse: any = "task": {
                    "type": "message",
                    "value": "Task complete!",
                };
                cb(null, fetchTemplates.submitMessageResponse, 200)
            }
        }
    }
}
```

### Bot Framework card actions vs. Adaptive card Action.Submit

The schema for 