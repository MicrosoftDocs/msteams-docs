---
title: Invoke and dismiss dialogs
description: Learn how to invoke and dismiss dialogs using Adaptive Card actions in the Teams SDK, including the TaskInfo object, dialog sizing, and code samples.
ms.topic: conceptual
ms.localizationpriority: medium
ms.date: 04/13/2026
---

# Invoke and dismiss dialogs

Dialogs (formerly known as task modules) provide a way to open modal windows within the Microsoft Teams interface. In the Teams SDK, dialogs are invoked from Adaptive Card actions using the `TaskFetchAction` and handled through `dialog.open` and `dialog.submit` events on the `App` class. The dialog content can be an Adaptive Card or a URL-based webpage.

> [!NOTE]
> In the Teams SDK (Teams AI Library), dialogs must be triggered via Adaptive Card actions and cannot be invoked directly from client-side tab JavaScript or deep links. For migration guidance, see [Migrate from BotBuilder](/microsoftteams/platform/teams-sdk/migrations/botbuilder/overview).

The following table summarizes how dialogs work in the Teams SDK:

| Step | Dialog with Adaptive Card | Dialog with webpage URL |
| --- | --- | --- |
| Trigger the dialog | 1. Send an Adaptive Card with a `TaskFetchAction` button to the user. The action's `value` data specifies the type of dialog to open. <br/><br/> 2. When the user selects the button, Teams sends a `dialog.open` event to your app. | 1. Send an Adaptive Card with a `TaskFetchAction` button to the user. <br/><br/> 2. When the user selects the button, Teams sends a `dialog.open` event to your app. |
| Handle the dialog open event | 3. In your `dialog.open` handler, return a response containing a `TaskInfo` object with the Adaptive Card to display. The response uses a `ContinueTask` wrapper. | 3. In your `dialog.open` handler, return a response containing a `TaskInfo` object with a `Url` property pointing to the webpage. The URL domain must be in the `validDomains` array in your app manifest. |
| Handle the dialog submission | 4. When the user presses an `Action.Submit` button, Teams sends a `dialog.submit` event to your app with the form data. <br/><br/> 5. You can respond by: doing nothing (task completed), displaying a message using `MessageTask`, or chaining to another dialog using `ContinueTask`. | 4. The webpage calls the Teams JS client library to submit data back. Teams sends a `dialog.submit` event to your app with the result. |

The next section specifies the `TaskInfo` object that defines certain attributes for a dialog.

## TaskInfo object

The `TaskInfo` object (from `Microsoft.Teams.Api.TaskModules`) contains the metadata for a dialog:

