---
title: Best Practices for Teams Mobile Apps
author: surbhigupta
ms.author: surbhigupta
description: Learn about the best practices to optimize your tab app on Teams mobile such as using service workers and minimizing web page size with performance audits.
ms.localizationpriority: high
ms.topic: conceptual
ms.date: 03/18/2025
---

# Best practices for Teams mobile apps

If you want to increase the adoption of your Teams tab app on mobile devices, you must ensure a fast and responsive web experience on the Teams Android and iOS clients. Mobile devices have limited processing power, network connectivity, and battery power compared to desktops and laptops. This article outlines the best practices to optimize your Teams tab's web pages for the Teams mobile client.

## Use service workers to cache static assets

* Cache static assets such as HTML, CSS, JavaScript, and images to reduce network dependency.
* Use the stale-while-revalidate strategy to serve cached content quickly while fetching updated data in the background. You can also use this strategy to cache API responses that don't change frequently, such as configuration data.
* Avoid caching large assets to prevent unnecessary storage consumption on mobile devices.

### Sample Code

Check this [sample app](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-support-offline/nodejs) that makes use of a service worker to cache data and provide offline functionality.

## Minimize web page size

Mobile devices rely on mobile data networks that can be slow and unstable resulting in high latency, particularly in areas with weak signal strength. Hence, reducing the overall app package size and optimizing data transfers is critical. To reduce the page size, gather key performance metrics by running a performance audit using the **Performance** tab or Lighthouse. This helps identify bottlenecks and areas for improvement.

### Run a performance audit

You can gather key performance metrics of the web page by running a set of performance and instrumentation tests using Developer Tools. This helps identify bottlenecks and areas for improvement in your app. We recommended the following tests to gather performance insights on the page:

1. Enable dev tools as described here: <https://learn.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/developer-tools>

1. Select **Inspect** on the web page. This opens the Developer tools from where the Lighthouse or Performance Tab can be used from here.

1. The performance tab one can See the performance marker indicating the amount of time the app took from Teams JS SDK initialization to call to `notifySuccess`. This marker can be used to examine the network or local operation done between `init()` and `notifySuccss`. In the following example, the **Timings** section shows that it took 2.20 seconds from JS SDK initialization to `notifySuccess`, and the app made two calls to get the authorization token and an API call that took 1.5 seconds.

1. Lighthouse also provides meaningful insights into the app size and performance metrics.

1. Analyze page load time for mobile devices in LightHouse.
  
    1. Various diagnostics gets shown for the page along with a set of actionable insights. Aim to reduce the latencies flagged in this report.

1. Unused resources in the page size without providing any value. The Coverage tool allows one to see actual size and usage percentage of the resources on page.

    1. Enable Code Coverage from Tools:

    1. Start instrumentation of the code.

## See also

* [Build tabs for Teams](../tabs/what-are-tabs.md)
* [Create a tab](../tabs/how-to/create-personal-tab.md)
