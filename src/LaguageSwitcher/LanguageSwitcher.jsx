export default function LanguageSwitcher({onLaguangeChange}){

    return(
        <>
        <ul className="nav justify-content-center" >
            <li className="nav-item">
                <a href="#" className="nav-link active" data-lang="AR" onClick={() => onLaguangeChange('AR')} >العربية </a>
            </li>
            <li>
            <a href="#" className="nav-link " data-lang="FR" onClick={() => onLaguangeChange('FR')} >francais </a>
            </li>
            <li>
            <a href="#" className="nav-link " data-lang="EN" onClick={() => onLaguangeChange('EN')} >langlais </a>
            </li>
        </ul>
        </>
    )
}