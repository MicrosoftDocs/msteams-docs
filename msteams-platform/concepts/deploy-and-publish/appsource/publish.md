---
title: Publish App on Teams Store
description: Publish your app to Microsoft Teams Store or AppSource. What to expect after you submit, tips for rapid approval and publishing apps linked to a SaaS offer.
ms.topic: overview
author: heath-hamilton
ms.localizationpriority: high
ms.date: 08/17/2026
---
# Publish your app to the Teams Store

Publish your app to the Microsoft Teams Store to make it available to Teams users.
Apps published to the Teams Store are automatically listed on [the Microsoft commercial marketplace](https://appsource.microsoft.com).

This article explains how to submit your app, track the certification process, and monitor your submission status.

<!--The following video on publish your Teams app to Teams Store outlines the steps involved in the app publishing process:

<br>

> [!VIDEO https://www.youtube.com/embed/cFqAuLy0JaE]-->

## Understand the publishing process

If your app is production ready, you can begin the process of getting it listed on the Teams Store.

:::image type="content" source="../../../assets/images/submission/teams-app-store-publish-process.png" alt-text="Diagram shows the Teams Store publishing process for Teams apps." lightbox="../../../assets/images/submission/teams-app-store-publish-process.png":::

1. [Review the Teams Store validation guidelines](~/concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md) to ensure your app meets Teams app and Teams Store standards.

1. [Create a Partner Center developer account](~/concepts/deploy-and-publish/appsource/prepare/create-partner-center-dev-account.md).

1. [Prepare your Teams Store submission](~/concepts/deploy-and-publish/appsource/prepare/submission-checklist.md), including running automated tests, compiling test notes, creating a Teams Store listing, to help expedite the review process.

1. [Submit your app](/office/dev/store/add-in-submission-guide) through Partner Center.

1. If your submission fails, work with Microsoft directly to [resolve the issues and resubmit your app](~/concepts/deploy-and-publish/appsource/resolve-submission-issues.md).

## What to expect after you submit your app?

* **Deep functional and experience tests**

  Your app is thoroughly reviewed by a validator to ensure compliance with the [Microsoft Commercial Marketplace certification policies](/legal/marketplace/certification-policies).
  There's a focus on deep functional and user experience testing, usability checks, and metadata checks. App validation is performed across desktop, web, and mobile clients. We work hard to provide you with a detailed test report in 24 working hours post submission.

* **Guided app publish through concierge service**

    After submission, Microsoft validates your app. If issues are identified, you receive a validation report with details about the issues and recommended remediation steps. To help you successfully publish your app to the Teams Store and guide you through this process, the validation team sends you a personalized email from our concierge service [teamsubm@microsoft.com](mailto:teamsubm@microsoft.com) that includes the following information:

  * Summary of all issues

  * The validation report categorizes issues as:

  * Must fix: Issues must be fixed prior to app approval.

  * Good-to-fix: Issues can be fixed post app approval as the issues are recommendations to improve your app’s experience.

  * Blocker: Issues prevent the validation team from testing your app functionality further and must be resolved for validation to continue.

  * Query: Queries can be shared to get answers to specific questions related to your app.

  * Steps to recreate issues through written instructions or video format.

  * Recommendations to fix the reported issues with links to guidance docs.

   After addressing the reported issues, submit an updated app package for revalidation. The validation process continues until all required issues are resolved and the app meets Teams Store requirements.Allow at least one business day for the app to be available in the Teams Store.

* **Analyze app usage**

  After your app is approved and published, you can track your app usage in the [Teams app usage report](/office/dev/store/teams-apps-usage) in Partner Center. Metrics include Monthly, Daily, and Weekly active users, and retention and intensity charts enabling you to track churn and frequency of usage.

  Data for newly published apps takes about a week to appear in the report.

## Tips for rapid approval to publish your app

The following flowchart summarizes the recommended activities during the design, submission preparation, and post-submission phases to help reduce validation issues and streamline the Teams Store approval process.

:::image type="content" source="../../../assets/images/submission/tips-publish-apps-workflow.png" alt-text="Diagram shows the Teams Store tips for publishing your Teams apps." lightbox="../../../assets/images/submission/tips-publish-apps-workflow.png":::

* **During design phase**

Review the Teams Store validation guidelines early in the design phase to ensure that you build your app in alignment with the Teams Store requirements.
 Starting July 2026, if your app is channel-enabled, all new Teams Store submissions must use manifest schema version 1.25 or later.

* **Prior to app submission**

 1. Create your Partner Center account well in advance. If you run into any challenges with your account, create a [support ticket](/azure/marketplace/partner-center-portal/support).

 1. Complete [publisher verification](/azure/active-directory/develop/publisher-verification-overview) before you submit your app.

 1. Test and retest your app:
 1. Validate your app package using the Teams [Developer Portal](https://dev.teams.microsoft.com/home) to identify and fix any package errors.
 1. Self-test your app thoroughly prior to app submission to ensure it adheres to Teams Store policies.
 1. Test your app across desktop, web, and mobile clients.
 1. Set up instructions if your app requires more configuration to access app functionality.
  
* **Post app submission**

  * After you’ve reviewed the validation report, reply to the email thread with any queries related to the validation report, or if you need any extra support to resolve the reported issues.

  * Ensure that you've adequate developer bandwidth to resolve any reported issues until the app is approved.

  * Ensure that you've [resolved all issues](/microsoftteams/platform/concepts/deploy-and-publish/appsource/resolve-submission-issues) reported to you by the concierge service [teamsubm@microsoft.com](mailto:teamsubm@microsoft.com) before sharing your app package for further testing.
  
  * Avoid changing app functionality during the validation process that might lead to discovery of new issues and increase the time it takes to approve your app.

## Additional tips for rapid approval to publish your app linked to a SaaS offer

Use the following flowchart to help streamline the validation process for apps linked to a SaaS offer. Reviewing compliance requirements early, preparing your offer configuration correctly, and validating end-to-end subscription workflows before submission can help reduce validation issues and avoid unnecessary resubmissions.

:::image type="content" source="../../../assets/images/submission/additional-tips-to-publish-apps.png" alt-text="Diagram shows the additional tips for publishing your Teams apps." lightbox="../../../assets/images/submission/additional-tips-to-publish-apps.png":::

* **During design phase**

Review the [Teams Store validation guidelines specific to apps published with linked SaaS offers](~/concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md#apps-linked-to-saas-offer) to ensure that you build your app in alignment with the Teams Store requirements and [Microsoft Commercial Marketplace policies applicable to Teams apps linked to SaaS offers](/legal/marketplace/certification-policies#11405-teams-app-linked-to-software-as-a-service-saas-offers).

* **Prior to app submission**

  As you prepare for app submission, ensure the following details:

   1. Your app is linked to a live (already published) SaaS offer on AppSource with at least one plan with pricing information.

   1. You've correctly mentioned the `subscriptionOffer` details in your [app manifest](/microsoft-365/extensibility/schema/root#subscriptionoffer) in the format `publisherId.offerId`.

   1. You must ensure your linked SaaS offer is designed to support licenses assigned on a [SaaS pricing model](/azure/marketplace/create-new-saas-offer-plans).

   1. Include test instructions or setup instructions or link to a demo video detailing app functionality and supported scenarios and any additional information to enable our testers to easily understand your SaaS portal workflows.

   1. You must thoroughly [self-test](~/concepts/deploy-and-publish/appsource/prepare/test-preview-for-monetized-apps.md) the end to end purchase and license management workflows.

    Before you submit your app linked to a SaaS offer for validation, ensure the following details:

    1. Both admin and non-admin users can place an order and confirm the purchase of your subscription. Purchasers can navigate to the SaaS application landing page by selecting  **Setup Now** in the Microsoft Admin Center.

    1. The **Manage Subscriptions** section in Microsoft Admin Center shows the correct details of the subscriptions brought by your test users. Subscription status, number of licenses, and other details must be accurate.

    1. Buying and removal of license workflows are working as expected.

    1. Ensure purchasers can increase the number of licenses from Microsoft Admin Center.

    1. Subscription cancellation is working as expected. Purchasers can cancel a subscription. Check if the correct subscription status is reflected in the Microsoft Admin Center and your SaaS application post cancellation. Verify that the purchaser has lost access to the subscription after successful cancellation.

    1. Repurchasing a subscription is seamless. After cancellation of an active subscription, thoroughly test to ensure purchasers can repurchase the subscription.

    1. Purchasers can change their subscribed plan. After the plan is modified, users can access the upgraded or downgraded plan features.

## Teams Store search experience

After an app is published to the Teams Store, users can find apps by going to the **Apps** icon from the left pane in Teams. Users can use the search box in the upper left corner or browse by category to see if a particular app or program has a version for Teams.

Teams provides intelligent search experience by matching the user input to the fields provided by the developer across appName, publisher name, short description, long description, specific keywords and category names in app manifest or Partner Center. The search results display apps that are closest match to the user's specified characters.

## Training module

| **Training name** | **Description** |
| --- | --- |
| [Publish Teams apps in Microsoft Teams Store](/training/modules/microsoft-teams-publish-app-to-store/) | This training module is about publishing your app to Teams Store. It focuses primarily on app validation process. |

## See also

* [Publish to Microsoft 365 App Stores](/office/dev/store/)
* [Upload your Teams app](~/concepts/deploy-and-publish/apps-upload.md)
* [Publish your Teams app to your org](/microsoftteams/tenant-apps-catalog-teams?toc=/microsoftteams/platform/toc.json&bc=/microsoftteams/breadcrumb/toc.json)
* [Plan onboarding experience for users](../../design/planning-checklist.md#plan-beyond-app-building)
* [Publish tab apps on mobile](../../../tabs/design/tabs-mobile.md#publish-to-teams-store)
* [Test preview for monetized apps](prepare/Test-preview-for-monetized-apps.md)
* [Microsoft Teams Store ranking parameters](post-publish/teams-store-ranking-parameters.md)
* [Common reasons for app validation failure](common-reasons-for-app-validation-failure.md)
