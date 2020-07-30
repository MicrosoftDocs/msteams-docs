---
title: Prepare your Office 365 tenant
description: How to get started with Teams in Office 365
keywords: Configure Office 365 tenant Teams uploading
---
# Prepare your Office 365 tenant

If you are an Office 365 subscriber, you can develop apps for Microsoft Teams with one of the following [plans](https://products.office.com/business/compare-more-office-365-for-business-plans):

* Business Essentials
* Business Premium
* Enterprise E1, E3, and E5
* Developer
* Education, Education Plus, and Education E5

Microsoft Teams will also be available to customers who subscribed to E4 prior to its [retirement](https://support.office.com//article/important-information-for-office-365-enterprise-e4-customers-f9572348-43a2-43fa-a3d8-3b6c9c042147).

## Just need a development environment?

If you don't currently have an Microsoft 365 account, you can sign up for a [Microsoft 365 Developer Program](https://developer.microsoft.com/microsoft-365/dev-program) subscription. It's *free* for 90 days and will continually renew as long as you're using it for development activity. If you have a Visual Studio *Enterprise* or *Professional* subscription, both programs include a free Microsoft 365 [developer subscription](https://aka.ms/MyVisualStudioBenefits), active for the life of your Visual Studio subscription. *See* [Set up a Microsoft 365 developer subscription](https://docs.microsoft.com/office/developer-program/office-365-developer-program-get-started).

## Enable Microsoft Teams for your organization

If Microsoft Teams has not been enabled for your organization, you'll need to do that first. Take a look at our detailed guidance for [enabling Teams for your organization](https://docs.microsoft.com/microsoftteams/enable-features-office-365).

## Enable custom Teams apps and turn on custom app uploading

> [!Note] 
> If you're using the Office 365 developer platform to build your app, these settings should already be configured to allow you to build, upload, and test your app.

There are three settings relevant to enabling custom apps and custom app uploading:

* **Org-wide custom app setting** => **Allow interaction with custom apps** => **On** — This setting enables or disables custom apps for your organization. It needs to be on. 
* **Team custom app setting** => **Allow members to upload custom apps** => **On/Off** — This setting applies to each individual team inside Microsoft Teams. If you want to install your app for a specific team, this will need to be on for that team.
* **User custom app policy** => **User can upload custom apps** => **On/Off** — This setting controls the permissions for an individual user. You'll need to enable this for individuals that are allowed to upload custom apps.

For complete information on how these settings interact, *see* [Manage custom app policies and settings in Microsoft Teams](https://docs.microsoft.com/microsoftteams/teams-custom-app-policies-and-settings) and [Manage app setup policies in Microsoft Teams](https://docs.microsoft.com/microsoftteams/teams-app-setup-policies).
