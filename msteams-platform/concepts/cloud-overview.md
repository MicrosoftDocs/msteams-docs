---
title: Government Clouds overview
author: v-preethah
description: Understand Teams features and availability for GCC, GCC-High, and DOD tenants.
ms.topic: conceptual
ms.localizationpriority: high
ms.date: 09/29/2023
---
# Government clouds

Microsoft Teams plays a pivotal role in facilitating secure and efficient communication within government sectors and agencies. To meet the stringent security and compliance requirements of these entities, Microsoft offers three specialized government cloud services:

:::image type="content" source="../assets/images/app-fundamentals/cloud-type.png" alt-text="Illustration shows the types of government clouds.":::

GCC, GCC High (GCCH), and DoD are limited for use within Unites States. To use Microsoft Government clouds services, you can purchase Microsoft 365 [Government plans](https://products.office.com/government/compare-office-365-government-plans).

## Government clouds for Teams

 Microsoft Teams is compatible with all Microsoft 365 Government plans, but the capabilities and features vary for each cloud type. Certain Teams features that are available in a commercial tenant may not be accessible in a government tenant. Due to security and compliance considerations, some are restricted while other may take time to roll out in government cloud.

### Teams capabilities for Government clouds

Understanding the Teams apps and capabilities supported by each cloud is crucial for effective utilization of Teams within government clouds. The following table includes Teams apps supported for GCC, GCCH, and DoD:

| &nbsp; | GCC | GCCH | DoD |
|-------------|---------|---|---|
| **Apps** | &nbsp; | &nbsp; | &nbsp; |
| 1P apps built by Teams Engineering | ✔️ | ✔️ | ✔️ |
| 2P apps built by internal Teams developers. | ✔️ | ✔️ | ✔️ |
| 3P apps built by external developers. | ✔️ | ❌ | ❌ |
| Custom app built for your org (LOB app) distributed and used in specific tenant. | ✔️ | ✔️ | ✔️ |

The following table includes Teams capabilities and their availability for GCC, GCCH, and DoD:

| &nbsp; | GCC | GCCH | DoD |
|-------------|---------|---|---|
| **Capabilities** | &nbsp; | &nbsp; | &nbsp; |
| Tabs | ✔️ | ✔️ | ✔️ |
| Bots and Message extensions | ✔️ | ✔️ | ✔️ |
| Message actions | ✔️ | ✔️ | ✔️ |
| Cards: Adaptive, Hero, Thumbnail, O365 connector, Receipt, Sign in, and OAuth cards. | ✔️ | ✔️ | ✔️ |
| Task modules | ✔️ | ✔️ | ✔️ |
| Link unfurling | ✔️ | ✔️ | ✔️ |
| Meetings extensibility | ✔️ | ✔️ | ✔️ |
| Connectors and webhooks | ✔️ | ❌ | ❌ |
| Workflows| ✔️ | ❌ | ❌ |
| MetaOS tab| ❌ | ❌ | ❌ |
| App Store 1.0 | ❌ | ❌ | ❌ |
| App Store 2.0 | ✔️ | ✔️ | ✔️ |
| In-context ap  stores or app flyouts | ✔️ | ✔️ | ✔️ |
| Manage apps in Teams | ✔️ | ✔️ | ✔️ |
| Teams Admin Center | ✔️ | ✔️ | ✔️ |
| Graph APIs | ✔️ | ✔️ | ✔️ |
| Teams Developer Portal | ✔️ | ❌ | ❌ |

Third-party apps are turned off by default for GCC and not available for GCCH and DoD.

### Plan to deploy Government clouds in Teams

To deploy Teams in a government cloud, you need to purchase a suitable Microsoft 365 subscription. US federal, state, local or tribal government entity, or other entities handling data subject to government regulations can opt for a cloud service license.

Here are the steps to plan for a government cloud service:

* Determine the need of Government cloud for your organization.
* Review the admin and security settings for the respective cloud tenant.
* Understand the capabilities available in the respective cloud tenant.
* Apply for the appropriate government cloud.
* Plan for governance in Teams.
  * Group and team creation naming, guest access, expiration, retention, and archiving
  * Group and team membership management
  * Teams feature management
  * Security and compliance
* After successful purchase, strategize and deploy Teams for collaboration.
* Plan for deploying Teams for meetings and voice based on the purchased cloud platform.

To purchase required Microsoft 365 for US Government licenses:

* Submit a form for GCC or GCCH to validate your organization’s eligibility. To know more about the eligibility, see buy [Microsoft 365 Government plans](https://www.microsoft.com/en-in/microsoft-365/enterprise/government-plans-and-pricing?rtc=1#heading-oc2835).
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
