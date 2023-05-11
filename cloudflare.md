# Setting up Cloudflare tunnel
I am setting it up on a Mac, if you have another system and want to make a
contribution for others, then please do.

## Install Cloudflare CLI tool

```bash
brew install cloudflare/cloudflare/cloudflared
```

Then authenticate

```bash
cloudflared tunnel login
```

We use the thingify.dev domain (yes it all works with a .dev domain)

Just click 'Authorize'

## Create a tunnel

```bash
cloudflared tunnel create thingify
```

You can name it whatever you want. We create a new tunnel per project, but will
probably move to tunnel-per-dev soon.

## Migrate tunnel

Open your [Zero Trust Dashboard](https://one.dash.cloudflare.com/) and click the
3 dots next to your tunnel name. Click "Configure" then make sure you go and
start your tunnel:

```bash
cloudflared tunnel run thingify 
```

Now click "Start migration". Click "confirm" on all prompts then "Migrate tunnel"

## Public Hostnames

Click on your tunnel name and go to the "Public Hostname" tab. We will be
creating 2 subdomains here.

### API

I chose "appserver.thingify.dev" as my subdomain for the API.

Make sure to select type: HTTP (I chose HTTPS due to the .dev domain)

Then set the URL to: "localhost:3000"

### Client

I chose "appclient.thingify.dev" as my subdomain for the client.

Make sure to select type: HTTP (I chose HTTPS due to the .dev domain)

Then set the URL to: "localhost:3001"

## Update App URLs

Now you can go back to your app settings within your partner portal and set the
app URL and callback URLs to your new subdomains. As an example, the app URL
here would be:

```text
https://appclient.thingify.dev
```

and the callback URLs would be something like:

```text
https://appserver.thingify.dev/shopify/auth
https://appserver.thingify.dev/shopify/auth/callback
https://appclient.thingify.dev/
```

## Good luck

Now you just need to make sure to be running the tunnel when working on the app
locally:

```bash
cloudflared tunnel run thingify 
```

Have fun 👋
