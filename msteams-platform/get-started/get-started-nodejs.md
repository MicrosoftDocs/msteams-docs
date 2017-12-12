---
title: Get started with Node.js
description: Get started building great apps in Microsoft Teams using Node.js
keywords: getting started node.js nodejs
---
# Get started on the Microsoft Teams platform with Node.js

> [!div class="op_single_selector"]
> - [.NET](~/get-started/get-started-dotnet)
> - [Node.js](~/get-started/get-started-nodejs)

[!include[Step 1 Intro](~/includes/get-started/step1-intro.md)]

This tutorial helps you get started creating a Microsoft Teams app using Node.js. You can test the app by loading it into a Team that you have permissions for or into a test tenant created using the Office Developer Program.

To create your app:

> [!div class="checklist"]
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

To complete this tutorial, you need to get the following prerequisites:

* [Install Git](https://git-scm.com/downloads)
* [Install Node.js and NPM](https://nodejs.org/)
* Get any text editor. You can install and use [Visual Studio Code](https://code.visualstudio.com/download) for free.

If you see options to add `git`, `node`, `npm`, and `code` to the PATH during installation, choose to do so. It will be handy.

Verify your installation by running the following in Bash:
> [!NOTE]
> If Bash is not part of your system it will be installed as part of Git.

```bash
$ git --version
git version 2.15.0.windows.1

$ node -v
v6.11.4

$ npm -v
5.5.1
```

If you have installed Visual Studio Code, you can verify the installation by running:

```bash
$ code --version
1.18.1
929bacba01ef658b873545e26034d1a8067445e9
```

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

You can continue to use this terminal window to run the commands that follow in this tutorial.

In order to build the sample, you need to install all the dependencies. Run the following command to do this:

```bash
npm install
```

You should see a bunch of dependencies getting installed. Once they are finished, run the following:

```bash
npm start
```

When the node app starts, it displays `App started listening on port 3333` on the terminal window.

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

Remember that apps in Microsoft Teams are web applications exposing one or more capabilities. For the Teams platform to load your app, your app must be reachable from the internet. To make your app reachable from the internet, you need to host your app. You can either host it in Microsoft Azure for free or create a tunnel to the local process using ngrok. When you finish hosting your app either in Azure or tunnel it through ngrok, please make a note of the root URL of your app - e.g. `https://yourteamsapp.ngrok.io` or `https://yourteamsapp.azurewebsites.net`.

### Tunnel using ngrok

If for some reason you are not able to host your app in Azure, you can keep running the app on your local machine and create a tunnel to it through a web endpoint. [`ngrok`](https://ngrok.com) is a free tool that lets you do just that. With `ngrok` you can get a web address such as `https://d0ac14a5.ngrok.io` (this URL is just an example only). You can [download and install](https://ngrok.com/download) 'ngrok' for your environment and once you install it, you can run the following command to create a tunnel.

```bash
ngrok http 3333
```

This will output the forwarding addresses on your console and `ngrok` will keep listening to requests and will route them to your app running on port 3333. You can verify by opening your browser and going to `https://d0ac14a5.ngrok.io/hello` (please be sure to use the forwarding address displayed on your console instead of this URL) to load your app's hello page.

> [!NOTE]
> If you have used a different port in the [build and run](#build-and-run-the-sample) step above, make sure you use the same port number to setup the ngrok tunnel.
> [!TIP]
> It is a good idea to run `ngrok` in a different terminal window to keep it running without interfering with the node app which you might later have to stop, rebuild and rerun.

### Host in Azure

Microsoft Azure lets you host your Node.js web application on a free tier using shared infrastructure. This will be sufficient to run our sample.

> [!TIP]
> If you have never used Azure before, you can get started by creating a new free account.
> Follow this guide to help you get started: [Azure developer guide](https://docs.microsoft.com/en-us/azure/guides/developer/azure-developer-guide?toc=/microsoftteams/platform/toc.json&bc=/microsoftteams/platform/breadcrumb/toc.json#understanding-accounts-subscriptions-and-billing).

To get your Node.js app hosted in Azure, you can follow the guide here: [Create a Node.js web app in Azure](/azure/app-service/app-service-web-get-started-nodejs?toc=/microsoftteams/platform/toc.json&bc=/microsoftteams/platform/breadcrumb/toc.json#launch-azure-cloud-shell).

> [!NOTE]
> You would skip the steps to clone the repo from the guide above, because we already are working with a Node.js sample app for Microsoft Teams.
> For your convenience, the link above takes you directly to the location where you should start from, to host your app in Azure.

Once you host your app in Azure, you can verify by opening your browser and going to `https://yourteamsapp.azurewebsites.net` (please be sure to use the right endpoint from your Azure App Service instead of this URL) to load your app's hello page.

<a name="DeployToTeams"></a>

## Deploy your app into Microsoft Teams

After hosting your app, you need to do a few updates to your manifest before you are ready to deploy your app to your Microsoft Teams environment.

### The app manifest

The app manifest is a file that tells the Microsoft Teams platform all about your app and the capabilities it provides your users. We will get more into the apps and their capabilities later on [here](~/concepts/apps/apps-overview), but for now we will learn the modifications we need to do to our manifest file so we can load our app in Microsoft Teams.

You can find your manifest file located at `src/manifest.json` within the sample you cloned. Please follow the below steps to make the appropriate changes:

#### Step 1: Change the APP ID

You need a unique **ID** for your app to be distinguished from others in the Microsoft Teams platform. This **APP ID** is typically a `GUID` and is set in the app manifest file. You can edit the manifest file in the sample you downloaded and set the value of the `"id"` property to a new `GUID`.

[!code-json[Manifest file](~/../_msteams-samples-hello-world-nodejs/src/manifest.json#L1-L12)]

#### Step 2: Change the URLs

Change the URLs that point to `yourteamsapp.ngrok.io` in the manifest and use the URLs where the app is hosted. Microsoft Teams will load your app from this location. See below.

[!code-json[Manifest file](~/../_msteams-samples-hello-world-nodejs/src/manifest.json#L26-L40)]

### Sideload the app

Once you update the manifest, you can rebuild the sample. To rebuild run the following command:

```bash
gulp
```

This will generate a file `helloworldapp.zip` in the `manifest` directory within the root of the project directory. You can upload this zip file to Microsoft Teams to install your app into one of the teams you own via the **Upload a custom app** link.

> [!NOTE]
> You might have stopped the node process in order to rebuild the app. If so, you will need to rerun the node process using `npm start` command as described above.

**TODO**: ... show where it is to be uploaded; probably screenshots or more detailed explanation ... or both ...

<a name="ConfigureTheAppTab"></a>

## Configure the app tab

Once you install the app into a team, you will need to configure the app to show the relevant content for the team. Go to a channel in the team you installed the app and click on the **'+'** button to add a new tab. You can then choose `Hello World` app from the list and you will be presented with a configuration dialog. This dialog will let you choose which tab to display in this channel. Once you select the tab and click on `Save` then you can see the `Hello World` tab loaded with the tab you chose.

<img width="530px" src="~/assets/images/samples-hello-world-tab-configure.png" title="Screenshot of configure" />

<a name="AddBot"></a>

## Add a bot to your app

The sample already comes with a bot. In this step we will test the bot, register it, and update our app in Microsoft Teams platform.

### Test and register the bot

To test the bot we will use the [Bot Framework Emulator](/bot-framework/debug-bots-emulator?toc=/microsoftteams/platform/toc.json&bc=/microsoftteams/platform/breadcrumb/toc.json). Follow the instructions provided in the link and verify that your bot is working fine.

> [!TIP]
> To verify your bot is working, just verify that it is echoing back whatever you say to it.

Once the bot is working, we need to register the bot so we can add this to our teams app. To register the bot with bot framework, follow the steps outlined here: [Register a bot with the Bot Framework](/bot-framework/portal-register-bot?toc=/microsoftteams/platform/toc.json&bc=/microsoftteams/platform/breadcrumb/toc.json).

> [!NOTE]
> The registration process above suggests you to set `MICROSOFT_APP_ID` and `MICROSOFT_APP_PASSWORD` as environment variables for Node.js apps. Note that the `MICROSOFT_APP_ID` value here is also the Bot ID.

### Update the app manifest and reload the app in teams

After testing the bot, you should update the bot id in the app manifest file. Update the `"botId"` property in the manifest file. See below:

[!code-json[Manifest file](~/../_msteams-samples-hello-world-nodejs/src/manifest.json#L41-L49)]

After updating the manifest, you should rebuild the app using `gulp` and rerun the app using `npm` as described above. When you rebuild your app, you will get an updated app file `helloworldapp.zip` in the `manifest` directory. Reload the app using this new zip file into Microsoft Teams platform.

### Test your app with the bot

After reloading the app into Microsoft Teams platform you can now interact with the bot. To invoke a response from the bot, you can **@mention** the bot using `@msteams-hw`. Whatever message you send to the bot will be sent back to you as a reply.

<img width="450px" title="Bot responses" src="~/assets/images/samples-hello-world-bot.png" />

<a name="ComposeRichMessages"></a>

## Compose rich messages

Microsoft Teams platform allows the users to compose rich messages into their conversations using a feature called **Messaging Extensions**. Messaging extensions are typically used when you have to provide some smart content to be inserted into the conversations, typically triggered by a search like action. For example, you can use messaging extensions to insert a specific work item with its summary details such as title, assigned to, due dates, and links to access it directly on your planning application while starting a conversation about it. Messaging extensions are built over bots through special API and commands. Once you have a bot in the app, it is very easy to extend the bot to also handle **messaging extensions**.

### Update the app manifest and reload the app in teams again

Our sample comes with a built in messaging extension. To enable the messaging extension, we need to update our `manifest` file with the Bot ID in the messaging extensions section of our manifest. See below and update the `"botId"` property in the `manifest` file:

[!code-json[Manifest file](~/../_msteams-samples-hello-world-nodejs/src/manifest.json#L50-L67)]

> [!NOTE]
> Note that our manifest file refers to messaging extensions as `composeExtensions`.

After updating the manifest, you should rebuild the app using `gulp` and rerun the app using `npm` as described above. When you rebuild your app, you will get an updated app file `helloworldapp.zip` in the `manifest` directory. Reload the app using this new zip file into Microsoft Teams platform.

### Test your messaging extension

To test your messaging extension, you can click on the three dots below the input box in your conversation view. A menu will pop up with the **'Hello World'** app in it. When you click it, you will see a bunch of random texts showing up. You can choose any one of them to be inserted into your conversation.

<img width="530px" title="Messaging extension menu" src="~/assets/images/samples-hello-world-messaging-extensions-menu.png" />

<img width="530px" title="Messaging extension result" src="~/assets/images/samples-hello-world-messaging-extensions-result.png" />

<img width="530px" title="Messaging extension send" src="~/assets/images/samples-hello-world-messaging-extensions-send.png" />
