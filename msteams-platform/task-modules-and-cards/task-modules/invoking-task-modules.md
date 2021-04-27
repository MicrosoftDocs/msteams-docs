---
title: Invoke and dismiss task modules
description: Invoke and dismiss task modules.
author: surbhigupta12
ms.topic: conceptual
localization_priority: Normal
---

# Invoke and dismiss task modules

Task modules can be invoked from tabs, bots, or deep links and what appears in one can be either HTML or an Adaptive Card. There is a lot of flexibility in terms of how task modules are invoked and how to deal with the result of a user's interaction. The table below summarizes how this works:

| Invoked using | Task module is HTML or JavaScript | Task module is Adaptive Card |
| --- | --- | --- |
| JavaScript in a tab | 1. Use the Teams client SDK function `tasks.startTask()` with an optional `submitHandler(err, result)` callback function <br/><br/> 2. In the task module code, when the user has performed the actions, call the Teams SDK function `tasks.submitTask()` with a `result` object as a parameter. If a `submitHandler` callback was specified in `tasks.startTask()`, Teams calls it with `result` as a parameter.<br/><br/> 3. If there was an error when invoking `tasks.startTask()`, the `submitHandler` function is called with an `err` string instead. <br/><br/> 4. You can also specify a `completionBotId` when calling `teams.startTask()`. Then the `result` is sent to the bot instead. | 1. Call the Teams client SDK function `tasks.startTask()` with a [TaskInfo object](#the-taskinfo-object) and `TaskInfo.card` containing the JSON for the Adaptive Card to show in the task module pop-up. <br/><br/> 2. If a `submitHandler` callback was specified in `tasks.startTask()`, Teams calls it with an `err` string, if there was an error when invoking `tasks.startTask()` or if the user closes the task module pop-up using the X at the upper right. <br/><br/> 3. If the user presses an `Action.Submit` button then its `data` object is returned as the value of `result`. |
| Bot card button | 1. Bot card buttons, depending on the type of button, can invoke task modules in two ways, a deep link URL or by sending a `task/fetch` message. <br/><br/> 2. If the button's action `type` is `task/fetch` that is `Action.Submit` button type for Adaptive Cards, a `task/fetch invoke` event that is an HTTP POST is sent to the bot. The bot responds to the POST with HTTP 200 and the response body containing a wrapper around the [TaskInfo object](#the-taskinfo-object). For more information, see [invoking a task module using `task/fetch`](~/task-modules-and-cards/task-modules/task-modules-bots.md#invoke-a-task-module-using-taskfetch).<br/><br/> 3. Teams displays the task module. Wwhen the user has performed the actions, call the Teams SDK function `tasks.submitTask()` with a `result` object as a parameter. <br/><br/> 4. The bot receives a `task/submit invoke` message that contains the `result` object. You have three different ways to respond to the `task/submit` message, by doing nothing that is the task completed successfully, by displaying a message to the user in a pop-up window, or by invoking another task module window that is creating a wizard-like experience. For more information, see [detailed discussion on `task/submit`](~/task-modules-and-cards/task-modules/task-modules-bots.md#the-flexibility-of-tasksubmit). | 1. Like buttons on Bot Framework cards, buttons on Adaptive cards support two ways of invoking task modules, deep link URLs with `Action.openUrl` buttons, and `task/fetch` using `Action.Submit` buttons. <br/><br/> 2. Task modules with Adaptive Cards work very similarly to the HTML or JavaScript case. The major difference is that since there is no JavaScript when you are using Adaptive cards, there is no way to call `tasks.submitTask()`. Instead, Teams takes the `data` object from `Action.Submit` and returns it as the payload of the `task/submit` event. For more information, see [flexibility of `task/submit`](~/task-modules-and-cards/task-modules/task-modules-bots.md#the-flexibility-of-tasksubmit). |
| Deep link URL <br/>[URL syntax](#task-module-deep-link-syntax) | 1. Teams invokes the task module that is the URL that appears inside the `<iframe>` specified in the `url` parameter of the deep link. There is no `submitHandler` callback. <br/><br/> 2. Within the JavaScript of the page in the task module, call `tasks.submitTask()` to close it with a `result` object as a parameter, the same as when invoking it from a tab or a bot card button. However, completion logic is slightly different. If your completion logic resides on the client that is if there is no bot, there is no `submitHandler` callback, so any completion logic must be in the code preceding the call to `tasks.submitTask()`. Invocation errors are only reported via the console. If you have a bot, then you can specify a `completionBotId` parameter in the deep link to send the `result` object via a `task/submit` event. | 1. Teams invokes the task module that is the JSON card body of the Adaptive Card is specified as a URL-encoded value of the `card` parameter of the deep link. <br/><br/> 2. The user closes the task module by clicking on the X at the upper right of the task module or by pressing an `Action.Submit` button on the card. Since there is no `submitHandler` to call, you must have a bot to send the value of the Adaptive Card fields. You use the `completionBotId` parameter in the deep link to specify the bot to send the data to using a `task/submit invoke` event. |

> [!NOTE]
> Invoking a task module from JavaScript is not supported on mobile.

Now you can go through the `TaskInfo` object that defines certain attributes for a task module.

## The TaskInfo object

The `TaskInfo` object contains the metadata for a task module. You must define either `url` for an embedded iFrame or `card` for an Adaptive Card. The following table provides the object definition:

| Attribute | Type | Description |
| --- | --- | --- |
| `title` | string | This attribute appears below the app name and to the right of the app icon. |
| `height` | number or string | This attribute can be a number representing the task module's height in pixels, or `small`, `medium`, or `large`. For more information, see [task module sizing](#task-module-sizing). |
| `width` | number or string | This attribute can be a number representing the task module's width in pixels, or `small`, `medium`, or `large`. For more information, see [task module sizing](#task-module-sizing). |
| `url` | string | This attribute is the URL of the page loaded as an `<iframe>` inside the task module. The URL's domain must be in the app's [validDomains array](~/resources/schema/manifest-schema.md#validdomains) in your app's manifest. |
| `card` | Adaptive Card or an Adaptive Card bot card attachment | This attribute is the JSON for the Adaptive Card to appear in the task module. If you are invoking from a bot, you must use the Adaptive Card JSON in a Bot Framework `attachment` object. From a tab you must use an Adaptive Card. For more information, see [Adaptive Card or Adaptive Card bot card attachment](#adaptive-card-or-adaptive-card-bot-card-attachment) |
| `fallbackUrl` | string | This attribute opens the URL in a browser tab, if a client does not support the task module feature. |
| `completionBotId` | string | This attribute specifies a bot App ID to send the result of the user's interaction with the task module. If specified, the bot receives a `task/submit invoke` event with a JSON object in the event payload. |

> [!NOTE]
> The task module feature requires that the domains of any URLs you want to load are included in the `validDomains` array in your app's manifest.

Now you can go through task module sizing that enables you to set the height and width of the task module.

## Task module sizing

Using integers for `TaskInfo.width` and `TaskInfo.height`, sets the height and width in pixels. However, depending on the size of the Team's window and screen resolution they are reduced proportionally while maintaining the aspect ratio that is width or height.

If `TaskInfo.width` and `TaskInfo.height` are `"small"`, `"medium"` or `"large"`, the size of the red rectangle in the following image is a proportion of the available space, 20%, 50%, 60% for `width` and 20%, 50%, 66% for `height`:

![Task module example](~/assets/images/task-module/task-module-example.png)

Task modules invoked from a tab can be dynamically resized. After calling `tasks.startTask()` you can call `tasks.updateTask(newSize)` where height and width properties on the newSize object conform to the TaskInfo specification, for example `{ height: 'medium', width: 'medium' }`).

The next section provides examples of embedding task modules in a YouTube video and a PowerApp.

## Task module CSS for HTML or JavaScript task modules

HTML or JavaScript-based task modules have access to the entire area of the task module below the header. While that offers a great deal of flexibility, if you want padding around the edges to align with the header elements and avoid unnecessary scroll bars you must provide the right CSS. The next sections provide some examples for a few use cases.

### Example 1 YouTube video

YouTube offers the ability to embed videos on web pages. Using a simple stub web page it is easy to show this in a task module:

![YouTube video](~/assets/images/task-module/youtube-example.png)

The following code provides an example of the HTML for the web page without the CSS:

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

The following code provides an example of the CSS:

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

### Example 2 PowerApp

You can use the same approach to embed a PowerApp as well. As the height or width of any individual PowerApp is customizable, you can adjust the height and width to achieve your desired presentation.

![Asset Management PowerApp](~/assets/images/task-module/powerapp-example.png)

The following code provides an example of the HTML for PowerApp:

```html
<iframe width="720" height="520" src="https://web.powerapps.com/webplayer/iframeapp?source=iframe&screenColor=rgba(104,101,171,1)&appId=/providers/Microsoft.PowerApps/apps/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"></iframe>
```

The following code provides an example of the CSS:

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

The next section provides details on invoking your card using Adaptive Card or Adaptive Card bot card attachment.

## Adaptive Card or Adaptive Card bot card attachment

Depending on how you are invoking your `card`, you must use either an Adaptive Card, or an Adaptive Card bot card attachment, which is an Adaptive Card wrapped in an attachment object.

When you are invoking from a tab, you must use an Adaptive Card.

The following code provides an example of an Adaptive Card:

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

The following code provides an example of an Adaptive Card bot card attachment when you are invoking from a bot:

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

The next section provides details on task module deep link syntax including the `TaskInfo` object and `APP_ID` and `BOT_APP_ID`.

## Task module deep link syntax

A task module deep link is a serialization of the [TaskInfo object](#the-taskinfo-object) with the following two other details, `APP_ID` and optionally the `BOT_APP_ID`:

`https://teams.microsoft.com/l/task/APP_ID?url=<TaskInfo.url>&height=<TaskInfo.height>&width=<TaskInfo.width>&title=<TaskInfo.title>&completionBotId=BOT_APP_ID`

`https://teams.microsoft.com/l/task/APP_ID?card=<TaskInfo.card>&height=<TaskInfo.height>&width=<TaskInfo.width>&title=<TaskInfo.title>&completionBotId=BOT_APP_ID`

For the data types and allowable values for `<TaskInfo.url>`, `<TaskInfo.card>`, `<TaskInfo.height>`, `<TaskInfo.width>`, and `<TaskInfo.title>`, see [TaskInfo object](#the-taskinfo-object).

> [!TIP]
> Be sure to URL encode the deep link, especially when using the `card` parameter, for example JavaScript's [`encodeURI()` function](https://www.w3schools.com/jsref/jsref_encodeURI.asp).

The following table provides information on `APP_ID` and `BOT_APP_ID`:

| Value | Type | Required? | Description |
| --- | --- | --- | --- |
| `APP_ID` | string | Yes | The [id](~/resources/schema/manifest-schema.md#id) of the app invoking the task module. The [validDomains array](~/resources/schema/manifest-schema.md#validdomains) in the manifest for `APP_ID` must contain the domain for `url` if `url` is in the URL. The app ID is already known when a task module is invoked from a tab or a bot, which is why it is not included in `TaskInfo`. |
| `BOT_APP_ID` | string | No | If a value for `completionBotId` is specified, the `result` object is sent using a `task/submit invoke` message to the specified bot. `BOT_APP_ID` must be specified as a bot in the app's manifest, that is you cannot send it to any bot. |

> [!NOTE]
> `APP_ID` and `BOT_APP_ID` can be the same in many cases, if an app has a bot as it is recommended to use that as an app's ID if there is one.

The next section provides details on using a keyboard with your app's task module.

## Keyboard and accessibility guidelines

With HTML or JavaScript-based task modules it is your responsibility to ensure your app's task module can be used with a keyboard. Screen reader programs also depend on the ability to navigate using the keyboard. This includes the following two things:

* Using the [tabindex attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) in your HTML tags to control which elements can be focused and if or where it participates in sequential keyboard navigation usually with the <kbd>Tab</kbd> and <kbd>Shift-Tab</kbd> keys.
* Handling the <kbd>Esc</kbd> key in the JavaScript for your task module. The following code provides an example of how to handle the <kbd>Esc</kbd> key:

    ```javascript
    // Handle the Esc key
    document.onkeyup = function(event) {
    if ((event.key === 27) || (event.key === "Escape")) {
      microsoftTeams.submitTask(null); // this will return an err object to the completionHandler()
      }
    }
    ```

Microsoft Teams ensures that keyboard navigation works properly from the task module header into your HTML and vice-versa.

## Code sample

|Sample name | Description | .NET | Node.js|
|----------------|-----------------|--------------|----------------|
|Task module sample bots-V4 | Samples for creating task modules. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-task-module/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/app-task-module/nodejs)| 
|Task module sample tabs and bots-V3 | Samples for creating task modules. |[View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/csharp_dotnetcore/54.teams-task-module)|[View](https://github.com/microsoft/BotBuilder-Samples/tree/main/samples/javascript_nodejs/54.teams-task-module)|

## See also

* [Request device permissions](~/concepts/device-capabilities/native-device-permissions.md)
* [Integrate media capabilities](~/concepts/device-capabilities/mobile-camera-image-permissions.md)
* [Integrate QR or barcode scanner capability in Teams](~/concepts/device-capabilities/qr-barcode-scanner-capability.md)
* [Integrate location capabilities in Teams](~/concepts/device-capabilities/location-capability.md)
* [Using task modules in tabs](~/task-modules-and-cards/task-modules/task-modules-tabs.md)