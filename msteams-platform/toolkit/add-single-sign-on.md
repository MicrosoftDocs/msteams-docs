---
title: Add single sign-on to your Teams apps
author: zyxiaoyuer
description:  Describes Add single sign-on of Teams Toolkit
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/09/2022
---

# Add single sign-on to your Teams app

Single sign-on minimizes the number of times a user needs to enter their sign-in credentials. This is called SSO or single sign-on. Teams Framework (TeamsFx) added support on top of this mechanism to help developers build single sign feature easily.

> [!Note]
> This feature is currently under developer preview.

## Prerequisite

* Install the latest version of [Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension).

> [!TIP]
> Ensure you have Teams app project opened in VS code.

## Enable SSO support

You can incrementally add SSO to the following project:

* Tab
* Bot
* Notification bot (restify server)
* Command bot

### Add SSO using Visual Studio Code

You can add SSO using Teams Toolkit in Visual Studio Code

    1. Open **Microsoft Visual Studio Code**
    1. Select **Teams Toolkit** from left panel
    1. Select **Add features** or open command palette and select **Teams: Add features**

        :::image type="content" source="../assets/images/teams-toolkit-v2/add-sso/sso-add features.png" alt-text="sso add features":::

    1. Select **Single Sign-On**

        :::image type="content" source="../assets/images/teams-toolkit-v2/add-sso/sso-select features.png" alt-text="sso select":::

### Add SSO using TeamsFx CLI

1. Change directory to your **project directory**
1. Execute the `teamsfx add sso` command to add SSO to your project

> [!Note]
> The feature enables SSO for all applicable capabilities. If you add an SSO-applicable capability later to the project, you can follow the same steps to enable SSO for that capability.

## Changes after 'Add SSO' command execution

After command execution, the additional changes in the project are as follows:

   |**Type**|**File**|**Purpose**|
   |--------|--------|-----------|
   |Create|`aad.template.json` under `template\appPackage`|This is the Azure Active Directory application manifest used to represent AAD app. This template will be used to register an AAD app during local debug or provision stage.|
   |Modify|`manifest.template.json` under `template\appPackage`|An `webApplicationInfo` object will be added into Teams app manifest template. This field is required by Teams to enable SSO. The change is effective when local debug or provision is triggered.|
   |Create|`auth/tab`|Reference code, auth redirect pages and a `README.md` file will be generated in this path for a tab project.|
   |Create|`auth/bot`|Reference code, auth redirect pages and a `README.md` file will be generated in this path for a bot project.|

> [!Note]
> By adding SSO, Teams Toolkit won't change anything in the cloud until local debug or provision is triggered. Update your code to ensure SSO is activated/runs/implemented in your project.

## Changes after triggering 'Add SSO' command

You can follow the steps below to add SSO in your Teams app based on your Teams app capabilities.

> [!Note]
> These changes are based on the templates we scaffold.

### Update source code for Tab project
    
 1. Copy `auth-start.html` and `auth-end.htm` in `auth/public` folder to `tabs/public/`. These two HTML files are used for auth redirects.
 
 2. Copy `sso` folder under `auth/tab to tabs/src/sso/`.
 
      1. `InitTeamsFx`: This file implements a function that initializes TeamsFx SDK and will open `GetUserProfile` component after SDK is initialized.
      
      1. `GetUserProfile`: This file implements a function that calls Microsoft Graph API to get user info.
    
 3. Execute the following commands under `tabs/`: `npm install @microsoft/teamsfx-react`
 
 4. Add the following lines to `tabs/src/components/sample/Welcome.tsx` to import `InitTeamsFx`:
 
```JavaScript

import { InitTeamsFx } from "../../sso/InitTeamsFx";

```
 5. Replace the following line: `<AddSSO />` with `<InitTeamsFx />` to replace the `AddSso` component with `InitTeamsFx` component.
 
