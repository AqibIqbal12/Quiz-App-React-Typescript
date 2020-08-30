export function register() {
  if ("serviceWorker" in navigator) {
    // console.log(`${process.env.PUBLIC_URL}/CustomSW.js`)
    navigator.serviceWorker
      .register(`${process.env.PUBLIC_URL}/CustomSW.js`)
      .then(function (registration) {
        console.log("Registration successful, scope is:", registration.scope);
      })
      .catch(function (error) {
        console.log("Service worker registration failed, error:", error);
      });
  }
}