---
title: Use dialogs in Microsoft Teams bots
description: Learn how to use dialogs with Microsoft Teams bots, invoke dialogs using Adaptive Card actions, handle dialog open and submit events, and respond to messages using the Teams AI SDK.
ms.localizationpriority: medium
ms.topic: how-to
ms.date: 03/20/2026
---

# Use dialogs with bots

Invoke dialogs (referred as task modules in TeamsJS v1.x) from Microsoft Teams bots using buttons on Adaptive Cards. Dialogs are often a better user experience than multiple conversation steps. Keep track of bot state and allow the user to interrupt or cancel the sequence.

The Teams AI SDK provides a streamlined way to handle dialog interactions through the `dialog.open` and `dialog.submit` events. There are two dialog types supported:

* **Adaptive Card dialogs**: The bot responds with an Adaptive Card body directly, allowing rich interactive forms within the dialog.
* **URL-based dialogs**: The bot responds with a URL pointing to a hosted webpage that renders inside the dialog frame.

> [!IMPORTANT]
> Each `url` and `fallbackUrl` must implement the HTTPS encryption protocol.

## Invoke a dialog using `dialog.open`

When a user selects a button with a `TaskFetch` action on an Adaptive Card, a `dialog.open` event is sent to the bot. The bot handles this event and returns a `TaskModuleResponse` with a `continue` task containing a `TaskInfo` object, which Teams uses to display the dialog.

[!INCLUDE [ocdi-warning](../../includes/tabs/ocdi-warning.md)]

:::image type="content" source="../../assets/images/task-module/task-module-invoke-request-response.png" alt-text="task/fetch request or response":::

The following steps describe how to invoke a dialog using the Teams AI SDK:

1. An Adaptive Card is sent to the user with one or more `TaskFetchAction` buttons. Each button's `value` carries a `data` payload that identifies which dialog to open.
1. The user selects a button, and Microsoft Teams sends a `dialog.open` invoke event to the bot.
1. The bot's `dialog.open` handler inspects the payload, builds a `TaskInfo` object (either URL-based or Adaptive Card-based), and returns a response with `type: continue`. The following code provides an example of how each language constructs the URL-based dialog response for the Custom Form:

   # [.NET](#tab/csharp)

    ```csharp
    taskInfo = new TaskInfo
    {
        Title = "Custom Form",
        Width = new Union<int, Size>(510),
        Height = new Union<int, Size>(450),
        Url = $"{botEndpoint}/customform",
        FallbackUrl = $"{botEndpoint}/customform"
    };
    return new Response(new ContinueTask(taskInfo));
    ```

   # [Node.js](#tab/nodejs)

    ```typescript
    const taskInfo: UrlTaskModuleTaskInfo = {
        title: 'Custom Form',
        width: 510,
        height: 450,
        url: `${BOT_ENDPOINT}/CustomForm/`,
        fallbackUrl: `${BOT_ENDPOINT}/CustomForm/`,
    };
    return { task: { type: 'continue', value: taskInfo } } as TaskModuleResponse;
    ```

   # [Python](#tab/python)

    ```python
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
    ```

    ---

1. Microsoft Teams displays the dialog.

The next section provides details on submitting the result of a dialog.

## Submit the result of a dialog

When the user is finished with the dialog, the result is submitted back to the bot through a `dialog.submit` event. There are a few differences based on dialog type as follows:

* **URL-based dialog (`TaskInfo.url`)**: The hosted webpage calls the Teams client SDK to submit data back to the bot. The bot receives a `dialog.submit` event containing the submitted data.
* **Adaptive Card dialog (`TaskInfo.card`)**: The Adaptive Card body as filled in by the user is sent to the bot through a `dialog.submit` event when the user selects any `Action.Submit` button.

The next section provides details on how to respond to `dialog.submit` events.

## Respond to the `dialog.submit` events

When the user finishes with a dialog invoked from a bot, the bot receives a `dialog.submit` invoke event. You have several options when responding to the `dialog.submit` event as follows:

| Response task type | Scenario |
| ------------------ | -------- |
| No return value (or `undefined`) | The simplest response is no response at all. Your bot isn't required to respond when the user is finished with the dialog. |
| `type: message` | Teams displays the value of `value` in a pop-up message box. |
| `type: continue` | Allows you to chain sequences of Adaptive Cards together in a wizard or multi-step experience. |

