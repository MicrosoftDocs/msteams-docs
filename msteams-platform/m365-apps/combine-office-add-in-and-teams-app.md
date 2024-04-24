---
title: Add an Outlook Add-in to a Teams app
description: Learn how to add an Outlook Add-in to a Teams app. This article will walk you through the steps to add an Outlook Add-in to a Teams app, test it, then deploy it to Azure.
ms.date: 02/15/2024
ms.author: mosdevdocs
author: rickki
ms.topic: tutorial
ms.localizationpriority: medium
ms.subservice: m365apps
---

# Add an Outlook Add-in to a Teams app

## Introduction

[Outlook Add-ins](/office/dev/add-ins/outlook/outlook-add-ins-overview) are web apps that extend the functionality of Outlook. With an Outlook Add-in, you can:

- Read and write email messages and engage in meeting invitations, responses, cancellations, and appointments.
- Read properties of the user's mailbox.
- Respond to events automatically, such as sending an email.
- Integrate with external services including CRM and project management tools.
- Add custom ribbon buttons or menu items to perform specific tasks.

Integrating an Outlook Add-in with a Teams application enables scenarios that neither of them could achieve independently. Consider a scenario where a salesperson can insert a customized discount in an email to a customer and record the offer in a backend database. The sales manager can also view data about all the discounts that have been offered in a Teams tab. For more information, see [Discount Offers sample](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-add-in-combined/nodejs).

[Outlook Add-ins Overview](/office/dev/add-ins/outlook/outlook-add-ins-overview) provides information about the capabilities of Outlook Add-ins, how they are structured, how they improve on older ways of extending Outlook, what platforms the add-in can run on (Windows, Mac, mobile, and the web), and how to get started creating one.

This article will walk you through the steps to add an Outlook Add-in to a Teams app, test it, then deploy it to Azure.

## Prerequisites 

Before you start, ensure that you meet the following requirements: 

