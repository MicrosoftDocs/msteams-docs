---
title: Create conversational tabs
author: surbhigupta
description: In this module, learn to create conversational subentity chat for your channel tabs, to manage conversations using code samples
ms.topic: conceptual
ms.author: lomeybur
ms.localizationpriority: medium
---

# Create conversational tabs

Conversational subentities provide a way to allow users to have conversations about subentities in your tab. Such as specific task, patient, and sales opportunity, instead of discussing the entire tab, also known as entity. A traditional channel or configurable tab allows the user to have a conversation about a tab, but the user requires a more focused conversation. The requirement for a more focused conversation can arise either, if there is too much content to have a centralized discussion or because the content changed over time, making the conversation irrelevant to the content shown. Conversational subentities provide a much more focused conversation experience for dynamic tabs.

Conversational subentities are only supported in channels. They can be used from a personal or static tab to create or continue conversations in tabs that are already pinned to a channel. The static tab is useful if you want to provide one location for a user to view and access conversations happening across multiple channels.

## Prerequisites

To support conversational subentities, your tab web application must have the ability to store a mapping between subentities ↔ conversations in a backend database. The `conversationId` is provided, but you must store that `conversationId` and return it to Teams in order for users to continue the conversation.

## Start a new conversation

To start a new conversation, use the `openConversation()` function. Starting and continuing a conversation are all handled by this method. The inputs to the function change depending on which action you want to take, from the user's perspective, this opens the conversation panel to the right of the screen, either to initiate a conversation or continue a conversation.

``` javascript
microsoftTeams.conversations.openConversation(openConversationRequest);
```

**openConversation** takes the following inputs to start a conversation in a channel:

* **subEntityId**: The ID of your specific subentity. For example, task-123.
* **entityId**: The ID of the tab instance when it was created. The ID is important to refer back to the same tab instance.
* **channelId**: The channel in which the tab instance resides.
   > [!NOTE]
   > The **channelId** is optional for channel tabs. However, it is recommended if you want to keep your implementation across channel and static tabs the same.
* **title**: The title that is shown to the user in the chat panel.

Most of these values can also be retrieved from the `getContext` API.

```javascript
microsoftTeams.conversations.openConversation({“subEntityId”:”task-1”, “entityId”: “tabInstanceId-1”, “channelId”: ”19:baa6e71f65b948d189bf5c892baa8e5a@thread.skype”, “title”: "Task Title”});
```

The following image shows the conversation panel:

:::image type="content" source="../../assets/images/tabs/conversational-subentities/start-conversation.png" alt-text="start-conversations":::

If the user starts a conversation, it's important to listen for the callback of that event to retrieve and save the **conversationId**:

```javascript
microsoftTeams.conversations.onStartConversation = (conversationResponse) => {
    // console.log(conversationReponse.conversationId)
};
```

The `conversationResponse` object contains information related to the conversation that was started. It's recommended that you save all the properties of this response object for later use.

## Continue a conversation

After a conversation starts, subsequent calls to `openConversation()` require, that you also provide the same inputs as in [start a new conversation](#start-a-new-conversation), but also include the **conversationId**. The conversation panel opens for the users with the appropriate conversation in view. Users can see new or incoming messages in real-time.

The following image shows the conversation panel with the appropriate conversation:

:::image type="content" source="../../assets/images/tabs/conversational-subentities/continue-conversation.png" alt-text="continue-conversations":::

## Enhance a conversation

It's important that your tab includes [deep links to your subentity](~/concepts/build-and-test/deep-links.md). For example, user selecting the tab chiclet deep link from the channel conversation. The expected behavior is to receive the deep link, open that subentity, and then open the conversation panel for that subentity.

To support conversational subentities from your personal or static tab, you don't have to change anything in your implementation. We only support starting or continuing conversations from channel tabs that are already pinned. Supporting static tabs allows you to provide a single location for your users to interact with all your subentities. It's important that you save the `subEntityId`, `entityId`, and `channelId` when your tab is originally created in a channel to have the right properties when opening the conversation view in a static tab.

## Close a conversation

You can manually close the conversation view by calling the `closeConversation()` function.

```javascript
microsoftTeams.conversations.closeConversation();
```

You can also listen for an event when the conversation view is closed by a user.

```javascript
microsoftTeams.conversations.onCloseConversation = (conversationResponse) => {
    // console.log(conversationResponse)
};
```

## Code sample

| Sample name | Description | C# |Node.js|
|-------------|-------------|------|----|
|Create Conversational tab| Microsoft Teams tab sample app for demonstrating create conversation tab. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-conversations/csharp) |  [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-conversations/nodejs) |

## Next step

> [!div class="nextstepaction"]
> [Tab margin changes](~/resources/removing-tab-margins.md)

## See also

* [Teams tabs](~/tabs/what-are-tabs.md)
* [Create a personal tab](~/tabs/how-to/create-personal-tab.md)
* [Create a channel or group tab](~/tabs/how-to/create-channel-group-tab.md)
* [Tabs on mobile](~/tabs/design/tabs-mobile.md)
* [Build tabs with Adaptive Cards](~/tabs/how-to/build-adaptive-card-tabs.md)
