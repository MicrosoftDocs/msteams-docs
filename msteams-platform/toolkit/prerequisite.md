---
title: prerequisite
author: MuyangAmigo
description:  Prerequisite forTools and SDK
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Prerequisite for Teams Toolkit and SDK

## Prerequisite

This section helps you to setup your account or prerequisites related to Teams Toolkit and Software Development Kit (SDK).

### Install Teams Toolkit
[Install Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) version v3.0.0+.

> [!TIP]
> Ensure you have Teams app project opened in Visual Studio code.

### Prepare the accounts to build Teams apps

Install the following to prepare the account  to build Teams apps.

* [Microsoft 365 account with valid subscription.](accounts.d#microsoft-365-account)
* [Azure account to host the backend resources on Azure](accounts.md#azure-account-to-host-backend-resources).


### Debug background process


Teams Toolkit checks the following prerequisites during the debug process:

* Node.js, applicable for the following project types:

  |Project type|Node.js LTS version|
  |----------|--------------------------------|
  |Tab without Azure Functions | 10, 12, **14 (recommended)**, 16 |
  |Tab with Azure Functions | 10, 12, **14 (recommended)**|
  |Bot |  10, 12, **14 (recommended)**, 16|
  |Messaging extension | 10, 12, **14 (recommended)**, 16 |

   
* Microsoft 365 account with valid credentials, the Teams toolkit prompts you to sign in to Microsoft 365 account, if you haven't signed in.

* Custom app uploading or sideloading for your developer tenant is turned on. If not, the local debug terminates.

* Ngrok binary version 2.3, applicable for bot and messaging extension.  If Ngrok is'nt installed or the version doesn't match the requirement, the Teams toolkit installs Ngrok NPM package `ngrok@4.2.2` in `~/.fx/bin/ngrok`. The Ngrok binary is managed by Ngrok NPM package in `/.fx/bin/ngrok/node modules/ngrok/bin`.

* If Azure Functions Core Tools version 3. is'nt installed or the version doesn't match the requirement, the Teams toolkit installs Azure Functions Core Tools NPM package, azure-functions-core-tools@3 for **Windows** and for **macOs** in  `~/.fx/bin/func`. The Azure Functions Core Tools NPM package in  `~/.fx/bin/func/node_modules/azure-functions-core-tools/bin` manages Azure Functions Core Tools binary. For Linux, the local debug terminates.

* If .NET Core SDK version, applicable for Azure Functions is'nt installed then the Teams Toolkit installs .NET Core SDK for Windows and MacOs in `~/.fx/bin/dotnet`. For Linux, the local debug terminates.

  The following table lists the .NET Core versions:

  | Platform  | Software|
  | --- | --- |
  |Windows, macOs (x64), and Linux | **3.1 (recommended)**, 5.0, 6.0 |
  |macOs (arm64) |6.0 |

* If the development certificate for localhost is'nt installed for tab in Windows or macOs, the Teams toolkit prompts you to install it.

* If Azure Functions binding extensions defined in `api/extensions.csproj` is'nt installed, the Teams Toolkit installs Azure Functions binding extensions.

* If NPM packages, applicable for tab app, bot app, messaging extension app, and Azure Functions  is'nt installed, the Teams Toolkit installs all NPM packages.

* The Teams Toolkit starts Ngrok to create an HTTP tunnel for bot and messaging extension.

* If tab, bot, messaging extension, and Azure Functions ports are unavailable, the local debug terminates.

  The following table lists the ports available for components:

  | Component  | Port |
  | --- | --- |
  | Tab | 53000 |
  | Bot or messaging extension | 3978 |
  | Node inspector for bot or messaging extension | 9239 |
  | Azure Functions | 7071 |
  | Node inspector for Azure Functions | 9229 |


<!-- The following table lists the limitations if the required software is unavailable for debugging:

|Project type|Installation| Limitation|
|----------|--------------------------------|-----|
|Tab without Azure functions | Node.js LTS versions 10, 12, **14 (recommended)**, 16 | The local debug terminates, if Node.js is'nt installed or the version doesn't match the requirement.|
|Tab with Azure functions | Node.js LTS versions 10, 12, **14 (recommended)** |The local debug terminates, if Node.js is'nt installed or the version doesn't match the requirement.|
|Bot | Node.js LTS versions 10, 12, **14 (recommended)**, 16|The local debug terminates, if Node.js is'nt installed or the version doesn't match the requirement.|
|Messaging extension | Node.js LTS versions 10, 12, **14 (recommended)**, 16 |The local debug terminates, if Node.js is'nt installed or the version doesn't match the requirement.|
|Sign in to Microsoft 365 account | Microsoft 365 credentials |Teams toolkit prompts you to sign in to Microsoft 365 account, if you haven't signed in. |
|Bot, messaging extension | Ngrok version 2.3| • If Ngrok is'nt installed or the version doesn't match the requirement, the Teams toolkit installs Ngrok NPM package `ngrok@4.2.2` in `~/.fx/bin/ngrok`. </br> • The Ngrok binary is managed by Ngrok NPM package in `/.fx/bin/ngrok/node modules/ngrok/bin`.|
|Azure functions | Azure Functions Core Tools version 3| • If Azure Functions Core Tools is'nt installed or the version doesn't match the requirement, the Teams toolkit installs Azure Functions Core Tools NPM package, azure-functions-core-tools@3 for **Windows** and for **macOs** in  `~/.fx/bin/func`. </br> • The Azure Functions Core Tools NPM package in  `~/.fx/bin/func/node_modules/azure-functions-core-tools/bin` manages Azure Functions Core Tools binary. For Linux, the local debug terminates.|
|Azure functions |.NET Core SDK version|• If .NET Core SDK is'nt installed or the version  doesn't match the requirement, the toolkit installs .NET Core SDK for Windows and macOs in `~/.fx/bin/dotnet`.</br> • For Linux, the local debug terminates.|
|Azure functions | Azure functions binding extensions defined in `api/extensions.csproj`| If Azure functions binding extensions is'nt installed, the toolkit installs Azure functions binding extensions.|
|NPM packages| NPM packages for tab app, bot app, messaging extension app, and Azure functions|If NPM is'nt installed, the toolkit installs all NPM packages.|
|Bot and messaging extension | Ngrok |Toolkit starts Ngrok to create an HTTP tunnel for bot and messaging extension. |

> [!NOTE]
> If tab, bot, messaging extension, and Azure functions ports are unavailable, the local debug terminates.

Use the following .NET Core versions:

| Platform  | Software|
| --- | --- |
|Windows, macOs (x64), Linux | **3.1 (recommended)**, 5.0, 6.0 |
|macOs (arm64) |6.0 |


> [!NOTE]
> If the development certificate for localhost is'nt installed for tab in Windows or macOs, the Teams toolkit prompts you to install it.</br> -->


When you select **Start Debugging (F5)**, the Teams Toolkit output channel displays the progress and result after checking the prerequisites.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/prerequisites-debugcheck.png" alt-text="prerequisites":::

## Register and configure your Teams app

In the set up process, Teams Toolkit prepares the following registrations and configurations for your Teams app:

1. [Registers and configures Azure AD application](#registers-and-configures-azure-ad-application): Teams Toolkit registers and configures your Azure AD application.

1. [Registers and configures bot](#registers-and-configures-bot): Teams Toolkit registers and configures your bot for tab or messaging extension app.

1. [Registers and configures Teams app](#registers-and-configures-teams-app): Teams Toolkit registers and configures your Teams app.

### Registers and configures Azure AD application

1. Registers an Azure AD application.

1. Creates a Client Secret.

1. Exposes an API.

    a. Configures Application ID URI. For tab, `api://localhost/{appId}`. For bot or messaging extension,  `api://botid-{botid}`.

    b. Adds a scope named `access_as_user`. Enables it for **Admin and users**.

The following table lists the configurations of Microsoft 365 client application with the client Ids:

  | Microsoft 365 client application |  Client ID  |
  | --- | --- |
  | Teams desktop, mobile | 1fec8e78-bce4-4aaf-ab1b-5451cc387264 |
  | Teams web | 5e3ce6c0-2b1f-4285-8d4b-75ee78787346 |
  | Office.com | 4345a7b9-9a63-4910-a426-35363201d503 |
  | Office.com | 4765445b-32c6-49b0-83e6-1d93765276ca |
  | Office desktop | 0ec893e0-5785-4de6-99da-4ed124e5296c |
  | Outlook desktop | d3590ed6-52b3-4102-aeff-aad2292ab01c |
  | Outlook Web Access | 00000002-0000-0ff1-ce00-000000000000 |
  | Outlook Web Access | bc59ab01-8403-45c6-8796-ac3ef710b3e3 |

4. Configures API permissions. Adds Microsoft Graph permission to **User.Read**.

The following table lists the configuration of the authentication as follows:

  | Project type | Redirect URIs for web | Redirect URIs for single-page application |
  | --- | --- | --- |
  | Tab | `https://localhost:53000/auth-end.html` | `https://localhost:53000/auth-end.html?clientId={appId>}` |
  | Bot or messaging extension | `https://ngrok.io/auth-end.html` | NA |
  
  
### Registers and configures bot 

Install the following for tab app or messaging extension app:

1. Registers an Azure AD application.

1. Creates a Client Secret for the Azure AD application.

1. Registers a bot in [Microsoft Bot Framework](https://dev.botframework.com/) using the Azure AD application.

1. Adds Microsoft Teams channel.

1. Configures messaging endpoint as `https://{ngrokTunnelId}.ngrok.io/api/messages`.

### Registers and configures Teams app

Registers a Teams app in [Developer](https://dev.teams.microsoft.com/home) using the manifest template in `templates/appPackage/manifest.local.template.json`.

After registering and configuring the app, local debug files are generated.

### Collaborate using Toolkit

* Account prerequisites

    To provision cloud resources, you must have the following accounts. For more information, see, [prepare accounts to build Teams app](accounts.md).

  * Microsoft 365 subscription
  * Azure with valid subscription

* [Install Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension) version v3.0.0+.

> [!TIP]
> Ensure you have a Teams app project opened in Microsoft Visual Studio code.

## See also

* [Provision cloud resources](provision.md)
* [Create new Teams project](create-new-project.md)
