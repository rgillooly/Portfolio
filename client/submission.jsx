import { React } from "react";

const handleSubmitProject = () => {
    const newProject = {
        projectName: projectName.value,
        projectDescription: projectDescription.value,
        projectLink: projectLink.value,
    }
}

const Submission = () => {

    return (
        <div>
<form>
    <label>Project Name:</label>
    <input name="projectName">Name</input>
    <label>Project Description:</label>
    <input name="projectDescription">Description</input>
    <label>Project Link:</label>
    <input name="projectLink">Link</input>
</form>
        </div>
    );
};

export default Submission;