---
title: Tutorial - Create your first app using C#
description: Learn how to get started building Microsoft Teams apps with C# or .NET.
keywords: getting started .net c# csharp
ms.custom: scenarios:getting-started; languages:ASP.NET,C#
ms.topic: tutorial
ms.date: 11/09/2018
---

# Create your first Teams app using C#

This tutorial helps you to create a Microsoft Teams app using C#. To do this, you must:

* Prepare your environment
* Get prerequisites
* Download the sample
* Build and run the sample
* Host the sample app
* Update the credentials for your hosted app
* Configure the app tab

[!include [prepare your environment](~/includes/prepare-environment.md)]

<a name="GetPrerequisites"></a>

## Get prerequisites

To complete this tutorial, you need to install the following tools:

- [Install Git](https://git-scm.com/downloads)
- [Install Visual Studio](https://www.visualstudio.com/downloads/)

You can install the free community edition of Visual Studio. During installation, if there is an option to add `git` to the path, select it. In a terminal window, run the following command to verify your `git` installation:

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

You can get started with a simple [Hello, World!](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-hello-world/csharp) sample in C#. In a terminal window, run the following command to clone the sample repository to your computer:

```bash
git clone https://github.com/OfficeDev/Microsoft-Teams-Samples.git
```

> [!TIP]
> You can [fork](https://help.github.com/articles/fork-a-repo/) this [repo](https://github.com/OfficeDev/Microsoft-Teams-Samples) to modify and save your changes to GitHub.

<a name="BuildRun"></a>

## Build and run the sample

After the repo is cloned, use Visual Studio to open the solution file **Microsoft.Teams.Samples.HelloWorld.sln** from the **Microsoft-Teams-Samples/samples/app-hello-world/csharp** directory of the sample. Then, select **Build Solution** from the **Build** menu. To run the sample, press **F5** or select **Start Debugging** from the **Debug** menu.

When the app starts, a browser window opens with the root of the app launched. You can go to the following URLs to verify that all the app URLs are loading:

- [https://localhost:44327/](https://localhost:44327/)
- [https://localhost:44327/hello](https://localhost:44327/hello)
- [https://localhost:44327/first](https://localhost:44327/first)
- [https://localhost:44327/second](https://localhost:44327/second)

<a name="HostSample"></a>

> [!Note]
> If you receive an error `Could not find a part of the path … bin\roslyn\csc.exe`, update the package with the command `Update-Package Microsoft.CodeDom.Providers.DotNetCompilerPlatform -r`. For more information, see [this question on Stack Overflow](https://stackoverflow.com/questions/32780315).

## Host the sample app

Apps in Microsoft Teams are web applications that provide one or more capabilities. For the Teams platform to load your app, your app must be available on the internet. To do this, you need to host your app. You can either host it in Microsoft Azure for free or create a tunnel to the local process on your computer using `ngrok`. After you host your app, note its root URL, such as `https://yourteamsapp.ngrok.io` or `https://yourteamsapp.azurewebsites.net`.

### Tunnel using ngrok

For quick testing, you can run the app on your computer and create a tunnel to it through a web endpoint. [`ngrok`](https://ngrok.com) is a free tool with which you can get a web address, such as `https://d0ac14a5.ngrok.io`. You can [download and install](https://ngrok.com/download) ngrok and add it to a location in your `PATH`.

After you install `ngrok`, open a new terminal window and run the following command to create a tunnel:

```bash
ngrok http 44327 -host-header=localhost:44327
```

`Ngrok` listens to requests from the internet and routes them to your app running on port 44327. To verify, open your browser and go to `https://d0ac14a5.ngrok.io/hello` to load your app's hello page. Instead of this URL, use the forwarding address displayed by `ngrok` in your console session.

> [!NOTE]
> If you have used a different port in the [build and run](#build-and-run-the-sample) step, ensure you use the same port number to setup the `ngrok` tunnel.

> [!TIP]
> It is a good idea to run `ngrok` in a different terminal window. This is done to keep `ngrok` from running without interfering with the app. You have to stop, rebuild, and rerun the app. The `ngrok` session provides useful debugging information in this window.

The app is only available during the current session on your computer. If the machine is shut down or goes to sleep, the service is no longer available. Remember this when you share the app for testing to other users. If you have to restart the service, the app returns a new address and you must update every location that uses that address. The paid version of `ngrok` does not have this limitation.

### Host in Azure

Microsoft Azure hosts your .NET application on a free tier using shared infrastructure. This is sufficient to run the `Hello World` sample. For more information, see [creating a new free Azure account](https://azure.microsoft.com/free/).

Visual Studio has built-in support for app deployment to different providers, including Azure.

<img width="530px" alt="Visual Studio" src="~/assets/images/get-started/publishtoazure1.png"/>

[!include [Use App Studio to configure the app package](~/includes/get-started/get-started-use-app-studio.md)]

## Update the credentials for your hosted app

The sample app requires the environment variables to be set to the values that you saved in the text file.

Open the `appsettings.json` file. Update the **MicrosoftAppId** value with your bot ID that you saved in the text file. Update the **MicrosoftAppPassword** with the bot password you saved.

<img width="560px" alt="Setting the keys" src="~/assets/images/get-started/get-started-net-azure-add-keys.png"/>

After these changes are made, rebuild the app. If you are using ngrok, run the app locally, and if you are hosting in Azure, redeploy the app.

## Configure the app tab

Once you install the app into a team, you must configure it to show content. Go to a channel in the team where you installed the sample app and select the **'+'** button to add a new tab. Choose **Hello World** from the **Add a tab** list. A configuration dialog box is displayed that enables you to choose the tab to display in this channel. After you select the tab and select **Save** the `Hello World` tab is loaded with the tab.

<img width="530px" alt="Screenshot of configure" src="~/assets/images/samples-hello-world-tab-configure.png" />

### Test your bot in Teams

Now you can test the bot in Teams. Select a channel in the team where you registered your app and type `@your-bot-name`. This is called an **\@mention**. The bot replies to any message that you send.

<img width="450px" alt="Bot responses" src="~/assets/images/samples-hello-world-bot.png" />

### Test your messaging extension

To test your messaging extension, you can select **...** below the input box in your conversation view. A menu with the **'Hello World'** app is displayed. When you select it, a set of random texts is displayed. You can select one of the random text and that is inserted into your conversation.

<img width="530px" alt="Messaging extension menu" src="~/assets/images/samples-hello-world-messaging-extensions-menu.png" />

<img width="530px" alt="Messaging extension result" src="~/assets/images/samples-hello-world-messaging-extensions-result.png" />

Select one of the random text. A card formatted and ready to send with your own message is shown.

<img width="530px" alt="Messaging extension send" src="~/assets/images/samples-hello-world-messaging-extensions-send.png" />
