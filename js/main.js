const elForm = document.querySelector(".form");
const firstNameInput = document.querySelector(".firstname-input");
const lastNameInput = document.querySelector(".lastname-input");
const emailInput = document.querySelector(".email-input");
const elFormBtn = document.querySelector(".form-btn");
const elList = document.querySelector(".list");

const reqresURL = `https://reqres.in/api/users`;

// CREATE (POST) ******************************* 
async function createUser(userData) {
    const response = await fetch(reqresURL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(userData)
    });

    try {
        if (response.status !== 201) {
            console.log(`${response.status}`);
        }
        const data = await response.json();
        // console.log(data);
        renderUsers(data);

        return data;
    } catch (error) {
        console.error(error);
    }
}

// ADD POST ********************************************************
elForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const firstNameValue = firstNameInput.value;
    const lastNameValue = lastNameInput.value;
    const emailValue = emailInput.value;

    const userData = {
        first_name: firstNameValue,
        last_name: lastNameValue,
        email: emailValue,
    };
    if (firstNameValue == "" && lastNameValue == "" && emailValue == "") {
        alert("Enter a info!");
    } else if (firstNameValue == "" && lastNameValue == "") {
        alert("Enter a first and last name!");
    } else if (firstNameValue == "" && emailValue == "") {
        alert("Enter a first name and email!");
    } else if (lastNameValue == "" && emailValue == "") {
        alert("Enter a lastname and email!");
    } else if (firstNameValue == "") {
        alert("Enter a first name!!");
    } else if (lastNameValue == "") {
        alert("Enter a last name!");
    } else if (emailValue == "" && !isNaN(emailValue)) {
        alert("Enter a email!");
    } else
        await createUser(userData);
    elForm.reset();
});



// GET USERS **********************************************
// async function getUsers(url) {
//     try {
//         const response = await fetch(url);
//         if (response.status !== 200) {
//             console.log(`${response.status}`);
//         }
//         const data = await response.json();
//         return data;

//     } catch (error) {
//         console.error(error);
//     }
// }

// // // RENDER USERS****************************************************
function renderUsers(users) {
    // const {
    //     avatar,
    //     first_name,
    //     last_name,
    //     email
    // } = user;

    const userCard = document.createElement('li');
    userCard.className = "card";

    // const cardImg = document.createElement('img');
    // cardImg.src = avatar;
    // cardImg.alt = first_name;
    // cardImg.className = "card-img";

    const cardDeletButton = document.createElement('button');
    cardDeletButton.className = "card-delet-button";


    const cardBody = document.createElement('div');
    cardBody.className = "card-body";

    const cardFistAndLastnameBox = document.createElement('div');
    cardFistAndLastnameBox.className = "firstname-and-lastname"

    const cardFirstName = document.createElement('h3');
    cardFirstName.textContent = `${users.first_name}`;
    cardFirstName.className = "fistname";

    const cardLastName = document.createElement('h3');
    cardLastName.textContent = `${users.last_name}`;
    cardLastName.className = "lastname";

    const cardEmail = document.createElement('a');
    cardEmail.textContent = `${users.email}`;
    cardEmail.href = `mailto: ${users.email}`

    cardEmail.className = "card-email";

    // userCard.appendChild(cardImg);
    userCard.appendChild(cardDeletButton);
    userCard.appendChild(cardBody);
    cardFistAndLastnameBox.appendChild(cardFirstName);
    cardFistAndLastnameBox.appendChild(cardLastName);
    cardBody.appendChild(cardFistAndLastnameBox);
    cardBody.appendChild(cardEmail);

    elList.appendChild(userCard);
}

