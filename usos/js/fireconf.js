
'use strict';
//var currentUser = this.auth.currentUser;
var uuiddb = "";
// Initializes UsosApp.
function UsosApp() {
  this.checkSetup();

  // Shortcuts to DOM Elements.
  this.messageForm = document.getElementById('message-form');
  this.submitButton = document.getElementById('submit-form');
  this.userPic = document.getElementById('user-pic');
  this.userName = document.getElementById('user-name');
  this.signInButton = document.getElementById('sign-in');
  this.signInButtonFB = document.getElementById('sign-inFB');
  this.signOutButton = document.getElementById('sign-out');
  //this.signOutButtonFB = document.getElementById('sign-outFB');
  this.signInSnackbar = document.getElementById('must-signin-snackbar');
    this.countPerson = document.getElementById('cuantas');
    this.loginPage = document.getElementById('login-page');
    this.registerPage = document.getElementById('register-page');
    //this.eventInfoPage = document.getElementById('eventinfo-page');
    this.personNumber = document.getElementById('person-number');
     //this.familyNumber = document.getElementById('family-number');
    this.mochilaPage =document.getElementById('mochila-page');
    
    
    //DOM elements of the form
    
  this.name = document.getElementById('name');
    this.age = document.getElementById('age');
    this.blood = document.getElementById('blood2');
    this.gender = document.getElementById('gender2');
    this.ocupation = document.getElementById('ocupation');
    this.allergies = document.getElementById('allergies');
    this.sustent = document.getElementById('sustent2');
    this.discap = document.getElementById('discap3');
    this.discap2 = document.getElementById('discap2');
    
    
    

  // Saves message on form submit.
  this.submitButton.addEventListener('click', this.saveMessage.bind(this));
  this.signOutButton.addEventListener('click', this.signOut.bind(this));
  this.signInButton.addEventListener('click', this.signIn.bind(this));
  this.signInButtonFB.addEventListener('click', this.signInFB.bind(this));
  //this.signOutButtonFB.addEventListener('click', this.signOutFB.bind(this));


  this.initFirebase();
}

// Sets up shortcuts to Firebase features and initiate firebase auth.
UsosApp.prototype.initFirebase = function() {
  // Shortcuts to Firebase SDK features.
  this.auth = firebase.auth();
  this.database = firebase.database();
  this.storage = firebase.storage();
  // Initiates Firebase auth and listen to auth state changes.
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

// Loads chat messages history and listens for upcoming ones.
var list_index = 0;


UsosApp.prototype.loadMessages = function() {
  // Reference to the /messages/ database path.
    var currentUser = this.auth.currentUser;
    uuiddb = currentUser.uid;
    console.info(uuiddb);
    this.messagesRef = this.database.ref(uuiddb);
    
  // Make sure we remove all previous listeners.
  this.messagesRef.off();
    
  //Loads the messages
  list_index = 0
  var setMessage = function(data){
      var val = data.val();
      list_index = list_index + 1;
      console.info(list_index);
      this.countPerson.textContent = list_index;
      this.displayMessage(data.key, val.nameDB, val.ageDB, val.bloodDB, val.genderDB, val.allergiesDB, val.ocupationDB, val.sustentDB, val.discapDB, val.discap2DB);
  }.bind(this);
    
  this.messagesRef.limitToLast(1000).on('child_added', setMessage);
  this.messagesRef.limitToLast(1000).on('child_changed', setMessage);
    
};


// Saves a new message on the Firebase DB.
UsosApp.prototype.saveMessage = function(e) {
  e.preventDefault();
  // Check that the user is signed in.
  if (this.checkSignedInWithMessage()) {
      //var currentUser = this.auth.currentUser;
      //uuiddb = currentUser.uid;
      console.info(uuiddb);
    this.messagesRef.push({
        uuid: uuiddb,
       // personDB: personNumber,
        nameDB: this.name.value,
        ageDB: this.age.value,
        bloodDB: this.blood.value,
        genderDB: this.gender.value,
        allergiesDB: this.allergies.value,
        ocupationDB: this.ocupation.value,
        sustentDB: this.sustent.value,
        discapDB: this.discap.value,
        discap2DB: this.discap2.value,
    }).then(function() {
      // Clear message text field and SEND button state.
      //this.toggleButton();
        console.info("base da datos actualizada")
      //confirm("enter then function");
    }.bind(this)).catch(function(error) {
      console.error('Error writing new message to Firebase Database', error);
      //confirm("Error", error);
    });
  }
};

// Signs-in Friendly Chat.
UsosApp.prototype.signIn = function() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new firebase.auth.GoogleAuthProvider();
  this.auth.signInWithPopup(provider);
};

