---
title: Prepare your store (AppSource) submission  
description: Describes the final steps before submitting your Microsoft Teams app to be listed on the store.
ms.topic: how-to
author: heath-hamilton
ms.author: surbhigupta
---
# Prepare your Microsoft Teams store and AppSource submission  

You've designed, built, and tested your Microsoft Teams app. Now you're ready to list it so people can discover and start using your app.

Before you submit your app to [Partner Center](/office/dev/store/use-partner-center-to-submit-to-appsource), read the following instructions.

## Validate your app manifest

While your app may be working in a test environment, you should check your app manifest again to avoid running into issues during the submission process.

The Microsoft Teams App Validator tool helps you identify and fix issues before submitting to Partner Center. The tool automatically checks your manifest against the same test cases used during store validation.

1. Go to the [Microsoft Teams App Validator tool](https://dev.teams.microsoft.com/appvalidation.html). (Note: The tool is also available in [App Studio](../../../build-and-test/app-studio-overview.md).)
1. Upload your manifest to run the automated tests.
1. Go to the **Preliminary checklist** and review the list of test cases that are difficult to automate.
1. If present, [fix issues with your manifest](~/resources/schema/manifest-schema.md) or app in general.

## Provide notes for testing your app

Include the following information with your submission. If you upload test notes to SharePoint, you must provide a public link.

### Feature list

Detail all of the capabilities the app offers within Teams and steps for testing each feature.

### Accounts

* Credentials for at least two account (one admin and one non-admin). For verification purposes, the accounts should have sufficient pre-populated data.
* A test account is required if your app only allows licensed accounts or safelisting from the backend. Also, if your app has a team or group chat scope, you must provide two test accounts in the same tenant to validate the collaboration scenario.
* For apps that require a subscription, have an Microsoft 365 tenant/domain dependency, or are for enterprise users, you must provide a third account in the same domain that isn't pre-configured for your app so that we can validate the first-run user experience.
* If your app has premium features, an account with the necessary access must be provided to test that experience.

### Integration steps

If a Teams tenant requires configuration to use the app, include the configuration steps and admin and non-admin accounts for validation.

You can sign up for a [Microsoft 365 Developer Program](https://developer.microsoft.com/microsoft-365/dev-program) subscription. It's *free* for 90 days and renews as long as you're using it for development activities.

### Video (optional)

You can provide a recording of the product so we can fully understand its functionality.

## Next step

> [!div class="nextstepaction"]
> [Submit your app](~/concepts/deploy-and-publish/appsource/submit-your-app.md)
