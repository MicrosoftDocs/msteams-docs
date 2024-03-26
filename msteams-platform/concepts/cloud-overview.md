---
title: Plan for Government clouds
author: v-preethah
description: Understand Teams features and capabilities available for Government Community Cloud (GCC), GCC High, and DOD tenants. Get an overview on how to deploy Teams in Government clouds.
ms.topic: conceptual
ms.localizationpriority: high
ms.date: 09/29/2023
---

# Plan for Government clouds

Microsoft Teams plays a key role to facilitate secure and efficient communication across various government sectors and agencies. These entities handle sensitive and confidential data and there's a crucial need for cloud platforms that are secure and compliant. To meet these stringent security requirements, Microsoft offers the following specialized government cloud services:

:::image type="content" source="../assets/images/app-fundamentals/cloud-type.png" alt-text="Illustration shows the types of government clouds." border="false":::

GCC, GCC High, and DOD are limited for use within Unites States and to access Microsoft Government clouds services, you can purchase [Microsoft 365 Government plans](https://products.office.com/government/compare-office-365-government-plans).

The document provides a comprehensive overview of Teams' compatibility within government cloud services, detailing the various capabilities of Teams for each government tenant. It also outlines how government entities can effectively deploy and use Teams within their organizations.

## Teams for Government clouds

 Teams is compatible with all Microsoft 365 Government environment, but the capabilities and features vary for each government tenant. Certain Teams features that are available in a commercial tenant might not be accessible in a government tenant. Due to security and compliance, some capabilities and features are restricted while others take time to roll out in a government tenant.

### Teams apps and capabilities for Government clouds

Understanding the Teams apps and capabilities supported by each government tenant is crucial for effective utilization of Teams within government tenants. The following table includes the Teams apps and their support for GCC, GCC High, and DOD:

| &nbsp; | GCC | GCC High | DOD |
|-------------|---------|---|---|
| **Apps** | &nbsp; | &nbsp; | &nbsp; |
| Apps built by Microsoft. | ✔️ | ✔️ | ✔️ |
| Apps built by internal Teams developers. | ✔️ | ✔️ | ✔️ |
| Third-party apps built by external developers. | ✔️ | ❌ | ❌ |
| Custom apps built for your org (LOB apps) distributed and used in specific tenant. | ✔️ | ✔️ | ✔️ |
| Personal apps | ✔️ | ✔️ | ✔️ |

> [!NOTE]
> Third-party apps are turned off by default for GCC and aren't available for GCC High and DOD.

The following table includes Teams app capabilities and their availability in GCC, GCC High, and DOD:

| &nbsp; | GCC | GCC High | DOD |
|-------------|---------|---|---|
| **Capabilities** | &nbsp; | &nbsp; | &nbsp; |
| Tabs | ✔️ | ✔️ | ✔️ |
| Bots and message extensions | ✔️ | ✔️ | ✔️ |
| Message actions | ✔️ | ✔️ | ✔️ |
| Cards: Adaptive, Hero, Thumbnail, Microsoft 365 connector, Receipt, Sign in, and OAuth cards | ✔️ | ✔️ | ✔️ |
| Dialogs | ✔️ | ✔️ | ✔️ |
| Link unfurling | ✔️ | ✔️ | ✔️ |
| Meeting extensions | ✔️ | ✔️ | ✔️ |
| Connectors and webhooks | ✔️ | ❌ | ❌ |
| Workflows| ✔️ | ❌ | ❌ |

The following table includes other Teams app capabilities and their availability in GCC, GCC High, and DOD:

| &nbsp; | GCC | GCC High | DOD |
|-------------|---------|---|---|
| **Other Capabilities** | &nbsp; | &nbsp; | &nbsp; |
| Teams Store 2.0 | ✔️ | ✔️ | ✔️ |
| In-context Teams Store or App flyouts | ✔️ | ✔️ | ✔️ |
| Manage apps in Teams | ✔️ | ✔️ | ✔️ |
| Manage apps in Teams Admin Center | ✔️ | ✔️ | ✔️ |
| Graph APIs | ✔️ | ✔️ | ✔️ |
| Teams Developer Portal | ✔️ | ❌ | ❌ |

### Plan to deploy Teams in Government clouds

To deploy Teams in a government cloud, you need to purchase a suitable Microsoft 365 Government subscription. US federal, state, local or tribal government entity, or other entities that handle data subject to government regulations can opt for a government cloud service license.

The following pointers provide the basic outline to plan for government cloud service and deploy Teams for collaboration:

* Determine the need of government cloud for your organization and if the eligibility requirements are met.
* Understand the capabilities available and disabled in the respective cloud tenant.
* Review the admin and security settings for the respective cloud tenant.
* Apply for the appropriate government cloud.
* Plan for the following governance in Teams:
  * Group and team creation, naming, guest access, expiration, retention, and archiving
  * Group and team membership management
  * Teams feature management
  * Security and compliance
* After successful purchase, strategize and deploy Teams for collaboration.
* Based on the cloud tenant, plan to deploy Teams for meetings and voice. For more information, see [deploy Teams in government cloud](/microsoftteams/expand-teams-across-your-org/teams-for-government-landing-page).

For more information on planning and deployment in each cloud environment, see:

* [Plan for Microsoft 365 Government - GCC](/microsoftteams/plan-for-government-gcc)
* [Plan for Microsoft 365 Government - GCC High](/microsoftteams/plan-for-government-gcc-high)
* [Plan for Microsoft 365 Government - DOD](/microsoftteams/plan-for-government-dod)

To purchase required Microsoft 365 Government licenses:

* Submit a form for GCC or GCC High to validate your organization’s eligibility. For more information on the eligibility, see [Microsoft 365 Government plans](https://www.microsoft.com/en-in/microsoft-365/enterprise/government-plans-and-pricing?rtc=1#heading-oc2835).
* You must place an order only through the Microsoft account team or a qualified partner.

### Compliance UI

Here are few pointers to consider while connecting with third-party services from Government clouds:

* The customers must understand that by enabling third-party communication, the communication is being processed through the third party and not Microsoft.
* The customer is solely responsible for mitigating risks associated with connecting to third-party bots in their services.
* Enabling bots extend your system boundary beyond this tenant based on the bot you choose to use. It's your responsibility to ensure that the bot meets your compliance requirements including FedRAMP, DFARS, and ITAR.
* It's your responsibility to evaluate the risk and compliance of any endpoint and URL that you connect to.
* Microsoft doesn't endorse and make no warranties concerning the security of third parties that the customer allows to connect with their service.

## See also

* [Deployment overview](/microsoftteams/deploy-overview)
* [Plan for governance in Teams](/microsoftteams/plan-teams-governance)
* [Customer eligibility](/office365/servicedescriptions/office-365-platform-service-description/office-365-us-government/office-365-us-government)
* [Microsoft 365 Government how to buy](/office365/servicedescriptions/office-365-platform-service-description/office-365-us-government/microsoft-365-government-how-to-buy)
