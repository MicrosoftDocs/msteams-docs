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

## **FAQs — Teams apps and Partner accounts**

## How do I create a Partner Center account?

There are two ways to create a Partner Center account:

* If you're new to Partner center and don't have an account  within the Microsoft network, [create an account using the Partner Center enrollment page](/office/dev/store/open-a-developer-account#create-an-account-using-an-existing-partner-center-enrollment).
* If you're already enrolled in the Partner Network, [create an account directly in Partner Center using an existing enrollment](/office/dev/store/)

## How do I add my phone number to the contact info section?

The phone number has three parts — country code, area code, and the telephone number. If any section is not applicable, please enter the number `0`.

## Why do I get an  error message stating, "This account is not publish eligible" when I try to submit my add-in through Partner Center?

You will receive the above error message when your [account verification status](/partner-center/verification-responses) is pending. You can check your account verification status in the Partner Center [dashboard](https://partner.microsoft.com/dashboard) by selecting the **Settings** option (the gear icon) in the upper-right corner of the page header shell and choosing **Developer settings** => **Account**  => **Account settings** . During the account verification process the status of each required step —  email ownership, employment verification, and business verification — will be displayed. Once the verification process has been successfully completed, the verification status of your enrollment on the profile page will change from "pending" to "authorized," and the process steps will no longer be displayed. *See below*, for resolving possible verification issues.

## How I do get further support for my account related issues?

Visit the [Partner help and support page](https://aka.ms/marketplacepublishersupport) and search for helpful solutions for documentation related to your issue. If the provided self-serve solutions or documents are not helpful in resolving your issue, please file a support ticket by selecting **Provide issue details** under the **Next step** section. You can search for your issue topic in the search box or select **Browse Topics** below the search box to drill down further.

> [!TIP]
> If you're looking for help with an **account verification**  Issue:
>
>1. Below the **Search box**, select **Browse Topics**.
>1. Select **All programs** from the **Category** drop-down menu.
> 1. Select **Account, Onboarding, Access** from the **Topic** drop-down menu.
>1. **Select an option** from the **Subtopic** drop-down menu.
>1. For further assistance. select **Provide issue details** under  the **Next Step** section.
>

## I've checked my mail folders and haven't received the verification email. What  should I do next?

Please try the following:

1. Check your junk/spam folder.
1. Clear the browser cache, and then go to your Partner Center account dashboard and select  the **Resend verification email** link to have the verification email resent to your email address.
1. Try accessing the  **Resend verification email** link  from a different browser.
1. Work with your IT department to ensure that the verification emails are not blocked by the email server.
1. Adjust your server's spam filter to allow/whitelist all emails from maccount@microsoft.com.

## How long does employment verification process usually take?

If all the details are provided correctly, employment verification completes in 1 to 2 hours.

## I've already reached out to Support, is there a way to expedite my case?

Support tickets will be resolved within a week's time. Please look for the updates which will be sent to the email provided when the support ticket was raised.

## I've created a support ticket and haven't received an update within the last 7 days. Where can I get additional help?

Please send an email to **teamsubm@microsoft.com** with the following details:

1. **Subject Line**. "Partner Center Account Issue for <App_Name>" (Specify the name of your app).
2. **Email body:**
    * Support ticket number:
    * Your seller ID:
    * A screen shot of the issue.

> [!div class="nextstepaction"]
> [Learn more about app validation policies for Microsoft Teams](/office/dev/store/validation-policies#14-microsoft-teams-apps)
