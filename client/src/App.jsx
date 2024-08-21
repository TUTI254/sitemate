  import { useState, useEffect } from 'react';
  import { createIssue, getIssues, updateIssue, deleteIssue } from './services/issueService.js';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import Modal from 'react-modal';

  Modal.setAppElement('#root'); 

  function App() {
    const [issues, setIssues] = useState([]);
    const [newIssue, setNewIssue] = useState({ id: '', title: '', description: '' });
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editIssue, setEditIssue] = useState(null);

    useEffect(() => {
      loadIssues();
    }, []);

    const loadIssues = async () => {
      const data = await getIssues();
      if (Array.isArray(data)) {
        setIssues(data);
      } else {
        console.error('Expected an array, but got:', data);
      }
    };

    const handleCreate = async (event) => {
      event.preventDefault();
      // Ensure fields are not empty
      if (!newIssue.title || !newIssue.description) {
        toast.error('Title and description are required.');
        return;
      }
    
      try {
        const createdIssue = await createIssue(newIssue);
        setIssues([...issues, createdIssue]);
        setNewIssue({ id: '', title: '', description: '' });
        toast.success('Issue created successfully!');
      } catch (error) {
        console.error('Failed to create issue:', error);
        toast.error('Failed to create issue.');
      }
    };
    

    const handleChange = (event) => {
      const { name, value } = event.target;
      setNewIssue({ ...newIssue, [name]: value });
    };

    const handleEditClick = (issue) => {
      setEditIssue(issue);
      setModalIsOpen(true);
    };

    const handleUpdate = async (event) => {
      event.preventDefault();
      try {
        const updatedIssue = await updateIssue(editIssue.id, editIssue);
        setIssues(issues.map(issue => (issue.id === updatedIssue.id ? updatedIssue : issue)));
        setModalIsOpen(false);
        toast.success('Issue updated successfully!');
      } catch (error) {
        toast.error('Failed to update issue.',error);
      }
    };

    const handleDelete = async (id) => {
      try {
        await deleteIssue(id);
        setIssues(issues.filter(issue => issue.id !== id));
        toast.success('Issue deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete issue.',error);
      }
    };

    const handleModalChange = (event) => {
      const { name, value } = event.target;
      setEditIssue({ ...editIssue, [name]: value });
    };

    return (
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Form to create new issues */}
          <form
            onSubmit={handleCreate}
            className="bg-white rounded-lg p-6 shadow-md mb-8"
          >
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Create Issue</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Enter details for the new issue.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                      Title
                    </label>
                    <div className="mt-2">
                      <input
                        id="title"
                        name="title"
                        type="text"
                        value={newIssue.title}
                        onChange={handleChange}
                        placeholder="Issue title"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                      Description
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        value={newIssue.description}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Describe the issue"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>

          {/* List of issues */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Issues List</h2>
            <div className="mt-4 space-y-4">
              {issues.map(issue => (
                <div key={issue.id} className="p-4 border rounded-lg shadow-sm bg-gray-50 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{issue.title}</h3>
                    <p className="mt-2 text-sm text-gray-700">{issue.description}</p>
                  </div>
                  <div className="ml-4 flex space-x-2">
                    <button
                      onClick={() => handleEditClick(issue)}
                      className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(issue.id)}
                      className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal for updating issue */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="bg-white rounded-lg p-6 shadow-md"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <h2 className="text-base font-semibold leading-7 text-gray-900">Update Issue</h2>
          <form onSubmit={handleUpdate}>
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                  Title
                </label>
                <div className="mt-2">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={editIssue?.title || ''}
                    onChange={handleModalChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={editIssue?.description || ''}
                    onChange={handleModalChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
                  type="button"
                  onClick={() => setModalIsOpen(false)}
                  className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </form>
          </Modal>

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </main>
      );
    }

    export default App;
