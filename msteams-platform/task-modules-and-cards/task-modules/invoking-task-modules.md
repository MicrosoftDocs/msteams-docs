---
title: Invoke and dismiss dialogs in the Teams SDK
description: Learn how to invoke and dismiss dialogs using Adaptive Card actions in the Teams SDK (Teams AI Library), including the TaskInfo object, dialog sizing, and code samples.
ms.topic: conceptual
ms.localizationpriority: medium
ms.date: 04/28/2026
---

# Invoke and dismiss dialogs in the Teams SDK

This article covers how to invoke and dismiss dialogs (formerly known as task modules) using the Teams SDK (Teams AI Library). In the Teams SDK, dialogs are invoked from Adaptive Card actions using the `TaskFetchAction` and handled through dialog open and submit events on the `App` class.

The event registration varies by language:

* **TypeScript**: `app.on('dialog.open', ...)` and `app.on('dialog.submit', ...)`
* **C#**: `teamsApp.OnTaskFetch(...)` and `teamsApp.OnTaskSubmit(...)`
* **Python**: `@app.on_dialog_open` and `@app.on_dialog_submit`

 The dialog content can be an Adaptive Card or a URL-based webpage.

Dialogs can also be invoked through other approaches depending on your app architecture:

* **From tabs using the TeamsJS client library.** See [Use dialogs in tabs](~/task-modules-and-cards/task-modules/task-modules-tabs.md).
* **From bots using Bot Framework or deep links.** See [Use dialogs with bots](~/task-modules-and-cards/task-modules/task-modules-bots.md).
* **From a deep link URL.** See [Deep link to open a dialog](~/concepts/build-and-test/deep-link-application.md#deep-link-to-open-a-dialog).

For migration guidance from Bot Framework to the Teams SDK, see [Migrate from BotBuilder](/microsoftteams/platform/teams-sdk/migrations/botbuilder/overview).

The following table summarizes how dialogs work in the Teams SDK:

| Step | Dialog with Adaptive Card | Dialog with webpage URL |
| --- | --- | --- |
| Trigger the dialog | 1. Send an Adaptive Card with a `TaskFetchAction` button to the user. The action's `value` data specifies the type of dialog to open. <br/><br/> 2. When the user selects the button, Teams sends a task fetch invoke to your app. | 1. Send an Adaptive Card with a `TaskFetchAction` button to the user. <br/><br/> 2. When the user selects the button, Teams sends a task fetch invoke to your app. |
| Handle the dialog open event | 3. In your dialog open handler, return a task module continue response containing dialog metadata (title, dimensions, and the Adaptive Card to display). In C#, use `TaskInfo` with a `ContinueTask` wrapper. In TypeScript, use `CardTaskModuleTaskInfo`. In Python, use `CardTaskModuleTaskInfo` within a `TaskModuleContinueResponse`. | 3. In your dialog open handler, return a task module continue response containing dialog metadata with a `url` property pointing to the webpage. The URL domain must be in the `validDomains` array in your app manifest. In C#, use `TaskInfo`. In TypeScript, use `UrlTaskModuleTaskInfo`. In Python, use `UrlTaskModuleTaskInfo` within a `TaskModuleContinueResponse`. |
| Handle the dialog submission | 4. When the user presses an `Action.Submit` button, Teams sends a task submit invoke to your app with the form data. <br/><br/> 5. You can respond by: <br/> &bull; Doing nothing (task completed) <br/> &bull; Displaying a message (C#: `MessageTask`, TypeScript/Python: `TaskModuleMessageResponse`) <br/> &bull; Chaining to another dialog (C#: `ContinueTask`, TypeScript/Python: `TaskModuleContinueResponse`) | 4. The webpage calls the Teams JS client library to submit data back. Teams sends a task submit invoke to your app with the result. |

The next section describes the dialog metadata that defines the content and appearance of a dialog.

## Dialog metadata

The dialog metadata defines the content and appearance of a dialog. Each language uses its own types to represent this metadata:

* **C#**: `TaskInfo` (from `Microsoft.Teams.Api.TaskModules`)
* **TypeScript**: `CardTaskModuleTaskInfo` or `UrlTaskModuleTaskInfo` (from `@microsoft/teams.api`)
* **Python**: `CardTaskModuleTaskInfo` or `UrlTaskModuleTaskInfo` (from `microsoft_teams.api`)

The following table lists the common properties across all languages:

| Attribute | Type | Description |
| --- | --- | --- |
| `title` | string | This attribute appears below the app name and to the right of the app icon. |
| `height` | number or string | This attribute can be a number representing the dialog's height in pixels, or `small`, `medium`, or `large`. In C#, use `Union<int, Size>`. |
| `width` | number or string | This attribute can be a number representing the dialog's width in pixels, or `small`, `medium`, or `large`. In C#, use `Union<int, Size>`. |
| `url` | string | The URL of the page loaded as an `<iframe>` inside the dialog. The URL's domain must be in the app's [validDomains array](/microsoft-365/extensibility/schema/root#validdomains) in your app manifest. Use `UrlTaskModuleTaskInfo` in TypeScript/Python, or set the `Url` property on `TaskInfo` in C#. |
| `card` | Attachment | The Adaptive Card to display in the dialog. In C#, set the `Card` property on `TaskInfo` with an `Attachment`. In TypeScript, use `cardAttachment()` with `CardTaskModuleTaskInfo`. In Python, use `card_attachment(AdaptiveCardAttachment(...))` with `CardTaskModuleTaskInfo`. |

> [!NOTE]
> The dialog feature requires that the domains of any URLs you want to load are included in the `validDomains` array in your app's manifest.

The next section specifies dialog sizing that enables the user to set the height and width of the dialog.

## Dialog sizing

The values of `width` and `height` set the height and width of the dialog in pixels. Depending on the size of the Teams window and screen resolution, these values might be reduced proportionally while maintaining aspect ratio.

If `width` and `height` are `small`, `medium`, or `large`, the size of the red rectangle in the following image is a proportion of the available space, 20%, 50%, and 60% for `width` and 20%, 50%, and 66% for `height`:

:::image type="content" source="../../assets/images/task-module/task-module-example.png" alt-text="dialog sizing example":::

The next section provides examples of triggering and handling dialogs using the Teams SDK.

## Trigger a dialog with TaskFetchAction

To open a dialog, send an Adaptive Card with a `TaskFetchAction` button. When the user selects the button, Teams sends a task fetch invoke to your app. Each button's `value` data specifies the type of dialog to open (for example, `{ "data": "AdaptiveCard" }`).

# [C#](#tab/csharp)

```csharp
using Microsoft.Teams.Api.Activities;
using Microsoft.Teams.Cards;

teamsApp.OnMessage(async (context) =>
{
    var card = new AdaptiveCard
    {
        Body = new List<CardElement>
        {
            new TextBlock("Task Module Invocation from Adaptive Card")
            {
                Weight = TextWeight.Bolder,
                Size = TextSize.Large
            }
        },
        Actions = new List<Action>
        {
            new TaskFetchAction(new Dictionary<string, object?> { { "data", "AdaptiveCard" } })
            { Title = "Adaptive Card" },
            new TaskFetchAction(new Dictionary<string, object?> { { "data", "CustomForm" } })
            { Title = "Custom Form" },
            new TaskFetchAction(new Dictionary<string, object?> { { "data", "MultiStep" } })
            { Title = "Multi-step Form" }
        }
    };

    await context.Send(new MessageActivity
    {
        Attachments = new List<Attachment>
        {
            new Attachment
            {
                ContentType = new ContentType("application/vnd.microsoft.card.adaptive"),
                Content = card
            }
        }
    });
});
```

# [TypeScript](#tab/typescript)

```typescript
import { Attachment, cardAttachment } from '@microsoft/teams.api';
import { App } from '@microsoft/teams.apps';
import {
  AdaptiveCard,
  TextBlock,
  TaskFetchAction,
} from '@microsoft/teams.cards';

function createTaskModuleAdaptiveCard(): Attachment {
  const card = new AdaptiveCard(
    new TextBlock('Task Module Invocation from Adaptive Card', { weight: 'Bolder', size: 'Large' }),
  ).withVersion('1.4').withActions(
    new TaskFetchAction({ data: 'AdaptiveCard' }).withTitle('Adaptive Card'),
    new TaskFetchAction({ data: 'CustomForm' }).withTitle('Custom Form'),
    new TaskFetchAction({ data: 'MultiStep' }).withTitle('Multi-step Form'),
  );
  return cardAttachment('adaptive', card);
}

app.message(/.*/i, async (context) => {
  await context.send({
    type: 'message',
    attachments: [createTaskModuleAdaptiveCard()],
  });
});
```

# [Python](#tab/python)

```python
from microsoft_teams.api import MessageActivity, MessageActivityInput
from microsoft_teams.apps import ActivityContext
from microsoft_teams.cards import AdaptiveCard, TextBlock, TaskFetchAction

@app.on_message
async def handle_message(context: ActivityContext[MessageActivity]) -> None:
    adaptive_card = AdaptiveCard(version="1.4").with_body(
        [TextBlock(text="Task Module Invocation from Adaptive Card", weight="Bolder", size="Large")]
    ).with_actions(
        [
            TaskFetchAction(value={"data": "AdaptiveCard"}).with_title("Adaptive Card"),
            TaskFetchAction(value={"data": "CustomForm"}).with_title("Custom Form"),
            TaskFetchAction(value={"data": "MultiStep"}).with_title("Multi-step Form"),
        ]
    )

    message = MessageActivityInput().add_card(adaptive_card)
    await context.send(message)
```

---

## Handle the dialog open event

When Teams sends a task fetch invoke, your app returns the dialog content. The content can be an Adaptive Card or a webpage URL. In C#, wrap the dialog metadata in a `ContinueTask` response. In TypeScript, return a `TaskModuleResponse` with `type: 'continue'`. In Python, return an `InvokeResponse` containing a `TaskModuleContinueResponse`.

# [C#](#tab/csharp)

```csharp
using System.Text.Json;
using Microsoft.Teams.Api.TaskModules;
using Microsoft.Teams.Cards;
using Microsoft.Teams.Common;

teamsApp.OnTaskFetch(async (context) =>
{
    var activity = context.Activity;
    var json = JsonSerializer.Deserialize<JsonElement>(JsonSerializer.Serialize(activity));
    var data = json.GetProperty("value").GetProperty("data").GetProperty("data").GetString();

    TaskInfo taskInfo;

    if (data == "CustomForm")
    {
        taskInfo = new TaskInfo
        {
            Title = "Custom Form",
            Width = new Union<int, Size>(510),
            Height = new Union<int, Size>(450),
            Url = $"{botEndpoint}/customform",
            FallbackUrl = $"{botEndpoint}/customform"
        };
    }
    else if (data == "MultiStep")
    {
        var step1Card = new AdaptiveCard
        {
            Body = new List<CardElement>
            {
                new TextBlock("Step 1 of 2 - Your Name") { Size = TextSize.Large, Weight = TextWeight.Bolder },
                new TextInput { Id = "name", Label = "Name", Placeholder = "Enter your name", IsRequired = true }
            },
            Actions = new List<Action>
            {
                new SubmitAction().WithTitle("Next").WithData(
                    new Union<string, SubmitActionData>(new SubmitActionData
                    {
                        NonSchemaProperties = new Dictionary<string, object?> { { "submissiontype", "multi_step_1" } }
                    }))
            }
        };

        taskInfo = new TaskInfo
        {
            Title = "Multi-step Form",
            Width = new Union<int, Size>(400),
            Height = new Union<int, Size>(300),
            Card = new Attachment
            {
                ContentType = new ContentType("application/vnd.microsoft.card.adaptive"),
                Content = step1Card
            }
        };
    }
    else
    {
        var dialogCard = new AdaptiveCard
        {
            Body = new List<CardElement>
            {
                new TextBlock("Enter Text Here") { Weight = TextWeight.Bolder },
                new TextInput { Id = "usertext", Placeholder = "add some text and submit", IsMultiline = true }
            },
            Actions = new List<Action> { new SubmitAction { Title = "Submit" } }
        };

        taskInfo = new TaskInfo
        {
            Title = "Adaptive Card: Inputs",
            Width = new Union<int, Size>(400),
            Height = new Union<int, Size>(200),
            Card = new Attachment
            {
                ContentType = new ContentType("application/vnd.microsoft.card.adaptive"),
                Content = dialogCard
            }
        };
    }

    return new Response(new ContinueTask(taskInfo));
});
```

# [TypeScript](#tab/typescript)

```typescript
import {
  Attachment,
  TaskModuleRequest,
  TaskModuleResponse,
  UrlTaskModuleTaskInfo,
  CardTaskModuleTaskInfo,
  cardAttachment,
} from '@microsoft/teams.api';
import { AdaptiveCard, TextBlock, TextInput, SubmitAction } from '@microsoft/teams.cards';

function createTextInputCard(): Attachment {
  const card = new AdaptiveCard(
    new TextBlock('Enter Text Here', { weight: 'Bolder' }),
    new TextInput({ id: 'usertext', placeholder: 'add some text and submit', isMultiline: true }),
  ).withVersion('1.0').withActions(
    new SubmitAction({ title: 'Submit' }),
  );
  return cardAttachment('adaptive', card);
}

function createMultiStepStep1Card(): Attachment {
  const card = new AdaptiveCard(
    new TextBlock('Step 1 of 2 - Your Name', { size: 'Large', weight: 'Bolder' }),
    new TextInput({ id: 'name', label: 'Name', placeholder: 'Enter your name', isRequired: true }),
  ).withVersion('1.4').withActions(
    new SubmitAction({ title: 'Next', data: { submissiontype: 'multi_step_1' } }),
  );
  return cardAttachment('adaptive', card);
}

app.on('dialog.open', async (context) => {
  const taskModuleRequest = context.activity.value as TaskModuleRequest;
  const cardData = taskModuleRequest.data?.data ?? 'AdaptiveCard';

  if (cardData === 'CustomForm') {
    const taskInfo: UrlTaskModuleTaskInfo = {
      title: 'Custom Form',
      width: 510,
      height: 450,
      url: `${BOT_ENDPOINT}/CustomForm/`,
      fallbackUrl: `${BOT_ENDPOINT}/CustomForm/`,
    };
    return { task: { type: 'continue', value: taskInfo } } as TaskModuleResponse;
  }

  if (cardData === 'MultiStep') {
    const taskInfo: CardTaskModuleTaskInfo = {
      title: 'Multi-step Form',
      width: 400,
      height: 300,
      card: createMultiStepStep1Card(),
    };
    return { task: { type: 'continue', value: taskInfo } } as TaskModuleResponse;
  }

  // Default: AdaptiveCard
  const taskInfo: CardTaskModuleTaskInfo = {
    title: 'Adaptive Card: Inputs',
    width: 400,
    height: 200,
    card: createTextInputCard(),
  };
  return { task: { type: 'continue', value: taskInfo } } as TaskModuleResponse;
});
```

# [Python](#tab/python)

```python
from microsoft_teams.api import (
    AdaptiveCardAttachment,
    CardTaskModuleTaskInfo,
    InvokeResponse,
    TaskFetchInvokeActivity,
    TaskModuleContinueResponse,
    TaskModuleResponse,
    UrlTaskModuleTaskInfo,
    card_attachment,
)
from microsoft_teams.apps import ActivityContext
from microsoft_teams.cards import AdaptiveCard, SubmitAction, SubmitActionData, TextBlock, TextInput

@app.on_dialog_open
async def handle_dialog_open(context: ActivityContext[TaskFetchInvokeActivity]):
    data = context.activity.value.data
    card_data = data.get("data") if isinstance(data, dict) else data

    if card_data == "CustomForm":
        return InvokeResponse(
            body=TaskModuleResponse(
                task=TaskModuleContinueResponse(
                    value=UrlTaskModuleTaskInfo(
                        title="Custom Form",
                        width=510,
                        height=450,
                        url=f"{os.getenv('BOT_ENDPOINT', 'http://localhost:3978')}/customform",
                        fallback_url=f"{os.getenv('BOT_ENDPOINT', 'http://localhost:3978')}/customform",
                    )
                )
            )
        )

    elif card_data == "MultiStep":
        dialog_card = AdaptiveCard(version="1.4").with_body([
            TextBlock(text="Step 1 of 2 - Your Name", size="Large", weight="Bolder"),
            TextInput().with_id("name").with_label("Name").with_placeholder("Enter your name").with_is_required(True),
        ]).with_actions([
            SubmitAction().with_title("Next").with_data(
                SubmitActionData().with_data({"submissiontype": "multi_step_1"})
            ),
        ])

        return InvokeResponse(
            body=TaskModuleResponse(
                task=TaskModuleContinueResponse(
                    value=CardTaskModuleTaskInfo(
                        title="Multi-step Form",
                        width=400,
                        height=300,
                        card=card_attachment(AdaptiveCardAttachment(content=dialog_card)),
                    )
                )
            )
        )

    dialog_card = AdaptiveCard(version="1.0").with_body([
        TextBlock(text="Enter Text Here", weight="Bolder"),
        TextInput().with_id("usertext").with_placeholder("add some text and submit").with_is_multiline(True),
    ]).with_actions([
        SubmitAction().with_title("Submit"),
    ])

    return InvokeResponse(
        body=TaskModuleResponse(
            task=TaskModuleContinueResponse(
                value=CardTaskModuleTaskInfo(
                    title="Adaptive Card: Inputs",
                    width=400,
                    height=200,
                    card=card_attachment(AdaptiveCardAttachment(content=dialog_card)),
                )
            )
        )
    )
```

---

## Handle the dialog submission

When a user presses `Action.Submit` in a dialog, Teams sends a task submit invoke to your app. You can respond by completing the task, showing a message, or opening another dialog (for example, to chain multi-step forms).

# [C#](#tab/csharp)

```csharp
using System.Text.Json;
using Microsoft.Teams.Api.TaskModules;
using Microsoft.Teams.Cards;
using Microsoft.Teams.Common;

teamsApp.OnTaskSubmit(async (context) =>
{
    var activity = context.Activity;
    var json = JsonSerializer.Deserialize<JsonElement>(JsonSerializer.Serialize(activity));
    var submitData = JsonSerializer.Deserialize<Dictionary<string, object>>(
        json.GetProperty("value").GetProperty("data").GetRawText());
    var submissionType = submitData?.GetValueOrDefault("submissiontype")?.ToString();

    if (submissionType == "multi_step_1")
    {
        var name = submitData["name"]?.ToString();
        var step2Card = new AdaptiveCard
        {
            Body = new List<CardElement>
            {
                new TextBlock("Step 2 of 2 - Your Email") { Size = TextSize.Large, Weight = TextWeight.Bolder },
                new TextInput { Id = "email", Label = "Email", Placeholder = "Enter your email", IsRequired = true }
            },
            Actions = new List<Action>
            {
                new SubmitAction().WithTitle("Submit").WithData(
                    new Union<string, SubmitActionData>(new SubmitActionData
                    {
                        NonSchemaProperties = new Dictionary<string, object?>
                        {
                            { "submissiontype", "multi_step_2" },
                            { "name", name! }
                        }
                    }))
            }
        };

        var taskInfo = new TaskInfo
        {
            Title = "Multi-step Form: Step 2",
            Width = new Union<int, Size>(400),
            Height = new Union<int, Size>(300),
            Card = new Attachment
            {
                ContentType = new ContentType("application/vnd.microsoft.card.adaptive"),
                Content = step2Card
            }
        };

        return new Response(new ContinueTask(taskInfo));
    }

    if (submissionType == "multi_step_2")
    {
        await context.Send($"Hi {submitData["name"]}, thanks for submitting! Your email is {submitData["email"]}");
        return new Response(new MessageTask("Multi-step form completed!"));
    }

    var usertext = submitData?.GetValueOrDefault("usertext")?.ToString();
    await context.Send($"You submitted: {usertext}");
    return new Response(new MessageTask("Thanks for submitting!"));
});
```

# [TypeScript](#tab/typescript)

```typescript
import {
  TaskModuleRequest,
  TaskModuleResponse,
  CardTaskModuleTaskInfo,
} from '@microsoft/teams.api';

app.on('dialog.submit', async (context) => {
  const taskModuleRequest = context.activity.value as TaskModuleRequest;
  const data = taskModuleRequest.data || {};
  const submissionType = typeof data === 'object' ? data.submissiontype : undefined;

  if (submissionType === 'multi_step_1') {
    const taskInfo: CardTaskModuleTaskInfo = {
      title: 'Multi-step Form: Step 2',
      width: 400,
      height: 300,
      card: createMultiStepStep2Card(data.name),
    };
    return { task: { type: 'continue', value: taskInfo } } as TaskModuleResponse;
  }

  if (submissionType === 'multi_step_2') {
    const { name, email } = data;
    await context.send(`Hi ${name}, thanks for submitting! Your email is ${email}`);
    return { task: { type: 'message', value: 'Multi-step form completed!' } } as TaskModuleResponse;
  }

  // Default: adaptive card text input
  const usertext = data?.usertext;
  await context.send(`You submitted: ${usertext}`);
  return { task: { type: 'message', value: 'Thanks for submitting!' } } as TaskModuleResponse;
});
```

# [Python](#tab/python)

```python
from microsoft_teams.api import (
    AdaptiveCardAttachment,
    CardTaskModuleTaskInfo,
    InvokeResponse,
    TaskModuleContinueResponse,
    TaskModuleMessageResponse,
    TaskModuleResponse,
    TaskSubmitInvokeActivity,
    card_attachment,
)
from microsoft_teams.apps import ActivityContext
from microsoft_teams.cards import AdaptiveCard, SubmitAction, SubmitActionData, TextBlock, TextInput

@app.on_dialog_submit
async def handle_dialog_submit(context: ActivityContext[TaskSubmitInvokeActivity]):
    data = context.activity.value.data
    submission_type = data.get("submissiontype") if isinstance(data, dict) else None

    if submission_type == "multi_step_1":
        name = data.get("name")
        next_card = AdaptiveCard(version="1.4").with_body([
            TextBlock(text="Step 2 of 2 - Your Email", size="Large", weight="Bolder"),
            TextInput().with_id("email").with_label("Email").with_placeholder("Enter your email").with_is_required(True),
        ]).with_actions([
            SubmitAction().with_title("Submit").with_data(
                SubmitActionData().with_data({"submissiontype": "multi_step_2", "name": name})
            ),
        ])

        return InvokeResponse(
            body=TaskModuleResponse(
                task=TaskModuleContinueResponse(
                    value=CardTaskModuleTaskInfo(
                        title="Multi-step Form: Step 2",
                        width=400,
                        height=300,
                        card=card_attachment(AdaptiveCardAttachment(content=next_card)),
                    )
                )
            )
        )

    if submission_type == "multi_step_2":
        name = data.get("name")
        email = data.get("email")
        await context.send(f"Hi {name}, thanks for submitting! Your email is {email}")
        return InvokeResponse(
            body=TaskModuleResponse(task=TaskModuleMessageResponse(value="Multi-step form completed!"))
        )

    usertext = data.get("usertext") if data else None
    await context.send(f"You submitted: {usertext}")
    return InvokeResponse(
        body=TaskModuleResponse(task=TaskModuleMessageResponse(value="Thanks for submitting!"))
    )
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
|Bot task modules | This sample app demonstrates how to use dialogs (referred as task modules in TeamsJS v1.x) using the Teams AI SDK. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-task-modules/dotnet/bot-task-modules)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-task-modules)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-task-modules/python/bot-task-modules)|

## Next step

> [!div class="nextstepaction"]
> [Use dialogs in tabs](~/task-modules-and-cards/task-modules/task-modules-tabs.md)

## See also

* [Cards and dialogs](../cards-and-task-modules.md)
* [Teams SDK overview](/microsoftteams/platform/teams-sdk/)
* [Dialogs in the Teams SDK](/microsoftteams/platform/teams-sdk/in-depth-guides/dialogs/overview)
* [Adaptive Cards in the Teams SDK](/microsoftteams/platform/teams-sdk/in-depth-guides/adaptive-cards/overview)
* [Migrate from BotBuilder](/microsoftteams/platform/teams-sdk/migrations/botbuilder/overview)
