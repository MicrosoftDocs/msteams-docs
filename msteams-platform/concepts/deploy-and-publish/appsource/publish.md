---
title: Understanding the Teams store submission process
description: Describes the approval submission process for getting your app published to the Microsoft Teams app store
ms.topic: overview
keywords: teams publish store office publishing publish AppSource partner center account verification apps account not publish eligible app submission
---
# Submit your app to AppSource

## Teams app submission

Make your app available in the Microsoft Teams app catalog and on the web by publishing it to [AppSource](https://appsource.microsoft.com). At a high level, the process for submitting your app to AppSource is as follows:

1. Develop your app by following the [design guidelines](~/concepts/design/understand-use-cases.md). Tabs must follow the tab design guidelines for both, [desktop and web](~/tabs/design/tabs.md) and [mobile](~/tabs/design/tabs-mobile.md). Bots must follow the [bot design guidelines](~/bots/design/bots.md).
1. Ensure your app meets the app [validation policies](/legal/marketplace/certification-policies) for Microsoft Teams. 
1. Test your app with the [Manifest validation tool](prepare/submission-checklist.md#teams-app-validation-tool).
1. Set up a [developer account](/office/dev/store/open-a-developer-account) in [Partner Center](https://support.microsoft.com/help/4499930/partner-center-overview). *See also* [How do I create a Partner Center account](#how-do-i-create-a-partner-center-account) in the FAQ section.
1. Prepare your app for submission by following the [submission checklist](prepare/submission-checklist.md).
1. Review the [most failed test cases for a quicker app quality approval](prepare/frequently-failed-cases.md).
1. Submit your package to [AppSource through Partner Center](/office/dev/store/use-partner-center-to-submit-to-appsource).
1. Track the approval process on your Partner Center dashboard. *See* [Partner Center Overview](https://support.microsoft.com/help/4499930/partner-center-overview).
1. After submission, review the guidance for [Maintaining and supporting your published app](post-publish/overview.md).

>[!NOTE]
>
>- Your Teams app must be mobile-responsive and comply with [no upsell requirements](~/concepts/deploy-and-publish/appsource/prepare/frequently-failed-cases.md) on mobile OS (iOS and Android).
>- If your Teams app contains a bot, you must comply with the Bot Developer Framework [Code of Conduct](https://aka.ms/bf-conduct).
>- If your app contains an Office 365 Connector, additional terms may apply. See [Connectors Developer Dashboard](https://aka.ms/connectorsdashboard) and [App Developer Agreement](https://sellerdashboard.microsoft.com/Assets/Content/Agreements/Office_Store_Seller_Agreement_20120927.htm).
>- To make your app available for Government Community Cloud (GCC) users and to avoid duplicate app listings in the store, the auth process or flow must identify and route the user to the specified or expected content URL for GCC users.
