---
title: Azure Application Insights
author: heath-hamilton
description: Learn about adding insights for my Teams app in Azure AD
ms.topic: conceptual
ms.localizationpriority: high
ms.author: surbhigupta
---

# Azure Application Insights

Your Application telemetry can be captured and analyzed in any telemetry service of your choice. It is recommended to choose a telemetry service that allows tracking of custom events and reporting it with custom context based attributes.

[Azure Application Insights](/azure/azure-monitor/app/app-insights-overview), a feature of [Azure Monitor](/azure/azure-monitor/) helps in tracking and monitoring app telemetry. It allows developers to instrument the app, track relevant metrics, custom business events in your Teams app across desktop, web, or mobile clients.

While Azure Applications Insights does auto-instrumentation to automatically collect performance, error data, and HTTP requests without code changes, most of the telemetry described in the previous section requires capturing custom events. This requires Application Insights SDK to your application code.

- Follow the guidance [here](/azure/azure-monitor/app/api-custom-events-metrics.md#prep) to add Application Insights SDK to your code.
- Use [TrackEvent](/azure/azure-monitor/app/usage-overview.md#custom-business-events) to instrument and track custom events important for your business and metrics mentioned above.
- The [retention workbook](/azure/azure-monitor/app/usage-retention) provides user retention analysis out of box. The workbook allows measuring retention by pre-defined custom events.
- [User Flows](/azure/azure-monitor/app/usage-flows) provides useful insight on how your users navigate through the app and can be used for tracking custom events as well.

## Telemetry as an Investment

While collecting telemetry, using the generated analytics is important for improving your app experience, guiding your roadmap, the investment goes beyond the solution. This investment provides a window into your user’s mind, collecting behavior patterns that can help you find the crucial product market fit.

Analyzing your solution usage, insights on features that your end users value enough to pay can help shape the long-term strategy for your organization and future solutions that you build.
