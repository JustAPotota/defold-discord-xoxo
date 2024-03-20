// Import the SDK
import { DiscordSDK } from "@discord/embedded-app-sdk";


console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

// Instantiate the SDK
const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);

setupDiscordSdk().then(() => {
  console.log("Discord SDK is ready");
});

async function setupDiscordSdk() {
  await discordSdk.ready();
}
