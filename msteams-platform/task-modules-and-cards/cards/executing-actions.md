---
title: Search Types & Usage in Adaptive Cards
description: Adaptive Card actions in the Teams SDK let users submit forms, open URLs, and trigger workflows. Learn how to build, validate, and handle actions in your bot.
ms.topic: article
ms.date: 11/04/2026
zone_pivot_groups: teams-sdk-languages
---

# Executing Actions

Adaptive Cards support interactive elements through **actions**—buttons, links, and input submission triggers that respond to user interaction.
You can use these to collect form input, trigger workflows, show task modules, open URLs, and more.

## Action Types

The Teams SDK supports several action types for different interaction patterns:

| Action Type               | Purpose                | Description                                                                  |
| ------------------------- | ---------------------- | ---------------------------------------------------------------------------- |
| `Action.Execute`          | Server‑side processing | Send data to your bot for processing. Best for forms & multi‑step workflows. |
| `Action.Submit`           | Simple data submission | Legacy action type. Prefer `Execute` for new projects.                       |
| `Action.OpenUrl`          | External navigation    | Open a URL in the user's browser.                                            |
| `Action.ShowCard`         | Progressive disclosure | Display a nested card when clicked.                                          |
| `Action.ToggleVisibility` | UI state management    | Show/hide card elements dynamically.                                         |

