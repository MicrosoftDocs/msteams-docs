---
title: Add single sign-on to your Teams apps
author: zyxiaoyuer
description: In this module, learn how to add single sign-on (SSO) of Teams Toolkit, enable SSO support, update your application to use SSO
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/20/2022
---

# Add single sign-on to Teams app

Microsoft Teams provides single sign-on function for application to obtain signed-in Teams user token to access Microsoft Graph and other APIs. Teams Toolkit facilitates the interaction by abstracting some of the Azure AD flows and integrations behind some simple APIs. This enables you to add single sign-on (SSO) features easily to your Teams application.

For applications that interact with the user in a chat, a Team, or a channel, SSO manifests as an Adaptive Card, which the user can interact with to invoke the Azure AD consent flow.

## Enable SSO support

Teams Toolkit helps you to add SSO to the following Teams capabilities:

* Tab
* Bot
* Notification bot: restify server
* Command bot

### Add SSO using Visual Studio Code

The following steps help you to add SSO using Teams Toolkit in Visual Studio Code

1. Open **Microsoft Visual Studio Code**.
2. Select Teams Toolkit :::image type="content" source="~/assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.png" alt-text="sso add sidebar"::: from left navigation bar.
3. Select **Add features** under **DEVELOPMENT**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/add-sso/sso-add features.png" alt-text="Screenshot describes how to add SSO features.":::

    * You can also open command palette and select **Teams: Add features**

4. Select **Single Sign-On**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/add-sso/sso-select features.png" alt-text="Screenshot describes how to select SSO.":::

### Add SSO using TeamsFx CLI

You can run `teamsfx add sso` command in your **project root directory**

> [!Note]
> The feature enables SSO for all existing applicable capabilities. Follow the same steps to enable SSO if you add capability later to the project.

## Customize your project using Teams Toolkit

The following table lists the changes Teams Toolkit makes to your project:

   |**Type**|**File**|**Purpose**|
   |--------|--------|-----------|
   |Create|`aad.template.json` under `template/appPackage`|Azure AD application manifest represents your Azure AD app. `template/appPackage` helps to register an Azure AD app during local debug or provision stage.|
   |Modify|`manifest.template.json` under `template/appPackage`|A `webApplicationInfo` object is added into your Teams app manifest template. Teams requires this field to enable SSO. The change is in effect when you trigger local debug or provision.|
   |Create|`auth/tab`|Reference code, auth redirect pages and a `README.md` file is generated in this path for a tab project.|
   |Create|`auth/bot`|Reference code, auth redirect pages and a `README.md` file is generated in this path for a bot project.|

> [!Note]
> By adding SSO, Teams Toolkit doesn't change anything in the cloud until you trigger local debug. Update your code to ensure that SSO is working in the project.

## Update your application to use SSO

The following steps help you to enable SSO in your application.

> [!NOTE]
> These changes are based on the templates we scaffold.

---
<br>
<br><details>
<summary><b>Tab project
</b></summary>

1. Copy `auth-start.html` and `auth-end.htm`** in `auth/public` folder to `tabs/public/`. Teams Toolkit registers these two endpoints in Azure AD for Azure AD's redirect flow.

2. Copy `sso` folder under `auth/tab` to `tabs/src/sso/`.

    * `InitTeamsFx`: The file implements a function that initializes TeamsFx SDK and opens `GetUserProfile` component after SDK is initialized

    * `GetUserProfile`: The file implements a function that calls Microsoft Graph API to get user info

3. Execute `npm install @microsoft/teamsfx-react` under `tabs/`.

4. Add the following lines to `tabs/src/components/sample/Welcome.tsx` to import `InitTeamsFx`:

    ```Bash

    import { InitTeamsFx } from "../../sso/InitTeamsFx";

    ```

5. Replace the following line: `<AddSSO />` with `<InitTeamsFx />` to replace the `AddSso` component with `InitTeamsFx` component.

</details>
<details>
<summary><b>Bot project
</b></summary>

1. Copy `auth/bot/public` folder to `bot/src`. The two folders contain HTML pages used for auth redirect, you need to modify `bot/src/index` file to add routing to these pages.

