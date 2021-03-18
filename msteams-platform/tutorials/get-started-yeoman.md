---
title: Tutorial - Create your first app using the Yeoman generator
description: Learn how to get started building Microsoft Teams apps with the Yeoman generator.
keywords: getting started node.js nodejs yeoman
ms.topic: tutorial
ms.custom: scenarios:getting-started
---

# Create your first Microsoft Teams app using the Yeoman generator

>[!Note]
>This tutorial comes from the [Yeoman generator for Teams wiki](https://github.com/OfficeDev/generator-teams/wiki/Build-Your-First-Microsoft-Teams-App).

In this tutorial, we will walk through creating your very first Microsoft Teams app using the Microsoft Teams Yeoman generator. It also walks you through the process of upgrading your Teams using the Yeoman generator. The prerequisite to start with this tutorial is that you have a Teams account that allows [app sideloading](~/concepts/build-and-test/prepare-your-o365-tenant.md).

![yeoman generator git](~/assets/yeoman-demo.gif)

## Setup and prepare your machine

You need to install the following on your machine before starting to use the Yeoman generator.

### Install Node.js

You need to have Node.js installed on your machine. You should use the latest [LTS version](https://nodejs.org).

### Install a code editor

You need a code editor. Most of this documentation and images refer to using [Visual Studio Code](https://code.visualstudio.com). However, feel free to use whatever text editor you prefer.

### Install Yeoman and Gulp CLI

To be able to scaffold projects using the Teams generator you need to install the Yeoman tool and the Gulp CLI task manager.

Open up a command prompt and type the following:

```bash
npm install yo gulp-cli --global
```

## Install the generator

Install the Teams Yeoman generator with the following command:

```bash
npm install generator-teams --global
```

Install the preview version of the generator with the following command:

```bash
npm install generator-teams@preview --global
```

## Generate your project
This section walks you through the steps for generating your project.

**To generate your project**

1. Open up a command prompt and create a new directory where you want to create your project, and in that directory run the command `yo teams`. The generator starts.
1. Respond to the set of questions prompted by the generator.

   ![yo teams](~/assets/yeoman-images/teams-first-app-1.png)

   1. The first question is about your project name, you can leave it as is by pressing enter.
   1. Next question asks you if you want to create a new directory or use the current one. As you are already in the directory you want, just press enter.
   1. In the next question, type the title of your project. This title will be used in the manifest and description of your app. 
   1. Next, you will be asked for a company name, which also will be used in the manifest.
   1. The fifth question asks you about what version of the manifest you want to use. For this tutorial select `v1.5`, which is the current general available schema.
   1. Next, the generator will ask you for what items you want to add to your project. You can select a single one or any combination of items. For this tutorials, just select *a Tab*.

    ![item selection](~/assets/yeoman-images/teams-first-app-2.png)

1. Based on what items you select, you will be asked a set of follow-up questions.
1. Enter a URL of where you will host your solution. 

   > [!NOTE]
   > The URL can be any URL, but by default the generator suggests an Azure web site URL.

The generator has a lot of built-in advanced features that you can opt-in or opt-out of. Following the URL question you will be asked if you want to include unit-testing for your solution, default is *yes*. If you choose this the generated project will have a unit testing framework and some default unit tests for the different items being scaffolded. 
> [!NOTE]
> For this tutorial choose not to include a test framework.

In order to make signing-in easy for you, you will also be asked if you want to use Azure Application Insights for signing-in. If you choose *Yes*, you will need to provide an Azure Application Insights key. 

> [!NOTE]
> For this tutorial opt-out of using Application Insights.

The next set of questions will be based on the previously selected items. For a tab you only need to provide a name and optionally choose if you want to be able to use this app as a SharePoint Online web part. After you have provided the name the generator will generate the project and install all dependencies. This will take a minute or two.

## Add some code to your tab

After the generator is done you can open up the solution in your favorite code editor. Take a minute or two and familiarize yourself with how the code is organized. For more information, see [Project Structure](https://github.com/OfficeDev/generator-teams/wiki/Project-Structure) documentation.

Your Tab will be located in the `./src/app/scripts/myFirstAppTab/MyFirstAppTab.tsx` file. This is the TypeScript React based class for your Tab. Locate the `render()` method and add a line of code inside the `<PanelBody>` control so it looks like this:

``` TypeScript
<PanelBody>
    <div style={styles.section}>
    Hello World! Yo Teams rocks!
    </div>
</PanelBody>
```

Save the file and return to the command prompt.

## Build your app

You can now build your project. This is done in two steps (or one step, see below).

First you need to create the Teams App manifest file, that you upload/sideload into Microsoft Teams. This is done by the Gulp task `gulp manifest`. This will validate the manifest and create a zip file in the `./package` directory.

To build your solution you use the `gulp build` command. This will transpile your solution into the `./dist` folder. 

## Run your app

To run your app you use the `gulp serve` command. This will build and start a local web server for you to test your app. The command will also rebuild the application whenever you save a file in your project. 

You should now be able to browse to `http://localhost:3007/myFirstAppTab/` to ensure that your tab is rendering. However, not in Microsoft Teams yet.

![view your site in a browser](~/assets/yeoman-images/teams-first-app-3.png)

## Run your app in Microsoft Teams

Microsoft Teams does not allow you to have your app hosted on localhost, so you need to either publish it to a public URL or use a proxy such as ngrok.

Good news is that the scaffolded project has this built-in. When you run `gulp ngrok-serve` the ngrok service will be started in the background, with a unique and public DNS entry and it will also package the manifest with that unique URL and then do the exact same thing as `gulp serve`.

After running `gulp ngrok-serve`, create a new Microsoft Teams team and when it is created click on the Team name, to go to the teams settings and then select *Apps*. In the lower right corner you should see a link *Upload a custom app*, select it and then browse to your project folder and the subfolder called `package`. Select the zip file in that folder and choose open. Your App is now sideloaded into Microsoft Teams.

![sideloaded app](~/assets/yeoman-images/teams-first-app-4.png)

Go back to the *General* channel and select *+* to add a new Tab. You should see your tab in the list of tabs.

![configure tab](~/assets/yeoman-images/teams-first-app-5.png)

Choose your tab and follow the instructions to add it. Notice that you have a custom configuration dialog, for which you can edit the source. Select *Save* to add your tab to the channel. Once done your tab should be loaded inside Microsoft Teams!

![running tab in teams](~/assets/yeoman-images/teams-first-app-6.png)

## Upgrade Microsoft Teams
You can also upgrade your current Microsoft Teams version to the latest version using the Microsoft Teams Yeoman generator.

**To upgrade Microsoft Teams**
1. Get current version of Teams with the following command:

   ```PowerShell
    yo teams --version
   ```
2. Use the following command to select update your generator:

   ```PowerShell
    yo
   ```
3. Use the  arrow keys to choose **Update your Generators**.
   ![image of YoSelectUpdatGen](~/assets/images/Update-Teams/YoSelectUpdateGen.png)

4. Select the generator you want from the list of generators.
   > [!NOTE]
   > Use the space bar to select or clear a selected Teams version from the available options.

    ![image of UseSpaceToSelectGenerators](~/assets/images/Update-Teams/UseSpaceToSelectGenerators.png)

   > [!NOTE]
   > It takes few seconds to minutes for Teams installation to complete.

5. After the installation is complete, use the following command to check the installed version:

   ```PowerShell
    yo teams --version
   ```

   
**Congrats! You built and deployed your first Microsoft Teams app. You also upgraded Microsoft Teams.**
