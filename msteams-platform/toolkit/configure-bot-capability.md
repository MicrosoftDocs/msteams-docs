---
title: Configure-bot-capability
author: surbhigupta
description: Learn to configure bot capability within your Teams app.
ms.author: v-preethah
ms.localizationpriority: medium
ms.topic: overview
ms.date: 02/16/2024
---

# Configure bot capability within your Teams app

A bot, chatbot, or conversational bot is an app that responds to simple commands sent in chat and replies in meaningful ways. Examples of bots in everyday use include: bots that notify about build failures, bots that provide information about the weather or bus schedules, or provide travel information. A bot interaction can be a quick question and answer, or it can be a complex conversation. Being a cloud application, a bot can provide valuable and secure access to cloud services and corporate resources. Learn more from [Build bots for Teams](../bots/what-are-bots.md).

## Prerequisites

To configure bot as additional capability, please make sure:

* You have a Teams application and its manifest.
* You have a Microsoft 365 account to test the application.

For adding bot to a tab Teams app, see [Add bot to a tab Teams app](#add-bot-to-a-tab-teams-app).

For adding bot to a message extension Teams app, see [Add bot to a message extension Teams app](#add-bot-to-a-message-extension-teams-app).

## Add bot to a tab Teams app

Following are the steps to add Bot capability to a tab app:

* [Create a bot Teams app using Teams Toolkit](#create-a-bot-app-using-teams-toolkit).
* [Update manifest file](#configure-bot-capability-in-teams-application-manifest).
* [Bring bot code to your project](#bring-bot-code-to-your-project).
* [Setup local debug environment](#setup-local-debug-environment).
* [Move the application to Azure](#move-the-application-to-azure).

### Create a bot app using Teams Toolkit

Please check the guide [Create a bot app with Teams Toolkit](create-new-project.md).

### Configure bot capability in Teams application manifest

You can configure bot in appPackage/manifest.json. You can also refer to bot schema if you want to customize.

```JSON
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

### Bring bot code to your project

Bring your own bot app code into your project. If you don't have one, you can use the bot app project previously created and copy the source code to into your current project. We suggest you to copy them into a bot/ folder. Your folder structure will be like:

```yml
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

We suggest you to re-organize the folder structure and create a root package.json as following. You can create a root package.json using command "npm init -y".

```yml
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

Add following to your root package.json

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
> If you are working on a javascript project, the bot doesn't need build. Please remove "build:bot" script and change "build" script to "npm run build:tab".

### Setup local debug environment

Modify .vscode/task.json. Add 3 new tasks: Start local tunnel, Start bot, Start frontend. Add Start bot and Start frontend to task Start application's dependOn. Config Start bot and Start frondend's cwd option since we already move tab and bot's code to tab/ and bot/ folder separately. Add Start local tunnel to task Start Teams App Locally's dependOn.

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

Update teamsapp.local.yml. Add action botAadApp/create and botFramework/create under provision. Then update file/createOrUpdateEnvironmentFile action under deploy.

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

Here is an sample project for reference.

Open the Run and Debug Activity Panel and select Debug (Edge) or Debug (Chrome). Press F5 to preview your Teams app locally.

### Move the application to Azure

Copy the botRegistration/ folder from bot to your infra/. Add following to your bicep file:

```json
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

Additionally, make sure to update the `azure.parameters.json` file to ensure that necessary parameters are set correctly.

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

Update your `teamsapp.yml` file. Add "botAadApp/create" action in "provision" section. Update "deploy" section to be the following:

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

Here is an sample project for reference.

Run `Teams: Provision` command in Visual Studio Code to apply the bicep to Azure.

Run `Teams: Deploy` command in Visual Studio Code to deploy your app code to Azure.

Open the Run and Debug Activity Panel and select Launch Remote (Edge) or Launch Remote (Chrome). Press F5 to preview your Teams app.

## Add bot to a message extension Teams app

Since bot and message extension are both implemented on top of the Bot support architecture within Teams, adding bot to a message extension Teams app is simpler than adding to a tab Teams app.

Following are the steps to add bot capability to a message extension app:

* [Create a bot Teams app using Teams Toolkit](#create-a-bot-app-using-teams-toolkit-1).
* [Update manifest file](#configure-bot-capability-in-teams-application-manifest-1).
* [Bring bot code to your project](#bring-bot-code-to-your-project-1).

### Create a bot app using Teams Toolkit

Please check the guide Create a bot app with Teams Toolkit

### Configure bot capability in Teams application manifest

You can configure bot in appPackage/manifest.json. You can also refer to bot schema if you want to customize.

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

### Bring bot code to your project

If you are adding bot to a message extension Teams app, then you should already have a class that extends TeamsActivityHandler. Bring your own bot code, or copy code from your previously created bot app to your own class. Below is an example if you copy code from Teams Toolkit created bot app:

```json
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

## See also

* [App manifest schema](../resources/schema/manifest-schema.md)
