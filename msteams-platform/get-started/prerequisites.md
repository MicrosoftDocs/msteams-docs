---
title: Get started - Prerequisites
author: adrianhall
description: Learn how to get started with the Microsoft Teams app development and set up your environment.
ms.author: adhal
ms.date: 05/24/2021
ms.topic: quickstart
ms.localizationpriority: none
---
# Prerequisites: Get started with Microsoft Teams app development

Before you begin creating your first Teams app, install a few tools and set up your development environment.

## Install required tools

The following tools are required for building an app:

- [Node.js](https://nodejs.org/en/download/) (use the latest v14 LTS release)
- A browser with developer tools, such as, [Microsoft Edge](https://www.microsoft.com/edge) (recommended) or [Google Chrome](https://www.google.com/chrome/)

Some other important tools you need are based on how you prefer to build your Teams app:

| If you use | Install |
| --- | --- |
| JavaScript, TypeScript, or SharePoint Framework (SPFx) | [Visual Studio Code](https://code.visualstudio.com/download), version 1.55 or later |
| .NET | [Visual Studio 2019](https://visualstudio.com/download);  ASP.NET and web development OR .NET Core cross-platform development workload |


> [!WARNING]
> There are known issues with `npm@7`, packaged with Node v15 and later. If you have problems running `npm install`, ensure you're using Node v14 (LTS)

## Install conditional tools

Select tools based on the development environment and hosting options you use.
<details>
<summary> Prerequisites for Teams Toolkit </summary>

| If you want to use | Install |
| --- | --- |
| Teams Toolkit | [Teams Toolkit for Visual Studio Code](../toolkit/visual-studio-code-overview.md), [Teams Toolkit for Visual Studio](../toolkit/visual-studio-overview.md), and [Teamsfx CLI Tool](https://github.com/OfficeDev/TeamsFx/tree/dev/packages/cli) |
| React for app development | [React Developer Tools for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) OR [React Developer Tools for Edge](https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil) |

You also need to install the following Visual Studio Code Extensions.

| If you want to | Install |
| --- | --- | 
| Run any backend components locally during a local debug run, including the authentication helpers required when running your services in Azure. | [Azure Functions Core Tools](/azure/azure-functions/functions-run-local) It's installed in the project directory (using the npm `devDependencies`) |
| Install customized bindings for local debugging and Azure Functions app deployments | [.NET SDK](/dotnet/core/install/). If you haven't installed the .NET 3.1 (or later) SDK globally, install the portable version. |
|  Teams app features (conversational bots, messaging extensions, and incoming webhooks) require inbound connections | [ngrok](https://ngrok.com/download) |
|
</details>

<details>
<summary>Prerequisites for other languages and tools </summary>
If you choose a different environment to build your app, select the appropriate tools and install them.

| If you want to use | Install |
| --- | --- | 
| SharePoint Framework (SPFx) | SharePoint App Catalog |
| C# or .NET | Git, ngrok |
| Node.js | Git, Node.js, NPM |
| Yeoman generator | Yeoman generator, Gulp CLI | 
|
</details>
<details>
<summary>Install Optional Tools </summary>

Install browser tools for app development. For instance, if your app is written with React, you can use React Developer Tools:

- [React Developer Tools for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [React Developer Tools for Edge](https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil)

| To use | Install | 
|--- | --- |
| Data stored in Azure or deploy a cloud-based backend for your Teams app in Azure | [Azure Tools for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack)
and [Azure CLI](/cli/azure/install-azure-cli) |
| Microsoft Graph data | [Microsoft Graph Explorer](https://developer.microsoft.com/graph/graph-explorer) |
| Developer Portal for Teams to configure, manage, and distribute your Teams app including to your organization or the Teams store | [Developer Portal for Teams](https://dev.teams.microsoft.com/) |
|

> [!TIP]
> If you work with Microsoft Graph data, you should learn about and bookmark the Microsoft Graph Explorer. This browser-based tool allows you to query Microsoft Graph outside of an app.
</details>

## Prepare development environment
After you've installed the required tools, set up the development environment.


### Install the Teams Toolkit

The Teams Toolkit helps simplify the development process with tools to provision and deploy cloud resources for your app, publish to the Teams store, and more. You can use the toolkit with Visual Studio Code, Visual Studio, or as a CLI (called `teamsfx`). For more information, see [Teams Toolkit for Visual Studio Code](../toolkit/visual-studio-code-overview.md), [Teams Toolkit for Visual Studio](../toolkit/visual-studio-overview.md) and [Teamsfx CLI Tool](https://github.com/OfficeDev/TeamsFx/tree/dev/packages/cli).

# [Visual Studio Code](#tab/vscode)

1. Open Visual Studio Code and select the **Extensions** view (**Ctrl+Shift+X** / **⌘⇧-X** or **View > Extensions**).
1. In the search box, enter **Teams Toolkit**.
1. Select **Install** next to the Teams Toolkit.

 :::image type="content" source="~/assets/images/teams-toolkit-v2/install-toolkit-vscode.png" alt-text="Illustration shows the upload a custom app in Teams.":::

You also can find the Teams Toolkit on the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension).


# [Visual Studio 2019](#tab/vs)

You can use Visual Studio 2019 to develop Teams apps with Blazor Server in .NET.

To install the Teams Toolkit extension:

1. Open Visual Studio 2019.
1. Select **Extensions** > **Manage Extensions**.
1. In the search box, enter **Teams Toolkit**.
1. Select the Teams Toolkit extension and select **Download**. The extension is downloaded.
1. Close Visual Studio 2019 to install the extension.

# [Command line](#tab/cli)

To install the TeamsFx CLI, use the `npm` package manager:

``` bash
npm install -g @microsoft/teamsfx-cli
```

Depending on your configuration, you may need to use `sudo` to install the CLI:

``` bash
sudo npm install -g --unsafe-perm @microsoft/teamsfx-cli
```

This condition is more common on Linux and macOS systems.

Ensure you add the npm global cache to your PATH. This step is normally done as part of the Node.js installer.  

You can use the CLI with the `teamsfx` command. Verify that the command is working by running `teamsfx -h`.

> [!CAUTION]
> Before you can run TeamsFx in PowerShell terminals, you must enable the "remote signed" execution policy for PowerShell. For more information abuut it, see the [PowerShell documentation](/powershell/module/microsoft.powershell.core/about/about_signing).

---

## Set up your Teams development tenant 

A **tenant** is like a space, or a container for your organization in Teams, where you chat, share files, and run meetings. And this space is also where you sideload and test your app. Let's verify if you're ready to develop with the tenant, or create a new tenant for developing and testing.

### Enable sideloading option

Do you already have a tenant, and do you have the admin access? Let's check if you really do!

Verify if you can sideload apps in Teams:

1. In the Teams client, select **Apps** icon
1. Look for an option to **Upload a custom app** If you see the option, you are able to sideload apps to Teams client.

 :::image type="content" source="~/assets/images/teams-toolkit-v2/upload-custom-app-closeup.png" alt-text="Illustration shows the upload a custom app in Teams.":::

> [!NOTE]
> If you don't have the sideloading option, talk to your Teams administrator. See [enable custom Teams apps and turn on custom app uploading](~/concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-turn-on-custom-app-uploading) for details. 

### Create a free Teams developer tenant (optional)

If you cannot see the sideload option, or you do not have a Teams account, or just want to create a test account anyway, you can get a free Teams developer account by joining the M365 developer program!

1. Go to the [Microsoft 365 developer program](https://developer.microsoft.com/microsoft-365/dev-program).
1. Select **Join Now** and follow the onscreen instructions.
1. In the welcome screen, select **Set up E5 subscription**.
1. Set up your administrator account. After you finish, the following screen appears.

    :::image type="content" source="~/assets/images/build-your-first-app/dev-program-subscription.png" alt-text="Example of what you see after signing up for the Microsoft 365 developer program.":::

1. Sign in to Teams using the administrator account you just set up. Verify that you have the **Upload a custom app** option.

## Get a free Azure account

If you wish to host your app or access resources within Azure, you must have an Azure subscription.  You can [create a free account](https://azure.microsoft.com/free/) before you begin.

## Sign in to your Microsoft 365 and Azure accounts

You must have access to two accounts:

- Your Microsoft 365 account credentials: Use this account to sign in to Teams. If you're using a Microsoft 365 developer program tenant, the admin account you set up while registering is your Microsoft 365 account.
- Your Azure credentials: Use this account to access the Azure portal and to provision new cloud resources to support your app.

# [Visual Studio Code](#tab/vscode)

1. Open Visual Studio Code.
1. Select the Teams icon in the sidebar:

    :::image type="content" source="~/assets/images/teams-toolkit-v2/sidebar-icon.png" alt-text="The Teams Icon in the Visual Studio Code sidebar.":::

1. Select **Sign in to M365**.

    :::image type="content" source="~/assets/images/teams-toolkit-v2/account-commands.png" alt-text="Location of the Accounts section used to sign in.":::

    The sign-in process starts using your normal web browser. Complete the sign-in process for your Microsoft 365 account. When you're prompted, close the browser and return to Visual Studio Code.

1. Return to the Teams Toolkit within Visual Studio Code.
1. Select **Sign in to Azure**.

    > [!TIP]
    > If you have the Azure Account extension installed and are using the same account, you can skip this step. Use the same account as you are using in other extensions.

1. The sign-in process starts using your normal web browser.  Complete the sign-in process for your Azure account. When are prompted, you can close the browser and return to Visual Studio Code.

    When complete, the **ACCOUNTS** section of the sidebar shows the two accounts separately, together with the number of usable Azure subscriptions available to you. Ensure you have at least one usable Azure subscription available. If not, sign out and use a different account.

# [Visual Studio 2019](#tab/vs)

Visual Studio 2019 prompts you to log into each service as required. You don't need to sign in to your Microsoft 365 and Azure accounts in advance.

# [Command line](#tab/cli)

1. Sign in to Microsoft 365 with the TeamsFx CLI:

    ``` bash
    teamsfx account login m365
    ```

    The sign-in process starts using your normal web browser. Complete the sign-in process for your Microsoft 365 account. Close the browser when you're prompted.

2. Sign in to Azure with the TeamsFx CLI:

    ``` bash
    teamsfx account login azure
    ```

    The sign-in process starts using your normal web browser. Complete the sign-in process for your Azure account. Close the browser when you're prompted.

    The account logins are shared between Visual Studio Code and the TeamsFx CLI.



    Now that the development environment is configured, you can create, build, and deploy your first Teams app.

## See also

* [Tutorials Overview](code-samples.md) 
* [Create an app using React](first-app-react.md)
* [Create an app using Blazor](first-app-blazor.md)
* [Create an app using SPFx](first-app-spfx.md)
* [Create an app using C# or .NET](get-started-dotnet-app-studio.md)
* [Create an app using Node.js](get-started-nodejs-app-studio.md)
* [Create an app using Yeoman generator](get-started-yeoman.md)
* [Create a conversational bot app](first-app-bot.md)
* [Create a messaging extension](first-message-extension.md)
* [Code Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples)
