---
title: Debug your Teams app 
description: Debug your Teams app locally in Teams Toolkit
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/02/2022
---

# Debug your Teams app locally in Teams Toolkit

Teams Toolkit helps you to debug and preview your Teams app locally. Debug is the process of checking, detecting, and correcting issues or bugs to ensure that the program runs as per the requirements. Visual Studio Code allows you to debug tab, bot, messaging extension, and Azure functions. Toolkit supports debugging features including start, multi-target debugging, toggle breakpoints, hot reloading, and stop. The Teams app is available for preview in Teams web client locally after the debugging process. 

## Prerequisite

Install [Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) version v3.0.0+ or later.


## Visual Studio Code debugging features

### Start debugging

When you start local debug, you can select **Start** in the floating debugging toolbar to start all debug sessions.

### Toggle breakpoints

In Visual Studio Code, you can toggle breakpoints on the source codes of tabs, bots, messaging extensions, and Azure functions. The breakpoints execute when you interact with the Teams app in a web browser. The following image shows the toggle breakpoints:

   :::image type="content" source="../assets/images/components/toggle.png" alt-text="toggle breakpoints":::

### Hot reload

You can update the source codes of tab, bot, messaging extension, and Azure functions at the same time when you are debugging the Teams app. Update the code and save the changes. The project re-loads and the debugger re-attaches to the programming languages.

   :::image type="content" source="../assets/images/teams-toolkit-v2/hot reload.png" alt-text="hot-reload for source codes":::

### Stop debugging

When you complete local debug, you can select **Stop or Disconnect** in the floating debugging toolbar to stop all debug sessions and terminate tasks. The following image shows stop debugging action:

   :::image type="content" source="../assets/images/teams-toolkit-v2/stop-debugging.png" alt-text="stop debugging":::


## Perform local debug using Teams Toolkit

After creating a new app using Teams Toolkit, select **F5** to run your Teams app in debug mode. The following steps to perform during local debug:

1. Select **Debug (Edge)** or **Debug (Chrome)** from the **Run and Debug** in the activity bar.
1. Select **Start Debugging (F5)**. Toolkit launches a new Edge or Chrome browser instance depending on your selection and opens a web page to load Teams client.

The following image displays the browser options in the dropdown list:
    :::image type="content" source="../assets/images/teams-toolkit-v2/debug.png" alt-text="browser default" border="true"::: 

3. Select **Sign in** to Microsoft 365 account in the pop-up window.
    :::image type="content" source="../assets/images/teams-toolkit-v2/microsoft365-signin.png" alt-text="Alternate capabilities":::

> [!NOTE]
> You can also select **Read more** to learn more about Microsoft 365 Developer Program. Your default web browser opens to let you sign into Microsoft 365. Sign in to your Microsoft 365 account using your credentials.

4. Select **Install** in the pop-up dialog box to let you install the development certificate for localhost.

    :::image type="content" source="../assets/images/teams-toolkit-v2/development-certificate.png" alt-text="certificate":::

> [!Note]
> You can also select **Learn More** to learn more about the development certificate.

5. A system dialog box appears depending on your operating system. For Windows, select **Yes**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/ca-certificate.png" alt-text="certification authority":::

6. For MacOS, enter your **User Name** and **Password**, then select **Update Settings**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/mac-settings.png" alt-text="mac sign in":::

7. When Teams client completely loads in the  web browser, select **Add** or select one from the dropdown list as your needs.

    :::image type="content" source="../assets/images/teams-toolkit-v2/hello-local-debug.png" alt-text="local debug":::


## See also

* [Debug background process](debug%20background%20processes.md).