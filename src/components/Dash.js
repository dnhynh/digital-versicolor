import React from "react"

const Dash = ({fetchRecent}) => {
    return (
        <div>
            <a href="http://localhost:8888/login">
                <button>Login</button>
            </a>
            <button onClick={fetchRecent}>Get Recently Played</button>
        </div>
    )
}

export default Dash
