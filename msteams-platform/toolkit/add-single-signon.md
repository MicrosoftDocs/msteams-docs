---
title: Add single sign on to your Teams apps
author: 
description:  Describes Add single sign on of Teams Toolkit
ms.author: 
ms.localizationpriority: 
ms.topic: 
ms.date: 09/05/2022
---

# Add single sign on to your Teams apps

Microsoft Teams has provided a mechanism to minimize the number of times users need to enter their sign in credentials and this is called single sign on. Teams Framework (TeamsFx) added support on top of this mechanism to help developers build single sign feature easily.

## Prerequisite

* Install the [latest version of Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension).

> [!TIP]
> Ensure you have Teams app project opened in VS code.

## Enable sso support

If you started with following project, you can incrementally add SSO:

* Tab
* Bot
* Notification bot (restify server)
* Command bot

### Add SSO using Visual Studio Code

* You can add SSO using Teams Toolkit in Visual Studio Code

    1. Open **Microsoft Visual Studio Code**
    1. Select **Teams Toolkit** from left panel
    1. Select **Add features** or open command palette and select **Teams: Add features**

        :::image type="content" source="../assets/images/teams-toolkit-v2/add-sso/sso-add features.png" alt-text="sso add features":::

    1. Select **Single Sign-On**

        :::image type="content" source="../assets/images/teams-toolkit-v2/add-sso/sso-select features.png" alt-text="sso select":::

### Add SSO using TeamsFx CLI in command window

1. Change directory to your **project directory**
1. Execute the `teamsfx add sso` command to add SSO to your project

> [!Note]
> This feature will enable SSO for all applicable capabilities. If you add an SSO-applicable capability later to the project, you can follow the same steps to enable SSO for that capability.

## What we will do in 'Add SSO' command

After command execution, Teams Toolkit will do the following things:

   |**Type**|**File**|**Purpose**|
   |--------|--------|-----------|
   |Create|`aad.template.json` under `template\appPackage`|This is the Azure Active Directory application manifest used to represent your AAD app. This template will be used to register an AAD app during local debug or provision stage.|
   |Modify|`manifest.template.json` under `template\appPackage`|An `webApplicationInfo` object will be added into your Teams app manifest template. This field is required by Teams when enabling SSO. This change will take effect when you trigger local debug or provision.|
   |Create|`auth/tab`|reference code, auth redirect pages and a `README.md` file will be generated in this path for a tab project.|
   |Create|`auth/bot`|reference code, auth redirect pages and a `README.md` file will be generated in this path for a bot project.|

> [!Note]
> Please note this by adding SSO, Teams Toolkit won't change anything in the cloud until you trigger local debug or provision. You also need to update your code to ensure SSO works in your project.

## What you need to do after triggering 'Add SSO' command

You can follow the steps below to add SSO in your Teams app based on your Teams app capabilities.

> [!Note]
> These changes are based on the templates we scaffold.

### Update your source code for Tab project
    
 1. Copy auth-start.html and auth-end.htm in auth/public folder to tabs/public/. These two HTML files are used for auth redirects.
 2. Copy sso folder under auth/tab to tabs/src/sso/.
      1. InitTeamsFx: This file implements a function that initialize TeamsFx SDK and will open GetUserProfile component after SDK is initialized.
      1. GetUserProfile: This file implements a function that calls Microsoft Graph API to get user info.
 3. Execute the following commands under tabs/: npm install @microsoft/teamsfx-react
 4. Add the following lines to tabs/src/components/sample/Welcome.tsx to import InitTeamsFx:
 5. Replace the following line: <AddSSO /> with <InitTeamsFx /> to replace the AddSso component with InitTeamsFx component.
 
### Update your source code for Bot project
    
 1. Copy auth/bot/public folder to bot/src. These folder contains HTML pages used for auth redirect, please note that you need to modify bot/src/index file to add routing to these pages.
 2. Copy auth/bot/sso folder to bot/src. These folder contains three files as reference for sso implementation:
      1. showUserInfo: This implements a function to get user info with SSO token. You can follow this method and create your own method that requires SSO token.
      1. ssoDialog: This creates a ComponentDialog that used for SSO.
      1. teamsSsoBot: This create a TeamsActivityHandler with ssoDialog and add showUserInfo as a command that can be triggered.
 3. (Optional) Follow the code sample and register your own command with addCommand in this file.
 4. Execute the following commands under bot/: npm install isomorphic-fetch
 5. Execute the following commands under bot/: npm install copyfiles and replace following line in package.json:
  
with

  By doing this, the HTML pages used for auth redirect will be copied when building this bot project.
 6. After adding the following files, you need to create a new teamsSsoBot instance in bot/src/index file. Please replace the following code:
 
with

 7. Add routing in bot/src/index file as below:
 
 8. Add routing in bot/src/index file as below:

## Debug your application

You can debug your application by pressing F5.

Teams Toolkit will use the AAD manifest file to register a AAD application registered for SSO.

To learn more about Teams Toolkit local debug functionalities, refer to this document.

## Customize AAD applications

The AAD manifest allows you to customize various aspects of your application registration. You can update the manifest as needed.

Follow this document if you need to include additional API permissions to access your desired APIs.

## SSO authentication concepts

### How SSO works in Teams

Single sign-on (SSO) authentication in Microsoft Azure Active Directory (Azure AD) silently refreshes the authentication token to minimize the number of times users need to enter their sign in credentials. If users agree to use your app, they don't have to provide consent again on another device as they're signed in automatically.

Teams Tabs and bots have similar flow for SSO support, to learn in detail, please refer to:

   1. Use SSO authentication in Tabs
   1. Use SSO authentication in Bots
   
### How SSO are simplified with TeamsFx

TeamsFx helps to reduce the developer tasks by leveraging Teams SSO and accessing cloud resources down to single line statements with zero configuration.

With TeamsFx SDK, you can write user authentication code in a simplified way using Credentials:

  1. User identity in browser environment: TeamsUserCredential represents Teams current user's identity.
  1. User identity in Node.js environment: OnBehalfOfUserCredentail uses On-Behalf-Of flow and Teams SSO token.
  1. Application Identity in Node.js environment: AppCredential represents the application identity.
   
To learn more about TeamsFx SDK, please read the documentation or check out the API reference.

You can also explore more samples with SSO built by Teams Framework in the repo.