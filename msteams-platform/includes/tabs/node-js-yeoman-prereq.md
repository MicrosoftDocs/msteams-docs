## Prerequisites

This project requires the following tools installed in your development environment:

- An Office 365 tenant and a team configured with **Allow uploading custom apps** enabled. For more information, see also [Prepare your Office 365 tenant](~/concepts/build-and-test/prepare-your-o365-tenant.md)

    >[!NOTE]
    >If you do not have an Office 365 account, you can sign up for a free subscription through the Office 365 Developer Program. The subscription remains active as long as you are using it for ongoing development. For more information, see also [Welcome to the Office 365 Developer Program](/OfficeDev/office-dev-program-docs/docs/office-365-developer-program.md).

- Any text editor or IDE. You can install and use [Visual Studio Code](https://code.visualstudio.com/download) for free.

- [Node.js or Node Package Manager](https://nodejs.org/en/). You must use the latest Long Term Support (LTS) version. The Node Package Manager (NPM) installs into your system with the installation of Node.js.

- [Yeoman](https://yeoman.io/) and [gulp-command line interface (cli)](https://www.npmjs.com/package/gulp-cli). Run the following command in your command prompt to install these tools:

    ```bash
    npm install yo gulp-cli --global
    ```

- Open command prompt and run the following command to install the Microsoft Teams Apps generator:

    ```bash
    npm install generator-teams --global
    ```

## Generate your project

1. Open a command prompt and create a new directory for your tab project.

1. Go to your new directory and run the following command to start the generator:

    ```bash
    yo teams
    ```

1. Provide a series of values that are used in your application's **manifest.json** file as in the following image:

    ![generator opening screenshot](/microsoftteams/platform/assets/images/tab-images/teamsTabScreenshot.PNG)

    **What is your solution name?**

    This is your project name. Press enter to accept the suggested name.

    **Where do you want to place the files?**

    You are currently in your project directory. Press enter.

    **Title of your Microsoft Teams app project?**

    This is your app package name, and it is used in the app manifest and description.

    **Your (company) name? (max 32 characters)**

    Your company name is used in the app manifest.

    **Which manifest version would you like to use?**

    Select the default schema.

    **Enter your Microsoft Partner Id, if you have one? (Leave blank to skip)**
    
    This field is not required, and must be used if you are already part of the [Microsoft Partner Network](https://partner.microsoft.com).

    **Quick scaffolding? (Y/n)**

    The default is yes; enter **n** to enter your Microsoft Partner Id.

    **What do you want to add to your project?**

    Select ( &ast; ) A Tab.

    **The URL where you will host this solution?**

    By default, the generator suggests an Azure Web Sites URL. You will only be testing your app locally, therefore, a valid URL is not necessary to complete this quickstart.

    **Would you like to include Test framework and initial tests? (y/N)**

    Select **not** to include a test framework for this project. The default is yes; enter **n**.

    **Would you like to use Azure Applications Insights for telemetry? (y/N)**

    Select **not** to include [Azure Application Insights](/azure-docs/articles/azure-monitor/app/app-insights-overview.md). The default is no; enter **n**.

    **Default Tab Name (max 16 characters)?**

    Name your tab. This tab name is used throughout your project as a file or URL path component.

    **Do you want to create a configurable or static tab?**

    Use the arrow keys to select static tab.
