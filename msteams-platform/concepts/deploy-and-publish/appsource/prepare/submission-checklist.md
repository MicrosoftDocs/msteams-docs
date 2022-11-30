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

Depending on your app functionality, you're required to provide Teams tenant configurations, a set of test accounts & test notes. Ensure you meet all requirements listed below to avoid app testability failures & delay in the app publishing process.

1. **Tenant configurations**: You are required to configure a Teams tenant to test your app & provide test accounts (details below). To create a demo tenant refer to (link). Ensure your app is configured for this demo tenant. If applicable, safe listing/ connection to external services for this tenant should be done before submission of the app.

2. **Test Accounts**: Depending on your app's features, you need to provide all the following accounts:

    - Admin account (required)
    - Non-admin accounts (required)

        - Ensure test accounts are safe listed or configured with licenses keys (if applicable).
        - If your app requires users to log in/connect to external services, provide the required credentials to complete the login/connection with external service.
        - Ensure phone-based 2-way authentication is disabled for the test accounts.
        - If the app provides a collaborative experience, provide a non-admin account for each user persona e.g. If your app is used by Teachers & students, provide credentials for both of them.
        - Ensure at least one account has access to premium or upgraded features (if applicable).
        - All accounts you provide must include pre-populated data to help in testing e.g. If your app helps to provide market insights based on the user profile, ensure market data is prepopulated along with a few user profiles.
        - Provide at least one account that isn't pre-configured to properly test the first-run sign-in experience.

    > [!NOTE]
    > These accounts must be utilized only for validation requirements. The Validation team will fully test your app, including first-run user experience. 
    > If your application is FREE for all users & anyone who intends to use your application can Sign up to use the app, you may indicate the same in the test notes. The validation team will use the sign up process as described.

3. Test Notes Provide details about your app's capabilities in Teams and the steps for testing each one. This helps the validation team to better understand your app & complete the testing for all functionalities in your app. If your app functionality includes event-based notifications, please list the instructions to trigger these events. For time-based notifications indicate the expected time for receiving these notifications.

    > [!NOTE]
    > While functional testing of the app is initiated based on the test notes provided, the validation team will not restrict the testing only to the test instructions provided.

4. **Demo Video**: Provide a recording of your app so that Microsoft can fully understand its functionality.

Here are sample test instructions for your reference:
<br>

<details>
<summary><b>Sample 1: EDU app</b></summary>

