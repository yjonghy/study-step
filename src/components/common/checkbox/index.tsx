export default function CheckBox() {

    return(
        // className={`${parentStyle}`}
        <div>
            <input type="checkbox" id="checkbox"/>
            {/*onChange={toggle.onChange}*/}
            <label htmlFor="checkbox" className="switch_label" >
                <span className="onf_btn"></span>
            </label>
        </div>
    )
}