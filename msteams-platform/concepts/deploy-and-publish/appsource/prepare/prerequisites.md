---
title: Prerequisites to create a SaaS offer
description: Learn how to configure APIs required and build a landing page for your SaaS offer.
author: v-npaladugu
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high 
ms.date: 01/31/2023
---
# Prerequisites to create an offer

If you decide to sell your SaaS offer through Microsoft, you need to fulfill the technical configurations and gather the required technical information. It helps negate any blockers while creating the offer. This article helps you prepare the technical configurations and requirements to create a SaaS offer.

The technical configurations differ based on the listing option you opt for your SaaS offer. Before creating a SaaS offer, you must ensure that the technical fulfillments are in place.

:::image type="content" source="~/assets/images/saas-offer/monetize-flow.png" alt-text="Diagram shows the process for how to include a SaaS offer with your Teams app with the first phase highlighted.":::

> [!NOTE]
> *Contact me* listing option has no technical requirements to be met.

## Technical configuration

If you select *Get it now (Free)*, *Free trial*, and *Sell through Microsoft* as the listing option, you must do the account setup and create a landing page.

### Set up Microsoft and Azure AD

To start with, you must first set up the required accounts to create an offer.

*Enable Microsoft Accounts and ensure you have a Microsoft Partner Center account.

