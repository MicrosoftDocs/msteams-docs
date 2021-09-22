---
title: Manage your apps with the Developer Portal
description: Learn how to manage your apps using the Developer Portal for Microsoft Teams.
keywords: getting started developer portal teams
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
---

# Manage your apps with the Developer Portal for Microsoft Teams

The <a href="https://dev.teams.microsoft.com" target="_blank">Developer Portal for Teams</a> is the primary tool to configure, distribute, and manage your Microsoft Teams apps. With the Developer Portal, you can collaborate with colleagues on your app, set up runtime environments, and much more.

:::image type="content" source="../../assets/images/tdp/tdp_home_1.png" alt-text="Screenshot showing the home page of the Developer Portal for Teams.":::

## Register an app

You can register your Teams app in Developer Portal with the following ways:

* Register a new app
* Import an existing app package

> [!NOTE]
> If you create an app using the [Microsoft Teams Toolkit for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension), you can manage that app in the Developer Portal.

## Set up an environment

You can configure environments and global variables to help transition of your app from your local runtime to production. Global variables are used across all environments.

**To configure an environment**

1. In the Developer Portal, select the app you're working on.
2. Go to **Environments** and select **+ Add an environment**.
3. Select **+ Add a variable** to create configuration variables for your environment.

**To use variables**

Use the variable names instead of hard-coded values to set your app configurations.

1. Enter `{{` in any field in the Developer Portal. A dropdown with all the variables you've created for the chosen environment along with the global variables appears.  
1. Before downloading your app package (for example, when getting ready to publish to the Teams store), select the environment you want to use. Your app configurations update automatically based on the environment. 

## Identify app owners

Each app includes **Owners**, where you can share your app registration with colleagues in your organization. The **Contributor** role has the same permissions as the **Owner** role except the ability to delete an app.

## Configure your app's capabilities and other important metadata

A Teams app is a web app. Like all web apps, its source code is typically developed in an IDE or code editor and hosted somewhere in the cloud (like Azure).

To install and render your app in Teams, you must include a set of configurations that Teams recognizes. This has traditionally been done by crafting an app manifest, a JSON file that contains all the metadata that Teams needs to display your app content. The Developer Portal abstracts this process and includes new features and tooling to help you be more successful.

### Basic app configuration 

**Basic app information:** The users see on your app details page in Teams, such as App ID, app names, descriptions, developer information, version, app URLs, and Microsoft Partner Network ID.

**Branding:** Apps require color and outline icon in PNG format. To publish your app in the Teams store, the icons must meet specific size requirements.

**Features:** Teams features that you can include in your app. You can add one or more features depending on your app’s use cases.

**Permissions:** Specify what users must consent to when using your app.

**Single sign-on:** Configure your app to authenticate users with Single sign-on (SSO).

**Domains:** List all the domains your app needs to navigate to. Use wildcards to include multiple subdomains. For example, `*.example.com`.

### Advanced app configuration

**App content:** Configure the optional features such as, loading indicator and full-screen mode for your app.

**App customization:** Select the properties that Teams admins can customize about your app.

**First party settings:** Features for first party applications that extend beyond the public functionality.

### Distribute your app

**App package:** The App package describes your app configuration, capabilities, required resources, and other important attributes. For example, the manifest schema.

**Flights:** Control who gets app updates. For example, you can release an update to Microsoft employees to identify and fix bugs before releasing it to the public.

**Publish to your organization (Microsoft):** Make your app available to people in your organization. Once approved by your IT admin, your app will be featured in Teams under Apps > Built for your org.

**Publish to the Teams store:** The app validation tool checks your app package against the test cases Microsoft uses, when reviewing your app. Resolve errors or warnings and read the checklist before submitting.

## Test your app directly in Teams

The Developer Portal provides options for testing and debugging your app:

* In **Overview**, you can see a snapshot of whether your app's configurations validate against Teams store test cases.
* **Preview in Teams** allows you to launch your app quickly in the Teams client for debugging.

## Distribute your app

From the Developer Portal, use **Distribute** to download an app package, publish to your org, or publish to the Teams store.

For more information, see [distribute your Teams app](~/concepts/deploy-and-publish/apps-publish-overview.md).

## Analyze your app's usage

In **Overview**, you can see the total number of active users for your app. These metrics are available for apps published to the Teams store or an organization's app catalog through Developer Portal and scoped to the app ID.

| Metric | Definition |
| :-----------------------| :------------------------------------------------------------------------------------------------------|
| *Monthly R30* | The default usage metric. It shows the count of unique active users, who have used your app within that rolling 30-days window in UTC. |
| *Daily* | Shows the count of unique active users, who have used your app in a given day in UTC. |

Monthly and daily usage is shown for the past seven days, 30 days, and 60 days. You should see usage reflected for a given day within 24-48 hours. Usage for new apps can take up to 3-5 days to display.

## Use tools to create app features

The Developer Portal also includes tools to help you build some key features of Teams apps. Some of these tools include:

* **Scene studio**: Design [custom Together Mode scenes](~/apps-in-teams-meetings/teams-together-mode.md) for Teams meetings.
* **Adaptive Cards editor**: Create and preview Adaptive Cards to include with your apps.
* **Microsoft identity platform management**: Register your apps with Azure Active Directory (Azure AD) to help users sign in and provide access to APIs.
