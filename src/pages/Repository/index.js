import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

import api from '../../services/api';

import Container from '../../components/Container';
import {
  Owner,
  OwnerLoading,
  IssueList,
  Label,
  Filter,
  Paginate,
  Info,
} from './styles';

function Repository({ match }) {
  const repoProp = decodeURIComponent(match.params.repository);
  // eslint-disable-next-line no-unused-vars
  const [repoName, setRepoName] = useState(repoProp);
  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);

  async function loadIssues() {
    api
      .get(`/repos/${repoName}/issues`, {
        params: {
          state: filter,
          per_page: 10,
          page,
        },
      })
      .then((res) => {
        setIssues(res.data);
      });
  }

  useEffect(() => {
    async function fetchRepo() {
      const [repoInfo, issuesInfo] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: filter,
            per_page: 10,
            page,
          },
        }),
      ]);

      setRepository(repoInfo.data);
      setIssues(issuesInfo.data);
      setLoading(false);
    }

    fetchRepo();
  }, []);

  useEffect(() => {
    async function load() {
      await loadIssues();
    }

    load();
  }, [filter]);

  useEffect(() => {
    async function load() {
      await loadIssues();
    }

    load();
  }, [page]);

  function handleFilterChange(e) {
    setFilter(e.target.value);
  }

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

      <Filter>
        <span>Filtro:</span>
        <select onChange={handleFilterChange} value={filter.status}>
          <option value="all">Todas</option>
          <option value="open">Abertas</option>
          <option value="closed">Fechadas</option>
        </select>
      </Filter>

      {issues.length > 0 ? (
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
                    <Label
                      color={label.color}
                      key={String(label.id)}
                      title={label.description}
                    >
                      <small>{label.name}</small>
                    </Label>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      ) : (
        <Info>
          <p>Nenhuma issue encontrada!</p>
        </Info>
      )}

      {issues.length > 0 && (
        <Paginate>
          {page !== 1 && (
            <button type="button" onClick={() => setPage(page - 1)}>
              Página anterior
            </button>
          )}
          <button type="button" onClick={() => setPage(page + 1)}>
            Próxima página
          </button>
        </Paginate>
      )}
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
