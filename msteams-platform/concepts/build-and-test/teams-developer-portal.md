---
title: Developer Portal for Teams
description: In this article, learn more about Developer Portal and how to create a brand new app and import an existing app in the Teams Developer Portal.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
---

# Developer Portal for Teams

The <a href="https://dev.teams.microsoft.com" target="_blank">Developer Portal for Teams</a> is the primary tool for configuring, distributing, and managing your Microsoft Teams apps. With the Developer Portal, you can collaborate with colleagues on your app, set up runtime environments, and much more.

:::image type="content" source="../../assets/images/tdp/tdp_home_1.png" alt-text="The screenshot is an example that shows the home page of the Developer Portal for Teams.":::

> [!NOTE]
>
> * Currently, Developer Portal is not available for Government Community Cloud (GCC), GCC-High, or Department of Defense (DOD) tenants.
> * However, you can use a regular tenant to build an app in the Developer Portal, download the app, and upload the app using [Microsoft Graph](/graph/api/teamsapp-publish?view=graph-rest-1.0&tabs=http&preserve-view=true) to a national cloud. For more information, see [National cloud deployments](/graph/deployments).
> * Currently, in some scenarios, Developer Portal won't load in the browser when AdBlocker is enabled. To continue with Developer Portal in browser, disable AdBlocker.

## Register an app

The Developer Portal provides the following ways to register a Teams app:

* Create and register a brand new app.
* Import an existing app package.

### Create and register a brand new app

The Developer portal allows you to create a brand new app:

