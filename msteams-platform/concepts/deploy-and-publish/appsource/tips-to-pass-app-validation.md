---
title: Tips to pass app validation
description: Learn about the most common reasons for your app to fail the app certification and increase the likelihood of your app to pass the Teams store submission process.
ms.topic: overview
author: heath-hamilton
ms.author: v-ypalikila
ms.localizationpriority: high
---
# Tips to pass app validation

Here are the most common reasons for your app to get rejected during app certification. Ensure that your app doesn’t contain any of the common reasons addressed in this article and also follow the [Microsoft Teams store validation guidelines](prepare/teams-store-validation-guidelines.md) and [Commercial Marketplace Certification policies](/legal/marketplace/certification-policies) to increase the likelihood of your app to pass the Microsoft Teams store submission process and help you prepare your app for [review](/office/dev/store/add-in-submission-guide?toc=/microsoftteams/platform/toc.json&bc=/microsoftteams/platform/breadcrumb/toc.json).

:::row:::
   :::column:::
      :::image type="icon" source="../../../assets/icons/broken-links-errors-icon-1.png" link="#broken-links-functional-bugs-app-crashes-and-unexpected-errors":::
   :::column-end:::
   :::column span="":::
     :::image type="icon" source="../../../assets/icons/app-description-icon.png" link="#app-description":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../assets/icons/broken-links-errors-icon-1.png" link="#violation-of-microsoft-trademark-and-brand-guidelines":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../assets/icons/broken-links-errors-icon-1.png" link="#testability":::
   :::column-end:::
   :::column span="":::
      :::image type="icon" source="../../../assets/icons/broken-links-errors-icon-1.png" link="#violation-of-microsoft-trademark-and-brand-guidelines":::
   :::column-end:::
:::row-end:::

