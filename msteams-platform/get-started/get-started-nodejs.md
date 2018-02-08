---
title: Get started with Node.js
description: Get started building great apps in Microsoft Teams using Node.js
keywords: getting started node.js nodejs
ms.date: 01/02/2018
---
# Get started on the Microsoft Teams platform with Node.js

> [!div class="op_single_selector"]
> - [.NET](~/get-started/get-started-dotnet)
> - [Node.js](~/get-started/get-started-nodejs)

[!include[Step 1 Intro](~/includes/get-started/step1-intro.md)]

This tutorial helps you get started creating a Microsoft Teams app using Node.js. You can test the app by loading it into a Team that you have permissions for, or into a test tenant created using the Office Developer Program. This topic is written to be platform independent.

To create your app:

> [!div class="checklist"]
> * [Prepare your Office 365 tenant](~/get-started/get-started-tenant)
> * [Prepare Microsoft Teams for development](#PrepareMicrosoftTeams)
> * [Get prerequisites](#GetPrerequisites)
> * [Download the sample](#DownloadSample)
> * [Build and run the sample](#BuildRun)
> * [Host the sample](#HostSample)
> * [Deploy your app into Microsoft Teams](#DeployToTeams)
> * [Configure the app tab](#ConfigureTheAppTab)

Once you have your app running in the Teams platform, you can enhance it further by adding the following capabilities. Follow along this tutorial to learn how to add these capabilities to your app.

> [!div class="checklist"]
> * [Add a bot to your app](#AddBot)
> * [Compose rich messages](#ComposeRichMessages)

<a name="PrepareMicrosoftTeams"></a>

[!include[Get teams](~/includes/get-started/step1-prepare-for-dev.md)]

<a name="GetPrerequisites"></a>

## Get prerequisites

To complete this tutorial, you need to get the following tools:

* [Install Git](https://git-scm.com/downloads)
* [Install Node.js and NPM](https://nodejs.org/)
* Get any text editor. You can install and use [Visual Studio Code](https://code.visualstudio.com/download) for free.

If you see options to add `git`, `node`, `npm`, and `code` to the PATH during installation, choose to do so. It will be handy.

Verify your installation by running the following in a terminal window:
> [!NOTE]
> Use the terminal window that you are most comfortable with on your platform. These examples use Bash, but will run on most platforms.

```bash
$ git --version
git version 2.15.0.windows.1

$ node -v
v6.11.4

$ npm -v
5.5.1

$ gulp -v
CLI version 1.4.0
Local version 3.9.1
```

You may have a different version of these applications. This should not be a problem.
If you don't have gulp installed, do so now by running `npm install gulp -g` in your terminal window.

If you have installed Visual Studio Code, you can verify the installation by running:

```bash
code --version
1.18.1
929bacba01ef658b873545e26034d1a8067445e9
```

You can continue to use this terminal window to run the commands that follow in this tutorial.

<a name="DownloadSample"></a>

## Download the sample

We have provided a [simple 'Hello, World!' sample](https://github.com/OfficeDev/msteams-samples-hello-world-nodejs) to get you started. In a terminal window, run the following command to clone the sample repository to your local machine:

```bash
git clone https://github.com/OfficeDev/msteams-samples-hello-world-nodejs
```

> [!TIP]
> You can [fork](https://help.github.com/articles/fork-a-repo/) this [repo](https://github.com/OfficeDev/msteams-samples-hello-world-nodejs) if you want to modify and check in your changes to GitHub for future reference.

<a name="BuildRun"></a>

## Build and run the sample

Once the repo is cloned, change to the directory that holds the sample:

```bash
cd msteams-samples-hello-world-nodejs
```

In order to build the sample, you need to install all its dependencies. Run the following command to do this:

```bash
npm install
```

You should see a bunch of dependencies getting installed. Once they are finished, you can run the app:

```bash
npm start
```

When the hello-world app starts, it displays `App started listening on port 3333` in the terminal window.

> [!NOTE]
> If you see a different port number displayed in the message above, it is because you have a PORT environment variable set. You can continue to use that port or
> change your environment variable to 3333.

At this point, you can open a browser window and navigate to the following URLs to verify that all the app URLs are loading:

* [http://localhost:3333](http://localhost:3333)
* [http://localhost:3333/hello](http://localhost:3333/hello)
* [http://localhost:3333/first](http://localhost:3333/first)
* [http://localhost:3333/second](http://localhost:3333/second)

<a name="HostSample"></a>

## Host the sample app

Remember that apps in Microsoft Teams are web applications exposing one or more capabilities. For the Teams platform to load your app, your app must be reachable from the internet. To make your app reachable from the internet, you need to host your app. You can either host it in Microsoft Azure for free or create a tunnel to the local process on your development machine using `ngrok`. When you finish hosting your app make a note of its root URL. It will look something like: `https://yourteamsapp.ngrok.io` or `https://yourteamsapp.azurewebsites.net`.

### Tunnel using ngrok

For quick testing you can run the app on your local machine and create a tunnel to it through a web endpoint. [ngrok](https://ngrok.com) is a free tool that lets you do just that. With ngrok you can get a web address such as `https://d0ac14a5.ngrok.io` (this URL is just an example). You can [download and install](https://ngrok.com/download) ngrok for your environment. Make sure you add it to a location in your `PATH`.

Once you install it, you can open a new terminal window and run the following command to create a tunnel. The sample uses port 3333, so be sure to specify it here.

```bash
ngrok http 3333
```

Ngrok will listen to requests from the internet and will route them to your app running on port 3333. You can verify by opening your browser and going to `https://d0ac14a5.ngrok.io/hello` to load your app's hello page. Please be sure to use the forwarding address displayed by ngrok in your console session instead of this URL.

> [!NOTE]
> If you have used a different port in the [build and run](#build-and-run-the-sample) step above, make sure you use the same port number to setup the `ngrok` tunnel.
> [!TIP]
> It is a good idea to run `ngrok` in a different terminal window to keep it running without interfering with the node app which you might later have to stop, rebuild and rerun. The `ngrok` session will return useful debugging information in this window.

The app will only be available during the current session on your development machine. If the machine is shut down or goes to sleep the service will no longer be available. Remember this when sharing the app for testing by other users. If you have to restart the service it will return a new address and you will have to update every place that uses that address.

### Host in Azure

Microsoft Azure lets you host your Node.js web application on a free tier using shared infrastructure. This will be sufficient to run this Hello-world sample. See [creating a new free account](https://azure.microsoft.com/en-us/free/) for more information.

For more information on Azure see the [Azure developer guide](https://docs.microsoft.com/en-us/azure/guides/developer/azure-developer-guide).

You can host your app using the Azure Cloud Shell found on the [Microsoft Azure Dashboard](https://ms.portal.azure.com).

<img width="300px" title="Azure Cloud Shell" src="~/assets/images/get-started/azure-cloud-shell.png"/>

Follow the steps in [Create a Node.js web app in Azure](/azure/app-service/app-service-web-get-started-nodejs?toc=/microsoftteams/platform/toc.json&bc=/microsoftteams/platform/breadcrumb/toc.json#launch-azure-cloud-shell) to host your app in Azure.

Once you host your app in Azure, you can verify by opening your browser and going to `https://yourteamsapp.azurewebsites.net` (please be sure to use the right endpoint from your Azure App Service instead of this URL) to load your app's hello page.

<a name="DeployToTeams"></a>

## Deploy your app to Microsoft Teams

After hosting your app, you need to do a few updates to your app before it is ready to be deployed to your Microsoft Teams environment.

### The app manifest

The app manifest is a file that tells the Microsoft Teams platform all about your app and the capabilities it provides your users. You will learn more about apps and their capabilities later [here](~/concepts/apps/apps-overview), but for now focus on the modifications to the manifest needed to load the hello-world app in Microsoft Teams.

You can find the manifest file at `src/manifest.json` within the hello-world sample. Please follow these steps to make the appropriate changes:

#### Step 1: Change the APP ID in the manifest

You need a unique **ID** to distinguish your app from others on the Microsoft Teams platform. This **APP ID** is a `GUID` and is set in the app manifest file.

To get a unique value for your app follow the instructions in [Create a bot for Microsoft Teams](~/concepts/bots/bots-create). You will use the App Framework website to register your app. Use your app URL for the Messaging endpoint, followed by `"/api/messages"`. This should look something like: `https://d0ac14a5.ngrok.io/api/messages`.

Make a note of the **APP ID** and at least one password generated by the Bot Framework. You will need this information later.

Now edit the manifest file and set the value of the `"id"` property to the AppID returned by BotFramework.

[!code-json[Manifest file](~/../_msteams-samples-hello-world-nodejs/src/manifest.json#L1-L12)]

You will also need to change the botID value in the bots and the composeExtensions sections later in the manifest.

[!code-json[Manifest file](~/../_msteams-samples-hello-world-nodejs/src/manifest.json#L41-L49)]

[!code-json[Manifest file](~/../_msteams-samples-hello-world-nodejs/src/manifest.json#L50-L67)]

You will learn more about Bots later in this guide.

#### Step 2: Change the URLs in the manifest

Change the URLs that point to `yourteamsapp.ngrok.io` to the URLs where the app is hosted. Microsoft Teams will load your app from this location.

[!code-json[Manifest file](~/../_msteams-samples-hello-world-nodejs/src/manifest.json#L26-L40)]

### Upload the app

Once you update the manifest, you can rebuild the sample. To rebuild run the following command in the app terminal window, stopping the app if needed:

```bash
gulp
```

This will generate a file `helloworldapp.zip` in the `manifest` directory within the root of the project directory.

Use the **Upload a custom app** link in Teams to upload this zip file and install your app into one of the teams you own. See **Load your package into a team** in [Upload your app in Microsoft Teams](~/concepts/apps/apps-upload) for more information on how to do this.

> [!NOTE]
> You might have stopped the node process in order to rebuild the app. If so, you will need to rerun the node process using the `npm start` command described in [Build and run the sample](#BuildRun).

<a name="ConfigureTheAppTab"></a>

## Configure the app tab

Once you install the app into a team, you will need to configure it to show content. Go to a channel in the team and click on the **'+'** button to add a new tab. You can then choose `Hello World` from the **Add a tab** list.  You will then be presented with a configuration dialog. This dialog will let you choose which tab to display in this channel. Once you select the tab and click on `Save` then you can see the `Hello World` tab loaded with the tab you chose.

<img width="530px" src="~/assets/images/samples-hello-world-tab-configure.png" title="Screenshot of configure" />

<a name="AddBot"></a>

## Add a bot to your app

The sample already comes with a bot. The bot is defined in the manifest and looks like this:

[!code-json[Manifest file](~/../_msteams-samples-hello-world-nodejs/src/manifest.json#L41-L49)]

You need a bot definition for each bot contained in your app. In this case you already have a bot and have given it a registered **bot ID**, so all you will do is add credentials for the bot and test it.

### Add credentials for the bot
In the hello-world project navigate to a folder named config. In this folder you will find a json file called default. This file contains the following code:

[!code-json[Manifest file](~/../_msteams-samples-hello-world-nodejs/config/default.json#L1-L6)]

Earlier you made note of the **APP ID** from the bot framework as well as a password. Use those vales for "microsoftAppId" and "microsoftAppPassword" in the config.js file. This is not a particularly safe location to store credentials, but it will work for this example.

After these values are changed the app must be stopped, built using 'gulp', and run again using 'npm start'. Reload the app using the newly built zip file in Microsoft Teams.

Do NOT stop your ngrok session or you will have to update all the ngrok urls associated with your app.

### Test the bot with the bot emulator

Before you run the bot in Teams, confirm that the bot works as expected  using the [Bot Framework Emulator](/bot-framework/debug-bots-emulator?toc=/microsoftteams/platform/toc.json&bc=/microsoftteams/platform/breadcrumb/toc.json), a desktop application that allows bot developers to test and debug their bots.

Once you have the emulator running, you will need three things to set up a connection:

* The endpoint URL, which is the address where your bot is exposed.  It can be the local address 'http://localhost:3333/api/messages', or an external address using the ngrok tunnel you set up earlier like `https://d0ac14a5.ngrok.io/api/messages`.
* The Microsoft App ID, which is the **ID** you used earlier.
* The Microsoft App Password from the Bot Framework which you made a note of earlier.

> [!TIP]
> To verify your bot is working, just verify that it is echoing back whatever you say to it.

If the bot is not working, check to see if your app is running, and check ngrok if you are using it.

### Test your bot in Teams

You can now interact with the bot in Teams. Choose a channel in the team where you registered your app, and type `@your-bot-name`. This is called an **@mention**. Whatever message you send to the bot will be sent back to you as a reply.

<img width="450px" title="Bot responses" src="~/assets/images/samples-hello-world-bot.png" />

<a name="ComposeRichMessages"></a>

## Compose rich messages

The Microsoft Teams developer platform allows users to compose custom rich messages in their conversations through a feature called **Messaging Extensions**. Messaging extensions are used when you want to insert smart content into conversations, typically triggered by a search like action. For example you can use messaging extensions to insert a specific work item with its summary details such as title, assigned to, due dates, and links to access it directly on your planning application while starting a conversation about it. Messaging extensions are built over bots through special APIs and commands. Once you have a bot in the app, it is very easy to extend the bot to also handle **messaging extensions**.

### Update the app manifest and reload the app in teams again

The hello-world sample comes with a built in messaging extension, which looks something like this:

[!code-json[Manifest file](~/../_msteams-samples-hello-world-nodejs/src/manifest.json#L50-L67)]

You have already updated the botId used by the compose extension so there is no need to do that again.

### Test your messaging extension

To test your messaging extension, you can click on the three dots below the input box in your conversation view. A menu will pop up with the **'Hello World'** app in it. When you click it, you will see a bunch of random texts showing up. You can choose any one of them and it will be inserted it into your conversation.

<img width="530px" title="Messaging extension menu" src="~/assets/images/samples-hello-world-messaging-extensions-menu.png" />

<img width="530px" title="Messaging extension result" src="~/assets/images/samples-hello-world-messaging-extensions-result.png" />

<img width="530px" title="Messaging extension send" src="~/assets/images/samples-hello-world-messaging-extensions-send.png" />
