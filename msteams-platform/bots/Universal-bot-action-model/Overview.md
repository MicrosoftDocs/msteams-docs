---
title: Overview of universal bot action model
description: A quick overview of universal bot action model.
ms.topic: overview
---

# Universal bot action model

Universal bot action model evolved from developer feedback that even though layout and rendering for adaptive cards was universal, action handling was not. Even if a developer wanted to send the same card to different places, they would have to handle actions differently.

With the Universal bot action model, this problem is now addressed with bot becoming the common backend for handling actions along with the introduction of the new action type, Action.Execute, which would work across apps starting from Teams and Outlook.

This document helps you to understand how you can use the universal bot action model to enhance user experience of interacting with adaptive cards across platforms and applications.

## Enhance user experience with universal bot action model

Universal bot action model enhances user experience by enabling the following scenarios:

* [Universal actions](#universal-actions)
* [Contextual or role based views](#contextual-or-role-based-views)
* [Sequential workflow support](#sequential-workflow-support)
* [Up-to-date views](#up-to-date-views)

### Universal actions

Before the universal bot action model, different hosts provided different action models as follows:

* Teams or bots used `Action.Submit`, an approach which defers the actual communication model to the underlying channel.
* Outlook used `Action.Http` to communicate with the backend service explicitly specified in the adaptive card payload.

![Inconsistent action model](~/assets/images/bots/inconsistent-action-model.png)

With the universal bot action model, you can use `Action.Execute` for action handling throughout different platforms.

![New universal action model](~/assets/images/bots/Newuniversalactionmodel.png)

This means you can now send the same card to both Teams and Outlook and keep them in sync with each other using the underlying bot. Any action taken on either platform is reflected to the other with this build once, deploy anywhere model.

![Same card to Teams and Outlook](~/assets/images/bots/TeamsandOutlook.png)

### Contextual or role-based views

Today every user in the Teams chat or channel sees the exact same view and button actions on the adaptive card. However, in certain scenarios there is a requirement for certain users to act differently and have access to different information within the same chat or channel. For example, in the case of an approval request sent in a chat or channel, only the manager or approver must be shown the option to approve or reject and add comments. The other users must only be able to view details of the approval request. This is made possible by contextual views that is enabled by the refresh property. The following image shows an example of a Ticketing ME where different users in the chat are shown different actions based on the requirement.

![Role-based views](~/assets/images/bots/Rolebasedviews.png)

### Sequential workflow support

With sequential workflow support, users can progress through a series of workflows without sending different cards separately. This is made possible by the ability of `Action.Execute` to return an adaptive card in response to action. Also, any user in the chat or channel can progress through their workflow without modifying the card for other users in the chat. The following images illustrate a food ordering bot example:

![Sequential workflow](~/assets/images/bots/Cateringbotstates.png)

![Sequential workflow](~/assets/images/bots/sequentialworkflowsupport.png)

### Up-to-date views

You can create adaptive cards that update automatically, for example, it can be an approval request sent by a user. After approval, the card must automatically display details about the request approval time and who approved the request. The refresh model enables you to provide such up-to-date views.

Now you can understand how adaptive cards can be transformed with the new universal bot action model to provide a unique and enhanced user experience.

## Adaptive cards and the new universal bot action model

Adaptive cards are a combination of content, such as text and graphics, and actions that can be performed by a user. You can add adaptive cards to a conversation through a bot or messaging extension. Adaptive cards are cross-platform and cross-app snippets of the user interface, authored using a lightweight JSON format that apps and services can share. For more information, see [adaptive cards](http://adaptivecards.io/).

The current action model maintains consistency in rendering, whereas actions and their handling differ significantly. In `Action.Http`, requests are made to a web service and in `Action.Submit`, requests are sent to the bot.

The following image shows the lifecycle of the current model:

![Inconsistent action model lifecycle](~/assets/images/bots/inconsistent-action-model-lifecycle.png)

The new universal bot action model enables a common handling of the adaptive card actions across platforms and applications. Using a standard action `Action.Execute` allows the cards to be consistent across hosts.

The following image shows the lifecycle of the new model:

![Universal bot action model lifecycle](~/assets/images/bots/universal-action-model-lifecycle.png)

The next section will take you through the steps to use these capabilities for your solution.

## See also

* [What are bots](~/bots/what-are-bots.md)
* [Adaptive cards overview](~/task-modules-and-cards/what-are-cards.md)
* [Adaptive cards @ Microsoft Build 2020](https://youtu.be/hEBhwB72Qn4?t=1393)
* [Adaptive cards @ Ignite 2020](https://techcommunity.microsoft.com/t5/video-hub/elevate-user-experiences-with-teams-and-adaptive-cards/m-p/1689460)

## Next step

> [!div class="nextstepaction"]
> [Work with universal bot action model](Work-with-universal-bot-action-model.md)
