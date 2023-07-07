---
title: In-app purchase flow for the monetization of apps
description: Learn the basic tasks and concepts needed to implement in-app purchases and trial functionality in teams apps.
author: v-npaladugu
ms.author: surbhigupta
ms.topic: how-to
ms.localizationpriority: high 
ms.date: 01/31/2023
---

# Create and configure your SaaS offer

Plan and  prepare > **Create and configure** > Test and publish > Publish with offer configured

Before you create a SaaS offer, check if the technical requirements and configurations are in place. You must also have a commercial marketplace account in Partner Center. It's time to officially create, configure, test, and publish your transactable SaaS offer.

## Create the offer

Creating your SaaS offer is quick if you have all the requirements in place.

1. From your Partner Center, click New offer.
1. Select Software as a Service from the drop-down list.
1. Enter Offer ID and Offer alias value.
1. Select **Create**.

## Configure your SaaS offer

Make the required configurations and setups for the offer. The offer setup, offer listing, technical configuration, plan, and pricing are to be configured for your offer to be published and linked to your SaaS app. All that you have planned in the Plan your offer phase are done in the offer configuration.

### Offer setup

On the **Offer setup** tab, under **Setup** details, choose whether to sell your offer through Microsoft or manage your transactions independently. Offers sold through Microsoft are called transactable offers, which means that Microsoft facilitates the exchange of money for a software license on the publisher's behalf.

If you haven't added Offer Alias while creating the offer, enter a suitable Offer Alias name.

1. To sell through Microsoft and have Microsoft facilitate transactions for you, select Yes.
    * If you would like Microsoft to manage customer licenses for you, select Yes. If you select yes, you must integrate with Microsoft Graph APIs to verify customer eligibility. For details on how to integrate, see Integrate your SaaS offer with Graph API for License Management
    * If you want to manage customer licenses yourself, select No.
1. To sell your offer through Microsoft, under Setup details, select the Yes.
    If you want to manage transactions independently, select No. The technical requirements and configuration differ based on the selection.
1. To list your offer through the commercial marketplace and process transactions independently, select No and then choose from the [listed options](/partner-center/marketplace/plan-saas-offer). You can change to a different listing option after publishing the offer.

1. To enable a test drive, under **Test drive**, select the **Enable a test drive** checkbox.

    A test drive is a great way to showcase your offer to potential customers by giving them access to a preconfigured environment for a fixed number of hours.

### Configure Properties

On the Properties tab, you'll define the categories and industries applicable to your offer, your app version, and legal contracts. Be sure to provide complete and accurate details about your offer on this page, so that it's displayed appropriately and offered to the right set of customers.

* Under Category, select at least one and up to two categories for grouping your offer into the appropriate marketplace search areas.
* Under Industries, you can select up to two industries and up to two sub-industries (also called verticals) for each industry.
* In the App version box, enter a version number. The app version is used in the AppSource marketplace to identify the version number of your offer.
* Under Legal, provide terms and conditions for your offer. You can use standard contract with some amendments or use own terms and conditions.

### Offer listing

On the Offer listing page, under Marketplace details, complete the following steps.

* The Name box is prefilled with the name you entered earlier in the New offer dialog box. You can change the name at any time.
* In the Search results summary box, enter up to 100 characters of text. This summary is used in the marketplace listing search results.
* In the Description box, enter a description for your offer.
* In the Getting started instructions box, provide instructions to help customers connect to your SaaS offer.
* Optionally, you can add up to three search keywords.
* In the Privacy policy link box, enter a link to your organization's privacy policy, starting with https.

### Preview audience

You can define a limited audience who can review your SaaS offer before you publish it live to the broader marketplace audience.

On the Preview Audience page, add a single Azure AD or MSA email address and an optional description in the boxes provided.
To add another email address, select the Add another email link.
Select Save draft before continuing to the next tab: Technical configuration.

### Technical configuration

On the Technical configuration tab, you'll define the technical details that the commercial marketplace uses to communicate to your SaaS application or solution.

