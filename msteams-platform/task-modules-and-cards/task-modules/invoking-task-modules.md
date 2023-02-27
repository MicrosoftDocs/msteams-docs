---
title: Invoke and dismiss dialogs
description: Learn about invoking and dismissing dialogs (task modules), the DialogInfo object, dialog sizing, and dialog deep link syntax using code samples
author: surbhigupta12
ms.topic: conceptual
ms.localizationpriority: medium
---

# Invoke and dismiss dialogs

Dialogs (formerly known as *task modules*) can be invoked from tabs or bots. The response can be either in HTML, JavaScript, or as an Adaptive Card. There's a range of flexibility in terms of how dialogs are invoked and how to handle user interaction. The following table summarizes different dialog flows:

> [!NOTE]
> The *task module* concept has been renamed to *dialog* and the *tasks* capability (namespace) has been deprecated in favor of the `dialog` capability for use in both HTML dialogs (since TeamsJS v.2.0.0) and Adaptive Card-based dialogs (starting with TeamsJS v.2.x.x). See [notes on Dialogs](./../../tabs/how-to/using-teams-client-library.md#dialogs) for more information.

| Invoked using | Dialog with HTML or JavaScript | Dialog with Adaptive Card |
| --- | --- | --- |
| JavaScript in a tab | 1. Use the Teams client library function `dialog.url.open()` with optional `submitHandler(err, result)` and `messageFromChildHandler(postMessageChannel)` callback functions. <br/><br/> 2. In the dialog code, when the user has performed the actions, call the TeamsJS library function `dialog.url.submit()` with (optionally) a `result` object as a parameter. If a `submitHandler` callback was specified in `dialog.open()`, Teams calls it with `result` as a parameter. If there was an error when invoking `dialog.open()`, the `submitHandler` function is called with an `err` string instead. | 1. Call the Teams client library function `dialog.adaptiveCard.open()` with a [AdaptiveCardDialogInfo object](#adaptivecarddialoginfo-object) specifying the JSON for the Adaptive Card (`AdaptiveCardDialogInfo.card`)  to show in the modal dialog. <br/><br/> 2. If a `submitHandler` callback was specified in `dialog.adaptiveCard.open()`, Teams calls it with an `err` string if there was an error when invoking the dialog or if the user closes the modal dialog. <br/><br/> 3. If the user presses an `Action.Submit` button then its `data` object is returned as the value of `result`. |
| Bot card button | 1. Bot card buttons, depending on the type of button, can invoke dialogs from either a deep link URL, or by sending a `task/fetch` message. <br/><br/> 2. If the button's action `type` is [`task/fetch`](task-modules-bots.md#invoke-a-dialog-using-taskfetch) or `Action.Submit` button type for Adaptive Cards, a `task/fetch invoke` event that is an HTTP POST is sent to the bot. The bot responds to the POST with HTTP 200 and the response body containing a wrapper around the [DialogInfo object](#dialoginfo-object). Teams displays the dialog. <br/><br/> 3. After the user has performed the actions, call the `Actions.Submit` Adaptive Card action with the result. The bot receives a `task/submit invoke` message that contains the result. <br/><br/> 4. You have three different ways to respond to the `task/submit` message: do nothing (if the task completed successfully), display a message to the user in the dialog, or invoke another dialog. For more information, see [detailed discussion on `task/submit`](task-modules-bots.md#responds-to-the-tasksubmit-messages). | <ul><li> Like buttons on Bot Framework cards, buttons on Adaptive Cards support two ways of invoking dialogs: deep link URLs with `Action.openUrl` buttons, and `task/fetch` using `Action.Submit` buttons. </li></ul> <br/><br/> <ul><li> Dialogs with Adaptive Cards work similarly to the HTML or JavaScript case. The major difference is that, because there's no JavaScript when you're using Adaptive Cards, there's no way to call *submit()*. Instead, Teams takes the `data` object from `Action.Submit` and returns it as the payload of the `task/submit` event. For more information, see [Responds to the `task/submit` messages](task-modules-bots.md#responds-to-the-tasksubmit-messages). </li></ul> |
|  Deep link URL* <br/><br/> *\*Deprecated; supported for backwards compability*| 1. Teams invokes the task module that is the URL that appears inside the `<iframe>` specified in the `url` parameter of the deep link. There's no `submitHandler` callback. <br/><br/> 2. Within the JavaScript of the page in the task module, call `tasks.submitTask()` to close it with a `result` object as a parameter, the same as when invoking it from a tab or a bot card button. However, completion logic is slightly different. If your completion logic resides on the client that is if there's no bot, there's no `submitHandler` callback, so any completion logic must be in the code preceding the call to `tasks.submitTask()`. Invocation errors are only reported through the console. If you have a bot, then you can specify a `completionBotId` parameter in the deep link to send the `result` object through a `task/submit` event. | 1. Teams invokes the task module that is the JSON card body of the Adaptive Card that is specified as a URL-encoded value of the `card` parameter of the deep link. <br/><br/> 2. The user closes the task module by selecting the X at the upper right of the task module or by pressing an `Action.Submit` button on the card. Since there's no `submitHandler` to call, the user must have a bot to send the value of the Adaptive Card fields. The user must use the `completionBotId` parameter in the deep link to specify the bot to send the data to using a `task/submit invoke` event. |

The next section specifies the `DialogInfo` object that defines certain attributes for a dialog.

## DialogInfo object

The base `DialogInfo` object contains basic metadata for a dialog:

| Attribute | Type | Description |
| --- | --- | --- |
| `title` | string | This attribute appears below the app name and to the right of the app icon. |
| `height` | number or string | This attribute can be a number representing the task module's height in pixels, or `small`, `medium`, or `large`. For more information, see [dialog sizing](#dialog-sizing). |
| `width` | number or string | This attribute can be a number representing the task module's width in pixels, or `small`, `medium`, or `large`. For more information, see [dialog sizing](#dialog-sizing). |

### UrlDialogInfo object

The `UrlDialogInfo` object for HTML-based dialogs extends the *DialogInfo* object and also includes:

| Attribute | Type | Description |
| --- | --- | --- |
| `url` | string | This attribute is the URL of the page loaded as an `<iframe>` inside the task module. The URL's domain must be in the app's [validDomains array](~/resources/schema/manifest-schema.md#validdomains) in your app's manifest. |

### AdaptiveCardDialogInfo object

The `AdaptiveCardDialogInfo` object for Adaptive Card-based dialogs extends the *DialogInfo* object and also includes:

| Attribute | Type | Description |
| --- | --- | --- |
| `card` | Adaptive Card or Adaptive Card bot card attachment | This attribute is the JSON for the Adaptive Card to appear in the task module. If the user is invoking from a bot, use the Adaptive Card JSON in a Bot Framework `attachment` object. From a tab, the user must use an Adaptive Card. For more information, see [Adaptive Card or Adaptive Card bot card attachment](#adaptive-card-or-adaptive-card-bot-card-attachment) |

### BotAdaptiveCardDialogInfo object

The `BotAdaptiveCardDialogInfo` object for bot-based Adaptive Card dialogs extends the *AdaptiveCardDialogInfo* object and also includes:

| Attribute | Type | Description |
| --- | --- | --- |
| `completionBotId` | string | This attribute specifies a bot App ID to send the result of the user's interaction with the task module. If specified, the bot receives a `task/submit invoke` event with a JSON object in the event payload. |

The next section describes dialog sizing options.

## Dialog sizing

The values of `DialogInfo.width` and `DialogInfo.height` set the height and width of the dialog in pixels. Depending on the size of the Team's window and screen resolution, these values might be reduced proportionally while maintaining aspect ratio.

If `DialogInfo.width` and `DialogInfo.height` are `"small"`, `"medium"`, or `"large"`, the size of the red rectangle in the following image is a proportion of the available space, 20%, 50%, and 60% for `width` and 20%, 50%, and 66% for `height`:

:::image type="content" source="../../assets/images/task-module/task-module-example.png" alt-text="dialog sizing example":::

Dialogs invoked from a tab can be dynamically resized. After calling `dialog.*.open()` you can call `dialog.update.resize(newSize)` where height and width properties on the newSize object conform to the [DialogSize](/javascript/api/@microsoft/teams-js/dialogsize) specification, for example `{ height: 'medium', width: 'medium' }`.

The next section provides examples of embedding dialogs in a YouTube video and a PowerApp.

## CSS for HTML or JavaScript dialogs

HTML or JavaScript-based dialogs have access to the entire area of the dialog below the header. While that offers a great deal of flexibility, if you want padding around the edges to align with the header elements and avoid unnecessary scroll bars, you'll need to specify the CSS. The next sections provide examples for common use cases.

### Example 1: YouTube video

YouTube offers the ability to embed videos on web pages. It's easy to embed videos on web pages in a dialog using a simple stub web page.

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

You can use the same approach to embed a PowerApp. As the height or width of any individual PowerApp is customizable, you can adjust the height, and width to achieve the desired presentation.

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

Depending on how you're invoking your card, you'll need to use either an Adaptive Card or an Adaptive Card bot card attachment (an Adaptive Card wrapped in an `attachment` object).

If you're invoking from a tab, the use an Adaptive Card:

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

If you're invoking from a bot, use an Adaptive Card bot card attachment:

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

The next section provides details on dialog accessibility.

## Keyboard and accessibility guidelines

With HTML or JavaScript-based dialogs, you'll want to ensure your customers  can interact with your dialog with a keyboard. Screen reader programs also depend on the ability to navigate using the keyboard. Most important are the following considerations:

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

Microsoft Teams will ensure that keyboard navigation cycles from dialog header into your HTML and vice-versa.

## Code sample

|Sample name | Description | .NET | Node.js | Manifest|
|----------------|-----------------|--------------|----------------|----------------|
|Task module sample bots-V4 | Samples for creating dialogs. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-task-module/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-task-module/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-task-module/csharp/demo-manifest/bot-task-module.zip)|

## Next step

> [!div class="nextstepaction"]
> [Use dialogs in tabs](~/task-modules-and-cards/task-modules/task-modules-tabs.md)

## See also

* [Cards and dialogs](../cards-and-task-modules.md)
* [Request device permissions](~/concepts/device-capabilities/native-device-permissions.md)
* [Integrate media capabilities](~/concepts/device-capabilities/media-capabilities.md)
* [Integrate QR or barcode scanner capability in Teams](~/concepts/device-capabilities/qr-barcode-scanner-capability.md)
* [Integrate location capabilities in Teams](~/concepts/device-capabilities/location-capability.md)
