---
title: Build basic tab app
description: Build your basic tab app
ms.localizationpriority: high
ms.topic: reference
---
# Hello world - Build basic tab app

Start Microsoft Teams app development with your first Teams app. You can create a tab app with Teams.

In this tutorial, get acquainted with a basic Teams tab app in one of the following ways:

* Use [Teams Toolkit for app development in codespaces](#use-teams-toolkit-codespaces) or
* Use [step-by-step guide](#use-step-by-step-guide-to-build-a-basic-tab-app) to build a Teams app using Teams Toolkit

:::image type="content" border="false" source="../assets/images/get-started/codescpaces-vs-manual.png" alt-text="Illustration showing your choices to build Teams app":::

## Use Teams Toolkit codespaces

Teams Toolkit codespaces allows you to experience a Teams app in a few steps. You don’t need to install tools or go through the steps to create or build the app.  Before you use codespaces to use Teams Toolkit, ensure that you have:

* A GitHub account to create your codespace instance.
* A [Microsoft 365 account](https://developer.microsoft.com/microsoft-365/dev-program) with sideloading permission.
* A [Microsoft 365 tenant](../concepts/build-and-test/prepare-your-o365-tenant.md)

To use codespaces for creating a Teams tab app:

<a href="https://github.com/codespaces/new?hide_repo_select=true&amp;ref=dol%2Fcodespaces&amp;repo=348288141&amp;machine=standardLinux32gb&amp;devcontainer_path=.devcontainer%2Fhello-world-tab-codespaces%2Fdevcontainer.json&amp;location=WestUs2" target="_blank"><img src="https://github.com/codespaces/badge.svg" alt="Open hello-world tab in GitHub Codespaces"></a>

1. Click the button above to open Codespaces. You may be asked to login to GitHub if you haven't.
1. Select **Create codespaces**. The Setting up your codespace page appears. Teams Toolkit prepares the app project for you and opens it in Visual Studio Code in the browser. Teams Toolkit icon appears in the activity bar of Visual Studio Code.
1. Select **Preview your Teams App (F5)** to build the app.
1. Sign in to your Microsoft 365 account. Teams Toolkit codespaces builds the app. A dialog appears to prompt you to open the app in a browser.
1. Select the option to preview the app in the browser. The app is sideloaded to Teams and opens in the browser.
1. One the app dialog appears, select **Add** to install the app in Teams client.

> [!TIP]
> Your browser may block a pop-up to prevent to open a new browser tab or window.  
> You need to allow pop-ups so that Codespace can sideload the app to Teams client in another tab.

If you want to build by yourself, or wants to create a tab app that can be installed on Outlook and Microsoft 365, follow the step-by-step guide at the next section!

## Use step-by-step guide to build a basic tab app

If you would like to learn how to start a project with Teams Toolkit from scratch, let's go through the step-by-step guide together.

Unlike Codespaces, where everything you need is packaged for you already, you will need to set you your development environment. Let's start with [Prerequisites](toolkit/tools-prerequisites.md) section first before start building.

> [!div class="nextstepaction"]
> [Prerequisites](toolkit/tools-prerequisites.md)

> [!div class="nextstepaction"]
> [Start building a basic tab app](../sbs-gs-javascript.yml)

Or if a bot is what you are interested, go to another section:

> [!div class="nextstepaction"]
> [Start building a bot](build-notification-bot)


