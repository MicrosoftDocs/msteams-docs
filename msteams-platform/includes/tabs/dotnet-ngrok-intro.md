## Establish a secure tunnel to your tab

Microsoft Teams is an entirely cloud-based product and requires that your tab content be available from the cloud using HTTPS endpoints. Teams don't allow local hosting. You'll need to either publish your tab to a public URL or use a proxy that will expose your local port to an internet-facing URL.

To test your tab, use [ngrok](https://ngrok.com/docs). Your server's web endpoints will be available while ngrok is running on your local machine. If you close ngrok, the URLs will be different the next time you start it.