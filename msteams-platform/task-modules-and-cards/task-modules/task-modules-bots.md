---
title: Use Task Modules in Microsoft Teams bots
description: How to use task modules with Microsoft Teams bots, including Bot Framework cards, Adaptive cards, and deep links.
localization_priority: Normal
ms.topic: how-to
keywords: task modules teams bots
---

# Use task modules from bots

Task modules can be invoked from Microsoft Teams bots using buttons on Adaptive Cards and Bot Framework cards that is hero, thumbnail, and Office 365 connector. Task modules are often a better user experience than multiple conversation steps where as a developer you have to keep track of bot state and allow the user to interrupt or cancel the sequence.

There are two ways of invoking task modules:

* A new kind of invoke message `task/fetch`: Using the `invoke` [card action](~/task-modules-and-cards/cards/cards-actions.md#invoke-action-type) for Bot Framework cards, or the `Action.Submit` [card action](~/task-modules-and-cards/cards/cards-actions.md#adaptive-cards-actions) for Adaptive cards, with `task/fetch`, the task module either a URL or an Adaptive Card is fetched dynamically from your bot.
* Deep link URLs: Using the [deep link syntax for task modules](~/task-modules-and-cards/task-modules/invoking-task-modules.md#task-module-deep-link-syntax), you can use the `openUrl` [card action](~/task-modules-and-cards/cards/cards-actions.md#openurl-action-type) for Bot Framework cards or the `Action.OpenUrl` [card action](~/task-modules-and-cards/cards/cards-actions.md#adaptive-cards-actions) for Adaptive cards, respectively. With deep link URLs, the task module URL or Adaptive Card body is obviously known in advance, avoiding a server round-trip relative to `task/fetch`.

> [!IMPORTANT]
> To ensure secure communications, each `url` and `fallbackUrl` must implement the HTTPS encryption protocol.

The next section provides details on invoking a task module using `task/fetch`.

## Invoke a task module using task/fetch

When the `value` object of the `invoke` card action or `Action.Submit` is initialized and when a user presses the button, an `invoke` message is sent to the bot. In the HTTP response to the `invoke` message, there is a [TaskInfo object](~/task-modules-and-cards/task-modules/invoking-task-modules.md#the-taskinfo-object) embedded in a wrapper object, which Teams uses to display the task module.

![task/fetch request or response](~/assets/images/task-module/task-module-invoke-request-response.png)

Now, look at each step in a bit more detail:

1. This example shows a Bot Framework hero card with a "Buy" `invoke` [card action](~/task-modules-and-cards/cards/cards-actions.md#invoke-action-type). The value of the `type` property is `task/fetch` and the rest of the `value` object can be anything you choose.
2. The bot receives the `invoke` HTTP POST message.
3. The bot creates a response object and returns it in the body of the POST response with an HTTP 200 response code. For more information on schema for responses, see [the discussion on task/submit](#the-flexibility-of-tasksubmit). The following code provides an example of body of the HTTP response that contains a [TaskInfo object](~/task-modules-and-cards/task-modules/invoking-task-modules.md#the-taskinfo-object) embedded in a wrapper object:

    ```json
    {
      "task": {
        "type": "continue",
        "value": {
          "title": "Task module title",
          "height": 500,
          "width": "medium",
          "url": "https://contoso.com/msteams/taskmodules/newcustomer",
          "fallbackUrl": "https://contoso.com/msteams/taskmodules/newcustomer"
        }
      }
    }
    ```

    The `task/fetch` event and its response for bots is similar to the `microsoftTeams.tasks.startTask()` function in the client SDK.
4. Microsoft Teams displays the task module.

The next section provides details on submitting the result of a task module.

## Submit the result of a task module

When the user is finished with the task module, submitting the result back to the bot is similar to the way it works with tabs. For more information, see [example of submitting the result of a task module](~/task-modules-and-cards/task-modules/task-modules-tabs.md#example-of-submitting-the-result-of-a-task-module). There are a few differences as follows:

* HTML or JavaScript that is `TaskInfo.url`: Once you have validated what the user has entered, you call the `microsoftTeams.tasks.submitTask()` SDK function referred to hereafter as `submitTask()` for readability purposes. You can call `submitTask()` without any parameters if you want Teams to close the task module, but you must pass an object or a string to your `submitHandler`. Pass it as the first parameter, `result`. Teams invokes `submitHandler`, `err` is `null`, and `result` is the object or string you passed to `submitTask()`. If you call `submitTask()` with a `result` parameter, you must pass an `appId` or an array of `appId` strings. This allows Teams to validate that the app sending the result is the same one which invoked the task module. Your bot receives a `task/submit` message including `result`. For more information, see [payload of task/fetch and task/submit messages](#payload-of-taskfetch-and-tasksubmit-messages).
* Adaptive Card that is `TaskInfo.card`: The Adaptive Card body as filled in by the user is sent to the bot via a `task/submit` message when the user presses any `Action.Submit` button.

The next section provides details on the flexibility of `task/submit`.

## The flexibility of task/submit

In the previous section, you identified that when the user finishes with a task module invoked from a bot, the bot always receives a `task/submit invoke` message. As a developer, you have several options when responding to the `task/submit` message:

| HTTP body response                      | Scenario                                |
| --------------------------------------- | --------------------------------------- |
| None ignore the `task/submit` message | The simplest response is no response at all. Your bot is not required to respond when the user is finished with the task module. |
| <pre>{<br/>  "task": {<br/>    "type": "message",<br/>    "value": "Message text"<br/>  }<br/>}</pre> | Teams displays the value of `value` in a pop-up message box. |
| <pre>{<br/>  "task": {<br/>    "type": "continue",<br/>    "value": &lt;TaskInfo object&gt;<br/>  }<br/>}</pre> | Allows you to chain sequences of Adaptive Cards together in a wizard or multi-step experience. |

> [!NOTE]
> Chaining Adaptive Cards into a sequence is an advanced scenario and not documented here. The Node.js sample app supports it, however, and how it works is documented in its [README.md file](https://github.com/OfficeDev/microsoft-teams-sample-task-module-nodejs#implementation-notes).

The next section provides details on payload of `task/fetch` and `task/submit` messages.

## Payload of task/fetch and task/submit messages

This section defines the schema of what your bot receives when it receives a `task/fetch` or `task/submit` Bot Framework `Activity` object. The following table provides the properties of payload of `task/fetch` and `task/submit` messages:

| Property | Description                          |
| -------- | ------------------------------------ |
| `type`   | Is always `invoke`.           |
| `name`   | Is either `task/fetch` or `task/submit`. |
| `value`  | Is the developer-defined payload. Normally the structure of the `value` object mirrors what was sent from Teams. In this case, however, it is different as it requires support for dynamic fetch that is `task/fetch` from both Bot Framework that is `value` and Adaptive Card `Action.Submit` actions that is `data`. A way to communicate Teams `context` to the bot is required in addition to what was included in `value` or `data`.<br/><br/>This can be done by combining the two into a parent object:<br/><br/><pre>{<br/>  "context": {<br/>    "theme": "default" &vert; "dark" &vert; "contrast",<br/>  },<br/>  "data": [value field from Bot Framework card] &vert; [data field from Adaptive Card] <br/>}</pre>  |

The next section provides an example of receiving and responding to `task/fetch` and `task/submit` invoke messages in Node.js.

## Example of task/fetch and task/submit invoke messages in Node.js

> [!NOTE]
> The sample code in this section is modified between technical preview and final release of this feature. The schema of the `task/fetch` request changed to follow [payload of task/fetch and task/submit messages](#payload-of-taskfetch-and-tasksubmit-messages). That is, the documentation was correct but the implementation was not. See the `// for Technical Preview [...]` comments for what changed.

```typescript
// Handle requests and responses for a "Custom Form" and an "Adaptive card" task module.
// Assumes request is coming from an Adaptive card Action.Submit button that has a "taskModule" property indicating what to invoke
private async onInvoke(event: builder.IEvent, cb: (err: Error, body: any, status?: number) => void): Promise<void> {
    let invokeType = (event as any).name;
    let invokeValue = (event as any).value;
    if (invokeType === undefined) {
        invokeType = null;
    }
    switch (invokeType) {
        case "task/fetch": {
            if (invokeValue !== undefined && invokeValue.data.taskModule === "customform") { // for Technical Preview, was invokeValue.taskModule
                // Return the specified task module response to the bot
                let fetchTemplate: any = {
                    "task": {
                        "type": "continue",
                        "value": {
                            "title": "Custom Form",
                            "height": 510,
                            "width": 430,
                            "fallbackUrl": "https://contoso.com/teamsapp/customform",
                            "url": "https://contoso.com/teamsapp/customform",
                        }
                    }
                };
                cb(null, fetchTemplate, 200);
            };
            if (invokeValue !== undefined && invokeValue.data.taskModule === "adaptivecard") { // for Technical Preview, was invokeValue.taskModule
                let adaptiveCard = {
                    "type": "AdaptiveCard",
                    "body": [
                        {
                            "type": "TextBlock",
                            "text": "Here is a ninja cat:"
                        },
                        {
                            "type": "Image",
                            "url": "http://adaptivecards.io/content/cats/1.png",
                            "size": "Medium"
                        }
                    ],
                    "version": "1.0"
                };
                // Return the specified task module response to the bot
                let fetchTemplate: any = {
                    "task": {
                        "type": "continue",
                        "value": {
                            "title": "Ninja Cat",
                            "height": "small",
                            "width": "small",
                            "card": {
                                contentType: "application/vnd.microsoft.card.adaptive",
                                content: adaptiveCard,
                            }
                        }
                    }
                };
                cb(null, fetchTemplate, 200);
            };
            break;
        }
        case "task/submit": {
            if (invokeValue.data !== undefined) {
                // It's a valid task module response
                let submitResponse: any = {
                    "task": {
                        "type": "message",
                        "value": "Task complete!",
                    }
                };
                cb(null, fetchTemplates.submitMessageResponse, 200)
            }
        }
    }
}
```

The next section provides an example of receiving and responding to task/fetch and task/submit invoke messages in C#.

## Example of task/fetch and task/submit invoke messages in C#

In C# bots, `invoke` messages are processed by an `HttpResponseMessage()` controller processing an `Activity` message. The `task/fetch` and `task/submit` requests and responses are JSON. In C#, it is not convenient to deal with raw JSON as it is in Node.js, so you require wrapper classes to handle the serialization to and from JSON. There is no direct support for this in the Microsoft Teams [C# SDK](https://www.nuget.org/packages/Microsoft.Bot.Connector.Teams), but you can see an example of what these simple wrapper classes look like in the [C# sample app](https://github.com/OfficeDev/microsoft-teams-sample-task-module-csharp/blob/master/Microsoft.Teams.Samples.TaskModule.Web/Models/TaskModel.cs).

The following code provides an example in C# for handling `task/fetch` and `task/submit` messages using these wrapper classes that is `TaskInfo` and `TaskEnvelope`, excerpted from the [sample](https://github.com/OfficeDev/microsoft-teams-sample-task-module-csharp/blob/master/Microsoft.Teams.Samples.TaskModule.Web/Controllers/MessagesController.cs):

```csharp
private HttpResponseMessage HandleInvokeMessages(Activity activity)
{
    var activityValue = activity.Value.ToString();
    if (activity.Name == "task/fetch")
    {
        var action = Newtonsoft.Json.JsonConvert.DeserializeObject<Models.BotFrameworkCardValue<string>>(activityValue);

        Models.TaskInfo taskInfo = GetTaskInfo(action.Data);
        Models.TaskEnvelope taskEnvelope = new Models.TaskEnvelope
        {
            Task = new Models.Task()
            {
                Type = Models.TaskType.Continue,
                TaskInfo = taskInfo
            }
        };
        return Request.CreateResponse(HttpStatusCode.OK, taskEnvelope);
    }
    else if (activity.Name == "task/submit")
    {
        ConnectorClient connector = new ConnectorClient(new Uri(activity.ServiceUrl));
        Activity reply = activity.CreateReply("Received = " + activity.Value.ToString());
        connector.Conversations.ReplyToActivity(reply);
    }
    return new HttpResponseMessage(HttpStatusCode.Accepted);
}

// Helper function for building the TaskInfo object based on the incoming request
private static Models.TaskInfo GetTaskInfo(string actionInfo)
{
    Models.TaskInfo taskInfo = new Models.TaskInfo();
    switch (actionInfo)
    {
        case TaskModuleIds.YouTube:
            taskInfo.Url = taskInfo.FallbackUrl = ApplicationSettings.BaseUrl + "/" + TaskModuleIds.YouTube;
            SetTaskInfo(taskInfo, TaskModuleUIConstants.YouTube);
            break;
        case TaskModuleIds.PowerApp:
            taskInfo.Url = taskInfo.FallbackUrl = ApplicationSettings.BaseUrl + "/" + TaskModuleIds.PowerApp;
            SetTaskInfo(taskInfo, TaskModuleUIConstants.PowerApp);
            break;
        case TaskModuleIds.CustomForm:
            taskInfo.Url = taskInfo.FallbackUrl = ApplicationSettings.BaseUrl + "/" + TaskModuleIds.CustomForm;
            SetTaskInfo(taskInfo, TaskModuleUIConstants.CustomForm);
            break;
        case TaskModuleIds.AdaptiveCard:
            taskInfo.Card = AdaptiveCardHelper.GetAdaptiveCard();
            SetTaskInfo(taskInfo, TaskModuleUIConstants.AdaptiveCard);
            break;
        default:
            break;
    }
    return taskInfo;
}
```

The `SetTaskInfo()` function is not shown in the example code, which sets the `height`, `width`, and `title` properties of the `TaskInfo` object for each case. For more information, see [source code for SetTaskInfo()](https://github.com/OfficeDev/microsoft-teams-sample-task-module-csharp/blob/master/Microsoft.Teams.Samples.TaskModule.Web/Controllers/MessagesController.cs).

The next section compares Bot Framework card actions and Adaptive Card `Action.Submit` actions.

### Bot Framework card actions vs. Adaptive Card Action.Submit actions

The schema for Bot Framework card actions is different from Adaptive Card `Action.Submit` actions. As a result, the way to invoke task modules is also different. The `data` object in `Action.Submit` contains an `msteams` object so it does not interfere with other properties in the card. The following table shows an example of each:

| Bot Framework card action                              | Adaptive Card Action.Submit action                     |
| ------------------------------------------------------ | ------------------------------------------------------ |
| <pre>{<br/>  "type": "invoke",<br/>  "title": "Buy",<br/>  "value": {<br/>    "type": "task/fetch",<br/>    &lt;...&gt;<br/>  }<br/>}</pre> | <pre>{<br/>  "type": "Action.Submit",<br/>  "id": "btnBuy",<br/>  "title": "Buy",<br/>  "data": {<br/>    &lt;...&gt;,<br/>    "msteams": {<br/>      "type": "task/fetch"<br/>    }<br/>  }<br/>}</pre>  |

## See also

> [!div class="nextstepaction"]
> [Microsoft Teams task module sample code in Node.js](https://github.com/OfficeDev/microsoft-teams-sample-task-module-nodejs/blob/master/src/TeamsBot.ts)
> [!div class="nextstepaction"]
> [Bot Framework samples](https://github.com/Microsoft/BotBuilder-Samples/blob/master/README.md)