---
title: Tutorial - Deploy your first app using C#
description: Learn how to deploy Microsoft Teams apps with C# or .NET.
keywords: getting started .net c# csharp
ms.custom: scenarios:getting-started; languages:ASP.NET,C#
ms.localizationpriority: medium
ms.topic: tutorial
ms.date: 11/09/2018
---
# Deploy your Teams app

After you build and test your Teams app, you can host it using Azure.

## Host in Azure

Microsoft Azure hosts your .NET application on a free tier. It uses shared infrastructure that is sufficient to run the `Hello World` sample. For more information, see [creating a new free Azure account](https://azure.microsoft.com/free/).

Visual Studio has built-in support for app deployment to different providers, including Azure:

<img width="530px" alt="Visual Studio" src="~/assets/images/get-started/publishtoazure1.png"/>

**Update the app package**

# [App Studio](#tab/AS)

[!include [Use App Studio to configure the app package](~/includes/get-started/get-started-use-app-studio.md)]

# [Developer Portal](#tab/DP)

**To install Developer Portal (preview) in Teams**


1. Select the **Apps** icon at the bottom of the left-hand bar, and search for **Developer Portal**.

    <img width="430px" alt="Screenshot of TDP" src="~/assets/images/Screen1.png"/>

1. Select **Developer Portal** and select **Open**.

    <img width="430px" alt="Screenshot of TDP Open" src="~/assets/images/screen2.png"/>

1. Select the Apps tab and select **Import an existing app**.

    <img width="430px" alt="Screenshot of import app in tdp" src="~/assets/images/screen3.png"/>

1. Select **Hello World** and select **Import**. The **Hello World** app is imported in Developer Portal. 

    You can configure your app using the Teams Developer Portal. The Manifest is found under Distribute. You can use the Manifest to configure capabilities, required resources, and other important attributes for your app. For more information about how to configure your app using Developer Portal, see [Teams Developer Portal](../concepts/build-and-test/teams-developer-portal.md).

    <img width="430px" alt="Screenshot of configure tdp" src="~/assets/images/Screen4.png"/>
---

|  <<  |  >>  |
|:--- | ---:|
|**Back** : [Build and test your app](../get-started/build-and-test-csharp-app.md) | [Overview](../get-started/code-samples.md) : **Next** |
|