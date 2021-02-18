---
title: Overview of universal bot action model
description: A quick overview of universal bot action model.
ms.topic: overview
---

# Universal bot action model

A universal bot action model makes adaptive cards available across different platforms and applications through the `Action.Execute` command. For example, the model is available across Outlook, Teams, WebChat, Cortana, Timeline, and so on. In addition to adaptive card layout and rendering, the new model also provides universal action handling.

This document helps you understand the effect of the universal bot action model on the adaptive card and how it is rendered. It also provides a guide on enhanced user experience.

## Adaptive cards and the new universal bot action model

Adaptive cards are a combination of content, such as text and graphics, and actions that can be performed by a user. You can add adaptive cards to a conversation through a bot or messaging extension. Adaptive cards are cross-platform and cross-app snippets of the user interface, authored using a lightweight JSON format that apps and services can share. For more information, see [adaptive cards](http://adaptivecards.io/).

The current action model renders different layouts of adaptive cards. Different layouts are rendered as separate requests are made to web service using `Action.Http` and to bots using `Action.Submit`.

The following image shows the lifecycle of the current model:

![Inconsistent action model lifecycle](~/assets/images/bots/inconsistent-action-model-lifecycle.png)

However, the new universal bot action model enables a common layout of the adaptive card across platforms and applications. A common layout is rendered as a single request is made to the bot using `Action.Execute`.

The following image shows the lifecycle of the new model:

![Universal bot action model lifecycle](~/assets/images/bots/universal-action-model-lifecycle.png)

Now with the universal bot action model you can enhance user experience of interacting with adaptive cards across platforms and applications.

## Enhance user experience with universal bot action model

Universal bot action model enhances user experience with the following:

* [Universal actions](#universal-actions)
* [Contextual views](#contextual-views)
* [Data-driven views](#data-driven-views)
* [Sequential workflow support](#sequential-workflow-support)
* [Refresh model](#refresh-model)
* [Authentication](#authentication)

### Universal actions

Before the universal bot action model, different hosts provided different action models as follows:

* Teams or bots used the `Action.Submit` model, an approach which defers the actual communication model to the underlying channel.
* Windows also used `Action.Submit`, but required a special set of named verbs to be used.
* Outlook used the `Action.Http` model to communicate with the backend service explicitly specified in the adaptive card payload.

>[!NOTE]
> Currently search does not support `Action.Execute`, `Action.Submit`, and `Action.Http`.

![Inconsistent action model](~/assets/images/bots/inconsistent-action-model.png)

With the universal bot action model, you can use the `Action.Execute` command for action handling throughout different platforms.

![New universal action model](~/assets/images/bots/new-universal-action-model.png)

### Contextual or role-based views

In contextual views or role-based views, an adaptive card appears differently to different users. For example, a poll author sees a read-only view of the overall poll results, while a poll responder can take actions and respond to the poll.

![Contextual view](~/assets/images/bots/contextual-views.png)

![Contextual view 2](~/assets/images/bots/contextual-views2.png)

Role-based views include client-side views and server-side views.

#### Client-side views

In client-side views, an adaptive card includes all the information that is displayed across all roles. The card is authored using a templating language and the client binds that template to data including information about the user’s role.

#### Server-side views

In server-side views, the [refresh model](#refresh-model) is a functional alternative to the client-side model. When a card is refreshed, the user can only view information to which they have access to.

### Data-driven views

Data-driven views refer to a model where cards are defined using the following two components:

* An adaptive card template, designed to bind data conforming to a specific format.
* The data to bind the template.

### Sequential workflow support

With sequential workflow, any user part of a chat or channel can take action on their specific adaptive card. This workflow allows the user to take action or respond to cards without modifying the card for other users.

![Sequential workflow](~/assets/images/bots/sequentialworkflow.png)

### Refresh model

With the refresh model, you can create adaptive cards that update automatically, for example, it can be an approval request sent by a user. After approval, the card must automatically display details about the request approval time and who approved the request.

### Authentication

OAuth authentication for universal bot action model uses the existing OAuth model. The OAuth model is provided by the Bot Framework and backed by the Bot Framework token service.

The universal bot action model uses a single adaptive card and operates outside the context of a conversation. Due to this, the ability to initiate the authentication flow from within the adaptive card itself is required. All communication for universal bot action model must be initiated from the client through an invoke. The client must be notified when the authentication flow is completed so that it can request a refreshed view of the card.

## See also

* [What are bots](~/bots/what-are-bots.md)
* [Adaptive cards overview](~/task-modules-and-cards/what-are-cards.md)
* [Adaptive cards @ Microsoft Build 2020](https://youtu.be/hEBhwB72Qn4?t=1393)
* [Adaptive cards @ Ignite 2020](https://techcommunity.microsoft.com/t5/video-hub/elevate-user-experiences-with-teams-and-adaptive-cards/m-p/1689460)

## Next step

> [!div class="nextstepaction"]
> [Work with universal bot action model](Work-with-universal-bot-action-model.md)
