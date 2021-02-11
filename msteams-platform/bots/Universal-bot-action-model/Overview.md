---
title: Overview of universal bot action model
description: A quick overview of universal bot action model.
ms.topic: overview
---

# What is universal bot action model?

A universal bot action model is a model that makes adaptive cards available across different platforms like Outlook, Teams, WebChat, Cortana, Timeline, and your applications through one `Action.Execute` command. Layout and rendering were already provided universally and now action handling is also provided.

## Adaptive cards and the universal bot action model

Adaptive cards are a combination of content such as text and graphics, and actions that can be performed by a user. As a developer you can add adaptive cards to a conversation through a bot or messaging extension. Adaptive cards are cross-platform and cross-app snippets of UI, authored using a lightweight JSON format, that apps and services can share. For more information, see [adaptivecards](http://adaptivecards.io/).

The following image shows the lifecycle of the current inconsistent action model that uses separate adaptive cards for Outlook and Teams:

![Inconsistent action model lifecycle](~/assets/images/bots/inconsistent-action-model-lifecycle.png)

The following image shows the lifecycle of the new universal bot action model that requires one common adaptive card for Outlook and Teams:

![Universal bot action model lifecycle](~/assets/images/bots/universal-action-model-lifecycle.png)

## Features

### Universal actions

Before using the `Action.Execute` model, different hosts used different action models as follows:

* Teams or bots used the `Action.Submit` model, essentially an approach which defers the actual communication model to the underlying channel.
* Windows also used `Action.Submit`, but required a special set of named verbs to be used.
* Outlook used the `Action.Http` model where the way to communicate with the backend service is explicitly specified in the adaptive card payload
* Search currently does not support actions.

![Inconsistent action model](~/assets/images/bots/inconsistent-action-model.png)

The new `Action.Execute` model solves these problems as the developer can use one model for action handling throughout different platforms.

![New universal action model](~/assets/images/bots/new-universal-action-model.png)

### Contextual views

Contextual views or role-based views refers to the ability of a card to look or behave differently depending on the user that views it. For instance, a poll author might see a read-only view of the overall poll results while a poll responder might see a set of inputs allowing them to respond to the poll.

![Contextual view](~/assets/images/bots/contextual-views.png)

![Contextual view 2](~/assets/images/bots/contextual-views2.png)

#### Client-side views

A card comes in including all the information that might have to be displayed across all roles. The card is authored using a templating language, and the client binds that template on the fly to data including information about the user’s role.

#### Server-side views

The auto-refresh mechanism described above is a functional alternative to the client-side model. As a card is viewed by a user, it is refreshed to only show what that user is supposed to see.

#### Data-driven views

Data-driven views refer to a model where cards are defined using the following two components:

* An adaptive card template, designed to bind to data conforming to a specific format.
* The data to bind the template to.

### Sequential workflow support

Sequential workflow is a progressive workflow scenario where any user part of a chat or channel can take action on their specific card and progress through a set of cards stepwise without modifying the card for other users. With sequential workflow support now in Teams, users can go through their respective workflows without modifying the card for other users.

![Sequential workflow](~/assets/images/bots/sequentialworkflow.png)

### Refresh feature

Along with `Action.Execute` a new refresh mechanism is now supported, making it possible to create adaptive cards that automatically update at the time they are displayed. This ensures that users always see up to date data. A typical refresh use case is an approval request. After approval, it is best that users are not presented with a card prompting them to approve when it's already been done, but instead provides information on the time the request was approved and by whom.

### Authentication

OAuth authentication for Universal Bots uses the existing OAuth model provided by the Bot Framework and backed by the Bot Framework Token Service.

With traditional bots, authentication is handled in a separate login card. Universal bot action model operates uses a single adaptive card and operates outside the context of a conversation entirely. Because of this, we need the ability to initiate the authentication flow from within the adaptive card itself. As all communication for universal bot action model must be initiated from the client via an invoke, the client must be notified when the authentication flow is completed so that it can request a refreshed view of card.

## Next steps

> [!div class="nextstepaction"]
> [Develop universal bot action model](Develop-universal-bot-action-model.md)