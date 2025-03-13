---
title: Enable Delete Bot Messages
description: Learn how to enable users to delete bot messages.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: medium
ms.date: 03/12/2025
---

# Enable users to delete bot messages

You can now enable bot users to delete bot messages in a group chat. As a developer, when you enable deleting bot messages for users, they're able to delete Group Copilot bot messages in chat threads to remove unintended or sensitive content. All users in any chat can delete messages using the **Delete** option in the overflow menu.

Here are some use cases for enabling the users of a bot app to delete bot messages:

| Use case | How the ability to delete the message helps |
| --- | --- |
| **Context**: A group chat user initially shared confidential information intended only for the original group members. However, over time, other users added external participants to the group chat who shouldn't have access to this confidential information. <br> **Problem**: When a user searches for related information within the chat, the confidential information appears for the external users also who don't have permission to view it. It's risk of unauthorized access to sensitive data. | **Solution**: To address this issue, any valid user who notices this concern should be able to delete the information that isn't meant for all group chat members. This solution ensures that confidential information remains protected and only accessible to authorized users. <br> **Steps**: <br> 1. A user shares confidential information in a group chat. <br> 2. Over time, external users are added to the group chat. <br> 3. The confidential information becomes visible to these external users during searches. <br> 4. A valid user identifies the unauthorized access and deletes the confidential information from the chat. <br> 5.The deletion prevents external users from viewing the confidential information, maintaining data security. |
| **Context**: A user requests the bot to create a summary of the conversation. However, while the bot is completing the action, it encounters an error and generates unnecessary error logs that dominate the chat. <br> **Problem**: The error logs take over the chat, creating a poor user experience and cluttering the conversation with irrelevant information. | **Solution**: To address this issue, the user deletes the message containing the error logs and submits feedback about the error and the poor bot experience. This helps maintain a clean chat environment and provides valuable feedback for improving the bot's performance. <br> **Steps**: <br> 1.A user requests the bot to create a summary of the conversation. <br> 2. The bot encounters an error while completing the action. <br> 3. The bot generates unnecessary error logs that take over the chat. <br> 4. The user deletes the message containing the error logs. <br> 5. The user submits feedback about the error and the poor bot experience. 6. The feedback is used to improve the bot's performance and prevent similar issues in the future. |

## Delete bot message user experience

All users in any chat containing Group Copilot should have the ability to delete messages from Chat Copilot using the overflow **Delete** option. After a user deletes a bot message, it's removed for all users. The deleted message is replaced with an indication that the message is deleted along with the name of the user who deleted it.

The users of the group chat have the ability to undo the deletion, however, the undoing a delete message is available for a limited time.