For complete reference, see the [official documentation](https://adaptivecards.microsoft.com/?topic=Action.Execute).

## Creating Actions with the SDK

### Single Actions

The SDK provides builder helpers that abstract the underlying JSON. For example:

:::zone pivot="teams-sdk-csharp"

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

:::zone-end

:::zone pivot="teams-sdk-typescript"

```typescript
import { ExecuteAction } from '@microsoft/teams.cards';
// ...

new ExecuteAction({ title: 'Submit Feedback' })
  .withData({ action: 'submit_feedback' })
  .withAssociatedInputs('auto'),
```

:::zone-end

:::zone pivot="teams-sdk-python"

```python
from microsoft_teams.cards.core import ExecuteAction
# ...

action = ExecuteAction(title="Submit Feedback")
                    .with_data({"action": "submit_feedback"})
                    .with_associated_inputs("auto")
```

:::zone-end

### Action Sets

Group actions together using `ActionSet`:

:::zone pivot="teams-sdk-csharp"

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

:::zone-end

:::zone pivot="teams-sdk-typescript"

```typescript
import { ExecuteAction, OpenUrlAction, ActionSet } from '@microsoft/teams.cards';
// ...

new ActionSet(
  new ExecuteAction({ title: 'Submit Feedback' })
    .withData({ action: 'submit_feedback' })
    .withAssociatedInputs('auto'),
  new OpenUrlAction('https://adaptivecards.microsoft.com').withTitle('Learn More')
);
```

:::zone-end

:::zone pivot="teams-sdk-python"

```python
from microsoft_teams.cards.core import ActionSet, ExecuteAction, OpenUrlAction
# ...

action_set = ActionSet(
                actions=[
                    ExecuteAction(title="Submit Feedback")
                    .with_data({"action": "submit_feedback"}),
                    OpenUrlAction(url="https://adaptivecards.microsoft.com").with_title("Learn More")
                ]
            ),
```

:::zone-end

### Raw JSON Alternative

Just like when building cards, if you prefer to work with raw JSON, you can do just that.

:::zone pivot="teams-sdk-csharp"

N/A

:::zone-end

:::zone pivot="teams-sdk-typescript"

You get type safety for free in TypeScript.

:::zone-end

:::zone pivot="teams-sdk-python"

You get type safety for free in Python.

:::zone-end

:::zone pivot="teams-sdk-csharp"

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

:::zone-end

:::zone pivot="teams-sdk-typescript"

```typescript
import { IOpenUrlAction } from '@microsoft/teams.cards';
// ...

{
  type: 'Action.OpenUrl',
  url: 'https://adaptivecards.microsoft.com',
  title: 'Learn More',
} as const satisfies IOpenUrlAction
```

:::zone-end

:::zone pivot="teams-sdk-python"

```python
json = {
  "type": "Action.OpenUrl",
  "url": "https://adaptivecards.microsoft.com",
  "title": "Learn More",
}
```

:::zone-end

## Working with Input Values

### Associating data with the cards

Sometimes you want to send a card and have it be associated with some data. Set the `data` value to be sent back to the client so you can associate it with a particular entity.

:::zone pivot="teams-sdk-csharp"

```csharp
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
                // entity_id will come back after the user submits
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

// Data received in handler (conceptual structure)
/*
{
  "action": "save_profile",
  "entity_id": "12345",     // From action data
  "name": "John Doe",       // From name input
  "email": "john@doe.com",  // From email input
  "subscribe": "true"       // From toggle input (as string)
}

Accessed in C# as:
- data["action"] → "save_profile"
- data["entity_id"] → "12345"
- data["name"] → "John Doe"
- data["email"] → "john@doe.com"
- data["subscribe"] → "true"
*/
```

:::zone-end

:::zone pivot="teams-sdk-typescript"

```typescript
import {
  AdaptiveCard,
  TextInput,
  ToggleInput,
  ActionSet,
  ExecuteAction,
} from '@microsoft/teams.cards';
// ...

function editProfileCard() {
  const card = new AdaptiveCard(
    new TextInput({ id: 'name' }).withLabel('Name').withValue('John Doe'),
    new TextInput({ id: 'email', label: 'Email', value: 'john@contoso.com' }),
    new ToggleInput('Subscribe to newsletter').withId('subscribe').withValue('false'),
    new ActionSet(
      new ExecuteAction({ title: 'Save' })
        .withData({
          action: 'save_profile',
          entityId: '12345', // This will come back once the user submits
        })
        .withAssociatedInputs('auto')
    )
  );

  // Data received in handler
  /**
  {
    action: "save_profile",
    entityId: "12345",     // From action data
    name: "John Doe",      // From name input
    email: "john@doe.com", // From email input
    subscribe: "true"      // From toggle input (as string)
  }
  */

  return card;
}
```

:::zone-end

:::zone pivot="teams-sdk-python"

```python
from microsoft_teams.cards import AdaptiveCard, ActionSet, ExecuteAction, OpenUrlAction
from microsoft_teams.cards.core import TextInput, ToggleInput
# ...

profile_card = AdaptiveCard(
        schema="http://adaptivecards.io/schemas/adaptive-card.json",
        body=[
            TextInput(id="name").with_label("Name").with_value("John Doe"),
            TextInput(id="email", label="Email", value="john@contoso.com"),
            ToggleInput(title="Subscribe to newsletter").with_id("subscribe").with_value("false"),
            ActionSet(
                actions=[
                    ExecuteAction(title="Save")
                    # entity_id will come back after the user submits
                    .with_data({"action": "save_profile", "entity_id": "12345"}),
                ]
            ),
        ],
    )

# Data received in handler:
"""
{
  "action": "save_profile",
  "entity_id": "12345",     # From action data
  "name": "John Doe",       # From name input
  "email": "john@doe.com",  # From email input
  "subscribe": "true"       # From toggle input (as string)
}
"""
```

:::zone-end

### Input Validation

Input Controls provide ways for you to validate. More details can be found on the Adaptive Cards [documentation](https://adaptivecards.microsoft.com/?topic=input-validation).

:::zone pivot="teams-sdk-csharp"

```csharp
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
            // Can configure custom error messages
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
                // All inputs should be validated
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

:::zone-end

:::zone pivot="teams-sdk-typescript"

```typescript
import {
  AdaptiveCard,
  NumberInput,
  TextInput,
  ActionSet,
  ExecuteAction,
} from '@microsoft/teams.cards';
// ...

function createProfileCardInputValidation() {
  const ageInput = new NumberInput({ id: 'age' })
    .withLabel('Age')
    .withIsRequired(true)
    .withMin(0)
    .withMax(120);

  const nameInput = new TextInput({ id: 'name' })
    .withLabel('Name')
    .withIsRequired()
    .withErrorMessage('Name is required!'); // Custom error messages
  const card = new AdaptiveCard(
    nameInput,
    ageInput,
    new TextInput({ id: 'location' }).withLabel('Location'),
    new ActionSet(
      new ExecuteAction({ title: 'Save' })
        .withData({
          action: 'save_profile',
        })
        .withAssociatedInputs('auto') // All inputs should be validated
    )
  );

  return card;
}
```

:::zone-end

:::zone pivot="teams-sdk-python"

```python
from microsoft_teams.cards import AdaptiveCard, ActionSet, ExecuteAction, NumberInput, TextInput
# ...

def create_profile_card_input_validation():
    age_input = NumberInput(id="age").with_label("age").with_is_required(True).with_min(0).with_max(120)
    # Can configure custom error messages
    name_input = TextInput(id="name").with_label("Name").with_is_required(True).with_error_message("Name is required")

    card = AdaptiveCard(
        schema="http://adaptivecards.io/schemas/adaptive-card.json",
        body=[
            age_input,
            name_input,
            TextInput(id="location").with_label("Location"),
            ActionSet(
                actions=[
                    ExecuteAction(title="Save")
                    # All inputs should be validated
                    .with_data({"action": "save_profile"})
                    .with_associated_inputs("auto")
                ]
            ),
        ],
    )
    return card
```

:::zone-end

:::zone pivot="teams-sdk-csharp"

## Server Handlers

### Basic Structure

Card actions arrive as `card.action` activities in your app. These give you access to the validated input values plus any `data` values you had configured to be sent back to you.

#### SDK 2.0 (Legacy)

```csharp
using System.Text.Json;
using Microsoft.Teams.Api.AdaptiveCards;
using Microsoft.Teams.Apps.Annotations;

[TeamsController]
public class AdaptiveCardController
{
    [AdaptiveCard.Action]
    public async Task<ActionResponse> OnAction([Context] IContext context, CancellationToken cancellationToken)
    {
        var data = context.Activity.Value?.Action?.Data;

        if (data == null)
            return new ActionResponse.Message("No data specified") { StatusCode = 400 };

        string? action = data.TryGetValue("action", out var actionObj) ? actionObj?.ToString() : null;

        if (string.IsNullOrEmpty(action))
            return new ActionResponse.Message("No action specified") { StatusCode = 400 };

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
            case "submit_basic":
                var notifyValue = GetFormValue("notify") ?? "false";
                await context.Client.Send($"Basic card submitted! Notify setting: {notifyValue}");
                break;

            case "submit_feedback":
                var feedbackText = GetFormValue("feedback") ?? "No feedback provided";
                await context.Client.Send($"Feedback received: {feedbackText}");
                break;

            case "create_task":
                var title = GetFormValue("title") ?? "Untitled";
                var priority = GetFormValue("priority") ?? "medium";
                var dueDate = GetFormValue("due_date") ?? "No date";
                await context.Client.Send($"Task created!\nTitle: {title}\nPriority: {priority}\nDue: {dueDate}");
                break;

            case "save_profile":
                var name = GetFormValue("name") ?? "Unknown";
                var email = GetFormValue("email") ?? "No email";
                var subscribe = GetFormValue("subscribe") ?? "false";
                var age = GetFormValue("age");
                var location = GetFormValue("location") ?? "Not specified";

                var response = $"Profile saved!\nName: {name}\nEmail: {email}\nSubscribed: {subscribe}";
                if (!string.IsNullOrEmpty(age))
                    response += $"\nAge: {age}";
                if (location != "Not specified")
                    response += $"\nLocation: {location}";

                await context.Client.Send(response);
                break;

            case "test_json":
                await context.Client.Send("JSON deserialization test successful!");
                break;

            default:
                return new ActionResponse.Message("Unknown action") { StatusCode = 400 };
        }

        return new ActionResponse.Message("Action processed successfully");
    }
}
```

#### SDK 2.1 (current)

```csharp
using System.Text.Json;
using Microsoft.Teams.Apps;

bot.OnAdaptiveCardAction(async (context, cancellationToken) =>
{
    var data = context.Activity.Value?.Action?.Data;

    if (data == null)
        return AdaptiveCardResponse.CreateMessageResponse("No data specified", 400);

    string? action = data.TryGetValue("action", out var actionObj) ? actionObj?.ToString() : null;

    if (string.IsNullOrEmpty(action))
        return AdaptiveCardResponse.CreateMessageResponse("No action specified", 400);

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
        case "submit_basic":
            var notifyValue = GetFormValue("notify") ?? "false";
            await context.SendAsync($"Basic card submitted! Notify setting: {notifyValue}", cancellationToken);
            break;

        case "submit_feedback":
            var feedbackText = GetFormValue("feedback") ?? "No feedback provided";
            await context.SendAsync($"Feedback received: {feedbackText}", cancellationToken);
            break;

        case "create_task":
            var title = GetFormValue("title") ?? "Untitled";
            var priority = GetFormValue("priority") ?? "medium";
            var dueDate = GetFormValue("due_date") ?? "No date";
            await context.SendAsync($"Task created!\nTitle: {title}\nPriority: {priority}\nDue: {dueDate}", cancellationToken);
            break;

        case "save_profile":
            var name = GetFormValue("name") ?? "Unknown";
            var email = GetFormValue("email") ?? "No email";
            var subscribe = GetFormValue("subscribe") ?? "false";
            var age = GetFormValue("age");
            var location = GetFormValue("location") ?? "Not specified";

            var response = $"Profile saved!\nName: {name}\nEmail: {email}\nSubscribed: {subscribe}";
            if (!string.IsNullOrEmpty(age))
                response += $"\nAge: {age}";
            if (location != "Not specified")
                response += $"\nLocation: {location}";

            await context.SendAsync(response, cancellationToken);
            break;

        case "test_json":
            await context.SendAsync("JSON deserialization test successful!", cancellationToken);
            break;

        default:
            return AdaptiveCardResponse.CreateMessageResponse("Unknown action", 400);
    }

    return AdaptiveCardResponse.CreateMessageResponse("Action processed successfully");
});
```

> [!NOTE]
> The `data` values come from JSON and need to be extracted using the helper method shown above to handle different JSON element types.

:::zone-end

:::zone pivot="teams-sdk-typescript"

## Routing & Handlers

### Using SubmitData

The SDK provides a `SubmitData` helper that sets the routing key for your action. This is the recommended way to wire up actions to specific handlers:

```typescript
import { ExecuteAction, SubmitData } from '@microsoft/teams.cards';
// ...

