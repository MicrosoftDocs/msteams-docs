---
title: Manage your apps with the Developer Portal for Microsoft Teams
description: Learn how to configure and manage your apps using the Developer Portal for Microsoft Teams
keywords: getting started developer portal teams
localization_priority: Normal
ms.topic: overview
---

# Deliver great apps with the Developer Portal for Microsoft Teams

The Developer Portal makes it easy to manage your Microsoft Teams apps, whether you develop custom apps for your organization or SaaS applications for teams around the world.

- [Go to Developer Portal](https://aka.ms/dev-portal)
- [Download the Developer Portal app for Teams](https://aka.ms/dev-portal-app)

## Developer Portal Overview

The Developer Portal enables app creators to register apps with the Teams app service and publish to an organization's app catalog, or the Teams store. You can invite colleagues in your organization to collaborate on an app, configure runtime environment, and more.

A Teams app is a web app. Like all web apps, its source code is developed in an IDE or editor and published to a cloud hosting solution like Azure. For the Teams client to install the app, it must be configured in such a way that it appears to be a native Teams application. This has traditionally been done by crafting a manifest file that contains all the data the Teams client needs to render content. The app package that ultimately gets installed to Teams consists of the manifest file and two icon files for the app. Developer Portal builds features and tooling around this core scenario to enable the users to be more successful.

### Register a new app

There are three paths to registering a Teams app with Developer Portal:
* Register a brand new app from the portal
* Import an existing app package from the portal
* Create a new app from the [Microsoft Teams Toolkit for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension)

If you register a new app, you must fill all the mandatory configuration fields before you can install the app to your Teams client.

## App Overview page

Your app's overview page contains the following information:

* Basic information about your app.
* A validation snapshot of your app's configuration state.
* App usage metrics, currently in preview, for your app.

**App Usage (Preview)**

The App Usage metrics show the total number of Active Users for your app. These metrics are available for apps published to the Teams store or an organization's app catalog through Teams Developer Portal, and are scoped to the App ID(s) shown in the Basic Information section.

| Metric | Definition |
| :-----------------------| :------------------------------------------------------------------------------------------------------|
| *Monthly R30* | The default usage metric. It shows you the count of unique active users that used your app within that rolling 30 day window, in UTC. |
| *Daily* | Shows you the count of unique active users that used your app in a given day, in UTC. |

**History:** Monthly and Daily usage is shown for the past 7 days, 30 days, and 60 days.

**Latency:** You should see usage reflected for a given day within 24-48 hours. **Usage for new apps can take up to 3-5 days to light up.**

## Owners

Use this section to share your app registration with colleagues in your organization. The *Contributor* role has the same permissions as the *Owner* role, except the ability to delete an app. 

## Environments

Environment configurations allow you to seamlessly transition an app from your local runtime through to production.

Select **+ Add an environment** to create a new runtime environment configuration. After it is created, you can add key value pairs for the environment.

Use the variable names instead actual values in the property fields. 

**To enter a variable name instead of a hard coded property value**

* Enter '{{variable}}' in any field in a Developer Portal configuration page. Simply entering '{{' will reveal a dropdown with all the variables you've created for the chosen environment along with the global variables.

When your app package is downloaded or published, you must select the environment configuration you wish to use. Global variables will be the same across all environments.

## Plans and Pricing

Provide your app as software as a service (SaaS) by configuring plans and pricing for it. Set the plans and pricing through the Teams Developer Portal by updating the manifest.

> [!NOTE]
> It is recommended to configure the SaaS offer before publishing your app for the first time.
>
> If you are configuring the SaaS offer after you have published your app, then you must resubmit your app to the App Source after the manifest is updated with the changes.

**To configure SaaS offer for your app**

1. Go to [Developer Portal](https://aka.ms/dev-portal), and select **All apps**.
1. Select **Plans and Pricing** in the left panel.
1. In the **Plans and Pricing** page, enter your **Publisher ID** and **Offer ID**.