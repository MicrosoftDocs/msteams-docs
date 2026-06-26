---
title: Guide Agent Interactions with Prompt Starters
description: Learn how to configure prewritten prompt texts that help users discover and use agent functionality, with design guidance and best practices.
ms.topic: how-to
ms.localizationpriority: medium
ms.date: 6/26/2026
---

# Guide agent interactions with prompt starters

Prompt starters are prewritten prompt texts that help users discover and use agent functionality.

When a user selects a prompt starter in chat, Teams inserts the prompt into the compose box, making it easier to start or continue agent conversations.

:::image type="content" source="~/assets/images/bots/prompt-starter-desktop.png" alt-text="Screenshot that shows the Prompt Starter in desktop." lightbox="~/assets/images/bots/prompt-starter-desktop.png":::

Prompt starters are available in one-on-one chats, group chats, and channels.

## User experience

In one-on-one chats with an agent, prompt starters are always available from the **View Prompts** flyout above the compose box.

# [Desktop](#tab/desktop)

:::image type="content" source="~/assets/images/bots/prompt-starter-desktop.png" alt-text="Screenshot that shows the Prompt Starter in desktop." lightbox="~/assets/images/bots/prompt-starter-desktop.png":::

# [Mobile](#tab/mobile)

:::image type="content" source="~/assets/images/bots/prompt-starter-mobile.png" alt-text="Screenshot that shows the Prompt Starter in mobile." lightbox="~/assets/images/bots/prompt-starter-mobile.png":::

---

For agents that don't proactively start a conversation with a [welcome message](send-proactive-messages.md), Teams displays their prompt starters as cards in the conversation pane until the user sends their first message.

:::image type="content" source="~/assets/images/bots/prompt-starter-desktop-reappear.png" alt-text="Screenshot that shows the Prompt Starter reappear during the conversation." lightbox="~/assets/images/bots/prompt-starter-desktop-reappear.png":::

In group chats and channels, an agent's prompt starters appear in an autocomplete menu next to a user's compose box after @mentioning the agent.

# [Group chat](#tab/gc)

:::image type="content" source="~/assets/images/bots/prompt-starter-group-chat.png" alt-text="Screenshot that shows the Prompt Starter during the conversation in a group chat." lightbox="~/assets/images/bots/prompt-starter-group-chat.png":::

# [Channel](#tab/channel)

:::image type="content" source="~/assets/images/bots/prompt-starter-channel.png" alt-text="Screenshot that shows the Prompt Starter during the conversation in a channel." lightbox="~/assets/images/bots/prompt-starter-channel.png":::

---

## Define prompt starters for an agent

Prompt starters are configured as `commands` of type `prompt` in an agent's app manifest.

```json
{
  "bots":[
    {
      "botId":"[Microsoft App ID for your bot]",
      "scopes": [
        "personal"
      ],
      "commandLists":[
        {
          "scopes":[
            "personal"
          ],
          "commands":[
            {
              "title":"Help",
              "description":"Displays this help message"
            },
            {
              "title":"Search Flights",
              "description":"Search flights from Seattle to Phoenix May 2-5 departing after 3pm",
              "type": "prompt",
              "prompt": "Search flights from Seattle to Phoenix May 2-5 departing after 3pm. Please show me the best options."
            },
            {
              "title":"Search Hotels",
              "description":"Search hotels in Portland tonight",
              "type": "prompt",
              "prompt": "Search hotels in Portland for tonight. Please show me available options with good ratings."
            },
            {
              "title":"Best Time to Fly",
              "description":"Best time to fly to London for a 5 day trip this summer",
              "type": "prompt",
              "prompt": "What is the best time to fly to London for a 5 day trip? I'm looking for good weather and reasonable prices."
            }
          ]
        }
      ]
    }
  ],
  ...
}
```

Prompt starter commands must have a `type` of `"prompt"` and include a `prompt` value of up to 4,000 characters. Each prompt starter's `title` and `description` are presented to users in Teams chat. When a prompt is selected, the value of `prompt` is inserted into the user's compose box.

Each `commandList` can specify one or more scopes. Agents can present different prompt starters in different scopes by creating multiple `commandList`s. Each `commands` supports up to 10 command objects.

`commandLists` and `commands` in the app manifest are also used for configuring [agent slash commands](../../../agents-in-teams/agent-slash-commands.md). For more information about the app manifest structure, see the [app manifest reference](/microsoft-365/extensibility/schema/root-bots-command-lists?view=m365-app-1.29&tabs=syntax).

## Best practices and design guidance

Teams agents should always help users understand their capabilities by "introducing themselves" with prompt starters, [welcome messages](send-proactive-messages.md), or both. Agents distributed through the Teams Store that can be installed in personal scope (one-on-one conversations with users) must implement one or the other.

Prompt starters aren't dynamic or contextual, and you can only change them by republishing an agent's manifest. To provide users with dynamic response options, consider using [suggested actions](suggested-actions.md) and [Adaptive Cards](https://adaptivecards.microsoft.com/).

Use prompt starters with natural-language agent prompts. To enhance discoverability of short text commands that your agent exposes, configure [slash commands](../../../agents-in-teams/agent-slash-commands.md).

## See also

* [App manifest command structure](/microsoft-365/extensibility/schema/root-bots-command-lists?view=m365-app-1.29&tabs=syntax)
* [Proactive messages](send-proactive-messages.md)
* [Create suggested actions](suggested-actions.md)
* [Teams Store validation guidelines](../../../concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md)
