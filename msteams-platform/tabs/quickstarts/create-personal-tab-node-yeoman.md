---
title: "Quickstart: Create a custom personal tab with Node.js and the Yeoman generator for Microsoft Teams"
author: laujan 
description: A quickstart guide to creating a personal tab with the Yeoman generator for Microsoft Teams. 
ms.topic: quickstart 
ms.author: laujan
---
# Quickstart: Create a custom personal tab with Node.js and the Teams Yeoman generator for Microsoft Teams

>[!NOTE]
>This quickstart follows the steps outlined in the [Build Your First Microsoft Teams App](https://github.com/OfficeDev/generator-teams/wiki/Build-Your-First-Microsoft-Teams-App) Wiki found in the Microsoft OfficeDev GitHub repository.

In this quickstart we'll walk-through creating a custom personal tab using the [Microsoft Teams App Project Generator](/OfficeDev/generator-teams). To learn more, see the [Project Structure documentation](/OfficeDev/generator-teams/wiki/Project-Structure) documentation.

[!INCLUDE [node-js-yeoman-prereq](../../includes/tabs/node-js-yeoman-prereq.md)]

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

Add the following to the empty **staticTabs** array (**staticTabs":[]** and add the following JSON object:

```json
{
    "entityId": "personalTab",
    "name": "Personal Tab ",
    "contentUrl": "https://{{HOSTNAME}}/<yourDefaultTabNameTab>/personal.html",
    "websiteUrl": "https://{{HOSTNAME}}",
    "scopes": ["personal"]
}

```

Remember to update the **"contentURL"** path component **yourDefaultTabNameTab** with your *DefaultTabName* + *Tab*.

- Save the updated **manifest.json**.

- Your content page must be served in an IFrame. Open **Tab.ts** in your code editor:
 
 ```bash
./src/app/<yourDefaultTabNameTab>/<yourDefaultTabNameTab>.ts
``` 

- Add the following to the list of IFrame decorators:

```typescript
 @PreventIframe("/<yourDefaultAppName>TabNameTab>/personal.html")
```

- *Save* the updated `Tab.ts` and *Save all* for good measure. Your tab code is complete; now you can build your application. Open a command prompt in your project directory to complete the next tasks.

[!INCLUDE [node-js-yeoman-gulp-tasks](../../includes/tabs/node-js-yeoman-gulp-tasks.md)]

To view your personal tab, remain in the current browser and add `personal.html` to the file path: `http://localhost:3007/<yourDefaultAppNameTab>/personal.html` Press enter.<br>

>![personal tab screenshot](/microsoftteams/platform/assets/personalTab.PNG)

## Package your application for Microsoft Teams

Microsoft Teams is an entirely cloud-based product and requires that your tab be available from the cloud using HTTPS endpoints. Teams doesn't allow local hosting. Therefore, you need to either publish your tab to a public URL or use a proxy that will expose your local port to an internet-facing URL.

To test your tab extension, you'll use [ngrok](https://ngrok.com/docs), which is built into this application. Ngrok is a reverse proxy software tool that will create a tunnel to your locally running web server's publicly-available HTTPS endpoints. Your server's web endpoints will be available during the current session on your local machine. When the machine is shut down or goes to sleep the service will no longer be available.

In your command prompt, enter the following:

```bash
gulp ngrok-serve
```

## Upload your tab in Microsoft Teams

- Open Microsoft Teams using the web based version of [Teams](https://teams.microsoft.com) so that you can inspect your JavaScript code with your browser's developer tools.
- In the **YourTeams** panel select (**&#8226;&#8226;&#8226;**) *More options* next to the team that you're using to test your tab and select *Manage team*. 
- In the main panel select *Apps* from the tab bar and choose *Upload a custom app* located in the lower right-hand corner of the page.
- Open your project folder, browse to the `./package` folder, select the zip file in the `./package` folder, right-click, and choose open.
- Your tab will upload into Microsoft Teams.

## View your personal tabs

- In the navbar located at the far-left of the Teams App, select (**&#8943;**) *More added apps*. You'll be presented with a list of personal view apps.
- Select your personal tab from the list to view.

### Nice work! You just extended Microsoft Teams with a custom personal tab.
