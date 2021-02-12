---
title: Overview of universal bot action model
description: A quick overview of universal bot action model.
ms.topic: overview
---

# What is universal bot action model?

A universal bot action model is a model that makes adaptive cards available across different platforms like Outlook, Teams, WebChat, Cortana, Timeline, and your applications through one `Action.Execute` command. Layout and rendering were already provided universally and now action handling is also provided.

## Adaptive cards and the universal bot action model

Adaptive cards are a combination of content such as text and graphics, and actions that can be performed by a user. As a developer you can add adaptive cards to a conversation through a bot or messaging extension. Adaptive cards are cross-platform and cross-app snippets of UI, authored using a lightweight JSON format, that apps and services can share. For more information, see [adaptive cards](http://adaptivecards.io/).

The following image shows the lifecycle of the current inconsistent action model that uses separate adaptive cards for Outlook and Teams:

![Inconsistent action model lifecycle](~/assets/images/bots/inconsistent-action-model-lifecycle.png)

The following image shows the lifecycle of the new universal bot action model that uses one common adaptive card for Outlook and Teams:

![Universal bot action model lifecycle](~/assets/images/bots/universal-action-model-lifecycle.png)

Now you can identify the features of universal bot action model and understand the `Action.Execute` model.

## Features

### Universal actions

Before using the `Action.Execute` model, different hosts used different action models as follows:

* Teams or bots used the `Action.Submit` model, an approach which defers the actual communication model to the underlying channel.
* Windows also used `Action.Submit`, but required a special set of named verbs to be used.
* Outlook used the `Action.Http` model to communicate with the backend service explicitly specified in the adaptive card payload.
* Search currently does not support actions.

![Inconsistent action model](~/assets/images/bots/inconsistent-action-model.png)

The new `Action.Execute` model solves these problems as the developer can use one model for action handling throughout different platforms.

![New universal action model](~/assets/images/bots/new-universal-action-model.png)

### Contextual views

In contextual views or role-based views, an adaptive card appears differently to different users. For example, a poll author sees a read-only view of the overall poll results while a poll responder can take actions and respond to the poll.

![Contextual view](~/assets/images/bots/contextual-views.png)

![Contextual view 2](~/assets/images/bots/contextual-views2.png)

Role-based views includes client-side views and server-side views.

#### Client-side views

In client-side views, an adaptive card includes all the information that is displayed across all roles. The card is authored using a templating language, and the client binds that template to data including information about the user’s role.

#### Server-side views

In server-side views, the [refresh mechanism](#refresh-feature) is a functional alternative to the client-side model. As a card is viewed by a user, it is refreshed to only show what that user is supposed to see.

### Data-driven views

Data-driven views refer to a model where cards are defined using the following two components:

* An adaptive card template, designed to bind to data conforming to a specific format.
* The data to bind the template to.

### Sequential workflow support

Progressive  workflow scenarios in a chat or channel were not supported. With sequential workflow, any user part of a chat or channel can take action on their specific card. For each step the user can take actions or respond to the cards without modifying the card for other users.

![Sequential workflow](~/assets/images/bots/sequentialworkflow.png)

### Refresh feature

Along with `Action.Execute` a new refresh mechanism is now supported. With the refresh feature, you can create adaptive cards that automatically update at the time they are displayed. A typical refresh use case is an approval request. After approval, users must not be presented with a card prompting them to approve, but instead must provide details about the request approval time and who approved the request.

### Authentication

OAuth authentication for universal bot action model uses the existing OAuth model provided by the Bot Framework and backed by the Bot Framework token service.

With traditional bots, authentication is handled in a separate login card. Whereas the universal bot action model uses a single adaptive card and operates outside the context of a conversation. Because of this, we need the ability to initiate the authentication flow from within the adaptive card itself. As all communication for universal bot action model must be initiated from the client through an invoke, the client must be notified when the authentication flow is completed so that it can request a refreshed view of card.

## Next steps

> [!div class="nextstepaction"]
> [Develop universal bot action model](Develop-universal-bot-action-model.md)