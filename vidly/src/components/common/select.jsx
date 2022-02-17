
const Select = ({ name, label, options, error, ...rest }) => {
    return (  
        <div className="form-group">
            <label htmlFor={ name }>{ label }</label>

            {/* dropdown menu */}
            <select name={ name } id={ name } { ...rest } className="form-control">

                {/* empty option */}
                <option value="" /> 

                {/* map all options we get into option elements */}
                { options.map(option => 
                    <option key={ option._id } value={ option._id}>
                        { option.name}
                    </option>
                )}
            </select>

            {/* if error is truthy then the expression will be returned */}
            { error && <div className="alert alert-danger">{ error }</div> }
        </div>
    );
}
 
export default Select;