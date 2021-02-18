---
title: Overview of universal bot action model
description: A quick overview of universal bot action model.
ms.topic: overview
---

# Universal bot action model

A universal bot action model makes adaptive cards available across different platforms and applications through one `Action.Execute` command. The model is available across Outlook, Teams, WebChat, Cortana, Timeline, and so on. The new model provides action handling universally along with layout and rendering.

This document helps you to understand how the different layouts used for adaptive cards can be combined into a single layout with the universal bot action model. In addition, learn how using the model enhances user experience.

## Adaptive cards and the new universal bot action model

Adaptive cards are a combination of content such as text and graphics, and actions that can be performed by a user. As a developer, you can add adaptive cards to a conversation through a bot or messaging extension. Adaptive cards are cross-platform and cross-app snippets of UI, authored using a lightweight JSON format, that apps and services can share. For more information, see [adaptive cards](http://adaptivecards.io/).

As adaptive cards grew in popularity, different hosts started supporting separate action models leading to multiple instances for Teams and Outlook. To solve this problem, the Teams, Outlook and adaptive cards teams created a new universal bot action model compatible across hosts.

The following two lifecycle models illustrate the differences between adaptive cards and the new model:
* **Current inconsistent action model:** It uses separate adaptive cards for Outlook and Teams. Its common card layout provides `Action.Http` for Outlook and `Action.Submit` for Teams. For Outlook, explicit Http requests are generated to your Web service. While for Teams, requests are generated with the bot using the bot activity protocol.
* **New universal bot action model:** It uses one common adaptive card for Outlook and Teams. It provides a unified card layout with one `Action.Execute` command. For both Outlook and Teams, requests are generated with the bot using the bot activity protocol.

The following images show the lifecycle of the current and the new model:

![Inconsistent action model lifecycle](~/assets/images/bots/inconsistent-action-model-lifecycle.png)

![Universal bot action model lifecycle](~/assets/images/bots/universal-action-model-lifecycle.png)

Now you can identify the features of universal bot action model and understand the `Action.Execute` model.

## Enhance user experience with universal bot action model

Universal bot action model enhances user experience with the following:

* [Universal actions](#universal-actions)
* [Contextual views](#contextual-views)
* [Data-driven views](#data-driven-views)
* [Sequential workflow support](#sequential-workflow-support)
* [Refresh model](#refresh-model)
* [Authentication](#authentication)

### Universal actions

Prior to the new `Action.Execute` model, different hosts provided different action models as follows:

* Teams or bots used the `Action.Submit` model, an approach which defers the actual communication model to the underlying channel.
* Windows also used `Action.Submit`, but required a special set of named verbs to be used.
* Outlook used the `Action.Http` model to communicate with the backend service explicitly specified in the adaptive card payload.
* Currently search does not support actions.

![Inconsistent action model](~/assets/images/bots/inconsistent-action-model.png)

The new `Action.Execute` model solves the problems as the developer can use one model for action handling throughout different platforms.

![New universal action model](~/assets/images/bots/new-universal-action-model.png)

### Contextual views

In contextual views or role-based views, an adaptive card appears differently to different users. For example, a poll author sees a read-only view of the overall poll results, while a poll responder can take actions and respond to the poll.

![Contextual view](~/assets/images/bots/contextual-views.png)

![Contextual view 2](~/assets/images/bots/contextual-views2.png)

Role-based views include client-side views and server-side views.

#### Client-side views

In client-side views, an adaptive card includes all the information that is displayed across all roles. The card is authored using a templating language and the client binds that template to data including information about the user’s role.

#### Server-side views

In server-side views, the [refresh model](#refresh-model) is a functional alternative to the client-side model. As a card is viewed by a user, it is refreshed to only show what that user is supposed to see.

### Data-driven views

Data-driven views refer to a model where cards are defined using the following two components:

* An adaptive card template, designed to bind data conforming to a specific format.
* The data to bind the template.

### Sequential workflow support

Progressive  workflow scenarios in a chat or channel were not supported. With sequential workflow, any user part of a chat or channel can take action on their specific card. For each step, the user can take action or respond to the cards without modifying the card for other users.

![Sequential workflow](~/assets/images/bots/sequentialworkflow.png)

### Refresh model

Along with `Action.Execute` a new refresh feature is now supported. With the refresh feature, you can create adaptive cards that update automatically at the time they are displayed. A typical refresh use case is an approval request. After approval, users must not be presented with a card prompting them to approve, but instead must provide details about the request approval time and who approved the request.

### Authentication

OAuth authentication for universal bot action model uses the existing OAuth model. The OAuth model is provided by the Bot Framework and backed by the Bot Framework token service.

With traditional bots, authentication is handled in a separate login card. Whereas the universal bot action model uses a single adaptive card and operates outside the context of a conversation. Due to this, the ability to initiate the authentication flow from within the adaptive card itself is required. All communication for universal bot action model must be initiated from the client through an invoke. The client must be notified when the authentication flow is completed so that it can request a refreshed view of the card.

## See also

* [What are bots](~/bots/what-are-bots.md)
* [Adaptive cards overview](~/task-modules-and-cards/what-are-cards.md)
* [Adaptive cards @ Microsoft Build 2020](https://youtu.be/hEBhwB72Qn4?t=1393)
* [Adaptive cards @ Ignite 2020](https://techcommunity.microsoft.com/t5/video-hub/elevate-user-experiences-with-teams-and-adaptive-cards/m-p/1689460)

## Next step

> [!div class="nextstepaction"]
> [Work with universal bot action model](Work-with-universal-bot-action-model.md)
