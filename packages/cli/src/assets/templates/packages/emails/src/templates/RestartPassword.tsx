import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import Footer from '../components/Footer';
import BaseLayout from '../layouts/BaseLayout';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

function NewUser({
  userName,
  link,
}: PropTypes.InferProps<typeof NewUser.propTypes>) {
  return (
    <BaseLayout>
      <Title>Hello world {userName}</Title>
      <p>
        To restart password click here <a href={link}>{link}</a>
      </p>

      <Footer />
    </BaseLayout>
  );
}

NewUser.propTypes = {
  userName: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

NewUser.defaultProps = {
  userName: 'John Doe',
};

export default NewUser;
