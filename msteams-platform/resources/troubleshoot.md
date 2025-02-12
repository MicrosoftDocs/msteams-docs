---
title: Troubleshoot your App
description: Learn about different issues or error scenarios while building apps for Microsoft Teams and how to troubleshoot the issues for bots, tabs, and app package.
keywords: teams apps development troubleshooting
ms.localizationpriority: medium
ms.topic: troubleshooting
ms.date: 02/06/2025
---

# Troubleshoot your Microsoft Teams app

## To troubleshoot tabs

### Access Dev Tools

You can open [Dev Tools in the Teams client](~/tabs/how-to/developer-tools.md) for a similar experience as pressing F12 (on Windows) or Command-Option-I (on MacOS) in a browser.

### Blank tab screen

If you aren't seeing your content in the tab view, it could be:

* your content can't be displayed in an `<iframe>`.
* the content domain isn't in the [validDomains](~/resources/schema/manifest-schema.md#validdomains) list in the manifest.

> [!NOTE]
> A blank tab appears when the given tab URL redirects to login screen. Login pages don’t render in iFrames as a safeguard against clickjacking. Your authentication logic must use a method other than redirect.

### Changes to my web app aren't reflected in its Teams tab

If you experience consistent or intermittent caching issues where updates to your web app aren't appearing when it's hosted within a Teams tab, check your server cache settings and use [`Cache-Control`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) headers to ensure your desired client caching behavior.

### The Save button isn't enabled on the settings dialog

Ensure to call `microsoftTeams.settings.setValidityState(true)` after the user has input or selected all required data on your settings page to enable the save button.

### The tab settings can't be saved on selecting Save

When adding a tab, if you select **Save** but receive an error message indicating the settings can't be saved, the problem could be one of two classes of issues:

* **The save success message was never received**: If a save handler was registered using `microsoftTeams.settings.registerOnSaveHandler(handler)`, the callback must call `saveEvent.notifySuccess()`.

  * If the callback doesn't call `saveEvent.notifySuccess()` within 30 seconds or calls `saveEvent.notifyFailure(reason)` instead, this error is shown.
  * If no save handler was registered, the `saveEvent.notifySuccess()` call is made automatically when the user selects **Save**.

* **The provided settings were invalid**: The other reason the settings may not be saved is if the call to `microsoftTeams.setSettings(settings)` provided an invalid settings object, or the call wasn't made at all. See the next section, Common problems with the settings object.

### Common problems with the settings object

* `settings.entityId` is missing. This field is required.
* `settings.contentUrl` is missing. This field is required.
* `settings.contentUrl` or the optional `settings.removeUrl`, or `settings.websiteUrl` are provided but not valid. The URLs must use HTTPS and also must either be the same domain as the settings page or specified in the manifest's `validDomains` list.

### Can't authenticate the user or display your auth provider in your tab

Unless you're doing silent authentication, you must follow the authentication process provided by the [Microsoft Teams JavaScript client library](/javascript/api/overview/msteams-client).

> [!NOTE]
> We require all authentication flow to start and end on your domain, which must be listed in the `validDomains` object in your manifest.

For more information about authentication, see [how to authenticate a user](~/concepts/authentication/authentication.md).

### Static tabs not showing up

There's a known issue where updating an existing bot app with a new or updated static tab won't show that tab change when accessing the app from a personal chat conversation.  To see the change, you should test on a new user or test instance, or access the bot from the Apps flyout.

## To troubleshoot bots

### Can't add my bot

Apps must be enabled by the admin for them to be loaded by end users. In some cases, the Microsoft 365 tenant might have multiple SKUs associated with it, and for bots to work in any, they must be enabled in all SKUs. For more information, see [prepare your Microsoft 365 tenant](~/concepts/build-and-test/prepare-your-o365-tenant.md).

### Can't add bot as a member of a team

Bots must first be uploaded in a team before it's accessible within any channel of that team. For more information on this process, see [how to upload your app in a team](~/concepts/deploy-and-publish/apps-upload.md).

### My bot doesn't get my message in a channel

Bots in channels receive messages only when they're explicitly @mentioned, even if you're replying to a previous bot message. The only exception where you might not see the bot name in a message is if the bot receives an `imBack` action as a result of a CardAction that it originally sent.

