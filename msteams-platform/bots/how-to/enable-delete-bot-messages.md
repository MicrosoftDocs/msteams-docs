---
title: Enable Delete Bot Messages
description: Learn how to enable users to delete bot messages.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: medium
ms.date: 03/12/2025
---

# Enable users to delete bot messages

Bot users can now delete bot messages in group chats. Developers can enable this feature, allowing users to remove Group Copilot bot messages to eliminate unintended or sensitive content.

Here are some use cases for enabling the users of a bot app to delete bot messages:

| Use case | How the ability to delete the message helps |
| --- | --- |
| **Context**: Confidential information was initially shared with the original group members, but external participants were later added who shouldn't have access to it. <br> **Problem**: When users search for related information in the chat, confidential information is visible to external users who don't have permission to view it, posing a risk of unauthorized access to sensitive data. | **Solution**: Any valid user can delete information not meant for all group chat members, ensuring confidential information remains protected and accessible only to authorized users. <br> **Steps**: <br> 1. A user shares confidential information in a group chat. <br> 2. Over time, external users are added to the group chat. <br> 3. The confidential information becomes visible to these external users during searches. <br> 4. A valid user identifies the unauthorized access and deletes the confidential information from the chat. <br> 5.The deletion prevents external users from viewing the confidential information, maintaining data security. |
| **Context**: A user requests a conversation summary, but the bot encounters an error and generates excessive error logs that dominate the chat. <br> **Problem**: The error logs dominate the chat, creating a poor user experience and cluttering the conversation with irrelevant information. | **Solution**: The user deletes the error logs and submits feedback about the poor bot experience, maintaining a clean chat environment and providing valuable feedback for improvement. <br> **Steps**: <br> 1. A user requests the bot to create a summary of the conversation. <br> 2. The bot encounters an error while completing the action. <br> 3. The bot generates unnecessary error logs that take over the chat. <br> 4. The user deletes the message containing the error logs. <br> 5. The user submits feedback about the error and the poor bot experience. 6. The feedback is used to improve the bot's performance and prevent similar issues in the future. |

## Delete bot message user experience

All users in any chat can delete messages in the following scopes:

- personal
- group chat
- channel
- meeting chat

If a bot's response is inaccurate or compromises sensitive information, any user can delete the bot using the overflow **Delete** option.

# [Deleting messages in personal chat](#tab/personal)

[Add gif file]

# [Deleting messages in group chat](#tab/group)

[Add gif file]

# [Deleting messages in mobile device](#tab/mobile)

:::image type="content" source="../../assets/images/bots/delete-message-mobile.png" alt-text="Image shows the user experience of deleting a bot message in a mobile client":::

---

After a message is deleted:

- When the user deletes the message, the bot app prompts the user to submit feedback about the reason of deleting the bot message. In case the reason of deleting the bot message is bot performance, the feedback is used to improve bot performance.
- The deleted message is removed for all users.
- An indication of the deleted message appears instead of the message.

  :::image type="content" source="../../assets/images/bots/message-delete-undo.png" alt-text="Image shows the indication of deleted message and the Undo button.":::

- The users of the group chat have the ability to undo the deletion, however, the undoing a delete message is available for a limited time.

> [!NOTE]
> The users can't delete bot messages on mobile client.

## Enable users to delete bot messages in your bot app

To enable the users to delete bot messages, you need to:

- [Update app manifest](#update-app-manifest)
- [Enable users to delete message in Admin Center](#enable-users-to-delete-bot-messages-in-admin-center)

### Update app manifest

Enabling bot app users to delete bot messages is an optional feature for a bot.
To update the app manifest for your bot app:

1. Open the app manifest file.
1. Update the `allowBotMessageDeleteByUser` property in the `manifest.json` to `true`.

    The following code snippet shows an example of app manifest update:

    ```json
    { 
      id: "Id", 
      name: "Contoso", 
      largeImageUrl: "Contoso", 
      validDomains: null, 
      externalId: null, 
      bots: [{ 
            id: "bot-id", 
            scopes: [], 
            capabilities: { 
              __typename: "BotCapabilities", 
              isNotificationOnly: true, 
              supportsFiles: false, 
            }, 
        allowBotMessageDeleteByUser: true
        }],
      manifestVersion: null, 
    }   
    ```

### Enable users to delete bot messages in Admin Center

The Admin must enable the bot users to delete messages in the tenant where the bot app is installed.

[Add image from Admin center]
[Add link to Admin center docs]

## See also

- [Link to end user document]
