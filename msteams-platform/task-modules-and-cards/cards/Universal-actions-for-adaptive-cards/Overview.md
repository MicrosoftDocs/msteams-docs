---
title: Overview of universal actions for adaptive cards
description: A quick overview of universal actions for adaptive cards.
ms.topic: overview
---

# Universal actions for adaptive cards

Universal actions for adaptive cards evolved from developer feedback that even though layout and rendering for adaptive cards was universal, action handling was not. Even if a developer wanted to send the same card to different places, they would have to handle actions differently.

With the Universal actions for adaptive cards, this problem is now addressed with bot becoming the common backend for handling actions along with the introduction of the new action type, `Action.Execute`, which would work across apps starting from Teams and Outlook.

This document helps you to understand how you can use the universal actions for adaptive cards to enhance user experience of interacting with adaptive cards across platforms and applications.

## Enhance user experience with universal actions for adaptive cards

Universal actions for adaptive cards enhances user experience by enabling the following scenarios:

* [Universal actions](#universal-actions)
* [Contextual or role based views](#contextual-or-role-based-views)
* [Sequential workflow support](#sequential-workflow-support)
* [Up-to-date views](#up-to-date-views)

### Universal actions

Before the universal actions for adaptive cards, different hosts provided different action models as follows:

* Teams or bots used `Action.Submit`, an approach which defers the actual communication model to the underlying channel.
* Outlook used `Action.Http` to communicate with the backend service explicitly specified in the adaptive card payload.

![Inconsistent action model](~/assets/images/bots/inconsistent-action-model.png)

With the universal actions for adaptive cards, you can use `Action.Execute` for action handling throughout different platforms.

![New universal action model](~/assets/images/bots/Newuniversalactionmodel.png)

This means you can now send the same card to both Teams and Outlook and keep them in sync with each other using the underlying bot. Any action taken on either platform is reflected to the other with this build once, deploy anywhere model.

![Same card to Teams and Outlook](~/assets/images/bots/TeamsandOutlook.png)

### Contextual or role-based views

Today every user in the Teams chat or channel sees the exact same view and button actions on the adaptive card. However, in certain scenarios there is a requirement for certain users to act differently and have access to different information within the same chat or channel. For example, in the case of an incident reporting card sent in a chat or channel, only the user who is assigned the incident should see a resolve button. On the other hand the incident creator should see am edit button and all other users must only be able to view details of the incident. This is made possible by contextual views that is enabled by the refresh property. The following image shows an example of a Ticketing ME where different users in the chat are shown different actions based on the requirement.

![Role-based views](~/assets/images/bots/Rolebasedviews.png)

[Sample for contextual or role based views](~/Role-Based-Views.md)

### Sequential workflow support

With sequential workflow support, users can progress through a series of workflows without sending different cards separately. This is made possible by the ability of `Action.Execute` to return an adaptive card in response to an action. Also, any user in the chat or channel can progress through their workflow without modifying the card for other users in the chat. The following images illustrate a food ordering bot example:


<img src="~/assets/images/bots/sequentialWorkflow.gif" alt="Sequential workflow" width="400"/>

![Catering bot states](~/assets/images/bots/Cateringbotstates.png)

[Sample for sequential workflow](~/Sequential-Workflows.md)

### Up-to-date views

You can create adaptive cards that update automatically, for example, it can be an approval request sent by a user. After approval, the card must automatically display details about the request approval time and who approved the request. The refresh model enables you to provide such up-to-date views.

![Up-to-date-role-based-views-1](~/assets/images/bots/up-to-date-views-stage1.png)
![Up-to-date-role-based-views-2](~/assets/images/bots/up-to-date-views-stage2.png)
![Up-to-date-role-based-views-3](~/assets/images/bots/up-to-date-views-stage3.png)
``
[Sample for up to date views](~/Up-To-Date.md)

Now you can understand how adaptive cards can be transformed with the new universal actions for adaptive cards to provide a unique and enhanced user experience.

## Adaptive cards and the new universal actions for adaptive cards

Adaptive cards are a combination of content, such as text and graphics, and actions that can be performed by a user. You can add adaptive cards to a conversation through a bot or messaging extension. For more information, see [adaptive cards](http://adaptivecards.io/). The new universal actions for adaptive cards enables a common handling of the adaptive card actions across platforms and applications. For more information, see [universal actions for adaptive cards](https://docs.microsoft.com/adaptive-cards/authoring-cards/universal-action-model).

The next section will take you through the steps to use the capabilities of universal actions for adaptive cards for your solution.

## See also

* [What are bots](~/bots/what-are-bots.md)
* [Adaptive cards overview](~/task-modules-and-cards/what-are-cards.md)
* [Adaptive cards @ Microsoft Build 2020](https://youtu.be/hEBhwB72Qn4?t=1393)
* [Adaptive cards @ Ignite 2020](https://techcommunity.microsoft.com/t5/video-hub/elevate-user-experiences-with-teams-and-adaptive-cards/m-p/1689460)

## Next step

> [!div class="nextstepaction"]
> [Work with universal actions for adaptive cards](Work-with-universal-actions-for-adaptive-cards.md)
