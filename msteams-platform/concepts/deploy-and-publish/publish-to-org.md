---
title: Publish an app to your org
description: There are several ways to distribute a Microsoft Teams app you built specifically for your org.
ms.topic: how-to
author: heath-hamilton
ms.author: surbhigupta
---

# Publish your Microsoft Teams app to your org

There are multiple ways to publish the Microsoft Teams app you built specifically for your organization. The process is essentially the same:

1. You submit the app to your Teams admin.
1. The admin reviews the app.
1. If approved, the admin publishes the app.
1. Users discover the app in the org's app catalog.

## Prerequisites

* Contact your admin to make sure your org allows [custom Teams apps](~/concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-turn-on-custom-app-uploading).
* [Validate your app manifest](https://dev.teams.microsoft.com/appvalidation.html) for errors and create your [app package](~/concepts/build-and-test/apps-package.md).
* Make sure that your app's frontend and backend resources are running and accessible via HTTPS.

## Submit your app

The tools you're already using to create your app likely provide a way to submit the app to your Teams admin.

### Submit in the Teams client

The steps are different depending on your version of Teams. For example, one set of steps apply to [public developer preview](~/resources/dev-preview/developer-preview-intro.md) only.

#### Submit in the Teams client (GA version)

1. In the Teams client, go to **Apps > Submit to app catalog**.
1. Select **Submit an app** and choose your app package .zip file.

#### Submit in the Teams client (developer preview version)

1. In the Teams client, go to **Apps > Manage your apps**.
1. Select **Submit an app to your org** and choose your app package .zip file.

### Submit using the Developer Portal

1. In the [Developer Portal](https://dev.teams.microsoft.com), go to **Apps** and select the app you want to publish.
1. Select **Distribute** and choose **Publish to your org**.
1. Select **Publish your app** and choose your app package .zip file.

### Submit with other common Teams developer tools

Many Teams developer tools include a feature for publishing an app to your org. Some of these tools include:

* Teams Toolkit for Visual Studio Code
* Teams Toolkit for Visual Studio
* Power Apps
* Power Virtual Agents

### Submit with Microsoft Graph API

If you aren't using a common Teams developer tool, you can still submit your app with a [Microsoft Graph API call](/graph/api/teamsapp-publish).

### Submit your app in GCC environments

In Microsoft 365 Government - GCC environments, you must send your app package directly to your Teams admin (for example, email or chat).

Submitting your app through the Teams client, Developer Portal, or other Teams developer tool that provides this feature in non-GCC environments isn't currently supported.

## Get your app approved

Your app goes to the Teams admin center for review. Your submission includes your contact information in case the admin needs to reach you.

Once your admin approves and publishes the app, users can find it in the Teams store under **Built for your org**.

## Manage your app

It's your admin's responsibility to manage the app once it's published. For example, the admin can configure app permission policies and monitor usage. Only the admin can remove the app from the org's app catalog.

If you update your app&#8212;add a feature, fix a bug, enhance the design, or something else&#8212;you must submit the latest version to your admin for publishing.

## See also

* [Manage your apps in the Teams admin center](/microsoftteams/manage-apps)
