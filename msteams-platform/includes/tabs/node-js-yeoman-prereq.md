## Prerequisites

- To complete this quickstart you will need an Office 365 tenant and a team configured with *Allow uploading custom apps* enabled. To learn more, see [Prepare your Office 365 tenant](~/concepts/build-and-test/prepare-your-o365-tenant.md).

  - If you don't currently have an Office 365 account, you can sign up for a free subscription through the Office 365 Developer Program. The subscription will remain active as long as you're using it for ongoing development. See [Welcome to the Office 365 Developer Program](https://docs.microsoft.com/en-us/office/developer-program/microsoft-365-developer-program).

In addition, this project requires that you have the following installed in your development environment:

- Any text editor or IDE. You can install and use [Visual Studio Code](https://code.visualstudio.com/download) for free.

- [Node.js/npm](https://nodejs.org/en/). You should use the latest LTS version. The Node Package Manager (npm) will install into your system with the installation of Node.js.

- After you've successfully installed Node.js, install the [Yeoman](https://yeoman.io/) and [gulp-cli](https://www.npmjs.com/package/gulp-cli) packages by typing the following in your command prompt:

```bash
npm install yo gulp-cli --global
```

- Install the Microsoft Teams Apps generator by typing the following in your command prompt:

```bash
npm install generator-teams --global
```

## Generate your project

- Open a command prompt and create a new directory for your tab project.

- To start the generator, navigate to your new directory and type the following command:

```bash
yo teams
```

- Next, you'll provide a series of values that will be used in your application's **manifest.json** file:

![generator opening screenshot](/microsoftteams/platform/assets/images/tab-images/teamsTabScreenshot.PNG)

**What is your solution name?**

This is your project name. You can accept the suggested name by pressing enter.

**Where do you want to place the files?**

You're currently in your project directory. Press enter.

**Title of your Microsoft Teams app project?**

This is your app package name and will be used in the app manifest and description.

**Your (company) name? (max 32 characters)**

Your company name will be used in the app manifest.

<br>**Which manifest version would you like to use?**

Select the default schema.

**Quick scaffolding? (Y/n)**

The default is yes; enter **n** to enter your Microsoft Partner Id.

**Enter your Microsoft Partner Id, if you have one? (Leave blank to skip)**

This field isn't required and should only be used if you're already part of the [Microsoft Partner Network](https://partner.microsoft.com).

**What do you want to add to your project?**

Select ( &ast; ) A Tab.

**The URL where you will host this solution?**

By default the generator suggests an Azure Web Sites URL. You'll only be testing your app locally, therefore, a valid URL is not necessary to complete this quickstart.

**Would you like to include Test framework and initial tests? (y/N)**

Choose **not** to include a test framework for this project. The default is yes; enter **n**.

**Would you like to use Azure Applications Insights for telemetry? (y/N)**

Choose **not** to include [Azure Application Insights](/azure-docs/articles/azure-monitor/app/app-insights-overview.md). The default is no; enter **n**.

**Default Tab Name (max 16 characters)?**

Name your tab. This tab name will be used throughout your project as a file/URL path component.
