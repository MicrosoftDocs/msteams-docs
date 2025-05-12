---
title: Plan your App - Overview
author: heath-hamilton
description: Learn how to plan your app with Microsoft Teams features, identify and map use cases, planning checklist, app deployment, and availability for government clouds.
ms.topic: conceptual
ms.localizationpriority: high
ms.date: 02/06/2025
---

# Plan your app with Teams features

Building an awesome Teams app is all about finding the right combination of features to meet your user's needs. The design, features, and capabilities of an app stem from this purpose.

Teams is a collaboration platform. It's also a social platform and is natively cross-platform that sits at the heart of Microsoft 365 and offers a personal canvas for you to create apps.

In this section, learn how to:

* Identify and map use cases to Teams features.
* Use planning checklist.
* Plan beyond app deployment.

## Plan with Teams

Teams as a platform offers you toolkits, libraries, and apps at every stage of app development. Let's break it down to app building lifecycle:

:::image type="content" source="../assets/images/app-fundamentals/plan-app.png" alt-text="Diagram shows the steps in the app planning lifecycle.":::

* [Before you build](#before-you-build)
* [During build](#during-build)
* [Post-build](#post-build)
* [Planning checklist](../concepts/design/planning-checklist.md)

### Before you build

Understanding the user and their concern are the first indicators of how a Teams app can help. Build your use case around the problem, determine how an app can solve it, and draw a solution.

* **Understand your use case and Teams app features**: Understand your user's requirement and you can identify the right features.

* **Map your use cases**: Map common use cases to Teams feature based on requirements, such as share, collaborate, workflows, relevant social platforms, and more.

* **Plan analytics for your Teams app**: Plan to analyze the analysis and instrumentation data against your business goals, take corrective action by fixing issues, and intervening in the user journey or plan further enhancements to your app.

* **Plan responsive tabs for Teams mobile**: It covers common scenarios and helps with planning apps for Teams mobile.

### During build

* **Create and build app project**: With Teams, you can choose the build environment that best suits your app requirement. Use Microsoft 365 Agents Toolkit (previously known as Teams Toolkit) or other SDKs, such as C#, Blazor, Node.js, and more to get started.

* **Design your app UI**: Use Teams UI Toolkit and Fluent UI React components to design your app's layout.

* **Use Teams as a platform**: Teams platform helps you build a single- or multi-capability app. Your Teams app is supported by the integrated products and services that strengthen the app experience.

    :::image type="content" source="../assets/images/overview/teams-solution.png" alt-text="Diagram that shows the conceptual representation of the Teams solution.":::

    Your apps appear on Teams as Tabs, Bots, Messaging Extensions, Connectors and Webhooks, or as a multi-capability app. These capabilities are powered at the backend by Azure, Microsoft Graph, SharePoint, and Power apps that help automate tasks and processes.

    Together, these capabilities bring your app solution to life.

* **Integrate device capabilities**: You can integrate the native device capabilities in your app, such as camera, QR or barcode scanner, photo gallery, microphone, and location.

* **Instrument code for analytics**: Instrument your Teams app code with analytics markers (also known as instrumentation markers) to measure both aggregate and user-specific metrics for your app when app users use it.

### Post-build

* Integrate your app with Teams and other apps, such as Microsoft 365, Microsoft Graph, and more.
* Use Developer Portal to configure, manage, and deploy your app.

### Plan for government and sovereign clouds

If you're planning to extend Teams app in a government cloud platform, it's essential to understand the capabilities of each government tenant and plan for purchase and deployment. To extend your Teams app in government cloud platforms, see plan for [government clouds](cloud-overview.md) and [sovereign cloud](sovereign-cloud.md).

## Next step

> [!div class="nextstepaction"]
> [Use cases and Teams features](design/understand-use-cases.md)

## See also

* [Get started](../get-started/get-started-overview.md)
* [Considerations for Teams integration](../samples/integrating-web-apps.md)
* [Device capabilities](device-capabilities/device-capabilities-overview.md)
* [Authenticate users in Microsoft Teams](authentication/authentication.md)
