---
title: Prepare your Office 365 tenant
description: How to get started with Teams in Office 365
keywords: Configure Office 365 tenant Teams uploading
---
# Prepare your Office 365 tenant

To develop apps for Microsoft Teams, you need to be an [Office 365 customer with one of the following plans](https://products.office.com/en-us/business/compare-more-office-365-for-business-plans).

* Business Essentials
* Business Premium
* Enterprise E1, E3, and E5
* Developer
* Education, Education Plus, and Education E5

Microsoft Teams will also be available to customers who purchased E4 prior to its retirement.

If you don't currently have an Office 365 account, you can sign up for the [Office 365 Developer program](https://dev.office.com/devprogram) to get a *free* 90 days (can be renewed for as long as you're using it for development activity) Office 365 Developer Tenant. This account can only be used for testing purposes. See more information on [setting up your test accounts](https://support.office.com/en-us/article/Add-users-individually-or-in-bulk-to-Office-365-Admin-Help-1970f7d6-03b5-442f-b385-5880b9c256ec?ui=en-US&rs=en-US&ad=US).

## Turn on Microsoft Teams for your organization

Teams is enabled by default in the versions of Office 365 that support it, however your Office 365 administrator might have disabled it. You can confirm that Teams is enabled for your organization by following these steps. Note that each user must have a valid license to access the product.

1. [Sign in to Office 365](https://portal.office.com) with your administrator account.
2. Select the **Admin** tile to go to the Office 365 Admin Center.
3. From **Settings**, select **Services & add-ins**.
4. From the list of services and add-ins, or apps, select **Microsoft Teams**.
5. On the **Microsoft Teams** settings screen, open **Settings by user/license type** and confirm that Microsoft Teams is set to **On**. Select **Save** if necessary.

For more information on O365 administration settings see [administrator settings](/MicrosoftTeams/enable-features-office-365) in the Teams product documentation.

## Enable custom Teams apps and turn on custom app uploading

> Note: If you're using an O365 Developer Organization to build your app, these settings should already be configured to allow you to build, upload and test your app.

There are three settings involed in enabling custom apps and custom app uploading:

* **Org-wide custom app setting** - This setting either enables or disables custom apps for your organization. It needs to be on. 
* **Team custom app setting** - This setting is for each individual team inside Microsoft Teams. If you want to install your app for a specific team, this will need to be on for that team.
* **User custom app policy** - This set of settings controls the permissions for an individual user. You'll need to enable this for individuals you want to upload custom apps.

For complete information on how these settings interact see [Manage custom app policies and settings in Microsoft Teams](/MicrosoftTeams/teams-custom-app-policies-and-settings).
