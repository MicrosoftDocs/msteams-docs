---
title: Build and Test your first app using C#
description: Learn how to build and test Microsoft Teams apps with C# or .NET.
keywords: getting started .net c# csharp
ms.custom: scenarios:getting-started; languages:ASP.NET,C#
ms.localizationpriority: medium
ms.topic: tutorial
ms.date: 11/09/2018
---

# Build and Test your app

After you have cloned the repo for C# sample app, you can build and test the app in your local environment.

:::image type="content" source="../assets/images/get-started/app-roadmap/roadmap-p-2.png" alt-text="Image showing phase 2 of building an app." border="false":::

In this page, you'll learn to:
- [Build and run your first app](#build-and-run-the-sample)
- [Test your app](#test-your-sample-app)

## Build and run the sample

You can build and run the sample after it is cloned.

**To build and run the cloned sample**

1. Open the solution file **Microsoft.Teams.Samples.HelloWorld.sln** from the **Microsoft-Teams-Samples/samples/app-hello-world/csharp** directory of the sample.
1. Select **Build Solution** from the **Build** menu.
1. Select the **F5** key, or select **Start Debugging** from the **Debug** menu to run the sample.

    When the app starts, a browser window opens. It shows the root of your app. You can go to the following URLs to verify that all the app URLs are loading:

    - `https://localhost:44327/`
    - `https://localhost:44327/hello`
    - `https://localhost:44327/first`
    - `https://localhost:44327/second`

    > [!Note]
    > If you receive an error `Could not find a part of the path … bin\roslyn\csc.exe`, update the package with the command `Update-Package Microsoft.CodeDom.Providers.DotNetCompilerPlatform -r`. For more information, see [this question on Stack Overflow](https://stackoverflow.com/questions/32780315).

    <a name="hostsample"></a>

## Test your sample app

Microsoft Teams apps are web applications that provide one or more capabilities. Make your app available on the internet so that the Teams platform can load it. You can host your app in one of the following ways:
- Host it in Microsoft Azure for free 
- Create a tunnel to the local process on your computer using `ngrok`.

After you host your app, make a note of its root URL, such as `https://yourteamsapp.ngrok.io` or `https://yourteamsapp.azurewebsites.net`.

### Tunnel using ngrok

For quick testing, you can run the app on your computer. Create a tunnel to it through a web endpoint. [`ngrok`](https://ngrok.com) is a free tool to obtain a web address, such as `https://d0ac14a5.ngrok.io`. You can [download and install](https://ngrok.com/download) ngrok and add it to a location in your `PATH`.

After you install `ngrok`, open a new terminal window and run the following command to create a tunnel:

```bash
ngrok http 44327 -host-header=localhost:44327
```

`Ngrok` responds to requests from the internet and routes them to your app running on port 44327. 

**To verify the response**

1. Open your browser and go to `https://d0ac14a5.ngrok.io/hello`. This step loads your app's Hello page.
1. Instead of the URL mentioned in Step 1, use the forwarding address displayed by `ngrok` in your console session.
    > [!NOTE]
    > If you've used a different port during [build and run](#build-and-run-the-sample), ensure you use the same port number to setup the `ngrok` tunnel.
    > [!TIP]
    > It's a good idea to run `ngrok` in a different terminal window. It helps to keep `ngrok` from interfering with the app. You have to stop, rebuild, and rerun the app. The `ngrok` session provides useful debugging information in this window.

    The app is available only during the current session on your computer. It isn't available if the machine is shut down or goes to sleep. If you restart the service, the app returns a new address. Then, update every location using the old address with the new one. Remember to do this step when you share the app for testing. 
    
    The paid version of `ngrok` doesn't have this limitation.

**To update the credentials for your hosted app**

1. Open the `appsettings.json` file. 
1. Update the **MicrosoftAppId** value with your bot ID that you saved in the text file. 
1. Update the **MicrosoftAppPassword** with the bot password that you saved.

    <img width="560px" alt="Setting the keys" src="~/assets/images/get-started/get-started-net-azure-add-keys.png"/>

    After making these changes, rebuild the app. If you're using ngrok, you can run the app locally, and if you've hosted it in Azure, redeploy the app.

<a name="configureapptab"></a>
## Configure the app tab

After you've installed the app into Teams, you must configure it to display the content. 

**To configure the app tab**

1. Go to a channel in the team where you installed the sample app, and select the **'+'** button to add a new tab.
1. Select **Hello World** from the **Add a tab** list. A configuration dialog box is displayed that enables you to select the tab to display in this channel. 
1. Select **Save**. The `Hello World` tab is loaded with the tab.

    <img width="530px" alt="Screenshot of configure" src="~/assets/images/samples-hello-world-tab-configure.png" />

### Test your bot in Teams

You can now test the bot in Teams.

**To test your bot**

* Select a channel in the team where you registered your app and type `@your-bot-name`. This type of message is called an **\@mention**. The bot replies to any message that you send.

    <img width="450px" alt="Bot responses" src="~/assets/images/samples-hello-world-bot.png" />

### Test your messaging extension

**To test your messaging extension**
1. Select **...** below the input box in your conversation view. A menu with the **'Hello World'** app is displayed. 
1. Select the menu, a set of random texts is displayed. You can select one of the random texts and that is inserted into your conversation.

    <img width="530px" alt="Messaging extension menu" src="~/assets/images/samples-hello-world-messaging-extensions-menu1.png" />

    <img width="530px" alt="Messaging extension result" src="~/assets/images/samples-hello-world-messaging-extensions-result1.png" />

1. Select one of the random texts. A card formatted and ready to send with your own message is shown.

    <img width="530px" alt="Messaging extension send" src="~/assets/images/samples-hello-world-messaging-extensions-send.png" />

|  <<  |  >>  |
|:--- | ---:|
|**Back** : [1. Plan and Prepare](get-started-dotnet-app-studio.md) | [3. Deploy your app](deploy-csharp-app.md) : **Next** |
|


## See also

* [Tutorials Overview](code-samples.md)
* [Create a conversational bot app](first-app-bot.md)
* [Create a messaging extension](first-message-extension.md)
* [Code Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples)