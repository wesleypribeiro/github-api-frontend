import { IUser } from "@/interfaces";
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const UsersList = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);

  const [loadMore, setLoadMore] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/apiservice/capture-hash/")
        setUsers([...users, ...response.data.users]);
        setLoading(false);
        setLoadMore(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [loadMore]);

  const handleLoadMore = () => {
    setLoadMore(true);
  };


  const onClick = (userLogin: string) => {
    navigate(`/user/${userLogin}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">GitHub Users List</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {users?.map(user => (
            <div
              key={user.id}
              className={`bg-white shadow-md rounded-lg p-4 flex items-center transition duration-300 ease-in-out transform hover:scale-105`}
              style={{ cursor: 'pointer' }}
              onClick={() => onClick(user.login)}
            >
              <img src={user.avatar_url} alt={`Avatar de ${user.login}`} className="w-12 h-12 rounded-full mr-4" />
              <div>
                <h2 className="text-xl font-semibold mb-2">ID: {user.id}</h2>
                <p className="text-gray-700">Username: {user.login}</p>
              </div>
            </div>
          ))}
        </div>)}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleLoadMore}
          className="py-2 px-4 rounded bg-blue-500 hover:bg-blue-700"
        >
          Load More
        </button>
      </div>
    </div>
  );
}

export default UsersList
