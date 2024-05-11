import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '@/api';
import { IRepo, IUserDetails } from '@/interfaces';

const UserDetails = () => {
  const [user, setUser] = useState<IUserDetails | null>(null);
  const [repos, setRepos] = useState<IRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await api.get(`/${username}/details`);
        setUser(userResponse.data);

        const reposResponse = await api.get(`/${username}/repos`);
        setRepos(reposResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setLoading(false);
      };
    }

    fetchUserData();
  }, [username]);

  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">User Details</h1>
      
      <div className="mb-8">
        <button onClick={goBack} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Go Back</button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      ) : (
        <div>
          <div className="bg-white shadow-md rounded-lg p-4 mb-8">
            <h2 className="text-xl font-semibold mb-2">User Info</h2>
            <p className="text-gray-700">ID: {user?.id}</p>
            <p className="text-gray-700">Login: {user?.login}</p>
            <p className="text-gray-700">Profile URL: <a href={user?.html_url} target="_blank" rel="noopener noreferrer">{user?.html_url}</a></p>
            <p className="text-gray-700">Created At: {new Date(user?.created_at!).toLocaleDateString()}</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Public Repositories</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {repos.map((repo: any) => (
                  <tr key={repo.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{repo.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{repo.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.html_url}</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;