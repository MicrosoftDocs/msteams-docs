---
title: Add single sign-on to your Teams apps
author: zyxiaoyuer
description: In this module, learn how to add single sign-on (SSO) of Teams Toolkit, enable SSO support, update your application to use SSO
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/20/2022
zone_pivot_groups: teams-app-platform
---

# Add single sign-on to Teams app

Microsoft Teams provides single sign-on function for application to obtain signed-in Teams user token to access Microsoft Graph and other APIs. Teams Toolkit facilitates the interaction by abstracting some of the Azure AD flows and integrations behind some simple APIs. This enables you to add single sign-on (SSO) features easily to your Teams application

::: zone pivot="visual-studio-code"

## Add single sign-on to Teams app for Visual Studio Code

For applications that interact with the user in a chat, a Team, or a channel, SSO manifests as an Adaptive Card, which the user can interact with to invoke the Azure AD consent flow.

## Enable SSO support

Teams Toolkit helps you to add SSO to the following Teams capabilities:

* Tab
* Bot
* Notification bot: restify server
* Command bot
* Message extension

### Add SSO using Visual Studio Code

To add SSO using Teams Toolkit in Visual Studio Code, follow these steps:

1. Open **Microsoft Visual Studio Code**.
2. Select Teams Toolkit :::image type="content" source="~/assets/images/teams-toolkit-v2/teams-toolkit-sidebar-icon.png" alt-text="Screenshot is an example of the Teams Toolkit option in Visual Studio Code."::: from left navigation bar.
3. Select **Add features** under **DEVELOPMENT**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/add-sso/sso-add features.png" alt-text="Screenshot shows the Add features option under the Development option in the Visual Studio Code.":::

   * You can also open command palette and select **Teams: Add features**.

4. Select **Single Sign-On**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/add-sso/sso-select features.png" alt-text="Screenshot shows the Single Sign-on feature highlighted in red in the Visual Studio Code.":::

### Add SSO using TeamsFx CLI

You can run `teamsfx add sso` command in your **project root directory**.

> [!NOTE]
> The feature enables SSO for all existing applicable capabilities. Follow the same steps to enable SSO if you add capability later to the project.

## Customize your project using Teams Toolkit

The following table lists the changes Teams Toolkit makes to your project:

| **Type** | **File**                                             | **Purpose**                                                                                                                                                                               |
| -------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Create   | `aad.template.json` under `template/appPackage`      | Azure AD application manifest represents your Azure AD app. `template/appPackage` helps to register an Azure AD app during local debug or provision stage.                                |
| Modify   | `manifest.template.json` under `template/appPackage` | A `webApplicationInfo` object is added into your Teams app manifest template. Teams requires this field to enable SSO. The change is in effect when you trigger local debug or provision. |
| Create   | `auth/tab`                                           | Reference code, auth redirect pages, and `README.md` files are generated in this path for a tab project.                                                                                  |
| Create   | `auth/bot`                                           | Reference code, auth redirect pages, and `README.md` files are generated in this path for a bot project.                                                                                  |

> [!NOTE]
> By adding SSO, Teams Toolkit doesn't change anything in the cloud until you trigger local debug. Update your code to ensure that SSO is working in the project.

## Update your application to use SSO

To enable SSO in your application, follow these steps:

> [!NOTE]
> These changes are based on the templates we scaffold.

---

<br>
<br><details>
<summary><b>Tab project
</b></summary>

1. Copy `auth-start.html` and `auth-end.htm`\*\* in `auth/public` folder to `tabs/public/`. Teams Toolkit registers these two endpoints in Azure AD for Azure AD's redirect flow.

2. Copy `sso` folder under `auth/tab` to `tabs/src/sso/`.

   * `InitTeamsFx`: The file implements a function that initializes TeamsFx SDK and opens `GetUserProfile` component after SDK is initialized.

   * `GetUserProfile`: The file implements a function that calls Microsoft Graph API to get user info.

3. Execute `npm install @microsoft/teamsfx-react` under `tabs/`.

4. Add the following lines to `tabs/src/components/sample/Welcome.tsx` to import `InitTeamsFx`:

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

