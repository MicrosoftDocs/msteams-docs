---
title: Create client secret
description: Describes creating client secret
ms.topic: how-to
ms.localizationpriority: medium
keywords: teams authentication tabs Microsoft Azure Active Directory (Azure AD) Graph API
---
# Create client secret

A client secret is a string that the application uses to prove its identity when requesting a token.

1. Select **Manage** > **Certificates & secrets**.

2. Select **+ New client secret**.

    :::image type="content" source="../../../assets/images/adaptive-cards/client-secret.png" alt-text="Client secret page":::

   The **Add a client secret** page appears.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/add-client-secret.png" alt-text="Add a client secret page":::

3. Enter the description.
4. Select the duration of validity for the secret.
5. Select **Add**.

   A message pops up on the browser stating that the client secret was updated, and the client secret displays on the page.

    :::image type="content" source="../../../assets/images/authentication/teams-sso-tabs/client-secret-added.png" alt-text="Client secret added":::

6. Select the copy button next to the **Value** of client secret.
7. Save the value that you copied for later use.

   > [!NOTE]
   > Ensure that you copy the value of client secret right after you create it. The value is visible only at the time when the client secret is created, and can't be viewed after that.
