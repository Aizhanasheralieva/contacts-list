const AddNewContactForm = () => {
  return (
    <div className="container mb-5">
      <h1 className="my-4">Add new contact</h1>
      <div className="d-flex justify-content-lg-start">
        <form className="p-4 w-50 border rounded shadow-lg bg-light ">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Enter full name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              className="form-control"
              placeholder="Enter phone number"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter email address"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="photo" className="form-label">
              Photo
            </label>
            <input
              type="url"
              id="photo"
              className="form-control"
              placeholder="Enter photo URL"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="photoPreview" className="form-label">
              Photo preview
            </label>
              <img
                src=""
                alt="Photo preview"
                className="rounded"
                style={{ maxWidth: "100px" }}
              />
          </div>
          <div className="d-flex justify-content-left">
            <button type="submit" className="btn btn-primary me-3">
              Save
            </button>
            <button type="submit" className="btn btn-primary">
              Back to contacts
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewContactForm;
