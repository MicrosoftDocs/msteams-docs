---
title: Choosing a setup to test and debug your app
description: Describes options for testing and debugging Microsoft Teams apps
keywords: teams run debug apps
ms.topic: conceptual
---

# Choose a setup to test and debug your Microsoft Teams app

Microsoft Teams apps can contain one or more capabilities, and the ways to run or even host them may be different. When it comes to debugging, in general, we have the following ways to run your Microsoft Teams app:

* **Purely local**&emsp;For bots, you can test your experience in the Bot Emulator. For other content, you can run locally in your browser and address content through `http://localhost`.
* **Locally hosted, in Teams**&emsp;This involves running locally with tunneling software and [creating a package](~/concepts/build-and-test/apps-package.md) to [upload](~/concepts/deploy-and-publish/apps-upload.md) into Teams. This allows you to easily run and debug your app within the Teams client.
* **Cloud-hosted, in Teams** This truly simulates (or is) production-level support for a Teams app. It involves uploading your solution to your externally accessible server or cloud provider of choice (we recommend Azure, of course) and [creating a package](~/concepts/build-and-test/apps-package.md) to [upload](~/concepts/deploy-and-publish/apps-upload.md) into Teams.

For purely local or local Teams testing, you run the experience from your own computer. This allows you to actually compile and run within your IDE, and take full advantage of such techniques as breakpoints and step debugging. For production-scale debugging and testing, we recommend that you follow your own company guidelines to ensure you are able to support testing, staging, and deployment through your own processes.

In general we recommend you use multiple manifests and packages to allow you to maintain separation between production and development services. For example, you might choose to register separate development and production bots and create appropriate packages to upload them in your testing environment. We also recommend you upload and test your production package before submitting your app for publishing in our app store, or distributing to customers.

## Purely local

> [!NOTE]
> Running this way does not give you access to Teams app functionality or Teams-specific bot functions like roster calls and other channel-specific functionality. In addition, some capabilities may be allowed by the Bot Framework in the Bot Emulator that might not function when running in Microsoft Teams.

Your bot can be run within the Bot Emulator. This enables you to test some of the core logic of the bot, see a rough layout of messages, and perform simple tests. Here are the steps:

* Run the code locally
* Launch the Bot Emulator and set the URL:
  * Node.js: `http://localhost:3978/api/messages`
  * .NET/C#: `http://localhost:3979/api/messages`
* Leave the Microsoft app ID and Microsoft app password blank, to match the default environment variables.

## Locally hosted

Because Microsoft Teams is an entirely cloud-based product, it requires all services it accesses to be available publicly using HTTPS endpoints. Therefore, to enable your app to work within Teams, you need to either publish the code to the cloud of your choice, or make our local running instance externally accessible. We can do the latter with tunneling software.

Although you can use any tool of choice, we use and recommend [ngrok](https://ngrok.com/download), which creates an externally addressable URL for a port you open locally on your machine. To set up ngrok in preparation for running your Microsoft Teams app locally:

* In a terminal application, go the directory where you have ngrok.exe installed. You may want to add it as a path variable to avoid this step.
* Run, for example, `ngrok http 3978 --host-header=localhost:3978`, or replace the port number as needed.

This launches ngrok to listen on the port you specify. In return, it gives you an externally addressable URL, valid for as long as ngrok is running.

> [!NOTE]
> If you stop and restart ngrok, the URL changes.

To use ngrok in your project, and depending on the capabilities you are using, you must replace all URL references in your code, configuration, and/or manifest.json file to use this URL endpoint.

For example, for bots registered in the Microsoft Bot Framework, update the bot's messaging endpoint to use this new ngrok endpoint. For example, `https://2d1224fb.ngrok.io/api/messages`. You can validate that ngrok is working by testing bot response in the Bot Framework portal's Test chat window. (Again, like the emulator, this test doesn't allow you to access Teams-specific functionality.

> [!NOTE]
> To update the messaging endpoint for a bot, you must use the Bot Framework. Click on your bot in [your list of bots in Bot Framework](https://dev.botframework.com/bots). You do not need to migrate your bot to Microsoft Azure. You can also update your messaging endpoint through [App Studio](~/concepts/build-and-test/app-studio-overview.md).

## Cloud-hosted

You can use any externally addressable service to host your development and production code and their HTTPS endpoints. There is no expectation that your capabilities reside on the same service. We do require that all domains being accessed from your Microsoft Teams apps be listed in the [`validDomains`](~/resources/schema/manifest-schema.md#validdomains) object in the manifest.json file.

> [!NOTE]
> To ensure a secure environment, be explicit about the exact domain and subdomains you reference, and those domains must be in your control. For example, `*.azurewebsites.net` would not be recommended, but `contoso.azurewebsites.net` would.

## Load and run your experience

To load and run your experience within Microsoft Teams, you need to create a package and upload it into Teams, using the following guidance:

* [Create the package for your Microsoft Teams app](~/concepts/build-and-test/apps-package.md)
* [Upload your app in Microsoft Teams](~/concepts/deploy-and-publish/apps-upload.md)
