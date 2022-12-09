const searchBar = document.getElementById("search-bar");
const searchResults = document.getElementById("search-results");

let petData = [];

const render = () => {
  if (petData.length > 0) {
    const value = searchBar.value.slice().toLowerCase();
    const fragment = new DocumentFragment();
    const data = value?petData.filter((pet) => pet.typeOfPet.toLowerCase().includes(value)):petData;
    data.forEach((pet) => {
      const container = document.createElement("div");
      const card = document.createElement("div");
      const cardBody = document.createElement("div");
      const cardTitle = document.createElement("h5");
      const cardSubtitle = document.createElement("h1");
      const cardText1 = document.createElement("p");
      const cardText2 = document.createElement("p");
      const cardText3 = document.createElement("p");
      const cardText4 = document.createElement("p");
      const cardText5 = document.createElement("p");
      const enquireButton = document.createElement("button");

      container.setAttribute("class", "col-lg-4 mb-4");
      card.setAttribute("class", "card card-width search-form");
      cardBody.setAttribute("class", "card-body");

      cardTitle.setAttribute("class", "card-title-typeofpet"); // Type of Pet
      cardSubtitle.setAttribute("class", "card-title1 "); // Name of Pet
      cardText1.setAttribute("class", "card-text-breed"); // Breed
      cardText2.setAttribute("class", "card-text-location"); // Age of Pet
      cardText3.setAttribute("class", "card-text-gender"); // Gender of Pet
      cardText4.setAttribute("class", "card-text-description"); // Description
      cardText5.setAttribute("class", "card-text-location"); // Location
      enquireButton.setAttribute("class","enquire-button ")
      enquireButton.setAttribute("data-bs-toggle","modal")
      enquireButton.setAttribute("data-bs-target","#exampleModal")
      enquireButton.setAttribute("type","button")
      enquireButton.setAttribute("id", pet.id)


      cardTitle.textContent = pet.typeOfPet;
      cardSubtitle.textContent = pet.name;
      cardText1.textContent = "Breed: " + pet.breed;
      cardText2.textContent = "Age: " + pet.age;
      cardText3.textContent = "Gender: " + pet.gender;
      cardText4.textContent = "Description: " + pet.description;
      cardText5.textContent = "Location: " + pet.location;
      enquireButton.textContent = "Enquire"

      cardBody.appendChild(cardSubtitle);
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText1);
      cardBody.appendChild(cardText2);
      cardBody.appendChild(cardText3);
      cardBody.appendChild(cardText4);
      cardBody.appendChild(cardText5);
      cardBody.appendChild(enquireButton)

      card.appendChild(cardBody);
      container.appendChild(card);

      fragment.appendChild(container);
    });
    searchResults.replaceChildren(fragment);
  }
};

searchBar.addEventListener("input", (event) => {
  render()
});

fetch("api/pets/")
  .then((response) => response.json())
  .then((response) => {
    petData = response.slice();

    render();
  });


// const enquireDetails = document.getElementsByClassName('enquire-button');
// for (i=0; i < enquireDetails.length; i++){
//   enquireDetails[i].addEventListener('click', enquireFunction)
// }
  



document.body.addEventListener('click', function (event) {
  if(event.target.classList.contains('enquire-button')) {
    enquireFunction(event)
  };
});

document.body.addEventListener('click', function (event) {
  if(event.target.classList.contains('form-button')) {
    enquireEmail(event)
  };
});

async function enquireFunction (event){
    event.preventDefault();
    let petId = event.target.id
    console.log(petId)
    const response = await fetch(`api/pets/${petId}`,{
      method:'GET'
    })
    .then((response) => response.json())
    .then((data) => {
      const modal = document.querySelector('.modal-body');
      modal.innerHTML ="";
      const email = document.createElement("p");
      const phoneNumber = document.createElement("p");
      const formDiv = document.createElement('div');
      const formLabel = document.createElement('label');
      const formInput = document.createElement('textarea');
      const formSeperator = document.createElement('p');
      const formButton = document.createElement('button');
      

      formInput.setAttribute('placeholder', "Please write the message you would like to send. Don't forget to add your details so they can get back to you!")
      formInput.setAttribute('class','form-input')
      formInput.setAttribute('id','test')
      formInput.setAttribute('cols','1')
      formInput.setAttribute('rows','1')
      formInput.setAttribute('style','width:100%; height: 220px;')
      formButton.setAttribute('class','form-button')
      formButton.setAttribute('type','form-button')
      formButton.setAttribute('id',data.user.email)

      email.textContent = "Or if you would prefer to send them an email use the area below!"
      phoneNumber.textContent = "Phone Number: " + data.user.phoneNumber
      formButton.textContent = "Send Message";
      formSeperator.textContent = "----------------------"

      formDiv.appendChild(formLabel);
      formDiv.appendChild(formInput);
      formDiv.appendChild(formButton);


      modal.appendChild(phoneNumber)
      modal.appendChild(formSeperator)
      modal.appendChild(email)
      modal.appendChild(formDiv);



      
    })
    

}

async function enquireEmail (event){
  const email = event.target.id
  const message = document.querySelector('.form-input').value
  const emailMessage = {
    email: email,
    message: message
  }
  if(message){
    const response = await fetch(`api/pets/enquire`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailMessage)
    })
    .then((res) => res.json())
    .then((data) => {
      console.log('Successful POST request:', data);
      event.target.textContent = 'Message Sent!'
      return data;
    })
  }else{
    window.alert('Looks like you forgot to add a message!')
  }
  
 

}