---
title: "Create a custom channel and group Tab with Node.js and the Yeoman Generator for Microsoft Teams"
author: laujan
description: A quickstart guide to creating a channel and group tab with the Yeoman Generator for Microsoft Teams.
localization_priority: Normal
ms.topic: quickstart
ms.author: lajanuar
---
# Channel and group tab with Node.js and Yeoman Generator

This quickstart takes you through the steps to create a custom channel and group tab using Node.js and the Teams Yeoman generator.

## What you'll learn

* Generate a project.
* Build and run your application.
* Establish a secure tunnel using ngrok.
* Upload the application to Teams.

[!INCLUDE [node-js-yeoman-prereq](~/includes/tabs/node-js-yeoman-prereq.md)]

| **Question** | **Values** |
|-------------|-------------|
| **Do you want to create a configurable or static tab?** | Use the arrow keys to select configurable tab. |
| **What scopes do you intend to use for your Tab?** | You can select a Team or a group chat. |
| **Do you want this tab to be available in SharePoint Online? (Y/n)** | Select **n**. |

>[!IMPORTANT]
>The path component **yourDefaultTabNameTab**, referenced in this quickstart, is the value that you entered in the generator for **Default Tab Name** plus the word **Tab**.
>
>For example: DefaultTabName: **MyTab** => **/MyTabTab/**

In your project directory, navigate to the following:

```bash
./src/app/scripts/<yourDefaultTabNameTab>/<yourDefaultTabNameTab>.tsx
```

That is where you find your tab logic. Locate the `render()` method and add the following `<div>` tag and content to the top of the `<PanelBody>` container code:

```html
    <PanelBody>
        <div style={styles.section}>
            Hello World! Yo Teams rocks!
        </div>
    </PanelBody>
```

Save the updated file.

## Build and Run Your Application

Open a command prompt in your project directory to complete the next tasks.

[!INCLUDE [node-js-yeoman-gulp-tasks](~/includes/tabs/node-js-yeoman-gulp-tasks.md)]

To view your tab configuration page go to `https://localhost:3007/<yourDefaultAppNameTab>/config.html`.

![configuration page screenshot](~/assets/images/tab-images/configurationPage.png)

## Establish a secure tunnel to your tab

Microsoft Teams is an entirely cloud-based product and requires your tab content be available from the cloud using HTTPS endpoints. Teams does not allow local hosting, you must either publish your tab to a public URL or use a proxy that exposes your local port to an internet-facing URL.

To test your tab extension, you must use [ngrok](https://ngrok.com/docs), which is built into this application. Ngrok is a reverse proxy software tool that creates a tunnel to your locally running web server's publicly available HTTPS endpoints.

Your server's web endpoints are available during the current session on your local machine. When the machine is shut down or goes to sleep, the service is no longer available.

In your command prompt, exit localhost and enter the following:

```bash
gulp ngrok-serve
```

> [!IMPORTANT]
> When your tab is uploaded to Microsoft Teams through ngrok and successfully saved, you can view your tab in Teams until your tunnel session ends. If you restart your ngrok session, you need to update your app with the new URL.

## Upload your application to Teams

- Open the Microsoft Teams client. If you use the [web based version](https://teams.microsoft.com) you can inspect your front-end code using your browser's [developer tools](~/tabs/how-to/developer-tools.md).
- In the *YourTeams* panel on the left, select the `...` menu next to the team that you are using to test your tab and select **Manage team**.
- In the main panel select **Apps** from the tab bar and select **Upload a custom app** located in the lower right-hand corner of the page.
- Open your project directory, browse to the **./package** folder, select the app package zip folder and select **Open**. Your tab is uploaded into Teams.
- Return to your team, select the channel where you would like to display the tab, select ➕ from the tab bar, and select your tab from the gallery.
- Follow the directions for adding a tab. Note that there is a custom configuration dialog for your channel or group tab.
- Select **Save**. Your tab is added to the channel's tab bar.

## See also

[Build Your First Microsoft Teams App](https://github.com/OfficeDev/generator-teams/wiki/Build-Your-First-Microsoft-Teams-App)