---
title: Use dialogs in Microsoft Teams bots
description: Learn how to use dialogs with Microsoft Teams bots using the Teams SDK, invoke and submit dialogs with Adaptive Cards, and respond to dialog events.
ms.localizationpriority: medium
ms.topic: how-to
ms.date: 04/10/2026
---

# Use dialogs with bots

Invoke dialogs (referred as task modules in TeamsJS v1.x) from Microsoft Teams bots using `TaskFetchAction` buttons on Adaptive Cards. Dialogs provide a focused interaction by opening a pop-up window for the user, making them ideal for complex forms or multi-step workflows.

There are two ways of invoking dialogs:

* A new invoke message `task/fetch`: Using the [`Action.Execute`](~/task-modules-and-cards/cards/cards-actions.md#actionexecute) card action for Adaptive Cards with `task/fetch`, either an HTML or Adaptive Card-based dialog is fetched dynamically from your bot.
* Deep link URLs: Using the [deep link syntax for dialogs](../../concepts/build-and-test/deep-link-application.md#deep-link-to-open-a-dialog), you can use the [`Action.OpenUrl`](~/task-modules-and-cards/cards/cards-actions.md#actionopenurl) card action for Adaptive Cards. With deep link URLs, the dialog URL or Adaptive Card body is already known to avoid a server round-trip relative to `task/fetch`.

> [!IMPORTANT]
> Each `url` and `fallbackUrl` must implement the HTTPS encryption protocol.

> [!NOTE]
> In Teams client v1, dialogs were called task modules. They may occasionally be used synonymously.

## Create a dialog launcher

To invoke a dialog from a bot, send an Adaptive Card with `TaskFetchAction` buttons. Each button includes data that your bot uses to determine which dialog content to return.

[!INCLUDE [ocdi-warning](../../includes/tabs/ocdi-warning.md)]

:::image type="content" source="../../assets/images/task-module/task-module-invoke-request-response.png" alt-text="task/fetch request or response":::

The following steps provide instructions on how to invoke a dialog (referred as task module in TeamsJS v1.x) using `task/fetch`:

1. This image shows an Adaptive Card with a **Buy** [`Action.Execute`](~/task-modules-and-cards/cards/cards-actions.md#actionexecute) card action. The value of the `type` property is `task/fetch` and the rest of the `data` object can be of your choice.
1. The bot receives a `card.action` activity. In the Teams SDK, you handle this using the `OnAdaptiveCardAction` handler. For more information, see [Executing Actions](/microsoftteams/platform/teams-sdk/in-depth-guides/adaptive-cards/executing-actions).
1. The bot creates an `ActionResponse` object and returns it. For more information on schema for responses, see the [discussion on task/submit](#handle-dialog-submit-events). The following code provides an example of the response body that contains a [TaskInfo object](~/task-modules-and-cards/task-modules/invoking-task-modules.md) embedded in a wrapper object:

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

    The `task/fetch` event and its response for bots is similar to the `microsoftTeams.tasks.startTask()` function in the Microsoft Teams JavaScript client library (TeamsJS).

1. Microsoft Teams displays the dialog.

The next section provides details on submitting the result of a dialog.

## Submit the result of a dialog

When the user finishes with the dialog, the result is submitted back to your app. How submission works depends on the dialog content type:

* **Adaptive Card (TaskInfo.card)**: When the user selects an `Action.Submit` button, Teams sends a dialog submit event to your app. Your dialog submit handler receives the form data from the card. In C#, use the `[TaskSubmit]` attribute. In TypeScript, use `app.on('dialog.submit', ...)`. In Python, use `@app.on_dialog_submit`.
* **Webpage (TaskInfo.url)**: The webpage calls `microsoftTeams.tasks.submitTask(formData)` from the TeamsJS client library, which triggers the same dialog submit event in your app.

## Handle dialog submit events

When the user submits a dialog, the bot receives a `task/submit` invoke message. You have several options when responding:

| Response type | Scenario |
|---|---|
| No response | The simplest response is no response at all. Your bot isn't required to respond when the user finishes with the dialog. |
| `MessageTask` | Teams displays a message in a pop-up message box in the dialog. |
| `ContinueTask` | Allows you to chain sequences of Adaptive Cards together in a wizard or multi-step experience. |

The following tabs show how to handle dialog submit events in .NET, TypeScript, and Python:

# [.NET](#tab/csharp)

```csharp
using System.Text.Json;
using Microsoft.Teams.Api.TaskModules;
using Microsoft.Teams.Apps;
using Microsoft.Teams.Apps.Activities.Invokes;
using Microsoft.Teams.Apps.Annotations;
using Microsoft.Teams.Common.Logging;

[TaskSubmit]
public async Task<Microsoft.Teams.Api.TaskModules.Response> OnTaskSubmit([Context] Tasks.SubmitActivity activity, [Context] IContext.Client client, [Context] ILogger log)
{
    var data = activity.Value?.Data as JsonElement?;
    if (data == null)
    {
        log.Info("[TASK_SUBMIT] No data found in the activity value");
        return new Microsoft.Teams.Api.TaskModules.Response(
            new Microsoft.Teams.Api.TaskModules.MessageTask("No data found in the activity value"));
    }

    var submissionType = data.Value.TryGetProperty("submissiondialogtype", out var submissionTypeObj) && submissionTypeObj.ValueKind == JsonValueKind.String
        ? submissionTypeObj.ToString()
        : null;

    string? GetFormValue(string key)
    {
        if (data.Value.TryGetProperty(key, out var val))
        {
            if (val is JsonElement element)
                return element.GetString();
            return val.ToString();
        }
        return null;
    }

    switch (submissionType)
    {
        case "simple_form":
            var name = GetFormValue("name") ?? "Unknown";
            await client.Send($"Hi {name}, thanks for submitting the form!");
            return new Microsoft.Teams.Api.TaskModules.Response(
                new Microsoft.Teams.Api.TaskModules.MessageTask("Form was submitted"));
        default:
            return new Microsoft.Teams.Api.TaskModules.Response(
                new Microsoft.Teams.Api.TaskModules.MessageTask("Unknown submission type"));
    }
}
```

# [TypeScript](#tab/nodejs)

```typescript
import { App } from '@microsoft/teams.apps';
// ...

app.on('dialog.submit', async ({ activity, send, next }) => {
  const dialogType = activity.value.data?.submissiondialogtype;

  if (dialogType === 'simple_form') {
    const name = activity.value.data.name;
    await send(`Hi ${name}, thanks for submitting the form!`);
    return {
      task: {
        type: 'message',
        value: 'Form was submitted',
      },
    };
  }

  if (dialogType === 'webpage_dialog') {
    const name = activity.value.data.name;
    const email = activity.value.data.email;
    await send(`Hi ${name}, thanks for submitting the form! We got that your email is ${email}`);
    return {
      status: 200,
    };
  }
});
```

# [Python](#tab/python)

```python
from typing import Optional, Any
from microsoft_teams.api import TaskSubmitInvokeActivity, InvokeResponse, TaskModuleResponse, TaskModuleMessageResponse
from microsoft_teams.apps import ActivityContext

@app.on_dialog_submit
async def handle_dialog_submit(ctx: ActivityContext[TaskSubmitInvokeActivity]):
    data: Optional[Any] = ctx.activity.value.data
    dialog_type = data.get("submissiondialogtype") if data else None

    if dialog_type == "webpage_dialog":
        name = data.get("name") if data else None
        email = data.get("email") if data else None
        await ctx.send(f"Hi {name}, thanks for submitting the form! We got that your email is {email}")
        return InvokeResponse(
            body=TaskModuleResponse(task=TaskModuleMessageResponse(value="Form submitted successfully"))
        )
```

---

## Multi-step dialog chaining

You can chain Adaptive Cards into a multi-step wizard by returning a `ContinueTask` response from the submit handler. Each step returns a new card, and the final step returns a `MessageTask` to close the dialog.

# [.NET](#tab/csharp)

```csharp
using System.Text.Json;
using Microsoft.Teams.Api;
using Microsoft.Teams.Api.TaskModules;
using Microsoft.Teams.Cards;

// Add these cases to your OnTaskSubmit method
case "webpage_dialog_step_1":
    var nameStep1 = GetFormValue("name") ?? "Unknown";
    var nextStepCardJson = $$"""
    {
        "type": "AdaptiveCard",
        "version": "1.4",
        "body": [
            {
                "type": "TextBlock",
                "text": "Email",
                "size": "Large",
                "weight": "Bolder"
            },
            {
                "type": "Input.Text",
                "id": "email",
                "label": "Email",
                "placeholder": "Enter your email",
                "isRequired": true
            }
        ],
        "actions": [
            {
                "type": "Action.Submit",
                "title": "Submit",
                "data": {"submissiondialogtype": "webpage_dialog_step_2", "name": "{{nameStep1}}"}
            }
        ]
    }
    """;

    var nextStepCard = JsonSerializer.Deserialize<AdaptiveCard>(nextStepCardJson)
        ?? throw new InvalidOperationException("Failed to deserialize next step card");

    var nextStepTaskInfo = new TaskInfo
    {
        Title = $"Thanks {nameStep1} - Get Email",
        Card = new Attachment
        {
            ContentType = new ContentType("application/vnd.microsoft.card.adaptive"),
            Content = nextStepCard
        }
    };

    return new Response(new ContinueTask(nextStepTaskInfo));

case "webpage_dialog_step_2":
    var nameStep2 = GetFormValue("name") ?? "Unknown";
    var emailStep2 = GetFormValue("email") ?? "No email";
    await client.Send($"Hi {nameStep2}, thanks for submitting the form! We got that your email is {emailStep2}");
    return new Response(new MessageTask("Multi-step form completed successfully"));
```

# [TypeScript](#tab/nodejs)

```typescript
import { cardAttachment } from '@microsoft/teams.api';
import { AdaptiveCard, TextInput, SubmitAction } from '@microsoft/teams.cards';

// Return from dialog.submit handler to chain to the next step
const dialogCard = new AdaptiveCard(
  {
    type: 'TextBlock',
    text: 'This is a multi-step form',
    size: 'Large',
    weight: 'Bolder',
  },
  new TextInput()
    .withLabel('Name')
    .withIsRequired()
    .withId('name')
    .withPlaceholder('Enter your name')
)
  .withActions(
    new SubmitAction()
      .withTitle('Submit')
      .withData({ submissiondialogtype: 'webpage_dialog_step_1' })
  );

return {
  task: {
    type: 'continue',
    value: {
      title: 'Multi-step Form Dialog',
      card: cardAttachment('adaptive', dialogCard),
    },
  },
};
```

# [Python](#tab/python)

```python
# In your on_dialog_submit handler, return a ContinueTask to show the next step
from microsoft_teams.api import TaskModuleResponse, TaskModuleContinueResponse, CardTaskModuleTaskInfo
from microsoft_teams.cards import AdaptiveCard, TextInput, SubmitAction, Attachment

next_card = AdaptiveCard(
    body=[
        {"type": "TextBlock", "text": "Step 2: Enter Email", "size": "Large", "weight": "Bolder"},
        {"type": "Input.Text", "id": "email", "label": "Email", "placeholder": "Enter your email", "isRequired": True}
    ],
    actions=[
        {"type": "Action.Submit", "title": "Submit", "data": {"submissiondialogtype": "webpage_dialog_step_2", "name": name}}
    ]
)

return InvokeResponse(
    body=TaskModuleResponse(
        task=TaskModuleContinueResponse(
            value=CardTaskModuleTaskInfo(
                title=f"Thanks {name} - Get Email",
                card=Attachment(content_type="application/vnd.microsoft.card.adaptive", content=next_card)
            )
        )
    )
)
```

---

### Bot Framework card actions vs. Adaptive Card Action.Submit actions

The schema for Bot Framework card actions is different from Adaptive Card `Action.Submit` actions and the way to invoke dialogs is also different. The `data` object in `Action.Submit` contains a `msteams` object so it doesn't interfere with other properties in the card. The following table shows an example of each card action:

| Bot Framework card action                              | Adaptive Card Action.Submit action                     |
| ------------------------------------------------------ | ------------------------------------------------------ |
| <pre>{<br/>  "type": "invoke",<br/>  "title": "Buy",<br/>  "value": {<br/>    "type": "task/fetch",<br/>    &lt;...&gt;<br/>  }<br/>}</pre> | <pre>{<br/>  "type": "Action.Submit",<br/>  "id": "btnBuy",<br/>  "title": "Buy",<br/>  "data": {<br/>    &lt;...&gt;,<br/>    "msteams": {<br/>      "type": "task/fetch"<br/>    }<br/>  }<br/>}</pre>  |

## Code sample

|Sample name | Description | .NET | Node.js | Manifest| Python |
|----------------|-----------------|--------------|----------------|----------------|
|Dialog sample bots-V4 | This sample app demonstrate how to use Dialogs (referred as task modules in TeamsJS v1.x) using Bot Framework v4. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-task-modules/dotnet/bot-task-modules)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-task-modules/nodejs/bot-task-modules)| NA | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-task-modules/python/bot-task-modules) |

## See also

* [Cards and dialogs](../cards-and-task-modules.md)
* [Teams SDK Dialogs overview](/microsoftteams/platform/teams-sdk/in-depth-guides/dialogs/overview)
* [Teams SDK Adaptive Cards - Executing Actions](/microsoftteams/platform/teams-sdk/in-depth-guides/adaptive-cards/executing-actions)
* [Migrate from BotBuilder to Teams SDK](/microsoftteams/platform/teams-sdk/migrations/botbuilder/overview)
