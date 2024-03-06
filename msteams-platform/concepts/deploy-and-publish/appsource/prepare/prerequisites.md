---
title: Prerequisites to create a SaaS offer
description: Learn how to set up Microsoft account, create landing page, and configure APIs required to create your SaaS offer.
author: v-preethah
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high 
ms.date: 01/31/2023
---
# Prerequisites to create a SaaS offer

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
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow4.png" link="Test-preview-for-monetized-apps.md" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow5.png" link="publish-saas-offer-app.md" border="false":::
   :::column-end:::
:::row-end:::

As an extended phase of planning your offer, you must fulfill the required technical configurations to create a Software as a Service (SaaS) offer. You must also have the technical information handy to update the offer configuration.

Here's a quick checklist to stay on track:

> [!div class="checklist"]
>
> * [Gather the required technical information](#technical-information)
> * [Set up Microsoft and Microsoft Entra account](#set-up-microsoft-and-microsoft-entra-accounts)
> * [Create a landing page](#create-a-landing-page)
> * [Integrate APIs](#api-integration) to sell through Microsoft offers

## Technical information

When you create the SaaS offer, you must provide the following technical information during the [offer configuration](create-saas-offer.md#add-the-technical-information):

* **Landing page URL**: The SaaS site URL where the user gets redirected to after purchasing the subscription, which also triggers the configuration process. The URL receives a token that you can use to invoke the fulfillment APIs and provides the required provisioning details for your interactive registration page.

* **Connection webhook URL**: You must provide a [connection webhook URL](/partner-center/marketplace/create-new-saas-offer-technical) for Microsoft to notify you of all asynchronous events, for example, when a SaaS subscription gets canceled.

* **Microsoft Entra tenant ID**: Register an application within the Azure portal to obtain the tenant ID. You can then add the tenant ID to the access control list (ACL) of the API, ensuring you have the authorization to call it.

* **Microsoft Entra application ID**: The application ID corresponds to your publisher ID in your Microsoft Partner Center account. Ensure that you use the same application ID for all offers within that account.

For more information, see [technical information to create an offer](/partner-center/marketplace/plan-saas-offer).

## Technical configurations

The following illustration helps you understand the technical configurations based on the listing option:

:::image type="content" source="../../../../assets/images/saas-offer/tech-config-offer.png" alt-text="Diagram shows the technical configuration per the type of listing option." lightbox="../../../../assets/images/saas-offer/tech-config-offer.png":::

### Set up Microsoft and Microsoft Entra accounts

To start with, you must set up the required accounts to create an offer.

* Enable Microsoft Accounts (MSA) and ensure you have a [Microsoft Partner Center account](/partner-center/marketplace/open-a-developer-account).

* Microsoft Entra ID provides an easier and secure purchase experience. Enable [Microsoft Entra ID](https://azure.microsoft.com/services/active-directory/) for authenticating buyers on your site. With [Microsoft Entra ID integration](/partner-center/marketplace/azure-ad-saas), you can automatically provision the users to their SaaS apps and also allow buyers to sign in to your app using Microsoft Entra single sign-on (SSO). For more information, see [Microsoft Entra ID and transactable SaaS offers](/partner-center/marketplace/azure-ad-saas).

### Create a landing page

After a user successfully purchases a subscription plan, commercial marketplace directs them to the offer landing page to manage the subscription.

Refer the following articles to create a landing that provides a seamless sign-in and onboarding experience:

* [Build the landing page for your transactable SaaS offer](/partner-center/marketplace/azure-ad-transactable-saas-landing-page).
* [Build landing page for your free or trial SaaS offer](/partner-center/marketplace/azure-ad-free-or-trial-landing-page)

#### Best practices for landing pages

Consider the following approaches when building a landing page:

* Provide the name and details of the offer and the user's account details.
* Enable users to sign in from offer landing page only using the same Microsoft Entra credentials they used for purchase subscription.
* Provide an introduction on how to use your app.
* Add support options, such as FAQs, knowledge base, or contact email.
* Provide a link that helps the user return to the landing page with ease.

You can view the landing page experience in [end-user purchase experience](end-user-purchase-experience.md).

### API integration

API integrations are specific to the Sell through Microsoft listing option. When the user gets redirected to the landing page from the configuration link, user information are required to confirm and activate the subscription.

> [!NOTE]
> API integrations can be done after the user purchases the SaaS app subscription.

#### Integrate with SaaS Fulfillment API

Integrating with the SaaS Fulfillment APIs help to manage the lifecycle of a subscription plan after the user purchases the subscription plan. You must implement the following steps to integrate SaaS Fulfillment APIs:

  1. You receive a notification about the purchase where your landing page URL opens with the purchase identification token.
  1. You must pass the token by calling SaaS Resolve API to retrieve subscription details.
  1. After the user signs in and configures, call the Activate Subscription API to notify the commercial marketplace that the subscription is activated.

For comprehensive instructions and API reference, see [SaaS Fulfillment APIs](/azure/marketplace/partner-center-portal/pc-saas-fulfillment-apis) and [SaaS Fulfillment purchase flow](/partner-center/marketplace/partner-center-portal/pc-saas-fulfillment-life-cycle).

#### Integrate with usageRights Graph API

Integrate with usageRights Graph API to manage user permissions at the time of app launch by a customer who has a purchase license. You can call Graph APIs to determine if the logged in user with a valid subscription of the plan has access to your app.

To call [usageRights Graph API](/partner-center/marketplace/isv-app-license-saas):

  1. Get [access token on behalf of](/graph/auth-v2-user) a user.
  1. [Use the Microsoft Graph API](/graph/use-the-api) to get the user’s object ID.
  1. Call the [usageRights API](/graph/api/user-list-usagerights?view=graph-rest-beta&tabs=http&preserve-view=true) to determine if the user has a license to the plan.

  > [!NOTE]
  > If the Microsoft Entra app is used for both SaaS Fulfillment APIs and usageRights API, the tenant under which the Microsoft Entra app is created must either be a publishing tenant or an associated tenant in the Partner Center.

To determine if the tenant for the Microsoft Entra app is part of the Partner Center setup, follow these steps:

  1. Sign in to [Microsoft Partner Center](https://partner.microsoft.com/dashboard/home) with the publisher account that is used to publish the SaaS offer.
  1. In the upper-right corner, select the **Settings** icon.
  1. Select **Account Settings**.
  1. In the left pane, select **Tenants**.

You can see all the tenants associated with the Microsoft Partner Network (MPN) account. The tenant, who is the owner of the Microsoft Entra app, must be available in the list. If the tenant isn’t on the list, you can use **Associate Microsoft Entra ID** to link the tenant.

By integrating APIs and constructing a landing page to manage subscriptions, you can effectively track and manage your offers and provide a seamless user experience.

## Next step

> [!div class="nextstepaction"]
> [Create a SaaS offer](create-saas-offer.md)

## See also

* [SaaS app listing requirements](/partner-center/marketplace/marketplace-criteria-content-validation)
* [Create a commercial marketplace account in Partner Center](/partner-center/create-account)
* [Technical requirements](/partner-center/marketplace/plan-saas-offer)
