---
title: Build message extension
description: In this module, learn how to build your first message extension for your Teams app.
ms.localizationpriority: medium
ms.topic: reference
---

# Build message extension

Message extensions allow the users to interact with your web service through buttons and forms in the Microsoft Teams client. They can search or initiate actions in an external system from the compose message area, the command box, or directly from a message. You can send back the results of that interaction to the Teams client in the form of a richly formatted card.

[Image to be added]

In this tutorial, get familiarize with the message extension in one of the following ways:

* [Use Teams Toolkit codespaces to build a message extension](#use-teams-toolkit-codespaces-to-build-a-message-extension) or
* [Use step-by-step guide to build a message extension](#use-step-by-step-guide-to-build-a-message-extension)

## Use Teams Toolkit codespaces to build a message extension

The codespace instance allows you to experience a Teams app almost instantaneously. It opens Visual Studio Code, where Teams Toolkit extension, the app source code, and all dependencies are pre-packaged for you. You just need to select the following button to begin.

But before you create your codespace, ensure that you have:

* A GitHub account to create your codespace instance
* A [Microsoft 365 account](https://developer.microsoft.com/microsoft-365/dev-program) with sideloading permission
* A [Microsoft 365 tenant](../concepts/build-and-test/prepare-your-o365-tenant.md)

To use codespaces for creating a message extension:

<a href="https://github.com/codespaces/new?hide_repo_select=true&ref=dev&repo=348288141&machine=basicLinux32gb&location=WestUs2&devcontainer_path=.devcontainer%2Fnpm-search-message-extension-codespaces%2Fdevcontainer.json" target="_blank"><img src="https://github.com/codespaces/badge.svg" alt="Open message extension in GitHub Codespaces"></a>

1. Select the button above to open Codespaces. You may be asked to login to GitHub if you haven't.
1. Select **Create codespaces**.
   The Setting up your codespace page appears. Teams Toolkit prepares the app project for you and opens it in Visual Studio Code in the browser. Teams Toolkit icon appears in the activity bar of Visual Studio Code.
1. Select **Preview your Teams App (F5)** to build the app.
1. Sign in to your Microsoft 365 account.
   Teams Toolkit codespaces builds the app. A dialog appears to prompt you to open the app in a browser.
1. Select the option to preview the app in the browser.
   The app is sideloaded to Teams and opens in the browser.
1. Once the app dialog appears, select **Add** to install the app in Teams client.

> [!NOTE]
> Your browser may block a pop-up to prevent to open a new browser tab or window.  
> You need to allow pop-ups so that Codespace can sideload the app to Teams client in another tab.

> [!TIP]
> [GitHub codespaces](https://github.com/features/codespaces) offers the free plan up to a fixed amount of usage every month. If you need to free up the space, go to [github.com/codespaces](https://github.com/codespaces) and delete the codespaces that you no longer need.

## Use step-by-step guide to build a message extension

If you would like to learn how to start a project with Teams Toolkit from scratch, let's go through the step-by-step guide together.

Unlike codespaces, where everything you need is packaged for you already, you will need to set you your development environment. Let's start with [Prerequisites](../toolkit/tools-prerequisites.md) section first before start building.

> [!div class="nextstepaction"]
> [Prerequisites](../toolkit/tools-prerequisites.md)

> [!div class="nextstepaction"]
> [Build search based message extension](../sbs-messagingextension-searchcommand.yml)

> [!div class="nextstepaction"]
> [Build action based message extension](../sbs-meetingextension-action.yml)
