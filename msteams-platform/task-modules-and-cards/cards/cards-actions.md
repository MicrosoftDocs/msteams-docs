---
title: Adaptive Card actions in Teams SDK
description: Learn about Adaptive Card action types such as Action.Execute, Action.OpenUrl, Action.ShowCard, and Action.ToggleVisibility, and how to handle card actions using the Teams SDK.
ms.localizationpriority: medium
ms.topic: conceptual
ms.date: 03/31/2026
---

# Card actions

[!INCLUDE [adaptive-card-redirect](../../includes/adaptive-card-redirect.md)]

Adaptive Cards support interactive elements through actions—buttons, links, and input submission triggers that respond to user interaction. You can use these to collect form input, trigger workflows, open URLs, and more.

The Teams SDK provides builder helpers and server-side handlers that simplify working with card actions. The following action types are supported:

| Action type | Use case | Description |
| --- | --- | --- |
| `Action.Execute` | Server-side processing | Sends data to your bot for processing. Best for forms and multi-step workflows. |
| `Action.Submit` | Simple data submission | Legacy action type. Prefer `Action.Execute` for new projects. |
| `Action.OpenUrl` | External navigation | Opens a URL in the user's browser. |
| `Action.ShowCard` | Progressive disclosure | Displays a nested card when selected. |
| `Action.ToggleVisibility` | UI state management | Shows or hides card elements dynamically. |

