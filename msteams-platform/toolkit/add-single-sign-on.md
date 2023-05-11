---
title: Add single sign-on to your Teams apps
author: surbhigupta
description: In this module, learn how to add single sign-on (SSO) of Teams Toolkit, enable SSO support, and update your application to use SSO.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/20/2022
---

# Add single sign-on to Teams app

Microsoft Teams provides single sign-on (SSO) function for an app to obtain signed in Teams user token to access Microsoft Graph and other APIs. Teams Toolkit facilitates the interaction by abstracting few of the Microsoft Azure Active Directory (Azure AD) flows and integrations behind simple APIs. This enables you to add SSO features easily to your Teams app.

## Add SSO to Teams app for Microsoft Visual Studio Code

For apps that interact with the user in a chat, Team, or channel, SSO manifests as an Adaptive Card, which the user can interact with to invoke the Azure AD consent flow.

## Enable SSO support

Teams Toolkit helps you to add SSO to the following Teams capabilities in Visual Studio Code:

* Tab
* Bot
* Notification bot: restify server
* Command bot
* Workflow bot
* Message extension

### Add SSO using Visual Studio Code

You can perform the following steps to add SSO using Teams Toolkit in Visual Studio Code:

1. Open **Visual Studio Code**.
2. Select **Teams Toolkit** from the Visual Studio Code activity bar.
3. Select **View How-to Guides** in the **DEVELOPMENT** section.

   :::image type="content" source="../assets/images/teams-toolkit-v2/manual/select-feature123_1.png" alt-text="Screenshot showing the selection of View How to guides. ":::

