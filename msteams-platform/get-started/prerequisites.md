---
title: Get started - Prerequisites
author: adrianhall
description: Learn how to get started with Microsoft Teams app development and set up your environment
ms.author: adhal
ms.date: 05/18/2021
ms.topic: quickstart
---
# Prerequisites

In this section, you will get ready to create your first Teams app by installing necessary tools on the system where you will develop the code for the app.  Then, you will continue on to create your first Teams app.

## Install necessary tools

Before beginning, you will need the following tools:

- [Node.js](https://nodejs.org/en/download/) (use the latest v14 LTS release).  
- A browser that contains developer tools - either [Microsoft Edge](https://www.microsoft.com/edge) (Recommended) or [Google Chrome](https://www.google.com/chrome/).

If you are developing using JavaScript, TypeScript, or using the SharePoint Framework (SPFx), then install [Visual Studio Code](https://code.visualstudio.com/download), version 1.55 or later.  If you are developing using .NET, then install [Visual Studio 2019](https://visualstudio.com/download).  Ensure you install the **ASP.NET and web development** workload or the **.NET Core cross-platform development** workload.

> [!WARNING]
> There are known issues with using `npm@7`, packaged with Node v15 and later.  If you have problems running `npm install`, then ensure you are using Node v14 (LTS)

## Install the Teams Toolkit

The Teams Toolkit provides tools to provision and deploy cloud resources for your app, and to publish your app to the Teams App Portal.  It is provided as a CLI (called `teamsfx`) and an extension for Visual Studio and Visual Studio Code.

# [Visual Studio Code](#tab/vscode)

To install the Teams Toolkit Extension:

- Open Visual Studio Code.
- Bring up the Extensions view (**Ctrl+Shift+X** / **⌘⇧-X** or **View > Extensions**).
- In the search box, enter _Teams Toolkit_.
- Click on the green install button next to the Teams Toolkit.

You can find the Teams Toolkit on the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension).

The following tools will be installed by the Visual Studio Code extension when they are needed.  If already installed, the installed version will be used instead:

- [Azure Functions Core Tools](/azure/azure-functions/functions-run-local)

    Azure Functions Core Tools is used to run any backend components locally during a local debug run, including the authentication helpers required when running your services in Azure.  It is installed within the project directory (using the npm `devDependencies`).

- [.NET SDK](/dotnet/core/install/)

    The .NET SDK is used to install customized bindings for local debugging and Azure Functions app deployments.  If you have not installed the .NET 3.1 (or later) SDK globally, the portable version will be installed.

- [ngrok](https://ngrok.com/download)

    Some Teams app features (conversational bots, message extensions, and incoming webhooks) require inbound connections.  You need to expose your development system to Teams through a tunnel.  A tunnel is not required for applications that only include tabs.  This package is installed within the project directory (using npm `devDependencies`).

# [Visual Studio 2019](#tab/vs)

You can use Visual Studio 2019 to develop Teams apps with Blazor Server in .NET.  If you are not intending to develop Teams apps in .NET, then install the Visual Studio Code version of Teams Toolkit.

To install the Teams Toolkit extension:

- Open Visual Studio 2019.
- Select **Extensions** > **Manage Extensions**.
- In the search box, enter _Teams Toolkit_.
- Select the Teams Toolkit extension, then press **Download**.

The extension will be downloaded.  Close Visual Studio 2019 to install the extension.

# [Command Line](#tab/cli)

To install the TeamsFX CLI, use the `npm` package manager:

``` bash
npm install -g @microsoft/teamsfx-cli
```

Ensure you add the npm global cache to your PATH.  This is normally done as part of the NodeJS installer.  

You can use the TeamsFX CLI using the `teamsfx` command.  Verify that the command is working by running `teamsfx -h`.

> [!CAUTION]
> Before you can run TeamsFX in PowerShell terminals, you need to enable the "remote signed" execution policy for PowerShell.  For more information, refer to the [PowerShell documentation](/powershell/module/microsoft.powershell.core/about/about_signing).

---

## Install optional tools

Install appropriate browser tools for application development.  For instance, if your app is written with the React framework, you can use React Dev Tools:

- [React Dev Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

If you wish to access data stored in Azure, or deploy a cloud-based backend for your Teams app within Azure, you can install tools to work with Azure.

- [Azure Tools for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack)
- [Azure CLI](/cli/azure/install-azure-cli)

If you work with information in Microsoft Graph, you should learn about and bookmark the Microsoft Graph Explorer.  This is a web application that allows you to query Microsoft Graph outside of an application.

- [Microsoft Graph Explorer](https://developer.microsoft.com/graph/graph-explorer)

[Teams App Portal](https://dev.teams.microsoft.com/) provides facilities to allow you to manage the Teams apps you develop, including submitting them for approval to be listed in the enterprise Teams App Store.  Bookmark the link below:

- [Teams App Portal](https://dev.teams.microsoft.com/)

## Enable side-loading

During development, you will need to load your app within Teams without distributing it.  This is known as "sideloading".

1. If you have a Teams account, verify if you can sideload apps in Teams:

    1. In the Teams client, select **Apps**.
    1. Look for an option to **Upload a custom app**.

    :::image type="content" source="~/assets/images/teams-toolkit-v2/upload-custom-app-closeup.png" alt-text="Illustration showing where in Teams you can upload a custom app.":::

> [!NOTE]
> If you still can't sideload apps, talk to your Teams administrator. See [enable custom Teams apps and turn on custom app uploading](~/platform/concepts/build-and-test/prepare-your-o365-tenant#enable-custom-teams-apps-and-turn-on-custom-app-uploading) for details.

## Get a free Teams developer tenant (optional)

If you cannot see the sideload option, or you don't have a Teams account, you can get a free Teams developer account by joining the M365 developer program.  The registration process takes approximately two minutes.

1. Go to the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
1. Select **Join Now*- and follow the onscreen instructions.
1. When you get to the welcome screen, select **Set up E5 subscription**.
1. Set up your administrator account. Once you finish, you should see a screen like this.

    :::image type="content" source="~/assets/images/build-your-first-app/dev-program-subscription.png" alt-text="Example of what you see after signing up for the Microsoft 365 developer program.":::

1. Log in to Teams using the administrator account you just set up.
1. Verify if you now have the **Upload a custom app** option.

## Get a free Azure account

If you wish to host your app or access resources within Azure, you will need an Azure subscription.  You can [create a free account](https://azure.microsoft.com/free/) before you begin.

## Sign in to your M365 and Azure Accounts

You will need access to two accounts:

- Your M365 Account Credentials.  This is the account that you use to sign into Teams.  If you are using an M365 developer program tenant, it is the administrator account you set up when you registered for the program.
- Your Azure Credentials.  This is the account that you use to access the Azure Portal, and is used for provisioning new cloud resources to support your application.  

# [Visual Studio Code](#tab/vscode)

1. Open Visual Studio Code
2. Select the Teams icon in the sidebar:

    :::image type="content" source="~/assets/images/teams-toolkit-v2/sidebar-icon.png" alt-text="The Teams Icon in the Visual Studio Code sidebar.":::

4. Select **Sign in to M365**

    :::image type="content" source="~/assets/images/teams-toolkit-v2/account-commands.png" alt-text="Location of the Accounts section used to sign-in.":::

5. The sign-in process will start using your normal web browser.  Complete the sign-in process for your M365 account.  You will be prompted when you can close the browser and return to Visual Studio Code.
6. Return to the Teams Toolkit within Visual Studio Code.
7. Select **Sign in to Azure**

    > [!TIP]
    > If you have the Azure Account extension installed and are using the same account, you can skip this step.  You will automatically use the same account as you are using in other extensions.

8. The sign-in process will start using your normal web browser.  Complete the sign-in process for your Azure account.  You will be prompted when you can close the browser and return to Visual Studio Code.

When complete, the **ACCOUNTS** section of the sidebar will show the two accounts separately, together with the number of usable Azure subscriptions available to you.  Ensure you have at least one usable Azure subscription available.  If not, sign out and use a different account.

# [Visual Studio 2019](#tab/vs)

Visual Studio 2019 will prompt you to log in to each service as it is needed.  You do not need to sign in to your M365 and Azure accounts in advance.

# [Command Line](#tab/cli)

1. Sign in to M365 with the TeamsFX CLI:

    ``` bash
    teamsfx account login m365
    ```

    The sign-in process will start using your normal web browser.  Complete the sign-in process for your M365 account.  You will be prompted when you can close the browser.

2. Sign in to Azure with the TeamsFX CLI:

    ``` bash
    teamsfx account login azure
    ```

    The sign-in process will start using your normal web browser.  Complete the sign-in process for your Azure account.  You will be prompted when you can close the browser.

The account logins are shared between Visual Studio Code and the TeamsFX CLI.

---

## Next steps

Now that your development environment is configured, you can create, build, and deploy your first Teams app.

- [Create your first Teams app using React](first-app-react.md).
- [Create your first Teams app with Blazor](first-app-blazor.md).
- [Create your first Teams app using SharePoint Framework (SPFx)](first-app-spfx.md).
- [Create a conversational bot app](first-app-bot.md).
- [Create a messaging extension](first-message-extension.md).
