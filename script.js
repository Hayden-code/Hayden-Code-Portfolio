var repoContainer = document.getElementById("extraReposContainer");

function getRepos() {
  var apiUrl = "https://api.github.com/users/hayden-code/repos";
  if (repoContainer.innerHTML !== "") {
    repoContainer.style.display = "block";
  } else {
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayRepos(data);
          });
        } else {
          alert("Error: " + response.statusText);
        }
      })
      .catch(function (error) {
        alert("Unable to get Repos");
      });
  }
}

// function for appending fetched data to index.html
function displayRepos(repoData) {
  for (var i = 0; i < repoData.length; i++) {
    // creating div
    var repoEl = document.createElement("div");
    repoEl.classList.add("repoLi");

    // getting repo title and appending it to repoEl div in a <h2> tag
    var repoName = repoData[i].name;
    var title = document.createElement("h2");
    title.textContent = repoName;
    repoEl.appendChild(title);

    // getting repo description and appending it to repoEl in a <p> tag
    var repoDesc = repoData[i].description;
    var repoDescription = document.createElement("p");
    repoDescription.textContent = repoDesc;
    repoEl.appendChild(repoDescription);

    // getting github and website link and appending them to repoEl in an <a> tag
    var gitHubLink = repoData[i].html_url;
    var a = document.createElement("a");
    var aText = document.createTextNode("GitHub Link");
    a.appendChild(aText);
    a.target = "_blank"
    a.href = gitHubLink;
    repoEl.appendChild(a);
    // appending repoEl to index.html
    repoContainer.appendChild(repoEl);
  }
}

function hideRepos() {
  repoContainer.style.display = "none";
}
