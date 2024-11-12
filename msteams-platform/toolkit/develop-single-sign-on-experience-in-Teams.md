---
title: Develop single sign-on experience in Teams
author: surbhigupta
description: Learn to how to develop single sign-on experience in Teams.
ms.topic: overview
ms.localizationpriority: medium
---

# Enable single sign-on for tab app

Microsoft Teams allows an app to acquire the token of the signed-in Teams user. This token can be used to access Microsoft Graph and other APIs. The Teams Toolkit simplifies this process by encapsulating some of the Microsoft Entra flows and integrations within straightforward, high-level APIs. As a result, you can effortlessly incorporate single sign-on (SSO) capabilities into your Teams application.

## Key Configurations

To enable SSO, configure as follows:

* Microsoft Entra app manifest: Ensure to define URIs, including the URI that identifies the Microsoft Entra authentication app and the redirect URI that returns the token.

* Teams app manifest: Connect your single sign-on (SSO) app to your Teams app by incorporating the correct configuration.

* Teams Toolkit configuration and infra files: Ensure the necessary configurations are in place to enable SSO for your Teams app.

* Add SSO app information in Teams Toolkit configuration files: Ensure the authentication app registers on the backend service and the Teams Toolkit initiates it during the debugging or previewing of the Teams app.

# [Tab app](#tab/tab-app)

## Create Microsoft Entra app manifest

