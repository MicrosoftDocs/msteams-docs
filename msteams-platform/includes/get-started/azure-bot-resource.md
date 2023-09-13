**Create an Azure bot resource**

> [!NOTE]
> If you're already testing your bot in Teams, sign out of this app and Teams. To see this change, sign in again.

1. Go to **Home**.
1. Select **+ Create a resource**.
1. In the search box, enter **Azure Bot**.
1. Select **Enter**.
1. Select **Azure Bot**.
1. Select **Create**.

    :::image type="content" source="../../assets/images/include-files/azure-bot.png" alt-text="Screenshot shows the creation of Azure bot.":::

1. Enter the bot name in **Bot handle**.
1. Select your **Subscription** from the dropdown list.
1. Select your **Resource group** from the dropdown list.

    :::image type="content" source="../../assets/images/include-files/create-azure-bot.png" alt-text="Screenshot shows the option resource group and subscription in the Azure portal.":::

    If you don't have an existing resource group, you can create a new resource group. To create a new resource group, follow these steps:
    1. Select **Create new**.
    1. Enter the resource name and select **OK**.
    1. Select a location from **New resource group location** dropdown list.

    :::image type="content" source="../../assets/images/include-files/new-resource-location.png" alt-text="Screenshot shows the new resource group option in Azure portal.":::

1. Under **Pricing**, select **Change plan**.

    :::image type="content" source="../../assets/images/include-files/pricing-tier.png" alt-text="Screenshot shows the pricing option in Azure portal.":::

1. Select **FO Free** > **Select**.

    :::image type="content" source="../../assets/images/include-files/pricing-free.png" alt-text="Screenshot shows the option to select free.":::

1. Under **Microsoft App ID**, select **Type of App** as **Multi Tenant**.

1. In the **Creation type**, select **Use existing app registration**.

1. Enter the **App ID**.

   <!-- You can also select **Use existing app registration** and enter existing **App ID**, **App tenant ID**, and **MSI resource ID**. -->

    > [!NOTE]
    > You can't create more than one bot with the same **Microsoft App ID**.

1. Select **Review + create**.

    :::image type="content" source="../../assets/images/include-files/review-create-app-id.png" alt-text="Screenshot shows the creation of new bot.":::

1. After the validation passes, select **Create**.

    The bot takes a few minutes to provision.

1. Select **Go to resource**.

    :::image type="content" source="../../assets/images/include-files/resource-deployment.png" alt-text="Screenshot shows the Go to resource option in the Azure portal.":::

    You've successfully created your Azure bot.

    :::image type="content" source="../../assets/images/include-files/azure-bot-created-output.png" alt-text="Screenshot shows the output of a bot.":::
