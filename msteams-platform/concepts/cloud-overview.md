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

The article provides an overview of Teams' compatibility across different government cloud services, detailing its capabilities for each tenant, and providing guidance on deployment.

| Teams in Government cloud | Teams operated by 21Vianet |
|---|---|
| GCC, GCC High, and DOD are limited for use within Unites States and to access Microsoft Government clouds services, you can purchase [Microsoft 365 Government plans](https://products.office.com/government/compare-office-365-government-plans). | [Teams operated by 21Vianet](/officeupdates/teams-app-versioning) cloud service is specific to China and you can purchase the suitable [Microsoft 365 plan](https://www.microsoft.com/zh-cn/microsoft-365/compare-china-global-versions-microsoft-365) to utilize the services offered within China. |

## Teams app capabilities for Government clouds

 Teams is compatible with all Microsoft 365 Government environment, but the capabilities and features vary by tenant. Some features available in commercial tenants may not be accessible in government tenant due to security and compliance restrictions, while others features take time to roll out. Understanding supported Teams apps and capabilities is crucial for effective utilization within government tenants.

The following table details the Teams apps and capabilities for GCC, GCC High, DOD, and Teams operated by 21Vianet:

| &nbsp; | GCC | GCC High | DOD | Teams operated by 21Vianet |
|-------------|---------|---|---|---|
| **Apps** | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Apps built by Microsoft. | ✔️ | ✔️ | ✔️ | ✔️ |
| Third-party apps built by external developers. | ✔️ | ❌ | ❌ | ❌ |
| Custom apps built for your org (LOB apps) distributed and used in specific organization. | ✔️ | ✔️ | ✔️ | ✔️ |
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

> [!NOTE]
> Third-party apps are turned off by default for GCC and aren't available for GCC High, DOD, and Gallatin. To turn on third-party apps for GCC, see [manage org-wide app settings for Microsoft 365 Government](/microsoftteams/manage-apps).
> Only Incoming Webhooks are supported in GCC High.

### Plan to deploy Teams in Government clouds

To deploy Teams in a government cloud, you need to purchase a suitable Microsoft 365 Government subscription. US federal, state, local or tribal government entity, or other entities that handle data subject to government regulations can opt for a government cloud service license.

To purchase required Microsoft 365 Government licenses:

* You must submit a form either for GCC or GCC High to validate your organization’s eligibility. For more information on the eligibility, see [Microsoft 365 Government plans](https://www.microsoft.com/en-in/microsoft-365/enterprise/government-plans-and-pricing?rtc=1#heading-oc2835).
* You must place an order only through the Microsoft account team or a qualified partner.

For more information, see [Teams for Government](/microsoftteams/expand-teams-across-your-org/teams-for-government-landing-page).

### Compliance with third-party services

Here are few pointers to consider while connecting with third-party services from Government clouds:

| &nbsp; | Check the following |
| --- | --- |
| ✔️ | The users must understand that by enabling third-party communication, the communication is being processed through the third party and not Microsoft. |
| ✔️ | The user is solely responsible for mitigating risks associated with connecting to third-party bots in their services. |
| ✔️ | Enabling bots extend your system boundary beyond this tenant based on the bot you choose to use. It's your responsibility to ensure that the bot meets the compliance requirements including FedRAMP, DFARS, and ITAR. |
| ✔️ | It's your responsibility to evaluate the risk and compliance of any endpoint and URL that you connect to. |
| ✔️ | Microsoft doesn't endorse and make no warranties concerning the security of third parties that the customer allows to connect with their service. |

## See also

* [Deployment overview](/microsoftteams/deploy-overview)
* [Plan for governance in Teams](/microsoftteams/plan-teams-governance)
* [Customer eligibility](/office365/servicedescriptions/office-365-platform-service-description/office-365-us-government/office-365-us-government)
* [Microsoft 365 Government how to buy](/office365/servicedescriptions/office-365-platform-service-description/office-365-us-government/microsoft-365-government-how-to-buy)
