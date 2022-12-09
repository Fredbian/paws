
const removeDetails = document.getElementsByClassName('delete-btn');
for (i=0; i < removeDetails.length; i++){
  removeDetails[i].addEventListener('click', deleteFunction)}


async function deleteFunction (event){
    event.preventDefault();
    let petId = this.id;
    this.parentNode.parentNode.removeChild(this.parentNode);
    const response = await fetch(`api/pets/${petId}`,{
        method:'DELETE'
    })

    if(response.ok){
        document.location.replace('/myaccount')
    } else{
        alert(response.statusText)
    }
    
}