1. Log into [Developer Portal](https://dev.teams.microsoft.com), select **Apps** from the left pane.

   :::image type="content" source="../../assets/images/tdp/home-page.png" alt-text="The screenshot shows the Developer Portal for Teams home page.":::

1. Select **New app** and enter app name.

   :::image type="content" source="../../assets/images/tdp/enter-app-name-tdp.png" alt-text="The screenshot shows the steps to create a brand new app in Developer Portal for Teams." lightbox="../../assets/images/tdp/create-new-app-in-tdp.png":::

1. Select **Add**.

Now you've successfully created a brand new app and you can see all the basic information of the new app.

:::image type="content" source="../../assets/images/tdp/basic-information-app-tdp.png" alt-text="The screenshot shows the basic information of the app you created in the Developer Portal for Teams.":::

### Import an existing app

Follow the steps to import and manage your existing app in the Developer Portal.

1. In the Developer Portal, select **Apps** from the left pane.
1. Select **Import App**.

   :::image type="content" source="../../assets/images/tdp/import-app.png" alt-text="The screenshot shows the steps to import your existing app in Developer Portal for Teams to manage your apps.":::

1. Select the app manifest file, and then select **Open**.
1. Select **Import**.

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

 :::image type="content" source="../../assets/images/tdp/dev-app-portal.PNG" alt-text="The screenshot shows the steps to choose analytics page from developer portal."lightbox="../../assets/images/tdp/dev-app-portal.PNG":::

As you explore individual metrics on this page, you can use the **Filter** button to analyze your app's usage from the following filter options:

* Aggregation type: This filter allows you to group the following metrics by a count of distinct users or a count of distinct tenants or customers.
* Platform
* Operating system
* Area

 :::image type="content" source="../../assets/images/tdp/dev-analytics-filter.PNG" alt-text="The screenshot shows the filter button to analyze app's usage.":::

After you have selected your desired filters, you can explore the following individual widgets:

* [Usage by time period](#usage-by-time-period)
* [Usage by platform and OS](#usage-by-platform-and-os)
* [Usage by retention state](#usage-by-retention-state)
* [Usage intensity](#usage-intensity)

### Usage by time period

The **Usage by time period** chart shows you the number of active users or tenants who opened and used your app across different time periods.

 :::image type="content" source="../../assets/images/tdp/usage-by-time-period.png" alt-text="Screenshot shows the usage by time period chart.":::

| Metric | Definition |
| :-----------------------| :------------------------------------------------------------------------------------------------------|
| Monthly R30 | Each data point represents a given R30 (Rolling 30 day) period. |
| Monthly R28 | Each data point represents a given R28 (Rolling 28 day) period. |
| Weekly R7| Each data point represents a given R7 (Rolling 7 day) period. |
| Daily | Each data point represents a given R1 (Rolling 1 day) period. |

### Usage by platform and OS

The **Usage by platform and OS** chart shows your app's active usage across various endpoints, such as **Windows**, **Mac**, **iOS**, **Android**, and **Web**. The same user or tenant can use an app on multiple endpoints. Each data point represents a given R30 (Rolling 30 day) period.

 :::image type="content" source="../../assets/images/tdp/usage-by-platform-OS.png" alt-text="The screenshot shows the usage by platform and OS chart.":::

### Usage by retention state

The **Usage by retention state** chart lets you track four key retention or churn metrics for your app over time.

:::image type="content" source="../../assets/images/tdp/usage-by-retention-state.png" alt-text="The screenshot shows the usage by retention state chart.":::

| Metric | Definition |
| :-----------------------| :------------------------------------------------------------------------------------------------------|
| New users or tenants | Active users or tenants who are new new and have not used your app. |
| Returning users or tenants | Active users or tenants who used your app during a given R30 (Rolling 30 day) time period and the immediately preceding R30 time period. |
| Resurrected users or tenants | Active users or tenants who used your app one or more times before but not in the immediately preceding R30 time period. |
| Lapsed users or tenants | Active users or tenants who were not seen during a given R30 time period but were seen during the immediately preceding R30 time period. |

### Usage intensity

The **Usage intensity** chart shows you key usage intensity metrics for your app.

 :::image type="content" source="../../assets/images/tdp/usage-intensity.png" alt-text="The screenshot shows the usage intensity chart.":::

| Metric | Definition |
| :-----------------------| :------------------------------------------------------------------------------------------------------|
| Median days used per month | The median numbers of days in which your app was opened in the last R30 (Rolling 30 day) time period. |
| % of 5+ Days usage | The % of Active Users who opened or used the app more than five days in the last R30 time period. |
| DAU/MAU | The ratio of the average number of unique users or tenants who used your app on each day divided by the Monthly Active Users for the selected R30 time period. |

### App dashboard

The **My App dashboard** table shows you the latest R30 (Rolling 30 day) data for each of the metrics under the previous four categories, and the Month over Month change. Use the time picker on the upper left and select the desired date, you can see daily R30 data for the last 75 days and end of month R30 data for up to 12 months.

You can select each of these **Metric name** to see trends over time.

 :::image type="content" source="../../assets/images/tdp/app-dashboard.png" alt-text="The screenshot shows My App dashboard table.":::

## Use tools to create app features

The Developer Portal also includes tools to help you build some key features of Teams apps. Some of these tools include:

* **Scene studio**: Design [custom Together Mode scenes](~/apps-in-teams-meetings/teams-together-mode.md) for Teams meetings.
* **Adaptive Cards editor**: Create and preview Adaptive Cards to include with your apps.
* **Microsoft identity platform management**: Register your apps with Azure Active Directory to help users sign in and provide access to APIs.
>
> * The Developer Portal creates a unique app ID and locks the ID for your registered Teams app. You can’t edit or provide an ID of your choice, which prevents to have duplicate app IDs for multiple apps.
> * If you create an app using the Microsoft Teams Toolkit for Visual Studio Code, you can manage your app in the Developer Portal. For more information, see [Build apps with teams toolkit and Visual studio code](~/toolkit/visual-studio-code-overview.md).
> * You can import an existing app which you created on App Studio to the Developer Portal.

## See also

[Include a SaaS offer with your Microsoft Teams app](~/concepts/deploy-and-publish/appsource/prepare/include-saas-offer.md)
