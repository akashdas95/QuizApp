import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
html{
    height:100%;
}

body{
    background: #4160AE;
    background-size: cover;
    margin: 0%;
    padding: 0 10px;
    display: flex;
    justify-content: center;
    color: white;
    font-size:1.5rem;
}

*{
    box-sizing: border-box;
    font-family: 'catamaran', san-serif;
}
`

export const Wrapper = styled.div`

 display:flex;
 flex-direction: column;
 justify-content: center;
  
 >p {
     color:white;
 }

.score{
    color:white;
    font-size: 2rem;
    margin: 0;
}

h1{
    text-align: center;
    font-size: 3rem;
}

button{
    width:auto;
    font-size:1.5rem;
}

button:hover{
    cursor:pointer;
}
`