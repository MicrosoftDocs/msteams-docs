---
title: Fix Store Submission Issues/Failures
description: Troubleshoot and correct problems with your Microsoft Teams Store submission. Get help directly from Microsoft, resolve issues, and resubmit your app.
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

The Microsoft concierge validation service provided by Microsoft helps developers get their apps published to the Teams Store. As part of this service, Microsoft verifies if your app works as described, contains all appropriate metadata, and provides value to users.

If your app submission fails, Microsoft sends you a review report with recommendations within 24 hours of submission.

## Resolve issues and resubmit your app

For your app to be listed on the Teams Store, it must pass both functional and validation tests. Here's the process to ensure successful listing of your app.

:::image type="content" source="../../../assets/images/submission/resolve-submission-issues.png" alt-text="The image illustrates the process for resolving issues prior to resubmitting the app on Partner Center.":::

To list your app on the Teams Store, submit it on the Partner Center. Your app must undergo functional and validation tests. It might follow one of these two flows:

* **Successful Functional and Validation Testing**
  After the app successfully passes both functional and validation testing, it gets listed on the Teams Store.

* **Failure in Functional and Validation Testing**
  Expect to receive the review report within 24 hours after the functional and experience testing of your app. Address all issues before resubmitting your app on the Partner Center. Here's the process to fix all issues and resubmit your app:

    1. Microsoft concierge validation team shares a review report with you.
        <details>
        <summary>Select to view review report contents.</summary>

        * A [validation guideline](~/concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md) corresponding for each issue.
        * Instructions on how to reproduce each issue.
        * Recommendations for resolving each issue based on publicly available developer documentation.

        </details>

    1. Fix all issues shared in the validation team's review report.

    1. Send the updated app to the validation team at <a href="mailto:teamsubm@microsoft.com">teamsubm@microsoft.com</a>:

        <details>
        <summary>Select to view the contents for app testing.</summary>

        * Updated app package
        * Testing notes for your app, if they were not part of your initial submission:
            * Login details for a minimum of two accounts (one administrator account and one non-administrator account).
            * Instructions to configure the app and test its functionality.
            * A video demonstrating your app operating in Teams.

        </details>

    1. The validation team conducts functional and experience testing on the updated app. The app validation might either succeed or fail.

        * If the app passes the testing process, it becomes eligible for listing on the Teams Store. You can resubmit the app on Partner Center.
        * If the app fails the testing process, the validation team provides a review report that includes issues and recommendations to resolve them.

            1. Fix all issues shared in the review report provided by the validation team.

            1. Submit your updated app package and test notes to the validation team at <a href="mailto:teamsubm@microsoft.com">teamsubm@microsoft.com</a>.

            This allows the validation team to conduct another round of testing on your app. The process continues until the app fully complies with the validation guidelines.

            > [!CAUTION]
            > To prevent repeated submission failures, resubmit your app on Partner Center only after the validation team has approved your app.

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

Once your app is approved, publishing usually takes 1-2 business days depending on the app's capabilities. If your app isn't published after two business days, contact <a href="mailto:teamsubm@microsoft.com">teamsubm@microsoft.com</a>.

<br>

</details>

## See also

[Distribute your Microsoft Teams app](../apps-publish-overview.md)
