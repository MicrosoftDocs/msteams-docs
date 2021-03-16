---
title: Get started - Build your first app overview and prerequisites
author: girliemac
description: Learn how to get started with Microsoft Teams app development and set up your environment.
ms.author: timura
ms.date: 03/16/2021
ms.topic: quickstart
---
# Build your first Microsoft Teams app overview

In the **get started** lessons, you learn how to create basic Teams apps. Each tutorial walks through how to build a simple, real-world Teams app while introducing you to common tools, fundamental concepts, and more advanced features.

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

The [Teams developer platform](../overview.md) lets you build custom apps. Some common scenarios that a custom Microsoft Teams app can help with are: 

* Embed your website or web app directly in the Teams client 
* Help users quickly look up information in another system and add the results to a conversation in Teams 
* Trigger workflows and processes based on a conversation in Teams, preserving the context of the conversation 

Before you begin the tutorials, you should know the following about building apps for Teams.

### App capabilities

A Teams app is made up of one or more [platform capabilities](../concepts/capabilities-overview.md) and [and user interactions points](../concepts/extensibility-points.md).

Depending on what capabilities you want for your app, you will need an appropriate development toolset.  

| **App Capabilities**| **User interactions** | **Recommended Tools** | **SDKs** | **Technology stacks** |
|--------|--------|--------|--------|--------|
| Tabs | a full-screen embedded web experience  | VS Code with Teams Toolkit extension, or YoTeams (Yeoman Generator) |[Teams client SDK](https://docs.microsoft.com/javascript/api/overview/msteams-client) | Web technology in general—HTML, CSS, and JavaScript |
| Bots | a chat bot that converse with members | VS Code with Teams Toolkit extension, or YoTeams (Yeoman Generator)  |[Bot Framework SDK](https://dev.botframework.com/) | Node.js, C#, or Python | 
| Messaging Extensions | shortcuts for inserting external content into a conversation or taking action on messages | VS Code with Teams Toolkit extension, or YoTeams (Yeoman Generator)  | [Bot Framework SDK](https://dev.botframework.com/) | Node.js, C#, or Python |

Tutorials in this Get started section will walk you through with recommended tool sets and commonly used technologies— Visual Studio Code with Teams extension, with React.js for tabs, and Node.js for bots and messaging extensions, although _you are not limited to using these particular stacks_. 

If you prefer using a command-line interface (CLI), read [Create your first Microsoft Teams app using the Yeoman generator](../tutorials/get-started-yeoman.md) 

### Teams doesn't host your app

You will only install an app package that contains a configuration file, called manifest and app icons to Teams client, and the rest of the app logics and data storage are hosted elsewhere, such as Azure Web Services. Your app in the cloud (or localhost during your development) accesses Teams via HTTPS.

:::image type="content" source="../assets/images/build-your-first-app/your-app-in-cloud.png" alt-text="Illustration showing your app on Teams is pointing to your app logic in the cloud server.":::

## Get prerequisites

### Set up your Teams development account

Verify you have the right account for building Teams apps and install some recommended development tools.

1. If you have a Teams account and have the admin access, verify if you can sideload apps in Teams:
    1. In the Teams client, select **Apps**.
    1. Look for an option to **Upload a custom app**.

    :::image type="content" source="../assets/images/build-your-first-app/upload-custom-app-closeup.png" alt-text="Illustration showing where in Teams you can upload a custom app.":::
    
2. If you don’t have a Teams account, or don’t have the admin access, sign up for a [Microsoft 365 developer account](https://developer.microsoft.com/microsoft-365/dev-program).  

<!-- markdownlint-disable MD033 -->
<details>

<summary><b>Expand here</b> for the instruction to get the developer account.</summary>

You can get a free Teams test account that allows app sideloading by joining the Microsoft 365 developer program. (The registration process takes approximately two minutes.)

1. Go to the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
1. Select **Join Now** and follow the onscreen instructions.
1. When you get to the welcome screen, select **Set up E5 subscription**.
1. Set up your administrator account. Once you finish, you should see a screen like this.
:::image type="content" source="../assets/images/build-your-first-app/dev-program-subscription.png" alt-text="Example of what you see after signing up for the Microsoft 365 developer program.":::
1. Log in to Teams using the administrator account you just set up.
1. Verify if you now have the **Upload a custom app** option.

</details>

> [!Note]
> If you still can't sideload apps, see [enable custom Teams apps and turn on custom app uploading](https://docs.microsoft.com/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant#enable-custom-teams-apps-and-turn-on-custom-app-uploading).


## Next step
Once you set up your account, let's set up your development environment and start building!

> [!div class="nextstepaction"]
> [Build a "Hello, World!" app](../build-your-first-app/build-and-run.md)