| Attribute | Type | Description |
| --- | --- | --- |
| `Title` | string | This attribute appears below the app name and to the right of the app icon. |
| `Height` | number or string | This attribute can be a number representing the dialog's height in pixels, or `small`, `medium`, or `large`. In C#, use `Union<int, Size>`. |
| `Width` | number or string | This attribute can be a number representing the dialog's width in pixels, or `small`, `medium`, or `large`. In C#, use `Union<int, Size>`. |
| `Url` | string | The URL of the page loaded as an `<iframe>` inside the dialog. The URL's domain must be in the app's [validDomains array](/microsoft-365/extensibility/schema/root#validdomains) in your app manifest. Use this for webpage-based dialogs. |
| `Card` | Attachment | The Adaptive Card to display in the dialog, wrapped in an `Attachment` object with `ContentType` set to `application/vnd.microsoft.card.adaptive`. Use this for Adaptive Card-based dialogs. |

> [!NOTE]
> The dialog feature requires that the domains of any URLs you want to load are included in the `validDomains` array in your app's manifest.

The next section specifies dialog sizing that enables the user to set the height and width of the dialog.

## Dialog sizing

The values of `TaskInfo.Width` and `TaskInfo.Height` set the height and width of the dialog in pixels. Depending on the size of the Teams window and screen resolution, these values might be reduced proportionally while maintaining aspect ratio.

If `TaskInfo.Width` and `TaskInfo.Height` are `"small"`, `"medium"`, or `"large"`, the size of the red rectangle in the following image is a proportion of the available space, 20%, 50%, and 60% for `width` and 20%, 50%, and 66% for `height`:

:::image type="content" source="../../assets/images/task-module/task-module-example.png" alt-text="dialog sizing example":::

The next section provides examples of triggering and handling dialogs using the Teams SDK.

## Trigger a dialog with TaskFetchAction

To open a dialog, send an Adaptive Card with a `TaskFetchAction` button. When the user selects the button, Teams sends a `dialog.open` event to your app.

# [C#](#tab/csharp)

```csharp
using Microsoft.Teams.Api.Activities;
using Microsoft.Teams.Apps;
using Microsoft.Teams.Apps.Annotations;
using Microsoft.Teams.Cards;
using Microsoft.Teams.Common.Logging;

[Message]
public async Task OnMessage([Context] MessageActivity activity, [Context] IContext.Client client, [Context] ILogger log)
{
    var card = new AdaptiveCard
    {
        Body = new List<CardElement>
        {
            new TextBlock("Select the examples you want to see!")
            {
                Size = TextSize.Large,
                Weight = TextWeight.Bolder
            }
        },
        Actions = new List<Action>
        {
            new TaskFetchAction(new { opendialogtype = "simple_form" })
            { Title = "Simple form test" },
            new TaskFetchAction(new { opendialogtype = "webpage_dialog" })
            { Title = "Webpage Dialog" },
            new TaskFetchAction(new { opendialogtype = "multi_step_form" })
            { Title = "Multi-step Form" }
        }
    };
    await client.Send(card);
}
```

# [TypeScript](#tab/typescript)

```typescript
import { cardAttachment, MessageActivity } from '@microsoft/teams.api';
import { App } from '@microsoft/teams.apps';
import {
  AdaptiveCard,
  IAdaptiveCard,
  TaskFetchAction,
  TaskFetchData,
} from '@microsoft/teams.cards';

app.on('message', async ({ send }) => {
  await send({ type: 'typing' });

  const card: IAdaptiveCard = new AdaptiveCard({
    type: 'TextBlock',
    text: 'Select the examples you want to see!',
    size: 'Large',
    weight: 'Bolder',
  }).withActions(
    new TaskFetchAction({})
      .withTitle('Simple form test')
      .withValue(new TaskFetchData({ opendialogtype: 'simple_form' })),
    new TaskFetchAction({})
      .withTitle('Webpage Dialog')
      .withValue(new TaskFetchData({ opendialogtype: 'webpage_dialog' })),
    new TaskFetchAction({})
      .withTitle('Multi-step Form')
      .withValue(new TaskFetchData({ opendialogtype: 'multi_step_form' }))
  );

  await send(new MessageActivity('Enter this form').addCard('adaptive', card));
});
```

# [Python](#tab/python)

```python
from microsoft_teams.api import MessageActivity, MessageActivityInput, TypingActivityInput
from microsoft_teams.apps import ActivityContext
from microsoft_teams.cards import AdaptiveCard, TextBlock, TaskFetchAction

@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]):
    await ctx.reply(TypingActivityInput())

    card = AdaptiveCard(
        schema="http://adaptivecards.io/schemas/adaptive-card.json",
        body=[
            TextBlock(
                text="Select the examples you want to see!",
                size="Large",
                weight="Bolder",
            )
        ]
    ).with_actions([
        TaskFetchAction(value={"OpenDialogType": "simple_form"}).with_title("Simple form test"),
        TaskFetchAction(value={"OpenDialogType": "webpage_dialog"}).with_title("Webpage Dialog"),
        TaskFetchAction(value={"OpenDialogType": "multi_step_form"}).with_title("Multi-step Form")
    ])

    message = MessageActivityInput(text="Enter this form").add_card(card)
    await ctx.send(message)
```

---

## Handle the dialog open event

When Teams sends a `dialog.open` event, your app returns the dialog content. The content can be an Adaptive Card or a webpage URL, wrapped in a `TaskInfo` object.

# [C#](#tab/csharp)

```csharp
using Microsoft.Teams.Api.TaskModules;
using Microsoft.Teams.Apps;
using Microsoft.Teams.Apps.Activities.Invokes;
using Microsoft.Teams.Apps.Annotations;
using Microsoft.Teams.Cards;
using Microsoft.Teams.Common;
using Microsoft.Teams.Common.Logging;

[TaskFetch]
public Task<Response> OnTaskFetch([Context] Tasks.FetchActivity activity, [Context] ILogger log)
{
    var dialogType = activity.Value?.Data?.GetType()
        .GetProperty("opendialogtype")?.GetValue(activity.Value.Data)?.ToString();

    if (dialogType == "simple_form")
    {
        var card = new AdaptiveCard
        {
            Body = new List<CardElement>
            {
                new TextBlock("This is a simple form") { Size = TextSize.Large, Weight = TextWeight.Bolder },
                new TextInput { Id = "name", Label = "Name", Placeholder = "Enter your name", IsRequired = true }
            },
            Actions = new List<Action>
            {
                new SubmitAction { Title = "Submit", Data = new { submissiondialogtype = "simple_form" } }
            }
        };

        var taskInfo = new TaskInfo
        {
            Title = "Simple Form Dialog",
            Card = new Attachment
            {
                ContentType = new ContentType("application/vnd.microsoft.card.adaptive"),
                Content = card
            }
        };

        return Task.FromResult(new Response(new ContinueTask(taskInfo)));
    }

    if (dialogType == "webpage_dialog")
    {
        var taskInfo = new TaskInfo
        {
            Title = "Webpage Dialog",
            Width = new Union<int, Size>(1000),
            Height = new Union<int, Size>(800),
            Url = $"{configuration["BotEndpoint"]}/tabs/dialog-form"
        };

        return Task.FromResult(new Response(new ContinueTask(taskInfo)));
    }

    return Task.FromResult(new Response(new MessageTask("Unknown dialog type")));
}
```

# [TypeScript](#tab/typescript)

```typescript
import { cardAttachment } from '@microsoft/teams.api';
import { App } from '@microsoft/teams.apps';
import { AdaptiveCard, TextInput, SubmitAction } from '@microsoft/teams.cards';

app.on('dialog.open', async ({ activity }) => {
  const dialogType = activity.value.data?.opendialogtype;

  if (dialogType === 'simple_form') {
    const dialogCard = new AdaptiveCard(
      {
        type: 'TextBlock',
        text: 'This is a simple form',
        size: 'Large',
        weight: 'Bolder',
      },
      new TextInput()
        .withLabel('Name')
        .withIsRequired()
        .withId('name')
        .withPlaceholder('Enter your name')
    ).withActions(
      new SubmitAction().withTitle('Submit').withData({ submissiondialogtype: 'simple_form' })
    );

    return {
      task: {
        type: 'continue',
        value: {
          title: 'Simple Form Dialog',
          card: cardAttachment('adaptive', dialogCard),
        },
      },
    };
  }
});
```

# [Python](#tab/python)

```python
from microsoft_teams.api import TaskInfo, Attachment, ContentType
from microsoft_teams.cards import AdaptiveCard, TextBlock, TextInput, SubmitAction

@app.on_task_fetch
async def handle_task_fetch(ctx):
    dialog_type = ctx.activity.value.data.get("OpenDialogType")

    if dialog_type == "simple_form":
        card = AdaptiveCard(
            body=[
                TextBlock(text="This is a simple form", size="Large", weight="Bolder"),
                TextInput(id="name", label="Name", placeholder="Enter your name", is_required=True)
            ]
        ).with_actions([
            SubmitAction(title="Submit", data={"submissiondialogtype": "simple_form"})
        ])

        return {"task": {"type": "continue", "value": {"title": "Simple Form Dialog", "card": card}}}
```

---

## Handle the dialog submission

When a user presses `Action.Submit` in a dialog, Teams sends a `dialog.submit` event to your app. You can respond by completing the task, showing a message, or opening another dialog.

# [C#](#tab/csharp)

```csharp
using System.Text.Json;
using Microsoft.Teams.Api.TaskModules;
using Microsoft.Teams.Apps;
using Microsoft.Teams.Apps.Activities.Invokes;
using Microsoft.Teams.Apps.Annotations;
using Microsoft.Teams.Common.Logging;

[TaskSubmit]
public async Task<Response> OnTaskSubmit([Context] Tasks.SubmitActivity activity, [Context] IContext.Client client, [Context] ILogger log)
{
    var data = activity.Value?.Data as JsonElement?;
    if (data == null)
    {
        return new Response(new MessageTask("No data found in the activity value"));
    }

    var submissionType = data.Value.TryGetProperty("submissiondialogtype", out var typeObj) && typeObj.ValueKind == JsonValueKind.String
        ? typeObj.ToString()
        : null;

    switch (submissionType)
    {
        case "simple_form":
            var name = data.Value.TryGetProperty("name", out var nameVal) ? nameVal.GetString() : "Unknown";
            await client.Send($"Hi {name}, thanks for submitting the form!");
            return new Response(new MessageTask("Form was submitted"));
        default:
            return new Response(new MessageTask("Unknown submission type"));
    }
}
```

# [TypeScript](#tab/typescript)

```typescript
import { App } from '@microsoft/teams.apps';

app.on('dialog.submit', async ({ activity, send }) => {
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
});
```

# [Python](#tab/python)

```python
@app.on_task_submit
async def handle_task_submit(ctx):
    submission_type = ctx.activity.value.data.get("submissiondialogtype")

    if submission_type == "simple_form":
        name = ctx.activity.value.data.get("name", "Unknown")
        await ctx.send(f"Hi {name}, thanks for submitting the form!")
        return {"task": {"type": "message", "value": "Form was submitted"}}
```

---

## Keyboard and accessibility guidelines

For URL-based dialogs that load HTML content, ensure keyboard accessibility:

* Use the [tabindex attribute](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/tabindex) in your HTML tags to control which elements can be focused and to define sequential keyboard navigation with the <kbd>Tab</kbd> and <kbd>Shift-Tab</kbd> keys.
* Handle the <kbd>Esc</kbd> key appropriately in the JavaScript for your dialog page.

Microsoft Teams ensures that keyboard navigation works properly from the dialog header into your HTML and vice-versa.

## Code sample

|Sample name | Description | .NET | Node.js | Python |
|----------------|-----------------|--------------|----------------|----------------|
|Dialog sample - Teams SDK | This sample app demonstrates how to use dialogs with the Teams SDK. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-task-modules/dotnet/bot-task-modules)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-task-modules/nodejs/bot-task-modules) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-task-modules/python/bot-task-modules) |

## Next step

> [!div class="nextstepaction"]
> [Use dialogs in tabs](~/task-modules-and-cards/task-modules/task-modules-tabs.md)

## See also

* [Cards and dialogs](../cards-and-task-modules.md)
* [Teams SDK overview](/microsoftteams/platform/teams-sdk/)
* [Dialogs in the Teams SDK](/microsoftteams/platform/teams-sdk/in-depth-guides/dialogs/overview)
* [Adaptive Cards in the Teams SDK](/microsoftteams/platform/teams-sdk/in-depth-guides/adaptive-cards/overview)
* [Migrate from BotBuilder](/microsoftteams/platform/teams-sdk/migrations/botbuilder/overview)
