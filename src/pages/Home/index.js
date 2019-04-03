import React from 'react'

import GenesysLogo from 'vectors/GenesysLogo'

import styled from 'styled-components/macro'

const StyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

/** The main home page. */
const Home = () => (
  <StyledWrapper data-testid="home">
    <GenesysLogo width={300} />
    <h1>GM COMPENDIUM</h1>
  </StyledWrapper>
)

export default Home