---
title: Microsoft Teams app approval process guidance
description: Describes the approval process for getting your app published to the Microsoft Teams app store
keywords: teams publish store office publishing AppSource
---
# Microsoft Teams app approval process guidance

Teams app approval is a free service provided by AppSource that verifies that your app works as described, contains all appropriate metadata, and provides content that would be valuable to an end user. For rapid approval, follow our [checklist](#checklist-for-rapid-approval).

For your Teams app to be approved:

1. It must not contain inadmissible or offensive material.
2. It must be stable and functional.
3. Any material that you associate with your experience, such as descriptions and support documentation, must be accurate. Use correct spelling, capitalization, punctuation, and grammar in your descriptions and materials.
4. It must pass all current [AppSource validation policies](https://dev.office.com/officestore/docs/validation-policies) for Teams tabs and bots. Please note that these policies are subject to change.
5. For tabs, it must provide value to users outside of what is possible by simply pinning your website in Teams. This means that, at minimum, it must remove extraneous chrome and disallow navigating outside the configured context. See the [Microsoft Teams Design Guidelines](~/resources/design/overview.md) for more guidance.

When the validation process is complete, you will receive a message to let you know that either your Teams experience is approved or it fails one of the stated policies. You can also follow these steps to check the approval status in the Seller Dashboard:

1. Sign in to the Seller Dashboard.
2. On the **manage** tab, your submission status appears under the submission name.
   * If the status is **pending approval**, your submission is still being verified. When it is in this state, you can't update or resubmit it.
   * If the status is **changes requested**, your submission needs changes before approval. Select your submission; on the summary page, choose **View the add-in report** for details about the required changes.
   * If the status is **approved**, your submission will be listed in the appropriate marketplaces, typically within 24 hours.

Failures are explained, with references to the specific policy violations. All failures must be addressed before resubmission. Be sure to resubmit your app using the tile on the Overview tab. Do not use the *Add a new app* button.

## Checklist for rapid approval

The information below covers some of the most common reasons apps fail validation. It is not intended to be an exhaustive list of all potential issues with you app. However, if you follow this guidance your likelihood of a first-time pass will be greatly increased.

### Sign up, Sign in, and Sign out

Apps must provide a clear, simple sign in/out and (when appropriate) sign-up experience. The experience must be reachable across all capabilities in your app.

1. If there is an explicit sign-in option provided to the user, there must be a sign-out option too (even if the app is using SSO/Silent Authentication)
2. The sign-out option must sign the user out of only your app's capability, and not from the Teams client.
3. Every scope that has a sign-in must have a sign-out as well. The sign-out option should, at minimum, sign the user out from all capabilities that the sign-in option signed them into. For example, if the sign-in option signs the user into both messaging extension and tab, then the sign out option must , at minimum, sign the user out of the message extension and tab.

4. Make sure there is always a way to reverse the following (or similar) behaviors:
  * Sign-in => sign-out
  * Link an account/service => un-link an account/service
  * Connect an account/service => disconnect the account/service
  * Authorize an account/service => de/un-authorize the account/service
  * Register an account/service => un-register the account/service
5. If your app requires an account or service, you must provide a way for the user to sign-up or request sign-up. An exception can be sought for a sign-up process if you app fits in the "Enterprise" app category.

For additional information on authentication see:

* [Authentication documentation](~/concepts/authentication/authentication.md)
* [Bot authentication sample in Node](https://github.com/OfficeDev/microsoft-teams-sample-auth-node)
* [Tab authentication sample in Node](https://github.com/OfficeDev/microsoft-teams-sample-complete-node)
* [Tab/bot authentication in C#/.NET](https://github.com/OfficeDev/microsoft-teams-sample-complete-csharp)

### Test Notes for validation/approval

You must provide at least two login credentials, one admin and one not, so we can validate your app.

1. The accounts you provide should have sufficient data pre-populated for verification purposes.
2. For enterprise apps, apps where a subscription is required, or where there is an office 365 tenant/domain dependency for testing you must provide an 3rd account in the same domain that is not already configured to use your app so we can validate the first-run user experience.
3. If your app has any Premium/Upgraded features, an account with the necessary access must be provided to test that experience.

### Updating your existing Teams app

1. Do not use the *Add a new app* button to resubmit your app. Use the tile for your app on the Overview tab instead.
2. The appId in the updated manifest should be the same as in the current manifest, with an incremented version number.
3. Increment your version number in your manifest.

### App metadata

Make sure your app descriptions and screenshots follow the [AppSource guidance](/office/dev/store/create-effective-office-store-listings).

1. Don't use "Teams", "Microsoft", or "app" in your app name.
2. The developerName in the App Manifest must be same as the Provider Name defined in Seller Dashboard.
3. Make sure the app description, screenshots, text, and promotional images describe only the app and do not contain any additional advertising, promotions or copyrighted brand names.
4. If your product requires an account on your service or another service, list that in the description and ensure there are links to sign up, sign in and sign out.
5. If your product requires additional purchases to function properly, list that in the description.
6. Provide the requisite Terms and Privacy policy links in the manifest and the Seller Dashboard. Verify that the links properly resolve to the correct documentation, ideally Teams specific. For bots, you must provide this same information in the Submission section of the Bot Framework registration page.
7. Ensure that metadata in the manifest roughly matches metadata in the Seller Dashboard (and, for bots, in the Bot Framework registration). Note that your Seller Dashboard entry should contain a more detailed and formatted description for use in the AppSource product page.

### Help and configuration pages

It is highly recommended to have help/FAQ link for your Teams app and to provide this link in first-run user experience. For all personal apps we recommend you provide your help page as a personal tab.

### Privacy policy, terms of use and support URLs

1. The Privacy policy can be specific to your app/add-in or can be an overall privacy policy for all the services from a developer. There should be no broken links and no beta or staging URLs. If you use a generic privacy policy, it must reference "Services/Applications/Platforms" which will also cover your Teams app, and not just your "Website".
2. Privacy policy should cover how you handle user data storage, user data retention, deletion and security controls information.
3. Your privacy policy must have your contact information.
4. Your support URL should not require authentication or login for a Teams user to contact you.

### Bots and messaging extensions

1. Be sure that your bot provides appropriate responses when mentioned (@*botname*) in a channel and in personal conversations as needed. If your bot does not provide meaningful context within the personal or teams scope, disable that scope via the manifest. (See the `bots` block in the [Microsoft Teams manifest schema reference](~/resources/schema/manifest-schema.md#bots).)
2. Your bot should provide a "welcome message" outlinig its value for the user along with the valid commands.
3. Your bot should respond to invalid commands with help content. For example "I'm sorry, I don't understand. Type "help" for more information."
4. Your bot must include a help command that provides your value proposition along with all your valid commands.
5. For bots, a response to a user command must occur within two seconds. If longer processing is required, you must use a typing indicator.
6. For messaging extensions, a response to a user command must occur within five seconds.

### Tabs

1. For your tab configuration page, be sure to provide "About" links and proper guidance. This page is the first thing the user sees, so ensure that a new user understands what to do.
2. If a response to an action takes more than three seconds, you must provide a loading message or warning.
3. The core functionality of your tab offering must exist within Teams and not outside of Teams.

### Miscellaneous

1. Check your manifest for completeness and accuracy. Then check it again.
2. Do not make changes to your app while validation is in progress. This will require a complete re-validation of your app.
3. Your app  must not stop responding, end unexpectedly, or contain programming errors. If there is an issue it should fail gracefully with a valid way forward message to user.
4. Your app must not automatically download or install or launch any executable code on the user's environment. Any download should seek an explicit permission from the user.
