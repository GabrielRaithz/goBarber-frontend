import styled from 'styled-components';

export const Container = styled.div`

  background: #232129;
  border-radius: 10px;
  color: #666360;
  border: 2px solid #233129;
  padding: 16px;
  width: 100%;

  display:flex;
  align-items: center;

  & + div{
    margin-top: 16px;
  }

  input{
    flex: 1;
    border: 0;
    background: transparent;
    color: #F4EDE8;

    &::placeholder{
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
