---
title: Troubleshoot your app
description: Troubleshoot issues or errors while building apps for Microsoft Teams
keywords: teams apps development troubleshooting
ms.date: 07/09/2018
---

# Troubleshoot your Microsoft Teams app

## Troubleshooting tabs

### Accessing the DevTools

You can open [DevTools in the Teams client](~/tabs/how-to/developer-tools.md) for a similar experience as pressing F12 (on Windows) or Command-Option-I (on MacOS) in a browser.

### Blank tab screen

If you are not seeing your content in the tab view, it could be:

* your content cannot be displayed in an `<iframe>`.
* the content domain is not in the [validDomains](~/resources/schema/manifest-schema.md#validdomains) list in the manifest.

### The Save button isn't enabled on the settings dialog

Be sure to call `microsoftTeams.settings.setValidityState(true)` once the user has input or selected all required data on your settings page to enable the save button.

### After selecting the Save button, the tab settings cannot be saved

When adding a tab, if you click the save buttons but are presented with an error message indicating the settings cannot be saved, the problem could be one of two classes of issues:

* The save success message was never received. If a save handler was registered using `microsoftTeams.settings.registerOnSaveHandler(handler)`, the callback must call `saveEvent.notifySuccess()`. If the callback doesn't call this within 30 seconds or calls `saveEvent.notifyFailure(reason)` instead, this error will be shown.

* If no save handler was registered, the `saveEvent.notifySuccess()` call is automatically made immediately upon the user selecting the save button.

* The provided settings were invalid. The other reason the settings may not be saved is if the call to `microsoftTeams.setSettings(settings)` provided an invalid settings object, or the call wasn't made at all. See the next section, Common problems with the settings object.

### Common problems with the settings object

* `settings.entityId` is missing. This field is required.
* `settings.contentUrl` is missing. This field is required.
* `settings.contentUrl` or the optional `settings.removeUrl`, or `settings.websiteUrl` are provided but not valid. The URLs must use HTTPS and also must either be the same domain as the settings page or specified in the manifest's `validDomains` list.

### Can't authenticate the user or display your auth provider in your tab

Unless you are doing silent authentication, you must follow the authentication process provided by the [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client.md).

> [!NOTE]
>We require all authentication flow to start and end on your domain, which must be listed in the `validDomains` object in your manifest.

For more information about authentication, please see [Authenticate a user](~/concepts/authentication/authentication.md).

### Static tabs not showing up

There is a known issue where updating an existing bot app with a new or updated static tab will not show that tab change when accessing the app from a personal chat conversation.  To see the change, you should test on a new user or test instance, or access the bot from the Apps flyout.

## Troubleshooting bots

### Can't add my bot

Apps must be enabled by the Office 365 tenant admin for them to be loaded by end users. Note that in some cases, the Office 365 tenant might have multiple SKUs associated with it, and for bots to work in any, they must be enabled in all SKUs. See [Prepare your Office 365 tenant](~/concepts/build-and-test/prepare-your-o365-tenant.md) for more information.

### Can't add bot as a member of a team

Bots must first be upload into a team before it is accessible within any channel of that team. Please review [Uploading your app in a team](~/concepts/deploy-and-publish/apps-upload.md) for more information on this process.

### My bot doesn't get my message in a channel

Bots in channels receive messages only when they are explicitly @mentioned, even if you are replying to a previous bot message. The only exception where you might not see the bot name in a message is if the bot receives an `imBack` action as a result of a CardAction that it originally sent.

### My bot doesn't understand my commands when in a channel

Because bots in channels only receive messages when they are @mentioned, all messages that your bot receives in a channel include that @mention in the text field. It is a best practice to strip the bot name itself out of all incoming text messages before passing along to your parsing logic. Review [mentions](../bots/how-to/conversations/channel-and-group-conversations.md#work-with-mentions) for tips on how to handle this case.

## Issues with packaging and uploading

### Error while reading manifest.json

Most  manifest errors will provide a hint at what specific field is missing or invalid. However, if the JSON file cannot be read as JSON at all, this generic error message is used.

Common reasons for manifest read errors:

* Invalid JSON. Use an IDE such as [Visual Studio Code](https://code.visualstudio.com) or [Visual Studio](https://www.visualstudio.com/vs/) that automatically validates the JSON syntax.
* Encoding issues. Use UTF-8 for the *manifest.json* file. Other encodings, specifically with the BOM, may not be readable.
* Malformed .zip package. The *manifest.json* file must be at the top level of the .zip file. Note that default Mac file compression might place the *manifest.json* in a subdirectory, which will not properly load in Microsoft Teams.

### Another extension with same ID exists

If you're attempting to re-upload an updated package with the same ID, choose the **Replace** icon at the end of the tab's table row rather than the **Upload** button.

If you're not re-uploading an updated package, ensure that the ID is unique.