### Update source code for Bot project
    
 1. Copy `auth/bot/public` folder to `bot/src`. These folders contains HTML pages used for auth redirect, you need to modify `bot/src/index` file to add routing to these pages.
 
 2. Copy `auth/bot/sso` folder to `bot/src`. These folders contains three files as reference for SSO implementation:
 
      1. `showUserInfo`: This implements a function to get user info with SSO token. You can follow this and create your own method that requires SSO token.
      
      1. `ssoDialog`: This creates a ComponentDialog that used for SSO.
      
      1. `teamsSsoBot`: This creates a TeamsActivityHandler with `ssoDialog` and add `showUserInfo` as a command that can be triggered.
      
 3. Follow the code sample and register your own command with `addCommand` in this file.
 
 4. Execute the following commands under `bot/`: `npm install isomorphic-fetch`
 
 5. Execute the following commands under `bot/`: `npm install copyfiles` and replace following line in package.json:
  
```JSON

"build": "tsc --build",

```

with

```JSON

"build": "tsc --build && copyfiles public/*.html lib/",

```

  The HTML pages used for auth redirect will be copied while building this bot project after updating this command.

 6. After adding the following files, you need to create a new `teamsSsoBot` instance in `bot/src/index` file. Replace the following code:
 
```Javascript

// Process Teams activity with Bot Framework.
server.post("/api/messages", async (req, res) => {
    await commandBot.requestHandler(req, res);
});

```

with

```Javascript

const handler = new TeamsSsoBot();
// Process Teams activity with Bot Framework.
server.post("/api/messages", async (req, res) => {
    await commandBot.requestHandler(req, res, async (context)=> {
        await handler.run(context);
    });
});

```

 7. Add routing in `bot/src/index` file as below:
 
```Javascript

server.get(
    "/auth-*.html",
    restify.plugins.serveStatic({
        directory: path.join(__dirname, "public"),
    })
);

```
 8. Add the following lines to `bot/src/index` to import `teamsSsoBot` and path:
 
```Javascript

// For ts:
import { TeamsSsoBot } from "./sso/teamsSsoBot";
const path = require("path");

// For js:
const { TeamsSsoBot } = require("./sso/teamsSsoBot");
const path = require("path");

```

## Debug application

Press F5 to debug your application.

Teams Toolkit will use the Azure Active Directory (Azure AD) manifest file to register an Azure Active Directory (Azure AD) application for SSO.

For Teams Toolkit local debug functionalities refer [Debug your Teams app](debug-local.md) locally.

## Customize the Azure Active Directory (Azure AD) applications

The Azure Active Directory (Azure AD) manifest lets you customize various aspects of application registration. You can update the manifest as needed.

Follow this document if you need to include other API permissions to access your desired APIs.

For more information refer:

## SSO authentication concepts

### Working of SSO in Teams

Single sign-on (SSO) authentication in Microsoft Azure Active Directory (Azure AD) silently refreshes the authentication token to minimize the number of times a user needs to enter their sign-in credentials. If users agree to use the app, then they don't have to provide consent repeatedly on another device as they're signed in automatically.

Teams tabs and bots have similar flow for SSO support, for more information, see:

   1. [Single sign-on (SSO) support for tabs](../tabs/how-to/authentication/auth-aad-sso.md)
   2. [Single sign-on (SSO) support for bots](../bots/how-to/authentication/auth-aad-sso-bots.md)
   
### Simplification of SSO with TeamsFx

TeamsFx helps to reduce the developer tasks by using Teams SSO and accessing cloud resources down to single line statements with zero configuration.

With TeamsFx SDK, you can write user authentication code in a simplified way using Credentials:

  1. User identity in browser environment: `TeamsUserCredential` represents Teams current user's identity.
  2. User identity in Node.js environment: `OnBehalfOfUserCredentail` uses On-Behalf-Of flow and Teams SSO token.
  3. Application Identity in Node.js environment: `AppCredential` represents the application identity.
   
For more information about TeamsFx SDK, see [TeamsFx SDK](TeamsFx-SDK.md) or check out the API [reference].

You can also explore more samples with SSO built by Teams Framework in the [repo](https://github.com/OfficeDev/TeamsFx-Samples/tree/v2).