1. Enter the landing page URL, that customers will land on after acquiring your offer from the commercial marketplace and triggering the configuration process from the newly created SaaS subscription.
1. Enter Connection webhook URL, for all asynchronous events that Microsoft needs to send to your SaaS subscription.
1. Enter Azure Active Directory tenant ID.
1. Enter Azure Active Directory application ID.

Select Save draft before continuing to the next tab: Plan overview.

### Plan Overview

Offers sold through the Microsoft commercial marketplace must have at least one plan. You can create a variety of plans with different options within the same offer.

When you finish configuring your offer, validate the offer and submit your offer for publishing.

When the offer is submitted for publishing, the Offer overview page shows the Publish status where you can track the progress. When the offer is in Publisher sign-off state, preview links for the respective platforms are given below the Go live button. To test the offer, see preview and test your offer.

## In-app purchases

Microsoft Teams provides APIs that you can use to implement the in-app purchases to upgrade from free to paid Teams apps. In-app purchase allows you to convert users from free to paid plans directly from your app.

In-app purchases allow users to purchase a new paid subscription and it doesn't enable the users to purchase additional or different licenses with existing paid subscriptions. To switch between plans, an existing user subscription must be canceled before a new subscription can be purchased through in-app purchases.

> [!NOTE]
> In-app purchases is supported only in [personal app contexts](~/concepts/design/app-structure.md#personal-apps).

### Implement in-app purchases

To offer an in-app purchase experience to the users of your app, ensure the following:

* App is built with [Microsoft Teams JavaScript client library (TeamsJS)](https://github.com/OfficeDev/microsoft-teams-library-js).

* App is enabled with a transactable [SaaS offer](~/concepts/deploy-and-publish/appsource/prepare/include-saas-offer.md).

* App is enabled with [RSC permissions](#update-manifest).

* App is invoked with [`openPurchaseExperience` API](#purchase-experience-api).

In-app purchase experience can be enabled either by updating `manifest.json` file or by enabling **Show in-app purchase offers** from **Permissions** section of your **Developer Portal**.

#### Update manifest

To enable in-app purchase experience, update your Teams app `manifest.json` file by adding the RSC permissions. It allows your app users to upgrade to a paid version of your app and start using new functionalities. The update for app manifest is as follows:

```json

"authorization": {
    "permissions": {
        "resourceSpecific": [
            {
                "name": "InAppPurchase.Allow.User",
                "type": "Delegated"
            }
        ]
    }
}
```

#### Purchase Experience API

To trigger in-app purchase for the app, invoke the `openPurchaseExperience` API from your web app.

Following code snippet is an example of calling the API from the Teams app built using Microsoft Teams JavaScript client library:

# [TeamsJS v1](#tab/jsonV11)

```json
<div> 
<div class="sectionTitle">openPurchaseExperience</div>
<button onclick="openPurchaseExperience()">openPurchaseExperience</button>
</div>
</body>
<script>
   function openPurchaseExperience()
      microsoftTeams.initialize();
      let callbackcalled = false;
      microsoftTeams.monetization.openPurchaseExperience((e) => {
            console.log("callback is being called");
            console.log(e);
            if (!!e && typeof e !== "string") {
                  alert(JSON.stringify(e));
              }
              return;
            });
      console.log("after callback: ",callbackcalled);
    }
</script>
```

# [TeamsJS V2](#tab/jsonV2)

```json
<div>
<div class="sectionTitle">openPurchaseExperience</div>
<button onclick="openPurchaseExperience()">openPurchaseExperience</button>
</div>
</body>
<script>
    function openPurchaseExperience() {
      micorosftTeams.app.initialize();
      var planInfo = {
          planId: "<Plan id>", // Plan Id of the published SAAS Offer
          term: "<Plan Term>" // Term of the plan.
      }
      monetization.openPurchaseExperience(planInfo);
    }
</script>
```

---

## Next step

> [!div class="nextstepaction"]
> [Test preview for monetized apps](~/concepts/deploy-and-publish/appsource/prepare/Test-preview-for-monetized-apps.md)

## See also

* [Monetize your app](monetize-overview.md)
* [App Manifest](../../../../resources/schema/manifest-schema-dev-preview.md)
