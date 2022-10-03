---
title: Add analytics for my Teams app
author: heath-hamilton
description: Learn about adding analytics for my Teams app
ms.topic: conceptual
ms.localizationpriority: high
ms.author: surbhigupta
---

# Add analytics for my Teams app

Azure Application Insights, a feature of Azure Monitor helps in tracking and monitoring app telemetry. It allows developers to instrument the app, track relevant metrics, custom business events in your Teams app across desktop, web or mobile clients.

While Azure Applications Insights does auto-instrumentation to automatically collect performance, error data and HTTP requests without code changes, most of the telemetry described in the previous section require capturing custom events. This requires Application Insights SDK to your application code.

- Follow the guidance [here](/azure/azure-monitor/app/api-custom-events-metrics.md#prep) to add Application Insights SDK to your code
- Use TrackEvent to // TBA //

## Conclusion: Telemetry as an Investment

Collecting telemetry and watching the analytics that get generated from them is certainly important for improving an app and addressing customer needs. Beyond that, every app that you instrument for telemetry becomes a long-term investment for all of your app building efforts: your learnings from each app you create will greatly improve the quality of every subsequent app.

You’ll have an increasingly clear understanding of what users expect and what engages them best, and will be able to apply that understanding in each of your designs. Indeed, one reason why you might choose to release one or more free apps, and focus on building up a large user base for each one, is to acquire telemetry data that will then inform a more significant investment in an app you’d like to monetize.
