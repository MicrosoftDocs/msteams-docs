---
title: Government Clouds overview
author: v-preethah
description: Understand Teams features and availability for GCC, GCC-High, and DOD tenants.
ms.topic: conceptual
ms.localizationpriority: high
ms.date: 09/29/2023
---
# Government clouds

Government sectors or agencies handling sensitive and confidential data need cloud platforms that are secure and compliant to handle the data. Government clouds are cloud services that are specifically designed considering the high security and stringent compliance requirements to store and manage government data.

Considering the raising requirements, Microsoft has built three government cloud offerings (Government plans) based on security constraints and meet the requirements of the government sectors.

| GCC | GCC-High | DoD |
|---|---|---|
| Government Community Cloud | Government Community Cloud High | Department of Defense |
| GCC is a government-focused copy of the commercial environment. | GCC-High was created to meet the needs of DoD and Federal contractors. GCC-High is a copy of the DoD cloud but exists in its own sovereign environment. | DoD cloud is built for the Department of Defense only. DoD and Federal contractors must meet the stringent cybersecurity and compliance requirements. |
| Built to meet the compliance requirements of cloud services for FedRAMP High, Defense Federal Acquisition Regulations Supplement (DFARS), and requirements for criminal justice and federal tax information systems (CJI and FTI data types). | Built to meet the compliance requirements of cloud services for Department of Defense Security Requirements Guidelines, DFARS, and International Traffic in Arms Regulations (ITAR). | Same compliance requirements as GCC-High but only DoD entities certified with DoD SRG L5 can purchase. |
| Trials are available only for US Government entities. | Trials aren't available for GCC High. | Trials aren't available for DoD. |

These three clouds are available only in the United States and aligned with the requirements of the US public sector. Microsoft Teams platform service is extended to users of government clouds as part of Office 365 Government plans for US.

Let’s get to know about the different clouds and the Teams capabilities that are supported in each type of government cloud.

## Government clouds in Teams

All Microsoft 365 Government plans support Teams platform but the capabilities that are supported may differ for each government cloud.

Government tenant may not have all the Teams features that's available in a commercial tenant. Some are restricted based on security and compliance and other features take time to be rolled out in government clouds.

## Deploy Government clouds in Teams

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

| Feature | Reference |
|---------|---|
| Third-party apps | [Web apps](../samples/integrating-web-apps.md) <br> [Meeting app extensibility](../apps-in-teams-meetings/teams-apps-in-meetings.md) |
| Bots | [Build your first conversational bot for Teams](../get-started/first-app-bot.md) <br> [Designing your Teams bot](../bots/design/bots.md) <br> [Add bots to Microsoft Teams apps](../resources/bot-v3/bots-overview.md) <br> [Bots in Teams](../bots/what-are-bots.md) |
| Sideloading apps | [Enable your Teams app to be customized](../concepts/design/enable-app-customization.md) <br> [Distribute your Microsoft Teams app](../concepts/deploy-and-publish/apps-publish-overview.md) <br> [Upload your app in Teams](../concepts/deploy-and-publish/apps-upload.md) |
| Custom connectors | [Create connectors for Microsoft 365 Groups for Teams](../webhooks-and-connectors/how-to/connectors-creating.md) |
