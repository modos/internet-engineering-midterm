// Constants
const form = document.forms['request-form'];
const predicted_gender = document.getElementsByClassName('predicted-gender')[0]
const predicted_rate = document.getElementsByClassName('predicted-rate')[0]
const radios = document.querySelectorAll('input[name="gender"]')
const saved_gender = document.getElementsByClassName('saved-gender')[0]
const clear_button = document.getElementsByClassName('clear_button')[0]
const alert = document.getElementsByClassName('alert')[0]

let name;

// Listener For Form
form.addEventListener('submit', async function (e){
    e.preventDefault();
    
     name = form.querySelector('input[name="name"]').value;
    
    const request = await fetch(`https://api.genderize.io/?name=${name}`).catch(err => {
        alert.removeAttribute("hidden")
        alert.innerHTML = "Error"
        saved_gender.innerHTML = "Nothing"
        predicted_rate.innerHTML = "Rate"
        predicted_gender.innerHTML = "Gender"
    })

   // alert.setAttribute("hidden", true)
    const result =  await request.json()

    saved_result = getFromLocal(name)

    if (saved_result){
        saved_gender.innerHTML = saved_result
    }

    // If result doesn;t exist show alert windows
    if (result.gender == null){
        alert.removeAttribute("hidden")
        saved_gender.innerHTML = "Nothing"
        predicted_rate.innerHTML = "Rate"
        predicted_gender.innerHTML = "Gender"
    }else {
        alert.setAttribute("hidden", true)
        predicted_gender.innerHTML = result.gender
        predicted_rate.innerHTML = result.probability
        

        // Check radio buttons values to store in local storage
        for (const radio of radios){
            if (radio.checked){
                storeInLocal(name, radio.value)
                break
            }
        }

    }

})

// Listener for clear button
clear_button.addEventListener("click", () => clearFromLocal(name))


// Store key values into local storage
const storeInLocal = function (key, value) {
    localStorage.setItem(key, value)

    saved_gender.innerHTML = value
}

// Clear key from local storage
const clearFromLocal = function (key) {
    localStorage.removeItem(key);
    saved_gender.innerHTML = "Nothing"
}

// Get value by key from local storage
const getFromLocal = function (key){
    return localStorage.getItem(key)
}