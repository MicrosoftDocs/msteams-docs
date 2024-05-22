---
title: Copilot handoff
description: Learn how to allow users to continue their conversation with custom engine copilot from the copilot for Microsoft 365.
ms.date: 05/07/2024
ms.topic: conceptual
author: v-ypalikila
ms.author: surbhigupta
---

# Copilot handoff

> [!NOTE]
>
> * Copilot handoff is only available in [public developer preview](../../../resources/dev-preview/developer-preview-intro.md).
> * Copilot handoff is only supported for one-on-one chat bots.

You can enhance your Copilot message extension plugin to hand off a conversation to your [custom engine copilot](/microsoft-365-copilot/extensibility/overview-custom-engine-copilot) to handle cases where a more in-depth, specialized chat experience is required. Copilot handoffs are plugin-provided deep links that carry over chat context, enabling users to seamlessly transition their chat with Copilot for Microsoft 365 to your bot service.

In the following graphic, a user looks for help on tech issues using Copilot and receives results from the enterprise dataset. The user finds the available information insufficient and wants to continue the interaction with a Contoso bot plugin.​ When the user selects the Contoso bot, a new chat starts and the conversation continues in the Contoso bot. This seamless switch from Copilot to the Contoso bot, without losing the conversation context is called a *copilot handoff*.

:::image type="content" source="../../../assets/images/Copilot/Copilot-handoff.gif" alt-text="The GIF shows the conversation handoff between the copilot for Microsoft 365 and the Contoso chat bot.":::

## How copilot handoff works

A custom engine copilot sends a deep link with a continuation token to Copilot for Microsoft 365. The deep link query parameter with a continuation token ensures that any information from your plugin invocation parameters is referenced. When the user selects the deep link, Copilot sends an invoke call to the bot with the continuation token, and the bot then resumes the conversation based on the context. This process enables a seamless transition from Copilot for Microsoft 365 to your custom engine copilot, maintaining the conversation’s continuity and context, which optimizes the user experience.

:::image type="content" source="../../../assets/images/Copilot/copilot-handoff-flow.png" alt-text="Screenshot shows the handoff flow between the user, Copilot, plugin, Teams, and bot." lightbox="../../../assets/images/Copilot/copilot-handoff-flow.png":::

You must create a deep link URL with a `continuation` query parameter for the action button and assign a continuation token to the parameter to facilitate the handoff process. When the user selects the action button, Microsoft Teams reads the continuation token from the URL and initiates an invoke call to the bot. The bot or plugin uses the continuation token to create a response, which is then displayed to the user in the plugin chat window.

## Enable copilot handoff

To enable copilot handoff in Teams, follow these steps:

1. **Configure a deep link URL**: Create a [deep link to a chat](../../../concepts/build-and-test/deep-link-teams.md#configure-deep-link-to-start-a-chat-manually) and add the `28:<botId>` and `continuationToken` to the deep link format. The deep link format must be `https://teams.microsoft.com/l/chat/0/0?users=28:${botId}&continuation=${continuationToken}`.

   **Example**:

   ```JSON
   { 

   "type": "Action.OpenUrl", 

   "title": "Handoff to Bot", 

   "url": "https://teams.microsoft.com/l/chat/0/0?users=28:${botId}&continuation=${continuationToken}" 
   }
   ```

   The `Action.OpenUrl` property allows the user to hand off the conversation to a bot. When a user selects the action button, the deep link is activated and opens a new chat window with the bot. The bot receives an invoke call with a payload, which contains the continuation token from the URL and uses the token to maintain the context of the conversation.

   **Sample payload**

   ```json
   { 
    "name": "handoff/action", 
    "type": "invoke", 
    "timestamp": "2024-04-15T19:50:32.945Z", 
    "localTimestamp": "2024-04-15T19:50:32.945Z", 
    "id": "f:00000000-0000-0000-0000-000000000000",
    "channelId": "msteams", 
    "serviceUrl": "https://smba.trafficmanager.net/amer/", 
    "from": { 
        "id": "29:1jzORtjcfpYTLQDR9O4TyLz9LDwHskubQN1Ljc-aFO4L8dnZatjFpSw1PCGa-Mm-Jo4uLp67Lvekcjq2hkPoxdA", 
        "aadObjectId": "00000000-0000-0000-0000-000000000000" 
    }, 
    "conversation": { 
        "conversationType": "personal", 
        "tenantId": "00000000-0000-0000-0000-000000000000",
        "id": "a:13tOiSzRqeub3zaqoTHKpvOkk8Y1zFxk-g8WKdAUM2tjhTBFMt4RSuL8YWi7uwFNBmbxsyzYYktJEyfimYXYiEoplQ34aJs1y8trDb7EIcG09xOjSUieHVzFZ2b8tkagZ" 
    }, 
    "recipient": { 
        "id": "28:00000000-0000-0000-0000-000000000000", 
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
            "id": "00000000-0000-0000-0000-000000000000" 
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

   The `handoff/action` invoke type allows the bot to transfer control of the conversation to another service or initiate a specific action that requires further processing. When the bot receives the `handoff/action` invoke activity, it uses the continuation token to look up any necessary information to continue the conversation seamlessly. This involves retrieving conversation history, user preferences, or any other context needed to provide a consistent experience.

1. **Handle the invoke type**: In your bot code, manage the `handoff/action` invoke using the `onInvokeActivity` handler. Override the `onInvokeActivity` method to handle the invoke call. The response to this invoke call must be an HTTP status code 200 for success or a code in the range of 400-500 for error.

In your bot code, manage the `handoff/action` invoke using the `onInvokeActivity` handler. You must override the `onInvokeActivity` method to handle the invoke call. If the invoke is successfull, the bot must return an HTTP status code of **200**. If there is an error, the bot must respond with an appropriate HTTP status code in the range of **400- or 500-**. If the user receives an error, they must wait and retry while the errors are logged in the backend service.

The response to this invoke call must be an HTTP status code 200 for success, or a (400- or 500-level) error code response.

   > [!NOTE]
   > Don't send any payload with this response as it doesn't render in the chat window. The responses based on the continuation token must be sent to the user separately.

   Here's an example of how to handle the invoke call in `searchApp.ts`:

   ```typescript
            case "handoff/action": {
              // TODO: Save continuation token and use it to process final response to user later
             return {status: 200}; // return just the http status
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

* We recommended that you manage the lifecycle of the continuation token to ensure it expires after a reasonable period and also handle scenarios where the continuation token request is replayed by the user. For example, if the same token comes up, let the user know they need to start a new conversation with the bot because the handoff from copilot can't continue.

## Code samples

|Sample name | Description | Node.js|
| ----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Northwind inventory message extension                               | This sample implements a Teams message extension that can be used as a plugin for Microsoft Copilot for Microsoft 365 and enables copilot handoff.             | [View](https://github.com/OfficeDev/Copilot-for-M365-Plugins-Samples/tree/main/samples/msgext-northwind-inventory-ts)              |
