import "./index.css"

const PageHeading = (props) => {
  return (
    <div className="heading-container">
        <h1>{props.children}</h1>
    </div>
  )
}

export default PageHeading;