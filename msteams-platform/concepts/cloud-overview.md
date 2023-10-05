---
title: Government Clouds overview
author: v-preethah
description: Understand Teams features and availability for GCC, GCC-High, and DOD tenants.
ms.topic: conceptual
ms.localizationpriority: high
ms.date: 09/29/2023
---
# Government clouds

Cloud services that are specifically designed considering the high security and stringent compliance requirements to store and manage government data are Government clouds. Microsoft Teams platform service is extended to users of government clouds as part of Office 365 Government plans.

Let’s get to know about the different clouds and the Teams capabilities that are supported in each type of government cloud.

## GCC, GCC-High, DoD

Government Community Cloud ([GCC](../get-started/glossary.md)) is a government focused copy of the commercial environment. Department of Defense (DOD) and Federal contractors must meet the stringent cybersecurity and compliance requirements. For this purpose, GCC-High was created to meet the needs of DOD and Federal contractors. GCC-High is a copy of the DOD cloud but exists in its own sovereign environment. The DOD cloud is built for the Department of Defense only.

## Government clouds in Teams

Solutions built for government resources are more secure and compliant that of a commercial. Government plans are designed for the unique needs of government organizations. They provide all the features and capabilities of Microsoft 365 services in a segmented government cloud community that enables organizations to meet U.S. compliance and security standards.

There are four plans available and all supports Teams platform, but the capabilities that are supported may differ for each government cloud.

Government tenant may not have all the Teams features that's available in a commercial tenant. Some are restricted based on security and compliance and other features take time to be rolled out in government clouds.

## Teams usage within Government clouds

Considerations for [deploying Teams in Government cloud](/microsoftteams/expand-teams-across-your-org/teams-for-government-landing-page).

## Teams capabilities for Government clouds

The following table includes Teams features and availability for GCC, GCC-High, and DOD:

| &nbsp; | GCC | GCC-High | DOD |
|-------------|---------|---|---|
| **Apps** | &nbsp; | &nbsp; | &nbsp; |
| Microsoft apps | ✔️ Microsoft apps compliant with GCC. | ✔️ Microsoft apps compliant with GCC-High. | ✔️ Microsoft apps compliant with DOD. |
| 3P or third-party apps built by external developers. | ✔️ | ❌ | ❌ |
|Line-of-business apps are built, distributed, and used for specific tenant. | ✔️ | ✔️ | ✔️ |
|Sideloading apps | ✔️ | ❌ | ❌ |
|Personal apps | ✔️ | ✔️ | ✔️ |
| **Capabilities** | &nbsp; | &nbsp; | &nbsp; |
| Tabs | ✔️ | ✔️ | ✔️ |
| Bots and Message extensions | ✔️ | ✔️ | ✔️ |
| Message actions | ✔️ | Partially available | Partially available |
| Cards: Adaptive, Hero, Thumbnail, O365 connector, Receipt, Sign in, and OAuth cards. | ✔️ | Partially available | Partially available |
| Task modules | ✔️ | ❌ | ❌ |
| Link unfurling | ❌ | ❌ | ❌ |
| Meetings extensibility | ✔️ | ❌ | ❌ |
| Connectors and webhooks | ✔️ | Coming soon | ❌ |
| Workflows| ✔️ | ❌ | ❌ |
| Teams store | ✔️ | ✔️ | ✔️ |
| In-context stores or flyouts | ❌ | ❌ | ❌ |
| Manage your apps page | ✔️ | ❌ | ❌ |
| Teams Admin Center | ✔️ | ❌ | ❌ |
| Graph | ✔️ | ✔️ | ✔️ |
| Teams Developer Portal | Partially available | ❌ | ❌ |

### Compliance UI

By enabling third-party communications, customers accept that such communication is being processed through the third party and not Microsoft. The customer is solely responsible for mitigating risks associated with connecting with third party bots in their services. Microsoft doesn't endorse and makes no warranties, express, or implied concerning the security of third parties the customer allows to connect with their service. Enabling bots extend your system boundary beyond this tenant based on the bot you choose to use. It is your responsibility to ensure that meets your compliance requirements including FedRAMP, DFARS, ITAR, and so on. It is your responsibility to evaluate the risk and compliance of any endpoint and URL that you connect to.

The following list provides references about availability of GCC, GCC-High, and DOD for the features:

| &nbsp; | Feature | Reference |
|-------------|---------|---|
| &nbsp; | Third-party apps | [Web apps](../samples/integrating-web-apps.md) <br> [Meeting app extensibility](../apps-in-teams-meetings/teams-apps-in-meetings.md) |
| &nbsp; | Bots | [Build your first conversational bot for Teams](../get-started/first-app-bot.md) <br> [Designing your Teams bot](../bots/design/bots.md) <br> [Add bots to Microsoft Teams apps](../resources/bot-v3/bots-overview.md) <br> [Bots in Teams](../bots/what-are-bots.md) |
| &nbsp; | Sideloading apps | [Enable your Teams app to be customized](../concepts/design/enable-app-customization.md) <br> [Distribute your Microsoft Teams app](../concepts/deploy-and-publish/apps-publish-overview.md) <br> [Upload your app in Teams](../concepts/deploy-and-publish/apps-upload.md) |
| &nbsp; | Custom connectors | [Create connectors for Microsoft 365 Groups for Teams](../webhooks-and-connectors/how-to/connectors-creating.md) |