Download the Microsoft Entra app manifest [template](https://github.com/OfficeDev/teams-toolkit/blob/dev/packages/fx-core/templates/plugins/resource/aad/manifest/tab/aad.manifest.template.json) to `./aad.manifest.json` file. This allows you to customize different aspects of your app registration and update the manifest as required. For more information, see [manifest](/entra/identity-platform/reference-app-manifest).

## Update Teams app manifest

In the `./appPackages/manifest.json` file, add the `webApplicationInfo` section to provide your Microsoft Entra app ID and Microsoft Graph information.

```json
"webApplicationInfo": {
  "id": "${{AAD_APP_CLIENT_ID}}",
  "resource": "api://${{TAB_DOMAIN}}/${{AAD_APP_CLIENT_ID}}"
}
```

> [!NOTE]
> You can use `{{ENV_NAME}}` to reference variables in `env/.env.{TEAMSFX_ENV}` file.

## Teams Toolkit configuration files

Locate your Teams Toolkit configuration files, such as `./teamsapp.yml` and `./teamsapp.local.yml` Update necessary configurations related to Microsoft Entra into these files.

* Add the following code `aadApp/create` under `provision` in `./teamsapp.yml` and `./teamsapp.local.yml` to create new Microsoft Entra apps used for SSO. For more information, see [`aadApp/create`.](https://github.com/OfficeDev/teams-toolkit/wiki/Available-actions-in-Teams-Toolkit#aadappcreate):
  
    ```yaml
    - uses: aadApp/create
      with:
        name: "YOUR_AAD_APP_NAME"
        generateClientSecret: true
        signInAudience: "AzureADMyOrg"
      writeToEnvironmentFile:
          clientId: AAD_APP_CLIENT_ID
          clientSecret: SECRET_AAD_APP_CLIENT_SECRET
          objectId: AAD_APP_OBJECT_ID
          tenantId: AAD_APP_TENANT_ID
          authority: AAD_APP_OAUTH_AUTHORITY
    ```

    > [!NOTE]
    > Replace the `name` value with the desired name for your Microsoft Teams app.

* Add the following code `aadApp/update` under `provision` in `./teamsapp.yml` and `./teamsapp.local.yml` to update your Microsoft Entra app. For more information, see [`aadApp/update`](https://github.com/OfficeDev/teams-toolkit/wiki/Available-actions-in-Teams-Toolkit#aadappupdate):

    ```yaml
    - uses: aadApp/update
      with:
        manifestPath: "./aad.manifest.json"
        outputFilePath: "./build/aad.manifest.${{TEAMSFX_ENV}}.json"
    ```

    > [!NOTE]
    > * Update the `manifestPath` value to the relative path of the Microsoft Entra app manifest template `aad.manifest.json`, if you've changed the file's path.
    > * In a local setup, position the `aad/update` after the `file/createOrUpdateEnvironmentFile` action. This is because `aad/update` utilizes the output from `file/createOrUpdateEnvironmentFile`.

* For React project, update `cli/runNpmCommand` under `deploy`:

* If you're building a tab app using the React framework, find the `cli/runNpmCommand` action with `build app` in the `teamsapp.yml` file. Then, add the following environment variable:

    ```yml
    env:
      REACT_APP_CLIENT_ID: ${{AAD_APP_CLIENT_ID}}
      REACT_APP_START_LOGIN_PAGE_URL: ${{TAB_ENDPOINT}}/auth-start.html
    ```

* If you're building a tab app with React framework, find the `file/createOrUpdateEnvironmentFile` action for deploy in `teamsapp.local.yml` and add the following env:

    ```yml
    envs:
      ...
      REACT_APP_CLIENT_ID: ${{AAD_APP_CLIENT_ID}}
      REACT_APP_START_LOGIN_PAGE_URL: ${{TAB_ENDPOINT}}/auth-start.html
    ```

## Update source code

After implementing the above changes, your environment is prepared. You can now update your code to incorporate SSO into your Teams app.

#### Vanilla JavaScript

Use the following code to retrieve the SSO token and user information:

```javascript
function getSSOToken() {
  return new Promise((resolve, reject) => {
    microsoftTeams.authentication.getAuthToken()
      .then((token) => resolve(token))
      .catch((error) => reject("Error getting token: " + error));
  });
}

function getBasicUserInfo() {
  getSSOToken().then((ssoToken) => {
    const tokenObj = JSON.parse(window.atob(ssoToken.split(".")[1]));
    console.log(`username: ${tokenObj.name}`);
    console.log(`user email: ${tokenObj.preferred_username}`);
  });
}
```

#### React

For React projects, ensure the following environment variables are set in your deployment process:

* For JavaScript project, see [tab JavaScript sample.](https://github.com/OfficeDev/teams-toolkit/blob/dev/packages/fx-core/templates/plugins/resource/aad/auth/tab/ts/sso/InitTeamsFx.tsx#L12)

* For TypeScript project, see [tab TypeScript sample.](https://github.com/OfficeDev/teams-toolkit/tree/main/packages/fx-core/templates/plugins/resource/aad/auth/tab/ts)

To update your source code, follow these steps:

1. Move the `auth-start.html` and `auth-end.html` files from the `auth/public` folder to the `public/` folder. These HTML files serve the purpose of handling authentication redirects.

1. Move `sso` folder under `auth/` to `src/sso/`:

    1. `InitTeamsFx`: This file executes a function that initializes the TeamsFx SDK. After the SDK initialization, it opens the `GetUserProfile` component.
    1. `GetUserProfile`: This file executes a function, retrieving user information by invoking the Microsoft Graph API.

1. Import and add `InitTeamsFx` in `Welcome.*`.

For more information, see [sample.](https://github.com/OfficeDev/teams-toolkit-samples/tree/dev/hello-world-tab-with-backend)

# [Bot/Message extension app](#tab/message-extension-app)

## Create Microsoft Entra app manifest for bot/message extension app

Download the Microsoft Entra app manifest [template](https://github.com/OfficeDev/teams-toolkit/blob/dev/packages/fx-core/templates/plugins/resource/aad/manifest/bot/aad.manifest.template.json) to `./aad.manifest.json` file. This allows you to customize different aspects of your app registration and update the manifest as required. For more information, see [manifest](/entra/identity-platform/reference-app-manifest).

## Update Teams app manifest for bot/message extension app

* In the `./appPackages/manifest.json` file, add the `webApplicationInfo` section to provide your Microsoft Entra app ID and Microsoft Graph information.

    ```json
    "webApplicationInfo": {
      "id": "${{AAD_APP_CLIENT_ID}}",
      "resource": "api://${{TAB_DOMAIN}}/${{AAD_APP_CLIENT_ID}}"
    }
    ```

    > [!NOTE]
    > You can use `{{ENV_NAME}}` to reference variables in `env/.env.{TEAMSFX_ENV}` file.

* Register command in `commandLists`.

    The `commandLists` includes commands that your bot can suggest to users. If you're using the `teamsFx` bot template, set the following values:

    ```bash
    {
      "title": "profile",
      "description": "Show user profile using Single Sign On feature"
    }
    ```

* The `validDomains` field includes the legitimate domains for websites that the app anticipates loading within the Teams client. If you're using the `teamsFx` bot template, you can set the following values:

    ```bash
    "validDomains": [
    "${{BOT_DOMAIN}}"
    ]
    ```

## Teams Toolkit configuration files for bot/message extension app

Locate your Teams Toolkit configuration files, such as `./teamsapp.yml` and `./teamsapp.local.yml` Update necessary configurations related to Microsoft Entra into these files.

* Add the following code `aadApp/create` under `provision` in `./teamsapp.yml` and `./teamsapp.local.yml` to create new Microsoft Entra apps used for SSO. For more information, see [`aadApp/create`.](https://github.com/OfficeDev/teams-toolkit/wiki/Available-actions-in-Teams-Toolkit#aadappcreate):
  
    ```yaml
    - uses: aadApp/create
      with:
        name: "YOUR_AAD_APP_NAME"
        generateClientSecret: true
        signInAudience: "AzureADMyOrg"
      writeToEnvironmentFile:
          clientId: AAD_APP_CLIENT_ID
          clientSecret: SECRET_AAD_APP_CLIENT_SECRET
          objectId: AAD_APP_OBJECT_ID
          tenantId: AAD_APP_TENANT_ID
          authority: AAD_APP_OAUTH_AUTHORITY
          authorityHost: AAD_APP_OAUTH_AUTHORITY_HOST
    ```

    > [!NOTE]
    > Replace the `name` value with the desired name for your Microsoft Teams app.

* Add the following code `aadApp/update` under `provision` in `./teamsapp.yml` and `./teamsapp.local.yml` to update your Microsoft Entra app. For more information, see [`aadApp/update`](https://github.com/OfficeDev/teams-toolkit/wiki/Available-actions-in-Teams-Toolkit#aadappupdate):

    ```yaml
    - uses: aadApp/update
      with:
        manifestPath: "./aad.manifest.json"
        outputFilePath: "./build/aad.manifest.${{TEAMSFX_ENV}}.json"
    ```

    > [!NOTE]
    > Update the `manifestPath` value to the relative path of the Microsoft Entra app manifest template `aad.manifest.json`, if you've changed the file's path.

* `file/createOrUpdateEnvironmentFile`: Locate the `createOrUpdateEnvironmentFile` action in `teamsapp.local.yml` file and add the following environment variables:

    ```yml
    envs:
      ...
      M365_CLIENT_ID: ${{AAD_APP_CLIENT_ID}}
      M365_CLIENT_SECRET: ${{SECRET_AAD_APP_CLIENT_SECRET}}
      M365_TENANT_ID: ${{AAD_APP_TENANT_ID}}
      INITIATE_LOGIN_ENDPOINT: ${{BOT_ENDPOINT}}/auth-start.html
      M365_AUTHORITY_HOST: ${{AAD_APP_OAUTH_AUTHORITY_HOST}}
      M365_APPLICATION_ID_URI: api://botid-${{BOT_ID}}
    ```

## Update Infra

To set up Microsoft Teams related configurations, update in your remote service. The following example shows the config settings on an Azure Webapp.

* M365_CLIENT_ID: Microsoft Entra app client ID.
* M365_CLIENT_SECRET: Microsoft Entra app client secret.
* M365_TENANT_ID: Tenant ID of Microsoft Entra app.
* INITIATE_LOGIN_ENDPOINT: Login start page for authentication.
* M365_AUTHORITY_HOST: Microsoft Entra app oauth authority host.
* M365_APPLICATION_ID_URI: IdentifierUri for Microsoft Entra app.

To use the `teamsFx` tab or bot template, follow these steps:

1. Open `infra/azure.parameters.json` file and add the following:

    ```bash
    "m365ClientId": {
      "value": "${{AAD_APP_CLIENT_ID}}"
    },
    "m365ClientSecret": {
      "value": "${{SECRET_AAD_APP_CLIENT_SECRET}}"
    },
    "m365TenantId": {
      "value": "${{AAD_APP_TENANT_ID}}"
    },
    "m365OauthAuthorityHost": {
      "value": "${{AAD_APP_OAUTH_AUTHORITY_HOST}}"
    }
    ```

1. Open `infra/azure.bicep` file, add the following code after `param location string = resourceGroup().location`:

    ```bash
    param m365ClientId string
    param m365TenantId string
    param m365OauthAuthorityHost string
    param m365ApplicationIdUri string = 'api://botid-${botAadAppClientId}'
    @secure()
    param m365ClientSecret string
    ```

1. Add following code before output:

    ```bash
    resource webAppSettings 'Microsoft.Web/sites/config@2021-02-01' = {
      name: '${webAppName}/appsettings'
      properties: {
        M365_CLIENT_ID: m365ClientId
        M365_CLIENT_SECRET: m365ClientSecret
        INITIATE_LOGIN_ENDPOINT: uri('https://${webApp.properties.defaultHostName}', 'auth-start.html')
        M365_AUTHORITY_HOST: m365OauthAuthorityHost
        M365_TENANT_ID: m365TenantId
        M365_APPLICATION_ID_URI: m365ApplicationIdUri
        BOT_ID: botAadAppClientId
        BOT_PASSWORD: botAadAppClientSecret
        RUNNING_ON_AZURE: '1'
      }
    }
    ```

    > [!NOTE]
    >
    > * To add additional configurations into your Azure Webapp, add the configurations in the `webAppSettings`.
    > * You might also need to define the default node version by adding the following configuration:
        ```bash
        WEBSITE_NODE_DEFAULT_VERSION: '14.20.0'
        ```

   ## Update Source Code for bot/message extension app

   # [Bot](#tab/bot)

   1. Move the files located in the `auth/sso` folder to `src`. The `ProfileSsoCommandHandler` class serves as an SSO command handler, designed to retrieve user information using an SSO token. You can adopt this method to develop your own SSO command handler.

   1. Move the `auth/public` folder to `src/public`. This folder contains HTML pages for the bot app. When initiating SSO flows with Microsoft Entra, the user is redirected to these pages by Microsoft Entra.

   1. Run the following command in `./` folder:

      ```bash
      npm install copyfiles --save-dev
      ```

   1. Replace the following command in `package.json` file:

      ```bash
      "build": "tsc --build && shx cp -r ./src/adaptiveCards ./lib/src",
      ```

      With

      ```bash
      "build": "tsc --build && shx cp -r ./src/adaptiveCards ./lib/src && copyfiles src/public/*.html lib/",
      ```

      The HTML pages used for auth redirect will be copied when building this bot project.

   1. In `src/index` file, add the following command to import `isomorphic-fetch`:

      ```bash
      require("isomorphic-fetch");
      ```

      1. Add the following command to redirect to auth pages:

      ```bash
      server.get(
         "/auth-:name(start|end).html",
         restify.plugins.serveStatic({
            directory: path.join(__dirname, "public"),
         })
      );
      ```

      1. update `commandApp.requestHandler` to make auth works with the following code:

      ```bash
      await commandApp.requestHandler(req, res).catch((err) => {
         // Error message including "412" means it is waiting for user's consent, which is a normal process of SSO, sholdn't throw this error.
         if (!err.message.includes("412")) {
         throw err;
         }
      });
      ```

   1. Add `ssoConfig` and `ssoCommands` in conversation bot in `src/internal/initialize`:

      ```bash
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

   # [Messaging extension](#tab/messaging-extension)

   1. Implement the API key `handleMessageExtensionQueryWithSSO` in `TeamsActivityHandler.handleTeamsMessagingExtensionQuery`. For more information, see [SSO for message extensions.](https://github.com/OfficeDev/teams-toolkit/wiki/SSO-for-Message-Extension)

   1. Move the `auth/public` folder to `src/public`. This folder contains HTML pages for the bot app. When initiating SSO flows with Microsoft Entra, the user is redirected to these pages by Microsoft Entra.

   1. Update your `src/index` file to add the appropriate `restify`:

      ```bash
      const path = require("path");
      
      // Listen for incoming requests.
      server.post("/api/messages", async (req, res) => {
         await adapter.process(req, res, async (context) => {
         await bot.run(context);
         }).catch((err) => {
         // Error message including "412" means it is waiting for user's consent, which is a normal process of SSO, sholdn't throw this error.
         if(!err.message.includes("412")) {
               throw err;
            }
         })
      });
      
      server.get(
         "/auth-:name(start|end).html",
         restify.plugins.serveStatic({
         directory: path.join(__dirname, "public"),
         })
      );
      ```

   1. Run the following command under `./` folder:

      ```bash
      npm install @microsoft/teamsfx
      ```

   1. Run the following command under `./` folder:

      ```bash
      npm install isomorphic-fetch
      ```

   1. Implement the API key `handleMessageExtensionQueryWithSSO` in `TeamsActivityHandler.handleTeamsMessagingExtensionQuery`.

   1. Install `copyfiles` npm packages in your TypeScript bot project, add, or update the `build` script in `src/package.json` file as follows:

      ```bash
      "build": "tsc --build && copyfiles ./public/*.html lib/",
      ```

      The HTML pages used for auth redirect will be copied when building this bot project.

   1. Update `templates/appPackage/aad.template.json` file with the scopes you use in the `handleMessageExtensionQueryWithSSO` function:

      ```bash
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
    ---

---

## Debug Your Application

You can debug your app by pressing F5. Teams Toolkit will use the Microsoft Entra manifest to register an SSO-enabled application. For more information, see [debug your Teams app locally.]

## Customize Microsoft Entra apps

The Microsoft Teams [manifest](/entra/identity-platform/reference-app-manifest) enables you to customize different aspects of your app registration. You have the ability to update the manifest as required.

To include additional API permissions to access your desired APIs, see [edit Microsoft Entra manifest](AAD-manifest-customization.md).

To view your Microsoft Entra app in Azure portal, see [edit Microsoft Entra manifest](AAD-manifest-customization.md).

## Next step

> [!div class="nextstepaction"]
> [Add single sign-on to Teams app](add-single-sign-on.md)

