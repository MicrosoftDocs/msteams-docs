---
title: Plan for Government clouds
author: v-preethah
description: Understand Teams features and capabilities available for Government Community Cloud (GCC), GCC High, DOD, and Teams operated by 21Vianet tenants. Get an overview on how to deploy Teams in Government clouds.
ms.topic: conceptual
ms.localizationpriority: high
ms.date: 09/29/2023
---

# Plan for Government clouds

Microsoft Teams plays a key role to facilitate secure and efficient communication across various government sectors and agencies. Government entities handle sensitive and confidential data and there's a crucial need for cloud platforms that are secure and compliant. To meet the stringent security requirements, Microsoft offers the following specialized government cloud services:

:::row:::
   :::column:::
      :::image type="icon" source="../assets/images/app-fundamentals/gcc.png" link="/microsoftteams/plan-for-government-gcc" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="../assets/images/app-fundamentals/gcc-high.png" link="/microsoftteams/plan-for-government-gcc-high" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="../assets/images/app-fundamentals/dod.png" link="/microsoftteams/plan-for-government-dod" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="../assets/images/app-fundamentals/gallatin.png" link="/office365/servicedescriptions/office-365-platform-service-description/teams-operated-by-21vianet" border="false":::
   :::column-end:::
:::row-end:::

This article provides a comprehensive overview of Teams' compatibility across different Government cloud services, details the capabilities for each tenant, and provides guidance on deployment.

GCC, GCC High, and DOD are limited for use within Unites States and [Teams operated by 21Vianet](/officeupdates/teams-app-versioning) is specific to China.

## Teams app capabilities for Government clouds

Teams is compatible with all Microsoft 365 Government environments, but the capabilities and features vary by tenant. Some features available in commercial tenants might not be accessible in government tenants due to security and compliance restrictions, while other features take time to roll out. It’s important to have a clear understanding of the Teams apps and capabilities that are supported within government tenants to ensure they are utilized effectively.

The following table details the Teams apps and capabilities for GCC, GCC High, DOD, and Teams operated by 21Vianet:

| &nbsp; | GCC | GCC High | DOD | Teams operated by 21Vianet |
|-------------|---------|---|---|---|
| **Apps** | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Apps built by Microsoft | ✔️ | ✔️ | ✔️ | ✔️ |
| Third-party apps built by external developers | ✔️ | ❌ | ❌ | ❌ |
| Custom apps built for your org (LOB apps) distributed and used in specific organization | ✔️ | ✔️ | ✔️ | ✔️ |
| **App capabilities** | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Tabs | ✔️ | ✔️ | ✔️ | ✔️ |
| Bots and message extensions | ✔️ | ✔️ | ✔️ | ✔️ |
| Message actions | ✔️ | ✔️ | ✔️ | ❌ |
| Cards: Adaptive, Hero, Thumbnail, Microsoft 365 connector, Receipt, Sign in, and OAuth cards | ✔️ | ✔️ | ✔️ | ❌ |
| Dialogs | ✔️ | ✔️ | ✔️ | ✔️ |
| Link unfurling | ✔️ | ✔️ | ✔️ | ❌ |
| Meeting extensions | ✔️ | ✔️ | ✔️ | ❌ |
| Connectors and webhooks | ✔️ | ✔️ | ❌ | ❌ |
| Workflows| ✔️ | ❌ | ❌ | ❌ |
| **Experiences** | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Teams Store | ✔️ | ✔️ | ✔️ |  ✔️ |
| In-context Teams Store or app flyouts | ✔️ | ✔️ | ✔️ |  ✔️ |
| Manage apps in Teams | ✔️ | ✔️ | ✔️ |  ✔️ |
| Manage apps in Teams Admin Center | ✔️ | ✔️ | ✔️ |  ✔️ |
| Graph APIs | ✔️ | ✔️ | ✔️ |  ✔️ |
| Developer Portal for Teams | ✔️ | ❌ | ❌ |  ❌ |

For more information on Graph API, see [Graph API for Government clouds](/graph/teamwork-national-cloud-differences)

> [!NOTE]
>
> * Third-party apps are turned off by default for GCC and aren't available for GCC High, DOD, and Teams operated by 21Vianet. To turn on third-party apps for GCC, see [manage org-wide app settings for Microsoft 365 Government](/microsoftteams/manage-apps).
> * Only Incoming Webhooks are supported within GCC High.

### Plan to deploy Teams in government clouds

To deploy Teams in GCC, GCC High, or DOD, you must purchase a suitable [Microsoft 365 Government plan](https://products.office.com/government/compare-office-365-government-plans). US federal, state, local or tribal government entity, or other entities that handle data subject to government regulations can opt for a government cloud service license. For more information, see [Teams for Government](/microsoftteams/expand-teams-across-your-org/teams-for-government-landing-page).

To deploy Teams operated by 21Vianet, you must purchase a suitable [Office 365 plan](https://products.office.com/government/compare-office-365-government-plans) offered by 21Vianet version of Office 365 specific to China. For more information, see [Teams operated by 21Vianet](/office365/servicedescriptions/office-365-platform-service-description/teams-operated-by-21vianet).

### Compliance with third-party services

Here are few pointers to consider while connecting with third-party services from Government clouds:

| &nbsp; | Compliance check |
| --- | --- |
| ✔️ | Understand that by enabling third-party communication, the communication is processed through the third party and not Microsoft. |
| ✔️ | Be responsible to mitigate risks associated with connecting to third-party bots in their services. |
| ✔️ | Understand that enabling bots extend your system boundary beyond this tenant based on the bot you choose to use. You must ensure that the bot meets the compliance requirements including FedRAMP, DFARS, and ITAR. |
| ✔️ | Be responsible to evaluate the risk and compliance of any endpoint and URL that the users connect to. |
| ✔️ | Understand that Microsoft doesn't endorse and make no warranties concerning the security of third parties that the customer allows to connect with their service. |

## See also

* [Deployment overview](/microsoftteams/deploy-overview)
* [Plan for governance in Teams](/microsoftteams/plan-teams-governance)
* [Customer eligibility](/office365/servicedescriptions/office-365-platform-service-description/office-365-us-government/office-365-us-government)
* [Microsoft 365 Government how to buy](/office365/servicedescriptions/office-365-platform-service-description/office-365-us-government/microsoft-365-government-how-to-buy)
* [Manage org-wide app settings](/microsoftteams/manage-apps)
