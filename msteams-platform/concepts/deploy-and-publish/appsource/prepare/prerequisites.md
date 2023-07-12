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

If you choose to sell your SaaS offer through Microsoft, there are certain technical configurations to be done and technical information to be gathered before you create the offer. Before you start to create a SaaS offer, make sure the technical requirements are in place.

:::image type="content" source="~/assets/images/saas-offer/monetize-flow.png" alt-text="Diagram shows the process for how to include a SaaS offer with your Teams app with the first phase highlighted.":::

## Technical configuration

The technical configurations differ based on the listing option you chose for your SaaS offer. It helps negate any blockers while creating the offer.

> [!NOTE]
> If you choose the listing option as Contact me, there are no technical requirements.

Enable Microsoft Accounts (link) and Azure Active Directory (Azure AD)

### Create a landing page

When someone finishes buying a subscription plan for your app in the Teams store, the commercial marketplace will direct them to your landing page where they can manage the subscription (such as assign a license to a specific user in their org). For complete instructions, see build the landing page for your SaaS offer. A buyer is directed to the landing page after they subscribe to an offer.After the SaaS offer is purchased successfully, the user is directed to the landing page where they activate and configure the subscription. Action taking page. Learn how to create a landing page for your transactable SaaS offer. What the landing page should have - allow the user to sign in with Azure AD SSO.

For complete instructions, see [build the landing page for your SaaS offer](/azure/marketplace/azure-ad-transactable-saas-landing-page).

#### Best practices for landing pages

Consider the following approaches when building a landing page for the Teams app you’re monetizing. See an example landing page in the End-user purchase experience.

* Users must be able to sign in to your landing page with the same Azure AD credentials they used to buy the subscription. For more information, see Azure AD and transactable SaaS offers in the commercial marketplace.
* Allow users to take the following actions on your landing page. Don’t forget to consider what’s appropriate for a user’s role and permissions. For example, you may want to allow only subscription admins to search for users:
  * Search for users in their org using email or another form of identity.
  * See users they can assign licenses to in a list.
  * Assign licenses to one or multiple users at the same time.
  * Assign and manage different types of licenses (if available).
  * Validate if a license is already assigned to another user.
  * Cancel their subscription.
* Provide an introduction on how to use your app.
* Add ways to get support, such as an FAQ, knowledge base, or contact email.
* Provide a link that makes it easy for the subscriber to get back to the landing page. For example, include this link in your app’s About tab.

The technical requirements listed below are specific to Sell through Microsoft listing option.

### Integrate with Fulfillment SaaS API

Integrating with the SaaS Fulfillment APIs is required for monetizing your Teams app. These APIs help you manage the lifecycle of a subscription plan once it’s purchased by a user.

In general, you’ll implement the following steps using the APIs once a subscription is purchased:

  1. Receive a purchase identification token via the URL to your landing page.
  1. Use the token to retrieve subscription details.
  1. Notify the commercial marketplace that the subscription is activated.

For complete instructions and API reference, see the SaaS Fulfillment APIs documentation.

### Integrate with Graph usageRights API

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

Before you create your SaaS offer, have the below technical information that's required to configure the SaaS offer.

* Landing page URL: The SaaS site URL that users will be directed to after acquiring your offer from the commercial marketplace, triggering the configuration process from the newly created SaaS subscription. This URL will receive a token that can be used to call the fulfillment APIs to get provisioning details for your interactive registration page.Say where we add it. It is to be defined in the Offer setup page.

* Connection webhook URL: For all asynchronous events that Microsoft needs to send to you (for example, when a SaaS subscription has been canceled), we require you to provide a connection webhook URL. We will call this URL to notify you on the event. Define it in the Offer setup page and you receive subscription changes from the user.

* Azure Active Directory tenant ID: Inside the Azure portal, we require you to register an Azure Active Directory (Azure AD) app so we can add it to the access control list (ACL) of the API to make sure you are authorized to call it. You can find the tenant ID under the App registrations blade in Azure Active Directory.

* Azure Active Directory application ID: The Azure AD application ID is associated with your publisher ID in your Partner Center account. You must use the same application ID for all offers in that account.

Now that we have the technical requirements to create a SaaS offer, it's essential to plan the offer and decide features to be provided in the offer.

:::image type="content" source="~/assets/images/saas-offer/saas-offer-diagram.png" alt-text="Diagram showing process for how to include a SaaS offer with your Teams app.":::

## Next step

> [!div class="nextstepaction"]
> [Plan your SaaS offer](include-saas-offer.md)

## See also

* [Monetize your app](monetize-overview.md)
