---
title: Government Clouds overview
author: v-preethah
description: Understand Teams features and availability for GCC, GCC-High, and DOD tenants.
ms.topic: conceptual
ms.localizationpriority: high
ms.date: 09/29/2023
---
# Government clouds

Microsoft Teams plays a pivotal role in facilitating secure and efficient communication within government sectors and agencies. To cater to the stringent security and compliance requirements of these entities, Microsoft offers three specialized government cloud services: Government Community Cloud (GCC), GCC High (GCCH), and Department of Defense (DoD). These services, accessible via Microsoft 365 Government plans, are exclusively for use within the United States.

:::image type="content" source="../assets/images/app-fundamentals/GCC_overview.png" alt-text="Illustration shows the types of government clouds.":::

Government Community Cloud (GCC), GCC High (GCCH), and Department of Defense (DoD) are limited for use within Unites States. To use Microsoft Government clouds services, you can purchase Microsoft 365 [Government plans](https://products.office.com/government/compare-office-365-government-plans).

## Government clouds for Teams

 Microsoft Teams is compatible with all Microsoft 365 Government plans, but the capabilities and features vary depending on the cloud type. Certain Teams features available in a commercial tenant may not be accessible in a government tenant. Due to security and compliance considerations, some are restricted while other may take time to roll out in government cloud.

## Teams capabilities for Government clouds

Understanding the Teams apps and capabilities supported by each cloud is crucial for effective utilization of Teams within government clouds. Here's a brief overview of the Teams apps and capabilities for GCC, GCCH, and DoD:

To make effective use of Teams within government clouds for your organization, you must know about the Teams apps and capabilities that each government cloud supports.

The following table includes Teams apps supported for GCC, GCCH, and DoD:

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
| Tab app in shared channel | [Apps for shared channels](build-and-test/shared-channels.md) | Available in all three government clouds. |
| Bots | [Designing your Teams bot](../bots/design/bots.md) <br> [Add bots to Microsoft Teams apps](../resources/bot-v3/bots-overview.md) <br> [Bots in Teams](../bots/what-are-bots.md) | Bots are available in all three government clouds. |

## Plan to deploy Government clouds in Teams

To deploy Teams in a government cloud, you need to purchase a suitable Microsoft 365 subscription. US federal, state, local or tribal government entity, or other entities handling data subject to government regulations can opt for a cloud service license.

Here are the steps to plan for a government cloud service:

* Determine the need of Government cloud for your organization..
* Review the admin and security settings for the respective cloud tenant.
* Understand the capabilities available in the respective cloud tenant.
* Apply for the appropriate government cloud.
* Plan for governance in Teams.
  * Group and team creation naming, guest access, expiration, retention, and archiving.
  * Group and team membership management
  * Teams feature management
  * Security and compliance
* After successful purchase, strategize and deploy Teams for collaboration.
* Plan for deploying Teams for meetings and voice based on the purchased cloud platform.

To purchase required Microsoft 365 for US Government licenses:

* Submit a form for GCC or GCC-High to validate your organization’s eligibility. To know more about the eligibility, see buy Microsoft 365 Government plans.
* You must place an order only through the Microsoft account team or a qualified partner.

Considerations for [deploying Teams in Government cloud](/microsoftteams/expand-teams-across-your-org/teams-for-government-landing-page).

For more information on planning for deployment in each cloud environment, see the following resources:

* [Plan for Microsoft 365 Government - GCC](/microsoftteams/plan-for-government-gcc)
* [Plan for Office 365 Government - GCC High](/microsoftteams/plan-for-government-gcc-high)
* [Plan for Office 365 Government - DoD](/microsoftteams/plan-for-government-dod)

### Compliance UI

Here are few pointers to consider while connecting with third-party services from Government clouds:

* By enabling third-party communications, customers accept that such communication is being processed through the third party and not Microsoft.
* The customer is solely responsible for mitigating risks associated with connecting with third-party bots in their services.
* Enabling bots extend your system boundary beyond this tenant based on the bot you choose to use. It's your responsibility to ensure that meets your compliance requirements including FedRAMP, DFARS, ITAR, and so on.
* It's your responsibility to evaluate the risk and compliance of any endpoint and URL that you connect to.
* Microsoft doesn't endorse and makes no warranties, express, or implied concerning the security of third parties the customer allows to connect with their service.

## See also

[Deployment overview](/microsoftteams/deploy-overview)
