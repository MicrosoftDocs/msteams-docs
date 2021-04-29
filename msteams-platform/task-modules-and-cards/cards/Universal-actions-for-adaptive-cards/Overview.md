---
title: Overview of Universal Actions for Adaptive Cards
description: A quick overview of Universal Actions for Adaptive Cards.
ms.topic: overview
localization_priority: Normal
---

# Universal Actions for Adaptive Cards

Universal Actions for Adaptive Cards evolved from developer feedback that even though layout and rendering for Adaptive Cards was universal, action handling was not. Even if a developer wanted to send the same card to different places, they have to handle actions differently.

Universal Actions for Adaptive Cards brings the bot as the common backend for handling actions and introduces a new action type, `Action.Execute`, which works across apps, such as Teams and Outlook.

This document helps you to understand how you can use Universal Actions model to enhance user experience of interacting with Adaptive Cards across platforms and applications.

> [!NOTE]
> Support for Universal Actions for Adaptive Cards is only available for cards sent by bot. Support for cards sent through compose box and link unfurling cards is coming soon.

## Enhance user experiences with Universal Actions for Adaptive Cards

Universal Actions for Adaptive Cards enhances user experience by enabling the following scenarios:

* [Universal Actions](#universal-actions)
* [User Specific Views](#user-specific-views)
* [Sequential Workflow support](#sequential-workflow-support)
* [Up to date views](#up-to-date-views)

### Universal Actions

Before the Universal Actions for Adaptive Cards, different hosts provided different action models as follows:

* Teams or bots used `Action.Submit`, an approach which defers the actual communication model to the underlying channel.
* Outlook used `Action.Http` to communicate with the backend service explicitly specified in the Adaptive Card payload.

:::image type="content" source="~/assets/images/adaptive-cards/current-teams-outlook-action-model.png" alt-text="Inconsistent action model":::

With the Universal Actions for Adaptive Cards, you can use `Action.Execute` for action handling across different platforms. `Action.Execute` works across hubs including Teams and Outlook. In addition, an Adaptive Card can be returned as response for an `Action.Execute` triggered invoke request.

:::image type="content" source="~/assets/images/adaptive-cards/universal-action-model.png" alt-text="New Universal Actions for Adaptive Cards":::

You can now send the same card to both, Teams and Outlook, and keep them in sync with each other using the underlying bot. Any action taken on either platform is reflected to the other with this *build once, deploy anywhere* model.

:::image type="content" source="~/assets/images/adaptive-cards/universal-bots-teams-outlook.png" alt-text="Same card to Teams and Outlook":::

### User Specific Views

Today every user in the Teams chat or channel sees the exact same view and button actions on the Adaptive Card. However, in certain scenarios there is a requirement for certain users to act differently and have access to different information within the same chat or channel.

For example, if you send an incident reporting card in a chat or channel, only the user who is assigned the incident must see a **Resolve** button. On the other hand, the incident creator must see an **Edit** button and all other users must only be able to view details of the incident. This is made possible by user specific views that is enabled by the `refresh` property. 

The following image shows an example of a ticketing messaging extension (ME) where different users in the chat are shown different actions based on the requirement:

:::image type="content" source="~/assets/images/adaptive-cards/universal-bots-incident-management.png" alt-text="User Specific Views":::

For more information, see [sample for User Specific Views](User-Specific-Views.md).

### Sequential Workflow support

With Sequential Workflow support, users can progress through a series of workflows without sending different cards separately. This is made possible by the ability of `Action.Execute` to return an Adaptive Card in response to an action. Also, any user in the chat or channel can progress through their workflow without modifying the card for other users in the chat.

The following images illustrate a food ordering bot example: <br/>

<img src="~/assets/images/bots/sequentialWorkflow.gif" alt="Sequential Workflow" width="400"/>

:::image type="content" source="~/assets/images/adaptive-cards/universal-bots-catering-bot.png" alt-text="Catering bot states":::

The above image shows the various states for different users in the chat/channel.

For more information, see [sample for Sequential Workflow](Sequential-Workflows.md).

### Up to date views

You can create Adaptive Cards that update automatically. For example, it can be an approval request sent by a user. After approval, the card must automatically display details about the request approval time and who approved the request. The refresh model enables you to provide such up to date views. The following image shows a multi-step approval flow and how the views for different users is shown.

:::image type="content" source="~/assets/images/adaptive-cards/universal-bots-up-to-date-views.png" alt-text="Up to date User Specific Views":::

For more information, see [sample for up to date views](Up To Date Views.md).

Now, you can understand how Adaptive Cards can be transformed with the new Universal Actions model to provide a unique and enhanced user experience.

## Adaptive Cards and the new Universal Actions model

Adaptive Cards are a combination of content, such as text and graphics, and actions that can be performed by a user. For more information, see [Adaptive Cards](http://adaptivecards.io/). The new Universal Actions for Adaptive Cards enables a common handling of the Adaptive Card actions across platforms and applications. For more information, see [Universal Action Model](https://docs.microsoft.com/adaptive-cards/authoring-cards/universal-action-model).

[Work with Universal Actions for Adaptive Cards](Work-with-universal-actions-for-adaptive-cards.md) document takes you through the steps to use the capabilities of Universal Actions for Adaptive Cards for your solution.

## See also

* [What are bots](~/bots/what-are-bots.md)
* [Adaptive Cards overview](~/task-modules-and-cards/what-are-cards.md)
* [Adaptive Cards @ Microsoft Build 2020](https://youtu.be/hEBhwB72Qn4?t=1393)
* [Adaptive Cards @ Ignite 2020](https://techcommunity.microsoft.com/t5/video-hub/elevate-user-experiences-with-teams-and-adaptive-cards/m-p/1689460)

## Next step

> [!div class="nextstepaction"]
> [Work with Universal Actions for Adaptive Cards](Work-with-universal-actions-for-adaptive-cards.md)
