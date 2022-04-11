import React from "react"
import GitHub from "../images/GitHub-Light.png"

function FooterLink({ to, newWindow = false, imageLink = "", imageAlt, name }) {
    return (
        <div className="d-inline">
            <a className="nav-link text-white d-flex flex-column" href={to} target={newWindow ? "_blank" : "_self"} rel="noreferrer noopener" >
                {imageLink !== "" ? <img src={imageLink} className="h-1" alt={imageAlt} /> : null}
                <p className="m-0">{name}</p>
            </a>
        </div>
    )
    //return <a href={to} target={newWindow ? "_blank" : "_self"} rel="noreferrer noopener">{children} </a>
}

function Footer() {
    //imageLink={GitHub}
    const externalLink = "https://github.com/skye-trickster/thinkful-flashcard-o-matic.git"

    return (
        <footer className="bg-dark mt-2 justify-self-end">
            <div className="col-12 d-flex justify-content-center">
                <FooterLink to={externalLink} newWindow imageLink={GitHub} imageAlt="GitHub" name="Repository" />
            </div>

        </footer>
    )
}

export default Footer