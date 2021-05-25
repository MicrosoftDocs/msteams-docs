---
title: "Quickstart: Create a custom personal tab with Node.js and the Yeoman Generator for Microsoft Teams"
author: laujan
description: A quickstart guide to creating a personal tab with the Yeoman Generator for Microsoft Teams.
localization_priority: Normal
ms.topic: quickstart
ms.author: lajanuar
---

# Create a custom personal tab using Node.js and the Yeoman Generator for Microsoft Teams

This quickstart takes you through the steps to create a custom personal tab using Node.js and the Teams Yeoman generator.

>[!NOTE]
>This quickstart follows the steps outlined in the [Build Your First Microsoft Teams App](https://github.com/OfficeDev/generator-teams/wiki/Build-Your-First-Microsoft-Teams-App) Wiki found in the Microsoft OfficeDev GitHub repository.

## What you'll learn

* Generate a project.
* Create personal tab.
* Build and run your application.
* Establish a secure tunnel using ngrok.
* Upload the application to Teams.

[!INCLUDE [node-js-yeoman-prereq](~/includes/tabs/node-js-yeoman-prereq.md)]

**Create a configurable or static tab**
Use the arrow keys to select static tab.

> [!IMPORTANT]
> The path component **yourDefaultTabNameTab** referenced in this quickstart is the value that you entered in the generator for **Default Tab Name** plus the word **Tab**.
>
> For example: DefaultTabName: **MyTab** => **/MyTabTab/**

## Create a personal tab

To add a personal tab to your application, you must create a content page and update the existing files.

**To create a personal tab**

1. Open code editor, create a new HTML file, **personal.html** and add the following markup:

    ```html
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>
                <!-- Todo: add your a title here -->
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <!-- inject:css -->
            <!-- endinject -->
        </head>
            <body>
                <h1>Personal Tab</h1>
                <p><img src="/assets/icon.png"></p>
                <p>This is your personal tab!</p>
            </body>
    </html>
    ```

1. Save the HTML file in your application's **web** folder.

    ```bash
    ./src/app/web/<yourDefaultTabNameTab>/personal.html
    ```

1. Open **manifest.json** in your code editor.

    ```bash
    ./src/manifest/manifest.json/
   ```

1. Add the following to the empty `staticTabs` array (`staticTabs":[]`) and add the following JSON object:

    ```json
    {
        "entityId": "personalTab",
        "name": "Personal Tab",
        "contentUrl": "https://{{HOSTNAME}}/<yourDefaultTabNameTab>/personal.html",
        "websiteUrl": "https://{{HOSTNAME}}",
        "scopes": ["personal"]
    }

    ```


1. Update the `contentUrl` path component `yourDefaultTabNameTab` with your actual tab name.

1. Save the updated **manifest.json**.

1. Your content page must be served in an IFrame. Open **Tab.ts** in your code editor.

    ```bash
    ./src/app/<yourDefaultTabNameTab>/<yourDefaultTabNameTab>.ts
    ```

1. Add the following to the list of IFrame decorators:

    ```typescript
     @PreventIframe("/<yourDefaultAppName>TabNameTab>/personal.html")
    ```

1. Save the updated **Tab.ts** file. Your tab code is complete.

## Build and run your application

Perform the following steps through command prompt in your project directory:

[!INCLUDE [node-js-yeoman-gulp-tasks](~/includes/tabs/node-js-yeoman-gulp-tasks.md)]

4. Navigate to `http://localhost:3007/<yourDefaultAppNameTab>/personal.html` to view your personal tab.

    ![personal tab screenshot](/microsoftteams/platform/assets/images/tab-images/personalTab.PNG)

## Establish a secure tunnel to your tab

Microsoft Teams is an entirely cloud-based product and requires your tab content to be available from the cloud using HTTPS endpoints. Teams does not allow local hosting, you must either publish your tab to a public URL or use a proxy that exposes your local port to an internet-facing URL.

To test your tab extension, you must use [ngrok](https://ngrok.com/docs), which is built into this application. Ngrok is a reverse proxy software tool that creates a tunnel to your local web server's publicly available HTTPS endpoints.

Your server's web endpoints are available during the current session on your local machine. When the machine is shut down or goes to sleep, the service is no longer available.

In your command prompt, exit localhost and enter the following:

```bash    
gulp ngrok-serve
```

> [!IMPORTANT]
> When your tab is uploaded to Microsoft Teams through *ngrok* and successfully saved, you can view your tab in Teams until your tunnel session ends.

## Upload your application to Teams

1. Open the Microsoft Teams client. If you use the [web based version](https://teams.microsoft.com) you can inspect your front-end code using your browser's [developer tools](~/tabs/how-to/developer-tools.md).

1. In the *YourTeams* panel on the left, select the `...` menu next to the team that you are using to test your tab and select **Manage team**.

    ![Manage team screenshot](~/assets/images/tab-images/manage-team.png)

1. In the main panel select **Apps** from the tab bar and select **Upload a custom app** located in the lower left-hand corner of the page.
 
    ![Upload a custom app screenshot](~/assets/images/tab-images/upload-custom-app.png)

1. Open your project directory, browse to the **./package** folder, select the zip folder, right-click, and select **Open**. Your tab is uploaded into Teams.

## View your personal tabs

Select the `...` menu from the left panel of Teams, and select your application from the list.

## Next step

> [!div class="nextstepaction"]
> [Create a personal tab using ASP.NETCore](~/tabs/quickstarts/create-personal-tab-dotnet-core.md)
