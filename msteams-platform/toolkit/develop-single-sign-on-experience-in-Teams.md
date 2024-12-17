---
title: Develop Single Sign-on Experience
author: surbhigupta
description: Learn how to develop single sign-on experience in Teams app using Teams Toolkit.
ms.topic: reference
ms.date: 12/17/2024
ms.localizationpriority: medium
---

# Enable single sign-on for Teams app

Microsoft Teams provides single sign-on (SSO) function for an app to obtain signed in Teams user token to access Microsoft Graph and other APIs. Microsoft Teams Toolkit streamlines the process by incorporating certain Microsoft Entra workflows and integrations into straightforward, high-level APIs. As a result, you can effortlessly incorporate SSO capabilities into your Teams app. For more information, see [authenticate users in Microsoft Teams.](../concepts/authentication/authentication.md)

## Key configurations

To enable SSO, configure your Teams app as follows:

* **Microsoft Entra app manifest**: Ensure to define URIs, including the URI that identifies the Microsoft Entra authentication app and the redirect URI that returns the token.

* **Teams app manifest**: Connect your SSO app to your Teams app by incorporating the correct configuration.

* **Teams Toolkit configuration and infra files**: Ensure the necessary configurations are in place to enable SSO for your Teams app.

* **SSO app information in Teams Toolkit configuration files**: Ensure the authentication app registers on the backend service and Teams Toolkit initiates it during the debugging or previewing of the Teams app.

# [Tab app](#tab/tab-app)

## Create Microsoft Entra app manifest

