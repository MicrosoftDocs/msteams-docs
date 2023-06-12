---
title: Create your Partner Center developer account  
description: FAQs for creating a Partner Center developer account for publishing your app to the Microsoft Teams store.
ms.topic: how-to
author: heath-hamilton
ms.author: surbhigupta
ms.localizationpriority: high
---
# Create a Partner Center developer account

To publish your app to the Microsoft Teams store, you must [create your Partner Center developer account](/office/dev/store/open-a-developer-account). Depending on your scenario, you might be able to use an existing account.

## FAQ

Get answers to some common questions about managing your Partner Center account.

<br>

<details>

<summary><b>How do I create a Partner Center account?</b></summary>

You can create a Partner Center account one of the following ways:

* If you're new to Partner Center and don't have a Microsoft Network Account, [create an account using the Partner Center enrollment page](/office/dev/store/open-a-developer-account#create-an-account-using-the-partner-center-enrollment-page).
* If you're already enrolled in the Microsoft Partner Network, [create an account directly from Partner Center using existing Microsoft Partner Center enrollments](/office/dev/store/open-a-developer-account#create-an-account-using-an-existing-partner-center-enrollment).

<br>

</details>

<details>

<summary><b>What if I can't find my account in Partner Center?</b></summary>

Open a [Partner Center support ticket](https://partner.microsoft.com/support/v2/?stage=1) and select the following:

| Menu | Option |
| -------   | -------  |
|Category| Commercial Marketplace|
| Topic | General Marketplace Help and How-to questions |
| Subtopic| Office add-in |

<br>

</details>

<details>

<summary><b>Where can I get support for my Partner Center account issues?</b></summary>

Visit the [publishers support page](https://aka.ms/marketplacepublishersupport) to search for your issue. If the guidance isn't helpful, create a [Partner Center support ticket](/azure/marketplace/partner-center-portal/support#how-to-open-a-support-ticket).

<br>

</details>

<details>

<summary><b>How do I manage my Microsoft 365 Store account in Partner Center?</b></summary>

See [manage your account through Partner Center](/office/dev/store/manage-account-settings-and-profile) for information.

<br>

</details>

<details>

<summary><b>My phone number doesn't have an area code, so how do I add it to my profile?</b></summary>

The phone number has three parts: country code, area code, and telephone number. If your phone number doesn't include an area code, leave the second box empty and complete the third box.

<br>

</details>

<details>

<summary><b>How do I manage my account settings and partner profile in Partner Center?</b></summary>

See [manage account settings and profile info](/windows/uwp/publish/manage-account-settings-and-profile#additional-settings-and-info) for information.

<br>

</details>

<details>

<summary><b>Why do I see a, "This account is not publish eligible," message when I try to submit my app?</b></summary>

You received this error message because your [account verification status](/partner-center/verification-responses) is pending. Check your status in the Partner Center [dashboard](https://partner.microsoft.com/dashboard). Select the **Settings** gear icon and choose **Developer settings > Account > Account settings**.

:::image type="content" source="../../../../assets/images/partner-center-verification-status.png" alt-text="Screenshot shows the Partner Center verification status.":::

<br>

</details>

<details>

<summary><b>What is verified in the Partner Center account verification process?</b></summary>

There are three verification areas, **Email Ownership**, **Employment**, and **Business**. For more information, see [what is verified and how to respond](/partner-center/verification-responses#what-is-verified-and-how-to-respond).

If you're the primary contact, global admin, or account admin, you can monitor verification status and track progress on your profile page.

Once verification process is complete, the status of your enrollment on the profile page changes from *pending* to *authorized*. The primary contact then receives an email from Microsoft within a few business days.

<br>

</details>

<details>

<summary><b>My account verification status hasn't advanced beyond Email Ownership. How should I proceed?</b></summary>

During the **Email Ownership** verification process, a verification email is sent to the primary contact. Check your primary contact inbox for an email from **<maccount@microsoft.com>** with the subject line **Action needed: Verify your email account with Microsoft** and complete the email verification process. The verification email is sent to the address listed on your Partner Center account settings.

Remember the following about the email verification process:

* The email verification link is only valid for seven days.
* You can request to resend the email by visiting your partner profile page and selecting the **Resend verification email** link.
* To ensure you receive the email, safe-list **microsoft.com** as a secure domain and check your junk email folders.

<br>

</details>

<details>

<summary><b>I've checked my mail folders and haven't received the verification email. What must I do next?</b></summary>

Try the following:

* Check your junk or spam folder.
* Clear the browser cache, go to your Partner Center account dashboard, and select **Resend verification email**.
* Try accessing the **Resend verification email** link from a different browser.
* Work with your IT department to ensure that the verification emails are not blocked by your email server.
* Adjust your server's spam filter to allow or safe-list all emails from **<maccount@microsoft.com>**.

<br>

</details>

<details>

<summary><b>How long does the employment verification process usually take?</b></summary>

If all the submitted details are correct, the employment verification process takes about two hours to complete.

<br>

</details>

<details>

<summary><b>How long does the business verification process usually take?</b></summary>

If all the required documents are submitted, business verification takes one to two business days to complete.

<br>

</details>

<details>

<summary><b>If I reach out to the support team, will my ticket be expedited?</b></summary>

Support tickets get resolved in a week. Check for updates sent to the email you provided when creating the support ticket.

<br>

</details>

<details>

<summary><b>I created a support ticket but haven't received an update in seven business days. Where can I get help?</b></summary>

Send an email to <a href="mailto:teamsubm@microsoft.com">teamsubm@microsoft.com</a> with the following details:

* **Subject Line**: Partner Center Account Issue for *your app name*.
* **Email body**:
  * Support ticket number.
  * Your seller ID.
  * A screenshot of the issue (if possible).

<br>

</details>

<details>

<summary><b>Where else can I go for Partner Center help?</b></summary>

The following resources can also assist:

* [Microsoft 365 app submission FAQ](/office/dev/store/appsource-submission-faq).
* [Commercial marketplace documentation](/azure/marketplace/).

<br>

</details>

> [!NOTE]
> To enable end-users to install your app on the Teams iOS platform, see [Update Apple App Store Connect Team ID on Partner Center](update-apple-store-team-connect-id.md).

## Next step

> [!div class="nextstepaction"]
> [Prepare your store submission](~/concepts/deploy-and-publish/appsource/prepare/submission-checklist.md)

## See also

[Publish your app to the Microsoft Teams store](../publish.md)
