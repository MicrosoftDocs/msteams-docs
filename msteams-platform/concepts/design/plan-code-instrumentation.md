---
title: Plan code instrumentation using analytics service
author: heath-hamilton
description: Learn about planning code instrumentation using an analytics service.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: surbhigupta
ms.date: 11/28/2022
---

# Plan code instrumentation using analytics service

<!--Implement your analytics service-->

Capture and analyze your app instrumentation in any analytics service of your choice. We recommend that you use an analytics service that allows to track custom events and report them with custom context-based attributes.

[Azure Application Insights](/azure/azure-monitor/app/app-insights-overview), a feature of [Azure Monitor](/azure/azure-monitor/), helps to track and monitor app instrumentation. It allows you to instrument the app, track relevant metrics, and custom business events. You can track events in your Teams app across desktop, web, and mobile clients.

Azure Applications Insights performs auto-instrumentation to automatically collect performance, error data, and HTTP requests without code changes. The instrumentation described in the [Strategize and decide what to measure](strategize-measure.md) requires you to capture custom events. It requires adding Application Insights SDK to your application code.

- To add Application Insights SDK to your code, see [Application Insights API for custom events and metrics](/azure/azure-monitor/app/api-custom-events-metrics#prep).
- Use [TrackEvent](/azure/azure-monitor/app/usage-overview#custom-business-events) to instrument and track custom events important for your business and metrics mentioned in [overview](overview-analytics.md).
- The [retention workbook](/azure/azure-monitor/app/usage-retention) provides user retention analysis out of box. The workbook allows measuring retention by predefined custom events.
- [User Flows](/azure/azure-monitor/app/usage-flows) provides useful insight on how your users navigate through the app and can be used for tracking custom events as well.

## Telemetry as an investment

Collecting instrumentation data using generated analytics is important to improve your app experience and guide your app feature roadmap. However, your investment to plan analytics and use instrumentation goes beyond the solution. It provides a window into your user’s mind and collects behavior patterns that can help you find the crucial product market fit.

Analyzing your solution usage and insights on features that your app's users value enough to pay can help shape the long-term strategy for your organization and future solutions that you build.

## See also

- [Plan your app with Teams features](../app-fundamentals-overview.md)
- [Get started](../../get-started/get-started-overview.md)
- [Explore Teams platform features](../../overview-explore.md)
- [Get context for your tab](../../tabs/how-to/access-teams-context.md)
- [Get Teams specific context for your bot](../../bots/how-to/get-teams-context.md)