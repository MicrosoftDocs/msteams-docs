---
title: Configure Outlook Add-in capability within your Teams app
author: surbhigupta
description: Learn to configure Outlook Add-in capability within your Teams app.
ms.author: v-preethah
ms.localizationpriority: medium
ms.topic: overview
ms.date: 02/16/2024
---

# Configure Outlook Add-in capability within your Teams app

The Outlook add-in for Microsoft Teams enhances collaboration and productivity by seamlessly integrating Teams functionality into the Outlook environment. Office Add-ins are web apps that extend the functionality of Outlook. The functionalities of an Outlook Add-in include:

* Read and write the content of an email, messages, meeting invitations, responses, cancellations, and appointments.
* Read properties of the user's mailbox.
* Respond automatically to events, such as sending an email.
* Integrate with external services including CRM and project management.
* Add custom ribbon buttons or menu items to perform specific tasks.

For more information, see [Outlook Add-ins Overview](/office/dev/add-ins/outlook/outlook-add-ins-overview).

## Prerequisites

To configure an Office Add-in as an additional capability, you must meet the following conditions:

* A Microsoft 365 account with subscriptions to both Microsoft 365 and Teams, to test the application. For example, an *.onmicrosoft.com account.

* Your Microsoft 365 account added as an account in desktop Outlook. For more information, see [add an email account to Outlook](https://support.microsoft.com/office/add-an-email-account-to-outlook-e9da47c4-9b89-4b49-b945-a204aeea6726).

* Azure account with Azure subscription to deploy the Teams app to Azure.
  If you don't have an Azure account, [create a free Azure account](https://azure.microsoft.com/free/).

## Overview

The following steps help you add an Outlook Add-in to a Teams app:

1. [Prepare the Teams app project](#prepare-the-teams-app-project).
1. [Create an Office Add-in project](#create-an-outlook-add-in-project) that is initially separate from your Teams app project.
1. [Merge the manifest](#merge-the-manifest) from the Outlook Add-in project into the unified Microsoft 365 manifest.
1. [Copy the Outlook Add-in files to the Teams app project](#copy-the-outlook-add-in-files-to-the-teams-app-project).
1. [Edit the tooling configuration files](#edit-the-tooling-configuration-files).
1. [Run the app and add-in locally at the same time](#run-the-app-and-add-in-locally-at-the-same-time).
1. [Move the application to Azure](#move-the-application-to-azure).

### Prepare the Teams app project

1. Add the source code for tab or bot into the respective subfolder.
1. Ensure to use the latest released version of Teams Toolkit to create a Teams app project. We recommend you to ensure the following folder structure for your project:

|-- .vscode/
|-- appPackage/
|-- build
|-- env/
|-- infra/
|-- node_modules/
|-- src/
|-- .gitignore
|-- .localConfigs
|-- .webappignore
|-- package-lock.json
|-- package.json
|-- teamsapp.local.yml
|-- teamsapp.yml
|-- tsconfig.json
|-- web.config

> [!NOTE]
> In a new Teams tab project, the `node_modules` folder and the `package-lock.json` file aren't present when you create the project. The `node_modules` is created when you run `npm install` in the root of the project. The build folder appears after you run a `build` script on the project.

1. Create a folder under the root named **tab** or **bot**.

    > [!NOTE]
    > In this guide, we assumes that the existing Teams app is a tab. If you work with a bot instead, replace **tab** with **bot** in all the instructions.

1. Copy the **infra** folder into the new subfolder.
1. Delete the **azure.parameters.json** file from the new tab/infra folder.

1. Move the `node_modules` and `src` folders into the new subfolder.

1. Move the `.webappignore`, `package-lock.json`, `package.json`, `tsconfig.json`, and `web.config` files into the new subfolder. For example:

|-- .vscode/
|-- appPackage/
|-- build
|-- env/
|-- infra/
|-- tab/
|-- |-- infra/
|-- |-- node_modules/
|-- |-- src/
|-- |-- .webappignore
|-- |-- package-lock.json
|-- |-- package.json
|-- |-- tsconfig.json
|-- |-- web.config
|-- .gitignore
|-- .localConfigs
|-- teamsapp.local.yml
|-- teamsapp.yml

1. In `package.json`, delete the script named `dev:teamsfx` from the `scripts` object.
   This script is added to a new package.json in the next step.

1. Create a new file named `package.json` in the root of the project and add the following code:

```json
{
    "name": "CombinedTabAndAddin",
    "version": "0.0.1",
    "author": "Contoso",
    "scripts": {
        "dev:teamsfx": "env-cmd --silent -f .localConfigs npm run start:tab",
        "build:tab": "cd tab && npm run build",
        "install:tab": "cd tab && npm install",
        "start:tab": "cd tab && npm run start",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "devDependencies": {
        "@microsoft/teamsfx-cli": "2.0.2-alpha.4f379e6ab.0",
        "@microsoft/teamsfx-run-utils": "alpha",
        "env-cmd": "^10.1.0",
        "office-addin-dev-settings": "^2.0.3",
        "ncp": "^2.0.0"
    }
}
```

1. Change the name, version, and author properties, as needed.
1. Open the `teamsapp.yml` file in the root of the project.
1. Update `ignoreFile: .webappignore` to `ignoreFile: ./tab/.webappignore`.
1. Open the `teamsapp.local.yml` file in the root of the project and replace `args: install --no-audit` to `args: run install:tab --no-audit`.
1. Open **TERMINAL** in Microsoft Visual Studio Code.
1. Navigate to the root of the project and run `npm install`.
   A new `node_modules` folder and a new `package.lock.json` file are created in the project root.
1. Run `npm run install:tab`.
   A new `node_modules` folder and a new `package.lock.json` file are created in the tab folder.
1. Ensure that you can custom upload the tab app with the following steps:

    1. In Visual Studio Code, open Teams Toolkit.
    1. In the **ACCOUNTS** section, ensure that you're signed into Microsoft 365.
    1. Select **View** > **Run**.
    1. In the **RUN AND DEBUG** dropdown menu, select **Debug in Teams (Edge)**.
    1. Select the F5 key.
       The project will build and run. This process will take a couple of minutes. Teams opens in browser with a prompt to add your tab app.

    > [!NOTE]
    > If you debug a Teams app for the first time on your computer, you will be prompted to install an SSL certificate. Select **Install** > **Yes** to the second prompt. Login to your Microsoft 365 account if prompted.

    1. Select **Add**.
    1. To stop debugging and uninstall the app, select **Run** > **Stop Debugging** in Visual Studio Code.

### Create an Outlook Add-in project

1. Open a new window in Visual Studio Code.
1. In the new window, select **Create a new app**.
1. In the **Select an option** dropdown, select **Outlook add-in** > **Taskpane**.
1. Select the folder where you want to create the add-in.
1. Provide a name to the project without any spaces when prompted.
   Teams Toolkit creates the project with basic files and scaffolding and opens it in a new Visual Studio Code window. You can use this project as a source for files and markup that you add to the Teams project.
1. Close the Outlook desktop if open and ensure that you can custom upload the project from Visual Studio Code with the following steps:

    1. In Visual Studio Code, open Teams Toolkit.
    1. In the **ACCOUNTS** section, ensure that you're signed into Microsoft 365.
    1. Select **View** > **Run**.
    1. In the **RUN AND DEBUG** dropdown menu, select **Debug in Teams (Edge)**.
    1. Select the F5 key.
       The project will build and run. This process will take a couple of minutes. Teams opens in browser with a prompt to add your tab app.
    1. Open the **Inbox** of your Microsoft 365 account identity and open any message.
       A **Contoso Add-in** tab with two buttons appear on the **Home** ribbon (or the **Message** ribbon, if you opened the message in its own window).
    1. Select the **Show Taskpane** button.
       A task pane opens.
    1. Select the **Perform an action** button.
       A small notification appears near the top of the message.
    1. To stop debug and uninstall the add-in, select **Run** > **Stop Debugging** in Visual Studio Code. If the Webpack dev-server window doesn't close, open the Visual Studio Code **TERMINAL** in the root of the project and run `npm stop`.

### Merge app manifest

App manifest (previously called Teams app manifest) is generated at debug and custom app upload from the `manifest.json` file in the `\appPackage` folder of the Teams project. The following steps help you to merge the app manifest:

1. Copy the `$schema` and `manifestVersion` property values from the add-in's manifest and update the respective properties in the `manifest.json` file.
1. Update the values of `name.full`, `description.short`, and `description.full` properties if necessary to take account of the fact that an Outlook add-in is part of the app.
1. Update the value of `name.short` property.
   We recommend you keep the `${{TEAMSFX_ENV}}` variable on the end of the name. This variable is replaced with `local` when you debug on localhost and with `dev` when you debug either from a remote domain or in production mode.

   The following property is an example:

   `"short": "Contoso Tab and Add-in-${{TEAMSFX_ENV}}",`

   > [!NOTE]
   > The `name.short` value appears in both the Teams tab capability and Outlook add-in.
   > For example:
      * The value is the label under the launch button of the Teams tab.
      * The value is the content in the title bar of the add-in's task pane.

1. If you changed the `name.short` value from the default value, which is the name of the project followed by the `${{TEAMSFX_ENV}}` variable, change the value in all places where the project name appears in the `teamsapp.yml` and `teamsapp.local.yml` files in the root of the project.
1. If there's no `authorization.permissions.resourceSpecific` array in the app manifest file, copy it from the add-in manifest as a top-level property. If this array is present in app manifest, copy any objects from the array in the add-in manifest to the array in the Teams template. The following code is an example:

```json
"authorization": {
    "permissions": {
        "resourceSpecific": [
            {
                "name": "MailboxItem.Read.User",
                "type": "Delegated"
            }
        ]
    }
},
```

1. In the `env/.env.local` file, add the following code after the`TAB_DOMAIN` and `TAB_ENDPOINT` variables:

   ```json
   ADDIN_DOMAIN=localhost:3000
   ADDIN_ENDPOINT=https://localhost:3000
   ```

1. In the `env/.env.dev` file, add the following line after the `TAB_ENDPOINT` variable:

   ```json
   ADDIN_ENDPOINT=
   ```

1. In the app manifest file, add the placeholder `"${{ADDIN_DOMAIN}}"`, before the `validDomains` array.
   Teams Toolkit replaces the placeholder with a localhost domain when you develop the app locally. When you deploy the app to staging or production as described in [Move the application to Azure](#move-the-application-to-azure), Teams Toolkit replaces the placeholder with staging or production URI. The following code is an example:

   ```json
   "validDomains": [
       "${{ADDIN_DOMAIN}}",
       
       // other domains or placeholders
   ],
   ```

1. Copy the `extensions` property from the add-in's manifest into the app manifest file as a top-level property.

### Copy Outlook Add-in files to Teams app project

1. Create a top-level folder called `add-in` in the Teams app project.
1. Copy the following files and folders from the add-in project to the `add-in` folder of the Teams app project:

   * /appPackage
   * /infra
   * /src
   * .eslintrc.json
   * babel.config.json
   * package-lock.json
   * package.json
   * tsconfig.json
   * webpack.config.js

1. After copying the files and folders, delete the `manifest.json` file in the `/add-in/appPackage` folder.
   Your Teams app project folder structure should look like the following folder structure:

   |-- .vscode/
   |-- add-in/
   |-- |-- appPackage/assets/
   |-- |-- infra/
   |-- |-- src/
   |-- |-- .eslintrc.json
   |-- |-- babel.config.json
   |-- |-- package-lock.json
   |-- |-- package.json
   |-- |-- tsconfig.json
   |-- |-- webpack.config.js
   |-- appPackage/
   |-- build\appPackage/
   |-- env/
   |-- infra/
   |-- node_modules/
   |-- tab/
   |-- |-- infra/
   |-- |-- node_modules/
   |-- |-- src/
   |-- |-- .webappignore
   |-- |-- package-lock.json
   |-- |-- package.json
   |-- |-- tsconfig.json
   |-- |-- web.config
   |-- .gitignore
   |-- .localConfigs
   |-- package.json
   |-- teamsapp.local.yml
   |-- teamsapp.yml

### Edit tooling configuration files

1. Open the `package.json` file from the root of the project.
1. Add the following scripts to the `scripts` object:

   ```json
   "install:add-in": "cd add-in && npm install",
   "postinstall": "npm run install:add-in && npm run install:tab",
   "build:add-in": "cd add-in && npm run build",
   "build:add-in:dev": "cd add-in && npm run build:dev",
   "build": "npm run build:tab && npm run build:add-in",
   ```

1. Open the `package.json` file in the add-in folder.
1. The scripts in the `scripts` object should look like:

    ```json
    "start": "office-addin-debugging start appPackage/manifest.json",
    "stop": "office-addin-debugging stop appPackage/manifest.json",
    "validate": "office-addin-manifest validate appPackage/manifest.json",
    ```

1. In the `start` script, replace `appPackage/manifest.json` to `../appPackage/build/appPackage.local.zip`. For example:

    ```json
    "start": "office-addin-debugging start ../appPackage/build/appPackage.local.zip",
    ```

1. In the `validate` and `stop` scripts, update the parameter to `../appPackage/build/manifest.local.json`. For example:

    ```json
    "stop": "office-addin-debugging stop ../appPackage/build/manifest.local.json",
    "validate": "office-addin-manifest validate ../appPackage/build/manifest.local.json",
    ```

1. In Visual Studio Code, open the **TERMINAL**.
1. Navigate to the `add-in` folder and run the command `npm install`.
1. In the `add-in` folder, open the `webpack.config.js` file.
1. Replace `from: "appPackage/manifest*.json",` to `from: "../appPackage/build/manifest*.json",`.
1. In the root of project, open the `teamsapp.local.yml` file and find the provision section. Use the # character to comment out the lines that validate the manifest template. This is necessary because the manifest validation system isn't yet compatible with the changes you made to the manifest template. The following code is an example of how the lines should look like when updated:

   ```json
     # - uses: teamsApp/validateManifest
     #   with:
     #     # Path to manifest template
     #     manifestPath: ./appPackage/manifest.json 
   ```

   Ensure to comment only in the `teamsApp/validateManifest` section and not in the `teamsManifest/validateAppPackage` section.

1. Open the `teamsapp.yml` file and add the following lines in `provision` and `publish` sections:

   ```json
     # - uses: teamsApp/validateManifest
     #   with:
     #     # Path to manifest template
     #     manifestPath: ./appPackage/manifest.json 
   ```

1. Open the `.vscode\tasks.json` file in the add-in project and copy all the tasks in the `tasks` array.
1. Open the `.vscode\tasks.json` file in the Teams app project and copy all the tasks in the `tasks` array.
   Don't remove any of the existing tasks  and ensure that all the tasks are separated by commas.

1. In each of the task objects you copied, add the following `options` property to ensure that these tasks run in the add-in folder.

   ```json
   "options": {
       "cwd": "${workspaceFolder}/add-in/"
   }
   ```

   The following code sample is an example when you update the `Debug: Outlook Desktop` task:

   ```json
   {
       "label": "Debug: Outlook Desktop",
       "type": "npm",
       "script": "start",
       "dependsOn": [
         "Check OS",
         "Install"
       ],
       "presentation": {
         "clear": true,
         "panel": "dedicated",
       },
       problemMatcher": [],
       "options": {
           "cwd": "${workspaceFolder}/add-in/"
       }
   }
   ```

1. Add the following task to the `tasks` array in the `.vscode\tasks.json` file of the project:

   ```json
   {
       // Create the debug resources.
       // See https://aka.ms/teamsfx-tasks/provision to know the details and how to customize the args.
       "label": "Create resources",
       "type": "teamsfx",
       "command": "provision",
       "args": {
           "template": "${workspaceFolder}/teamsapp.local.yml",
           "env": "local"
       }
   },
   ```

1. Add the following task to the `tasks` array:

   ```json
   {
       "label": "Start Add-in Locally",
       "dependsOn": [
           "Create resources",
            "Debug: Outlook Desktop"
       ],
       "dependsOrder": "sequence"
   },
   ```

   This task adds a `Start Add-in Locally` task that combines the tab app's `Create resources` task with the add-in's `debugging` task and specifies that these tasks must run in the order.

1. Add the following task to the `tasks` array:

   ```json
    {
        "label": "Start App and Add-in Locally",
        "dependsOn": [
            "Start Teams App Locally",
            "Start Add-in Locally"
        ],
        "dependsOrder": "sequence"
    },
   ```

   This task combines the `Start Teams App Locally` task with `Start Add-in Locally` and specifies that these tasks must run in the order.
1. Open the `.vscode\launch.json` file in the project, which configures the **RUN AND DEBUG** UI in Visual Studio Code and add the following objects before the `configurations` array.

   ```json
   {
       "name": "Launch Add-in Outlook Desktop (Edge Chromium)",
       "type": "msedge",
       "request": "attach",
       "port": 9229,
       "timeout": 600000,
       "webRoot": "${workspaceRoot}",
       "preLaunchTask": "Start Add-in Locally",
       "postDebugTask": "Stop Debug"
   },
   {
       "name": "Launch App and Add-in Outlook Desktop (Edge Chromium)",
       "type": "msedge",
       "request": "attach",
       "port": 9229,
       "timeout": 600000,
       "webRoot": "${workspaceRoot}",
       "preLaunchTask": "Start App and Add-in Locally",
       "postDebugTask": "Stop Debug"
   },
   ```

1. In the `compounds` section of the `.vscode\launch.json` file, rename the `Debug in Teams (Edge)` compound to `Launch App Debug (Edge)`.
1. Rename the `Debug in Teams (Chrome)` compound to `Launch App Debug (Chrome)`.
1. Ensure that you can custom upload the add-in capability of the Teams app to Outlook with the following steps:

    1. Ensure that Outlook desktop is closed.
    1. In Visual Studio Code, open the Teams Toolkit.
    1. In the **ACCOUNTS** section, ensure that you're signed into Microsoft 365.
    1. Select **View** > **Run** in Visual Studio Code.
    1. In the **RUN AND DEBUG** dropdown menu, select the option, **Launch Add-in Outlook Desktop (Edge Chromium)**.
    1. Select the F5 key.
       The project builds and a Webpack dev-server window opens. This process will take a couple of minutes. Eventually, Outlook desktop opens.
    1. Open the Inbox of your Microsoft 365 account identity and open any message.
       A **Contoso Add-in** tab with two buttons appear on the **Home** ribbon or the **Message** ribbon, if you've opened the message in its own window.
    1. Select the **Show Taskpane** button.
       A task pane opens.
    1. Select the **Perform an action** button.
       A small notification appears near the top of the message.
    1. To stop debugging and uninstall the add-in, select **Run** > **Stop Debugging** in Visual Studio Code.
       If the Webpack dev-server window doesn't close, open the Visual Studio Code **TERMINAL** in the root of the project and run `npm stop`.

### Run the app and add-in locally at the same time

You can custom app upload and run the app and the add-in simultaneously, but the debugger can't reliably attach when both are running. So to debug, run only one at a time.

To debug the app, see the last step of the Prepare the Teams app project above.

To debug the add-in, see the last step of the Edit the tooling configuration files above.

To see both the app and the add-in running at the same time, take the following steps.

1. First, make sure Outlook desktop is closed.
1. In Visual Studio Code, open the Teams Toolkit.
1. In the **ACCOUNTS** section, verify that you're signed into Microsoft 365.
1. Select **View** > **Run** in Visual Studio Code. In the RUN AND DEBUG drop-down menu, select the option, Launch App and Add-in Outlook Desktop (Edge Chromium), and then press F5. The project builds and a Webpack dev-server window opens to host the add-in. The tab app is hosted in the Visual Studio Code terminal. This process will take a couple of minutes. Eventually, both of the following will happen:
    * Teams opens in a browser with a prompt to add your tab app. If Teams hasn't opened by the time Outlook desktop opens, then automatic sideloading has failed. You can manually sideload it to see both the app and the add-in running at the same time. For sideloading instructions, see Upload your app in Teams. You find the manifest.zip file to upload at `C:\Users\{yourname}\AppData\Local\Temp`.
    * Outlook desktop opens.
1. In the Teams prompts, select Add and the tab will open.
1. In Outlook, open the Inbox of your Microsoft 365 account identity and open any message. A Contoso Add-in tab with two buttons appear on the Home ribbon (or the Message ribbon, if you have opened the message in its own window).
1. Select the Show Taskpane button and a task pane opens. Select the Perform an action button and a small notification appears near the top of the message.
1. To stop debugging and uninstall the add-in, select Run | Stop Debugging in Visual Studio Code. If the Webpack dev-server window doesn't close, open the Visual Studio Code TERMINAL in the root of the project and run `npm stop`.
1. If you had to manually sideload the Teams Tab app, [remove your app from Teams](../concepts/deploy-and-publish/apps-upload.md#remove-your-app).

### Move the application to Azure

1. Open the teamsapp.yml file in the root of the project and find the line `deploymentName: Create-resources-for-tab`. Change it to `deploymentName: Create-resources-for-tab-and-addin`.

1. In the same file, add the following code to the end of the provision: section. Note that indentation is meaningful in YAML, so - uses and - name statements should be indented 2 spaces, with statements should be aligned with uses, and the children of with should be indented a further 2 spaces.

```yml
provision:

  -- other YAML omitted --

  - uses: azureStorage/enableStaticWebsite
    with:
      storageResourceId: ${{ADDIN_AZURE_STORAGE_RESOURCE_ID}}
      indexPage: index.html
      errorPage: error.html
```

1. In the same file, replace the entire `deploy:` section with the following code. These changes take account of the new folder structure and the fact that both add-in and tab files need to be deployed.

```json
deploy:
  - name: InstallAllCapabilities
    uses: cli/runNpmCommand # Run npm command
    with:
      args: install

  - name: BuildAllCapabilities
    uses: cli/runNpmCommand # Run npm command
    with:
      args: run build --if-present

  - name: DeployTab
    uses: azureAppService/zipDeploy
    with:
      artifactFolder: tab
      ignoreFile: ./tab/.webappignore
      # The ID of the cloud resource where the tab app will be deployed.
      # This key will be generated by arm/deploy action automatically.
      resourceId: ${{TAB_AZURE_APP_SERVICE_RESOURCE_ID}} 

  - name: DeployAddin
    uses: azureStorage/deploy
    with:
      workingDirectory: .
      # Deploy base folder
      artifactFolder: add-in/dist
      # The ID of the cloud resource where the add-in will be deployed.
      resourceId: ${{ADDIN_AZURE_STORAGE_RESOURCE_ID}}
```

1. Open the infra/azure.parameters.json file in the root of the project and replace its contents with the following JSON:

```json
{
    "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentParameters.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
      "resourceBaseName": {
        "value": "tabandaddin${{RESOURCE_SUFFIX}}"
      },
      "webAppSku": {
        "value": "F1"
      },
      "storageSku": {
        "value": "Standard_LRS"
      }
    }
}
```

1. Open the infra/azure.bicep file in the root of the project (not the one in either the tab or add-in subfolders) and replace its contents with the following.

```json
// Params for Teams tab resources
@maxLength(20)
@minLength(4)
@description('Used to generate names for all resources in this file')
param resourceBaseName string
param webAppSku string
param serverfarmsName string = resourceBaseName
param webAppName string = resourceBaseName
param location string = resourceGroup().location
param storageSku string
param storageName string = resourceBaseName

module tabModule '../tab/infra/azure.bicep' = {
  name: 'tabModule'
  params: {
    resourceBaseName: resourceBaseName
    webAppSku: webAppSku
    serverfarmsName: serverfarmsName
    webAppName: webAppName
    location: location
  }
}

module addinModule '../add-in/infra/azure.bicep' = {
  name: 'addinModule'
  params: {
    resourceBaseName: resourceBaseName
    storageSku: storageSku
    storageName: storageName
    location: location
  }
}

// The output will be persisted in .env.{envName}. Visit https://aka.ms/teamsfx-actions/arm-deploy for more details.
output TAB_AZURE_APP_SERVICE_RESOURCE_ID string = tabModule.outputs.TAB_AZURE_APP_SERVICE_RESOURCE_ID // used in deploy stage
output TAB_DOMAIN string = tabModule.outputs.TAB_DOMAIN
output TAB_ENDPOINT string = tabModule.outputs.TAB_ENDPOINT

output ADDIN_AZURE_STORAGE_RESOURCE_ID string =  addinModule.outputs.ADDIN_AZURE_STORAGE_RESOURCE_ID// used in deploy stage
output ADDIN_DOMAIN string = addinModule.outputs.ADDIN_DOMAIN
output ADDIN_ENDPOINT string = addinModule.outputs.ADDIN_ENDPOINT
```

1. In Visual Studio Code, open the Teams Toolkit and in the **ACCOUNTS** section be sure you're signed into your Azure account (in addition to being signed into your Microsoft 365 account). For more information about signing in, see [Create Azure resources to host a Teams tab app](/training/modules/teams-toolkit-vsc-deploy-apps/03-create-azure-resources-exercise) and scroll to the **Sign in to Azure in Teams Toolkit** section.

1. In the **LIFECYCLE** section of Teams Toolkit, select **Provision**. It will take several minutes. You will be prompted to select one of your Azure resource groups.

1. When provisioning completes, select **Deploy** to deploy your app code to Azure.

### Run the tab capability from the remote deployment

1. Select **View** > **Run** in Visual Studio Code and in the drop down, select one of the following:

    * Launch Remote in Teams (Edge)
    * Launch Remote in Teams (Chrome)

1. Press F5 to preview your Teams tab capability.

### Run the add-in capability from the remote deployment

1. Copy the production URL from the ADDIN_ENDPOINT in env/.env.dev file.

1. Edit \add-in\webpack.config.js file and change `urlProd` constant value to the value you copied. Be sure to add a '/' at the end of the URL.

In the Visual Studio Code TERMINAL, navigate to the root of the project, and then run `npm run build:add-in`.

Copy the file \add-in\dist\manifest.dev.json to the \appPackage folder.

Rename the copy in the \appPackage folder to "manifest.addinPreview.json".

In the TERMINAL, run `npx office-addin-dev-settings sideload .\appPackage\manifest.addinPreview.json`. This process will take a couple of minutes. Eventually, Outlook desktop opens. (If you're prompted to install `office-addin-dev-settings`, respond "yes".)

Open the Inbox of your Microsoft 365 account identity and open any message. A **Contoso Add-in** tab with two buttons appear on the **Home** ribbon (or the **Message** ribbon, if you opened the message in its own window).

Select the **Show Taskpane** button and a task pane opens. Select the **Perform an action button** and a small notification appears near the top of the message.
