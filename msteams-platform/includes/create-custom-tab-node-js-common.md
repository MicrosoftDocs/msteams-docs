## Prerequisites

- To complete this quickstart you will need an Office 365 tenant and a team configured with *Allow uploading custom apps* enabled. To learn more, see [Manage Microsoft Teams settings for your organization](/OfficeDocs-SkypeForBusiness/Teams/enable-features-office-365.md).

    - If you don't currently have an Office 365 account, you can sign up for a free subscription through the Office 365 Developer Program. The subscription will remain active as long as you're using it for ongoing development. See [Welcome to the Office 365 Developer Program](/OfficeDev/office-dev-program-docs/docs/office-365-developer-program.md).

In addition, this project requires that you have the following installed in your development environment:

- Any text editor or IDE. You can install and use [Visual Studio Code](https://code.visualstudio.com/download) for free.

- [Node.js/npm](https://nodejs.org/en/). You should use the latest LTS version. The Node Package Manager (npm) will install into your system with the installation of Node.js.

- After you have successfully installed Node.js, install the [Yeoman](https://yeoman.io/) and [gulp-cli](https://www.npmjs.com/package/gulp-cli) packages by typing the following in your command prompt :

```bash
         npm install yo gulp - cli--global
```

## Generate your project

- Open a command prompt and create a new directory for your tab project.
- To start the generator, navigate to your new directory and type the following command:

```bash
  yo teams
```

- Next, you'll provide a series of config parameters that will be used in your application's **manifest.json** file:

![generator opening screenshot](/microsoftteams/platform/assets/images/tab-images/teamsTabScreenshot.PNG)

**What is your solution name?** <br>This is your project name. You can accept the suggested name by pressing enter.<br>**Where do you want to place the files?** <br> You're currently in your project directory. Press enter.<br>**Title of your Microsoft Teams app project?** <br> This is your app package name and will be used in the app manifest and description. <br>**Your (company) name? (max 32 characters)** <br> Your company name will be used in the app manifest.<br>**Which manifest version would you like to use?** <br>Select v1.5 which is the generator's current general available schema.<br>**Enter your Microsoft Partner Id, if you have one? (Leave blank to skip)** <br>This field isn't required and should only be used if you're already part of the [Microsoft Partner Network](https://partner.microsoft.com). <br>**What do you want to add to your project?** <br> Select ( &ast; ) A Tab.<br>
**The URL where you will host this solution?** <br>
By default the generator suggests an Azure Web Sites URL. You'll only be testing your app locally, therefore, a valid URL is not necessary to complete this quickstart.<br>**Would you like to include Test framework and initial tests? (Y/n)** <br> Choose **not** to include a test framework for this project. The default is yes; enter **n**.<br>**Would you like to use Azure Applications Insights for telemetry? (Y/n)** <br> Choose <u>not</u> to include [Azure Application Insights](/azure-docs/articles/azure-monitor/app/app-insights-overview.md). The default is yes; enter **n**.<br>**Default Tab Name (max 16 characters)?** <br> Name your tab. The default tab name will be used throughout your project as a file path component.<br>**Do you want this tab to be available in SharePoint Online? (Y/n)** <br> Select **n** unless, in the future, you want to use this app as a [SharePoint Framework web part](/msteams-platform/concepts/tabs/tabs-in-sharepoint).

>[!IMPORTANT]
>The path component **yourDefaultTabNameTab**, referenced in this quickstart, is the name that you entered in the generator for **Default Tab Name** plus the word **Tab**.
>
>For example: DefaultTabName: **MyTab** => **/MyTabTab/**
