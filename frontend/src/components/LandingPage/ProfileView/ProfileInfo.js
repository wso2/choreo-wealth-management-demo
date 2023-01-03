export const ProfileInfo = () => {
  return (
    <div className="card py-1">
      <div className="card-body">
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Full Name</h6>
          </div>
          <div className="col-sm-9 text-secondary">John Doe</div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Email</h6>
          </div>
          <div className="col-sm-9 text-secondary">john_doe@email.com</div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Phone</h6>
          </div>
          <div className="col-sm-9 text-secondary">(239) 816-9029</div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Total Assets</h6>
          </div>
          <div className="col-sm-9 text-secondary">$ 30,000.00</div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Total Liabilities</h6>
          </div>
          <div className="col-sm-9 text-secondary">$ 10,000.00</div>
        </div>
      </div>
    </div>
  );
};
