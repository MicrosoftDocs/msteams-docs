---
title: Fix Store Submission Issues/Failures
description: Troubleshoot and correct problems with your Microsoft Teams Store submission. Get help directly from Microsoft, resolve issues and resubmit your app.
ms.topic: how-to
author: heath-hamilton
ms.author: surbhigupta
ms.localizationpriority: medium
ms.date: 09/28/2022
---
# Resolve issues if your Teams Store submission fails

Apps published to the Microsoft Teams Store must meet the [Teams Store validation guidelines](~/concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md) and [commercial marketplace policies](/legal/marketplace/certification-policies).

If your Teams Store submission fails, Microsoft provides a concierge validation service to help get your app compliant and published.

## Get help directly from Microsoft

The concierge validation service provided by Microsoft helps developers get their apps published to the Teams Store. As part of this service, Microsoft verifies if your app works as described, contains all appropriate metadata, and provides value to users.

If your app submission fails, Microsoft sends you a review report with recommendations within 24 hours of submission.

### Resolve issues and resubmit your app

After you receive the review report, you must fix all issues reported by the Microsoft concierge validation team before resubmitting your app on Partner Center.

The Microsoft report includes the following information:

* A corresponding [validation guideline](~/concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md) for each issue.
* Instructions on how to reproduce each issue.
* Recommendations for resolving each issue based on publicly available developer documentation.

After resolving all issues shared in the review report, submit your updated app the to Partner Centre. Send the following to the Microsoft concierge validation team at <a href="mailto:teamsubm@microsoft.com">teamsubm@microsoft.com</a>:

* Updated app package
* Test notes for your app, if they weren't included in your original submission:
  * Credentials for at least two accounts (one admin and one non-admin).
  * Instructions to configure the app and test its functionality.
  * A video showing your app used in Teams.

Let's look at the process to resubmit the app to Teams Store.

:::image type="content" source="../../../assets/images/submission/resolve-submission-issues.png" alt-text="Infographic shows the process to resolve issues before resubmitting the app to Partner Centre":::

Following app submission, the process for resolving issues and resubmitting an app involves the following steps:

1. Microsoft concierge validation team takes the updated app through functional and experience testing. Following the testing, the app validation may either pass or fail.
1. If the app passes the testing process, it is listed on the Teams Store.
1. If the app fails the testing process, the Microsoft concierge validation team sends you a detailed report with recommendations for resolving issues found in the app. You can expect to receive this report within 24 hours of your app's functional and experience testing.
1. Resolve the issues shared in the report sent by the Microsoft concierge validation team.
1. Resubmit your updated app to <a href="mailto:teamsubm@microsoft.com">teamsubm@microsoft.com</a> after resolving issues, so that the app may be tested again.

The process continues till the app is found fully validated as per Microsoft validation guidelines.

> [!CAUTION]
> To avoid multiple submission failures, resubmit your app on Partner Center only after the Microsoft concierge validation team approves your app.

## FAQ

Get answers to some common questions when resolving app submission issues.

<br>

<details>

<summary><b>How long does it take to publish my app?</b></summary>

If your Teams Store submission has no issues, your app is published within 1-2 business days. If your app fails, a team from Microsoft provides you with recommendations to fix the issues. After you resolve issues and resend an updated app to that team, you'll be notified in 24 hours if your app is ready to publish, or still needs more work.

<br>

</details>

<details>

<summary><b>How do I increase the likelihood my app will pass submission?</b></summary>

Doing the following can lead to a successful submission:

1. Develop your app based on the [Teams design guidelines](~/concepts/design/design-teams-app-overview.md).
1. Make sure your app adheres to the [Teams Store validation guidelines](~/concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md) and [Microsoft commercial marketplace certification policies](/legal/marketplace/certification-policies).
1. Test your app package with the [Microsoft Teams app validation tool](https://dev.teams.microsoft.com/appvalidation.html).
1. [Prepare your Teams Store submission](~/concepts/deploy-and-publish/appsource/prepare/submission-checklist.md).

<br>

</details>

<details>

<summary><b>My app is in beta testing. Can I submit my app anyway to save time on the publishing process?</b></summary>

No. Microsoft only validates production-ready apps.

<br>

</details>

<details>

<summary><b>May I contact the teamsubm@microsoft.com email before submitting my app for the first time on Partner Center?</b></summary>

No. Microsoft doesn't start validating your app until you submit your app for the first time on Partner Center.

<br>

</details>

<details>

<summary><b>I received an email from Partner Center saying my app was approved to publish. Why isn't my app in the Teams Store?</b></summary>

Once your app is approved, publishing usually takes 1-2 business days depending on the app's capabilities. If your app hasn't published after two business days, contact <a href="mailto:teamsubm@microsoft.com">teamsubm@microsoft.com</a>.

<br>

</details>

## See also

[Distribute your Microsoft Teams app](../apps-publish-overview.md)
