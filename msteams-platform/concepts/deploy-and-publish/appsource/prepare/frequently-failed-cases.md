---
title: Tips and frequently failed cases 
description: Describes tips for submission and most failed policies  
keywords: teams publish faq failed frequently cases tip tips 
---
# Tips and frequently failed cases 

This article covers some of the most common reasons apps fail validation. It is not intended to be an exhaustive list of all potential issues with your app. However, if you follow this guidance the likelihood of a first-time pass will be greatly increased. See the extensive list of policies here: [AppSource validation policies](https://dev.office.com/officestore/docs/validation-policies). The policies in Section 14 of the overall AppSource validation policies are specific to Microsoft Teams apps.

## Tips for successful app submission

* Ensure you are using version 1.4.1 or later of the Teams JavaScript SDK.
* Do not make changes to your app while validation is in progress. This will require a complete re-validation of your app.
* Your app  must not stop responding, end unexpectedly, or contain programming errors. If there is an issue it should fail gracefully with a valid way forward message to user.
* Your app must not automatically download, install or launch any executable code on the user's environment. Any download should seek an explicit permission from the user.
* Any material that you associate with your experience, such as descriptions and support documentation, must be accurate. Use correct spelling, capitalization, punctuation, and grammar in your descriptions and materials.
* Help And Support:It is highly recommended to have help/FAQ link for your Teams app and to provide this link in first-run user experience. For all personal apps we recommend you provide your help page as a personal tab for better user experience.

## Policy 11.2: Sign up, sign in, and sign out

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
* If your app requires an account or service, you must provide a way for the user to sign-up or request sign-up. An exception can be sought for a sign-up process if your app fits in the "Enterprise" app category.
* Sign in / sign out functionality must work on mobile clients. Ensure you've upgraded your Teams JavaScript SDK to version 1.4.1 or later.

For additional information on authentication see:

* [Authentication documentation](~/concepts/authentication/authentication.md)
* [Bot authentication sample in Node](https://github.com/OfficeDev/microsoft-teams-sample-auth-node)
* [Tab authentication sample in Node](https://github.com/OfficeDev/microsoft-teams-sample-complete-node)
* [Tab/bot authentication in C#/.NET](https://github.com/OfficeDev/microsoft-teams-sample-complete-csharp)

## Policy 14.5: Microsoft Teams apps must respond in a reasonable timeframe.

* 14.5.1 : For tabs, if a response to an action takes more than three seconds, you must provide a loading message or warning.
* 14.5.2: For bots, a response to a user command must occur within two seconds. If longer processing is required, you must use a typing indicator.
* 14.5.3: For compose extensions, a response to a user command must occur within five seconds.

> [!TIP]
> Make sure you include the loading indicator when the app is taking too long.

## Policy 14.15.3: Content in a tab should not have superfluous/unnecessary UI (aka: UI Chrome) or layered navigation

Tabs should provide focused content and avoid UI elements that are not related to this content. In general, this usually refers to unnecessary nested/layered navigation, unrelated or irrelevant UI next to the content, or any links that take the user to content not related to the tab’s content. For example, SharePoint stripped off the navigation menus and only showcased the main content in the tab.

![SharePoint web view](~/assets/images/faq/web-sp.png)
![SharePoint tab view](~/assets/images/faq/tab-sp.png)

If there are multiple view options, consider having a tab config menu for the user to choose from. For example, instead of embedding a menu inside the tab, Wide Ideas put the menu in the configuration page so the actual tab view are clean and focused.

![Wide idea configuration page](~/assets/images/faq/wideidea.png)

## Policy 14.15.7: Bots must respond to any command and must not dead-end the user

Your bot should always be responsive. Here are some tips to help your bot more intelligently respond to users.

**Use command list:** Analysis user input or predict user's intentions is hard. Instead of letting user guess what your bot can do, provide users with a list of commands your bot can understand.

![Flow command list](~/assets/images/faq/flow-bot.png)

**Include a help command:** Users are most likely to type "Help" when they are lost or when your bot didn't respond with what they are expecting. Include a help command that provides your value proposition along with all your valid commands.

![Flow help command](~/assets/images/faq/flow-help.png)

**Include help content or guidance when your bot is lost:** When you can't understand the user input, provide user with something they could do instead. For example "I'm sorry, I don't understand. Type "help" for more information." Don't respond with an error message or simply "I don't understand". Use this chance to teach your users.

**Think through both scope:** Be sure that your bot provides appropriate responses when mentioned (@*botname*) in a channel and in personal conversations as needed. If your bot does not provide meaningful context within the personal or teams scope, disable that scope via the manifest. (See the `bots` block in the [Microsoft Teams manifest schema reference](~/resources/schema/manifest-schema.md#bots).)

## Policy 14.15.9: Bot must send welcome messages on the first launch

Welcome messages are the best way to set the tone. This is the first interaction user has with the bot. A good welcome message can encourage the user to keep exploring the app while a bad one will confuse use and users might lose interests if they can’t see the value of the app immediately.

### Personal Scope

On the first launch of bot, user should get a welcome message from the bot even before signing in. Couple tips to think about when designing your welcome message:

**Make the message concise and informative:**
You users might have very different experiences and knowledge about your app. They might have used your app on another platform or might know nothing about your app. You want to tailor your message to all audience and in a couple sentences explain what your bot does and ways to interact with it. You should also explain the value of the app and how the users will benefit from using it.
![Cafe and Dinning bot](~/assets/images/faq/cafe-bot.png)

**Make your message actionable:** Think about what's the first thing you want the users to do after installing your app. Is there any cool command they should try? Is there another onboarding experience they should know about? Do they need to sign in? You can add actions on an adaptive card or provide specific examples such as “Try asking….”, “This is what I can do…”.

### Team Scope

Things are a little bit different when the bot is first added to a channel. Normally, you shouldn't send a 1:1 message to everyone on the team, but the bot may send a welcome message in the channel.

## Policy 14.15.10: Tab configuration UI should not dead-end the experience and always provide a way for a user to continue

A user should always be able to finish the configuration experience, even if they can’t immediately find the content they’re looking for. The configuration experience should provide options to the user to find their content or pin a URL or create new content if it doesn’t exist. The user shouldn’t have to leave the configuration experience to create content and then come back to Teams to pin it.

![OneNote allows users to paste a OneNote link in case notes can not be found](~/assets/images/faq/tab-onenote-config.png)

![Users can always create new plan on planner in case there no existing ones](~/assets/images/faq/tab-planner-config.png)

![SharePoint also allows user to directly paste a SharePoint link](~/assets/images/faq/tab-sp-config.png)