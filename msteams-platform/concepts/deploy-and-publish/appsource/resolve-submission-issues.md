---
title: Resolve issues with your store submission
description: Troubleshoot and correct problems with your Microsoft Teams store submission. Get help directly from Microsoft, resolve issues and resubmit your app.
ms.topic: how-to
author: heath-hamilton
ms.author: surbhigupta
ms.localizationpriority: medium
---
# Resolve issues if your Teams store submission fails

Apps published to the Microsoft Teams store must meet the [Teams store validation guidelines](~/concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md) and [commercial marketplace policies](/legal/marketplace/certification-policies).

If your store submission fails, Microsoft provides a concierge validation service to help get your app compliant and published.

## Get help directly from Microsoft

The concierge validation service provided by Microsoft helps developers get their apps published to the Teams store. As part of this service, Microsoft verifies if your app works as described, contains all appropriate metadata, and provides value to users.

If your app submission fails, Microsoft sends you a review report with recommendations within 24 hours of submission.

## Resolve issues and resubmit your app

You must fix all issues reported by the Microsoft concierge validation team before resubmitting your app on Partner Center. The Microsoft report includes the following information:

* A corresponding [validation guideline](~/concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md) for each issue.
* Instructions on how to reproduce each issue.
* Recommendations for resolving each issue based on publicly available developer documentation.

The process for resolving issues and resubmitting an app typically goes like this:

1. You fix all issues in the report.
1. You send the following to the Microsoft concierge validation team at <a href="mailto:teamsubm@microsoft.com">teamsubm@microsoft.com</a>:
   * An updated app package
   * Test notes for your app, if you didn't include these in your original submission:
      * Credentials for at least two accounts (one admin and one non-admin).
      * Instructions to configure the app and test its functionality.
      * A video showing your app used in Teams.
1. Microsoft concierge validation team fully tests your updated app.
1. You do one of the following steps:
   * If your app is free of issues, resubmit your app on Partner Center.
   * If issues aren't resolved or Microsoft finds new issues, you receive another report on what to fix. Resolve those issues and send an updated version of the app to <a href="mailto:teamsubm@microsoft.com">teamsubm@microsoft.com</a>.

> [!CAUTION]
> To avoid multiple submission failures, do not resubmit your app on Partner Center until the Microsoft concierge validation team approves your app.

## FAQ

Get answers to some common questions when resolving app submission issues.

<br>

<details>

<summary><b>How long will it take to publish my app?</b></summary>

If your store submission has no issues, your app will publish within 1-2 business days. If your app fails, a team from Microsoft provides you with recommendations to fix the issues. Once you make those fixes and resend an updated app to that team, you'll be notified in 24 hours if your app is ready to publish, or still needs more work.

<br>

</details>

<details>

<summary><b>How do I increase the likelihood my app will pass submission?</b></summary>

Doing the following can lead to a successful submission:

1. Develop your app based on the [Teams design guidelines](~/concepts/design/design-teams-app-overview.md).
1. Make sure your app adheres to the [Teams store validation guidelines](~/concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md) and [Microsoft commercial marketplace certification policies](/legal/marketplace/certification-policies).
1. Test your app package with the [Microsoft Teams app validation tool](https://dev.teams.microsoft.com/appvalidation.html).
1. [Prepare your Teams store submission](~/concepts/deploy-and-publish/appsource/prepare/submission-checklist.md).

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

<summary><b>I received an email from Partner Center saying my app was approved to publish. Why isn't my app in the Teams store?</b></summary>

Once your app is approved, publishing usually takes 1-2 business days depending on the app's capabilities. If your app hasn't published after two business days, contact <a href="mailto:teamsubm@microsoft.com">teamsubm@microsoft.com</a>.

<br>

</details>

## See also

[Distribute your Microsoft Teams app](../apps-publish-overview.md)
