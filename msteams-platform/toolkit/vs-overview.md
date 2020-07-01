---
title: Build apps with the Microsoft Teams Toolkit and Visual Studio
description: Get started building great custom apps directly within Visual Studio with the Microsoft Teams Toolkit
keywords: teams visual studio toolkit
ms.date: 06/30/2020
---
# Build apps with the Microsoft Teams Toolkit and Visual Studio

The Microsoft Teams Toolkit enables you to create custom Teams apps directly within the Visual Studio environment. The toolkit guides you through the process and provides everything you need to build, debug, and launch your Teams app.

## Installing the Teams Toolkit

The Microsoft Teams Toolkit for Visual Studio is available for download from the [Visual Studio Marketplace](https://aka.ms/teams-toolkit) or directly as an extension within Visual Studio.

## Using the toolkit

- [Set up a new project](#set-up-a-new-teams-project)
- [Configure your app](#configure-your-app)
- [Package your app](#package-your-app)
- [Run your app in Teams](#run-your-app-in-teams)
- [Validate your app](#validate-your-app)
- [Publish your app](#publish-your-app-to-teams)

## Set up a new Teams project

1. Create a new project and select the Microsoft Terams Toolkit template.
1. You will arrive at the **Add capabilities** screen configure the properties for your new app.
1. Select the **Finish** button to complete the configuration process.

## Configure your app

At its core, the Teams app embraces three components:

  1. The Microsoft Teams client (web, desktop or mobile) where users interact with your app.
  1. A server that responds to requests for content that will be displayed in Teams, e.g., HTML tab content or a bot adaptive card .
  1. A Teams [app package](/concepts/build-and-test/apps-package.md) consisting of three files:

  > [!div class="checklist"]
  >
  > - The manifest.json 
  > - A [color icon](../resources/schema/manifest-schema.md#icons) for your app to display in the public or organization app catalog
 > - An [outline icon](../resources/schema/manifest-schema.md#icons) for display on the Teams activity bar.

When an app is installed, the Teams client parses the manifest file to determine needed information like the name of your app and the URL where the services are located.

1. To configure your app, navigate to the **Microsoft Teams Toolkit** extension window.
1. Select **Edit app package** to view the **App details** page.
1. Editing the fields in the App details page updates the contents of the manifest.json file that will ultimately ship as part of the app package. [Learn more](https://aka.ms/teams-toolkit-manifest)

## Package your app

Modifying your the **app details** page or updating the **manifest**, or **.env** files in your app's  **.publish** folder will automatically generate your **Development.zip** file. You'll need to include [two icons](../concepts/build-and-test/apps-package.md#icons) in that same folder.

## Install and run your app locally

From the *Solutions Configurations* dropdown menu, select *Deploy*. Press the *ISS Express + Teams* button. Teams will launch and the app installation dialogue should appear in the Teams client.

## Validate your app

The **Validate** page allows you to check your app package before submitting your app to AppSource. Simply upload the manifest package and the validation tool will check your app against all manifest related test cases. For each failed tests, the description provides a documentation link to help you fix the error. For the tests that are hard to automate, the **Preliminary checklist** details 7 of the most common failed test cases as well as link to a complete submission checklist.

## Publish your app to Teams

On your project home page, you can upload your app to a team, submit your app to your company custom app store for users in your organization, or submit your app to App Source for all Teams users. Your IT admin will review these submissions. You can return to the *Publish* page to check on your submission status and learn if your app was approved or rejected by your IT admin. This is also where you'll come to submit updates to your app or cancel any currently active submissions.

> [!div class="nextstepaction"]
> [Next step: Maintaining and supporting your published app](../concepts/deploy-and-publish/appsource/post-publish/overview.md)