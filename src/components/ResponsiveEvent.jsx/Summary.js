
import calendaricon from '../../images/vector_x2.svg'
import RequestHeader from './RequestHeader';
import EventSideBar from './EventSideBar';
import Header from '../Header';
import Footer from '../Footer';

function Summary()
{
    return (
        <div>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>
            <div className='container-fluid-custom'>
              <Header/>
              <RequestHeader/>
            <div className="container-fluid">
              <div className="row m-2 mb-5">
               <EventSideBar/>
              <div className="col-md-9 mb-5">
               <div class=" bg-light rounded p-3 mt-3">
                    <div className="file-drop-area">
                    <span className="choose-file-button">+</span>
                    <span className="file-message col-md-6">
                             Click here to upload files <div>or drag &amp; drop files in this zone</div>
                    </span>

                    <input className="file-input" type="file" multiple="" />
                     </div>
                </div>
            </div>
            </div>
            </div>
            <Footer />
            </div>
        </div>
    );
}

export default Summary;