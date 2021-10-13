---
title: Teams Toolkit for Visual Studio Code- Overview
author: Rajeshwari-v
description:  Overview of Teams Toolkit for Visual Studio Code.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
---
# Teams Toolkit for Visual Studio Code
The Teams Toolkit helps developers to create and deploy Teams apps with integrated Identity, access to cloud storage, data from Microsoft Graph, and other services in Azure and Microsoft 365 with a "zero-configuration" approach to the developer experience.

## Teams App Capabilities

| **Capability**| **Description**|
|--------|-------------|
| Tabs |  Tabs are Teams-aware webpages embedded in Microsoft Teams. They are simple HTML tags that point to domains declared in the app manifest and can be added as part of a channel inside a team, group chat, or personal app for an individual user. |
| Bot |  Bots allow users to interact with your web service through text, interactive cards, and task modules. |
| Messaging Extension | Messaging extensions allow users to interact with your web service through buttons and forms in the Microsoft Teams client.  |
## Steps to create new Teams Toolkit

## Build a Teams app
Build a Teams app from the beginning, before you begin with creating your first Teams app, you must install a few tools and set up your development environment.

## Prerequisites
Before you begin with creating your first Teams app, you must install a few tools and set up your development environment.
### Required tools for installation

Verify you have the right prerequisites for building Teams apps and install some recommended development tools

- [Node.js](https://nodejs.org/en/download/) Versions required Node.js v10.x, v12.x or v14.x (v14.x is recommended)
- [Microsoft 365](https://developer.microsoft.com/microsoft-365/dev-program)
The Teams Toolkit requires a Microsoft 365 organizational account where Teams is running and has been registered.
- [Azure](https://azure.microsoft.com/free/)
The Teams Toolkit requires an Azure account and subscription to deploy the Azure resources for your project.
To sign in into Microsoft 365 and Azure accounts, See [Sign in to your Microsoft 365 and Azure accounts](../get-started/prerequisites.md#sign-in-to-your-microsoft-365-and-azure-accounts) 

> [!WARNING]
> There are known issues with `npm@7`, packaged with Node v15 and later. If you have problems running `npm install`, ensure you're using Node v14 (LTS)

## Getting started
After installing the Teams toolkit, follow the Get Started [Overview](../get-started/code-samples.md#overview) instruction in our documentation to start with.

Under the Teams Toolkit extension tab, you can easily discover all applicable commands in the sidebar and Command Palette with the keyword ‘TeamsFx’. It also supports Command Line Interface (CLI) [Install the Teams Toolkit](../get-started/prerequisites.md#install-the-teams-toolkit) to increase efficiency.

