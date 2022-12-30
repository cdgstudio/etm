import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import Footer from '../components/Footer';
import BaseLayout from '../layouts/BaseLayout';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

function NewUser({ userName }: PropTypes.InferProps<typeof NewUser.propTypes>) {
  return (
    <BaseLayout>
      <Title>Hello {userName} </Title>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempor
        finibus libero, ut varius nisl euismod eget. Aliquam fermentum eleifend
        ornare. Morbi cursus elementum lacus.
      </p>

      <Footer />
    </BaseLayout>
  );
}

NewUser.propTypes = {
  userName: PropTypes.string.isRequired,
  children: PropTypes.any,
};

NewUser.defaultProps = {
  userName: 'John Doe',
};

export default NewUser;
