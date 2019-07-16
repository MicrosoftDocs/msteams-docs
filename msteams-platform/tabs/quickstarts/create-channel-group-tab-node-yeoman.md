---
title: "Quickstart: Create a Custom channel and group Tab with Node.js and the Yeoman generator"
author: laujan
description: A quickstart guide to creating a channel and group tab with the Teams Yeoman generator.
ms.topic: quickstart
ms.author: laujan
---
# Quickstart: Create a custom channel and group tab with Node.js and the Yeoman generator 

>[!NOTE]
>This quickstart follows the steps outlined in the [Build Your First Microsoft Teams App](https://github.com/OfficeDev/generator-teams/wiki/Build-Your-First-Microsoft-Teams-App) Wiki found in the Microsoft OfficeDev GitHub repository.

In this quickstart we'll walk-through creating a custom channel and group tab using the [Microsoft Teams App Project Generator - #YoTeams](/OfficeDev/generator-teams). For more information, see the Microsoft Teams App [Project Structure](https://github.com/OfficeDev/generator-teams/wiki/Project-Structure) documentation. We'll also test your tab's Teams integration by uploading it into a Teams channel.

<!-- [!INCLUDE [build-custom-tab-node-js-common](../../includes/create-custom-tab-node-js-common.md)] -->

## Update your application for Teams Integration

Your tab logic is located in the ./src/app/scripts/**yourDefaultTabNameTab**/**yourDefaultTabNameTab**.tsx TypeScript JSX file . Locate the **render()** method and add the following div tag and content to the top of the **`<`PanelBody`>`** container code:

```html
    <PanelBody>
        <div style={styles.section}>
        Hello World! Yo Teams rocks!
        </div>
    </PanelBody>
```

>[!NOTE]
>Open a command prompt in your project folder to complete the application's gulp tasks.

## Create a Teams App Manifest

Now that your tab code is complete, you can build your application:

The [Teams Manifest](foo.md) will be part of your package zip file (along with your two app package icons) and will be uploaded into Microsoft Teams. This is achieved through a gulp task that validates the manifest and creates the zip file in the *./package directory*. In the command prompt, type the following:

```bash
gulp manifest
```

## Build your application

The build command compiles your solution into the *./dist* folder. In the command prompt, type the following:

```bash
gulp build
```

## Run your application in localhost

To build your application and start a local web server, in the command prompt type the following:

```bash
gulp serve
```

Enter `http://localhost:3007/`**yourDefaultAppNameTab/** in your browser and view your application's content page:

![content page screenshot](/microsoftteams/platform/assets/images/tab-images/channelGroupTab.PNG)

To view your tab configuration page, add  `config.html` to the file path: `http://localhost:3007/<yourDefaultAppNameTab>/config.html`and press Enter. You should see the following:

![configuration page screenshot](/microsoftteams/platform/assets/images/tab-images/configurationPage.PNG)

## Establish a secure tunnel to your tab

Microsoft Teams is an entirely cloud-based product and requires that your tab content be available from the cloud using HTTPS endpoints. Teams doesn't allow local hosting, therefore, you need to either publish your tab to a public URL, or use a proxy that will expose your local port to an internet-facing URL.

To test your tab extension you'll use [ngrok](https://ngrok.com/docs), which is built into this application. Ngrok is a reverse proxy software tool that will create a tunnel to your locally running web server's publicly-available HTTPS endpoints. Your server's web endpoints will be available during the current session on your local machine. When the machine is shut down or goes to sleep the service will no longer be available.

In your command prompt, enter the following:

```bash
gulp ngrok-serve
```

> [!IMPORTANT]
> After your tab has been uploaded to Microsoft teams, via *ngrok*, and successfully saved, you can view it in tabs gallery, add it to the tabs bar, and interact with it until your tunnel session ends .<br><br>
**Remember to serve your tab on your hosted website prior to submission to the Teams app store for approval**.

## Upload your application to Teams

- Open Microsoft Teams using the web based version of [Teams](https://teams.microsoft.com) so that you can inspect your JavaScript code with your browser's developer tools.
- In the **YourTeams** panel select (**&#8226;&#8226;&#8226;**) *More options* next to the team that you're using to test your tab and select *Manage team*.
- In the main panel select *Apps* from the tab bar and choose *Upload a custom app* located in the lower right-hand corner of the page.
- Open your project folder, browse to the `./package` folder, select the zip file in the `./package` folder, right-click, and choose open.
- Your tab will upload into Microsoft Teams.
- Return to your team's General channel and select ➕ to add your tab from the list of tabs.
- Follow the directions for adding a tab. Note that there's a custom configuration dialog for your channel/group tab.
- Select *Save* and your tabs will be loaded in Microsoft Teams.

## Add your channel/group tab to the tab bar

- Choose ➕ *Add a tab*  from the tab bar.
- Select your tab from the gallery.
- Accept the consent prompt.
- Enter a value for the configuration page.
- *Save*.
- To view, select your new tab from the tab bar.

### Nice work! You just extended Microsoft Teams with a custom channel/group tab.
