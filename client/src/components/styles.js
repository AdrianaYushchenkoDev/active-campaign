import styled, { keyframes, css } from 'styled-components';
import { Form, Field} from 'formik';

const loadfrom = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  
  50% {
    opacity: 1;
    transform: scale(1);
  }
  
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const Wrapper = styled.div`
  margin: 180px 0px;
  
  animation-name: ${loadfrom};
  animation-duration: 1s;
  animation-iteration-count: 1;
`;

export const Error = styled.div`
  margin: auto;
  padding: 8px 0px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: rgba(255, 0, 0, 0.7);
`;

export const Button = styled.button`
  width: 200px;
  height: 45px;
  margin: 20px 0px;
  font-size: 18px;
  color: white;
  
  outline: none;
  border: none;
  background-color: rgba(26,26,26,0.8);

  :hover {
    cursor: pointer;
    background-color: #e8b88e;
  }
`;

export const Label = styled.label`
  padding: 20px 10px 5px;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  //text-align: left;
  color: rgba(26, 26, 26, 0.8);

`;

export const Input = styled(Field)`
  width: 400px;
  padding: 10px 10px;
  
  font-size: 16px;
  color: rgba(26, 26, 26, 0.7);
  
  outline: none;
  border: none;
  border-bottom: 2px solid #f6c396;
  transition: 2s all;
  //background: linear-gradient(0deg, rgba(245, 195, 150, 0.2), rgba(0, 0, 0, 0));

  ::placeholder {
    font-size: 16px;
    font-family: 'Noto Sans', sans-serif;
    font-weight: 600;
    color: rgba(26, 26, 26, 0.5);
  }
`;

export const FormFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormSelect = styled(Field)`
  width: 420px;
  height: 30px;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  line-height: inherit;
  border: 2px solid #f6c396;
  margin-top: 10px;
  background: #ffff;
`;

export const FormWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
`;

export const Message = styled.div`
  margin: auto;
  padding: 8px 0px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: green;
`;
