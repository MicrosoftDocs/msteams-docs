---
title: Microsoft Teams SDK Programming Model
description: TODO
ms.topic: overview
ms.date: 05/19/2026
author: nickwalkmsft
ms.author: nickwalk
---

# Teams SDK programming model **for agents**

In [The Teams application model and developer workflow](concepts/teams-application-model.md), we saw how apps are powered by web apps

That article is overall arch model and workflow, this is Temas SDK app model

The focus of the SDK, and of most of this, is agents.

Can think of a Teams SDK app as the bridge between an existing agent and Teams

 Most agents built with Teams SDK use a single Entra ID app registration for Bot Connector authentication and for agent identity and authentication flows.

TODO: Where can I put the concept of every agent instance being serviced by teh same runtime endpoint? Maybe it could go in Bot Services. Every Teams agent is a single global endpoint URL that services across all organizations that install it. The runtime is responsible for isolating data and activities across different contexts and organizations.

most events are activities, so the SDK exposes activity-specific handlers.

api client -> bot connector

<https://microsoft.github.io/teams-sdk/why>

## Remaining Concepts to carry over from <https://microsoft.github.io/teams-sdk/why>

- Reactive and proactive messaging
- Bot registration (bot ID and where the endpoint is configured)
- Request validation
- Variety of events, varied response types, some expect no response at all. Should define, maybe link to the Activity model.
- Authenticating calls to Teams API, Graph API
- OAuth, SSO
-
-
- Also get config, and the way it authenticates
-

## Remaining Concepts to carry over from <https://microsoft.github.io/teams-sdk/teams/core-concepts>

- Basic flowchart, see diagram
- DevTunnel
- Provisioning of app and bot has to come even before sideloading
- Sideloading
- Explain how the developer CLI supports all of this

Multi languages:

<https://microsoft.github.io/teams-sdk/csharp/getting-started/code-basics>

<https://microsoft.github.io/teams-sdk/csharp/essentials/>

<https://microsoft.github.io/teams-sdk/csharp/essentials/app-basics>

<https://microsoft.github.io/teams-sdk/csharp/essentials/on-event>

<https://microsoft.github.io/teams-sdk/csharp/essentials/on-activity/> (there's a reference for TS)

<https://microsoft.github.io/teams-sdk/csharp/essentials/app-authentication/>

<https://microsoft.github.io/teams-sdk/csharp/essentials/app-authentication/trust-model>  (? this might be a separate page, but here we should at least call out how one function of the SDK is to authenticate received messages, and then we can link to a separate page.)

<https://microsoft.github.io/teams-sdk/csharp/essentials/sending-messages/> (some basic subset of messaging; a lot of this is specific features we'd link to from here, but this is a pretty good list of messaging features I can use to get that done.)

<https://microsoft.github.io/teams-sdk/csharp/essentials/api>

<https://microsoft.github.io/teams-sdk/typescript/essentials/graph> (big enough might need a separate page)

## How the Teams SDK expresses the application model

The Teams SDK provides a programming model for building Teams apps that follows the Teams application model directly. Instead of requiring developers to manually implement authentication, request handling, activity routing, response formatting, and Teams API calls, the SDK provides abstractions for these common tasks. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/why/)

The SDK does not replace the Teams application model. It makes the model concrete in code.

## The app object

In the Teams SDK, the app object is the main entry point for your Teams application. It hosts and runs the server, receives incoming requests, routes activities to handlers, handles authentication, provides utilities for interacting with Teams, and manages plugins that extend application behavior. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/app-basics/)

Conceptually, the app object represents the developer-owned application service in the Teams application model. It is where incoming Teams activity becomes application logic.

The app object can be responsible for:

- Hosting the application server
- Authenticating requests from Teams
- Routing events and activities
- Registering handlers
- Sending replies
- Sending proactive messages
- Accessing Teams APIs
- Managing plugins and lifecycle events

## Activity routing

In the platform model, Teams sends different types of activity to your app. In the SDK, those activities are routed to handlers that you register in application code.

For example, a message handler can process user messages and send a response to the conversation. The SDK docs show handlers that receive a message activity, inspect its text, and send a reply. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/getting-started/code-basics/), [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/on-activity/)

