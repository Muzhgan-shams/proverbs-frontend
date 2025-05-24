import Home from './components/Home';
import ShowProverb from './components/ShowProverb';
import EditProverb from './components/EditProverb';
import CreateProverb from './components/CreateProverb';
import DeleteProverb from './components/DeleteProverb';
import OriginalProverbs from './components/OriginalProverbs';
import { Route, Routes } from 'react-router-dom';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proverbs/create" element={<CreateProverb />}></Route>
        <Route path="/:language/proverbs/:id" element={<ShowProverb />} />

        <Route
          path="/:language/proverbs/edit/:id"
          element={<EditProverb />}
        ></Route>
        <Route
          path=":language/proverbs/delete/:id"
          element={<DeleteProverb />}
        ></Route>
        <Route path="/proverbs/original" element={<OriginalProverbs />}></Route>
      </Routes>
    </div>
  );
};

export default App;
