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

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const Label = styled.span`
  background: ${(props) => `#${props.color}`};
  padding: 2px 8px;
  border-radius: 25px;
  color: #333;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  width: max-content;
  margin-top: -5px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.15);
  margin-right: 10px;

  small {
    pointer-events: none;
  }
`;