2. Copy `auth/bot/sso` folder to `bot/src`. The two folders contain three files as reference for SSO implementation:

    * `showUserInfo`: It implements a function to get user info with SSO token. You can follow this to create your own method that requires SSO token.

    * `ssoDialog`: It creates a [ComponentDialog](/javascript/api/botbuilder-dialogs/componentdialog?view=botbuilder-ts-latest&preserve-view=true) that is used for SSO.

    * `teamsSsoBot`: It creates a [TeamsActivityHandler](/javascript/api/botbuilder/teamsactivityhandler?view=botbuilder-ts-latest&preserve-view=true) with `ssoDialog` and add `showUserInfo` as a command that can be triggered.

3. Follow the code sample and register your own command with `addCommand` in this file (optional).

4. Execute `npm install isomorphic-fetch` under `bot/`.

5. Execute `npm install copyfiles` under `bot/` and replace following line in package.json:
  
   ```JSON

   "build": "tsc --build",

    ```

   with

   ```JSON

   "build": "tsc --build && copyfiles public/*.html lib/",

   ```

   The HTML pages used for auth redirect are copied while building this bot project.

6. After you add the following files, you need to create a new `teamsSsoBot` instance in `bot/src/index` file. Replace the following code:

   ```Bash
  
   // Process Teams activity with Bot Framework.
   server.post("/api/messages", async (req, res) => {
   await commandBot.requestHandler(req, res);
   });  

   ```

   with

   ```Bash

   const handler = new TeamsSsoBot();
   // Process Teams activity with Bot Framework.
   server.post("/api/messages", async (req, res) => {
       await commandBot.requestHandler(req, res, async (context)=> {
           await handler.run(context);
       });
   });

   ```

7. Add the HTML routes in the `bot/src/index` file:

   ```Bash

   server.get(
       "/auth-*.html",
       restify.plugins.serveStatic({
           directory: path.join(__dirname, "public"),
       })
   );

   ```

8. Add the following lines to `bot/src/index` to import `teamsSsoBot` and `path`:

   ```Bash

   // For ts:
   import { TeamsSsoBot } from "./sso/teamsSsoBot";
   const path = require("path");

   // For js:
   const { TeamsSsoBot } = require("./sso/teamsSsoBot");
   const path = require("path");

   ```

9. Register your command in the Teams app manifest. Open `templates/appPackage/manifest.template.json`, and add following lines under `command` in `commandLists` of your bot:

   ```JSON

   {
       "title": "show",
       "description": "Show user profile using Single Sign On feature"
   }

   ```

</details>
<details>
<summary><b>Add a new command to the bot
</b></summary>

