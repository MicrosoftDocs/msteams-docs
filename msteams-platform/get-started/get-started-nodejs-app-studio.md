---
title: Get started with App Studio and Node.js
description: Get started building great apps in Microsoft Teams using Node.js and App Studio
keywords: getting started node.js nodejs App Studio
ms.date: 10/19/2018
---

# Get started on the Microsoft Teams platform with Node.js and App Studio

The [Microsoft Teams](/microsoftteams/) developer platform makes it easy for you to extend Teams and integrate your own applications and services seamlessly into the Teams workspace. These apps can then be distributed to your enterprise or for teams around the world.

To extend Microsoft Teams, you need to create a Microsoft Teams [app](~/concepts/apps/apps-overview). A Microsoft Teams app is a web application that you host. This app can then be integrated into the user's workspace in Teams.

## Before you start this tutorial

You will need an Office 365 tenant that has been set up for development, and you will need to configure teams to allow you to upload apps. You can work with your Office 365 administrator to confirm that your tenant is ready, or you can install a private evaluation version of Office 365 that you can manage. For more information see these topics:

- [Prepare your Office 365 tenant](~/get-started/get-started-tenant)
- [Prepare Microsoft Teams for development](~/get-started/get-started-configure-teams)

<a name="DownloadAndHost"></a>

## Download and host your app

Follow these steps to download and host a simple "hello world" app in Teams:

- Download the "hello world" sample app
- Host it on the internet so that Teams can find it
- Use App Studio (a Teams app) to create and upload a Teams app package that tells Teams about your app and where to look for it
- Add a bot to your app
- Compose rich messages

<a name="GetPrerequisites"></a>

### Get prerequisites

To complete this tutorial, you need the following tools. If you don't already have them you can install them from these links.

