use std::collections::HashMap;

use dotenvy_macro::dotenv;
use rocket::{launch, post, routes, serde::json::Json};
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
struct TokenRequest {
    code: String,
}

#[derive(Debug, Serialize)]
struct TokenResponse {
    access_token: String,
}

#[derive(Debug, Deserialize)]
struct AccessTokenResponse {
    access_token: String,
    token_type: String,
    expires_in: u32,
    refresh_token: String,
    scope: String,
}

#[post("/api/token", data = "<body>")]
async fn token(body: Json<TokenRequest>) -> Json<TokenResponse> {
    let code = &body.code;
    let client = reqwest::Client::new();
    let response = client
        .post("https://discord.com/api/oauth2/token")
        .form(&HashMap::from([
            ("client_id", dotenv!("VITE_DISCORD_CLIENT_ID")),
            ("client_secret", dotenv!("CLIENT_SECRET")),
            ("grant_type", "authorization_code"),
            ("code", code),
        ]))
        .send()
        .await
        .unwrap()
        .json::<AccessTokenResponse>()
        .await
        .unwrap();

    Json(TokenResponse {
        access_token: response.access_token,
    })
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![token])
}
