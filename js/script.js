// start validation using RegExp
const userNameInput = document.getElementById("userNameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const passwordConfirmInput = document.getElementById("passwordConfirmInput");

const userNameError = document.getElementById("userNameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const passConfirmError = document.getElementById("passConfirmError");

const form = document.getElementById("form");

let validated = false;


function validate(regex,input,inputError ){

        if(regex.test(input.value)==true){
            input.classList.add("is-valid");        
            input.classList.remove("is-invalid");        
            inputError.classList.replace("d-block","d-none");
           
                    
        }else{
            input.classList.add("is-invalid");
            input.classList.remove("is-valid");        
            inputError.classList.replace("d-none","d-block");
           }
            
    }
     
    // UserName Validation 
    userNameInput.addEventListener("blur",function(){
        validate(/^[a-z][a-z0-9]{3,13}[a-z]$/i,userNameInput,userNameError);
    }
    );
    
    // email Validation 
    emailInput.addEventListener("blur",function(){
        validate(/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/i,emailInput,emailError);
    }
    )
    

    // password Validation 
    passwordInput.addEventListener("blur",function(){
        validate(/.{8,}/i,passwordInput,passwordError);
    }
    )

    // password Confirm 
    passwordConfirmInput.addEventListener("blur",function(){
       if(passwordInput.value=== passwordConfirmInput.value){
        passwordConfirmInput.classList.add("is-valid");        
        passwordConfirmInput.classList.remove("is-invalid");        
        passConfirmError.classList.replace("d-block","d-none");
       }else{
        passwordConfirmInput.classList.add("is-invalid");
        passwordConfirmInput.classList.remove("is-valid");        
        passConfirmError.classList.replace("d-none","d-block");
       
    }
    }
    );

    // form submition and fetching data 

form.addEventListener('submit',function(e){
    e.preventDefault();
    // fetch Post request 
    fetch("https://goldblv.com/api/hiring/tasks/register",
    {
        method:'POST',
        body:JSON.stringify({
            userName:userNameInput.value,
            email:emailInput.value,
            password:passwordInput.value,
            passConfirmation:passwordConfirmInput.value

        }),
        headers:{
            "Content-Type": "application/json"
        }
    })
    .then(function(response){
        return response.json
    })
    .then(function(){
        localStorage.setItem("email",emailInput.value );
        goForLoggedIn();
    })
})

function goForLoggedIn(){
        window.location.href = "http://localhost:5500/loggedIn.html";
 }
