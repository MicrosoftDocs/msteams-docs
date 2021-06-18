---
title: Publish an app to your org
description: There are several ways to distribute a Microsoft Teams app you built specifically for your org.
ms.topic: how-to
author: heath-hamilton
ms.author: surbhigupta
---

# Publish your Microsoft Teams app to your org

If you built a Microsoft Teams app specifically for your organization, there are several ways to publish the app. The process is essentially the same with each option: You submit the app to your Teams admin, who's responsible for making it available in your org's app catalog.

## Prerequisites

* Contact your Teams admin to make sure your org allows custom apps.
* [Validate your app manifest](https://dev.teams.microsoft.com/appvalidation.html) for errors and create your [app package](~/concepts/build-and-test/apps-package.md).
* Make sure that your app's frontend and backend resources are running and accessible via HTTPS.

## Submit in the Teams client

1. In the Teams client, go to **Apps > Submit submit to app catalog**.
1. Select **Submit an app** and choose your app package .zip file.

## Submit using the Developer Portal

1. In the [Developer Portal](https://dev.teams.microsoft.com), go to **Apps** and select the app you want to publish.
1. Select **Distribute** and choose **Publish to your org**.
1. Select **Publish your app** and choose your app package .zip file.

## Submit with other common Teams developer tools

Most common Teams developer tools include a feature for publishing your app to your org. Some of these tools include:

* Teams Toolkit for Visual Studio Code
* Teams Toolkit for Visual Studio
* Power Apps
* Power Virtual Agents

## Submit with Microsoft Graph API

If you aren't using a common Teams developer tool, you can still submit your app with a [Microsoft Graph API call](/graph/api/teamsapp-publish).

## Next steps

Your Teams admin reviews the submitted app. Your contact information is included in the submission in case they need to contact your. 

Once approved, users can discover the app in the Teams store under **Built for your org**.

## See also

* [Manage your apps in the Teams admin center](/microsoftteams/manage-apps)
