import { useState } from 'react';
import {
    Search,
    Plus,
    ArrowLeft,
    ChevronRight,
    FolderKanban,
    Layers,
    User,
    Clock,
    PieChart,
    Download,
    Upload,
    Tag,
    Filter,
    Calendar as CalendarIcon,
    MapPin,
    FileText,
    Users,
    MessageSquare
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { ProjectSet, Project } from '../data/mockData';

const statusColors = {
    '进行中': 'bg-blue-100 text-blue-700 font-medium',
    '已完成': 'bg-green-100 text-green-700 font-medium',
    '计划中': 'bg-gray-100 text-gray-700 font-medium',
};

const projectStatusColors = {
    '进行中': 'bg-blue-50 text-blue-600',
    '已完成': 'bg-green-50 text-green-600',
    '暂停': 'bg-yellow-50 text-yellow-600',
    '计划中': 'bg-gray-50 text-gray-600',
};

export function ProjectSetManagement() {
    const { projectSets, projects, addProjectSet, meetings, workLogs } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSet, setSelectedSet] = useState<ProjectSet | null>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [showNewSetForm, setShowNewSetForm] = useState(false);

    // Filtered project sets
    const filteredSets = projectSets.filter(set =>
        set.name.includes(searchTerm) || set.responsiblePerson.includes(searchTerm)
    );

    // Detail view projects
    const setProjects = selectedSet
        ? projects.filter(p => selectedSet.projectIds.includes(p.id))
        : [];

    const averageProgress = setProjects.length > 0
        ? Math.round(setProjects.reduce((acc, p) => acc + p.progress, 0) / setProjects.length)
        : 0;

    if (showNewSetForm) {
        return (
            <div className="h-full flex flex-col bg-white">
                <div className="border-b border-gray-200 px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900">新建项目集</h2>
                            <p className="text-sm text-gray-500 mt-1">组合多个相关项目进行统一管理</p>
                        </div>
                        <button
                            onClick={() => setShowNewSetForm(false)}
                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            返回列表
                        </button>
                    </div>
                </div>
                <div className="flex-1 overflow-auto px-8 py-6">
                    <div className="max-w-3xl  space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">项目集名称 *</label>
                            <input
                                type="text"
                                placeholder="例如：2026重大项目集"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">负责人</label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                                <option>张工</option>
                                <option>李工</option>
                                <option>王工</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">项目集描述</label>
                            <textarea
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="请输入项目集的目标与范围..."
                            />
                        </div>
                        <div className="pt-6 border-t border-gray-200 flex gap-3">
                            <button
                                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                                onClick={() => setShowNewSetForm(false)}
                            >
                                提供演示：创建项目集
                            </button>
                            <button
                                onClick={() => setShowNewSetForm(false)}
                                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                            >
                                取消
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (selectedProject) {
        return (
            <div className="h-full flex flex-col bg-white">
                <div className="border-b border-gray-200 px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2 text-gray-500 hover:text-gray-900"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span className="text-sm font-medium">返回项目集</span>
                            </button>
                            <div className="h-6 w-px bg-gray-200 mx-2"></div>
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900">{selectedProject.name}</h2>
                                <div className="flex items-center gap-3 mt-2">
                                    <span className={`px-3 py-1 rounded-full text-sm ${projectStatusColors[selectedProject.status] || 'bg-gray-100 text-gray-700'}`}>
                                        {selectedProject.status}
                                    </span>
                                    {selectedProject.tags.map((tag) => (
                                        <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            编辑项目
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-auto">
                    <div className="px-8 py-6">
                        <div className="grid grid-cols-4 gap-6 mb-8">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-blue-600 mb-1">项目进度</p>
                                        <p className="text-3xl font-semibold text-blue-900">{selectedProject.progress}%</p>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                                        <Clock className="w-6 h-6 text-blue-700" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-green-600 mb-1">相关会议</p>
                                        <p className="text-3xl font-semibold text-green-900">{selectedProject.meetings}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                                        <CalendarIcon className="w-6 h-6 text-green-700" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-purple-600 mb-1">项目文件</p>
                                        <p className="text-3xl font-semibold text-purple-900">{selectedProject.files}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                                        <FileText className="w-6 h-6 text-purple-700" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-orange-600 mb-1">参与人员</p>
                                        <p className="text-3xl font-semibold text-orange-900">{selectedProject.participants.length + 1}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
                                        <Users className="w-6 h-6 text-orange-700" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-2 space-y-6">
                                <div className="bg-white border border-gray-200 rounded-xl p-6">
                                    <h3 className="font-semibold text-gray-900 mb-4">基本信息</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-start gap-3">
                                            <User className="w-5 h-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-gray-500">项目负责人</p>
                                                <p className="font-medium text-gray-900">{selectedProject.leader}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CalendarIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-gray-500">项目周期</p>
                                                <p className="font-medium text-gray-900">
                                                    {selectedProject.startDate} 至 {selectedProject.endDate || '未定'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 col-span-2">
                                            <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-gray-500">项目位置</p>
                                                <p className="font-medium text-gray-900">{selectedProject.location.address}</p>
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="text-sm text-gray-500 mb-1">项目描述</p>
                                            <p className="text-gray-900 text-sm">{selectedProject.description}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-semibold text-gray-900">项目纪事</h3>
                                    </div>
                                    <div className="space-y-4">
                                        {workLogs.filter(log => log.projectName === selectedProject.name).map((log, idx, arr) => (
                                            <div key={log.id} className="flex gap-4">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                                    {idx < arr.length - 1 && <div className="w-0.5 h-full bg-gray-200"></div>}
                                                </div>
                                                <div className="flex-1 pb-4">
                                                    <p className="text-xs text-gray-500">{log.startTime}</p>
                                                    <p className="text-sm font-semibold text-gray-900 mt-1">{log.workName}</p>
                                                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{log.content}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white border border-gray-200 rounded-xl p-6">
                                    <h3 className="font-semibold text-gray-900 mb-4">项目团队</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">
                                                {selectedProject.leader[0]}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">{selectedProject.leader}</p>
                                                <p className="text-xs text-gray-500">负责人</p>
                                            </div>
                                        </div>
                                        {selectedProject.participants.map((p, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs">
                                                    {p[0]}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900">{p}</p>
                                                    <p className="text-xs text-gray-500">成员</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-xl p-6">
                                    <h3 className="font-semibold text-gray-900 mb-4">相关会议</h3>
                                    <div className="space-y-3">
                                        {meetings.filter(m => m.relatedProject === selectedProject.name).map(m => (
                                            <div key={m.id} className="p-3 bg-gray-50 rounded-lg">
                                                <p className="text-sm font-medium text-gray-900">{m.title}</p>
                                                <p className="text-xs text-gray-500 mt-1">{m.date}</p>
                                            </div>
                                        ))}
                                        {meetings.filter(m => m.relatedProject === selectedProject.name).length === 0 && (
                                            <p className="text-xs text-gray-400 italic">暂无关联会议</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (selectedSet) {
        return (
            <div className="h-full flex flex-col bg-white font-sans">
                <div className="border-b border-gray-100 px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSelectedSet(null)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-400" />
                            </button>
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900 leading-tight">{selectedSet.name}</h2>
                                <div className="flex items-center gap-3 mt-1.5">
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs ${statusColors[selectedSet.status]}`}>
                                        {selectedSet.status}
                                    </span>
                                    <p className="text-sm text-gray-500 font-medium flex items-center gap-1">
                                        <Layers className="w-4 h-4" />
                                        包含 {setProjects.length} 个子项目
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-right mr-4">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">总体平均进度</p>
                                <p className="text-xl font-black text-blue-600">{averageProgress}%</p>
                            </div>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium flex items-center gap-2">
                                <Plus className="w-4 h-4" />
                                添加子项目
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-auto bg-gray-50/30 p-8">
                    <div className="max-w-6xl mx-auto space-y-6">
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                            <h3 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wider text-gray-400">项目集概览</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">{selectedSet.description}</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <h3 className="text-sm font-semibold text-gray-900 mt-4 mb-2 flex items-center gap-2">
                                <FolderKanban className="w-4 h-4 text-blue-500" />
                                子项目列表
                            </h3>
                            {setProjects.map(project => (
                                <div
                                    key={project.id}
                                    onClick={() => setSelectedProject(project)}
                                    className="bg-white border border-gray-100 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{project.name}</h4>
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${projectStatusColors[project.status]}`}>
                                                        {project.status}
                                                    </span>
                                                    {project.tags.map(tag => (
                                                        <span key={tag} className="px-2 py-0.5 bg-gray-50 text-gray-500 rounded-full text-xs">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6 text-sm text-gray-500">
                                                <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {project.leader}</span>
                                                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {project.startDate} ~ {project.endDate || '未定'}</span>
                                                <span className="flex items-center gap-1.5 font-bold text-gray-900"><PieChart className="w-4 h-4 text-gray-400" /> {project.progress}%</span>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                                    </div>
                                    <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${project.progress}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-white font-sans ">
            <div className="border-b border-gray-200 px-8 py-8 bg-gray-50/20 ">
                <div className="flex items-center justify-between mb-8 ">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">项目集管理</h2>
                        <p className="text-sm text-gray-500 mt-1">跨项目协同，全业务场景统筹追踪</p>
                    </div>
                    <button
                        onClick={() => setShowNewSetForm(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 shadow-sm font-medium"
                    >
                        <Plus className="w-4 h-4" />
                        新建项目集
                    </button>
                </div>

                <div className="relative max-w-xl">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="搜索项目集名称、负责局室..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-auto px-8 py-8 bg-gray-50/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto ">
                    {filteredSets.map((set) => {
                        const setProjectsCount = set.projectIds.length;
                        return (
                            <div
                                key={set.id}
                                onClick={() => setSelectedSet(set)}
                                className="rounded-xl bg-white border border-gray-200 rounded-2xl p-8 hover:border-blue-400 hover:shadow-xl transition-all cursor-pointer relative group overflow-hidden"
                            >
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="p-3 bg-blue-50 rounded-xl flex-shrink-0">
                                        <Layers className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {set.name}
                                    </h3>
                                </div>


                                <p className="text-sm text-gray-500 line-clamp-2 mb-6 leading-relaxed">
                                    {set.description}
                                </p>

                                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                                    <div className="flex items-center gap-6">
                                        <div className="text-center">
                                            <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5 tracking-wider">负责人</p>
                                            <p className="text-s font-semibold text-gray-800">{set.responsiblePerson}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5 tracking-wider">项目数</p>
                                            <p className="text-s font-semibold text-gray-800">{setProjectsCount}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                        进入管理 <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>

                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -mr-12 -mt-12 group-hover:bg-blue-500/10 transition-colors"></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
