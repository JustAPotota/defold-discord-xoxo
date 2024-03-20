// Import the SDK
import { DiscordSDK } from "@discord/embedded-app-sdk";


console.log("auth.js loaded");

let auth;

// Instantiate the SDK
const discordSdk = new DiscordSDK("1219423076094050385");

setupDiscordSdk().then(() => {
	console.log("Discord SDK is authenticated");
});

async function setupDiscordSdk() {
	await discordSdk.ready();
	console.log("Discord SDK is ready");

	// Authorize with Discord Client
	const { code } = await discordSdk.commands.authorize({
		client_id: "1219423076094050385",
		response_type: "code",
		state: "",
		prompt: "none",
		scope: [
			"identify",
			"guilds",
		],
	});

	// Retrieve an access_token from your activity's server
	const response = await fetch("/api/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			code,
		}),
	});
	const { access_token } = await response.json();

	// Authenticate with Discord client (using the access_token)
	auth = await discordSdk.commands.authenticate({
		access_token,
	});

	if (auth == null) {
		throw new Error("Authenticate command failed");
	}
}
