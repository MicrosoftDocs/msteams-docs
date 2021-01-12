---
title: Microsoft Teams app approval submission process guidance
description: Describes the approval submission process for getting your app published to the Microsoft Teams app store
keywords: teams publish store office publishing publish AppSource partner center account verification apps account not publish eligible 
---

# Submit your app to AppSource

## Teams app submission

Make your app available in the Microsoft Teams app catalog and on the web by publishing it to [AppSource](https://appsource.microsoft.com). At a high level, the process for submitting your app to AppSource is as follows:

1. Develop your app by following the [design guidelines](~/concepts/design/understand-use-cases.md). Tabs should follow our [tab design guidelines](~/tabs/design/tabs.md). Bots should follow the [bot design guidelines](~/bots/design/bots.md).
1. Ensure your app meets the app [validation policies](/legal/marketplace/certification-policies) for Microsoft Teams. 
1. Test your app with the [Manifest validation tool](prepare/submission-checklist.md#teams-app-validation-tool) .
1. Set up a [developer account](/office/dev/store/open-a-developer-account) in [Partner Center](https://support.microsoft.com/help/4499930/partner-center-overview). *See also* [How do I create a Partner Center account](#how-do-i-create-a-partner-center-account) in the FAQ section.
1. Prepare your app for submission by following our [submission checklist](prepare/submission-checklist.md).
1. Review the [most failed test cases for a quicker app quality approval](prepare/frequently-failed-cases.md).
1. Submit your package to [AppSource through Partner Center](/office/dev/store/use-partner-center-to-submit-to-appsource).
1. Track the approval process on your Partner Center dashboard. *See* [Partner Center Overview](https://support.microsoft.com/help/4499930/partner-center-overview).
1. After submission, review the guidance for [Maintaining and supporting your published app](post-publish/overview.md) after submission.

>[!NOTE]
>
>- If your Teams app contains a bot, you must comply with the Bot Developer Framework [Code of Conduct](https://aka.ms/bf-conduct).
>- If your app contains an Office 365 Connector, additional terms may apply. *See* [Connectors Developer Dashboard](https://aka.ms/connectorsdashboard) and [App Developer Agreement](https://sellerdashboard.microsoft.com/Assets/Content/Agreements/Office_Store_Seller_Agreement_20120927.htm).
>- To make your app available for GCC users and avoid duplicate app listings in the store, the auth process or flow should identify and route the user to the specified or expected content URL for GCC users.

## FAQs — Teams apps and Partner account verification process in Partner Center

## How do I create a Partner Center account?

There are two ways to create a Partner Center account:

- If you are new to Partner Center and don't have an account in the Microsoft network, create an account using the [Partner Center enrollment page](/office/dev/store/open-a-developer-account#create-an-account-using-an-existing-partner-center-enrollment).
- If you are already enrolled in the Partner Network, create an account directly in Partner Center using an [ existing enrollment page](/office/dev/store/).

## What if I cannot find my Office Store account in Partner Center?

Open a [Partner Center support ticket](https://partner.microsoft.com/support/v2/?stage=1) and select the following from the drop-down menus:

| Menu | Option |
| -------   | -------  |
|Category| Commercial Marketplace|
| Topic | General Marketplace Help and How-to questions |
| Subtopic| Office add-in |

## Where can I get support for my Partner Center account issues?

Visit the [publishers support page](https://aka.ms/marketplacepublishersupport) to search for your issue topic and find guidance. If the provided guidance is not helpful, raise a [Partner Center support ticket](/azure/marketplace/partner-center-portal/support#how-to-open-a-support-ticket).

## How do I manage my Office Store account in Partner Center?

Visit the  [Manage your Office Store account through Partner Center](/office/dev/store/manage-account-settings-and-profile) for guidance.

## How do I add my phone number to the partner profile contact section?

The phone number has three parts — country code, area code, and the telephone number. If your phone number doesn't include an area code, then leave the second box empty, and complete the third box.

## How do I manage my account settings and partner profile in Partner Center?

Visit the [Manage account settings and profile info](/windows/uwp/publish/manage-account-settings-and-profile#additional-settings-and-info) page for guidance on managing your Partner Center account settings.

## Why do I receive the message, "This account is not publish eligible," when I try to submit my add-in through Partner Center?

You will receive the above error message when your [account verification status](/partner-center/verification-responses) is pending. Check your account verification status in the Partner Center  [dashboard](https://partner.microsoft.com/dashboard). Select the **Settings** option (the gear icon in the upper-right corner of the page header shell). Choose **Developer settings** => **Account**  => **Account settings** .

![Partner Center account settings page](../../../assets/images/partner-center-accts-page.png)

![Partner Center verification status](../../../assets/images/partner-center-verification-status.png)

During the account verification process, the status of each required step such as **Email Ownership**, **Employment Verification**, and **Business Verification** will be displayed. After the verification process has been completed, the verification status of your enrollment on the profile page will change from *pending* to *authorized*. The process steps will not be displayed.

![Partner Center verification error](../../../assets/images/partner-center-acct-verification-error.png)

## What is verified in Partner Center account verification process and how to respond?
There are three verification areas - **Email Ownership**, **Employment**, and **Business**. See the details of [What is verified and how to respond](/partner-center/verification-responses#what-is-verified-and-how-to-respond).
If you are the primary contact (Global admin or Account admin), go to your Partner Profile to monitor verification status and track progress.

After the verification process is complete, the verification status of your enrollment on the profile page will change from *pending* to *authorized* and the process steps with status, displayed on that page, will disappear. The primary contact will receive an email from Microsoft within a few business days after the verification is completed.

## My account Verification status has not advanced beyond Email Ownership in Partner Center. How should I proceed?

During the **Email Ownership** verification process, a verification email is sent to the primary contact email address. Check your primary contact inbox for an email  from **maccount@<span>microsoft</span>.com** with the subject  line *Action needed: Verify your email account with Microsoft*. Complete the email verification process. The verification email will be sent to the email address listed on your account settings page in Partner Center.

> [!NOTE]
> * The email verification link is only valid for 7 days. 
> * You can request us to resend the email by visiting your partner profile page and selecting the **Resend verification email** link.
> * To ensure that the email is received, safe-list email from microsoft.com as a secure domain, and check your junk email folders.

## How do I get further support for my account related issues?

Visit the [Support for the Commercial Marketplace program in Partner Center](/azure/marketplace/partner-center-portal/support) page for guidance and steps to create a support ticket.

## I've checked my mail folders and haven't received the verification email. What should I do next?

Try the following:
* Check your junk or spam folder.
* Clear the browser cache, go to your Partner Center account dashboard, and select  the **Resend verification email** link to have the verification email resent to your email address.
* Try accessing the  **Resend verification email** link  from a different browser.
* Work with your IT department to ensure that the verification emails are not blocked by the email server.
* Adjust your server's spam filter to allow or safe-list all emails from **maccount@microsoft.<span></span>com**.

## How long does the employment verification process usually take?

If all the submitted details are correct, employment verification can be completed in two hours.

## How long does the “Business Verification” process usually take?

Business verification takes up to two business days to complete, provided all the required documents have been submitted.

## If I reach out to the support team, will my ticket be expedited?

Support tickets will be resolved within a week. Check for the updates sent to the email id provided when raising the support ticket.

## My issue is not listed here.  Are there other pages I can reference for Partner Center issues?

See the [commercial marketplace documentation](/azure/marketplace/) for more help.

## I've created a support ticket, it has been 7 business days, and I haven't received an update. Where can I get additional help?

Send an email to **<teamsubm@microsoft.com>** with the following details:

* **Subject Line**: Partner Center Account Issue for <App_Name> (specify the name of your app).
* **Email body**:
    * Support ticket number
    * Your seller ID
    * A screen shot of the issue (if possible)
    
## App category mapping

| Teams Category       | PC Categories  |
|:---------------------|:---------------|
| Analytics and BI | Analytics, Data Visualization and BI |
| Developer and IT | Developer Tools, IT Admin |
| Education | Education |
| Human resources | Human Resources and Recruiting |
| Productivity | Content Management, Files and documents, Productivity, Training and Tutorials, and Utilities |
| Project management | Communication, Project Management, Workflow and Business Management |
| Sales and support | Customer and Contact Management, Customer Support, Financial Management, Sales and Marketing |
| Social and fun | Image and Video Galleries, Lifestyle, News and Weather, Social, Travel and Navigation |

>
> [!div class="nextstepaction"]
> [Learn more about app validation policies for Microsoft Teams](/legal/marketplace/certification-policies)
