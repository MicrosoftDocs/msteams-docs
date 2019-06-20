---
title: "Quickstart: Create a Channel and Group Tab with the Teams Yeoman Generator"
author: laujan
description: A quickstart guide to creating a channel and group tab with the Teams Yeoman Generator.
ms.topic: quickstart
ms.author: laujan
---
# Quickstart: create a custom channel and group tabs with Node.js and the Teams Yeoman Generator

>[!NOTE]
>This quickstart follows the steps outlined in the [Build Your First Microsoft Teams App](/OfficeDev/generator-teams/wiki/Build-Your-First-Microsoft-Teams-App) Wiki found in the Microsoft OfficeDev GitHub repository.

Custom tabs enable you to embed web-based content directly into Microsoft Teams via your [Teams App Package](/msteams-platform/_old/concepts/apps/apps-package.md) (see [What are custom tabs in Microsoft Teams?](/msteams-platform/tabs/what-are-custom-tabs.md)). Custom tabs can be scoped for either channel and group use, serving configurable/dynamic content, or personal use, serving static content. An app can have one channel and group tab and up to sixteen personal tabs.

In this quickstart we will walk-through creating a custom channel and group tab using the [Microsoft Teams App Project Generator](/OfficeDev/generator-teams). For more information, see the Microsoft Teams App [Project Structure](/OfficeDev/generator-teams/wiki/Project-Structure) documentation.

[!INCLUDE [build-custom-tab-node-js-common](../../includes/create-custom-tab-node-js-common.md)]

## Add code to your channel and group tab

Your tab logic is located in the `./src/app/scripts/<yourDefaultTabNameTab>/<yourDefaultTabNameTab>.tsx` TypeScript JSX file . Locate the `render()` method and add the following div tag and content to the top of the `<PanelBody>` container code:

```html
    <PanelBody>
        <div style={styles.section}>
        Hello World! Yo Teams rocks!
        </div>
    </PanelBody>
```

>[!NOTE]
>Open a command prompt in your app's project folder to complete the project's gulp tasks.

## Create a Teams App manifest

Now that your tab code is complete, you can build your project:
>The [Teams Manifest](foo.md) will be part of your app package zip file (along with your two app icons) and will be uploaded into Microsoft Teams. This is achieved through a gulp task that validates the manifest and creates the zip file in the `./package directory`. In the command prompt, type the following:

```bash
gulp manifest
```

## Build your app

>The build command compiles your solution into the `./dist` folder. In the command prompt, type the following:

```bash
gulp build
```

## Run your app in localhost

>To build and start a local web server, in the command prompt, type the following:

```bash
gulp serve
```

>Enter `http://localhost:3007/<yourDefaultAppNameTab>/` in your browser and view your app's content page:
>>![content page screenshot](/microsoftteams/platform/assets/channelGroupTab.PNG)

>To view your tab configuration page, add  `config.html` to the file path: `http://localhost:3007/<yourDefaultAppNameTab>/config.html`and press Enter. You should see the following:
>>![configuration page screenshot](/microsoftteams/platform/assets/configurationPage.PNG)

## Package your app for Microsoft Teams

Microsoft Teams is an entirely cloud-based product, and thus requires your app to be available from the cloud using HTTPS endpoints. Teams does not allow apps to be hosted on localhost. Therefore, you need to either publish your app to a public URL or use a proxy which will expose your local port to an internet-facing URL.

To test your tab extension we will use [ngrok](https://ngrok.com/docs), which is built into this project. Ngrok is a reverse proxy software tool that will create a tunnel to your locally running web server's publicly-available HTTPS endpoints. Your server's web endpoints will be available during the current session on your local machine. When the machine is shut down or goes to sleep the service will no longer be available.

>In your command prompt, enter the following:

```bash
gulp ngrok-serve
```

## Upload your app in Microsoft Teams

- Open Microsoft Teams. In the **YourTeams** panel click (**&#8943;**) *More options* next to the team that you are using to test your app's tabs and Select *Manage team*. 
- In the main panel click on *Apps* from the tab bar and click on *Upload a custom app* located in the lower right-hand corner of the page. 
- Open your project folder, browse to the `./package` folder, select the zip file in the `./package` folder, right-click, and choose open. 
- Your app will upload into Microsoft Teams.
- Return to your team's General channel and select ➕ to add your tab from the list of tabs. 
- Follow the directions for adding a tab. Note that there is a custom configuration dialog for your channel and group tab. 
- Select *Save* and your tabs should be loaded in Microsoft Teams.

## Add your channel and group tab to the tab bar

- Choose ➕ *Add a tab*  from the tab bar.
- Select your tab from the gallery.
- Accept the consent prompt.
- Enter a value for the configuration page.
- *Save*.
- To view, select your new tab from the tab bar.

### Nice work! You just extended Microsoft Teams with custom tabs.
