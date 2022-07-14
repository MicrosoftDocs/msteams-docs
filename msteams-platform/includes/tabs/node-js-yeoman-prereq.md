## Prerequisites for apps

You must have an understanding of the following prerequisites:

- You must have an Office 365 tenant and a team configured with **Allow uploading custom apps** enabled. For more information, see [prepare your Office 365 tenant](~/concepts/build-and-test/prepare-your-o365-tenant.md).

  - If you don't currently have an Office 365 account, you can sign up for a free subscription through the Office 365 Developer Program. The subscription remains active as long as you're using it for ongoing development. See [welcome to the Office 365 Developer Program](/office/developer-program/microsoft-365-developer-program).

In addition, this project requires that you have the following installed in your development environment:

- Any text editor or IDE. You can install and use [Visual Studio Code](https://code.visualstudio.com/download) for free.

- [Node.js/npm](https://nodejs.org/en/). Use the latest LTS version. The Node Package Manager (npm) installs in your system with the installation of Node.js.

- After you have successfully installed Node.js, install the [Yeoman](https://yeoman.io/) and [gulp-cli](https://www.npmjs.com/package/gulp-cli) packages by typing the following in your command prompt:

    ```bash
    npm install yo gulp-cli --global
    ```

- Install the Microsoft Teams Apps generator by typing the following in your command prompt:

    ```bash
    npm install generator-teams --global
    ```

## Generate your project

**To generate your project**

1. Open a command prompt and create a new directory for your tab project.

1. To start the generator, navigate to your new directory and type the following command:

    ```bash
    yo teams
    ```

1. Next, provide a series of values that are used in your application's `manifest.json` file:

    :::image type="content" source="/microsoftteams/platform/assets/images/tab-images/teamsTabScreenshot.PNG" alt-text="The screenshot is an example that shows the generator opening screen.":::

    **What is your solution name?**

    This is your project name. You can accept the suggested name by pressing enter.

    **Where do you want to place the files?**

    You're currently in your project directory. Press enter.

    **Title of your Microsoft Teams app project?**

    This is your app package name and will be used in the app manifest and description.

    **Your (company) name? (max 32 characters)**

    Your company name will be used in the app manifest.

    **Which manifest version would you like to use?**

    Select the default schema.

    **Quick scaffolding? (Y/n)**

    The default is yes; enter **n** to enter your Microsoft Partner Id.

    **Enter your Microsoft Partner Id, if you have one? (Leave blank to skip)**

    This field isn't required and should only be used if you're already part of the [Microsoft Partner Network](https://partner.microsoft.com).

    **What do you want to add to your project?**

    Select ( &ast; ) A Tab.

    **The URL where you will host this solution?**

    By default the generator suggests an Azure Web Sites URL. You'll only be testing your app locally, therefore, a valid URL isn't necessary to complete this quickstart.

    **Would you like show a loading indicator when your app/tab loads?**

    Choose **not** to include a loading indicator when your app or tab loads. The default is no, enter **n**.

   **Would you like personal apps to be rendered without a tab header-bar?**

    Choose **not** to include personal apps to be rendered without a tab header-bar. Default is no, enter **n**.

    **Would you like to include Test framework and initial tests? (y/N)**

    Choose **not** to include a test framework for this project. The default is yes; enter **n**.

    **Would you like to use Azure Applications Insights for telemetry? (y/N)**

    Choose **not** to include [Azure Application Insights](/azure/azure-monitor/app/app-insights-overview). The default is no; enter **n**.

    **Default Tab Name (max 16 characters)?**

    Name your tab. This tab name will be used throughout your project as a file or URL path component.