> [!NOTE]
> Currently, these instructions applies to `command bot`. If you start with a `bot`, see [bot-sso sample](https://github.com/OfficeDev/TeamsFx-Samples/tree/v2/bot-sso).

The following steps help you to add a new command, after you add SSO in your project:

1. Create a new file (`todo.ts` or `todo.js`) under `bot/src/` and add your own business logic to call Graph API:

# [TypeScript](#tab/typescript)

   ```typescript
   // for TypeScript:
export async function showUserImage(
    context: TurnContext,
    ssoToken: string,
    param: any[]
): Promise<DialogTurnResult> {
    await context.sendActivity("Retrieving user photo from Microsoft Graph ...");

    // Init TeamsFx instance with SSO token
    const teamsfx = new TeamsFx().setSsoToken(ssoToken);

    // Update scope here. For example: Mail.Read, etc.
    const graphClient = createMicrosoftGraphClient(teamsfx, param[0]);
    
    // You can add following code to get your photo:
    // let photoUrl = "";
    // try {
    //   const photo = await graphClient.api("/me/photo/$value").get();
    //   photoUrl = URL.createObjectURL(photo);
    // } catch {
    //   // Could not fetch photo from user's profile, return empty string as placeholder.
    // }
    // if (photoUrl) {
    //   await context.sendActivity(
    //     `You can find your photo here: ${photoUrl}`
    //   );
    // } else {
    //   await context.sendActivity("Could not retrieve your photo from Microsoft Graph. Please make sure you have uploaded your photo.");
    // }

    return;
}  
   ```

# [JavaScript](#tab/javascript)

   ```javaScript
   // for JavaScript:
export async function showUserImage(context, ssoToken, param) {
    await context.sendActivity("Retrieving user photo from Microsoft Graph ...");

    // Init TeamsFx instance with SSO token
    const teamsfx = new TeamsFx().setSsoToken(ssoToken);

    // Update scope here. For example: Mail.Read, etc.
    const graphClient = createMicrosoftGraphClient(teamsfx, param[0]);
    
    // You can add following code to get your photo:
    // let photoUrl = "";
    // try {
    //   const photo = await graphClient.api("/me/photo/$value").get();
    //   photoUrl = URL.createObjectURL(photo);
    // } catch {
    //   // Could not fetch photo from user's profile, return empty string as placeholder.
    // }
    // if (photoUrl) {
    //   await context.sendActivity(
    //     `You can find your photo here: ${photoUrl}`
    //   );
    // } else {
    //   await context.sendActivity("Could not retrieve your photo from Microsoft Graph. Please make sure you have uploaded your photo.");
    // }

    return;
}
   ```

---

2. Register a new command

   * Add the following line for new command registration using `addCommand` in `teamsSsoBot`:

     ```bash

     this.dialog.addCommand("ShowUserProfile", "show", showUserInfo);

     ```

   * Add following lines after the above line to register a new command `photo` and hook up with method `showUserImage` added above:

     ```bash

     // As shown here, you can add your own parameter into the `showUserImage` method
     // You can also use regular expression for the command here
     const scope = ["User.Read"];
     this.dialog.addCommand("ShowUserPhoto", new RegExp("photo\s*.*"), showUserImage, scope);

     ```

3. Register your command in the Teams app manifest. Open `templates/appPackage/manifest.template.json`, and add following lines under `command` in `commandLists` of your bot:

   ```JSON

   {
       "title": "photo",
       "description": "Show user photo using Single Sign On feature"
   }

   ```

</details>
<br>

## Debug your application

Press F5 to debug your application. Teams Toolkit uses the Azure AD manifest file to register an Azure AD application for SSO. For Teams Toolkit local debug functionalities, see [Debug your Teams app locally](debug-local.md).

## Customize Azure AD application registration

The [Azure AD app manifest](/azure/active-directory/develop/reference-app-manifest) allows you to customize various aspects of application registration. You can update the manifest as needed. If you need to include additional API permissions to access your desired APIs, see [API permissions to access your desired APIs](https://github.com/OfficeDev/TeamsFx/wiki/#customize-aad-manifest-template).
To view your Azure AD application in Azure Portal, see [View Azure AD application in Azure portal](https://github.com/OfficeDev/TeamsFx/wiki/Manage-AAD-application-in-Teams-Toolkit#How-to-view-the-AAD-app-on-the-Azure-portal).

## SSO authentication concepts

The following concepts help you for SSO authentication:

### Working of SSO in Teams

Single sign-on (SSO) authentication in Microsoft Azure Active Directory (Azure AD) silently refreshes the authentication token to minimize the number of times users need to enter their sign-in credentials. If users agree to use your app, they don't have to provide consent again on another device as they're signed in automatically.

Teams tabs and bots have similar flow for SSO support, for more information, see:

1. [Single sign-on (SSO) authentication in Tabs](../tabs/how-to/authentication/tab-sso-overview.md)
2. [Single sign-on (SSO) authentication in Bots](../bots/how-to/authentication/auth-aad-sso-bots.md)

### Simplified SSO with TeamsFx

TeamsFx helps to reduce the developer tasks by using SSO and accessing cloud resources down to single line statements with zero configuration.

With TeamsFx SDK, you can write user authentication code in a simplified way using Credentials:

1. User identity in browser environment: `TeamsUserCredential` represents Teams current user's identity.
2. User identity in Node.js environment: `OnBehalfOfUserCredential` uses On-Behalf-Of flow and SSO token.
3. Application Identity in Node.js environment: `AppCredential` represents the application identity.

For more information about TeamsFx SDK, see:

* [TeamsFx SDK](TeamsFx-SDK.md) or [API reference](/javascript/api/@microsoft/teamsfx/?view=msteams-client-js-latest&preserve-view=true)
* [Microsoft Teams Framework (TeamsFx) Sample Gallery](https://github.com/OfficeDev/TeamsFx-Samples/tree/v2)

## See also

* [Prepare accounts to build Teams apps](accounts.md)