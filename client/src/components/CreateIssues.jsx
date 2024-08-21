import { useState } from 'react';
import { createIssue } from '../services/issueService.js';
import {  toast } from 'react-toastify';

 const CreateIssues = () => {
    const [issues, setIssues] = useState([]);
    const [newIssue, setNewIssue] = useState({ id: '', title: '', description: '' });
   
    const handleCreate = async (event) => {
        event.preventDefault();
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
  
  return (
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
  )
}

export default CreateIssues;