new ExecuteAction({ title: 'Submit Feedback' })
  .withData(new SubmitData('submit_feedback'))
  .withAssociatedInputs('auto')

// You can also pass extra static data alongside the action name
new ExecuteAction({ title: 'Save' })
  .withData(new SubmitData('save_profile', { entityId: '12345' }))
  .withAssociatedInputs('auto')
```

`SubmitData` sets a reserved `action` key in the card's data payload. When the user clicks the button, the SDK router reads this key to dispatch to the matching handler.

### Action-Specific Handlers

Register handlers for specific actions. When you use `SubmitData` to set the action name on the card, the SDK routes directly to the matching handler:

```typescript
import { App } from '@microsoft/teams.apps';
// ...

// 'submit_feedback' matches the identifier passed to SubmitData('submit_feedback')
app.on('card.action.submit_feedback', async ({ activity, send }) => {
  const data = activity.value.action.data;
  await send(`Feedback received: ${data.feedback}`);
  return {
    statusCode: 200,
    type: 'application/vnd.microsoft.activity.message',
    value: 'Action processed successfully',
  };
});

app.on('card.action.save_profile', async ({ activity, send }) => {
  const data = activity.value.action.data;
  await send(`Profile saved!\nName: ${data.name}\nEmail: ${data.email}`);
  return {
    statusCode: 200,
    type: 'application/vnd.microsoft.activity.message',
    value: 'Action processed successfully',
  };
});
```

The route name follows the pattern `card.action.<action-name>`, where `<action-name>` matches the value passed to `SubmitData`. This is cleaner than a catch-all with a switch statement, and scales better as you add more actions.

### Catch-All Handler

If you need to handle all card actions in one place, you can use the catch-all handler:

```typescript
import {
  AdaptiveCardActionErrorResponse,
  AdaptiveCardActionMessageResponse,
} from '@microsoft/teams.api';
import { App } from '@microsoft/teams.apps';
// ...

