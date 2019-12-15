---
title: Post publishing 
description: What to do after you have published your app 
keywords: teams post publish update certificate
---

# Maintain and support your published app 

After your app is approved and listed in the public app catalog, you can increase your reach by achieving app certification, or adding a download button your website.

## Application Certificate

Microsoft provides a [Application Certification program](./application-certification.md) that compiles your app information and presents it on [Microsoft Teams App Security and Compliance Page](https://aka.ms/AppCertification). This information is intended to help admins to choose apps that are safe for their organizations.

## Add a download button to your product site

If your app is in the Microsoft Teams store, you can generate a link for your website that launches Teams and shows a consent and installation dialog for users to add the app.
The format is:  `https://teams.microsoft.com/l/app/<appId>` where appID is the GUID they declare in the submitted manifest.
Example: `https://teams.microsoft.com/l/app/49e6f432-d79c-49e8-94f7-89b94f3672fd` is the link to install Trello.

## Updating your existing Teams app

* Do not use the *Add a new app* button to resubmit your app. Use the tile for your app on the Overview tab instead.
* The appId in the updated manifest should be the same as in the current manifest, with an incremented version number.
* Increment your version number in your manifest.

### When does updating your app trigger the user consent flow?

When a user installs your application one of the first things they do is consent to give the app permission to access the services and information that the app needs to do its job. When you update your app, that can re-trigger this consent behavior, particularly if you have made one or more of the following changes:

* Adding a new capability to an app such as adding a bot to an tab only app.
* Changing the permissions array in the manifest.
* Increment your app version number in your manifest.
