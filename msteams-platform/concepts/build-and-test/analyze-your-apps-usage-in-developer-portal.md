---
title: Analyze App Usage in Developer Portal
description: Learn how to analyze your app's usage in Developer Portal for Teams such as usage by time period, platform and OS, retention state, and intensity.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
ms.date: 12/15/2022
---

# Analyze your app's usage in Developer Portal

The Developer Portal for Teams provides a comprehensive suite of tools to help you analyze and understand your app’s performance and user engagement. By using these analytics, you can gain valuable insights into how users interact with your app, identify areas for improvement, and make data-driven decisions to enhance the overall user experience.

Whether you’re tracking active users, retention rates, or usage patterns across different platforms, the Developer Portal helps you with the information you need to optimize your app and ensure its success within the Microsoft Teams ecosystem.

In the Developer Portal for Teams, on the **Overview** page, you can see the total number of active users for your app.

| Metric | Definition |
| :-----------------------| :------------------------------------------------------------------------------------------------------|
| **Monthly R30 active users (MAU)** | The default usage metric. It shows the count of unique active users who used your app within that rolling 30 days window in UTC. |
| **Daily active users (DAU)** | It shows you the count of unique active users who used your app in a given day in UTC. |

The app usage for a given day is reflected within 24 to 48 hours, and usage data for the new apps can take up to three to five days to reflect in the charts.

You can view your app's usage and other insights from the **Analytics** page. To access the page:

