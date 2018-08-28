---
title: Overview of Microsoft Teams Task Modules
description: A task module allows you to create modal popup experiences in your Teams application. Inside the popup, you can run your own custom HTML/JavaScript code, show an <iframe>-based widget such as a YouTube or Microsoft Stream video, or display an Adaptive Card.
keywords: task modules modal popup 
ms.date: 08/27/2018
---
# Task Modules

A task module allows you to create modal popup experiences in your Teams application. Inside the popup, you can run your own custom HTML/JavaScript code, show an &lt;iframe&gt;-based widget such as a YouTube or Microsoft Stream video, or display an [Adaptive Card](https://docs.microsoft.com/en-us/adaptive-cards/).

They are called *task modules* because they are especially useful for initiating and completing tasks, although they are also great for displaying rich information such as videos and (for example) Power BI dashboards. We created task module because many developers asked us for the ability to create arbitrary forms and to re-use existing, well-understood HTML-based flows. A popup can be a more natural UX for initiating and completing tasks in many cases, compared to a tab or a conversation-based bot experience.

Task modules can be invoked in three ways:

* **Channel tabs or personal tabs.** Using the Microsoft Teams Tabs SDK, you can invoke task modules from buttons, links, or menus on your tab.
* **Bots.** Buttons on [cards](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/cards/cards) sent from your bot. This is particularly useful when you don't want or need everyone in a channel to see what you are doing with a bot. For example, when you want to have people fill out a poll in a channel, it's not terribly useful to see a record of that poll being created.
* **Outside of Teams from a deep link.** You can also create URLs to invoke a task module from anywhere.

## What a task module looks like

Here's what a task module looks like when invoked from a bot: ($TODO - Need Final image)

![Task Module Example](~/assets/images/task-module/task-module-example.png)

Let's walk through it:

1. Your app's [`color` icon](~/resources/schema/manifest-schema#icons).
2. Your app's [`short` name](~/resources/schema/manifest-schema#name).
3. The task module's title, specified in the `title` property of the [`taskInfo` object](#the-taskinfo-object).
4. The task module's close/cancel button. If the user presses this, your app will receive an `error` event as described [$TODO]($TODO) and [$TODO]($TODO). 
5. This area is where your web page or Adaptive Card appears. The URL or Adaptive Card JSON are also properties of the [`taskInfo` object](#the-taskinfo-object).
6. The "Sign up" button is part of the web page - it is not rendered by Teams. It's completely up to the developer whether the task module has a button or not.

## Overview of invoking and dismissing task modules

Since task modules can be invoked from tabs, bots, or deep links, and what appears in one can be either HTML or an Adaptive Card, there's a lot of flexibility in terms of how they are invoked and how to deal with the result of a user's interaction with one. The table below summarizes how it works:

| **Invoked via...** | **Task module is HTML/JavaScript** | **Task module is Adaptive Card** |
| ------------------ | ------------------- | ----------------- |
| **JavaScript in a tab** | 1. Use the Teams client SDK function `tasks.startTask()` with an optional `submitHandler(error, result)` callback function <br/><br/> 2. In the task module code, when the user is finished, call the Teams SDK function `tasks.submitTask()` with a `result` object as a parameter. If a `submitHandler` callback was specified in `tasks.startTask()`, Teams calls it with `result` as a parameter.<br/><br/> 3. If there was an error when invoking `tasks.startTask()`, the `submitHandler` function is called with an `error` string instead. <br/><br/> 4. Developers can also specify a `completionBotId` when calling `teams.startTask()` - in that case `result` is sent to the bot instead. | 1. Call the Teams client SDK function `tasks.startTask()` with a [`taskInfo` object](#the-taskinfo-object) and `taskInfo.card` containing the JSON for the Adaptive Card to show in the task module popup. <br/><br/> 2. If a `submitHandler` callback was specified in `tasks.startTask()`, Teams calls it with an `error` string if there was an error when invoking `tasks.startTask()` or if the user closes the task module popup using the X at the upper right. <br/><br/> 3. If the user presses an Action.Submit button then its `data` object is returned as the value of `result`. |
| **Bot card button** | 1. Bot card buttons, depending on the type of button, can invoke task modules in two ways: a deep link URL or by sending a `task/fetch` message. See below for how deep link URLs work. <br/><br/> 2. If the button's action `type` is `task/fetch` (`Action.Submit` button type for Adaptive Cards), a `task/fetch invoke` event is sent to the bot. with the Node.js or C# SDKs, the developer has an `OnInvoke` method with a callback function, the developer responds to the event with an HTTP message: the body of the HTTP response body contains a [`taskInfo` object](#the-taskinfo-object); the response is returned with HTTP 200 OK. If the developer is using the Bot Framework REST APIs directly, the `invoke` message is received as an HTTP POST message; the response to that message contains the [`taskInfo` object](#the-taskinfo-object). <br/><br/> 3. Teams displays the task module; when the user is finished, call the Teams SDK function `tasks.submitTask()` with a `result` object as a parameter. <br/><br/> 4. The bot receives a `task/submit invoke` message that contains the `result` object. The developer has three different ways to respond to the `task/submit` message: by doing nothing (the task completed successfully), by displaying a message to the user in a popup window, or by invoking another task module window (i.e. creating a wizard-like experience). These three options are discussed more [here - $TODO]($TODO). | 1. Like buttons on Bot Framework cards, buttons on Adaptive Cards support two ways of invoking task modules: deep link URLs with `Action.openUrl` buttons, and via `task/fetch` using `Action.Submit` buttons. <br/><br/> 2. Task modules with Adaptive Cards work very similarly to the HTML/JavaScript case (see left). The major difference is that since there's no JavaScript when you're using Adaptive Cards, there's no way to call `tasks.submitTask()`. Instead, Teams takes the `data` object from `Action.Submit` and returns it as the payload of in the `task/submit` event, as described [here - $TODO]($TODO). |
| **Deep link URL** <br/><br/>[URL syntax](#task-module-deep-link-syntax) | 1. Teams invokes the task module; the URL that appears inside the &lt;iframe&gt; specified in the `url` parameter of the deep link. There is no `submitHandler` callback. <br/><br/> 2. Within the JavaScript of the page in the task module, call `tasks.submitTask()` to close it with a `result` object as a parameter, the same as when invoking it from a tab or a bot card button. Completion logic is slightly different, however. If your completion logic resides on the client (i.e. if there is no bot) there is no `submitHandler` callback, so any completion logic must be in the code preceding the call to `tasks.submitTask()`. Invocation errors are only reported via the console. If you have a bot, then you can specify a `completionBotId` parameter in the deep link to send the `result` object via a `task/submit` event. | 1. Teams invokes the task module; the JSON card body of the Adaptive Card is specified as a URL-encoded value of the `card` parameter of the deep link. <br/><br/> 2. The uesr closes the task module by clicking on the X at the upper right of the task module or by pressing an `Action.Submit` button on the card. Since there is no `submitHandler` to call, you must have a bot to send the value of the Adaptive Card fields to. You use the `completionBotId` parameter in the deep link to specify the bot to send the data to via a `task/submit invoke` event. |

## The taskInfo object

The `taskInfo` object contains the metadata for a task module. Here's what it contains:

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `title` | string | Appears below the app name and to the right of the app icon |
| `height` | number or string | This can be a number, representing the task module's height in pixels, or a string, one of: `small`, `medium`, `large`. [See below for how height and width are handled](#task-module-sizing). |
| `width` | string | This can be a number, representing the task module's width in pixels, or a string, one of:  `small`, `medium`, `large`. [See below for how height and width are handled](#task-module-sizing). |
| `url` | string | The URL of the page powering the task module experience: it's what is loaded as an &lt;iframe&gt; inside the task module. The URL's domain must be in the app's [`validDomains[]` array](~/resources/schema/manifest-schema#validdomains). One of `url` or `card` is required. |
| `card` | Adaptive Card or an Adaptive Card bot card attachment | The JSON for the Adaptive Card to appear in the task module. Bot developers are used to embedding Adaptive Card JSON in a Bot Framework `attachment` object; tab developers may not be. Both formats are accepted. [Here's an example.](#adaptive-card-or-adaptive-card-bot-card-attachment) |
| `fallbackUrl` | string | Task modules are not yet supported on Teams mobile clients. If a client does not support the task module feature, this URL is opened in a browser tab. |
| `completionBotId` | string | Specifies a bot ID to send the result of the user's interaction with the task module. If specified, the bot will receive a `task/complete invoke` event with a JSON object in the event payload. |

### Task module sizing

If `taskInfo.width` and `taskInfo.height` are numbers, Teams will make a best effort to honor the requested width and height. This isn't always possible, depending on the size of the Teams window and screen resolution, but if there's not enough space, Teams will reduce it proportionally, honoring the aspect ratio of width/height.

If `taskInfo.width` and `taskInfo.height` are `small`, `medium`, or `large`, Teams sizes the red rectangle in the picture above based on a proportion of the available space: 20%/50%/60% for `width`, and 20%/50%/66% for `height`, respectively.

### Adaptive Card or Adaptive Card bot card attachment

Above, we note that the `card` attribute can be either Adaptive Card or an Adaptive Card bot attachment, whether you're invoking it from a bot or a tab. That may sound confusing, but it's actually pretty simple; let's look at an example.

Here's a very simple Adaptive Card:

```json
{
    "type": "AdaptiveCard",
    "body": [
        {
            "type": "TextBlock",
            "text": "Here is a ninja cat:"
        },
        {
            "type": "Image",
            "url": "http://adaptivecards.io/content/cats/1.png",
            "size": "Medium"
        }
    ],
    "version": "1.0"
}
```

With task modules, the value of `card` can be what's shown above, or it can be in a Bot Framework card attachment with what's shown above as the *value* of the `content` attribute:

```json
{
    "contentType": "application/vnd.microsoft.card.adaptive",
    "content": {
        "type": "AdaptiveCard",
        "body": [
            {
                "type": "TextBlock",
                "text": "Here is a ninja cat:"
            },
            {
                "type": "Image",
                "url": "http://adaptivecards.io/content/cats/1.png",
                "size": "Medium"
            }
        ],
        "version": "1.0"
    }
}
```

The point is, there's no need to remember whether you are invoking a task module containing an Adaptive Card from a bot or a tab.

## Task module deep link syntax

A task module deep link is just a serialization of the [`taskInfo` object](#the-taskinfo-object) with two other pieces of information:

`https://teams.microsoft.com/l/task/APP_ID?url=<taskInfo.url>&height=<taskInfo.height>&width=<taskInfo.width>&title=<taskInfo.title>&completionBotId=BOT_APP_ID`
`https://teams.microsoft.com/l/task/APP_ID?card=<taskInfo.card>&height=<taskInfo.height>&width=<taskInfo.width>&title=<taskInfo.title>&completionBotId=BOT_APP_ID`

See [`taskInfo` object](#the-taskinfo-object) for the data types and allowable values for `<taskInfo.url>`, `<taskInfo.url>`, `<taskInfo.height>`, `<taskInfo.width>`, and `<taskInfo.title>`.

> [!TIP]
> Be sure to URL encode the deep link, especially when using the `card` parameter (for example, JavaScript's [`encodeURI()` function](https://www.w3schools.com/jsref/jsref_encodeURI.asp)).

Here's the information on `APP_ID` and `BOT_APP_ID`:

| Value | Type | Required? | Description |
| ----- | ---- | --------- | ----------- |
| `APP_ID` | string | Yes | This indicates the [id](~/resources/schema/manifest-schema#id) of the app invoking the task module. The [`validDomains[]` array](~/resources/schema/manifest-schema#validdomains) in the manifest for `APP_ID` must contain the domain for `url` if `url` is in the URL. (The app ID is already known when a task module is invoked from a tab or a bot, which is why it's not included in `taskInfo`.) |
| `BOT_APP_ID` | string | No | If a value for `completionBotId` is specified, the `result` object is sent via a a `task/submit invoke` message to the specified bot. `BOT_APP_ID` must be specified as a bot in the app's manifest, i.e. you can't just send it to any bot. |

Note that it's valid for `APP_ID` and `BOT_APP_ID` to be the same, and in many cases will be if an app has a bot since it's recommended to use that as an app's ID if there is one.