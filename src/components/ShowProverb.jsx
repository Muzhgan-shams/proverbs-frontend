import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ShowProverb = () => {
  const { id, language } = useParams(); // now get language from the URL
  const [proverb, setProverb] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProverb = async () => {
      try {
        const response = await axios.get(
          `https://proverbs-api-1.onrender.com/api/proverbs/${language}/${id}`
        );
        setProverb(response.data);
      } catch (err) {
        console.error('Proverb not found:', err);
        setProverb(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProverb();
  }, [language, id]); // dependency includes language

  if (loading) return <p className="text-center mt-10">Loading proverb...</p>;
  if (!proverb)
    return <p className="text-center mt-10 text-red-500">Proverb not found.</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-lg border ">
        <h2 className="text-2xl font-bold mb-4 text-teal-700">
          Proverb Details
        </h2>

        <p className="text-lg text-gray-800 mb-2">{proverb.proverb}</p>
        <small className="mb-2">✨ {proverb.category}</small>

        {proverb.translation && (
          <p className="italic text-gray-700 mb-2">
            <span className="font-semibold not-italic">Translation:</span> "
            {proverb.translation}"
          </p>
        )}

        {proverb.transliteration && (
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-semibold">Transliteration:</span>{' '}
            {proverb.transliteration}
          </p>
        )}

        {proverb.meaning && (
          <p className="text-sm text-gray-500 mb-8">
            <span className="font-semibold">Meaning:</span> {proverb.meaning}
          </p>
        )}
        <Link
          to="/"
          className="inline-block mb-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ShowProverb;
