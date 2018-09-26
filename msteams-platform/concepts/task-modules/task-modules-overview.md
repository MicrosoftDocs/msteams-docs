---
title: Overview of Microsoft Teams Task Modules
description: A task module allows you to create modal popup experiences in your Teams application. Inside the popup, you can run your own custom HTML/JavaScript code, show an <iframe>-based widget such as a YouTube or Microsoft Stream video, or display an Adaptive card.
keywords: task modules modal popup 
ms.date: 09/26/2018
---
# Task modules

> [!NOTE]
> This feature is currently available in [Developer Preview](~/concepts/resources/dev-preview/developer-preview-intro).

A task module allows you to create modal popup experiences in your Teams application. Inside the popup, you can run your own custom HTML/JavaScript code, show an `<iframe>`-based widget such as a YouTube or Microsoft Stream video, or display an [Adaptive card](https://docs.microsoft.com/en-us/adaptive-cards/).

They are called *task modules* because they are especially useful for initiating and completing tasks, although they are also great for displaying rich information such as videos and (for example) Power BI dashboards. We created task modules because many developers asked us for the ability to create arbitrary forms and to re-use existing, well-understood HTML-based flows. A popup can be a more natural UX for initiating and completing tasks in many cases, compared to a tab or a conversation-based bot experience.

Task modules build on the foundation of Microsoft Teams tabs: a task module is essentially a tab in a popup window. It uses the same SDK, so if you've built a tab you are already 90% of the way to being able to create a task module.

Task modules can be invoked in three ways:

* **Channel tabs or personal tabs.** Using the Microsoft Teams Tabs SDK, you can invoke task modules from buttons, links, or menus on your tab. [This is covered in detail here.](~/concepts/task-modules/task-modules-tabs)
* **Bots.** Buttons on [cards](~/concepts/cards/cards) sent from your bot. This is particularly useful when you don't want or need everyone in a channel to see what you are doing with a bot. For example, when you want to have people fill out a poll in a channel, it's not terribly useful to see a record of that poll being created. [This is covered in detail here.](~/concepts/task-modules/task-modules-bots)
* **Outside of Teams from a deep link.** You can also create URLs to invoke a task module from anywhere. [This is covered in detail here.](#task-module-deep-link-syntax)

## What a task module looks like

Here's what a task module looks like when invoked from a bot (without the colored rectangles and numbered circles, of course):

![Task Module Example](~/assets/images/task-module/task-module-example.png)

Let's walk through it:

1. Your app's [`color` icon](~/resources/schema/manifest-schema#icons).
2. Your app's [`short` name](~/resources/schema/manifest-schema#name).
3. The task module's title, specified in the `title` property of the [TaskInfo object](#the-taskinfo-object).
4. The task module's close/cancel button. If the user presses this, your app will receive an `err` event as described [here](~/concepts/task-modules/task-modules-tabs#example-submitting-the-result-of-a-task-module). (**Developer preview note:** It is currently not possible to detect this event when a task module is invoked from a bot. We plan to fix this before we release the task module feature.)
5. This area, indicated by the blue rectangle, is the where your web page appears if you are loading your own web page using the `url` property of the [TaskInfo object](#the-taskinfo-object). Note that the entire area of the task module window, except for its header, is available to you. You can use the entire area if you want; if you want it to be aligned with the header elements and have padding at the bottom, that's up to you, as shown in the red rectangle (number 6, discussed next). This is covered in more detail in [task module sizing](#task-module-sizing) below.
6. This area, indicated by the red rectangle, is aligned with the header area and has padding at the bottom. As described in number 5, this is your responsibility if you are displaying a URL; Teams does this for you if you are displaying an Adaptive card via the `card` property of the [TaskInfo object](#the-taskinfo-object).
7. The "Sign up" button is part of the web page - it is not rendered by Teams. It's completely up to the developer whether the task module has a button or not. With Adaptive cards, the buttons do appear.

## Overview of invoking and dismissing task modules

Since task modules can be invoked from tabs, bots, or deep links, and what appears in one can be either HTML or an Adaptive card, there's a lot of flexibility in terms of how they are invoked and how to deal with the result of a user's interaction with one. The table below summarizes how it works:

| **Invoked via...** | **Task module is HTML/JavaScript** | **Task module is Adaptive card** |
| --- | --- | --- |
| **JavaScript in a tab** | 1. Use the Teams client SDK function `tasks.startTask()` with an optional `submitHandler(err, result)` callback function <br/><br/> 2. In the task module code, when the user is finished, call the Teams SDK function `tasks.submitTask()` with a `result` object as a parameter. If a `submitHandler` callback was specified in `tasks.startTask()`, Teams calls it with `result` as a parameter.<br/><br/> 3. If there was an error when invoking `tasks.startTask()`, the `submitHandler` function is called with an `err` string instead. <br/><br/> 4. Developers can also specify a `completionBotId` when calling `teams.startTask()` - in that case `result` is sent to the bot instead. | 1. Call the Teams client SDK function `tasks.startTask()` with a [TaskInfo object](#the-taskinfo-object) and `TaskInfo.card` containing the JSON for the Adaptive card to show in the task module popup. <br/><br/> 2. If a `submitHandler` callback was specified in `tasks.startTask()`, Teams calls it with an `err` string if there was an error when invoking `tasks.startTask()` or if the user closes the task module popup using the X at the upper right. <br/><br/> 3. If the user presses an Action.Submit button then its `data` object is returned as the value of `result`. |
| **Bot card button** | 1. Bot card buttons, depending on the type of button, can invoke task modules in two ways: a deep link URL or by sending a `task/fetch` message. See below for how deep link URLs work. <br/><br/> 2. If the button's action `type` is `task/fetch` (`Action.Submit` button type for Adaptive cards), a `task/fetch invoke` event is sent to the bot. with the Node.js or C# SDKs, the developer has an `OnInvoke` method with a callback function, the developer responds to the event with an HTTP message: the body of the HTTP response body contains a [TaskInfo object](#the-taskinfo-object); the response is returned with HTTP 200 OK. If the developer is using the Bot Framework REST APIs directly, the `invoke` message is received as an HTTP POST message; the response to that message contains the [TaskInfo object](#the-taskinfo-object). <br/><br/> 3. Teams displays the task module; when the user is finished, call the Teams SDK function `tasks.submitTask()` with a `result` object as a parameter. <br/><br/> 4. The bot receives a `task/submit invoke` message that contains the `result` object. The developer has three different ways to respond to the `task/submit` message: by doing nothing (the task completed successfully), by displaying a message to the user in a popup window, or by invoking another task module window (i.e. creating a wizard-like experience). These three options are discussed more [in the detailed discussion on task/submit](~/concepts/task-modules/task-modules-bots#the-flexibility-of-task-submit). | 1. Like buttons on Bot Framework cards, buttons on Adaptive cards support two ways of invoking task modules: deep link URLs with `Action.openUrl` buttons, and via `task/fetch` using `Action.Submit` buttons. <br/><br/> 2. Task modules with Adaptive cards work very similarly to the HTML/JavaScript case (see left). The major difference is that since there's no JavaScript when you're using Adaptive cards, there's no way to call `tasks.submitTask()`. Instead, Teams takes the `data` object from `Action.Submit` and returns it as the payload of in the `task/submit` event, as described [here](~/concepts/task-modules/task-modules-bots#the-flexibility-of-task-submit). |
| **Deep link URL** <br/>[URL syntax](#task-module-deep-link-syntax) | 1. Teams invokes the task module; the URL that appears inside the `<iframe>` specified in the `url` parameter of the deep link. There is no `submitHandler` callback. <br/><br/> 2. Within the JavaScript of the page in the task module, call `tasks.submitTask()` to close it with a `result` object as a parameter, the same as when invoking it from a tab or a bot card button. Completion logic is slightly different, however. If your completion logic resides on the client (i.e. if there is no bot) there is no `submitHandler` callback, so any completion logic must be in the code preceding the call to `tasks.submitTask()`. Invocation errors are only reported via the console. If you have a bot, then you can specify a `completionBotId` parameter in the deep link to send the `result` object via a `task/submit` event. | 1. Teams invokes the task module; the JSON card body of the Adaptive card is specified as a URL-encoded value of the `card` parameter of the deep link. <br/><br/> 2. The user closes the task module by clicking on the X at the upper right of the task module or by pressing an `Action.Submit` button on the card. Since there is no `submitHandler` to call, you must have a bot to send the value of the Adaptive card fields to. You use the `completionBotId` parameter in the deep link to specify the bot to send the data to via a `task/submit invoke` event. |

## The TaskInfo object

The `TaskInfo` object contains the metadata for a task module. Here's what it contains:

| Attribute | Type | Description |
| --- | --- | --- |
| `title` | string | Appears below the app name and to the right of the app icon |
| `height` | number or string | This can be a number, representing the task module's height in pixels, or a string, one of: `small`, `medium`, `large`. [See below for how height and width are handled](#task-module-sizing). |
| `width` | string | This can be a number, representing the task module's width in pixels, or a string, one of:  `small`, `medium`, `large`. [See below for how height and width are handled](#task-module-sizing). |
| `url` | string | The URL of the page powering the task module experience: it's what is loaded as an `<iframe>` inside the task module. The URL's domain must be in the app's [validDomains[] array](~/resources/schema/manifest-schema#validdomains) in your app's manifest. One of `url` or `card` is required. |
| `card` | Adaptive card or an Adaptive card bot card attachment | The JSON for the Adaptive card to appear in the task module. Bot developers are used to embedding Adaptive card JSON in a Bot Framework `attachment` object; tab developers may not be. Both formats are accepted. [Here's an example.](#adaptive-card-or-adaptive-card-bot-card-attachment) |
| `fallbackUrl` | string | Task modules are not yet supported on Teams mobile clients. If a client does not support the task module feature, this URL is opened in a browser tab. |
| `completionBotId` | string | Specifies a bot ID to send the result of the user's interaction with the task module. If specified, the bot will receive a `task/complete invoke` event with a JSON object in the event payload. |

> [!NOTE]
> The task module feature requires that the domains of the URLs you want to load are included in the `validDomains[]` array in your app's manifest. As a result, must create or modify an app manifest in order to use the task module functionality.

## Task module sizing

If `TaskInfo.width` and `TaskInfo.height` are numbers, Teams will make a best effort to honor the requested width and height. This isn't always possible, depending on the size of the Teams window and screen resolution, but if there's not enough space, Teams will reduce it proportionally, maintaining the aspect ratio (width/height) even as the Teams window is resized.

If `TaskInfo.width` and `TaskInfo.height` are `"small"`, `"medium"`, or `"large"`, Teams sizes the red rectangle in the picture above based on a proportion of the available space: 20%, 50%, 60% for `width`; 20%, 50%, 66% for `height`, respectively.

## Task module CSS for HTML/JavaScript task modules

As mentioned earlier, HTML/JavaScript-based task modules have access to the entire area of the task module below the header. While that offers a great deal of flexibility, if you want padding around the edges, to align with the header elements, and avoid scrollbars, you need to provide the right CSS. Here are some tips for a few use cases.

### Example 1 - YouTube video

YouTube, like many online video sites, offers the ability to embed videos on web pages. Using a simple stub web page, it's easy to show this in a task module:

![YouTube video](~/assets/images/task-module/youtube-example.png)

Here's the HTML for this page, without the CSS, which we'll discuss shortly:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  ⋮
</head>
<body>
  <div id="embed-container">
    <iframe width="1000" height="700" src="https://www.youtube.com/embed/rd0Rd8w3FZ0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen=""></iframe>
  </div>
</body>
</html>
```

Note that there's a `div` enclosing the YouTube `<iframe>`. The CSS looks like this:

```css
#embed-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 95%;
    height: 95%;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-style: none;
}
```

### Example 2 - PowerApp

This CSS should work for most embedded `<iframe>` cases, but you may need to tweak it. For example, you may need to tweak `width` or  `height` if scrollbars appear. For example, here's a tweak needed to optimize the appearance of a specific PowerApp (all of which are sized differently):

![Asset Management PowerApp](~/assets/images/task-module/powerapp-example.png)

```html
<iframe width="720" height="520" style="width: 94%;" src="https://web.powerapps.com/webplayer/iframeapp?source=iframe&screenColor=rgba(104,101,171,1)&appId=/providers/Microsoft.PowerApps/apps/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"></iframe>
```

Note the `style="width: 94%;"` element style: that's all it needed.

### Example 3 - Custom Form

In other cases, you'll only need a few overrides for the CSS you already have. For example, the [example shown at the beginning of this article](#what-a-task-module-looks-like) only needed a few CSS tweaks to align with the header:

```css
body {
    margin: 0;
    padding-left: 4px;
    padding-right: 4px;
}
```

### Adaptive card or Adaptive card bot card attachment

Above, we note that the `card` attribute can be either Adaptive card or an Adaptive card bot attachment, whether you're invoking it from a bot or a tab. That may sound confusing, but it's actually pretty simple; let's look at an example.

Here's a very simple Adaptive card:

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

The point is, there's no need to remember whether you are invoking a task module containing an Adaptive card from a bot or a tab.

## Task module deep link syntax

A task module deep link is just a serialization of the [TaskInfo object](#the-taskinfo-object) with two other pieces of information:

`https://teams.microsoft.com/l/task/APP_ID?url=<TaskInfo.url>&height=<TaskInfo.height>&width=<TaskInfo.width>&title=<TaskInfo.title>&completionBotId=BOT_APP_ID`
`https://teams.microsoft.com/l/task/APP_ID?card=<TaskInfo.card>&height=<TaskInfo.height>&width=<TaskInfo.width>&title=<TaskInfo.title>&completionBotId=BOT_APP_ID`

See [TaskInfo object](#the-taskinfo-object) for the data types and allowable values for `<TaskInfo.url>`, `<TaskInfo.card>`, `<TaskInfo.height>`, `<TaskInfo.width>`, and `<TaskInfo.title>`.

> [!TIP]
> Be sure to URL encode the deep link, especially when using the `card` parameter (for example, JavaScript's [`encodeURI()` function](https://www.w3schools.com/jsref/jsref_encodeURI.asp)).

Here's the information on `APP_ID` and `BOT_APP_ID`:

| Value | Type | Required? | Description |
| --- | --- | --- | --- |
| `APP_ID` | string | Yes | This indicates the [id](~/resources/schema/manifest-schema#id) of the app invoking the task module. The [validDomains[] array](~/resources/schema/manifest-schema#validdomains) in the manifest for `APP_ID` must contain the domain for `url` if `url` is in the URL. (The app ID is already known when a task module is invoked from a tab or a bot, which is why it's not included in `TaskInfo`.) |
| `BOT_APP_ID` | string | No | If a value for `completionBotId` is specified, the `result` object is sent via a a `task/submit invoke` message to the specified bot. `BOT_APP_ID` must be specified as a bot in the app's manifest, i.e. you can't just send it to any bot. |

Note that it's valid for `APP_ID` and `BOT_APP_ID` to be the same, and in many cases will be if an app has a bot since it's recommended to use that as an app's ID if there is one.

## Keyboard and accessibility guidelines

With HTML/JavaScript-based task modules, it is your responsibility to ensure your app's task module can be used with a keyboard. And since screen reader programs also depend on the ability to navigate using the keyboard, proper keyboard support also helps ensure that your task module can be used by the people who use them. As a practical matter, this means two things:

1. Using the [tabindex attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) in your HTML tags to control which elements can be focused, and if/where it particpates in sequential keyboard navigation (usually with the <kbd>Tab</kbd> and <kbd>Shift-Tab</kbd> keys).
2. Handling the event when the user presses the <kbd>Esc</kbd> keyboard button in the JavaScript for your task module. Here's a code sample showing how to do this:

  ```javascript
  // Handle the Esc key
  document.onkeyup = function(event) {
  if (event.key === 27) {
    microsoftTeams.submitTask(null); // this will return an err object to the completionHandler() 
    }
  }
  ```

Microsoft Teams will ensure that keyboard navigation works properly from the task module header into your HTML and vice-versa.

## Task module samples

* [Node.js/TypeScript sample](https://github.com/OfficeDev/microsoft-teams-sample-task-module-nodejs)