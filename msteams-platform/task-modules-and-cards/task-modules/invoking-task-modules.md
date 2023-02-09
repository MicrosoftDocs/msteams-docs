---
title: Invoke and dismiss task modules
description: Learn about invoking and dismissing task modules, task info object, task module sizing, task module deep link syntax using Code samples
author: surbhigupta12
ms.topic: conceptual
ms.localizationpriority: medium
---

# Invoke and dismiss task modules

Task modules can be invoked from tabs, bots, or deep links. The response can be either in HTML, JavaScript, or as an Adaptive Card. There's a numerous flexibilities in terms of how task modules are invoked and how to deal with the response of the user's interaction. The following table summarizes how this works:

| Invoked using | Task module with HTML or JavaScript | Task module with Adaptive Card |
| --- | --- | --- |
| JavaScript in a tab | 1. Use the Teams client SDK function `tasks.startTask()` with an optional `submitHandler(err, result)` callback function. <br/><br/> 2. In the task module code, when the user has performed the actions, call the Teams SDK function `tasks.submitTask()` with a `result` object as a parameter. If a `submitHandler` callback was specified in `tasks.startTask()`, Teams calls it with `result` as a parameter. If there was an error when invoking `tasks.startTask()`, the `submitHandler` function is called with an `err` string instead. <br/><br/> 3. You can also specify a `completionBotId` when calling `teams.startTask()`. Then the `result` is sent to the bot instead. | 1. Call the Teams client SDK function `tasks.startTask()` with a [TaskInfo object](#the-taskinfo-object) and `TaskInfo.card` containing the JSON for the Adaptive Card to show in the task module pop-up. <br/><br/> 2. If a `submitHandler` callback was specified in `tasks.startTask()`, Teams calls it with an `err` string, if there was an error when invoking `tasks.startTask()` or if the user closes the task module pop-up using the X at the upper right. <br/><br/> 3. If the user presses an `Action.Submit` button then its `data` object is returned as the value of `result`. |
| Bot card button | 1. Bot card buttons, depending on the type of button, can invoke task modules in two ways, a deep link URL or by sending a `task/fetch` message. <br/><br/> 2. If the button's action `type` is `task/fetch` that is `Action.Submit` button type for Adaptive Cards, a `task/fetch invoke` event that is an HTTP POST is sent to the bot. The bot responds to the POST with HTTP 200 and the response body containing a wrapper around the [TaskInfo object](#the-taskinfo-object). For more information, see [invoking a task module using `task/fetch`](~/task-modules-and-cards/task-modules/task-modules-bots.md#invoke-a-task-module-using-taskfetch). Teams displays the task module. <br/><br/> 3. After the user has performed the actions, call the Teams SDK function `tasks.submitTask()` with a `result` object as a parameter. The bot receives a `task/submit invoke` message that contains the `result` object. <br/><br/> 4. You have three different ways to respond to the `task/submit` message, by doing nothing that is the task completed successfully, by displaying a message to the user in a pop-up window, or by invoking another task module window. For more information, see [detailed discussion on `task/submit`](task-modules-bots.md#responds-to-the-tasksubmit-messages). | <ul><li> Like buttons on Bot Framework cards, buttons on Adaptive Cards support two ways of invoking task modules, deep link URLs with `Action.openUrl` buttons, and `task/fetch` using `Action.Submit` buttons. </li></ul> <br/><br/> <ul><li> Task modules with Adaptive Cards work similarly to the HTML or JavaScript case. The major difference is that since there's no JavaScript when you're using Adaptive Cards, there's no way to call `tasks.submitTask()`. Instead, Teams takes the `data` object from `Action.Submit` and returns it as the payload of the `task/submit` event. For more information, see [responds to the `task/submit`messages](task-modules-bots.md#responds-to-the-tasksubmit-messages). </li></ul> |
| Deep link URL <br/>[URL syntax](~/concepts/build-and-test/deep-link-application.md#deep-link-to-open-a-task-module) | 1. Teams invokes the task module that is the URL that appears inside the `<iframe>` specified in the `url` parameter of the deep link. There's no `submitHandler` callback. <br/><br/> 2. Within the JavaScript of the page in the task module, call `tasks.submitTask()` to close it with a `result` object as a parameter, the same as when invoking it from a tab or a bot card button. However, completion logic is slightly different. If your completion logic resides on the client that is if there's no bot, there's no `submitHandler` callback, so any completion logic must be in the code preceding the call to `tasks.submitTask()`. Invocation errors are only reported through the console. If you have a bot, then you can specify a `completionBotId` parameter in the deep link to send the `result` object through a `task/submit` event. | 1. Teams invokes the task module that is the JSON card body of the Adaptive Card that is specified as a URL-encoded value of the `card` parameter of the deep link. <br/><br/> 2. The user closes the task module by selecting the X at the upper right of the task module or by pressing an `Action.Submit` button on the card. Since there's no `submitHandler` to call, the user must have a bot to send the value of the Adaptive Card fields. The user must use the `completionBotId` parameter in the deep link to specify the bot to send the data to using a `task/submit invoke` event. |

The next section specifies the `TaskInfo` object that defines certain attributes for a task module.

## The TaskInfo object

The `TaskInfo` object contains the metadata for a task module. Define the `url` for an embedded iFrame or `card` for an Adaptive Card. The following table provides the object definition:

| Attribute | Type | Description |
| --- | --- | --- |
| `title` | string | This attribute appears below the app name and to the right of the app icon. |
| `height` | number or string | This attribute can be a number representing the task module's height in pixels, or `small`, `medium`, or `large`. For more information, see [task module sizing](#task-module-sizing). |
| `width` | number or string | This attribute can be a number representing the task module's width in pixels, or `small`, `medium`, or `large`. For more information, see [task module sizing](#task-module-sizing). |
| `url` | string | This attribute is the URL of the page loaded as an `<iframe>` inside the task module. The URL's domain must be in the app's [validDomains array](~/resources/schema/manifest-schema.md#validdomains) in your app's manifest. |
| `card` | Adaptive Card or Adaptive Card bot card attachment | This attribute is the JSON for the Adaptive Card to appear in the task module. If the user is invoking from a bot, use the Adaptive Card JSON in a Bot Framework `attachment` object. From a tab, the user must use an Adaptive Card. For more information, see [Adaptive Card or Adaptive Card bot card attachment](#adaptive-card-or-adaptive-card-bot-card-attachment) |
| `fallbackUrl` | string | This attribute opens the URL in a browser tab, if a client doesn't support the task module feature. |
| `completionBotId` | string | This attribute specifies a bot App ID to send the result of the user's interaction with the task module. If specified, the bot receives a `task/submit invoke` event with a JSON object in the event payload. |

> [!NOTE]
> The task module feature requires that the domains of any URLs you want to load are included in the `validDomains` array in your app's manifest.

The next section specifies task module sizing that enables the user to set the height and width of the task module.

## Task module sizing

Using integers for `TaskInfo.width` and `TaskInfo.height`, sets the height and width of the task module in pixels. However, depending on the size of the Team's window and screen resolution they're reduced proportionally while maintaining the aspect ratio that is width or height.

If `TaskInfo.width` and `TaskInfo.height` are `"small"`, `"medium"`, or `"large"`, the size of the red rectangle in the following image is a proportion of the available space, 20%, 50%, and 60% for `width` and 20%, 50%, and 66% for `height`:

:::image type="content" source="../../assets/images/task-module/task-module-example.png" alt-text="task module example":::

Task modules invoked from a tab can be dynamically resized. After calling `tasks.startTask()` you can call `tasks.updateTask(newSize)` where height and width properties on the newSize object conform to the TaskInfo specification, for example `{ height: 'medium', width: 'medium' }`.

The next section provides examples of embedding task modules in a YouTube video and a PowerApp.

## Task module CSS for HTML or JavaScript task modules

HTML or JavaScript-based task modules have access to the entire area of the task module below the header. While that offers a great deal of flexibility, if you want padding around the edges to align with the header elements and avoid unnecessary scroll bars, the user must provide the right CSS. The next sections provide some examples for a few use cases.

### Example 1: YouTube video

YouTube offers the ability to embed videos on web pages. It's easy to embed videos on web pages in a task module using a simple stub web page.

:::image type="content" source="../../assets/images/task-module/youtube-example.png" alt-text="Youtube example":::

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

### Example 2: PowerApp

The user can use the same approach to embed a PowerApp as well. As the height or width of any individual PowerApp is customizable, the user can adjust the height, and width to achieve the desired presentation.

:::image type="content" source="../../assets/images/task-module/powerapp-example.png" alt-text="powerapp":::

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

Depending on how you're invoking your `card`, you must use either an Adaptive Card or an Adaptive Card bot card attachment, which is an Adaptive Card wrapped in an attachment object.

When you're invoking from a tab, the user must use an Adaptive Card.

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

The following code provides an example of an Adaptive Card bot card attachment when you're invoking from a bot:

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

The next section provides details on using a keyboard with your app's task module.

## Keyboard and accessibility guidelines

With HTML or JavaScript-based task modules, you must ensure your app's task module can be used with a keyboard. Screen reader programs also depend on the ability to navigate using the keyboard. This includes the following two things:

* Using the [tabindex attribute](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/tabindex) in your HTML tags to control which elements can be focused. Also, use tabindex attribute to identify where it participates in sequential keyboard navigation usually with the <kbd>Tab</kbd> and <kbd>Shift-Tab</kbd> keys.
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

|Sample name | Description | .NET | Node.js | Manifest
|----------------|-----------------|--------------|----------------|----------------|
|Task module sample bots-V4 | Samples for creating task modules. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-task-module/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-task-module/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-task-module/csharp/demo-manifest/bot-task-module.zip)

## Next step

> [!div class="nextstepaction"]
> [Use task modules in tabs](~/task-modules-and-cards/task-modules/task-modules-tabs.md)

## See also

* [Cards and task modules](../cards-and-task-modules.md)
* [Request device permissions](~/concepts/device-capabilities/native-device-permissions.md)
* [Integrate media capabilities](~/concepts/device-capabilities/media-capabilities.md)
* [Integrate QR or barcode scanner capability in Teams](~/concepts/device-capabilities/qr-barcode-scanner-capability.md)
* [Integrate location capabilities in Teams](~/concepts/device-capabilities/location-capability.md)
