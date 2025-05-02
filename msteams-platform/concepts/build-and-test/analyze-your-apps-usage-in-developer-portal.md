---
title: Analyze App Usage in Developer Portal
description: Learn how to analyze your app's usage metrics for your custom apps built for your org (LOB apps) and third-party apps in Developer Portal.
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
ms.owner: luywang
ms.date: 05/08/2025
---

# Analyze app usage in Developer Portal

Developer Portal for Microsoft Teams provides a comprehensive suite of tools to help you analyze and understand your app's performance and user engagement. By using these analytics, you can gain valuable insights into how users interact with your app, identify areas for improvement, and make data-driven decisions to enhance the overall user experience.

Whether you're tracking active users, retention rates, or usage patterns across different platforms, Developer Portal helps you with the information you need to optimize your app and ensure its success. The app usage data for a given day is reflected within 24 to 48 hours and for the new apps it can take up to three to five days for the charts to reflect the data.

# [Custom apps (New)](#tab/custom-apps-built-for-your-org)

## Prerequisite

To analyze custom app usage, your tenant admin (a global administrator or a Teams administrator) must allow app usage data for custom apps to be shown in Developer Portal. To allow app usage:

1. Go to [Microsoft 365 admin center](https://admin.microsoft.com).
1. Navigate to **Settings** > **Org settings** > **Services** > **Developer Portal for Teams**.
1. Select **Allow app usage for all custom apps to show in the Developer Portal**.

For more information, see [enable developers to use app analytics](/microsoft-365/admin/manage/enable-dev-analytics).

:::image type="content" source="../../assets/images/tdp/mac-setting.png" alt-text="Screenshot shows where admin can allow custom app analytics in Microsoft 365 admin center." lightbox="../../assets/images/tdp/mac-setting.png":::

## Metric definitions

| Metric | Definition |
| :-----------------------| :------------------------------------------------------------------------------------------------------|
| **Monthly active users (MAU)** | Number of unique users who performed an intentional activity with your app within that rolling 28 days window in UTC. |
| **Weekly active users (WAU)** | Number of unique users who performed an intentional activity with your app within that rolling seven days window in UTC. |
| **Daily active users (DAU)** | Number of unique users who performed an intentional activity with your app in a given day in UTC. |
| **Monthly active tenants** | Number of unique tenants who performed an intentional activity with your app within that rolling 28 days window in UTC. |
| **Weekly active tenants** | Number of unique tenants who performed an intentional activity with your app within that rolling seven days window in UTC. |
| **Daily active tenants** | Number of unique tenants who performed an intentional activity with your app in a given day in UTC. |

> [!TIP]
> To know more about each metric definition, select **See metric definitions**. A pop-up window appears on the right-side of the window with the required definitions.

As you explore individual metrics on this page, you can use the **Filter** button to analyze your app's usage from the following filter options:

* **Aggregation type**: Allows you to view active users or active tenants.
* **Platform**: Allows you to group the metrics by the platform on which users performed intentional activities with your app. The platform can be **Desktop**, **Mobile**, **Web**, or other available options.
* **Operating system**: Allows you to group the metrics by the operating system on which users performed intentional activities with your app. The operating system can be **Windows**, **Mac**, **iOS**, **Android** or other available options.
* **Area**: Allows you to group the metrics by the geographical location of the active usage.

 :::image type="content" source="../../assets/images/tdp/filter-tdp-analytics.png" alt-text="Screenshot shows the app analytics page filter in Developer Portal." lightbox="../../assets/images/tdp/filter-tdp-analytics.png":::

## App analytics

To gain insights on the app usage and analyze trends, explore the following three sections under **Analytics**:

* [App usage](#app-usage)
* [Host product](#host-product)
* [App capability](#app-capability)

### App usage

The **App usage** tab shows the following metrics to help you track engagement and user behavior:

* [Usage over time](#usage-over-time)
* [Usage by retention state](#usage-by-retention-state)
* [Usage by country or region](#usage-by-country-or-region)
* [Usage intensity](#usage-intensity)

:::image type="content" source="../../assets/images/tdp/tdp-app-usage.png" alt-text="Screenshot shows app usage chart of your published app in Developer Portal." lightbox="../../assets/images/tdp/tdp-app-usage.png":::

#### Usage over time

The **Usage over time** chart shows the number of active users or tenants who opened and used your app across different time periods.

:::image type="content" source="../../assets/images/tdp/tdp-usage-over-time.png" alt-text="Screenshot shows app usage over time of your published app in Developer Portal.":::

| Metric | Definition |
| :-----------------------| :------------------------------------------------------------------------------------------------------|
| **Monthly (MAU)** | Each data point represents a given R28 (Rolling 28 days) period. |
| **Weekly (WAU)** | Each data point represents a given R7 (Rolling seven days) period. |
| **Daily (DAU)** | Each data point represents a given R1 (Rolling one day) period. |

#### Usage by retention state

The **Usage by retention state** chart allows you track four key retention or churn metrics for your app over time.

:::image type="content" source="../../assets/images/tdp/tdp-retention.png" alt-text="Screenshot shows app usage by retention state of your published app in Developer Portal.":::

| Metric | Definition |
| :-----------------------| :------------------------------------------------------------------------------------------------------|
| New users or tenants | Active users or tenants who used your app for the first time in the current time period. |
| Returning users or tenants | Active users or tenants who used your app during the current period and in the immediately preceding period. |
| Resurrected users or tenants | Active users or tenants who started using your app again in the current period, after a previous period of inactivity. |
| Lapsed users or tenants | Active users or tenants who stopped using your app in the current period, after a previous period of activity. |

#### Usage by country or region

The **Usage by country/region** chart shows the various regions where your app is being used. Each user is mapped to a single area or geography. You can select **View details** for more information on active users in different countries or regions.

:::image type="content" source="../../assets/images/tdp/tdp-country.png" alt-text="Screenshot shows app usage by country or region of your published app in Developer Portal." lightbox="../../assets/images/tdp/tdp-region.png":::

#### Usage intensity

The **Usage intensity** chart shows frequency and depth of use. They're one indicator that users are finding value in continuing to use your app.

:::image type="content" source="../../assets/images/tdp/tdp-usage-intensity.png" alt-text="Screenshot shows app usage intensity of your published app in Developer Portal.":::

| Metric | Definition |
| :-----------------------| :------------------------------------------------------------------------------------------------------|
| **Median days used per month** | Median number of days in which your app was opened in the last month. |
| **% of 5+ days usage** | Percentage of active users who opened or used your app more than five days in the last month. |
| **DAU/MAU** | Average number of daily active users (DAU) divided by monthly active users (MAU) for a rolling 30-day time period. |

#### App dashboard

The **My App Dashboard** table shows the latest R30 (Rolling 30 days) data for each of the metrics under the previous four categories, and the Month over Month change. Use the time picker on the upper left side and select the desired date to view the following:

* Select any day in the last 75 days to view daily R30 data.
* Select any end of month in the last 12 months to view R30 data.

You can select each of these metric names to see trends over time.

:::image type="content" source="../../assets/images/tdp/tdp-app-dashboard-view.png" alt-text="Screenshot shows app capability usage of your published app in Developer Portal." lightbox="../../assets/images/tdp/tdp-app-dashboard-view.png":::

### Host product

The **Host product** tab shows the following app usage analytics:

* [Usage by host product](#usage-by-host-product)
* [Usage by platform](#usage-by-platform)
* [Usage by operating system](#usage-by-operating-system)

The first two scorecards display metrics such as the host with the most active users and the operating system (OS) with the most active users based on monthly, weekly, and daily data.

:::image type="content" source="../../assets/images/tdp/tdp-host-product.png" alt-text="Screenshot shows app usage in different host products of your published app in Developer Portal." lightbox="../../assets/images/tdp/tdp-host-product-full.png":::

#### App usage by host product

The **App usage by host product** chart shows your app's active usage across various host products, including **Microsoft 365 app**, **Microsoft 365 Copilot**, **Outlook**, and **Teams**.

:::image type="content" source="../../assets/images/tdp/tdp-host-usage.png" alt-text="Screenshot shows app usage in different host product of your published app in Developer Portal.":::

#### Usage by platform

The **Usage by platform** chart shows your app's active usage across various platforms, such as **Desktop**, **Mobile**, **Web**, and other platforms where the app is used.

:::image type="content" source="../../assets/images/tdp/tdp-usage-platform.png" alt-text="Screenshot shows app usage in different platforms of your published app in Developer Portal.":::

   > [!NOTE]
   > The `Preview` tag indicates that the metric **Usage by host product** is in its initial phase and might undergo modifications as we collect feedback and continue to improve the experience.

#### Usage by operating system

The **Usage by operating system** chart shows your app's active usage across various operating systems, such as **Android**, **Chrome OS**, **Linux**, **Mac**, **Windows**, and **iOS** of monthly, weekly, and daily data.

:::image type="content" source="../../assets/images/tdp/tdp-operating-system.png" alt-text="Screenshot shows app usage in different OS of your published app in Developer Portal.":::

## Capability

The **Capability** tab shows the usage of individual app capabilities that you've configured within your app. This page summarizes the overall usage of the following app capabilities in different host products.

   * Microosft 365 Copilot Agent
   * Bots
   * Tabs
   * Message extension
   * Personal app
   * Connector
   * Personal tab

:::image type="content" source="../../assets/images/tdp/tdp-app-capability.png" alt-text="Screenshot shows app capability usage in different host products of your published app in Developer Portal." lightbox="../../assets/images/tdp/tdp-app-capability.png":::

   > [!NOTE]
   > **Microsoft 365 Copilot Agent** includes usage of declarative agents only. The usage of the custom engine agent isn't available in the Developer Portal.

# [Custom apps (Deprecating)](#tab/custom-apps-deprecating)

   > [!NOTE]
   >
   > * The current custom app analytics is being deprecated soon.
   > * You can opt in to the new custom app analytics in Developer Portal by selecting the banner on the Analytics page.
   > * Learn more about the new custom app analytics [here](/microsoftteams/platform/concepts/build-and-test/analyze-your-apps-usage-in-developer-portal?tabs=custom-apps-built-for-your-org).

## Get Started

You can view your custom app's usage and other insights from the **Analytics** page. To access the page:

1. Go to **[Developer Portal](https://dev.teams.microsoft.com)**.
1. Select **Apps** from the left pane.
1. Select the required app from the **Apps** page.
1. Select **Analytics** under the **Overview** section or select **View details** under the **Active Users (Preview)** card.

   :::image type="content" source="../../assets/images/tdp/dev-app-portal.png" alt-text="Screenshot shows the analytics page of your app in Developer Portal." lightbox="../../assets/images/tdp/dev-app-portal.png":::

## Metric definitions

| Metric | Definition |
| :-----------------------| :------------------------------------------------------------------------------------------------------|
| **Monthly R30 active users (MAU)** | The default usage metric. It shows the count of unique active users who used your app within that rolling 30 days window in UTC. |
| **Daily active users (DAU)** | It shows the count of unique active users who used your app in a given day in UTC. |
| **Weekly R7** | It shows the count of unique active users who used your app within that rolling seven days window in UTC. |

As you explore individual metrics on this page, you can use the **Filter** button to analyze your app's usage from the following filter options:

* **Aggregation type**: Allows you to group the metrics by active users or active tenants.
* **Platform**: Allows you to group the metrics by the platform on which users performed intentional activities with your app. The platform can be desktop, mobile, or web.
* **Operating system**: Allows you to group the metrics by the operating system on which users performed intentional activities with your app. The operating system can be Windows, Mac, iOS, Android or other operating systems.
* **Area**: Allows you to group the metrics by the geographical location of the active usage.

   :::image type="content" source="../../assets/images/tdp/dev-analytics-filter.png" alt-text="Screenshot shows the analytics page filter in Developer Portal.":::

## App usage

After you select your desired filters, you can explore the following individual widgets:

* [Usage by time period](#usage-by-time-period)
* [Usage by platform and OS](#usage-by-platform-and-os)
* [Usage by retention state](#usage-by-retention-state)
* [Usage intensity](#usage-intensity)

### Usage by time period

The **Usage by time period** chart shows the number of active users or tenants who opened and used your app across different time periods.

:::image type="content" source="../../assets/images/tdp/usage-by-time-period.png" alt-text="Screenshot shows the usage by time period chart for your published app.":::

| Metric | Definition |
| :-----------------------| :------------------------------------------------------------------------------------------------------|
| **Monthly R30** | Each data point represents a given R30 (Rolling 30 days) period. |
| **Monthly R28** | Each data point represents a given R28 (Rolling 28 days) period. |
| **Weekly R7** | Each data point represents a given R7 (Rolling seven days) period. |
| **Daily** | Each data point represents a given R1 (Rolling one day) period. |

### Usage by platform and OS

The **Usage by platform and OS** chart shows your app's active usage across various endpoints, such as **Windows**, **Mac**, **iOS**, **Android**, and **Web**. The same user or tenant can use an app on multiple endpoints. Each data point represents a given R30 (Rolling 30 days) period.

:::image type="content" source="../../assets/images/tdp/usage-by-platform-OS.png" alt-text="Screenshot shows the usage by platform and OS chart for your published app.":::

### Usage by retention state

The **Usage by retention state** chart lets you track four key retention or churn metrics for your app over time.

:::image type="content" source="../../assets/images/tdp/usage-by-retention-state.png" alt-text="Screenshot shows the usage by retention state chart for your published app.":::

| Metric | Definition |
| :-----------------------| :------------------------------------------------------------------------------------------------------|
| New users or tenants | Active users or tenants who are new and haven't used your app. |
| Returning users or tenants | Active users or tenants who used your app during a given R30 (Rolling 30 days) time period and the immediately preceding R30 time period. |
| Resurrected users or tenants | Active users or tenants who used your app one or more times before but not in the immediately preceding R30 time period. |
| Lapsed users or tenants | Active users or tenants who weren't seen during a given R30 time period but were seen during the immediately preceding R30 time period. |

### Usage intensity

The **Usage intensity** chart shows the key usage intensity metrics for your app.

:::image type="content" source="../../assets/images/tdp/usage-intensity.png" alt-text="Screenshot shows the usage intensity chart for your published app.":::

| Metric | Definition |
| :-----------------------| :------------------------------------------------------------------------------------------------------|
| **Median days used per month** | The median number of days in which your app was opened in the last R30 (Rolling 30 days) time period. |
| **% of 5+ Days usage** | The percentage of active users who opened or used the app more than five days in the last R30 time period. |
| **DAU/MAU** | The ratio of the average number of unique users or tenants who used your app on each day divided by the Monthly active users for the selected R30 time period. |

### App dashboard

The **My App dashboard** table shows the latest R30 (Rolling 30 days) data for each of the metrics under the previous four categories, and the Month over Month change. Use the time picker on the upper right side and select the desired date to view the following:

* Daily R30 data for the last 75 days.
* End of month R30 data for up to 12 months.

You can select each of these **Metric name** to see trends over time.

   :::image type="content" source="../../assets/images/tdp/app-dashboard.png" alt-text="Screenshot shows the app dashboard chart for your published app in Developer Portal.":::

# [Third-party apps](#tab/thirdpartyapps)

To view app usage in Developer Portal, you need **Manager** or **Developer** role in Partner Center. The marketplace account owner or manager can [assign user roles and permissions](/partner-center/account-settings/user-roles).

You can view usage for your [third-party app](../../promote-app-adoption.md#access-to-your-apps) and other insights from the **Analytics** page. To access the page:

1. Go to **[Developer Portal](https://dev.teams.microsoft.com)**.
1. Select **Apps** from the left pane.
1. Select the required app from the **Apps** page.
1. Select **Analytics** under the **Overview** section.

To learn how to import your published app into Developer Portal, see [import an existing app](~/concepts/build-and-test/teams-developer-portal.md#import-an-existing-app).

| Metric | Definition |
| :-----------------------| :------------------------------------------------------------------------------------------------------|
| **Monthly R28 active users (MAU)** | The default usage metric. It shows the count of unique active users who used your app within that rolling 28 days window in UTC. |
| **Daily active users (DAU)** | It shows the count of unique active users who used your app in a given day in UTC. |
| **Weekly R7** | It shows the count of unique active users who used your app within that rolling seven days window in UTC. |

As you explore individual metrics on this page, you can use the **Filter** button to analyze your app's usage from the following filter options:

* **Aggregation type**: This filter allows you to group the metrics by a count of distinct users or a count of distinct tenants or customers.
* **Platform**
* **Operating system**
* **Area**

 :::image type="content" source="../../assets/images/tdp/filter-tdp-analytics.png" alt-text="Screenshot shows the app analytics page filter in Developer Portal." lightbox="../../assets/images/tdp/filter-tdp-analytics.png":::

> [!TIP]
> To know more about each metric definition, select **See metric definitions**. A pop-up help window appears on the right-side of the window with the required definitions.

As you explore the app usage metrics on this page, you can see the following three sections:

* [App usage](#app-usage)
* [Host product](#host-product)
* [App capability](#app-capability)

### App usage

 The **App usage** tab shows the following metrics:

* [Usage over time](#usage-by-time-period)
* [Usage by retention state](#usage-by-retention-state)
* [Usage by country or region](#usage-by-country-or-region)
* [Usage intensity](#usage-intensity)

   :::image type="content" source="../../assets/images/tdp/tdp-app-usage.png" alt-text="Screenshot shows the app usage chart of your published app in Developer Portal." lightbox="../../assets/images/tdp/tdp-app-usage.png":::

#### Usage over time

   The **Usage over time** chart shows the number of active users or tenants who opened and used your app across different time periods.

   :::image type="content" source="../../assets/images/tdp/tdp-usage-over-time.png" alt-text="Screenshot shows the app usage over time of your published app in Developer Portal.":::

   | Metric | Definition |
   | :-----------------------| :------------------------------------------------------------------------------------------------------|
   | **Monthly (MAU)** | Each data point represents a given R28 (Rolling 28 days) period. |
   | **Weekly (WAU)** | Each data point represents a given R7 (Rolling seven days) period. |
   | **Daily (DAU)** | Each data point represents a given R1 (Rolling one day) period. |

#### Usage by retention state

   The **Usage by retention state** chart lets you track four key retention or churn metrics for your app over time.

   :::image type="content" source="../../assets/images/tdp/tdp-retention.png" alt-text="Screenshot shows the app usage by retention state of your published app in Developer Portal.":::

   | Metric | Definition |
   | :-----------------------| :------------------------------------------------------------------------------------------------------|
   | New users or tenants | Active users or tenants who are new and haven't used your app. |
   | Returning users or tenants | Active users or tenants who used your app during a given R28 (Rolling 28 days) time period and the immediately preceding R28 time period. |
   | Resurrected users or tenants | Active users or tenants who used your app one or more times before but not in the immediately preceding R28 time period. |
   | Lapsed users or tenants | Active users or tenants who weren't seen during a given R28 time period but were seen during the immediately preceding R28 time period. |

#### Usage by country or region

   The **Usage by region** chart shows the various regions where your app is being used. You can select **View details** for more information on active users in different countries or regions.

   :::image type="content" source="../../assets/images/tdp/tdp-country.png" alt-text="Screenshot shows the app usage by country or region of your published app in Developer Portal." lightbox="../../assets/images/tdp/tdp-region.png":::

#### Usage intensity

   The **Usage intensity** chart shows the key usage intensity metrics for your app.

   :::image type="content" source="../../assets/images/tdp/tdp-usage-intensity.png" alt-text="Screenshot shows the app usage intensity of your published app in Developer Portal.":::

   | Metric | Definition |
   | :-----------------------| :------------------------------------------------------------------------------------------------------|
   | **Median days used per month** | The median number of days in which your app was opened in the last R28 (Rolling 28 days) time period. |
   | **% of 5+ Days usage** | The percentage of active users who opened or used the app more than five days in the last R28 time period. |
   | **DAU/MAU** | The ratio of the average number of unique users or tenants who used your app on each day divided by the Monthly active users for the selected R28 time period. |

#### My app dashboard

   The **My App Dashboard** table shows the latest R30 (Rolling 30 days) data for each of the metrics under the previous four categories, and the Month over Month change. Use the time picker on the upper left side and select the desired date to view the following:

* Daily R30 data for the last 75 days.
* End of month R30 data for up to 12 months.

   You can select each of these metric names to see trends over time.

   :::image type="content" source="../../assets/images/tdp/tdp-app-dashboard-view.png" alt-text="Screenshot shows the app capability usage of your published app in Developer Portal." lightbox="../../assets/images/tdp/tdp-app-dashboard-view.png":::

### Host product

   The **Host product** tab shows the following app usage analytics:

* [Usage by host product](#usage-by-host-product)
* [Usage by operating system](#usage-by-operating-system)
* [Usage by platform](#usage-by-platform)

   The Key Performance Indicator (KPI) cards display metrics such as the host with the most active users and the operating system (OS) with the most active users, based on monthly, weekly, and daily data, in a metric card format.

   :::image type="content" source="../../assets/images/tdp/tdp-host-product.png" alt-text="Screenshot shows the app usage in different host products of your published app in Developer Portal." lightbox="../../assets/images/tdp/tdp-host-product.png":::

#### Usage by host product

   The **Usage by host product** chart shows your app's active usage across various host products, including **Teams**, **Outlook**, and the **Microsoft 365 app** of monthly, weekly, and daily data.

   :::image type="content" source="../../assets/images/tdp/tdp-host-usage.png" alt-text="Screenshot shows the app usage in different host product of your published app in Developer Portal.":::

#### Usage by platform

   The **Usage by platform** chart shows your app's active usage across various platforms, such as **Desktop**, **Mobile**, and **Web** of monthly, weekly, and daily data.

   :::image type="content" source="../../assets/images/tdp/tdp-usage-platform.png" alt-text="Screenshot shows the app usage in different platforms of your published app in Developer Portal.":::

   > [!NOTE]
   > The `Preview` tag indicates that the metric **Usage by host product** is in its initial phase and might undergo modifications as we collect feedback and continue to improve the experience.

#### Usage by operating system

   The **Usage by operating system** chart shows your app's active usage across various operating systems, such as **Windows**, **Mac**, **iOS**, and **Android** of monthly, weekly, and daily data.

   :::image type="content" source="../../assets/images/tdp/tdp-operating-system.png" alt-text="Screenshot shows the app usage in different OS of your published app in Developer Portal.":::

### App capability

The **App capability** tab shows the usage of individual app capabilities that you've configured within your app. This page summarizes the overall usage of the following app capabilities in different host products.

* Bot
* Tab
* Message extension
* Personal app
* Connector
* Personal tab

:::image type="content" source="../../assets/images/tdp/tdp-app-capability.png" alt-text="Screenshot shows the app capability usage in different host products of your published app in Developer Portal." lightbox="../../assets/images/tdp/tdp-app-capability.png":::

   > [!NOTE]
   > The `Preview` tag indicates that the metric is in its initial phase and might undergo modifications as we collect feedback and continue to improve the experience.

---

### Known limitations

* The usage data for message extensions in Outlook and Outlook Add-in isn't available.
* The usage data of the Outlook personal tab includes both personal tab and tab (meeting scenario) data.
* The usage data for consumer apps isn't available.
* The usage data for Android in Outlook, which doesn't have a tenant ID, isn't available.

## See also

* [Teams Toolkit Overview](../../toolkit/teams-toolkit-fundamentals.md#quick-access-to-teams-developer-portal)
* [Include a SaaS offer with your Microsoft Teams app](~/concepts/deploy-and-publish/appsource/prepare/include-saas-offer.md)
