---
title: Choose how to distribute your app
description: Describes the options for distributing your Microsoft Teams app.
ms.topic: conceptual
keywords: teams publish store office distribute AppSource sideload upload app
---

# Choose how to distribute your Microsoft Teams app
This document guides you on the methods you can use to distribute your app to different organizations, such as Enterprise and US Government. 

For Enterprise organizations you can directly upload your app or publish it your organization's app catalog, or publish it through the AppSource. For Government organizations, they need to be members of Government Cloud Community (GCC). Depending on the fulfillment of the GCC compliance criteria, the GCC tenant administrator decides if an app must be uploaded and published.

## Distribute apps to an Enterprise organization
In an Enterprise organization, you can distribute the app using one of the following methods:

* If only you want to use the app, [upload your app directly](#upload-your-app-directly).
* If you want to distribute your app broadly, Teams provides an in-app gallery for users to find or discover high-quality Teams apps. For the solution to appear in the gallery, you must either:
    * [Publish to your organization's app catalog](#publish-to-your-organizations-app-catalog).<br/>
    Or
    * [Publish to AppSource](#publish-to-appsource).

### Upload your app directly

This is the easiest way to use and test your app. If you are the team owner and [uploading custom apps is enabled](/microsoftteams/admin-settings), you can [directly upload or sideload](apps-upload.md) the app and start using it. However, if you want to share the app with others, you must send your app package and ask them to upload it independently.

### Publish to your organization's app catalog

Your organization's app catalog contains apps that are unique to your organization and is completely under your organization's control. For more information on publishing the app to your organization's app catalog, see [manage your apps in the Microsoft Teams admin center](/microsoftteams/tenant-apps-catalog-teams). 
> [!NOTE]
> This feature can only be managed by Teams users with Microsoft Office 365 tenant admin privileges.

### Publish to AppSource

AppSource provides a convenient location from which you can distribute your apps and other Office 365 extensibility types, such as Office add-ins and SharePoint add-ins. For more information on how to publish your app to AppSource, see [submit your app to AppSource](../appsource/publish.md).

## Distribute to Government Community Cloud (GCC) organizations

A government organization that fulfills specific compliance requirements is a member of the GCC. The decision to upload an app or to publish an app is taken by the GCC tenant administrator. To upload the apps to your organization environment or publish the apps to your organization app catalog follow the steps in [uploading your app directly to Teams](#upload-your-app-directly-to-teams).

### Upload your app directly to Teams
Microsoft does not own or control your custom applications, therefore, you must ensure that all endpoints are compliant with your organization's requirements. In addition, if the app solution includes a bot or message extension, you must complete the [Bot Framework registration](https://dev.botframework.com/).

**To upload an app to your organization's environment**

1. On the **Connect to channels** page, under **Add a featured channel**, select **Teams**.
2. Navigate to the **Configure MSTeams** page.
3. Under **Messaging**, select *Microsoft Teams for Government*.
![Teams messaging configuration page](../../assets/images/gcc-configure.png)
   > [!IMPORTANT]
   > You cannot use the *Microsoft Teams Commercial* configuration to upload or sideload your custom app to a GCC environment.
4. In the lower left corner of the page, select **Save**.

> [!NOTE]
> * The uploading instructions for the GCC environment also apply to Teams custom apps. </br>
> * Only Microsoft compliant apps are permitted in the GCC environment and in Teams.
> * Third-party apps are disabled at the tenant level and are managed through your organization's [app permission policies](/microsoftteams/teams-app-permission-policies). You must review all third-party apps to ensure they align with your organization's policies and procedures.

> [!TIP]
> Microsoft 365 developer partners provide security, data handling, and compliance details for their third-party Teams apps through the [Microsoft 365 App Certification Program](/microsoft-365-app-certification/overview). For more information on Teams app certification, see [Microsoft Teams app certification](/microsoftteams/platform/concepts/deploy-and-publish/appsource/post-publish/application-certification).

## See also

> [!div class="nextstepaction"]
> [Publish your apps](apps-publish-overview.md)

> [!div class="nextstepaction"]
> [Maintain published app](../appsource/post-publish/overview.md)

## Next step

> [!div class="nextstepaction"]
> [Create your app package](../build-and-test/apps-package.md)
