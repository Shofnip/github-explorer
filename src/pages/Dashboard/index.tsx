import React, { useState, useEffect, FormEvent, useCallback } from 'react';
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
  const [findRepository, setFindRepository] = useState('');
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

  const handleAddRepository = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!findRepository) {
        setInputError('Digite o "auto/nome" do repositório.');
        return;
      }

      try {
        const response = await api.get<Repository>(`repos/${findRepository}`);

        const repository = response.data;

        setRepositories((oldRepositories) => [...oldRepositories, repository]);
        setFindRepository('');
        setInputError('');
      } catch {
        setInputError('Erro na busca por este repositório.');
      }
    },
    [findRepository],
  );

  const handleRemoveRepository = useCallback(
    (full_name: string) => {
      const findRepositorysitoriesList = repositories.filter(
        (repository) => repository.full_name !== full_name,
      );

      setRepositories(findRepositorysitoriesList);
    },
    [repositories],
  );

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no GitHub</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={findRepository}
          placeholder="Digite o nome do repositório"
          onChange={(e) => setFindRepository(e.target.value)}
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
