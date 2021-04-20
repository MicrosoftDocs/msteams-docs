## Establish a secure tunnel to your tab

Microsoft Teams is an entirely cloud-based product and requires your tab content to be available from the cloud using HTTPS endpoints. Teams does not allow local hosting. You must either publish your tab to a public URL or use a proxy that will expose your local port to an internet-facing URL.

To test your tab, use [ngrok](https://ngrok.com/docs). Your server's web endpoints will be available while ngrok is running on your local machine. If you close ngrok, the URLs will be different the next time you start it.