---
title: Microsoft Teams app approval process guidance
description: Describes the approval process for getting your app published to the Microsoft Teams app store
keywords: teams publish store office publishing AppSource
---
# Microsoft Teams app approval process guidance

Teams app approval is a free service provided by the Microsoft Teams group that verifies that your app works as described, contains all appropriate metadata, and provides content that would be valuable to an end user.

For your Teams app to be approved:

* It must not contain inadmissible or offensive material.
* It must be stable and functional.
* Any material that you associate with your experience, such as descriptions and support documentation, must be accurate. Use correct spelling, capitalization, punctuation, and grammar in your descriptions and materials.
* It must pass all current [AppSource validation policies](https://dev.office.com/officestore/docs/validation-policies) for Teams tabs and bots. Please note that these policies are subject to change.
* For tabs, it must provide value to users outside of what is possible by simply pinning your website in Teams. This means that, at minimum, it must remove extraneous chrome and disallow navigating outside the configured context. See the [Microsoft Teams Design Guidelines](~/tabs/design/tabs.md) for more guidance.
* Your app must function across all Teams clients, including mobile. See [guidance for tabs on mobile](~/tabs/design/tabs-mobile.md).

When the validation process is complete, you will receive a message to let you know that either your Teams experience is approved or it fails one of the stated policies.

## Submit your app for approval

Once you are ready, submit your app for approval through [Partner Center](/dev/store/use-partner-center-to-submit-to-appsource).

## Rapid approval guidance

The information below covers some of the most common reasons apps fail validation. It is not intended to be an exhaustive list of all potential issues with you app. However, if you follow this guidance your likelihood of a first-time pass will be greatly increased. Additional guidance can be found on the [Partner Center site](/dev/store/use-partner-center-to-submit-to-appsource).

### Sign up, Sign in, and Sign out

Apps must provide a clear, simple sign in/out and (when appropriate) sign-up experience. The experience must be reachable across all capabilities in your app.

* If there is an explicit sign-in option provided to the user, there must be a sign-out option too (even if the app is using SSO/Silent Authentication)
* The sign-out option must sign the user out of only your app's capability, and not from the Teams client.
* Every scope that has a sign-in must have a sign-out as well. At a minimum, the sign-out option should sign the user out from the same capabilities that the sign-in option signed them into. For example, if the sign-in option signs the user into both a messaging extension and tab, then the sign out option must sign the user out from the message extension and tab.

* Make sure there is always a way to reverse the following (or similar) behaviors:
  * Sign-in => sign-out
  * Link an account/service => un-link an account/service
  * Connect an account/service => disconnect the account/service
  * Authorize an account/service => de/un-authorize the account/service
  * Register an account/service => un-register the account/service
* If your app requires an account or service, you must provide a way for the user to sign-up or request sign-up. An exception can be sought for a sign-up process if you app fits in the "Enterprise" app category.
* Sign in / sign out functionality must work on mobile clients. Ensure you've upgraded your Teams JavaScript SDK to version 1.4.1 or later.

For additional information on authentication see:

* [Authentication documentation](~/concepts/authentication/authentication.md)
* [Bot authentication sample in Node](https://github.com/OfficeDev/microsoft-teams-sample-auth-node)
* [Tab authentication sample in Node](https://github.com/OfficeDev/microsoft-teams-sample-complete-node)
* [Tab/bot authentication in C#/.NET](https://github.com/OfficeDev/microsoft-teams-sample-complete-csharp)

### Test Notes for validation/approval

You must provide at least two login credentials, one admin and one not, so your app can be validated.

* The accounts you provide should have sufficient data pre-populated for verification purposes.
* For enterprise apps, apps where a subscription is required, or where there is an office 365 tenant/domain dependency for testing you must provide an 3rd account in the same domain that is not already configured to use your app so we can validate the first-run user experience.
* If your app has any Premium/Upgraded features, an account with the necessary access must be provided to test that experience.
* You may choose to upload your test notes to SharePoint. In such cases, please provide a public link to the file.

### Updating your existing Teams app

* Do not use the *Add a new app* button to resubmit your app. Use the tile for your app on the Overview tab instead.
* The appId in the updated manifest should be the same as in the current manifest, with an incremented version number.
* Increment your version number in your manifest.

### App metadata

Make sure your app descriptions and screenshots follow the [AppSource guidance](/office/dev/store/create-effective-office-store-listings).

* Don't use "Teams", "Microsoft", or "app" in your app name.
* The developerName in the App Manifest must be same as the Provider Name.
* Make sure the app description, screenshots, text, and promotional images describe only the app and do not contain any additional advertising, promotions or copyrighted brand names.
* If your product requires an account on your service or another service, list that in the description and ensure there are links to sign up, sign in and sign out.
* If your product requires additional purchases to function properly, list that in the description.
* Provide the requisite Terms and Privacy policy links. Verify that the links properly resolve to the correct documentation, ideally Teams specific. For bots, you must provide this same information in the Submission section of the Bot Framework registration page.
* Ensure that metadata in the manifest roughly matches metadata in Partner Center (and, for bots, in the Bot Framework registration). Note that your Partner Center entry should contain a more detailed and formatted description for use in the AppSource product page.

### Help and configuration pages

It is highly recommended to have help/FAQ link for your Teams app and to provide this link in first-run user experience. For all personal apps we recommend you provide your help page as a personal tab for better user experience.

### Privacy policy, terms of use and support URLs

* The Privacy policy can be specific to your app/add-in or can be an overall privacy policy for all the services from a developer. There should be no broken links and no beta or staging URLs. If you use a generic privacy policy, it must reference "Services/Applications/Platforms" which will also cover your Teams app, and not just your "Website".
* Privacy policy should cover how you handle user data storage, user data retention, deletion and security controls information.
* Your privacy policy must have your contact information.
* Your support URL should not require authentication or login before contacting you for any issues with your app.
* Privacy policy must cover - 1) The user data collected, 2) How the data is stored and used 3) How the data is protected and security controls 4) How the data is deleted
* Privacy policy must have a contact information for the users to contact you


