---
title: Test and debug your bot locally
author: clearab
description: Testing and debugging your bot locally with an IDE
ms.topic: overview
localization_priority: Normal
ms.author: anclear
---

# Test and debug your bot locally

When testing your bot you need to take into consideration both the contexts you want your bot to run in, and any functionality you may have added to your bot that requires data specific to Microsoft Teams. Make sure that the method you choose to test your bot aligns with its functionality.

## Test by uploading to Teams

The most comprehensive way to test your bot is by creating an app package and uploading it to Teams. This is the only method to test the full functionality available to your bot, across all scopes.

There are two methods for uploading your app:
* Use [App Studio](~/concepts/build-and-test/app-studio-overview.md).
* [Create an app package](~/concepts/build-and-test/apps-package.md) manually, and then [upload your app](~/concepts/deploy-and-publish/apps-upload.md).

> [!NOTE]
> If you need to alter your manifest and re-upload your app, you must [delete your bot](#delete-a-bot-from-teams) before uploading your altered app package.

## Debug your bot locally

If you are hosting your bot locally during development, you need to use a tunneling service like [ngrok](https://ngrok.com/) in order to test your bot. After you download and install ngrok, add `ngrok` to your path, and run the following command to start the tunneling service:

```bash
ngrok http <port> -host-header=localhost:<port>
```

Use the https endpoint provided by ngrok in your app manifest. 

> [!NOTE]
> If you close your command window and restart, a new URL is generated and you need to update your bot endpoint address to use it.

## Test your bot without uploading to Teams

Occasionally, it may be necessary to test your bot without installing it as an app in Teams. We provide two methods for testing the bot. Testing your bot without installing it as an app can be useful to ensure your bot is available and responding, however it won't allow you to test the full breadth of Microsoft Teams functionality you may have added to your bot. If you need to fully test your bot, see [testing by uploading](#test-by-uploading-to-teams).

### Use the Bot Emulator

The Bot Framework Emulator is a desktop application that permits bot developers to test and debug their bots locally or remotely. The emulator helps you to chat with your bot and inspect the messages that your bot sends and receives. This can be useful for verifying that your bot is available and responding. However, the emulator does not permit you to test any Teams-specific functionality you have added to the bot, nor the responses from your bot are an accurate visual representation of how they are rendered in Teams. If you need to test either of those things it is best to [upload your bot](#test-by-uploading-to-teams).

For more information, see [complete instructions on the Bot Framework Emulator](/azure/bot-service/bot-service-debug-emulator?view=azure-bot-service-4.0&preserve-view=true).

### Talk to your bot directly by ID

> [!Important]
> Talking to your bot by ID is intended for basic testing purposes only. Any Teams-specific functionality you have added to your bot fails to work.

You can also initiate a conversation with your bot by using its ID. When a bot has been added through one of these methods it is not addressable in channel conversations and you cannot take advantage of other Microsoft Teams app capabilities like tabs or messaging extensions. You can initiate a conversation in one of the following ways:

* On the [Bot Dashboard](https://dev.botframework.com/bots) page for your bot, under **Channels**, select **Add to Microsoft Teams**. Microsoft Teams launches a personal chat with your bot.

* Directly reference your bot's app ID from within Microsoft Teams:
   1. On the [Bot Dashboard](https://dev.botframework.com/bots) page for your bot, under **Details**, copy the **Microsoft App ID** for your bot.
  
      ![Getting the AppID for the bot](~/assets/images/bots_appid_botframework.png)
  
   2. Open Microsoft Teams, on the **Chat** pane, select the **Add chat** icon. In **To:**, paste your bot's Microsoft App ID.
  
      ![Uploading bots](~/assets/images/bots_uploading.png)

      The app ID must resolve to your bot name.

   3. Select your bot and send a message to initiate a conversation.
      Alternatively, you can paste your bot's app ID in the search box in the top left in Microsoft Teams. In the search results page, navigate to the **People** tab to see your bot and to start chatting with it.

Your bot receives the `conversationUpdate` event as you add the bots to a team, without the team information in the `channelData` object.

## Block a bot in personal chat

Users can choose to block your bot from sending personal chat messages. They may toggle this by right-clicking your bot in the chat channel and choosing **Block bot conversation**. This means, your bots continues to send messages, however, the user does not receive the messages.

![Blocking a bot](~/assets/images/bots/botdisable.png)

## Remove a bot from a team

Users can delete the bot by choosing the trash-can icon on the bots list in their team's view. This only removes the bot from that team's use, individual users can still interact in personal context. Bots in personal context cannot be disabled or removed by users.

## Disable a bot in Teams

To stop your bot from receiving messages, go to your **Bot Dashboard** and edit the Microsoft Teams channel. Clear the **Enable on Microsoft Teams** option. This prevents users from interacting with the bot, however, it will still be discoverable and users will still be able to add it to Teams.

## Delete a bot from Teams

To remove your bot completely from Teams, go to your **Bot Dashboard** and edit the Microsoft Teams channel. Choose the **Delete** button at the bottom. This prevents users from discovering, adding, and interacting with your bot. This does not remove the bot from other user's Teams instances, however, it stops functioning for them as well.

## See also

> [!div class=nextstep]
> [Debug your bot with inspection middleware](/azure/bot-service/bot-service-debug-inspection-middleware)

> [!div class=nextstep]
> [Debug your calling and meeting bot locally](~/bots/calls-and-meetings/debugging-local-testing-calling-meeting-bots.md)