app.on('card.action', async ({ activity, send }) => {
  const data = activity.value?.action?.data;
  if (!data?.action) {
    return {
      statusCode: 400,
      type: 'application/vnd.microsoft.error',
      value: {
        code: 'BadRequest',
        message: 'No action specified',
        innerHttpError: {
          statusCode: 400,
          body: { error: 'No action specified' },
        },
      },
    } satisfies AdaptiveCardActionErrorResponse;
  }

  console.debug('Received action data:', data);

  switch (data.action) {
    case 'submit_feedback':
      await send(`Feedback received: ${data.feedback}`);
      break;

    case 'purchase_item':
      await send(`Purchase request received for game: ${data.choiceGameSingle}`);
      break;

    case 'save_profile':
      await send(
        `Profile saved!\nName: ${data.name}\nEmail: ${data.email}\nSubscribed: ${data.subscribe}`
      );
      break;

    default:
      return {
        statusCode: 400,
        type: 'application/vnd.microsoft.error',
        value: {
          code: 'BadRequest',
          message: 'Unknown action',
          innerHttpError: {
            statusCode: 400,
            body: { error: 'Unknown action' },
          },
        },
      } satisfies AdaptiveCardActionErrorResponse;
  }

  return {
    statusCode: 200,
    type: 'application/vnd.microsoft.activity.message',
    value: 'Action processed successfully',
  } satisfies AdaptiveCardActionMessageResponse;
});
```

> [!NOTE]
> The `data` values are not typed and come as `any`, so you will need to cast them to the correct type in this case.

:::zone-end

:::zone pivot="teams-sdk-python"

## Routing & Handlers

### Using SubmitData

The SDK provides a `SubmitData` helper that sets the routing key for your action. This is the recommended way to wire up actions to specific handlers:

```python
from microsoft_teams.cards import ExecuteAction, SubmitData
# ...

