import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error('Не удалось загрузить пользователя:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <Loader />;

  if (!user) return <p className="container">Пользователь не найден</p>;

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Go home
      </button>

      <h1>{user.name}</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Телефон:</strong> {user.phone}</p>
      <p><strong>Сайт:</strong> {user.website}</p>
      <p><strong>Компания:</strong> {user.company?.name}</p>
      <p><strong>Город:</strong> {user.address?.city}</p>
    </div>
  );
};

export default UserDetails;
