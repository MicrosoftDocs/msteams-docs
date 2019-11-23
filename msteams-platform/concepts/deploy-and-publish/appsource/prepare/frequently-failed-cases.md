---
title: Tips and frequently failed cases 
description: Describes tips for submission and most failed policies  
keywords: teams publish faq failed frequently cases tip tips 
---

# Tips and frequently failed cases 

The information below covers some of the most common reasons apps fail validation. It is not intended to be an exhaustive list of all potential issues with you app. However, if you follow this guidance your likelihood of a first-time pass will be greatly increased. See the extensive list of policies here: [AppSource validation policies](https://dev.office.com/officestore/docs/validation-policies). Pay extra attention to section 14 -- policies that are specific to Microsoft Teams app

### Tips for successful app submission

* Ensure you are using version 1.4.1 or later of the Teams JavaScript SDK.
* Do not make changes to your app while validation is in progress. This will require a complete re-validation of your app.
* Your app  must not stop responding, end unexpectedly, or contain programming errors. If there is an issue it should fail gracefully with a valid way forward message to user.
* Your app must not automatically download, install or launch any executable code on the user's environment. Any download should seek an explicit permission from the user.
* Any material that you associate with your experience, such as descriptions and support documentation, must be accurate. Use correct spelling, capitalization, punctuation, and grammar in your descriptions and materials.
* Help And Support:It is highly recommended to have help/FAQ link for your Teams app and to provide this link in first-run user experience. For all personal apps we recommend you provide your help page as a personal tab for better user experience.

## Frequently failed policies 
### Policy 11.2 -- Sign up, sign in, and sign out

Description: Apps must provide a clear, simple sign in/out and (when appropriate) sign-up experience. The experience must be reachable across all capabilities in your app.

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


### Policy 14.5 -- Microsoft Teams apps must respond in a reasonable timeframe.
* 14.5.1 : For tabs, if a response to an action takes more than three seconds, you must provide a loading message or warning.
* 14.5.2: For bots, a response to a user command must occur within two seconds. If longer processing is required, you must use a typing indicator.
* 14.5.3: For compose extensions, a response to a user command must occur within five seconds.
> [!TIP]
> Make sure you include the loading indicator when the app is taking too long.

### Policy 14.15: Your app cannot impede the customer experience within Microsoft Teams
* The core functionality of your tab offering must exist within Teams and not outside of Teams.
* Your tabs must provide value to users outside of what is possible by simply pinning your website in Teams. This means that, at minimum, it must remove extraneous chrome and disallow navigating outside the configured context. See the [Microsoft Teams Design Guidelines](~/resources/design/overview.md) for more guidance.


## ------  Policies that are in approval guide but not in  [AppSource validation policies](https://dev.office.com/officestore/docs/validation-policies) ----------------------------------


* Your bot must include a help command that provides your value proposition along with all your valid commands.
* For your tab configuration page, be sure to provide "About" links and proper guidance. This page is the first thing the user sees, so ensure that a new user understands what to do.
* Your bot should respond to invalid commands with help content. For example "I'm sorry, I don't understand. Type "help" for more information."
* Be sure that your bot provides appropriate responses when mentioned (@*botname*) in a channel and in personal conversations as needed. If your bot does not provide meaningful context within the personal or teams scope, disable that scope via the manifest. (See the `bots` block in the [Microsoft Teams manifest schema reference](~/resources/schema/manifest-schema.md#bots).)



## -------------------------------- NEW Policies -------------------------------------------

NOTE: These policies will be linked [AppSource validation policies](https://dev.office.com/officestore/docs/validation-policies) once published



### Policy: Must allow users to sign in and sign up for the app

### Policy: Bot must send welcome messages when on the first launch

### Policy: Must enable silent authentication in single capability

**Description:** Your bot should provide a "welcome message" outlining its value for the user along with the valid commands.

### Policy: Tab should not display superfluous/unnecessary UI (aka: UI Chrome)

### Policy: Tab configuration UI should not dead-end the experience and always provide a way for a user to continue

### Policy: Bots must have commands or can analysis user input