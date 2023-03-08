---
title: Include a SaaS offer with your app
description: Learn to monetize your Microsoft Teams app by selling subscription plans directly from your Teams store listing. Understand publish app, end-user, admin purchase experience. 
author: heath-hamilton
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high
---

# Include a SaaS offer with your Teams app

:::row:::
   :::column span="3":::

With a transactable Software-as-a-Service (SaaS) offer, you can monetize your Teams app by selling subscription plans directly from your Teams store listing. For example, say you have a free app anyone can get in the store. Now you can offer premium and enterprise plans for users who want more features.

Here's a general idea of how to monetize your app:

1. [Plan your SaaS offer](#plan-your-saas-offer).

1. [Integrate with the SaaS Fulfillment APIs](#integrate-with-the-saas-fulfillment-apis).

1. [Build a landing page for subscription management](#build-a-landing-page-for-subscription-management).

1. [Create your SaaS offer](#create-your-saas-offer).

1. [Configure your app for the SaaS offer](#configure-your-app-for-the-saas-offer).

1. [Publish your app to the Teams store](#publish-your-app).

   :::column-end:::
   :::column span="1":::

:::image type="content" source="~/assets/images/saas-offer/saas-offer-diagram.png" alt-text="Diagram showing process for how to include a SaaS offer with your Teams app.":::

   :::column-end:::
:::row-end:::

## Plan your SaaS offer

For comprehensive guidance, see [how to plan a SaaS offer for the Microsoft commercial marketplace](/azure/marketplace/plan-saas-offer).

When planning how to monetize your Teams app, here are some things to consider:

* Decide on your subscription model. A transactable SaaS offer can include multiple subscription plans. Public subscription plans available to anyone are most common, but you may also want to target specific customers with deals only for them. For more information, see [private plans in the Microsoft commercial marketplace](/azure/marketplace/private-plans).
* Read about the [*Sell through Microsoft* listing option](/azure/marketplace/plan-saas-offer#listing-options) for your SaaS offer, which is required if you want users to purchase subscription plans for your app directly through the Teams store.
* Learn how [Azure Active Directory single sign-on (SSO)](/azure/marketplace/azure-ad-saas) helps your customers purchase and manage subscriptions. (Microsoft Azure Active Directory (Azure AD) SSO is required for Teams apps with SaaS offers.)
* Understand that you're responsible for managing and paying for the infrastructure required to support your customers' use of your SaaS offer.
* Plan for mobile. To avoid violating third-party app store policies, your app can't include links that allow users to purchase subscription plans on mobile. However, you can still indicate if your app has features that require a subscription plan. For more information, see the related [commercial marketplace certification policies](/legal/marketplace/certification-policies#114048-mobile-experience).

## Integrate with the SaaS Fulfillment APIs

Integrating with the SaaS Fulfillment APIs is required for monetizing your Teams app. These APIs help you manage the lifecycle of a subscription plan once it’s purchased by a user.

For complete instructions and API reference, see the [SaaS Fulfillment APIs documentation](/azure/marketplace/partner-center-portal/pc-saas-fulfillment-apis). In general, you’ll implement the following steps using the APIs once a subscription is purchased:

1. Receive a [*purchase identification token*](/azure/marketplace/partner-center-portal/pc-saas-fulfillment-life-cycle#purchased-but-not-yet-activated-pendingfulfillmentstart) via the URL to your landing page.

1. Use the token to retrieve subscription details.

1. Notify the commercial marketplace that the subscription is activated.

### Best practices for implementing subscription management

* With transactable SaaS offers for Teams apps, subscription plans (licenses) should be assigned to individual users rather than groups or an entire org.
* When users are assigned a subscription plan, notify them through a Teams bot or email. In the messaging, include information on how to add the app to Teams and get started.
* Support the idea of multiple admins. In other words, multiple users in the same org can purchase and manage their own subscriptions.

## Manage license for third party apps in Teams

Teams allows independent software vendors (ISVs) admins or users to manage SaaS licenses for third party apps purchased from Teams storefront. ISV admins or users can easily assign, unassign, use, and track SaaS licenses.

To enable license management for an app in Teams, follow the steps:

1. [Create an offer in Partner Center](#create-an-offer-in-partner-center)
1. [Update your Teams app](#update-your-teams-app)
1. [Post purchase](#post-purchase)
1. [Integrate with Graph Usage Right API](#integrate-with-graph-usage-right-api)

### Create an offer in Partner Center

1. Sign in to [Partner Center](https://partner.microsoft.com/) and select **Partner Center**.

   :::image type="content" source="~/assets/images/first-party-license-mgt/partner-center-home-page.png" alt-text="The screenshots shows how to login to the Partner Center account.":::

1. In the **Home** page, select **Marketplace offers** tab to define commercial marketplace offers.

   :::image type="content" source="~/assets/images/first-party-license-mgt/home-page.png" alt-text="The screenshots shows the home page and Marketplace offer tab in the Partner Center.":::

1. Select **Overview** from the left pane.

1. Select **New Offer** > **Software as a Service**.

   :::image type="content" source="~/assets/images/first-party-license-mgt/commercial-marketplace.png" alt-text="The screenshots shows the marketplace offer page where you can select new offer.":::

1. Enter **Offer ID** and **Offer alias** and select **Create**.

   > [!NOTE]
   > If you're creating an offer for testing purpose, add the text **-ISVPILOT** to the end of your offer alias. This indicates the certification team that the offer is for testing purposes. Microsoft delete offers with **-ISVPILOT** periodically. So, don't use this tag for reasons other than testing the license management capability.

   :::image type="content" source="~/assets/images/first-party-license-mgt/saas.png" alt-text="The screenshots shows how to enter Offer ID and Offer alias in the Partner Center.":::

1. In Offer setup page, under setup details, select the checkbox **Yes, I would like Microsoft to manage customer licenses on my behalf**.

   :::image type="content" source="~/assets/images/first-party-license-mgt/saas-isvpilot.png" alt-text="The screenshots shows the offer setup page to setup license to manage for your app within Teams.":::

   > [!NOTE]
   >
   > * This is a one-time setting and you can't change it once your offer is published. This allows the customer to manage licenses for your app within Teams.
   > * The App manifest supports only one offer for an app. Choose an appropriate license management solution for all the plans available in your offer and you can't change this option after the offer is pushed to live.

1. Select **Save draft**.

1. Select **Plan overview** from the left pane, and then select **Create new plan**.

   > [!NOTE]
   > You need to add at least one plan.

   :::image type="content" source="~/assets/images/first-party-license-mgt/plan-overview.png" alt-text="The screenshots shows plan overview to create a new plan for your apps in the Partner Center.":::

1. Enter Plan ID and Plan name, and then select **Create**.

1. Enter the **Plan name** and **Plan description**.

   > [!NOTE]
   > The plan information displays on Teams marketplace and [Appsource](https://appsource.microsoft.com/) under offer listing (plans section).

   :::image type="content" source="~/assets/images/first-party-license-mgt/plan-listing.png" alt-text="The screenshots shows plan page to add plan name and plan description for your app.":::

1. Select **Save draft**.

1. Select **Pricing and availability** from the left pane.

1. Add pricing and availability details.

   :::image type="content" source="~/assets/images/first-party-license-mgt/pricing-availability.png" alt-text="The screenshots shows pricing and availability page to add SaaS offer for your app.":::

1. Select **Save draft**.

1. Select **Plan overview** at the top of the page to go to the listing page that shows all the plans you've created for this offer.

   :::image type="content" source="~/assets/images/first-party-license-mgt/list-of-plans-created.png" alt-text="The screenshots shows plan listing page with service ID, pricing model, availability, status and action.":::

1. Copy the service ID of the plan you created to integrate with Microsoft Graph Usage Rights API.

### Update your Teams app

Update your Teams app to map to the paid functionality and [Map your Teams app](https://aka.ms/TMTG) to your offer and publish.

### Post purchase

1. After activation, customer is redirected from landing page to Teams License Management.

1. Upon successful completion of subscription purchase, the customer is redirected to the app landing page for subscription activation. This is the existing experience for user purchasing [monetized apps in Teams](https://aka.ms/TMTG).

1. After the customer activates the subscription purchase on landing page, customer is redirected to subscriptions page in Teams via a [redirect URL](https://teams.microsoft.com/_#/subscriptionManagement) link or button that the customer selects on the publisher landing page.

### Integrate with Graph Usage Right API

Integrate with Graph Usage Right API to manage user permissions at the time of app launch by a customer who has a purchase license. You're required to determine the user’s permissions for the app with a Graph call to the Usage Rights API.

You can call Graph APIs to determine if the currently logged in user with a valid subscription of the plan has access to your app. To call Graph UsageRight API to check user permissions, follow the steps:

1. Get user OBO token: [Get access on behalf of a user - Microsoft Graph | Microsoft Docs](/graph/auth-v2-user).

1. Call Graph to get user’s object ID: [Use the Microsoft Graph API - Microsoft Graph | Microsoft Docs](/graph/use-the-api).

1. Call UsageRights API to determine the user has License to the plan [List user usageRights - Microsoft Graph beta | Microsoft Docs](/graph/api/user-list-usagerights?view=graph-rest-beta&tabs=http&preserve-view=true).

   > [!NOTE]
   > You need to have minimum `User.Read` permissions to call UsageRights.
   > The UsageRights API is currently in beta version. After the version is updated to V1, ISV users should upgrade from beta to V1 version.

### Check license usage in Partner Center analytics

1. Sign in to [Partner Center](https://partner.microsoft.com/).
1. In the left pane, go to **Commercial Marketplace > Analyze > Licensing**.
1. Select **Plan and Tenant** in the reporting widget to see the month wise usage.

## Build a landing page for subscription management

When someone finishes buying a subscription plan for your app in the Teams store, the commercial marketplace will direct them to your landing page where they can manage the subscription (such as assign a license to a specific user in their org).

For complete instructions, see [build the landing page for your SaaS offer](/azure/marketplace/azure-ad-transactable-saas-landing-page).

### Best practices for landing pages

Consider the following approaches when building a landing page for the Teams app you’re monetizing. See an example landing page in the [end-user purchasing experience](#end-user-purchasing-experience).

* Users must be able to sign in to your landing page with the same Azure AD credentials they used to buy the subscription. For more information, see [Azure AD and transactable SaaS offers in the commercial marketplace](/azure/marketplace/azure-ad-saas).
* Allow users to take the following actions on your landing page. Don’t forget to consider what’s appropriate for a user’s role and permissions. For example, you may want to allow only subscription admins to search for users):
  * Search for users in their org using email or another form of identity.
  * See users they can assign licenses to in a list.
  * Assign licenses to one or multiple users at the same time.
  * Assign and manage different types of licenses (if available).
  * Validate if a license is already assigned to another user.
  * Cancel their subscription.
* Provide an introduction on how to use your app.
* Add ways to get support, such as an FAQ, knowledge base, or contact email.
* Provide a link that makes it easy for the subscriber to get back to the landing page. For example, include this link in your app’s **About** tab.

## Create your SaaS offer

Once you’ve integrated the SaaS Fulfillment APIs and built your landing page where users can manage their subscriptions, it's time to officially create, test, and publish your transactable SaaS offer.

### Create the offer

See [create a SaaS offer](/azure/marketplace/create-new-saas-offer) for complete instructions on how to do this in Partner Center. The following steps describe what to do at a high level.

1. Create a [Partner Center](https://partner.microsoft.com/) account if you don’t have one.

1. Configure the subscription plans, pricing details, and more for your transactable SaaS offer. In particular, make sure you complete the following steps:

    * Under **Setup details**, select the **Yes** option to specify that you’re selling the offer through Microsoft.

    * Under **Microsoft 365 integration**, add the AppSource link to your app listing. This step ensures people can buy your subscription plans in AppSource in addition to Teams.

1. Store your publisher and offer IDs. (You need them later to link the offer to your app in the Developer Portal.)

1. Publish your offer to the commercial marketplace.

### Test the offer

We recommend that you verify the end-to-end purchasing experience before publishing your SaaS offer. You can verify by creating a separate offer just for testing. For complete information, see [test offer overview](/azure/marketplace/plan-saas-offer#test-offer), [create a test offer](/azure/marketplace/create-saas-dev-test-offer), and [preview your offer](/azure/marketplace/test-publish-saas-offer).

> [!IMPORTANT]
> You can test an end-to-end transaction in Teams using the [Test preview for monetized apps](Test-preview-for-monetized-apps.md) feature. For live offers you must complete the app store validation process.

From a Teams standpoint, these tests must verify that the number of licenses and assignments match what’s in the Teams admin center when users:

* Activate and configure their subscription plan on your landing page.
* Assign, remove, or reassign licenses to themselves or others.
* Cancel or renew their subscription.

### Publish the offer

Once you finish testing, [publish your offer live](/azure/marketplace/test-publish-saas-offer#publish-your-offer-live).

## Configure your app for the SaaS offer

You’ve published your SaaS offer, but you still must link it to your Teams app for users to see your subscription plans in the Teams store.

1. Go to the [Developer Portal](https://dev.teams.microsoft.com/) and select **Apps**.
1. On the **Apps** page, select the app you're linking the SaaS offer to.
1. Go to the **Plans and pricing** page and specify your publisher and offer IDs. (You can find these IDs in Partner Center if you don't have them readily available.)
1. Select **View** to preview your SaaS offer's subscription plans.
1. If everything looks good, select **Save**.

   The `subscriptionOffer` property is added to your [app manifest](~/resources/schema/manifest-schema-dev-preview.md#subscriptionoffer).

   ```json
      "subscriptionOffer": {
        "offerId": "publisherId.offerId"  
        }
   ```

> [!NOTE]
> The `subscriptionOffer` property is supported in manifest schema version 1.10 or later.

## Publish your app

You’ve created your SaaS offer and linked it to your Teams app—now it's time to publish your app to the Teams store. For complete instructions, see [publish your app to the Teams store](~/concepts/deploy-and-publish/appsource/publish.md).

> [!IMPORTANT]
>
> * Even if your app is already listed on the Teams store, you still must go through the store validation process again to include your SaaS offer.
> * Flat rate offers created without the Offer ID and Publisher ID in the app manifest should be updated and resubmitted for validation.

Once published, users will see a **Buy a subscription** option in the app details dialog when they try to add your app to Teams.

## End-user purchasing experience

The following example shows how users can purchase subscription plans for a fictional Teams app called *Recloud*.

1. In the Teams store, find and select the *Recloud* app.

1. In the app details dialog, select **Buy a subscription**.

    :::image type="content" source="~/assets/images/saas-offer/buysubscriptionplan.png" alt-text="Buying the subscription for the selected app.":::

1. Select your country to see subscription plans for your location.

1. In the **Choose a subscription plan** dialog, choose the plan you want and select **Checkout**. (Note: Private plans are visible only to users in orgs you're providing the offer to. These plans are indicated with a **Special offer** :::image type="icon" source="~/assets/icons/special-icon.png"::: icon.)

    :::image type="content" source="~/assets/images/saas-offer/choosingsubscriptionplan.png" alt-text="Selecting the appropriate subscription plan.":::

1. In the **Checkout** dialog, provide any required information and select **Place order**.

    :::image type="content" source="~/assets/images/saas-offer/placesubscriptionorder.png" alt-text="Placing the subscription order.":::

1. When prompted, select **Set up now** to set up your subscription.

    :::image type="content" source="~/assets/images/saas-offer/saas-offer-set-up.png" alt-text="Setting up the subscription.":::

1. Manage your subscription plan through the *Recloud* website (also known as a [landing page](#build-a-landing-page-for-subscription-management)).

    :::image type="content" source="~/assets/images/saas-offer/subscriptionlicenses.png" alt-text="Configuring user licenses.":::

## End user experience for License Management in Teams

Client Experience

1. Go to Microsoft Teams.
1. Select Apps > Manage your apps.
1. Select Subscriptions. A tab appears with a list of purchases made in the tenant.
1. Choose an existing subscription from the list and select **Assign licenses**.

    :::image type="content" source="../../../../assets/images/saas-offer/client-experience-1.png" alt-text="Screenshot showing the existing subscription.":::

    :::image type="content" source="../../../../assets/images/saas-offer/client-experience-2.png" alt-text="Screenshot showing the assigned licenses highlighted in red":::

1. To view license utilization and assign licenses, select Assign licenses.

    :::image type="content" source="../../../../assets/images/saas-offer/view-license.png" alt-text="Screenshot showing the selected assigned licenses highlighted in red.":::

1. Search for a user or a team in the search box and select Assign. The license is assigned to the user or team.

    Purchaser can begin assigning licenses to users in the tenant by typing the user name. Purchaser can add one or more users for assignment. Click the “Assign” button. Purchaser can also assign licenses to a “Team” in Teams with a single click.

    :::image type="content" source="../../../../assets/images/saas-offer/assign-licenses.png" alt-text="Screenshot showing the example of assigning license to a Team with a single click highlighted in red.":::":::

1. You can view the list of assigned users or teams for the subscription. You can also check the status of the assignment, if it’s pending or assigned.
Once the “assign” button is clicked, licenses are successfully assigned and purchaser see the list of assigned users as below.

    :::image type="content" source="../../../../assets/images/saas-offer/list-of-assigned-users.png" alt-text="Screenshot showing the list of assigned users with assign licenses highlighted in red.":::":::

1. If you want to unassign a license for a user or a team, select the user or a team from the list and select Unassign. If the purchaser would like to unassign licenses, the purchaser can select the users and click the unassign button.

    :::image type="content" source="../../../../assets/images/saas-offer/unassign-button.png" alt-text="Screenshot showing the selection of unassign button highlighted in red to unassign the users.":::

### App launch experience

When a new user launches the app for the first time, they are requested to provide consent to the app. Following is an example of the consent screen shown when calling for user profile data with minimum User.Read permission.

Consent dialog is part of the flow to get the users license information and may vary based on ISV’s integration approach.

:::image type="content" source="../../../../assets/images/saas-offer/permissions-requested.png" alt-text="Screenshot showing the permissions requested.":::

## Admin purchasing experience

Admins can purchase app subscription plans in the [Teams admin center](/microsoftteams/purchase-third-party-apps).

## Remove a SaaS offer from your app

If you unlink a SaaS offer included in your Teams store listing, you must republish your app to see the change in the store.

1. Go to the [Developer Portal](https://dev.teams.microsoft.com/) and select **Apps**.
1. On the **Apps** page, select the app you're removing the offer from.
1. Go to the **Plans and pricing** page and select **Revert**.
1. Once the offer's unlinked, do the following to update your store listing:
   1. Select **Distribute > Publish to the Teams store**.
   1. Select **Open Partner Center** to begin the process of republishing your app without the offer.

## Code sample

| **Sample name** | **Description** | **Node.js** | **Manifest**|
|-----------------|-----------------|----------------|----------------|----------------|
| Meeting stage view | This app helps to enable and configure your apps for Teams meetings. It also demonstrates use of share in meeting feature.|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-app-monetization/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-app-monetization/nodejs/demo-manifest/tab-app-monetization.zip)|

## See also

* [Monetize your app](monetize-overview.md)
* [Maintaining and supporting your published app](../post-publish/overview.md)
* [Validation guidelines for apps linked to SaaS offer](teams-store-validation-guidelines.md#apps-linked-to-saas-offer)
