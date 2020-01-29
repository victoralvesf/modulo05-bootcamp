import React, { useState, useEffect } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List } from './styles';

export default function Main() {
  const [repo, setRepo] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const localRepos = localStorage.getItem('repositories');
    if (localRepos) setRepositories(JSON.parse(localRepos));
  }, []);

  useEffect(() => {
    localStorage.setItem('repositories', JSON.stringify(repositories));
  }, [repositories]);

  useEffect(() => {
    setError(false);
  }, [repo]);

  function handleInputChange(e) {
    setRepo(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    await api
      .get(`/repos/${repo}`)
      .then((res) => {
        const data = {
          name: res.data.full_name,
        };

        setRepo('');
        setRepositories([...repositories, data]);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repositorios
      </h1>

      <Form onSubmit={handleSubmit} error={error}>
        <input
          type="text"
          placeholder="Adicionar repositorio"
          value={repo}
          onChange={handleInputChange}
        />
        <SubmitButton loading={loading.toString()}>
          {loading ? (
            <FaSpinner color="#fff" size={14} />
          ) : (
            <FaPlus color="#fff" size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repositories.map((repository) => (
          <li key={repository.name}>
            <span>{repository.name}</span>
            <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
              Detalhes
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}
