# GitHub app installation checker utility
This script will get you the number installations for your GitHub app.

## Setup
```sh
# find app id and put it in your env file (or just create an environment variable called GITHUB_APP_ID)
cp .env.sample .env

# create a new GitHub PK and save it as "private-key.pem"
cp private-key.pem.sample private-key.pem
```

Find instructions on creating a new PK [here](https://developer.github.com/apps/building-github-apps/authenticating-with-github-apps/#generating-a-private-key).

## Usage
```
node index.js
```

## FAQ
- Q: Why do I even need this?
- A: GitHub oddly doesn't include this metric on the UI. It seems like a useful metric, especially since GitHub requires [a minimum number of installations](https://developer.github.com/marketplace/getting-started/requirements-for-listing-an-app-on-github-marketplace/#user-experience) to publish a verified app. I had to reach out to support to get the full story on this, since the docs aren't that clear. 

- Q: Seriously? Couldn't I just do this via a CURL command?
- A: First off, cool it with the attitude. Secondly, yes, you could, normally, but GitHub has a special way of authorizing requests about apps that require a JWT. This app does that for you. You're welcome.
