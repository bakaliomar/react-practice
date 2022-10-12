import { useState } from "react";
import { Project } from "./Project";
import PropTypes from "prop-types";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

export interface Props {
  projects: Project[];
  onSave: (project: Project) => void;
}

function ProjectList({ projects, onSave }: Props) {
  const [projectBeingEdited, setProjectBeingEdited] = useState({});

  const handleEdit = (project: Project) => {
    setProjectBeingEdited(project);
  };

  const handleCancel = () => {
    setProjectBeingEdited({});
  }
  return (
    <div className="row">
      {projects.map((project: Project) =>(
        <div key={project.id} className="cols-sm">
          {
            project === projectBeingEdited ? (
              <ProjectForm onCancel={handleCancel} onSave={onSave}/>
            ) : (
              <ProjectCard project={project} onEdit={handleEdit}/>
            )
          }
        </div>
      ))}
    </div>
  );
}

ProjectList.prototype = {
  projects: PropTypes.arrayOf(PropTypes.instanceOf(Project)).isRequired,
}

export default ProjectList;