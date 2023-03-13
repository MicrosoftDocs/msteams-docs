---
title: Common reasons for app validation failure
description: Learn the most common reasons for app validation failure such as broken links, unexpected errors, crashes, valid domain guidelines violation, functional bugs.
ms.topic: overview
author: v-ypalikila
ms.author: v-ypalikila
ms.localizationpriority: high
---
# Common reasons for app validation failure

Most apps don't pass store submission process due to issues during app development. The most common issues or reasons are addressed in this article to help you prepare your app better before [submitting for review](/office/dev/store/add-in-submission-guide?toc=/microsoftteams/platform/toc.json&bc=/microsoftteams/platform/breadcrumb/toc.json). Avoid these common failures and follow the [Microsoft Teams store validation guidelines](prepare/teams-store-validation-guidelines.md) and [Commercial Marketplace Certification policies](/legal/marketplace/certification-policies) to increase the likelihood of your app to pass the Microsoft Teams store submission process.

Following are the most common reasons for your app to get rejected:

:::row:::
   :::column:::
      :::image type="icon" source="../../../assets/icons/broken-links-errors-icon-1.png" link="#broken-links-functional-bugs-app-crashes-and-unexpected-errors":::
   :::column-end:::
   :::column span="":::
     :::image type="icon" source="../../../assets/icons/app-description-icon.png" link="#app-description":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../assets/icons/violation-trademark-icon.png" link="#violation-of-microsoft-trademark-and-brand-guidelines":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../assets/icons/testability-icon.png" link="#testability":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../assets/icons/compliance-icon.png" link="#microsoft-365-app-compliance-program":::
   :::column-end:::
:::row-end:::

:::row:::
   :::column:::
      :::image type="icon" source="../../../assets/icons/app-guideline-icon.png" link="#violation-of-app-icon-guidelines":::
   :::column-end:::
   :::column span="":::
     :::image type="icon" source="../../../assets/icons/app-name-icon.png" link="#app-name":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../assets/icons/support-link-icon.png" link="#support-link":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../assets/icons/schema-icon.png" link="#manifest-schema":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../assets/icons/app-ui-icon.png" link="#app-ui":::
   :::column-end:::
:::row-end:::

:::row:::
   :::column:::
      :::image type="icon" source="../../../assets/icons/domain-icon.png" link="#valid-domains":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../assets/icons/localization-icon.png" link="#localization-information":::
   :::column-end:::
   :::column span="":::
     :::image type="icon" source="../../../assets/icons/developer-name-icon.png" link="#provider-or-developer-name-mismatch":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../assets/icons/privacy-policy-icon.png" link="#privacy-policy":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../assets/icons/terms-of-use-icon.png" link="#terms-of-use":::
   :::column-end:::
:::row-end:::

