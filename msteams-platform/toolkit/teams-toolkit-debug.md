---
title: Debug
author: v-vasudhab
description:  Describes about debug
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: Debug
---

# Debug using Teams Toolkit  

Teams Toolkit allows you to host your app locally or remotely by launching a Teams app already deployed to a remote cloud. You can switch between **run your app locally** and **launch app remotely** by selecting from the Teams Toolkit Run and Debug dropdown list.

 ![Debug using Teams Toolkit](~/assets/images/tools-and-sdks/debug-using-teams-toolkit.png)

Difference between local debugging and remote launch：

|Launch type | Details|
|-----------|----------|
|Debug your app locally | Teams Toolkit helps to launch the related backend services locally and launch Teams client to load the app running on the local machine. |
|Remote launch your app | <br> Teams Toolkit helps to load the app running on the remote cloud. <br>Ensure related services are running correctly on the remote cloud.</br>|

## To build and run your app locally

1. Press F5 to run your application in debug mode in Visual Studio Code.

> [!NOTE]
> By default, Teams toolkit runs the app in local debug mode.
> When you run the app for the first time, all dependencies are downloaded. A browser window displays, when the build is complete. The process can take 3-5 minutes to complete.

The Toolkit prompts you to install a local certificate if required. This certificate allows Teams to load your application from https://localhost. Select **yes** when the following dialog appears:

 ![Install certificate](~/assets/images/tools-and-sdks/install-certificate.png)

Your web browser runs the app. If prompted to open Teams desktop:

1. Select **Cancel** to remain in the browser. If prompted to switch to Teams desktop at other times; select the Teams web app:

 ![Use web app](~/assets/images/tools-and-sdks/use-web-app.png)

1. Sign in with your M365 account when prompted.
1. Select **Add** to install the app onto Teams.

Your app is now displayed:

 ![Teams app](~/assets/images/tools-and-sdks/app-created.png)

You can start debugging activities, such as setting breakpoints. The app supports hot reloading. If you change any file within the project, the page will be reloaded.

## Limitations

For any Teams app, you can only install an app package with configuration file, called manifest and app icons to Teams client. The rest of the app logics and data storage are hosted elsewhere, such as Azure Web Services. Your app in the cloud or localhost accesses Teams through HTTPS during your development.

 ![Teams app in cloud](~/assets/images/tools-and-sdks/app-hosting-in-cloud.png)

## To launch your app remotely

1. Before you launch the app remotely:

* Ensure all the remote services for your Teams app are running correctly.
* At this point you have an app hosted on the internet. You must create an app package with app manifest, and icons for Teams clients to display and brand the app.
* Use Teams toolkit or Developer Portal to create this app package to simplify the process of registering the app.

1. From Visual Studio Code, select **Launch Remote …** from the dropdown based on your browser preference.

 ![Debug using Teams Toolkit](~/assets/images/tools-and-sdks/debug-using-teams-toolkit.png)

## See also

[Publish Teams apps using Teams Toolkit](teams-toolkit-publish.md)
[Manifest editor](manifest-editor.md)
