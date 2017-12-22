---
title: Test your bot
description: Describes how to test bots in Microsoft Teams
keywords: teams bots testing
---
# Test your Microsoft Teams bot

To test your bot in Microsoft Teams, you must follow one of the uploading processes listed here.  Note that each method triggers a slightly different flow, and enables bots in different contexts as explained below.

For published bots, end users will be able to access the via the Discover Bots access points in the product.

> [!NOTE]
> Your tenant administrator will need to enable uploading of apps for your organization. [Here's how](/microsoftteams/admin-settings).

## Adding a bot to a team for use in channels

To add a bot to a team, so it is usable in the team channel by all team members, you must [create an app package](~/concepts/apps/apps-package) and [upload it](~/concepts/apps/apps-upload) to the appropriate team. This process makes the bot available in all channels within the team (when @mentioned) as well as for all team members in 1:1 context. Please note that the bot will not be available in other teams without being explicitly added to them.

When a bot is first added via the above method, Teams will send the `conversationUpdate` event. The payload for this event will contain a `channelData` object with the team information. For more information about bot events, see the documentation [here](~/concepts/bots/bots-notifications).

## Adding a bot for 1:1 chat only

If your bot only needs to be accessed in 1:1, not made available for channel conversations, you can directly upload your bot for that purpose.  

There are two ways to test load your bot for 1:1 conversations in Microsoft Teams:

1. On the [Bot Dashboard](https://dev.botframework.com/bots) page for your bot, under **Channels**, select **Add to Microsoft Teams**.

   Microsoft Teams will launch with a 1:1 chat with your bot.

2. Directly reference your bot's app ID from within Microsoft Teams:
   * On the [Bot Dashboard](https://dev.botframework.com/bots) page for your bot, under **Details**, copy the **Microsoft App ID** for your bot.
	
     ![Getting the AppID for the bot](~/assets/images/bots_appid_botframework.png)
	
   * From within Microsoft Teams, on the **Chat** pane, select the **Add chat** icon. For **To:**, paste your bot's Microsoft App ID.
	
     ![Getting the AppID for the bot](~/assets/images/bots_uploading.png)
		
     The app ID should resolve to your bot name.

   * Select your bot and send a message to initiate a conversation.

   * Alternatively, you can paste your bot's app ID in the search box in the top left in Microsoft Teams. In the search results page, navigate to the People tab to see your bot and to start chatting with it. 

3. Create a deeplink to your bot using the Teams deep-link format. This will launch Microsoft Teams directly with your bot's app ID. The format is `https://teams.microsoft.com/l/chat/0/0?users=28:YOUR_APP_ID`.

> [!NOTE]
> When a bot has been added through one of these methods, it will not be addressable in channel conversations. Nor can you take advantage of other Microsoft Teams app capabilities like tabs or messaging extensions.

As with bots added to a team, your bot will receive the `conversationUpdate` event, but without the team information in the `channelData` object.

## Blocking a bot in 1:1 chat

Note that users can choose to block your bot from sending 1:1 messages. They may toggle this by right-clicking your bot in the chat channel and choosing **Block bot conversation**. This means your bots will continue to send messages but the user will not receive those messages.

![Blocking a bot](~/assets/images/bot/botdisable.png)

## Removing a bot from a team

Users can delete the bot by choosing the trash-can icon on the bots list in their teams view. Note that this only removes the bot from that team's use; individual users will still be able to interact in 1:1 context.

Bots in 1:1 cannot be disabled or removed by a user, short of completely removing the bot from Teams.

## Disabling a bot in Teams

To stop your bot receiving messages, go to your Bot Dashboard and edit the Microsoft Teams channel. Clear the **Enable on Microsoft Teams** option. This prevents users from interacting with the bot, but it will still be discoverable and users will still be able to add it to teams.

## Removing a bot from Teams

To remove your bot completely from Teams, go to your Bot Dashboard and edit the Microsoft Teams channel. Choose the **Delete** button at the bottom. This prevents users from discovering, adding, or interacting with your bot. Note that this does not remove the bot from other users' Teams instances, although it will cease functioning for them as well.

## Removing your bot from the Office Store

If you want to remove your bot from your Teams app in the Office Store, you must remove the bot from your app manifest and resubmit your app for validation. See [Publish your Microsoft Teams app to the Office Store](~/publishing/apps-publish) for more information.
