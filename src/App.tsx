import { useState } from 'react';
import { ProjectSetManagement } from './components/ProjectSetManagement';
import { ProjectManagement } from './components/ProjectManagement';
import { PersonnelManagement } from './components/PersonnelManagement';
import { MeetingManagement } from './components/MeetingManagement';
import { ResourceManagement } from './components/ResourceManagement';
import { WorkLog } from './components/WorkLog';
import { CalendarQuery } from './components/CalendarQuery';
import { MapQuery } from './components/MapQuery';
import { SystemConfig } from './components/SystemConfig';
import {
  FolderKanban,
  Users,
  Calendar,
  FileText,
  Map,
  Settings,
  ClipboardList,
  CalendarDays,
  Layers
} from 'lucide-react';

export default function App() {
  const [activeModule, setActiveModule] = useState('projects');

  const modules = [
    { id: 'projectSets', name: '项目集管理', icon: Layers, component: ProjectSetManagement },
    { id: 'projects', name: '项目管理', icon: FolderKanban, component: ProjectManagement },
    { id: 'personnel', name: '人员管理', icon: Users, component: PersonnelManagement },
    { id: 'resources', name: '资料管理', icon: FileText, component: ResourceManagement },
    { id: 'worklog', name: '工作日志', icon: ClipboardList, component: WorkLog },
    { id: 'meetings', name: '会议记录', icon: Calendar, component: MeetingManagement },
    { id: 'calendar', name: '日历查询', icon: CalendarDays, component: CalendarQuery },
    { id: 'map', name: '地图查询', icon: Map, component: MapQuery },
    { id: 'settings', name: '系统配置', icon: Settings, component: SystemConfig },
  ];

  const ActiveComponent = modules.find(m => m.id === activeModule)?.component || ProjectManagement;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 左侧导航栏 */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="font-semibold text-xl text-gray-900">规划GIS系统</h1>
          <p className="text-sm text-gray-500 mt-1">数字化协同平台</p>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <li key={module.id}>
                  <button
                    onClick={() => setActiveModule(module.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeModule === module.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{module.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-medium">张</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">张工</p>
              <p className="text-xs text-gray-500 truncate">系统管理员</p>
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 overflow-hidden">
        <ActiveComponent />
      </div>
    </div>
  );
}