[Back to top](prepare/teams-store-validation-guidelines.md#microsoft-teams-store-validation-guidelines)

## Broken links, functional bugs, app crashes, and unexpected errors

Test your app to verify your app’s correctness, functionality, and usage. Ensure that you test your app thoroughly, check all the end to end workflows that your app supports, test the app compatibility on the operating systems and browsers as per the  [Commercial Marketplace Certification policy](/legal/marketplace/certification-policies), and fix all the bugs. You must avoid the following mistakes in your app before you submit for review:

* Broken links in an app.

* Functional bugs that block app usage.

   :::image type="content" source="../../../assets/images/submission/validation-common-reasons-functional-bugs-fail-block-app-usage.png" alt-text="Screenshot of failed functional bug for block app usage.":::

* App crashes.

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-failed-app-crashes.png" alt-text="Screenshot of failed scenario of app crashes while testing.":::

* Continuous loading of app surfaces that prevent completion of stated workflows that the app supports.

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-fail-continuous-app.png" alt-text="Screenshot of image for failed loading of app surfaces.":::

* Unexpected error messages during the app usage, sign in, and sign-up experience and for scenarios where the app feature doesn't work as expected.

   :::image type="content" source="../../../assets/images/submission/validation-common-reasons-unexpected-error-app-usage.png" alt-text="Screenshot to show the unexpected error message during app usage.":::

* Ensure that your app is complete and ready to publish before you submit for review.

[Back to top](prepare/teams-store-validation-guidelines.md#microsoft-teams-store-validation-guidelines)

## App description

A great description can make your app stand out in the Microsoft Teams store and help encourage customers to download it. You must avoid the following mistakes in your app description:

  :::image type="content" source="../../../assets/images/submission/validation-common-reason-pass-grammatical-error.png" alt-text="Screenshot of passed image for long description, grammatical errors and capitalization":::

 :::image type="content" source="../../../assets/images/submission/validation-common-reason-fail-grammatical-error.png" alt-text="Screenshot of failed image for long description, grammatical errors and capitalization":::

 :::image type="content" source="../../../assets/images/submission/validation-common-reason-fail-app-description-truncation.png" alt-text="Screenshot of failed scenario of app description guidelines which has incomplete truncation":::

   :::image type="content" source="../../../assets/images/submission/validation-common-reasons-pass-inadequate-app-description.png" alt-text="Screenshot to show the pass scenarios with inadequate app description.":::

   :::image type="content" source="../../../assets/images/submission/validation-common-reasons-fail-inadequate-app-description.png" alt-text="Screenshot to show the failed scenarios with inadequate app description.":::

* Way forward information for new users such as, Sign Up or Get Started, or Help and Contact Us links aren't included in the manifest and AppSource full description.

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-pass-sign-up-app-description.png" alt-text="Screenshot of passed scenario of sign-up, contact details in app description must be hyperlinked.":::

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-sign-up-app-description.png" alt-text="Screenshot of failed scenario of sign-up, contact details in app description must be hyperlinked.":::

* Region specific app name or functionality isn't called out in manifest and Partner Center app descriptions.

   :::image type="content" source="../../../assets/images/submission/validation-common-reasons-region-specific-pass-app.png" alt-text="Screenshot shows an example for pass scenario of region specific app name.":::

   :::image type="content" source="../../../assets/images/submission/validation-common-reasons-region-specific-app.png" alt-text="Screenshot shows an example for failed scenario of region specific app name.":::

* Limitations or account dependency on external accounts or services to complete Sign-In, Sign-Out, and Sign-Up experience aren't called out in app manifest and long description.

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-passed-limitation-called-out.png" alt-text="Screenshot of passed image to show the called out limitations.":::

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-failed-limitation-called-out.png" alt-text="Screenshot of failed image to show the called out limitations.":::

* Short and full description in the app manifest doesn't highlight the app’s value proposition.

* Supported app features aren't updated.

* App comparison with another app.

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-failed-comparsion-app-description.png" alt-text="Screenshot of failed image of comparative app description":::

* References to the integrations, which aren't part of app functionality.

* Grammatical errors.

* App short and full description are same.

[Back to top](prepare/teams-store-validation-guidelines.md#microsoft-teams-store-validation-guidelines)

## Violation of Microsoft trademark and brand guidelines

Microsoft’s brand assets including logos, icons, designs, trade dress, fonts, product names, services, sounds, emojis, and any other brand features and elements, whether registered or unregistered are proprietary assets owned by Microsoft and its group of companies.

When referring to Microsoft trademarks, products names, and services, you must follow [Microsoft Trademark and Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks). You must avoid the following common violations that lead to app rejection:

* Abbreviating Microsoft as MS or MSFT in the offer listing, referencing the first instance of Microsoft Teams in the offer listing as **Teams** instead of **Microsoft Teams**.

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-failed-MS-app-description.png" alt-text="Screenshot of failed image of Microsoft or MS in app description.":::

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-failed-first-reference-teams.png" alt-text="Screenshot of image to show the failed reference instance of Microsoft Teams.":::

* Using Microsoft brand assets in the offer content without an express license from Microsoft.

* Creating an offer listing (including the offer description, title, icon, screenshots, and videos) that impersonates or provides an impression that it's an official Microsoft app for the Microsoft Teams store.

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-pass-long-description.png" alt-text="Screenshot of image to show passed scenario of long description of Microsoft.":::

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-fail-long-description.png" alt-text="Screenshot of image to show failed scenario of long description of Microsoft.":::

[Back to top](prepare/teams-store-validation-guidelines.md#microsoft-teams-store-validation-guidelines)

## Testability  

 [Detailed test instructions](prepare/teams-store-validation-guidelines.md#app-package-and-store-listing) and credentials help you with a successful review of your app.

Ensure that you provide all the details required to review your app in the Notes for Certification Information section of Partner Center, valid demo credentials for features that require sign in and instructions to set any special configuration, a demo video or hardware for features that require an environment that is hard to replicate and complete. Also, ensure that you provide the latest contact information.

You must avoid the following issues that occur in 20% of apps that are rejected during app review:

* No Test instructions or credentials to test the app.

* Only one test account provided when there's a dependency with two test accounts to test collaboration scenarios.

* The provided test instructions and credentials aren't sufficient to complete app functional testing.

[Back to top](prepare/teams-store-validation-guidelines.md#microsoft-teams-store-validation-guidelines)

## Microsoft 365 App Compliance Program  

The Microsoft 365 App Compliance Program helps organizations assess and manage risk by evaluating security and compliance information about an app. You **must complete** [Publisher Verification](/azure/active-directory/develop/mark-app-as-publisher-verified) before you submit your app for review to publish on the Microsoft Teams store.

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-pass-AAD-consent.png" alt-text="Screenshot of passed image of AAD consent dialog.":::

[Back to top](#microsoft-teams-store-validation-guidelines)

## Violation of app icon guidelines

Icons are one of the main elements people see when browsing the Microsoft Teams store. Your icons must communicate your app's brand and purpose while adhering to [App Icon guidelines](../../build-and-test/apps-package.md#app-icons). You must avoid the following violations that result in app rejection:

* App submissions that contain app packages with different color and outline icons or non-white and non-transparent outline icons.

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-pass-color-icon-outline.png" alt-text="Screenshot of image to show the passed scenario of color icon and outline icon.":::

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-fail-color-icon-outline.png" alt-text="Screenshot of image to show the failed scenario of color icon and outline icon.":::

* App submissions with different logos in Partner Center and the app package submitted for review.

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-fail-partner-center-manifest-different.png" alt-text="Screenshot to show the failed scenario of partner center and manifest which are different.":::

[Back to top](prepare/teams-store-validation-guidelines.md#microsoft-teams-store-validation-guidelines)

## App name

Your app name plays a critical role for users to discover your app on the Microsoft Teams store. Ensure that your app name meets [app name guidelines](prepare/teams-store-validation-guidelines.md#app-name) and doesn't violate the [Microsoft Trademark and Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks). You must avoid the following violations that result in app rejection:

* Inconsistent usage of app name throughout the app’s functionality.

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-pass-inconsistent-app-functionality.png" alt-text="Screenshot of image to show pass inconsistent usage of app name in app's functionality.":::

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-fail-inconsistent-app-functionality.png" alt-text="Screenshot of image to show fail inconsistent usage of app name in app's functionality.":::

* Mismatch between the app name mentioned in the app manifest submitted as part of the app package and Partner Center.

* App names appended with *Beta*, *Dev*, and *Prod* to indicate app isn't production ready.

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-pass-app-name-beta-app-production.png" alt-text="Screenshot of image to show passed scenario of app names with beta, dev and prod.":::

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-fail-app-name-beta-app-production.png" alt-text="Screenshot of image to show failed scenario of app names with beta, dev and prod.":::

* App submissions where the developer has changed the app name, but the old app name is still used within the app.

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-fail-old-app-name.png" alt-text="Screenshot of image to show failed app submission for old app name which is still used.":::

[Back to top](prepare/teams-store-validation-guidelines.md#microsoft-teams-store-validation-guidelines)

## Support link

 Support links must not ask users for authentication and must lead directly to appropriate support information. You must ensure that your app includes a valid support link for users to contact.

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-pass-support-link.png" alt-text="Screenshot of image for passed support link containing contacts.":::

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-failed-support-link.png" alt-text="Screenshot of image for invalid support link.":::

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-failed-support-link-authentication.png" alt-text="Screenshot of image for invalid support link with authentication.":::

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-failed-support-link-insecure.png" alt-text="Screenshot of image for invalid support link is insecure.":::

[Back to top](prepare/teams-store-validation-guidelines.md#microsoft-teams-store-validation-guidelines)

## Manifest schema

The Teams app manifest describes how the app integrates into the Microsoft Teams product. Your app manifest must conform to a publicly released [manifest schema](../../../resources/schema/manifest-schema.md). If your app supports localization, ensure that use a localization manifest schema version 1.5 or later. App packages that contain preview schemas (not publicly released) fail app review.

You must update the app version declared in the manifest if you're submitting an app update. We recommend you to always use the latest publicly released manifest schema when submitting a new app or an app update and ensure that the manifest schema version in Microsoft Teams store and Microsoft AppSource is the same.

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-pass-app-version-number.png" alt-text="Screenshot to show the app version number incremented.":::

Your app package must only contain your app’s manifest, color icon, and outline icon. App packages that contain any other additional files or folders fail app review.

[Back to top](prepare/teams-store-validation-guidelines.md#microsoft-teams-store-validation-guidelines)

## App UI

Your app’s UI must not look incomplete and should be intuitive. Ensure that users aren't presented with a blank screen when performing an action on the App’s UI. Apps that have truncated or overlapping content and apps that display broken images fail app review.

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-fail-overlap-content.png" alt-text="Screenshot of image failed while overlapping the app.":::

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-failed-blank-screen-app-UI.png" alt-text="Screenshot of image to show the fail of blank screen in app's UI.":::

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-pass-undo-app-UI.png" alt-text="Screenshot to show the pass scenario of undo button in app UI.":::

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-fail-undo-app-UI.png" alt-text="Screenshot to show the fail scenario of undo button in app UI.":::

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-fail-app-display-ads.png" alt-text="Screenshot to show that apps failed to display ads.":::

[Back to top](prepare/teams-store-validation-guidelines.md#microsoft-teams-store-validation-guidelines)

## Valid domains

Your app submission must adhere to the [external domains](/legal/marketplace/certification-policies) guidelines under Microsoft’s Commercial Marketplace Certification Policy. For your app to pass review, ensure that the valid domains listed in the app manifest are under your organization's direct control.

[Back to top](prepare/teams-store-validation-guidelines.md#microsoft-teams-store-validation-guidelines)

## Localization information

You must include the localized language files in your app package if your app supports localization. The localization files must conform to the [Teams localization schema](../../build-and-test/apps-localization.md). Apps that support localization but are missing localization information in the app manifest fail app review.

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-failed-app-localization-manifest.png" alt-text="Screenshot of failed app that supports localization manifest.":::

[Back to top](prepare/teams-store-validation-guidelines.md#microsoft-teams-store-validation-guidelines)

## Provider or developer name mismatch

You must ensure to provide the same developer name in your offer listing in both storefronts to avoid end-user confusion during the app’s acquisition from the Microsoft Teams store or Microsoft AppSource. Offers with mismatch in developer name frequently fail app review.

[Back to top](prepare/teams-store-validation-guidelines.md#microsoft-teams-store-validation-guidelines)

## Privacy policy

Your offer listing must include a valid privacy policy link. Offers with invalid, unsecured, and broken privacy policy links fail app review. Your privacy policy must follow the [privacy policy guidelines](prepare/teams-store-validation-guidelines.md#privacy-policy).

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-failed-invalid-unsecure-broken-privacy-policy.png" alt-text="Screenshot to show the invalid, unsecure and broken privacy policy.":::

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-failed-invalid-unsecure-broken-privacy-policy-links.png" alt-text="Screenshot to show the invalid, unsecure and broken privacy policy links.":::

[Back to top](prepare/teams-store-validation-guidelines.md#microsoft-teams-store-validation-guidelines)

## Terms of use

Your offer listing must include a valid Terms of use link. Offers with invalid, unsecured, and broken Terms of use links fail app review. You must follow the [Terms of use guidelines](prepare/teams-store-validation-guidelines.md#terms-of-use).

   :::image type="content" source="../../../assets/images/submission/validation-common-reason-fail-terms-of-use.png" alt-text="Screenshot of image for failed terms of use in production ready.":::

[Back to top](prepare/teams-store-validation-guidelines.md#microsoft-teams-store-validation-guidelines)

## See also

* [Distribute your Microsoft Teams app](../apps-publish-overview.md)
* [Publish your app to the Microsoft Teams store](publish.md)
* [Microsoft Teams store validation guidelines](prepare/teams-store-validation-guidelines.md)
* [Commercial Marketplace Certification policies](/legal/marketplace/certification-policies)
* [Microsoft Trademark and Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks)
