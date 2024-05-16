---
title: Copilot handoff
description: Learn how to allow users to continue their conversation with custom engine copilot from the copilot for Microsoft 365.
ms.date: 05/07/2024
ms.topic: conceptual
author: v-ypalikila
ms.author: surbhigupta
---

# Copilot handoff

You can enable copilot handoffs for your plugins to allow users to continue the conversation with a custom engine copilot from the Copilot for Microsoft 365 without losing the context of their work. Copilot handoff allows for a seamless transition from Copilot for Microsoft 365 to your custom engine copilot by using deep links that carry over the user context.

In the following graphic, a user looks for help on tech issues using copilot and receives results from the enterprise dataset. The user finds the information is insufficient and wants to continue the interaction with an Aisera bot plugin.​ When the user selects the Aisera bot, a new chat starts and the conversation continues in the Aisera bot. This seamless switch from Copilot to the Aisera bot, without losing the  conversation context is called copilot handoff.

:::image type="content" source="../../../assets/images/Copilot/Copilot-handoff.gif" alt-text="The GIF shows the conversation handoff between the copilot for Microsoft 365 and the Aisera chat bot.":::

## How copilot handoff works

A custom engine copilot sends a deep link with a continuation token to the copilot for Microsoft 365. The deep link query parameter with a continuation token ensures that any information from your plugin invocation parameters is referenced. When the user selects the deep link, the copilot then sends an invoke call to the bot with the continuation token, and the bot can resume the conversation based on the context. This process enables a seamless transition from copilot to a custom engine copilot, maintaining the conversation’s continuity and context, which optimizes the user experience.

:::image type="content" source="../../../assets/images/Copilot/copilot-handoff-flow.png" alt-text="Screenshot shows the handoff flow between the user, copilot, plugin, Teams, and bot." lightbox="../../../assets/images/Copilot/copilot-handoff-flow.png":::

You must create a deep link URL with a `continuation` query parameter for the action button and assign a continuation token to the parameter to facilitate the handoff process. When the user selects the action button, Microsoft Teams reads the continuation token from the URL and initiates an invoke call to the bot. The bot or plugin uses the continuation token to create a response, which is then displayed to the user in the plugin chat window.

## Enable copilot handoff

To enable copilot handoff in Teams, follow these steps:

1. **Configure a deep link URL**: Create a deep link to the bot chat and include `botMri` and `continuationToken`. The deep link must be in the format `https://teams.microsoft.com/l/chat/0/0?users=${botMri}&continuation=${continuationToken}`.

   **Example**:

   ```JSON
   { 

   "type": "Action.OpenUrl", 

   "title": "Handoff to Bot", 

   "url": "https://teams.microsoft.com/l/chat/0/0?users=${botMri}&continuation=${continuationToken}" 
   }
   ```

   The `Action.OpenUrl` property allows the user to hand off the conversation to a bot. When a user selects on the action button, the deep link is activated and opens a new chat window with the bot. The bot receives the continuation token from the URL in the form of a payload and uses the token to maintain the context of the conversation.

   **Sample payload**

   ```json
   { 
    "name": "handoff/action", 
    "type": "invoke", 
    "timestamp": "2024-04-15T19:50:32.945Z", 
    "localTimestamp": "2024-04-15T19:50:32.945Z", 
    "id": "f:ad06278a-0dd1-8811-71b1-f65e2bfd4570", 
    "channelId": "msteams", 
    "serviceUrl": "https://smba.trafficmanager.net/amer/", 
    "from": { 
        "id": "29:1jzORtjcfpYTLQDR9O4TyLz9LDwHskubQN1Ljc-aFO4L8dnZatjFpSw1PCGa-Mm-Jo4uLp67Lvekcjq2hkPoxdA", 
        "aadObjectId": "57162b23-ae6f-4e95-9774-27f7cb019864" 
    }, 
    "conversation": { 
        "conversationType": "personal", 
        "tenantId": "72f988bf-86f1-41af-91ab-2d7cd011db47", 
        "id": "a:13tOiSzRqeub3zaqoTHKpvOkk8Y1zFxk-g8WKdAUM2tjhTBFMt4RSuL8YWi7uwFNBmbxsyzYYktJEyfimYXYiEoplQ34aJs1y8trDb7EIcG09xOjSUieHVzFZ2b8tkagZ" 
    }, 
    "recipient": { 
        "id": "28:68935e91-ff09-4a33-a675-0fe09f015706", 
        "name": "NorthwindProducts" 
    }, 
    "entities": [ 
        { 
            "locale": "en-US", 
            "country": "US", 
            "platform": "Android", 
            "timezone": "America/Chicago", 
            "type": "clientInfo" 
        } 
    ], 
    "channelData": { 
        "tenant": { 
            "id": "72f988bf-86f1-41af-91ab-2d7cd011db47" 
        }, 
        "source": { 
            "name": "message" 
        }, 
        "legacy": { 
            "replyToId": "1:1_qLAAGcfze29QAWxzicc7gvR3vuNAlKvth08vavxYYs" 
        } 
    }, 
    "replyToId": "1713210583687", 
    "value": { 
        "continuation": "test-continuation-token" 
    }, 
    "locale": "en-US", 
    "localTimezone": "America/Chicago", 
    "rawTimestamp": "2024-04-15T19:50:32.945Z", 
    "rawLocalTimestamp": "2024-04-15T14:50:32.945-05:00", 
    "callerId": "urn:botframework:azure" 
   }
   ```

   The `handoff/action` invoke type allows the bot to transfer control of the conversation to another service or initiating a specific action that requires further processing. When the bot receives the `handoff/action` invoke activity, it uses the continuation token to look up any necessary information to continue the conversation seamlessly. This could involve retrieving conversation history, user preferences, or any other context needed to provide a consistent experience.

1. **Handle the invoke type**: In your bot code, manage the `handoff/action` invoke using the `onInvokeActivity` handler. Override the `onInvokeActivity` method to handle the invoke call. The response to this invoke call must be an HTTP status code 200 for success or a code in the range of 400-500 for error.

   > [!NOTE]
   > Don't send any payload with this response as it doesn't render in the chat window. The responses based on the continuation token must be sent to the user separately.

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

   When the bot receives the invoke call, `context.activity.value.continuation` contains the `continuationToken` that was set in the deep link URL.

## Best practices

* Bot must notify users when they're directed to the bot chat after selecting the action button, as there's no visual indication. This helps manage expectations as there might be a delay before the bot returns a response due to network latency and processing time. For instance, the bot can send a series of activities to keep the user informed of the progress:

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

* Manage the continuation token effectively. Keep the token’s lifetime short and ensure it doesn't process more than once. A short lifetime reduces the risk of unauthorized use or replay attacks, where an old token could be used to gain access to a session. Ensuring the token is redeemed only once prevents multiple handoffs from the same token, which could lead to confusion or errors in the handoff process.

* Remove the token from storage after a token is used. If the same token comes up, let the user know they need to start a new conversation with the bot because the handoff from copilot can't continue.
