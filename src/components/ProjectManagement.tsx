import { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  Calendar as CalendarIcon,
  User,
  MapPin,
  FileText,
  Users,
  Clock,
  Tag,
  ChevronRight,
  Download,
  Upload
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { Project } from '../data/mockData';

const statusColors = {
  '进行中': 'bg-blue-100 text-blue-700',
  '已完成': 'bg-green-100 text-green-700',
  '暂停': 'bg-yellow-100 text-yellow-700',
  '计划中': 'bg-gray-100 text-gray-700',
};

export function ProjectManagement() {
  const { projects, addProject, meetings, workLogs } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showNewProject, setShowNewProject] = useState(false);

  // 新建项目表单状态
  const [newProjectData, setNewProjectData] = useState({
    name: '',
    leader: '张工',
    status: '计划中' as Project['status'],
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    location: { lat: 31.23, lng: 121.47, address: '上海市闵行区' },
    description: '',
    tags: [] as string[],
    participants: ['李工']
  });

  const handleAddProject = () => {
    if (!newProjectData.name) {
      alert('请输入项目名称');
      return;
    }
    addProject(newProjectData);
    setShowNewProject(false);
    // 重置表单
    setNewProjectData({
      name: '',
      leader: '张工',
      status: '计划中',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      location: { lat: 31.23, lng: 121.47, address: '上海市闵行区' },
      description: '',
      tags: [],
      participants: ['李工']
    });
  };

  const filteredProjects = projects.filter(project =>
    project.name.includes(searchTerm) || project.leader.includes(searchTerm)
  );

  if (showNewProject) {
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">新建项目</h2>
              <p className="text-sm text-gray-500 mt-1">填写项目基本信息</p>
            </div>
            <button
              onClick={() => setShowNewProject(false)}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              取消
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-8 py-6">
          <div className="max-w-3xl space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                项目名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newProjectData.name}
                onChange={(e) => setNewProjectData({ ...newProjectData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入项目名称"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  项目负责人 <span className="text-red-500">*</span>
                </label>
                <select
                  value={newProjectData.leader}
                  onChange={(e) => setNewProjectData({ ...newProjectData, leader: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>张工</option>
                  <option>李工</option>
                  <option>王工</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  项目状态
                </label>
                <select
                  value={newProjectData.status}
                  onChange={(e) => setNewProjectData({ ...newProjectData, status: e.target.value as Project['status'] })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>计划中</option>
                  <option>进行中</option>
                  <option>暂停</option>
                  <option>已完成</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  开始时间
                </label>
                <input
                  type="date"
                  value={newProjectData.startDate}
                  onChange={(e) => setNewProjectData({ ...newProjectData, startDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  结束时间
                </label>
                <input
                  type="date"
                  value={newProjectData.endDate}
                  onChange={(e) => setNewProjectData({ ...newProjectData, endDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                项目位置
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newProjectData.location.address}
                  onChange={(e) => setNewProjectData({ ...newProjectData, location: { ...newProjectData.location, address: e.target.value } })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="项目地址"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  地图选点
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                项目描述
              </label>
              <textarea
                rows={4}
                value={newProjectData.description}
                onChange={(e) => setNewProjectData({ ...newProjectData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入项目描述"
              />
            </div>

            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={handleAddProject}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                提供演示：创建项目
              </button>
              <button
                onClick={() => setShowNewProject(false)}
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
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ←
              </button>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">{selectedProject.name}</h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${statusColors[selectedProject.status]}`}>
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
                          {selectedProject.startDate} 至 {selectedProject.endDate}
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
                      <p className="text-gray-900">{selectedProject.description}</p>
                    </div>
                  </div>
                </div>

                {/* 项目纪事 */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">项目纪事</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-700">添加纪事</button>
                  </div>
                  <div className="space-y-4">
                    {workLogs.filter(log => log.projectName === selectedProject.name).map((log, idx, arr) => (
                      <div key={log.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                          {idx < arr.length - 1 && <div className="w-0.5 h-full bg-gray-200"></div>}
                        </div>
                        <div className="flex-1 pb-4">
                          <p className="text-sm text-gray-500">{log.startTime}</p>
                          <p className="font-medium text-gray-900 mt-1">{log.workName}</p>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{log.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 项目文件 */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">项目文件</h3>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      上传
                    </button>
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: '现状分析报告.pdf', size: '2.3 MB', date: '2024-05-20' },
                      { name: '规划方案文本.docx', size: '1.5 MB', date: '2024-05-18' },
                    ].map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.size}</p>
                          </div>
                        </div>
                        <Download className="w-4 h-4 text-gray-400 cursor-pointer" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* 项目团队 */}
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

                {/* 相关会议 */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">相关会议</h3>
                  <div className="space-y-3">
                    {meetings.filter(m => m.relatedProject === selectedProject.name).map(m => (
                      <div key={m.id} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-900">{m.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{m.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">项目管理</h2>
            <p className="text-sm text-gray-500 mt-1">共 {projects.length} 个项目</p>
          </div>
          <button
            onClick={() => setShowNewProject(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            新建项目
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索项目名称、负责人..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            筛选
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="grid grid-cols-1 gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm ${statusColors[project.status]}`}>
                        {project.status}
                      </span>
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 underline-clamp-2">{project.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>

              <div className="grid grid-cols-4 gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">负责人</p>
                    <p className="text-sm font-medium text-gray-900">{project.leader}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">项目周期</p>
                    <p className="text-sm font-medium text-gray-900">
                      {project.startDate} ~ {project.endDate || '未定'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-600 h-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
