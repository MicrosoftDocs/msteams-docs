---
title: Deep link execution and handling in Teams
author: v-npaladugu
description:  In this article, learn how to execute and handle deep links in your Microsoft Teams.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
---

# Execution and handling of deep links

## Executing a deep link

Applications can execute deep links from different contexts. The following is a list of contexts within Teams client and outside the Teams client.

With-in Teams client

* From a tab (personal / shared)

* From a chat message

Outside Teams client

* 3rd Party applications

* Browser

### From a tab (personal / shared)

It's possible to navigate within an app using TeamsJS. The following code demonstrates how to navigate to a specific entity within your Teams app.
Applications can execute a deep link using the JS SDK. To execute a deep link, call the following API:

# [TeamsJS v2](#tab/teamsjs-v2)

You can trigger navigation from your tab using the [pages.navigateToApp()](/javascript/api/@microsoft/teams-js/pages?view=msteams-client-js-latest#@microsoft-teams-js-pages-navigatetoapp&preserve-view=true) function as shown in the following code:

```javascript
if (pages.isSupported()) {
  const navPromise = pages.navigateToApp({ appId: <appId>, pageId: <pageId>, webUrl: <webUrl>, subPageId: <subPageId>, channelId:<channelId>});
  navPromise.
     then((result) => {/*Successful navigation*/}).
     catch((error) => {/*Failed navigation*/});
}
else { /* handle case where capability isn't supported */ }
```

For more information about using the pages capability, see [pages.navigateToApp()](/javascript/api/@microsoft/teams-js/pages?view=msteams-client-js-latest#@microsoft-teams-js-pages-navigatetoapp&preserve-view=true) and the [pages](/javascript/api/@microsoft/teams-js/pages?view=msteams-client-js-latest&preserve-view=true) namespace for other navigation options. If needed, it's also possible to directly open a deep link using the [app.openLink()](/javascript/api/@microsoft/teams-js/app?view=msteams-client-js-latest#@microsoft-teams-js-app-openlink&preserve-view=true) function.

# [TeamsJS v1](#tab/teamsjs-v1)

To trigger a deep link from your tab, call:

```javascript
microsoftTeams.executeDeepLink(/*deepLink*/);
```

---

Application can also use the SDK to execute certain scenarios without building a deep link themselves. Refer to each scenario for sample code.

### From a chat message

Applications can post messages to a chat and add deep links to them. The following are different ways an application can include a deep link in a message

#### Text message - Hyperlink

Applications can add a deep link as a hyper link markdown. The deep link will be executed within teams. Refer the code below:

`add sample`

#### Text message – Raw link

Applications can include the raw link in a message. The deep link will execute within teams. Refer the code below:

`add sample`

### Adaptive Card – Open URL Action  

Applications can include an `open URL` action in an adaptive card and add a deep link to it. The deep link will execute with-in Teams. Refer to the sample adaptive card payload below:
`add sample`

#### Adaptive Card – Hyperlink Markdown (Not recommended)

Applications can include a hyperlink markdown in an adaptive card. This opens in browser first**. Refer to sample payload below:

`add sample`

**Have seen varying results depending on where the link is executed

#### Adaptive Card – Raw link (Not recommended)

Raw link in adaptive card body are not clickable.

### From a bot

#### Bot - Open URL Action

Applications can include an `open URL` action in a bot and add a deep link to it. The deep link will execute with-in Teams. Refer to the sample adaptive card payload below:

#### Bot - Card body

Applications can include the raw link in a Card body. The deep link opens in a browser first. Refer the code below:

#### Bot - Hyperlink

Applications can include a hyperlink markdown in a Bot. This opens in browser first**. Refer to sample payload below:

The navigation behavior of a Teams app extended across Microsoft 365 (Outlook/Office) is dependent on two factors:

The target that the deep link points to.
The host where the Teams app is running.
If the Teams app is running within the host where the deep link is targeted, your app will open directly within the host. However, if the Teams app is running in a different host from where the deep link is targeted, the app will first open in the browser.
