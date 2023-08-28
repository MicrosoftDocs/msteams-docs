**To add a messaging endpoint**

# [dev tunnel](#tab/dev)
    
1.	Use the dev tunnel URL in the output console as the messaging endpoint.

    :::image type="content" source="../../assets/images/include-files/output-console-url.png" alt-text="Screenshot shows the url in the Visual studio output console.":::

1.  Go to Azure portal and select the bot that you've created. In the left pane, under **Settings**, select **Configuration**.

1.  Update the **Messaging endpoint** in the format `https://your-devtunnel-domain/api/messages`.

    :::image type="content" source="../../assets/images/include-files/devtunnels-messaging-endpoint.png" alt-text="Screenshot shows the messaging endpoint adding api.":::

1. Select **Apply**.

    You have successfully set up a bot in Azure Bot service.

# [ngrok](#tab/ngrok)

1. From ngrok, copy the HTTPS URL (https to io).

    :::image type="content" source="../../assets/images/include-files/ngrok-url.png" alt-text="Screenshot shows the ngrok HTTPS URL.":::
    
    > [!NOTE]
    > The HTTPS URL in your ngrok is your fully qualified domain name.
    > The `WebAppDomain` is a fully qualified domain name that doesn't include `https://` in it.

1.  Go to the Azure bot you've created in Azure portal. In the left pane, under **Settings**, select **Configuration**.

1. Update the **Messaging endpoint** in the format `https://your-ngrok-domain/api/messages`.

    :::image type="content" source="../../assets/images/include-files/ngrok-messaging-endpoint.png" alt-text="Screenshot shows the messaging endpoint adding api.":::

1. Select **Apply**.

    You have successfully set up a bot in Azure Bot service.
---   
