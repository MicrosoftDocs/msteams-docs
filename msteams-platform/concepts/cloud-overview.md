---
title: Government Clouds overview
author: v-preethah
description: Understand Teams features and availability for GCC, GCC-High, and DOD tenants.
ms.topic: conceptual
ms.localizationpriority: high
ms.date: 09/29/2023
---
# Government clouds

Government sectors and agencies handling sensitive and confidential data need cloud platforms that are highly secure and compliant. Government clouds services are specifically built to meet the stringent government compliance and raising requirements.

Microsoft has built the following three government cloud services that are aligned with the requirements of United States government sectors and associated entities:

:::image type="content" source="../assets/images/app-fundamentals/GCC_overview.png" alt-text="Illustration shows the types of government clouds.":::

Government Community Cloud (GCC), GCC High (GCCH), and Department of Defense (DoD) are limited for use within Unites States. To use Microsoft Government clouds services, you can purchase Microsoft 365 [Government plans](https://products.office.com/government/compare-office-365-government-plans).

## Government clouds for Teams

 All Microsoft 365 Government plans support Microsoft Teams platform but the capabilities differ based on the cloud type. Also, government tenant might not have all the Teams features that are available in a commercial tenant. Based on security and compliance, some features are restricted while some features take time to get rolled out in government cloud.

## Teams capabilities for Government clouds

To make effective use of Teams within government clouds for your organization, you must know about the Teams apps and capabilities that each government cloud supports.

The following table includes Teams apps supported for GCC, GCCH, and DOD:

| &nbsp; | GCC | GCCH | DoD |
|-------------|---------|---|---|
| **Apps** | &nbsp; | &nbsp; | &nbsp; |
| Microsoft apps | ✔️ Microsoft apps compliant with GCC. | ✔️ Microsoft apps compliant with GCCH. | ✔️ Microsoft apps compliant with DoD. |
| 3P or third-party apps built by external developers. | ✔️ | ❌ | ❌ |
|Line-of-business apps are built, distributed, and used for specific tenant. | ✔️ | ✔️ | ✔️ |
|Sideloading apps | ✔️ | ❌ | ❌ |
|Personal apps | ✔️ | ✔️ | ✔️ |

The following table includes Teams capabilities and their availability for GCC, GCC-High, and DOD:

| &nbsp; | GCC | GCCH | DoD |
|-------------|---------|---|---|
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

The following list provides references about availability of GCC, GCC-High, and DOD for the features:

| App/Capability | Reference | Description |
|---------|---|
| Third-party apps | [Web apps](../samples/integrating-web-apps.md) <br> [Meeting app extensibility](../apps-in-teams-meetings/teams-apps-in-meetings.md) | Third-party apps are turned off by default for GCC and not available for GCC-High and DoD. <br> Third-party and LOB apps for meetings and calls are available only in GCC. |
| Sideloading apps | [Distribute your Microsoft Teams app](../concepts/deploy-and-publish/apps-publish-overview.md) <br> [Upload your app in Teams](../concepts/deploy-and-publish/apps-upload.md) | Sideloading apps are available only in GCC. |
| Tab app in shared channel | [Apps for shared channels](build-and-test/shared-channels.md) | Available in all three three government clouds. |
| Bots | [Designing your Teams bot](../bots/design/bots.md) <br> [Add bots to Microsoft Teams apps](../resources/bot-v3/bots-overview.md) <br> [Bots in Teams](../bots/what-are-bots.md) | Bots are available in all three government clouds. |

## Plan to deploy Government clouds in Teams

To access Government cloud, you need to purchase suitable government cloud M365 subscription. A US federal, state, local or tribal government entity, or other entities handling data subjected to government regulations and guidelines can purchase cloud service license.

The following pointers help you plan for government cloud service and understand the requirements for availing a cloud service: (Steps to plan)

* You must first determine whether Government cloud is required for your organization.
* Review and understand the admin and security settings for the respective cloud tenant.
* Understand the capabilities available in the respective cloud tenant.
* You must then apply for the suitable government cloud.
* Plan for Governance in Teams
  * Group and team creation naming, guest access, expiration, retention, and archiving.
  * Group and team membership management
  * Teams feature management
  * Security and compliance
* Upon successful purchase and planning, you can then deploy the Teams for collaboration
* You can then plan for deploying Teams for meetings and voice.

The following information helps you plan in detail for deployment in each cloud environment:

* [Plan for Microsoft 365 Government - GCC](/microsoftteams/plan-for-government-gcc)
* [Plan for Office 365 Government - GCC High](/microsoftteams/plan-for-government-gcc-high)
* [Plan for Office 365 Government - DoD](/microsoftteams/plan-for-government-dod)

To purchase required Microsoft 365 for US Government licenses:

* Submit a form for GCC or GCC-High to validate your organization’s eligibility. To know more about the eligibility, see buy Microsoft 365 Government plans.
* You must place an order only through the Microsoft account team or a qualified partner.

Considerations for [deploying Teams in Government cloud](/microsoftteams/expand-teams-across-your-org/teams-for-government-landing-page).

### Compliance UI

Here are few pointers to consider while connecting with third-party services from Government clouds:

* By enabling third-party communications, customers accept that such communication is being processed through the third party and not Microsoft.
* The customer is solely responsible for mitigating risks associated with connecting with third-party bots in their services.
* Enabling bots extend your system boundary beyond this tenant based on the bot you choose to use. It's your responsibility to ensure that meets your compliance requirements including FedRAMP, DFARS, ITAR, and so on.
* It's your responsibility to evaluate the risk and compliance of any endpoint and URL that you connect to.
* Microsoft doesn't endorse and makes no warranties, express, or implied concerning the security of third parties the customer allows to connect with their service.
