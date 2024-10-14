Suggested actions help users with ideas of what to ask next, based on the previous response or conversation. Your bot should offer context-specific suggestions to the user, rather than generic or fixed ones. You can use your bot’s large language model (LLM) to generate up to three suggestions along with its responses. Then, you can extract these suggestions and present them as options for the user to choose.

When a user selects a button, it remains visible and accessible on the rich cards. However, for suggested actions, the buttons are designed to disappear after selection to prevent the user from selecting stale options that may no longer be relevant.

> [!NOTE]
>
> * `SuggestedActions` are only supported for one-on-one chat bots with both text based messages and Adaptive Cards.
> * `SuggestedActions` aren't supported for chat bots with attachments for any conversation type.
> * `imBack` is the only supported action type and Teams display up to three suggested actions.

To add suggested actions to a message, specify a list of [card action](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference) objects that represent the buttons to be displayed to the user for the [`sugestedActions`](/dotnet/api/microsoft.bot.builder.messagefactory.suggestedactions) property of the [activity](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference) object.

The following is an example to implement and experience suggested actions:

``` json
{
  "type": "message",
  "from": {
    "id": "12345678",
    "name": "sender's name"
  },
  "conversation": {
    "id": "abcd1234",
    "name": "conversation's name"
  },
  "recipient": {
    "id": "1234abcd",
    "name": "recipient's name"
  },
  "text": "What are the tasks for the day.",
  "inputHint": "expectingInput",
  "suggestedActions": {
    "actions": [
      {
        "type": "imBack",
        "title": "Create a new query identifying overdue tasks",
        "value": "Create a new query identifying overdue tasks"
      },
      {
        "type": "imBack",
        "title": "Create a new work item for this feature",
        "value": "Create a new work item for this feature"
            }
        ]
    },
  "replyToId": "5d5cdc723"
}
```
The following illustrates an example of suggested actions:

# [Desktop](#tab/desktop)

:::image type="content" source="~/assets/images/Cards/suggested-actions.png" alt-text="Screenshot that shows the suggested actions in desktop." lightbox="~/assets/images/Cards/suggested-actions.png":::

# [Mobile](#tab/mobile)

:::image type="content" source="~/assets/images/Cards/suggested-actions-mobile.png" alt-text="Screenshot that shows the suggested actions in mobile." lightbox="~/assets/images/Cards/suggested-actions-mobile.png":::