The SDK can also use a middleware-style routing pattern, where multiple handlers can process an activity in order. A handler can perform work and then pass control to the next handler, or stop the chain when it has fully handled the activity. Handler registration order affects how activities flow through the handler chain. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/on-activity/)

## Events and lifecycle hooks

Teams apps need to react not only to user messages, but also to application and platform events. The SDK provides event hooks for scenarios such as application startup, sign-in, errors, incoming activity, activity responses, and sent activity. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/on-event/)

These hooks help developers connect app behavior to the broader lifecycle of a Teams application. For example, an app can log errors, inspect incoming activity, track outgoing responses, or run setup logic when the app starts.

## Authentication and platform plumbing

Teams apps need to authenticate incoming requests from Teams and authenticate outgoing calls back to Teams or other Microsoft services. Without an SDK, developers would need to implement this plumbing directly, along with routing logic for different event and activity types. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/why/), [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/core-concepts/)

The Teams SDK abstracts much of this boilerplate so developers can focus on application behavior. It handles common concerns such as authentication, routing, event handling, and Teams platform integration. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/why/)

## Teams API access

A Teams app often needs to do more than reply to a single message. It might need to send, update, or delete messages; get conversation members; retrieve meeting details; or access team and channel information.

The Teams SDK provides an API client for working with Teams platform areas such as conversations, meetings, teams, and channels. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/api/)

Examples of API scenarios include:

- Get members of a conversation
- Send a message to a conversation
- Update or delete a message
- Retrieve meeting details
- Get meeting participant information
- Access team or channel details

These APIs let application logic participate more fully in Teams experiences, beyond simple request-response message handling.

## Plugins and extensibility

The Teams SDK includes a plugin model that lets developers hook into application lifecycle events, server events, activity events, and outgoing activity behavior. Plugins can add, replace, or augment parts of the app’s behavior. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/getting-started/code-basics/), [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/app-basics/)

Plugins support a modular application structure. For example, a plugin might help configure hosting, add diagnostics, handle authentication behavior, modify activity processing, or integrate additional services.

## Building conversational app experiences

Bots and agents are a major Teams app capability. They let developers create conversational experiences in Teams-native surfaces, such as chats, channels, and other conversation contexts.

A conversational Teams app can:

- Receive user messages
- Respond with text
- Send Adaptive Cards
- Handle card actions
- Start workflows
- Call APIs or external services
- Use AI services to generate responses
- Send proactive messages
- Participate in conversations where the app is installed

The Teams SDK expresses these behaviors through message handlers, activity handlers, API clients, authentication support, Adaptive Card support, and utilities for sending responses.

## Messages and responses

A common conversational pattern is message handling. A user sends a message to the app, Teams delivers that message as an activity, and the app processes the activity in a handler.

The app can then respond with:

- A text message
- An Adaptive Card
- A typing indicator followed by a response
- A workflow result
- A request for more information
- No visible response, if the activity does not require one

The SDK docs show a basic message handler that sends a typing indicator and replies to the user’s message. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/getting-started/code-basics/)

## Adaptive Cards

Adaptive Cards provide a flexible, cross-platform format for rich, interactive content. In Teams, Adaptive Cards can be used for rich messages, dialogs, message extensions, link unfurling, configuration forms, and other app contexts. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/in-depth-guides/adaptive-cards/)

In the Teams application model, Adaptive Cards are one way for an app to create richer user experiences inside Teams conversations and workflows. A card can display information, collect input, and expose actions. When a user takes an action on a card, Teams can send an activity back to the app for handling. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/why/), [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/in-depth-guides/adaptive-cards/)

## Proactive messages

A Teams app can respond to incoming activity, but it can also send proactive messages. A proactive message is sent by the app outside the immediate context of a user’s latest message. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/why/)

For example, an app might send a proactive message when:

- A workflow completes
- An external system changes state
- A user needs to approve something
- A scheduled reminder is due
- An agent has a result to share

Proactive messaging requires the app to authenticate with Teams and use the appropriate conversation context and APIs to send the message. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/why/), [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/api/)

## Development, testing, and deployment

