---
title: What are task modules?
author: clearab
description: Add modal popup experiences to collect or display information to your users from your Microsoft Teams apps
localization_priority: Normal
ms.topic: overview
ms.author: anclear
---
# What are task modules?

Task modules allow you to create modal popup experiences in your Teams application. Inside the popup you can run your own custom HTML/JavaScript code, show an `<iframe>`-based widget such as a YouTube or Microsoft Stream video or display an [Adaptive card](/adaptive-cards/). They are especially useful for initiating and completing tasks or displaying rich information like videos or Power BI dashboards. A popup experience is often more natural for users initiating and completing tasks compared to a tab or a conversation-based bot experience.

Task modules build on the foundation of Microsoft Teams tabs; they are essentially a tab inside a popup window. They use the same SDK, so if you've built a tab you are already 90% of the way to being able to create a task module.

Task modules can be invoked in three ways:

* **Channel or personal tabs.** Using the Microsoft Teams Tabs SDK you can invoke task modules from buttons, links or menus on your tab. [This is covered in detail here.](~/task-modules-and-cards/task-modules/task-modules-tabs.md)
* **Bots.** Buttons on [cards](~/task-modules-and-cards/cards/cards-reference.md) sent from your bot. This is particularly useful when you don't need everyone in a channel to see what you are doing with a bot. For example, when having users respond to a poll in a channel it's not terribly useful to see a record of that poll being created. [This is covered in detail here.](~/task-modules-and-cards/task-modules/task-modules-bots.md)
* **Outside of Teams from a deep link.** You can also create URLs to invoke a task module from anywhere. [This is covered in detail here.](#task-module-deep-link-syntax)

## What a task module looks like

Here's what a task module looks like when invoked from a bot (without the colored rectangles and numbered circles, of course):

![Task Module Example](~/assets/images/task-module/task-module-example.png)

Let's walk through it:

1. Your app's [`color` icon](~/resources/schema/manifest-schema.md#icons).
2. Your app's [`short` name](~/resources/schema/manifest-schema.md#name).
3. The task module's title specified in the `title` property of the [TaskInfo object](#the-taskinfo-object).
4. The task module's close/cancel button. If the user presses this, your app will receive an `err` event as described [here](~/task-modules-and-cards/task-modules/task-modules-tabs.md#example-submitting-the-result-of-a-task-module). (**Note:** It is currently not possible to detect this event when a task module is invoked from a bot.)
5. The blue rectangle is the where your web page appears if you are loading your own web page using the `url` property of the [TaskInfo object](#the-taskinfo-object). More detail is in the [task module sizing](#task-module-sizing) section below.
6. If you are displaying an Adaptive card via the `card` property of the [TaskInfo object](#the-taskinfo-object) the padding is added for you, otherwise you'll need to [handle this yourself](#task-module-css-for-htmljavascript-task-modules).
7. Adaptive card buttons will render here. If you're using your own page you must create your own buttons.

## Overview of invoking and dismissing task modules

Task modules can be invoked from tabs, bots or deep links and what appears in one can be either HTML or an Adaptive card, so there's a lot of flexibility in terms of how they are invoked and how to deal with the result of a user's interaction. The table below summarizes how this works:

| **Invoked via...** | **Task module is HTML/JavaScript** | **Task module is Adaptive card** |
| --- | --- | --- |
| **JavaScript in a tab** | 1. Use the Teams client SDK function `tasks.startTask()` with an optional `submitHandler(err, result)` callback function <br/><br/> 2. In the task module code, when the user is finished, call the Teams SDK function `tasks.submitTask()` with a `result` object as a parameter. If a `submitHandler` callback was specified in `tasks.startTask()`, Teams calls it with `result` as a parameter.<br/><br/> 3. If there was an error when invoking `tasks.startTask()`, the `submitHandler` function is called with an `err` string instead. <br/><br/> 4. You can also specify a `completionBotId` when calling `teams.startTask()` - in that case `result` is sent to the bot instead. | 1. Call the Teams client SDK function `tasks.startTask()` with a [TaskInfo object](#the-taskinfo-object) and `TaskInfo.card` containing the JSON for the Adaptive card to show in the task module popup. <br/><br/> 2. If a `submitHandler` callback was specified in `tasks.startTask()`, Teams calls it with an `err` string if there was an error when invoking `tasks.startTask()` or if the user closes the task module popup using the X at the upper right. <br/><br/> 3. If the user presses an Action.Submit button then its `data` object is returned as the value of `result`. |
| **Bot card button** | 1. Bot card buttons, depending on the type of button, can invoke task modules in two ways: a deep link URL or by sending a `task/fetch` message. See below for how deep link URLs work. <br/><br/> 2. If the button's action `type` is `task/fetch` (`Action.Submit` button type for Adaptive cards), a `task/fetch invoke` event (an HTTP POST under the covers) is sent to the bot, and the bot responds to the POST with HTTP 200 and the response body containing a wrapper around the [TaskInfo object](#the-taskinfo-object). This is explained in detail in [invoking a task module via task/fetch](~/task-modules-and-cards/task-modules/task-modules-bots.md#invoking-a-task-module-via-taskfetch).<br/><br/> 3. Teams displays the task module; when the user is finished, call the Teams SDK function `tasks.submitTask()` with a `result` object as a parameter. <br/><br/> 4. The bot receives a `task/submit invoke` message that contains the `result` object. You have three different ways to respond to the `task/submit` message: by doing nothing (the task completed successfully), by displaying a message to the user in a popup window, or by invoking another task module window (i.e. creating a wizard-like experience). These three options are discussed more [in the detailed discussion on task/submit](~/task-modules-and-cards/task-modules/task-modules-bots.md#the-flexibility-of-tasksubmit). | 1. Like buttons on Bot Framework cards, buttons on Adaptive cards support two ways of invoking task modules: deep link URLs with `Action.openUrl` buttons, and via `task/fetch` using `Action.Submit` buttons. <br/><br/> 2. Task modules with Adaptive cards work very similarly to the HTML/JavaScript case (see left). The major difference is that since there's no JavaScript when you're using Adaptive cards, there's no way to call `tasks.submitTask()`. Instead, Teams takes the `data` object from `Action.Submit` and returns it as the payload of in the `task/submit` event, as described [here](~/task-modules-and-cards/task-modules/task-modules-bots.md#the-flexibility-of-tasksubmit). |
| **Deep link URL** <br/>[URL syntax](#task-module-deep-link-syntax) | 1. Teams invokes the task module; the URL that appears inside the `<iframe>` specified in the `url` parameter of the deep link. There is no `submitHandler` callback. <br/><br/> 2. Within the JavaScript of the page in the task module, call `tasks.submitTask()` to close it with a `result` object as a parameter, the same as when invoking it from a tab or a bot card button. Completion logic is slightly different, however. If your completion logic resides on the client (i.e. if there is no bot) there is no `submitHandler` callback, so any completion logic must be in the code preceding the call to `tasks.submitTask()`. Invocation errors are only reported via the console. If you have a bot, then you can specify a `completionBotId` parameter in the deep link to send the `result` object via a `task/submit` event. | 1. Teams invokes the task module; the JSON card body of the Adaptive card is specified as a URL-encoded value of the `card` parameter of the deep link. <br/><br/> 2. The user closes the task module by clicking on the X at the upper right of the task module or by pressing an `Action.Submit` button on the card. Since there is no `submitHandler` to call, you must have a bot to send the value of the Adaptive card fields to. You use the `completionBotId` parameter in the deep link to specify the bot to send the data to via a `task/submit invoke` event. |

> [!NOTE]
> Invoking a task module from JavaScript is not supported on mobile.

## The TaskInfo object

The `TaskInfo` object contains the metadata for a task module. The object definition is below. You **must** define either `url` (for an embedded iFrame) or `card` (for an Adaptive Card).

| Attribute | Type | Description |
| --- | --- | --- |
| `title` | string | Appears below the app name and to the right of the app icon |
| `height` | number or string | This can be a number representing the task module's height in pixels, or `small`, `medium`, or `large`. [See below for how height and width are handled](#task-module-sizing). |
| `width` | number or string | This can be a number representing the task module's width in pixels, or `small`, `medium`, or `large`. [See below for how height and width are handled](#task-module-sizing). |
| `url` | string | The URL of the page loaded as an `<iframe>` inside the task module. The URL's domain must be in the app's [validDomains array](~/resources/schema/manifest-schema.md#validdomains) in your app's manifest. |
| `card` | Adaptive card or an Adaptive card bot card attachment | The JSON for the Adaptive card to appear in the task module. If you're invoking from a bot, you'll need to use the Adaptive card JSON in a Bot Framework `attachment` object. From a tab you'll use just an Adaptive Card. [Here's an example.](#adaptive-card-or-adaptive-card-bot-card-attachment) |
| `fallbackUrl` | string | If a client does not support the task module feature, this URL is opened in a browser tab. |
| `completionBotId` | string | Specifies a bot App ID to send the result of the user's interaction with the task module to. If specified, the bot will receive a `task/submit invoke` event with a JSON object in the event payload. |

> [!NOTE]
> The task module feature requires that the domains of any URLs you want to load are included in the `validDomains` array in your app's manifest.

## Task module sizing

Using integers for `TaskInfo.width` and `TaskInfo.height` will set the height and width in pixels. However, depending on the size of the Team's window and screen resolution they will be reduced proportionally while maintaining the aspect ratio (width/height).

If `TaskInfo.width` and `TaskInfo.height` are `"small"`, `"medium"` or `"large"` the size of the red rectangle in the picture above is a proportion of the available space: 20%, 50%, 60% for `width` and 20%, 50%, 66% for `height`.

Task modules invoked from a tab can be dynamically resized. After calling `tasks.startTask()` you can call `tasks.updateTask(newSize)` where height and width properties on the newSize object conform to the TaskInfo spec (ex. `{ height: 'medium', width: 'medium' }`).

## Task module CSS for HTML/JavaScript task modules

HTML/JavaScript-based task modules have access to the entire area of the task module below the header. While that offers a great deal of flexibility, if you want padding around the edges to align with the header elements and avoid unnecessary scrollbars you'll need to provide the right CSS. Here are some examples for a few use cases.

### Example 1 - YouTube video

YouTube offers the ability to embed videos on web pages. Using a simple stub web page it's easy to show this in a task module:

![YouTube video](~/assets/images/task-module/youtube-example.png)

Here's the HTML for this page, without the CSS:

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

The CSS looks like this:

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

You can use the same approach to embed a PowerApp as well. As the height/width of any individual PowerApp is customizable, you may need to adjust the height and width to achieve your desired presentation.

![Asset Management PowerApp](~/assets/images/task-module/powerapp-example.png)

```html
<iframe width="720" height="520" src="https://web.powerapps.com/webplayer/iframeapp?source=iframe&screenColor=rgba(104,101,171,1)&appId=/providers/Microsoft.PowerApps/apps/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"></iframe>
```

And the CSS is:

```css
#embed-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 94%;
    height: 95%;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-style: none;
}
```

## Adaptive card or Adaptive card bot card attachment

As we noted above, depending on how you're invoking your `card` you'll need to use either an Adaptive card, or an Adaptive card bot card attachment (which is just an Adaptive card wrapped in an attachment object).

When you're invoking from a tab, you'll need to use an adaptive card. Here's a very simple example:

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

When you're invoking from a bot you'll need to use an Adaptive card bot card attachment as in the example below:

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

You'll need to remember whether you are invoking a task module containing an Adaptive card from a bot or a tab.

## Task module deep link syntax

A task module deep link is just a serialization of the [TaskInfo object](#the-taskinfo-object) with two other pieces of information, `APP_ID` and optionally the `BOT_APP_ID`:

`https://teams.microsoft.com/l/task/APP_ID?url=<TaskInfo.url>&height=<TaskInfo.height>&width=<TaskInfo.width>&title=<TaskInfo.title>&completionBotId=BOT_APP_ID`

`https://teams.microsoft.com/l/task/APP_ID?card=<TaskInfo.card>&height=<TaskInfo.height>&width=<TaskInfo.width>&title=<TaskInfo.title>&completionBotId=BOT_APP_ID`

See [TaskInfo object](#the-taskinfo-object) for the data types and allowable values for `<TaskInfo.url>`, `<TaskInfo.card>`, `<TaskInfo.height>`, `<TaskInfo.width>`, and `<TaskInfo.title>`.

> [!TIP]
> Be sure to URL encode the deep link, especially when using the `card` parameter (for example, JavaScript's [`encodeURI()` function](https://www.w3schools.com/jsref/jsref_encodeURI.asp)).

Here's the information on `APP_ID` and `BOT_APP_ID`:

| Value | Type | Required? | Description |
| --- | --- | --- | --- |
| `APP_ID` | string | Yes | The [id](~/resources/schema/manifest-schema.md#id) of the app invoking the task module. The [validDomains array](~/resources/schema/manifest-schema.md#validdomains) in the manifest for `APP_ID` must contain the domain for `url` if `url` is in the URL. (The app ID is already known when a task module is invoked from a tab or a bot, which is why it's not included in `TaskInfo`.) |
| `BOT_APP_ID` | string | No | If a value for `completionBotId` is specified, the `result` object is sent via a a `task/submit invoke` message to the specified bot. `BOT_APP_ID` must be specified as a bot in the app's manifest, i.e. you can't just send it to any bot. |

Note that it's valid for `APP_ID` and `BOT_APP_ID` to be the same, and in many cases will be if an app has a bot since it's recommended to use that as an app's ID if there is one.

## Keyboard and accessibility guidelines

With HTML/JavaScript-based task modules it is your responsibility to ensure your app's task module can be used with a keyboard. Screen reader programs also depend on the ability to navigate using the keyboard. As a practical matter this means two things:

1. Using the [tabindex attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) in your HTML tags to control which elements can be focused and if/where it participates in sequential keyboard navigation (usually with the <kbd>Tab</kbd> and <kbd>Shift-Tab</kbd> keys).
2. Handling the <kbd>Esc</kbd> key in the JavaScript for your task module. Here's a code sample showing how to do this:

  ```javascript
  // Handle the Esc key
  document.onkeyup = function(event) {
  if ((event.key === 27) || (event.key === "Escape")) {
    microsoftTeams.submitTask(null); // this will return an err object to the completionHandler()
    }
  }
  ```

Microsoft Teams will ensure that keyboard navigation works properly from the task module header into your HTML and vice-versa.

## Code sample
|**Sample name** | **Description** | **.NET** | **Node.js**|
|----------------|-----------------|--------------|----------------|
|Task module sample (Bots-V4) | Samples for creating task modules. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-task-module/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-task-module/nodejs)| 
|Task module sample (Tabs + Bots-V3) | Samples for creating task modules. |[View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/csharp_dotnetcore/54.teams-task-module)|[View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/javascript_nodejs/54.teams-task-module)|



> [!div class="nextstepaction"]
> [Learn  more: Request device permissions](../concepts/device-capabilities/native-device-permissions.md)

> [!div class="nextstepaction"]
> [Learn more: Integrate media capabilities](../concepts/device-capabilities/mobile-camera-image-permissions.md)

> [!div class="nextstepaction"]
> [Learn more: Integrate QR or barcode scanner capability in Teams](../concepts/device-capabilities/qr-barcode-scanner-capability.md)

> [!div class="nextstepaction"]
> [Learn more: Integrate location capabilities in Teams](../concepts/device-capabilities/location-capability.md)