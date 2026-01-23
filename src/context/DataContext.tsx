import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
    Project,
    WorkLog,
    Meeting,
    initialProjects,
    initialWorkLogs,
    initialMeetings,
    ProjectSet,
    initialProjectSets
} from '../data/mockData';

interface DataContextType {
    projects: Project[];
    workLogs: WorkLog[];
    meetings: Meeting[];
    projectSets: ProjectSet[];
    addProject: (project: Omit<Project, 'id' | 'meetings' | 'files' | 'progress'>) => void;
    updateProject: (id: string, updates: Partial<Project>) => void;
    deleteProject: (id: string) => void;
    addWorkLog: (log: Omit<WorkLog, 'id'>) => void;
    addMeeting: (meeting: Omit<Meeting, 'id'>) => void;
    addProjectSet: (set: Omit<ProjectSet, 'id'>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [workLogs, setWorkLogs] = useState<WorkLog[]>(initialWorkLogs);
    const [meetings, setMeetings] = useState<Meeting[]>(initialMeetings);
    const [projectSets, setProjectSets] = useState<ProjectSet[]>(initialProjectSets);

    const addProject = (projectData: Omit<Project, 'id' | 'meetings' | 'files' | 'progress'>) => {
        const newProject: Project = {
            ...projectData,
            id: Math.random().toString(36).substr(2, 9),
            progress: 0,
            meetings: 0,
            files: 0
        };
        setProjects(prev => [newProject, ...prev]);
    };

    const updateProject = (id: string, updates: Partial<Project>) => {
        setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    };

    const deleteProject = (id: string) => {
        setProjects(prev => prev.filter(p => p.id !== id));
    };

    const addWorkLog = (logData: Omit<WorkLog, 'id'>) => {
        const newLog: WorkLog = {
            ...logData,
            id: Math.random().toString(36).substr(2, 9),
        };
        setWorkLogs(prev => [newLog, ...prev]);
    };

    const addMeeting = (meetingData: Omit<Meeting, 'id'>) => {
        const newMeeting: Meeting = {
            ...meetingData,
            id: Math.random().toString(36).substr(2, 9),
        };
        setMeetings(prev => [newMeeting, ...prev]);
    };

    const addProjectSet = (setData: Omit<ProjectSet, 'id'>) => {
        const newSet: ProjectSet = {
            ...setData,
            id: Math.random().toString(36).substr(2, 9),
        };
        setProjectSets(prev => [newSet, ...prev]);
    };

    return (
        <DataContext.Provider value={{
            projects,
            workLogs,
            meetings,
            projectSets,
            addProject,
            updateProject,
            deleteProject,
            addWorkLog,
            addMeeting,
            addProjectSet
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
