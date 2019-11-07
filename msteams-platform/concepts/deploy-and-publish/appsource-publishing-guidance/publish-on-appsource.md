---
title: Microsoft Teams app approval process guidance
description: Describes the approval process for getting your app published to the Microsoft Teams app store
keywords: teams publish store office publishing AppSource
---

AppSource (formerly known as Office Store) provides a convenient location for you to distribute your Microsoft Teams app, as well as other Office 365 extensibility types such as Office add-ins and SharePoint add-ins. To include your solution in AppSource, you submit it to the Seller Dashboard. You need to create an individual or company account if you have not already done so for other Windows apps or Office extensibility types.

By developing and submitting a Microsoft Teams app, you are subject to the Bot Developer Framework [Terms of Use](https://aka.ms/bf-terms), [Privacy Policy](https://aka.ms/bf-privacy), and [Code of Conduct](https://aka.ms/bf-conduct) for bot, tab, and messaging extension functionality within your app. If your app contains Office 365 Connector functionality, separate terms may also apply as part of your Connector Registration on the [Connectors Developer Dashboard](https://aka.ms/connectorsdashboard).


# Overview of Microsoft Teams app submission process

> [!IMPORTANT]
> Registering as a developer can be a time-consuming process. It is best to start this process while you're still developing your app.

1. Develope your app following our [design guidelines]() 
1. Debug and test: Make sure your app meets all the Test and debug criteria
2. Prepare your app for submission: Make sure your app passes the [submission checklist]()
3. Submission prerequisites: Make sure you satisfy all the [submission prerequisites]().
4. Testing Notes: Include proper [Test Notes for validation](#Test-Notes-for-validation/approval)
5. Tips: Go through our [tips for submission](Tips-for-successful-app-submission) for a quicker submission process/ 
6. Validation: [Submit your app in partner center]() 
7. Update: Make sure your app adhere to our [expectation for Teams App]() 


At a high level, the process for submitting your app to AppSource is:


### Test Notes for validation/approval

You must provide at least two login credentials, one admin and one not, so your app can be validated.

* The accounts you provide should have sufficient data pre-populated for verification purposes.
* For enterprise apps, apps where a subscription is required, or where there is an office 365 tenant/domain dependency for testing you must provide an 3rd account in the same domain that is not already configured to use your app so we can validate the first-run user experience.
* If your app has any Premium/Upgraded features, an account with the necessary access must be provided to test that experience.
* You may choose to upload your test notes to SharePoint. In such cases, please provide a public link to the file.

## Submission prerequisites
You must register as **both** Microsoft app developer and developer in seller dashboard in order to publish your app. 

* [Register as a Microsoft app developer](https://developer.microsoft.com/store/register).
* [Register as a developer in the Seller Dashboard](#register-in-the-seller-dashboard-to-submit-to-appsource).

### Register as an app developer

If you have already registered in the Microsoft Store ecosystem, either by distributing a Universal Windows App (UWA) via the Windows Store or an Office or SharePoint add-in via AppSource, you should use this account to distribute your Microsoft Teams app. Otherwise, you must first [register as an app developer](https://developer.microsoft.com/store/register) to create your publisher identity in the Microsoft Store ecosystem. Account registration allows you to secure your company identity and triggers validation checks by the Microsoft Store team to ensure you are who you say you are.

Account management in the Microsoft Store ecosystem relies on a [Microsoft account](https://account.microsoft.com/account). This identity will be the main administrator/owner of your AppSource experience. For more information, please review [Opening a developer account](/windows/uwp/publish/opening-a-developer-account) and the [Developer program FAQ](https://developer.microsoft.com/store/register/faq).

#### Account suggestions

* Create a Microsoft account specifically for your developer/AppSource account. Keep this account and password confidential, and share it only with your release team.
* Use a Microsoft account, not an Azure AD account. Although you might have leveraged the Windows Store Azure Active Directory (Azure AD) support for Windows Store account management, the AppSource Seller Dashboard requires you to use a Microsoft account, not an Azure AD account.
* If you've developed with a trial developer Office 365 account, do not use this account for your AppSource identity. Create a separate Microsoft account instead.

### Register in the Seller Dashboard to submit to AppSource

A second approval process happens after you create your developer account: You need to create your identity in the [AppSource Seller Dashboard](https://sellerdashboard.microsoft.com/Application/Summary). Although the content here should be similar to the details of your developer account, this extra step ensures that AppSource has all the required information and that your identity in that storefront accurately reflects your business.

If you already submitted other product types to AppSource, this additional registration may not be necessary.

To start the process, choose the **Continue** button under **Office**.

![AppSource Seller Dashboard entry point](~/assets/images/submission/sellerdashboardofficeentry.png)

