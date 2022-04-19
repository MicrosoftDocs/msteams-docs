---
title: First party license management enabled in Microsoft Teams
description: Learn how to enable customers to easily assign, use, and track SaaS licenses purchased in Teams storefront with first party license management.
author: v-dreddipogu
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high
---

# First party license management enabled in Teams for third-party SaaS offers

The Microsoft Teams Third-party app license management provides the flexibility for customers to assign, use, and track SaaS licenses purchased from Team Storefront. This article details on the critical task of license management – the ability to authorize specific users to use a particular ISV application for the paid duration. With 1st party license management of third party SaaS offers in the Teams surface area, the license management happens post-purchase of the said app (the associated SaaS offer) via Teams surface areas or AppSource. The app is unusable if the licenses are not assigned.

Third-party app license management enables independent software vendors (ISVs) to manage and enforce licenses for their solutions using systems provided by Microsoft. By adopting this, ISVs can:

* Enable customers to assign and unassign licenses of ISV products using Teams and Teams Admin Center.
* Lessen the effort of building and maintaining their own license management and enforcement system.
* Elaborate how Teams will connect the apps with license management.

## Impacts on ISVs

The ISV creates an offer in Partner Center and manage licenses for this offer through Microsoft. This includes defining one or more licensing plans for the offer.  

* ISV needs to ensure the mapping of offers that have licenses managed by Microsoft.
* When a user within the customer’s organization tries to run an application, license usage rights check is done by the ISV with Microsoft Graph to ensure that user has an active license.
* ISVs can view information on provisioned and assigned licenses over time and by geography in Partner Center.