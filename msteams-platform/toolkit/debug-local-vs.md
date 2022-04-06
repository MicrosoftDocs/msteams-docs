---
title: Debug Teams app using Visual Studio
description: Debug Teams app using Visual Studio
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 04/06/2022
---

# Debug Teams app using Visual Studio

## To build and run your app locally

1. Open the latest version of Visual Studio.
1. Select **Debug** > **Start Debugging** or select **F5** to run your app in debug mode. This is as shown in the following image:

## Debug process using F5

When you select **F5**, Teams Toolkit:

 1. Registers your application with Azure Active Directory.
 1. Registers your application for "sideloading" in Teams.
 1. Starts your application backend running locally.
 1. Starts your application front-end hosted locally.
 1. Starts Teams in a web browser with a command to instruct Teams to side load the application (the URL is registered inside the application manifest).

## See Also

[Provision app in the cloud](provision-to-cloud.md)
[Deploy app to the cloud](deploy-to-cloud.md)