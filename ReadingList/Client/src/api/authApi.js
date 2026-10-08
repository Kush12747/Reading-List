// Base URL for every authentication request.
// Instead of typing the full URL every time,
// we store it in one constant.
const API_URL = "http://localhost:8080/api/auth";


// ----------------------------------------------------
// Register a new user
// ----------------------------------------------------
// userData should look like:
//
// {
//     name: "...",
//     email: "...",
//     password: "..."
// }
//
// This function sends that object to the backend.
export async function register(userData) {

    // fetch() sends an HTTP request.
    // await pauses execution until the server responds.
    const response = await fetch(`${API_URL}/register`, {

        // Tell the backend this is a POST request
        // because we are creating a new user.
        method: "POST",

        // Tell Spring Boot that the request body
        // contains JSON data.
        headers: {
            "Content-Type": "application/json"
        },

        // JavaScript objects cannot be sent directly.
        // JSON.stringify() converts the object into
        // a JSON string that can be sent over HTTP.
        body: JSON.stringify(userData)
    });

    // Convert the JSON response from Spring Boot
    // into a normal JavaScript object.
    const data = await response.json();

    // response.ok is true for HTTP status codes
    // between 200 and 299.
    //
    // If the request failed (400, 401, 404, 500, etc.)
    // throw an Error so the component can catch it.
    if (!response.ok) {
        throw new Error(data.message);
    }

    // Return the successful response to the component.
    return data;
}



// ----------------------------------------------------
// Login an existing user
// ----------------------------------------------------
// credentials should look like:
//
// {
//     email: "...",
//     password: "..."
// }
//
// The backend should return a JWT token.
export async function login(credentials) {

    // Send POST request to /login
    const response = await fetch(`${API_URL}/login`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        // Convert credentials object into JSON
        body: JSON.stringify(credentials)
    });

    // Convert JSON response into JavaScript object.
    const data = await response.json();

    // If login failed (wrong password, user not found, etc.)
    // throw an error so the Login component can display it.
    if (!response.ok) {
        throw new Error(data.message);
    }

    // On success, data usually contains a JWT token.
    //
    // Example:
    //
    // {
    //     token: "eyJhbGc..."
    // }
    //
    // The Login component will store this token in
    // localStorage.
    return data;
}