---
title: Configure message extension capability
author: surbhigupta
description: Learn how to configure message extension capability within your Teams app.
ms.author: v-vanv
ms.localizationpriority: medium
ms.topic: overview
ms.date: 03/01/2024
---

# Configure message extension capability within your Teams app

Message extension allows users to interact with your web service when composing messages in Microsoft Teams. Users can invoke your web service to assist message composition from the message compose box or from the search bar.

Message extensions are implemented on top of the bot support architecture within Teams. For more information, see [Build message extensions](../messaging-extensions/what-are-messaging-extensions.md).

## Prerequisites

To configure message extension as an additional capability, ensure the following prerequisites are met:

* The app manifest (previously called Teams app manifest) file.
* [Microsoft 365 account](../concepts/build-and-test/prepare-your-o365-tenant.md) to test the application.
* [Microsoft Azure Storage account](/azure/storage/common/storage-account-create).

## Add message extension to Teams app

# [Add message extension to tab app](#tab/tabapp)

The following steps help you to add message extension to a tab app:

1. [Create tab app using Microsoft Teams Toolkit](#create-tab-app-using-microsoft-teams-toolkit)
1. [Configure message extension within your Teams app](#configure-message-extension-in-app-manifest)
1. [Add message extension code to your project](#add-message-extension-code-to-your-project)
1. [Setup local debug environment](#setup-local-debug-environment)
1. [Provision your app to Azure](#provision-your-app-to-azure)

## Create tab app using Microsoft Teams Toolkit

To create tab app with Teams Toolkit, see [create new tab app with Teams Toolkit](create-new-project.md).

## Configure message extension in app manifest

You can configure message extension in `appPackage/manifest.json`. If you need to customize your app, see the [app manifest schema](../resources/schema/manifest-schema.md#composeextensions). The following code snippet is an example:

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

## Add message extension code to your project

1. You can add your message extension app code into your project. If you don't have an app code, use the previously created message extension app project and copy the source code into your current project. We suggest you copy them into a `bot/` folder. The following folder structure is an example of how your project's folder structure looks like:

   ```yml
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

   You can create a root `package.json` using command `npm init -y`. We recommend you reorganize the folder structure and create a root `package.json` as given in the following folder structure:

   ```yml
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
   > If you're working on a JavaScript project, the bot doesn't need build. You must remove `build:bot` script and update the `build` script to `npm run build:tab`.

## Setup local debug environment

1. Add the following new tasks in `.vscode/task.json`:

   * `Start local tunnel`
   * `Start bot`
   * `Start frontend`.

    Add `Start bot` and `Start frontend` to `dependOn` in the `Start application`task. Configure `Start bot` and `cwd` option of `Start frontend` as we moved the code for tab and bot to `tab/` and `bot/` folder separately. Add `Start local tunnel` to `dependOn` in the `Start Teams App Locally` task. For example:

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

1. Add action `botAadApp/create` and `botFramework/create` under provision in `teamsapp.local.yml`.
1. Add the following code in `file/createOrUpdateEnvironmentFile` action under deploy:

   ```yml
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

   For more information, see the [sample project](https://github.com/OfficeDev/TeamsFx-Samples/tree/dev/hello-world-bot-with-tab).

1. Open the **Run and Debug Activity Panel** and select **Debug (Edge)** or **Debug (Chrome)**.
1. Select the F5 key to debug and preview your Teams app locally.

## Provision your app to Azure

1. Copy the `botRegistration/` folder from bot to `infra/`.
1. Add following code to the bicep file:

   ```yml
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

1. Update the `azure.parameters.json` file with the following code to ensure that necessary parameters are set correctly:

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

1. Add `botAadApp/create` action under the provision section in the `teamsapp.yml` file.
1. Add the following code in the **deploy** section:

   ```yml
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

   For more information, see the [sample project](https://github.com/OfficeDev/TeamsFx-Samples/tree/dev/hello-world-bot-with-tab).

1. Run `Teams: Provision` command in Visual Studio Code to apply the bicep to Azure.
1. Run `Teams: Deploy` command in Visual Studio Code to deploy your app code to Azure.
1. Open the **Run and Debug Activity Panel** and select **Launch Remote (Edge)** or **Launch Remote (Chrome)**.
1. Select the F5 key to debug and preview your Teams app.

# [Add message extension to bot app](#tab/botapp)

You can add message extension to a bot app more easily than adding it to a tab app as message extension use the bot support framework.

The following steps help you to add message extension to a bot app:

1. [Create a bot app using Teams Toolkit](#create-a-bot-app-using-teams-toolkit)
1. [Configure message extension in app manifest](#configure-message-extension-in-app-manifest)
1. [Add message extension code to project](#add-message-extension-code-to-project)
1. [Setup local debug environment](#setup-local-debug-environment-1)

## Create a bot app using Teams Toolkit

To create a bot app, see [create a bot app with Teams Toolkit](create-new-project.md).

## Configure message extension in app manifest

1. You can configure message extension in `appPackage/manifest.json`. If you need to customize your app, see the [app manifest schema](../resources/schema/manifest-schema.md#composeextensions). For example:

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

## Add message extension code to project

If you're adding message extension to a bot app, you should have a class that extends `TeamsActivityHandler`. Add your message extension functions or copy functions from your previously created message extension app to your own class. The following code is an example if you copy functions from a message extension app created with Teams Toolkit:

   ```yml
     public class YourHandler extends TeamsActivityHandler{
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
       public async handleTeamsMessagingExtensionQuery(context: TurnContext, query: any): Promise<any> {}

       public async handleTeamsMessagingExtensionSelectItem(
         context: TurnContext,
         obj: any
       ): Promise<any> {}

       // Link Unfurling.
       public async handleTeamsAppBasedLinkQuery(context: TurnContext, query: any): Promise<any> {}
     }
       async function createCardCommand(context: TurnContext, action: MessagingExtensionAction): Promise<MessagingExtensionResponse> {
     }
       async function shareMessageCommand(context: TurnContext, action: MessagingExtensionAction): Promise<MessagingExtensionResponse> {
     }
   ```

## Setup local debug environment

1. Add the following new tasks in `.vscode/task.json`:

   * `Start local tunnel`
   * `Start bot`
   * `Start frontend`.

    Add `Start bot` and `Start frontend` to `dependOn` in the `Start application`task. Configure `Start bot` and `cwd` option of `Start frontend` as we moved the code for tab and bot to `tab/` and `bot/` folder separately. Add `Start local tunnel` to `dependOn` in the `Start Teams App Locally` task. For example:

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

1. Add action `botAadApp/create` and `botFramework/create` under provision in `teamsapp.local.yml`.
1. Add the following code in `file/createOrUpdateEnvironmentFile` action under deploy:

   ```yml
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

   For more information, see the [sample project](https://github.com/OfficeDev/TeamsFx-Samples/tree/dev/hello-world-bot-with-tab).

1. Open the **Run and Debug Activity Panel** and select **Debug (Edge)** or **Debug (Chrome)**.
1. Select the F5 key to debug and preview your Teams app locally.
