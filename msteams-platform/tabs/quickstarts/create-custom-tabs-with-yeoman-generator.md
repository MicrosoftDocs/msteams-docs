---
title: "Quickstart: Build Custom Tabs with the Microsoft Teams Yeoman Generator" #Required; page title displayed in search results. Include the word "quickstart". Include the brand.
author: laujan #Required; your GitHub user alias, with correct capitalization.
description: A quickstart guide to building custom tabs. #Required; article description that is displayed in search results. Include the word "quickstart".
ms.topic: quickstart #Required
ms.author: laujan #Required; Microsoft alias of author; optional team alias.
---
# Quickstart: build custom tabs with the Microsoft Teams Yeoman Generator

Custom tabs enable you to embed web-based content page directly into Microsoft Teams. You can build your own tab or expand your existing app's UI experience. Custom tabs can be scoped for either personal (static content) or group/channel (configurable/dynamic content) use. An app can have up to sixteen (16) personal or a maximum of one (1) group/channel tab.

## Prerequisites

In this quickstart we will walk through creating custom group/channel and personal tabs using the [Microsoft Teams App Project Generator](https://github.com/OfficeDev/generator-teams). For more information you can read the Microsoft Teams App [Project Structure](https://github.com/OfficeDev/generator-teams/wiki/Project-Structure) documentation. To complete this tutorial you need to have [enabled uploading of Microsoft Teams apps](https://docs.microsoft.com/en-us/MicrosoftTeams/enable-features-office-365) and have the following installed in your dev environment:

- [Node.js/NPM](https://nodejs.org/en/). You should use the latest LTS version. NPM (Node Package Manager) will get installed into your system with the installation of Node.js.

- Any text editor or IDE. You can install and use [Visual Studio Code](https://code.visualstudio.com/download) for free.

- After you have successfully installed Node.js and NPM, install the [Yeoman](https://yeoman.io/) and [gulp-cli](https://www.npmjs.com/package/gulp-cli) (Gulp global command line interface) packages by typing the following:

```cmd
         npm install yo gulp - cli--global
```

- If you want to install preview versions of the Teams generator type the following:

```cmd
        npm install generator - teams @preview--global
```

## Get Started

### Generate your project and create a group/channel tab

Open a command prompt and create a new directory for your tab project. Navigate (cd) to your new directory and type the command `yo teams` . This will display an old-school ascii drawing and start the Teams Apps generator. Next, you will be asked a series of config questions:

<img src="./TeamsTabScreen.png/" alt="generator opening screenshot" width="500">

> ***What is your solution name?*** <br>&emsp; This is your project name. You can accept the suggested name by pressing enter.<br>***Where do you want to place the files?*** <br>&emsp; You are currently in your project directory. Press enter.<br>***Title of your Microsoft Teams App project*** <br>&emsp; This title will be used in the manifest and description of your app. <br>***Your (company) name? (max 32 characters)*** <br>&emsp; Your company name will be used in the manifest.<br>***Which manifest version would you like to use*** <br>&emsp; For this tutorial select v1.5, the current general available schema.<br>***Enter your Microsoft Partner Id, if you have one? (Leave blank to skip)*** <br> &emsp; This field is not required, and should only be used if you are already part of the [Microsoft Partner Network](https://partner.microsoft.com).<br>***What do you want to add to your project?*** <br>&emsp; Select *( \* ) a Tab*<br>***The URL where you will host this solution?***  <br>&emsp; This can be any URL, but by default the generator suggests an Azure Web Sites URL. Note: As this is a demo, A valid URL is not necessary to complete this quickstart. We will be testing locally.<br>***Would you like to include Test framework and initial tests?*** (Y/n) <br>&emsp; For this quickstart choose <u>not</u> to include a test framework. The default is yes; enter **n**.<br>***Would you like to use Azure Applications Insights for telemetry?*** (Y/n) <br>&emsp; For this quickstart choose <u>not</u> to include [Azure Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview). The default is yes, so enter **n**.<br>***Default Tab Name (max 16 characters)*** <br>&emsp; Name your tab.<br>***Do you want this tab to be available in SharePoint Online?*** (Y/n) <br>&emsp; Select **n** unless, in the future, you want to use this app as a [SharePoint Online web part](https://docs.microsoft.com/microsoftteams/platform/concepts/tabs/tabs-in-sharepoint)|

### Add some code to your group/channel tab

Your Tab logic is located in the `./src/app/scripts/<yourTabName>Tab/<yourTabName>Tab.tsx` . Locate the `render()` method and add the following div at the top of `<PanelBody>` :

```html
    <PanelBody>
        <div style={styles.section}>
        Hello World! Yo Teams rocks!
        </div>
    </PanelBody>
```

### Create your personal tab

If you do not want to add a personal tab you can skip this section of the quickStart. To include a personal tab:

> 1.&emsp; In your code editor, create a new HTML file named, `static.html` .  Add the following code to this file:

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
            <h1>Static Tab</h1>
            <p><img src="/assets/icon.png"></p>
            <p>This is your static tab!</p>
        </body>
</html>

Save the file.
```

Save this file  in your apps web folder: `./src/app/web/<yourAppName>Tab/ ` 

> 2.&emsp; In your code editor, navigate to your app's `manifest.json` file: `./src/manifest/manifest.json/` . Scroll down to the empty staticTabs array ( `"staticTabs":[]` ) and add the following JSON object:

```json
{
    "entityId": "staticTab",
    "name": "Static Tab ",
    "contentUrl": "https://{{HOSTNAME}}/<yourAppName>/static.html",
    "websiteUrl": "https://{{HOSTNAME}}",
    "scopes": ["personal"]
}

Save the file.
```

> 3.&emsp; Finally, your page must be served in an iFrame. In your code editor, navigate to `./src/app/<yourAppName>Tab/<yourApptab>Tab.ts` and add the following to the list of iFrame decorators:

```typescript
 @PreventIframe("/<yourAppName>Tab/static.html")

Save the file and Save all.
```

### Build and Run your App in localhost

### Run your app in Microsoft Teams

### Accessing your tabs

To view tabs in the personal scope click the Apps icon in the left-hand menu of your Teams application. Tabs in the group/channel scope become part of a channel and the user configures the content of your tab experience when the tab is first added to the channel.

<footer>

[![npm (latest)](https://img.shields.io/npm/v/generator-teams/latest.svg)](https://www.npmjs.com/package/generator-teams)&emsp; &emsp; [![npm (preview)](https://img.shields.io/npm/v/generator-teams/preview.svg)](https://www.npmjs.com/package/generator-teams)

</footer>