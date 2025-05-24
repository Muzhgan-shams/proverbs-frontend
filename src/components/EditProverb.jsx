import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProverb = () => {
  const { id, language } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    language: language, // default, will update after fetch
    proverb: '',
    translation: '',
    transliteration: '',
    meaning: '',
    category: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Try fetching from both Dari and Pashto
  useEffect(() => {
    const fetchProverb = async () => {
      try {
        const res = await axios.get(
          `https://proverbs-api-1.onrender.com/api/proverbs/${language}/${id}`
        );
        setFormData({ ...res.data, language });
      } catch (err) {
        setError('Proverb not found.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProverb();
  }, [id, language]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://proverbs-api-1.onrender.com/api/proverbs/${formData.language}/${id}`,
        formData
      );
      navigate('/');
    } catch (err) {
      setError('Failed to update proverb.');
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-yellow-700">Edit Proverb</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Language (readonly) */}
        <div>
          <label className="block font-semibold mb-1">Language</label>
          <input
            type="text"
            value={formData.language}
            readOnly
            className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Text */}
        <div>
          <label className="block font-semibold mb-1">Text</label>
          <input
            type="text"
            name="proverb"
            value={formData.proverb}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>
        {/* category */}
        <div>
          <label className="block font-semibold mb-1">
            category (optional)
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Translation */}
        <div>
          <label className="block font-semibold mb-1">
            Translation (English)
          </label>
          <input
            type="text"
            name="translation"
            value={formData.translation}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Transliteration */}
        <div>
          <label className="block font-semibold mb-1">Transliteration</label>
          <input
            type="text"
            name="transliteration"
            value={formData.transliteration}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Meaning */}
        <div>
          <label className="block font-semibold mb-1">Meaning</label>
          <textarea
            name="meaning"
            value={formData.meaning}
            onChange={handleChange}
            rows="3"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700"
        >
          Save Changes
        </button>
      </form>

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mt-4 text-blue-600 hover:underline"
      >
        ← Back
      </button>
    </div>
  );
};

export default EditProverb;
