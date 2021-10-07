---
title: Build and Test your first app using C#
description: Learn how to build and test Microsoft Teams apps with C# or .NET.
keywords: getting started .net c# csharp
ms.custom: scenarios:getting-started; languages:ASP.NET,C#
ms.localizationpriority: medium
ms.topic: tutorial
ms.date: 11/09/2018
---

# Build and test your C# app

After you've cloned the repo for C# sample app, you can build and run the app in your local environment.

:::image type="content" source="../assets/images/get-started/app-roadmap/roadmap-p-2.png" alt-text="Image showing phase 2 of building an app." border="false":::

In this page, you'll learn to:
- [Build your first app](#build-your-first-app)
- [Deploy your sample app locally](#deploy-your-sample-app-locally)

## Build your first app

You can build and run the sample after it's cloned.

**To build and run the cloned sample**

1. Open the solution file **Microsoft.Teams.Samples.HelloWorld.sln** from the **Microsoft-Teams-Samples/samples/app-hello-world/csharp** directory of the sample.
    
    :::image type="content" source="../assets/images/teams-toolkit-v2/hello-world-sln-open.png" alt-text="Image showing Hello World solution directory structure" border="false":::

1. Select **Build Solution** from the **Build** menu.
    
    :::image type="content" source="../assets/images/teams-toolkit-v2/app-build-complete.png" alt-text="Image showing build completed" border="false":::

1. Select the Project menu, and select **Microsoft.Teams.Samples.HelloWorld.Web Properties**.
    
    :::image type="content" source="../assets/images/teams-toolkit-v2/vs-project-menu.png" alt-text="Image showing Project menu to select Properties option" border="false":::

    The Properties window appears.

1. Select **Debug** from the left pane.
    
    :::image type="content" source="../assets/images/teams-toolkit-v2/vs-project-properties.png" alt-text="Image showing Properties window" border="false":::

    The Debug pane opens.

1. Move through the screen to view the Web server settings section.
1. Ensure the following:
    - **App URL** is set to `http://localhost:3333/`.
    - **Enable SSL** is cleared.
    
    :::image type="content" source="../assets/images/teams-toolkit-v2/vs-project-web-server-settings.png" alt-text="Image showing Web server settings for C# project properties" border="false":::
    
1. Select the **F5** key, or select **Start Debugging** from the **Debug** menu to run the sample.

    When the app starts, a browser window opens. It shows the root of your app. You can go to the following URLs to verify that all the app URLs are loading:

    - `https://localhost:44327/`
        
        :::image type="content" source="../assets/images/teams-toolkit-v2/local-host-after-debug.png" alt-text="Image showing local host" border="false":::
        
    - `https://localhost:44327/hello`
        
        :::image type="content" source="../assets/images/teams-toolkit-v2/local-host-hello.png" alt-text="Image showing Hello page of the app" border="false":::
        
    - `https://localhost:44327/first`
        
        :::image type="content" source="../assets/images/teams-toolkit-v2/local-host-first-tab.png" alt-text="Image showing first tab of the app" border="false":::
        
    - `https://localhost:44327/second`
        
        :::image type="content" source="../assets/images/teams-toolkit-v2/local-host-second-tab.png" alt-text="Image showing second tab of the app" border="false":::

    > [!Note]
    > If you receive an error `Could not find a part of the path … bin\roslyn\csc.exe`, update the package with the command `Update-Package Microsoft.CodeDom.Providers.DotNetCompilerPlatform -r`. For more information, see [this question on Stack Overflow](https://stackoverflow.com/questions/32780315).

## Deploy your sample app locally

Microsoft Teams apps are web applications that provide one or more capabilities. Make your app available on the internet so that the Teams platform can load it. Host your app using `ngrok` to create a tunnel to the local process on your computer.

After you host your app, make a note of its root URL, such as `https://yourteamsapp.ngrok.io` or `https://yourteamsapp.azurewebsites.net`.

### Tunnel using ngrok

For quick testing, you can run the app on your computer. Create a tunnel to it through a web endpoint. [`ngrok`](https://ngrok.com) is a free tool to obtain a web address, such as `https://d0ac14a5.ngrok.io`. You can [download and install](https://ngrok.com/download) ngrok and add it to a location in your `PATH`.

After you install `ngrok`, open a new terminal window and run the following command to create a tunnel:

```bash
ngrok http 44327 -host-header=localhost:44327
```

`Ngrok` responds to requests from the internet and routes them to your app running on port 44327.

### To verify the response

1. Open your browser and go to `https://d0ac14a5.ngrok.io/hello`. This step loads your app's Hello page.
1. Instead of the URL mentioned in Step 1, use the forwarding address displayed by `ngrok` in your console session.
    > [!NOTE]
    > If you've used a different port during [build](#build-your-first-app), ensure you use the same port number to setup the `ngrok` tunnel.
    > [!TIP]
    > It's a good idea to run `ngrok` in a different terminal window. It helps to keep `ngrok` from interfering with the app. You have to stop, rebuild, and rerun the app. The `ngrok` session provides useful debugging information in this window.

    The app is available only during the current session on your computer. It isn't available if the machine is shut down or goes to sleep. If you restart the service, the app returns a new address. Then, update every location using the old address with the new one. Remember to do this step when you share the app for testing.

    The paid version of `ngrok` doesn't have this limitation.

| &nbsp; | &nbsp; |
|:--- | ---:|
|**Back** : [Plan and Prepare](get-started-dotnet-app-studio.md) | [Deploy your app](deploy-csharp-app.md) : **Next** |
|