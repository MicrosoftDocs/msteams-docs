---
title: Build your first app using Node.js
description: Learn how to build Microsoft Teams apps with Node.js.
keywords: getting started node.js nodejs
ms.topic: tutorial
ms.localizationpriority: medium
ms.custom: scenarios:getting-started; languages:JavaScript,Node.js
---

# Build and test your Node.js app

After you have cloned the repo for C# sample app, you can build and test the app in your local environment.

:::image type="content" source="../assets/images/get-started/app-roadmap/roadmap-p-2.png" alt-text="Image showing phase 2 of building an app." border="false":::

In this page, you'll learn to:
- [Build and run your first app](#build-and-run-the-sample)
- [Deploy your sample app](#deploy-your-sample-app)

## Build and run the sample

After the repository is cloned, run the change directory command in terminal to change the directory to the sample:

```bash
cd Microsoft-Teams-Samples/samples/app-hello-world/nodejs/
```

In build the sample, install all its dependencies using the following command:

```bash
npm install
```

You should see a bunch of dependencies getting installed. After installation you can run the app with the following command:

```bash
npm start
```

When the hello-world app starts, it displays `App started listening on port 3333` in the terminal window.

> [!NOTE]
> If you see a different port number displayed in the message above, it is because you have a PORT environment variable set. You can continue to use that port or
> change your environment variable to 3333.

At this point, you can open a browser window and navigate to the following URLs to verify that all the app URLs are loading:

- `http://localhost:3333`
- `http://localhost:3333/hello`
- `http://localhost:3333/first`
- `http://localhost:3333/second`

<a name="HostSample"></a>

## Deploy your sample app

Remember that apps in Microsoft Teams are web applications exposing one or more capabilities. Make your app available on the internet so that the Teams platform can load it. To make your app reachable from the internet, you need to *host* your app.

For local testing, you can run the app on your local machine and create a tunnel to it with a web endpoint. [ngrok](https://ngrok.com) is a free tool that lets you do just that. With *ngrok*, you can get a web address such as `https://d0ac14a5.ngrok.io` (this URL is just an example). You can [download and install](https://ngrok.com/download) *ngrok* for your environment. Make sure you add it to a location in your `PATH`.

After you install it, open a new terminal window. Run the following command to create a tunnel. The sample uses port 3333, so use that value:

```bash
ngrok http 3333 -host-header=localhost:3333
```

*Ngrok* will listen to requests from the internet and will route them to your app running on port 3333. You can verify by opening your browser and going to `https://d0ac14a5.ngrok.io/hello` to load your app's hello page. Ensure that you use the forwarding address displayed by *ngrok* in your console session instead of this URL.

> [!NOTE]
> If you used a different port during [build and run](#build-and-run-the-sample), make sure you use the same port number to setup the *ngrok* tunnel.
> [!TIP]
> It is a good idea to run *ngrok* in a different terminal window to keep it running without interfering with the node app which you might later have to stop, rebuild and rerun. The *ngrok* session will return useful debugging information in this window.

The paid version of *ngrok* allows persistent names. 
If you use the free version, your app will be available only during the current session on your development machine. It isn't available if the machine is shut down or goes to sleep. When you restart the service, it returns a new address. Then, you must update every location that uses the outdated address. Remember this step when sharing the app for testing.

Note of the URL of your app for registering the app with Teams. You can register the app using App studio or Developer Portal.

<a name="DeployToTeams"></a>

|  <<  |  >>  |
|:--- | ---:|
|**Back** : [1. Plan and Prepare](get-started-nodejs-app-studio.md) | [3. Deploy your app in Azure](deploy-nodejs-app.md) : **Next** |
|

## See also

* [Tutorials Overview](code-samples.md)
* [Code Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples)