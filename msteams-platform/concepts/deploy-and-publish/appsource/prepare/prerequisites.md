---
title: Prerequisites to create a SaaS offer
description: Learn how to configure APIs required to create a SaaS offer and build a landing page for your SaaS offer.
author: v-npaladugu
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high 
ms.date: 01/31/2023
---
# Prerequisites to create an offer

If you decide to sell your SaaS offer through Microsoft, you need to fulfill the technical configurations and collate the required technical information. It helps negate any blockers while creating the offer. API integrations are part of technical configuration that needs to be done after the user purchase the offer. This article provides detailing on the technical configurations and requirements to create a SaaS offer.

:::row:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow1.png" link="include-saas-offer.md" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow2a.png" link="prerequisites.md" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow3.png" link="create-saas-offer.md" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow4.png" link="manage-third-party-apps-license.md" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow5.png" link="Test-preview-for-monetized-apps.md" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow6.png" link="publish-saas-offer-app.md" border="false":::
   :::column-end:::
:::row-end:::

The technical configurations differ based on the listing option you opt for your SaaS offer. Before creating a SaaS offer, you must ensure that the technical fulfillments are in place.

> [!NOTE]
> The *Contact me* listing option have no technical configurations to be done.

## Technical configuration

If you select **Get it now (Free)**, **Free trial**, and **Sell through Microsoft** as the listing option, you must do the following technical configurations:

* [Set up Microsoft and Azure AD accounts](#set-up-microsoft-and-azure-ad-accounts)
* [Create a landing page](#create-a-landing-page)

For Sell through Microsoft or transactable offer, you need to do the [API integrations](#api-integration) after the user purchase the offer, in addition to the basic setup.

### Set up Microsoft and Azure AD accounts

To start with, you must set up the required accounts to create an offer.

* Enable Microsoft Accounts and ensure you have a [Microsoft Partner Center account](/partner-center/marketplace/open-a-developer-account).

* Azure Active Directory (Azure AD) provides an easier and secure purchase experience. Enable [Azure AD](https://azure.microsoft.com/services/active-directory/) for authenticating buyers on your site.  With [Azure AD integration](/partner-center/marketplace/azure-ad-saas), you can automatically provision the users to their SaaS apps and also allow buyers with Azure AD account to sign in to your app using Azure AD single sign-on (SSO).

### Create a landing page

When the user successfully purchases a subscription plan for your app in the Teams store, the commercial marketplace directs them to your landing page where they can manage the subscription (such as assign a license to a specific user in their organization).

Ensure to register your landing page as an Azure AD application. Enable SSO using Azure AD and Microsoft Graph to obtain important information about the buyer and to confirm and activate the subscription.

For complete instructions, see [build the landing page for your SaaS offer](/partner-center/marketplace/azure-ad-transactable-saas-landing-page).

#### Best practices for landing pages

Consider the following approaches when building a landing page for the Teams app you’re monetizing. See an example landing page in the [End-user purchase experience](end-user-purchase-experience.md).

* Enable users to sign in from offer landing page only using the same Azure AD credentials they used to buy the subscription.
* Allow users to take the following actions on your landing page. Don’t forget to consider what’s appropriate for a user’s role and permissions.
  * Search for users in their organization using email or another form of identity.
  * View users in a list for whom they can assign licenses.
  * Assign licenses to one or more users at the same time.
  * Assign and manage different types of licenses (if available).
  * Validate if a license is already assigned to another user.
  * Cancel their subscription.
  * Allows subscription admins to search for users.
* Provide an introduction on how to use your app.
* Add ways to get support, such as FAQs, knowledge base, or contact email.
* Provide a link that makes it easy for the subscriber to get back to the landing page. For example, include this link in your app’s About tab.

### Technical requirements

To configure your SaaS offer, you must furnish the following technical information during the offer configuration. When you create your SaaS offer, have the following technical information handy.

* **Landing page URL**: The SaaS site URL that users get redirected to after purchasing your offer from the commercial marketplace. It triggers the configuration process from the newly created SaaS subscription. This URL receives a token that can be used to call the fulfillment APIs to get provisioning details for your interactive registration page.

* **Connection webhook**: For all asynchronous events that Microsoft needs to send to you (for example, when a SaaS subscription has been canceled), we require you to provide a connection webhook URL. We call this URL to notify you of the event. Define it in the **Technical configuration** page and you receive subscription changes from the user.

* **Azure AD tenant ID**: Inside the Azure portal, we need you to register an Azure AD app so we can add it to the access control list (ACL) of the API to make sure you're authorized to call it. You can find the tenant ID under **App registrations** in Azure portal.

* **Azure AD application ID**: The Azure AD application ID is associated with your publisher ID in your Partner Center account. You must use the same application ID for all offers in that account.

## API integration

When the users are redirected to the landing page from the configuration link, a set of user information is required to confirm and activate the subscription. You must integrate Microsoft Graph API and SaaS Fulfillment APIs to retrieve user information.

> [!NOTE]
> API integrations are done only after the user purchases the license and get started to use the license.

### Integrate with SaaS fulfillment API

Integrating with the SaaS Fulfillment APIs helps to manage the lifecycle of a subscription plan once the user purchases the plan.

In general, you implement the following steps using the APIs once a subscription is purchased and the customer selects to configure:

  1. You receive a notification about the purchase where your landing page URL opens with the [purchase identification token](/azure/marketplace/partner-center-portal/pc-saas-fulfillment-life-cycle).
  1. You must pass the token by calling SaaS Resolve API to retrieve subscription details.
  1. After the user sign in and configuration, you must then call the Activate Subscription API to notify the commercial marketplace that the subscription is activated.

For comprehensive instructions and API reference, see [SaaS Fulfillment APIs](/azure/marketplace/partner-center-portal/pc-saas-fulfillment-apis) and [SaaS Fulfillment purchase flow](/partner-center/marketplace/partner-center-portal/pc-saas-fulfillment-life-cycle) documentation.

### Integrate with Graph usageRights API

Integrate with Graph usageRights API to manage user permissions at the time of app launch by a customer who has a purchase license. You're required to determine the user’s permissions for the app with a Graph call to the usageRights API.

You can call Graph APIs to determine if the currently logged in user with a valid subscription of the plan has access to your app. To call Graph usageRights API to check user permissions, follow the steps:

  1. Get user OBO token: [Get access on behalf of a user](/graph/auth-v2-user).

  1. Call Graph to get the user’s object ID: [Use the Microsoft Graph API](/graph/use-the-api).

  1. Call usageRights API to determine the user has a license to the plan: [List user usageRights API](/graph/api/user-list-usagerights?view=graph-rest-beta&tabs=http&preserve-view=true).

  > [!NOTE]
  >
  > * You need to have a minimum `User.Read` permissions to call usageRights.
  > The usageRights API is currently in beta version. After the version is updated to V1, users must upgrade from beta to V1 version.
  > * If the Azure AD app is used for both SaaS Fulfillment APIs and usageRights API, ensure that the tenant under which the Azure AD app is created is either the publishing tenant or the associated tenant in the Partner Center.

To determine if the tenant for the Azure AD app is part of the Partner Center setup, follow these steps:

  1. Sign in  to [Microsoft Partner Center](https://partner.microsoft.com/) with the publisher account that is used to publish the SaaS offer.
  1. On the upper-right corner, select the **Settings** icon.
  1. Select **Account Settings**.
  1. On the left pane, select **Tenants**.
    You can see all tenants associated with the Microsoft Partner Network (MPN) account. The tenant, who is the owner of the Azure AD app, must be available in the list. If the tenant isn’t on the list, you can use the **Associate Azure ID** button to link the tenant.

Integrating the APIs and building your landing page to manage subscriptions helps to manage and track your offers right from the start and provide a seamless user experience.

Now that we have the technical requirements and planned for the SaaS offer, let's get started to create an offer.

## Next step

> [!div class="nextstepaction"]
> [Create your SaaS offer](create-saas-offer.md)

## See also

* [Monetize your app](monetize-overview.md)
* [SaaS app listing requirements](/partner-center/marketplace/marketplace-criteria-content-validation)
