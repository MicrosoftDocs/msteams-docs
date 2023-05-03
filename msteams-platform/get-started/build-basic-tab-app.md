---
title: Build basic tab app
description: Build your basic tab app
ms.localizationpriority: high
ms.topic: reference
---
# Build basic tab app

Start Microsoft Teams app development with your first Teams app. You can create a tab app with Teams.

:::image type="content" border="false" source="../assets/images/get-started/get-started-tab.png" alt-text="Illustration showing a conceptual tab app":::

In this tutorial, get familiarize with a basic Teams tab app in one of the following ways:

* [Quick start with a codespace instance](#use-teams-toolkit-codespaces-to-build-a-basic-tab-app) or
* [Step-by-step guide](#use-step-by-step-guide-to-build-a-basic-tab-app) to build an app

:::image type="content" border="false" source="../assets/images/get-started/codescpaces-vs-manual.png" alt-text="Illustration showing your choices to build Teams app - Codespaces bundles all you need and it only takes several minutes to rey, while getting started manually will take time but you learn step-by-step":::

## Use Teams Toolkit codespaces to build a basic tab app

The codespace instance allows you to experience a Teams app almost instantaneously. It opens Visual Studio Code, where Teams Toolkit extension, the app source code, and all dependencies are pre-packaged for you. You just need to select the following button to begin.

But before you create your codespace, ensure that you have:

* A GitHub account to create your codespace instance.
* A [Microsoft 365 account](https://developer.microsoft.com/microsoft-365/dev-program) with sideloading permission.
* A [Microsoft 365 tenant](../concepts/build-and-test/prepare-your-o365-tenant.md)

To use codespaces for creating a Teams tab app:

<a href="https://github.com/codespaces/new?hide_repo_select=true&amp;ref=dol%2Fcodespaces&amp;repo=348288141&amp;machine=standardLinux32gb&amp;devcontainer_path=.devcontainer%2Fhello-world-tab-codespaces%2Fdevcontainer.json&amp;location=WestUs2" target="_blank"><img src="https://github.com/codespaces/badge.svg" alt="Open hello-world tab in GitHub Codespaces"></a>

1. Select the button above to open codespaces. You may be asked to login to GitHub if you haven't.
1. Select **Create codespaces**. The Setting up your codespace page appears. Teams Toolkit prepares the app project for you and opens it in Visual Studio Code in the browser. Teams Toolkit icon appears in the activity bar of Visual Studio Code.
1. Select **Preview your Teams App (F5)** to build the app.
1. Sign in to your Microsoft 365 account. Teams Toolkit codespaces builds the app. A dialog appears to prompt you to open the app in a browser.
1. Select the option to preview the app in the browser. The app is sideloaded to Teams and opens in the browser.
1. One the app dialog appears, select **Add** to install the app in Teams client.

> [!NOTE]
>
> * Your browser may block a pop-up to prevent to open a new browser tab or window. You need to allow pop-ups so that codespace can sideload the app to Teams client in another tab.

> [!TIP]
> [GitHub Codespaces](https://github.com/features/codespaces) offers the free plan up to a fixed amount of usage every month. If you need to free up the space, go to [github.com/codespaces](https://github.com/codespaces) and delete the codespaces that you no longer need.

If you want to build by yourself, or wants to create a tab app that can be installed on Outlook and Microsoft 365, follow the step-by-step guide at the next section!

## Use step-by-step guide to build a basic tab app

If you would like to learn how to start a project with Teams Toolkit from scratch, let's go through the step-by-step guide together.

Unlike codespaces, where everything you need is packaged for you already, you will need to set you your development environment. Let's start with [Prerequisites](../toolkit/tools-prerequisites.md) section first before start building.

> [!div class="nextstepaction"]
> [Prerequisites](../toolkit/tools-prerequisites.md)

> [!div class="nextstepaction"]
> [Start building a basic tab app](../sbs-gs-javascript.yml)

Or if a bot is what you are interested, go to another section:

> [!div class="nextstepaction"]
> [Start building a bot](build-notification-bot.md)
