/*
sats.cc auth
Matrix Network International B.V.
#
developed by (•̪●)==ε0O o o oo o o o o O1shi`(•.°)~

*
*
*/
// ------------------ '(◣ ◢)' ---------------------

// ------------------ '(◣ ◢)' ---------------------

const auth = firebase.auth();

let jwt;

// ------------------ '(◣ ◢)' ---------------------



// ------------------ '(◣ ◢)' ---------------------
const sendVerificationEmail = ()=>{
    console.log(auth.currentUser.email);
    auth.currentUser.sendEmailVerification()
    .then((result)=>{
        console.log("initiated email verification");
        console.log(result);
        document.getElementById('send-e-verification').innerHTML="<p class='subp'>We have sent a verification link to your email.</p>";
    })
    .catch((e)=>{
        console.error("error initiating email verification");
        console.error(e);
    })
}
const getToken=()=>{
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
  .then(function(idToken) {
    // Send token to your backend via HTTPS
    // ...
    console.log("\n\n\nIDTOKEN", idToken);
    jwt=idToken;
    return;

  }).catch(function(error) {
    // Handle error
    alert("Error authneticating with API.sats.cc");
    console.error(error);
    return(false);
  });
};
// ------------------ '(◣ ◢)' ---------------------
/*
*
*
*
Listeners
*
*
*
*/

// ------------------ '(◣ ◢)' ---------------------
// const calcForm = document.querySelector('#calc-form');
//
// function updatePay (){
//     document.getElementById('payment-amount').value = parseFloat(document.getElementById('euro-value-buy').value.replace(/,/g, ''));
// };

// ------------------ '(◣ ◢)' ---------------------
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    // console.log(e);
    //get user info

    const email = loginForm['login-email'].value;
    const pass = loginForm['login-pass'].value;


    auth.signInWithEmailAndPassword(email,pass)
    .then((cred)=>{

        $('#login-form').fadeOut(200);
        loginForm.reset();

    })
    .catch((e)=>{
        console.error(e);
        loginForm.reset();
    });

});

// ------------------ '(◣ ◢)' ---------------------

/*
*
*
*
AUTH STATE CHANGE
*
*
*
*/
// ------------------ '(◣ ◢)' ---------------------


firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
        // User is signed in.
        console.log("USER DETAILS: ",JSON.stringify(user,null,2));

        const email = user.email;
        const emailVerified = user.emailVerified || 'false';

        console.log("email verified: ", emailVerified);
        $('#logout').show();

        getToken();


        // if(displayName){
        //     // document.getElementById('profile-name').value = displayName;
        //     document.getElementById('profile-name-check').setAttribute('src', 'assets/images/check.svg');
        // }

        // ...



    } else {
        // User is signed out.
        // ...
        // $('#logout').hide();
    }



});

// 

/*
*
*
*
Functions
*
*
*
*/


//SEND JWT TO BACKEND FOR VALIDATION

// firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
// // Send token to your backend via HTTPS
// // ...
// }).catch(function(error) {
// // Handle error
// });


//GET THIS ON BACKEND FROM FIREBASE ADMIN
// idToken comes from the client app
// admin.auth().verifyIdToken(idToken)
//   .then(function(decodedToken) {
//     let uid = decodedToken.uid;
//     // ...
//   }).catch(function(error) {
//     // Handle error
//   });


// const test  = '12Joias1433ee32r12';

// const qr = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=192x192&data=${test}">`

// document.getElementById("qrcode").innerHTML = qr;