1. Move the `auth/bot/public` folder to `bot/src`. This folder contains HTML pages that the bot application hosts. When single sign-on flow is initiated with Azure AD, it redirects the user to the HTML pages.
1. Modify your `bot/src/index` to add the appropriate `restify` routes to HTML pages.

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

SSO command handler `ProfileSsoCommandHandler` uses an Azure AD token to call Microsoft Graph. This token is obtained by using the logged-in Teams user token. The flow is brought together in a dialog that displays a consent dialog if necessary.

1. Move `profileSsoCommandHandler` file under `auth/bot/sso` folder to `bot/src`. `ProfileSsoCommandHandler` class is an SSO command handler to get user info with SSO token, follow this method and create your own SSO command handler.
1. Open `package.json` file and ensure that teamsfx SDK version >= 1.2.0.
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

1. To make SSO consent flow work, replace the following code in `bot/src/index` file:

   ```ts
   server.post("/api/messages", async (req, res) => {
     await commandBot.requestHandler(req, res);
   });
   ```

   with

   ```ts
   server.post("/api/messages", async (req, res) => {
     await commandBot.requestHandler(req, res).catch((err) => {
       // Error message including "412" means it is waiting for user's consent, which is a normal process of SSO, sholdn't throw this error.
       if (!err.message.includes("412")) {
         throw err;
       }
     });
   });
   ```

1. Replace the options for `ConversationBot` instance in `bot/src/internal/initialize` to add the SSO config and SSO command handler:

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

1. Register your command in the Teams app manifest. Open `templates/appPackage/manifest.template.json`, and add following lines under `commands` in `commandLists` of your bot:

   ```json
   {
     "title": "profile",
     "description": "Show user profile using Single Sign On feature"
   }
   ```

#### Add a new SSO command to the bot (Optional)

After successfully adding SSO in your project, you can add a new SSO command.

1. Create a new file such as `photoSsoCommandHandler.ts` or `photoSsoCommandHandler.js` in `bot/src/` and add your own SSO command handler to call Graph API:

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

1. Add `PhotoSsoCommandHandler` instance to `ssoCommands` array in `bot/src/internal/initialize.ts`:

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

1. Register your command in the Teams app manifest. Open `templates/appPackage/manifest.template.json`, and add following lines under `commands` in `commandLists` of your bot:

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

The sample business logic provides a handler `TeamsBot` extends TeamsActivityHandler and override `handleTeamsMessagingExtensionQuery`.

You can update the query logic in the `handleMessageExtensionQueryWithToken` with token, which is obtained by using the logged-in Teams user token.

To make this work in your application:

1. Move the `auth/bot/public` folder to `bot`. This folder contains HTML pages that the bot application hosts. When single sign-on flows are initiated with Azure AD, Azure AD will redirect the user to these pages.

1. Modify your `bot/index` to add the appropriate `restify` routes to these pages.

    ```ts
    const path = require("path");

    server.get(
        "/auth-*.html",
        restify.plugins.serveStatic({
            directory: path.join(__dirname, "public"),
        })
    );
    ```

1. Override `handleTeamsMessagingExtensionQuery` interface under `bot/teamsBot`. You can follow the sample code in the `handleMessageExtensionQueryWithToken` to do your own query logic.

1. Open `bot/package.json`, ensure that `@microsoft/teamsfx` version >= 1.2.0

1. Install `isomorphic-fetch` npm packages in your bot project.

1. (For ts only) Install `copyfiles` npm packages in your bot project, add or update the `build` script in `bot/package.json` as follows:

    ```json
    "build": "tsc --build && copyfiles ./public/*.html lib/",
    ```

    By doing this, the HTML pages used for auth redirect will be copied when building this bot project.

1. Update `templates/appPackage/aad.template.json` your scopes which used in `handleMessageExtensionQueryWithToken`.

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

<br>

## Debug your application

Press F5 to debug your application. Teams Toolkit uses the Azure AD manifest file to register an Azure AD application for SSO. For Teams Toolkit local debug functionalities, see [Debug your Teams app locally](debug-local.md).

## Customize Azure AD application registration

