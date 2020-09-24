import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import {
  Title,
  Form,
  RepositoriesContainer,
  Repository,
  Error,
} from './styles';

interface Repository {
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
  description: string;
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Digite o "auto/nome" do repositório.');
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);

      const repository = response.data;

      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputError('');
    } catch {
      setInputError('Erro na busca por este repositório.');
    }
  }

  function handleRemoveRepository(full_name: string): void {
    const newRepositoriesList = repositories.filter(
      (repository) => repository.full_name !== full_name,
    );

    setRepositories(newRepositoriesList);
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no GitHub</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          placeholder="Digite o nome do repositório"
          onChange={(e) => setNewRepo(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <RepositoriesContainer>
        {repositories.map((repository) => (
          <Repository>
            <button
              type="button"
              onClick={() => handleRemoveRepository(repository.full_name)}
            >
              <FiTrash2 />
            </button>

            <Link
              key={repository.full_name}
              to={`repository/${repository.full_name}`}
            >
              <img src={repository.owner.avatar_url} alt="Rodrigo Rodrigues" />
              <div>
                <strong>{repository.full_name}</strong>
                <p>{repository.description}</p>
              </div>

              <FiChevronRight size={24} />
            </Link>
          </Repository>
        ))}
      </RepositoriesContainer>
    </>
  );
};

export default Dashboard;
