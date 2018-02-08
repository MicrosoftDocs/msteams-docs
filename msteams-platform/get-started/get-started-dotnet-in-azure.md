---
title: Host your Teams app in Azure
description: Host your Teams app in Azure using C#/.NET
keywords: getting started azure teams apps .net c# csharp
ms.date: 02/07/2018
---
# Host your .NET Teams app in Azure

## Getting started

If you are using Microsoft Visual Studio 2017 (any version) it is easy to host your app in Azure. For testing you can use a free trial account and migrate to a production ready account when the app is ready for public use.

If you have never used Azure before, you can get started by [creating a new free account](https://azure.microsoft.com/en-us/free/). If possible use the same Microsoft account to sign up that you use when signing into Visual Studio. This free account will be sufficient to run this `Hello World` sample.

If you want more information on hosting apps in Azure, see:

* [Azure developer guide](https://docs.microsoft.com/en-us/azure/guides/developer/azure-developer-guide?toc=/microsoftteams/platform/toc.json&bc=/microsoftteams/platform/breadcrumb/toc.json#understanding-accounts-subscriptions-and-billing).

* [Create a .NET core app in Azure](https://docs.microsoft.com/en-us/azure/app-service/app-service-web-get-started-dotnet).

## Publishing to Azure

### Open the app in Visual Studio

These steps assume that you have a .NET teams app open in Visual Studio. You can follow the steps in [Get started on the Microsoft Teams platform with C#/.NET](~/get-started/get-started-dotnet) to get going quickly.

Once your app is open and built in Visual Studio click on Build and select Publish *your app name*.

<img width="530px" src="~/assets/images/get-started/publishtoazure1.png" title="Visual Studio"/>

This will bring up the *Pick a publish target* screen. In this screen choose *Microsoft Azure App Service*.

<img width="530px" src="~/assets/images/get-started/publishtoazure2.png" title="Pick a publish target"/>

This brings up the *Create App Service* dialog. If you are signed into Visual Studio with the same account that you associated with your Azure account then this account will be shown in the upper right hand corner of the screen. If you want to use a different account you can do so by using the drop down next to the account name to choose something different.

<img width="530px" src="~/assets/images/get-started/publishtoazure5.png" title="Create an App Service"/>

All fields should be filled in with default values. Don't change these for now.  Click Create.
You should now see the Publish dialog. Click *Publish*. Your browser of choice should open, displaying your apps welcome screen.

If this does not happen, you can verify by opening your browser and going to `https://yourteamsapp.azurewebsites.net` (please be sure to use the right endpoint from your Azure App Service instead of this URL) to load your app's hello page.

<img width="530px" src="~/assets/images/get-started/publishtoazure5.png" title="Hello World"/>