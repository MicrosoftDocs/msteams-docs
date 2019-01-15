---
title: Request permissions for your Microsoft Teams tab
description: How to update your app manifest in order to request access to native features that usually require user consent
keywords: teams tabs sharepoint framework development
layout: LandingPage
ms.date: 11/05/2018
---

# Request permissions for your Microsoft Teams tab

Your tab might require access to native features that usually require user consent, such as:

* Camera, microphone
* Location
* Notifications

![Device Permissions settings screen](~/assets/images/tabs/device-permissions.png)

## Device permissions

Accessing a user’s device permissions allows you to build much richer experiences, for example:

* FlipGrid lets students record short videos
* OneNote lets you record short audio memos
* Bing can return local information

While access to these features are standard in most modern web browsers, you need to let Teams know which features you’d like to use by updating your app manifest. This will allow you to ask for permissions, the same way you would in a browser, while your app is running on the Teams desktop client.

## Properties

Update your app's `manifest.json` by adding `devicePermissions` and specifying which of the five properties you’d like to use in your application:

``` json
"devicePermissions": [
    "media",
    "geolocation",
    "notifications",
    "midi",
    "openExternal"
],
```

Each property will allow you to prompt the user to ask for their consent

| Property      | Description   |
| --- | --- |
| media         | permission to use the camera, microphone and speakers |
| geolocation   | permission to return the user's location      |
| notifications | permission to send the user notifications      |
| midi          | permission to send and receive midi information from a digital musical instrument   |
| openExternal  | permission to open links in external applications  |

## Checking permissions from your tab

Once you’ve added `devicePermissions` to your app manifest, you can check permissions using the HTML5 “permissions” API without causing a prompt.

``` Javascript
// Different query options:
navigator.permissions.query({ name: 'camera' });
navigator.permissions.query({ name: 'microphone' });
navigator.permissions.query({ name: 'geolocation' });
navigator.permissions.query({ name: 'notifications' });
navigator.permissions.query({ name: 'midi', sysex: true });

// Example:
navigator.permissions.query({name:'geolocation'}).then(function(result) {
  if (result.state == 'granted') {
    // Access granted
  } else if (result.state == 'prompt') {
    // Access has not been granted
  }
});
```

## Prompting the user

In order to show a prompt to get consent to access device permissions you need to leverage the appropriate HTML5 API. For example, in order to prompt the user to access their camera you need to call `getUserMedia`

```Javascript
navigator.mediaDevices.getUserMedia({ audio: true, video: true });
```

Geolocation will  show a permission prompt when you call `getCurrentPosition`

```Javascript
navigator.geolocation.getCurrentPosition(function (position) { /*... */ });
```

Notifications will prompt the user when you call `requestPermission`

```Javascript
Notification.requestPermission(function(result) { /* ... */ });
```

![Tabs device permissions prompt](~/assets/images/tabs/device-permissions-prompt.png)
