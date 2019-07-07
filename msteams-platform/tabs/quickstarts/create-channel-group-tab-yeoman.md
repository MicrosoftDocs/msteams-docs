---
title: "Quickstart: Create a Custom channel and group Tab with Node.js and the Yeoman generator for Microsoft Teams"
author: laujan
description: A quickstart guide to creating a channel and group tab with the Teams Yeoman generator for Microsoft Teams.
ms.topic: quickstart
ms.author: laujan
---
# Quickstart: Create a custom channel and group tab with Node.js and the Yeoman generator for Microsoft Teams 

>[!NOTE]
>This quickstart follows the steps outlined in the [Build Your First Microsoft Teams App](https://github.com/OfficeDev/generator-teams/wiki/Build-Your-First-Microsoft-Teams-App) Wiki found in the Microsoft OfficeDev GitHub repository.

Custom tabs enable you to embed your hosted web content directly into Microsoft Teams and add Teams-specific functionality via your  [Teams App Package](foo.md). See [What are custom tabs in Microsoft Teams?](/msteams-platform/tabs/what-are-custom-tabs.md). There are two types of tabs available in Teams - channel/group and personal. A channel/group tab delivers content to channels and group chats and are a great way to create collaborative spaces around dedicated web-based content. A channel/group tab can be pinned to the tabs bar located at the top of the channel and each channel or group chat can have its own tabs to support specific focus areas.  An app can only have one channel/group tab.

In this quickstart we'll walk-through creating a custom channel and group tab using the [Microsoft Teams App Project Generator - #YoTeams](/OfficeDev/generator-teams). For more information, see the Microsoft Teams App [Project Structure](https://github.com/OfficeDev/generator-teams/wiki/Project-Structure) documentation. You will also test your tab's Teams integration by uploading it into a Teams channel.

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
>>![content page screenshot](/microsoftteams/platform/assets/images/tab-images/channelGroupTab.PNG)

>To view your tab configuration page, add  `config.html` to the file path: `http://localhost:3007/<yourDefaultAppNameTab>/config.html`and press Enter. You should see the following:
>>![configuration page screenshot](/microsoftteams/platform/assets/images/tab-images/configurationPage.PNG)

## Package your app for Microsoft Teams

Microsoft Teams is an entirely cloud-based product, and thus requires your app to be available from the cloud using HTTPS endpoints. Teams doesn't allow apps to be hosted on localhost. Therefore, you need to either publish your app to a public URL, or use a proxy that will expose your local port to an internet-facing URL.

To test your tab extension you'll use [ngrok](https://ngrok.com/docs), which is built into this project. Ngrok is a reverse proxy software tool that will create a tunnel to your locally running web server's publicly-available HTTPS endpoints. Your server's web endpoints will be available during the current session on your local machine. When the machine is shut down or goes to sleep the service will no longer be available.

>In your command prompt, enter the following:

```bash
gulp ngrok-serve
```

> [!IMPORTANT]
> After your channel/group has been uploaded to Microsoft teams, via ngrok, and successfully saved, you can view it in tabs gallery, add it to the tabs bar, and interact with it until your tunnel session ends . However, you must serve your tab on your hosted website before submitting your app to the Teams app store for approval.

## Upload your app in Microsoft Teams

- Open Microsoft Teams using the web based version of [Teams](https://teams.microsoft.com) so that you can inspect your JavaScript code with your browser's developer tools.
- In the **YourTeams** panel click (**&#8226;&#8226;&#8226;**) *More options* next to the team that you're using to test your app's tabs and select *Manage team*.
- In the main panel click on *Apps* from the tab bar and click on *Upload a custom app* located in the lower right-hand corner of the page.
- Open your project folder, browse to the `./package` folder, select the zip file in the `./package` folder, right-click, and choose open.
- Your app will upload into Microsoft Teams.
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
