import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Page(){
    
const  [curretLang,setCurretLang] = useState('AR');

const dispalyMessage =()=>{
    switch(curretLang){
        case'AR' : return 'السلام عليكم'
        break
        case'FR' : return 'bonjour'
        break
        case'EN' : return 'hello'
        break
    }
}


  return (<>
      <LanguageSwitcher onLaguangeChange={value=>setCurretLang(value)} />

      <h1>current lang {curretLang}</h1>
      <div className="alert alert-primary" role="alert">
        <strong>{dispalyMessage()}</strong>
      </div>

<div>السلام عليكم</div>
<div>hello</div>
<div>bonjour</div>
</>

  

  )

}