ExecuteAction(title="Submit Feedback") \
    .with_data(SubmitData("submit_feedback")) \
    .with_associated_inputs("auto")

# You can also pass extra static data alongside the action name
ExecuteAction(title="Save") \
    .with_data(SubmitData("save_profile", {"entity_id": "12345"})) \
    .with_associated_inputs("auto")
```

`SubmitData` sets a reserved `action` key in the card's data payload. When the user clicks the button, the SDK router reads this key to dispatch to the matching handler.

### Action-Specific Handlers

Register handlers for specific actions. When you use `SubmitData` to set the action name on the card, the SDK routes directly to the matching handler:

```python
from microsoft_teams.apps import App, ActivityContext
from microsoft_teams.api import AdaptiveCardInvokeActivity, AdaptiveCardActionMessageResponse, AdaptiveCardInvokeResponse
# ...

# 'submit_feedback' matches the identifier passed to SubmitData('submit_feedback')
@app.on_card_action_execute("submit_feedback")
async def handle_submit_feedback(ctx: ActivityContext[AdaptiveCardInvokeActivity]) -> AdaptiveCardInvokeResponse:
    data = ctx.activity.value.action.data
    await ctx.send(f"Feedback received: {data.get('feedback')}")
    return AdaptiveCardActionMessageResponse(
        status_code=200,
        type="application/vnd.microsoft.activity.message",
        value="Action processed successfully",
    )

