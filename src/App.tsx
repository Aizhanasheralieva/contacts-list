import Layout from "./components/Layout/Layout.tsx";
import { Route, Routes } from "react-router-dom";
import TheListOfContacts from "./components/TheListOfContacts/TheListOfContacts.tsx";
import AddNewContactForm from "./components/AddNewContactForm/AddNewContactForm.tsx";

const App = () => {
  return (
    <>
      <Layout>
        <TheListOfContacts />
        <Routes>
          <Route path="/addNewContact" element={<AddNewContactForm />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
