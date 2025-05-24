import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateProverb = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    language: 'dari',
    proverb: '',
    translation: '',
    transliteration: '',
    meaning: '',
    category: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://proverbs-api-1.onrender.com/api/proverbs/${formData.language}`,
        formData
      );
      navigate('/');
    } catch (err) {
      setError('Failed to create proverb.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg border border-gray-200 ">
      <h2 className="text-2xl font-bold mb-6 text-cyan-700">
        Create New Proverb
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Language selector */}
        <div>
          <label className="block font-semibold mb-1">Language</label>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="dari">Dari</option>
            <option value="pashto">Pashto</option>
          </select>
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

        {/* Category */}
        <div>
          <label className="block font-semibold mb-1">Category</label>
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

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-cyan-600 text-white py-2 px-4 rounded hover:bg-cyan-700"
        >
          Add Proverb
        </button>
      </form>

      {/* Back link */}
      <button
        onClick={() => navigate(-1)}
        className="mt-4 text-blue-600 hover:underline"
      >
        ← Back
      </button>
    </div>
  );
};

export default CreateProverb;