// Signs-out of Friendly Chat.
UsosApp.prototype.signOut = function() {
  // Sign out of Firebase.
  this.auth.signOut();
};

// Signs-in Friendly Chat.
UsosApp.prototype.signInFB = function() {
  // Sign in Firebase using popup auth and Facebook as the identity provider.
  var provider = new firebase.auth.FacebookAuthProvider();
  this.auth.signInWithPopup(provider).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
};



// Triggers when the auth state change for instance when the user signs-in or signs-out.
UsosApp.prototype.onAuthStateChanged = function(user) {
  if (user) { // User is signed in!
    // Get profile pic and user's name from the Firebase user object.
    var profilePicUrl = user.photoURL;
    var userName = user.displayName;

    // Set the user's profile pic and name.
    this.userPic.style.backgroundImage = 'url(' + (profilePicUrl || '/images/profile_placeholder.png') + ')';
    this.userName.textContent = userName;

    // Show user's profile and sign-out button.
    this.userName.removeAttribute('hidden');
    this.userPic.removeAttribute('hidden');
    this.signOutButton.removeAttribute('hidden');
    // this.signOutButtonFB.removeAttribute('hidden');

    // Hide sign-in button.
    this.signInButton.setAttribute('hidden', 'true');
    this.signInButtonFB.setAttribute('hidden', 'true');
    this.submitButton.removeAttribute('disabled');
      
    this.loadMessages();
      
    this.countPerson.removeAttribute('hidden');
    this.loginPage.setAttribute('hidden', 'true');
    this.registerPage.removeAttribute('hidden');
    this.mochilaPage.removeAttribute('hidden');
   
  } else { // User is signed out!
    // Hide user's profile and sign-out button.
    this.userName.setAttribute('hidden', 'true');
    this.userPic.setAttribute('hidden', 'true');
    this.signOutButton.setAttribute('hidden', 'true');

    // Show sign-in button.
    this.signInButton.removeAttribute('hidden'); 
    this.signInButtonFB.removeAttribute('hidden'); 
    this.submitButton.setAttribute('disabled', 'true');
    this.countPerson.setAttribute('hidden', 'true');
      
    this.loginPage.removeAttribute('hidden');
    this.registerPage.setAttribute('hidden','true');
    this.mochilaPage.setAttribute('hidden', 'true');
  }
};

// Returns true if user is signed-in. Otherwise false and displays a message.
UsosApp.prototype.checkSignedInWithMessage = function() {
  // Return true if the user is signed in Firebase
  if (this.auth.currentUser) {
    return true;
  }

  // Display a message to the user using a Toast.
  var data = {
    message: 'You must sign-in first',
    timeout: 2000
  };
  this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
  return false;
};

// Displays a Message in the UI.
UsosApp.prototype.displayMessage = function(key, nameDB, ageDB, bloodDB, genderDB, allergiesDB, ocupationDB, sustentDB, discapDB, discap2DB) {
  var div = document.getElementById(key);
  // If an element for that message does not exists yet we create it.
  console.info(key, nameDB, ageDB, bloodDB, genderDB, allergiesDB, ocupationDB, sustentDB, discapDB, discap2DB);
  
  // Show the card fading-in and scroll to view the new message.
    

};

// Checks that the Firebase SDK has been correctly setup and configured.
UsosApp.prototype.checkSetup = function() {
  if (!window.firebase || !(firebase.app instanceof Function) || !window.config) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions.');
  } else if (config.storageBucket === '') {
    window.alert('Your Firebase Storage bucket has not been enabled. Sorry about that. This is ' +
        'actually a Firebase bug that occurs rarely. ' +
        'Please go and re-generate the Firebase initialisation snippet (step 4 of the codelab) ' +
        'and make sure the storageBucket attribute is not empty. ' +
        'You may also need to visit the Storage tab and paste the name of your bucket which is ' +
        'displayed there.');
  }
};

window.onload = function() {
  window.UsosApp = new UsosApp();
};
