---
title: Tutorial - Create your first app using Node.js
description: Learn how to get started building Microsoft Teams apps with Node.js.
keywords: getting started node.js nodejs App Studio
ms.topic: tutorial
ms.localizationpriority: medium
ms.custom: scenarios:getting-started; languages:JavaScript,Node.js
---

# Build your first Teams app using Node.js

Start Microsoft Teams development by building your first app - "Hello, world!" with a tab, a bot, and a message extension capability.

In this tutorial, you'll learn:

- how to build an app with three capabilities—tab, bot, and message extension using Node.js and Visual Studio 2019.
- how to test the app features.
- how to deploy your app.

    >This app will have all capabilities and each has its own UI and UX:

:::image type="content" source="../assets/images/teams-toolkit-v2/prerequisites/your-helloworld-app.png" alt-text="Diagram showing this app has 3 features." border="false":::

## The app road-map

Building an app using Teams Toolkit follows a three-step process:

Before you begin creating your first Teams app, install the tools and set up your development environment.

:::image type="content" source="../assets/images/get-started/app-roadmap/roadmap-p-1.png" alt-text="Image showing phase 1 of building an app." border="false":::

As you proceed through this step-by-step guide, this road-map highlights the phase you're on. The first phase is to plan and prepare your environment for building an app.

## Get prerequisites

To complete this tutorial, you need the following tools. If you don't already have them, you can install them from these links.

- [Git](https://git-scm.com/downloads)
- [Node.js and NPM](https://nodejs.org/)
- Get any text editor or IDE. You can install and use [Visual Studio Code](https://code.visualstudio.com/download) for free.

If you see options to add `git`, `node`, `npm`, and `code` to the PATH during installation, select the options. 

Verify that the tools are available by running the following in a terminal window:

> [!NOTE]
> Use the terminal window that you are most comfortable with on your platform. These examples use Bash (which is included in Git), but these scripts will run on most platforms.

```bash
$ git --version
git version 2.19.0.windows.1

$ node -v
v8.9.3

$ npm -v
5.5.1

$ gulp -v
CLI version 2.3.0
Local version 4.0.2
```

You can use a different version of these applications without any problem. Only for gulp, you'll need to use version 4.0.0 or later.

If you don't have gulp installed (or have the wrong version installed), do so by running `npm install gulp` in the terminal window.

If you have installed Visual Studio Code, you can verify the installation by running:

```bash
code --version
1.28.2
929bacba01ef658b873545e26034d1a8067445e9
```
## Set up your Teams development tenant

A **tenant** is like a space, or a container for your organization in Teams, where you chat, share files, and run meetings. This space is also where you sideload and test your app. Let's verify if you're ready to develop with the tenant.

### Enable sideloading option

After creating the app, you must load your app in Teams without distributing it. This process is known as sideloading. Sign in to your Microsoft 365 account to view this option.
  
Do you already have a tenant, and do you have the admin access? Let's check if you really do!

Verify if you can sideload apps in Teams:

1. In the Teams client, select **Store** icon.
1. Select **Manage your apps**.
1. Look for the option to **Upload a custom app**. If you see the option, sideloading apps is enabled.

 :::image type="content" source="~/assets/images/teams-toolkit-v2/prerequisites/upload-custom-app.png" alt-text="Illustration shows the option to upload a custom app in Teams.":::

> [!NOTE]
> If you don't have the option to upload a custom app, talk to your Teams administrator. For more information, see [enable custom Teams apps and turn on custom app uploading](~/concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-turn-on-custom-app-uploading).

### Create a free Teams developer tenant (optional)

If you can't see the option to **Upload a custom app**, or you don't have a Teams account, you can get a free Teams developer account. Join the Microsoft 365 developer program!

1. Go to the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
1. Select **Join Now** and follow the onscreen instructions.
1. In the welcome screen, select **Set up E5 subscription**.
1. Set up your administrator account. After you finish, the following screen appears.

    :::image type="content" source="~/assets/images/build-your-first-app/dev-program-subscription.png" alt-text="Example of what you see after signing up for the Microsoft 365 developer program.":::

1. Sign in to Teams using the administrator account you just set up. Verify that you have the **Upload a custom app** option in Teams.

## Get a free Azure account

If you wish to host your app or access resources in Azure, you must have an Azure subscription. [Create a free account](https://azure.microsoft.com/free/) before you begin.

Now you’ve got all tools and set up your accounts. Next, let's set up your development environment and start building!

You can continue to use this terminal window to run the commands that follow in this tutorial.

<a name="DownloadSample"></a>

## Download the sample

You can use the [Hello, World!](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-hello-world/nodejs) sample to get started. In a terminal window, run the following command to clone the sample repository to your local machine:

```bash
git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
```

> [!TIP]
> You can [fork](https://help.github.com/articles/fork-a-repo/) this [repo](https://github.com/OfficeDev/Microsoft-Teams-Samples) if you want to modify and check in your changes to your GitHub repo for future reference.

<a name="BuildRun"></a>

|   |   |
|:--- | ---:|
|**Back** : [Overview](code-samples.md) | [2. Build and test your app](build-and-test-csharp-app.md) : **Next** |
|