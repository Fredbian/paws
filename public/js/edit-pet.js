const editPet = async (e) => {
    e.preventDefault()

    const description = document.querySelector('input[name="description-update"]').value.trim()
    const age = document.querySelector('input[name="age-update"]').value.trim()
    const location = document.querySelector('select[name="cities-update"]').value.trim()
    
    const pet_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]

    const response = await fetch(`/api/pets/${pet_id}`, {
        method: 'PUT',
        body: JSON.stringify({

            age,
            description,
            location
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        document.location.replace('/myaccount')
    } else {
        alert(response.statusText)
    }
}

document.querySelector('#update-pet').addEventListener('click', editPet)


console.log('aaa');
console.log(document.querySelector("#update-pet"))