import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
${reset}

body {
  font-family: 'Helvetica Neue', sans-serif;
}

h1 {
  font-family: 'Comfortaa', sans-serif;
  font-weight: 700;
  font-size: 24px;
}

h2 {
  font-family: 'Comfortaa', sans-serif;
  font-weight: 700;
  font-size: 22px;
}

p {
  font-size: 14px;
}

a {
  text-decoration: none;
}
`;

export default GlobalStyles;
