

import "./index.css";

const NotFound:React.FC= () => (
  <>
   
    <div data-testid="notFoundBody" className="not-found-body">
      <div data-testid="notFoundContainer" className="not-found-container">
        <img
          data-testid="notFoundImg"
          className="not-found-img"
          src="https://res.cloudinary.com/dwc2npg5b/image/upload/v1724044638/404-error_hi9and.jpg"
          alt="not found"
        />
        <h1 data-testid="notFoundHeading" className="not-found-heading">
          Page Not Found.
        </h1>
        <p data-testid="notFoundPara" className="not-found-para">
          We are sorry, the page you requested could not be found.
        </p>
      </div>
    </div>
  </>
);

export default NotFound;
