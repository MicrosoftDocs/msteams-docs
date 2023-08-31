**Add a scope**

1. In the left pane, under **Manage**, select **Expose an API**.

1. Select **+ Add a scope**. 

   :::image type="content" source="../../assets/images/include-files/select-add-scope.png" alt-text="Screenshot shows the selection to Add a Scope.":::

1. Enter **access_as_user** as the **Scope name**.

1. Under **Who can consent?**, select **Admins and users**.

1. Update the values for the rest of the fileds as follows:

   * Enter **Teams can access the user’s profile** as **Admin consent display name**.

   * Enter **Allows Teams to call the app’s web APIs as the current user** as **Admin consent description**.

   * Enter **Teams can access the user profile and make requests on the user’s behalf** as **User consent display name**.

   * Enter **Enable Teams to call this app’s APIs with the same rights as the user** as **User consent description**.

   Ensure that **State** is set to **Enabled**.

1. Select **Add scope**.

   The following image shows the fields and the values:

   :::image type="content" source="../../assets/images/include-files/set-add-scope.png" alt-text="Screenshot shows the values filled in the field to Add a scope.":::

   > [!NOTE]
   > The **Scope name** must match with the **Application ID** URI with `/access_as_user` appended at the end.

    <!--  `api://d4b8****.ngrok.io/00000000-0000-0000-0000-000000000000/access_as_user`-->  

   :::image type="content" source="../../assets/images/include-files/add-scope.png" alt-text="Screenshot shows the details in Scopes."::: 

