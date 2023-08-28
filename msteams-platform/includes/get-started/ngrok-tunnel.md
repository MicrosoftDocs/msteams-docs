Use ngrok or Command Prompt to create a tunnel to your locally running web server's publicly available HTTPS endpoints. Run the following command in ngrok:

```bash
ngrok http --host-header=localhost 3978
```

> [!TIP]
> If you encounter **ERR_NGROK_4018**, follow the steps provided in the Command Prompt to sign up and authenticate ngrok. Then run the `ngrok http --host-header=localhost 3978` command.

The window shows the HTTPS URL (https to io).

 :::image type="content" source="../../assets/images/include-files/ngrok-url.png" alt-text="Screenshot shows the ngrok HTTPS URL.":::
