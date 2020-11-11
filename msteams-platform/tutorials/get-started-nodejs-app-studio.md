---
title: Get started with App Studio and Node.js
description: Get started building great apps in Microsoft Teams using Node.js and App Studio
keywords: getting started node.js nodejs App Studio
ms.topic: tutorial
ms.custom: scenarios:getting-started; languages:JavaScript,Node.js
---

# Get started on the Microsoft Teams platform with Node.js and App Studio

The [Microsoft Teams](/microsoftteams/) developer platform makes it easy for you to extend Teams and integrate your own applications and services seamlessly into the Teams workspace. These apps can then be distributed to your enterprise or for teams around the world.

To extend Microsoft Teams, you need to create a Microsoft Teams app. A Microsoft Teams app is a web application that you host. This app can then be integrated into the user's workspace in Teams.

[!include [prepare your environment](~/includes/prepare-environment.md)]

<a name="DownloadAndHost"></a>

## Download and host your app

Follow these steps to download and host a simple "hello world" app in Teams.

<a name="GetPrerequisites"></a>

### Get prerequisites

To complete this tutorial, you need the following tools. If you don't already have them you can install them from these links.

- [Git](https://git-scm.com/downloads)
- [Node.js and NPM](https://nodejs.org/)
- Get any text editor or IDE. You can install and use [Visual Studio Code](https://code.visualstudio.com/download) for free.

If you see options to add `git`, `node`, `npm`, and `code` to the PATH during installation, choose to do so. It will be handy.

Verify that the tools are available by running the following in a terminal window:

> [!NOTE]
> Use the terminal window that you are most comfortable with on your platform. These examples use Bash (which is included in Git), but these scripts will run on most platforms.

```bash
$ git --version
git version 2.19.0.windows.1

$ node -v
v8.9.3

$ npm -v
5.5.1

$ gulp -v
CLI version 2.3.0
Local version 4.0.2
```

You may have a different version of these applications. This should not be a problem, except for gulp. For gulp you'll need to use version 4.0.0 or later.

If you don't have gulp installed (or have the wrong version installed), do so now by running `npm install gulp` in your terminal window.

If you have installed Visual Studio Code, you can verify the installation by running:

```bash
code --version
1.28.2
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

For local testing you can run the app on your local machine and create a tunnel to it with a web endpoint. [ngrok](https://ngrok.com) is a free tool that lets you do just that. With *ngrok* you can get a web address such as `https://d0ac14a5.ngrok.io` (this URL is just an example). You can [download and install](https://ngrok.com/download) *ngrok* for your environment. Make sure you add it to a location in your `PATH`.

Once you install it, you can open a new terminal window and run the following command to create a tunnel. The sample uses port 3333, so be sure to specify it here.

```bash
ngrok http 3333 -host-header=localhost:3333
```

*Ngrok* will listen to requests from the internet and will route them to your app running on port 3333. You can verify by opening your browser and going to `https://d0ac14a5.ngrok.io/hello` to load your app's hello page. Please be sure to use the forwarding address displayed by *ngrok* in your console session instead of this URL.

> [!NOTE]
> If you have used a different port in the [build and run](#build-and-run-the-sample) step above, make sure you use the same port number to setup the *ngrok* tunnel.
> [!TIP]
> It is a good idea to run *ngrok* in a different terminal window to keep it running without interfering with the node app which you might later have to stop, rebuild and rerun. The *ngrok* session will return useful debugging information in this window.

There is a paid version of *ngrok* that allows persistent names. If you use the free version your app will only be available during the current session on your development machine. If the machine is shut down or goes to sleep the service will no longer be available. Remember this when sharing the app for testing by other users. If you have to restart the service it will return a new address and you will have to update every place that uses that address.

Remember, make a note of the URL of your app because you will need this later when you register the app with Teams using App studio. Notepad works fine for this purpose.

<a name="DeployToTeams"></a>

## Deploy your app to Microsoft Teams

At this point you have an app hosted on the internet, but you have no way yet of telling Teams where to look for it, or even what your app is called. To do this you now have to create an app package. This is little more than a text file that contains the app manifest and some icons that the Teams client will use to properly display and brand your app. You can manually create this app package, or you can use App Studio, a tool that runs in Teams that will simplify the process of registering the app. App Studio is the recommended way of creating and updating the app package.

For either method you will need the following:

- The URL where your app can be found on the internet.
- Icons that Teams will use to brand your app. The sample comes with placeholder icons located in "src\static\images. App Studio also will provide default icons if needed.

[!include[Use App Studio to configure the app package](~/includes/get-started/get-started-use-app-studio.md)]

## Update your hosted app

The sample app requires the following environment variables to be set to the values you made a note of earlier.

```
MICROSOFT_APP_ID=<YOUR BOT'S APP ID>
MICROSOFT_APP_PASSWORD=<YOUR BOT'S PASSWORD>
WEBSITE_NODE_DEFAULT_VERSION=8.9.4
```

How you do that differs depending on how you hosted your app. The important thing about using environment variables is that these values are part of your environment - they can be accessed by the code for your app, but they are not exposed to third parties who might examine the files that make up your site.

If you are running the app using ngrok you'll need to set up some local environment variables. There are many ways to do this, but the easiest, if you are using Visual Studio Code, is to add a [launch configuration](https://code.visualstudio.com/Docs/editor/debugging#_launch-configurations):

``` 
{
    "type": "node",
    "request": "launch",
    "name": "Launch - Teams Debug",
    "program": "${workspaceRoot}/src/app.js",
    "cwd": "${workspaceFolder}/src",
    "env": {
        "BASE_URI": "https://yourNgrokURL.ngrok.io",
        "MICROSOFT_APP_ID": "00000000-0000-0000-0000-000000000000",
        "MICROSOFT_APP_PASSWORD": "yourBotAppPassword",
        "NODE_DEBUG": "botbuilder",
        "SUPPRESS_NO_CONFIG_WARNING": "y",
        "NODE_CONFIG_DIR": "../config"
    }
}
```

Where:

MICROSOFT_APP_ID and MICROSOFT_APP_PASSWORD is the ID and password, respectively, for your bot.
NODE_DEBUG will show you what's happening in your bot in the Visual Studio Code debug console.
NODE_CONFIG_DIR points to the directory at the root of the repository (by default, when the app is run locally, it looks for it in the src folder).

> [!Note]
> If you have not stopped npm from earlier in the tutorial, you'll need to run `npm stop` in order for Visual Studio Code to pickup your launch configuration variables correctly.

<a name="ConfigureTheAppTab"></a>

## Configure the app tab

Once you install the app into a team, you will need to configure it to show content. Go to a channel in the team and click on the **'+'** button to add a new tab. You can then choose `Hello World` from the **Add a tab** list. You will then be presented with a configuration dialog. This dialog will let you choose which tab to display in this channel. Once you select the tab and click on `Save` you can see the `Hello World` tab loaded with the tab you chose.

<img width="430px" src="~/assets/images/samples-hello-world-tab-configure.png" alt-text="Screenshot of configure" />

### Test your bot in Teams

You can now interact with the bot in Teams. Choose a channel in the team where you registered your app, and type `@your-bot-name`, followed by your message. This is called an **\@mention**. Whatever message you send to the bot will be sent back to you as a reply.

<img width="450px" alt-text="Bot responses" src="~/assets/images/samples-hello-world-bot.png" />

<a name="ComposeRichMessages"></a>

### Test your messaging extension

To test your messaging extension, you can click on the three dots below the input box in your conversation view. A menu will pop up with the **'Hello World'** app in it. When you click it, you will see a number of random texts. You can choose any one of them and it will be inserted it into your conversation.

<img width="430px" alt-text="Messaging extension menu" src="~/assets/images/samples-hello-world-messaging-extensions-menu.png" />

<img width="430px" alt-text="Messaging extension result" src="~/assets/images/samples-hello-world-messaging-extensions-result.png" />

Choose one of the random texts, and you will see a card formatted and ready to send with your own message at the bottom.

<img width="430px" alt-text="Messaging extension send" src="~/assets/images/samples-hello-world-messaging-extensions-send.png" />
