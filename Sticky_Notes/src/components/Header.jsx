// import PropTypes from "prop-types"

import Button from "./Button"

const Header = ({ title, onAdd, toggle }) => {

    return (
        <header className="header">
            <h1>{title}</h1>
            <Button
                color={toggle ? "red" : "green"}
                text={toggle ? "Close" : "Add"}
                onClick={onAdd}
            />
        </header>
    )
}

// const hedingStyle = {
//     color: 'red',
//     backgroundColor: 'black',
// }

// Header.defaultProps = {
//     title: 'Sticky Notes',
// }

// Header.PropTypes = {
//     title: PropTypes.string.isRequired,
// }

export default Header