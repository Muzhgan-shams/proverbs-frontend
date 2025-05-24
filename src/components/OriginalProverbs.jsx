import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const OriginalProverbs = () => {
  const [originalProverbs, setOriginalProverbs] = useState([]);

  useEffect(() => {
    const fetchOriginals = async () => {
      try {
        const dariRes = await axios.get(
          'https://proverbs-api-1.onrender.com/api/proverbs/dari/original'
        );
        const pashtoRes = await axios.get(
          'https://proverbs-api-1.onrender.com/api/proverbs/pashto/original'
        );

        const combined = [
          ...dariRes.data.map((p) => ({ ...p, language: 'Dari' })),
          ...pashtoRes.data.map((p) => ({ ...p, language: 'Pashto' })),
        ];

        setOriginalProverbs(combined);
      } catch (error) {
        console.error('Error fetching original proverbs:', error);
      }
    };

    fetchOriginals();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-10 text-center text-emerald-600">
        Original Proverbs Collection
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {originalProverbs.map((proverb) => (
          <div
            key={proverb.id}
            className="bg-white p-4 rounded-2xl shadow-[0_4px_10px_rgba(16,185,129,0.4)] border border-gray-100 hover:shadow-lg transition"
          >
            <div className="mb-2 text-sm text-gray-500 font-semibold">
              Language: {proverb.language}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              📜{proverb.proverb}
            </h3>
            <p className="text-gray-700">
              <span className="font-medium">Translation:</span>{' '}
              {proverb.translation || '—'}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Transliteration:</span>{' '}
              {proverb.transliteration || '—'}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Meaning:</span>{' '}
              {proverb.meaning || '—'}
            </p>
            <p className="text-gray-600 mt-2 italic">
              🏷️ Category: {proverb.category || 'General'}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 mb-6">
        <Link to="/" className="mt-8 text-blue-600 hover:underline">
          ← Home
        </Link>
      </div>
    </div>
  );
};

export default OriginalProverbs;
