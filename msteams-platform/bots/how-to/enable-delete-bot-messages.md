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
> Enabling users to delete bot messages is available only in [public developer preview for Teams](../../resources/dev-preview/developer-preview-intro.md).

One of the crucial features of a bot app is to ensure that the conversations remain focused and productive. You can enable users to delete bot messages that contain unintended or inaccurate information. This helps maintain a clean and organized chat environment, which enhances the overall user experience. Enabling this feature in your bot app allows users to:

* **Protect sensitive content**: Users can delete bot messages to eliminate confidential or sensitive content to ensure it remains protected.

    <details>
    <summary>Here's a use case</summary>

    | Use case | How deleting the message helps |
    | --- | --- |
    | **Context**: Confidential information was initially shared with the in a group chat. However, external users were later added who shouldn't have access to such information. <br><br> **Problem**: When a user searches for related information in the chat, the confidential information is visible to external users who don't have permission to view it. This is a potential security risk of unauthorized access to sensitive data. | **Solution**: Any user can delete information that isn't meant for all group chat members. This ensures that confidential information stays secure and is accessible only to authorized users. |

    </details>

* **Remove incorrect information**: Users can delete messages that contain inaccurate or erroneous information.

    <details>
    <summary>Here's a use case</summary>

    | Use case | How deleting the message helps |
    | --- | --- |
    | **Context**: A user requests the bot to generate a conversation summary, but the bot encounters an error and generates inaccurate summary of the chat. <br><br> **Problem**: The erroneous summary clutters the conversation. | **Solution**: The user deletes the message with errors and submits feedback about the poor bot experience. |

    </details>

Adding this feature to your bot improves user experience and keeps conversations contextually relevant. All users in a bot conversation can delete bot messages in one-on-one or group chats. The feature offers a consistent experience across both desktop and mobile clients. Here are some examples:

# [1:1 in desktop client](#tab/personal)

:::image type="content" source="../../assets/images/bots/one-on-one-chat.gif" alt-text="Graphical representation shows the process of deleting a bot message in a one-on-one chat in desktop client":::

# [Group chat in desktop client](#tab/group)

:::image type="content" source="../../assets/images/bots/group-chat.gif" alt-text="Graphical representation shows the process of deleting a bot message in a group chat in desktop client":::

# [In mobile client](#tab/mobile)

:::image type="content" source="../../assets/images/bots/delete-message-mobile.png" alt-text="Image shows the process of deleting a bot message in a mobile client":::

---
<!--
When a user hovers over a bot message, the **Delete** option in the overflow menu appears. Using this option, the user can delete that bot message. After a message is deleted:

1. The bot app prompts users to submit feedback with the reason for deleting a bot message. If the reason is an incorrect bot response, the feedback helps improve bot performance.
1. The deleted message is removed for all users and doesn't appear in searches.
1. An indication replaces the deleted message as shown in the following example:

    :::image type="content" source="../../assets/images/bots/message-delete-undo.png" alt-text="Image shows the indication of deleted message and the Undo option.":::
-->
Bot app users can undo deletions in case a message was deleted by mistake. However, the **Undo** option is available for a limited time.

## Enable users to delete bot messages in your bot app

Allowing bot users to delete messages is optional. To add this feature to a bot, it must be enabled in the app and in the tenant. Ensure the following two mandatory configurations to
enable this feature for your bot app:

* [Update app manifest](#update-app-manifest) to enable it in the app.
* [Configure in Admin Center](#configure-in-admin-center) to enable it in the tenant.

### Update app manifest

You can add this functionality to all bots in `personal` and `groupChat` scopes. To enable the option of allowing bot users to delete messages, update the app manifest as follows:

1. Open the `manifest.json` file.
1. Set `scopes` to `personal` or `groupChat` or both.
1. Set `capabilities` to `BotCapabilities`.
1. Set the `allowBotMessageDeleteByUser` property to `true`.

    The following code snippet shows an example of app manifest configuration:

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

### Configure in Admin Center

If your bot app has opted for this feature, users can delete messages only after the administrator enables it for the app in the tenant.

> [!NOTE]
> Ensure that you update the app description to include information about enabling the feature for your bot app in Admin Center. This is required to enable users in the tenant to delete bot messages.

:::image type="content" source="../../assets/images/bots/admin-center-config.png" alt-text="Image shows the configuration required in Admin Center to enable the feature.":::

For more information, see [Add link to Admin docs].

## See also

* [Link to end user document]
* [Custom engine agent user experience](teams-conversational-ai/ai-ux.md)
* [Enhance AI-generated bot messages](bot-messages-ai-generated-content.md)
