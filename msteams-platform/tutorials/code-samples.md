---
title: Microsoft Teams code samples
description: Links and descriptions of sample applications for the Microsoft Teams developer platform
keywords: Microsoft Teams developer samples
---
# Tutorials and code samples for the Microsoft Teams developer platform

Here you will find a list of tutorials and code samples that demonstrate how you can extend the Teams developer platform capabilities by creating custom apps.

## Getting started with Microsoft Learn

| Capability| Learn module|
|--------|-------------|
| Tabs  — embedded web experiences  |  [Create embedded web experiences with tabs for Microsoft Teams](https://docs.microsoft.com/learn/modules/embedded-web-experiences/) |
| Webhooks and connectors  |  [Connect web services to Microsoft Teams with webhooks and Office 365 Connectors](https://docs.microsoft.com/learn/modules/msteams-webhooks-connectors/) |
|Messaging extensions  | [Task-oriented interactions in Microsoft Teams with messaging extensions](https://docs.microsoft.com/learn/modules/msteams-messaging-extensions/)  |
| Task modules |  [Collect input in Microsoft Teams with Task Modules](https://docs.microsoft.com/learn/modules/msteams-task-modules/) |
| Conversational bots  | [Create interactive conversational bots for Microsoft Teams](https://docs.microsoft.com/learn/modules/msteams-conversation-bots/)  |

## Getting started with code samples

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

## Bots (using the v4 SDK)

[!INCLUDE [sample](~/includes/bots/teams-bot-samples.md)]

[!INCLUDE [All Samples](https://github.com/OfficeDev/microsoft-teams-sample-connector-csharp/blob/master/README.md)] 

>[!TIP]
>Visit the [Bot Framework Samples repository](https://github.com/Microsoft/BotBuilder-Samples) to view Microsoft Bot Framework v4 SDK task-focused samples for C#, JavaScript, TypeScript, and Python.

## Messaging Extensions (using the v4 SDK)

| Sample | Description | .NET Core | JavaScript | Python|
|--------|------------- |---|---|----|
| Messaging extensions - search | Messaging Extension that accepts search requests and returns results. | [View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/csharp_dotnetcore/50.teams-messaging-extensions-search) | [View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/javascript_nodejs/50.teams-messaging-extensions-search) | [View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/python/50.teams-messaging-extension-search) |
| Messaging extensions - action | Messaging Extension that accepts parameters and returns a card. Also, how to receive a forwarded message as a parameter in a Messaging Extension. | [View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/csharp_dotnetcore/51.teams-messaging-extensions-action) | [View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/javascript_nodejs/51.teams-messaging-extensions-action) | [View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/python/51.teams-messaging-extensions-action) |
| Messaging extensions - auth and config | Messaging Extension that has a configuration page, accepts search requests and returns results after the user has signed in. | [View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/csharp_dotnetcore/52.teams-messaging-extensions-search-auth-config) | [View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/javascript_nodejs/52.teams-messaging-extensions-search-auth-config) |
| Messaging extensions - action preview | Demonstrates how to create a Preview and Edit flow for a Messaging Extension. | [View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/csharp_dotnetcore/53.teams-messaging-extensions-action-preview) | [View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/javascript_nodejs/53.teams-messaging-extensions-action-preview) | [View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/python/53.teams-messaging-extensions-action-preview) |
| Link unfurling | Messaging Extension that performs link unfurling. | [View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/csharp_dotnetcore/55.teams-link-unfurling) | [View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/javascript_nodejs/55.teams-link-unfurling) | [View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/python/55.teams-link-unfurling) |


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

### Bot Framework SDK v3 samples

| Sample | Description |
|--------|------------- |
| [Sample bot for C#/.NET](https://github.com/OfficeDev/BotBuilder-MicrosoftTeams/tree/master/CSharp/Samples/Microsoft.Bot.Connector.Teams.SampleBot) | Bot Framework v3 samples|
| [Sample bot for Node.js](https://github.com/OfficeDev/BotBuilder-MicrosoftTeams/tree/master/Node/samples) | Bot Framework v3 samples |
