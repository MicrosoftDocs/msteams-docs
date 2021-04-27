---
title: Overview of universal actions for Adaptive Cards
description: A quick overview of universal actions for Adaptive Cards.
ms.topic: overview
---

# Universal actions for Adaptive Cards

Universal actions for Adaptive Cards evolved from developer feedback that even though layout and rendering for Adaptive Cards was universal, action handling was not. Even if a developer wanted to send the same card to different places, they would have to handle actions differently.

With the Universal actions for Adaptive Cards, this problem is now addressed with bot becoming the common backend for handling actions. Also the problem is addressed with the introduction of the new action type, `Action.Execute`, which works across apps starting from Teams and Outlook.

This document helps you to understand how you can use the universal actions for Adaptive Cards to enhance user experience of interacting with Adaptive Cards across platforms and applications.

**Note:** Support for Universal Action Model is only available for cards sent by bot. Support for cards sent through compose box and link unfurling cards will be available soon.

## Enhance user experience with universal actions for Adaptive Cards

Universal actions for Adaptive Cards enhances user experience by enabling the following scenarios:

* [Universal actions](#universal-actions)
* [Contextual or user specific views](#contextual-or-user-specific-views)
* [Sequential workflow support](#sequential-workflow-support)
* [Up-to-date views](#up-to-date-views)

### Universal actions

Before the universal actions for Adaptive Cards, different hosts provided different action models as follows:

* Teams or bots used `Action.Submit`, an approach which defers the actual communication model to the underlying channel.
* Outlook used `Action.Http` to communicate with the backend service explicitly specified in the Adaptive Card payload.

![Inconsistent action model](~/assets/images/bots/inconsistent-action-model.png)

With the universal actions for adaptive cards, you can use `Action.Execute` for action handling across different platforms. `Action.Execute` works across hubs including Teams and Outlook. Moreover, an Adaptive Card can be returned as response for an `Action.Execute` triggered invoke request.

![New universal action model](~/assets/images/bots/Newuniversalactionmodel.png)

This means you can now send the same card to both Teams and Outlook and keep them in sync with each other using the underlying bot. Any action taken on either platform is reflected to the other with this build once, deploy anywhere model.

![Same card to Teams and Outlook](~/assets/images/bots/TeamsandOutlook.png)

### Contextual or user specific views

Today every user in the Teams chat or channel sees the exact same view and button actions on the Adaptive Card. However, in certain scenarios there is a requirement for certain users to act differently and have access to different information within the same chat or channel.

For example, in the case of an incident reporting card sent in a chat or channel, only the user who is assigned the incident should see a **Resolve** button. On the other hand, the incident creator should see an **Edit** button and all other users must only be able to view details of the incident. This is made possible by contextual views that is enabled by the refresh property. The following image shows an example of a ticketing messaging extension (ME) where different users in the chat are shown different actions based on the requirement:

![user specific views](~/assets/images/bots/Rolebasedviews.png)

For more information, see [sample for contextual or user specific views](User-Specific-Views.md).

### Sequential workflow support

With sequential workflow support, users can progress through a series of workflows without sending different cards separately. This is made possible by the ability of `Action.Execute` to return an Adaptive Card in response to an action. Also, any user in the chat or channel can progress through their workflow without modifying the card for other users in the chat.

The following images illustrate a food ordering bot example: <br/>

<img src="~/assets/images/bots/sequentialWorkflow.gif" alt="Sequential workflow" width="400"/>

![Catering bot states](~/assets/images/bots/Cateringbotstates.png)

For more information, see [sample for sequential workflow](Sequential-Workflows.md).

### Up-to-date views

You can create Adaptive Cards that update automatically. For example, it can be an approval request sent by a user. After approval, the card must automatically display details about the request approval time and who approved the request. The refresh model enables you to provide such up-to-date views.

![Up-to-date-user specific-views-1](~/assets/images/bots/up-to-date-views-stage1.png)
![Up-to-date-user specific-views-2](~/assets/images/bots/up-to-date-views-stage2.png)
![Up-to-date-user specific-views-3](~/assets/images/bots/up-to-date-views-stage3.png)

For more information, see [sample for up-to-date views](Up-To-Date-Views.md).

Now you can understand how Adaptive Cards can be transformed with the new universal actions for Adaptive Cards to provide a unique and enhanced user experience.

## Adaptive Cards and the new universal actions for Adaptive Cards

Adaptive Cards are a combination of content, such as text and graphics, and actions that can be performed by a user. You can add Adaptive Cards to a conversation through a bot or messaging extension. For more information, see [Adaptive Cards](http://adaptivecards.io/). The new universal actions for Adaptive Cards enables a common handling of the Adaptive Card actions across platforms and applications. For more information, see [universal actions for Adaptive Cards](https://docs.microsoft.com/adaptive-cards/authoring-cards/universal-action-model).

The Work with universal actions for Adaptive Cards document takes you through the steps to use the capabilities of universal actions for Adaptive Cards for your solution.

## See also

* [What are bots](~/bots/what-are-bots.md)
* [Adaptive Cards overview](~/task-modules-and-cards/what-are-cards.md)
* [Adaptive Cards @ Microsoft Build 2020](https://youtu.be/hEBhwB72Qn4?t=1393)
* [Adaptive Cards @ Ignite 2020](https://techcommunity.microsoft.com/t5/video-hub/elevate-user-experiences-with-teams-and-adaptive-cards/m-p/1689460)
* [FAQs](FAQs.md)

## Next step

> [!div class="nextstepaction"]
> [Work with universal actions for Adaptive Cards](Work-with-universal-actions-for-adaptive-cards.md)
