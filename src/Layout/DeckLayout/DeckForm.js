import React, {useState} from "react"

function DeckForm({submitFunction, cancelFunction, data={"name":"", "description":""}, edit=false}) {
    const [formData, setFormData] = useState(data)
    
    function updateData (event) {
        setFormData({
            ...formData, 
            [event.target.name] : event.target.value
        })
    }

    function submitHandler (event) {
        event.preventDefault();
        submitFunction(formData);
    }

    function cancelHandler (event) {
        event.preventDefault()
        cancelFunction()
    }

    return (
        <div>
            <h1>{edit ? "Edit Deck" : "Create Deck"}</h1>
            <form onSubmit={submitHandler}>
                <label className="d-block mb-3" htmlFor="name">
                    <span className="d-block">Name</span>
                    <input className="w-100" name="name" type="text" onChange={updateData} value={formData.name} required placeholder="Deck Name"/>
                </label>

                <label className="d-block mb-3" htmlFor="description">
                    <span className="d-block">Description</span>
                    <textarea className="w-100" name="description" onChange={updateData} value={formData.description} type="text" placeholder="Brief description of the deck"/>
                </label>

                <button onClick={cancelHandler} className="btn btn-secondary mr-3">Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default DeckForm