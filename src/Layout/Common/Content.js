import React from "react"

function ContentLayer({children, nav=null}) {

    return (
    <React.Fragment>
        {nav}
        <div className="content">
            {children}
        </div>
    </React.Fragment>

    )
}

export function Heading({title=null}) { 
    return title ?
    (<h1>{title}</h1>)
    : null
}

export default ContentLayer