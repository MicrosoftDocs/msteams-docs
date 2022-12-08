---
title: Test preview for monetized apps 
author: v-npaladugu
description:  In this article, learn how to create deep links to an application and navigate them in your Microsoft Teams.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
---

## Deep link to Teams

### Navigate to a chat

1. Group chat

   Use this deep link format to go to a message in personal and group chats in Teams:

   `http://teams.microsoft.com/l/message/{chatId}/{messageId}?context={"contextType":"chat"}`

   Example: `http://teams.microsoft.com/l/message/19:253f5895-9a62-4362-8d38-43f0205c702c_f1b94dcf-0aa3-4989-bcdf-ef4a5ed00f86@unq.gbl.spaces/1563480968434?context=%7B%22contextType%22:%22chat%22%7D`

   The query parameters are:

   * `chatId`: ChatId of the conversation. You can get the `chatId` from URL of the chat in Teams web client or using the [Microsoft Graph API](/graph/api/chat-get?view=graph-rest-1.0&tabs=http&preserve-view=true). For example, `19:253f5895-9a62-4362-8d38-43f0205c702c_f1b94dcf-0aa3-4989-bcdf-ef4a5ed00f86@unq.gbl.spaces`.

     Apps can read a group chat ID through context using the Microsoft Teams JavaScript library or from the incoming request payload to Bot.

   * `messageId`: Each message in a chat has a unique ID. You can get the `messageId` for a message in the following ways:

   * When a bot posts a message in chat, the bots  receives a notification with the `messageId`.
   * Using graph API, when there is an action in the chat window. For example, `1563480968434`.

   * `contextObject`: Specify the contextType as chat.

2. Channel

   Use this deep link format to navigate to a particular conversation within channel thread:

   `https://teams.microsoft.com/l/message/<channelId>/<parentMessageId>?tenantId=<tenantId>&groupId=<groupId>&parentMessageId=<parentMessageId>&teamName=<teamName>&channelName=<channelName>&createdTime=<createdTime>`

   Example: `https://teams.microsoft.com/l/message/<channelId>/1648741500652?tenantId=<tenantId>&groupId=<groupId>&parentMessageId=1648741500652&teamName=<teamName>&channelName=<channelName>&createdTime=1648741500652`

   The query parameters are:

    * `channelId`: Channel ID of the conversation. For example, `19:3997a8734ee5432bb9cdedb7c432ae7d@thread.tacv2`.
    * `tenantId`: Tenant ID such as `0d9b645f-597b-41f0-a2a3-ef103fbd91bb`.
    * `groupId`: Group ID of the file. For example, `3606f714-ec2e-41b3-9ad1-6afb331bd35d`.
    * `parentMessageId`: Parent message ID of the conversation.
    * `teamName`: Name of the team.
    * `channelName`: Name of the team's channel.

       > [!NOTE]
       > You can see `channelId` and `groupId` in the URL from the channel.

## Navigate to a chat message

### Navigate to a chat message

Applications can navigate a user to a specific message.  

For navigating to a specific message in a chat refer to the following deep link format:
<TODO – get the format from feature team, we haven’t documented it>.

Use this deep link format to navigate to a particular conversation within channel thread:

`https://teams.microsoft.com/l/message/<channelId>/<parentMessageId>?tenantId=<tenantId>&groupId=<groupId>&parentMessageId=<parentMessageId>&teamName=<teamName>&channelName=<channelName>&createdTime=<createdTime>`

Example: `https://teams.microsoft.com/l/message/<channelId>/1648741500652?tenantId=<tenantId>&groupId=<groupId>&parentMessageId=1648741500652&teamName=<teamName>&channelName=<channelName>&createdTime=1648741500652`

The query parameters are:

* `channelId`: Channel ID of the conversation. For example, `19:3997a8734ee5432bb9cdedb7c432ae7d@thread.tacv2`.
* `tenantId`: Tenant ID such as `0d9b645f-597b-41f0-a2a3-ef103fbd91bb`.
* `groupId`: Group ID of the file. For example, `3606f714-ec2e-41b3-9ad1-6afb331bd35d`.
* `parentMessageId`: Parent message ID of the conversation.
* `teamName`: Name of the team.
* `channelName`: Name of the team's channel.

> [!NOTE]
> You can see `channelId` and `groupId` in the URL from the channel.

### Open a file

Generate deep links to file in channel

The following deep link format can be used in a bot, connector, or message extension card:

`https://teams.microsoft.com/l/file/<fileId>?tenantId=<tenantId>&fileType=<fileType>&objectURL=<objectURL>&baseUrl=<baseURL>&serviceName=<Name>&threadId=<threadId>&groupId=<groupId>`

The query parameters are:

* `fileId`: Unique file ID from Sharepoint Online, also known as `sourcedoc`. For example,`1FA202A5-3762-4F10-B550-C04F81F6ACBD`.
* `tenantId`: Tenant ID such as `0d9b645f-597b-41f0-a2a3-ef103fbd91bb`.
* `fileType`: Supported file type, such as .docx, .pptx, .xlsx, and .pdf.
* `objectUrl`: Object URL of the file. The format is `https://{tenantName}.sharepoint.com/sites/{TeamName}/SharedDocuments/{ChannelName}/FileName.ext`. For example, `https://microsoft.sharepoint.com/teams/(filepath)`.
* `baseUrl`: Base URL of the file. The format is `https://{tenantName}.sharepoint.com/sites/{TeamName}`. For example, `https://microsoft.sharepoint.com/teams`.
* `serviceName`: Name of the service, app ID. For example, `teams`.
* `threadId`: The threadId is the team ID of the team where the file is stored. It's optional and can't be set for files stored in a user's OneDrive folder. threadId - 19:f8fbfc4d89e24ef5b3b8692538cebeb7@thread.skype.
* `groupId`: Group ID of the file. For example, `ae063b79-5315-4ddb-ba70-27328ba6c31e`.

> [!NOTE]
> You can see `threadId` and `groupId` in the URL from the channel.

The following example format illustrates the deep link to files:

`https://teams.microsoft.com/l/file/5E0154FC-F2B4-4DA5-8CDA-F096E72C0A80?tenantId=0d9b645f-597b-41f0-a2a3-ef103fbd91bb&fileType=pptx&objectUrl=https%3A%2F%2Fmicrosoft.sharepoint.com%2Fteams%2FActionPlatform%2FShared%20Documents%2FFC7-%20Bot%20and%20Action%20Infra%2FKaizala%20Actions%20in%20Adaptive%20Cards%20-%20Deck.pptx&baseUrl=https%3A%2F%2Fmicrosoft.sharepoint.com%2Fteams%2FActionPlatform&serviceName=teams&threadId=19:f8fbfc4d89e24ef5b3b8692538cebeb7@thread.skype&groupId=ae063b79-5315-4ddb-ba70-27328ba6c31e`
