---
title: Copilot handoff
description: Learn how to allow users to continue their conversation with a custom plugin bot from the copilot chat.
ms.date: 05/07/2024
ms.topic: conceptual
author: v-ypalikila
ms.author: surbhigupta
---

# Copilot handoff

Copilot handoff allows users to continue their conversation with a custom plugin bot from the copilot chat. The plugin bot can send a deep link with a continuation token to the copilot, and when the user selects on it, they're navigated to the one-on-one bot chat. The copilot then sends an invoke call to the bot with the continuation token, and the bot can resume the conversation based on the context.

## Enable copilot handoff

To enable Copilot Handoff in Microsoft Teams, follow these two essential steps:

1. **Configure a deeplink URL**: Set up a deeplink to the bot chat and include `botMri` and `continuationToken`. The `botMri` value must be in the format `https://teams.microsoft.com/l/chat/0/0?users=${botMri}&continuation=${continuationToken}`, where `botMri` follows the format `28:<botId>`. For example, if the bot ID is 68935e91-ff09-4a33-a675-0fe09f015706, the `botMri` would be `28:68935e91-ff09-4a33-a675-0fe09f015706`. The `continuationToken` value can be any string, but make sure that the total url length doesn't exceed 2048 characters and that the string is URL encoded. 

  Update the deeplink url under the `Action.OpenUrl` property in the Adaptive card as follows:

  ```JSON
  { 

  "type": "Action.OpenUrl", 

  "title": "Handoff to Bot", 

  "url": "https://teams.microsoft.com/l/chat/0/0?users=${botMri}&continuation=${continuationToken}" 
  }
  ```

  The `Action.OpenUrl` property allows the user to handoff the conversation to a bot. The botMri specifies the bot chat that the user is redirected to when they select the action button that contains the deeplink url. After the user is redirected to the bot chat, the bot receives the `continuationToken` value as an invoke message of the type `handoff/action`, if the app associated with the bot is installed in the user's personal scope and the continuationToken value isn't empty. Here's an example of the invoke message payload that the bot receives:

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



1. **Handle the invoke type**: In your bot code, manage the new invoke type `handoff/action` using the `onInvokeActivity` handler. Override the `onInvokeActivity` method to handle the invoke call. The response to this invoke call should be an HTTP status code 200 for success or a code in the range of 400-500 for error. Don't send any payload with this response as it doesn't render in the chat window. Responses based on the continuation token should be sent to the user separately.

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

When the bot receives the invoke call, `context.activity.value.continuation` contains the `continuationToken` that was set in the deeplink URL.

## Best practices

1. **Preview Release Considerations**: It’s important for the bot to quickly notify users when they're directed to the bot chat after selecting the action button, as there's no visual indication. This helps manage expectations as there might be a delay before the bot returns a response due to network latency and processing time. For instance, the bot could send a series of activities to keep the user informed of the progress:

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

1. **Continuation Token Lifetime**: Keep the lifetime of the continuation token short if required by your handoff scenario. Implement checks to ensure an invoke call with a specific continuation token isn't processed multiple times. Once used, consider removing the continuation token from storage to prevent reprocessing. If the same token is received again, inform the user that they need to restart the conversation with the bot, as the continuation from Copilot can't proceed.
By following these best practices, you can enhance the handoff experience, ensuring users have a seamless transition and clear communication throughout the process.

1. If the bot can’t process the request or the token is expired, the user would still go to the bot chat but the bot might not continue the conversation. The bot should then tell the user there was an error and suggest starting a new conversation or trying the query again. This helps prevent user confusion and ensures a smooth experience.
