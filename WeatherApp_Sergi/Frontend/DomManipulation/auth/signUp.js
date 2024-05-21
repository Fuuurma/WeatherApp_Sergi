// Function to handle signup
let signUpNewUser = () => {
  const form = document.getElementById("signupForm");
  const formData = new FormData(form);

  fetch("../../Backend/scripts/signUpNewUser.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        alert("Signup successful!");
        // Additional success handling, like closing the modal
        $("#signupModal").modal("hide"); // Using jQuery to hide the modal
      } else {
        alert("Signup failed: " + data.message);
        // Additional error handling
      }
    })
    .catch((error) => console.error("Error:", error));
};

// Add event listener to the signup button
document.getElementById("signup-btn").addEventListener("click", signUpNewUser);

export { signUpNewUser };
