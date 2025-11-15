import React, { useState } from 'react'
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { app } from '../utils/firebase';

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'http://localhost:3000',
  // This must be true.
  handleCodeInApp: true,
};

export default function SignIn() {
    const auth = getAuth(app);
    const [email, setEmail]= useState("")

    async function onSignIn(){
        sendSignInLinkToEmail(auth, email, actionCodeSettings)
                .then(() => {
                    
                    // The link was successfully sent. Inform the user.
                    // Save the email locally so you don't need to ask the user for it again
                    // if they open the link on the same device.
                    window.localStorage.setItem('emailForSignIn', email);
                    alert("Email sent")
                    // ...
                })
                .catch((error) => {
                    alert("Email not sent")
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ...
                });

    }
       
  return (
    <div>
        SignIn
        <div>
        <input type='text' className='mt-3' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='email'/>
        {/* <input type='password' placeholder='password'/> */}
        <button onClick={onSignIn} className='hover:cursor-pointer hover:text-2xl hover:text-green-300'>SignUp</button>
        </div>
    </div>
  )
}
