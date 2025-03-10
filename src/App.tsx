import React, { useState } from "react";
import './App.css';

import axios from "axios";

interface User {
  id: number;
  login: string;
  avatar_url: string;
}

interface Repo {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
  description: number;
  owner: User;
}


const InputField: React.FC<{ value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string }> = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border p-2 rounded w-full"
    />
  );
};

const GitHubSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  
  const searchUsers = async () => {
    if (!query) return;
    setLoading(true)
    try {
      const response = await axios.get(`https://api.github.com/search/users`, {
        params: { q: query, per_page: 5 },
      });
      setUsers(response.data.items || []);
      setLoading(false)
      setRepos([])
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchRepos = async (username: string) => {
    if (selectedUser === username) {
      setSelectedUser(null)
    }

    if (selectedUser !== username) {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`);
        setRepos(response.data);
        setSelectedUser(username);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="flex gap-2 mb-2 search-container">
        <InputField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search GitHub users..."
        />
        <button onClick={searchUsers} className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
      </div>
      {
        loading && (
          <div className="loading-container">
             <img className="loading-image" src={`${process.env.PUBLIC_URL}/loading-animation.svg`} alt="loading-animation" />
          </div>
        )
      }
      {
        !loading && users.length > 0 && <h3 className="selected-user-copy">Showing users for {query}</h3>
      }
      {
        !loading && users.length === 0 && (
          <p>Oops! We couldn't find anything matching your search</p>
        )
      }
      <div className="user-container">
        {users.map((user) => (
          <div>
            <div key={user.id} className="flex justify-between border p-2 mb-2 cursor-pointer" onClick={() => fetchRepos(user.login)}>
              <h3>{user.login}</h3>
              <img className={`icon-container  ${selectedUser && user.login === repos[0]?.owner.login && "rotate"}`} src={`${process.env.PUBLIC_URL}/arrow-down.svg`} alt="dropdown-icon" />
            </div>

            {selectedUser && user.login === repos[0]?.owner.login && (
              <div className="mt-4 mb-4">
                <ul>
                  {repos.map((repo) => (
                    <li key={repo.id} className="mb-1 list-container">
                      <div className="flex repo-container justify-between">
                        <div className="repo-description-wrapper">
                          <h3 className="text-lg font-bold">
                            {repo.name}
                          </h3>
                          <p className="text-xs">
                            {repo.description}
                          </p>
                        </div>
                        <div className="flex items-center">
                          {repo.stargazers_count} <span><img className="star-image" src={`${process.env.PUBLIC_URL}/star.png`} alt="star" /></span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        ))}
      </div>

      
    </div>
  );
};

export default GitHubSearch;
