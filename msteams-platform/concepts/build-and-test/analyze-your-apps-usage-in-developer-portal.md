---
title: Analyze App Usage in Developer Portal
description: Learn how to analyze your app's usage metrics for your custom apps built for your org (LOB apps) and third-party apps in Developer Portal.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
ms.owner: luywang
ms.date: 12/15/2022
---

# Analyze app usage in Developer Portal

Developer Portal provides a comprehensive suite of tools to help you analyze and understand your app’s performance and user engagement. By using these analytics, you can gain valuable insights into how users interact with your app, identify areas for improvement, and make data-driven decisions to enhance the overall user experience.

Whether you’re tracking active users, retention rates, or usage patterns across different platforms, Developer Portal helps you with the information you need to optimize your app and ensure its success. Custom apps built for your org (LOB apps) can access app usage data only for Teams. However, for third-party apps you can explore new Microsoft 365 dimensions, such as host product and capabilities.

The app usage for a given day is reflected within 24 to 48 hours, and usage data for the new apps can take up to three to five days to reflect in the charts.

# [Custom apps built for your org (LOB apps)](#tab/custom-apps-built-for-your-org)

You can view your custom app's usage and other insights from the **Analytics** page. To access the page:

1. Go to **[Developer Portal](https://dev.teams.microsoft.com)**.
1. Select **Apps** from the left pane.
1. Select the required app from the **Apps** page.
1. Select **Analytics** under the **Overview** section or select **View details** under the **Active Users (Preview)** card.

   :::image type="content" source="../../assets/images/tdp/dev-app-portal.png" alt-text="Screenshot shows you the analytics page of your app in Developer Portal."lightbox="../../assets/images/tdp/dev-app-portal.png":::

| Metric | Definition |
| :-----------------------| :------------------------------------------------------------------------------------------------------|
| **Monthly R30 active users (MAU)** | The default usage metric. It shows the count of unique active users who used your app within that rolling 30 days window in UTC. |
| **Daily active users (DAU)** | It shows you the count of unique active users who used your app in a given day in UTC. |
| **Weekly R7** | It shows the count of unique active users who used your app within that rolling 7 days window in UTC. |

As you explore individual metrics on this page, you can use the **Filter** button to analyze your app's usage from the following filter options:

* **Aggregation type**: This filter allows you to group the metrics by a count of distinct users or a count of distinct tenants or customers.
* **Platform**
* **Operating system**
* **Area**

 :::image type="content" source="../../assets/images/tdp/dev-analytics-filter.png" alt-text="Screenshot shows you the analytics page filter in Developer Portal.":::

After you have selected your desired filters, you can explore the following individual widgets:

* [Usage by time period](#usage-by-time-period)
* [Usage by platform and OS](#usage-by-platform-and-os)
* [Usage by retention state](#usage-by-retention-state)
* [Usage intensity](#usage-intensity)

 ### Usage by time period

  The **Usage by time period** chart shows you the number of active users or tenants who opened and used your app across different time periods.

   :::image type="content" source="../../assets/images/tdp/usage-by-time-period.png" alt-text="Screenshot shows you the usage by time period chart for your published app.":::

 | Metric | Definition |
 | :-----------------------| :------------------------------------------------------------------------------------------------------|
 | **Monthly R30** | Each data point represents a given R30 (Rolling 30 days) period. |
 | **Monthly R28** | Each data point represents a given R28 (Rolling 28 days) period. |
 | **Weekly R7** | Each data point represents a given R7 (Rolling 7 days) period. |
 | **Daily** | Each data point represents a given R1 (Rolling 1 day) period. |

 ### Usage by platform and OS

  The **Usage by platform and OS** chart shows your app's active usage across various endpoints, such as **Windows**, **Mac**, **iOS**, **Android**, and **Web**. The same user or tenant can use an app on multiple endpoints. Each data point represents a given R30 (Rolling 30 days) period.

   :::image type="content" source="../../assets/images/tdp/usage-by-platform-OS.png" alt-text="Screenshot shows you the usage by platform and OS chart for your published app.":::

 ### Usage by retention state

   The **Usage by retention state** chart lets you track four key retention or churn metrics for your app over time.

   :::image type="content" source="../../assets/images/tdp/usage-by-retention-state.png" alt-text="Screenshot shows you the usage by retention state chart for your published app.":::

   | Metric | Definition |
   | :-----------------------| :------------------------------------------------------------------------------------------------------|
   | New users or tenants | Active users or tenants who are new and haven't used your app. |
   | Returning users or tenants | Active users or tenants who used your app during a given R30 (Rolling 30 days) time period and the immediately preceding R30 time period. |
   | Resurrected users or tenants | Active users or tenants who used your app one or more times before but not in the immediately preceding R30 time period. |
   | Lapsed users or tenants | Active users or tenants who weren't seen during a given R30 time period but were seen during the immediately preceding R30 time period. |

 ### Usage intensity

   The **Usage intensity** chart shows the key usage intensity metrics for your app.

   :::image type="content" source="../../assets/images/tdp/usage-intensity.png" alt-text="Screenshot shows you the usage intensity chart for your published app.":::

   | Metric | Definition |
   | :-----------------------| :------------------------------------------------------------------------------------------------------|
   | **Median days used per month** | The median number of days in which your app was opened in the last R30 (Rolling 30 days) time period. |
   | **% of 5+ Days usage** | The percentage of active users who opened or used the app more than five days in the last R30 time period. |
   | **DAU/MAU** | The ratio of the average number of unique users or tenants who used your app on each day divided by the Monthly active users for the selected R30 time period. |

 ### App dashboard

   The **My App dashboard** table shows you the latest R30 (Rolling 30 days) data for each of the metrics under the previous four categories, and the Month over Month change. Use the time picker on the upper right side and select the desired date to view the following:

* Daily R30 data for the last 75 days.
* End of month R30 data for up to 12 months.

   You can select each of these **Metric name** to see trends over time.

   :::image type="content" source="../../assets/images/tdp/app-dashboard.png" alt-text="Screenshots shows you app dashboard chart for your published app in Developer Portal.":::

# [Third-party apps](#tab/thirdpartyapps)

To view app usage in Developer Portal, you need **Manager** or **Developer** role in Partner Center. The markeplace account owner or manager can [assign user roles and permissions](../../../../partner-center/account-settings/user-roles.md).

You can view usage for your [third-party app](../../promote-app-adoption.md#access-to-your-apps) and other insights from the **Analytics** page. To access the page:

1. Go to **[Developer Portal](https://dev.teams.microsoft.com)**.
1. Select **Apps** from the left pane.
1. Select the required app from the **Apps** page.
1. Select **Analytics** under the **Overview** section.

To learn how to import your published app into Developer Portal, see [import an existing app](~/concepts/build-and-test/teams-developer-portal.md#import-an-existing-app).


| Metric | Definition |
| :-----------------------| :------------------------------------------------------------------------------------------------------|
| **Monthly R28 active users (MAU)** | The default usage metric. It shows the count of unique active users who used your app within that rolling 28 days window in UTC. |
| **Daily active users (DAU)** | It shows you the count of unique active users who used your app in a given day in UTC. |
| **Weekly R7** | It shows the count of unique active users who used your app within that rolling 7 days window in UTC. |

As you explore individual metrics on this page, you can use the **Filter** button to analyze your app's usage from the following filter options:

* **Aggregation type**: This filter allows you to group the metrics by a count of distinct users or a count of distinct tenants or customers.
* **Platform**
* **Operating system**
* **Area**

 :::image type="content" source="../../assets/images/tdp/filter-tdp-analytics.png" alt-text="Screenshot shows you the app analytics page filter in Developer Portal for Teams."lightbox="../../assets/images/tdp/filter-tdp-analytics.png":::

> [!TIP]
> To know more about each metric definition, select **See metric definitions**. A pop-up help window appears on the right-side of the window with the required definitions.

As you explore the app usage metrics on this page, you can see the following three sections:

* [App usage](#app-usage)
* [Host product](#host-product)
* [App capability](#app-capability)

 ### App usage

 The **App usage** tab shows you the following metrics:

   * [Usage over time](#usage-by-time-period)
   * [Usage by retention state](#usage-by-retention-state)
   * [Usage by country or region](#usage-by-country-or-region)
   * [Usage intensity](#usage-intensity)

   :::image type="content" source="../../assets/images/tdp/tdp-app-usage.png" alt-text="Screenshots shows you app usage chart of your published app in Developer Portal."lightbox="../../assets/images/tdp/tdp-app-usage.png":::

 #### Usage over time

   The **Usage over time** chart shows you the number of active users or tenants who opened and used your app across different time periods.

   :::image type="content" source="../../assets/images/tdp/tdp-usage-over-time.png" alt-text="Screenshots shows you app usage over time of your published app in Developer Portal.":::

   | Metric | Definition |
   | :-----------------------| :------------------------------------------------------------------------------------------------------|
   | **Monthly (MAU)** | Each data point represents a given R28 (Rolling 28 days) period. |
   | **Weekly (WAU)** | Each data point represents a given R7 (Rolling 7 days) period. |
   | **Daily (DAU)** | Each data point represents a given R1 (Rolling 1 day) period. |

 #### Usage by retention state

   The **Usage by retention state** chart lets you track four key retention or churn metrics for your app over time.

   :::image type="content" source="../../assets/images/tdp/tdp-retention.png" alt-text="Screenshots shows you app usage by retention state of your published app in Developer Portal.":::

   | Metric | Definition |
   | :-----------------------| :------------------------------------------------------------------------------------------------------|
   | New users or tenants | Active users or tenants who are new and haven't used your app. |
   | Returning users or tenants | Active users or tenants who used your app during a given R28 (Rolling 28 days) time period and the immediately preceding R28 time period. |
   | Resurrected users or tenants | Active users or tenants who used your app one or more times before but not in the immediately preceding R28 time period. |
   | Lapsed users or tenants | Active users or tenants who weren't seen during a given R28 time period but were seen during the immediately preceding R28 time period. |

 #### Usage by country or region

   The **Usage by region** chart shows the various regions where your app is being used. You can select **View details** for more information on active users in different countries or regions.

   :::image type="content" source="../../assets/images/tdp/tdp-country.png" alt-text="Screenshots shows you app usage by country or region of your published app in Developer Portal."lightbox="../../assets/images/tdp/tdp-region.png":::

 #### Usage intensity

   The **Usage intensity** chart shows the key usage intensity metrics for your app.

   :::image type="content" source="../../assets/images/tdp/tdp-usage-intensity.png" alt-text="Screenshots shows you app usage intensity of your published app in Developer Portal.":::

   | Metric | Definition |
   | :-----------------------| :------------------------------------------------------------------------------------------------------|
   | **Median days used per month** | The median number of days in which your app was opened in the last R28 (Rolling 28 days) time period. |
   | **% of 5+ Days usage** | The percentage of active users who opened or used the app more than five days in the last R28 time period. |
   | **DAU/MAU** | The ratio of the average number of unique users or tenants who used your app on each day divided by the Monthly active users for the selected R28 time period. |

 #### My app dashboard

   The **My App Dashboard** table shows you the latest R30 (Rolling 30 days) data for each of the metrics under the previous four categories, and the Month over Month change. Use the time picker on the upper left side and select the desired date to view the following:

* Daily R30 data for the last 75 days.
* End of month R30 data for up to 12 months.

   You can select each of these metric names to see trends over time.

   :::image type="content" source="../../assets/images/tdp/tdp-app-dashboard-view.png" alt-text="Screenshots shows you app capability usage of your published app in Developer Portal."lightbox="../../assets/images/tdp/tdp-app-dashboard-view.png":::

 ### Host product

   The **Host product** tab shows you the following app usage analytics:

   * [Usage by host product](#usage-by-host-product)
   * [Usage by operating system](#usage-by-operating-system)
   * [Usage by platform](#usage-by-platform)

   The Key Performance Indicator (KPI) cards display metrics such as the host with the most active users and the operating system (OS) with the most active users, based on monthly, weekly, and daily data, in a metric card format.

   :::image type="content" source="../../assets/images/tdp/tdp-host-product.png" alt-text="Screenshots shows you app usage in different host products of your published app in Developer Portal."lightbox="../../assets/images/tdp/tdp-host-product.png":::

 #### Usage by host product

   The **Usage by host product** chart shows your app's active usage across various host products, including **Teams**, **Outlook**, and the **Microsoft 365 app** of monthly, weekly, and daily data.

   :::image type="content" source="../../assets/images/tdp/tdp-host-usage.png" alt-text="Screenshots shows you app usage in different host product of your published app in Developer Portal.":::

 #### Usage by platform

   The **Usage by platform** chart shows your app's active usage across various platforms, such as **Desktop**, **Mobile**, and **Web** of monthly, weekly, and daily data.

   :::image type="content" source="../../assets/images/tdp/tdp-usage-platform.png" alt-text="Screenshots shows you app usage in different platform of your published app in Developer Portal.":::

   > [!NOTE]
   > The `Preview` tag indicates that the metric **Usage by host product** is in its initial phase and might undergo modifications as we collect feedback and continue to improve the experience.

 #### Usage by operating system

   The **Usage by operating system** chart shows your app's active usage across various operating systems, such as **Windows**, **Mac**, **iOS**, and **Android** of monthly, weekly, and daily data.

   :::image type="content" source="../../assets/images/tdp/tdp-operating-system.png" alt-text="Screenshots shows you app usage in different OS of your published app in Developer Portal.":::

 ### App capability

   The **App capability** tab shows you the usage of individual app capabilities that you've configured within your app.

  This page summarizes the overall usage of the following app capabilities in different host products.

  * Bot
  * Tab
  * Message extension
  * Personal app
  * Connector
  * Personal tab

   :::image type="content" source="../../assets/images/tdp/tdp-app-capability.png" alt-text="Screenshots shows you app capability usage in different host products of your published app in Developer Portal." lightbox="../../assets/images/tdp/tdp-app-capability.png":::

   > [!NOTE]
   > The `Preview` tag indicates that the metric is in its initial phase and might undergo modifications as we collect feedback and continue to improve the experience.

 ### Known limitations

 * The usage data for message extension in Outlook and Outlook Add-in isn't available.
 * The usage data of the Outlook personal tab includes both personal tab and tab (meeting scenario) data.
 * The usage data for consumer apps isn't available.
 * The usage data for Android in Outlook, which doesn't have a tenant ID, isn't available.

---

## See also

* [Teams Toolkit Overview](../../toolkit/teams-toolkit-fundamentals.md#quick-access-to-teams-developer-portal)
* [Include a SaaS offer with your Microsoft Teams app](~/concepts/deploy-and-publish/appsource/prepare/include-saas-offer.md)