- A Microsoft 365 account that includes Teams to test the application. Alternatively, you can have separate subscriptions to both Microsoft 365 and Teams. For example, a test account with *.onmicrosoft.com through the [Microsoft 365 Developer Program](/office/developer-program/microsoft-365-developer-program). 
- Your Microsoft 365 account is added as an account in desktop Outlook. For more information, see [add an email account to Outlook](https://support.microsoft.com/office/add-an-email-account-to-outlook-e9da47c4-9b89-4b49-b945-a204aeea6726).
 - An Azure account with active subscription to deploy the Teams app to Azure. If you don't have one, you can create your [free Azure account](https://azure.microsoft.com/free/).
 - A Teams app created using the latest version of Teams Toolkit.

## Add an Outlook Add-in to a Teams app

To add an Outlook Add-in to a Teams app:

1. [Prepare the Teams app project](#prepare-the-teams-app-project)
1. [Create an Office Add-in project](#create-an-outlook-add-in-project) that is initially separate from your Teams app project.
1. [Merge the manifest](#merge-the-manifest) from the Outlook Add-in project into the unified manifest for Microsoft 365.
1. [Copy the Outlook Add-in files to the Teams app project](#copy-the-outlook-add-in-files-to-the-teams-app-project).
1. [Edit the tooling configuration files](#edit-the-tooling-configuration-files).
1. [Run the app and add-in locally at the same time](#run-the-app-and-add-in-locally-at-the-same-time)
1. [Move the application to Azure](#move-the-application-to-azure).

### Prepare the Teams app project

Begin by separating the source code for the tab (or bot) into its own subfolder. These instructions assume that the project initially has the following structure. To create a Teams app project with this structure, use the latest Teams Toolkit version. 

```
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
```

> [!NOTE]
> If you're working with a new Teams tab project, the node_modules folder and the package-lock.json file isn't present. The node_modules is created in a later step when you run `npm install` in the root of the project. The build folder isn't present unless and until you run a build script on the project. 

To separate the source code for the tab or bot, perform the following steps:

1. Create a folder under the root named **tab** (or **bot**).

    > [!NOTE]
    > For simplicity, the remainder of this article assumes that the existing Teams app is a tab. If you started with a bot, replace "tab" with "bot" in all of these instructions, including the content you add or edit in various files. 

1. Copy the **infra** folder into the new subfolder, and then delete the `azure.parameters.json` file from the new **tab** > **infra** folder.
1. Move the **node_modules** and **src** folders into the new subfolder.
1. Move the `.webappignore`, `package-lock.json`, `package.json`, `tsconfig.json`, and `web.config` files into the new subfolder. 

    ```
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
    ```

1. In the `package.json` that you just moved to the tab folder, delete the script named `dev:teamsfx` from the `scripts` object. This script is added to a new `package.json` in the next step.
1. Create a new file named `package.json` in the root of the project and add the following content:

    ```
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

1. Change the `name`, `version`, and `author` properties, as needed.
1. Open the `teamsapp.yml` file in the root of the project, find the line `ignoreFile: .webappignore`, and change it to `ignoreFile: ./tab/.webappignore`.
1. Open the `teamsapp.local.yml` file in the root of the project, find the line `args: install --no-audit`, and change this to `args: run install:tab --no-audit`.
1. Open **TERMINAL** in Visual Studio Code. Navigate to the root of the project and run `npm install`. A new `node_modules` folder and a new `package.lock.json` file are created in the project root. 
1. Next run `npm run install:tab`. A new `node_modules` folder and a new `package.lock.json` file are created in the tab folder, if they aren't there already. 
1. Verify that you can sideload the tab with the following steps:

    1. Open Teams Toolkit. 
    1. In the **ACCOUNTS** section, verify that you're signed in to Microsoft 365 account.
    1. Select **View** > **Run** in Visual Studio Code.
    1. In the **RUN AND DEBUG** dropdown menu, select **Debug in Teams (Edge)** and press F5. 
	
	    The project builds and runs. This process can take a couple of minutes. When it completes, Teams opens in a browser with a prompt to add your tab app.

        > [!NOTE]
        > If this is the first time you've debugged a Teams app on this computer, you're prompted to install an SSL certificate. Select **Install** and then **Yes** to the second prompt. Login to your Microsoft 365 account if you're prompted to do so.

    1. Select **Add**.
    1. To stop debugging and uninstall the app, select **Run** > **Stop Debugging** in Visual Studio Code.

### Create an Outlook Add-in project

1. Open a second instance of Visual Studio Code.
1. Select Teams Toolkit from the **Activity Bar**.
1. Select **Create a new app**.
1. In the **Select an option** dropdown menu, select **Outlook add-in** > **Taskpane**.
1. Select the folder where you want to create the add-in.
1. Give a name (with no spaces) to the project when prompted.

    Teams Toolkit creates the project with basic files and scaffolding and opens it in a new Visual Studio Code window. You will use this project as a source for files and markup that you add to the Teams project.
    
1. Although you won't be developing this project, perform the following steps to verify that it can be sideloaded from Visual Studio Code before you continue:

    1. Make sure Outlook desktop is closed.
    1. Open Visual Studio Code.
    1. Select Teams Toolkit from the **Activity Bar**.
    1. In the **ACCOUNTS** section, verify that you're signed into Microsoft 365.
    1. Select **View** > **Run** in Visual Studio Code. 
    1. In the **RUN AND DEBUG** dropdown menu, select **Outlook Desktop (Edge Chromium)** and press F5. 

       The project builds and a Webpack dev-server window opens. This process can take a couple of minutes and opens an Outlook desktop window.

    1. Go to Outlook.
    1. Open the **Inbox** *of your Microsoft 365 account identity*.
    1. Open any message. 

        A **Contoso Add-in** tab with two buttons appears on the **Home** ribbon (or the **Message** ribbon, if you open the message in its own window).

    1. Select the **Show Taskpane** button. A task pane opens. 
    1. Select the **Perform an action** button. A small notification appears near the top of the message.
    1. To stop debugging and to uninstall the add-in, select **Run** > **Stop Debugging** in Visual Studio Code. If the Webpack dev-server window doesn't close, open the Visual Studio Code **TERMINAL** in the root of the project and run `npm stop`.

### Merge the manifest

The Teams app's manifest is generated at debug-and-sideload time (or build time) from the `manifest.json` file in the **\appPackage** folder of the Teams project. This file is a **template** for a manifest. In this article, it's referred to as the *template* or *manifest template*. Most of the markup is hardcoded into the template, but there are also some configuration files that contain data that gets added to the final generated manifest. In this procedure, perform the following tasks:

- Copy markup from the add-in's manifest to the Teams app's manifest template.
- Edit the configuration files. 

Unless specified otherwise, the file you change is `\appPackage\manifest.json`.

1. Copy the "$schema" and "manifestVersion" property values from the add-in's manifest to the corresponding properties of the Teams app's manifest template file.
1. Modify the "name.full", "description.short", and "description.full" property values as required to reflect the fact that an Outlook add-in is part of the app. 
1. Do the same for the "name.short" value. 

    We recommend that you keep the `${{TEAMSFX_ENV}}` on the end of the name. This variable is replaced with the string "local" when you're debugging on localhost and with "dev" when you're either debugging from a remote domain or in production mode. 
    
    > [!NOTE]
    > Historically, Office Add-in developer documentation uses the term "dev" or "dev mode" to refer to running the add-in on a localhost. It uses the term "prod" or "production mode" to refer to running the add-in on a remote host for staging or production. Teams developer documentation uses the term "local" to refer to running the add-in on a localhost, and the term "dev" to refer to running the add-in on a remote host for remote debugging, which is usually called "staging." We're working on getting the terminology consistent.

    The following JSON is an example:

    ```
    "short": "Contoso Tab and Add-in-${{TEAMSFX_ENV}}",
    ```

    > [!NOTE]
    > The "name.short" value appears in both the Teams tab capability and the Outlook add-in. Here are a few examples: 
    >
    > - It is the label under the launch button of the Teams tab.
    > - It is content of the title bar of the add-in's task pane.

1. If you changed the "name.short" value from its default (which is the name of the project followed by the `${{TEAMSFX_ENV}}` variable), make exactly the same change in all places where the project name appears in the following two files in the root of the project: teamsapp.yml and teamsapp.local.yml.
1. If there's no "authorization.permissions.resourceSpecific" array in the Teams manifest template, copy it from the add-in manifest as a top-level property. If there already is one in the Teams template, copy any objects from the array in the add-in manifest to the array in the Teams template. The following JSON is an example:

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

1. In the `env/.env.local` file, find the lines that assign values to the `TAB_DOMAIN` and `TAB_ENDPOINT` variables. Add the following lines immediately below them:

    ```
    ADDIN_DOMAIN=localhost:3000
    ADDIN_ENDPOINT=https://localhost:3000
    ```

1. In the `env/.env.dev` file, add the following line below the `TAB_ENDPOINT=` ... line:

    ```
    ADDIN_ENDPOINT=
    ```

1. In the Teams manifest template, add the placeholder `"${{ADDIN_DOMAIN}}",` to the top of the `"validDomains"` array. The Teams Toolkit replaces this with a localhost domain when you're developing locally. When you deploy the finished combined app to staging or production as described in [Move the application to Azure](#move-the-application-to-azure), Teams Toolkit replaces the placeholder with the staging/production URI. The following JSON is an example:

    ```json
    "validDomains": [
        "${{ADDIN_DOMAIN}}",
        
        // other domains or placeholders
    ],
    ```

1. Copy the entire "extensions" property from the add-in's manifest into the Teams app manifest template as a top-level property.

### Copy the Outlook Add-in files to the Teams app project

1. Create a top-level folder called **add-in** in the Teams app project.
1. Copy the following files and folders from the add-in project to the **add-in** folder of the Teams app project.

    - /appPackage
    - /infra
    - /src
    - .eslintrc.json
    - babel.config.json
    - package-lock.json
    - package.json
    - tsconfig.json
    - webpack.config.js

1. When you've finished copying, delete the `manifest.json` file in the **/add-in/appPackage** folder.

    Your folder structure must now look like the following example:

    ```
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
    ```

### Edit the tooling configuration files

1. Open the `package.json` file in the root of the project.
1. Add the following scripts to the "scripts" object:

    ```
    "install:add-in": "cd add-in && npm install",
    "postinstall": "npm run install:add-in && npm run install:tab",
    "build:add-in": "cd add-in && npm run build",
    "build:add-in:dev": "cd add-in && npm run build:dev",
    "build": "npm run build:tab && npm run build:add-in",
    ```

1. Open the `package.json` file in the **add-in** folder (not the **tab** folder or the root of the project). 
1. Three of the scripts in the `scripts` object have a `manifest.json` parameter as in the following examples: 

    ```
    "start": "office-addin-debugging start appPackage/manifest.json",
    "stop": "office-addin-debugging stop appPackage/manifest.json",
    "validate": "office-addin-manifest validate appPackage/manifest.json",
    ```

    In the `start` script, change `appPackage/manifest.json` to `../appPackage/build/appPackage.local.zip`. When you're done, the line must look like this:

    ```
    "start": "office-addin-debugging start ../appPackage/build/appPackage.local.zip",
    ```

    In the `validate` and `stop` scripts, change the parameter to `../appPackage/build/manifest.local.json`. When you're done, the updates must look like this:

    ```
    "stop": "office-addin-debugging stop ../appPackage/build/manifest.local.json",
    "validate": "office-addin-manifest validate ../appPackage/build/manifest.local.json",
    ```

1. In Visual Studio Code, open **TERMINAL**. 
1. Navigate to the **add-in** folder and run the command `npm install`. 
1. In the **add-in** folder, open the `webpack.config.js` file. 
1. Change the line `from: "appPackage/manifest*.json",` to `from: "../appPackage/build/manifest*.json",`.
1. In the root of the project, open the `teamsapp.local.yml` file and find the `provision` section. Use the `#` character to comment out the lines that validate the manifest template. This is necessary because the Teams manifest validation system is not yet compatible with the changes you made to the manifest template. When you're done, the lines should look like the following code:

    ```
    # - uses: teamsApp/validateManifest
    #   with:
    #     # Path to manifest template
    #     manifestPath: ./appPackage/manifest.json 
    ```

    Be careful to comment out only the `teamsApp/validateManifest` section. Don't comment out the `teamsManifest/validateAppPackage` section.

1. Repeat the preceding step for the `teamsapp.yml` file. The three lines are found in both the `provision` and the `publish` sections. Comment them out in both places.
1. Open the `.vscode\tasks.json` file in the **add-in** project and copy all of the tasks in the `tasks` array. Add them to `tasks` array of the same file in the Teams project. Don't remove any of the tasks that are already there. Be sure all tasks are separated by commas. 
1. In each of the task objects that you just copied, add the following `options` property to ensure that these tasks run in the **add-in** folder.

    ```
    "options": {
        "cwd": "${workspaceFolder}/add-in/"
    }
    ```

    For example, the `Debug: Outlook Desktop` task must appear like the following JSON when you're done. 

    ```
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

1. Add the following task to the tasks array in the `.vscode\tasks.json` file of the project. Among other things, this task creates the final manifest.

    ```
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

1. Add the following task to the tasks array. Note that it adds a `Start Add-in Locally` task that combines the tab app's `Create resources` task with the add-in's debugging task and specifies that they must run in that order.

    ```
    {
        "label": "Start Add-in Locally",
        "dependsOn": [
            "Create resources",
            "Debug: Outlook Desktop"
        ],
        "dependsOrder": "sequence"
    },
    ```

1. Add the following task to the tasks array. It combines the `Start Teams App Locally` task with the `Start Add-in Locally` and specifies that they must run in that order.

   ```
    {
        "label": "Start App and Add-in Locally",
        "dependsOn": [
            "Start Teams App Locally",
            "Start Add-in Locally"
        ],
        "dependsOrder": "sequence"
    },
   ```

1. Open the `.vscode\launch.json` file in the project, which configures the **RUN AND DEBUG** UI in Visual Studio Code and add the following two objects to the top of the "configurations" array.

    ```
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

1. In the `compounds` section of the same file, rename the `Debug in Teams (Edge)` compound to `Launch App Debug (Edge)` and rename the `Debug in Teams (Chrome)` compound to `Launch App Debug (Chrome)`.

1. Verify that you can sideload the add-in capability of the Teams app to Outlook with the following steps:

      1. Make sure the Outlook desktop is closed.
      1. Open Visual Studio Code.
      1. Select Teams Toolkit from the **Activity Bar**.
      1. In the **ACCOUNTS** section, verify that you're signed into Microsoft 365.
      1. Select **View** > **Run** in Visual Studio Code. 
      1. In the **RUN AND DEBUG** dropdown menu, select **Launch Add-in Outlook Desktop (Edge Chromium)** and press F5. 
         The project builds and a Webpack dev-server window opens. This process can take a couple of minutes and opens an Outlook desktop window.
      1. Go to Outlook.
      1. Open the **Inbox** *of your Microsoft 365 account identity*.
      1. Open any message. 
      
          A **Contoso Add-in** tab with two buttons appears on the **Home** ribbon (or the **Message** ribbon, if you open the message in its own window).

      1. Select the **Show Taskpane** button. A task pane opens. 
      1. Select the **Perform an action** button. A small notification appears near the top of the message.
      1. To stop debugging and to uninstall the add-in, select **Run** > **Stop Debugging** in Visual Studio Code. If the Webpack dev-server window doesn't close, open the Visual Studio Code **TERMINAL** in the root of the project and run `npm stop`.

### Run the app and add-in locally at the same time

You can sideload and run the app and the add-in simultaneously, but the debugger can't reliably attach when both are running. So to debug, run only one at a time. 

To debug the app, refer to the last step of the [Prepare the Teams app project](#prepare-the-teams-app-project) section.

To debug the add-in, refer to the last step of the [Edit the tooling configuration files](#edit-the-tooling-configuration-files) section.

To see both the app and the add-in running at the same time, take the following steps.

1. Make sure Outlook desktop is closed.
1. Open Visual Studio Code.
1. Select Teams Toolkit from the **Activity Bar**.
1. In the **ACCOUNTS** section, verify that you're signed into Microsoft 365.
1. Select **View** > **Run** in Visual Studio Code. 
1. In the **RUN AND DEBUG** dropdown menu, select **Launch App and Add-in Outlook Desktop (Edge Chromium)** and press F5. 
    The project builds and a Webpack dev-server window opens. The tab app is hosted in the Visual Studio Code terminal. This process can take a couple of minutes and the following actions occur:

    - Teams opens in a browser with a prompt to add your tab app. If Teams hasn't opened by the time Outlook desktop opens, then automatic sideloading has failed. You can manually sideload it to see both the app and the add-in running at the same time. For sideloading instructions, see [Upload your app in Teams](/microsoftteams/platform/concepts/deploy-and-publish/apps-upload). You'll find the manifest.zip file to upload at `C:\Users\{yourname}\AppData\Local\Temp`.
    - Outlook desktop opens.

1. In the Teams prompt, select **Add** and the tab opens.
1. Go to Outlook.
1. In Outlook, open the **Inbox** *of your Microsoft 365 account identity*.
1. Open any message. 

    A **Contoso Add-in** tab with two buttons appears on the **Home** ribbon (or the **Message** ribbon, if you open the message in its own window).

1. Select the **Show Taskpane** button. A task pane opens. 
1. Select the **Perform an action** button. A small notification appears near the top of the message.
1. To stop debugging and to uninstall the add-in, select **Run** > **Stop Debugging** in Visual Studio Code. If the Webpack dev-server window doesn't close, open the Visual Studio Code **TERMINAL** in the root of the project and run `npm stop`.
1. If you had to manually sideload the Teams tab app, remove it from Teams as instructed in [Remove your app](/microsoftteams/platform/concepts/deploy-and-publish/apps-upload#remove-your-app). 

### Move the application to Azure

1. Open the `teamsapp.yml` file in the root of the project and find the line `deploymentName: Create-resources-for-tab`. Change it to `deploymentName: Create-resources-for-tab-and-addin`.

1. In the same file, add the following code to the end of the `provision:` section. 
    > [!NOTE]
    > The indentation is meaningful in YAML, so `- uses` and `- name` statements should be indented two spaces, `with` statements should be aligned with `uses`, and the children of `with` should be indented a further two spaces. 

    ```
    provision:

      -- other YAML omitted --

      - uses: azureStorage/enableStaticWebsite
        with:
          storageResourceId: ${{ADDIN_AZURE_STORAGE_RESOURCE_ID}}
          indexPage: index.html
          errorPage: error.html
    ```

1. In the same file, replace the entire `deploy:` section with the following code. These changes take account of the new folder structure and the fact that both add-in and tab files need to be deployed.

    ```
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

1. Open the `infra/azure.parameters.json` file in the root of the project and replace its contents with the following JSON:

    ```
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

1. Open the `infra/azure.bicep` file in the root of the project (not the one in either the tab or add-in subfolders) and replace its contents with the following code:

    ```
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
    
    output ADDIN_AZURE_STORAGE_RESOURCE_ID string = addinModule.outputs.ADDIN_AZURE_STORAGE_RESOURCE_ID // used in deploy stage
    output ADDIN_DOMAIN string = addinModule.outputs.ADDIN_DOMAIN
    output ADDIN_ENDPOINT string = addinModule.outputs.ADDIN_ENDPOINT
    ```

1. In Visual Studio Code, open Teams Toolkit.
1. In the **ACCOUNTS** section, be sure you're signed into your Azure account (in addition to being signed into your Microsoft 365 account). 
   For more information about signing in, open [Exercise - Create Azure resources to host a Teams tab app](/training/modules/teams-toolkit-vsc-deploy-apps/03-create-azure-resources-exercise) and scroll to the **Sign in to Azure in Teams Toolkit** section.
1. In the **LIFECYCLE** section of Teams Toolkit, select **Provision**. 
    It can take several minutes. You might be prompted to select one of your Azure resource groups.
1. When provisioning completes, select **Deploy** to deploy your app code to Azure.

### Run the tab capability from the remote deployment

1. In Visual Studio Code, select **View** > **Run**. 
1. In the dropdown menu, select **Launch Remote in Teams (Edge)** or **Launch Remote in Teams (Chrome)**.
1. Press F5 to preview your Teams tab capability.

### Run the add-in capability from the remote deployment

1. Copy the production URL from the `ADDIN_ENDPOINT` in `env/.env.dev` file.
1. Edit `\add-in\webpack.config.js` file and change `urlProd` constant value to the value you just copied. Be sure to add a '/' at the end of the URL.
1. In the Visual Studio Code **TERMINAL**, navigate to the root of the project and then run `npm run build:add-in`.
1. Copy the file `\add-in\dist\manifest.dev.json` to the `\appPackage` folder.
1. Rename the copy in the `\appPackage` folder to `manifest.addinPreview.json`.
1. In the **TERMINAL**, run `npx office-addin-dev-settings sideload .\appPackage\manifest.addinPreview.json`. This process can take a couple of minutes and opens the Outlook desktop. (If you're prompted to install `office-addin-dev-settings`, respond **yes**.)
1. Go to Outlook.
1. Open the **Inbox** of *your Microsoft 365 account identity*.
1. Open any message. 

    A **Contoso Add-in** tab with two buttons appears on the **Home** ribbon (or the **Message** ribbon, if you open the message in its own window).

1. Select the **Show Taskpane** button. A task pane opens. 
1. Select the **Perform an action** button. A small notification appears near the top of the message.

## What’s next

There are other commonly suggested next steps, for example:

- Add authentication and make a Graph API call. For the tab capability, see [Add single sign-on to Teams app](/microsoftteams/platform/toolkit/add-single-sign-on). For the add-in capability, see [Enable single sign-on (SSO) in an Office Add-in](/office/dev/add-ins/develop/sso-in-office-add-ins).
- [Set up CI/CD pipelines](https://github.com/OfficeDev/TeamsFx/wiki/How-to-automate-cicd-pipelines)
- [Call a backend API](https://github.com/OfficeDev/TeamsFx/wiki/How-to-integrate-Azure-Functions-with-your-Teams-app)

## See also

- [Outlook Add-ins Overview](/office/dev/add-ins/outlook/outlook-add-ins-overview)
- [Office Add-ins with the unified app manifest for Microsoft 365 (preview)](/office/dev/add-ins/develop/unified-manifest-overview)
- [Build an Outlook add-in with the unified manifest for Microsoft 365 (preview)](/office/dev/add-ins/quickstarts/outlook-quickstart-json-manifest)
