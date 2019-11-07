---
title: Frequently failed cases 
description: Describes the most failed policies during app submission 
keywords: teams publish faq failed frequently cases 
---

The information below covers some of the most common reasons apps fail validation. It is not intended to be an exhaustive list of all potential issues with you app. However, if you follow this guidance your likelihood of a first-time pass will be greatly increased.

### Tips for successful app submission
* Do not make changes to your app while validation is in progress. This will require a complete re-validation of your app.
* Your app  must not stop responding, end unexpectedly, or contain programming errors. If there is an issue it should fail gracefully with a valid way forward message to user.
* Your app must not automatically download, install or launch any executable code on the user's environment. Any download should seek an explicit permission from the user.

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
