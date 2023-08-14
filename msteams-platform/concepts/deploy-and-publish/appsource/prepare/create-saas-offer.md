---
title: Create your SaaS offer
description: Learn how to create a SaaS offer in Partner Center and configure the offer.
author: v-preethah
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high 
ms.date: 07/11/2023
---

# Create your SaaS offer

Create your offer in Partner Center and configure the offer to publish in the marketplace. The option to sell through Microsoft, details of the offer, and pricing are configured after creating the offer. Check if the prerequisites are fulfilled before you create a SaaS offer. You must also have a commercial marketplace account in Partner Center.

:::row:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow.png" link="include-saas-offer.md" border="false":::
   :::column-end:::
   :::column:::
      :::image type="icon" source="~/assets/images/saas-offer/monetize-flow-2.png" link="prerequisites.md" border="false":::
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

This guide helps you to create premium and enterprise SaaS offers on top of the existing basic free app.

## Create the offer in Partner Center

1. Sign in to [Partner Center](https://partner.microsoft.com/) and select **Partner Center**.

   :::image type="content" source="~/assets/images/first-party-license-mgt/partner-center-home-page.png" alt-text="The screenshots shows how to sign in to the Partner Center account.":::

1. On the **Home** page, select **Marketplace offers** tab to define commercial marketplace offers.

   :::image type="content" source="~/assets/images/first-party-license-mgt/home-page.png" alt-text="The screenshots shows the home page and Marketplace offer tab in the Partner Center.":::

1. Select **Overview** from the left pane.

1. Select **New Offer** > **Software as a Service**.

   :::image type="content" source="~/assets/images/first-party-license-mgt/commercial-marketplace.png" alt-text="The screenshots shows the marketplace offer page where you can select new offer.":::

1. Enter **Offer ID** and **Offer alias**.

   > [!NOTE]
   > If you're creating an offer for testing purposes, append the text **-ISVPILOT** to the end of your offer alias. This informs the certification team that the offer is for testing purposes. Microsoft periodically deletes offers with **-ISVPILOT**. Therefore, refrain from using this tag for reasons other than testing the license management capability.

   :::image type="content" source="~/assets/images/first-party-license-mgt/saas.png" alt-text="The screenshots shows how to enter Offer ID and Offer alias in the Partner Center.":::

1. Select **Create**.

## Configure your SaaS offer

Set up the offer by making the required configurations. You need to configure the offer setup, offer listing, technical configuration, plan, and pricing to publish and link your offer to your SaaS app. All that you have planned in the Plan your offer phase is done in the offer configuration.

### Set up offer selling

On the **Offer setup** tab, under **Setup** details, select whether to sell your offer through Microsoft or manage your transactions independently. Offers sold through Microsoft are called transactable offers, which means Microsoft facilitates the exchange of money for a software license on the publisher's behalf.

1. If you haven't added Offer Alias while creating the offer, enter a suitable Offer Alias name.

1. Select if you want to sell through Microsoft or not.

    1. To sell through Microsoft and have Microsoft facilitate transactions for you, in the Offer setup page, under **Setup** details, select the checkbox **Yes, I would like Microsoft to manage customer licenses on my behalf**.

    :::image type="content" source="~/assets/images/first-party-license-mgt/saas-isvpilot.png" alt-text="The screenshots shows the offer setup page to set up license to manage for your app within Teams.":::

    1. To list your offer through the commercial marketplace and process transactions independently, select **No**.

        * Select from the [listed options](/partner-center/marketplace/plan-saas-offer). You can change to a different listing option after publishing the offer.

        > [!NOTE]
        > The technical requirements and configuration differ based on the selection.

### Set up Microsoft License management

1. If you would like Microsoft to manage customer licenses for you, select **Yes, I would like Microsoft to manage customer licenses on my behalf**.

1. If you want to manage customer licenses yourself, select **No, I would prefer to manage customer licenses myself**.

:::image type="content" source="~/assets/images/first-party-license-mgt/saas-isvpilot.png" alt-text="The screenshots shows the offer setup page to set up license to manage for your app within Teams.":::

> [!NOTE]
>
> * This is a one-time setting and you can't change it once your offer is published. This allows the customer to manage licenses for your app within Teams.
> * The App manifest supports only one offer for an app. Select an appropriate license management solution for all the plans available in your offer and you can't change this option after the offer is pushed to live.

You can sell through Microsoft and also allow Microsoft to manage licenses on your behalf.

1. To enable a test drive, under **Test drive**, select the **Enable a test drive** checkbox.

    A test drive is a great way to highlight your offer to potential customers by giving them access to a preconfigured environment for a fixed number of hours.

1. Select **Save draft**.

### Set up the offer properties

On the **Properties** tab, you define the categories and industries applicable to your offer, your app version, and legal contracts. You must provide complete and accurate details for the offer to be identified by the right set of customers.

1. Under **Category**, select at least one and up to two categories for grouping your offer into the appropriate marketplace search areas.
1. Under **Industries**, select up to two industries and up to two subindustries (also called verticals) for each industry.
1. In the App version box, enter a version number.
1. Under **Legal**, provide terms and conditions for your offer. You can use standard contracts with some amendments or use your own terms and conditions.
1. Select **Save draft**.

### Set up offer details

On the **Offer listing** page, under **Marketplace details**, complete the following steps.

1. The Name box is prefilled with the name you entered earlier in the New offer dialog box. You can change the name at any time.
1. In the Search results summary box, enter up to 100 characters of text. This summary is used in the marketplace listing search results.
1. In the **Description** box, enter a description for your offer.
1. In the **Getting started** instructions box, provide instructions to help customers connect to your SaaS offer.
1. Optionally, you can add up to three search keywords.
1. In the **Privacy policy** link box, enter a link to your organization's privacy policy, starting with https.
1. Select **Save draft**.

### Set the preview audience

You can define a limited audience who can review your SaaS offer before you publish it live to the broader marketplace audience.

1. On the **Preview Audience** page, add a single Azure AD or MSA email address and an optional description in the boxes provided.
1. To add another email address, select the Add another email link.
1. Select **Save draft**.

### Add the technical information

On the **Technical configuration** tab, you define the technical details that the commercial marketplace uses to communicate to your SaaS application or solution.

1. Enter the landing page URL, that customers land on after acquiring your offer from the commercial marketplace and triggering the configuration process from the newly created SaaS subscription.
1. Enter the Connection webhook URL, for all asynchronous events that Microsoft needs to send to your SaaS subscription.
1. Enter Azure Active Directory tenant ID.
1. Enter Azure Active Directory application ID.
1. Select **Save draft**.

After the initial configurations are done, you need to create plans with suitable purchase options for the offer to be available in the marketplace.

### Create a plan

Offers sold as transactable SaaS offers must have at least one plan. To create a plan and submit the offer for validation, check [create a plan to purchase license](manage-third-party-apps-license.md).

## Code sample

| **Sample name** | **Description** | **Node.js** | **Manifest**|
|-----------------|-----------------|----------------|----------------|----------------|
| Tab App Monetization | This is a sample tab application that shows how to open a purchase dialog and trigger purchase flow using Teams JS SDK.|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-app-monetization/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-app-monetization/nodejs/demo-manifest/tab-app-monetization.zip)|

## Next step

> [!div class="nextstepaction"]
> [Set up Microsoft license management](manage-third-party-apps-license.md)

## See also

* [Configure properties](/partner-center/marketplace/create-new-saas-offer-properties)
* [Configure offer listing](/partner-center/marketplace/create-new-saas-offer-listing)
* Configure [preview audience](/partner-center/marketplace/create-new-saas-offer-preview) and [technical details](/partner-center/marketplace/create-new-saas-offer-technical)
* [Test and publish SaaS offer](/partner-center/marketplace/test-publish-saas-offer)
