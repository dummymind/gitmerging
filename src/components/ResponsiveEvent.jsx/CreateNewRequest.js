import FormInputs from './CreateFormInput.js'
import useFormContext from "./useFormContext"
import Footer from '../Footer'
import RequestHeader from '../ResponsiveEvent.jsx/RequestHeader.js'
import { Navigation } from '../ResponsiveEvent.jsx/Navigation'
const CreateNewRequest = () => {

    const {
        page,
        setPage,
        eventFormData,
        setEventFormData,
        title,
        canSubmit,
        fetchEventTypes,fetchEventFormat,fetchLastVisit,fetchAssociateAtEvent,fetchPhonecode,fetchCountry,fetchState,fetchCity
    } = useFormContext()

  

    const handleSubmit = e => {
        e.preventDefault()
        console.log(JSON.stringify(eventFormData))
    }


    const content = (
        <form className="form flex-col" onSubmit={handleSubmit}>

            <div>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
                    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>

                <div className='container-fluid-custom'>
                    <RequestHeader />
                    <div className="container-fluid">
                        <div className="row m-2 mb-5">
                            <div className="col-md-2">
                                <Navigation />
                            </div>
                            <div className="col-md-10">
                            <FormInputs />
                            </div>


                            
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>

        </form>
    )

    return content
}
export default CreateNewRequest