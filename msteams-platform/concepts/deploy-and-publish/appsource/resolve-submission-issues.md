---
title: Resolve issues with your store submission
description: Understand how to troubleshoot and correct problems with your Microsoft Teams store submission. 
ms.topic: how-to
author: heath-hamilton
ms.author: surbhigupta
---
# Resolve issues if your Microsoft Teams store submission fails

If your Teams store submission doesn't pass validation, Microsoft provides resources and guidance to help get your app published.

## Check the validation report

After submitting your app to Partner Center, you can expect a validation report from <a href="mailto:teamsubm@microsoft.com">teamsubm@microsoft.com</a>. The report includes reasons why your app failed.

## Get help directly from Microsoft

Microsoft can assist developers in getting their apps published. If your app fails submission, you'll be contacted by a Microsoft team for next steps. This may include a meeting with Microsoft to discuss your app's intended functionality, issues with the submission, and recommendations for fixing these issues.

If you didn't provide the following with your submission, send the following to the Microsoft team you're working with to help them test your app:

* Credentials for at least two accounts (one admin and one non-admin).
* Integration, configuration, and any other steps required to test the app's functionality.
* A video showing your app used in Teams.

## Resolve issues and resubmit your app

Microsoft provides you a detailed report with a list of issues that caused your app to fail submission. For each issue, the report includes a corresponding [validation guideline](~/concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md), instructions on how to reproduce it, and recommendations for resolving it based on publicly available developer documentation. You must resolve all issues in the report to pass submission.

This process for resolving issues and resubmitting an app typically goes like this:

1. You fix all issues in the report.
1. You send your updated app package to <a href="mailto:teamsubm@microsoft.com">teamsubm@microsoft.com</a>.
1. Microsoft fully tests your updated app.
1. You do one of the following:
   * If your app is free of issues, resubmit your app on Partner Center.
   * If issues aren't resolved or new issues are found, resolve these and send an updated version of the app to <a href="mailto:teamsubm@microsoft.com">teamsubm@microsoft.com</a>.

> [!CAUTION]
> To avoid multiple submission failures, do not resubmit your app on Partner Center until the Microsoft team you're working with approves your app.

## FAQ

### How long will it take to publish my app?

If your store submission has no issues, your app will publish within 1-2 business days. If your app fails, a team from Microsoft provides you with recommendations to fix the issues. Once you make those fixes and resend an updated app to that team, you will be notified in 24 hours if your app is ready to publish or still needs more work.

### How do I increase the likelihood my app will pass submission?

Doing the following can lead to a successful submission:

1. Develop your app based on the [Teams design guidelines](~/concepts/design/design-teams-app-overview.md).
1. Make sure your app adheres to the [Teams store validation guidelines](~/concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md) and [Microsoft commercial marketplace certification policies](https://docs.microsoft.com/legal/marketplace/certification-policies).
1. Test your app package with the [Microsoft Teams app validation tool](https://dev.teams.microsoft.com/appvalidation.html).
1. [Prepare your Teams store submission](~/concepts/deploy-and-publish/appsource/prepare/submission-checklist.md).

### My app is in beta testing. Can I submit my app anyway to save time on the publishing process?

No. Microsoft only validates production-ready apps.

### May I contact the teamsubm@microsoft.com email before submitting my app for the first time on Partner Center?

No. Microsoft doesn't start validating your app until you submit your app for the first time on Partner Center.

### I received an email from Partner Center saying my app was approved to publish. Why isn't my app in the Teams store?

Once your app is approved, publishing usually takes 1-2 business days depending on the app's capabilities. If your app hasn't published after two business days, contact <a href="mailto:teamsubm@microsoft.com">teamsubm@microsoft.com</a>.

## Next step

> [!div class="nextstepaction"]
> [Maintain your app](~/concepts/deploy-and-publish/appsource/post-publish/overview.md)