> [!NOTE]
> Chaining Adaptive Cards into a sequence is an advanced scenario. The multi-step form sample demonstrates this pattern using the `type: continue` response to transition between dialog steps. For more information, see [Microsoft Teams dialog sample](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-task-modules).

The next section provides details on the payload of `dialog.open` and `dialog.submit` events.

## Payload of `dialog.open` and `dialog.submit` events

This section defines the schema of what your bot receives when it handles a `dialog.open` or `dialog.submit` event using the Teams AI SDK. The following table provides the properties of the event payload:

| Property | Description                          |
| -------- | ------------------------------------ |
| `type`   | Is always `invoke`.           |
| `name`   | Is either `task/fetch` (maps to `dialog.open`) or `task/submit` (maps to `dialog.submit`). |
| `value`  | Is the developer-defined payload. The `value.data` object contains the payload sent from the Adaptive Card `Action.Submit` or `TaskFetchAction`. A `data` property within `value.data` identifies the requested dialog type.<br/><br/>Example structure:<br/><br/><pre>{<br/>  "value": {<br/>    "data": {<br/>      "data": "AdaptiveCard" &vert; "CustomForm" &vert; "MultiStep"<br/>    }<br/>  }<br/>}</pre>  |

The following tabs provide the `dialog.open` and `dialog.submit` handler implementations in .NET, Node.js, and Python using the Teams AI SDK:

# [.NET](#tab/csharp)

```csharp
// Handle dialog.open: return the appropriate task module based on the requested type
teamsApp.OnTaskFetch(async (context) =>
{
    var activity = context.Activity;
    var json = JsonSerializer.Deserialize<JsonElement>(JsonSerializer.Serialize(activity));
    var data = json.GetProperty("value").GetProperty("data").GetProperty("data").GetString();

    TaskInfo taskInfo;

    if (data == "CustomForm")
    {
        // Return a URL-based task module pointing to the custom HTML form
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
        // Return step 1 of the multi-step Adaptive Card form
        var step1Card = new AdaptiveCard
        {
            Body = new List<CardElement>
            {
                new TextBlock("Step 1 of 2 - Your Name") { Size = TextSize.Large, Weight = TextWeight.Bolder },
                new TextInput { Id = "name", Label = "Name", Placeholder = "Enter your name", IsRequired = true }
            },
            Actions = new List<Action> { new SubmitAction().WithTitle("Next").WithData(new Union<string, SubmitActionData>(new SubmitActionData { NonSchemaProperties = new Dictionary<string, object?> { { "submissiontype", "multi_step_1" } } })) }
        };

        taskInfo = new TaskInfo
        {
            Title = "Multi-step Form",
            Width = new Union<int, Size>(400),
            Height = new Union<int, Size>(300),
            Card = new Attachment { ContentType = new ContentType("application/vnd.microsoft.card.adaptive"), Content = step1Card }
        };
    }
    else
    {
        // Default: return an Adaptive Card with a text input field
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
            Card = new Attachment { ContentType = new ContentType("application/vnd.microsoft.card.adaptive"), Content = dialogCard }
        };
    }

    return new Response(new ContinueTask(taskInfo));
});

// Handle dialog.submit: route by submissiontype to advance multi-step flow or confirm submissions
teamsApp.OnTaskSubmit(async (context) =>
{
    var activity = context.Activity;
    var json = JsonSerializer.Deserialize<JsonElement>(JsonSerializer.Serialize(activity));
    var submitData = JsonSerializer.Deserialize<Dictionary<string, object>>(json.GetProperty("value").GetProperty("data").GetRawText());
    var submissionType = submitData?.GetValueOrDefault("submissiontype")?.ToString();

    if (submissionType == "multi_step_1")
    {
        // Advance to step 2, carrying the name forward
        var name = submitData["name"]?.ToString();
        var step2Card = new AdaptiveCard
        {
            Body = new List<CardElement>
            {
                new TextBlock("Step 2 of 2 - Your Email") { Size = TextSize.Large, Weight = TextWeight.Bolder },
                new TextInput { Id = "email", Label = "Email", Placeholder = "Enter your email", IsRequired = true }
            },
            Actions = new List<Action> { new SubmitAction().WithTitle("Submit").WithData(new Union<string, SubmitActionData>(new SubmitActionData { NonSchemaProperties = new Dictionary<string, object?> { { "submissiontype", "multi_step_2" }, { "name", name! } } })) }
        };

        var taskInfo = new TaskInfo
        {
            Title = "Multi-step Form: Step 2",
            Width = new Union<int, Size>(400),
            Height = new Union<int, Size>(300),
            Card = new Attachment { ContentType = new ContentType("application/vnd.microsoft.card.adaptive"), Content = step2Card }
        };

        return new Response(new ContinueTask(taskInfo));
    }

    if (submissionType == "multi_step_2")
    {
        await context.Send($"Hi {submitData["name"]}, thanks for submitting! Your email is {submitData["email"]}");
        return new Response(new MessageTask("Multi-step form completed!"));
    }

    if (submissionType == "custom_form")
    {
        await context.Send($"Hi {submitData["name"]}, thanks for submitting! Your email is {submitData["email"]}");
        return new Response(new MessageTask("Form submitted successfully"));
    }

    // Default: echo back the adaptive card text input
    var usertext = submitData?.GetValueOrDefault("usertext")?.ToString();
    await context.Send($"You submitted: {usertext}");
    return new Response(new MessageTask("Thanks for submitting!"));
});
```

