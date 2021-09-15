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

This tutorial walks you through the steps to create your first Teams app using C# or .NET. It covers:

1. [Prepare your environment](#prepare-your-environment)
1. [Get prerequisites](#GetPrerequisites)
1. [Download the sample](#DownloadSample)
1. [Build and run the sample](#BuildRun)
1. [Host the sample app](#hostsample)
1. [Update the credentials for your hosted app](#updatecredentials)
1. [Configure the app tab](#configureapptab)

<a name="prepare-your-environment"></a>
[!include [prepare your environment](~/includes/prepare-environment.md)]

<a name="GetPrerequisites"></a>

## Get prerequisites

To complete this tutorial, you need to install the following tools:

- [Install Git](https://git-scm.com/downloads)
- [Install Visual Studio](https://www.visualstudio.com/downloads/)

You can install the free community edition of Visual Studio. If installation prompts you to  add `git` to the path, select it. In a terminal window, run the following command to verify the `git` installation:

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
> You can [fork](https://help.github.com/articles/fork-a-repo/) this [repo](https://github.com/OfficeDev/Microsoft-Teams-Samples) to modify and save your changes to GitHub.

<a name="BuildRun"></a>

## Build and run the sample

You can build and run the sample after it is cloned. 

**To build and run the cloned sample**

1. Open the solution file **Microsoft.Teams.Samples.HelloWorld.sln** from the **Microsoft-Teams-Samples/samples/app-hello-world/csharp** directory of the sample.
1. Select **Build Solution** from the **Build** menu.
1. Select the **F5** key, or select **Start Debugging** from the **Debug** menu to run the sample.

    When the app starts, a browser window opens. It shows the root of your app. You can go to the following URLs to verify that all the app URLs are loading:

    - `https://localhost:44327/`
    - `https://localhost:44327/hello`
    - `https://localhost:44327/first`
    - `https://localhost:44327/second`

    > [!Note]
    > If you receive an error `Could not find a part of the path … bin\roslyn\csc.exe`, update the package with the command `Update-Package Microsoft.CodeDom.Providers.DotNetCompilerPlatform -r`. For more information, see [this question on Stack Overflow](https://stackoverflow.com/questions/32780315).

    <a name="hostsample"></a>
    ## Deploy your sample app

    Microsoft Teams apps are web applications that provide one or more capabilities. Make your app available on the internet so that the Teams platform can load it. You can host your app in one of the following ways: 
    - Host it in Microsoft Azure for free 
    - Create a tunnel to the local process on your computer using `ngrok`.

    After you host your app, make a note of its root URL, such as `https://yourteamsapp.ngrok.io` or `https://yourteamsapp.azurewebsites.net`.

### Tunnel using ngrok

For quick testing, you can run the app on your computer. Create a tunnel to it through a web endpoint. [`ngrok`](https://ngrok.com) is a free tool to obtain a web address, such as `https://d0ac14a5.ngrok.io`. You can [download and install](https://ngrok.com/download) ngrok and add it to a location in your `PATH`.

After you install `ngrok`, open a new terminal window and run the following command to create a tunnel:

```bash
ngrok http 44327 -host-header=localhost:44327
```

`Ngrok` responds to requests from the internet and routes them to your app running on port 44327. 

**To verify the response**

1. Open your browser and go to `https://d0ac14a5.ngrok.io/hello`. This step loads your app's Hello page.
1. Instead of the URL mentioned in Step 1, use the forwarding address displayed by `ngrok` in your console session.
    > [!NOTE]
    > If you've used a different port during [build and run](#build-and-run-the-sample), ensure you use the same port number to setup the `ngrok` tunnel.
    > [!TIP]
    > It's a good idea to run `ngrok` in a different terminal window. It helps to keep `ngrok` from interfering with the app. You have to stop, rebuild, and rerun the app. The `ngrok` session provides useful debugging information in this window.

    The app is available only during the current session on your computer. It isn't available if the machine is shut down or goes to sleep. If you restart the service, the app returns a new address. Then, update every location using the old address with the new one. Remember to do this step when you share the app for testing. 
    
    The paid version of `ngrok` doesn't have this limitation.

### Host in Azure

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

<a name="updatecredentials"></a>
## Update the credentials for your hosted app

The sample app requires the environment variables to be set to the values that you saved in the text file.

**To update the credentials for your hosted app**

1. Open the `appsettings.json` file. 
1. Update the **MicrosoftAppId** value with your bot ID that you saved in the text file. 
1. Update the **MicrosoftAppPassword** with the bot password that you saved.

    <img width="560px" alt="Setting the keys" src="~/assets/images/get-started/get-started-net-azure-add-keys.png"/>

    After making these changes, rebuild the app. If you're using ngrok, you can run the app locally, and if you've hosted it in Azure, redeploy the app.

<a name="configureapptab"></a>
## Configure the app tab

After you've installed the app into Teams, you must configure it to display the content. 

**To configure the app tab**

1. Go to a channel in the team where you installed the sample app, and select the **'+'** button to add a new tab.
1. Select **Hello World** from the **Add a tab** list. A configuration dialog box is displayed that enables you to select the tab to display in this channel. 
1. Select **Save**. The `Hello World` tab is loaded with the tab.

    <img width="530px" alt="Screenshot of configure" src="~/assets/images/samples-hello-world-tab-configure.png" />

### Test your bot in Teams

You can now test the bot in Teams. 

**To test your bot**

* Select a channel in the team where you registered your app and type `@your-bot-name`. This type of message is called an **\@mention**. The bot replies to any message that you send.

    <img width="450px" alt="Bot responses" src="~/assets/images/samples-hello-world-bot.png" />

### Test your messaging extension

**To test your messaging extension**
1. Select **...** below the input box in your conversation view. A menu with the **'Hello World'** app is displayed. 
1. Select the menu, a set of random texts is displayed. You can select one of the random texts and that is inserted into your conversation.

    <img width="530px" alt="Messaging extension menu" src="~/assets/images/samples-hello-world-messaging-extensions-menu1.png" />

    <img width="530px" alt="Messaging extension result" src="~/assets/images/samples-hello-world-messaging-extensions-result1.png" />

1. Select one of the random texts. A card formatted and ready to send with your own message is shown.

    <img width="530px" alt="Messaging extension send" src="~/assets/images/samples-hello-world-messaging-extensions-send.png" />

## See also

* [Tutorials Overview](code-samples.md)
* [Create a conversational bot app](first-app-bot.md)
* [Create a messaging extension](first-message-extension.md)
* [Code Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples)
