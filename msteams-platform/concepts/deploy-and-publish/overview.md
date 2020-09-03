---
title: Distribute your app
description: Describes the three options for distributing your app`
keywords: teams publish store office distribute AppSource sideload upload app
---
# Distribute your Microsoft Teams app

Once you've created your app there are three options for distributing it:

1. [Upload your app directly](#upload-your-app-directly).
2. [Publish your app to your organization's app catalog](#publish-to-your-organizations-app-catalog).
3. [Publish your app through AppSource](#publish-to-appsource).

## Enterprise organizations

### Upload your app directly

This is the easiest way to test and use your app. If you are the team owner and/or [uploading custom apps is enabled](/microsoftteams/admin-settings), you can [directly upload (or sideload)](./apps-upload.md) the app and start using it right away. However, if you want to share the app with others, you'll have to send them your app package and ask them to upload it independently.

If you want to distribute your app more broadly,Teams provides an in-app gallery for users to find or discover high-quality Teams apps. To have your solution available in the gallery, you must either [publish to your organization's app catalog](#publish-to-your-organizations-app-catalog) or [publish to AppSource](./appsource/publish.md).

### Publish to your organization's app catalog

Your organization's app catalog contains apps unique to your organization and is completely under your organization's control. You can find more information in the article [*Publish apps to your organization's app catalog*](/microsoftteams/tenant-apps-catalog-teams). This feature can only be managed by Teams users with Microsoft Office 365 tenant admin privileges.

### Publish to AppSource

AppSource (formerly known as Office Store) provides a convenient location for you to distribute your Microsoft Teams app, as well as other Office 365 extensibility types such as Office add-ins and SharePoint add-ins. Follow our guidelines to [submit your app to AppSource](./appsource/publish.md).

## Government Community Cloud (GCC) organizations

### Upload your custom app directly to Teams

 As a GCC tenant administrator, you'll decide whether to upload a custom app to your tenant environment and whether to  publish it to your tenant app catalog. Microsoft doesn't own or control your custom applications, therefore, you must ensure that all endpoints are compliant with your organization's requirements. Additionally, if the app solution includes a bot or message extension, you'll need to complete the [Bot Framework](https://dev.botframework.com/) registration as follows:

1. On the **Connect to channels** page, under **Add a featured channel**, select **Teams**.
1. Navigate to the **Configure MSTeams** page (*see* below).
1. Under **Messaging** select the **Microsoft Teams for Government Customers** radio button.
1. In the lower left corner of the page, select **Save**.  

>[!IMPORTANT]
> You cannot use the Teams commercial configuration to upload/sideload your custom app to a GCC environment,  You must select the **Microsoft Teams for Government Customers** radio button for a GCC compliant configuration.

![Teams messaging configuration page](../../assets/images/gcc-configure.png)

> [!NOTE]
>
> * The uploading instructions for GCC environments, presented above, applies to Teams custom apps. </br>
> * Compliant Microsoft apps are enabled in the GCC environment, by default, in Teams.
> * Third-party apps are disabled at the tenant level and should be managed via your organization's [app permission policies](/microsoftteams/teams-app-permission-policies). Make certain that you review all third-party apps to ensure that they align with your organization's policies and procedures.

> [!TIP]
>
> Microsoft 365 developer partners provide security, data handling, and compliance details for their third-party Teams apps through the [Microsoft 365 App Certification Program](/microsoft-365-app-certification/overview). *See also* [Microsoft Teams App Certification](/microsoftteams/platform/concepts/deploy-and-publish/appsource/post-publish/application-certification).
</br></br>
