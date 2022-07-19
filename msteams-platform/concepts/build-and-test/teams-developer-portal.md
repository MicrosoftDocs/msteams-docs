---
title: Manage your apps with the Developer Portal
description: In this module, learn how to configure, distribute, and manage your apps using the Developer Portal for Microsoft Teams.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
---

# Manage your Teams apps using Developer Portal

The <a href="https://dev.teams.microsoft.com" target="_blank">Developer Portal for Teams</a> is the primary tool for configuring, distributing, and managing your Microsoft Teams apps. With the Developer Portal, you can collaborate with colleagues on your app, set up runtime environments, and much more.

:::image type="content" source="../../assets/images/tdp/tdp_home_1.png" alt-text="Screenshot showing the home page of the Developer Portal for Teams.":::

> [!NOTE]
>
> * Currently, Developer Portal is not available for Government Community Cloud (GCC), GCC-High, or Department of Defense (DOD) tenants.
> * However, you can use a regular tenant to build an app in the Developer Portal, download the app, and upload the app using [Microsoft Graph](/graph/api/teamsapp-publish?view=graph-rest-1.0&tabs=http&preserve-view=true) to a national cloud. For more information, see [National cloud deployments](/graph/deployments).

> [!IMPORTANT]
> If you are migrating from App Studio to Developer Portal, the following table provides the detailed information of the features that are supported in the Developer Portal:

| Features | App Studio | Developer Portal |
| --- | --- | --- |
| App analytics* | ❌ | ✔️ |
| App capabilities-Bots | ✔️ | ✔️ |
| App capabilities-Connectors | ✔️ | ✔️ |
| App capabilities-Messaging extension | ✔️ | ✔️ |
| App capabilities-Meeting extension | ❌ | ✔️ |
| App capabilities-Personal apps | ✔️ | ✔️ |
| App capabilities-Tabs | ✔️ | ✔️ |
| App environments | ❌ | ✔️ |
| App languages | ✔️ | ✔️ |
| App manifest preview and download | ✔️ | ✔️ |
| App plans and pricing | ❌ | ✔️ |
| App publishing | ✔️ | ✔️ |
| App permissions | ❌ | ✔️ |
| App sharing-share with co-developers | ❌ | ✔️ |
| App validation | ✔️ | ✔️ |
| Create a new app | ✔️ | ✔️ |
| Impart a zip package | ✔️ | ✔️ |

\* *App analytics will be available for GA soon.*

## Register an app

The Developer Portal provides a couple ways to register a Teams app:

* Create and register a brand new app.
* Import an existing app package.

### Create and register a brand new app

The Developer portal allows you to create a brand new app:

1. Log into [Developer Portal](https://dev.teams.microsoft.com), select **Apps** from the left pane.

   :::image type="content" source="../../assets/images/tdp/home-page.PNG" alt-text="Developer Portal for Teams home page.":::

1. Select **+ New app** and enter app name.

   :::image type="content" source="../../assets/images/tdp/enter-app-name-tdp.PNG" alt-text="Create a brand new app in Developer Portal for Teams." lightbox="../../assets/images/tdp/create-new-app-in-tdp.PNG":::

1. Select **Add**.

Now you've successfully created a brand new app and you can see all basic information of the new app.

:::image type="content" source="../../assets/images/tdp/basic-information-app-tdp.PNG" alt-text="Basic information of the app you created in the Developer Portal for Teams.":::

### Import an existing app

You can import and manage your existing app in the developer portal:

1. In the Developer Portal, select **Apps** from the left pane.
2. Select **Import App**.
3. Select the app manifest file and then select **Open**.
4. Select **Import**.
   1. If your app package has errors, you can import the app and resolve the errors before you upload or publish the app to Teams.
   1. If you see the following message while uploading the app, click **Import** to add the app package to the Developer Portal.

(image to be added)

> [!NOTE]
>
> * The Developer Portal creates a unique App ID and locks the ID for your registered Teams app. You can’t edit or provide an ID of your choice. This prevents scenarios where multiple apps have duplicate app IDs.
> * If you create an app using the Microsoft Teams Toolkit for Visual Studio Code, you can manage your app in the Developer Portal. For more information, see [Build apps with teams toolkit and Visual studio code](~/toolkit/visual-studio-code-overview.md).

## Manage your apps in Developer Portal

After you created or uploaded your app, you can manage your apps in Developer Portal with the following:

* [Overview](#overview)
* [Configure](#configure)
* [Advanced](#advanced)
* [Publish](#publish)

### Overview

In the Overview section, you can see the following features to manage your app:

* Dashboard

  * In the **Dashboard** under **Overview** section, you can see the following features for your app:
    * **Teams store validation** - App validation tool checks your app package against the test cases Microsoft uses when reviewing your app.
    * **Announcement** - Latest updates of your apps on Developer Portal for Teams
    * **Upgrade to 1.14** -
    * **Active users (Preview)** - Shows you the active user count
    * **Basic information** of your app -

    :::image type="content" source="../../assets/images/tdp/dashboard-page.PNG" alt-text="Overview page of the app you created in Developer Portal for Teams.":::

* Analytics

    In the **Analytics** page under **Overview** section, you can see the total number of active users for your app. For more information, see [Analyze your app's usage](#analyze-your-apps-usage).

### Configure

A Teams app is a web app. Like all web apps, its source code is typically developed in an IDE or code editor and hosted somewhere in the cloud (like Azure).

To install and render your app in Teams, you must include a set of configurations that Teams recognizes. This has traditionally been done by crafting an app manifest, a JSON file that contains all the metadata Teams needs to display your app content. The Developer Portal abstracts this process and includes new features and tooling to help you be more successful.

In the Configure section, you can see the following features to manage and access your app:

* **Basic information** - This section shows and allows you to edit the App name, App ID, Descriptions, Version, Developer Information, App URLs, Application (client) ID, and Microsoft Partner Network ID.
* **Branding** - This page shows you the app icon details.
* **App features** - This section allows you to add the following features to your app:
  * Personal app
  * Bot
  * Connector
  * Scene
  * Group and channel app
  * Messaging extension
  * Meeting extension
  * Activity feed notification
* **Permissions** - This section allows you to give Device permissions, Team permissions, Chat or Meeting permissions, and User Permissions for your app.
* **Single sign-on** - This section allows you to configure your app to authenticate users with single sign-on (SSO).
* **Languages** - This section allows you to set up or change the language for your app.
* **Domain** -

### Advanced

In the Advanced section, you can see the following features to manage and access your app:

* **Owners**

    Each app includes an **Owners** page, where you can share your app registration with colleagues in your org. The **Operative** role has the same permissions as the **Administrator** role except the ability to delete an app. You can add **Administrator** and **Operative** to manage who can make changes to your app.

    To add an owner:

    1. In the app **Advanced** section, select **Owners**.
    1. Select **Add an owner**.
    1. Enter a name and select a user ID from the drop-down list.
    1. Under **Role**, select **Operative** or **Administrator**.
    1. Select **Add**.

* **App content**

* **Environments**

    You can configure environments and global variables to help transition your app from your local runtime to production. Global variables are used across all environments.

    To set up an environment:

    1. In the Developer Portal, select the **Apps** you're working on.
    1. Go to the **Environments** page and select **+ Add an environment**.
    1. Select **+ Add a variable** to create configuration variables for your environment.

    To use variables:

    Use the variable names instead of hard-coded values to set your app configurations.

    1. Enter `{{` in any field in the Developer Portal. A dropdown with all the variables you've created for the chosen environment along with the global variables appears.  
    1. Before downloading your app package (for example, when getting ready to publish to the Teams store), select the environment you want to use. Your app configurations update automatically based on the environment.

* **Plan and pricing** - This section allows you to link a SaaS offer to your app.
* **Admin settings** - This section allows you to do app customization and to block your app by default.

### Publish

This section allows you to publish your app to your org, or to the Teams store.

* Publish your app to org:

   1. In the app **Overview** page, under **Publish**, Select **Publish to Org**.
   1. Select **Publish your App**.

* Publish your app to store:

   1. In the app **Overview** page, under **Publish**, Select **Publish to Store**.
   1. Select **Publish**.

   > [!NOTE]
   > The app validation tool checks your app package against the test cases Microsoft uses when reviewing your app. You must resolve errors or warnings and read the **App submission checklist** before submitting your app.

   You can download the app package using **Download app package** button from the publish to Teams Store page.

* Flights - Controls who gets app updates. For example, you can release an update to Microsoft employees to identify and fix bugs before releasing it to the public.

### Test your app directly in Teams

The Developer Portal provides options for testing and debugging your app:

* On the **Overview** page, you can see a snapshot of whether your app's configurations validate against Teams store test cases.
* The **Preview in Teams** button lets you launch your app quickly in the Teams client for debugging.

## Use tools to create app features

The Developer Portal also includes tools to help you build some key features of Teams apps. Some of these tools include:

* **Scene studio**: Design [custom Together Mode scenes](~/apps-in-teams-meetings/teams-together-mode.md) for Teams meetings.
* **Adaptive Cards editor**: Create and preview Adaptive Cards to include with your apps.
* **Microsoft identity platform management**: Register your apps with Azure Active Directory to help users sign in and provide access to APIs.
* **Teams store app validation**: Check your app package against the test cases Microsoft uses when reviewing your app.
* **Bot management**: Add conversational bots to your app that communicate with users, respond to their questions, and proactively notify them about changes and other events.

To add a bot:

1. In the Developer Portal, select **Tools** in the left navigation bar.
1. Select **Bot Management**.
1. In the bot management page, select **+ New Bot**.
1. Enter a name and select **Add**.

From the Developer portal, you can navigate to Bot framework portal and configure your bot to update bot icon and other bot properties.

## Analyze your app's usage

In the Developer Portal for Teams, on the **Overview** page, you can see the total number of active users for your app.

> [!NOTE]
> Usage analytics are currently available only for new custom apps published to your org through **Developer Portal** for Teams (formerly App Studio) or imported into **Developer Portal** for Teams after April 2022. Usage analytics for all the apps published to the Teams store is available in **Partner Center**, for more information [Teams apps usage report](/office/dev/store/teams-apps-usage).

| Metric | Definition |
| :-----------------------| :------------------------------------------------------------------------------------------------------|
| *Monthly R30* | The default usage metric. It shows the count of unique active users who used your app within that rolling 30 day window in UTC. |
| *Daily* | It shows you the count of unique active users who used your app in a given day in UTC. |

The app usage for a given day is reflected within 24 to 48 hours, and usage data for new apps can take up to three to five days to reflect in the charts.

You can view your app's usage and other insights from the **Analytics** page. To access the page:

1. Go to **[Developer Portal for Teams](https://dev.teams.microsoft.com)**.
1. Select **Apps** from the left pane.
1. Select the required app from the **Apps** page.
1. Select **Analytics** under the **Overview** or select **View details** under the **Active Users (Preview)** card.

 :::image type="content" source="../../assets/images/tdp/dev-app-portal.PNG" alt-text="dev-Portal-analytics"lightbox="../../assets/images/tdp/dev-app-portal.PNG":::

As you explore individual metrics on this page, you can use the **Filter** button to analyze your app's usage from the following filter options:

* Aggregation type: This filter allows you to group the following metrics by a count of distinct users or a count of distinct tenants or customers.
* Platform
* Operating system
* Area

 :::image type="content" source="../../assets/images/tdp/dev-analytics-filter.PNG" alt-text="Filter":::

After you have selected your desired filters, you can explore the following individual widgets:

* [Usage by time period](#usage-by-time-period)
* [Usage by platform and OS](#usage-by-platform-and-os)
* [Usage by retention state](#usage-by-retention-state)
* [Usage intensity](#usage-intensity)

### Usage by time period

The **Usage by time period** chart shows you the number of active users or tenants who opened and used your app across different time periods.

 :::image type="content" source="../../assets/images/tdp/usage-by-time-period.png" alt-text="Period":::

| Metric | Definition |
| :-----------------------| :------------------------------------------------------------------------------------------------------|
| Monthly R30 | Each data point represents a given R30 (Rolling 30 day) period. |
| Monthly R28 | Each data point represents a given R28 (Rolling 28 day) period. |
| Weekly R7| Each data point represents a given R7 (Rolling 7 day) period. |
| Daily | Each data point represents a given R1 (Rolling 1 day) period. |

### Usage by platform and OS

The **Usage by platform and OS** chart shows your app's active usage across various endpoints, such as **Windows**, **Mac**, **iOS**, **Android**, and **Web**. The same user or tenant can use an app on multiple endpoints. Each data point represents a given R30 (Rolling 30 day) period.

 :::image type="content" source="../../assets/images/tdp/usage-by-platform-OS.png" alt-text="Platform":::

### Usage by retention state

The **Usage by retention state** chart lets you track four key retention or churn metrics for your app over time.

:::image type="content" source="../../assets/images/tdp/usage-by-retention-state.png" alt-text="Retention":::

| Metric | Definition |
| :-----------------------| :------------------------------------------------------------------------------------------------------|
| New users or tenants | Active users or tenants who are new new and have not used your app. |
| Returning users or tenants | Active users or tenants who used your app during a given R30 (Rolling 30 day) time period and the immediately preceding R30 time period. |
| Resurrected users or tenants | Active users or tenants who used your app one or more times before but not in the immediately preceding R30 time period. |
| Lapsed users or tenants | Active users or tenants who were not seen during a given R30 time period but were seen during the immediately preceding R30 time period. |

### Usage intensity

The **Usage intensity** chart shows you key usage intensity metrics for your app.

 :::image type="content" source="../../assets/images/tdp/usage-intensity.png" alt-text="Intensity":::

| Metric | Definition |
| :-----------------------| :------------------------------------------------------------------------------------------------------|
| Median days used per month | The median numbers of days in which your app was opened in the last R30 (Rolling 30 day) time period. |
| % of 5+ Days usage | The % of Active Users who opened or used the app more than five days in the last R30 time period. |
| DAU/MAU | The ratio of the average number of unique users or tenants who used your app on each day divided by the Monthly Active Users for the selected R30 time period. |

### App dashboard

The **My App dashboard** table shows you the latest R30 (Rolling 30 day) data for each of the metrics under the previous four categories, and the Month over Month change. Use the time picker on the upper left and select the desired date, you can see daily R30 data for the last 75 days and end of month R30 data for up to 12 months.

You can select each of these **Metric name** to see trends over time.

 :::image type="content" source="../../assets/images/tdp/app-dashboard.png" alt-text="app":::

## See also

[Include a SaaS offer with your Microsoft Teams app](~/concepts/deploy-and-publish/appsource/prepare/include-saas-offer.md)