||||||
|---|---|---|---|---|
|:::image type="icon" source="../../../assets/icons/broken-links-errors-icon-1.png" border="false"::: <br/>[**Broken links, Bugs and errors**](#broken-links-functional-bugs-app-crashes-and-unexpected-errors)|:::image type="icon" source="../../../assets/icons/app-description-icon.png" border="false"::: <br/>[**App description**](#app-description)|:::image type="icon" source="../../../assets/icons/trademark-icon.png" border="false"::: <br/>[Violation of Microsoft Trademark and Brand Guidelines](#violation-of-microsoft-trademark-and-brand-guidelines)|:::image type="icon" source="../../../assets/icons/trademark-icon.png" border="false"::: <br/>[Testability](#violation-of-microsoft-trademark-and-brand-guidelines)|:::image type="icon" source="../../../assets/icons/trademark-icon.png" border="false"::: <br/>[Microsoft 365 App compliance program](#violation-of-microsoft-trademark-and-brand-guidelines)|



## Broken links, functional bugs, app crashes and unexpected errors  

Most of the apps are rejected due to the following:

Check the following reasons which contribute to most app rejections:

* Broken links in an app

* Functional bugs that block app usage

* App crashes

* Continuous loading of app surfaces that prevent completion of stated workflows that the app supports

* Unexpected error messages during the app usage, login, and sign-up experience and for scenarios where the app feature simply doesn't work as expected.

* Ensure your app is complete and ready to publish before you submit for review.

Ensure to test your app thoroughly, check all the end to end workflows that your app supports and fix all the bugs. Test the app compatibility on the operating systems and browsers as per the [Commercial Marketplace Certification policy](/legal/marketplace/certification-policies).

## App description

A great description can make your app stand out in the Microsoft Store and help encourage customers to download it. Avoid the following mistakes in your app description:

* Way forward: Way forward information for new users such as, sign up or Get Started or Help and Contact Us links are not included in the Manifest and App Source full description.

* Regional dependency: Region specific app name or functionality not called out in manifest and partner center app descriptions.

* Limitations or account dependency on external accounts or services to complete Sign-In, Sign-Out and Sign-Up experience are not called out in app Manifest  and long description.

* Short and full description in the app manifest doesn't highlight the app’s value proposition.

* Supported app features are not updated.

* App comparison with another app.

* References to the integrations which are not part of app functionality.

* Grammatical errors.

* App short and full description are same.

## Violation of Microsoft Trademark and Brand Guidelines

Microsoft’s brand assets including logos, icons, designs, trade dress, fonts, product names, services, sounds, emojis, and any other brand features and elements, whether registered or unregistered are proprietary assets owned by Microsoft and its group of companies.

When referring to Microsoft trademarks, products names , and services, you must follow Microsoft Trademark and Brand Guidelines.

Common violations that lead to app rejection:

* Abbreviating Microsoft as MS or MSFT in the offer listing, referencing the first instance of Microsoft Teams in the offer listing as **Teams** instead of **Microsoft Teams**.

* Using Microsoft brand assets in the offer content without an express license from Microsoft.

* Creating an offer listing (including the offer description, title, icon, screenshots and videos) that impersonates or provides an impression that it is an official Microsoft app for the Microsoft Teams store.

## Testability  

You must provide detailed test instructions and test credentials for a successful review of your app. Almost 20% of apps fail app review because of issues with the test instructions or test credentials that prevented the app review team from reviewing and certifying the app.

Common reasons for app rejection are:

* Developers not providing any test instruction or test credentials to test the app.
* Dependency on two test accounts to test collaboration scenarios but the developer has provided only one test account.
* Inability to complete full app functional testing following the provided test instructions or test credentials.

Enter all the details needed to review your app in the Notes for Certification Information section of Partner Center. If some features require signing in, provide a valid demo account username and password. If there are special configurations to set, include the specifics. If features require an environment that is hard to replicate or require specific hardware, be prepared to provide a demo video or the hardware. Also, please make sure your contact information is complete and up-to-date.

## Microsoft 365 App Compliance Program  

The Microsoft 365 App Compliance Program is intended to help organizations assess and manage risk by evaluating security and compliance information about your app. If you're publishing an app to the Teams store, you must complete Publisher Verification before starting a review for your app.

## Violation of App Icon guidelines

Icons are one of the main elements people see when browsing the Teams store. Your icons must communicate your app's brand and purpose while adhering to the App Icon guidelines . Most common violations of App Icon guidelines that result in app rejection include:

* App submissions that contain app packages with different color and outline icons or non-white and non-transparent outline icons.
* App submissions where a different logo is uploaded in Partner Center viz. the logo included in the app package submitted for review.

## App Name

Your app name plays a critical role in how users discover your app on the Microsoft Teams store. Ensure your app name meets App name guidelines and does not violate the Microsoft Trademark and Brand guidelines.  Most common violations of App naming guidelines include:

* Inconsistent usage of app name throughout the app’s functionality.
* Mismatch between the app name mentioned in the app manifest submitted as part of the app package and the app name submitted in Partner Center.
* App names that have words such as “Beta”, “Dev”, “Prod” appended to indicate app is not production ready.
* App submissions where the developer has changed the app name, but the old app name continues to be visible within the app.

## Support Link

You must ensure your app includes a valid support link for users to contact you. Support links must not ask users for authentication. Support links must lead directly to appropriate support information.

## Manifest Schema

Your app manifest must conform to a publicly released manifest schema. If you are submitting an app update, you must increment the app version declared in the manifest. We recommend you to always use the latest publicly released manifest schema when submitting a new app or an app update. App packages that contain preview schemas (not publicly released) fail app review. You must ensure the manifest schema version is the same in the Microsoft Teams Store and Microsoft AppSource. If your app supports localization, you must ensure you use a localization manifest schema where schema version is > 1.5. Your app package must only contain your app’s manifest, color icon and outline icon. App packages that contain any other additional files or folders fail app review.

## App UI

Your app’s UI must not look unfinished. All UI should be intuitive and obvious in purpose. You must ensure users are not presented with a blank screen when performing an action on the App’s UI. Apps that have truncated or overlapping content and apps that display broken images on the UI fail app review.

## Valid Domains

For your app to pass review, you must ensure the valid domains you have listed in the manifest are under your organization's direct control. Your submission must adhere to the External Domains guidelines under Microsoft’s Commercial Marketplace Certification Policy.

## Localization Information

If your app supports localization, you must include the localized language files in your app package. Localization files must conform to the Teams Localization schema. Apps that support localization but contain missing localization information in the app manifest frequently fail app review.  

## Provider or developer name mismatch

To avoid end-user confusion during the app’s acquisition from the Microsoft Teams Store or Microsoft AppSource, you must ensure you provide the same developer name in your offer listing in both storefronts. Offers with developer name mismatch in Microsoft Teams Store and Microsoft AppSource listing frequently fail app review.

## Privacy policy

Your offer listing must include a valid Privacy Policy link. Offers with invalid, unsecured, broken privacy policy links frequently fail app review. Your Privacy Policy must follow the Privacy Policy guidelines.  

## Terms of Use link

Your offer listing must include a valid Terms of Use link. Offers with invalid, unsecured, broken Terms of Use links frequently fail app review. Terms of Use links must follow Terms of Use link guidelines.