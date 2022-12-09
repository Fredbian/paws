const registerForm = async (event) => {

  event.preventDefault();

  // Collect values from the register form
  const typeOfPet = document.querySelector('#type-of-pet').value.trim();
  const name = document.querySelector('#name-of-pet').value.trim();
  const breed = document.querySelector('#breed').value.trim();
  const age = document.querySelector('#age').value.trim();
  const gender = document.querySelector('#gender').value.trim();
  const description = document.querySelector('#description').value.trim();
  const location = document.querySelector('#cities').value.trim();
  
  
  
  if (typeOfPet && name && breed && age && gender && description && location) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/pets', {
      method: 'POST',
      body: JSON.stringify({ typeOfPet, name, breed, age, gender, description, location }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      
      document.location.replace('/myaccount');
    } else {
      alert(response.statusText);
    }
  }

};

document
  .querySelector('.register-form')
  .addEventListener('submit', registerForm);