1. Go to **[Developer Portal for Teams](https://dev.teams.microsoft.com)**.
1. Select **Apps** from the left pane.
1. Select the required app from the **Apps** page.
1. Select **Analytics** under the **Overview** or select **View details** under the **Active Users (Preview)** card.

   :::image type="content" source="../../assets/images/tdp/dev-app-portal.png" alt-text="Screenshot shows you the analytics page of your app in Developer Portal."lightbox="../../assets/images/tdp/dev-app-portal.png":::

# [Custom app built for your org](#tab/custom-app-built-for-your-org)

As you explore individual metrics on this page, you can use **Filter** button to analyze your app's usage from the following filter options:

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

 ## Usage by time period

  The **Usage by time period** chart shows you the number of active users or tenants who opened and used your app across different time periods.

   :::image type="content" source="../../assets/images/tdp/usage-by-time-period.png" alt-text="Screenshot shows you the usage by time period chart for your published app.":::

 | Metric | Definition |
 | :-----------------------| :------------------------------------------------------------------------------------------------------|
 | **Monthly R30** | Each data point represents a given R30 (Rolling 30 days) period. |
 | **Monthly R28** | Each data point represents a given R28 (Rolling 28 days) period. |
 | **Weekly R7** | Each data point represents a given R7 (Rolling 7 days) period. |
 | **Daily** | Each data point represents a given R1 (Rolling 1 day) period. |

 ## Usage by platform and OS

  The **Usage by platform and OS** chart shows your app's active usage across various endpoints, such as **Windows**, **Mac**, **iOS**, **Android**, and **Web**. The same user or tenant can use an app on multiple endpoints. Each data point represents a given R30 (Rolling 30 days) period.

   :::image type="content" source="../../assets/images/tdp/usage-by-platform-OS.png" alt-text="Screenshot shows you the usage by platform and OS chart for your published app.":::

 ## Usage by retention state

   The **Usage by retention state** chart lets you track four key retention or churn metrics for your app over time.

   :::image type="content" source="../../assets/images/tdp/usage-by-retention-state.png" alt-text="Screenshot shows you the usage by retention state chart for your published app.":::

   | Metric | Definition |
   | :-----------------------| :------------------------------------------------------------------------------------------------------|
   | New users or tenants | Active users or tenants who are new and have not used your app. |
   | Returning users or tenants | Active users or tenants who used your app during a given R30 (Rolling 30 days) time period and the immediately preceding R30 time period. |
   | Resurrected users or tenants | Active users or tenants who used your app one or more times before but not in the immediately preceding R30 time period. |
   | Lapsed users or tenants | Active users or tenants who were not seen during a given R30 time period but were seen during the immediately preceding R30 time period. |

 ## Usage intensity

   The **Usage intensity** chart shows the key usage intensity metrics for your app.

   :::image type="content" source="../../assets/images/tdp/usage-intensity.png" alt-text="Screenshot shows you the usage intensity chart for your published app.":::

   | Metric | Definition |
   | :-----------------------| :------------------------------------------------------------------------------------------------------|
   | **Median days used per month** | The median number of days in which your app was opened in the last R30 (Rolling 30 days) time period. |
   | **% of 5+ Days usage** | The percentage of active users who opened or used the app more than five days in the last R30 time period. |
   | **DAU/MAU** | The ratio of the average number of unique users or tenants who used your app on each day divided by the Monthly active users for the selected R30 time period. |

 ## App dashboard

   The **My App dashboard** table shows you the latest R30 (Rolling 30 days) data for each of the metrics under the previous four categories, and the Month over Month change. Use the time picker on the upper left and select the desired date, you can see daily R30 data for the last 75 days and end of month R30 data for up to 12 months.

   You can select each of these **Metric name** to see trends over time.

   :::image type="content" source="../../assets/images/tdp/app-dashboard.png" alt-text="Screenshots shows you app dashboard chart for your published app in Developer Portal.":::

# [Third party apps](#tab/thirdpartyapps)

 

 ## App usage

 The app usage for a given day is reflected within 24 to 48 hours, and usage data for the new apps can take up to three to five days to reflect in the charts.

   :::image type="content" source="../../assets/images/tdp/dev-analytics-filter.png" alt-text="Screenshot shows you the analytics page filter in Developer Portal.":::
   After you have selected your desired filters, you can explore the following individual widgets:

   * [Usage over time](#usage-by-time-period)
   * [Usage by retention state](#usage-by-retention-state)
   * [Usage by country or region](#usage-by-country-or-region)
   * [Usage intensity](#usage-intensity)

 ### Usage over time

   The **Usage over time** chart shows you the number of active users or tenants who opened and used your app across different time periods.

   (Image to be added)

   | Metric | Definition |
   | :-----------------------| :------------------------------------------------------------------------------------------------------|
   | **Monthly (MAU)** | Each data point represents a given R28 (Rolling 28 days) period. |
   | **Weekly (WAU)** | Each data point represents a given R7 (Rolling 7 days) period. |
   | **Daily (DAU)** | Each data point represents a given R1 (Rolling 1 day) period. |

 ### Usage by retention state

   The **Usage by retention state** chart lets you track four key retention or churn metrics for your app over time.


   | Metric | Definition |
   | :-----------------------| :------------------------------------------------------------------------------------------------------|
   | New users or tenants | Active users or tenants who are new and have not used your app. |
   | Returning users or tenants | Active users or tenants who used your app during a given R30 (Rolling 30 days) time period and the immediately preceding R30 time period. |
   | Resurrected users or tenants | Active users or tenants who used your app one or more times before but not in the immediately preceding R30 time period. |
   | Lapsed users or tenants | Active users or tenants who were not seen during a given R30 time period but were seen during the immediately preceding R30 time period. |

 ### Usage by country or region

   The **Usage by region** chart shows the various regions where your app is being used. You can select **View details** for more details on actuve users in different country or region.

   image to be added

 ### Usage intensity

   The **Usage intensity** chart shows the key usage intensity metrics for your app.

   image to be added

   | Metric | Definition |
   | :-----------------------| :------------------------------------------------------------------------------------------------------|
   | **Median days used per month** | The median number of days in which your app was opened in the last R30 (Rolling 30 days) time period. |
   | **% of 5+ Days usage** | The percentage of active users who opened or used the app more than five days in the last R30 time period. |
   | **DAU/MAU** | The ratio of the average number of unique users or tenants who used your app on each day divided by the Monthly active users for the selected R30 time period. |

 ### App dashboard

   The **My App dashboard** table shows you the latest R30 (Rolling 28 days) data for each of the metrics under the previous four categories, and the Month over Month change. Use the time picker on the upper left and select the desired date, you can see daily R30 data for the last 75 days and end of month R30 data for up to 12 months.

   You can select each of these **Metric name** to see trends over time.

   image to be added

 ## Host product

   The Host product page shows you the following app usage analytics:

   * [Usage by host product](#usage-by-host-product)
   * [Usage by operating system](#usage-by-operating-system)
   * [Usage by platform](#usage-by-platform)

   You can also check the host with most active users and OS with most active users of monthly, weekly, and daily data in metric card on this page.

 ### Usage by host product

   The **Usage by host app** chart shows your app's active usage across various host products, such as **Teams**, **Microsoft 365 app**, and **Outlook** of monthly, weekly, and daily data.

   Image to be added

 ### Usage by platform

   The **Usage by platform** chart shows your app's active usage across various platform, such as **Desktop**, **Mobile**, and **Web** of monthly, weekly, and daily data.

   Image to be added

 ### Usage by operating system

   The **Usage by operating system** chart shows your app's active usage across various operating system, such as **Windows**, **Mac**, **iOS**, and **Android** of monthly, weekly, and daily data.

   Image to be added

 ## App capability

   The app capability page shows you the usage of individual app capabilities that you've configured within your app. The Key Performance Indicator (KPI) cards that display metrics such as the capability with the most active users and the capability with the least active users.

  This page summarizes the overall usage of the following app capabilities in differnt host product.


   * Personal App – Personal- Teams 
   * Personal Tabs-Sope(?)   - Outlook  

Personal Tabs- (scope?) Office  

Tabs-- Group, team, meetings – Teams  

Message Extensions- scope? Teams  

Message Extensions –scope?  Outlook  

Add-In – scope? - outlook  

Bots – personal, channel,meetings-  teams- Teams  






---

## See also

* [Teams Toolkit Overview](../../toolkit/teams-toolkit-fundamentals.md)
* [Include a SaaS offer with your Microsoft Teams app](~/concepts/deploy-and-publish/appsource/prepare/include-saas-offer.md)
