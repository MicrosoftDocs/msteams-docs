---
title: The Teams application model
author: nickwalkmsft
description: Learn how the Teams application model packages, identifies, installs, routes, and connects Teams app experiences to application logic.
ms.topic: conceptual
ms.localizationpriority: high
ms.date: 05/23/2026
---

# The Teams application model and dev workflow

TODO lead-in. Explicitly explain what is in this article: app model and its components, dev workflow (consider that for the title)

TODO explain that this builds on "Agents in Teams".

Teams apps bring new features and experiences to the Teams interface, similar to the way extensions in web browsers and code editors work. Developers publish apps to the Teams Store or to their organizational app catalog, where users find them and install them.

## The app model

In the Teams app model, developers customize a set of predefined surfaces and interactions in Teams called *app capabilities*.

When creating a Teams app, most of a developer's workflow revolves around building a web app or a web service that implements one or more app capabilities. When a user interacts with the app in Teams, it connects to the web app or web service to power their experience.

The web app or web service that powers a Teams app can be hosted anywhere on the web, but hosting is the developer's responsibility. Teams does not host or run application code.

### App capabilities

Teams offers three app capabilities that developers can implement:

<!-- TODO Do we need "meeting apps"? Anything else? -->

- **Bot**: Create conversational assistants, called bots or agents depending on their design, that users interact with in Teams chat. TODO Link to agents in teams.
- **Tab**: Display a website or web application in a browser frame that users can add to their Teams conversations and meetings. Developers can use Teams' client-side libraries to create web applications that integrate closely with Teams when displayed in tabs.
- **Message extension**: Display custom dialogs in Teams that perform actions or searches. Message extensions are typically used to generate rich, interactive messages that appear in Teams chat.

> [!NOTE]
> TODO Note on bot vs agent, sometimes all conversational apps are called bots; link to "agents in teams", disavow bot framework.

To present an app to users, Teams needs only configuration information that describes the application and declares the capabilities it uses. This configuration lives in a file called the app's manifest.

TODO scopes anywhere?

## App manifest and package

An app's *manifest* is a JSON file that specifies all of the configuration for the capabilities used by the app. Developers typically treat their app's manifest as part of its source code, storing it in source control and updating it as the app evolves during development. When a user installs a Teams app, the only elements deployed to their device are the app's icons and the manifest.

A Teams app installer - its *app package* - is just a zip file containing the icons and manifest. During development, developers can package and install their app directly to their local copy of Teams to test it. When a developer publishes a finished app and a user installs it from the Teams Store or their organizational app catalog, Teams downloads its package and loads its configuration.

## Bot registration and Entra ID identity

When users chat with an agent or bot app, behavior is in web service, but platform doesn't talk directly to the web service

Not billable Azure resources

You will need an Azure account and billable Azure subscription to create an Azure bot

Teams platform doesn't communicate directly with bots, it uses botservice as an intermediary

"The web service that defines an agent's behavior can be hosted anywhere, but Teams' identity infrastructure lives in Azure."

## The development process: TDP and CLI, SDK

Teams SDK: Teams apps interact with the Teams API, Graph API, need to validate requests, etc. etc.

App packages and their manifests can be created manually, but it's recommended to do it by creating an *app registration* with the Teams platform. Creating an app registration initializes a new app package and manifest and sets up the means for publishing the app to the Teams Store or your organization's app catalog when the app is finished. Registering the app also initializes important infrastruture needed for bot and agent apps during development, see below. Registering apps with Teams platform requires a Microsoft 365 organizational account with access to Teams, but is otherwise free.

The Teams developer CLI and Teams Developer Portal facilitate this workflow. The CLI and portal are how developers interface with the Teams platform to manage app packages, manifests and registrations. Also other tools like validation. Can modify using the portal and download. The app registration on the platform only needs to be finalized before publishing.

