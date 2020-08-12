---
title: Building your first Teams app
author: heath-hamilton
description: Tutorial for building a real-world Microsoft Teams app
---
# Learn how to build your first Teams app

In **Build your first app**, you learn how to create a basic Teams app through tutorials. The lessons build on each other, walking you through each step of creating a simple, real-world Teams app. We introduce you to common tools, fundamental concepts, and useful links along the way.

You'll start with creating and running a "Hello, World!" tab app. You'll then create some simple UI and learn how to get useful context with the Microsoft Teams Javascript SDK.

## What you'll learn

> [!div class="checklist"]
  >
  > - **Get up and running quickly with the Teams Toolkit**: The Microsoft Teams Toolkit for Visual Studio Code takes care of creating your app project and scaffolding so you can have a running app in minutes.
  > - **Define your app with the manifest**: The manifest is a blueprint where you specify the capabilities and services your Teams app uses.
  > - **Scope your audience**: You can build a Teams app for personal use or collaboration. In the tutorials, you'll learn how build a tab for individual users or a group of people in a channel or chat.
  > - **Utilize Teams SDK to get context**: Learn how to use the Microsoft Teams JavaScript SDK to perform theme change or set up configuration experience  
  > - **Expand on your app**: Throughout the tutorials, we link to related topics you're probably interested in (some of which include authentication and design guidelines).

## Teams app fundamentals

Before you begin the tutorials, you should know the following about building apps for Teams.

### Apps can have multiple capabilities

Teams apps are made up of one or more [platform capabilities](../doc-links/capabilities-overview.md), including [tabs](../doc-links/what-are-tabs.md), [bots](../doc-links/what-are-bots.md ), [messaging extensions](../doc-links/what-are-messaging-extensions.md), and [webhooks and connectors](../doc-links/what-are-webhooks-and-connectors.md). Teams apps also have many [UI conventions and elements](../doc-links/teams-ui-conventions.md), such as cards, task modules, and deep linking, you can use to build the best possible user experience.

For these tutorials, you'll build only tabs but can add a bot or other capability to your app as you like.

### Teams doesn't host your app  

A Teams app consists of three major pieces:

1. The Microsoft Teams client (web, desktop, or mobile) where users interact with your app.
1. Your app, service, workflow, or website that performs the necessary logic, data storage, and API calls to power your app.
1. Your app package, which you use to install the app in Teams. It contains app metadata (name, icons, etc.) and pointers to your services.

## Next step

That's all for now, let's get started!

> [!div class="nextstepaction"]
> [Build and run your first app](build-and-run-with-toolkit.md)
