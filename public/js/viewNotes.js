let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
      getNotes(user.uid);
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

function getNotes(userId) {
    console.log(`hello from get notes for ${userId}`);
    const notesRef = firebase.database().ref(`users/${userId}`);
    notesRef.on('value', (db) => {
        const data = db.val();
        renderData(data);
    });
}

function renderData(data) {
    let html = '';
    for (const dataId in data) {  // `dataId` is a key that can be used to access stuff in `data`.
        const note = data[dataId];
        // Make `renderCard` return a string.
        html += renderCard(note);
        // Add card to `html`.
    }
    // Add `html` to the page.
    document.querySelector("#app").innerHTML = html;
}

function renderCard(note) {
    // Convert a note to HTML and return it.
    console.log(note);
    return `
        <div class="column is-one-quarter">
            <div class="card">
                <header class="card-header">
                    <span class="card-header-title">
                        ${note.title} 
                    </span>
                </header>
                <div class="card-content">
                    <span class="content">
                        ${note.text}
                    </span>
                </div>
            </div>
        </div>
    `;
}