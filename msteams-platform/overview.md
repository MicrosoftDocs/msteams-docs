---
title: Microsoft Teams developer platform
description: Overview page describing the Microsoft Teams developer platform
keywords: teams overview
---

# Overview of the Microsoft Teams developer platform

Microsoft Teams is a chat-based workspace in Office 365 that integrates with the apps and services teams use to get work done together.  The Microsoft Teams developer platform makes it easy for you to integrate your own service, whether you develop custom apps for your enterprise or SaaS applications for teams around the world.

For the best and most extensible option for adding your service into Teams, create a Microsoft Teams app.  A Microsoft Teams app is a package of services that you host and that can be distributed through the Teams product or sideloaded by teams.

For quick one-off integration of your existing webhook, you can take advantage of our [custom bot](#custom-bots) feature. With this extensibility option, you can set up webhooks and notifications in a specific team, with no additional coding required.

>Don't have Microsoft Teams? Get a free Office 365 developer subscription or activate it for your existing Office 365 account. See [Set up your Office 365 tenant](setup.md#1-set-up-your-office-365-tenant).

## Apps in Microsoft Teams

With apps in Microsoft Teams, you can make your service available to users within Teams in contexts that make sense, all through one Teams app package that users can acquire through our in-product app gallery, via the Office Store, or sideloaded directly by your team.  Via this single package, your app can assist users

* via multiple **app scopes**, such as in team channels or personally via the user's "app bar"
* via multiple **app capabilities**, such as bots in conversation or tabs in rich web views

<!-- TODO: table of capabilities, screenshots of personal scope -->

Learn more about [scopes in Microsoft Teams](~/concepts/apps/apps-overview#scopes-in-microsoft-teams) and where you can surface your app.

Here are the capabilities your app can leverage today. You can offer all of them in the team scope, and most of them in the personal scope.

### Tabs

Tabs allow team members to access your service on a dedicated canvas, within a channel or in a user's personal app space. You can leverage your existing web app to create a great tab experience within Teams.  Examples of tabs include dashboards and data visualization, documents, notes, task managers, and design canvases.

Tabs in team channels allow teams to work together with the tools and data you provide, in the channel's context,and to have conversations about them.

Personal tabs allow individual users to work privately with your tools and data, in their own dedicated app space.  Use these tabs to surface information catering to the individual such as personal task lists or dashboards, or provide help and support information.

---

[Get started with tabs.](~/concepts/tabs/tabs-overview)

---

![Example of a tab showing data, alongside a conversation about the tab data](~/assets/images/tab_example.png)

### Bots

Build and connect intelligent bots to interact with Microsoft Teams users naturally through chat. Bots can answer natural-language questions and perform lightweight tasks such as querying bug information or kicking off a build.​ Any bot you've created using the [Microsoft Bot Framework](https://dev.botframework.com/) can easily be made to work in Microsoft Teams.

While bots can take advantage of the rich natural-language processing provided by the Bot Framework, your bot can also act as the command-line interface of your experience.  Or you can choose to make a notification-only bot, which can push information relevant to your users directly to them in a channel or direct message.

---

[Get started with bots.](~/concepts/bots/bots-overview)

---

![Example of a bot assisting a user](~/assets/images/bot_example.png)

### Compose extensions

>[Public Developer Preview only](~/reference/general/developer-preview)

Leverage the power of your web service to provide a quick and easy way for your users to insert your content into the chat stream.

---

[Get started with compose extensions.](~/concepts/compose-extensions)

---

![Example of a compose extension](~/assets/images/composeextension/ceoverviewexample.png)

### Connectors

>[Public Developer Preview only](~/reference/general/developer-preview)

Office 365 Connectors are a great way to get useful information and content into Microsoft Teams.

You can integrate your service by posting rich Connector cards into custom incoming webhooks.

---

[Get started with Connectors.](~/concepts/connectors)

---

![Gallery of Connectors](~/assets/images/connector_example.png)
<!-- TODO - update image to latest -->

## Custom bots

*Custom bots* provide a convenient way for you to extend your team. You can easily get up and running with a bot that responds to messages within a team. You can use them for custom workflows and commands, such as kicking off a build or checking the latest set of live-site issues. Custom bots are an easy way of creating interactive bots without having to go through the full process of creating a bot via the Microsoft Bot Framework.  

---

[Get started with custom bots.](~/concepts/custom-bot)

---

## Submit your questions, bugs, feature requests, and contributions

We listen to the developer community across [several channels](~/feedback).