- [Git](https://git-scm.com/downloads)
- [Node.js and NPM](https://nodejs.org/)
- Get any text editor. You can install and use [Visual Studio Code](https://code.visualstudio.com/download) for free.

If you see options to add `git`, `node`, `npm`, and `code` to the PATH during installation, choose to do so. It will be handy.

Verify that the tools are available by running the following in a terminal window:
> [!NOTE]
> Use the terminal window that you are most comfortable with on your platform. These examples use Bash (which is included in Git), but these scripts will run on most platforms.

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

### Download the sample

We have provided a simple [Hello, World!](https://github.com/OfficeDev/msteams-samples-hello-world-nodejs) sample to get you started. In a terminal window, run the following command to clone the sample repository to your local machine:

```bash
git clone https://github.com/OfficeDev/msteams-samples-hello-world-nodejs.git
```

> [!TIP]
> You can [fork](https://help.github.com/articles/fork-a-repo/) this [repo](https://github.com/OfficeDev/msteams-samples-hello-world-nodejs) if you want to modify and check in your changes to your GitHub repo for future reference.

<a name="BuildRun"></a>

### Build and run the sample

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

- [http://localhost:3333](http://localhost:3333)
- [http://localhost:3333/hello](http://localhost:3333/hello)
- [http://localhost:3333/first](http://localhost:3333/first)
- [http://localhost:3333/second](http://localhost:3333/second)

<a name="HostSample"></a>

### Host the sample app

Remember that apps in Microsoft Teams are web applications exposing one or more capabilities. For the Teams platform to load your app, your app must be reachable from the internet. To make your app reachable from the internet, you need to *host* your app.

#### Host on the web using Azure

You can host your sample app on any web service that you have access to, such Azure where you can host this app for free. See [Host your .NET Teams app in Azure](~/get-started/get-started-nodejs-in-azure) for detailed instructions using this sample. Once your app is hosted, make a note of the hosted apps URL. Notepad works fine for this purpose. You will need this later when you deploy your app to teams.

#### Host locally using *ngrok*

For quick testing you can run the app on your local machine and create a tunnel to it through a web endpoint. [ngrok](https://ngrok.com) is a free tool that lets you do just that. With *ngrok* you can get a web address such as `https://d0ac14a5.ngrok.io` (this URL is just an example). You can [download and install](https://ngrok.com/download) *ngrok* for your environment. Make sure you add it to a location in your `PATH`.

Once you install it, you can open a new terminal window and run the following command to create a tunnel. The sample uses port 3333, so be sure to specify it here.

```bash
ngrok http 3333
```

*Ngrok* will listen to requests from the internet and will route them to your app running on port 3333. You can verify by opening your browser and going to `https://d0ac14a5.ngrok.io/hello` to load your app's hello page. Please be sure to use the forwarding address displayed by *ngrok* in your console session instead of this URL.

> [!NOTE]
> If you have used a different port in the [build and run](#build-and-run-the-sample) step above, make sure you use the same port number to setup the *ngrok* tunnel.
> [!TIP]
> It is a good idea to run *ngrok* in a different terminal window to keep it running without interfering with the node app which you might later have to stop, rebuild and rerun. The *ngrok* session will return useful debugging information in this window.

There is a paid version of *ngrok* that allows persistent names. If you use the free version your app will only be available during the current session on your development machine. If the machine is shut down or goes to sleep the service will no longer be available. Remember this when sharing the app for testing by other users. If you have to restart the service it will return a new address and you will have to update every place that uses that address.

Make a note of the URL of your app because you will need this later when you register the app with Teams using App studio. Notepad works fine for this purpose.

<a name="DeployToTeams"></a>

## Deploy your app to Microsoft Teams

At this point you have an app hosted on the internet, but you have no way yet of telling Teams where to look, or even what your app is called. You now have to create an app package, which is little more than a text file that contains the app manifest, and some icons that the Teams client will use to properly display and brand your app. You can manually create this app package, or you can use App Studio, an app that runs in Teams that will simplify the process of registering the app. App Studio is the recommended way of creating the app package.

For either method you will need the following:

- The URL where your app can be found on the internet.
- Icons that Teams will use to brand your app. The sample comes with placeholder icons located in "src\static\images. App Studio also will provide default icons if needed.

### Use App Studio to update the app package

App Studio can simplify the creation of an app, and really helps when adding bots, since manually these these require online registration with Azure bot services.

App Studio is a Teams app that you can install from the Teams store. Simply click on the app store icon at the bottom of the left hand bar in Teams, and search on App Studio.

<img  width="450px" title="Finding App Studio in the Store" src="~/assets/images/get-started/app-studio-store.png"/>

Click on the App Studio tile, and choose *install* in the dialog that pops up.

<img  width="450px" title="Installing App Studio" src="~/assets/images/get-started/app-studio-install.png"/>

When App Studio is installed click on the Manifest editor to begin creating the app package for your Teams app.

<img  width="450px" title="App Studio" src="~/assets/images/get-started/app-studio.png"/>

The sample comes with its own manifest and is designed to build an app package simply by typing `gulp` at the command line in the root directory of the project.

```bash
$ gulp
[13:39:27] Using gulpfile ~\documents\github\msteams-samples-hello-world-nodejs\gulpfile.js
[13:39:27] Starting 'clean'...
[13:39:27] Starting 'generate-manifest'...
[13:39:27] Finished 'generate-manifest' after 11 ms
[13:39:27] Finished 'clean' after 21 ms
[13:39:27] Starting 'default'...
Build completed. Output in manifest folder
[13:39:27] Finished 'default' after 62 μs
```

In the next part of the tutorial you are going to modify this app package by selecting the *Import an existing app* tile in the Manifest Editor.

<img  width="450px" title="Importing an app" src="~/assets/images/get-started/app-studio-import.png"/>

Once the app package has been imported App Studio should look like this.

<img  width="450px" title="Importing an app" src="~/assets/images/get-started/app-studio-imported-app.png"/>

Click on the tile for your newly imported app, *Hello World*.

<img  width="450px" title="Importing an app" src="~/assets/images/get-started/app-studio-manifest-editor.png"/>

There is a list of steps in the left-hand side of the Manifest editor, and on the right a list of properties that need to be filled in for each of those steps. Since you started with a sample app, much of the information is already filled out. The next steps will walk you through changing the parts that need to be updated.

#### App details

Click on the *App details* entry under *Details*. The only thing you need to do here is to let App Studio create a new identifier for your app by clicking the *Generate* button.

Your new app id should look something like: `2322041b-72bf-459d-b107-f4f335bc35bd`.

Scroll through the rest of the App details in the right hand pane, and familiarize yourself with some of the entries such as *Developer information* and *Branding*. These sections become important when you are writing a new app for distribution.

#### Capabilities: Tabs

Tabs are among the simplest elements to add to a Teams app. The sample app already supports several tabs, and you can add them as follows.

##### Team tab

Your app can only have one Team tab.

<img  width="450px" title="Adding a Teams tab" src="~/assets/images/get-started/app-studio-manifest-editor-tabs.png"/>

In this sample, the Team tab is where your configuration page goes. It looks like this:

`https://yourteamsapp.ngrok.io/configure` where `yourteamsapp.ngrok.io` should be replaced by the URL that you used above when hosting your app.  The url is followed by '/configure".

##### Personal tabs

Your app can have up to 16 tabs, including the team tab.

Personal tabs are represented differently from the team tab. You should see *Hello Tab* already listed in the personal tabs list. At the moment it has a placeholder value `com.contoso.helloworld.hellotab`. Click on the *...* symbol at the end of the entry and choose *Edit* from the drop-down. The following dialog will appear.

<img  width="450px" title="Adding a personal tab dialog" src="~/assets/images/get-started/app-studio-manifest-editor-p-tabs-dialog.png"/>

There are two fields that you need to update with your app URL.

- Change Content URL to https://yourteamsapp.com/hello
- Change Website URL to https://yourteamsapp.com/hello

#### Bots

Now click on the bots entry under Capabilities.

<img  width="450px" title="Adding a bot" src="~/assets/images/get-started/app-studio-manifest-editor-bots.png"/>

The hello world sample already has a bot as part of the sample, but it has not been registered with Microsoft yet. To do this, click the *Edit* button below the entry *Imported Bot*.

This will display the *Bot* dialog.

<img  width="450px" title="Adding a bot dialog" src="~/assets/images/get-started/app-studio-manifest-editor-bot-dialog.png"/>

TODO: The current Bot dialog does not allow you to register the bot if the bot was imported from an existing app package that had a placeholder app ID. That blocks further testing.
Generating the APP ID and App Secrets also need to be added to the docs here.

No other setting has to be changed in this dialog. Choose *Save* to exit the dialog.

#### Messaging extensions

The sample app has a messaging extension, which you can enable by clicking on *Messaging extensions* under Capabilities in the left hand column of App Studio.

<img  width="450px" title="Adding a messaging extension" src="~/assets/images/get-started/app-studio-manifest-editor-mess-ext.png"/>

App Studio has imported the sample messaging extension, which is listed in the right hand pane under *Messaging Extensions*. To edit this extension, click the *Edit* button under the extension name.

<img  width="450px" title="Adding a messaging extension dialog" src="~/assets/images/get-started/app-studio-manifest-editor-mess-ext-dialog.png"/>

You can use the same Microsoft App ID as you used for the bot.

TODO: There is no way to update this value in App Studio since the dialog does not allow the value to be changed.  Not sure why.  No content for this yet, since I don't have working messaging extensions to test.

#### Test your app in Teams

Click on the *Test and distribute* item under *Finish* in the left hand column of App Studio.

<img  width="450px" title="Testing your app" src="~/assets/images/get-started/app-studio-manifest-editor-test.png"/>

In order to upload your app to Teams, click the *Install* button under *Test and Distribute*.

<img  width="450px" title="Adding a messaging extension dialog" src="~/assets/images/get-started/app-studio-manifest-editor-test-dialog.png"/>

Be careful what team you add the app to. Most often you will want to set up a special team for testing.

Once you turn off this button, the *Install* button at the bottom of the dialog is activated and can be chosen to finish this process.

This finishes the App Studio portion of this walkthrough.  You should now see your app running in Teams.

<img  width="450px" title="The finished app" src="~/assets/images/get-started/app-studio-finished-app.png"/>

<a name="ConfigureTheAppTab"></a>

## Configure the app tab

Once you install the app into a team, you will need to configure it to show content. Go to a channel in the team and click on the **'+'** button to add a new tab. You can then choose `Hello World` from the **Add a tab** list. You will then be presented with a configuration dialog. This dialog will let you choose which tab to display in this channel. Once you select the tab and click on `Save` then you can see the `Hello World` tab loaded with the tab you chose.

<img width="530px" src="~/assets/images/samples-hello-world-tab-configure.png" title="Screenshot of configure" />

### Test your bot in Teams

You can now interact with the bot in Teams. Choose a channel in the team where you registered your app, and type `@your-bot-name`. This is called an **@mention**. Whatever message you send to the bot will be sent back to you as a reply.

<img width="450px" title="Bot responses" src="~/assets/images/samples-hello-world-bot.png" />

<a name="ComposeRichMessages"></a>

### Test your messaging extension

To test your messaging extension, you can click on the three dots below the input box in your conversation view. A menu will pop up with the **'Hello World'** app in it. When you click it, you will see a bunch of random texts showing up. You can choose any one of them and it will be inserted it into your conversation.

<img width="530px" title="Messaging extension menu" src="~/assets/images/samples-hello-world-messaging-extensions-menu.png" />

<img width="530px" title="Messaging extension result" src="~/assets/images/samples-hello-world-messaging-extensions-result.png" />

<img width="530px" title="Messaging extension send" src="~/assets/images/samples-hello-world-messaging-extensions-send.png" />
