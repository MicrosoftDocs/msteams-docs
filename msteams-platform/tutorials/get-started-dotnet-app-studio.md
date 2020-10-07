---
title: Get started with C#/.NET
description: Get started building great apps in Microsoft Teams using C#/.NET
keywords: getting started .net c# csharp
ms.custom: scenarios:getting-started; languages:ASP.NET,C#
ms.topic: tutorial
ms.date: 11/09/2018
---

# Get started on the Microsoft Teams platform with C#/.NET and App Studio

The [Microsoft Teams](/microsoftteams/) developer platform makes it easy for you to extend Teams and integrate your own applications and services seamlessly into the Teams workspace. These apps can then be distributed to your enterprise or for teams around the world.

To extend Microsoft Teams, you will need to create a Microsoft Teams app. A Microsoft Teams app is a web application that you host. This app can then be integrated into the user's workspace in Teams.

This tutorial helps you get started creating a Microsoft Teams app using C# on .NET. You can test the app by loading it into a Team that you have permissions for, or into a test tenant created using the Office Developer Program.

[!include [prepare your environment](~/includes/prepare-environment.md)]

<a name="GetPrerequisites"></a>

## Get prerequisites

To complete this tutorial, you need to get the following tools:

- [Install Git](https://git-scm.com/downloads)
- [Install Visual Studio](https://www.visualstudio.com/downloads/). You can install the free community edition.

If you see an option to add `git` to the PATH during installation, choose to do so. It will be handy.

Verify your `git` installation by running the following in a terminal window:
> [!NOTE]
> Use the terminal window that you are most comfortable with on your platform. These examples use Bash, but will run on most platforms.

```bash
$ git --version
git version 2.17.1.windows.2

```

Make sure to launch the latest version of Visual Studio and install any updates if shown.

You can continue to use this terminal window to run the commands that follow in this tutorial.

<a name="DownloadSample"></a>

## Download the sample

We have provided a simple [Hello, World!](https://github.com/OfficeDev/msteams-samples-hello-world-csharp) sample in C# to get you started. In a terminal window, run the following command to clone the sample repository to your local machine:

```bash
git clone https://github.com/OfficeDev/msteams-samples-hello-world-csharp.git
```

> [!TIP]
> You can [fork](https://help.github.com/articles/fork-a-repo/) this [repo](https://github.com/OfficeDev/msteams-samples-hello-world-csharp) if you want to modify and check in your changes to GitHub for future reference.

<a name="BuildRun"></a>

## Build and run the sample

Once the repo is cloned, use Visual Studio to open the solution file `Microsoft.Teams.Samples.HelloWorld.sln` from the root directory of the sample and click `Build Solution` from the `Build` menu. You can run the sample by pressing `F5` or choosing `Start Debugging` from the `Debug` menu.

When the app starts, you will see a browser window open with the root of the app launched. You can navigate to the following URLs to verify that all the app URLs are loading:

- [http://localhost:3333](http://localhost:3333)
- [http://localhost:3333/hello](http://localhost:3333/hello)
- [http://localhost:3333/first](http://localhost:3333/first)
- [http://localhost:3333/second](http://localhost:3333/second)

<a name="HostSample"></a>

> [!Note]
> If you receive an error like `Could not find a part of the path … bin\roslyn\csc.exe`, try updating the package with the command `Update-Package Microsoft.CodeDom.Providers.DotNetCompilerPlatform -r`. See [this question on StackOverflow](https://stackoverflow.com/questions/32780315) for additional details.

## Host the sample app

Remember that apps in Microsoft Teams are web applications exposing one or more capabilities. For the Teams platform to load your app, your app must be reachable from the internet. To make your app reachable from the internet, you need to host your app. You can either host it in Microsoft Azure for free or create a tunnel to the local process on your development machine using `ngrok`. When you finish hosting your app make a note of its root URL. It will look something like: `https://yourteamsapp.ngrok.io` or `https://yourteamsapp.azurewebsites.net`.

### Tunnel using ngrok

For quick testing you can run the app on your local machine and create a tunnel to it through a web endpoint. [ngrok](https://ngrok.com) is a free tool that lets you do just that. With ngrok you can get a web address such as `https://d0ac14a5.ngrok.io` (this URL is just an example). You can [download and install](https://ngrok.com/download) ngrok for your environment. Make sure you add it to a location in your `PATH`.

Once you install it, you can open a new terminal window and run the following command to create a tunnel. The sample uses port 3333, so be sure to specify it here.

```bash
ngrok http 3333 -host-header=localhost:3333
```

Ngrok will listen to requests from the internet and will route them to your app running on port 3333. You can verify by opening your browser and going to `https://d0ac14a5.ngrok.io/hello` to load your app's hello page. Please be sure to use the forwarding address displayed by ngrok in your console session instead of this URL.

> [!NOTE]
> If you have used a different port in the [build and run](#build-and-run-the-sample) step above, make sure you use the same port number to setup the `ngrok` tunnel.
> [!TIP]
> It is a good idea to run `ngrok` in a different terminal window to keep it running without interfering with the app which you might later have to stop, rebuild and rerun. The `ngrok` session will return useful debugging information in this window.

The app will only be available during the current session on your development machine. If the machine is shut down or goes to sleep the service will no longer be available. Remember this when sharing the app for testing by other users. If you have to restart the service it will return a new address and you will have to update every place that uses that address. The paid version of Ngrok does not have this limitation.

### Host in Azure

Microsoft Azure lets you host your .NET application on a free tier using shared infrastructure. This will be sufficient to run this `Hello World` sample. See [creating a new free account](https://azure.microsoft.com/free/) for more information.

Visual Studio has built-in support for app deployment to different providers, including Azure.

<img width="530px" src="~/assets/images/get-started/publishtoazure1.png" title="Visual Studio"/>

[!include [Use App Studio to configure the app package](~/includes/get-started/get-started-use-app-studio.md)]

## Update the credentials for your hosted app

The sample app requires the following environment variables to be set to the values you made a note of earlier.

Open up the appsettings.json file. Update the *MicrosoftAppId* value with your Bot ID that you saved earlier. Update the *MicrosoftAppPassword* with the Bot password you saved earlier.

<img width="560px" src="~/assets/images/get-started/get-started-net-azure-add-keys.png" title="setting the keys"/>

Once these changes are made, rebuild the app. If you are using ngrok, run the app locally, and if you are hosting in Azure redeploy the app.

## Configure the app tab

Once you install the app into a team, you will need to configure it to show content. Go to a channel in the team where you installed the sample app and click on the **'+'** button to add a new tab. You can then choose `Hello World` from the **Add a tab** list. You will then be presented with a configuration dialog. This dialog will let you choose which tab to display in this channel. Once you select the tab and click on `Save` then you can see the `Hello World` tab loaded with the tab you chose.

<img width="530px" src="~/assets/images/samples-hello-world-tab-configure.png" title="Screenshot of configure" />

### Test your bot in Teams

You can now interact with the bot in Teams. Choose a channel in the team where you registered your app, and type `@your-bot-name`. This is called an **\@mention**. Whatever message you send to the bot will be sent back to you as a reply.

<img width="450px" title="Bot responses" src="~/assets/images/samples-hello-world-bot.png" />

### Test your messaging extension

To test your messaging extension, you can click on the three dots below the input box in your conversation view. A menu will pop up with the **'Hello World'** app in it. When you click it, you will see a bunch of random texts showing up. You can choose any one of them and it will be inserted it into your conversation.

<img width="530px" title="Messaging extension menu" src="~/assets/images/samples-hello-world-messaging-extensions-menu.png" />

<img width="530px" title="Messaging extension result" src="~/assets/images/samples-hello-world-messaging-extensions-result.png" />

Choose one of the random texts, and you will see a card formatted and ready to send with your own message at the bottom.

<img width="530px" title="Messaging extension send" src="~/assets/images/samples-hello-world-messaging-extensions-send.png" />
