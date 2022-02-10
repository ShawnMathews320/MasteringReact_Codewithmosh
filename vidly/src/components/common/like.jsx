// input: liked: boolean
// output: onClick

const Like = ({ liked, onToggleClick }) => {
    let classes = 'fa fa-heart';  // default name of unsolid heart
    if (!liked) classes += '-o';  // check if the liked boolean is true or not and decide to append
    
    return (
        <i 
            onClick={ onToggleClick }  // raise the onToggleClick prop when we click this
            style={{ cursor: 'pointer' }}
            className={ classes } 
            aria-hidden="true"
            >
        </i>
    );
}
 
export default Like;