"The web service you build might be brand new LLM-powered functionality in a conversational shape, or it might be more of an integration layer, or somewhere in between, depending on whether you already have supporting libraries or maybe a whole existing agent that you're just trying to bring to Teams in a very robust way. If you do, maybe you'd add an additional model or layered prompting mechanism to get deep integration that lets your agent communicate in an intelligent, group-aware way. You can start thing and then build additional capabilities to let your agent use more advanced conversational features." -- we should consider design guidance around this, in the design portion of a "bringing existing agents to teams" article.

The platform registration itself isn't needed until you're ready to distribute your app, but creating a registration also facilitates creating a bot registration and entra ID app, and is the only way to do it unless you have an azure subscription through which you can access the portal.

As an app's features evolve during development Can edit in portal live with graphical editor for ease of use or modify locally and deploy to teams client.

do this at the startt of development.

Deploying locally requires "install custom app".

Developers are encouraged to get their apps installed and running in Teams at the very beginning of the development process so they can test and experience their app in Teams as they work on it.

To create and manage app packages and manifests, developers use the Teams Developer Portal or the Teams developer CLI. Typically, at the very beginning of development, an app developer will:

1. Use the portal or CLI to create both a new app package and a new app project in their development environment
1. Download the app package and store its contents alongside their app source code

The portal and CLI offer various capabilites for verifying and modifying a

Deploying is separate from publishing

Created and managed in TDP. You can start by creating in TDP and downloading.

The Teams developer CLI includes functionality for scaffolding, validating and updating manifests.

TODO rewrite The development process facilitated by the Teams developer CLI encourages developers to sideload ASAP

... and also to register their bot ASAP

<!-- Teams SDK also simplifies other aspects of developing Teams apps, including request and response authentication, user authentication and enterprise single sign-on, calling the Teams platform and Microsoft Graph APIs, and managing agent conversation state.

Teams SDK also includes a developer CLI tool to accelerate development. The workflow enabled by the Teams developer CLI is designed to help you quickly get started with a new project and have it running in Teams at the very beginning of development. -->

---

## Apps are M365 apps

## Remaining Concepts to carry over from <https://microsoft.github.io/teams-sdk/why>

- Reactive and proactive messaging
- Bot registration (bot ID and where the endpoint is configured)
- Request validation
- Variety of events, varied response types, some expect no response at all. Should define, maybe link to the Activity model.
- Authenticating calls to Teams API, Graph API
- OAuth, SSO

## Remaining Concepts to carry over from <https://microsoft.github.io/teams-sdk/teams/core-concepts>

- Basic flowchart, see diagram
- DevTunnel
- Provisioning of app and bot has to come even before sideloading
- Sideloading
- Explain how the developer CLI supports all of this

## Remaining concepts to carry over from <https://microsoft.github.io/teams-sdk/csharp/getting-started/code-basics>

- Come back to this, do app basics first

## How is behavior defined?

 the Teams client with new experiences

. It defines how your app appears in Teams, which capabilities it supports, which permissions it needs, and how Teams connects user interactions to your application logic.

A Teams app typically includes:

- **An app package** — The installable package that contains the app manifest and app icons. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/manifest/)
- **An app manifest** — A JSON file that describes the app’s metadata, capabilities, permissions, IDs, URLs, and other configuration required by Teams. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/manifest/)
- **App identity** — Platform registration information, such as an application ID and credentials, that Teams and related Microsoft services use to identify and authenticate the app. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/core-concepts/)
- **App capabilities** — The Teams experiences the app provides, such as a bot, tab, message extension, or other capability.
- **An application endpoint** — A public HTTPS endpoint where Teams can send events and activities for your app. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/why/), [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/core-concepts/)
- **Application logic** — Developer-owned code that receives activity from Teams, handles it, calls services or APIs, and sends responses.

For conversational apps and agents, the app model connects native Teams conversational surfaces to your application logic. A user sends a message, selects a command, submits an Adaptive Card action, or interacts with the app in Teams. Teams routes that interaction to your app, and your app decides how to respond.

## How Teams apps work

At runtime, a Teams app connects the Teams client, Teams platform services, app configuration, and your application service.

A simplified conversational flow looks like this:

1. A user interacts with your app in Teams.
2. Teams receives the interaction.
3. Teams identifies the installed app and its configured capabilities.
4. Teams routes the activity through the appropriate platform services.
5. The activity is delivered to your application endpoint.
6. Your app authenticates the request.
7. Your app routes the activity to the appropriate handler.
8. Your app sends a response, updates state, calls another service, or takes no action.
9. If needed, your app can also send proactive messages later.

For bot and agent scenarios, the application primarily does two things: listens for events from Teams and sends responses or proactive messages back to Teams. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/why/)

## Core parts of the Teams application model

## App package and manifest

Every app installed in Teams requires an app manifest. The manifest is included in the app package, along with app icons. When you sideload an app for testing, you provide Teams with a zip package that contains the manifest and icons. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/manifest/)

The manifest describes the app to Teams. It can include information such as:

- App name, description, and visual identity
- App IDs and related identity configuration
- Supported app capabilities
- Permissions required by the app
- URLs and domains used by the app
- Bot, tab, message extension, or other capability-specific configuration

The manifest is the declarative part of the Teams application model. It tells Teams what the app is, how it should appear, and which Teams capabilities it supports.

The Teams Developer CLI and related tooling can help scaffold, validate, update, upload, and package the manifest as part of the development workflow. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/manifest/), [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/core-concepts/)

## App identity and registration

Teams needs a stable way to identify your app. For bot and agent scenarios, this includes an app registration with a unique client ID and secret. The app registration is used to authenticate your app with Teams and other Microsoft services, including Microsoft Graph when needed. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/core-concepts/)

This identity gives Teams and related services a consistent way to recognize your app, even if implementation details change. For example, your public endpoint might change between local development, test, and production, but the app identity remains the stable reference for the app. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/why/)

## Bot registration and routing

For bot and agent capabilities, Teams uses bot registration and routing configuration to connect Teams activity to your application endpoint. The bot registration stores the public HTTPS URL for your app and enables messages and other bot-related activity to flow between Teams and your service. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/core-concepts/)

This routing layer lets Teams deliver different types of activity to your app, including user messages, reactions, installation events, Adaptive Card actions, dialog actions, and other supported activity types. These activities can arrive through the same public endpoint, and your app is responsible for routing each activity to the right logic. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/why/)

## Application endpoint

The application endpoint is the public HTTPS URL where Teams sends activity for your app. During local development, this endpoint might be created by a dev tunnel that forwards Teams traffic to a locally running server. In production, the endpoint is typically a deployed cloud service. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/teams/core-concepts/)

The endpoint is where the platform model becomes application code. Teams sends activity to the endpoint, and your app authenticates the request, interprets the activity, and decides what to do next.

## Events, activities, and handlers

Teams apps are event-driven. A user sends a message, installs an app, submits a card, invokes a command, or performs another action in Teams. Those interactions are represented as events and activities that your app can handle.

### Events

An event is something meaningful that happens in Teams or inside your application. Events can come from Teams, such as a user interaction, or from your application runtime, such as startup, error handling, or activity processing. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/on-event/), [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/)

Examples of events include:

- Application start
- Sign-in flow
- Incoming activity
- Activity response
- Sent activity
- Unhandled application error

### Activities

An activity is a Teams-specific payload that flows between Teams and your app. Activities include messages, reactions, Adaptive Card actions, installation events, and invoke calls. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/on-activity/), [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/)

Different activity types can require different handling behavior. A message activity might result in a text response or Adaptive Card response. A reaction activity might update application state but not send a visible response. An invoke activity might require a specific response format. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/why/), [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/)

### Handlers

A handler is application logic that reacts to an event or activity. Handlers inspect incoming data, decide whether the app should act, and perform the appropriate response.

A handler might:

- Send a message back to the user
- Return an Adaptive Card
- Start or continue a workflow
- Call Microsoft Graph or another service
- Update application state
- Log diagnostic information
- Ignore the activity if no action is needed

The Teams SDK expresses this part of the model through event handlers and activity handlers. Developers register handlers for the types of events and activities their app supports. [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/), [\[microsoft.github.io\]](https://microsoft.github.io/teams-sdk/csharp/essentials/on-activity/)

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