* Enable [Azure Active Directory (Azure AD)](https://azure.microsoft.com/services/active-directory/) for authenticating buyers on your site.  With [Azure AD integration](/partner-center/marketplace/azure-ad-saas), you can provision the users to their SaaS apps automatically. You must let buyers with an Azure AD account sign in to your application using Azure AD with single sign-on (SSO). Azure AD provides easier and secure purchase experience.

### Create a landing page

When the user successfully purchases a subscription plan for your app in the Teams store, the commercial marketplace directs them to your landing page where they can manage the subscription (such as assign a license to a specific user in their org).

Ensure your landing page is registered as an Azure AD application. Enable single sign-on using Azure AD and Microsoft Graph to obtain important information about the buyer and to confirm and activate the subscription.

For complete instructions, see [build the landing page for your SaaS offer](/partner-center/marketplace/azure-ad-transactable-saas-landing-page).

#### Best practices for landing pages

Consider the following approaches when building a landing page for the Teams app you’re monetizing. See an example landing page in the [End-user purchase experience](end-user-purchase-experience.md).

* Enable users to sign in to your landing page only using the same Azure AD credentials they used to buy the subscription.
* Allow users to take the following actions on your landing page. Don’t forget to consider what’s appropriate for a user’s role and permissions.
  * Allow only subscription admins to search for users.
  * Search for users in their org using email or another form of identity.
  * View users in a list for whom they can assign licenses.
  * Assign licenses to one or multiple users at the same time.
  * Assign and manage different types of licenses (if available).
  * Validate if a license is already assigned to another user.
  * Cancel their subscription.
* Provide an introduction on how to use your app.
* Add ways to get support, such as an FAQs, knowledge base, or contact email.
* Provide a link that makes it easy for the subscriber to get back to the landing page. For example, include this link in your app’s About tab.

### Integrate with APIs

Sell through Microsoft or transactable offer has further technical requirements added to account configurations and landing page. When the users are redirected to the landing page from the configuration link, Microsoft Graph API and SaaS Fulfillment APIs must be integrated to retrieve user information and to confirm and activate the subscription.

#### Integrate with Fulfillment SaaS API

Integrating with the SaaS Fulfillment APIs is required for monetizing your Teams app. These APIs help you manage the lifecycle of a subscription plan once the user purchases the plan.

In general, you implement the following steps using the APIs once a subscription is purchased and the customer selects to configure:

  1. You receive a notification about the purchase where your landing page URL opens with the purchase identification token.
  1. You must pass the token by calling SaaS Resolve API to retrieve subscription details.
  1. After sign in and SaaS configuration by the user, you must then call the Activate Subscription API to notify the commercial marketplace that the subscription is activated.

For complete instructions and API reference, see SaaS fulfillment APIs overview and [SaaS Fulfillment APIs](/azure/marketplace/partner-center-portal/pc-saas-fulfillment-apis) and [SaaS Fulfillment purchase flow](/partner-center/marketplace/partner-center-portal/pc-saas-fulfillment-life-cycle) documentation.

#### Integrate with Graph usageRights API

Integrate with Graph usageRights API to manage user permissions at the time of app launch by a customer who has a purchase license. You're required to determine the user’s permissions for the app with a Graph call to the usageRights API.

You can call Graph APIs to determine if the currently logged in user with a valid subscription of the plan has access to your app. To call Graph usageRights API to check user permissions, follow the steps:

  1. Get user OBO token: [Get access on behalf of a user](/graph/auth-v2-user).

  1. Call Graph to get user’s object ID: [Use the Microsoft Graph API](/graph/use-the-api).

  1. Call usageRights API to determine the user has License to the plan: [List user usageRights API](/graph/api/user-list-usagerights?view=graph-rest-beta&tabs=http&preserve-view=true).

  > [!NOTE]
  >
  > * You need to have minimum `User.Read` permissions to call usageRights.
  > The usageRights API is currently in beta version. After the version is updated to V1, users must upgrade from beta to V1 version.
  > * If the Azure AD app is used for both SaaS Fulfillment APIs and usageRights API, ensure that the tenant under which the Azure AD app is created is either the publishing tenant or the associated tenant in the Partner Center.

To determine if the tenant for the Azure AD app is part of the Partner Center setup, follow these steps:

  1. Sign in  to [Microsoft Partner Center](https://partner.microsoft.com/) with the publisher account that is used to publish the SaaS offer.
  1. On the upper-right corner, select the **Settings** icon.
  1. Select **Account Settings**.
  1. On the left pane, select **Tenants**.
    You can see all tenants associated with the Microsoft Partner Network (MPN) account. The tenant, who is the owner of the Azure AD app, must be available in the list. If the tenant isn’t on the list, you can use the **Associate Azure ID** button to link the tenant.

Integrating the APIs and building your landing page to manage subscriptions help to manage and track your offers right from the start and provide seamless user experience.

## Technical requirements

To configure your SaaS offer, you must furnish the following technical information during Offer setup. When you create your SaaS offer, have the following technical information handy.

* **Landing page URL**: The SaaS site URL that users get redirected to after acquiring your offer from the commercial marketplace. It triggers the configuration process from the newly created SaaS subscription. This URL receives a token that can be used to call the fulfillment APIs to get provisioning details for your interactive registration page.

* **Connection webhook**: For all asynchronous events that Microsoft needs to send to you (for example, when a SaaS subscription has been canceled), we require you to provide a connection webhook URL. We call this URL to notify you on the event. Define it in the Offer setup page and you receive subscription changes from the user.

* **Azure AD tenant ID**: Inside the Azure portal, we require you to register an Azure AD app so we can add it to the access control list (ACL) of the API to make sure you're authorized to call it. You can find the tenant ID under the App registrations blade in Azure AD.

* **Azure AD application ID**: The Azure AD application ID is associated with your publisher ID in your Partner Center account. You must use the same application ID for all offers in that account.

Now that we have the technical requirements and also planned for the SaaS offer, let's get started to create an offer.

:::image type="content" source="~/assets/images/saas-offer/saas-offer-diagram.png" alt-text="Diagram showing process for how to include a SaaS offer with your Teams app.":::

## Next step

> [!div class="nextstepaction"]
> [Create your SaaS offer](create-saas-offer.md)

## See also

* [Monetize your app](monetize-overview.md)
* [SaaS app listing requirements](/partner-center/marketplace/marketplace-criteria-content-validation)