### Bots and messaging extensions

* Be sure that your bot provides appropriate responses when mentioned (@*botname*) in a channel and in personal conversations as needed. If your bot does not provide meaningful context within the personal or teams scope, disable that scope via the manifest. (See the `bots` block in the [Microsoft Teams manifest schema reference](~/resources/schema/manifest-schema.md#bots).)
* Your bot should provide a "welcome message" outlining its value for the user along with the valid commands.
* Your bot should respond to invalid commands with help content. For example "I'm sorry, I don't understand. Type "help" for more information."
* Your bot must include a help command that provides your value proposition along with all your valid commands.
* For bots, a response to a user command must occur within two seconds. If longer processing is required, you must use a typing indicator.
* For messaging extensions, a response to a user command must occur within five seconds.

### Tabs

> [!Important]
> Full support for tabs on mobile clients is currently in [developer preview](~/resources/dev-preview/developer-preview-intro.md), and will be released soon. To prepare for this change you should follow the [guidance for tabs on mobile](~/tabs/design/tabs-mobile.md) when creating your tabs.

* For your tab configuration page, be sure to provide "About" links and proper guidance. This page is the first thing the user sees, so ensure that a new user understands what to do.
* If a response to an action takes more than three seconds, you must provide a loading message or warning.
* The core functionality of your tab offering must exist within Teams and not outside of Teams.
* Ensure you are using version 1.4.1 or later of the Teams JavaScript SDK.
* Your tabs should work well on mobile devices, including authentication and responsive design.

### Miscellaneous

* Check your manifest for completeness and accuracy. Then check it again.
* Do not make changes to your app while validation is in progress. This will require a complete re-validation of your app.
* Your app  must not stop responding, end unexpectedly, or contain programming errors. If there is an issue it should fail gracefully with a valid way forward message to user.
* Your app must not automatically download, install or launch any executable code on the user's environment. Any download should seek an explicit permission from the user.
