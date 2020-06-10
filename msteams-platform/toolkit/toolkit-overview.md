---
title: Build apps with the Microsoft Teams Toolkit
description: Get started building great custom apps in Microsoft Teams using the Microsoft Teams Toolkit
keywords: teams visual studio code
ms.date: 06/30/2020
---
# Develop apps with the Microsoft Teams Toolkit

The Microsoft Teams Toolkit enables you to create custom Teams apps from Visual Studio Code.

## Installing the Microsoft Teams Toolkit

The toolkit is available for download from the [Visual Studio Marketplace](https://aka.ms/teams-toolkit), or directly from Visual Studio or Visual Studio Code.

## Using the toolkit
- [Create a new project](#create-a-new-project)
- [Import an existing project](#import-an-existing-project)
- [Configure your app](#configure-your-app)
- [Package your app](#package-your-app)
- [Run your app in Teams](#run-your-app-in-teams)
- [Validate your app](#validate-your-app)
- [Publish your app](#publish-your-app)

## Create a new project

Open the Teams Toolkit from the Visual Studio Code activity bar. Select *Create a new Teams app* from the list of commands in the side bar. Enter the name of the workspace when prompted. This will be used as both the name of the folder where you project will reside, and the default name of your app. Once you are done, you will arrive at a screen to answer a few basic questions about the app you want to create.

## Import an existing project

  1) Open the Teams Toolkit from the Visual Studio Code activity bar. Select *Import app package* from the list of commands in the side bar. Select an existing publishing zip file. The configuration tab of the toolkit should now be populated with your app's details.
  2) Select *File > Add Folder to Workspace* to add the folder where you source code resides to Visual Studio Code workspace.

## Configure your app

A Teams app consists of two parts:
  1) A server responds to requests for content that will be displayed in Teams ( i.e. a tab's HTML content or a bot's adaptive card ).
  2) An app package that gets installed to Teams

A Microsoft Teams app package consists of three files:
- The manifest Json
- An icon for your app to display in the public or organization app catalog
- A transparent version of the icon for display on the Teams activity bar

When an app is installed, the Teams client parses the manifest file to determine information like the name of your app and the URL where the services are located.

Editing the fields in the *Configuration* tab edits the contents of your manifest file that will ultimately ship as part of the app package. [Learn more](https://aka.ms/teams-toolkit-manifest)

## Package your app
Editing your app's configuration page, manifest file, or the *.env* file in the *.publish* folder will automatically generate your publishing zip file. You will need to include two icons in that same folder.

## Install and run your app locally
Refer to the *Getting Started* content in your project homepage for detailed instructions. In general, you need to install your app's server, get it running, then setup a tunneling solution so that Teams can access content running from localhost.

## Run your app in Teams

Press the *Run* button on the activity bar, then press the *Run* button.

**NOTE**: You need version {X} of the Teams client installed on your machine for this to work. If you are running an older verison of Teams, refer to the instructions in this article: [Upload an app package to Microsoft Teams](https://aka.ms/teams-toolkit-uploadapp)

## Validate your app

TODO: @Emily

## Publish your app

From the *Publish* page you can submit your app to your organization's custom app store. Your IT admin will review these submissions. You can return to the *Publish* page to check on your submission status and learn if your app was approved or rejected by your IT admin. This is also where you'll come to submit updates to your app or cancel any currently active submissions.