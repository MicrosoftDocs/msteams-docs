---
title: Get started - Build your first app overview and prerequisites
author: girliemac
description: Learn how to get started with Microsoft Teams app development and set up your environment.
ms.author: timura
ms.date: 03/18/2021
ms.topic: quickstart
---
# Overview

The Get Started tutorial teaches you to create basic Teams apps. It contains a series of lessons that begin with building and running a basic app. It further introduces you to common tools, fundemental concepts, and more advanced features of Teams.

> [!VIDEO https://www.youtube-nocookie.com/embed/jugBQqE_2sM]

## What you'll learn

Here's an idea of what you'll know after going through the lessons.

> [!div class="checklist"]
  >
  > * Get up and running quickly with the Teams Toolkit (a Visual Studio Code extension) 
  > * Configure your app with App Studio 
  > * Get experience with Teams tools and SDKs 
  > * Expand on your app such as authentication and design guidelines 

  :::image type="content" source="../assets/images/build-your-first-app/skill-tree-overview.png" alt-text="Skill tree showing learning paths for the Teams 'get started' lessons." border="false":::

## Teams app fundamentals

The Teams developer platoform lets you build custom apps. Some common scenarios that a custom Microsoft Teams app can help with are: 

* Embed your website or web app directly in the Teams client 
* Look up information quickly in another system and add the results to a conversation in Teams 
* Trigger workflows and processes based on a conversation in Teams, preserving the context of the conversation 

Before you begin the tutorials, you should know the following about building apps for Teams.

### App capabilities

A Teams app is made up of one or more platform capabilities and user interaction points.

Depending on what capabilities you want for your app, you will need an appropriate development toolset.  

| **App Capabilities**| **User interactions** | **Recommended Tools** | **SDKs** | **Technology stacks** |
|--------|--------|--------|--------|--------|
| Tabs | a full-screen embedded web experience  | VS Code with Teams Toolkit extension, or YoTeams (Yeoman Generator) | Teams client SDK | Web technology in general—HTML, CSS, and JavaScript |
| Bots | a chat bot that converse with members | VS Code with Teams Toolkit extension, or YoTeams (Yeoman Generator)  | Bot Franework SDK | Node.js, C#, or Python | 
| Messaging Extensions | shortcuts for inserting external content into a conversation or taking action on messages | VS Code with Teams Toolkit extension, or YoTeams (Yeoman Generator)  | Bot Framework SDK | Node.js, C#, or Python |

Tutorials in this Get started section will walk you through with the recommended tool sets and commonly used technologies:
* Visual Studio Code with Teams extension
* React.js for tabs
* Node.js for bots and messaging extensions

You can also use any other technologies of your choice. If you prefer using a command-line interface (CLI), you are free to do so.

### Teams doesn't host your app

You will only install an app package that contains a configuration file called manifest, and app icons to the Teams client. Rest of the app logics and data storage are hosted elsewhere, such as Azure Web Services. Teams does not host your app. Your app in the cloud (or localhost during your development) accesses Teams via HTTPS.

  :::image type="content" source="../assets/images/build-your-first-app/app-in-cloud.png" alt-text="Illustration showing your app on Teams is pointing to your app logic in the cloud server.":::

## Additional Resources

* [Teams developer platform](../overview.md)
* [Platform capabilities](../concepts/capabilities-overview.md)
* [User interactions points](../concepts/extensibility-points.md)
* [Teams client SDK](https://docs.microsoft.com/javascript/api/overview/msteams-client)
* [Bot Framework SDK](https://dev.botframework.com/)
* [Create your first Microsoft Teams app using the Yeoman generator](../tutorials/get-started-yeoman.md)

## Next Lesson

Now, let's set up your development environment and start building!

> [!div class="nextstepaction"]
> [Build and run your first Microsoft Teams app](../build-your-first-app/build-and-run.md)
