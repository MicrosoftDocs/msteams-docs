---
title: Microsoft Teams app approval process guidance
description: Describes the approval process for getting your app published to the Microsoft Teams app store
keywords: teams publish store office publishing AppSource
---
# Submit your app to AppSource

## Teams app submission

Publishing  your app to [AppSource](https://appsource.microsoft.com) makes it available in the Teams app catalog and on the web. At a high level, the process for submitting your app to AppSource is:

1. Develop your app following our [design guidelines](~/concepts/design/understand-use-cases.md). Tabs should follow our [tab design guidelines](~/tabs/design/tabs.md). Bots should follow the [bot design guidelines](~/bots/design/bots.md).
1. [Set up a developer account](/office/dev/store/open-a-developer-account) in [Partner Center](https://support.microsoft.com/help/4499930/partner-center-overview).
1. Prepare your app for submission by following our [submission checklist](~/concepts/deploy-and-publish/appsource/prepare/submission-checklist.md).
1. Review our [tips for a successful app submission](~/concepts/deploy-and-publish/appsource/prepare/frequently-failed-cases.md).
1. Submit your package to [AppSource through Partner Center](/office/dev/store/use-partner-center-to-submit-to-appsource).
1. Track the approval process on your Partner Center dashboard. *See* [Partner Center Overview](https://support.microsoft.com/help/4499930/partner-center-overview).
1. Post submission — review our guidance for [Maintaining and supporting your published app](~/concepts/deploy-and-publish/appsource/post-publish/overview.md).

>[!NOTE]
>
> * If your Teams app contains a bot, you must comply with the Bot Developer Framework [Code of Conduct](https://aka.ms/bf-conduct).
> * If your app contains an Office 365 Connector, additional terms may apply. *See* [Connectors Developer Dashboard](https://aka.ms/connectorsdashboard) and [App Developer Agreement](https://sellerdashboard.microsoft.com/Assets/Content/Agreements/Office_Store_Seller_Agreement_20120927.htm).

> [!div class="nextstepaction"]
> [Learn more about app validation policies for Microsoft Teams](https://docs.microsoft.com/legal/marketplace/certification-policies)

## FAQs — Teams apps and Partner accounts

## How do I create a Partner Center account?

There are two ways to create a Partner Center account:

* If you're new to Partner center and don't have an account  within the Microsoft network, [create an account using the Partner Center enrollment page](/office/dev/store/open-a-developer-account#create-an-account-using-an-existing-partner-center-enrollment).
* If you're already enrolled in the Partner Network, [create an account directly in Partner Center using an existing enrollment](/office/dev/store/).

## How do I add my phone number to the contact info section?

The phone number has three parts — country code, area code, and the telephone number. If there is no Area code then leave the second box empty and fill the third box.

## I cannot find Office Store program in my Partner Center Account?
Please open a ticket via [this link](https://docs.microsoft.com/en-us/azure/marketplace/partner-center-portal/support#how-to-open-a-support-ticket) and select below options -
Category: "Commercial Marketplace", Topic: "General Marketplace Help and How-To questions", sub-topic: "Office Add-ins"

## How do I manage Account Settings and Profile Info in Partner Center?
Please refer [this document] (https://docs.microsoft.com/en-us/windows/uwp/publish/manage-account-settings-and-profile#additional-settings-and-info) for managing Account Settings page.

## How do I manage Office Store Account?
Please refer [this document] (https://docs.microsoft.com/en-us/office/dev/store/manage-account-settings-and-profile) for managing Office Store Account through Partner Center.

## Why do I get the message, "This account is not publish eligible," when I try to submit my add-in through Partner Center?

You will receive the above error message when your [account verification status](/partner-center/verification-responses) is pending. You can check your account verification status in the Partner Center [dashboard](https://partner.microsoft.com/dashboard) by selecting the **Settings** option (the gear icon) in the upper-right corner of the page header shell and choosing **Developer settings** => **Account**  => **Account settings** .

![Partner Center account settings page](../../../assets/images/partner-center-accts-page.png)

![Partner Center verification status](../../../assets/images/partner-center-verification-status.png)

During the account verification process the status of each required step —  email ownership, employment verification, and business verification — will be displayed. Once the verification process has been successfully completed, the verification status of your enrollment on the profile page will change from "pending" to "authorized," and the process steps will no longer be displayed.

![Partner Center verification error](../../../assets/images/partner-center-acct-verification-error.png)

## My account “Verification status” is stuck at “Email Verification”. How do I proceed further?
Please look out for an email from “maccount@microsoft.com” with the subject “Action needed: Verify your email account with Microsoft” asking you to complete the Email verification. The verification email will be sent to the email updated in your Account Settings page in Partner Center.

Note: The email verification link is only valid for 7 days. To re-genrate the link and resend the email, please click on resend email option in Partner Center.

## How I do get further support for my account related issues?

Please visit [this page] (https://docs.microsoft.com/en-us/azure/marketplace/partner-center-portal/support#how-to-open-a-support-ticket) for steps on creating a support ticket.

## I've checked my mail folders and haven't received the verification email. What  should I do next?

Please try the following:

1. Check your junk/spam folder.
1. Clear the browser cache, go to your Partner Center account dashboard, and select  the **Resend verification email** link to have the verification email resent to your email address.
1. Try accessing the  **Resend verification email** link  from a different browser.
1. Work with your IT department to ensure that the verification emails are not blocked by the email server.
1. Adjust your server's spam filter to allow/whitelist all emails from **maccount@microsoft.<span></span>com**.

## How long does the employment verification process usually take?

If all the details are provided correctly, employment verification completes in 1 to 2 hours.

## How long does “Business Verification” usually take?
Business Verification takes 1 to 2 business days to complete, provided all required documents are submitted.


## I've already reached out to Support, is there a way to expedite my case?

Support tickets will be resolved within a week's time. Please look for the updates which will be sent to the email provided when the support ticket was raised.

## I've created a support ticket, it has been 7 business days, and I haven't received an update. Where can I get additional help?

Please send an email to **<teamsubm@microsoft.com>** with the following details:

1. **Subject Line**. *Partner Center Account Issue for <App_Name>* (specify the name of your app).
2. **Email body:**
    * Support ticket number:
    * Your seller ID:
    * A screen shot of the issue (if possible)
