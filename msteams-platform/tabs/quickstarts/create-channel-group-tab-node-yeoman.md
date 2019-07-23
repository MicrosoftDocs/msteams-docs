---
title: "Quickstart: Create a custom channel and group Tab with Node.js and the Yeoman Generator for Microsoft Teams"
author: laujan
description: A quickstart guide to creating a channel and group tab with the Yeoman Generator for Microsoft Teams.
ms.topic: quickstart
ms.author: laujan
---
# Quickstart: Create a custom channel and group tab with Node.js and the Yeoman Generator for Microsoft Teams

>[!NOTE]
>This quickstart follows the steps outlined in the [Build Your First Microsoft Teams App](https://github.com/OfficeDev/generator-teams/wiki/Build-Your-First-Microsoft-Teams-App) Wiki found in the Microsoft OfficeDev GitHub repository.

In this quickstart we'll walk-through creating a custom channel and group tab using the [Teams Yeoman generator](https://github.com/OfficeDev/generator-teams/wiki/Build-Your-First-Microsoft-Teams-App). To learn more, see the [Project Structure documentation](https://github.com/OfficeDev/generator-teams/wiki/Project-Structure). We'll also upload the application to Teams and test your tab's integration.

[!INCLUDE [node-js-yeoman-prereq](../../includes/tabs/node-js-yeoman-prereq.md)]**Do you want to create a configurable or static tab?**<br>Use the arrow keys to select configurable tab.<br>**What scopes do you intend to use for your Tab?**<br>You can select a Team and/or a group chat<br>**Do you want this tab to be available in SharePoint Online? (Y/n)** <br> Select **n** unless, in the future, you want to use this app as a [SharePoint Framework web part](/msteams-platform/concepts/tabs/tabs-in-sharepoint).

>[!IMPORTANT]
>The path component **yourDefaultTabNameTab**, referenced in this quickstart, is the value that you entered in the generator for **Default Tab Name** plus the word **Tab**.
>
>For example: DefaultTabName: **MyTab** => **/MyTabTab/**

In your project directory, navigate to the following:

```bash
./src/app/scripts/**yourDefaultTabNameTab**/**yourDefaultTabNameTab**.tsx
```

That is where you'll find your tab logic. Locate the **render()** method and add the following **`<`div`>`** tag and content to the top of the **`<`PanelBody`>`** container code:

```html
    <PanelBody>
        <div style={styles.section}>
        Hello World! Yo Teams rocks!
        </div>
    </PanelBody>
```

Make sure to save the updated file. Your tab code is complete.

## Build and Run Your Application

Open a command prompt in your project directory to complete the next tasks.

[!INCLUDE [node-js-yeoman-gulp-tasks](../../includes/tabs/node-js-yeoman-gulp-tasks.md)]

To view your tab configuration page, remain in the current browser and add  **config.html** to the file path: `http://localhost:3007/<yourDefaultAppNameTab>/config.html`. You should see the following:

![configuration page screenshot](/microsoftteams/platform/assets/images/tab-images/configurationPage.PNG)

## Establish a secure tunnel to your tab

Microsoft Teams is an entirely cloud-based product and requires that your tab content be available from the cloud using HTTPS endpoints. Teams doesn't allow local hosting, therefore, you need to either publish your tab to a public URL or use a proxy that will expose your local port to an internet-facing URL.

To test your tab extension, you'll use [ngrok](https://ngrok.com/docs), which is built into this application. Ngrok is a reverse proxy software tool that will create a tunnel to your locally running web server's publicly-available HTTPS endpoints. Your server's web endpoints will be available during the current session on your local machine. When the machine is shut down or goes to sleep the service will no longer be available.

In your command prompt, exit localhost and enter the following:

```bash
gulp ngrok-serve
```

> [!IMPORTANT]
> After your tab has been uploaded to Microsoft teams, via *ngrok*, and successfully saved, you can view it in the tabs gallery, add it to the tabs bar, and interact with it until your tunnel session ends .<br><br>
**Remember to serve your tab on your hosted website prior to submission to the Teams app store for approval**.

## Upload your application to Teams

- Open the Microsoft Teams client. If you use the [web based version](https://teams.microsoft.com) you can inspect your front-end code using your browser's [developer tools](~/foo.md).
- In the *YourTeams* panel select (**&#8226;&#8226;&#8226;**), **More options**, next to the team that you're using to test your tab and choose *Manage team*.
- In the main panel select **Apps** from the tab bar and choose **Upload a custom app** located in the lower right-hand corner of the page.
- Open your project directory, browse to the **./package** folder, select the app package zip folder, right-click, and choose **Open**. Your tab will upload into Teams.
- Return to your team, choose the channel where you would like to display the tab, select ➕ from the tab bar, and choose your tab from the gallery.
- Follow the directions for adding a tab. Note that there's a custom configuration dialog for your channel/group tab.
- Select *Save* and your tab will be added to the channel's tab bar.

## Next Steps

- [learn something](~/foo.md)
- [and something else](~/foo.md)
