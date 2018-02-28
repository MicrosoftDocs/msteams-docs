---
title: Authentication for bots using Azure Active Directory
description: Describes authentication in Teams and how to use it in your bots
keywords: teams authentication bots AAD
ms.date: 01/10/2018
---
# Authenticate a user in a Microsoft Teams bot

There are many services that you may wish to consume inside your Teams app, and most of those services require authentication and authorization to get access to the service. Services include Facebook, Twitter, and of course Teams. Users of Teams have user profile information stored in Azure Active Directory (AAD) using Microsoft Graph. This article will focus on authentication using AAD to get access to this information.

OAuth is an open standard for authentication used by AAD and many other service providers. Understanding OAuth is a prerequisite for working with authentication in Teams and AAD. The examples below use the OAuth2 Implicit Grant flow with the goal of eventually reading the user's profile information from AAD and Graph.

The authentication flow described in this article is very similar to that of tabs except that tabs can use web based authentication flow, and bots require authentication to be driven from code. The concepts in this article will also be useful when implementing authentication from the mobile platform.

For a general overview of authentication flow for bots see the topic [Authentication flow in bots](~/concepts/authentication/auth-flow-bot).

The steps that follow assume that you have followed the installation instructions for the sample [Microsoft Teams Authentication Sample (Node)](https://github.com/OfficeDev/microsoft-teams-sample-complete-node) such as registering a bot, filling out the manifest and uploading it, and filling in the values in the launch.json file.

## Configure an authentication provider

See the topic [Configure Azure Active Directory for authentication](~/concepts/authentication/configure-AAD) for detailed steps on configuring Azure Active Directory for authentication.

### Initiate authentication flow

Usually authentication flow is triggered by a user action. You should not drive the authentication pop-up automatically because this is likely to trigger the browser's pop-up blocker as well as confuse the user.

### Add UI to start authentication

Add UI to the bot to enable the user to sign in when needed. In the example this is done from the bot's hero card found in HeroCardDialog.ts.

```TypeScript
let buttons = new Array<builder.CardAction>();
buttons.push(new builder.CardAction(session)
    .type("signin")
    .title("Sign In")
    .value(config.get("app.baseUri") + "/bot-auth/simple-start?width=5000&height=5000"),
);

let messageBackButton = builder.CardAction.messageBack(session, JSON.stringify({ action: "getProfile" }), "Get Profile")
    .displayText("Get Profile")
    .text(Strings.messageBack_button_text); // this matches match for MessageBackReceiverDialog
buttons.push(messageBackButton);

let messageBackButton2 = builder.CardAction.messageBack(session, JSON.stringify({ action: "signout" }), "Sign Out")
.displayText("Sign Out")
.text(Strings.messageBack_button_text); // this matches match for MessageBackReceiverDialog
buttons.push(messageBackButton2);

```

Three buttons have been added to the Hero Card: Sign in, Get Profile, and Sign Out.

### Sign the user in

select the Sign in button, which generates an event that is handled in `getInvokeHandler` using this code:

```TypeScript
if ((event as any).name === "signin/verifyState") {
    let aadApi = new AADRequestAPI();
    let response = await aadApi.getAsync("https://graph.microsoft.com/v1.0/me/", { Authorization: " Bearer " + (event as any).value.state.accessToken }, null);

    let info = JSON.parse(response);

    session.send(info.displayName + "<br />" + info.mail + "<br />" + info.officeLocation);

    callback(null, "", 200);
    return;
}
```

Here the bot makes a call to the “me” Graph endpoint with the token it gets from the invoke payload. Graph responds with the user information for the person who logged in. The response is then parsed and specific parts of it are sent to the chat session.

Notes:

Authentication flow must start on a page that's on your domain; don't start it by going directly to your identity provider's login or consent page. In this example, even though we're using Azure AD, we begin at /tab-auth/simple-start rather than going directly to the Graph endpoint at https://graph.microsoft.com/v1.0/me/. If you skip this step, the login popup may fail to close when you call notifySuccess() or notifyFailure().

Add the domain of your authentication redirect URL to the [`validDomains`](~/resources/schema/manifest-schema#validdomains) section of the manifest. Failure to do so might result in an empty pop-up.

### Get the users profile

When the user selects the *Get Profile" button in the Hero card the following code is executed.

```TypeScript
case "getProfile":
    // See if we have an AAD token
    const graphResource = "https://graph.microsoft.com";
    let aadTokens = session.userData.aadTokens || {};
    let graphToken = aadTokens[graphResource] as TokenResponse;

    if (!graphToken) {
        // We don't have a Graph token for the user, ask them to sign in
        session.send(new builder.Message(session)
            .addAttachment(new builder.HeroCard(session)
                .text("You're not yet signed in. Please click on the Sign In button to log in.")
                .buttons([
                    new builder.CardAction(session)
                        .type("signin")
                        .title("Sign In")
                        .value(config.get("app.baseUri") + "/bot-auth/simple-start?width=5000&height=5000"),
                    ])));
    } else {
        // Use the Graph token to get the basic profile
        try {
            let requestHelper = new AADRequestAPI();
            let response = await requestHelper.getAsync("https://graph.microsoft.com/v1.0/me/", { Authorization: "Bearer " + graphToken.access_token }, null);

            let info = JSON.parse(response);
            session.send(info.displayName + "<br />" + info.mail + "<br />" + info.officeLocation);
        } catch (e) {
            console.log(e);
            session.send("There was an error getting the user's profile.");
        }
    }
```

If the user is not signed in they are prompted to do so now.  Otherwise basic information is obtained from Graph.

### Sign the user out

```TypeScript
case "signout":
    session.userData.aadTokens = {};
    session.send("Ok, I've cleared your tokens.");
    break;
```

## Samples

For sample code showing the bot authentication process see:

* [Microsoft Teams Authentication Sample (Node)](https://github.com/OfficeDev/microsoft-teams-sample-auth-node)