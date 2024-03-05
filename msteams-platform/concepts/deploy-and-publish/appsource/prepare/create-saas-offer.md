---
title: Create a SaaS offer
description: Learn how to create a SaaS offer in Partner Center and configure the offer, Also, create an offer plan for the third-party apps purchased from Teams storefront and submit the offer for validation.
author: v-preethah
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high
ms.date: 04/06/2023
---

# Create your SaaS offer

:::row:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow1.png" link="include-saas-offer.md" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow2.png" link="prerequisites.md" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow3a.png" link="create-saas-offer.md" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow4.png" link="Test-preview-for-monetized-apps.md" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow5.png" link="publish-saas-offer-app.md" border="false":::
   :::column-end:::
:::row-end:::

Software as a Service (SaaS) offers allow you to license software solutions to customers through subscriptions. To sell your SaaS apps in Microsoft Teams Store, you must create an offer in Microsoft Partner Center. For any SaaS offer, you must add suitable plans that provide various subscription options. The users can select a suitable subscription that best suits their requirements.

> [!NOTE]
> You must have a [commercial marketplace account in Partner Center](/partner-center/create-account) to create offers.

The following table provides the three phases to create an offer and the steps involved in each phase:

| [1. Create an offer](#create-an-offer-in-partner-center) | [2. Configure the offer](#configure-your-saas-offer) | [3. Create a plan](#create-a-plan) |
| --- | --- | --- |
| Provide the following details: <br> - Offer ID <br> - Offer alias | - [Offer setup](#offer-setup) <br> - [Microsoft License Management](#set-up-microsoft-license-management) <br> - [Offer properties](#set-up-the-offer-properties) <br> - [Offer listing](#set-up-offer-details) <br> - [Preview audience](#set-the-preview-audience) <br> - [Technical configuration](#add-the-technical-information) | Provide the following details: <br> - Plan ID <br> - Plan name <br> - Pricing model <br> - Free trail |

## Create an offer in Partner Center

1. Sign in to [Partner Center](https://partner.microsoft.com/dashboard/home).

1. On the **Home** page, select **Marketplace offers**.

1. From the left pane, select **Overview**.

1. Select **New Offer** > **Software as a Service**.

   :::image type="content" source="~/assets/images/first-party-license-mgt/commercial-marketplace.png" alt-text="Screenshot shows the marketplace offer page where you can select new offer.":::

1. Enter **Offer ID** and **Offer alias**.

   > [!NOTE]
   > If you're creating an offer for testing, append **-ISVPILOT** to Offer alias. This informs the certification team that the offer is for testing purposes. Microsoft periodically deletes offers with **-ISVPILOT**. Therefore, refrain from using this tag for reasons other than testing.

1. Select **Create**. The offer is created and you can continue to configure the offer.

## Configure your SaaS offer

You must set up the offer with the required details, so that the offer is available for the right set of customers in the right marketplace with suitable options. Configure the offer based on the options you've decided in the planning phase.

### Offer setup

Offers sold through Microsoft are called transactable offers, which means Microsoft facilitates the exchange of money for a software license on the publisher's behalf.

To sell through Microsoft and have Microsoft facilitate transactions for you,

1. In the **Offer setup** tab, go to **Setup details**.

1. Select **Yes, I would like to sell through Microsoft and have Microsoft host transactions on my behalf**.

    :::image type="content" source="~/assets/images/first-party-license-mgt/saas-isvpilot.png" alt-text="Screenshot shows the offer setup page to set up license to manage for your app within Teams.":::

To manage transactions independently,

1. In the **Offer setup** tab, go to **Setup details**.

1. Select **No, I would prefer to only list my offer through the marketplace and process transactions independently**.

You can further select from one of the three [listing options](/partner-center/marketplace/plan-saas-offer) for your offer to get listed in the commercial marketplace.

### Set up Microsoft license management

If you decide to sell through Microsoft, you must further select if you want to allow Microsoft to manage licenses on your behalf.

1. If you would like Microsoft to manage customer licenses for you, select **Yes, I would like Microsoft to manage customer licenses on my behalf**.

1. If you want to manage customer licenses yourself, select **No, I would prefer to manage customer licenses myself**.

    > [!NOTE]
    >
    > * This is a one-time setting and you can't change it once the offer is published. This allows the customer to manage licenses for your app within Teams.
    > * The app manifest supports only one offer for an app. Select an appropriate license management solution for all the plans available in your offer.
    > The technical requirements and configuration differ based on the listing option.

### Test drive

A test drive is a great way to highlight your offer to potential customers by giving them access to a preconfigured environment for a fixed number of hours.

1. In the **Offer setup** tab, go to **Test drive**.

1. Select the **Enable a test drive** checkbox.

1. Select **Save draft**.

### Set up the offer properties

You define the categories and industries applicable to your offer, your app version, and legal contracts. You must provide complete and accurate details for the right set of customers to identify the offer.

In the **Properties** tab, update the following details:

1. **Category**: Select at least one or up to two categories.
1. **Industries**: Select up to two industries and two subindustries (also called verticals).
1. **App version**: Enter a suitable version number.
1. **Legal**: Provide terms and conditions for your offer. You can use standard contracts with some amendments or use your own terms and conditions.
1. Select **Save draft**.

### Set up offer details

In the **Offer listing** tab, update the following details:

1. **Name**: Update the offer name filled during offer creation, if required.
1. **Search results summary**: Enter a summary of up to 100 characters.
1. **Description**: Enter a description for your offer.
1. **Getting Started Instructions**: Provide instructions to help customers connect to your SaaS offer.
1. **Search keywords**: Add up to three search keywords (Optional).
1. **Privacy policy**: Enter a link to your organization's privacy policy, starting with https.
1. Select **Save draft**.

### Set the preview audience

You can define a maximum of ten audience who can review your SaaS offer before you publish it live. The email address must be either a Microsoft Accounts (MSA) or a Microsoft Entra ID email addresses.

In the **Preview Audience** page, update the following details:

1. Add the email addresses and an optional description.
1. To add another email address, select **Add another email**.
1. Select **Save draft**.

### Add the technical information

In the **Technical configuration** tab, update the following details:

1. Enter **Landing page URL**.
1. Enter the **Connection webhook** URL.
1. Enter **Azure Active Directory tenant ID**.
1. Enter **Azure Active Directory application ID**.
1. Select **Save draft**.

After the initial configuration, create plans with suitable purchase options.

## Create a plan

Transactable SaaS offers sold through the Microsoft commercial marketplace must have at least one plan. You can create one or more plans with different subscription options within the same offer.

1. From the left pane, select **Plan overview** > **+ Create new plan**.

1. Enter **Plan ID** and **Plan name**.

1. Select **Create**.

    :::image type="content" source="~/assets/images/first-party-license-mgt/plan-overview.png" alt-text="Screenshot shows plan overview to create a new plan for your apps in the Partner Center.":::

1. Select the plan listed under **Plan overview** to add pricing and availability information.

1. In the **Plan listing** tab, enter the **Plan name** and **Plan description**.

    :::image type="content" source="~/assets/images/first-party-license-mgt/plan-listing.png" alt-text="Screenshot shows the plan page to add plan name and plan description for your app.":::

1. Select **Save draft**.

1. Select **Pricing and availability** from the left pane.

1. Under **Markets**, select **Edit markets**.

1. In the **Edit markets** dialog, select the required market locations. You can select a minimum of one and a maximum of 141 markets.

1. Under **Pricing**, select **Flat rate** or **Per User**.
1. Under **User limits**, add **Minimum users** and **Maximum users**.
1. Under **Billing term**, select **Monthly**, **Annual**, or both.
1. For each billing term, enter the **Price** for each payment occurrence.

    :::image type="content" source="~/assets/images/first-party-license-mgt/pricing-availability.png" alt-text="Screenshot shows the pricing and availability page to add SaaS offer for your app.":::

1. Select **Save draft**.

### Add free trial

You can configure a free trial for each plan in your offer. This is different from the free trail in the listing option.

1. Under **Free Trial**, select **Allow a one-month free trial**.

1. Select **Save draft**.

After you create one or more plans, you can view the list of plans on the **Plan overview** tab. The page displays the plan name, plan ID, pricing model, availability (Public or Private), current publishing status, and any available actions.

   :::image type="content" source="~/assets/images/first-party-license-mgt/list-of-plans-created.png" alt-text="Screenshot shows plan listing page with service ID, pricing model, availability, status and action.":::

Copy the service ID of the plan to [integrate with usageRights Graph API](prerequisites.md#integrate-with-usagerights-graph-api) to manage user permissions at the time of app launch.

## Submit the offer

After you create the plan and configure the required information:

* The offer goes through a series of automated validation checks and preview offers are created.
* When the offer reaches the **Publisher signoff** phase, preview links for the respective platforms are given under **Go live**, to test the offer.

We recommended to test the offer with the given preview links before you publish the offer in the marketplace.

## Next step

> [!div class="nextstepaction"]
> [Test a SaaS offer](~/concepts/deploy-and-publish/appsource/prepare/Test-preview-for-monetized-apps.md)

## See also

* [Create plans for SaaS offer](/partner-center/marketplace/create-new-saas-offer-plans)
* [Test and publish SaaS offer](/partner-center/marketplace/test-publish-saas-offer)
* [Configure properties](/partner-center/marketplace/create-new-saas-offer-properties)
* [Configure offer listing](/partner-center/marketplace/create-new-saas-offer-listing)
* Configure [preview audience](/partner-center/marketplace/create-new-saas-offer-preview) and [technical details](/partner-center/marketplace/create-new-saas-offer-technical)