The [Azure AD app manifest](/azure/active-directory/develop/reference-app-manifest) allows you to customize various aspects of application registration. You can update the manifest as needed. If you need to include more API permissions to access your desired APIs, see [API permissions to access your desired APIs](https://github.com/OfficeDev/TeamsFx/wiki/#customize-aad-manifest-template).
To view your Azure AD application in Azure portal, see [View Azure AD application in Azure portal](https://github.com/OfficeDev/TeamsFx/wiki/Manage-AAD-application-in-Teams-Toolkit#How-to-view-the-AAD-app-on-the-Azure-portal).

## SSO authentication concepts

The following concepts help you with SSO authentication:

### Working of SSO in Teams

Single sign-on (SSO) authentication in Microsoft Azure Active Directory (Azure AD) silently refreshes the authentication token to minimize the number of times users need to enter their sign-in credentials. If users agree to use your app, they don't have to provide consent again on another device as they're signed in automatically.

Teams tabs and bots have similar flow for SSO support. For more information, see:

1. [Single sign-on (SSO) authentication in Tabs](../tabs/how-to/authentication/tab-sso-overview.md)
1. [Single sign-on (SSO) authentication in Bots](../bots/how-to/authentication/auth-aad-sso-bots.md)

### Simplified SSO with TeamsFx

TeamsFx helps to reduce the developer tasks by using SSO and accessing cloud resources down to single line statements with zero configuration.

With TeamsFx SDK, you can write user authentication code in a simplified way using Credentials:

1. User identity in browser environment: `TeamsUserCredential` represents Teams current user's identity.
1. User identity in Node.js environment: `OnBehalfOfUserCredential` uses On-Behalf-Of flow and SSO token.
1. Application Identity in Node.js environment: `AppCredential` represents the application identity.

For more information about TeamsFx SDK, see:

* [TeamsFx SDK](TeamsFx-SDK.md) or [API reference](/javascript/api/@microsoft/teamsfx/?view=msteams-client-js-latest&preserve-view=true)
* [Microsoft Teams Framework (TeamsFx) Sample Gallery](https://github.com/OfficeDev/TeamsFx-Samples/tree/v2)

::: zone-end

::: zone pivot="visual-studio"

## Add single sign-on to Teams app for Visual Studio

For applications that interact with the user in a chat, a Team, or a channel, SSO manifests as an Adaptive Card, which the user can interact with to invoke the Azure AD consent flow.

## Enable SSO support

Teams Toolkit helps you to add SSO to the following Teams capabilities:

* Tab
* Notification bot: restify server
* Command bot

### Add SSO using Visual Studio

You can follow these steps to add SSO using Teams Toolkit in Visual Studio:

1. Open **Microsoft Visual Studio** and select **Create a new project**.

:::image type="content" source="../assets/images/teams-toolkit-v2/add-sso-vs/vs-2022-preview-create-proj.png" alt-text="open visual studio code to create a new project":::

1. Select **Microsoft Teams app** project by searching for **Teams** in the search box and then select **Next**.

:::image type="content" source="../assets/images/teams-toolkit-v2/add-sso-vs/vs-2022-preview-select-teams.png" alt-text="Select a Microsoft teams project by searching for teams.":::

1. Select to create a new Teams application, uncheck the **Configure the single sign-on** check box and select **create**.

:::image type="content" source="../assets/images/teams-toolkit-v2/add-sso-vs/vs-2022-preview-create-teamsapp-sso-uncheck.png" alt-text="select the teams app to be created and unchec sso check box":::

1. Enter your project and Solution name and select **Create**.

:::image type="content" source="../assets/images/teams-toolkit-v2/add-sso-vs/vs-2022-preview-create-teamsapp.png" alt-text="enter project and solution name":::

1. After the project is created with the new Teams application, select **Project** > **Teams Toolkit** > **Add Authentication Code**.

:::image type="content" source="../assets/images/teams-toolkit-v2/add-sso-vs/vs-2022-preview-add-auth-code.png" alt-text="Add authentication code":::

## Customize your project using Teams Toolkit

The following table lists the changes Teams Toolkit makes in your project:

   |**Type**|**File**|**Purpose**|
   |--------|--------|-----------|
   |Create|`aad.template.json` under `template/appPackage`|Azure AD application manifest represents your Azure AD app. `template/appPackage` helps to register an Azure AD app during local debug or provision stage.|
   |Modify|`manifest.template.json` under `template/appPackage`|A `webApplicationInfo` object is added into your Teams app manifest template. Teams requires this field to enable SSO. The change is in effect when you trigger local debug or provision.|
   |Modify|`appsettings.json` and `appsettings.Development.json`|Configs that will be used by TeamsFx SDK will be added into your app settings. Please update add the 'TeamsFx' object if you have other appsettings files.|
   |Create|`Auth/tab`|Reference code, auth redirect pages and a `README.md` file is generated in this path for a tab project.|
   |Create|`Auth/bot`|Reference code, auth redirect pages and a `README.md` file is generated in this path for a bot project.|

> [!NOTE]
> By adding SSO, Teams Toolkit doesn't change anything in the cloud until you trigger local debug. You can update your code to ensure that SSO is working in the project.

## Update your application to use SSO

The following steps help you to enable SSO in your application.

> [!NOTE]
> These changes are based on the templates we scaffold.

---
<br>
<br><details>
<summary><b>Tab project
</b></summary>

1. Move `GetUserProfile.razor` file from `Auth/tab` folder to `Components/` folder. `GetUserProfile` file implements a function that uses TeamsFx SDK to call Microsoft Graph API to get user info.

1. Replace the `AddSSO` component with `GetUserProfile` component. To do this, just replace the following line: `<AddSSO />` with `<GetUserProfile />` in `Components/Welcome.razor` file.

</details>
<details>
<summary><b>Bot project
</b></summary>

1. You can upgrade your SDK and ensure your SDK version:
   * TeamsFx: >= 1.1.0
   * Microsoft.Bot.Builder >= 4.17.1

2. Create `Pages` folder and move files in `Auth/bot/Pages` folder.
    `Auth/bot/Pages` folder contains HTML pages that are hosted by bot application. When single sign-on flows are initiated with Azure AD, that will redirect the user to these pages.

3. Create `SSO` folder and move files in `Auth/bot/SSO` folder to `SSO`. This folder contains two files as reference for SSO implementation:

    * `SsoDialog.cs`: This file creates a `ComponentDialog` that used for SSO.

    * `TeamsSsoBot.cs`: This file creates a `TeamsActivityHandler` with `SsoDialog` that adds and triggers a command `showUserInfo`.

    * `SsoOperations.cs`: This file implements class with a function to get user info with SSO token. You can follow this method and create your own method that requires SSO token.

    > [!NOTE]
    > Ensure to replace `{Your_NameSpace}` with your project namespace.

4. Update `Program.cs`

    1. Find code:

    ```csharp
    builder.Services.AddSingleton<BotFrameworkAuthentication, ConfigurationBotFrameworkAuthentication>();
    ```

    and add the following code below:

    ```csharp
     builder.Services.AddRazorPages();
        // Create the Bot Framework Adapter with error handling enabled.                                        
        builder.Services.AddSingleton<IBotFrameworkHttpAdapter, AdapterWithErrorHandler>();
        builder.Services.AddSingleton<IStorage, MemoryStorage>();
        // Create the Conversation state. (Used by the Dialog system itself.)
        builder.Services.AddSingleton<ConversationState>();
        // The Dialog that will be run by the bot.
        builder.Services.AddSingleton<SsoDialog>();
        // Create the bot as a transient. In this case the ASP Controller is expecting an IBot.
        builder.Services.AddTransient<IBot, TeamsSsoBot<SsoDialog>>();
        builder.Services.AddOptions<AuthenticationOptions>().Bind(builder.Configuration.GetSection("TeamsFx").GetSection(AuthenticationOptions.Authentication)).ValidateDataAnnotations();
        builder.Services.AddOptions<BotAuthenticationOptions>().Configure<IOptions<AuthenticationOptions>>((botAuthOption, authOptions) => {
            AuthenticationOptions authOptionsValue = authOptions.Value;
            botAuthOption.ClientId = authOptionsValue.ClientId;
            botAuthOption.ClientSecret = authOptionsValue.ClientSecret;
            botAuthOption.OAuthAuthority = authOptionsValue.OAuthAuthority;
            botAuthOption.ApplicationIdUri = authOptionsValue.ApplicationIdUri;
            botAuthOption.InitiateLoginEndpoint = authOptionsValue.Bot.InitiateLoginEndpoint;
        }).ValidateDataAnnotations();
    ```

    2. Find and delete the following code:

        ```csharp
        // Create the bot as a transient. In this case the ASP Controller is expecting an IBot.
        builder.Services.AddTransient<IBot, TeamsBot>();
        ```

    3. Find the following code:

        ```csharp
        app.UseEndpoints(endpoints =>
        {
          endpoints.MapControllers();
        });
        ```

        and replace with:

        ```csharp
        app.UseEndpoints(endpoints =>
        {
          endpoints.MapControllers();
          endpoints.MapRazorPages();
        });
        ```

5. Register your command in the Teams app manifest. Open `Templates/appPackage/manifest.template.json`, and add following lines under `command` in `commandLists` of your bot:

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
> Currently, these instructions applies to `command bot`.
The following steps help you to add a new command, after you add SSO in your project:

1. Create a new method in class SsoOperations in `SSO/SsoOperations` and add your own business logic to call Graph API:

    ```csharp
    public static async Task GetUserImageInfo(ITurnContext stepContext, string token, BotAuthenticationOptions botAuthOptions)
    {
        await stepContext.SendActivityAsync("Retrieving user information from Microsoft Graph ...");
        var authProvider = new DelegateAuthenticationProvider((request) =>
        {
            request.Headers.Authorization =
                new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
            return Task.CompletedTask;
        });
        var graphClient = new GraphServiceClient(authProvider);
        // You can add following code to get your photo size:
        // var photo = await graphClient.Me.Photo.Request().GetAsync();
        // await stepContext.SendActivityAsync($"Size of your photo is: {photo.Width} * {photo.Height}");
    }
    ```

2. Register a new command

   Find the following line:

    ```csharp
    ((SsoDialog)_dialog).addCommand("showUserInfo", "show", SsoOperations.ShowUserInfo);
    ```

    and add following lines after the above line to register a new command 'photo' and hook up with method 'GetUserImageInfo' added above:

    ```csharp
    ((SsoDialog)_dialog).addCommand("getUserImageInfo", "photo", SsoOperations.GetUserImageInfo);
    ```

3. Register your command in the Teams app manifest. Open `templates/appPackage/manifest.template.json`, and add following lines under `command` in `commandLists` of your bot:

   ```JSON
   {
       "title": "photo",
       "description": "Show user photo size using Single Sign On feature"
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

The following concepts help you to authenticate SSO in Teams. SSO authentication with Azure AD silently refreshes the authentication token to minimize the number of times users need to enter their sign-in credentials. If users agree to use your app, they don't have to provide consent again on in another device as they're signed in automatically.

Teams tabs and bots have similar flow for SSO support, for more information, see:

1. [Single sign-on (SSO) authentication in Tabs](../tabs/how-to/authentication/tab-sso-overview.md)
2. [Single sign-on (SSO) authentication in Bots](../bots/how-to/authentication/auth-aad-sso-bots.md)

### Simplified SSO with TeamsFx

TeamsFx helps to reduce your tasks by using SSO and accessing cloud resources down to single line statements with zero configuration. With TeamsFx SDK, you can write user authentication code in a simplified way using credentials such as for browser environment the user identity is `TeamsUserCredential`.

For more information about TeamsFx SDK, see:

* [TeamsFx SDK](TeamsFx-SDK.md) or [API reference](/javascript/api/@microsoft/teamsfx/?view=msteams-client-js-latest&preserve-view=true)
* [Microsoft Teams Framework (TeamsFx) Sample Gallery](https://github.com/OfficeDev/TeamsFx-Samples/tree/v2)

## How to use an existing Azure AD app

Follow the [instruction](https://github.com/OfficeDev/TeamsFx/wiki/Using-existing-Azure-AD-app-in-TeamsFx-project) to use an existing Azure AD app in your TeamsFx project.

::: zone-end

## See also

* [Prerequisites for creating your Teams app](tools-prerequisites.md)
* [Prepare Accounts to build your Teams app](tools-prerequisites.md#accounts-to-build-your-teams-app)
