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
  > - **Scope your audience**: You can build a Teams app for personal use, collaboration, or bother. In these tutorials, you'll learn how build a tab for individual users or a group of people in a channel or chat.
  > - **Utilize Teams SDK to get context**: Learn how to use the Microsoft Teams JavaScript SDK to perform theme change or set up configuration experience  
  > - **Expand on your app**: Throughout the tutorials, we link to related topics you're probably interested in (some of which include authentication and design guidelines).

## Teams app fundamentals

Before you begin the tutorials, you should know the following about building apps for Teams.

### Apps can have multiple capabilities

Teams apps are made up of one or more [platform capabilities](../concepts/capabilities-overview.md), including [tabs](../tabs/what-are-tabs.md), [bots](../bots/what-are-bots.md ), [messaging extensions](../messaging-extensions/what-are-messaging-extensions.md), and [webhooks and connectors](../webhooks-and-connectors/what-are-webhooks-and-connectors.md). Teams apps also have many [UI conventions and elements](../planning-your-app/teams-ui-conventions.md), such as cards, task modules, and deep linking, you can use to build the best possible user experience.

For these tutorials, you'll build only tabs but can add a bot or other capability to your app as you like.

### Teams doesn't host your app

A Teams app consists of three major pieces:

1. The Microsoft Teams client (web, desktop, or mobile) where users interact with your app.
1. Your app, service, workflow, or website that performs the necessary logic, data storage, and API calls to power your app.
1. Your app package, which you use to install the app in Teams. It contains app metadata (name, icons, etc.) and pointers to your services. 

## Prerequisites

### Set up your development account

To build apps for Teams, you need a Teams account that allows sideloading (your account may already provide this).
1. If you have a Teams account, verify if you can sideload apps in Teams:
    1. In the Teams client, select **Apps**.
    1. Look for an option to **Upload a custom app**.
:::image type="content" source="../assets/images/build-your-first-app/sideload-option.png":::

<details>
  <summary>Don't see "upload a custom app" or don't have a Teams account? Click here.</summary>
Do the following to acuqire an account that allows custom app sideloading:

1. Join [Microsoft 365 developer program](https://developer.microsoft.com/en-us/microsoft-365/dev-program) to get a test account. This will only take 2 minutes.
1. Go through the questionnaire and click on "set up E5 subscription"
:::image type="content" source="../assets/images/build-your-first-app/dev-program-setup.png":::
1. Set your account and passowrd when you finish you should see this. 
:::image type="content" source="../assets/images/build-your-first-app/dev-program-subscription.png":::
1. Use the admininistrator email address and the password you just set up to log into Teams
1. Verify you now have the upload a custom app option
</details>

### Get your development tools

You can build Teams apps with your preferred tools, but here's what you need to get started quickly with Visual Studio Code and the Microsoft Teams Toolkit.

1. Install the latest version of [Visual Studio Code](https://code.visualstudio.com/download). Earlier versions might not work with the toolkit.
1. In Visual Studio Code, select **Extensions** :::image type="icon" source="../assets/icons/vs-code-extensions.png"::: on the left Activity Bar and install the **Microsoft Teams Toolkit**.
:::image type="content" source="../assets/images/build-your-first-app/VSC-install-toolkit.png":::
1. Install [Node.js](https://nodejs.org/en/).
1. Install [ngrok](https://ngrok.com/download). We will use this to [set up a secure tunnel](../concepts/build-and-test/debug.md##locally-hosted) so that Teams can access your app.

## Next step

That's all for now, let's get started!

> [!div class="nextstepaction"]
> [Build and run your first app](../build-your-first-app/build-and-run.md)
