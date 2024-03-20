use rocket::{launch, post, routes};

#[post("/api/token", data = "<body>")]
fn token(body: String) {
    println!("{body}")
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![token])
}
