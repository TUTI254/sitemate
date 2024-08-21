
  import CreateIssues from './components/CreateIssues.jsx';
  import UpdateIssues from './components/UpdateIssues.jsx';


  function App() {

    return (
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* title */}
          <h1 className="text-2xl font-bold text-gray-900 my-4 mx-2">Issues CRUD Challenge</h1>
          {/* Form to create new issues */}
          <CreateIssues/>
          {/* List of issues */}
         <UpdateIssues/>
        </div>

        </main>
      );
    }

    export default App;
