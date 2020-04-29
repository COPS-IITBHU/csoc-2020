function displaySuccessToast(message) {
    iziToast.success({
        title: 'Success',
        message: message
    });
}

function displayErrorToast(message) {
    iziToast.error({
        title: 'Error',
        message: message
    });
}

function displayInfoToast(message) {
    iziToast.info({
        title: 'Info',
        message: message
    });
}

const API_BASE_URL = 'https://todo-app-csoc.herokuapp.com/';

function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
}

function registerFieldsAreValid(firstName, lastName, email, username, password) {
    if (firstName === '' || lastName === '' || email === '' || username === '' || password === '') {
        displayErrorToast("Please fill all the fields correctly.");
        return false;
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        displayErrorToast("Please enter a valid email address.")
        return false;
    }
    return true;
}

function register() {
    const firstName = document.getElementById('inputFirstName').value.trim();
    const lastName = document.getElementById('inputLastName').value.trim();
    const email = document.getElementById('inputEmail').value.trim();
    const username = document.getElementById('inputUsername').value.trim();
    const password = document.getElementById('inputPassword').value;

    if (registerFieldsAreValid(firstName, lastName, email, username, password)) {
        displayInfoToast("Please wait...");

        const dataForApiRequest = {
            name: firstName + " " + lastName,
            email: email,
            username: username,
            password: password
        }

        $.ajax({
            url: API_BASE_URL + 'auth/register/',
            method: 'POST',
            data: dataForApiRequest,
            success: function(data, status, xhr) {
                localStorage.setItem('token', data.token);
                window.location.href = '/';
            },
            error: function(xhr, status, err) {
                displayErrorToast('An account using same email or username is already created');
            }
        })
    }
}

function loginFieldsAreValid(username, password) {
    if (username === '' || password === '') {
        displayErrorToast("Please fill all the fields correctly.");
        return false;
    }
    return true;
}

function login() {
    const username = document.getElementById('inputUsername').value.trim();
    const password = document.getElementById('inputPassword').value;

    if (loginFieldsAreValid(username, password)) {
        displayInfoToast("Please wait...");

        const dataForApiRequest = {
            username: username,
            password: password
        }

        $.ajax({
            url: API_BASE_URL + 'auth/login/',
            method: 'POST',
            data: dataForApiRequest,
            success: function(data, status, xhr) {
                localStorage.setItem('token', data.token);
                window.location.href = '/';
            },
            error: function(xhr, status, err) {
                displayErrorToast('Credentials are incorrect!');
            }
        })
    }
}

function taskFieldsAreValid(textItem) {
    if (textItem === '') {
        // displayErrorToast("1111111111111111111111111111111111111111111");
        displayErrorToast("Task can't be empty!");
        return false;
    }
    return true;
}

function addTask() {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to add the task to the backend server.
     * @todo 2. Add the task in the dom.
     */
}

function editTask(id) {
    document.getElementById('task-' + id).classList.add('hideme');
    document.getElementById('task-actions-' + id).classList.add('hideme');
    document.getElementById('input-button-' + id).classList.remove('hideme');
    document.getElementById('done-button-' + id).classList.remove('hideme');
}

function deleteTask(id) {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to delete the task to the backend server.
     * @todo 2. Remove the task from the dom.
     */
}

function updateTask(id) {
    // console.log("1111111111111111111111111111111111111111111");
    const newText = document.getElementById('input-button-' + id).value;
    
    if (taskFieldsAreValid(newText)) {
        displayInfoToast("Please wait...");

        const dataForApiRequest = {
            id: id,
            title: newText
        }

        $.ajax({
            url: API_BASE_URL + 'todo/' + id,
            method: 'PUT',
            data: dataForApiRequest,
            success: function(data, status, xhr) {
                document.getElementById('task-' + id).value = newText;
                document.getElementById('task-' + id).classList.remove('hideme');
                document.getElementById('task-actions-' + id).classList.remove('hideme');
                document.getElementById('input-button-' + id).classList.add('hideme');
                document.getElementById('done-button-' + id).classList.add('hideme');
                displayInfoToast("Task updated!");
                // localStorage.setItem('token', data.token);
                // window.location.href = '/';
            },
            error: function(xhr, status, err) {
                displayErrorToast('Some error occured, try again!');
                console.log(status);
            }
        })
    }
}
