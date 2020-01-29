import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

import api from '../../services/api';

import Container from '../../components/Container';
import { Owner, OwnerLoading, IssueList, Label } from './styles';

function Repository({ match }) {
  const [repository, setRepository] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepo() {
      const repoName = decodeURIComponent(match.params.repository);

      const [repoInfo, issuesInfo] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: 'open',
            per_page: 5,
          },
        }),
      ]);

      setRepository(repoInfo.data);
      setIssues(issuesInfo.data);
      setLoading(false);
    }

    fetchRepo();
  }, []);

  if (loading) {
    return (
      <Container>
        <Link to="/">
          <FaChevronLeft color="#333" size={24} />
        </Link>
        <OwnerLoading>
          <span />
          <h1>nome de repositorio</h1>
          <p>Essa e uma descricao de um repositorio</p>
        </OwnerLoading>
      </Container>
    );
  }

  return (
    <Container>
      <Link to="/">
        <FaChevronLeft color="#333" size={24} />
      </Link>
      <Owner>
        <img src={repository.owner.avatar_url} alt={repository.owner.login} />
        <h1>{repository.name}</h1>
        <p>{repository.description}</p>
      </Owner>

      <IssueList>
        {issues.map((issue) => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />
            <div>
              <strong>
                <a href={issue.html_url} target="blank">
                  {issue.title} &nbsp;
                </a>
                {issue.labels.map((label) => (
                  <Label color={label.color} title={label.description}>
                    <small>{label.name}</small>
                  </Label>
                ))}
              </strong>
              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssueList>
    </Container>
  );
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};

export default Repository;
