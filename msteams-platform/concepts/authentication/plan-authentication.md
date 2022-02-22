---
title: Authentication and Authorization in Teams
description: Overview of authentication in Teams apps
ms.topic: conceptual
ms.localizationpriority: medium
keywords: teams authentication OAuth SSO Microsoft Azure Active Directory (Azure AD)
---
# Authentication and Authorization in Teams

An app may exist in a public or organizational domain or as a personal app. In any scenario, authentication can be a vital part of its framework. You must identify early on if you need to protect the services you're offering and at what level. The web services exposed in your Teams app are publicly available over the internet. So, if you need to secure them start thinking about it before you start building your app.

For example, if your app requires you to provide guest access for external users, access restrictions and permissions need to be placed to protect confidential information.

Therefore, ask questions, such as:
•	Will the users access different views of data based on their roles?
•	Will the interactions also be based on the user roles?
•	Will external users access the app?

This module covers:

- Authentication advantages and benefits.
- Types of authentication methods.
- Introduction to Azure Active Directory (AAD) Single sign-on (SSO), and other authentication methods.
- Features of authentication methods and their user experience.
- Case for AAD SSO.
- Introduction to common extension scenarios.

## What is authentication?

Authentication is all about validating users for accessing and using the app. It's one of the ways you secure your app and users against unwarranted access.

You can validate app users in several ways, such as using login credentials, ID tokens, access tokens, and more.

### Why should I use authentication?

You can use an authentication method suitable for your app to validate the credentials of the user who is attempting to access your app and its resources. Plan for authentication to optimize your app.

1. Authentication is key to the security design of your app. This process lets you verify if the user is who they claim to be. Validating user access for your app is a first step for providing necessary authorization to the user as well.

1. The Authentication process focuses on building security for app data. It protects the system from unauthorized access and often stops any security issue at the onset. It lets your app users share  information safely. By using authentication, you can also secure your app users' data.

1. Building a personalized user experience is an additional benefit of authentication.

## What is authorization?

\ Add description \

### Why should I use authorization?

\ Add benefits \

## Common authentication terms

Within Teams, there are multiple ways you can implement authentication. Here's an introduction to key terms that you'll come across:

- SSO: Single sign-on lets your app users log into the app only once using their credentials. It offers access to all associated apps or websites without having to validate repeatedly.
- OIDC: Open ID Connect (OIDC) is an authentication protocol used to validate a user. Third-party applications can use it to verify the user's identity and access their profile information.
- ID tokens: An ID token is granted to a user who has been verified successfully. It's used to cache user profile information and provide it to a client application when a user requests access.
- Authorization: It's a process to provide resource-specific access to an authenticated user based on their user profile.
- Oauth2.0: OAuth is a protocol that lets third party applications access secure resources without compromising the user’s information, such as password.  
- Access tokens: An access token is an artifact that contains security information of an application to access specific user information.  
- Graph API: \add details for Graph API and MS Graph\

## Next step

> [!div class="nextstepaction"]
> [Plan for authentication](authentication-overview.md)
