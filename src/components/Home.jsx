import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import axios from 'axios';

const Home = () => {
  const [proverbs, setProverbs] = useState([]);
  const [language, setLanguage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [randomProverb, setRandomProverb] = useState(null);
  const [randomLang, setRandomLang] = useState(null);

  const fetchProverbs = async (lang) => {
    try {
      setLoading(true);
      setLanguage(lang);
      setRandomProverb(null);
      const response = await axios.get(
        `https://proverbs-api-1.onrender.com/api/proverbs/${lang}`
      );
      setProverbs(response.data);
    } catch (error) {
      console.error('Error fetching proverbs:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const loadRandomProverb = async () => {
      const langs = ['dari', 'pashto'];
      const lang = langs[Math.floor(Math.random() * langs.length)];
      setRandomLang(lang);
      try {
        const res = await axios.get(
          `https://proverbs-api-1.onrender.com/api/proverbs/${lang}`
        );
        const data = res.data;
        if (data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          setRandomProverb(data[randomIndex]);
        }
      } catch (err) {
        console.error('Failed to load random proverb:', err);
      }
    };

    loadRandomProverb();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen ">
      <div className="p-6 max-w-3xl mx-auto ">
        {/* Language Proverbs */}
        <h1 className="text-4xl font-bold mb-10 text-center">
          Afghan Proverbs
        </h1>

        <div className="flex gap-4 mb-6 justify-center flex-wrap">
          <div>
            <Link to="/proverbs/original">
              <button className="bg-violet-500 text-white px-4 py-2 rounded hover:bg-violet-700">
                All Proverbs
              </button>
            </Link>
          </div>
          <button
            onClick={() => fetchProverbs('dari')}
            className="bg-amber-600 text-white   px-4 py-2 rounded hover:bg-amber-700 "
          >
            Dari Proverbs
          </button>
          <button
            onClick={() => fetchProverbs('pashto')}
            className="bg-teal-600 text-white  px-4 py-2 rounded hover:bg-teal-700"
          >
            Pashto Proverbs
          </button>
          <div>
            <Link to="/proverbs/create">
              <button className="bg-slate-600 text-white px-4 py-2 rounded  hover:bg-slate-700">
                Add New
              </button>
            </Link>
          </div>
        </div>

        {loading ? (
          <p>Loading {language} proverbs...</p>
        ) : (
          <>
            {proverbs.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2 capitalize">
                  {language} Proverbs
                </h2>
                <ul className="space-y-2 mb-4">
                  {proverbs.map((proverb) => (
                    <li
                      key={proverb.id}
                      className="p-4  md:text-xl bg-gray-200 border border-gray-400 rounded shadow-[0_2px_6px_rgba(16,185,129,0.1)] flex justify-between items-center transition-transform duration-200 hover:scale-105 my-3"
                    >
                      <p>
                        {proverb.proverb}
                        <br />
                        <small className="text-gray-600 italic">
                          💡 {proverb.meaning}
                        </small>
                      </p>

                      <div className="flex justify-center gap-x-4">
                        <Link to={`/${language}/proverbs/${proverb.id}`}>
                          <BsInfoCircle className="text-2xl text-blue-800" />
                        </Link>
                        <Link to={`/${language}/proverbs/edit/${proverb.id}`}>
                          <AiOutlineEdit className="text-2xl text-yellow-800" />
                        </Link>
                        <Link to={`/${language}/proverbs/delete/${proverb.id}`}>
                          <MdOutlineDelete className="text-2xl text-red-800" />
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
        {/* Random Proverb */}
        {randomProverb && (
          <div className="mb-8 mt-16 p-4 border-l-4 border-yellow-400 bg-yellow-50 rounded shadow">
            <h2 className="md:text-3xl font-semibold mb-1">
              Random {randomLang} Proverb
            </h2>
            <small>✨{randomProverb.category}</small>
            <p className="text-gray-800 mb-1">{randomProverb.proverb}</p>

            {randomProverb.transliteration && (
              <p className="text-gray-600 italic mb-1">
                "{randomProverb.transliteration}"
              </p>
            )}
            {randomProverb.translation && (
              <p className="text-gray-600 italic">
                "{randomProverb.translation}"
              </p>
            )}

            {randomProverb.meaning && (
              <p className="text-sm mt-2 text-gray-500">
                Meaning: {randomProverb.meaning}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
