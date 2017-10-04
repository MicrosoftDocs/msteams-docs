# Code your Microsoft Teams app

Because Microsoft Teams apps are composed web services, you can use any web-programming technology. For tabs, we provide a JavaScript library. For bots and compose extensions, we recommend you use either C# or Typescript to take advantage of our [SDK extensions](#microsoft-teams-extensions-for-the-bot-builder-sdk) for .NET and Node.js.

## Coding your tab

Tabs are simply iframe'd web content. You can leverage your existing web service, written in any language and hosted on any cloud platform, and simply include the [Microsoft Teams JavaScript library](jslibrary.md) in pages you display in Teams. This library provides methods for your tab and your authentication and configuration experiences.

## Coding your bot and compose extension

Because your Teams bots and compose extensions are built on the [Microsoft Bot Framework](https://dev.botframework.com/), we recommend that you leverage the [Bot Builder SDK](https://docs.microsoft.com/en-us/bot-framework/resources-tools-downloads), available for .NET and for Node.js.

>**Note:** You can develop in any other web-programming technology and call the [Bot Framework REST APIs](https://docs.microsoft.com/en-us/bot-framework/rest-api/bot-framework-rest-overview) directly, but you must perform all token handling yourself.

### Microsoft Teams extensions for the Bot Builder SDK

We want to make development of Microsoft Teams apps as easy as possible, so we build and maintain extensions to the Bot Builder SDK. These packages extend the basic Bot Builder classes and methods with the following:

* Specialized Teams card types like the Office 365 Connector card
* Consuming and setting Teams-specific channel data on activities
* Processing compose extension requests
* Handling rate limiting

Both packages install dependencies, including the Bot Builder SDK.

#### .NET extensions

To use the Microsoft Teams extensions for the Bot Builder SDK for .NET, install the [Microsoft.Bot.Connector.Teams](https://www.nuget.org/packages/Microsoft.Bot.Connector.Teams) NuGet package in your Visual Studio project.

#### Node.js extensions

To use the Microsoft Teams extensions for the Bot Builder SDK for Node.js, add the [botbuilder-teams](https://www.npmjs.com/package/botbuilder-teams) npm package.

#### Source code

You can find the full source code for the extensions in the [BotBuilder-MicrosoftTeams](https://github.com/OfficeDev/BotBuilder-MicrosoftTeams) repo on Github.
