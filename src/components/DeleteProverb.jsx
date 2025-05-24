import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteProverb = () => {
  const { id, language } = useParams();
  const navigate = useNavigate();

  const [proverb, setProverb] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchProverb = async () => {
      try {
        const res = await axios.get(
          `https://proverbs-api-1.onrender.com/api/proverbs/${language}/${id}`
        );
        setProverb({ ...res.data, language });
      } catch (err) {
        setError('Proverb not found.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProverb();
  }, [id, language]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(
        `https://proverbs-api-1.onrender.com/api/proverbs/${language}/${id}`
      );
      navigate('/');
    } catch (err) {
      setError('Failed to delete proverb.');
      console.error(err);
      setDeleting(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg border">
        <h2 className="text-xl font-bold text-red-600 mb-4">Confirm Delete</h2>

        <div className="mb-6">
          <p className="mb-2 text-gray-800">
            Are you sure you want to delete the following proverb?
          </p>
          <div className="p-4 bg-gray-100 rounded-md border">
            <p className="text-lg font-semibold">{proverb?.proverb || 'N/A'}</p>
            <p className="text-sm text-gray-600">
              {proverb?.translation || 'N/A'}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className={`px-4 py-2 rounded text-white ${
              deleting
                ? 'bg-red-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {deleting ? 'Deleting...' : 'Yes, Delete'}
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            disabled={deleting}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProverb;
