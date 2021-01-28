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

In this tutorial we will walk through creating your very first Microsoft Teams app using the Microsoft Teams Yeoman generator. It assumes that you have a Teams account that allows [app sideloading](~/concepts/build-and-test/prepare-your-o365-tenant.md).

![yeoman generator git](~/assets/yeoman-demo.gif)

## Setup and prepare your machine

You need to install the following on your machine before starting to use the Yeoman generator.

### Install Node.js

You need to have Node.js installed on your machine. You should use the latest [LTS version](https://nodejs.org).

### Install a code editor

You also need a code editor, feel free to use whatever text editor you prefer. However most of this documentation and screenshots refer to using [Visual Studio Code](https://code.visualstudio.com).

### Install Yeoman and Gulp CLI

To be able to scaffold projects using the Teams generator you need to install the Yeoman tool as well as the Gulp CLI task manager.

Open up a command prompt and type the following:

```bash
npm install yo gulp-cli --global
```

## Install the generator

Install the Teams Yeoman generator with the following command:

```bash
npm install generator-teams --global
```

To install preview versions of the generator, run this command:

```bash
npm install generator-teams@preview --global
```

## Generate your project

Open up a command prompt and create a new directory where you want to create your project and in that directory run the command `yo teams`.

This starts the generator, which prompts you with a set of questions.

![yo teams](~/assets/yeoman-images/teams-first-app-1.png)

The first question is about your project name, you can leave it as is by pressing enter. Next question asks you if you want to create a new directory or use the current one. As we already are in the directory we want, we just press enter.

The following step asks for a title of your project, this title will be used in the manifest and description of your app. And then you will be asked for a company name, which also will be used in the manifest.

The fifth question asks you about what version of the manifest you want to use. For this tutorial select `v1.5`, which is the current general available schema.

After this the generator will ask you for what items you want to add to your project. You can select a single one or any combination of items. For now, just select *a Tab*.

![item selection](~/assets/yeoman-images/teams-first-app-2.png)

Based on what items you select, you will be asked a set of follow-up questions.

Now you need to enter a URL of where you will host your solution. This can be any URL, but by default the generator suggests an Azure Web Sites URL.

The generator has a lot of built-in advanced features that you can opt-in or opt-out of. Following the URL question you will be asked if you want to include unit-testing for your solution, default is yes. If you choose this the generated project will have a unit testing framework and some default unit tests for the different items being scaffolded. For this tutorial choose not to include a test framework.

In order to make logging easy for you, you will also be asked if you want to use Azure Application Insights for logging. If you choose Yes, you will need to provide a Azure Application Insights key. For this tutorial opt-out of using Application Insights.

The next set of questions will be based on your selection of items previously. For a tab you only need to provide a name and optionally choose if you want to be able to use this app as a SharePoint Online web part. Once you have provided this name the generator will generate the project and install all dependencies. This will take a minute or two.

## Add some code to your tab

Once the generator is done you can open up the solution in your favorite code editor. Take a minute or two and familiarize yourself with how the code is organized - you can read more about that in the [Project Structure](https://github.com/OfficeDev/generator-teams/wiki/Project-Structure) documentation.

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

**Congrats! You built and deployed your first Microsoft Teams app**
