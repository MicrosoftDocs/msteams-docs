---
title: Overview of universal bot action model
description: A quick overview of universal bot action model.
ms.topic: overview
---

# Overview

A universal bot action model is a model that makes adaptive cards available across different platforms like Outlook, Teams, WebChat, Cortana, Timeline, and your applications through one `Action.Execute` command. Layout and rendering were already provided universally and now action handling is also provided.

Adaptive cards are a combination of content such as text and graphics, and actions that can be performed by a user. As a developer you can add adaptive cards to a conversation through a bot or messaging extension. Adaptive cards are cross-platform and cross-app snippets of UI, authored using a lightweight JSON format, that apps and services can share. For more information, see [adaptivecards.io](http://adaptivecards.io/).

## Lifecycle of an adaptive card

![Inconsistent action model lifecycle](../assets/images/bots/inconsistent-action-model-lifecycle.png)

![Universal action model lifecycle](../assets/images/bots/universal-action-model-lifecycle.png)

## Enhancements

Universal bot action model leverages the full Bot Framework stack, with the following enhancements:

* Support the adaptiveCard/action Invoke activity.
    * Do not support chat like conversational experiences.
    * All user interactions happen within the confines of a single area on the screen.
* Implement a synchronous model.
    * When a user takes an action from within the card, that action is executed synchronously and the card waits for the response to be returned.
    * The channel that accepted the card in the first place is responsible for allowing or disallowing the bot to send updates to the card, as is appropriate for that channel.
* Client runtimes and channels operate over HTTP only. This simplifies implementation, both on the client and server, while addressing the vast majority of needs.
* Is Implemented using the existing bot builder SDKs. Developers can reuse their code. The main difference is they can only use adaptiveCard/action Invoke activities for their bots to be universal.

## Features

### Universal actions

Before using the `Action.Execute` model, different hosts used different action models as follows:
* Teams or bots uses the `Action.Submit` model, essentially an approach which defers the actual communication model to the underlying channel.
* Windows also uses `Action.Submit`, but requires a special set of named verbs to be used.
* Outlook uses the `Action.Http` model where the way to communicate with the backend service is explicitly specified in the adaptive card payload
* Search currently does not support actions.

![Inconsistent action model](../assets/images/bots/inconsistent-action-model.png)

The new `Action.Execute` model solves these problems as the developer can use one model for action handling throughout different platforms.

![New universal action model](../assets/images/bots/new-universal-action-model.png)

### Contextual views

Contextual views or role-based views refers to the ability of a card to look or behave differently depending on the user that views it. For instance, a poll author might see a read-only view of the overall poll results while a poll responder might see a set of inputs allowing them to respond to the poll.

![Contextual views](../assets/images/bots/contextual-views.png)

### Sequential workflow support

Sequential workflow is a progressive workflow scenario where any user part of a chat or channel can take action on their specific card and progress through a set of cards stepwise without modifying the card for other users. With sequential workflow support now in Teams, users can go through their respective workflows without modifying the card for other users.

![Sequential workflow](../assets/images/bots/sequentialworkflow.png)

## Next steps

> [!div class="nextstepaction"]
> [Develop universal bot action model](Develop-universal-bot-action-model.md)