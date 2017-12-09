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

This tutorial helps you get started with creating a Microsoft Teams app using Node.js. You can test the app by loading it into a 'Team' you have permissions for, or into a test tenant created using the Office Developer Program.

The steps to get started at a glance are as follows:

> [!div class="checklist"]
> * Prepare Microsoft Teams for development
> * Get prerequisites
> * Download the sample
> * Build and run the sample
> * Host the sample, either locally or on Azure
> * Deploy the sample app into Microsoft Teams platform (**by this time the manifest would be generated and they should be able to sideload the app**)
> * Configure the content visible in your app (**configure the content visible on the tab; TBD**)

Once you have your app running in the Teams platform, you can enhance it further by adding the following capabilities. Follow along this tutorial to learn how to add these capabilities to your app.

> [!div class="checklist"]
> * Add a bot to your application (**take the user through creation of a simple echo bot that echoes whatever you say**)
> * Add a connector to your application (**Not calling it Office 365 connector yet, but will guide the user to use it if they built an O365 connector before**)
> * Compose rich messages (**adding a simple compose extension**)

[!include[Get teams](~/includes/get-started/step1-prepare-for-dev.md)]

## Get prerequisites

To complete this tutorial, you need to get the following prerequisites:

* [Install Git](https://git-scm.com/downloads)
* [Install Node.js and NPM](https://nodejs.org/)
* Get any text editor. You can install and use [Visual Studio Code](https://code.visualstudio.com/download) for free.

If you see options to add `git`, `node`, `npm`, and `code` to the PATH during installation, choose to do so. It will be handy.

Verify your installation by running the following in a terminal window:

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
1.17.2
b813d12980308015bcd2b3a2f6efa5c810c33ba5
```

## Download the sample

We have provided a [simple 'Hello, World!' sample](https://github.com/OfficeDev/msteams-samples-hello-world-nodejs) to get you started with your app. In a terminal window, run the following command to clone the sample repository to your local machine:

```bash
git clone https://github.com/OfficeDev/msteams-samples-hello-world-nodejs
```

> [!TIP]
> You can [fork](https://help.github.com/articles/fork-a-repo/) this [repo](https://github.com/OfficeDev/msteams-samples-hello-world-nodejs) if you want to modify and checkin your changes to GitHub for future reference.

## Build and run the sample

Once the repo is cloned, change to the directory where you cloned the sample to:

```bash
cd msteams-samples-hello-world-nodejs
```

You can use this terminal window to run the commands that follow in this tutorial.

In order to build the sample, you need to install all the dependencies first. Run the following command to get the dependencies installed:

```bash
npm install
```

You should see a bunch of dependencies getting installed. Once they are finished, you can run the following:

```bash
npm start
```

When the node app starts, it displays `App started listening on port 3333` on the terminal window.

> [!NOTE]
> If you see a different port number displayed in the message above, it is because you have a PORT environment variable set. You can continue to use that port or
> change your environment variable to 3333.

At this point, you can open a browser window and navigate to the following URLs to verify that all the app URLs are loading fine:

* [http://localhost:3333](http://localhost:3333)
* [http://localhost:3333/hello](http://localhost:3333/hello)
* [http://localhost:3333/first](http://localhost:3333/first)
* [http://localhost:3333/second](http://localhost:3333/second)

## Host the sample app

Remember apps in Microsoft Teams are web applications exposing one or more capabilities? For the Teams platform to load your app, your app must be reachable from the internet. To make your app reachable from the internet, you need to host your app. You can either host it in Microsoft Azure for free or create a tunnel to the local process using ngrok. When you finish hosting your app either in Azure or tunnel it through ngrok, please make a note of the root URL of your app - e.g. `https://yourteamsapp.azurewebsites.net`.

### Hosting in Azure

Microsoft Azure lets you host your Node.js web application on a free tier using shared infrastructure. This will be sufficient to run our sample.

> [!TIP]
> If you have never used Azure before, you can get started by creating a new free account.
> Follow this guide to help you get started: [Azure developer guide](https://docs.microsoft.com/en-us/azure/guides/developer/azure-developer-guide?toc=/microsoftteams/platform/toc.json&bc=/microsoftteams/platform/breadcrumb/toc.json#understanding-accounts-subscriptions-and-billing).

To get your Node.js app hosted in Azure, you can follow the guide here: [Create a Node.js web app in Azure](/azure/app-service/app-service-web-get-started-nodejs?toc=/microsoftteams/platform/toc.json&bc=/microsoftteams/platform/breadcrumb/toc.json#launch-azure-cloud-shell).

> [!NOTE]
> You would skip the steps to clone the repo from the guide above, because we already are working with a Node.js sample app for Microsoft Teams.
> For your convenience, the link above takes you directly to the location where you should start from, to host your app in Azure.

Once you host your app in Azure, you can verify by opening your browser and going to `https://yourteamsapp.azurewebsites.net` (please be sure to use the right endpoint from your Azure App Service instead of this URL) to load your app's hello page.

### Tunneling using ngrok

If for some reason you are not able to host your app in Azure, you can keep running the app on your local machine and create a tunnel to it through a web endpoint. [`ngrok`](https://ngrok.com) is a free tool that lets you do just that. With `ngrok` you can get a web address such as `https://d0ac14a5.ngrok.io` (this URL is just an example only). You can [download and install](https://ngrok.com/download) 'ngrok' for your environment and once you install it, you can run the following command to create a tunnel.

```bash
ngrok http 3333
```

This will output the forwarding addresses on your console and `ngrok` will keep listening to requests and will route them to your app running on port 3333. You can verify by opening your browser and going to `https://d0ac14a5.ngrok.io/hello` (please be sure to use the forwarding address displayed on your console instead of this URL) to load your app's hello page.

> [!NOTE]
> If you have used a different port in the [build and run](#build-and-run-the-sample) step above, make sure you use the same port number to setup the ngrok tunnel.

## Deploying your app to Microsoft Teams

After hosting your app, you need to do a few updates to your manifest before you are ready to deploy your app to your Microsoft Teams environment.

### The app manifest

The app manifest is a file that tells the Microsoft Teams platform all about your app and the capabilities it provides your users. We will get more into the apps and their capabilities later on [here](~/concepts/apps/apps-overview), but for now we will learn the modifications we need to do to our manifest file so we can load our app in Microsoft Teams.

You can find your manifest file located at `src/manifest.json` within the sample you cloned. Please follow the below steps to make the appropriate changes:

### Step 1: Change the APP ID

You need a unique **ID** for your app to be distinguished from others in the Microsoft Teams platform. This **APP ID** is typically a `GUID` and is set in the app manifest file. You can edit the manifest file in the sample you downloaded.

[!code-json[Manifest file](~/../_msteams-samples-hello-world-nodejs/src/manifest.json#L1-L12)]

### Step 2: Change the URLs

Change the URLs in the manifest. See below.

[!code-json[Manifest file](~/../_msteams-samples-hello-world-nodejs/src/manifest.json#L26-L44)]

### Sideload the app

Once you update the manifest, you can rebuild the sample. This will generate a file `helloworldapp.zip` in the `manifest` directory within the root of the repo. You can upload this zip file to Microsoft Teams to install your app into Teams.

... show where it is to be uploaded; prbably screenshots or more detailed explanation ... or both ...

## Configure the content

When you install an app in Microsoft Teams, you can install the app for a specific team and then configure what content from your app is made visible in the team/channel the app is installed in.

## Add a bot to your app

<!--

1. Install `botbuilder-teams` npm package:

   ```bash
   npm install --save botbuilder-teams
   ```

2. Create a `bot.js` file in the `src` directory, with the following code:

   [!code-javascript[Bot Code](~/../_msteams-samples-hello-world-nodejs/src/bot.js)]

3. Add the following code to your `app.js` file in the same directory:

   [!code-javascript[Adding a bot to app](~/../_msteams-samples-hello-world-nodejs/src/app.js#L35-L37)]

4. Test the bot with the [**Bot Framework Emulator**](https://docs.microsoft.com/en-us/bot-framework/debug-bots-emulator).

5. Register your bot with `Microsoft Bot Framework`.

-->

<!--
> [!div class="nextstepaction"]
> [Move to the next step](get-started-step2)
-->