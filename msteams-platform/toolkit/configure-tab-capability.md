---
title: Configure Tab Capability
author: surbhigupta
description: Learn how to configure the tab capability within a Teams app with Microsoft 365 Agents Toolkit for Visual Studio Code.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: reference
ms.date: 12/17/2024
---

# Add tab capability to Teams app

Tabs are webpages embedded in Microsoft Teams. Tabs function as simple HTML `iframe` tags that point to domains declared in app manifest (previously called Teams app manifest). You can add tab as a capability to a Teams app in a channel within a team, group chat, or personal app for an individual user. You can include custom tabs with your app to embed your own web content in Teams or add Teams-specific functionality to your web content. For more information, see [build tabs for Teams](../tabs/what-are-tabs.md).

Before you start, we recommend that you create and go through a tab app. For more information, see [create tab app with Microsoft 365 Agents Toolkit](create-new-project.md).

## Prerequisites

Ensure the following prerequisites are met to configure the tab capability in a Teams app:

* Teams app and its app manifest file
* [Microsoft 365 account](../concepts/build-and-test/prepare-your-o365-tenant.md) to test the app
* [Microsoft Azure account](/azure/storage/common/storage-account-create)

## Configure tab in Teams app

The following steps help you to configure the tab capability in a Teams app:

1. [Update app manifest](#update-app-manifest)
1. [Setup local debug environment](#setup-local-debug-environment)
1. [Provision app to Azure](#provision-app-to-azure)

> [!TIP]
> If you develop a server-side tab app, you don't need to update the folder structure, debug profile, or bicep infrastructure. Add new routes to the tab in your bot service and update the app manifest in Agents Toolkit (previously known as Teams Toolkit).
For more information, see [sample app](https://github.com/OfficeDev/TeamsFx-Samples/tree/main/hello-world-bot-with-tab).

### Update app manifest

1. To configure your tab within a personal chat, group chat, or channel, update the `manifest.json` file with the following code:

   ```JSON
     "staticTabs": [
         {
             "entityId": "index",
             "name": "Personal Tab",
             "contentUrl": "${{TAB_ENDPOINT}}/index.html#/tab",
             "websiteUrl": "${{TAB_ENDPOINT}}/index.html#/tab",
             "scopes": [
                 "personal",
                 "groupChat",
                 "team"
             ]
         }
     ],
   ```

1. Update the value of `validDomains` with your tab's domain.

   ```JSON
   "validDomains": [
       "${{TAB_DOMAIN}}"
   ],
   ```

   > [!NOTE]
   > `TAB_ENDPOINT` and `TAB_DOMAIN` are built-in variables of Agents Toolkit. They're replaced with the true endpoint during runtime based on your current environment.

### Setup local debug environment

1. Bring your tab app code into your project in Visual Studio Code. If you don't have one, you can [create a new tab app with Agents Toolkit](create-new-project.md) and copy the source code into your current project. By default, your tab app's folder structure looks as follows:

   ```
       |-- appPackage/
       |-- env/
       |-- infra/
       |-- tab/            <!--tab app source code-->
       |   |-- src/
       |   |   |-- app.ts
       |   |-- package.json
       |-- index.ts        <!--your current source code-->
       |-- package.json
       |-- m365agents.yml
   ```

1. Reorganize the folder structure as follows:

   ```
       |-- appPackage/
       |-- infra/
       |-- tab/           <!--tab app source code-->
       |   |-- src/
       |   |   |-- app.ts
       |   |-- package.json
       |-- bot/            <!--move your current source code to a new sub folder-->
       |   |-- index.ts
       |   |-- package.json
       |-- m365agents.yml
   ```

1. Update the following code in `m365agents.yml` and `m365agents.local.yml` files to align with the folder structure:

   ```yaml
       deploy:
         # Run npm command
         - uses: cli/runNpmCommand
           with:
             args: install --no-audit
             workingDirectory: ./bot
   ```

1. To configure the debug profile for your tab project, add the following code to the `tasks.json` file:

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

   For more information on how to configure the debug profile, see [sample app](https://github.com/OfficeDev/microsoft-365-agents-toolkit-samples/tree/dev/hello-world-bot-with-tab/.vscode).

1. To enable your tab project to work with Agents Toolkit, add the following actions to the `m365agents.local.yml` file:

   ```yaml
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

1. Select the **F5** key to debug your app locally.

### Provision app to Azure

To create a server-side tab app, you don't need to update your bicep files or Azure infrastructure. You can host your tab app in the same Azure App Service as your bot.

1. To provision an Azure Static Web App for your tab app, add the following code to your `azure.bicep` file:

   ```bicep
   @maxLength(20)
   @minLength(4)
   param resourceBaseName string
   param storageSku string
   param staticWebAppName string = resourceBaseName
    
   // Azure Static Web Apps that hosts your static web site
   resource swa 'Microsoft.Web/staticSites@2022-09-01' = {
     name: staticWebAppName
     // SWA do not need location setting
     location: 'centralus'
     sku: {
       name: staticWebAppSku
       tier: staticWebAppSku
     }
     properties: {}
   }
   var siteDomain = swa.properties.defaultHostname
   
   output AZURE_STATIC_WEB_APPS_RESOURCE_ID string = swa.id
   output TAB_DOMAIN string = siteDomain
   output TAB_ENDPOINT string = 'https://${siteDomain}'
   ```

1. To ensure that the necessary parameters are set correctly, update the `azure.parameters.json` file as follows:

   ```json
   {
     "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentParameters.json#",
     "contentVersion": "1.0.0.0",
     "parameters": {
       "resourceBaseName": {
         "value": "helloworld${{RESOURCE_SUFFIX}}"
       },
       "storageSku": {
         "value": "Free"
       },
     }
   }
   ```

1. To host your tab app in Azure Static Web Apps, define the `azureStaticWebApps/getDeploymentToken` action in your `m365agents.yml` file. The action relies on the `AZURE_STATIC_WEB_APPS_RESOURCE_ID`, an output of the bicep deployments. Add the following code after the `arm/deploy` action:

   ```yaml
    provision:
      ...
      - uses: arm/deploy
        ...
      # Add this action
      - uses: azureStaticWebApps/getDeploymentToken
        with:
          resourceId: ${{AZURE_STATIC_WEB_APPS_RESOURCE_ID}}
          writeToEnvironmentFile:
            deploymentToken: SECRET_TAB_SWA_DEPLOYMENT_TOKEN
      ...
   ```

1. Go to **View** > **Command Palette...** or select **Ctrl+Shift+P**.

1. Enter `Teams: Provision` command to apply the bicep to Azure.

1. To automate the build and deployment of your tab app, add the following `build` and `deploy` actions to your `m365agents.yml` file:

   ```yaml
     - uses: cli/runNpmCommand # Run npm command
       with:
         args: install
         workingDirectory: ./tab
     - uses: cli/runNpmCommand # Run npm command
       with:
         args: run build
         workingDirectory: ./tab
     # Deploy bits to Azure Storage Static Website
    - uses: cli/runNpxCommand
        name: deploy to Azure Static Web Apps
        with:
          args: '@azure/static-web-apps-cli deploy ./build -d ${{SECRET_TAB_SWA_DEPLOYMENT_TOKEN}} --env production'
   ```

1. Go to **View** > **Command Palette...** or select **Ctrl+Shift+P**.

1. Enter `Teams: Deploy` to deploy your tab app code to Azure.

1. Under **Run and Debug**, select **Launch Remote (Edge)** or **Launch Remote (Chrome)**.

1. Select the **F5** key to debug and preview your Teams app.

## Next step

> [!div class="nextstepaction"]
> [How-to guides for adding capabilities](add-how-to-guides-vsc.md#how-to-guides-for-adding-capabilities)

## See also

* [Add authentication and make a Graph API call](add-single-sign-on.md)
* [Set up CI/CD pipelines](use-CICD-template.md)
* [Call a backend API](https://github.com/OfficeDev/TeamsFx/wiki/How-to-integrate-Azure-Functions-with-your-Teams-app)