> [!NOTE]
> For complete reference on action types, see the [Adaptive Cards documentation](https://adaptivecards.microsoft.com/?topic=Action.Execute).

## Create actions with the SDK

The SDK provides builder helpers that abstract the underlying JSON. You can create actions using strongly typed classes from the `Microsoft.Teams.Cards` namespace.

### Action.Execute

`Action.Execute` is the recommended action type for server-side processing. When a user selects an Execute action, the input values and any configured data are sent to your bot as a `card.action` activity.

# [C#](#tab/csharp)

The following code shows an example of an `Action.Execute` action in C#:

```csharp
using Microsoft.Teams.Cards;

var action = new ExecuteAction
{
    Title = "Submit Feedback",
    Data = new Union<string, SubmitActionData>(new SubmitActionData
    {
        NonSchemaProperties = new Dictionary<string, object?>
        {
            { "action", "submit_feedback" }
        }
    }),
    AssociatedInputs = AssociatedInputs.Auto
};
```

# [JSON](#tab/json)

The following code shows an example of an `Action.Execute` action in JSON:

```json
{
  "type": "Action.Execute",
  "title": "Submit Feedback",
  "data": {
    "action": "submit_feedback"
  },
  "associatedInputs": "auto"
}
```

---

### Action.OpenUrl

`Action.OpenUrl` opens a specified URL in the user's browser.

> [!NOTE]
> When using `Action.OpenUrl`, make sure to include the domain of the target URL in the `validDomains` section of your app manifest. If the domain isn't listed, Teams displays the message **URL may lead to untrusted content**.

# [C#](#tab/csharp)

The following code shows an example of an `Action.OpenUrl` action in C#:

```csharp
using Microsoft.Teams.Cards;

var action = new OpenUrlAction("https://adaptivecards.microsoft.com")
{
    Title = "Learn More"
};
```

# [JSON](#tab/json)

The following code shows an example of an `Action.OpenUrl` action in JSON:

```json
{
  "type": "Action.OpenUrl",
  "url": "https://adaptivecards.microsoft.com",
  "title": "Learn More"
}
```

---

### Action sets

You can group multiple actions together using `ActionSet` within an Adaptive Card:

# [C#](#tab/csharp)

The following code shows an example of grouping actions in C#:

```csharp
using Microsoft.Teams.Cards;

var card = new AdaptiveCard
{
    Schema = "http://adaptivecards.io/schemas/adaptive-card.json",
    Actions = new List<Microsoft.Teams.Cards.Action>
    {
        new ExecuteAction
        {
            Title = "Submit Feedback",
            Data = new Union<string, SubmitActionData>(new SubmitActionData
            {
                NonSchemaProperties = new Dictionary<string, object?>
                {
                    { "action", "submit_feedback" }
                }
            })
        },
        new OpenUrlAction("https://adaptivecards.microsoft.com")
        {
            Title = "Learn More"
        }
    }
};
```

# [JSON](#tab/json)

The following code shows an example of grouping actions in JSON:

```json
{
  "type": "AdaptiveCard",
  "version": "1.5",
  "schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "actions": [
    {
      "type": "Action.Execute",
      "title": "Submit Feedback",
      "data": {
        "action": "submit_feedback"
      }
    },
    {
      "type": "Action.OpenUrl",
      "url": "https://adaptivecards.microsoft.com",
      "title": "Learn More"
    }
  ]
}
```

---

### Raw JSON alternative

If you prefer to work with raw JSON, you can deserialize it into the SDK types:

```csharp
var actionJson = """
{
  "type": "Action.OpenUrl",
  "url": "https://adaptivecards.microsoft.com",
  "title": "Learn More"
}
""";
var action = OpenUrlAction.Deserialize(actionJson);
```

## Work with input values

### Associate data with cards

You can send a card and have it be associated with specific data. Set the `data` value to be sent back to the client so you can associate it with a particular entity.

# [C#](#tab/csharp)

The following code shows an example of associating data with card actions in C#:

```csharp
using Microsoft.Teams.Cards;

private static AdaptiveCard CreateProfileCard()
{
    return new AdaptiveCard
    {
        Schema = "http://adaptivecards.io/schemas/adaptive-card.json",
        Body = new List<CardElement>
        {
            new TextBlock("User Profile")
            {
                Weight = TextWeight.Bolder,
                Size = TextSize.Large
            },
            new TextInput
            {
                Id = "name",
                Label = "Name",
                Value = "John Doe"
            },
            new TextInput
            {
                Id = "email",
                Label = "Email",
                Value = "john@contoso.com"
            },
            new ToggleInput("Subscribe to newsletter")
            {
                Id = "subscribe",
                Value = "false"
            }
        },
        Actions = new List<Microsoft.Teams.Cards.Action>
        {
            new ExecuteAction
            {
                Title = "Save",
                Data = new Union<string, SubmitActionData>(new SubmitActionData
                {
                    NonSchemaProperties = new Dictionary<string, object?>
                    {
                        { "action", "save_profile" },
                        { "entity_id", "12345" }
                    }
                }),
                AssociatedInputs = AssociatedInputs.Auto
            }
        }
    };
}
```

When the user submits the card, the handler receives the input values merged with the action data:

```text
data["action"]      → "save_profile"
data["entity_id"]   → "12345"
data["name"]        → "John Doe"
data["email"]       → "john@contoso.com"
data["subscribe"]   → "true"
```

# [JSON](#tab/json)

The following code shows an example of associating data with card actions in JSON:

```json
{
  "type": "AdaptiveCard",
  "version": "1.5",
  "schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "body": [
    {
      "type": "TextBlock",
      "text": "User Profile",
      "weight": "Bolder",
      "size": "Large"
    },
    {
      "type": "Input.Text",
      "id": "name",
      "label": "Name",
      "value": "John Doe"
    },
    {
      "type": "Input.Text",
      "id": "email",
      "label": "Email",
      "value": "john@contoso.com"
    },
    {
      "type": "Input.Toggle",
      "id": "subscribe",
      "title": "Subscribe to newsletter",
      "value": "false"
    }
  ],
  "actions": [
    {
      "type": "Action.Execute",
      "title": "Save",
      "data": {
        "action": "save_profile",
        "entity_id": "12345"
      },
      "associatedInputs": "auto"
    }
  ]
}
```

---

### Input validation

Input controls provide built-in validation. For more information, see the Adaptive Cards [input validation documentation](https://adaptivecards.microsoft.com/?topic=input-validation).

# [C#](#tab/csharp)

The following code shows an example of input validation in C#:

```csharp
using Microsoft.Teams.Cards;

private static AdaptiveCard CreateProfileCardWithValidation()
{
    return new AdaptiveCard
    {
        Schema = "http://adaptivecards.io/schemas/adaptive-card.json",
        Body = new List<CardElement>
        {
            new TextBlock("Profile with Validation")
            {
                Weight = TextWeight.Bolder,
                Size = TextSize.Large
            },
            new NumberInput
            {
                Id = "age",
                Label = "Age",
                IsRequired = true,
                Min = 0,
                Max = 120
            },
            new TextInput
            {
                Id = "name",
                Label = "Name",
                IsRequired = true,
                ErrorMessage = "Name is required"
            },
            new TextInput
            {
                Id = "location",
                Label = "Location"
            }
        },
        Actions = new List<Microsoft.Teams.Cards.Action>
        {
            new ExecuteAction
            {
                Title = "Save",
                Data = new Union<string, SubmitActionData>(new SubmitActionData
                {
                    NonSchemaProperties = new Dictionary<string, object?>
                    {
                        { "action", "save_profile" }
                    }
                }),
                AssociatedInputs = AssociatedInputs.Auto
            }
        }
    };
}
```

# [JSON](#tab/json)

The following code shows an example of input validation in JSON:

```json
{
  "type": "AdaptiveCard",
  "version": "1.5",
  "schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "body": [
    {
      "type": "TextBlock",
      "text": "Profile with Validation",
      "weight": "Bolder",
      "size": "Large"
    },
    {
      "type": "Input.Number",
      "id": "age",
      "label": "Age",
      "isRequired": true,
      "min": 0,
      "max": 120
    },
    {
      "type": "Input.Text",
      "id": "name",
      "label": "Name",
      "isRequired": true,
      "errorMessage": "Name is required"
    },
    {
      "type": "Input.Text",
      "id": "location",
      "label": "Location"
    }
  ],
  "actions": [
    {
      "type": "Action.Execute",
      "title": "Save",
      "data": {
        "action": "save_profile"
      },
      "associatedInputs": "auto"
    }
  ]
}
```

---

### Conditional enablement of action buttons

You can use the `conditionallyEnabled` property to disable action buttons until the user changes the value of at least one of the required inputs. This property can only be used with `Action.Submit` and `Action.Execute` actions. For a conditionally enabled button, if the `isEnabled` property is set to `false`, actions are disabled regardless of the input.

Here's how the `conditionallyEnabled` property is defined:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `conditionallyEnabled` | Boolean | ✔️ | Controls if the action is enabled only if at least one required input has been filled by the user. |

The following card payload shows a conditionally enabled button:

```json
{
    "type": "AdaptiveCard",
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.5",
    "body": [
        {
            "type": "Input.Text",
            "placeholder": "Placeholder text",
            "label": "Required text input",
            "isRequired": true,
            "id": "text"
        },
        {
            "type": "Input.Date",
            "label": "Required date input",
            "isRequired": true,
            "id": "date"
        }
    ],
    "actions": [
        {
            "type": "Action.Execute",
            "title": "Submit",
            "conditionallyEnabled": true
        },
        {
            "type": "Action.Execute",
            "title": "Permanently disabled button",
            "isEnabled": false
        }
    ]
}
```

:::row:::
:::column span="2":::

**Disabled**

:::image type="content" source="../../assets/images/adaptive-cards/disabled.png" alt-text="Screenshot shows an Adaptive Card with disabled submit button on the Teams." lightbox="../../assets/images/adaptive-cards/disabled.png":::

:::column-end:::

:::column span="2":::

**Enabled**

:::image type="content" source="../../assets/images/adaptive-cards/enabled.png" alt-text="Screenshot shows an Adaptive Card with enabled submit button on the Teams." lightbox="../../assets/images/adaptive-cards/enabled.png":::

:::column-end:::

:::row-end:::

## Server handlers

Card actions arrive as `card.action` activities in your app. These give you access to the validated input values plus any `data` values you had configured to be sent back to you.

Use the `OnAdaptiveCardAction` handler to process card actions:

```csharp
using System.Text.Json;
using Microsoft.Teams.Api.Activities.Invokes.AdaptiveCards;
using Microsoft.Teams.Apps;
using Microsoft.Teams.Apps.Annotations;
using Microsoft.Teams.Common.Logging;

//...

teams.OnAdaptiveCardAction(async context =>
{
    var activity = context.Activity;
    context.Log.Info("[CARD_ACTION] Card action received");

    var data = activity.Value?.Action?.Data;

    context.Log.Info($"[CARD_ACTION] Raw data: {JsonSerializer.Serialize(data)}");

    if (data == null)
    {
        context.Log.Error("[CARD_ACTION] No data in card action");
        return new ActionResponse.Message("No data specified") { StatusCode = 400 };
    }

    string? action = data.TryGetValue("action", out var actionObj) ? actionObj?.ToString() : null;

    if (string.IsNullOrEmpty(action))
    {
        context.Log.Error("[CARD_ACTION] No action specified in card data");
        return new ActionResponse.Message("No action specified") { StatusCode = 400 };
    }
    context.Log.Info($"[CARD_ACTION] Processing action: {action}");

    string? GetFormValue(string key)
    {
        if (data.TryGetValue(key, out var val))
        {
            if (val is JsonElement element)
                return element.GetString();
            return val?.ToString();
        }
        return null;
    }

    switch (action)
    {
        case "submit_feedback":
            var feedbackText = GetFormValue("feedback") ?? "No feedback provided";
            await context.Send($"Feedback received: {feedbackText}");
            break;

        case "create_task":
            var title = GetFormValue("title") ?? "Untitled";
            var priority = GetFormValue("priority") ?? "medium";
            var dueDate = GetFormValue("due_date") ?? "No date";
            await context.Send($"Task created!\nTitle: {title}\nPriority: {priority}\nDue: {dueDate}");
            break;

        case "save_profile":
            var name = GetFormValue("name") ?? "Unknown";
            var email = GetFormValue("email") ?? "No email";
            var subscribe = GetFormValue("subscribe") ?? "false";
            await context.Send($"Profile saved!\nName: {name}\nEmail: {email}\nSubscribed: {subscribe}");
            break;

        default:
            context.Log.Error($"[CARD_ACTION] Unknown action: {action}");
            return new ActionResponse.Message("Unknown action") { StatusCode = 400 };
    }

    return new ActionResponse.Message("Action processed successfully") { StatusCode = 200 };
});
```

> [!NOTE]
> The `data` values come from JSON and need to be extracted using the helper method shown above to handle different JSON element types.

## End-to-end example: Task form card

The following example shows a complete card with input fields and an action handler.

### Build the card

```csharp
using Microsoft.Teams.Cards;

private static AdaptiveCard CreateTaskFormCard()
{
    return new AdaptiveCard
    {
        Schema = "http://adaptivecards.io/schemas/adaptive-card.json",
        Body = new List<CardElement>
        {
            new TextBlock("Create New Task")
            {
                Weight = TextWeight.Bolder,
                Size = TextSize.Large
            },
            new TextInput
            {
                Id = "title",
                Label = "Task Title",
                Placeholder = "Enter task title"
            },
            new TextInput
            {
                Id = "description",
                Label = "Description",
                Placeholder = "Enter task details",
                IsMultiline = true
            },
            new ChoiceSetInput
            {
                Id = "priority",
                Label = "Priority",
                Value = "medium",
                Choices = new List<Choice>
                {
                    new() { Title = "High", Value = "high" },
                    new() { Title = "Medium", Value = "medium" },
                    new() { Title = "Low", Value = "low" }
                }
            },
            new DateInput
            {
                Id = "due_date",
                Label = "Due Date",
                Value = DateTime.Now.ToString("yyyy-MM-dd")
            }
        },
        Actions = new List<Microsoft.Teams.Cards.Action>
        {
            new ExecuteAction
            {
                Title = "Create Task",
                Data = new Union<string, SubmitActionData>(new SubmitActionData
                {
                    NonSchemaProperties = new Dictionary<string, object?>
                    {
                        { "action", "create_task" }
                    }
                }),
                AssociatedInputs = AssociatedInputs.Auto,
                Style = ActionStyle.Positive
            }
        }
    };
}
```

### Send the card

```csharp
teams.OnMessage(async context =>
{
    var text = context.Activity.Text?.ToLowerInvariant() ?? "";

    if (text.Contains("form"))
    {
        await context.Typing();
        var card = CreateTaskFormCard();
        await context.Send(card);
    }
});
```

## Next step

> [!div class="nextstepaction"]
> [Building Adaptive Cards](/microsoftteams/platform/teams-sdk/in-depth-guides/adaptive-cards/building-adaptive-cards)

## See also

* [Adaptive Cards overview](/microsoftteams/platform/teams-sdk/in-depth-guides/adaptive-cards/overview)
* [Executing Actions](/microsoftteams/platform/teams-sdk/in-depth-guides/adaptive-cards/executing-actions)
* [Listening to Activities](/microsoftteams/platform/teams-sdk/essentials/on-activity/overview)
* [Adaptive Cards documentation](https://adaptivecards.microsoft.com/)
* [Adaptive Cards Designer](https://adaptivecards.microsoft.com/designer.html)