# [Node.js](#tab/nodejs)

```typescript
/** Handles dialog.open (task/fetch) invocations by returning the appropriate task module
 *  (URL page, adaptive card, or multi-step card) based on the requested type. */
app.on('dialog.open', async (context: IActivityContext<any>) => {
    const taskModuleRequest = context.activity.value as TaskModuleRequest;
    const cardData = taskModuleRequest.data?.data ?? 'AdaptiveCard';

    if (cardData === 'CustomForm') {
        // Return a URL-based task module pointing to the custom HTML form
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
        // Return step 1 of the multi-step Adaptive Card form
        const taskInfo: CardTaskModuleTaskInfo = {
            title: 'Multi-step Form',
            width: 400,
            height: 300,
            card: createMultiStepStep1Card(),
        };
        return { task: { type: 'continue', value: taskInfo } } as TaskModuleResponse;
    }

    // Default: return the Adaptive Card with a text input field
    const taskInfo: CardTaskModuleTaskInfo = {
        title: 'Adaptive Card: Inputs',
        width: 400,
        height: 200,
        card: createTextInputCard(),
    };
    return { task: { type: 'continue', value: taskInfo } } as TaskModuleResponse;
});

/** Handles dialog.submit (task/submit) invocations by routing on submissiontype:
 *  advances multi-step flow, confirms custom form, or echoes adaptive card text input. */
app.on('dialog.submit', async (context: IActivityContext<any>) => {
    const taskModuleRequest = context.activity.value as TaskModuleRequest;
    const data = taskModuleRequest.data || {};
    const submissionType = typeof data === 'object' ? data.submissiontype : undefined;

    if (submissionType === 'multi_step_1') {
        // Advance to step 2, carrying the name forward
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

    if (submissionType === 'custom_form') {
        const { name, email } = data;
        await context.send(`Hi ${name}, thanks for submitting! Your email is ${email}`);
        return { task: { type: 'message', value: 'Form submitted successfully' } } as TaskModuleResponse;
    }

    // Default: echo back the adaptive card text input
    const usertext = data?.usertext;
    await context.send(`You submitted: ${usertext}`);
    return { task: { type: 'message', value: 'Thanks for submitting!' } } as TaskModuleResponse;
});
```

# [Python](#tab/python)

