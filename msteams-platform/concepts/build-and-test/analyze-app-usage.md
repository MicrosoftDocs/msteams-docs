---
title: Analyze First and Third Party App Usage
description: Learn how to analyze your first and third party app's usage in Developer Portal for Teams such as usage by time period, platform and OS, retention state, and intensity.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
ms.date: 12/15/2022
---

# Analyze your first and third party app's usage in Developer Portal

The Developer Portal for Teams provides a comprehensive suite of tools to help you analyze and understand your app’s performance and user engagement. By using these analytics, you can gain valuable insights into how users interact with your app, identify areas for improvement, and make data-driven decisions to enhance the overall user experience.

Whether you’re tracking active users, retention rates, or usage patterns across different platforms, the Developer Portal helps you with the information you need to optimize your app and ensure its success within the Microsoft Teams ecosystem.

## App usage

The app usage for a given day is reflected within 24 to 48 hours, and usage data for the new apps can take up to three to five days to reflect in the charts.

You can view your app's usage and other insights from the **Analytics** page. To access the page:

1. Go to **[Developer Portal for Teams](https://dev.teams.microsoft.com)**.
1. Select **Apps** from the left pane.
1. Select the required app from the **Apps** page.
1. Select **Analytics** under the **Overview** or select **View details** under the **Active Users (Preview)** card.
   :::image type="content" source="../../assets/images/tdp/dev-app-portal.png" alt-text="Screenshot shows you the analytics page of your app in Developer Portal."lightbox="../../assets/images/tdp/dev-app-portal.png":::
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
* [Usage by country or region](#usage-by-country-or-region)

### Usage by time period

The **Usage by time period** chart shows you the number of active users or tenants who opened and used your app across different time periods.

 :::image type="content" source="../../assets/images/tdp/usage-by-time-period.png" alt-text="Screenshot shows you the usage by time period chart for your published app.":::
| Metric | Definition |
| :-----------------------| :------------------------------------------------------------------------------------------------------|
| **Monthly R30** | Each data point represents a given R30 (Rolling 30 days) period. |
| **Monthly R28** | Each data point represents a given R28 (Rolling 28 days) period. |
| **Weekly R7** | Each data point represents a given R7 (Rolling 7 days) period. |
| **Daily** | Each data point represents a given R1 (Rolling 1 day) period. |

### Usage by retention state

The **Usage by retention state** chart lets you track four key retention or churn metrics for your app over time.

:::image type="content" source="../../assets/images/tdp/usage-by-retention-state.png" alt-text="Screenshot shows you the usage by retention state chart for your published app.":::
| Metric | Definition |
| :-----------------------| :------------------------------------------------------------------------------------------------------|
| New users or tenants | Active users or tenants who are new and have not used your app. |
| Returning users or tenants | Active users or tenants who used your app during a given R30 (Rolling 30 days) time period and the immediately preceding R30 time period. |
| Resurrected users or tenants | Active users or tenants who used your app one or more times before but not in the immediately preceding R30 time period. |
| Lapsed users or tenants | Active users or tenants who were not seen during a given R30 time period but were seen during the immediately preceding R30 time period. |

### Usage intensity

The **Usage intensity** chart shows the key usage intensity metrics for your app.

 :::image type="content" source="../../assets/images/tdp/usage-intensity.png" alt-text="Screenshot shows you the usage intensity chart for your published app.":::
| Metric | Definition |
| :-----------------------| :------------------------------------------------------------------------------------------------------|
| **Median days used per month** | The median number of days in which your app was opened in the last R30 (Rolling 30 days) time period. |
| **% of 5+ Days usage** | The percentage of active users who opened or used the app more than five days in the last R30 time period. |
| **DAU/MAU** | The ratio of the average number of unique users or tenants who used your app on each day divided by the Monthly active users for the selected R30 time period. |

### Usage by country or region

The **Usage by region** chart shows the various regions where your app is being used.

## Host product

The Host product page shows you the following app usage analytics:

* [Usage by platform](#usage-by-platform)
* [Usage by host product](#usage-by-host-product)
* [Usage by operating system](#usage-by-operating-system)

### Usage by platform

The **Usage by platform** chart shows your app's active usage across various platform, such as **Desktop**, **Mobile**, and **Web**. The same user or tenant can use an app on multiple endpoints. Each data point represents a given R30 (Rolling 30 days) period.

### Usage by host product

The **Usage by host app** chart shows your app's active usage across various host products, such as **Teams**, **Microsoft 365 app**, **Outlook**, and **Copilot**.

Image to be added

### Usage by operating system

The **Usage by operating system** chart shows your app's active usage across various operating system, such as **Windows**, **Mac**, **iOS**, and **Android**. The same user or tenant can use an app on multiple endpoints. Each data point represents a given R30 (Rolling 30 days) period.

## App capability

Content to  be added

### Usage by app capability

You can view the individual app capability usage for R30, R7, daily.

Image to be added

## Segment

### Usage by segment

The **Usage by segment** shows the various segments where your app is used.

Image to be added

## Vertical

### Usage by industry vertical

The **Usage by industry vertical** shows the overall industry verticals such as Healthcare, Finance, Retail, and Manufacturing, that utilize your app.

Image to be added
