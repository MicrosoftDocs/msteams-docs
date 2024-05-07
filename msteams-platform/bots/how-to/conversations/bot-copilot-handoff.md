---
title: Copilot handoff
description: Learn how to allow users to continue their conversation with a custom plugin bot from the copilot chat.
ms.date: 05/07/2024
ms.topic: conceptual
author: v-ypalikila
ms.author: surbhigupta
---

# Copilot handoff

Copilot handoff allows users to continue their conversation with a custom plugin bot from the copilot chat. The plugin bot can send a deep link with a continuation token to the copilot, and when the user clicks on it, they will be navigated to the one-on-one bot chat. The copilot will then send an invoke call to the bot with the continuation token, and the bot can resume the conversation based on the context.

## Enable copilot handoff

To enable Copilot Handoff in Microsoft Teams, follow these two essential steps:

1. **Configure the Deeplink URL:** Set up a deeplink to the bot chat and include the continuation token as a value for the query parameter 'continuation' in the deeplink URL. The format should be: `https://teams.microsoft.com/l/chat/0/0?users=${botMri}&continuation=${continuationToken}`. Ensure that the `botMri` follows the format `28:<botId>` and that the `continuationToken` is URL encoded without exceeding the total URL length of 2,048 characters.

1. **Handle the New Invoke Type:** In your bot code, manage the new invoke type 'handoff/action' using the `onInvokeActivity` handler. This will allow your bot to properly process handoff actions initiated by the user.

1. **Invoke Handling by the Bot:** Override the `onInvokeActivity` method to handle the invoke call. The response to this invoke call should be a HTTP status code 200 for success or a code in the range of 400-500 for error. Do not send any payload with this response as it will not be rendered in the chat window. Any text or card response intended to be delivered to the user based on processing the continuation token received in the invoke call must be asynchronously notified to the user.

Here's an example of how to handle the invoke call in `searchApp.ts`:

```typescript
public async onInvokeActivity(context: TurnContext): Promise<InvokeResponse> {
    try {
      switch (context.activity.name) {
        case "handoff/action": {
          // TODO: Save continuation token and use it to process final response to user later
         return {status: 200}; // return just the http status
        }
        case "composeExtension/query":
          return {
            status: 200,
            body: await this.handleTeamsMessagingExtensionQuery(
              context,
              context.activity.value
            ),
          };
        default:
          return {
            status: 200,
            body: `Unknown invoke activity handled as default- ${context.activity.name}`,
          };
      }
    } catch (err) {
      console.log(`Error in onInvokeActivity: ${err}`);
      return {
        status: 500,
        body: `Invoke activity received- ${context.activity.name}`,
      };
    }
  }
```

When the bot receives the invoke call, context.activity.value.continuation will contain the continuationToken that was set in the deeplink URL. For more information on asynchronous notification patterns, you can refer to the relevant Microsoft Teams developer documentation.

## Best practices

To ensure best practices in line with the Microsoft Style Guide (MSTP), consider the following guidelines when enabling Copilot Handoff:

1. **Preview Release Considerations:** Since there is no UX indication when a user is navigated to the bot chat after clicking the action button with the deeplink URL, it's crucial for the bot to notify users promptly. This helps manage expectations as there may be a delay before the bot returns a response due to network latency and processing time. For instance, the bot could send a series of activities to keep the user informed of the progress:

    ```typescript
    await context.sendActivities([
      {
        type: ActivityTypes.Message,
        text: "Continuing conversation from copilot...",
      },
      { type: ActivityTypes.Typing },
      { type: "delay", value: 1000 },
      {
        type: ActivityTypes.Message,
        text: `Fetching more details using the continuation token passed: ${continuationToken}`,
      },
      { type: ActivityTypes.Typing },
      { type: "delay", value: 4000 },
      {
        type: ActivityTypes.Message,
        text: `Handoff successful!`,
      }
    ]);
    
    ```

1. **Continuation Token Lifetime**: Keep the lifetime of the continuation token short if required by your handoff scenario. Implement checks to ensure an invoke call with a specific continuation token is not processed multiple times. Once used, consider removing the continuation token from storage to prevent reprocessing. If the same token is received again, inform the user that they need to restart the conversation with the bot, as the continuation from Copilot cannot proceed.
By following these best practices, you can enhance the handoff experience, ensuring users have a seamless transition and clear communication throughout the process. Remember to maintain clarity, conciseness, and user focus in all interactions, as recommended by MSTP.

1. In scenarios where the bot might fail to handle the invoke call or the continuation token might be expired, the user will still be navigated to the one-on-one bot chat, but the bot may not be able to resume the conversation based on the context. In such cases, the bot should respond back with an appropriate message to the user, informing them of the error and asking them to start a new conversation or retry the query. This is to avoid confusion and frustration for the user and to ensure a smooth handoff experience.
