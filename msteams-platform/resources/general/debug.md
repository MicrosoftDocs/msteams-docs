---
title: Run and debug your app
description: Describes the steps to be taken to run and debug Microsoft Teams apps
keywords: teams run debug apps
---

# Run and debug your Microsoft Teams app

Microsoft Teams apps can contain one or more capabilities, and the ways to run or even host them may be different. When it comes to debugging, in general, we have the following ways to run your Microsoft Teams app:

* **Purely local**&emsp;For bots, you can test your experience in the Bot Emulator. For other content, you can run locally in your browser and address content through `http://localhost`.
* **Locally hosted, in Teams**&emsp;This involves running locally with tunneling software and [creating a package](~/publishing/apps-package) to [sideload](~/concepts/apps/apps-sideload) into Teams. This allows you to easily run and step-debug your app within the Teams experience.
* **Cloud-hosted, in Teams**&emsp;This truly simulates (or is) production-level support for a Teams app experience. It involves uploading your solution to your externally accessible server or cloud provider of choice (we recommend Azure, of course) and [creating a package](~/publishing/apps-package) to [sideload](~/concepts/apps/apps-sideload) into Teams.

For purely local or local Teams testing, you run the experience from your own computer. This allows you to actually compile and run within your IDE, and take full advantage of such techniques as breakpoints and step debugging. For production-scale debugging and testing, we recommend that you follow your own company guidelines to ensure you are able to support testing, staging, and deployment through your own processes.

In general, too, we recommend you utilize multiple manifests and packages to allow you to maintain separation between production and development services. For example, you might choose to register separate development and production bots and create appropriate packages to sideload them in your testing environment. We also recommend you sideload and test your production package before submitting to the Office Store or distributing to customers.

> [!NOTE]
> None of these testing solutions fully replicates the end-user experience for an app distributed through the Office Store, because the app installation process does some of the capability checks, such as scope, during installation.

## Purely local

Our bot samples are designed to run unmodified within the Bot Emulator. This enables you to test some of the core 1:1 logic of the bot, see a rough layout of messages, and perform simple tests. Here are the steps:

* Run the code by selecting the pre-built "Launch - Emulator" debug configuration for Node.js, or use the default "web.config" values for .NET/C#.
* Launch the Bot Emulator and set the URL:
  * Node.js: `http://localhost:3978/api/messages`
  * .NET/C#: `http://localhost:3979/api/messages`
* Leave the Microsoft app ID and Microsoft app password blank, to match the default environment variables.

> [!NOTE]
> Running this way does not give you access to Teams app functionality or Teams-specific bot functions like roster calls and other channel-specific functionality. In addition, some capabilities may be allowed by the Bot Framework in the Bot Emulator that might not function when running in Microsoft Teams.

## Locally hosted

Because Microsoft Teams is an entirely cloud-based product, it requires all services it accesses to be available from the cloud using HTTPS endpoints. Therefore, to enable our samples to work within Teams, you need to either publish the code to the cloud of your choice, or make our local running instance externally accessible. We can do the latter with tunneling software.

Although you can use any tool of choice, we use and recommend [ngrok](https://ngrok.com/download), which creates an externally addressable URL for a port you open locally on your machine. To set up ngrok in preparation for running your Microsoft Teams app locally: 

* In a terminal application, go the directory where you have ngrok.exe installed.
* Run, for example, `./ngrok http 3978 --host-header=localhost:3978`, or replace the port number as needed.

This launches ngrok to listen on the port you specify. In return, it gives you an externally addressable URL, valid for as long as ngrok is running.

> [!NOTE]
> If you stop and restart ngrok, the URL changes.

To use ngrok in your project, and depending on the capabilities you are using, you must replace all URL references in your code, configuration, and/or manifest.json file to use this URL endpoint.

For example, for bots registered in the Microsoft Bot Framework, update the bot's messaging endpoint to use this new ngrok endpoint&mdash;for example, `https://2d1224fb.ngrok.io/api/messages`. You can validate that ngrok is working, too, by testing bot response in the Bot Framework portal's Test chat window. (Again, like the emulator, this test doesn't allow you to access Teams-specific functionality.)

> [!NOTE]
> To update the messaging endpoint for a bot, you must use the Bot Framework &ndash; click on your bot in [your list of bots in Bot Framework](https://dev.botframework.com/bots). You do not need to migrate your bot to Microsoft Azure; [more information on this here](~/concepts/bots/bots-create#bots-and-microsoft-azure).

Please remember that any time you change values in the manifest.json, you need to repackage and re-sideload into Teams.

## Cloud-hosted

You can use any externally addressable service to host your development and production code and their HTTPS endpoints. There is no expectation that your capabilities reside on the same service&mdash;it's your project, so it's up to you. We do require that all domains being accessed from your Microsoft Teams apps be listed in the [`validDomains`](~/resources/schema/manifest-schema#validdomains) object in the manifest.json file.

> [!NOTE]
> To ensure a secure environment, we urge you to be explicit about the exact domain and subdomains you reference&mdash;and those domains must be in your control. For example, `*.azurewebsites.net` would not be allowed, but `contoso.azurewebsites.net` would.

## Loading and running

In general, to load and run your experience within Microsoft Teams, you need to create a package and sideload it into Teams, using the following guidance:

* [Create the package for your Microsoft Teams app](~/publishing/apps-package)
* [Sideload your app in Microsoft Teams](~/concepts/apps/apps-sideload)
