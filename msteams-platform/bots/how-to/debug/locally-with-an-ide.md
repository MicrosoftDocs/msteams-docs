---
title: Test and debug your bot locally
author: surbhigupta
description: Learn about testing and debugging your bot locally with an IDE within Teams environment via sideloading and more.
ms.topic: overview
ms.localizationpriority: medium
ms.author: anclear
---

# Test and debug your bot locally with IDE

When testing your bot, you need to consider both the contexts you want your bot to run in, and any functionality you may have added to your bot that requires data specific to Microsoft Teams. Ensure that the method you choose to test your bot aligns with its functionality.

## Test by uploading to Teams

The most comprehensive way to test your bot is by creating an app package and uploading it to Teams. Uploading the app package to Teams is the only method to test the full functionality available to your bot, across all scopes.

There are two methods for uploading your app:

* Use [Developer Portal for Teams](~/concepts/build-and-test/teams-developer-portal.md).
* [Create an app package](~/concepts/build-and-test/apps-package.md) manually, and then [upload your app](~/concepts/deploy-and-publish/apps-upload.md).

> [!NOTE]
> To alter the manifest and re-upload your app, [delete the bot](#delete-a-bot-from-teams) before uploading the altered app package.
> To test the bot, enable sideloading in Teams. See [enable sideloading](/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant#enable-custom-teams-apps-and-turn-on-custom-app-uploading).

## Debug your bot locally

If you're hosting your bot locally during development, you need to use a tunneling service like [ngrok](https://ngrok.com/) in order to test your bot. After you download and install ngrok, add `ngrok` to your path, and run the following command to start the tunneling service:

```bash
ngrok http <port> --host-header=localhost:<port>
```

Use the https endpoint provided by ngrok in your app [manifest] (https://learn.microsoft.com/en-us/microsoftteams/platform/resources/schema/manifest-schema#sample-full-manifest).

> [!NOTE]
> If you close your command window and restart, a new URL is generated and you need to update your bot endpoint address to use it.

## Test your bot without uploading to Teams

Occasionally, it's necessary to test your bot without installing it as an app in Teams. We provide two methods for testing the bot. Testing your bot without installing it as an app can be useful to ensure your bot is available and responding. However, it won't allow you to test the full breadth of Microsoft Teams functionality you've added to your bot. If you want to fully test your bot, see [testing by uploading](#test-by-uploading-to-teams).

### Use the Bot Emulator

The Bot Framework Emulator is a desktop application that permits bot developers to test and debug their bots locally or remotely. The emulator helps you to chat with your bot and inspect the messages that your bot sends and receives. This is useful to verify that your bot is available and responding. However, the emulator doesn't permit you to test any Teams-specific functionality you've added to the bot, nor the responses from your bot are an accurate visual representation of how they're rendered in Teams. If you need to test either of these, it's best to [upload your bot](#test-by-uploading-to-teams).

For more information, see [complete instructions on the Bot Framework Emulator](/azure/bot-service/bot-service-debug-emulator?view=azure-bot-service-4.0&preserve-view=true).

### Talk to your bot directly by ID

> [!Important]
> Talking to your bot by ID is intended for basic testing purposes only. Any Teams-specific functionality you have added to your bot fails to work.

Initiate a conversation with your bot by using its ID. When a bot is added through one of these methods, it isn't addressable in channel conversations, and you can't take advantage of other Teams app capabilities like tabs or message extensions. Initiate a conversation in one of the following ways:

* On the [Bot Dashboard](https://dev.botframework.com/bots) page for your bot, under **Channels**, select **Add to Microsoft Teams**. Teams launches a personal chat with your bot.

* Directly reference your bot's app ID from within Teams:
   1. On the [Bot Dashboard](https://dev.botframework.com/bots) page for your bot, under **Details**, copy the **Microsoft App ID** for your bot.
  
      ![Getting the AppID for the bot](~/assets/images/bots_appid_botframework.png)
  
   2. Open Microsoft Teams, on the Chat pane, selects the **Add chat** icon. In **To:**, paste your bot's Microsoft App ID.
  
      ![Uploading bots](~/assets/images/bots_uploading.png)

      The app ID must resolve to your bot name.

   3. Select your bot and send a message to initiate a conversation.
      Alternatively, you can paste your bot's app ID in the search box in the top left in Teams. In the search results page, go to the **People** tab to see your bot and to start chatting with it.

> [!Note]
> For Teams to refer to your bot's app ID, enable [sideloading of apps](/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant#enable-custom-teams-apps-and-turn-on-custom-app-uploading).

Your bot receives the `conversationUpdate` event as you add the bots to a team, without the team information in the `channelData` object.

## Block a bot in personal chat

Users can choose to block your bot from sending personal chat messages. They may toggle this by right-clicking your bot in the chat channel and choosing **Block bot conversation**. This means, your bots continue to send messages, however, the user doesn't receive the messages.

![Blocking a bot](~/assets/images/bots/botdisable.png)

## Remove a bot from a team

Users can delete the bot by choosing the trash-can icon on the bots list in their team's view. This only removes the bot from that team's use. Individual users can still interact in personal context. Bots in personal context can't be disabled or removed by users.

## Disable a bot in Teams

To stop your bot from receiving messages, go to your **Bot Dashboard** and edit the Teams channel. Clear the **Enable on Microsoft Teams** option. This prevents users from interacting with the bot, however, it's still discoverable and users can add it to Teams.

## Delete a bot from Teams

To remove your bot completely from Teams, go to your **Bot Dashboard** and edit the Teams channel. Choose the **Delete** button at the bottom. Deleting a bot from Teams prevents users from discovering, adding, and interacting with your bot. Deleting a bot from Teams doesn't remove the bot from other user's Teams instances, however, it stops functioning for them as well.

## See also

* [Test your app](../../../concepts/build-and-test/test-app-overview.md)
* [Debug your bot with inspection middleware](/azure/bot-service/bot-service-debug-inspection-middleware)
* [Debug your calling and meeting bot locally](~/bots/calls-and-meetings/debugging-local-testing-calling-meeting-bots.md)
* [Build bots for Teams](../../what-are-bots.md)
