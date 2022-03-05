---
title: Debug your Teams app 
author: zyxiaoyuer
description: Debug your Teams app locally in Teams Toolkit
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
ms.date: 03/02/2022
---

# Outline

Debugging is the process of checking, detecting, and correcting problems (or "bugs") in order to ensure that a programme runs according to its specifications. Debugging is also known as Debug.One of the most important feature of Visual Studio Code is debugging, also referred as the **F5** (function key) among developers. This built-in debugger speeds up the editing, compiling, and debugging process. Teams Toolkit makes use of the Visual Studio Code function to help you run and debug your app in the Teams client as it's being developed.

## Debug your Teams app locally in Teams Toolkit

  Teams Toolkit provides a simple way for you to debug and preview your Teams app locally.You can use local debug to do the following:

1. Debug your Teams app locally in Visual Studio Code. At the same time, you can debug tab, bot, messaging extension and Azure functions. One-click start, multi-target debugging, toggling breakpoints, hot reloading, and one-click stop are among the debugging tools supported by the toolkit.

2. In the Teams web client, preview your Teams app locally.

## Prerequisite

Install [Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) version v3.0.0+ or later.

> [!Tip]
> Ensure you have Teams app project opened in Microsoft Visual Studio Code.

## How to run local debug using Teams Toolkit

After creating a new project, you can simply press F5 to run your Teams app in debug mode. The following steps may need your interaction during local debug.

1. Select Debug (Edge) or Debug (Chrome) in Run and Debug drop-down list, then select Start Debugging (F5) button. Toolkit will launch a new Edge or Chrome browser instance depending on your selection and open a web page to load Teams client. You can also simply press F5 to use the default browser.

:::image type="content" source="../assets/images/teams-toolkit-v2/debug.png" alt-text="browser default":::

2. If the following dialog is popped up, select **Sign in** to Microsoft 365 (<https://www.office.com/>)

:::image type="content" source="../assets/images/teams-toolkit-v2/microsoft365-signin.png" alt-text="Alternate capabilities":::

> [!NOTE]
> You can also select **Read more** button to learn more about Microsoft 365 Developer Program.
Your default web browser will be opened to let you **Sign in** to Microsoft 365. Sign in to your Microsoft 365 account using your credentials.

3. If the following dialog popped up to let you install the development certificate for localhost, select **Install** button.

:::image type="content" source="../assets/images/teams-toolkit-v2/development-certificate.png" alt-text="certificate":::

> [!Note]
> You can also click Learn More button to learn more about the development certificate.

4. A system dialog will be popped up depending on your operating system. For Windows, select **Yes** button.

:::image type="content" source="../assets/images/teams-toolkit-v2/ca-certificate.png" alt-text="certification authority":::

5. For macOS, type your user name and password then select **Update Settings** button.

:::image type="content" source="../assets/images/teams-toolkit-v2/mac-settings.png" alt-text="mac sign in":::

6. When Teams client is completely loaded in the  web browser, select **Add button** or select one from the drop-down list as your needs.

:::image type="content" source="../assets/images/teams-toolkit-v2/hello-local-debug.png" alt-text="local debug":::

## Toggle breakpoints

In Visual Studio Code, you can toggle breakpoints on the source codes of tabs, bots, messaging extensions, and Azure functions. The breakpoints will be hit when you interact with the Teams app in a web browser.

:::image type="content" source="../assets/images/teams-toolkit-v2/toggle.png" alt-text="capabilities":::

## Hot reload

When you are debugging the Teams app, you can update the source codes of tab, bot, messaging extension and Azure functions at the same time. Update the codes and save the changes. The project will be re-loaded and the debugger will be re-attached no matter whether its programming language is JavaScript or TypeScript.

:::image type="content" source="../assets/images/teams-toolkit-v2/hot reload.png" alt-text="hot capabilities":::

### Stop debugging

When you complete local debug, you can select **Stop or Disconnect** button in the floating debugging toolbar. All debug sessions will be stopped and all tasks will be terminated. Then It is safe to run local debug again.

:::image type="content" source="../assets/images/teams-toolkit-v2/stop-debugging.png" alt-text="debug":::
