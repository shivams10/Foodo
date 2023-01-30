import NotFoundImage from "../../assets/images/notFound.gif"
import PageHeading from "../../components/pageHeading";
import "./index.css"
const NotFound = () => {
  return (
    <><PageHeading>404 Page not found....</PageHeading>
    <div className="not-found-page">
        <img src={NotFoundImage} alt=""/> 
    </div>
    </>
  )
}

export default NotFound;