1. Download the Microsoft Entra app manifest [template](https://github.com/OfficeDev/teams-toolkit/blob/dev/packages/fx-core/templates/plugins/resource/aad/manifest/tab/aad.manifest.template.json).

1. Add the downloaded app manifest template code to `./aad.manifest.json` file. This allows you to customize different aspects of your app registration and update the manifest as required. For more information, see [app manifest](/entra/identity-platform/reference-app-manifest).

## Update Teams app manifest

In the `./appPackages/manifest.json` file, add the following code:

```json
"webApplicationInfo": {
  "id": "${{AAD_APP_CLIENT_ID}}",
  "resource": "api://${{TAB_DOMAIN}}/${{AAD_APP_CLIENT_ID}}"
}
```

`webApplicationInfo` provides your Microsoft Entra App ID and Microsoft Graph information to assist users sign in to your app.

> [!NOTE]
> You can use `{{ENV_NAME}}` to reference variables in `env/.env.{TEAMSFX_ENV}` file.

## Update Teams Toolkit configuration files

1. Locate your Teams Toolkit configuration files, such as `./teamsapp.yml` and `./teamsapp.local.yml`. Update the required configurations related to Microsoft Entra in these files.

1. Add the `aadApp/create` action under `provision` in `./teamsapp.yml` and `./teamsapp.local.yml` to create new Microsoft Entra app used for SSO:
  
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
    > Replace the `name` value with the desired name for your Teams app.

    For more information, see [`aadApp/create`.](https://github.com/OfficeDev/teams-toolkit/wiki/Available-actions-in-Teams-Toolkit#aadappcreate)

1. Add the `aadApp/update` action under `provision` in `./teamsapp.yml` and `./teamsapp.local.yml` to update your Microsoft Entra app:

    ```yaml
    - uses: aadApp/update
      with:
        manifestPath: "./aad.manifest.json"
        outputFilePath: "./build/aad.manifest.${{TEAMSFX_ENV}}.json"
    ```

    > [!NOTE]
    > * Update the `manifestPath` value to the relative path of the Microsoft Entra app manifest template `aad.manifest.json`, if you've changed the file's path.
    > * In a local setup, position the `aad/update` after the `file/createOrUpdateEnvironmentFile` action. This is required because `aad/update` uses the output from `file/createOrUpdateEnvironmentFile`.

    For more information, see [`aadApp/update`](https://github.com/OfficeDev/teams-toolkit/wiki/Available-actions-in-Teams-Toolkit#aadappupdate)

1. For a React project, update `cli/runNpmCommand` under `deploy`.

1. If you're building a tab app using the React framework in CLI, find the `cli/runNpmCommand` action with `build app` in the `teamsapp.yml` file and add the following environment variables:

    ```yaml
    env:
      REACT_APP_CLIENT_ID: ${{AAD_APP_CLIENT_ID}}
      REACT_APP_START_LOGIN_PAGE_URL: ${{TAB_ENDPOINT}}/auth-start.html
    ```

1. If you're building a tab app with React framework, find the `file/createOrUpdateEnvironmentFile` action for deployment in `teamsapp.local.yml` file and add the following environment variables:

    ```yaml
    envs:
      ...
      REACT_APP_CLIENT_ID: ${{AAD_APP_CLIENT_ID}}
      REACT_APP_START_LOGIN_PAGE_URL: ${{TAB_ENDPOINT}}/auth-start.html
    ```

## Update source code

With the above changes implemented, your environment is prepared. You can now update your code to incorporate SSO into your Teams app.

### Vanilla JavaScript

For a tab app that doesn't uses React, use the following code as a basic example to obtain the SSO token:

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

### React

For React projects, ensure the following environment variables are set in your deployment process:

* For a JavaScript project, see [tab JavaScript sample.](https://github.com/OfficeDev/teams-toolkit/tree/main/packages/fx-core/templates/plugins/resource/aad/auth/tab/js)

* For a TypeScript project, see [tab TypeScript sample.](https://github.com/OfficeDev/teams-toolkit/tree/main/packages/fx-core/templates/plugins/resource/aad/auth/tab/ts)

To update your source code, follow these steps:

1. Move the `auth-start.html` and `auth-end.html` files from the `auth/public` folder to the `public/` folder. These HTML files serve the purpose of handling authentication redirects.

1. Move `sso` folder under `auth/` to `src/sso/`.

    1. `InitTeamsFx`: This file executes a function that initializes the TeamsFx SDK. After the SDK initialization, it opens the `GetUserProfile` component.
    1. `GetUserProfile`: This file executes a function to retrieve user information by invoking the Microsoft Graph API.

1. Import and add `InitTeamsFx` in `Welcome.*`.

For more information, see [SSO enabled tab app.](https://github.com/OfficeDev/teams-toolkit-samples/tree/dev/hello-world-tab-with-backend)

# [Bot/message extension app](#tab/message-extension-app)

## Create Microsoft Entra app manifest

1. Download the Microsoft Entra app manifest [template](https://github.com/OfficeDev/teams-toolkit/blob/dev/packages/fx-core/templates/plugins/resource/aad/manifest/bot/aad.manifest.template.json).

1. Add the downloaded app manifest template code to `./aad.manifest.json` file. This allows you to customize different aspects of your app registration and update the manifest as required. For more information, see [app manifest](/entra/identity-platform/reference-app-manifest).

## Update Teams app manifest

1. In the `./appPackages/manifest.json` file, add the following code:

    ```json
    "webApplicationInfo": {
      "id": "${{AAD_APP_CLIENT_ID}}",
      "resource": "api://${{TAB_DOMAIN}}/${{AAD_APP_CLIENT_ID}}"
    }
    ```

    `webApplicationInfo` provides your Microsoft Entra App ID and Microsoft Graph information to assist users sign in to your app.

    > [!NOTE]
    > You can use `{{ENV_NAME}}` to reference variables in `env/.env.{TEAMSFX_ENV}` file.

1. Register one or more commands in `commandLists`.

    The `commandLists` includes commands that your bot can suggest to users. If you're using the `teamsFx` bot template, set the following values:

    ```bash
    {
      "title": "profile",
      "description": "Show user profile using Single Sign On feature"
    }
    ```

1. The `validDomains` field includes the domains for websites that the app loads within the Teams client. Update the following value:

    ```bash
    "validDomains": [
    "${{BOT_DOMAIN}}"
    ]
    ```

## Update Teams Toolkit configuration files

1. Locate your Teams Toolkit configuration files, such as `./teamsapp.yml` and `./teamsapp.local.yml`. Update necessary configurations related to Microsoft Entra in these files.

1. Add the following code `aadApp/create` under `provision` in `./teamsapp.yml` and `./teamsapp.local.yml` to create new Microsoft Entra apps used for SSO:
  
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

    For more information, see [`aadApp/create`.](https://github.com/OfficeDev/teams-toolkit/wiki/Available-actions-in-Teams-Toolkit#aadappcreate)

1. Add the following code `aadApp/update` under `provision` in `./teamsapp.yml` and `./teamsapp.local.yml` to update your Microsoft Entra app:

    ```yaml
    - uses: aadApp/update
      with:
        manifestPath: "./aad.manifest.json"
        outputFilePath: "./build/aad.manifest.${{TEAMSFX_ENV}}.json"
    ```

    > [!NOTE]
    > Update the `manifestPath` value to the relative path of the Microsoft Entra app manifest template `aad.manifest.json`, if you've changed the file's path.

    For more information, see [`aadApp/update`](https://github.com/OfficeDev/teams-toolkit/wiki/Available-actions-in-Teams-Toolkit#aadappupdate)

1. Locate the `createOrUpdateEnvironmentFile` action in `teamsapp.local.yml` file and add the following environment variables:

    ```yaml
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

Update Microsoft Entra-related configurations in your remote service. The following example shows the configuration settings on an Azure Web App:

* `M365_CLIENT_ID`: Microsoft Entra app client ID
* `M365_CLIENT_SECRET`: Microsoft Entra app client secret
* `M365_TENANT_ID`: Tenant ID of Microsoft Entra app
* `INITIATE_LOGIN_ENDPOINT`: Login start page for authentication
* `M365_AUTHORITY_HOST`: Microsoft Entra app OAuth authority host
* `M365_APPLICATION_ID_URI`: Identifier URI for Microsoft Entra app

To use the `teamsFx` tab or bot template, follow these steps:

1. Open the `infra/azure.parameters.json` file and add the following code:

    ```json
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

1. Open `infra/azure.bicep` file and add the following code after `param location string = resourceGroup().location`:

    ```bicep
    param m365ClientId string
    param m365TenantId string
    param m365OauthAuthorityHost string
    param m365ApplicationIdUri string = 'api://botid-${botAadAppClientId}'
    @secure()
    param m365ClientSecret string
    ```

1. Add the following code before `output` in the `infra/azure.bicep` file:

    ```bicep
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
    > * To add additional configurations into your Azure Web App, add the configurations in the `webAppSettings`.
    > * You might also need to define the default node version by adding the following configuration:
        ```bash
        WEBSITE_NODE_DEFAULT_VERSION: '14.20.0'
        ```

   ## Update Source Code

   # [Bot](#tab/bot)

   1. Move the files located in the `auth/sso` folder to `src`. The `ProfileSsoCommandHandler` class serves as an SSO command handler, designed to retrieve user information using an SSO token. You can adopt this method to develop your own SSO command handler.

   1. Move the `auth/public` folder to `src/public`. This folder contains HTML pages for the bot app. On initiating SSO flows with Microsoft Entra, the user is redirected to these pages.

   1. Run the following command in `./` folder:

      ```bash
      npm install copyfiles --save-dev
      ```

   1. Update the following command in `package.json` file:

       ```json
       "build": "tsc --build && shx cp -r ./src/adaptiveCards ./lib/src && copyfiles src/public/*.html lib/",
       ```

      The HTML pages used for auth redirect are copied when building this bot project.

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

   1. Update `commandApp.requestHandler` to ensure auth works with the following code:

        ```bash
        await commandApp.requestHandler(req, res).catch((err) => {
            // Error message including "412" means it is waiting for user's consent, which is a normal process of SSO, sholdn't throw this error.
            if (!err.message.includes("412")) {
            throw err;
            }
        });
        ```

   1. Add `ssoConfig` and `ssoCommands` in `ConversationBot` in `src/internal/initialize`:

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

   1. Move the `auth/public` folder to `src/public`. This folder contains HTML pages for the bot app. On initiating SSO flows with Microsoft Entra, the user is redirected to these pages.

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

   1. Run the following commands under `./` folder:

      ```bash
      npm install @microsoft/teamsfx
      ```

      ```bash
      npm install isomorphic-fetch
      ```

   1. Implement the API key `handleMessageExtensionQueryWithSSO` in `TeamsActivityHandler.handleTeamsMessagingExtensionQuery`.

   1. Install `copyfiles` npm packages in your TypeScript bot project and update the `build` script in `src/package.json` file as follows:

      ```json
      "build": "tsc --build && copyfiles ./public/*.html lib/",
      ```

      The HTML pages used for auth redirect are copied when building this bot project.

   1. Update `templates/appPackage/aad.template.json` file with the scopes you use in the `handleMessageExtensionQueryWithSSO` function:

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

   ---

---

## Debug your app

To debug your app, select the **F5** key. Teams Toolkit uses the Microsoft Entra manifest to register an SSO-enabled app. For more information, see [debug your Teams app locally.](debug-local.md)

## Customize Microsoft Entra apps

Teams [app manifest](/entra/identity-platform/reference-app-manifest) enables you to customize different aspects of your app registration. You can update the manifest as required.

To include additional API permissions to access your desired APIs, see [edit Microsoft Entra manifest](AAD-manifest-customization.md).

To view your Microsoft Entra app in Azure portal, see [edit Microsoft Entra manifest](AAD-manifest-customization.md).

## Next step

> [!div class="nextstepaction"]
> [Add single sign-on to Teams app](add-single-sign-on.md)