- [About the EDU app](#about-the-edu-app)
- [Pre-requisites](#pre-requisites)
- [Test credentials](#test-credentials)
- [App functionality](#app-functionality)
  - [Contoso Dashboard](#contoso-dashboard)
  - [Classes](#classes)
  - [Assignments](#assignments)
    - [Creating a new assignment](#creating-a-new-assignment)
    - [Modify assignments](#modify-assignments)
    - [Correcting documents and giving feedback](#correcting-documents-and-giving-feedback)
  - [Observation database](#observation-database)
- [Demo Video](#demo-video)

### About the EDU app

Contoso offers a web-based productivity tool that teachers use to grade students’ work. It supports teachers during the entire process of setting, correcting, marking, grading, and giving feedback on assignments. This can be about any subject and have any form, such as essays, papers, and letters. Additionally, the app offers various options, such as plagiarism checking to promote original writing, Team Hand-ins to stimulate collaborating in groups and Peer Assessment & Feedback to help students learn from each other.

### Pre-requisites

IMPORTANT: Before you start using Contoso within Teams, we assume that you have an educational tenant already filled with a school, classes/teams, teachers, and students. If not, you'll see error 005 or 0010.

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

#### Contoso Dashboard

When you go to the Contoso app within MS Teams, you first arrive at the dashboard page. This page provides at a glance information about texts that haven’t been handed-in yet, that still 4 need to be corrected and the ones that are corrected already and of which the feedback can be sent to the student. At ‘Assignments’ it shows the assignments that are currently active and by clicking on the green button underneath that it's possible to create a new assignment in Contoso (that is through the needless integration also immediately visible in Microsoft Teams when created). Also, you can select a period and group/class here.

#### Classes

Through the integration of Contoso within MS Teams, it's possible to make a group or class within Teams which is afterwards automatically also created within Contoso (within Teams). See in the image below, the creation of ‘Lizzy’s trial class’.

:::image type="content" source="../../../../assets/images/store-detail-page/edu-sample-class.png" alt-text="Education sample shows trial class":::

On the next image you can see that this is also automatically visible within Contoso when you go to ‘My Classes/groups’ in the menu on the left.

:::image type="content" source="../../../../assets/images/store-detail-page/edu-sample-class-group.png" alt-text="Education sample showing Contoso class group":::

> [!NOTE]
> The other way around it's unfortunately not possible yet. We would like to realize this in cooperation with Microsoft Teams. This would entail being possible to create a Class or Group in the app of Contoso in Microsoft Teams and that this would also be linked to the ‘Teams’ page within Microsoft Teams.

#### Assignments

Within Microsoft Teams you can see the 'Assignments' icon in the left menu. Here you can see a list of assignments. It also shows the due date of the assignments and to what class these assignments are assigned to. Above the list of assignments there are three tabs visible: ‘Assigned’, ‘Returned’ and ‘Drafts’. ‘Assigned’ shows assignments that are sent to your classes, ‘Returned’ are the assignments that you received back from your students and that are ready to be corrected by you and ‘Drafts’ shows assignments that are created as a concept and that aren't sent to your students yet. Next to ‘Drafts’, it's possible to filter assignments by class.

When clicking on an assignment that’s in the list, you can see the status of the assignment per student. When you see ‘Not handed in’ next to the students name, it means that besides the student didn't hand in the assignment, he/she also didn't have a look at the assignment descriptions. When you see ‘Viewed’, it's not handed in yet, but the student did see the assignment description. When ‘Handed in’ you can start correcting the assignment.

:::image type="content" source="../../../../assets/images/store-detail-page/edu-assignment.png" alt-text="Education sample showing class assignment":::

##### Creating a new assignment

To create an assignment in Teams, go to Assignments and click then on Create (down left corner).

:::image type="content" source="../../../../assets/images/store-detail-page/edu-sample-new-assignment.png" alt-text="Education sample showing new assignment":::

As the template options are disabled for the use of Contoso within Microsoft Teams, click on the button to ‘create a new assignment (without an already existing template). You get to see the following screen. Choose a title that says something about the assignment so that you can later find the correct assignment based on the title.

The status of the assignment can be ‘draft’, ‘published’, ‘closed’ or ‘hidden’. Automatically, this is on draft meaning that when saving this new assignment, it will be saved as a concept whereafter you would still need to send it to your students. By changing this to published, it will immediately send the assignment once you save it. It's always possible to change this later. For example, it's possible to prepare various assignments before you publish them. The ‘language of the text’ determines which database of observations will be used to check and give feedback on the text. Under the option ‘Allowed ways to hand in texts’ you can choose whether your students type their texts in Contoso (or copy and paste them from word/pages file), or that they upload a document in Contoso

:::image type="content" source="../../../../assets/images/store-detail-page/edu-sample-app.png" alt-text="Education sample app":::

:::image type="content" source="../../../../assets/images/store-detail-page/edu-sample-app-b.png" alt-text="Education sample showing sample app":::

##### Modify assignments

It's possible to modify the assignments that were created. This is possible by going to Assignments in Teams, to click on the assignment you would like to modify and then to click on Contoso SV PRO.

##### Correcting documents and giving feedback

Go to ‘Assignments’ or first to ‘Teams’, then choose your class/group and then select the assignment you would like to correct.

#### Observation database

Once one or more words or parts of the text are selected, it's possible to place an observation with the text. This feedback can be given in the form of compliments, critical comments or open comments.

:::image type="content" source="../../../../assets/images/store-detail-page/edu-sample-database.png" alt-text="Education sample database":::

### Demo Video

</details>
<br>
<details>
<summary><b>Sample 2: ERP data transfer</b></summary>

- [About the ERP data transfer app](#about-the-erp-data-transfer-app)
- [Feature list for ERP data transfer app](#feature-list-for-erp-data-transfer-app)
- [Installation](#installation)

### About the ERP data transfer app

Contoso is an PaaS/SaaS in cloud platform who transfers data between E-commerce, ERP, CRM, marketplace, mail automation platforms and shipping platforms. Contoso allows automatic transfer  between connected platforms, through its workflows. Users can activate and deactivate workflows with just a click after they connect to platforms, they are interested in.

### Feature list for ERP data transfer app

Contoso E-commerce Manager:

1. Connects e-commerce, ERP, marketplace, and shipping platforms.
1. Allows automatic data transfer between platforms.
1. Sends notices to Teams channels.
1. The copy of orders by platform A to platform B can be approved or disapproved by cards on the Teams channel.

### Installation

Search the app “Contoso” between apps built for your organization and install it. (Specify if there are any steps to follow for installing the app).


</details>

<!--Provide instructions and resources to help the reviewers test your app, including:

* Test accounts
* Credentials
* License keys

You can add instructions in Partner Center or upload them to a publicly available location on SharePoint.

### Feature list

Provide details about your app's capabilities in Teams and steps for testing each one.

### Accounts

Provide test accounts if your app requires a license or backend safe listing. All accounts you provide must include pre-populated data to help in testing.

Depending on your app's features, you may need to provide all the following accounts:

* Admin account (required)
* Non-admin account (required)
* An account that isn't pre-configured to properly test the first-run sign-in experience (required)
* An account with access to premium or upgraded features (if applicable)
* Two accounts in the same tenant to test the collaboration experience for apps that work in shared contexts (if applicable)

### Tenant configurations

If you must configure a Teams tenant to use your app, include those instructions and admin and non-admin accounts for validation.

### Video (optional)

Provide a recording of your app so that Microsoft can fully understand its functionality.-->

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
| Images & video galleries |
| Project management |
| Utilities |
| Social |
| Communication |
| Content management |
| Files & documents |
| Workflow & business management |
| IT/Admin |
| Human resources & recruiting|
| Developer tools |
| Meetings & scheduling |
| Data visualization & BI |
| Training & tutorial |
| News & weather |
| Customer support |
| Reference |
| Sales & marketing |
| Look & feel |
| Customer & contact management (CRM) |
| Financial management |
| Maps & feeds |
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
