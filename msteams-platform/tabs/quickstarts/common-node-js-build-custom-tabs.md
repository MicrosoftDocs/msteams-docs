>[!NOTE]This quickstart follows the steps outlined in the [Build Your First Microsoft Teams App](https://github.com/OfficeDev/generator-teams/wiki/Build-Your-First-Microsoft-Teams-App) Wiki found in the Microsoft OfficeDev GitHub repository.

Custom tabs enable you to embed web-based content directly into Microsoft Teams via your [Teams App Package](/msteams-platform/_old/concepts/apps/apps-package.md) (see [What are custom tabs in Microsoft Teams?](/msteams-platform/tabs/what-are-custom-tabs.md)). Custom tabs can be scoped for either group/channel use, serving configurable/dynamic content, or personal use, serving static content. An app can have one group/channel tab and up to sixteen personal tabs.

In this quickstart we will walk-through creating custom foo[*group/channel* and *personal tabs*] using the [Microsoft Teams App Project Generator](/OfficeDev/generator-teams). For more information, see the Microsoft Teams App [Project Structure](/OfficeDev/generator-teams/wiki/Project-Structure) documentation.

## Prerequisites

- To complete this tutorial you will need an Office 365 tenant and a team configured with *Allow uploading custom apps* enabled (see [Manage Microsoft Teams settings for your organization](https://docs.microsoft.com/en-us/MicrosoftTeams/enable-features-office-365)). If you do not currently have an Office 365 account, you can sign up for the Office 365 Developer Program to get a free subscription to build your own solutions. The subscription will remain active as long as you are using the subscription for ongoing development (see [Welcome to the Office 365 Developer Program](https://docs.microsoft.com/office/developer-program/office-365-developer-program)).

In addition, the project requires that you have the following installed in your development environment:

- [Node.js/npm](https://nodejs.org/en/). You should use the latest LTS version. The Node Package Manager (npm) will install into your system with the installation of Node.js.

- Any text editor or IDE. You can install and use [Visual Studio Code](https://code.visualstudio.com/download) for free.

- After you have successfully installed Node.js/npm, install the [Yeoman](https://yeoman.io/) and [gulp-cli](https://www.npmjs.com/package/gulp-cli) packages by typing the following :

```shell
         npm install yo gulp - cli--global
```

- If you prefer to install preview versions of the Teams generator type the following:

```shell
        npm install generator - teams@preview--global
```

## Generate your project and create a group/channel tab

Open a command prompt and create a new directory for your tab project. Navigate to your new directory and type the command `yo teams` . This will start the Teams Yeoman generator. Next, you will be asked a series of config questions:

![generator opening screenshot](/msteams-platform/assets/TeamsTabScreen.PNG)

> ***What is your solution name?*** <br>&emsp; This is your project name. You can accept the suggested name by pressing enter.<br>***Where do you want to place the files?*** <br>&emsp; You are currently in your project directory. Press enter.<br>***Title of your Microsoft Teams app project?*** <br>&emsp; This is your app package name and will be used in the manifest and description of your app. <br>***Your (company) name? (max 32 characters)*** <br>&emsp; Your company name will be used in the manifest.<br>***Which manifest version would you like to use?*** <br>&emsp; For this quickstart select v1.5 which is the generator's current general available schema.<br>***Enter your Microsoft Partner Id, if you have one? (Leave blank to skip)*** <br>&emsp;This field is not required, and should only be used if you are already part of the [Microsoft Partner Network](https://partner.microsoft.com). <br>***What do you want to add to your project?*** <br>&emsp; Select ( &ast; ) A Tab.<br>
***The URL where you will host this solution?*** <br>&emsp;
>This can be any URL, but by default the generator suggests an Azure Web Sites URL. <br>&emsp; Since you will only be testing your app locally, A valid URL is not necessary to complete this quickstart.<br>***Would you like to include Test framework and initial tests?*** (Y/n) <br>&emsp; For this quickstart choose <u>not</u> to include a test framework. The default is yes; enter **n**.<br>***Would you like to use Azure Applications Insights for telemetry?*** (Y/n) <br>&emsp; For this quickstart choose <u>not</u> to include [Azure Application Insights](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview). The default is yes; enter **n**.<br>***Default Tab Name (max 16 characters)?*** <br>&emsp; Name your tab. The default tab name will be used throughout your project as a file path component.<br>***Do you want this tab to be available in SharePoint Online?*** (Y/n) <br>&emsp; Select **n** unless, in the future, you want to use this app as a [SharePoint Online web part](https://docs.microsoft.com/microsoftteams/platform/concepts/tabs/tabs-in-sharepoint).

>[!NOTE]
>For the file locations referenced in this quickstart, the path component  ***<yourDefaultTabNameTab\>*** is the name that you selected in the generator for ***Default Tab Name*** plus the word ***Tab***.
<br>For example:<br>
DefaultTabName: **MyTab** => **/MyTabTab/**

## Add code to your group/channel tab

Your tab logic is located in the `./src/app/scripts/<yourDefaultTabNameTab>/<yourDefaultTabNameTab>.tsx` TypeScript JSX file . Locate the `render()` method and add the following <div\><&#47;div\> at the top of the `<PanelBody>` container code:

```html
    <PanelBody>
        <div style={styles.section}>
        Hello World! Yo Teams rocks!
        </div>
    </PanelBody>
```

## Create your personal tab

If you prefer *not* to add a personal tab to your app, you can skip this section of the quickStart. Including a personal tab requires creating an additional HTML page and adding few lines of code to existing project files:

> 1.&emsp; In your code editor, create a new HTML file named, `static.html` .  Add the following code:

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
            <p>This is your personal tab!</p>
        </body>
</html>

```

> 2.&emsp;Save the `static.html` file in your app's `web` folder. The relative file path should be: <br>&emsp;`./src/app/web/<yourDefaultTabNameTab>/static.html`<br>

> 3.&emsp; In your code editor, navigate to your app's `manifest.json` file: `./src/manifest/manifest.json/` . Scroll down to the empty staticTabs array ( `"staticTabs":[]` ) and add the following JSON object:

```json
{
    "entityId": "staticTab",
    "name": "Static Tab ",
    "contentUrl": "https://{{HOSTNAME}}/<yourDefaultTabNameTab>/static.html",
    "websiteUrl": "https://{{HOSTNAME}}",
    "scopes": ["personal"]
}

```

> [!Tip]
> Don't forget to update the `"contentURL"` path component in the the staticTabs JSON object with `<yourDefaultTabNameTab>` using your *DefaultTabName* + *Tab*.

> 4.&emsp; Save the updated `manifest.json` file.

> 5.&emsp; Since your content page must be served in an iFrame, open your app's `Tab.ts` TypeScript file in your code editor: `./src/app/<yourDefaultTabNameTab>/<yourDefaultTabNameTab>.ts` and add the following to the list of iFrame decorators:

```typescript
 @PreventIframe("/<yourDefaultAppName>TabNameTab>/static.html")
```

> 6.&emsp; *Save* the updated `Tab.ts` file and *Save all* for good measure.

> [!Note]
> Open a command prompt in your app's project folder to complete the project's gulp tasks.

## Create a Teams App manifest

Now that your tab code is complete, you can build your project:
>The [Teams App manifest](/msteams-platform/_old/resources/schema/manifest-schema.md) will be part of your app package zip file (along with your two app icons) and will be uploaded into Microsoft Teams. This is achieved through a gulp task that validates the manifest and creates the zip file in the `./package directory`. In the command prompt, type the following:

```shell
gulp manifest
```

## Build your app

>The build command compiles your solution into the `./dist` folder. In the command prompt, type the following:

```shell
gulp build
```

## Run your app in localhost

>To build and start a local web server, in the command prompt, type the following:

```shell
gulp serve
```

>Enter `http://localhost:3007/<yourDefaultAppNameTab>/` in your browser and view your configurable tab's content page:

>>![configurable tab screenshot](/msteams-platform/assets/configTab.PNG)

>To view your personal tab, remain in the current browser and add `static.html` to the app's file path: `http://localhost:3007/<yourDefaultAppNameTab>/static.html` Press Enter.<br>

>>![static tab screenshot](/msteams-platform/assets/staticTab.PNG)

> [!Note]
>To view your configuration page, add  `config.html` to the file path: `http://localhost:3007/<yourDefaultAppNameTab>/config.html`.

## Package your app for Microsoft Teams

Microsoft Teams is an entirely cloud-based product, and thus requires your app to be available from the cloud using HTTPS endpoints. Microsoft Teams does not allow apps to be hosted on localhost. Therefore, you need to either publish your app to a public URL or use a proxy which will expose your local port to an internet-facing URL.

The [ngrok](https://ngrok.com/docs) tool, which is built into this project, is a reverse proxy software application that will create a tunnel to your locally running web server's publicly-available HTTPS endpoints. Your server's web endpoints will be available during the current session on your local machine. When the machine is shut down or goes to sleep the service will no longer be available.

>In your command prompt, enter the following:

```shell
gulp ngrok-serve
```

## Upload and run your app in Microsoft Teams

Open Microsoft Teams. In the **YourTeams** panel click (**&#8943;**) *More options* next to the team that you are using to test your app's tabs and Select *Manage team*.  In the main panel click on *Apps* from the tab bar and click on *Upload a custom app* located in the lower right-hand corner of the page. Open your project folder, browse to the `./package` folder, select the zip file in the `./package` folder, right-click, and choose open. Your app will upload into Microsoft Teams.

Return to your team's General channel and select ➕ to add your tab from the list of tabs. Follow the directions for adding a tab. Note that there is a custom configuration dialog for your group/channel tab. Select *Save* and your tabs should be loaded in Microsoft Teams.

## Add and view your group/channel tab

1. Choose ➕ *Add a tab*  from the tab bar.
2. Select your tab from the gallery.
3. Accept the consent prompt.
4. Enter a value for the configuration page.
5. *Save*.
6. To view, select your new tab from the tab bar.

## View your personal tabs

1. In the navbar located at the far-left of the Teams App, click (**&#8943;**) *More added apps*. You will be presented with a list of personal view apps.
2. Select your app's personal/static tab from the list to view.

### Nice work! You just extended Microsoft Teams with custom tabs.