4. From the dropdown list, Select **Develop Single Sign-On Experience in Teams**. You will be redirected to the respective How-to Guide.

   :::image type="content" source="../assets/images/teams-toolkit-v2/add-sso/sso-select features_1.png" alt-text="Screenshot shows the Single Sign-on feature highlighted in red in the Visual Studio Code.":::

   |**Development** | **How to guide** |
   | -------- | --------|
   |Develop Single Sign-on Experience in Teams | [How to Develop Single Sign-on Experience](https://github.com/OfficeDev/TeamsFx/wiki/Develop-single-sign-on-experience-in-Teams) |

### Add SSO using TeamsFx CLI

You can run `teamsfx add sso` command in your **project root directory**.

> [!NOTE]
> The feature enables SSO for all existing applicable capabilities. Follow the same steps to enable SSO, if you add capability later to the project.

## Customize your project using Teams Toolkit

The following table lists the changes Teams Toolkit makes to your project:

| **Type** | **File**                                             | **Purpose**                                                                                                                                                                               |
| -------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Create   | `aad.template.json` under `template\appPackage`      | Azure AD application manifest represents your Azure AD app. `template\appPackage` helps to register an Azure AD app during local debug or provision stage.                                |
| Modify   | `manifest.template.json` under `template\appPackage` | A `webApplicationInfo` object is added into your Teams app manifest template. Teams requires this field to enable SSO. The change is in effect when you trigger local debugging or provisioning. |
| Create   | `auth\tab`                                           | Reference code, auth redirect pages, and `README.md` files are generated in this path for a tab project.                                                                                  |
| Create   | `auth\bot`                                           | Reference code, auth redirect pages, and `README.md` files are generated in this path for a bot project.                                                                                  |

> [!NOTE]
> By adding SSO, Teams Toolkit doesn't change anything in the cloud until you trigger local debug. Update your code to ensure that SSO is working in the project.

## Update your application to use SSO

To enable SSO in your application, follow these steps:

> [!NOTE]
> These changes are based on the templates you scaffold.

---

<br>
<br><details>
<summary><b>Tab project
</b></summary>

1. Copy `auth-start.html` and `auth-end.htm` in `auth\public` folder to `tabs\public\`. Teams Toolkit registers these two endpoints in Azure AD for Azure AD's redirect flow.

2. Copy `sso` folder under `auth\tab` to `tabs\src\sso\`.

   * `InitTeamsFx`: The file implements a function that initializes TeamsFx SDK and opens `GetUserProfile` component after SDK is initialized.

   * `GetUserProfile`: The file implements a function that calls Microsoft Graph API to get user info.

3. Execute `npm install @microsoft/teamsfx-react` under `tabs\`.

4. Add the following lines to `tabs\src\components\sample\Welcome.tsx` to import `InitTeamsFx`:

   ```Bash

   import { InitTeamsFx } from "../../sso/InitTeamsFx";

   ```

5. Replace the following line:

   `<AddSSO />` with `<InitTeamsFx />` to replace the `AddSso` component with `InitTeamsFx` component.

</details>
<details>
<summary><b>Bot project
</b></summary>

#### Set up the Azure AD redirects

1. Move the `auth\bot\public` folder to `bot\src`. This folder contains HTML pages that the bot app hosts. When SSO flow is initiated with Azure AD, it redirects you to the HTML pages.
1. Modify your `bot\src\index` to add the appropriate `restify` routes to HTML pages.

   ```ts
   const path = require("path");

   server.get(
     "/auth-*.html",
     restify.plugins.serveStatic({
       directory: path.join(__dirname, "public"),
     })
   );
   ```

#### Update your app

SSO command handler `ProfileSsoCommandHandler` uses an Azure AD token to call Microsoft Graph. This token is obtained by using the signed in Teams user token. The flow is brought together in a dialog that displays a consent dialog if necessary.

1. Move `profileSsoCommandHandler` file under `auth\bot\sso` folder to `bot\src`. `ProfileSsoCommandHandler` class is an SSO command handler to get user info with SSO token, follow this method and create your own SSO command handler.
1. Open `package.json` file and ensure that TeamsFx SDK version >= 1.2.0.
1. Execute the `npm install isomorphic-fetch --save` command in the `bot` folder.
1. For ts script, execute the `npm install copyfiles --save-dev` command in the `bot` folder and replace following lines in `package.json`:

   ```json
   "build": "tsc --build && shx cp -r ./src/adaptiveCards ./lib/src",
   ```

   with

   ```json
   "build": "tsc --build && shx cp -r ./src/adaptiveCards ./lib/src && copyfiles src/public/*.html lib/",
   ```

   This copies the HTML pages used for auth redirect when building the bot project.

1. To make SSO consent flow work, replace the following code in `bot\src\index` file:

   ```ts
   server.post("/api/messages", async (req, res) => {
     await commandBot.requestHandler(req, res);
   });
   ```

   with

   ```ts
   server.post("/api/messages", async (req, res) => {
     await commandBot.requestHandler(req, res).catch((err) => {
       // Error message including "412" means it is waiting for user's consent, which is a normal process of SSO, shouldn't throw this error.
       if (!err.message.includes("412")) {
         throw err;
       }
     });
   });
   ```

1. Replace the following options for `ConversationBot` instance in `bot\src\internal\initialize` to add the SSO config and SSO command handler:

   ```ts
   export const commandBot = new ConversationBot({
       ...
       command: {
           enabled: true,
           commands: [new HelloWorldCommandHandler()],
       },
   });
   ```

   with

   ```ts
   import { ProfileSsoCommandHandler } from "../profileSsoCommandHandler";

   export const commandBot = new ConversationBot({
       ...
       // To learn more about ssoConfig, please refer teamsfx sdk document: https://docs.microsoft.com/microsoftteams/platform/toolkit/teamsfx-sdk
       ssoConfig: {
           aad :{
               scopes:["User.Read"],
           },
       },
       command: {
           enabled: true,
           commands: [new HelloWorldCommandHandler() ],
           ssoCommands: [new ProfileSsoCommandHandler()],
       },
   });
   ```

1. Register your command in the Teams app manifest. Open `templates\appPackage\manifest.template.json`, and add the following lines under `commands` in `commandLists` of your bot:

   ```json
   {
     "title": "profile",
     "description": "Show user profile using Single Sign On feature"
   }
   ```

#### Add a new SSO command to the bot (Optional)

After successfully adding SSO in your project, you can add a new SSO command:

1. Create a new file such as `photoSsoCommandHandler.ts` or `photoSsoCommandHandler.js` in `bot\src\` and add your own SSO command handler to call Graph API:

   ```TypeScript
   // for TypeScript:
   import { Activity, TurnContext, ActivityTypes } from "botbuilder";
   import "isomorphic-fetch";
   import {
       CommandMessage,
       TriggerPatterns,
       TeamsFx,
       createMicrosoftGraphClient,
       TeamsFxBotSsoCommandHandler,
       TeamsBotSsoPromptTokenResponse,
   } from "@microsoft/teamsfx";

   export class PhotoSsoCommandHandler implements TeamsFxBotSsoCommandHandler {
       triggerPatterns: TriggerPatterns = "photo";

       async handleCommandReceived(
           context: TurnContext,
           message: CommandMessage,
           tokenResponse: TeamsBotSsoPromptTokenResponse,
       ): Promise<string | Partial<Activity> | void> {
           await context.sendActivity("Retrieving user information from Microsoft Graph ...");

           const teamsfx = new TeamsFx().setSsoToken(tokenResponse.ssoToken);

           const graphClient = createMicrosoftGraphClient(teamsfx, ["User.Read"]);

           let photoUrl = "";
           try {
               const photo = await graphClient.api("/me/photo/$value").get();
               const arrayBuffer = await photo.arrayBuffer();
               const buffer=Buffer.from(arrayBuffer, 'binary');
               photoUrl = "data:image/png;base64," + buffer.toString("base64");
           } catch {
               // Could not fetch photo from user's profile, return empty string as placeholder.
           }
           if (photoUrl) {
               const photoMessage: Partial<Activity> = {
                   type: ActivityTypes.Message,
                   text: 'This is your photo:',
                   attachments: [
                       {
                           name: 'photo.png',
                           contentType: 'image/png',
                           contentUrl: photoUrl
                       }
                   ]
               };
               return photoMessage;
           } else {
               return "Could not retrieve your photo from Microsoft Graph. Please make sure you have uploaded your photo.";
           }
       }
   }
   ```

   ```javascript
   // for JavaScript:
   const { ActivityTypes } = require("botbuilder");
   require("isomorphic-fetch");
   const {
     createMicrosoftGraphClient,
     TeamsFx,
   } = require("@microsoft/teamsfx");

   class PhotoSsoCommandHandler {
     triggerPatterns = "photo";

     async handleCommandReceived(context, message, tokenResponse) {
       await context.sendActivity(
         "Retrieving user information from Microsoft Graph ..."
       );

       const teamsfx = new TeamsFx().setSsoToken(tokenResponse.ssoToken);

       const graphClient = createMicrosoftGraphClient(teamsfx, ["User.Read"]);

       let photoUrl = "";
       try {
         const photo = await graphClient.api("/me/photo/$value").get();
         const arrayBuffer = await photo.arrayBuffer();
         const buffer = Buffer.from(arrayBuffer, "binary");
         photoUrl = "data:image/png;base64," + buffer.toString("base64");
       } catch {
         // Could not fetch photo from user's profile, return empty string as placeholder.
       }
       if (photoUrl) {
         const photoMessage = {
           type: ActivityTypes.Message,
           text: "This is your photo:",
           attachments: [
             {
               name: "photo.png",
               contentType: "image/png",
               contentUrl: photoUrl,
             },
           ],
         };
         return photoMessage;
       } else {
         return "Could not retrieve your photo from Microsoft Graph. Please make sure you have uploaded your photo.";
       }
     }
   }

   module.exports = {
     PhotoSsoCommandHandler,
   };
   ```

1. Add `PhotoSsoCommandHandler` instance to `ssoCommands` array in `bot\src\internal\initialize.ts`:

   ```ts
   // for TypeScript:
   import { PhotoSsoCommandHandler } from "../photoSsoCommandHandler";

   export const commandBot = new ConversationBot({
       ...
       command: {
           ...
           ssoCommands: [new ProfileSsoCommandHandler(), new PhotoSsoCommandHandler()],
       },
   });
   ```

   ```javascript
   // for JavaScript:
   ...
   const { PhotoSsoCommandHandler } = require("../photoSsoCommandHandler");

   const commandBot = new ConversationBot({
       ...
       command: {
           ...
           ssoCommands: [new ProfileSsoCommandHandler(), new PhotoSsoCommandHandler()]
       },
   });
   ...

   ```

1. Register your command in the Teams app manifest. Open `templates\appPackage\manifest.template.json`, and add following lines under `commands` in `commandLists` of your bot:

   ```JSON

   {
       "title": "photo",
       "description": "Show user photo using Single Sign On feature"
   }

   ```

</details>

<details>
<summary><b>Message extension project
</b></summary>

The sample business logic provides a handler `TeamsBot` extends `TeamsActivityHandler` and override `handleTeamsMessagingExtensionQuery`.

You can update the query logic in the `handleMessageExtensionQueryWithToken` with token, which is obtained by using the signed in Teams user token.

To make this work in your app:

1. Move the `auth\bot\public` folder to `bot`. This folder contains HTML pages that the bot app hosts. When SSO flows are initiated with Azure AD, Azure AD redirects you to these pages.

1. Modify your `bot\index` to add the appropriate `restify` routes to these pages.

    ```ts
    const path = require("path");

    server.get(
        "/auth-*.html",
        restify.plugins.serveStatic({
            directory: path.join(__dirname, "public"),
        })
    );
    ```

1. Override `handleTeamsMessagingExtensionQuery` interface under `bot\teamsBot`. You can follow the sample code in the `handleMessageExtensionQueryWithToken` to do your own query logic.

1. Open `bot\package.json`, ensure that `@microsoft/teamsfx` version >= 1.2.0.

1. Install `isomorphic-fetch` npm packages in your bot project.

1. For ts, install `copyfiles` npm packages in your bot project, add or update the `build` script in `bot\package.json` as follows:

    ```json
    "build": "tsc --build && copyfiles ./public/*.html lib/",
    ```

    As you do it, the HTML pages used for auth redirect are copied when you build this bot project.

1. Update `templates\appPackage\aad.template.json` your scopes, which used in `handleMessageExtensionQueryWithToken`.

    ```json
    "requiredResourceAccess": [
        {
            "resourceAppId": "Microsoft Graph",
            "resourceAccess": [
                {
                    "id": "User.Read",
                    "type": "Scope"
                }
            ]
        }
    ]
    ```

</details>

## Debug your app

Press **F5** to debug your application. Teams Toolkit uses the Azure AD manifest file to register an Azure AD app for SSO. For Teams Toolkit local debug functionalities, see [how to debug your Teams app locally](debug-local.md).

## Customize Azure AD app registration

The [Azure AD app manifest](/azure/active-directory/develop/reference-app-manifest) allows you to customize various aspects of app registration. You can update the manifest as needed. If you need to include more API permissions to access your desired APIs, see [API permissions to access your desired APIs](https://github.com/OfficeDev/TeamsFx/wiki/#customize-aad-manifest-template).
To view your Azure AD app in Azure portal, see [view Azure AD app in Azure portal](https://github.com/OfficeDev/TeamsFx/wiki/Manage-AAD-application-in-Teams-Toolkit#How-to-view-the-AAD-app-on-the-Azure-portal).

## SSO authentication concepts

The following concepts help you with SSO authentication:

### Working of SSO in Teams

SSO authentication in Azure AD silently refreshes the authentication token to minimize the number of times users need to enter their sign in credentials. If users agree to use your app, they don't have to provide consent again on another device, as they're signed in automatically.

Teams tabs and bots have similar flow for SSO support. For more information, see:

1. [SSO authentication in Tabs](../tabs/how-to/authentication/tab-sso-overview.md)
1. [SSO authentication in Bots](../bots/how-to/authentication/auth-aad-sso-bots.md)

### Simplified SSO with TeamsFx

TeamsFx helps to reduce the developer tasks by using SSO and accessing cloud resources down to single-line statements with zero configuration.

With TeamsFx SDK, you can write user authentication code in a simplified way using following credentials:

1. User identity in browser environment: `TeamsUserCredential` represents Teams current user's identity.
1. User identity in Node.js environment: `OnBehalfOfUserCredential` uses On-Behalf-Of flow and SSO token.
1. Application Identity in Node.js environment: `AppCredential` represents the application identity.

For more information about TeamsFx SDK, see:

* [TeamsFx SDK](TeamsFx-SDK.md) or [API reference](/javascript/api/@microsoft/teamsfx/?view=msteams-client-js-latest&preserve-view=true)
* [Microsoft Teams Framework (TeamsFx) Sample Gallery](https://github.com/OfficeDev/TeamsFx-Samples/tree/v2)

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Prerequisites for creating your Teams app](tools-prerequisites.md)
* [Enable SSO for tab app](../tabs/how-to/authentication/tab-sso-overview.md)
* [Enable SSO for your bot and message extension](../bots/how-to/authentication/bot-sso-overview.md)
* [Prepare Accounts to build your Teams app](tools-prerequisites.md#accounts-to-build-your-teams-app)
