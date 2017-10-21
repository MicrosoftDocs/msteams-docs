---
title: Get started with Node.js
description: Get started building great apps in Microsoft Teams using Node.js
keywords: getting started node.js nodejs
---
# Get started on the Microsoft Teams platform with Node.js

[!include[Step 1 Intro](~/includes/get-started/step1-intro.md)]

This tutorial helps you get started with creating a Microsoft Teams app using Node.js. You can test the app by loading it into a 'Team' you have permissions for, or into a test tenant created using the Office Developer Program.

The steps to get started at a glance are as follows:

> [!div class="checklist"]
> * Prepare Microsoft Teams for development (**talk about enabling sideloading, or getting a new O365 tenant etc**)
> * Get prerequisite tools (**talk about installing git, node etc, chose not to use yeomen here**)
> * Download the msteams-hello-world sample (**create a repo with a barebones hello world tabs app, that just shows hello world**)
> * Build and run the sample (**build step to generate the manifest, run the app on node locally first**)
> * Host the sample, either locally or on Azure (**plug the local app to ngrok or push to Azure**)
> * Deploy the sample app into Microsoft Teams platform (**by this time the manifest would be generated and they should be able to sideload the app**)
> * Configure the content visible in your app (**configure the content visible on the tab; TBD**)

Once you have your app running in the Teams platform, you can enhance it further by adding more capabilities. The following are the capabilities you can add to your app at a glance:

> [!div class="checklist"]
> * Add a bot to your application (**take the user through creation of a simple echo bot that echoes whatever you say**)
> * Add a connector to your application (**Not calling it Office 365 connector yet, but will guide the user to use it if they built an O365 connector before**)
> * Compose rich messages (**adding a simple compose extension**)

## Prepare Microsoft Teams for development

[!include[Get teams](~/includes/get-started/step1-prepare-for-dev.md)]

## Prerequisites

To complete this tutorial:

* [Install Git](https://git-scm.com/downloads)
* [Install Node.js and NPM](https://nodejs.org/)

Verify your installation by running the following in a terminal window:

```bash
git --version
```

```NodeJS
node -v
```

```NodeJS
npm -v
```

<!--
> [!div class="nextstepaction"]
> [Move to the next step](get-started-step2)
-->