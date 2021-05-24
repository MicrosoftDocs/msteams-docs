---
title: Receive all channel messages with RSC
author: surbhigupta12
description: Receive all channel messages with RSC permissions
ms.topic: conceptual
localization_priority: Normal
---

# Receive all channel messages with RSC

> [!NOTE]
> This feature is available in public developer preview.

The resource-specific consent (RSC) permissions model, originally developed for Teams Graph APIs, is now extended to bot scenarios.

Currently, bots can only receive user channel messages when they are @mentioned. Using RSC, you can now request team owners to consent for a bot to receive user messages across standard channels in a team without being @mentioned. This capability is enabled by specifying the `ChannelMessage.Read.Group` permission in the manifest of an RSC enabled Teams app. After configuration, team owners can grant consent during the app installation process.

For more information about enabling RSC for your app, see [resource-specific consent in Teams](/microsoftteams/platform/graph-api/rsc/resource-specific-consent#update-your-teams-app-manifest).

## Enable bots to receive all channel messages

You can view the demonstration on [enabling bots to receive all channel messages](~/assets/videos/BotsRSC_AllChannelMessages_Docs_Demo.mp4).

> [!VIDEO ~/assets/videos/BotsRSC_AllChannelMessages_Docs_Demo.mp4]

<video width="400" height="400" controls>
  <source src="~/assets/videos/BotsRSC_AllChannelMessages_Docs_Demo.mp4" type="video/mp4">
</video>

![text](~/assets/videos/BotsRSC_AllChannelMessages_Docs_Demo.mp4)

The `ChannelMessage.Read.Group` RSC permission is extended to bots. With user consent, this permission allows graph applications to get all messages in a conversation and bots to receive all channel messages without being @mentioned.

## Update app manifest

For your bot to receive all channel messages, RSC must be configured in the Teams app manifest with the `ChannelMessage.Read.Group` permission specified in the `webApplicationInfo` property.

The following image illustrates how to update the app manifest:

![Update app manifest](~/bots/how-to/conversations/Media/appmanifest.png)

The following is an example of the `webApplicationInfo` object:

* **id**: Your Azure Active Directory (AAD) app ID. This can be the same as your bot ID.
* **resource**: Any string. This field has no operation in RSC, but must be added and have a value to avoid error response.
* **applicationPermissions**: RSC permissions for your app with `ChannelMessage.Read.Group` must be specified. For more information, see [resource-specific permissions](/microsoftteams/platform/graph-api/rsc/resource-specific-consent#resource-specific-permissions).

The following code provides an example of the app manifest:

```json
"webApplicationInfo": {
"id": "XXxxXXXXX-XxXX-xXXX-XXxx-XXXXXXXxxxXX",
"resource": "https://AnyString",
"applicationPermissions": [
"ChannelMessage.Read.Group"
    ]
  }
```

The following image illustrates how to create the zip file for the app manifest:

![Create zip file](~/bots/how-to/conversations/Media/createzipfile.png)

## Receive channel messages with RSC

To receive all channel messages in a team with RSC without being @mentioned

1. Select or create a team.
1. Select **More options** from the left pane. The drop-down menu appears.

    ![Managing apps in team](~/bots/how-to/conversations/Media/managingteam.png)

1. Select **Manage team** from the drop-down menu. The details appear.
1. Select **Apps**. Multiple apps appear.

    ![Uploading custom app](~/bots/how-to/conversations/Media/uploadingcustomapp.png)

1. Select **Upload a custom app** from the lower right corner. The **Open** dialog box appears.

    ![Selecting app package](~/bots/how-to/conversations/Media/selectapppackage.png)

1. Select the app package.
1. Select **Open**. The app details pop-up appears.
1. Select **Add** to add the bot to your selected team.

    ![Adding the bot](~/bots/how-to/conversations/Media/addingbot.png)

1. Select a channel and enter a message in the channel for your bot.

    The bot receives the message without being @mentioned.

    ![Bot receives message](~/bots/how-to/conversations/Media/botreceivingmessage.png)

## See also

* [Bot conversations](/microsoftteams/platform/bots/how-to/conversations/conversation-basics)
* [Resource-specific consent](/microsoftteams/resource-specific-consent)
* [Test resource-specific consent](/microsoftteams/platform/graph-api/rsc/test-resource-specific-consent)
* [Upload custom app in Teams](~/concepts/deploy-and-publish/apps-upload.md)
