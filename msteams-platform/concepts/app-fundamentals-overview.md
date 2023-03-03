---
title: Plan your app overview
author: heath-hamilton
description: Understand use case and Microsoft Teams app features, map use cases, plan responsive tabs for mobile. Learn Teams features and availability for GCC, GCC-High, and DOD.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: lajanuar
---

# Plan your app with Teams features

Building an awesome Teams app is all about finding the right combination of features to meet your user's needs. The design, features, and capabilities of an app stem from this purpose.

At its heart, Teams is a collaboration platform. It's also a social platform and is natively cross-platform that sits at the heart of Microsoft 365 and offers a personal canvas for you to create apps.

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

* **Understand your use case and Teams App Features**: Understand your user's requirement and you can identify the right features.

* **Map your use cases**: Map common use cases to Teams features based on requirements, such as sharing, collaborating, workflows, relevant social platforms, and more.

* **Plan analytics for your Teams app**: Plan to analyze the analysis and instrumentation data against your business goals, take corrective action by fixing issues, and intervening in the user journey or plan further enhancements to your app.

* **Plan responsive tabs for Teams mobile**: It covers common scenarios and helps with planning apps for Teams mobile.

### During build

* **Create and build app project**: With Teams, you can choose the build environment that best suits your app requirement. Use Teams Toolkit or other SDKs, such as C#, Blazor, Node.js, and more to get started.

* **Design your app UI**: Use Teams UI Toolkit and UI Library to design your app's layout.

* **Use Teams as a platform**: Teams platform helps you build a single- or multi-capability app. Your Teams app is supported by the integrated products and services that strengthen the app experience.

    :::image type="content" source="../assets/images/overview/teams-solution.png" alt-text="Diagram that shows the conceptual representation of the Teams solution.":::

    Your apps appear on Teams as Tabs, Bots, Messaging Extensions, Connectors and Webhooks, or as a multi-capability app. These capabilities are powered at the backend by Azure, Microsoft Graph, SharePoint, and Power apps that help automate tasks and processes.

    Together, these capabilities bring your app solution to life.

* **Integrate device capabilities**: You can integrate the native device capabilities in your app, such as camera, QR or barcode scanner, photo gallery, microphone, and location.

* **Instrument code for analytics**: Instrument your Teams app code with analytics markers (also known as instrumentation markers) to measure both aggregate and user-specific metrics for your app when app users use it.

### Post-build

* Integrate your app with Teams and other apps, such as Microsoft 365, Microsoft Graph, and more.
* Use Developer Portal to configure, manage, and deploy your app.

### Government Community Cloud

Government Community Cloud (GCC) is a government focused copy of the commercial environment. Department of Defense (DOD) and Federal contractors must meet the stringent cybersecurity and compliance requirements. For this purpose, GCC-High was created to meet the needs of DOD and Federal contractors. GCC-High is a copy of the DOD cloud but exists in its own sovereign environment. The DOD cloud is built for the Department of Defense only.

The following table includes Teams features and availability for GCC, GCC-High, and DOD:

| Features   | GCC | GCC-High | DOD |
|-------------|---------|---|---|
| Teams owned apps as in internally developed apps | ✔️ App is enabled if it has GCC. | ✔️ App is enabled if it has GCC-High. | ✔️ App is enabled if it has DOD. |
| Microsoft apps | ✔️ Microsoft apps compliant with GCC. | ✔️ Microsoft apps compliant with GCC-High. | ✔️ Microsoft apps compliant with DOD. |
| 3P or third-party apps | ✔️ Third-party apps are available. Disabled by default and tenant admin use their own discretion to enable it. | ❌ | ❌ |
| Bots | ✔️ | ✔️ | ❌ |
| Custom or Lob tab apps |  ✔️ | ✔️ | ✔️ |
| Sideloading apps | ✔️ | ❌ | ❌ |
| Custom or Lob bots | ✔️ | ✔️ | ❌ |
| Custom message extensions | ✔️ | ✔️ | ❌ |
| Custom connectors | ✔️ | ❌ | ❌ |

**Compliance UI**: By enabling third-party communications, customers accept that such communication is being processed through the third party and not Microsoft. The customer is solely responsible for mitigating risks associated with connecting with third party bots in their services. Microsoft doesn't endorse and makes no warranties, express, or implied concerning the security of third parties the customer allows to connect with their service. Enabling bots will extend your system boundary beyond this tenant based on the bot you choose to leverage. It is your responsibility to ensure that this meets your compliance requirements including FedRAMP, DFARS, ITAR, and so on. It is your responsibility to evaluate the risk and compliance of any endpoint and URL that you connect to.

The following list helps to identify the availability of GCC, GCC-High, and DOD for the features:

* For third-party apps, see [web apps](../samples/integrating-web-apps.md) and [meeting app extensibility](../apps-in-teams-meetings/teams-apps-in-meetings.md).
* For bots, see [build your first conversational bot for Teams](../get-started/first-app-bot.md), [designing your Teams bot](../bots/design/bots.md), [add bots to Microsoft Teams apps](../resources/bot-v3/bots-overview.md), and [bots in Teams](../bots/what-are-bots.md).
* For sideloading apps, see [enable your Teams app to be customized](../concepts/design/enable-app-customization.md), [distribute your Microsoft Teams app](../concepts/deploy-and-publish/apps-publish-overview.md), and [Upload your app in Teams](../concepts/deploy-and-publish/apps-upload.md).
* For custom connectors, see [create connectors for Microsoft 365 Groups for Teams](../webhooks-and-connectors/how-to/connectors-creating.md).

</details>

## Next step

> [!div class="nextstepaction"]
> [Use cases and Teams features](design/understand-use-cases.md)

## See also

* [Get started](../get-started/get-started-overview.md)
* [Planning checklist](../concepts/design/planning-checklist.md)
* [Considerations for Teams integration](../samples/integrating-web-apps.md)
* [Plan responsive tabs for Teams mobile](design/plan-responsive-tabs-for-teams-mobile.md)
* [Device capabilities](device-capabilities/device-capabilities-overview.md)
* [Authenticate users in Microsoft Teams](authentication/authentication.md)
