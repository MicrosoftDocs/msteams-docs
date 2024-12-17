---
title: Configure Message Extension Capability
author: surbhigupta
description: Learn how to configure the message extension capability within a Teams app with Microsoft Teams Toolkit for Visual Studio Code.
ms.author: v-bvishnu
ms.localizationpriority: medium
ms.topic: reference
ms.date: 12/17/2024
---

# Add message extension capability to Teams app

A message extension allows users to interact with your web service when composing messages in Microsoft Teams. Users can invoke your web service to assist message composition from the message compose box or from the search bar.

Message extensions are built on the Bot Framework architecture in Teams. For more information, see [build message extensions](../messaging-extensions/what-are-messaging-extensions.md).

## Prerequisites

To configure the message extension capability in your app, ensure the following prerequisites are met:

* Teams app and its manifest (previously called Teams app manifest) file
* [Microsoft 365 account](../concepts/build-and-test/prepare-your-o365-tenant.md) to test the app
* [Microsoft Azure account](/azure/storage/common/storage-account-create)

## Add message extension to Teams app

# [Add message extension to tab app](#tab/tabapp)

To add a message extension to a tab app, follow these steps:

1. [Create message extension app using Microsoft Teams Toolkit](#create-message-extension-app-using-microsoft-teams-toolkit)
1. [Configure message extension in app manifest](#configure-message-extension-in-app-manifest)
1. [Add message extension code to your project](#add-message-extension-code-to-your-project)
1. [Setup local debug environment](#setup-local-debug-environment)
1. [Provision your app to Azure](#provision-your-app-to-azure)

### Create message extension app using Microsoft Teams Toolkit

To create a message extension app with Teams Toolkit, see [create a message extension app with Teams Toolkit](create-new-project.md).

### Configure message extension in app manifest

You can configure the message extension capability in the `appPackage/manifest.json` file. For more information, see [app manifest schema](../resources/schema/manifest-schema.md#composeextensions).

The following code snippet is an example:

```json
"composeExtensions": [
    {
        "botId": "${{BOT_ID}}",
        "commands": [
            {
                "id": "createCard",
                "context": [
                    "compose"
                ],
                "description": "Command to run action to create a Card from Compose Box",
                "title": "Create Card",
                "type": "action",
                "parameters": [
                    {
                        "name": "title",
                        "title": "Card title",
                        "description": "Title for the card",
                        "inputType": "text"
                    },
                    {
                        "name": "subTitle",
                        "title": "Subtitle",
                        "description": "Subtitle for the card",
                        "inputType": "text"
                    },
                    {
                        "name": "text",
                        "title": "Text",
                        "description": "Text for the card",
                        "inputType": "textarea"
                    }
                ]
            },
            {
                "id": "shareMessage",
                "context": [
                    "message"
                ],
                "description": "Test command to run action on message context (message sharing)",
                "title": "Share Message",
                "type": "action",
                "parameters": [
                    {
                        "name": "includeImage",
                        "title": "Include Image",
                        "description": "Include image in Hero Card",
                        "inputType": "toggle"
                    }
                ]
            },
            {
                "id": "searchQuery",
                "context": [
                    "compose",
                    "commandBox"
               ],
               "description": "Test command to run query",
               "title": "Search",
                "type": "query",
                "parameters": [
                    {
                        "name": "searchQuery",
                        "title": "Search Query",
                        "description": "Your search query",
                        "inputType": "text"
                    }
                ]
            }
        ],
        "messageHandlers": [
            {
                "type": "link",
                "value": {
                    "domains": [
                        "*.botframework.com"
                    ]
                }
            }
        ]
    }
]
```

### Add message extension code to your project

1. Create a `bot/` folder in your tab project in Visual Studio Code. Copy the source code of the message extension app into the folder. Your project's folder structure looks as follows:

   ```
   |--.vscode/
   |--appPackage/
   |--env/
   |--infra/
   |--public/
   |--bot/           <!--message extension source code-->
   |   |--index.ts
   |   |--config.ts
   |   |--teamsBot.ts
   |   |--package.json
   |   |--tsconfig.json
   |   |--web.config
   |   |--.Webappignore
   |--src/            <!--your current source code-->
   |   |--app.ts
   |   |--static/
   |   |--views/
   |--package.json
   |--tsconfig.json
   |--teamsapp.local.yml
   |--teamsapp.yml
   ```

1. Reorganize the folder structure as follows:

   > [!TIP]
   > Use the command `npm init -y` to create a root `package.json` file.
   ```
   |--.vscode/
   |--appPackage/
   |--env/
   |--infra/
   |--bot/            <!--message extension source code-->
      |--index.ts
   |   |--config.ts
   |   |--teamsBot.ts
   |   |--package.json
   |   |--tsconfig.json
   |   |--web.config
   |   |--.Webappignore
   |--tab/           <!--move your current source code to a new sub folder-->
   |   |--src/
   |   |   |--app.ts
   |   |   |--static/
   |   |   |--views/
   |   |--package.json
   |   |--tsconfig.json
   |--package.json <!--root package.json-->
   |--teamsapp.local.yml
   |--teamsapp.yml
   ```

1. Add the following code to your root `package.json`:

   ```json
   "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1",
     "install:bot": "cd bot && npm install",
     "install:tab": "cd tab && npm install",
     "install": "concurrently \"npm run install:bot\" \"npm run install:tab\"",
     "dev:bot": "cd bot && npm run dev",
     "start:tab": "cd tab && npm run start",
     "build:tab": "cd tab && npm run build",
     "build:bot": "cd bot && npm run build",
     "build": "concurrently \"npm run build:tab\" \"npm run build:bot\""
   },
   "dependencies": {
       "concurrently": "^7.6.0"
   },
   ```

   > [!NOTE]
   > In a JavaScript project, you can run the project without a `build` folder. You must remove the `build:bot` script and update the `build` script to `npm run build:tab`.

### Setup local debug environment

1. Update `.vscode/tasks.json` as follows:
   1. Add three new tasks: `Start local tunnel`, `Start bot`, and `Start frontend`.
   1. Update the `Start application` task's `dependsOn` array to include `Start bot` and `Start frontend`.
   1. Configure the `cwd` option for `Start bot` and `Start frontend`. This action is needed as you've previously moved the code for the tab and bot into their respective folders while reorganizing the folder structure.
   1. Add `Start local tunnel` to the `Start Teams App Locally` task's `dependsOn` array.

   ```json
   "tasks":[
           {
               // Start the local tunnel service to forward public URL to local port and inspect traffic.
               // See https://aka.ms/teamsfx-tasks/local-tunnel for the detailed args definitions.
               "label": "Start local tunnel",
               "type": "teamsfx",
               "command": "debug-start-local-tunnel",
               "args": {
                   "type": "dev-tunnel",
                   "ports": [
                       {
                           "portNumber": 3978,
                           "protocol": "http",
                           "access": "public",
                           "writeToEnvironmentFile": {
                               "endpoint": "BOT_ENDPOINT", // output tunnel endpoint as BOT_ENDPOINT
                               "domain": "BOT_DOMAIN" // output tunnel domain as BOT_DOMAIN
                           }
                       }
                   ],
                   "env": "local"
               },
               "isBackground": true,
               "problemMatcher": "$teamsfx-local-tunnel-watch"
           },
           {
               "label": "Start bot",
               "type": "shell",
               "command": "npm run dev:teamsfx",
               "isBackground": true,
               "options": {
                   "cwd": "${workspaceFolder}/bot"
               },
               "problemMatcher": {
                   "pattern": [
                       {
                           "regexp": "^.*$",
                           "file": 0,
                           "location": 1,
                           "message": 2
                       }
                   ],
                   "background": {
                       "activeOnStart": true,
                       "beginsPattern": "[nodemon] starting",
                       "endsPattern": "restify listening to|Bot/ME service listening at|[nodemon] app crashed"
                   }
               }
           },
           {
              "label": "Start frontend",
              "type": "shell",
              "command": "npm run dev:teamsfx",
              "isBackground": true,
              "options": {
                   "cwd": "${workspaceFolder}/tab"
               },
               "problemMatcher": {
                   "pattern": {
                       "regexp": "^.*$",
                       "file": 0,
                       "location": 1,
                       "message": 2
                   },
                   "background": {
                       "activeOnStart": true,
                       "beginsPattern": ".*",
                       "endsPattern": "listening to|Compiled|Failed|compiled|failed"
                   }
               }
           },
            {
                "label": "Start application",
                "dependsOn": [
                    "Start bot",
                    "Start frontend"
                ]
            },
            {
                "label": "Start Teams App Locally",
                "dependsOn": [
                    "Validate prerequisites",
                    "Start local tunnel",
                    "Provision",
                    "Deploy",
                    "Start application"
                ],
                "dependsOrder": "sequence"
            },
   ]
   ```

1. Under the `teamsapp.local.yml` file:
   1. Under `provision`, add the `botAadApp/create` and `botFramework/create` actions.
   1. Under `deploy`, update the code of the `file/createOrUpdateEnvironmentFile` action as follows:

   ```yaml
   provision:
     - uses: botAadApp/create
       with:
         # The Microsoft Entra application's display name
         name: bot-${{TEAMSFX_ENV}}
       writeToEnvironmentFile:
         # The Microsoft Entra application's client id created for bot.
         botId: BOT_ID
         # The Microsoft Entra application's client secret created for bot.
         botPassword: SECRET_BOT_PASSWORD 

     # Create or update the bot registration on dev.botframework.com
     - uses: botFramework/create
       with:
         botId: ${{BOT_ID}}
         name: bot
         messagingEndpoint: ${{BOT_ENDPOINT}}/api/messages
         description: ""
         channels:
           - name: msteams
   deploy:
     - uses: file/createOrUpdateEnvironmentFile # Generate runtime environment variables
       with:
         target: ./tab/.localConfigs
         envs:
           BROWSER: none
           HTTPS: true
           PORT: 53000
           SSL_CRT_FILE: ${{SSL_CRT_FILE}}
           SSL_KEY_FILE: ${{SSL_KEY_FILE}}

     - uses: file/createOrUpdateEnvironmentFile # Generate runtime environment variables
       with:
         target: ./bot/.localConfigs
         envs:
           BOT_ID: ${{BOT_ID}}
           BOT_PASSWORD: ${{SECRET_BOT_PASSWORD}}
   ```

   For more information, see [sample app](https://github.com/OfficeDev/TeamsFx-Samples/tree/dev/hello-world-bot-with-tab/teamsapp.local.yml).

1. Under the **Run and Debug**, select **Debug (Edge)** or **Debug (Chrome)**.

1. Select the **F5** key to debug and preview your Teams app locally.

## Provision your app to Azure

1. Copy the `botRegistration/` folder and add under `infra/`.

1. Add the following code to the `azure.bicep` file:

   ```bicep
   param resourceBaseName2 string
   param webAppName2 string = resourceBaseName2
   @maxLength(42)
   param botDisplayName string
   @description('Required when create Azure Bot service')
   param botAadAppClientId string
   @secure()
   @description('Required by Bot Framework package in your bot project')
   param botAadAppClientSecret string
   resource webApp2 'Microsoft.Web/sites@2021-02-01' = {
     kind: 'app'
     location: location
     name: webAppName2
     properties: {
       serverFarmId: serverfarm.id
       httpsOnly: true
       siteConfig: {
         alwaysOn: true
         appSettings: [
           {
             name: 'WEBSITE_RUN_FROM_PACKAGE'
             value: '1' // Run Azure APP Service from a package file
           }
           {
             name: 'WEBSITE_NODE_DEFAULT_VERSION'
             value: '~18' // Set NodeJS version to 18.x for your site
           }
           {
             name: 'RUNNING_ON_AZURE'
             value: '1'
           }
           {
             name: 'BOT_ID'
             value: botAadAppClientId
           }
           {
             name: 'BOT_PASSWORD'
             value: botAadAppClientSecret
           }
         ]
         ftpsState: 'FtpsOnly'
       }
     }
   }
   // Register your web service as a bot with the Bot Framework
   module azureBotRegistration './botRegistration/azurebot.bicep' = {
     name: 'Azure-Bot-registration'
     params: {
       resourceBaseName: resourceBaseName
       botAadAppClientId: botAadAppClientId
       botAppDomain: webApp2.properties.defaultHostName
       botDisplayName: botDisplayName
     }
   }
   // The output will be persisted in .env.{envName}. Visit https://aka.ms/teamsfx-actions/arm-deploy for more details.
   output BOT_AZURE_APP_SERVICE_RESOURCE_ID string = webApp2.id
   output BOT_DOMAIN string = webApp2.properties.defaultHostName
   ```

1. To ensure that the necessary parameters are set correctly, update the `azure.parameters.json` file with the following code:

   ```json
   {
   "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentParameters.json#",
   "contentVersion": "1.0.0.0",
   "parameters": {
     "resourceBaseName": {
       "value": "tab${{RESOURCE_SUFFIX}}"
     },
     "webAppSku": {
       "value": "B1"
     },
     "botAadAppClientId": {
       "value": "${{BOT_ID}}"
     },
     "botAadAppClientSecret": {
       "value": "${{SECRET_BOT_PASSWORD}}"
     },
     "botDisplayName": {
       "value": "bot"
     },
     "resourceBaseName2":{
       "value": "bot${{RESOURCE_SUFFIX}}"
     }
   }
   ```

1. Under the `teamsapp.yml` file:
   1. Under `provision`, add the `botAadApp/create` action. For more information, see [sample app](https://github.com/OfficeDev/TeamsFx-Samples/tree/dev/hello-world-bot-with-tab/teamsapp.yml).
   1. Under the `deploy` section, add the following code:

   ```yaml
   deploy:
     - uses: cli/runNpmCommand # Run npm command
       with:
         args: install
     - uses: cli/runNpmCommand # Run npm command
       with:
         args: run build
     # Deploy bits to Azure Storage Static Website
     - uses: azureAppService/zipDeploy
       with:
         workingDirectory: ./tab
         # Deploy base folder
         artifactFolder: .
         # Ignore file location, leave blank will ignore nothing
         ignoreFile: .webappignore
         # The resource id of the cloud resource to be deployed to.
         # This key will be generated by arm/deploy action automatically.
         # You can replace it with your existing Azure Resource id
         # or add it to your environment variable file.
         resourceId: ${{TAB_AZURE_APP_SERVICE_RESOURCE_ID}}
     - uses: azureAppService/zipDeploy
       with:
         workingDirectory: ./bot
         # Deploy base folder
         artifactFolder: .
         # Ignore file location, leave blank will ignore nothing
         ignoreFile: .webappignore
         # The resource id of the cloud resource to be deployed to.
         # This key will be generated by arm/deploy action automatically.
         # You can replace it with your existing Azure Resource id
         # or add it to your environment variable file.
         resourceId: ${{BOT_AZURE_APP_SERVICE_RESOURCE_ID}}
   ```

1. Go to **View** > **Command Palette...** or select **Ctrl+Shift+P**.

1. Enter `Teams: Provision` to apply the bicep to Azure.

1. Enter `Teams: Deploy` to deploy your tab app code to Azure.

1. Under **Run and Debug**, select **Launch Remote (Edge)** or **Launch Remote (Chrome)**.

1. Select the **F5** key to debug and preview your Teams app.

# [Add message extension to bot app](#tab/botapp)

You can add the message extension capability to a bot app easily as message extensions are built on Bot Framework.

To add a message extension to a bot app, follow these steps:

1. [Create a message extension app using Teams Toolkit](#create-a-message-extension-using-teams-toolkit)
1. [Configure message extension in app manifest](#configure-message-extension-in-app-manifest)
1. [Add message extension code to project](#add-message-extension-code-to-project)

### Create a message extension using Teams Toolkit

To create a message extension app, see [create a message extension app with Teams Toolkit](create-new-project.md).

### Configure message extension in app manifest

You can configure the message extension capability in `appPackage/manifest.json`. For more information, see [app manifest schema](../resources/schema/manifest-schema.md#composeextensions).

The following code snippet is an example:

   ```json
   "composeExtensions": [
       {
           "botId": "${{BOT_ID}}",
           "commands": [
               {
                   "id": "createCard",
                   "context": [
                       "compose"
                   ],
                   "description": "Command to run action to create a Card from Compose Box",
                   "title": "Create Card",
                   "type": "action",
                   "parameters": [
                       {
                           "name": "title",
                           "title": "Card title",
                           "description": "Title for the card",
                           "inputType": "text"
                       },
                       {
                           "name": "subTitle",
                           "title": "Subtitle",
                           "description": "Subtitle for the card",
                           "inputType": "text"
                       },
                      {
                           "name": "text",
                           "title": "Text",
                           "description": "Text for the card",
                           "inputType": "textarea"
                       }
                   ]
               },
               {
                   "id": "shareMessage",
                   "context": [
                       "message"
                   ],
                   "description": "Test command to run action on message context (message sharing)",
                   "title": "Share Message",
                   "type": "action",
                   "parameters": [
                       {
                           "name": "includeImage",
                           "title": "Include Image",
                           "description": "Include image in Hero Card",
                           "inputType": "toggle"
                       }
                   ]
               },
               {
                   "id": "searchQuery",
                   "context": [
                       "compose",
                       "commandBox"
                   ],
                   "description": "Test command to run query",
                   "title": "Search",
                   "type": "query",
                   "parameters": [
                       {
                           "name": "searchQuery",
                           "title": "Search Query",
                           "description": "Your search query",
                           "inputType": "text"
                       }
                   ]
               }
           ],
           "messageHandlers": [
               {
                   "type": "link",
                   "value": {
                       "domains": [
                           "*.botframework.com"
                       ]
                  }
               }
           ]
       }
   ]
   ```

### Add message extension code to project

1. Your bot app contains a class that extends `TeamsActivityHandler`. Copy your message extension functions from the message extension app into this class in Visual Studio Code. The following code is an example of a bot that contains functions from a message extension app created in Teams Toolkit:

   ```javascript
     class YourHandler extends TeamsActivityHandler {
     /**
      * your own code
      */
     //message extension code
     // Action.
     public async handleTeamsMessagingExtensionSubmitAction(
       context: TurnContext,
       action: any
     ): Promise<any> {}
     // Search.
     public async handleTeamsMessagingExtensionQuery(
       context: TurnContext,
       query: any
     ): Promise<any> {}
     public async handleTeamsMessagingExtensionSelectItem(
       context: TurnContext,
       obj: any
     ): Promise<any> {}
     // Link Unfurling.
     public async handleTeamsAppBasedLinkQuery(
       context: TurnContext,
       query: any
     ): Promise<any> {}
   }
   async function createCardCommand(
     context: TurnContext,
     action: MessagingExtensionAction
   ): Promise<MessagingExtensionResponse> {}
   async function shareMessageCommand(
     context: TurnContext,
     action: MessagingExtensionAction
   ): Promise<MessagingExtensionResponse> {}
   ```

1. Go to **View** > **Command Palette...** or select **Ctrl+Shift+P**.

1. Enter `Teams: Provision` to apply the bicep to Azure.

1. Enter `Teams: Deploy` to deploy your tab app code to Azure.

1. Under **Run and Debug**, select **Launch Remote (Edge)** or **Launch Remote (Chrome)**.

1. Select the **F5** key to debug and preview your Teams app.

---

## Next step

> [!div class="nextstepaction"]
> [How-to guides for adding capabilities](add-how-to-guides-vsc.md#how-to-guides-for-adding-capabilities)

## See also

[Set up CI/CD pipelines](use-CICD-template.md)
