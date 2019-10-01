---
title: Microsoft Teams code samples
description: Links and descriptions of sample applications for the Microsoft Teams developer platform
keywords: Microsoft Teams developer samples
ms.date: 02/21/2019
---
# Code samples for the Microsoft Teams developer platform

Here you will find a list of code samples that demonstrate various capabilities of the Microsoft Teams development platform and how to build apps to leverage those features.

## Getting samples

To download our samples from GitHub:

1. Select one of the projects listed below and open the project in GitHub.
2. Choose the **Clone or download** button and copy the URL
3. Open a command prompt in the parent directory into which you want to install the sample project
4. Run `git clone <pasted url>`

### For .NET/C# samples

Each of our .NET samples includes a Visual Studio solution file that can build the solution fully, including restoring the NuGet packages.

### For Node.js samples

We provide a packages.json file that lists all required packages for a sample. Simply run `npm install` from the command line in your Node.js project directory to install the required packages. You're now ready to open the project in Visual Studio Code and start experimenting.

### For other samples

As always, the project's README file should have more information on specific needs for specific samples.

## Get Started

| Sample | Description|
|--------|-------------|
| [Hello World in Microsoft Teams with Node.js](https://github.com/OfficeDev/msteams-samples-hello-world-nodejs) | A sample teams app in `Node.js` introducing you to the basic app capabilities.|
| [Hello World in Microsoft Teams with C#.NET](https://github.com/OfficeDev/msteams-samples-hello-world-csharp) | A sample teams app in `C# .NET` introducing you to the basic app capabilities.|

## Featured

| Sample | Description|
|--------|-------------|
| [Complete sample in Node.js](https://github.com/OfficeDev/microsoft-teams-sample-complete-node) | This sample shows how to use all the features of the Microsoft Teams platform|
| [Complete sample in C#/.NET](https://github.com/OfficeDev/microsoft-teams-sample-complete-csharp) | This project is meant to help a Teams developers in two ways. First, it shows many examples of how an app can integrate into Teams. Second, it gives a set of patterns, templates, and tools that can be used as a starting point for creating a larger, scalable, more enterprise level app to work within Teams.
| [Line of Business apps in C#/.NET](https://github.com/OfficeDev/msteams-sample-line-of-business-apps-csharp) | This repository contains multiple example Line of Business apps that can be used for either inspiration or as templates to build on top of. |

## Bots

| Sample | Description
|--------|-------------
| [Sample bot for C#/.NET](https://github.com/OfficeDev/BotBuilder-MicrosoftTeams/tree/master/CSharp/Samples/Microsoft.Bot.Connector.Teams.SampleBot) | This sample bot shows how to use the [Teams extensions for the Bot Builder SDK](~/get-started/code.md#microsoft-teams-extensions-for-the-bot-builder-sdk) in `C#.NET`.
| [Sample bot for Node.js](https://github.com/OfficeDev/BotBuilder-MicrosoftTeams/tree/master/Node/samples) | This sample bot shows how to use the [Teams extensions for the Bot Builder SDK](~/get-started/code.md#microsoft-teams-extensions-for-the-bot-builder-sdk) in `Node.js`.
| [Bot Framework v4](https://github.com/microsoft/BotBuilder-Samples/tree/master/samples/csharp_dotnetcore/46.teams-auth)| Authentication and basic messaging in Bot Framework v4 in `C#.NET`|

## Outgoing Webhooks

| Sample | Description
|--------|-------------
| [Outgoing Webhook for C#/.NET](https://github.com/OfficeDev/microsoft-teams-sample-outgoing-webhook) | Illustrates how to create an **Outgoing Webhook** for Microsoft Teams in C#/.NET.
| [Outgoing Webhook for Node.js](https://github.com/OfficeDev/msteams-samples-outgoing-webhook-nodejs) | Illustrates how to create a simple **Outgoing Webhook** for Microsoft Teams in ~50 lines of Node.js code.

## Connectors

| Sample | Description
|--------|-------------
| [Sample connector for Node.js](https://github.com/OfficeDev/microsoft-teams-sample-connector-nodejs) | This sample, written in Node.js, showcases how to build a connector for Microsoft Teams using GitHub as an example to generate connector notifications.
| [Sample connector for C#/.NET](https://github.com/OfficeDev/microsoft-teams-sample-connector-csharp) | This sample, written in C#, showcases how to build a connector for Microsoft Teams using a sample task list app as an example to generate connector notifications.

## Graph API

| Sample | Description
|--------|-------------
| [Microsoft Graph API Samples](https://github.com/OfficeDev/microsoft-teams-sample-graph) | These samples demonstrate using Microsoft Graph API calls to perform tasks such as querying teams and channels from a web service running outside Microsoft Teams.

## Others

| Code | Description
|------|-------------
| [Yeoman generator](https://github.com/OfficeDev/generator-teams) | Generates a Microsoft Teams app skeleton with tabs, bots, and more based on Node.js and TypeScript. Optionally it adds support for hosting using Express.
| ["To-do" list sample tab app](https://github.com/OfficeDev/microsoft-teams-sample-todo) | This Node.js sample shows how easy it is to convert an existing web app into a tab.
| [Orky](https://github.com/OfficeDev/Orky) | You can use Orky to register your own local bot in Microsoft Teams and execute scripts from ANYWHERE!
| [Build 2017 Weather](https://github.com/OfficeDev/microsoft-teams-build2017-weather) | Source code for the //build 2017 session to add a weather tab to the skeleton app generated earlier in the session.
