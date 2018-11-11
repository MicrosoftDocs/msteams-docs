---
title: Get started
description: Get started building great apps in Microsoft Teams
keywords: getting started Microsoft teams
ms.date: 11/08/2018
---
# Get started developing apps for Microsoft Teams

Microsoft Teams is a service within Office 365. All users of Teams can install apps from the Store, but you will need to go through special steps to develop and test your apps before they are ready to be added to the store.

You can think of Teams as a single page web application. Most of the content you see in Teams actually comes from the Office 365 servers that support your enterprise. This makes it easy for Teams to access other web-based content and display it in the teams app. At their core, apps for Teams are similar to web services, hosted on third-party web servers.

In addition to hosting the functions of your app on the web, you need to create an app package, which tells the Teams client where on the web to find that functionality. The app package does this via a text file called the manifest. It also contains icons that Teams uses when it displays the app within the Teams client. Teams includes App Studio, which walks you through the process of creating this app package and defining the manifest.

You can follow these walkthroughs to become more familiar with both parts of a Teams app, using either Node.JS or C# and .NET. The following walkthroughs will result in a working app using either technology.

- [Get started using Node.JS](~/get-started/get-started-nodejs-app-studio)
- [Get started using C# and .NET](~/get-started/get-started-dotnet-app-studio)

For more detailed information on Teams apps, see:

- [Apps for Microsoft Teams](~/Concepts/apps-overview)
