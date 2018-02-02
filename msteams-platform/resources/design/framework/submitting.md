---
title: Design Guidelines Reference
description: Describes the guidelines for submitting your apps
keywords: teams design guidelines reference framework submitting your apps audience
msdate: 02/01/2018
---
# Submit your app, expand your audience

Here’s everything you need to submit your app to the Microsoft Seller Dashboard, including details about the submission process and a checklist of everything you should include in your app manifest.

---

## Overall process

> [!div class="checklist"]
> * [Register as a Microsoft app developer](//developer.microsoft.com/en-us/store/register).
> * Enclose your icons and manifest in a file, then zip it up.
> * Upload your app, checking to make sure everything looks and works the way it should.
> * Go to the Microsoft Seller Dashboard and click the Microsoft Teams logo.
> * Select “Upload manifest” then upload your zip file containing your manifest and your icons (details below).

![App gallery](~/assets/images/framework/framework_submit_gallery.png)

---

## What you’ll need

Have your manifest and icons ready to go before you start the submission process. Your complete submission package should include two icons (20x20 outline icon, 96x96 full color icon), your app manifest, and up to five screen shots of your app.

---

## App manifest

Your manifest is the ledger that describes every component of your app while also providing the requisite specifications and commands. It must contain everything your app needs to function. If, for example, your manifest doesn’t contain specifications for your app settings menu, then your application ultimately won’t have a settings menu.

Your manifest should include the following:

### Manifest version number

This is the version of the Microsoft Teams schema that your manifest will work with.

### Your version number

This is the version of the app you’re submitting.

> [!TIP]
> Any future changes to your manifest should result in a version change, as well.

### ID

This is a unique identifier of your app. It must be a GUID.

### Package name

The name of your package should be the reverse of your domain name. For example, if your domain is myapp.example.com, your package name would be .com.example.myapp. Your max character length is 64.

### Developer name

Include the name of your developer.

### URLS

website URL, privacy URL, and terms of use or end user license agreement. All these elements are required.

### App name

You can provide both a short name (max character length 30) and a long name (max character length 100) for your app. The short name field is required.

### App descriptions

Include both a short (max character length 80) and a long (max character length 4000) description of your app. Both fields are required, so if your app description is 80 characters or less, simply duplicate the same description in both fields.

### Icons
Include two icons, a full color icon and a white icon on a transparent background. Submit both as PNGs.

#### Full color icon
This icon should be 192 x 192 pixels. Your icon can be any color (or colors), but the background should be your branded accent color. It should also have some padding surrounding the icon to accommodate the hexagonal cropping for the bot version of the icon. Place your logo inside a safe region of 96 x 96 pixels.

#### White icon on transparent background
This icon should be 32 x 32 pixels. The icon must be white on a transparent background, and must contain no other colors. There should be no extra padding surrounding your icon.

![Icon showcase](~/assets/images/framework/framework_submit_icon.png)

### Accent color

This is your branded app color. Define it by providing a hex value (beginning with ‘#’). Your app theme should match your app icon.

---

## Tabs

There are two kinds of tabs you can include in your app: configurable and static. You may include both static tabs and a configurable tab in your manifest.

### Configurable tabs

These tabs require some setup before the user can access the content or service provided. You’re limited to one configurable tab per app. Provide a configuration URL and define your scope (whether the tab can be used by everyone in a channel or if it’s for individual use only).

> [!TIP]
> Scope options are non-exclusive. (Meaning, your tab could be built for both personal and team use.)

### Static tabs

You’re able to include up to 16 static tabs in your app. For each static tab, provide an entity ID, name, content URL, and define the scope. 
See the tabs design guidelines.

---

## Bots

You can include a maximum of one bot per app. Specifications for your bot must include:

### A bot name

This should match its ID in the Bot Framework. Your max character length is 64.

### A channel selector

A Boolean value defining whether you want to include a hint asking the user if they want to add the bot to a specific channel.

### Notification only or chat

An indication of whether your bot is for one-way communication (i.e., notifications only), or for interactive chat.

### Defined scope

### Command list

The list of common commands you want the bot to respond to. Supply a separate command list for each scope, where each command includes a title (max character length 32) and a description (max character length 128).

[See the bots design guidelines.](bots)

---

## Connectors

You can have one connector per app. Include a connector ID that matches its ID in the Connectors Developer Portal (max character length 64) and a scope definition.

---

## Messaging extensions

Specifications for each messaging extension should include:

### ID

This should match its ID in the Bot Framework. Your max character length is 64.

### Defined scope

### Commands, including:

#### A command ID

Max character length 64

#### A command title

Max character length 32

#### A command description

Max character length 128

#### A defined initial run

A Boolean value indicating if the command should be run once at startup with no parameters.

#### Parameters

You can include up to five parameters per command and you are required to include at least one. Each parameter must also include name (max character length 64), title (max character length 32), and description (max character length 128).

Try to only include a single parameter per command. In our experience, these extensions run more smoothly when they are kept relatively simple.

### Valid domains

For all bots, tabs, and connectors, also provide valid domains for any site you link to.

### Permissions

Specify what permissions that your bot, tab, or connector will request. There are only two permissions (whether the bot can use your name and whether it can message other team members).

### Testing notes

Upload optional testing notes.

### Encryption level

Define the level of encryption used in your app, if any.

### Support links

Provide support links.

[See the messaging extensions design guidelines.](compose-extensions)

Include screenshots of your app for your profile page (you can add up to five, total). Specify your language, release date, category, and pricing (again, select the ‘Free’ option here).

[!include[Submit profile](~/includes/design/submit-image-profile.html)]

---

## How long will this take?

It takes about five days to test and review your app. You’ll receive an email either letting you know that your app was approved or asking you to make a few changes and resubmit.

> [!TIP]
> Almost everyone needs to submit their app more than once before it’s approved.
