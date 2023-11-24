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

## Apps in Meetings

<details>
<br>
<summary><b>No specific error code</b></summary>

* **Message**: Session ID changes every time the page is reloaded in the custom app on MS Teams Desktop App.

* **Scenario**: A custom app in Microsoft Teams Desktop App, which uses Cookies and a session id to keep track of temporary settings for tasks, is experiencing an issue where the session ID changes every time the page is reloaded.

* **Resolution**: Avoid using cookies in Teams apps as they can cause issues when switching between Desktop and Web or different devices. Instead, store state server-side in a database or other store, keyed on the user's AadObject Id (their unique Azure Active Directory user guid), which remains consistent across all platforms.

* **Source**: [View](https://stackoverflow.com/questions/74131632/ms-teams-desktop-app-changing-session-id-between-pages)

</br>
</details>

<details>
<br>
<summary><b>Not Available</b></summary>

* **Message**: `OnTeamsMeetingStartAsync()` and `OnTeamsMeetingEndAsync()` methods are not being called in a specific tenant, but work in a local demo tenant.

* **Scenario**: The developer is trying to use `OnTeamsMeetingStartAsync()` and `OnTeamsMeetingEndAsync()` methods in a specific tenant, but they are not being called. However, these methods work in a local demo tenant.

* **Resolution**: Confirm that the feature is available in public developer preview.<br>Ensure that `OnlineMeeting.ReadBasic.Chat` permission is added.<br>Check the configuration of group owner consent settings for RSC in a team using the Azure AD portal.<br> Use Graph explorer to check whether the correct RSC permission is associated with the bot.

* **Source**: [View](https://github.com/microsoftdocs/msteams-docs/issues/7226)

</br>
</details>

<details>
<br>
<summary><b>Upload failed File size too large</b></summary>

* **Message**: The file size limit for Adobe eSign feature is 10MB.

* **Scenario**: The error occurred when trying to attach files over 10MB using the Teams 'Approvals' App for eSignature and Approvals of documents.

* **Resolution**: Ensure that the file size does not exceed the limit set by Adobe eSign feature, which is 10MB. If larger files need to be attached, consider compressing the files or using a different method to send them.

* **Source**: [View](https://stackoverflow.com/questions/73911852/ms-teams-approvals-upload-failed-file-size-too-large)

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

## Bots

<details>
<br>
<summary><b> Bad Request - Error in query syntax</b></summary>

* **Message**: The error occurred while trying to get detailed user information using `GetUserProfile()` in Microsoft Power Virtual Agents Flow Template.

* **Scenario**: The developer was trying to get detailed user information using Microsoft Power Virtual Agents in Microsoft Teams. The error occurred when the developer tried to use GetUserProfile() function with the input as 'first(outputs('Search_for_users_(V2)')?['body/value'])?['UserPrincipalName']'.

* **Resolution**: Instead of passing in display name, pass in UserID. This way, the call to `SearchForUsers()` is not needed. Correcting the input to `GetUserProfile()` function should resolve the issue.

* **Source**: [View](https://stackoverflow.com/questions/74814903/microsoft-power-virtual-agents-error-in-power-virtual-agents-flow-template)

</br>
</details>

<details>
<br>
<summary><b> ServiceError</b></summary>

* **Message**: Could not find Connection Setting with name `teamsAuth`.

* **Scenario**: The developer was trying to add SSO for a notification bot using Teams Toolkit. Despite following the documentation and adding the OAuth connection in the bot, the developer was encountering an error stating that the connection setting `teamsAuth` could not be found.

* **Resolution**: Ensure that the OAuth connection name is correctly added to the .env file as mentioned in the documentation. If the issue persists, try using the TeamsBotSSOPrompt function by registering an AAD App for bot authentication. If the problem still persists, consider filing an issue in the TeamsFx repo for further assistance.

* **Source**: [View](https://github.com/microsoftdocs/msteams-docs/issues/7407)

</br>
</details>

<details>
<br>
<summary><b> BadArgument</b></summary>

* **Message**: Unknown attachment type.

* **Scenario**: The developer is trying to attach a PDF file to a Microsoft Teams bot and encounters an error.

* **Resolution**: The developer should check the sample code for file sharing on MS Teams provided by Microsoft. Additionally, the 'supportsFiles' option needs to be enabled in the manifest for the bot to support file attachments.

* **Source**: [View](https://stackoverflow.com/questions/74885946/attached-pdf-to-ms-teams-chatbot)

</br>
</details>

<details>
<br>
<summary><b> BadArgument</b></summary>

* **Message**: Failed to decrypt pairwise id.

* **Scenario**: The error occurred when attempting to create a conversation between a bot and a user in Teams using the POST request to the [https://smba.trafficmanager.net/amer/v3/conversations](https://smba.trafficmanager.net/amer/v3/conversations) endpoint.

* **Resolution**: Verify the values of each parameter in the request, especially the ID given for the member parameter. If the error persists, try executing the request at a different time as it may be a temporary issue.

* **Source**: [View](https://github.com/microsoftdocs/msteams-docs/issues/7424)

</br>
</details>

<details>
<br>
<summary><b> BadArgument</b></summary>

* **Message**: Failed to decrypt pairwise id.

* **Scenario**: The error occurred when attempting to create a conversation between a bot and a user in Teams using the POST request to the [https://smba.trafficmanager.net/amer/v3/conversations](https://smba.trafficmanager.net/amer/v3/conversations) endpoint.

* **Resolution**: Verify the values of each parameter in the request, especially the ID given for the member parameter. If the error persists, try executing the request at a different time as it may be a temporary issue.

* **Source**: [View](https://github.com/microsoftdocs/msteams-docs/issues/7424)

</br>
</details>

<details>
<br>
<summary><b> The deep link does not save the subEntityId param when clicked in Microsoft Teams chat.</b></summary>

* **Message**: The deep link does not save the subEntityId param when clicked in Microsoft Teams chat.

* **Scenario**: A developer is trying to use a deep link in Microsoft Teams chat, but the subEntityId param is not being saved when the link is clicked.

* **Resolution**: Ensure that the 'context' is not web encoded. Try using the following format: [https://teams.microsoft.com/l/entity/c38259cb-cd15-4797-b634-098bcea43f9a/index1?webUrl=https://google.com/&label=Google&context={"subEntityId":39138959}](https://teams.microsoft.com/l/entity/c38259cb-cd15-4797-b634-098bcea43f9a/index1?webUrl=https://google.com/&label=Google&context={"subEntityId":39138959}).

* **Source**: [View](https://stackoverflow.com/questions/74349950/microsoft-teams-deep-link-from-chat)

</br>
</details>

<details>
<br>
<summary><b> 412</b></summary>

* **Message**: The server crashes when trying to send a 412 response in the `onInvokeActivity` in the `server/bots/botActivityHandler.js`.

* **Scenario**: The developer is using Node 16 and npm 8 in the sample app-sso and encounters a server crash when the botAdaptivity attempts to return a 412 response. The bot-builder does not catch and process this exception, causing the app to crash.

* **Resolution**: Ensure that all required permissions are added and the configuration is correct. Check if admin consent has been granted for your graph API's. Also, consider adding exception handling in the server or elsewhere to catch and process this exception. An issue has been submitted to botbuilder-js and they have added this problem to their backlog.

* **Source**: [View](https://github.com/officedev/microsoft-teams-samples/issues/513)

</br>
</details>

<details>
<br>
<summary><b> invalid_grant</b></summary>

* **Message**: Due to a configuration change made by your administrator, or because you moved to a new location, you must use multi-factor authentication to access.

* **Scenario**: The developer is trying to create a MS Teams chatbot using Python and is having difficulty obtaining the correct access token to read the user's group chat and interact with it. The user has multi-factor authentication enabled.

* **Resolution**: The developer needs to use interactive flows where user sign in is required. They should modify their code to use `acquire_token_interactive` instead of `acquire_token_by_username_password`. Also, they should add a redirect URI as [http://localhost](http://localhost) in their application.

* **Source**: [View](https://stackoverflow.com/questions/75780492/python-ms-teams-chat-bot)

</br>
</details>

<details>
<br>
<summary><b> Manifest.json validation errors and meeting join events not getting delivered.</b></summary>

* **Message**: Manifest.json validation errors and meeting join events not getting delivered.

* **Scenario**: The developer is trying to run a Microsoft Teams bot for meeting events but is encountering validation errors with the manifest.json file. Additionally, the bot is not receiving meeting join events, although chat messages are arriving.

* **Resolution**: Ensure that the manifest.json file is correctly formatted and adheres to the schema.<br>Check the bot's permissions and scopes to ensure it has the necessary access to receive meeting join events.<br>Refer to the sample provided by Microsoft at [https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-events/csharp](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-events/csharp) for guidance.<br>If the issue persists, reach out to Microsoft support for further assistance.

* **Source**: [View](https://github.com/officedev/microsoft-teams-samples/issues/378)

</br>
</details>

<details>
<br>
<summary><b> This action can't be performed since the app does not exist or has been uninstalled.</b></summary>

* **Message**: This action can't be performed since the app does not exist or has been uninstalled.

* **Scenario**: The developer is creating a Microsoft Teams messaging bot that requires authentication/sign-in. The bot sends a non-reply message to the user that includes a hero card with a sign-in button. When the user receives the hero card and clicks the sign-in button, an error message is displayed.

* **Resolution**: Ensure that `token.botframework.com` and `login.microsoftonline.com` are added in the valid domain section of your app manifest.<br>If you are sideloading the app, be aware that installing/uninstalling the app can be buggy. Try closing and reopening your MS Teams client.

* **Source**: [View](https://stackoverflow.com/questions/73364222/ms-teams-bot-sign-in-not-working-says-this-action-cant-be-performed-since-the)

</br>
</details>

<details>
<br>
<summary><b> Error finding key for token.</b></summary>

* **Message**: The system is unable to find the key for the token while testing the command bot app.

* **Scenario**: The developer was testing a command bot app in Microsoft Teams. When they used @mention to send a 'helloWorld' command to the bot, they received no response and encountered an error message in the VSCode terminal stating 'Error finding key for token'.

* **Resolution**: Ensure that the bot is properly configured and the token is correctly generated. <br>Check if the RSA public key is correctly set up and matches with the token.<br>Make sure all prerequisites and steps are correctly followed as per the given document.<br>Try to reproduce the issue in a different environment or setup to isolate the issue.<br>If the issue persists, consider reaching out to Microsoft Teams Developer Community or escalating the issue via the provided link.

* **Source**: [View](https://github.com/microsoftdocs/msteams-docs/issues/8083)

</br>
</details>

<details>
<br>
<summary><b> 400</b></summary>

* **Message**: Bot is not responding when using app service url as messaging endpoint.

* **Scenario**: The developer is trying to use a bot with a deployed service url in Microsoft Teams. The bot works fine with ngrok but fails to respond when using the app service url.

* **Resolution**: Check if any policy is blocking the request from Teams to App service. If so, modify the policy to allow the request. Also, ensure that the domain where your app is deployed is added under the 'validDomains' section of the manifest. If not using SSO, enter a dummy string value in the 'resource' field of the 'webApplicationInfo' section of your app manifest.

* **Source**: [View](https://github.com/microsoftdocs/msteams-docs/issues/7047)

</br>
</details>

<details>
<br>
<summary><b> DEP0005, DEP0018</b></summary>

* **Message**: The bot stopped responding due to deprecation of Buffer() and unhandled promise rejections.

* **Scenario**: A bot built with Microsoft Bot Framework Node.JS SDK, deployed on a windows server, stopped responding after working well for over a year.

* **Resolution**: Replace the deprecated `Buffer()` methods with the new `Buffer.alloc()`, `Buffer.allocUnsafe()`, or `Buffer.from()` methods in your code. Also, handle promise rejections properly in your code to avoid termination of the Node.js process.

* **Source**: [View](https://stackoverflow.com/questions/73157955/azure-bot-is-not-responding-on-teams)

</br>
</details>

<details>
<br>
<summary><b> Invalid URL</b></summary>

* **Message**: Invoking a Teams chat via DeepLink to external contacts does not work on iOS.

* **Scenario**: The developer is trying to invoke a Teams chat with external contacts using DeepLink on iOS. The same operation works fine on other platforms like desktop but fails on iOS, returning an 'Invalid URL' error.

* **Resolution**: Ensure that the URL being used to invoke the chat is correctly formatted and valid. Test the URL on different platforms to verify its functionality. If the issue persists, escalate it using the provided link in the Microsoft Teams Developer Community.

* **Source**: [View](https://github.com/officedev/microsoft-teams-library-js/issues/1502)

</br>
</details>

<details>
<br>
<summary><b> Bot is not receiving all channel messages despite having the ChannelMessage.Read.Group RSC permission.</b></summary>

* **Message**: Bot is not receiving all channel messages despite having the ChannelMessage.Read.Group RSC permission.

* **Scenario**: The developer is trying to make a bot receive all channel messages even when not mentioned, as per the documentation. However, the bot is not receiving all messages unless explicitly mentioned. The developer is also facing issues with the structure of `webApplicationInfo` in Manifest.json and receiving an error when uploading the manifest.json.

* **Resolution**: Ensure that the manifest version is v1.12 or above.<br>Add `token.botframework.com` in valid domains.<br>Remove 'orgWide': [], from the authorization section.<br>The bot-id should be given in the `webapplicationInfo` section.<br>Refer to the sample provided in the link: [https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-receive-channel-messages-withRSC/csharp](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-receive-channel-messages-withRSC/csharp) and follow the steps.

* **Source**: [View](https://github.com/microsoftdocs/msteams-docs/issues/6771)

</br>
</details>

<details>
<br>
<summary><b> `BotNotInConversationRoster`</b></summary>

* **Message**: Automatic installation of bot is not working while invoking from message extension.

* **Scenario**: The developer is trying to automatically install a bot when invoked from a message extension. Despite following the documentation and using an adaptive card with an install button, the bot does not get installed.

* **Resolution**: Ensure that the bot is correctly configured in the manifest.json file.<br>Check the messaging extension invoke handler in TeamsBot.<br>Verify that the adaptive card is correctly formatted and includes the 'justInTimeInstall' property.<br>Try uploading the app via the Teams admin center instead of sideloading.<br>Test the setup with a different sample to see if the issue persists.

* **Source**: [View](https://github.com/officedev/microsoft-teams-samples/issues/582)

</br>
</details>

<details>
<br>
<summary><b> Permissions Denied</b></summary>

* **Message**: Permission denied. Ask your IT admin to add this app for you.

* **Scenario**: The developer is trying to add a transcript bot to a chat or a meeting in Microsoft Teams but is encountering a permissions error.

* **Resolution**: Check if there is any custom policy set up in admin center for this app which is not allowing it to be added in chat/meeting. Ensure that the options for adding apps to meetings and chats are enabled in the Teams admin center. If all settings are correct, it may take up to 28 days for apps to be fully provisioned. In this case, a manual sync performed by Microsoft support solved the issue.

* **Source**: [View](https://github.com/officedev/microsoft-teams-samples/issues/780)

</br>
</details>

<details>
<br>
<summary><b> Invalid user identity in provided tenant</b></summary>

* **Message**: The bot encountered an error while sending Adaptive Cards to users outside the host's tenant/organization.

* **Scenario**: The developer is trying to send an Adaptive Card to each member of a meeting using a notification bot. The bot is able to send the card to the meeting creator but throws an error when trying to send to other members.

* **Resolution**: The bot can only send Adaptive Cards to users within the host's tenant/organization. Add a condition to check if the member's tenantId matches the conversation's tenantId before sending the Adaptive Card. This will prevent the bot from attempting to send cards to users outside the host's tenant, thus avoiding the error.

* **Source**: [View](https://stackoverflow.com/questions/73114932/invalid-user-identity-in-provided-tenant-when-sending-adaptive-card-to-other-m)

</br>
</details>

<details>
<br>
<summary><b> Not Provided</b></summary>

* **Message**: Bot is not responding to command messages in Teams channel without an assigned owner.

* **Scenario**: The issue occurs when a command message is posted in a Teams channel that was created using the Graph API and does not have an assigned owner. The bot installed in the channel does not respond to the command message.

* **Resolution**: Ensure that the Teams channel has an assigned owner. This can be done by checking the channel's settings. If the issue persists, it may be due to an intermittent issue with the Graph API. Monitor the situation and report if the issue reoccurs.

* **Source**: [View](https://github.com/microsoftdocs/msteams-docs/issues/7527)

</br>
</details>

<details>
<br>
<summary><b> context.adapter.getSignInLink is not a function.</b></summary>

* **Message**: The function `getSignInLink` is not recognized as a function of `context.adapter`.

* **Scenario**: The developer is following a tutorial to implement adaptive cards in a Microsoft Teams bot. The error occurs when trying to use the `getSignInLink` function with the `CloudAdapter` class, which is not recognized as a valid function.

* **Resolution**: The developer should refer to the provided NodeJS sample where the `CloudAdapter` class is used. If the issue persists, the developer should ensure they are using the latest version of the repository and consider seeking further examples or documentation on how to use the `getSignInLink` function with the `CloudAdapter` class.

* **Source**: [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/issues/722)

</br>
</details>

<details>
<br>
<summary><b> 401</b></summary>

* **Message**: Unauthorized Error Ngrok

* **Scenario**: The developer is trying to set up a bot for the C# Sequential Flow Adaptive Card but encounters a 401 Unauthorized Error when trying to call the bot and test a sample incident.

* **Resolution**: Check the messaging endpoint URL in bot registration and ensure it is correctly set to https://<your_ngrok_url>/api/messages. If the issue persists, try reregistering the AAD app, recreating the bot, and changing the settings from single tenant to multi-tenant.

* **Source**: [View](https://github.com/officedev/microsoft-teams-samples/issues/738)

</br>
</details>

<details>
<br>
<summary><b> Invalid client secret provided</b></summary>

* **Message**: The client secret provided in the GetAuthenticationToken() method is invalid. The secret being sent in the request should be the client secret value, not the client secret ID.

* **Scenario**: The developer was trying to run a bot and encountered an error in the `GetAuthenticationToken()` method due to providing an invalid client secret.

* **Resolution**: Ensure that the client secret value is being used, not the client secret ID. If the issue persists, try creating a new client secret.

* **Source**: [View](https://github.com/officedev/microsoft-teams-samples/issues/749)

</br>
</details>

<details>
<br>
<summary><b> Ext.SetUpBotError</b></summary>

* **Message**: Failed to create an app in Azure Active Directory.

* **Scenario**: The developer is trying to set up an interactive bot using the sbs-gs-notificationbot.yml file. The process fails at the step of registering the AAD app which is required to create the bot.

* **Resolution**: Ensure that you have the necessary permissions to create an app in Azure Active Directory.<br>Check the Azure Active Directory setup and configuration.<br>Follow the steps outlined in the 'Set up bot' task documentation at [https://github.com/OfficeDev/TeamsFx/wiki/%7BDebug%7D-Teams-Toolkit-VS-Code-Tasks#set-up-bot](https://github.com/OfficeDev/TeamsFx/wiki/%7BDebug%7D-Teams-Toolkit-VS-Code-Tasks#set-up-bot).<br>If the issue persists, escalate the issue using the link [https://forms.office.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbR7iCOpS5_b9Nqmwx43u5rtZUN0dNSTA4WVo2S05JQ1M4TVlYMjROSjhURS4u](https://forms.office.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbR7iCOpS5_b9Nqmwx43u5rtZUN0dNSTA4WVo2S05JQ1M4TVlYMjROSjhURS4u).

* **Source**: [View](https://github.com/microsoftdocs/msteams-docs/issues/8470)

</br>
</details>

<details>
<br>
<summary><b> Bot is not receiving all channel messages despite having the ChannelMessage.Read.Group RSC permission.</b></summary>

* **Message**: Bot is not receiving all channel messages despite having the ChannelMessage.Read.Group RSC permission.

* **Scenario**: The developer is trying to receive all channel messages through a bot, which is expected to receive all messages even when not mentioned, as per the `ChannelMessage.Read.Group` RSC permission. However, the bot is not receiving all messages unless explicitly mentioned.

* **Resolution**: Ensure that the bot is in Public Developer Preview as this feature is currently available only in this mode. If the issue persists, test the bot using the sample provided at [https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-receive-channel-messages-withRSC/csharp](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-receive-channel-messages-withRSC/csharp). If the problem still exists, provide a screen recording of the issue for further investigation.

* **Source**: [View](https://github.com/microsoftdocs/msteams-docs/issues/6397)

</br>
</details>

<details>
<br>
<summary><b> BadRequest</b></summary>

* **Message**: The user 'XXX-XXX-XXX-XXX-XXX' is not found.

* **Scenario**: The developer is trying to assign a phone number to a bot using PowerShell. The error occurs when the developer tries to assign the number to the bot.

* **Resolution**: Create the application instance without application id.<br>Assign the number.<br> Assign the application id to the application instance. Microsoft is currently working on a fix for this issue.

* **Source**: [View](https://stackoverflow.com/questions/73571927/assgin-phone-number-to-teams-bot)

</br>
</details>

<details>
<br>
<summary><b> 401</b></summary>

* **Message**: Unauthorized access error. All bot interactions are failing with 401 or failing to reach the local server completely.

* **Scenario**: The developer has completed the setup instructions for the `app-complete-auth` NodeJS example. However, all bot interactions are failing with a 401 error or failing to reach the local server. The bot registration has been configured as UserAssignedMSI and the developer is using an unpaid ngrok account.

* **Resolution**: Check the ngrok configuration and ensure it is set up correctly. Also, verify the bot registration settings. The bot should be configured as MultiTenant, not UserAssignedMSI. Make sure to use the existing app registration option to create the bot using the app registration ID created in the first chapter of the setup instructions.

* **Source**: [View](https://github.com/officedev/microsoft-teams-samples/issues/670)

</br>
</details>

<details>
<br>
<summary><b> 0</b></summary>

* **Message**: Unknown bot.

* **Scenario**: The developer is trying to use a contentBotId from a different tenant in the MS Teams manifest file. When the contentBotId is from the same tenant as the MS Teams domain, it works and loads the data. However, when the contentBotId is from a different tenant, MS Teams does not load anything.

* **Resolution**: Create a multi-tenant bot using ML Studio before creating the MS bot. Register the application and check the manifest file for the required ContentBotId. Test the URL after app registration into multi-Tenant. If the error still occurs, setup the connection settings under configurations. Add Oauth connection settings to get some kind of authentication for different clients for the same authentication URL. If the issue persists, it might be due to the use of existing AAD instead of creating from Azure bot template. The manually created AAD have email address of user who have created this in Owners section, while AAD created from Azure bot template have 'Bot Framework Dev Portal' user.

* **Source**: [View](https://stackoverflow.com/questions/73759099/microsoft-teams-manifest-can-contentbotid-be-of-different-tenant)

</br>
</details>

<details>
<br>
<summary><b> AADSTS700016</b></summary>

* **Message**: Application with identifier 'Application (client) ID' was not found in the directory 'Bot Framework'.

* **Scenario**: The developer was trying to run a proactive installation sample app using the client id from Azure bot configuration. The error occurred when the application was not found in the directory 'Bot Framework'.

* **Resolution**: Verify if the correct client/app id is being used. Ensure that the bot is set up through the CLI and not through the web interface. Confirm if the required Microsoft graph Application-level permissions `TeamsAppInstallation.ReadWriteForUser.All` have been added. Follow the instructions to add proper ids and secret details in the `appsettings.json` file. Upload the app at the org level to get `AppCatalogTeamAppId` and then try to add the app in either personal or team scope. If the error persists, retry the steps by following the guidelines step by step creating a new app id.

* **Source**: [View](https://github.com/officedev/microsoft-teams-samples/issues/672)

</br>
</details>

<details>
<br>
<summary><b> 401</b></summary>

* **Message**: `UserNotAuthorizedToGrantResourceSpecificPermission` error is received when trying to add bot to a meeting.

* **Scenario**: The developer implemented a 'Meeting-Attendance-bot' in Azure and tried to add it to a meeting. Despite granting Graph API permissions for the tenant, the bot could not be added due to a `UserNotAuthorizedToGrantResourceSpecificPermission` error.

* **Resolution**: Ensure that the required permissions are granted and access is allowed. Refer to the documentation on granting Resource Specific Consent (RSC) permissions. Confirm if the correct sample is being used. Make sure to allow applications to access online meetings on behalf of a user. Check the application access policy setup using PowerShell. Create an application access policy and grant the policy to the user to allow the app ID contained in the policy to access online meetings on behalf of the granted user.

* **Source**: [View](https://github.com/officedev/microsoft-teams-samples/issues/686)

</br>
</details>

<details>
<br>
<summary><b> 403</b></summary>

* **Message**: CSRF token validation failed.

* **Scenario**: The error occurs when trying to trigger a PATCH request via HTTP AZURE Gateway from Power Virtual Agent BOT to S/4 HANA through OData v2 service. The CSRF token is fetched and stored in a local variable and passed to PATCH request. The error is seen in Power Automate Flow.

* **Resolution**: The issue is with the Microsoft on-premise-gateway which is used to connect your OData service. The on-premise-gateway always establishes a new HTTP connection that expires the X-CSRF-TOKEN. Wait for a version that supports this or try a different method to connect your OData service.

* **Source**: [View](https://stackoverflow.com/questions/74356412/csrf-token-validation-failed-error-while-triggering-a-patch-request-from-microso)

</br>
</details>

<details>
<br>
<summary><b> Azure Teams Bot stops responding after a few minutes of operation in Teams.</b></summary>

* **Message**: Azure Teams Bot stops responding after a few minutes of operation in Teams.

* **Scenario**: A bot developed for Teams using Azure Bot Service and C# works well in local environment using Bot Framework Emulator, but stops responding after some time in Teams. Uninstalling and reinstalling the bot temporarily resolves the issue but it reoccurs.

* **Resolution**: Downgrade the .Net version and SDK version to 3.14. Implement a `BotJwtRefreshWorker` class that refreshes the bot's token every 30 minutes. This ensures that the bot always has a valid token and reduces or eliminates the waiting time.

* **Source**: [View](https://stackoverflow.com/questions/74356412/csrf-token-validation-failed-error-while-triggering-a-patch-request-from-microso)

</br>
</details>

<details>
<br>
<summary><b> Bad Request - Error in query syntax</b></summary>

* **Message**: Error in the GetUserProfile query syntax in Power Virtual Agents Flow Template.

* **Scenario**: The developer is trying to get detailed user information using Microsoft Virtual Agent in Microsoft Teams. The error occurs when the developer tries to get the user's email by calling `SearchForUsers()` and then `GetUserProfile()`.

* **Resolution**: Instead of passing in display name, pass in UserID. This eliminates the need for the call to `SearchForUsers()`.

* **Source**: [View](https://stackoverflow.com/questions/74814903/microsoft-power-virtual-agents-error-in-power-virtual-agents-flow-template)

</br>
</details>

<details>
<br>
<summary><b> `ProvisionError`</b></summary>

* **Message**: Failed to provision Developer Portal bot registration.

* **Scenario**: The error occurred while trying to debug a sample bot project locally using TeamsFx-Samples/share-now. The error was thrown during the 'set-up-bot' task, specifically at the step of 'Registering the bot in Bot Framework Portal'.

* **Resolution**: The issue was related to a server-side API issue which has been resolved. Verify the local debug experience of Teams Toolkit (TTK) to ensure it's working properly now. Stay updated with the issue on the provided GitHub link for any further updates.

* **Source**: [View](https://stackoverflow.com/questions/74758147/provisionerror-failed-to-provision-developer-portal-bot-registration-pops-up-wh)

</br>
</details>

## Cards

<details>
<br>
<summary><b> iOS Teams app not showing card if the card contains a hyperlink with an ampersand.</b></summary>

* **Message**: iOS Teams app not showing card if the card contains a hyperlink with an ampersand.

* **Scenario**: The developer is trying to display a card in the iOS Teams app that contains a hyperlink with an ampersand. Instead of displaying the card, the app only shows the message 'Sent a card'.

* **Resolution**: Ensure that the iOS and Teams versions are up to date. If the issue persists, share the card JSON for further investigation. It might be an issue with the way the hyperlink is parsed when it contains an ampersand. As a workaround, try encoding the ampersand in the URL.

* **Source**: [View](https://github.com/microsoftdocs/msteams-docs/issues/7170)

</br>
</details>

## Developer Portal
