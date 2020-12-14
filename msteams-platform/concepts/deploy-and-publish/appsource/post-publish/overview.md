---
title: Post publishing 
description: What to do after you have published your app 
keywords: teams post publish update certification app update manifest 
---

# Maintain and support your published app 

After your app is approved and listed in the public app catalog, you can increase your reach by completing the Microsoft 365 App Compliance Program or by adding a download button on your website.

## Microsoft 365 Certified

The [Microsoft 365 App Compliance Program](./application-certification.md), is a three tier approach to app security and compliance. Each tier builds upon the next – offering a layered program to meet your customer’s needs. You can learn more about the security and compliance posture of Teams apps by visiting the [compliance page](https://docs.microsoft.com/microsoft-365-app-certification/teams/teams-apps).

## Add a download button to your product site

If your app is in the Microsoft Teams global store, you can generate a link for your website that launches Teams and shows a consent and installation dialog for users to add the app.
The format is:  `https://teams.microsoft.com/l/app/<appId>` where appID is the GUID they declare in the submitted manifest.
Example: `https://teams.microsoft.com/l/app/49e6f432-d79c-49e8-94f7-89b94f3672fd` is the link to install Trello.

## Updating your existing Teams app

* Do not use the *Add a new app* button to resubmit your app. Use the tile for your app on the Overview tab instead.
* The appId in the updated manifest should be the same as in the current manifest, with an incremented version number.
* Increment your version number in the manifest if you make any changes to your submission including app name or any metadata in the manifest.
* Updated submissions are required to undergo a new review and validation process.

## App updates and the user consent flow

When a user installs your application one of the first things they do is consent to give the app permission to access the services and information that the app needs to do its job. In most cases, after you complete an app update the new version will automatically appear for end users. However, there are some updates to the [Teams app manifest](../../../../resources/schema/manifest-schema.md) that require user acceptance to complete and can re-trigger this consent behavior:

 >[!div class="checklist"]
>
> * A bot was added or removed.
> * An existing bot's unique `botId` value changed.
> * An existing bot's `isNotificationOnly` boolean value changed.
> * An existing bot's `supportsFiles` boolean value changed.
> * A messaging extension (`composeExtensions`) was added or removed.
> * A new connector was added.
> * A new static/personal tab was added.
> * A new configurable group/channel tab was added.
> * The `webApplicationInfo` values changed.
>

### Images of user consent flow:

**Set up a connector** - This screen will appear only for the teams users.

![Consent flow setup a connector diagram](../../../assets/images/connector-teams-consentflow.png)

**User consent flow** - This screen is common for both personal and teams scope. Here, select the **Consent on behalf of your organization** checkbox and choose **Accept**.

![Permissions diagram](../../../assets/images/user-consent-flow.png)
