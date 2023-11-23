---
title: Error handling messages
description: Error handling messgaes
author: vishnu
ms.localizationpriority: medium
ms.topic: reference
---

# Error handling messages

## Adaptive Card

<details>
<br>
<summary><b>Not Available</b></summary>

* **Message**: Unable to render dynamic data inside the Adaptive Card template for user mentions in Teams.

* **Scenario**: The developer is trying to create a dynamic AdaptiveCard to mention users in Teams. They are facing an issue with rendering dynamic data inside the template. They have tried to serialize a JSON with the same $data structure with the name of the user mentioned but it doesn't render anything.

* **Resolution**: Currently, there is no support for sending a dynamic array to the entity property in Microsoft Teams. For mentioning a user, you need to repeat the entity block, not the text block. For more information, see [https://learn.microsoft.com/en-us/adaptive-cards/templating/language](/adaptive-cards/templating/language)

* **Source**: [View](https://stackoverflow.com/questions/74364152/send-data-array-to-an-adaptivecard-with-c-sharp)

</br>
</details>

<details>
<br>
<summary><b>URL with double quotes in Adaptive Card action is not opening in Microsoft Teams on iOS.</b></summary>

* **Message**: URL with double quotes in Adaptive Card action is not opening in Microsoft Teams on iOS.

* **Scenario**: A developer is using Logic Apps to generate Actions in an Adaptive Card and pass a URL with double quotes. When the Adaptive Card is sent to Microsoft Teams and the action button is clicked, the URL does not open.

* **Resolution**: Verify the URL and try with a different URL. Ensure that the URL is properly encoded to handle special characters like double quotes. Test the behavior on different platforms (Teams web, desktop, and iOS) to isolate the issue. If the problem persists, report the issue with all the relevant details for further investigation.

* **Source**: [View](https://github.com/microsoftdocs/msteams-docs/issues/6934)

</br>
</details>

<details>
<br>
<summary><b>Not Provided</b></summary>

* **Message**: Adaptive Cards are not fully occupying width in MS Teams Group Channel despite setting the 'width: full' property.

* **Scenario**: The developer is trying to render Adaptive Cards in MS Teams Group Channel with full width. Despite setting the 'width: full' property, the Adaptive Cards are not occupying the full width.

* **Resolution**: The issue was fixed by the engineering team and the fix was rolled out to the organization's tenant. The developer should ensure they are using the latest version of MS Teams Desktop and Web version in channel scope.

* **Source**: [View](https://github.com/microsoftdocs/msteams-docs/issues/7468)

</br>
</details>

<details>
<br>
<summary><b>Not Available</b></summary>

* **Message**: ReplyToId is coming null when user performs any action on the Adaptive Card in the emulator.

* **Scenario**: Developer is testing an adaptive card with yes/no action items in the emulator. When a user clicks on yes/no, the developer wants to update the card with a thank you message. However, the ReplyToId, which is needed for the update, is coming as null.

* **Resolution**: Verify the version of the Bot Framework Emulator being used. It is recommended to use version V4.<br>Test the adaptive card again in the emulator.<br>If the issue persists, share a screen recording of the issue for further investigation.

* **Source**: [View](https://github.com/microsoftdocs/msteams-docs/issues/7540)

</br>
</details>

<details>
<br>
<summary><b>BadSyntax</b></summary>

* **Message**: Failed to read card payload as JSON

* **Scenario**: The developer is trying to add color to the text in an adaptive card using conditions in a bot that generates adaptive cards into the channel.

* **Resolution**: First, install the Adaptive Card Templating for JavaScript library. Then, use the 'if' condition to set the color to 'good' and 'attention'. Make sure to use the 'ACData.Template' function on your cardJson before expanding it with your data. Finally, use the resulting 'finalCardJson' to send an adaptive card in the channel or as per your use case.

* **Source**: [View](https://stackoverflow.com/questions/74211210/unable-to-add-condition-colouring-to-a-text-in-the-adaptive-card)

</br>
</details>

<details>
<br>
<summary><b>209</b></summary>

* **Message**: Invoke validation failed. User forbidden to perform action.

* **Scenario**: The developer is trying to use the 'Refresh' action in an adaptive card in a one-to-one chat in Teams. The action works for the developer but not for the other user in the chat. The error occurs after the Teams cache is cleared and the chat is opened in a browser.

* **Resolution**: The issue was resolved by adding a bot at the launch of the messaging extension. The bot was not automatically added to the 'groupchat'. The developer used the `OnTeamsMessagingExtensionFetchTaskAsync` method to check if the app is installed by fetching member information. If the bot is not in the conversation roster, the `GetAddMissedBotCard` method is called to add the bot.

* **Source**: [View](https://stackoverflow.com/questions/74273728/teams-refresh-adaptive-card-returns-209-error-in-group-chat)

</br>
</details>

<details>
<br>
<summary><b>Not Available</b></summary>

* **Message**: The response from the Teams Adaptive Card is not being recorded in the Azure Logic App.

* **Scenario**: The developer is trying to capture the input text from a Teams Adaptive Card and use it in their Azure Logic App, but the response is not being recorded.

* **Resolution**: Ensure to use the 'Post adaptive card and wait for a response' action if you expect a response from the card. The output of this action doesn't give any output options, so you have to format it yourself. Use 'Parse json' and enter input in the expression field: @Outputs('adaptivecardname')?[body]

* **Source**: [View](https://stackoverflow.com/questions/73875734/azure-logic-app-post-adaptive-card-and-wait-for-response)

</br>
</details>

## Authentication

<details>
<br>
<summary><b>403</b></summary>

* **Message**: Google auth on Microsoft Teams mobile app returns 403: disallowed_useragent

* **Scenario**: The developer is trying to authenticate a Teams app using Google authentication on Android. The authentication process opens a popup but it redirects to an error page.

* **Resolution**: Ensure that the 'isExternal' parameter and two placeholder values in the existing url parameter are added to the authenticate() API to support external OAuth providers as suggested by Nivedipa-MSFT. If the issue persists, escalate it using the provided link.

* **Source**: [View](https://github.com/microsoftdocs/msteams-docs/issues/6577)

</br>
</details>

<details>
<br>
<summary><b>AuthFailed</b></summary>

* **Message**: Failure to get the renewal token from microsoftTeams.authentication.getAuthToken({ }) on app load or for renewal when it expires.

* **Scenario**: The developer is trying to get the auth token for a personal app using microsoftTeams.authentication.getAuthToken({ }) method. The method is failing often and taking time to get the token. The token is only obtained on browser refresh/retry.

* **Resolution**: The developer is advised to set 'showLoadingIndicator' to 'false' and remove 'notifySuccess' and 'notifyFailure' calls. This is to simplify the process and avoid confusion between SSO in a tab and the way the 'loading' indicator works.

* **Source**: [View](https://stackoverflow.com/questions/72560252/failing-to-get-the-renewal-token-from-teams-microsoftteams-authentication-getaut)

</br>
</details>

<details>
<br>
<summary><b>getAuthToken() method returns empty SSO token in success callback.</b></summary>

* **Message**: getAuthToken() method returns empty SSO token in success callback.

* **Scenario**: The developer is trying to fetch the SSO token using TeamsFx React SDK in a SSO Tab app. The token is fetched successfully when running the app using Teams Toolkit or when previewing/publishing the app from the Developer Portal. However, when the app is deployed in Ring0, the SSO token is returned as an empty string.

* **Resolution**: Check the implementation of the getAuthToken() method. Ensure that the correct ClientId is being used across all environments. Verify the app manifest and app definition in Ring0. If the issue persists, escalate to the engineering team for further investigation.

* **Source**: [View](https://github.com/officedev/microsoft-teams-library-js/issues/1290)

</br>
</details>

<details>
<br>
<summary><b>Manifest Error</b></summary>

* **Message**: Manifest does not contain the RSC permission to allow in-app purchases.

* **Scenario**: The developer is trying to implement in-app purchases in Microsoft Teams app. The app works fine on a test tenant but shows an error on a normal tenant. The error also occurs on a second account where the in-app purchase popup does not appear.

* **Resolution**: Validate the manifest using Teams store app validation in the Developer Portal.<br>Follow the v1 implementation guide strictly, remove the planInfo parameter and put a callback function inside instead.<br>Ensure that the in-app purchase is implemented in personal scope as it is currently not supported in channel scope.

* **Source**: [View](https://github.com/officedev/microsoft-teams-library-js/issues/1788)

</br>
</details>

<details>
<br>
<summary><b>`unknownAuthError`</b></summary>

* **Message**: The error occurs when the `authentication.getAuthToken()` function is called, returning.

* **Scenario**: The developer is trying to get tokens from the current user logged in on Teams Desktop App using the `authentication.getAuthToken()` function in the Teams SDK. The error occurs when testing on Teams Desktop client (both Windows and MacOS).

* **Resolution**: There are several possible resolutions. First, proactively check for token expiration and ask the user to login again if the ID token is not valid. Second, catch the error in a callback passed into the acquiretoken ADAL JS function and ask the user to login again if the error occurs. Third, whitelist the login.microsoftonline.com endpoint in your browser extension or re-enable third party cookies in your browser if they are disabled. Lastly, add two client applications to `Authorized client applications` in Azure Portal for the Teams desktop/mobile clients and the web client: `5e3ce6c0-2b1f-4285-8d4b-75ee78787346` and `1fec8e78-bce4-4aaf-ab1b-5451cc387264`.

* **Source**: [View](https://github.com/officedev/microsoft-teams-library-js/issues/1307)

</br>
</details>

<details>
<br>
<summary><b>SSO-Token</b></summary>

* **Message**: SSO Token is not getting generated for some users in Azure AD.

* **Scenario**: The issue occurs when users enter the Una Chat Bot in MS Teams. The SSO Token should be automatically generated for all users, but it's not happening for some.

* **Resolution**: Update the Teams version and check again. If the issue persists, ensure that the application is correctly registered through Azure Active Directory for SSO. Check the user permissions and roles in Azure AD. If the problem continues, escalate the issue using the provided link.

* **Source**: [View](https://github.com/microsoftdocs/msteams-docs/issues/6654)

</br>
</details>

<details>
<br>
<summary><b>OAuth token for user authentication is not working on iOS 16.</b></summary>

* **Message**: OAuth token for user authentication is not working on iOS 16.

* **Scenario**: The developer is using an OAuth token from an HTTP response to authenticate users. The authentication works on Android, desktop, and web platforms, but fails on iOS 16.

* **Resolution**: Check if the issue is specific to iOS 16 or all iOS versions.<br>Verify if the issue is related to WebKit WebView cookies management. <br>Ensure that the cookie settings are in line with the recommendations in the Microsoft Teams platform documentation. <br> If the issue persists, escalate it using the provided link.

* **Source**: [View](https://github.com/officedev/microsoft-teams-library-js/issues/1553)

</br>
</details>

<details>
<br>
<summary><b>53001</b></summary>

* **Message**: The error message is about incompatible browsers and authentication failure of a custom Teams app due to Conditional Access policy.

* **Scenario**: The developer is trying to authenticate a custom Teams app for a customer who has a Conditional Access policy that restricts browsers. The user is presented with a 53001 error and a message about incompatible browsers.

* **Resolution**: The developer should ensure that the customer is using a domain joined device as the Conditional Access policy requires it. If the device isn't domain joined, it gives a 53001 error. If the issue persists, the developer should check the browser compatibility and update the browser details in the Teams app.

* **Source**: [View](https://github.com/microsoftdocs/msteams-docs/issues/8476)

</br>
</details>

<details>
<br>
<summary><b>CORS</b></summary>

* **Message**: Access to XMLHttpRequest at [https://login.microsoftonline.com/common/oauth2/v2.0/token](https://login.microsoftonline.com/common/oauth2/v2.0/token) from origin has been blocked by CORS policy.

* **Scenario**: The developer is trying to enable SSO for a Teams App and is using client-side code to acquire a token using MSAL. The token API is failing due to a CORS issue in both local and development environments.

* **Resolution**: The 'OnBehalfOf' token call should only be made from a backend server, where CORS would not apply. The only call that needs to be made from the front-end code is `microsoftTeams.authentication.getAuthToken()`. It is recommended to review the linked video and blog post for a more detailed understanding.

* **Source**: [View](https://stackoverflow.com/questions/74426827/cors-issue-while-trying-to-access-https-login-microsoftonline-com-common-oauth)

</br>
</details>

<details>
<br>
<summary><b>SDK initialization timed out</b></summary>

* **Message**: The developer is trying to implement simple authentication in a Microsoft Teams app using Adobe ID as a third-party OAuth provider. However, an exception is thrown when the `app.initialize()` function is called, stating that the SDK initialization has timed out.

* **Scenario**: The developer is trying to enable SSO for a Teams App and is using client-side code to acquire a token using MSAL. The token API is failing due to a CORS issue in both local and development environments.

* **Resolution**: The developer should confirm the SDK version and MS Teams version being used. They should also try using `microsoftTeams.app.initialize().then(() => { })` to see if it resolves the issue. If the problem persists, they should check if the sample works with '@microsoft/teams-js 2.7.1' and 'Microsoft Teams Version 1.6.00.2979' as these versions have been confirmed to work without throwing any exceptions or errors.

* **Source**: [View](https://github.com/officedev/microsoft-teams-samples/issues/694)

</br>
</details>
