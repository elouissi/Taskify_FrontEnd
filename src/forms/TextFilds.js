 const TextFilds = (props) => {
    
    return (<>
    <label>{props.inputLabel}</label> <input type="text" value={props.inputValue}/>
    <button>submit</button>
    <div>{props.children}</div>
     </>)
 }
 export default TextFilds