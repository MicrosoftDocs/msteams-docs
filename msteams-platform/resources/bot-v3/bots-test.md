---
title: Test and debug your bot
description: Describes how to test bots in Microsoft Teams
keywords: teams bots testing
ms.topic: how-to
localization_priority: Normal
ms.date: 03/20/2019
---
# Test and debug your Microsoft Teams bot

[!include[v3-to-v4-SDK-pointer](~/includes/v3-to-v4-pointer-bots.md)]

When testing your bot you need to take into consideration both the context(s) you want your bot to run in, as well as any functionality you may have added to your bot that requires data specific to Microsoft Teams. Make sure that the method you chose to test your bot aligns with its functionality.

## Test by uploading to Teams

The most comprehensive way to test your bot is by creating an app package and uploading it to Teams. This is the only method to test the full functionality available to your bot, across all scopes.

There are two methods for uploading your app. You can either use [App Studio](~/concepts/build-and-test/app-studio-overview.md) to help you, or you can manually [create an app package](~/concepts/build-and-test/apps-package.md) and [upload your app](~/concepts/deploy-and-publish/apps-upload.md). If you need to alter your manifest and re-upload your app, you should [delete your bot](#deleting-a-bot-from-teams) before uploading your altered app package.

## Debug your bot locally

If you are hosting your bot locally during development you'll need to use a tunneling service like [ngrok](https://ngrok.com/) in order to test your bot. Once you've downloaded and installed ngrok, run the below command to start the tunneling service (you may need to add ngrok to your path).

```bash
ngrok http <port> -host-header=localhost:<port>
```

Use the https endpoint provided by ngrok in your app manifest. If you close your command window and restart you'll get a new URL, and you'll need to update your bot endpoint address to use that one as well.

## Testing your bot without uploading to Teams

Occasionally it may be necessary to test your bot without installing it as an app in Teams. We provide two methods for doing so below. Testing your bot without installing it as an app can be useful to ensure your bot is available and responding, however it will not allow you to test the full breadth of Microsoft Teams functionality you may have added to your bot. If you need to fully test your bot, please follow the instructions for [testing by uploading](#test-by-uploading-to-teams).

### Use the Bot Emulator

The Bot Framework Emulator is a desktop application that allows bot developers to test and debug their bots, either locally or remotely. Using the emulator, you can chat with your bot and inspect the messages that your bot sends and receives. This can be useful for verifying that your bot is available and responding, however the emulator will not allow you to test any Teams-specific functionality you've added to your bot, nor will responses from your bot be an accurate visual representation of how they will be rendered in Teams. If you need to test either of those things it is best to [upload your bot](#test-by-uploading-to-teams).

Complete instructions on the Bot Framework Emulator can be found [here](/azure/bot-service/bot-service-debug-emulator?view=azure-bot-service-4.0&preserve-view=true).

### Talk to your bot directly by Id

>[!Important]
>Talking to your bot by Id is intended for testing purposes only.

You can also initiate a conversation with your bot by using its Id. Two methods for doing so are given below. When a bot has been added through one of these methods it will not be addressable in channel conversations, and you cannot take advantage of other Microsoft Teams app capabilities like tabs or messaging extensions.

1. On the [Bot Dashboard](https://dev.botframework.com/bots) page for your bot, under **Channels**, select **Add to Microsoft Teams**. Microsoft Teams will launch with a personal chat with your bot.
2. Directly reference your bot's app ID from within Microsoft Teams:
   * On the [Bot Dashboard](https://dev.botframework.com/bots) page for your bot, under **Details**, copy the **Microsoft App ID** for your bot.
  
     ![Getting the AppID for the bot](~/assets/images/bots_appid_botframework.png)
  
   * From within Microsoft Teams, on the **Chat** pane, select the **Add chat** icon. For **To:**, paste your bot's Microsoft App ID.
  
     ![Uploading the AppID for the bot](~/assets/images/bots_uploading.png)

     The app ID should resolve to your bot name.

   * Select your bot and send a message to initiate a conversation.
   * Alternatively, you can paste your bot's app ID in the search box in the top left in Microsoft Teams. In the search results page, navigate to the People tab to see your bot and to start chatting with it.

Your bot will receive the `conversationUpdate` event just like bots added to a team, but without the team information in the `channelData` object.

## Blocking a bot in personal chat

Note that users can choose to block your bot from sending personal chat messages. They may toggle this by right-clicking your bot in the chat channel and choosing **Block bot conversation**. This means your bots will continue to send messages but the user will not receive those messages.

![Blocking a bot](~/assets/images/bots/botdisable.png)

## Removing a bot from a team

Users can delete the bot by choosing the trash-can icon on the bots list in their teams view. Note that this only removes the bot from that team's use; individual users will still be able to interact in personal context.

Bots in personal context cannot be disabled or removed by a user, short of completely removing the bot from Teams.

## Disabling a bot in Teams

To stop your bot receiving messages, go to your Bot Dashboard and edit the Microsoft Teams channel. Clear the **Enable on Microsoft Teams** option. This prevents users from interacting with the bot, but it will still be discoverable and users will still be able to add it to teams.

## Deleting a bot from Teams

To remove your bot completely from Teams, go to your Bot Dashboard and edit the Microsoft Teams channel. Choose the **Delete** button at the bottom. This prevents users from discovering, adding, or interacting with your bot. Note that this does not remove the bot from other users' Teams instances, although it will cease functioning for them as well.

## Removing your bot from AppSource

If you want to remove your bot from your Teams app in AppSource (formerly Office Store), you must remove the bot from your app manifest and resubmit your app for validation. See [Publish your Microsoft Teams app to AppSource](~/concepts/deploy-and-publish/apps-publish.md) for more information.
