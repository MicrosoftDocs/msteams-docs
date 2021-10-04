---
title: Create your first app using C#
description: Learn to create Microsoft Teams apps with C# or .NET.
keywords: getting started .net c# csharp
ms.custom: scenarios:getting-started; languages:ASP.NET,C#
ms.localizationpriority: medium
ms.topic: tutorial
ms.date: 11/09/2018
---

# Create your first Teams app using C#

Start Microsoft Teams development by building your first app - "Hello World" with a tab, a bot, and a message extension capability.

>This app will have all capabilities and each has its own UI and UX:

:::image type="content" source="../assets/images/teams-toolkit-v2/prerequisites/your-helloworld-app.png" alt-text="Diagram showing this app has 3 features." border="false":::

## The app road-map

Building an app using C# follows a three-step process:

:::image type="content" source="../assets/images/get-started/app-roadmap/roadmap-p-1.png" alt-text="Image showing phase 1 of building an app." border="false":::

Before you begin creating your first Teams app, install the tools and set up your development environment. This is the first phase - Plan and Prepare. As you proceed through this step-by-step guide, this road-map highlights the phase you're on.

In this tutorial, you'll learn:

- how to build an app with three capabilities—tab, bot, and message extension using C# and Visual Studio 2019.
- how to test the app features.
- how to deploy your app.

## Get prerequisites

To complete this tutorial, you need to install the following tools:

- [Install Git](https://git-scm.com/downloads)
- [Install Visual Studio 2019](https://www.visualstudio.com/downloads/)

You can install the free community edition of Visual Studio 2019. If installation prompts you to add `git` to the path, select it. In a terminal window, run the following command to verify the `git` installation:

```bash
$ git --version
git version 2.17.1.windows.2

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

> [!NOTE]
> Use a suitable terminal window on your platform. These examples use Git Bash but can be run on most platforms.

Open the latest version of Visual Studio and install any updates.

You can use the same terminal window to run the commands in this tutorial.

<a name="DownloadSample"></a>

## Download the sample

You can get started with a [Hello, World!](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-hello-world/csharp) sample in C#. In a terminal window, run the following command to clone the sample repository to your computer:

```bash
git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
```

> [!TIP]
> You can [fork](https://help.github.com/articles/fork-a-repo/) this [repository](https://github.com/OfficeDev/Microsoft-Teams-Samples) to modify and save your changes to GitHub.

<a name="BuildRun"></a>

:::image type="content" source="../assets/images/get-started/csharp-repo-cloned.png" alt-text="Sample repo for c# Teams app cloned" border="false":::

The cloned repository appears in Visual Studio 2019.

| &nbsp; | &nbsp; |
|:--- | ---:|
|**Back** : [Overview](code-samples.md) | [Build and test your app](build-and-test-csharp-app.md) : **Next** |
|