---
title: Configure Bot Capability
author: surbhigupta
description: Learn how to configure the bot capability within a Teams app with Microsoft Teams Toolkit for Visual Studio Code.
ms.author: v-preethah
ms.localizationpriority: medium
ms.topic: reference
nextTutorialHref: ~/toolkit/add-How-to-guides-v5.md
nextTutorialTitle: Back to Add How-to guides to Microsoft Teams app
ms.date: 12/12/2024
---

# Configure bot capability within Teams app

A bot, also known as a chatbot or conversational bot, is an app that responds to straightforward commands in a chat setting, providing relevant responses. Bots are commonly used for various tasks, such as notifying about build failures, supplying weather updates, bus schedules, or travel information. Bot interactions can range from simple question-and-answer exchanges to complex conversations. As a cloud application, a bot can offer secure and valuable access to cloud services and corporate resources. For more information, see [build bots for Microsoft Teams](../bots/what-are-bots.md).

## Prerequisites

To configure bot as an additional capability, ensure the following prerequisites are met:

* Teams app and its app manifest (previously called Teams app manifest) file
* [Microsoft 365 account](../concepts/build-and-test/prepare-your-o365-tenant.md) to test the app
* [Microsoft Azure account](/azure/storage/common/storage-account-create)

# [Add bot to tab app](#tab/tabapp)

The following steps help you to add bot to a tab app:

* [Create bot app using Microsoft Teams Toolkit](#create-bot-app-using-microsoft-teams-toolkit)
* [Configure bot in app manifest](#configure-bot-in-app-manifest)
* [Add bot code to your project](#add-bot-code-to-your-project)
* [Setup local debug environment](#setup-local-debug-environment)
* [Provision the app to Azure](#provision-the-app-to-azure)

## Create bot app using Microsoft Teams Toolkit

To create a bot app using Teams Toolkit, see [create a bot app with Teams Toolkit](create-new-project.md).

## Configure bot in app manifest

You can configure the bot capability in the `appPackage/manifest.json` file. For more information on how to configure the bot capability, see [app manifest schema](../resources/schema/manifest-schema.md#bots). The following code snippet is an example:

```json
    "bots": [
        {
            "botId": "${{BOT_ID}}",
            "scopes": [
                "personal",
                "team",
                "groupchat"
            ],
            "supportsFiles": false,
            "isNotificationOnly": false,
            "commandLists": [
                {
                    "scopes": [
                        "personal",
                        "team",
                        "groupchat"
                    ],
                    "commands": [
                        {
                            "title": "welcome",
                            "description": "Resend welcome card of this Bot"
                        },
                        {
                            "title": "learn",
                            "description": "Learn about Adaptive Card and Bot Command"
                        }
                    ]
                }
            ]
        }
    ]
```

## Add bot code to your project

1. Create a `bot/` folder in your project and copy the source code of the bot app into the folder. Your project's folder structure looks as follows:

   ```
       |-- .vscode/
       |-- appPackage/
       |-- env/
       |-- infra/
       |--public/
       |-- bot/           <!--bot source code-->
       |   |-- adaptiveCards/
       |   |-- index.ts
       |   |-- config.ts
       |   |-- teamsBot.ts
       |   |-- package.json
       |   |-- tsconfig.json
       |   |-- web.config
       |   |-- .webappignore
       |-- src/            <!--your current source code-->
       |   |-- app.ts
       |   |-- static/
       |   |-- views/
       |-- package.json
       |-- tsconfig.json
       |-- teamsapp.local.yml
       |-- teamsapp.yml
   ```

1. Reorganize the folder structure as follows:

   > [!TIP]
   > Use the command `npm init -y` to create a root `package.json` file.

   ```
       |-- .vscode/
       |-- appPackage/
       |-- env/
       |-- infra/
       |-- bot/            <!--bot source code-->
       |   |-- adaptiveCards/
       |   |-- index.ts
       |   |-- config.ts
       |   |-- teamsBot.ts
       |   |-- package.json
       |   |-- tsconfig.json
       |   |-- web.config
       |   |-- .webappignore
       |-- tab/           <!--move your current source code to a new sub folder-->
       |   |-- src/
       |   |   |-- app.ts
       |   |   |-- static/
       |   |   |-- views/
       |   |-- package.json
       |   |-- tsconfig.json
       |-- package.json <!--root package.json-->
       |-- teamsapp.local.yml
       |-- teamsapp.yml
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

## Setup local debug environment

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

1. Add the `botAadApp/create` and `botFramework/create` actions under `provision` in the `teamsapp.local.yml` file. Update the code of the `file/createOrUpdateEnvironmentFile` action under `deploy` as follows:

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

   For more information, see the [sample app](https://github.com/OfficeDev/TeamsFx-Samples/tree/dev/hello-world-bot-with-tab/teamsapp.local.yml).

1. Under the **Run and Debug**, select **Debug (Edge)** or **Debug (Chrome)**.

1. Select the **F5** key to debug and preview your Teams app locally.

## Provision the app to Azure

1. Copy the `botRegistration/` folder from bot to `infra/`.

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
    }
   ```

1. Add the `botAadApp/create` action under `provision` in the `teamsapp.yml` file. For more information, see the [sample app](https://github.com/OfficeDev/TeamsFx-Samples/tree/dev/hello-world-bot-with-tab/teamsapp.yml). Add the following code under the `deploy` section:

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

# [Add bot to message extension app](#tab/messageextensionapp)

You can add the bot capability to a message extension app easily as message extensions are built on Bot Framework.

The following steps help you to add the bot capability to a message extension app:

* [Create bot app using Teams Toolkit](#create-bot-app-using-teams-toolkit)
* [Update manifest file](#update-manifest-file)
* [Add bot code to project](#add-bot-code-to-project)

## Create bot app using Teams Toolkit

To create a bot app with Teams Toolkit, see [create a new Teams bot app](create-new-project.md).

## Update manifest file

1. You can configure the bot capability in the `appPackage/manifest.json` file. For more information on how to configure the bot capability, see [app manifest schema](../resources/schema/manifest-schema.md#bots). The following code snippet is an example:

   ```json
    "bots": [
        {
            "botId": "${{BOT_ID}}",
            "scopes": [
                "personal",
                "team",
                "groupchat"
            ],
            "supportsFiles": false,
            "isNotificationOnly": false,
            "commandLists": [
                {
                    "scopes": [
                        "personal",
                        "team",
                        "groupchat"
                    ],
                    "commands": [
                        {
                            "title": "welcome",
                            "description": "Resend welcome card of this Bot"
                        },
                        {
                            "title": "learn",
                            "description": "Learn about Adaptive Card and Bot Command"
                        }
                    ]
                }
            ]
        }
    ]
   ```

## Add bot code to project

1. Your message extension app contains a class that extends `TeamsActivityHandler`. Copy your configured bot code from the bot app into this class. The following code is an example of a message extension that contains functions from a bot app created in Teams Toolkit:

   ```javascript
      public class YourHandler extends TeamsActivityHandler{
    
        // bot code
        constructor(){
          super();
          this.likeCountObj = { likeCount: 0 };
          this.onMessage(async (context, next) => {});
          this.onMembersAdded(async (context, next) => {});
        }
        async onAdaptiveCardInvoke(context: TurnContext,
    invokeValue: AdaptiveCardInvokeValue):  Promise<AdaptiveCardInvokeResponse> {};
    
        /**
         * your own message extension code
        */
      }
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
