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

After the repository is cloned, you can build the sample app.

1. Open a terminal window.
1. Run the change directory command in the terminal to change to the sample app directory:

    ```bash
    cd Microsoft-Teams-Samples/samples/app-hello-world/nodejs/
    ```

1. Install all dependencies using the following command:

    ```bash
    npm install
    ```

    You should see a bunch of dependencies getting installed.

1. Run the app using the following command after installation is complete:

    ```bash
    npm start
    ```

    When the Hello World app starts, it displays `App started listening on port 3333` in the terminal window.

    > [!NOTE]
    > If you see a different port number displayed in the message above, it is because you have a PORT environment variable set. You can continue to use that port or
    > change your environment variable to 3333.

1. Open a browser window and use to the following URLs to verify that all the Hello World app URLs are loading:

    - `http://localhost:3333`

        :::image type="content" source="../assets/images/teams-toolkit-v2/local-host.png" alt-text="Image showing Node.js local host" border="false":::

    - `http://localhost:3333/hello`

        :::image type="content" source="../assets/images/teams-toolkit-v2/local-host-hello-nodejs.png" alt-text="Image showing Node.js local host hello page" border="false":::

    - `http://localhost:3333/first`

        :::image type="content" source="../assets/images/teams-toolkit-v2/local-host-first-nodejs.png" alt-text="Image showing Node.js local host first tab" border="false":::

    - `http://localhost:3333/second`

        :::image type="content" source="../assets/images/teams-toolkit-v2/local-host-second-nodejs.png" alt-text="Image showing Node.js local host second tab" border="false":::

## Deploy your sample app

Remember that apps in Microsoft Teams are web applications exposing one or more capabilities. Make your app available on the internet so that the Teams platform can load it. To make your app reachable from the internet, you need to *host* your app.

For local testing, you can run the app on your local machine and create a tunnel to it with a web endpoint. [ngrok](https://ngrok.com) is a free tool that lets you do just that. With *ngrok*, you can get a web address such as `https://d0ac14a5.ngrok.io` (this URL is just an example). You can [download and install](https://ngrok.com/download) *ngrok* for your environment. Make sure you add it to a location in your `PATH`.

### Create an ngrok tunnel

After you install ngrok, you can create a tunnel to deploy your app locally.

1. Open a new terminal window.
1. Run the following command to create a tunnel. The sample app uses port 3333:

    ```bash
    ngrok http 3333 -host-header=localhost:3333

    The ngrok tunnel is created.

    :::image type="content" source="../assets/images/teams-toolkit-v2/nodejs-ngrok-tunnel.png" alt-text="Image showing ngrok tunnel" border="false":::

    *Ngrok* listens to requests from the internet and will route them to your app running on port 3333.

To verify the app's local deployment:

1. Opening your browser.
1. Load your app using the following URL:

    `https://<forwarding address in ngrok console session>/hello`

    Here's an example of the URL:

    :::image type="content" source="../assets/images/teams-toolkit-v2/nodejs-ngrok-tunnel-verify.png" alt-text="Image showing node.js app running locally on ngrok tunnel" border="false":::

1. Make a note of the forwarding address in ngrok console. You need this URL to deploy your app in teams.

> [!NOTE]
> If you used a different port during [build and run](#build-and-run-the-sample), make sure you use the same port number to setup the *ngrok* tunnel.
> [!TIP]
> It is a good idea to run *ngrok* in a different terminal window to keep it running without interfering with the node app which you might later have to stop, rebuild and rerun. The *ngrok* session will return useful debugging information in this window.

The paid version of *ngrok* allows persistent names.

If you use the free version, your app will be available only during the current session on your development machine. It isn't available if the machine is shut down or goes to sleep. When you restart the service, it returns a new address. Then, you must update every location that uses the outdated address. Remember this step when sharing the app for testing.

Note the URL of your app for registering the app with Teams. You can register the app using App studio or Developer Portal.

<a name="DeployToTeams"></a>

## Build Node.js app package

You use `gulp CLI` to build the app package for Node.js.

1. Open terminal window.
1. Run the following command to build the Node.js app package.

    $ gulp
    [13:39:27] Using gulpfile ~\documents\github\msteams-samples-hello-world-nodejs\gulpfile.js
    [13:39:27] Starting 'clean'...
    [13:39:27] Starting 'generate-manifest'...
    [13:39:27] Finished 'generate-manifest' after 11 ms
    [13:39:27] Finished 'clean' after 21 ms
    [13:39:27] Starting 'default'...
    Build completed. Output in manifest folder
    [13:39:27] Finished 'default' after 62 μs 

    The app package helloworldapp.zip is created. It is placed at:

    `<path to the cloned repo>/Microsoft-Teams-Samples/samples/app-hello-world/nodejs/manifest`
    
    > [!NOTE]
    > Search for the app package file, helloworldapp.zip, if the location is not clear in the tool you are using.

| &nbsp; | &nbsp; |
|:--- | ---:|
|[:::image type="icon" source="../assets/images/get-started/app-roadmap/back-plan.png":::](get-started-nodejs-app-studio.md) | [:::image type="icon" source="../assets/images/get-started/app-roadmap/next-deploy.png":::](deploy-nodejs-app.md)|
|