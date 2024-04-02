import React, { useState } from "react";

export default function LanguageList() {
    const [language, setLanguage] = useState('');
    const [languageList, setLanguageList] = useState([]);

    const display = () => languageList.map((language, index) => <li key={index}>{language}</li>);

    const handleInput = (event) => {
        setLanguage(event.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLanguageList([...languageList, language]);
        setLanguage(''); // Réinitialise le champ d'entrée après l'ajout
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" value={language} onChange={handleInput} id="language" placeholder="languages" />
                <input type="submit" value="add languages" />
            </form>
            <ul>
                {display()}
            </ul>
        </>
    );
}
