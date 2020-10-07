'use strict';

//This function is responsible for looking through JSON data and displaying the username
function displayResults(responseJson) {
    console.log('displayResults ran');
    console.log(responseJson);
    console.log(responseJson.length);
    console.log(responseJson[0].owner.login);

    let customer = responseJson[0].owner.login;
    let customerinfo = `
        <h4>Username: ${customer}</h4>
        <h4>Repositories: ${responseJson.length}</h4>
    `;
    //This adds customer info to the results list
    //This for loop cycles through each result and creates a list of repos with links and descriptions
    for (let i = 0; i < responseJson.length; i++) {
        $("#results").append(`
        <div class="result-item">
            <h4>${customerinfo}</h4>
            <hr>
            <h4>${responseJson[i].name}</h4>
            <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>
            <p>${responseJson[i].description}</p>
        </div>
        `);
    }
    //Removes 'hidden' to reveal results
    $('#results').removeClass('hidden');
};


//This function conducts the GET request via the Github API with 'username' as a parameter
function handleGitRepos(username) {
    //inserts user input (username) into url
    const url = `https://api.github.com/users/${username}/repos`
    console.log(username);
    //Asynchronous request
    fetch(url)
        .then(response => {
    //If response received is 'ok', return results as JSON
            if (response.ok) {
                return response.json()
                
            }
            console.log(response.json());
    //If response is not 'ok', produce an error with status
            throw new Error(response.statusText);
        })
    //This is responsible for displaying the JSON results
            .then((responseJson) => displayResults(responseJson))
            .catch((error) => alert("Something is wrong, try again."));
}

//This function listens for when user has input a search and submits via the 'Find' button
function mainRepoSearch() {
    $('#js-form').submit(event => {
        event.preventDefault();
        //This will empty any results that were previously displayed
        $('#results').empty();
        //Assigns user input value to 'username'
        const username = $("#username").val();
        //Call handleGitRepo with 'username' argument
        handleGitRepos(username);
    });
}

$(mainRepoSearch);