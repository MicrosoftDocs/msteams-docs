---
title: Debug
author: Rajeshwari-v
description:  Describes about debug
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: Debug
---

# Debug using Teams Toolkit  

Teams Toolkit allows you to host your app locally or remote launch a Teams app which has been already deployed to a remote cloud. You can switch between “run your app locally” and “launch app remotely” by selecting from the Teams Toolkit Run and Debug dropdown list.

 ![Debug using Teams Toolkit](~/assets/images/teams-toolkit-v2/debug-using-teams-toolkit.png)

Difference between local debugging and remote launch：

|Launch type|Where services are running|Details|
|-----------|----------------------|-------|
|Debug your app locally |on the local machine |Teams Toolkit will help to launch the related backend services locally and launch Teams client to load the app running on the local machine. |
|Remote launch your app | on the remote cloud |<br> Teams Toolkit will not help launch the backend services and only help to load the app running on the remote cloud. <br>Developer need to make sure that all the related services are running correctly on the remote cloud.</br>|

## To build and run your app locally

1. From Visual Studio Code, press F5 to run your application in debug mode. By default, Teams toolkit will run the app in local debug mode.

When you run the app for the first time, all dependencies are downloaded and the app is built. A browser window automatically opens when the build is complete. This can take 3-5 minutes to complete.

The Toolkit prompts you to install a local certificate if required. This certificate allows Teams to load your application from https://localhost. Select yes when the following dialog appears:

 ![Install certificate](~/assets/images/teams-toolkit-v2/install-certificate.png)

1. Your web browser starts to run the app. If prompted to open Teams desktop, select Cancel to remain in the browser. You may also be prompted to switch to Teams desktop at other times; select the Teams web app when this happens.

 ![Use web app](~/assets/images/teams-toolkit-v2/use-web-app.png)

1. Sign in with your M365 account when prompted.
1. When prompted to install the app onto Teams, press Add.

Your app is now displayed:

 ![Teams app](~/assets/images/teams-toolkit-v2/app-created.png)

You can do normal debugging activities as if this were any other web application, such as setting breakpoints. The app supports hot reloading. If you change any file within the project, the page will be reloaded.

## Teams does not host your app

One thing that is important to know is that for any Teams app, you will only install an app package that contains a configuration file, called manifest and app icons to Teams client. The rest of the app logics and data storage are hosted elsewhere, such as Azure Web Services. Your app in the cloud or localhost during your development accesses Teams via HTTPS.

 ![Teams app in cloud](~/assets/images/teams-toolkit-v2/app-hosting-in-cloud.png)

## To launch your app remotely:

1. Before you launch the app remotely:

* Make sure all the remote services for your Teams app are running correctly.
* At this point you have an app hosted on the internet, but you have no way yet of telling Teams where to look for it, or even what your app is called. To do this you now have to create an app package. This is little more than a text file that contains the app manifest and some icons that the Teams client will use to properly display and brand your app.
* Use Teams toolkit or Developer Portal to create this app package to simplify the process of registering the app.

1. From Visual Studio Code, select “Launch Remote …” from the dropdown list based on your browser preference.

 ![Debug using Teams Toolkit](~/assets/images/teams-toolkit-v2/debug-using-teams-toolkit.png)
 
