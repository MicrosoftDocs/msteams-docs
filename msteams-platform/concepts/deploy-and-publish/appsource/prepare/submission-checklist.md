---
title: Prepare your store submission  
description: Final steps before you submit your Microsoft Teams app to be listed on the store. Validate app package and complete publisher verification and attestation.
ms.topic: how-to
ms.localizationpriority: high
author: heath-hamilton
ms.author: surbhigupta
---

# Prepare your Teams store submission

You've designed, built, and tested your Microsoft Teams app. Now you're ready to list it so people can discover and start using your app.

See the following video to learn more about publishing your app to the Microsoft Teams app store:
<br>

> [!VIDEO https://www.microsoft.com/videoplayer/embed/RE4WG3l]
<br>

Before you submit your app to [Partner Center](/office/dev/store/use-partner-center-to-submit-to-appsource), ensure you've done the following.

## Validate your app package

While your app may be working in a test environment, you should check your app package to avoid running into issues during the submission process.

The Microsoft Teams app validation tool helps you identify and fix issues before submitting to Partner Center. The tool automatically checks your app's configurations against the same test cases used during store validation.

1. Go to the [Microsoft Teams app validation tool](https://dev.teams.microsoft.com/appvalidation.html).

   You can also validate your app using [Developer Portal for Teams.](~/concepts/build-and-test/teams-developer-portal.md)

1. Upload your app package to run the automated tests.
1. Go to the **Preliminary checklist** and review the test cases that are difficult to automate.
1. [Fix issues with your configurations](~/resources/schema/manifest-schema.md) or app in general. These issues occur if the automated tests give you errors or you haven't met all the criteria in the checklist.

## Compile testing instructions

Depending on your app functionality, you're required to provide Teams tenant configurations, a set of test accounts, and test notes. Ensure that you meet all requirements listed in this section to avoid app testability failures and delay in the app publishing process.

1. **Tenant configurations**: You must configure a Teams tenant to test your app and provide test accounts. This section shares the details for configuring a tenant for your app's testing. For more information about creating a demo tenant, see [Prepare your Microsoft 365 tenant](../../../build-and-test/prepare-your-o365-tenant.md). Ensure your app is configured for this demo tenant. If applicable, safe-listing or connection to external services for this tenant should be done before submission of the app.

2. **Test Accounts**: Depending on your app's features, you need to provide the following accounts:

    - Admin account (required)
    - Non-admin accounts (required)

        - Ensure that test accounts are safe-listed or configured with license keys, if applicable.
        - If your app requires users to log in or connect to external services, provide the required credentials to complete the login or connection with the external service.
        - Ensure that phone-based 2-way authentication is disabled for test accounts.
        - If the app provides a collaborative experience, provide a non-admin account for each user persona. For example, if your app is used by teachers and students, provide credentials for both user personas.
        - Ensure that at least one account has access to premium or upgraded features, if applicable.
        - All accounts you provide must include pre-populated data to help in testing. For example, if your app helps to provide market insights based on the user profile, ensure that market data is pre-populated along with a few user profiles.
        - Provide at least one account that isn't pre-configured to test the first-run sign-in experience properly.

    > [!NOTE]
    > These accounts must be utilized only for validation requirements. The validation team will test your app fully, including first-run user experience.
    > If your app is free for all users and anyone who intends to use your app can sign up to use it, indicate the same in the test notes. The validation team will use the sign up process as described.

3. **Test Notes**: The notes provide details about your app's capabilities in Teams and the steps for testing each one. It helps the validation team to understand your app better and complete the testing for all functionalities in your app. If your app functionality includes event-based notifications, list the instructions to trigger these events. For time-based notifications, indicate the expected time for receiving these notifications.

    > [!NOTE]
    > The functional testing of the app is initiated based on the test notes you provide. However, the validation team won't restrict the testing only to the test instructions.

4. **Demo Video**: Provide a recording of your app so that Microsoft can fully understand its functionality.

Here are sample test instructions for your reference:
<!--
<br>
<br>
<details>
<summary><b>Sample 1: EDU app</b></summary>

- [About the EDU app](#about-the-edu-app)
- [Pre-requisites for EDU app](#pre-requisites-for-edu-app)
- [Test credentials](#test-credentials)
- [App functionality](#app-functionality)
  - [Contoso dashboard](#contoso-dashboard)
  - [Classes](#classes)
  - [Assignments](#assignments)
    - [Creating a new assignment](#creating-a-new-assignment)
    - [Modify assignments](#modify-assignments)
    - [Correcting documents and giving feedback](#correcting-documents-and-giving-feedback)
  - [Observation database](#observation-database)
- [Demo video for EDU app](#demo-video-for-edu-app)

### About the EDU app

Contoso offers a web-based productivity tool that teachers use to grade students’ work. It supports teachers during the entire process of setting, correcting, marking, grading, and giving feedback on assignments. It can be done for any subject and have any form, such as essays, papers, and letters. Additionally, the app offers various options, such as checking plagiarism  to promote original writing, team hand-ins to stimulate collaborating in groups and peer assessment, and feedback to help students learn from each other.

### Pre-requisites for EDU app

> [!IMPORTANT]
> Before you start using Contoso within Teams, we assume that you have an educational tenant already filled with a school, classes or teams, teachers, and students. If not, you'll see error 005 or 0010.

### Test credentials

Teacher #1

- email: xxxxxxxxxx@contoso.com
- password: xxxxxxxxxxx

Student #1

- email: xxxxxxxxxx@contoso.com
- password: xxxxxxxxxxx

Student #2

- email: xxxxxxxxxx@contoso.com
- password: xxxxxxxxxxx

### App functionality

#### Contoso dashboard

When you go to the Contoso app within Microsoft Teams, you first arrive at the dashboard page. This page provides at a glance information about texts that haven’t been handed-in yet, that still need to be corrected and the ones that are corrected already and of which the feedback can be sent to the student.

The **Assignments** section shows the assignments that are currently active. You can create a new assignment in Contoso by selecting the green button under an assignment (that is, through the needless integration, also immediately visible in Microsoft Teams when created). You can also select a period and group or class here.

#### Classes

Through the integration of Contoso within Microsoft Teams, it's possible to make a group or class within Teams. It's afterwards also created within Contoso (within Teams) automatically. See in the image below, the creation of ‘Lizzy’s trial class’.

:::image type="content" source="../../../../assets/images/store-detail-page/edu-sample-class.png" alt-text="Education sample shows trial class":::

In the next image, you can see that it's automatically visible within Contoso when you go to **My Classes/groups** in the menu on the left.

:::image type="content" source="../../../../assets/images/store-detail-page/edu-sample-class-group.png" alt-text="Education sample showing Contoso class group":::

> [!NOTE]
> The other way around it isn't possible yet. We'd like to realize this in cooperation with Microsoft Teams. This would entail being possible to create a Class or Group in the app of Contoso in Microsoft Teams, and that this would also be linked to the **Teams** page within Microsoft Teams.

#### Assignments

Within Microsoft Teams, you can see the **Assignments** icon in the left menu. Here you can see a list of assignments. It also shows the due date of the assignments and to what class these assignments are assigned to.

Above the list of assignments there are three tabs visible: **Assigned**, **Returned**, and **Drafts**.

- The **Assigned** tab shows assignments that are sent to your classes.
- The **Returned** tab shows the assignments that the students returned, which are ready for checking.
- The **Drafts** tab shows assignments that are created as a concept and that they aren't sent to your students yet.

Next to **Drafts**, it's possible to filter assignments by class. When clicking on an assignment that’s in the list, you can see the status of the assignment per student. The types of status notifications mean:

- **Not handed in**: The student didn't hand in the assignment, and that they didn't have a look at the assignment descriptions either.
- **Viewed**: The assignment isn't handed in yet, but the student has seen the assignment description.
- **Handed in**: The student has submitted the assignment and you can start checking it.

:::image type="content" source="../../../../assets/images/store-detail-page/edu-assignment.png" alt-text="Education sample showing class assignment":::

##### Creating a new assignment

To create an assignment in Teams:

1. Go to **Assignments** and select **Create** from the bottom-left corner.

:::image type="content" source="../../../../assets/images/store-detail-page/edu-sample-new-assignment.png" alt-text="Education sample showing new assignment":::

1. As the template options are disabled for the use of Contoso within Microsoft Teams, select the  **Create a new assignment** button (without an already existing template).

    You can see the following screen.

    :::image type="content" source="../../../../assets/images/store-detail-page/edu-sample-app.png" alt-text="Education sample app":::

1. Select a title that says something about the assignment so that you can later find the correct assignment based on the title.

    The status of the assignment can be **draft**, **published**, **closed**, or **hidden**.

    Automatically, this status is visible on draft. It means that when you save this new assignment, it'll be saved as a concept after which, you'd still need to send it to your students.

1. By changing the status to **Published**, it'll immediately send the assignment after you save it.

    You can change the status later. For example, it's possible to prepare various assignments before you publish them.

The **language of the text** determines which database of observations will be used to check and give feedback on the text. Under the option **Allowed ways to hand in texts**, you can choose whether your students type their texts in Contoso (or copy and paste them from word/pages file), or that they upload a document in Contoso.

:::image type="content" source="../../../../assets/images/store-detail-page/edu-sample-app-b.png" alt-text="Education sample showing sample app":::

##### Modify assignments

You can modify the assignments that were created. You can go to **Assignments** in Teams and select the assignment you'd like to modify. Then, select Contoso SV PRO.

##### Correcting documents and giving feedback

Go to **Assignments** or first to **Teams**, then choose your class or group and then select the assignment you would like to correct.

#### Observation database

After one or more words or parts of the text are selected, it's possible to place an observation with the text. This feedback can be given in the form of compliments, critical comments, or open comments.

:::image type="content" source="../../../../assets/images/store-detail-page/edu-sample-database.png" alt-text="Education sample database":::

### Demo video for EDU app

</details>

<details>
<summary><b>Sample 2: ERP data transfer</b></summary>

- [About the ERP data transfer app](#about-the-erp-data-transfer-app)
- [Feature list for ERP data transfer app](#feature-list-for-erp-data-transfer-app)
- [Installation](#installation)
  - [Login credentials](#login-credentials)
  - [Steps](#steps)
- [ERP data transfer app functionality](#erp-data-transfer-app-functionality)
  - [Workflow 1: Copy items from platform A to platform B](#workflow-1-copy-items-from-platform-a-to-platform-b)
  - [Workflow 2: Copy orders from platform B to platform A](#workflow-2-copy-orders-from-platform-b-to-platform-a)
- [Demo video for ERP data transfer](#demo-video-for-erp-data-transfer)

### About the ERP data transfer app

Contoso is a PaaS or SaaS in cloud platform that transfers data between e-commerce, ERP, CRM, marketplace, mail automation platforms, and shipping platforms. Contoso allows automatic transfer between connected platforms through its workflows. Users can activate and deactivate workflows in just one step after they connect to platforms they're interested in.

### Feature list for ERP data transfer app

Contoso E-commerce Manager:

1. Connects e-commerce, ERP, marketplace, and shipping platforms.
1. Allows automatic data transfer between platforms.
1. Sends notices to Teams channels.

The copy of orders by platform A to platform B can be approved or disapproved by cards on the Teams channel.

### Installation

Search the app “Contoso” from apps built for your organization and install it. (If there are any steps to follow for installing the app, ensure that you specify them.)

#### Login credentials

Users need a Contoso subscription to use the app “Contoso”. Users can buy a subscription through the link in the **Info** section.

Your credentials to test Contoso app can be:

User #1

- email: xxxxxxxxxx@contoso.com
- password: xxxxxxxxxxx

User #2

- email: xxxxxxxxxx@contoso.com
- password: xxxxxxxxxxx

#### Steps

To use Contoso, users must connect to at least two platforms. Contoso needs platform A and platform B to transfer data. They can find instructions to complete the form by visiting our guides online from https://www.xxxxxxxxxx.com/guide/.

On the first login, users will have to authorize the App Contoso Manager to access the information shown on the pop-up. After that on every login, users will find Microsoft 365 already connected.

1. **Step 1:  Connect to platform A**: To connect to a platform, users must choose platform A from the list. Steps to test this feature:

    1. In Apps, select **Connect a new app**.
    1. Choose the app you want to connect with (choose: *Platform A*).
    1. Complete the form with the required information.
    1. Users can find information (that is, API key, token, URL, secret key, and client ID) required by different apps in our online guide.
    1. Select **Verify and save**.

1. **Step 2: Connect to platform B**: To connect to a platform, users must choose platform B from the list. Steps to test this feature:

    1. In Apps, select **Connect a new app**.
    1. Choose the app you want to connect with (choose: *Platform B*).
    1. Complete the form with the required information.
    1. Users can find info (that is, API key, token, URL, secret key, client ID) required by different apps in our online guide.
    1. Select **Verify and save**.

### ERP data transfer app functionality

A workflow is an automation that allows several tasks to be repeated automatically every time a trigger starts (that is, get an order by platform A). Two workflows are available in Contoso:

- Workflow #1: Copy items from platform A to platform B
- Workflow #2: Copy orders from platform B to platform A

#### Workflow #1: Copy items from platform A to platform B

This workflow requires platform A and platform B to work. It copies all items and products from platform A to platform B.

Steps for workflow #1: (Provide screenshots)

1. Activate the workflow using the toggle.
1. Look at products already uploaded on platform A, by selecting the **Products** tab.
1. Wait for automatic sync. After 15 minutes, check your platform B to find the products.

#### Workflow #2: Copy orders from platform B to platform A

This workflow requires platform A and platform B to work. It copies new orders from platform A to platform B connected. You must activate Workflow 1 to activate this Workflow.

Steps for workflow #2: (Provide screenshots)

1. Activate the workflow using the toggle.
1. Make an order on platform A (You must buy one of the products copied with Workflow #1, to complete this workflow).
1. Go to Link: https://xxxxxx.com and select the product to add to the cart.
1. Choose a product and add it to the cart. (You must buy one of the products copied from platform A with Workflow #1, to complete this Workflow.)
1. Complete your order.
1. Wait for automatic sync. Contoso will automatically copy this order to your platform B. After 15 minutes, check platform A to find the order

> [!NOTE]
> You must activate workflow 1 to activate workflow 2.

### Demo video for ERP data transfer

</details>

<details>
<summary><b>Sample 3: Contoso DigiAssist</b></summary>

- [About the Contoso DigiAssist app](#about-the-contoso-digiassist-app)
- [Test credentials for Contoso DigiAssist app](#test-credentials-for-contoso-digiassist-app)
- [Configuration](#configuration)
  - [Pre-requisites for Contoso DigiAssist app](#pre-requisites-for-contoso-digiassist-app)
  - [Installation and Setup](#installation-and-setup)
- [Testing workflow](#testing-workflow)
  - [Personal Bot](#personal-bot)
  - [Help Static Tab](#help-static-tab)
- [Limitations, conditions, and exceptions](#limitations-conditions-and-exceptions)
- [Resources and Videos](#resources-and-videos)

### About the Contoso DigiAssist app

Users can access data from their connected business apps using the chat-based collaboration application Contoso DigiAssist. Asking questions or requesting information allows users to communicate with Contoso DigiAssist. Users can also view data from connected apps in Adaptive Card format, rich text cards, or as a simple text response.

### Test credentials for Contoso DigiAssist app

The following tenant is already set up with a Contoso DigiAssist Subscription for testing purposes.

Tenant Details: Contoso DigiAssist Org

1. Admin user: admin@contosodigiassist.com | Password: XXXXXXXX
2. Non-admin user #1: user@contosodigiassist.com | Password: XXXXXXXX
3. Non-admin user #2: user@contosodigiassist.com | Password: XXXXXXXX
4. Non-admin user #3: user@contosodigiassist.com | Password: XXXXXXXX

### Configuration

#### Pre-requisites for Contoso DigiAssist app

- Admin needs to configure the Contoso DigiAssist for the organization.
- You must provide tenant admin consent.
- Tenant must have active subscription with Contoso DigiAssist.

#### Installation and Setup

- Sideload the Contoso DigiAssist in Microsoft Teams.
- In the personal bot of DigiAssist, send the Connect command and enter the required admin credentials.
- Select the **Contoso DigiAssist Org** from dropdown and select **Connect**.

### Testing workflow

#### Personal Bot

The Contoso DigiAssist bot's purpose is to assist users with queries within the organization. Here are some sample questions for testing:

- Show me my Claim status.
- Do I have Open ADO work items?
- Show me my documents pending for review today.
- Get recent HR updates.

The Contoso DigiAssist will provide text-based responses or interactive Adaptive Card responses. You can perform additional actions by using the buttons on Adaptive Cards.

#### Help Static Tab

The Contoso DigiAssist app for Microsoft Teams also includes a **Help** tab. It displays documentation specific to the ***DigiAssist app*** integration for Microsoft Teams.

### Limitations, conditions, and exceptions

- Users must complete authentication with third-party applications from Contoso DigiAssist.
- NLP configuration and AI chatbot training must be performed on the Contoso DigiAssist app website.
- Users can only view the custom Adaptive Cards on Mobile.

### Resources and Videos

- Document Links included to help validation team.
- Link for the end-to-end Teams app integration demo video is included.
- Detailed steps for configuration in the form of PDF or a video link attached.

</details>
-->

## Create your store listing details

The information that you submit to [Partner Center](https://partner.microsoft.com)&#8212;including your name, descriptions, icons, and images&#8212;becomes the Teams store and Microsoft AppSource listing for your app.

A store listing may be someone's first impression of your app. Increase installations with a listing that effectively conveys your app's benefits, functionality, and brand.

### Specify a short name

Your app's name (specifically, its *[short name](~/resources/schema/manifest-schema.md#name)*) plays a crucial role in how users discover it in the store.

:::row:::

:::column span="3":::
:::image type="content" source="../../../../assets/images/store-detail-page/specifying-short-name-under-submission.png" alt-text="Example screenshot highlights where an app's short name displays in a store listing.":::
:::column-end:::
:::column span="1":::
:::column-end:::

:::row-end:::

Make sure your short name adheres to the [store validation guidelines](~/concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md#app-name).

### Write descriptions

You must have a short and long description of your app.

#### Short description

A concise summary of your app that should be original, engaging, and directed at your target audience. Keep the short description to one sentence.

:::row:::

:::column span="3":::
:::image type="content" source="~/assets/images/store-detail-page/specifying-short-description-under-submission.png" alt-text="Example screenshot highlights where an app's short description displays in a store listing.":::
:::column-end:::
:::column span="1":::
:::column-end:::

:::row-end:::

Make sure your short description adheres to the [store validation guidelines](~/concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md#short-description).

#### Long description

The long description can provide a narrative that highlights your apps':

* Main features
* The problems it solves
* Target audience

While this description can be as long as 4,000 characters, most users will only read between 300-500 words.

:::row:::

:::column span="3":::
:::image type="content" source="~/assets/images/store-detail-page/specifying-long-description-under-submission.png" alt-text="Example screenshot highlights where an app's long description displays in a store listing.":::
:::column-end:::
:::column span="1":::
:::column-end:::

:::row-end:::

Make sure your long description adheres to the [store validation guidelines](~/concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md#long-description).

### Adhere to icon design guidelines

Icons are one of the main elements users see when browsing the store. Your icons should communicate your app's brand and purpose while also adhering to Teams requirements.

For more information, see [guidance on creating Teams app icons](~/concepts/build-and-test/apps-package.md#app-icons).

### Capture screenshots

Screenshots provide a prominent visual preview of your app to complement your app name, icon, and descriptions.

:::row:::

:::column span="3":::
:::image type="content" source="~/assets/images/store-detail-page/specifying-of-capturing-screenshots-submission.png" alt-text="Example screenshot highlights where app screenshots display in a store listing.":::
:::column-end:::
:::column span="1":::
:::column-end:::

:::row-end:::

Remember the following best practices about screenshots:

* You can have up to five screenshots per listing.
* Supported file types include .png, .jpeg, and gif image formats.
* Dimensions should be 1366 x 768 pixels.
* Maximum size of 1,024 KB.

For best practices, see the following resources:

* [Teams Store validation guidelines](~/concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md#screenshots)
* [Craft effective images for Microsoft app stores](/office/dev/store/craft-effective-appsource-store-images)

### Create a video

A video in your listing can be the most effective way to communicate why people should use your app. Address the following questions in a video:

* Who is your app for?
* What problems can your app solve?
* How does your app work?
* What other benefits do you get from using your app?

You can add a URL for your YouTube or Vimeo video.

#### Best practices for videos

* Keep your video between 60-90 seconds.
* Aim for quality. In a listing, users will see your video before screenshots.
* Communicate the value of the product in narrative form.
* Demonstrate how the product works.

### Select a category for your app

During submission, you're asked to categorize your app. You can categorize your app based on the following categories:

|Categories  |
|--------------|
| Microsoft |
| Education |
| Productivity |
| Images and video galleries |
| Project management |
| Utilities |
| Social |
| Communication |
| Content management |
| Files and documents |
| Workflow and business management |
| IT/Admin |
| Human resources and recruiting|
| Developer tools |
| Meetings and scheduling |
| Data visualization and BI |
| Training and tutorial |
| News and weather |
| Customer support |
| Reference |
| Sales and marketing |
| Look and feel |
| Customer and contact management (CRM) |
| Financial management |
| Maps and feeds |
| Other |

### Localize your store listing

Partner Center supports [localized store listings](/office/dev/store/prepare-localized-solutions). For more information, see [how to localize your Teams app listing](../../../../concepts/build-and-test/apps-localization.md).

## Complete Publisher Verification

[Publisher Verification](/azure/active-directory/develop/publisher-verification-overview) is required for Teams apps listed in the store. For more information, see [frequently asked questions](/azure/active-directory/develop/publisher-verification-overview#frequently-asked-questions), [how to mark your app as publisher verified](/azure/active-directory/develop/mark-app-as-publisher-verified), and [troubleshoot publisher verification](/azure/active-directory/develop/troubleshoot-publisher-verification).

## Complete Publisher Attestation

[Publisher Attestation](/microsoft-365-app-certification/docs/attestation) is also required for Teams apps listed in the Store. The process includes completing a self-assessment of your app's security, data handling, and compliance practices. The process can help potential customers make informed decisions about using your app.

> [!NOTE]
> If you're submitting a new app, you can't officially complete Publisher Attestation until your app is listed on the Teams store. If you're updating a listed app, complete Publisher Attestation before you submit the latest version of the app for validation.

## Next step

> [!div class="nextstepaction"]
> [Submit your app](/office/dev/store/add-in-submission-guide)

## See also

[Resolve issues if your Microsoft Teams store submission fails](~/concepts/deploy-and-publish/appsource/resolve-submission-issues.md)
