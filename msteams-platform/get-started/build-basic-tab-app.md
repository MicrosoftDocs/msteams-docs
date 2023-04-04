---
title: Build basic tab app
description: Build your basic tab app
ms.localizationpriority: high
ms.topic: reference
---
# Build basic tab app

Start Microsoft Teams app development with your first Teams app. You can create a tab app with Teams.

In this tutorial, get acquainted with a basic Teams tab app in one of the following ways:

* Use Teams Toolkit for app development in codespaces
* Use step-by-step guide to build a Teams app using Teams Toolkit

## Use Teams Toolkit codespaces

Teams Toolkit codespaces allows you to experience a Teams app in a few steps. You don’t need to install tools or go through the steps to create or build the app.  Before you use codespaces to use Teams Toolkit, ensure that you have:

* A GitHub account to create your codespace instance.
* A [Microsoft 365 account](https://developer.microsoft.com/microsoft-365/dev-program) with sideloading permission.
* A [Microsoft 365 tenant](../concepts/build-and-test/prepare-your-o365-tenant.md)

To use codespaces for creating a Teams tab app:

<a href="https://github.com/codespaces/new?hide_repo_select=true&amp;ref=dol%2Fcodespaces&amp;repo=348288141&amp;machine=standardLinux32gb&amp;devcontainer_path=.devcontainer%2Fhello-world-tab-codespaces%2Fdevcontainer.json&amp;location=WestUs2" target="_blank"><img src="https://github.com/codespaces/badge.svg" alt="Open hello-world tab in GitHub Codespaces"></a>

1. Click the button above to open Codespaces. You may be asked to login to GitHub if you haven't.
1. Select **Create codespaces**. The Setting up your codespace page appears. Teams Toolkit prepares the app project for you and opens it in Visual Studio Code in the browser. Teams Toolkit icon appears in the activity bar of Visual Studio Code.
1. Select Preview your Teams App (F5) to build the app.
1. Sign in to your Microsoft 365 account. Teams Toolkit codespaces builds the app. A dialog appears to prompt you to open the app in a browser.
1. Select the option to preview the app in the browser. The tab app is sideloaded to Teams and opens in the browser.

> [!TIP]
> Your browser may block a pop-up to prevent to open a new browser tab or window.  
> You need to allow pop-ups so that Codespace can sideload the app to Teams client in another tab.

## Use step-by-step guide to build a basic tab app

Pre-requisites for building a notification bot (scenario-based app):

If you want to learn how to build a notification bot, ensure that you’ve prepared the build environment with prerequisite tools. For more information on prerequisites, see Tools and SDKs > TTk v4/v5 >  Prepare to build apps using TTk > Prerequisites for creating your Teams app>.

To use the create a Teams app project and build a notification bot, select [Step-by-step guide](../sbs-gs-javascript.yml) and follow the instructions in the guide.