### My bot doesn't understand my commands when in a channel

Because bots in channels only receive messages when they're @mentioned, all messages that your bot receives in a channel include that @mention in the text field. It's a best practice to strip the bot name itself out of all incoming text messages before passing along to your parsing logic. Review [mentions](../bots/how-to/conversations/channel-and-group-conversations.md#work-with-mentions) for tips on how to handle this case.

## Issues with packaging and uploading

### Error while reading manifest.json

Most  manifest errors provide a hint at what specific field is missing or invalid. However, if the JSON file can't be read as JSON at all, this generic error message is used.

Common reasons for manifest read errors:

* Invalid JSON. Use an IDE such as [Visual Studio Code](https://code.visualstudio.com) or [Visual Studio](https://www.visualstudio.com/vs/) that automatically validates the JSON syntax.
* Encoding issues. Use UTF-8 for the *manifest.json* file. Other encodings, specifically with the BOM, may not be readable.
* Malformed .zip package. The *manifest.json* file must be at the top level of the .zip file. Note that default Mac file compression might place the *manifest.json* in a subdirectory, which won't properly load in Microsoft Teams.

### Another extension with same ID exists

If you're attempting to upload an updated package with the same ID again, choose the **Replace** icon at the end of the tab's table row rather than the **Upload** button.

If you're not re-uploading an updated package, ensure that the ID is unique.

### Error while uploading app in Teams

* If you get a **Manifest parsing has failed** error message when uploading the app to teams, use [Teams app validator](https://dev.teams.microsoft.com/validation) to validate the app package, including the app manifest and OpenAPI spec file. Review the [app manifest](../messaging-extensions/api-based-overview.md#app-manifest) and the [OpenAPI Description (OAD)](../messaging-extensions/api-based-overview.md#openapi-description-oad) requirements to resolve errors or warnings and try uploading your app.

   :::image type="content" source="../assets/images/Copilot/api-me-troubleshoot-sideload.png" alt-text="Screenshot shows the error message when uploading an app to Teams along with the option to copy the error details to clipboard.":::

* If you encounter any issues while running your app in Teams, use the following troubleshooting steps to identify and resolve your issue:

  * **Network**: Select the **Network** tab in Developer tools to inspect network activity

     1. Open [Teams web client](https://teams.microsoft.com).
     1. Sign in with your Microsoft 365 credentials.
     1. Go to a chat, and run your message extension app.
     1. At the top-right, select **Settings and more (...)**. Go to **More tools** > **Developer tools**.
     1. Select **Network**. Select the **filter** option and enter **invoke** in the search field.
     1. Select an error from the list.
     1. In the right pane, select the **Response** tab.

     1. A JSON object representing an error response from a service or API is displayed. It contains a `standardizedError` object with `errorCode`, `errorSubCode`, and `errorDescription`, which have more details about the error.

        :::image type="content" source="../assets/images/Copilot/api-me-troubleshoot-network.png" alt-text="Screenshots shows the network tab, the list of Invoke Errors, and the error details in the response tab in Developer tools while running a message extension in Teams and getting an error.":::

      **Common HTTP Error Responses**:

    * A 400 Bad Request error might occur if a request parameter is missing or incorrectly formatted.
    * A 401 Unauthorized or 403 Forbidden error suggests issues with the API key, such as it being missing or unauthorized.
    * A 500 Internal Server Error indicates that the service doesn't know how to respond, due to a server-side issue.

* **Troubleshooting with Tools**: If the information from the network trace is insufficient, you can construct a request following the OpenAPI description document and use tools like Swagger Editor or Postman to test the request, including the authorization header for the API key if necessary.

If you’re unable to resolve the errors, we recommend contacting [Microsoft Teams product support](../feedback.md#product-support-and-service-issues) for further assistance.

## See also

* [Build tabs for meeting](../apps-in-teams-meetings/build-tabs-for-meeting.md)
* [Build bots for Teams](../bots/what-are-bots.md)
* [Enable SSO for tab app](../tabs/how-to/authentication/tab-sso-overview.md)
* [Receive all channel messages for bots and agents](../bots/how-to/conversations/channel-messages-for-bots-and-agents.md)
