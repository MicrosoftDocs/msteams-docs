---
title: Configure-tab-capability
author: surbhigupta
description: Learn to configure tab capability within your Teams app.
ms.author: v-vanv
ms.localizationpriority: medium
ms.topic: overview
ms.date: 02/19/2024
---

# Configure tab capability within your Teams app

Tabs are webpages embedded in Microsoft Teams. Tabs functions as simple HTML `iframe` tags that point to domains declared in app manifest (previously called Teams app manifest). You can add tab as a capability to a Teams app into a channel within a team, group chat, or personal app for an individual user. You can include custom tabs with your app to embed your own web content in Teams or add Teams-specific functionality to your web content. For more information, see [Build tabs for Teams](../tabs/what-are-tabs.md).

## Prerequisites

Ensure the following prerequisites are met to configure a tab in Teams app:

* The app manifest file.
* A [Microsoft 365 account](../concepts/build-and-test/prepare-your-o365-tenant.md) to test the application.
* [Microsoft Azure Storage account](/azure/storage/common/storage-account-create).

Before starting, we recommend you create a [tab app with Microsoft Teams Toolkit](create-new-project.md).

## Configure tab in Teams app

The following steps help you to configure the tab in a Teams app:

1. [Update app manifest](#update-app-manifest)
1. [Setup local debug environment](#setup-local-debug-environment)
1. [Provision app to Azure](#provision-app-to-azure)

This how-to guide describes how to configure the tab for a client-side tab app. If you develop a server-side tab app, you don't need to update the folder structure, debug profile, or bicep infrastructure. Add new routes to the tab in your bot service and update app manifest in Teams Toolkit.

For a complete example on how to configure a tab in Teams bot app, see [Hello World bot with tab](https://github.com/OfficeDev/TeamsFx-Samples/tree/main/hello-world-bot-with-tab).

### Update app manifest

1. To configure your tab within a group, channel, or personal scope, update the `manifest.json` file with the following code:

   ```JSON
     "staticTabs": [
         {
             "entityId": "index",
             "name": "Personal Tab",
             "contentUrl": "${{TAB_ENDPOINT}}/index.html#/tab",
             "websiteUrl": "${{TAB_ENDPOINT}}/index.html#/tab",
             "scopes": [
                 "personal"
             ]
         }
     ],
   ```

   ```JSON
     "configurableTabs": [
         {
             "configurationUrl": "${{TAB_ENDPOINT}}/index.html#/config",
             "canUpdateConfiguration": true,
             "scopes": [
                 "team",
                 "groupchat"
             ]
         }
     ],
   ```

1. Update the `manifest.json`file with tab domain to the `validDomains` field:

   ```JSON
   "validDomains": [
       "${{TAB_DOMAIN}}"
   ],
   ```

   `TAB_ENDPOINT` and `TAB_DOMAIN` are built-in variables of Teams Toolkit. They're replaced with the true endpoint in runtime based on your current environment.

### Setup local debug environment

1. To begin, bring your tab app code into your project in Microsoft Visual Studio Code. If you don't have one, you can create a new tab app project with Teams Toolkit and copy the source code into your current project. For example, your folder structure looks like:

   ```yml
       .
       |-- appPackage/
       |-- env/
       |-- infra/
       |-- tab/            <!--tab app source code-->
       |   |-- src/
       |   |   |-- app.ts
       |   |-- package.json
       |-- index.ts        <!--your current source code-->
       |-- package.json
       |-- teamsapp.yml
   ```

   We recommend you to reorganize the folder structure as given in the following folder structure:

   ```yml
       .
       |-- appPackage/
       |-- infra/
       |-- tab/           <!--tab app source code-->
       |   |-- src/
       |   |   |-- app.ts
       |   |-- package.json
       |-- bot/            <!--move your current source code to a new sub folder-->
       |   |-- index.ts
       |   |-- package.json
       |-- teamsapp.yml
   ```

   Ensure that you update the `teamsapp.yml` and `teamsapp.local.yml` files to align with the folder structure. For example:

   ```json
       deploy:
         # Run npm command
         - uses: cli/runNpmCommand
           with:
             args: install --no-audit
             workingDirectory: ./bot
   ```

1. To configure the debug profile for your new tab project, add the following section to the `tasks.json` file:

   ```json
   {
       "label": "Start application",
       "dependsOn": [
           "Start bot",
           "Start frontend"
       ]
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
               "endsPattern": "Compiled|Failed|compiled|failed"
           }
       }
   }
   ```

   You can find a complete example [here](https://github.com/OfficeDev/TeamsFx-Samples/tree/dev/hello-world-bot-with-tab/.vscode).

1. Add the following new actions to the `teamsapp.local.yml` file that enable your tab project to work seamlessly with Teams Toolkit:

   ```json
   provision:
     - uses: script # Set TAB_DOMAIN for local launch
       name: Set TAB_DOMAIN for local launch
       with:
         run: echo "::set-output TAB_DOMAIN=localhost:53000"
     - uses: script # Set TAB_ENDPOINT for local launch
       name: Set TAB_ENDPOINT for local launch
       with:
         run: echo "::set-output TAB_ENDPOINT=https://localhost:53000"

   deploy:
     - uses: devTool/install # Install development tool(s)
       with:
         devCert:
           trust: true
       writeToEnvironmentFile: # Write the information of installed development tool(s) into environment file for the specified environment variable(s).
         sslCertFile: SSL_CRT_FILE
         sslKeyFile: SSL_KEY_FILE

     - uses: cli/runNpmCommand # Run npm command
       with:
         args: install --no-audit
         workingDirectory: ./tab

     - uses: file/createOrUpdateEnvironmentFile # Generate runtime environment variables for tab
       with:
         target: ./tab/.localConfigs
         envs:
           BROWSER: none
           HTTPS: true
           PORT: 53000
           SSL_CRT_FILE: ${{SSL_CRT_FILE}}
           SSL_KEY_FILE: ${{SSL_KEY_FILE}}
   ```

1. After you configure your project and update the necessary files, debug your app locally in Visual Studio Code.

### Provision app to Azure

If you prefer to develop a server-side tab app, you don't need to update your bicep files or Azure infrastructure. Your tab app can be hosted in the same Azure App Service as your bot.

1. To provision an Azure Storage Account for your tab app, add the following code snippet to your bicep file:

   ```json
   @maxLength(20)
   @minLength(4)
   param resourceBaseName string
   param storageSku string
   param storageName string = resourceBaseName
   param location string = resourceGroup().location

   // Azure Storage that hosts your static web site
   resource storage 'Microsoft.Storage/storageAccounts@2021-06-01' = {
     kind: 'StorageV2'
     location: location
     name: storageName
     properties: {
       supportsHttpsTrafficOnly: true
     }
     sku: {
       name: storageSku
     }
   }
   var siteDomain = replace(replace(storage.properties.primaryEndpoints.web, 'https://',''), '/', '')
   output TAB_AZURE_STORAGE_RESOURCE_ID string = storage.id // used in deploy stage
   output TAB_DOMAIN string = siteDomain
   output TAB_ENDPOINT string = 'https://${siteDomain}'
   ```

1. Update the `azure.parameters.json` file to ensure that necessary parameters are set correctly. For example:

   ```json
   {
     "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentParameters.json#",
     "contentVersion": "1.0.0.0",
     "parameters": {
       "resourceBaseName": {
         "value": "helloworld${{RESOURCE_SUFFIX}}"
       },
       "storageSku": {
         "value": "Standard_LRS"
       },
     }
   }
   ```

1. To host your tab app in Azure Storage, you need to enable the static website feature for the storage account. Add the following action to your `teamsapp.yml` file:

   ```json
   provision:
     - uses: azureStorage/enableStaticWebsite
       with:
         storageResourceId: ${{TAB_AZURE_STORAGE_RESOURCE_ID}}
         indexPage: index.html
         errorPage: error.html
   ```

1. Run `Teams: Provision` command in Visual Studio Code to apply the bicep to Azure.
1. To automate build and deployment of your tab app, add the following `build` and `deploy` actions to your `teamsapp.yml` file:

   ```json
     - uses: cli/runNpmCommand # Run npm command
       with:
         args: install
         workingDirectory: ./tab
     - uses: cli/runNpmCommand # Run npm command
       with:
         args: run build
         workingDirectory: ./tab
     # Deploy bits to Azure Storage Static Website
     - uses: azureStorage/deploy
       with:
         workingDirectory: tab
         # Deploy base folder
         artifactFolder: build
         # The resource id of the cloud resource to be deployed to. This key will be generated by arm/deploy action automatically. You can replace it with your existing Azure Resource id or add it to your environment variable file.
         resourceId: ${{TAB_AZURE_STORAGE_RESOURCE_ID}}
   ```

1. Run `Teams: Deploy` command in Visual Studio Code to deploy your tab app code to Azure.

1. Open the **Run and Debug Activity Panel** and select **Launch Remote (Edge)** or **Launch Remote (Chrome)**.
1. Select the F5 key to debug and preview your Teams app.

## See also

* [Add authentication and make a Graph API call](add-single-sign-on.md)
* [Set up CI/CD pipelines](use-CICD-template.md)
* [Call a backend API](https://github.com/OfficeDev/TeamsFx/wiki/How-to-integrate-Azure-Functions-with-your-Teams-app)