@app.on_card_action_execute("save_profile")
async def handle_save_profile(ctx: ActivityContext[AdaptiveCardInvokeActivity]) -> AdaptiveCardInvokeResponse:
    data = ctx.activity.value.action.data
    await ctx.send(f"Profile saved!\nName: {data.get('name')}\nEmail: {data.get('email')}")
    return AdaptiveCardActionMessageResponse(
        status_code=200,
        type="application/vnd.microsoft.activity.message",
        value="Action processed successfully",
    )
```

The decorator argument matches the value passed to `SubmitData`. This is cleaner than a catch-all with a switch statement, and scales better as you add more actions.

### Catch-All Handler

If you need to handle all card actions in one place, you can use the catch-all handler:

```python
from microsoft_teams.api import AdaptiveCardInvokeActivity, AdaptiveCardActionErrorResponse, AdaptiveCardActionMessageResponse, HttpError, InnerHttpError, AdaptiveCardInvokeResponse
from microsoft_teams.apps import ActivityContext
# ...

@app.on_card_action
async def handle_card_action(ctx: ActivityContext[AdaptiveCardInvokeActivity]) -> AdaptiveCardInvokeResponse:
    data = ctx.activity.value.action.data
    if not data.get("action"):
        return AdaptiveCardActionErrorResponse(
            status_code=400,
            type="application/vnd.microsoft.error",
            value=HttpError(
                code="BadRequest",
                message="No action specified",
                inner_http_error=InnerHttpError(
                    status_code=400,
                    body={"error": "No action specified"},
                ),
            ),
        )

    print("Received action data:", data)

    if data["action"] == "submit_feedback":
        await ctx.send(f"Feedback received: {data.get('feedback')}")
    elif data["action"] == "purchase_item":
        await ctx.send(f"Purchase request received for game: {data.get('choiceGameSingle')}")
    elif data["action"] == "save_profile":
        await ctx.send(
            f"Profile saved!\nName: {data.get('name')}\nEmail: {data.get('email')}\nSubscribed: {data.get('subscribe')}"
        )
    else:
        return AdaptiveCardActionErrorResponse(
            status_code=400,
            type="application/vnd.microsoft.error",
            value=HttpError(
                code="BadRequest",
                message="Unknown action",
                inner_http_error=InnerHttpError(
                    status_code=400,
                    body={"error": "Unknown action"},
                ),
            ),
        )

    return AdaptiveCardActionMessageResponse(
        status_code=200,
        type="application/vnd.microsoft.activity.message",
        value="Action processed successfully",
    )
```

> [!NOTE]
> The `data` values are accessible as a dictionary and can be accessed using `.get()` method for safe access.

:::zone-end

## Dynamic Typeahead Search

An `Input.ChoiceSet` can fetch its choices dynamically as the user types, instead of listing them statically. Leave `choices` as an empty array and add a `choices.data` `Data.Query` that names a `dataset`. As the user types, Teams sends your bot an `application/search` invoke, and you return the matching results.

:::zone pivot="teams-sdk-csharp"

```csharp
using Microsoft.Teams.Cards;

private static AdaptiveCard CreateDynamicSearchCard()
{
    return new AdaptiveCard
    {
        Schema = "http://adaptivecards.io/schemas/adaptive-card.json",
        Body = new List<CardElement>
        {
            new ChoiceSetInput
            {
                Id = "game",
                Label = "Game",
                Placeholder = "Search for a game",
                Style = ChoiceSetInputStyle.Filtered,
                Choices = new List<Choice>()
            }.WithChoicesData(new QueryData { Dataset = "nintendoGames" })
        },
        Actions = new List<Microsoft.Teams.Cards.Action>
        {
            new ExecuteAction
            {
                Title = "Submit",
                Data = new Union<string, SubmitActionData>(new SubmitActionData
                {
                    NonSchemaProperties = new Dictionary<string, object?>
                    {
                        { "action", "submit_game" }
                    }
                })
            }
        }
    };
}
```

:::zone-end

:::zone pivot="teams-sdk-typescript"

```typescript
import { IAdaptiveCard } from '@microsoft/teams.cards';

