import { createContext, useContext, useState } from "react";


interface ProjectContextState {
   projects: DesignItem[];
   updateProjects: (item:DesignItem) => void;
}

const ProjectContext = createContext<ProjectContextState | undefined>(undefined);

const ProjectProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

   const [projects, setProjects] = useState<DesignItem[]>([]);

   const handleUpdateProjects = (item: DesignItem) => {
      setProjects(prev => [item, ...prev]);
   }

   return(
      <ProjectContext.Provider value={{ projects, updateProjects: handleUpdateProjects }}>
         {children}
      </ProjectContext.Provider>
   )
}

export const useProjectContext = () => {
   const context = useContext(ProjectContext);
   if(!context) {
      throw new Error("useProjectContext must be used within a ProjectProvider");
   }
   return context;
}

export default ProjectProvider;
