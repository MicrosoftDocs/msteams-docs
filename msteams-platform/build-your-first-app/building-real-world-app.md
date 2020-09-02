---
title: Get started building your first Teams app
author: heath-hamilton
ms.author: heath-hamilton
description: Overview and prerequisites for building your first Microsoft Teams app
---
# Get started building your first Teams app

In **Build your first app**, you learn how to create a basic Teams app through tutorials. The lessons build on each other, walking you through each step of creating a simple, real-world Teams app. We introduce common tools, fundamental concepts, and useful links along the way.

You'll start by creating a "Hello, World!" tab app.

## What you'll learn

> [!div class="checklist"]
  >
  > * **Get up and running quickly with the Teams Toolkit**: The Microsoft Teams Toolkit for Visual Studio Code takes care of creating your app project and scaffolding so you can have a running app in minutes.
  > * **Define your app with the manifest**: The manifest is a blueprint where you specify the capabilities and services your Teams app uses.
  > * **Scope your app's audience**: You can build a Teams app for personal use, collaboration, or both. In these tutorials, for example, you'll learn how build an tab for individual users or a group of people in a channel or chat.
  > * **Use the Teams SDK**: Customize your app (for example, change the color scheme to match the theme of the Teams client) with help from the Microsoft Teams JavaScript SDK.
  > * **Expand on your app**: Throughout the tutorials, you'll find related topics you're probably interested in (some of which include authentication and design guidelines).

## Teams app fundamentals

Before you begin the tutorials, you should know the following about building apps for Teams.

### Apps can have multiple capabilities

Teams apps are made up of one or more [platform capabilities](../concepts/capabilities-overview.md). You can build out these capabilities using a number of Teams-specific [UI components and conventions](../planning-your-app/teams-ui-conventions.md), such as cards, task modules, and deep linking.

### Teams doesn't host your app

A Teams app consists of three major pieces:

* The Teams client (web, desktop, or mobile) where people use your app.
* Your app, workflow, or website that performs the logic, data storage, and API calls to power your app. (You can host these services with Azure or any provider you like.)
* Your app package, which you use to install the app in Teams. It contains app metadata (name, icons, etc.) and pointers to your hosted services.

## Get prerequisites

Verify you have the right kind of account for building Teams apps and install some recommended development tools.

### Set up your development account

You need a Teams account that allows custom app sideloading. (Your account may already provide this.)

1. If you have a Teams account, verify if you can sideload apps in Teams:
    1. In the Teams client, select **Apps**.
    1. Look for an option to **Upload a custom app**.

    :::image type="content" source="../assets/images/build-your-first-app/upload-custom-app-closeup.png" alt-text="sideload option view":::

<!-- markdownlint-disable MD033 -->
<details>

<summary><b>Select here</b> if you can't see the sideload option or don't have a Teams account.</summary>

You can get a free Teams test account, which includes app sideloading, by joining the Microsoft 365 developer program. (The registration process takes approximately two minutes.)

1. Go to the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
1. Select **Join Now** and follow the onscreen instructions. 
1. When you get to the welcome screen, select **Set up E5 subscription**.
1. Set up your administrator account. Once you finish, you should see this screen.
:::image type="content" source="../assets/images/build-your-first-app/dev-program-subscription.png" alt-text="dev program subscription view":::
1. Log in to Teams using the administrator account you just set up.
1. Verify if you now have the **Upload a custom app** option in the Teams client.

</details>

### Install your development tools

You can build Teams apps with your preferred tools, but these lessons show how to get started quickly with Visual Studio Code and the Microsoft Teams Toolkit.

Teams displays app content only through HTTPS connections. Since you'll host your first app locally, we'll show how you can [use ngrok to set up a secure tunnel](../concepts/build-and-test/debug.md##locally-hosted) between Teams and your app.

1. Install [Node.js](https://nodejs.org/en/).
1. Install the latest version of [Visual Studio Code](https://code.visualstudio.com/download). (Earlier versions might not work with the toolkit.)
1. In Visual Studio Code, select **Extensions** :::image type="icon" source="../assets/icons/vs-code-extensions.png"::: on the left Activity Bar and install the **Microsoft Teams Toolkit**.
    :::image type="content" source="../assets/images/build-your-first-app/vsc-install-toolkit.png" alt-text="install toolkit view":::
1. Install [ngrok](https://ngrok.com/download).

## Next step

Once you set up your account and environment, you can start building.

> [!div class="nextstepaction"]
> [Build and run your first app](../build-your-first-app/build-and-run.md)
