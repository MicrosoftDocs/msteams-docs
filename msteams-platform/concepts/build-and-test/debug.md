---
title: Choosing a setup to test and debug your app
description: In this module, learn options for testing and debugging Microsoft Teams apps in local and cloud-hosted environment.
ms.localizationpriority: medium
ms.topic: conceptual
ms.date: 08/28/2022
---

# Choose a test setup and debug your Teams app

Microsoft Teams apps contain one or more capabilities and the ways to run or even host them are different. For debugging, use one of the following ways:

* **Purely local**: For bots, you can test your experience in the Bot Emulator. For other content, you can run locally in your browser and address content through `http://localhost`.
* **Locally hosted in Teams**: This involves running the app locally in tunneling software and [creating a package](~/concepts/build-and-test/apps-package.md) to [upload](~/concepts/deploy-and-publish/apps-upload.md) into Teams. This permits you to easily run and debug your app within the Teams client.
* **Cloud-hosted in Teams**: This truly simulates the production level support for a Teams app. It involves uploading your solution to your externally accessible server or cloud provider of choice and [creating a package](~/concepts/build-and-test/apps-package.md) to [upload](~/concepts/deploy-and-publish/apps-upload.md) into Teams.

Run the experience from your own computer for purely local or local Teams testing. By doing this, you can compile and run within your integrated development environment and take full advantage of techniques, such as breakpoints and step debugging.

> [!NOTE]
> For production-scale debugging and testing, we recommend that you follow your own company guidelines to ensure you are able to support testing, staging, and deployment through your own processes.

Use multiple manifests and packages to maintain separation between production and development services. For example, you might choose to register separate development and production bots and create appropriate packages to upload them in your testing environment. We also recommend, you upload and test your production package before submitting your app for publishing in our Microsoft Teams Store or distributing to customers.

## Purely local

> [!NOTE]
> Running the bot locally does not give you access to Teams app functionality or Teams-specific bot functions like roster calls and other channel-specific functionality. In addition, some capabilities are permitted by the Bot Framework in the Bot Emulator that might not function when running in Teams.

Your bot can run within the Bot Emulator. This enables you to test some of the core logic of the bot, see a rough layout of messages, and perform simple tests. Following are the steps:

1. Run the code locally.
2. Launch the Bot Emulator and set the URL:
   * Node.js: `http://localhost:3978/api/messages`
   * .NET/C#: `http://localhost:3979/api/messages`
3. Leave the Microsoft app ID and Microsoft app password blank, to match the default environment variables.

## Locally hosted

Teams is an entirely cloud-based product, it requires all services it accesses to be available publicly using HTTPS endpoints. Therefore, to enable your app to work within Teams, you need to either publish the code to the cloud of your choice or make our local running instance externally accessible. We can do the latter with tunneling software.

Although you can use any tool of your choice, we use and recommend [ngrok](https://ngrok.com/download), which creates an externally addressable URL for a port you open locally on your machine.

To set up ngrok in preparation to execute your Teams app locally, follow these steps:

1. Go to the directory where you have ngrok.exe installed in a terminal application. You may want to add it as a path variable to avoid this step.
2. Run, for example, `ngrok http 3978 --host-header=localhost:3978`, or replace the port number as needed.
   This launches ngrok to list on the port you specify. In return, it gives you an externally addressable URL valid for as long as ngrok is running.

> [!NOTE]
> If you stop and restart ngrok, the URL changes.

To use ngrok in your project based on the capabilities you're using, you must replace all URL references in your code, configuration, and manifest.json file to use this URL endpoint.

For bots registered in the Microsoft Bot Framework, update the bot's messaging endpoint to use this new ngrok endpoint. For example, `https://2d1224fb.ngrok.io/api/messages`. You can validate that ngrok is working by testing the bot response in the Bot Framework portal's Test chat window. Again, like the emulator, this test doesn't permit you to access Teams-specific functionality.

> [!NOTE]
> To update the messaging endpoint for a bot, you must use the Bot Framework. Select your bot in [your list of bots in Bot Framework](https://dev.botframework.com/bots). You do not need to migrate your bot to Microsoft Azure. You can also update your messaging endpoint through [Developer Portal for Teams](~/concepts/build-and-test/teams-developer-portal.md).

## Cloud-hosted

You can use any externally addressable service to host your development and production code and their HTTPS endpoints. There's no expectation that your capabilities reside on the same service. We require all domains to be accessed from your Teams apps listed in the [`validDomains`](~/resources/schema/manifest-schema.md#validdomains) object in the `manifest.json` file.

> [!NOTE]
> To ensure a secure environment, be explicit about the exact domain and subdomains you reference and those domains must be in your control. For example, `*.azurewebsites.net` is not recommended, however `contoso.azurewebsites.net` is recommended.

## Load and run your experience

To load and run your experience within Teams, you need to create a package and upload it into Teams. For more information, see:

* [Create the package for your Microsoft Teams app](~/concepts/build-and-test/apps-package.md).
* [Upload your app in Microsoft Teams](~/concepts/deploy-and-publish/apps-upload.md).

## Next step

> [!div class="nextstepaction"]
> [Add test data to your environment](~/concepts/build-and-test/test-data.md)

## See also

* [Test your app](test-app-overview.md)
* [Test and debug your bot locally with IDE](../../bots/how-to/debug/locally-with-an-ide.md#test-and-debug-your-bot-locally-with-ide)
* [DevTools for Microsoft Teams tabs](../../tabs/how-to/developer-tools.md)
* [Test app behavior in different environment](../../toolkit/test-app-behavior.md)
