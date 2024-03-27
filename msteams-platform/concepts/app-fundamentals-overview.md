---
title: Plan your app overview
author: heath-hamilton
description: Understand use cases and Microsoft Teams app features, map use cases, and plan responsive tabs for mobile. Learn about Teams features, availability, and app supports for GCC, GCC-High, and DOD.
ms.topic: conceptual
ms.localizationpriority: high
ms.date: 03/20/2023
---

# Plan your app with Teams features

 Teams is a natively cross-platform social platform that sits at the heart of Microsoft 365 and offers a personal canvas for you to create apps. The design, features, and capabilities of a Teams app stem from identifying the right combination of features to meet your user's needs.

## Plan with Teams

Teams offers you tool kits, libraries, and apps at every stage of app development. Consider the following app building lifecycle:

:::image type="content" source="../assets/images/app-fundamentals/plan-app.png" alt-text="Diagram shows the steps in the app planning lifecycle.":::

* [Before you build](#before-you-build)
* [During build](#during-build)
* [Post-build](#post-build)
* [Planning checklist](../concepts/design/planning-checklist.md)

### Before you build

Understanding the user and their concerns is the first indicator of how a Teams app can help. Build your use case around the problem, determine how an app can solve it, and develop a solution.

* **Understand your use case**: Understand your user's requirement and you can identify the right features.

* **Map your use case**: Map common use cases to Teams feature based on requirements, such as share, collaborate, workflows, relevant social platforms, and more.

* **Plan analytics for your app**: Plan to analyze the analysis and instrumentation data against your business goals, take corrective action by fixing issues, intervene in the user journey, and plan further enhancements to your app.

* **Plan your app for Teams mobile**: Plan for common use case scenarios and extend your desktop and web app for Teams mobile.

### During build

* **Create and build app project**: With Teams, you can choose the build environment that best suits your app requirement. Use Teams Toolkit to build your app with C#, Blazor, Node.js, and more.

* **Design your app UI**: Use Teams UI Toolkit and UI Library to design your app's layout.

* **Use Teams capabilities**: Teams platform helps you build a single or a multi-capability app. Various integrated products and services support your Teams app to strengthen the app experience.

    :::image type="content" source="../assets/images/overview/teams-solution.png" alt-text="Diagram shows the conceptual representation of the Teams solution.":::

    Your apps appear on Teams as message extensions, tabs, bots, connectors and webhooks, or as multi-capability apps. These capabilities are powered at the backend by Azure, Microsoft Graph, SharePoint, and Power Apps that help automate tasks and processes.

* **Integrate device capabilities**: You can integrate the native device capabilities in your app, such as camera, QR or barcode scanner, photo gallery, microphone, and location.

* **Instrument code for analytics**: Instrument your Teams app code with analytics markers (also known as instrumentation markers) to measure both aggregate and user-specific metrics for your app.

### Post-build

* Integrate your app with Teams and other apps, such as Microsoft 365, Microsoft Graph, and more.
* Use Developer Portal to configure, manage, and deploy your app.

### Government Community Cloud

Apart from the commercial cloud that your Teams app resides on, there are three types of government clouds:

* **Government Community Cloud (GCC)**: The GCC cloud is a U.S. government focused copy of the commercial Teams cloud.
* **Department of Defense (DOD)**: The DOD cloud is built for the U.S. Department of Defense only.
* **Government Community Cloud - High (GCC-High)**: GCC-High is a copy of the DOD cloud that exists in its own sovereign environment.

The following table includes Teams features' availability for GCC, GCC-High, and DOD:

| &nbsp; | GCC | GCC-High | DOD |
|-------------|---------|---|---|
| **Apps** | &nbsp; | &nbsp; | &nbsp; |
| Microsoft apps | ✔️ Microsoft apps compliant with GCC. | ✔️ Microsoft apps compliant with GCC-High. | ✔️ Microsoft apps compliant with DOD. |
| Third-party apps | ✔️ Third-party apps are available. Disabled by default and tenant admin use their own discretion to enable it. | ❌ | ❌ |
| Custom apps built for your org (LOB apps)| ✔️ | ✔️ | ✔️ |
| Upload custom apps | ✔️ | ❌ | ❌ |
| **Capabilities** | &nbsp; | &nbsp; | &nbsp; |
| Message extensions | ✔️ | ✔️ | ✔️ |
| Tabs | ✔️ | ✔️ | ✔️ |
| Bots | ✔️ | ✔️ | ✔️ |
| Workflows | ✔️ | ❌ | ❌ |

**Compliance UI**: By enabling third-party communications, customers accept that such communication is being processed through the third party and not Microsoft. The customer is solely responsible for mitigating risks associated with connecting with third party bots in their services. Microsoft doesn't endorse and makes no warranties, express, or implied concerning the security of third parties the customer allows to connect with their service. Enabling bots extend your system boundary beyond this tenant based on the bot you choose to use. It is your responsibility to ensure that meets your compliance requirements including FedRAMP, DFARS, ITAR, and so on. It is your responsibility to evaluate the risk and compliance of any endpoint and URL that you connect to.

The following list helps to identify the availability of GCC, GCC-High, and DOD clouds for various Teams capabilities:

* For third-party apps, see [web apps](../samples/integrating-web-apps.md) and [meeting app extensibility](../apps-in-teams-meetings/teams-apps-in-meetings.md).
* For bots, see [build your first conversational bot for Teams](../sbs-teams-conversation-bot.yml), [designing your Teams bot](../bots/design/bots.md), [add bots to Microsoft Teams apps](../resources/bot-v3/bots-overview.md), and [bots in Teams](../bots/what-are-bots.md).
* For custom app upload, see [enable your Teams app to be customized](../concepts/design/enable-app-customization.md), [distribute your Microsoft Teams app](../concepts/deploy-and-publish/apps-publish-overview.md), and [Upload your app in Teams](../concepts/deploy-and-publish/apps-upload.md).
* For custom connectors, see [create connectors for Microsoft 365 Groups for Teams](../webhooks-and-connectors/how-to/connectors-creating.md).

## See also

* [Considerations for Teams integration](../samples/integrating-web-apps.md)
* [Plan responsive tabs for Teams mobile](design/plan-responsive-tabs-for-teams-mobile.md)
* [Device capabilities](device-capabilities/device-capabilities-overview.md)