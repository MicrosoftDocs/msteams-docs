---
title: Tutorial - Create your first app using the Yeoman generator
description: Learn how to get started building Microsoft Teams apps with the Yeoman generator.
keywords: getting started node.js nodejs yeoman
localization_priority: Normal
ms.topic: tutorial
ms.custom: scenarios:getting-started
---

# Build your first Microsoft Teams app using the Yeoman generator

> [!Note]
> This tutorial comes from the [Yeoman generator for Teams wiki](https://github.com/OfficeDev/generator-teams/wiki/Build-Your-First-Microsoft-Teams-App).

This tutorial walks you through the steps to create your first Teams app using the Microsoft Teams Yeoman generator. It also covers the process of upgrading your Teams using the Yeoman generator. Before you begin, ensure you have a Teams account that allows [app sideloading](~/concepts/build-and-test/prepare-your-o365-tenant.md).

![yeoman generator git](~/assets/yeoman-demo.gif)

[!include [prepare your environment](~/includes/prepare-environment.md)]

<a name="GetPrerequisites"></a>

## Get Prerequisites

Install the following tools on your machine before you use the Yeoman generator:

* Node.js:

   Use the latest [LTS version](https://nodejs.org).

* A code editor

   This tutorial uses [Visual Studio Code](https://code.visualstudio.com). However, feel free to use whatever text editor you prefer.

* Yeoman and Gulp CLI

   To scaffold projects using the generator, install the Yeoman tool and Gulp CLI task manager.

   Open a command prompt and enter the following to install these tools:

   ```bash
   npm install yo gulp-cli --global
   ```

## Install the generator

Install the Teams Yeoman generator using the following command:

```bash
npm init yo teams
```

Install the preview version of the generator using the following command:

```bash
npm init yo teams@preview
```

## Generate your project

This section walks you through the steps to generate your project.

**To generate your project**

1. Open a command prompt and create a new directory where you want to create your project.
1. Go to the directory, and run the command `yo teams`. The generator starts.
1. Respond to the set of questions prompted by the generator:

   ![yo teams](~/assets/yeoman-images/teams-first-app-1.png)

   1. Enter a name for your project. You can leave it as is by selecting **Enter**.
   1. For this tutorial, you've created the directory for your project. Select **Enter**.
   1. Enter the title of your project. This title is used in the manifest and description of your app. 
   1. Enter a company name, which is also used in the manifest.
   1. Enter the version of the manifest you want to use. For this tutorial select `v1.5`, which is the current general available schema.
   1. Select the items you want to add to your project. You can select one or any combination of items. For this tutorial, select *a Tab*:

    ![item selection](~/assets/yeoman-images/teams-first-app-2.png)

1. Respond to the next set of follow-up questions that appear. These questions are based on the items you selected in Step 3.
1. Enter a URL for the location where you want to host your solution. 

   > [!NOTE]
   > The URL can be any URL, but by default the generator suggests an Azure web site URL.

1. Confirm if you want to include unit-testing for your solution. The default response is **Yes**. If you opt to include unit-testing, the generated project will have a unit testing framework, and some default unit tests for the different items being scaffolded. 
   > [!NOTE]
   > * For this tutorial choose not to include a test framework.
   > * The generator has a lot of built-in advanced features that you can opt-in or opt-out of.

1. Select if you want to use Azure Application Insights for signing-in. This option simplifies the signing in process for you. If you select **Yes**, you need to provide an Azure Application Insights key. 

   > [!NOTE]
   > For this tutorial, opt-out of using Application Insights.

   The next set of questions depends on the items you selected. For a tab, you need to provide only a name. You can also choose if you want to use this app as a SharePoint Online web part. After you provide the name, the generator scaffolds the project and installs all dependencies. This step takes a minute or two.

## Add code to your tab

After you've generated the project, open up the solution in your favorite code editor. Familiarize yourself with how the code is organized. For more information, see [Project Structure](https://github.com/OfficeDev/generator-teams/wiki/Project-Structure) documentation.

Your tab is in the `./src/app/scripts/myFirstAppTab/MyFirstAppTab.tsx` file. This code is the TypeScript React-based class for your tab. 

1. Locate the `render()` method and add a line of code inside the `<PanelBody>` control so it looks like the following code:

   ``` TypeScript
   <PanelBody>
      <div style={styles.section}>
      Hello World! Yo Teams rocks!
      </div>
   </PanelBody>
   ```
1. Save the file, and return to the command prompt.

## Build your app

You can now build your project. This task is done in two steps.

1. Create the Teams App manifest file for the app that you uploaded into Teams. This step is done by the Gulp task `gulp manifest`. It validates the manifest, and creates a zip file in the `./package` directory.
1. Run the `gulp build` command to build the solution. Your solution is transpiled into the `./dist` folder. 

## Run your app

To run your app, use the `gulp serve` command. Your app is built. It also starts a local web server for you to test your app. You can use this command to rebuild the application whenever you save a file in your project.

Go to `http://localhost:3007/myFirstAppTab/` and ensure that the tab has rendered.


**To render your tab in Microsoft Teams**

![view your site in a browser](~/assets/yeoman-images/teams-first-app-3.png)

### Run your app in Microsoft Teams

To publish your app in Teams, you need to either host it on a public URL, or use a proxy, such as ngrok. The scaffolded project is built to enable publishing. 

**To run your app in Teams**

1. Run `gulp ngrok-serve` in the Terminal. When you run `gulp ngrok-serve`, the ngrok service starts in the background. It has a unique and public DNS entry. ngrok packages the manifest with that unique URL. Then, it follows with the same process as `gulp serve`.
1. Create a new Microsoft Teams team.
1. Select the Team name > Teams Settings > Apps.
1. From the lower right corner, select **Upload a custom app**.
1. Go to the `package` folder under your project folder. 
1. Select the zip file in that folder, and select **Open**. 
   Your App is now sideloaded into Microsoft Teams:

   ![sideloaded app](~/assets/yeoman-images/teams-first-app-4.png)
1. Go back to the **General** channel, and select **+** to add a new Tab. You should see your tab in the list of tabs:
   ![configure tab](~/assets/yeoman-images/teams-first-app-5.png)
1. Select your tab, and follow the instructions to add it. Notice that you have a custom configuration dialog, for which you can edit the source. Select **Save** to add your tab to the channel. Your tab is now loaded inside Microsoft Teams.

   ![running tab in teams](~/assets/yeoman-images/teams-first-app-6.png)

### Upgrade Microsoft Teams

You can also upgrade your current Microsoft Teams version to the latest version using the Microsoft Teams Yeoman generator.

**To upgrade Microsoft Teams**

1. Get the current version of Teams with the following command:

   ```PowerShell
    yo teams --version
   ```
2. Use the following command to select and update your generator:

   ```PowerShell
    yo
   ```
3. Use the arrow keys to select **Update your Generators**:

   ![image of YoSelectUpdatGen](~/assets/images/Update-Teams/YoSelectUpdateGen.png)

4. Select the generator you want from the list:
   > [!NOTE]
   > Use the space bar to select or clear a selected Teams version from the available options.

    ![image of UseSpaceToSelectGenerators](~/assets/images/Update-Teams/UseSpaceToSelectGenerators.png)
    

   > [!NOTE]
   > It takes few seconds to a few minutes for Teams installation to complete.

5. After the installation is complete, use the following command to check the installed version:

   ```PowerShell
    yo teams --version
   ```
   Congrats! You built and deployed your first Microsoft Teams app. You also upgraded Microsoft Teams.

 ## See also

* [Tutorials Overview](code-samples.md)
* [Create a conversational bot app](first-app-bot.md)
* [Create a messaging extension](first-message-extension.md)
* [Code Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples)
