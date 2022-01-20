---
title: Manage your apps with the Developer Portal
description: Learn how to configure, distribute, and manage your apps using the Developer Portal for Microsoft Teams.
keywords: getting started developer portal teams
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
---

# Manage your apps with the Developer Portal for Microsoft Teams

The <a href="https://dev.teams.microsoft.com" target="_blank">Developer Portal for Teams</a> is the primary tool for configuring, distributing, and managing your Microsoft Teams apps. With the Developer Portal, you can collaborate with colleagues on your app, set up runtime environments, and much more.

:::image type="content" source="../../assets/images/tdp/tdp_home_1.png" alt-text="Screenshot showing the home page of the Developer Portal for Teams.":::

## Register an app

The Developer Portal provides a couple ways to register a Teams app:

* Register a brand new app
* Import an existing app package

> [!NOTE]
> If you create an app using the [Microsoft Teams Toolkit for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension), you can manage that app in the Developer Portal.

## Set up an environment

You can configure environments and global variables to help transition your app from your local runtime to production. Global variables are used across all environments.

**To set up an environment**

1. In the Developer Portal, select the app you're working on.
2. Go to the **Environments** page and select **+ Add an environment**.
3. Select **+ Add a variable** to create configuration variables for your environment.

**To use variables**

Use the variable names instead of hard-coded values to set your app configurations.

1. Enter `{{` in any field in the Developer Portal. A dropdown with all the variables you've created for the chosen environment along with the global variables appears.  
1. Before downloading your app package (for example, when getting ready to publish to the Teams store), select the environment you want to use. Your app configurations update automatically based on the environment. 

## Identify app owners

Each app includes an **Owners** page, where you can share your app registration with colleagues in your org. The **Contributor** role has the same permissions as the **Owner** role except the ability to delete an app.

## Configure your app's capabilities and other important metadata

A Teams app is a web app. Like all web apps, its source code is typically developed in an IDE or code editor and hosted somewhere in the cloud (like Azure).

To install and render your app in Teams, you must include a set of configurations that Teams recognizes. This has traditionally been done by crafting an app manifest, a JSON file that contains all the metadata Teams needs to display your app content. The Developer Portal abstracts this process and includes new features and tooling to help you be more successful.

## Test your app directly in Teams

The Developer Portal provides options for testing and debugging your app:

* On the **Overview** page, you can see a snapshot of whether your app's configurations validate against Teams store test cases.
* The **Preview in Teams** button lets you launch your app quickly in the Teams client for debugging.

## Distribute your app

From the Developer Portal, use the **Distribute** button to download an app package, publish to your org, or publish to the Teams store.

For more information, see [distribute your Teams app](~/concepts/deploy-and-publish/apps-publish-overview.md).

## Analyze your app's usage

On the **Overview** page, you can see the total number of active users for your app. These metrics are available for apps published to the Teams store or an org's app catalog through Developer Portal and scoped to the app ID.

| Metric | Definition |
| :-----------------------| :------------------------------------------------------------------------------------------------------|
| *Monthly R30* | The default usage metric. It shows you the count of unique active users that used your app within that rolling 30-day window in UTC. |
| *Daily* | Shows you the count of unique active users that used your app in a given day in UTC. |

You should see usage reflected for a given day within 24-48 hours. Usage for new apps can take up to 3-5 days to display.

You can click **View Details** or navigate to the **Analytics** page to learn more about who's using your app and how they're using it so you can answer queries like:

* How many active users do I have on a monthly, weekly, and daily basis?
* Are these new users lapsed, revived, or returned users?
* Do these users use my app more than five times each month?
* What is the breakdown of active users by platform/operating system?

### Filtering for Aggregation Type and App

At the top of the report, you will see a **Filter** button that allows you to slice and dice all subsequent metrics by the following:

1. Aggregation Type – Each of the metrics on the page have been aggregated by user counts and tenant counts (count of unique customers using your app). You can choose which aggregation type you’d like to explore for each of the subsequent metrics.
1. Platform
1. Operating System
1. Area

    :::image type="content" source="~/assets/images/tdp/dev-analytics-filter.PNG" alt-text="Filter.":::

You can find more details on each individual widget below:

#### Usage by Time Period

This chart enumerates the number of active users/tenants that have opened/used this app across different time periods:

* Monthly R30 Active Users/Tenants: The count of distinct users/tenants who have opened your app in a given RL30 (Rolling 30 day) period.
* Monthly R28 Active Users/Tenants: The count of distinct users/tenants who have opened your app in a given RL28 (Rolling 28 day) period.
* Weekly Active Users/Tenants: The count of distinct users/tenants who have opened your app in a given RL7 (Rolling 7 day) period.
* Daily Active Users/Tenants: The count of distinct users/tenants who have opened your app in a given RL1 (Rolling 1 day) period.

    :::image type="content" source="~/assets/images/tdp/usage-by-time-period.png" alt-text="Period.":::

#### Usage by Platform and OS

This chart shows you your app(s) active usage across various endpoints. The same user/tenant can use an app on multiple endpoints.

* Windows – Active Users/Tenants that have opened/used your app on Windows
* Mac – Active Users/Tenants that have opened/used your app on Mac
* iOS – Active Users/Tenants that have opened/used your app on iOS
* Android – Active Users/Tenants that have opened/used your app on Android
* Web – Active Users/Tenants that have opened/used your app on Web

    :::image type="content" source="~/assets/images/tdp/usage-by-platform-OS.png" alt-text="Platform.":::

#### Usage by Retention State

This chart lets you track four key retention/churn metrics over time.

* New Users /Tenants - Active users or tenants who are new this month and have not used this app before (based on a historical start date of June 1, 2020).
* Resurrected Users/Tenants - Active users or tenants who have used your app one or more times since June 1, 2020 but not in the immediately previous R30 time period.
* Returning Users/Tenants - Active users or tenants who used your app during a given R30 time period and the previous R30 time period.
* Lapsed Users/Tenants - Active users or tenants who were not seen during a given R30 time period but were seen during the previous R30 time period.

    :::image type="content" source="~/assets/images/tdp/usage-by-retention-state.png" alt-text="Retention.":::

#### Usage Intensity

This chart shows you key usage intensity metrics:

* % of 5+ Days Usage - The % of Active Users that have opened/used the app more than 5 days in the last RL30 (Rolling 30 day) period.
* Median Days Used per Month - The median numbers of days in which your app was opened in the last RL30 (Rolling 30 day) period.
* DAU/MAU - The ratio of the average number of unique users or tenants who used your app on each day divided by the Monthly Active Users for the selected R30 time period. It provides information on stickiness of user engagement with your app

    :::image type="content" source="~/assets/images/tdp/usage-intensity.png" alt-text="Intensity.":::

#### App Dashboard

The App Dashboard shows you the latest value for each of these metrics, as well as the Month over Month (MoM) change. You can click into each of these rows to see trends over time.

    :::image type="content" source="~/assets/images/tdp/app-dashboard.png" alt-text="app":::

## Use tools to create app features

The Developer Portal also includes tools to help you build some key features of Teams apps. Some of these tools include:

* **Scene studio**: Design [custom Together Mode scenes](~/apps-in-teams-meetings/teams-together-mode.md) for Teams meetings.
* **Adaptive Cards editor**: Create and preview Adaptive Cards to include with your apps.
* **Microsoft identity platform management**: Register your apps with Azure Active Directory (Azure AD) to help users sign in and provide access to APIs.

## See also

[Include a SaaS offer with your Microsoft Teams app](~/concepts/deploy-and-publish/appsource/prepare/include-saas-offer.md)
