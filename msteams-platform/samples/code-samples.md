---
title: Microsoft Teams code samples
description: Links and descriptions of sample applications for the Microsoft Teams developer platform
keywords: microsoft teams developer samples
---
# Code samples for the Microsoft Teams developer platform

Here you will find a list of code samples that demonstrate various capabilities of the Microsoft Teams development platform and how to build apps to leverage those features.

## Getting samples

Microsoft hosts much of its sample code in GitHub, a web-based Git repository hosting service. If you’re not familiar with Git or GitHub, we recommend that you review the [Git documentation](https://git-scm.com/doc) and follow the [Hello World](https://guides.github.com/activities/hello-world/) project in GitHub Guides.

To download our samples from GitHub:

1. Open the project in GitHub
2. Choose the **Clone or download** button and copy the URL
3. Open a command prompt in the parent directory into which you want to install the sample project
4. Run `git clone <pasted url>`

This process copies the entire project to your computer. Most samples containing bots provide code in both Node.js and .NET/C#; you can find the code you want in the appropriate subdirectory.

### For .NET/C# samples

Each of our .NET samples includes a Visual Studio solution file that contains all required libraries.

### For Node.js samples

We provide a packages.json file that lists all required packages for a sample. Simply run `npm install` from the command line in your Node.js project directory to install the required packages. You're now ready to open the project in Visual Studio Code and start experimenting.

### For other samples

As always, the project's README file should have more information on specific needs for specific samples.

## Get started

| Sample | Description
|--------|-------------
| [Hello World in Microsoft Teams with Node.js](https://github.com/OfficeDev/msteams-samples-hello-world-nodejs) | A sample teams app in `Node.js` introducing you to the basic app capabilities.
| [Hello World in Microsoft Teams with C#.NET](https://github.com/OfficeDev/msteams-samples-hello-world-csharp) | A sample teams app in `C#.NET` introducing you to the basic app capabilities.
| [Get started - all features](https://github.com/OfficeDev/microsoft-teams-sample-get-started) | This sample shows all the capabilities available in a Microsoft Teams app, including bots, tabs, compose extensions, and connectors. Source code is provided in both `C#` and `Node.js`.

## Bots

| Sample | Description
|--------|-------------
| [Sample bot for C#.NET](https://github.com/OfficeDev/BotBuilder-MicrosoftTeams/tree/master/CSharp/Samples/Microsoft.Bot.Connector.Teams.SampleBot) | This sample bot shows how to use the [Teams extensions for the Bot Builder SDK] (~/get-started/code#microsoft-teams-extensions-for-the-bot-builder-sdk) in `C#.NET`.
| [Sample bot for Node.js](https://github.com/OfficeDev/BotBuilder-MicrosoftTeams/tree/master/Node/samples) | This sample bot shows how to use the [Teams extensions for the Bot Builder SDK] (~/get-started/code#microsoft-teams-extensions-for-the-bot-builder-sdk) in `Node.js`.
| [Custom bots](https://github.com/OfficeDev/microsoft-teams-sample-custombot) | Samples to create **"Custom Bots"** to be used in Microsoft Teams

## Connectors

| Sample | Description
|--------|-------------
| [GitHub connector](https://github.com/OfficeDev/msteams-connector-github) | This contains the source for the GitHub connector for Microsoft Teams.

## Graph API

| Sample | Description
|--------|-------------
| [Microsoft Graph API Samples](https://github.com/OfficeDev/microsoft-teams-sample-graph) | These samples demonstrate using Microsoft Graph API calls to perform tasks such as querying teams and channels from a web service running outside Microsoft Teams.

## End to end apps

| Sample | Description
|--------|-------------
| ["To-do" list sample tab app](https://github.com/OfficeDev/microsoft-teams-sample-todo) | This Node.js sample shows how easy it is to convert an existing web app into a tab.

## Community contributed samples

| Sample | Description
|--------|-------------
| [TBD](~/) | More samples from community will come here ...

## Others

| Code | Description
|------|-------------
| [Yeoman generator](https://github.com/OfficeDev/generator-teams) | Generates a Microsoft Teams app skeleton with tabs, bots, and more based on Node.js and TypeScript. Optionally it adds support for hosting using Express.
| [Yeoman generator for compose extensions](https://github.com/OfficeDev/microsoft-teams-generator-compose-extension) | Yeoman generator for building compose extension for Microsoft Teams
| [Complete sample in `Node.js`](https://github.com/OfficeDev/microsoft-teams-sample-complete-node) | A template for building complex bots for Microsoft Teams - Node.js version
| [Complete sample in `C#.NET`](https://github.com/OfficeDev/microsoft-teams-sample-complete-csharp) | This project is meant to help a Teams developers in two ways. First, it shows many examples of how an app can integrate into Teams. Second, it gives a set of patterns, templates, and tools that can be used as a starting point for creating a larger, scalable, more enterprise level app to work within Teams.
| [Orky](https://github.com/OfficeDev/Orky) | You can use Orky to register your own local bot in Microsoft Teams and execute scripts from ANYWHERE!
| [Build 2017 Weather](https://github.com/OfficeDev/microsoft-teams-build2017-weather) | Source code for the //build 2017 session to add a weather tab to the skeleton app generated earlier in the session
