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

## Pre-requisites

Following are the pre-requisites for enabling third-party app license management in Dynamics 365 customer engagement and Power Apps.

* Valid partner (MPN) account in Microsoft.  
[Create an MPN account in Partner Center - Partner Center | Microsoft Docs](/partner-center/mpn-create-a-partner-center-account)
* Enrollment in commercial marketplace program.
[Introduction to the Microsoft commercial marketplace - Learn | Microsoft Docs](/learn/modules/intro-commercial-marketplace/)
* [Create a commercial marketplace account in Partner Center for Azure Marketplace | Microsoft Docs](/azure/marketplace/create-account)

Access to development environments and tools required to create Teams Add-ons.

A test tenant with a Teams environment in it. This is to simulate how a customer will experience the license management or enforcement for your solution.  

## Chapter 1: Defining an offer in Partner Center

1. Create an offer in Partner Center.
1. Define the licensing options.
1. Add one or more plans.
1. Copy service ids from offer details and update your Teams app to map to the paid functionality.
1. Map your Teams app to your offer and publish.
1. Best practices on ISV logic to determine ISV managed offers vs Microsoft managed offers for license management.

### Create an offer in Partner Center

1. Login to [Partner Center](https://partner.microsoft.com/) and click on “Partner Center” to open your dashboard.

(Image)

1. Select **Commercial Marketplace** or **Overview** on left pane and then select **New Offer**. Now select **Software as a Service** to create a new offer.

(Image)

1. To create an offer, enter **Offer ID** and **Offer alias** and select **Create**.

    > [!NOTE]
    > If you are creating an offer for testing purpose, add the text **-ISVPILOT** to the end of your offer alias. This indicates the certification team that the offer is for testing purposes. Microsoft delete offers with **-ISVPILOT** periodically. So, don't use this tag for reasons other than testing the license management capability.

(Image)

### Define the licensing options

To enable license management for your offer, select the checkbox **< PLACEHOLDER >**.

> [!NOTE]
> This is a one-time setting, and you cannot change it once your offer is published.

(Image)

### Add one or more plans

1. Select **Plan overview** on left pane and then select **Create new plan** to define the plans you want to enable for the offer. You are required to define *at least* one plan.

(Image)

1. Select **Create** and enter your plan description in the page. Now select **Save draft** to save the plan information. This plan information displays on Teams marketplace and [Appsource](https://appsource.microsoft.com/) under offer listing (plans section).

(Image)

1. Add pricing and availability details (placeholder).

(Image)

1. Select **Plan overview** to go to the listing page which shows all the plans you have created for this offer.

(Image)

### Copy service ids from offer details and update your Teams app to map to the paid functionality

(Content and image needs to be added)

### Map your Teams app to your offer and publish

(content and image needs to be added)

### Best practice on ISV logic

(Content and image needs to be added)

## Chapter 2: Offer availability in Teams and Appsource

(Need content)

## Chapter 3: Purchase offer in Teams or Appsource

1. In Teams, go to the Appstore and select your app.
1. Select **Buy a subscription**.

(image)

1. Select the plan you want to purchase and select **Checkout**.

(Image)

1. Enter the number of licenses you would like to purchase, update sold to address and payment information. Select “place order”. This completes the purchase of the subscription.

(Image)

1. Once subscription is purchased successfully, purchaser is redirected to the ISV site to complete configuration steps required to activate the subscription.

(Image)

## Chapter 4: Manage third-party licenses in Teams

1. On Teams client, subscription purchaser can manage license assignments from within the Teams. From **Manage your apps**, you can go to **Subscriptions** tab to view the list of purchases.

(Image)

1. On the **Subscriptions** tab, select **Assign licenses** to manage licenses for the purchases.

(Image)

1. Purchaser is able to view license utilization and assign licenses by selecting **Assign licenses**.

(Image)

1. Purchaser can begin assigning licenses to users in the tenant by entering the user names. Purchaser can add one or more users for license assignment.

(Image)

1. Select **Assign** after adding all the users.

(Image)

1. Licenses are successfully assigned and purchaser see the list of assigned users as below.

(Image)

1. Purchaser can also assign licenses to a **Team** in Teams. Purchaser can search for the team and select **Assign**.

(Image)

1. If the number of users in the team exceeds the number of available licenses, the purchaser can select a subset of users to whom licenses are assigned. After doing so, select **Save**.

(Image)

1. Purchaser can unassign licenses from one or multiple users from the license page. The purchaser can select the users and select **Unassign**.

(Image)

1. If there is a delay in a multi user assignment or un-assignment action, the purchaser see a **Pending** status while the action completes on the Microsoft services.

(Image)

## Chapter 5: Test the app by launching in Teams environment

### App runtime consent flow for user

(Content)

## Check license usage in Partner Center analytics

### Check license usage of ISV apps in the Partner Center analytics section

1. Sign into [Partner Center](https://partner.microsoft.com/) with your partner account.
1. In the left pane select **Commercial Marketplace > Analyze > Licensing** to go to licensing dashboard.
1. Select the **Plan** and **Tenant** in the reporting widget to see the month wise usage.

(Image)

## Limitations

APIs are managed by commerce team for license management. If a user is assigned with a license, in the background you are sending an API request to license core on commerce to add a license.

If a license is assigned to multiple users, you build a queue to the commerce team to add the licenses.

* Partial failures.
* A user may or may not have approval.
* Time lag based on the queue.

You will see a pending status if the license has failed to assign and there is an opportunity to **Retry**.