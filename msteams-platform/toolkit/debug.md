---
title: Debug your Teams app 
author: zyxiaoyuer
description: Debug your Teams app locally in Teams Toolkit
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
ms.date: 03/02/2022
---

# Debug overview

Debugging is the process of checking, detecting, and correcting problems or bugs to ensure a programme runs according to its specifications. Debugging is also known as Debug. One of the most important feature of Visual Studio Code is debugging, also referred as the **F5** function key. The built-in debugger speeds up editing, compiling, and debugging process. Teams Toolkit makes use of the Visual Studio Code function to help you run and debug your app in the Teams client as it's being developed.

## Debug your Teams app locally in Teams Toolkit

Teams Toolkit helps you to debug and preview your Teams app locally. You can use local debug to do the following:

1. Debug your Teams app locally in Visual Studio Code. At the same time, you can debug tab, bot, messaging extension, and Azure functions. The toolkit supports debugging features including one-click start, multi-target debugging, toggling breakpoints, hot reloading, and one-click stop.

2. In the Teams web client, preview your Teams app locally.

## Prerequisite

Install [Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) version v3.0.0+ or later.

> [!Tip]
> Ensure you have Teams app project opened in Microsoft Visual Studio Code.

## How to run local debug using Teams Toolkit

After creating a new project, you can select **F5** to run your Teams app in debug mode. The following steps may need your interaction during local debug:

1. Select **Debug (Edge)** or **Debug (Chrome)** in the Run and Debug dropdown list, then select Start Debugging (F5). Toolkit launches a new Edge or Chrome browser instance depending on your selection and opens a web page to load Teams client.

    :::image type="content" source="../assets/images/teams-toolkit-v2/debug.png" alt-text="browser default" border="false":::

2. Select **Sign in** to Microsoft 365 account in the pop-up dialog box.

    :::image type="content" source="../assets/images/teams-toolkit-v2/microsoft365-signin.png" alt-text="Alternate capabilities":::

> [!NOTE]
> You can also select **Read more** to learn more about Microsoft 365 Developer Program.
Your default web browser opens to let you sign into Microsoft 365. Sign in to your Microsoft 365 account using your credentials.

3. Select **Install** in the pop-up dialog box to let you install the development certificate for localhost.

    :::image type="content" source="../assets/images/teams-toolkit-v2/development-certificate.png" alt-text="certificate":::

> [!Note]
> You can also select **Learn More** to learn more about the development certificate.

4. A system dialog box appears depending on your operating system. For Windows, select **Yes**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/ca-certificate.png" alt-text="certification authority":::

5. For MacOS, enter your **User Name** and **Password**, then select **Update Settings**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/mac-settings.png" alt-text="mac sign in":::

6. When Teams client completely loads in the  web browser, select **Add** or select one from the dropdown list as your needs.

    :::image type="content" source="../assets/images/teams-toolkit-v2/hello-local-debug.png" alt-text="local debug":::

## Toggle breakpoints

In Visual Studio Code, you can toggle breakpoints on the source codes of tabs, bots, messaging extensions, and Azure functions. The breakpoints execute when you interact with the Teams app in a web browser.

    :::image type="content" source="../assets/images/teams-toolkit-v2/toggle.png" alt-text="capabilities":::

## Hot reload

You can update the source codes of tab, bot, messaging extension, and Azure functions at the same time when you are debugging the Teams app. Update the codes and save the changes. The project re-loads and the debugger re-attaches to any programming languages.

    :::image type="content" source="../assets/images/teams-toolkit-v2/hot reload.png" alt-text="hot capabilities":::

### Stop debugging

When you complete local debug, you can select **Stop or Disconnect** in the floating debugging toolbar to stop all debug sessions and terminate tasks.

    :::image type="content" source="../assets/images/teams-toolkit-v2/stop-debugging.png" alt-text="debug":::
