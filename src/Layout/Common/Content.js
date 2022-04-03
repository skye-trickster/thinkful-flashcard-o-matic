import React from "react"

function ContentLayer({children, nav=null}) {

    return (
    <React.Fragment>
        { nav }
        <div className="content">
            { children }
        </div>
    </React.Fragment>

    )
}

export default ContentLayer