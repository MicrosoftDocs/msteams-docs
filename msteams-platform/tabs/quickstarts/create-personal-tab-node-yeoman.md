---
title: "Quickstart: Create a custom personal tab with Node.js and the Yeoman Generator for Microsoft Teams"
author: laujan
description: A quickstart guide to creating a personal tab with the Yeoman Generator for Microsoft Teams.
ms.topic: quickstart
ms.author: la.januari
---
# Quickstart: Create a custom personal tab with Node.js and the Yeoman Generator for Microsoft Teams

>[!NOTE]
>This quickstart follows the steps outlined in the [Build Your First Microsoft Teams App](https://github.com/OfficeDev/generator-teams/wiki/Build-Your-First-Microsoft-Teams-App) Wiki found in the Microsoft OfficeDev GitHub repository.

In this quickstart we'll walk-through creating a custom personal tab using the [Teams Yeoman generator](https://github.com/OfficeDev/generator-teams/wiki/Build-Your-First-Microsoft-Teams-App). We'll also upload the application to Team.

[!INCLUDE [node-js-yeoman-prereq](~/includes/tabs/node-js-yeoman-prereq.md)]

**Do you want to create a configurable or static tab?**

Use the arrow keys to select static tab.

>[!IMPORTANT]
>The path component *yourDefaultTabNameTab*, referenced in this quickstart, is the value that you entered in the generator for *Default Tab Name* plus the word *Tab*.
>
>For example: DefaultTabName: *MyTab* => */MyTabTab/*

## Create your personal tab

To add a personal tab to this application you'll create a content page and update existing files:

- In your code editor, create a new HTML file, **personal.html** and add the following markup:

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

- Save **personal.html** in your application's **web** folder:

```bash
./src/app/web/<yourDefaultTabNameTab>/personal.html
```

- Open **manifest.json** in your code editor:

```bash
./src/manifest/manifest.json/
```

Add the following to the empty `staticTabs` array (`staticTabs":[]`) and add the following JSON object:

```json
{
    "entityId": "personalTab",
    "name": "Personal Tab ",
    "contentUrl": "https://{{HOSTNAME}}/<yourDefaultTabNameTab>/personal.html",
    "websiteUrl": "https://{{HOSTNAME}}",
    "scopes": ["personal"]
}

```

Remember to update the **"contentURL"** path component **yourDefaultTabNameTab** with your actual tab name.

- Save the updated **manifest.json**.

- Your content page must be served in an IFrame. Open **Tab.ts** in your code editor:

 ```bash
./src/app/<yourDefaultTabNameTab>/<yourDefaultTabNameTab>.ts
```

- Add the following to the list of IFrame decorators:

```typescript
 @PreventIframe("/<yourDefaultAppName>TabNameTab>/personal.html")
```

- Make sure to save the updated **Tab.ts** file. Your tab code is complete.

## Build and Run Your Application

Open a command prompt in your project directory to complete the next tasks.

[!INCLUDE [node-js-yeoman-gulp-tasks](~/includes/tabs/node-js-yeoman-gulp-tasks.md)]

To view your personal tab, go to `http://localhost:3007/<yourDefaultAppNameTab>/personal.html`

>![personal tab screenshot](/microsoftteams/platform/assets/images/tab-images/personalTab.PNG)

## Establish a secure tunnel to your tab

Microsoft Teams is an entirely cloud-based product and requires that your tab content be available from the cloud using HTTPS endpoints. Teams doesn't allow local hosting, therefore, you need to either publish your tab to a public URL or use a proxy that will expose your local port to an internet-facing URL.

To test your tab extension, you'll use [ngrok](https://ngrok.com/docs), which is built into this application. Ngrok is a reverse proxy software tool that will create a tunnel to your locally running web server's publicly-available HTTPS endpoints. Your server's web endpoints will be available during the current session on your local machine. When the machine is shut down or goes to sleep the service will no longer be available.

In your command prompt, exit localhost and enter the following:

```bash
gulp ngrok-serve
```

> [!IMPORTANT]
> After your tab has been uploaded to Microsoft teams, via *ngrok*, and successfully saved, you can view it in Teams until your tunnel session ends.

## Upload your application to Teams

- Open the Microsoft Teams client. If you use the [web based version](https://teams.microsoft.com) you can inspect your front-end code using your browser's [developer tools](~/tabs/how-to/developer-tools.md).
- In the *YourTeams* panel on the left, select the `...` menu next to the team that you're using to test your tab and choose **Manage team**.
- In the main panel select **Apps** from the tab bar and choose **Upload a custom app** located in the lower right-hand corner of the page.
- Open your project directory, browse to the **./package** folder, select the zip folder, right-click, and choose **Open**. Your tab will upload into Teams.

## View your personal tabs

In the navbar located at the far-left of the Teams client, select the `...` menu and choose your app from the list.
