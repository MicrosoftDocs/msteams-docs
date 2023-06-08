---
title: Plan code instrumentation using analytics service
author: heath-hamilton
description: Learn about planning code instrumentation using an analytics service.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: surbhigupta
---

# Plan code instrumentation using analytics service

<!--Implement your analytics service-->

Your application instrumentation can be captured and analyzed in any analytics service of your choice. It's recommended that you use an analytics service that allows tracking custom events and reporting it with custom context-based attributes.

[Azure Application Insights](/azure/azure-monitor/app/app-insights-overview), a feature of [Azure Monitor](/azure/azure-monitor/), helps in tracking and monitoring app instrumentation. It allows developers to instrument the app, track relevant metrics, and custom business events. You can track events in your Teams app across desktop, web, or mobile clients.

Azure Applications Insights does autoinstrumentation to automatically collect performance, error data, and HTTP requests without code changes. Note that the instrumentation described in the [previous section](strategize-measure.md) requires capturing custom events. It requires adding Application Insights SDK to your application code.

- Follow the guidance [here](/azure/azure-monitor/app/api-custom-events-metrics#prep) to add Application Insights SDK to your code.
- Use [TrackEvent](/azure/azure-monitor/app/usage-overview#custom-business-events) to instrument and track custom events important for your business and metrics mentioned in [overview](overview-analytics.md).
- The [retention workbook](/azure/azure-monitor/app/usage-retention) provides user retention analysis out of box. The workbook allows measuring retention by predefined custom events.
- [User Flows](/azure/azure-monitor/app/usage-flows) provides useful insight on how your users navigate through the app and can be used for tracking custom events as well.

## Telemetry as an investment

Collecting instrumentation data using the generated analytics is important for improving your app experience and guiding your roadmap. However, your investment in planning analytics and using instrumentation goes beyond the solution. It provides a window into your user’s mind and collects behavior patterns that can help you find the crucial product market fit.

Analyzing your solution usage and insights on features that your end users value enough to pay can help shape the long-term strategy for your organization and future solutions that you build.

## See also

- [Plan your app with Teams features](../app-fundamentals-overview.md)
- [Get started](../../get-started/get-started-overview.md)
- [Explore Teams platform features](../../overview-explore.md)
- [Get context for your tab](../../tabs/how-to/access-teams-context.md)
- [Get Teams specific context for your bot](../../bots/how-to/get-teams-context.md)
- [Build Message extensions](../../messaging-extensions/what-are-messaging-extensions.md)
- [Build Dialogs](../../task-modules-and-cards/what-are-task-modules.md)
- [Build Adaptive Cards](../../task-modules-and-cards/what-are-cards.md)
