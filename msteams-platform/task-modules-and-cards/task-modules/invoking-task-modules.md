---
title: Invoke Dialogs from a Bot or Link
description: Learn about invoking and dismissing dialogs (task modules) from bots and deep links, including the dialog info object, dialog sizing, and code samples for Adaptive Card, Custom Form, and Multi-step Form dialogs.
author: vikasalmal
ms.topic: conceptual
ms.localizationpriority: medium
ms.date: 03/23/2026
---

# Invoke and dismiss dialogs

Dialogs (referred as task modules in TeamsJS v1.x) can be invoked from bots or deep links. The response can be either in HTML, JavaScript, or as an Adaptive Card. The following table summarizes how this works.

> [!NOTE]
> The `task` capability is replaced with `dialog` capability in both HTML-based dialogs (starting with TeamsJS v.2.0.0) and Adaptive Card-based dialogs (starting with TeamsJS v.2.8.0). For more information, see [dialog](./../../m365-apps/teamsjs-support-m365.md#dialog).

| Invoked using | Dialog with HTML or JavaScript | Dialog with Adaptive Card |
| --- | --- | --- |
| Bot card button | 1. Bot card buttons can invoke dialogs from either a deep link URL, or by using a `TaskFetchAction` card action. <br/><br/> 2. When a `TaskFetchAction` button is pressed, a `dialog.open` event is raised and handled by the bot. The bot responds with a [DialogInfo object](#dialoginfo-object) that specifies the dialog to display. Teams displays the dialog. <br/><br/> 3. After the user has performed the actions, a `SubmitAction` on the Adaptive Card sends the result. The bot receives a `dialog.submit` event that contains the result. <br/><br/> 4. You have three different ways to respond to the `dialog.submit` event: do nothing (if the task completed successfully), display a message to the user in the dialog, or invoke another dialog. For more information, see [Respond to the dialog.submit events](task-modules-bots.md#respond-to-the-dialogsubmit-events). | <ul><li> Buttons on Adaptive Cards support two ways of invoking dialogs: deep link URLs with `Action.OpenUrl` buttons, and `TaskFetchAction` buttons that trigger a `dialog.open` event. </li></ul> <br/><br/> <ul><li> Dialogs with Adaptive Cards work similarly to the HTML or JavaScript case. The major difference is that, because there's no JavaScript when you're using Adaptive Cards, there's no way to call *submit()*. Instead, Teams takes the `data` object from `SubmitAction` and returns it as the payload of the `dialog.submit` event. For more information, see [Respond to the dialog.submit events](task-modules-bots.md#respond-to-the-dialogsubmit-events). </li></ul> |
|  Deep link URL*<br/><br/>*\*Deprecated; supported for backwards compatibility*| 1. Teams invokes the dialog that is the URL that appears inside the `<iframe>` specified in the `url` parameter of the deep link. There's no `submitHandler` callback. <br/><br/> 2. Within the JavaScript of the page in the dialog, call `dialog.url.submit()` to close it with a `result` object as a parameter, the same as when invoking it from a bot card button. If your completion logic resides on the client and there's no bot, there's no `submitHandler` callback, so any completion logic must be in the code preceding the call to `dialog.url.submit()`. If you have a bot, then you can specify a `completionBotId` parameter in the deep link to send the `result` object through a `dialog.submit` event. | 1. Teams invokes the dialog that is the JSON card body of the Adaptive Card that is specified as a URL-encoded value of the `card` parameter of the deep link. <br/><br/> 2. The user closes the dialog by selecting the X at the upper right of the dialog or by pressing a `SubmitAction` button on the card. Since there's no `submitHandler` to call, the user must have a bot to send the value of the Adaptive Card fields. The user must use the `completionBotId` parameter in the deep link to specify the bot to send the data to using a `dialog.submit` event. |

The next section specifies the `DialogInfo` object that defines certain attributes for a dialog.

## DialogInfo object

The base `DialogInfo` object contains basic metadata for a dialog:

| Attribute | Type | Description |
| --- | --- | --- |
| `title` | string | This attribute appears below the app name and to the right of the app icon. |
| `height` | number or string | This attribute can be a number representing the dialog's height in pixels, or `small`, `medium`, or `large`. |
| `width` | number or string | This attribute can be a number representing the dialog's width in pixels, or `small`, `medium`, or `large`. |

### UrlDialogInfo object

The `UrlDialogInfo` object for HTML-based dialogs extends the `DialogInfo` object and also includes:

| Attribute | Type | Description |
| --- | --- | --- |
| `url` | string | This attribute is the URL of the page loaded as an `<iframe>` inside the dialog. The URLs domain must be in the app's [validDomains array](/microsoft-365/extensibility/schema/root#validdomains) in your app's manifest. |

### AdaptiveCardDialogInfo object

The `AdaptiveCardDialogInfo` object for Adaptive Card-based dialogs extends the *DialogInfo* object and also includes:

| Attribute | Type | Description |
| --- | --- | --- |
| `card` | Adaptive Card bot card attachment | This attribute is the JSON for the Adaptive Card to appear in the dialog. When invoking from a bot, use the Adaptive Card JSON in an `attachment` object with content type `application/vnd.microsoft.card.adaptive`. |

### BotAdaptiveCardDialogInfo object

The `BotAdaptiveCardDialogInfo` object for bot-based Adaptive Card dialogs extends the *AdaptiveCardDialogInfo* object and also includes:

| Attribute | Type | Description |
| --- | --- | --- |
| `completionBotId` | string | This attribute specifies a bot App ID to send the result of the user's interaction with the dialog. If specified, the bot receives a `dialog.submit` event with a JSON object in the event payload. |

> [!NOTE]
> The dialog feature requires that the domains of any URLs you want to load are included in the `validDomains` array in your app's manifest.

The next section specifies dialog sizing that enables the user to set the height and width of the dialog.

## Dialog sizing

The `width` and `height` properties on `TaskInfo` (or its URL/card variants) control the size of the dialog in pixels. Depending on the Teams window size and screen resolution, these values might be reduced proportionally while maintaining aspect ratio.

The following table lists the sizes used in the bot-task-modules sample for each dialog type:

| Dialog type | Width | Height |
| --- | --- | --- |
| Adaptive Card dialog | 400 | 200 |
| Custom Form dialog | 510 | 450 |
| Multi-step Form dialog | 400 | 300 |

The next section covers the three supported dialog types with code samples for each.

## Dialog features

The bot sample supports three dialog types, each demonstrating a different approach to collecting user input.

### Adaptive Card dialog

The Adaptive Card dialog opens a card-based modal directly inside the task module. The bot handles the `dialog.open` event and returns a `CardTaskModuleTaskInfo` with a card attachment. On submit, the bot receives the user's text input through the `dialog.submit` event.

:::image type="content" source="../../assets/images/adaptive-cards/adaptive-card1.png" alt-text="Adaptive Card":::

# [.NET](#tab/csharp)

```csharp
// dialog.open — return an Adaptive Card dialog
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
return new Response(new ContinueTask(taskInfo));

// dialog.submit — echo the submitted text
var usertext = submitData?.GetValueOrDefault("usertext")?.ToString();
await context.Send($"You submitted: {usertext}");
return new Response(new MessageTask("Thanks for submitting!"));
```

# [Node.js](#tab/nodejs)

```typescript
// dialog.open — return an Adaptive Card dialog
const taskInfo: CardTaskModuleTaskInfo = {
    title: 'Adaptive Card: Inputs',
    width: 400,
    height: 200,
    card: createTextInputCard(),
};
return { task: { type: 'continue', value: taskInfo } } as TaskModuleResponse;

// dialog.submit — echo the submitted text
const usertext = data?.usertext;
await context.send(`You submitted: ${usertext}`);
return { task: { type: 'message', value: 'Thanks for submitting!' } } as TaskModuleResponse;
```

# [Python](#tab/python)

```python
# dialog.open — return an Adaptive Card dialog
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

# dialog.submit — echo the submitted text
usertext = data.get("usertext") if data else None
await ctx.send(f"You submitted: {usertext}")
return InvokeResponse(
    body=TaskModuleResponse(task=TaskModuleMessageResponse(value="Thanks for submitting!"))
)
```

---

### Custom Form dialog

The Custom Form dialog launches a custom HTML webpage as the task module content. The bot returns a `UrlTaskModuleTaskInfo` pointing to the hosted form page. The form is rendered inside an `<iframe>` within Teams and can use Teams-themed styling for a consistent experience.

:::image type="content" source="../../assets/images/custom-form1.png" alt-text="Custom Form":::

# [.NET](#tab/csharp)

```csharp
// dialog.open — return a URL-based task module pointing to the custom form page
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
// dialog.open — return a URL-based task module pointing to the custom form page
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
# dialog.open — return a URL-based task module pointing to the custom form page
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

### Multi-step Form dialog

The Multi-step Form dialog chains two Adaptive Card steps within a single task module session. Step 1 collects the user's name; on submit, the bot advances to Step 2 by returning a new card using a `continue` response. Step 2 collects the user's email, carrying the name forward in the submit payload. On final submission, the bot sends a personalized confirmation message.

:::image type="content" source="../../assets/images/multi-step-form1.png" alt-text="Multi Step form":::

:::image type="content" source="../../assets/images/multi-step-form2.png" alt-text="Multi Step form":::

# [.NET](#tab/csharp)

```csharp
// dialog.open — return Step 1 card
var step1Card = new AdaptiveCard
{
    Body = new List<CardElement>
    {
        new TextBlock("Step 1 of 2 - Your Name") { Size = TextSize.Large, Weight = TextWeight.Bolder },
        new TextInput { Id = "name", Label = "Name", Placeholder = "Enter your name", IsRequired = true }
    },
    Actions = new List<Action> { new SubmitAction().WithTitle("Next").WithData(new Union<string, SubmitActionData>(new SubmitActionData {
        NonSchemaProperties = new Dictionary<string, object?> { { "submissiontype", "multi_step_1" } } })) }
};

taskInfo = new TaskInfo
{
    Title = "Multi-step Form",
    Width = new Union<int, Size>(400),
    Height = new Union<int, Size>(300),
    Card = new Attachment { ContentType = new ContentType("application/vnd.microsoft.card.adaptive"), Content = step1Card }
};
return new Response(new ContinueTask(taskInfo));

// dialog.submit — advance to Step 2
var name = submitData["name"]?.ToString();
var step2Card = new AdaptiveCard
{
    Body = new List<CardElement>
    {
        new TextBlock("Step 2 of 2 - Your Email") { Size = TextSize.Large, Weight = TextWeight.Bolder },
        new TextInput { Id = "email", Label = "Email", Placeholder = "Enter your email", IsRequired = true }
    },
    Actions = new List<Action> { new SubmitAction().WithTitle("Submit").WithData(new Union<string, SubmitActionData>(new SubmitActionData {
        NonSchemaProperties = new Dictionary<string, object?> { { "submissiontype", "multi_step_2" }, { "name", name! } } })) }
};

var taskInfo = new TaskInfo
{
    Title = "Multi-step Form: Step 2",
    Width = new Union<int, Size>(400),
    Height = new Union<int, Size>(300),
    Card = new Attachment { ContentType = new ContentType("application/vnd.microsoft.card.adaptive"), Content = step2Card }
};
return new Response(new ContinueTask(taskInfo));

// dialog.submit — final submission
await context.Send($"Hi {submitData["name"]}, thanks for submitting! Your email is {submitData["email"]}");
return new Response(new MessageTask("Multi-step form completed!"));
```

# [Node.js](#tab/nodejs)

```typescript
// dialog.open — return Step 1 card
const taskInfo: CardTaskModuleTaskInfo = {
    title: 'Multi-step Form',
    width: 400,
    height: 300,
    card: createMultiStepStep1Card(),
};
return { task: { type: 'continue', value: taskInfo } } as TaskModuleResponse;

// dialog.submit — advance to Step 2
const taskInfo: CardTaskModuleTaskInfo = {
    title: 'Multi-step Form: Step 2',
    width: 400,
    height: 300,
    card: createMultiStepStep2Card(data.name),
};
return { task: { type: 'continue', value: taskInfo } } as TaskModuleResponse;

// dialog.submit — final submission
const { name, email } = data;
await context.send(`Hi ${name}, thanks for submitting! Your email is ${email}`);
return { task: { type: 'message', value: 'Multi-step form completed!' } } as TaskModuleResponse;
```

# [Python](#tab/python)

```python
# dialog.open — return Step 1 card
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

# dialog.submit — advance to Step 2
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

# dialog.submit — final submission
name = data.get("name")
email = data.get("email")
await ctx.send(f"Hi {name}, thanks for submitting! Your email is {email}")
return InvokeResponse(
    body=TaskModuleResponse(task=TaskModuleMessageResponse(value="Multi-step form completed!"))
)
```

---

## Code sample

|Sample name | Description | .NET | Node.js | Python |
|----------------|-----------------|--------------|----------------|----------------|
|Bot task modules | This sample app demonstrates how to use dialogs (referred as task modules in TeamsJS v1.x) using the Teams AI SDK. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-task-modules/dotnet/bot-task-modules)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-task-modules/nodejs/bot-task-modules)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/bot-task-modules/python/bot-task-modules)|

## Next step

> [!div class="nextstepaction"]
> [Use dialogs in bots](~/task-modules-and-cards/task-modules/task-modules-bots.md)

## See also

* [Cards and dialogs](../cards-and-task-modules.md)
* [Request device permissions](~/concepts/device-capabilities/native-device-permissions.md)
* [Integrate media capabilities](~/concepts/device-capabilities/media-capabilities.md)
* [Integrate QR or barcode scanner capability in Teams](~/concepts/device-capabilities/qr-barcode-scanner-capability.md)
* [Integrate location capabilities in Teams](~/concepts/device-capabilities/location-capability.md)
