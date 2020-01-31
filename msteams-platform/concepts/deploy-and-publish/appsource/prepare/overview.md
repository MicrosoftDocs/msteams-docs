---
title: Submission checklist 
description: The checklist to use before publishing your Microsoft Teams app to AppSource
keywords: teams publish store office publishing checklist submission prepare
---
# Prepare for AppSource submission  

To be listed on AppSource, your app must go through an approval process. This is a free service provided by the Microsoft Teams group that verifies that your app works as described, contains all appropriate metadata, and provides content that would be valuable to an end user. To help you achieve rapid approval, ensure your app meets the following requirements and guidelines:

* **Distribution method:** Make sure your app is meant for a store. There are [other options](../../overview.md) to distribute your app without publishing to AppSource.
* **App detail page:** Your app meets [App detail page checklist](detail-page-checklist.md)
* **Tips and frequently failed cases:** Pay extra attention to these [Tips and frequently failed cases](frequently-failed-cases.md) to improve your app submission to approval time.
* **App manifest:** Check your app manifest against the [App manifest checklist](app-manifest-checklist.md) and manifest checker in App Studio
* **Testing and debugging:** You have fully [tested and debugged your app](../../../build-and-test/debug.md).
* **Validation policies:** It must pass all current [AppSource validation policies](https://dev.office.com/officestore/docs/validation-policies) for Teams tabs and bots. Please note that these policies are subject to change.
* **Testing notes:** Include [test notes for validation](#test-notes-for-validation)
* **Privacy policies:** Ensure your [privacy policy, terms of use and support URLs](#privacy-policy-terms-of-use-and-support-urls) follow our guidelines.

Once you have completed all of the above requirements, you can submit your package to App Source through [Partner Center](/office/dev/store/use-partner-center-to-submit-to-appsource).

## Privacy policy, terms of use and support URLs

### Privacy policy

Privacy policy guidelines:
* The privacy policy can be either specific to your app and/or add-in or an overall policy for all of your services. 
* If you use a generic privacy policy, it must reference "Services/Applications/Platforms" to cover your Teams app as well as your website. 
* It must include how you handle user data storage, user data retention, deletion, and security controls information.
* It must include your contact information.
* It should not contain broken links, beta URLs, or staging URLs. 

### Terms of use

Your terms of use statement should be specific and applicable to your app and/or add-in offering.

### Support URLs

Your support URLs should not require authentication or login credential to contact you for any issues with your app.

## Test notes for validation

You must provide at least two login credentials, one admin and one not, so your app can be validated.

* The accounts you provide should have sufficient data pre-populated for verification purposes.
* For enterprise apps, apps where a subscription is required, or where there is an office 365 tenant/domain dependency for testing you must provide an 3rd account in the same domain that is not already configured to use your app so we can validate the first-run user experience.
* If your app has any Premium/Upgraded features, an account with the necessary access must be provided to test that experience.
* You may choose to upload your test notes to SharePoint. In such cases, please provide a public link to the file.
