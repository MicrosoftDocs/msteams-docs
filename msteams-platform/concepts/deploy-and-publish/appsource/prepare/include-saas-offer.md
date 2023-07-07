---
title: Include a SaaS offer with your app
description: Learn to monetize your Microsoft Teams app by selling subscription plans directly from your Teams store listing. Understand publish app, end-user, admin purchase experience. 
author: heath-hamilton
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high
ms.date: 03/21/2023
---

# Include a SaaS offer with your Teams app

Plan and prepare for your SaaS offer

**Plan and  prepare** > Create and configure > Test and publish > Publish with offer configured

SaaS apps published to Microsoft commercial marketplace, either Azure marketplace or Microsoft AppSource are known as SaaS offers. Based on the SaaS offer configurations, the offers are available in one or both the marketplaces. This guide helps you to add SaaS offers as premium and/or enterprise plans for users who want more features to an existing basic free app.

To create a SaaS offer for your application and sell through commercial marketplace, you must first plan and prepare for the offer:

## Plan your offer

To create and publish your SaaS offer in the marketplace, it is recommended that you plan the offer and fulfil the prerequisites.

1. Decide the publishing option: The initial step to create any SaaS offer is to choose how the app should be available in the marketplace. You can choose to sell through Microsoft where Microsoft host all your transactions. The other option is to manage your transactions independently which further has three list offers. The type of listing option decides the information required to create the specific offer in Partner Center. The publishing option is available as a call-to-action button in your landing page.

1. Choose the type of Plan/subscription model: SaaS offers through Microsoft must have at least one plan added. The plan can either be private or public, public plans are available for all customers while private plans are customized for specific customers.

1. Decide the pricing model and billing term: You can choose between two pricing model offered for SaaS offers - flat rate or per user. For example, a SaaS offer cannot have one plan that's flat rate and another plan that’s per user. The billing terms can be monthly or annual.

1. Choose to have free trails: Microsoft allows a free trial period of one month, after which the offer is billed based on the subscription model./ When you sell through Microsoft, you can offer free trial of one month and Microsoft converts it to a paid subscription by the end of the trial period.

1. Plan for mobile: To avoid violating third-party app store policies, your app can't include links that allow users to purchase subscription plans on mobile. However, you can still indicate if your app has features that require a subscription plan. For more information, see the related commercial marketplace certification policies.

1. Plan to provide Test drive.

For comprehensive guidance, see [how to plan a SaaS offer for the Microsoft commercial marketplace](/azure/marketplace/plan-saas-offer).

> [!NOTE]
> Pricing model and billing term can’t be changed once the offer is published.

## Prepare to create an offer

Before you start to create a SaaS offer, make sure the technical requirements are in place.

### Technical configuration

If you choose to sell your SaaS offer through Microsoft, there are certain technical configurations to be done and requirements that needs to be fulfilled before you can create your offer. The technical requirements differ based on the listing option you chose for your SaaS offer. It helps negate any blockers while creating the app. This helps to manage and track your offers right from the start and provide seamless user experience.

> [!NOTE]
> If you choose the listing option as Contact me, there are no technical requirements.

* Enable Microsoft Accounts and Azure Active Directory (Azure AD)

* **Create a landing page**

    When someone finishes buying a subscription plan for your app in the Teams store, the commercial marketplace will direct them to your landing page where they can manage the subscription (such as assign a license to a specific user in their org). For complete instructions, see build the landing page for your SaaS offer. A buyer is directed to the landing page after they subscribe to an offer.After the SaaS offer is purchased successfully, the user is directed to the landing page where they activate and configure the subscription. Action taking page. Learn how to create a landing page for your transactable SaaS offer. What the landing page should have - allow the user to sign in with Azure AD SSO.

    When someone finishes buying a subscription plan for your app in the Teams store, the commercial marketplace will direct them to your landing page where they can manage the subscription (such as assign a license to a specific user in their org).

    For complete instructions, see [build the landing page for your SaaS offer](/azure/marketplace/azure-ad-transactable-saas-landing-page).

    **Best practices for landing pages**

    Consider the following approaches when building a landing page for the Teams app you’re monetizing. See an example landing page in the End-user purchase experience.

        * Users must be able to sign in to your landing page with the same Azure AD credentials they used to buy the subscription. For more information, see Azure AD and transactable SaaS offers in the commercial marketplace.
        * Allow users to take the following actions on your landing page. Don’t forget to consider what’s appropriate for a user’s role and permissions. For example, you may want to allow only subscription admins to search for users):
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

* **Integrate with Fulfillment SaaS API (purpose)**

    Integrating with the SaaS Fulfillment APIs is required for monetizing your Teams app. These APIs help you manage the lifecycle of a subscription plan once it’s purchased by a user.

    In general, you’ll implement the following steps using the APIs once a subscription is purchased:

    1. Receive a purchase identification token via the URL to your landing page.
    1. Use the token to retrieve subscription details.
    1. Notify the commercial marketplace that the subscription is activated.)

    For complete instructions and API reference, see the SaaS Fulfillment APIs documentation.

* **Integrate with Graph usageRights API**

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

### Technical requirements/Prerequisites

To fulfil the technical configurations and to create a SaaS offer, you need to have technical information handy.

* Landing page URL: The SaaS site URL that users will be directed to after acquiring your offer from the commercial marketplace, triggering the configuration process from the newly created SaaS subscription. This URL will receive a token that can be used to call the fulfillment APIs to get provisioning details for your interactive registration page.Say where we add it. It is to be defined in the Offer setup page.
* Connection webhook URL: For all asynchronous events that Microsoft needs to send to you (for example, when a SaaS subscription has been canceled), we require you to provide a connection webhook URL. We will call this URL to notify you on the event. Define it in the Offer setup page and you receive subscription changes from the user.
* Azure Active Directory tenant ID: Inside the Azure portal, we require you to register an Azure Active Directory (Azure AD) app so we can add it to the access control list (ACL) of the API to make sure you are authorized to call it. You can find the tenant ID under the App registrations blade in Azure Active Directory.
* Azure Active Directory application ID: The Azure AD application ID is associated with your publisher ID in your Partner Center account. You must use the same application ID for all offers in that account.

Now that we have planned and prepared for the SaaS offer, let's move to create a SaaS offer as planned.

:::image type="content" source="~/assets/images/saas-offer/saas-offer-diagram.png" alt-text="Diagram showing process for how to include a SaaS offer with your Teams app.":::

Once you’ve integrated the SaaS Fulfillment APIs and built your landing page where users can manage their subscriptions, it's time to officially create, test, and publish your transactable SaaS offer.

## See also

* [Monetize your app](monetize-overview.md)
* [Maintaining and supporting your published app](../post-publish/overview.md)
* [Validation guidelines for apps linked to SaaS offer](teams-store-validation-guidelines.md#apps-linked-to-saas-offer)
