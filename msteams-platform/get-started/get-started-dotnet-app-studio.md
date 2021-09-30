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

Start Microsoft Teams development by building your first app - "Hello, world!" with a tab, a bot, and a message extension capability.

In this tutorial, you'll learn:

- how to build an app with three capabilities—tab, bot, and message extension using C# and Visual Studio 2019.
- how to test the app features.
- how to deploy your app.

    >This app will have all capabilities and each has its own UI and UX:

:::image type="content" source="../assets/images/teams-toolkit-v2/prerequisites/your-helloworld-app.png" alt-text="Diagram showing this app has 3 features." border="false":::

## The app road-map

Building an app using Teams Toolkit follows a four-step process:

Before you begin creating your first Teams app, install the tools and set up your development environment.

:::image type="content" source="../assets/images/get-started/app-roadmap/roadmap-p-1.png" alt-text="Image showing phase 1 of building an app." border="false":::

As you proceed through this step-by-step guide, this road-map highlights the phase you're on. The first phase is to plan and prepare your environment for building an app. For this tutorial, you will go through Phases3 and 4 three times, for each app project.

## Get prerequisites

To complete this tutorial, you need to install the following tools:

- [Install Git](https://git-scm.com/downloads)
- [Install Visual Studio 2019](https://www.visualstudio.com/downloads/)

You can install the free community edition of Visual Studio 2019. If installation prompts you to add `git` to the path, select it. In a terminal window, run the following command to verify the `git` installation:

```bash
$ git --version
git version 2.17.1.windows.2

```

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

:::image type="content" source="../assets/images/get-started/csharp-teams-sample-tree.png" alt-text="Sample repo for c# Teams app cloned" border="false":::

The cloned repository appears in Visual Studio 2019.

|  <<  |  >> |
|:--- | ---:|
|**Back** : [Overview](code-samples.md) | [2. Build and test your app](build-and-test-csharp-app.md) : **Next** |
|

## See also

* [Tutorials Overview](code-samples.md)
* [Code Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples)
