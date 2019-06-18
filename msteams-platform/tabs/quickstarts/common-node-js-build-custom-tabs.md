>[!NOTE]
>This quickstart follows the steps outlined in the [Build Your First Microsoft Teams App](/OfficeDev/generator-teams/wiki/Build-Your-First-Microsoft-Teams-App) Wiki found in the Microsoft OfficeDev GitHub repository.

Custom tabs enable you to embed web-based content directly into Microsoft Teams via your [Teams App Package](/msteams-platform/_old/concepts/apps/apps-package.md) (see [What are custom tabs in Microsoft Teams?](/msteams-platform/tabs/what-are-custom-tabs.md)). Custom tabs can be scoped for either group/channel use, serving configurable/dynamic content, or personal use, serving static content. An app can have one group/channel tab and up to sixteen personal tabs.

In this quickstart we will walk-through creating a custom tab using the [Microsoft Teams App Project Generator](/OfficeDev/generator-teams). For more information, see the Microsoft Teams App [Project Structure](/OfficeDev/generator-teams/wiki/Project-Structure) documentation.

## Prerequisites

- To complete this tutorial you will need an Office 365 tenant and a team configured with *Allow uploading custom apps* enabled (see [Manage Microsoft Teams settings for your organization](/OfficeDocs-SkypeForBusiness/Teams/enable-features-office-365.md)). If you do not currently have an Office 365 account, you can sign up for the Office 365 Developer Program to get a free subscription to build your own solutions. The subscription will remain active as long as you are using the subscription for ongoing development (see [Welcome to the Office 365 Developer Program](/OfficeDev/office-dev-program-docs/docs/office-365-developer-program.md)).

In addition, the project requires that you have the following installed in your development environment:

- [Node.js/npm](https://nodejs.org/en/). You should use the latest LTS version. The Node Package Manager (npm) will install into your system with the installation of Node.js.

- Any text editor or IDE. You can install and use [Visual Studio Code](https://code.visualstudio.com/download) for free.

- After you have successfully installed Node.js/npm, install the [Yeoman](https://yeoman.io/) and [gulp-cli](https://www.npmjs.com/package/gulp-cli) packages by typing the following :

```bash
         npm install yo gulp - cli--global
```

- If you prefer to install preview versions of the Teams generator type the following:

```bash
        npm install generator - teams@preview--global
```

## Generate your project

Open a command prompt and create a new directory for your tab project. Navigate to your new directory and type the command `yo teams` . This will start the Teams Yeoman generator. Next, you will be asked a series of config questions:

![generator opening screenshot](/msteams-platform/assets/TeamsTabScreen.PNG)

> ***What is your solution name?*** <br>&emsp; This is your project name. You can accept the suggested name by pressing enter.<br>***Where do you want to place the files?*** <br>&emsp; You are currently in your project directory. Press enter.<br>***Title of your Microsoft Teams app project?*** <br>&emsp; This is your app package name and will be used in the manifest and description of your app. <br>***Your (company) name? (max 32 characters)*** <br>&emsp; Your company name will be used in the manifest.<br>***Which manifest version would you like to use?*** <br>&emsp; For this quickstart select v1.5 which is the generator's current general available schema.<br>***Enter your Microsoft Partner Id, if you have one? (Leave blank to skip)*** <br>&emsp;This field is not required, and should only be used if you are already part of the [Microsoft Partner Network](https://partner.microsoft.com). <br>***What do you want to add to your project?*** <br>&emsp; Select ( &ast; ) A Tab.<br>
***The URL where you will host this solution?*** <br>&emsp;
>This can be any URL, but by default the generator suggests an Azure Web Sites URL. <br>&emsp; Since you will only be testing your app locally, A valid URL is not necessary to complete this quickstart.<br>***Would you like to include Test framework and initial tests?*** (Y/n) <br>&emsp; For this quickstart choose <u>not</u> to include a test framework. The default is yes; enter **n**.<br>***Would you like to use Azure Applications Insights for telemetry?*** (Y/n) <br>&emsp; For this quickstart choose <u>not</u> to include [Azure Application Insights](/azure-docs/articles/azure-monitor/app/app-insights-overview.md). The default is yes; enter **n**.<br>***Default Tab Name (max 16 characters)?*** <br>&emsp; Name your tab. The default tab name will be used throughout your project as a file path component.<br>***Do you want this tab to be available in SharePoint Online?*** (Y/n) <br>&emsp; Select **n** unless, in the future, you want to use this app as a [SharePoint Framework web part](/msteams-platform/concepts/tabs/tabs-in-sharepoint).

>[!NOTE]
>For the file locations referenced in this quickstart, the path component  ***<yourDefaultTabNameTab\>*** is the name that you selected in the generator for ***Default Tab Name*** plus the word ***Tab***.
<br>For example:<br>
DefaultTabName: **MyTab** => **/MyTabTab/**
