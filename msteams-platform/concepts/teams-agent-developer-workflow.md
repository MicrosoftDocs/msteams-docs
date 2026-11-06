---
title: TODO The Teams agent developer workflow
description: TODO The Teams agent developer workflow
author: nickwalkmsft
ms.author: nickwalk
ms.reviewer: nickwalk
ms.date: 07/02/2026
ms.topic: concept-article
---


Conceptual, covers the development workflow specifically for agents. Does not go into fine details of how Teams SDK models the runtime, that's for "Teams SDK agent programming model". This is meant to pair with the CLI-based quickstart and (we can point to it as a next steps, "Learn more about the concepts behind what you just did".

- CLI-based workflow (w/brief conceptual explanation of how it's backed by TDP and Azure management). Agents Toolkit gets a very brief mention.
- Dev tunnel and local dev
- Agents Playground
- Getting registered in Teams
- Sideloading
- Iterating

## The development process: TDP and CLI, SDK, dev tunnel, sideload

During development, they can use their app manifest to *sideload* their app, installing it to Teams to test it without having to publish it.

With [dev tunnels](/azure/developer/dev-tunnels/), developers can host their app's service on the web right from their development environment.

Teams SDK: Teams apps interact with the Teams API, Graph API, need to validate requests, etc. etc.

Developers typically manage their app's manifest alongside their runtime source code, storing it in source control and updating it as the app takes shape. When development is complete and its runtime is up and running on the web, they submit the app manifest and icons to the Teams platform for distribution through the Teams Store or their organization's app catalog.

what goes in the manifest vs app config

## The Teams agent development process

TDP and CLI

(This is basically a narrative of the quickstart, point that out and link it.)

Teams agent development begins with starter code for a new web service that responds to Teams conversational events. `teams project new` creates the source code scaffolding for a new Teams app. The CLI includes agent starter templates with basic conversational functionality across the SDK's three supported languages: TypeScript, Python and C#.

Being able to experience your agent from Teams as you develop it, the same way your users will, is important to building great agent experiences. Teams SDK encourages getting your agent connected to Teams at the very beginning of the development process so you can see your app evolve as you iterate. Teams needs your agent's web service to be reachable from the Internet, so the next step is to use `devtunnel` to give it a public URL when you run it from your development environment.

Next is the app's registration, the one-time process that creates the Entra ID identity for your app and the Azure Bot Service messaging infrastructure used by Teams to connect to your agent's web service. `teams app create` registers your agent Azure Bot Service and Entra ID. TODO also creates app registration

App packages and their manifests can be created manually, but it's recommended to do it by creating an *app registration* with the Teams platform. Creating an app registration initializes a new app package and manifest and sets up the means for publishing the app to the Teams Store or your organization's app catalog when the app is finished. Registering the app also initializes important infrastruture needed for bot and agent apps during development, see below. Registering apps with Teams platform requires a Microsoft 365 organizational account with access to Teams, but is otherwise free.

The Teams developer CLI and Teams Developer Portal facilitate this workflow. The CLI and portal are how developers interface with the Teams platform to manage app packages, manifests and registrations. Also other tools like validation. Can modify using the portal and download. The app registration on the platform only needs to be finalized before publishing.

"The web service you build might be brand new LLM-powered functionality in a conversational shape, or it might be more of an integration layer, or somewhere in between, depending on whether you already have supporting libraries or maybe a whole existing agent that you're just trying to bring to Teams in a very robust way. If you do, maybe you'd add an additional model or layered prompting mechanism to get deep integration that lets your agent communicate in an intelligent, group-aware way. You can start thing and then build additional capabilities to let your agent use more advanced conversational features." -- we should consider design guidance around this, in the design portion of a "bringing existing agents to teams" article.

The platform registration itself isn't needed until you're ready to distribute your app, but creating a registration also facilitates creating a bot registration and entra ID app, and is the only way to do it unless you have an azure subscription through which you can access the portal.

As an app's features evolve during development Can edit in portal live with graphical editor for ease of use or modify locally and deploy to teams client.

do this at the start of development.

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
