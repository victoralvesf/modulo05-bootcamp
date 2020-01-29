import styled from 'styled-components';

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const OwnerLoading = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-top: 20px;
    background: #bcbcbc;
    color: #bcbcbc;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
    background: #bcbcbc;
    color: #bcbcbc;
    border-radius: 4px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    background: #bcbcbc;
    color: #bcbcbc;
    border-radius: 4px;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;
