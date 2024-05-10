Suggested actions help users with ideas of what to ask next, based on the previous response or conversation. Your bot should offer context-specific suggestions to the user, rather than generic or fixed ones. You can use your bot’s large language model (LLM) to generate up to six possible suggestions along with its responses. Then, you can extract these suggestions and present them as options for the user to choose.

When the user selects a button, it remains visible and accessible in the rich cards, but not for the suggested actions. This prevents the user from selection of stale buttons within a conversation.

> [!NOTE]
>
> * `SuggestedActions` are only supported for one-on-one chat bots with both text based messages and Adaptive Cards.
> * `SuggestedActions` aren't supported for chat bots with attachments for any conversation type.
> * `imBack` is the only supported action type and Teams display up to six suggested actions.

To add suggested actions to a message, set the `suggestedActions` property of an [activity](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference) object to specify the list of [card action](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference) objects that represent the buttons to be presented to the user. For more information, see [`sugestedActions`](/dotnet/api/microsoft.bot.builder.messagefactory.suggestedactions).
The following is an example for implementation and experience of suggested actions:

``` json
"suggestedActions": {
    "actions": [
      {
        "type": "imBack",
        "title": "Action 1",
        "value": "Action 1"
        "title": "Create a new query identifying overdue tasks",
        "value": "Create a new query identifying overdue tasks"
      },
      {
        "type": "imBack",
        "title": "Action 2",
        "value": "Action 2"
        "title": "Create a new work item for this feature",
        "value": "Create a new work item for this feature"
      }
    ],
    "to": [<list of recepientIds>]
  }
```
The following illustrates an example of suggested actions:
:::image type="content" source="~/assets/images/Cards/suggested-actions.png" alt-text="Bot suggested actions" border="true":::