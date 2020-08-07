---
title: Building your first Teams app
author: heath-hamilton
description: Tutorial for building a real-world Microsoft Teams app
---
# Learn how to build your first Teams app

This section describes how to build a simple Teams app. The lessons build on each other, walking you through a step-by-step process of creating a simple, real-world Teams app. We will introduce you to the tools, major concepts and useful links along the way. 

You will start with creating and running a "Hello, World" tab app.  You will then create some simple UI interface and learn how to get useful context from Teams SDKs. 


## What you will learn 


> [!div class="checklist"]
  >
  > - **Get up and running quickly with the Teams Toolkit** -- The Microsoft Teams Toolkit for Visual Studio Code takes care of creating your app project and scaffolding so you can have a running app in minutes.
  > - **Define your app with the manifest** -- The manifest is a blueprint where you specify the capabilities and services your Teams app uses.
  > - **Scope your audience** -- You can build a Teams app for personal use or collaboration. In the tutorials, you'll learn how build a tab for individual users or a group of people in a channel or chat.
  > - **Utilize Teams SDK to get context** -- Learn how to use the Microsoft Teams JavaScript SDK to perform theme change or set up configuration experience  
  > - **How to expand on your app** -- Throughout the tutorials, we link to related topics you're probably interested in (some of which include authentication and design guidelines).


## Teams fundamental 
Before you start, here are two things you should understand about Teams apps.
#### Teams app provides multiple entry points

Teams apps are made up of one or more [platform capabilities](../concepts/capabilities-overview.md): [tabs](../tabs/what-are-tabs.md), [bots](../bots/what-are-bots.md ), [message extensions](../messaging-extensions/what-are-messaging-extensions.md) and [connectors](../webhooks-and-connectors/what-are-webhooks-and-connectors.md). An app can contain any combination of these capabilities. For this tutorial, you will build an app with just tabs but you can add on bot and message extension as you like. Teams app also have many [UI elements](../planning-your-app/teams-ui-conventions.md) such as cards, task module and deep link.
#### Teams does not host your app

A Teams app consists of three major pieces:

1. The Microsoft Teams client (web, desktop or mobile) where users will interact with your app.
1. Your service, workflow or website which perform the necessary logic, data storage and API calls to power your app.
1.  Your Teams app package that creates the app installed by your users, and contains your app's metadata (name, icons, etc.) and pointers to your services.

When an app is installed, the Teams client parses the manifest file to determine needed information like the name of your app and the URL where the services are located.


## Next step
That's all for now, let's get started!
> [!div class="nextstepaction"]
> [Build and run your first app](../build-your-first-app/build-and-run.md)
