Tabs
* For tabs, it must provide value to users outside of what is possible by simply pinning your website in Teams. This means that, at minimum, it must remove extraneous chrome and disallow navigating outside the configured context. See the [Microsoft Teams Design Guidelines](~/resources/design/overview.md) for more guidance.



### Bots and messaging extensions

* Be sure that your bot provides appropriate responses when mentioned (@*botname*) in a channel and in personal conversations as needed. If your bot does not provide meaningful context within the personal or teams scope, disable that scope via the manifest. (See the `bots` block in the [Microsoft Teams manifest schema reference](~/resources/schema/manifest-schema.md#bots).)
* Your bot should provide a "welcome message" outlining its value for the user along with the valid commands.
* Your bot should respond to invalid commands with help content. For example "I'm sorry, I don't understand. Type "help" for more information."
* Your bot must include a help command that provides your value proposition along with all your valid commands.
* For bots, a response to a user command must occur within two seconds. If longer processing is required, you must use a typing indicator.
* For messaging extensions, a response to a user command must occur within five seconds.

### Tabs

> [!Important]
> Full support for tabs on mobile clients is currently in [developer preview](~/resources/dev-preview/developer-preview-intro.md), and will be released soon. To prepare for this change you should follow the [guidance for tabs on mobile](~/resources/design/framework/tabs-mobile.md) when creating your tabs.

* For your tab configuration page, be sure to provide "About" links and proper guidance. This page is the first thing the user sees, so ensure that a new user understands what to do.
* If a response to an action takes more than three seconds, you must provide a loading message or warning.
* The core functionality of your tab offering must exist within Teams and not outside of Teams.
* Ensure you are using version 1.4.1 or later of the Teams JavaScript SDK.
* Your tabs should work well on mobile devices, including authentication and responsive design.
