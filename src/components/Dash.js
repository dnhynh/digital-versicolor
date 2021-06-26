import React from "react"
import styled from "styled-components"

const DashButton = styled.button`
    border: 1px solid black;
    background-color: transparent;
    letter-spacing: 1px;
    cursor: pointer;
    padding: 10px;
    margin-left: 10px;

    &:hover {
        background-color: #000;
        color: #fff;
    }
`

const Dashboard = styled.div`
    padding: 20px;
    display: flex;
`

const Dash = ({fetchRecent, getTop, auth}) => {
    
    return (
        <Dashboard onMouseMove={(e) => console.log(e.clientY - e.target.offsetTop)}>
            <p>Digital Versicolor</p>
            <DashButton onClick={fetchRecent}>Get Recently Played</DashButton>
            <DashButton onClick={getTop}>Get Top Artists</DashButton>
            {!auth && <DashButton onClick={() => {window.location="http://localhost:8888/login"}}>Login</DashButton>}
        </Dashboard>
    )
}

export default Dash
