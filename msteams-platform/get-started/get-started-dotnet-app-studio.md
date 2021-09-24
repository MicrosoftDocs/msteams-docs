---
title: Tutorial - Create your first app using C#
description: Learn how to get started building Microsoft Teams apps with C# or .NET.
keywords: getting started .net c# csharp
ms.custom: scenarios:getting-started; languages:ASP.NET,C#
ms.localizationpriority: medium
ms.topic: tutorial
ms.date: 11/09/2018
---

# Build your first Teams app using C#

This tutorial walks you through the steps to create your first Teams app using C# or .NET.

## Prepare your development environment

<a name="prepare-your-environment"></a>
[!include [prepare your environment](~/includes/prepare-environment.md)]

<a name="GetPrerequisites"></a>

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
|**Back** : [Overview](../get-started/code-samples.md) | [Build and test your app](../get-started/build-and-test-csharp-app.md) : **Next** |
|

## See also

* [Tutorials Overview](code-samples.md)
* [Create a conversational bot app](first-app-bot.md)
* [Create a messaging extension](first-message-extension.md)
* [Code Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples)
