---
title: Prepare your Office 365 tenant
description: How to get started with Teams in Office 365
keywords: Configure Office 365 tenant Teams uploading
---
# Prepare your Office 365 tenant

To develop apps for Microsoft Teams, you need to be an [Office 365 customer with one of the following plans](https://products.office.com/business/compare-more-office-365-for-business-plans).

* Business Essentials
* Business Premium
* Enterprise E1, E3, and E5
* Developer
* Education, Education Plus, and Education E5

Microsoft Teams will also be available to customers who purchased E4 prior to its retirement.

## Just need a development environment?

If you don't currently have an Office 365 account, you can sign up for an [Office 365 Developer program](https://dev.office.com/devprogram) developer tenant. It is *free* for 90 days and can be renewed as long as you're using it for development activity. If you have a Visual Studio Enterprise or Professional subscription, use your [Visual Studio benefits](https://aka.ms/MyVisualStudioBenefits) to get a developer account that automatically renews regardless of development activity. This account can only be used for testing purposes. See more information on [setting up your test accounts](https://docs.microsoft.com/office/developer-program/office-365-developer-program-get-started).

## Enable Microsoft Teams for your organization

If Microsoft Teams is not yet enabled for your organization, you'll need to do that first. Take a look at our detailed guidance for [enabling Teams for your organization](https://docs.microsoft.com/microsoftteams/enable-features-office-365).

## Enable custom Teams apps and turn on custom app uploading

> [!Note] 
> If you're using an O365 Developer Organization to build your app, these settings should already be configured to allow you to build, upload, and test your app.

There are three settings relevant to enabling custom apps and custom app uploading:

* **Org-wide custom app setting**: **On** — This setting enables or disables custom apps for your organization. It needs to be on. 
* **Team custom app setting**: **On** — This setting applies to each individual team inside Microsoft Teams. If you want to install your app for a specific team, this will need to be on for that team.
* **User custom app policy** — This set of settings controls the permissions for an individual user. You'll need to enable this for individuals you want to upload custom apps.

For complete information on how these settings interact, *see* [Manage custom app policies and settings in Microsoft Teams](https://docs.microsoft.com/microsoftteams/teams-custom-app-policies-and-settings) and [Manage app setup policies in Microsoft Teams](https://docs.microsoft.com/microsoftteams/teams-app-setup-policies).