```python
@app.on_dialog_open
async def handle_dialog_open(ctx: ActivityContext[TaskFetchInvokeActivity]):
    # Handle dialog.open: return the appropriate task module based on the requested type
    data = ctx.activity.value.data
    card_data = data.get("data") if isinstance(data, dict) else data

    if card_data == "CustomForm":
        # Return a URL-based task module pointing to the custom HTML form
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
        # Return step 1 of the multi-step Adaptive Card form
        dialog_card = AdaptiveCard(version="1.4").with_body([
            TextBlock(text="Step 1 of 2 - Your Name", size="Large", weight="Bolder"),
            TextInput().with_id("name").with_label("Name").with_placeholder("Enter your name").with_is_required(True),
        ]).with_actions([
            SubmitAction().with_title("Next").with_data(SubmitActionData().with_data({"submissiontype": "multi_step_1"})),
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

    # Default: return an Adaptive Card with a text input field
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


@app.on_dialog_submit
async def handle_dialog_submit(ctx: ActivityContext[TaskSubmitInvokeActivity]):
    # Handle dialog.submit: route by submissiontype to advance multi-step flow or confirm submissions
    data = ctx.activity.value.data
    submission_type = data.get("submissiontype") if isinstance(data, dict) else None

    if submission_type == "multi_step_1":
        # Advance to step 2, carrying the name forward
        name = data.get("name")
        next_card = AdaptiveCard(version="1.4").with_body([
            TextBlock(text="Step 2 of 2 - Your Email", size="Large", weight="Bolder"),
            TextInput().with_id("email").with_label("Email").with_placeholder("Enter your email").with_is_required(True),
        ]).with_actions([
            SubmitAction().with_title("Submit").with_data(SubmitActionData().with_data({"submissiontype": "multi_step_2", "name": name})),
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

    elif submission_type == "multi_step_2":
        name = data.get("name")
        email = data.get("email")
        await ctx.send(f"Hi {name}, thanks for submitting! Your email is {email}")
        return InvokeResponse(
            body=TaskModuleResponse(task=TaskModuleMessageResponse(value="Multi-step form completed!"))
        )

    elif submission_type == "custom_form":
        name = data.get("name") if data else None
        email = data.get("email") if data else None
        await ctx.send(f"Hi {name}, thanks for submitting! Your email is {email}")
        return InvokeResponse(
            body=TaskModuleResponse(task=TaskModuleMessageResponse(value="Form submitted successfully"))
        )

    # Default: echo back the adaptive card text input
    usertext = data.get("usertext") if data else None
    await ctx.send(f"You submitted: {usertext}")
    return InvokeResponse(
        body=TaskModuleResponse(task=TaskModuleMessageResponse(value="Thanks for submitting!"))
    )
```

---

### Invoke a dialog using `TaskFetchAction`

The Teams AI SDK provides `TaskFetchAction` as a first-class card action to trigger `dialog.open` events from Adaptive Cards. When the user selects a `TaskFetchAction` button, the Teams client sends a `dialog.open` invoke event to the bot, carrying the action's `data` payload. The following code shows how each language adds `TaskFetchAction` buttons to an Adaptive Card:

# [.NET](#tab/csharp)

```csharp
var card = new AdaptiveCard
{
    Body = new List<CardElement>
    {
        new TextBlock("Task Module Invocation from Adaptive Card") { Weight = TextWeight.Bolder, Size = TextSize.Large }
    },
    Actions = new List<Microsoft.Teams.Cards.Action>
    {
        new TaskFetchAction(new Dictionary<string, object?> { { "data", "AdaptiveCard" } }) { Title = "Adaptive Card" },
        new TaskFetchAction(new Dictionary<string, object?> { { "data", "CustomForm" } }) { Title = "Custom Form" },
        new TaskFetchAction(new Dictionary<string, object?> { { "data", "MultiStep" } }) { Title = "Multi-step Form" }
    }
};
```

# [Node.js](#tab/nodejs)

```typescript
const card = new AdaptiveCard(
    new TextBlock('Task Module Invocation from Adaptive Card', { weight: 'Bolder', size: 'Large' }),
).withVersion('1.4').withActions(
    new TaskFetchAction({ data: 'AdaptiveCard' }).withTitle('Adaptive Card'),
    new TaskFetchAction({ data: 'CustomForm' }).withTitle('Custom Form'),
    new TaskFetchAction({ data: 'MultiStep' }).withTitle('Multi-step Form'),
);
```

# [Python](#tab/python)

```python
adaptive_card = AdaptiveCard(version="1.4").with_body(
    [TextBlock(text="Task Module Invocation from Adaptive Card", weight="Bolder", size="Large")]
).with_actions(
    [
        TaskFetchAction(value={"data": "AdaptiveCard"}).with_title("Adaptive Card"),
        TaskFetchAction(value={"data": "CustomForm"}).with_title("Custom Form"),
        TaskFetchAction(value={"data": "MultiStep"}).with_title("Multi-step Form"),
    ]
)
```

---

## Code sample

|Sample name | Description | .NET | Node.js | Python |
|----------------|-----------------|--------------|----------------|----------------|
|Bot task modules | This sample app demonstrates how to use dialogs (task modules) in Microsoft Teams using the Teams AI SDK. It showcases Adaptive Card dialogs, a custom HTML form dialog, and a multi-step dialog flow. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-task-modules/dotnet/bot-task-modules)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-task-modules/nodejs/bot-task-modules)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-task-modules/python/bot-task-modules)

## See also

* [Cards and dialogs](../cards-and-task-modules.md)
* [Microsoft Teams bot task modules sample](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-task-modules)
* [Microsoft Teams SDK Documentation](https://learn.microsoft.com/microsoftteams/platform/)
