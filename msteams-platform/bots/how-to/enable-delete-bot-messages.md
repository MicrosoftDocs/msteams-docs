---
title: Enable Delete Bot Messages
description: Learn how to enable users to delete bot messages.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: medium
ms.date: 03/12/2025
---

# Enable users to delete bot messages

> [!NOTE]
> Enabling deleting bot message for bot app user is available only in [public developer preview for Teams](../../resources/dev-preview/developer-preview-intro.md).

Bot users can now delete bot messages in any bot conversation. You can enable this feature, allowing users to remove bot messages. It allows you to:

* **Protect unintended content**: Users can delete bot messages to eliminate unintended or sensitive content to ensure confidential information remains protected. Here's a user scenario that demonstrates this:

    <details>
    <summary>Select to view a use case</summary>

    | Use case | How deleting the message helps |
    | --- | --- |
    | **Context**: A user requests a conversation summary, but the bot encounters an error and generates incomplete summary the chat. <br><br> **Problem**: The erroneous summary creates a poor user experience and cluttering the conversation with irrelevant information. | **Solution**: The user deletes the message with errors and submits feedback about the poor bot experience for improvement. |

    </details>

* **Remove incorrect information**: Users can delete messages that contain inaccurate or erroneous information.

    <details>
    <summary>Select to view a use case</summary>

    | Use case | How deleting the message helps |
    | --- | --- |
    | **Context**: Confidential information was initially shared with the original group members, but external participants were later added who shouldn't have access to it. <br><br> **Problem**: When users search for related information in the chat, confidential information is visible to external users who don't have permission to view it, posing a risk of unauthorized access to sensitive data. | **Solution**: Any valid user can delete information not meant for all group chat members.  This ensures that confidential information stays secure and is only accessible to authorized users. |

    </details>

Maintaining a clean chat environment enhances user experience and helps keep the conversation contextually relevant.

<!--
| Use case | How deleting the message helps |
| --- | --- |
| **Sensitive or confidential information shared in group chat** <br><br> **Context**: Confidential information was initially shared with the original group members, but external participants were later added who shouldn't have access to it. <br><br> **Problem**: When users search for related information in the chat, confidential information is visible to external users who don't have permission to view it, posing a risk of unauthorized access to sensitive data. | **Solution**: Any valid user can delete information not meant for all group chat members.  This ensures that confidential information stays secure and is only accessible to authorized users. <br> **Steps**: <br> 1. A user shares confidential information in a group chat. <br> 2. Over time, external users are added to the group chat. <br> 3. The information becomes visible to these external users during searches. <br> 4. A valid user identifies the unauthorized access and deletes the sensitive information from the chat. <br> 5.The deletion prevents external users from viewing the confidential information, maintaining data security. |
| **Incorrect or erroneous bot response in 1:1 chat** <br><br> **Context**: A user requests a conversation summary, but the bot encounters an error and generates excessive error logs that dominate the chat. <br><br> **Problem**: The error logs dominate the chat, creating a poor user experience and cluttering the conversation with irrelevant information. | **Solution**: The user deletes the message with error logs and submits feedback about the poor bot experience for improvement. <br> **Steps**: <br> 1. A user requests the bot to create a summary of the conversation. <br> 2. The bot encounters an error while completing the action. <br> 3. The bot generates unnecessary error logs that take over the chat. <br> 4. The user deletes the message containing the error logs. <br> 5. The user submits feedback about the error and the poor bot experience. 6. The feedback is used to improve the bot's performance and prevent similar issues in the future. |

Here are some user scenarios for enabling bot users to delete messages:

# [Deleting messages in personal chat](#tab/personal1)

**Incorrect or erroneous bot response in 1:1 chat**

| Use case | How deleting the message helps |
| --- | --- |
| **Context**: A user requests a conversation summary, but the bot encounters an error and generates incomplete summary the chat. <br><br> **Problem**: The erroneous summary creates a poor user experience and cluttering the conversation with irrelevant information. | **Solution**: The user deletes the message with errors and submits feedback about the poor bot experience for improvement. |

# [Deleting messages in group chat](#tab/group1)

**Sensitive or confidential information shared in group chat**

| Use case | How deleting the message helps |
| --- | --- |
| **Context**: Confidential information was initially shared with the original group members, but external participants were later added who shouldn't have access to it. <br><br> **Problem**: When users search for related information in the chat, confidential information is visible to external users who don't have permission to view it, posing a risk of unauthorized access to sensitive data. | **Solution**: Any valid user can delete information not meant for all group chat members.  This ensures that confidential information stays secure and is only accessible to authorized users. |

---
-->

## Delete bot message user experience

Users in any bot conversation can delete messages in the following scopes:

* Personal
* Group chat
* Channel
* Meeting chat

The desktop and mobile clients offer a consistent user experience. Here are some examples of user experience in personal and group chat for desktop and mobile client:

# [Deleting messages in personal chat](#tab/personal2)

[Add gif file]

# [Deleting messages in group chat](#tab/group)

[Add gif file]

# [Deleting messages in mobile device](#tab/mobile2)

:::image type="content" source="../../assets/images/bots/delete-message-mobile.png" alt-text="Image shows the user experience of deleting a bot message in a mobile client":::

---

When a user hovers over a bot message, the **Delete** option in the overflow menu appears. Using this option, the user can delete that bot message. After a message is deleted:

1. The bot app prompts users to submit feedback with the reason for deleting a bot message. If the reason is an incorrect bot response, the feedback helps improve bot performance.
1. The deleted message is removed for all users and doesn't appear in searches.
1. An indication replaces the deleted message as shown in the following example:

    :::image type="content" source="../../assets/images/bots/message-delete-undo.png" alt-text="Image shows the indication of deleted message and the Undo option.":::

Bot app users can undo deletions in case a message was deleted by mistake. However, the **Undo** option is available for a limited time.

## Enable users to delete bot messages in your bot app

Allowing bot users to delete messages is optional. To add this feature to a bot, it must be enabled in the app and in the tenant. Enable this feature for your bot app using the following two mandatory configurations:

* [Update app manifest](#update-app-manifest) to enable it in the app.
* [Configure in the Admin Center](#configure-in-the-admin-center) to enable it in the tenant.

### Update app manifest

To enable the option of allowing bot users to delete messages, update the app manifest as follows:

1. Open the `manifest.json` file.
1. Set the `allowBotMessageDeleteByUser` property to `true`.

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
            "scopes": [
                "personal",
                "groupChat"
            ], 
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

1. Save the updates.

### Configure in the Admin Center

If your bot app has opted for this feature, users can delete messages only after the Admin enables it for the app in the tenant.

> [!NOTE]
> Ensure that you update the app description for your app to inform the user about enabling the feature in the Admin Center if they want to enable the users in the tenant to delete bot messages. This is crucial to get the approval for your app from Teams Store validation.

:::image type="content" source="../../assets/images/bots/admin-center-config.png" alt-text="Image shows the configuration required in the Admin Center to enable the feature.":::

For more information, see [Add link to Admin docs].

## See also

* [Link to end user document]
* [Custom engine agent user experience](teams-conversational-ai/ai-ux.md)
* [Enhance AI-generated bot messages](bot-messages-ai-generated-content.md)