A Teams app moves through several stages as developers build, test, and deploy it.

## Local development

During local development, your application usually runs on your machine. Because Teams needs a public HTTPS endpoint to send activity to your app, you can use a dev tunnel to expose your local server to Teams. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/core-concepts/)

A dev tunnel creates a secure public HTTPS endpoint, manages SSL certificates, and forwards Teams messages and events to your locally running application. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/core-concepts/)

This lets you test the app in Teams while still running and debugging the application locally.

## Provisioning

Before a Teams app can interact with Teams, it must be registered and configured. For bot and agent scenarios, provisioning can include creating or updating the app registration and configuring the bot registration that connects Teams to your application endpoint. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/core-concepts/)

The Teams Developer CLI can automate many setup tasks, including app creation, registration, manifest scaffolding, validation, and updates. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/core-concepts/), [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/manifest/)

## Sideloading

Sideloading lets you install and test a Teams app before publishing it to an organization app catalog or broader distribution channel. To sideload an app, the app manifest and icons are packaged together in a zip file. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/manifest/)

Sideloading is important during development because it lets you test how the app appears and behaves in Teams before it is made available to other users.

## Production deployment

In production, your app runs as a deployed service with a public HTTPS endpoint. Teams routes activity to that endpoint based on the app’s identity, manifest, capability configuration, and routing registrations. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/core-concepts/), [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/why/)

The same application model applies in production as in development:

- Teams identifies the app.
- Teams routes activity to the configured endpoint.
- The app authenticates incoming requests.
- The app handles events and activities.
- The app sends responses or proactive messages.
- The app uses Teams APIs or other services as needed.

## Conceptual diagram

```text
User
  ↓
Teams client
  ↓
Teams platform services
  ↓
App identity, manifest, and capability configuration
  ↓
Bot registration and routing
  ↓
Public HTTPS endpoint
  ↓
Developer-owned application service
  ↓
Teams SDK app object
  ↓
Events, activities, handlers, plugins, APIs
  ↓
Application logic, AI services, Microsoft Graph, external services
  ↓
Response or proactive message
  ↓
Teams conversation
```

## Key terms

### Teams app

An installable application experience that extends Microsoft Teams through one or more app capabilities.

### App capability

A Teams feature area that an app uses to create a specific user experience, such as a bot, tab, message extension, or other Teams experience.

### App package

The zip package used to install or test an app in Teams. It includes the app manifest and app icons. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/manifest/)

### App manifest

The JSON file that describes a Teams app’s metadata, identity, capabilities, permissions, URLs, and related configuration. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/manifest/)

### App registration

The identity registration used to identify and authenticate the app with Teams and related Microsoft services. For bot and agent scenarios, this includes a client ID and secret. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/core-concepts/)

### Bot registration

The registration that connects Teams bot activity to the app’s public HTTPS endpoint. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/core-concepts/)

### Endpoint

The public HTTPS URL where Teams sends activity for the app. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/why/), [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/core-concepts/)

### Event

Something meaningful that happens in Teams or within the app runtime. Events can include incoming activity, sent activity, sign-in, startup, or errors. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/on-event/), [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/)

### Activity

A Teams-specific payload sent between Teams and the app, such as a message, reaction, card action, installation event, or invoke call. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/on-activity/), [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/)

### Handler

Application logic that reacts to an event or activity and decides what action the app should take. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/), [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/on-activity/)

### Proactive message

A message sent by the app outside the immediate context of responding to the latest user message. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/why/)

### Teams SDK

The recommended programming model for implementing the Teams application model in code. It provides abstractions for app hosting, authentication, event and activity routing, handlers, Teams API access, plugins, and response utilities. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/why/), [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/app-basics/)

## Summary

The Teams application model connects installable Teams experiences to developer-owned application logic. The model includes the app package, manifest, app identity, capabilities, routing, endpoint, events, activities, handlers, authentication, and Teams APIs.

The Teams SDK is the primary way developers implement this model in modern Teams apps and agents. It expresses Teams platform concepts directly in code, so developers can build conversational and interactive Teams experiences without manually implementing the platform plumbing for authentication, routing, activity handling, and Teams API access.
