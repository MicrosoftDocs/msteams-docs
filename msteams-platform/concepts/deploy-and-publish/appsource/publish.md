---
title: Overview - Teams app store publishing process
description: Describes the process for submitting your app to Partner Center and getting it published to the Microsoft Teams store (and AppSource).
ms.topic: overview
author: heath-hamilton
ms.author: surbhigupta
ms.localizationpriority: none
---
# Publish your app to the Microsoft Teams store

You can distribute your app directly to the store inside Microsoft Teams and reach millions of users around the world. If your app is also featured in the store, you can instantly reach potential customers.

Apps published to the Teams store also automatically list on [Microsoft AppSource](https://appsource.microsoft.com), which is the official marketplace for Microsoft 365 apps and solutions.

When you feel your app is production ready, you can begin the process of getting it listed on the Teams store.

> [!TIP]
> Following the pre-submission steps closely can increase the possibility that Microsoft approves your app for publishing.

1.	[Design you app](#design-your-app).

1.	[Build your app](#build-your-app).

1.	[Test your app](#test-your-app).

1.	[Publish your app](#publish-your-app).

1.	[Review the issues](#review-the-issues).


## Design your app

Review [store validation guidelines](/teams-store-validation-guidelines) early to ensure you build an app in line with store requirements. If your app is built in line with the guidelines, it prevents any rework due to non-adherence to store policies.

## Build your app

To publish your app to the Microsoft Teams store, you must [Create your Partner Center account](/create-partner-center-dev-account). If you run into any challenges with your Partner Center account, create a [support ticket](/azure/marketplace/partner-center-portal/support).

Review store validation guidelines once again to ensure that your app is aligned with store requirements. This helps reduce the number of issues observed in your app and consequently, the time taken to approve your app.


## Test your app

1. Validate your app package using Teams [Developer Portal](https://dev.teams.microsoft.com/home) to identify and fix any package errors.
   :::image type="content" source="../../../assets/images/submission/teams-validation-developer-portal.png" alt-text="store validation":::
1. Self-test your app thoroughly prior to app submission and ensure it adheres with store policies. Sideload the app in Teams and test the end-to-end user flows for your app. Ensure functionality works as expected, links aren't broken, user experience isn't blocked, and any limitations are clearly highlighted.
1. Test your app across desktop, web, and mobile clients. Ensure the app is responsive across different form factors.
1. Complete publisher verification before you submit your app. If you run into any issues, you can create a support ticket for resolution.
1. As you prepare for app submission, check the following as part of your submission package:
   1. Thoroughly verified app package (The app package is thoroughly verified)
   1. Include working admin and non-admin user credentials to test your app functionality (if your app offers a premium subscription model)
   1. Test instructions detailing app functionality and supported scenarios
   1. Setup instructions if your app requires additional configuration to access app functionality. Alternately, if your app requires complex configuration, you can also provide a provisioned demo tenant with admin access so that our validators can skip the configuration steps.
   1. Link to a demo video recording key user flows for your app (highly recommended)

## Publish your app
 
After you’ve reviewed the validation report, reply to the email thread with any queries related to the validation report or if you need any additional support to resolve the reported issues.

Ensure you've adequate developer bandwidth to resolve any reported issues until the app is approved.

Ensure you've resolved all issues reported to you by the concierge service (teamsubm@microsoft.com) before sharing your app package for further testing. This helps reduce the number of iterations required to validate your app and, the time taken to approve your app.

> [!NOTE]
> Avoid changing app functionality during the validation process. This may lead to discovery of new issues and increase the time it takes to approve your app.

## Review the issues

### Deep functional and experience tests

Your app is thoroughly reviewed by a validator to ensure compliance with [Microsoft Commercial Marketplace certification policies](/legal/marketplace/certification-policies) with a focus on deep functional and user experience testing, usability checks, and metadata checks. App validation is performed across desktop, web, and mobile clients.

### Guided app publish through concierge service

If there are no issues observed with your app, your app will be approved and published to Teams store. If there are issues, you'll receive an automated validation report from Partner Center with failure details. To help you successfully publish your app to Teams store and guide you through this process, we send a personalized email from our concierge service (teamsubm@microsoft.com) with the following information:

* Summary of all issues
* Details of failures/issues with policy links and categorization:
  * Mandatory fix: These issues need to be fixed prior to app approval.
  * Suggested fix: These may be fixed post app approval as these are recommendations to improve your app’s experience.
  * Blocker: These prevent us from testing your app functionality and need to be resolved for validation to continue.
  * Query: These may be shared to get answers to specific questions related to your app.
* Detailed reproduction steps (including written instructions, videos).
* Recommendations to fix reported issues with links to guidance docs.

After you've reviewed this list of issues, fix all the reported issues and share the updated app package over email, for us to re-validate your app thoroughly. If you've any queries related to the reported issues, contact us at teamsubm@microsoft.com.

If there are remaining issues or if regression issues are observed in the app, we’ll share an updated validation report with you. If your app had blockers, you may see new issues reported when your app is validated after resolution of blockers. Occasionally, we also notice regression issues in apps post deployment of fixes. It takes a few re-submissions to close all issues for an app with bugs and get it approved for store publish.
After all reported issues are closed and final submission is made in the Partner Center, we’ll approve and publish your app. Allow at least one business day for the app to be available in Teams store.

## See also

* [Publishing to Microsoft 365 App Stores](/office/dev/store/)
* [Upload your Teams app](~/concepts/deploy-and-publish/apps-upload.md)
* [Publish your Teams app to your org](/MicrosoftTeams/tenant-apps-catalog-teams?toc=/microsoftteams/platform/toc.json&bc=/MicrosoftTeams/breadcrumb/toc.json)
* [Plan onboarding experience for users](../../design/understand-use-cases.md#plan-the-onboarding-experience)
* [Distributing tab apps on mobile](../../../tabs/design/tabs-mobile.md#distribution)
* [Test preview for monetized apps](prepare/Test-preview-for-monetized-apps.md)
