---
title: Create conversational tabs
author: surbhigupta
description: Create conversational sub-entity chat for your channel tabs
keywords: teams tabs channel configurable 
ms.topic: conceptual
ms.author: lomeybur
ms.localizationpriority: none
---

# Create conversational tabs

Conversational sub-entities provides a way to allow users to have conversations about sub-entities in your tab, such as specific task, patient, and sales opportunity, instead of discussing the entire tab, also known as entity. A traditional channel or configurable tab allows the user to have a conversation about a tab, but the user requires a more focused conversation. The requirement for a more focused conversation can arise either, if there is too much content to have a centralized discussion or because the content changed over time, making the conversation irrelevant to the content being shown. Conversational sub-entities provides a much more focused conversation experience for dynamic tabs.

Conversational sub-entities are only supported in channels. They can be used from a personal or static tab to create or continue conversations in tabs that are already pinned to a channel. The static tab is useful if you want to provide one location for a user to view and access conversations happening across multiple channels.

## Prerequisites

In order to support conversational sub-entities, your tab web application must have the ability to store a mapping between sub-entities ↔ conversations in a backend database. The `conversationId` is provided, but you must store that `conversationId` and return it to Teams in order for users to continue the conversation.

## Start a new conversation

To start a new conversation, use the `openConversation()` function. Starting and continuing a conversation are all handled by this method. The inputs to the function change depending on which action you want to take. From the users perspective, this opens the conversation panel to the right of the screen, either to initiate a conversation or continue a conversation.

``` javascript
microsoftTeams.conversations.openConversation(openConversationRequest);
```

**openConversation** takes the following inputs to start a conversation in a channel:

* **subEntityId**: This is the ID of your specific sub-entity. For example, task-123.
* **entityId**: This is the ID of the tab instance when it was created. The ID is important to refer back to the same tab instance.
* **channelId**: This is the channel in which the tab instance resides.
   > [!NOTE]
   > The **channelId** is optional for channel tabs. However, it is recommended if you want to keep your implementation across channel and static tabs the same.
* **title**: This is the title that is shown to the user in the chat panel.

Most of these values can also be retrieved from the `getContext` API.

```javascript
microsoftTeams.conversations.openConversation({“subEntityId”:”task-1”, “entityId”: “tabInstanceId-1”, “channelId”: ”19:baa6e71f65b948d189bf5c892baa8e5a@thread.skype”, “title”: "Task Title”});
```

The following image shows the conversation panel:

![Conversational sub-entities - start conversation](~/assets/images/tabs/conversational-subentities/start-conversation.png)

If the user starts a conversation, it is important to listen for the callback of that event in order to retrieve and save the **conversationId**:

```javascript
microsoftTeams.conversations.onStartConversation = (conversationResponse) => {
    // console.log(conversationReponse.conversationId)
};
```

The `conversationResponse` object contains information related to the conversation that was started. It is recommended that you save all the properties of this response object for later use.

## Continue a conversation

After a conversation starts, subsequent calls to `openConversation()` requires that you also provide the same inputs as in [start a new conversation](#start-a-new-conversation), but also include the **conversationId**. The conversation panel opens for the users with the appropriate conversation in view. Users are able to see new or incoming messages in real-time.

The following image shows the conversation panel with the appropriate conversation:

![Conversational sub-entities - continue conversation](~/assets/images/tabs/conversational-subentities/continue-conversation.png)

## Enhance a conversation

It is important that your tab includes [deeplinks to your sub-entity](~/concepts/build-and-test/deep-links.md). For example, user selecting the tab chiclet deeplink from the channel conversation. The expected behavior is to receive the deeplink, open that sub-entity, and then open the conversation panel for that sub-entity.

To support conversational sub-entities from your personal or static tab, you do not have to change anything in your implementation. We only support starting or continuing conversations from channel tabs that are already pinned. Supporting static tabs allows you to provide a single location for your users to interact with all your sub-entities. It is important that you save the `subEntityId`, `entityId`, and `channelId` when your tab is originally created in a channel to have the right properties when opening the conversation view in a static tab.

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
|Create Conversational tab|	Microsoft Teams tab sample app for demonstrating create conversation tab. |	[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-conversations/csharp)	|  [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-conversations/nodejs) |

## See also

* [Teams tabs](~/tabs/what-are-tabs.md)
* [Create a personal tab](~/tabs/how-to/create-personal-tab.md)
* [Create a channel or group tab](~/tabs/how-to/create-channel-group-tab.md)
* [Tabs on mobile](~/tabs/design/tabs-mobile.md)
* [Build tabs with Adaptive Cards](~/tabs/how-to/build-adaptive-card-tabs.md)

## Next step

> [!div class="nextstepaction"]
> [Tab margin changes](~/resources/removing-tab-margins.md)