const card: IAdaptiveCard = {
  type: 'AdaptiveCard',
  version: '1.5',
  body: [
    {
      type: 'Input.ChoiceSet',
      id: 'game',
      label: 'Game',
      placeholder: 'Search for a game',
      style: 'filtered',
      choices: [],
      'choices.data': { type: 'Data.Query', dataset: 'nintendoGames' },
    },
  ],
  actions: [
    { type: 'Action.Execute', title: 'Submit', data: { action: 'submit_game' } },
  ],
};
```

:::zone-end

:::zone pivot="teams-sdk-python"

```python
from microsoft_teams.cards import AdaptiveCard

card = AdaptiveCard.model_validate(
    {
        "type": "AdaptiveCard",
        "version": "1.5",
        "body": [
            {
                "type": "Input.ChoiceSet",
                "id": "game",
                "label": "Game",
                "placeholder": "Search for a game",
                "style": "filtered",
                "choices": [],
                "choices.data": {"type": "Data.Query", "dataset": "nintendoGames"},
            }
        ],
        "actions": [
            {"type": "Action.Execute", "title": "Submit", "data": {"action": "submit_game"}}
        ],
    }
)
```

:::zone-end

Register a handler for the `application/search` invoke to return results as `{ title, value }` pairs, where `title` is the display text and `value` is what gets submitted when the choice is selected:

:::zone pivot="teams-sdk-csharp"

### SDK 2.0 (Legacy)

> [!NOTE]
> Dynamic typeahead search for Adaptive Cards is not supported in SDK 2.0. Use SDK 2.1 for this feature.

### SDK 2.1 (current)

```csharp
using Microsoft.Teams.Apps;
using Microsoft.Teams.Apps.Handlers;

var games = new[] { "Super Mario Odyssey", "Metroid Dread", "Splatoon 3" };

bot.OnSearch((context, cancellationToken) =>
{
    var query = context.Activity.Value?.QueryText?.ToLowerInvariant() ?? "";
    var results = games
        .Where(g => g.ToLowerInvariant().Contains(query))
        .Select(g => new SearchResult { Title = g, Value = g })
        .ToList();

    var response = new SearchResponse
    {
        Value = new SearchResponseValue { Results = results }
    };

    return Task.FromResult(new InvokeResponse<SearchResponse>(200, response));
});
```

:::zone-end

:::zone pivot="teams-sdk-typescript"

```typescript
import { App } from '@microsoft/teams.apps';
// ...

const GAMES = ['Super Mario Odyssey', 'Metroid Dread', 'Splatoon 3'];

app.on('card.search', async ({ activity }) => {
  const query = activity.value.queryText?.toLowerCase() ?? '';
  const results = GAMES.filter((g) => g.toLowerCase().includes(query)).map(
    (g) => ({ title: g, value: g })
  );

  return {
    statusCode: 200,
    type: 'application/vnd.microsoft.search.searchResponse',
    value: { results },
  };
});
```

:::zone-end

:::zone pivot="teams-sdk-python"

```python
from microsoft_teams.api import SearchInvokeActivity
from microsoft_teams.api.models.search import (
    SearchInvokeResponseValue,
    SearchInvokeResult,
    SearchResponse,
)
from microsoft_teams.apps import ActivityContext

GAMES = ["Super Mario Odyssey", "Metroid Dread", "Splatoon 3"]


@app.on_card_search
async def handle_search(ctx: ActivityContext[SearchInvokeActivity]) -> SearchResponse:
    query = (ctx.activity.value.query_text or "").lower()
    results = [
        SearchInvokeResult(title=g, value=g) for g in GAMES if query in g.lower()
    ]
    return SearchResponse(value=SearchInvokeResponseValue(results=results))
```

:::zone-end

The activity value also carries the query options (`skip`/`top` for paging) and the originating `dataset`, so a single handler can branch on the dataset when several `Input.ChoiceSet` inputs share it.
