import { useState } from 'react';
import { Search, Plus, Filter, User, Mail, Phone, Briefcase, Award, TrendingUp } from 'lucide-react';

interface Personnel {
  id: string;
  name: string;
  title: string;
  specialty: string;
  department: string;
  phone: string;
  email: string;
  projectCount: number;
  ongoingProjects: number;
  completedProjects: number;
  certifications: string[];
  avatar?: string;
}

const mockPersonnel: Personnel[] = [
  {
    id: '1',
    name: '侯某某',
    title: '科长',
    specialty: '城市规划',
    department: '规划科',
    phone: '138-1234-5678',
    email: 'zhang@planning.com',
    projectCount: 3,
    ongoingProjects: 1,
    completedProjects: 2,
    certifications: ['注册城市规划师', '注册建筑师'],
  },
  {
    id: '2',
    name: '徐某某',
    title: '副科长',
    specialty: '城市规划',
    department: '规划科',
    phone: '138-2345-6789',
    email: 'li@planning.com',
    projectCount: 2,
    ongoingProjects: 1,
    completedProjects: 1,
    certifications: ['注册城市规划师'],
  },
  {
    id: '3',
    name: '吴某某',
    title: '副科长',
    specialty: '工程建设',
    department: '建管科',
    phone: '138-3456-7890',
    email: 'wang@planning.com',
    projectCount: 15,
    ongoingProjects: 4,
    completedProjects: 11,
    certifications: ['注册城市规划师', '文物保护工程师'],
  },
  {
    id: '4',
    name: '熊某某',
    title: '科员',
    specialty: '工程建设',
    department: '建管科',
    phone: '138-4567-8901',
    email: 'zhao@planning.com',
    projectCount: 5,
    ongoingProjects: 2,
    completedProjects: 3,
    certifications: [],
  },
  {
    id: '5',
    name: '谷某某',
    title: '科员',
    specialty: '城市规划',
    department: '规划科',
    phone: '138-2345-6789',
    email: 'li@planning.com',
    projectCount: 2,
    ongoingProjects: 1,
    completedProjects: 1,
    certifications: ['注册城市规划师'],
  },
  {
    id: '6',
    name: '实某某',
    title: '科员',
    specialty: '工程建设',
    department: '建管科',
    phone: '138-2345-6789',
    email: 'li@planning.com',
    projectCount: 2,
    ongoingProjects: 1,
    completedProjects: 1,
    certifications: [],
  },
];

const departments = ['规划科', '建管科', '环保科', '城运科'];

export function PersonnelManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<Personnel | null>(null);

  const filteredPersonnel = mockPersonnel.filter(person =>
    person.name.includes(searchTerm) || person.department.includes(searchTerm)
  );

  if (selectedPerson) {
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedPerson(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ←
              </button>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-2xl font-medium">{selectedPerson.name[0]}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">{selectedPerson.name}</h2>
                  <p className="text-gray-500">{selectedPerson.title} · {selectedPerson.department}</p>
                </div>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              编辑信息
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="px-8 py-6">
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 mb-1">总项目数</p>
                    <p className="text-3xl font-semibold text-blue-900">{selectedPerson.projectCount}</p>
                  </div>
                  <Briefcase className="w-10 h-10 text-blue-600" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 mb-1">进行中</p>
                    <p className="text-3xl font-semibold text-green-900">{selectedPerson.ongoingProjects}</p>
                  </div>
                  <TrendingUp className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600 mb-1">已完成</p>
                    <p className="text-3xl font-semibold text-purple-900">{selectedPerson.completedProjects}</p>
                  </div>
                  <Award className="w-10 h-10 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 space-y-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">基本信息</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <Briefcase className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">职称</p>
                        <p className="font-medium text-gray-900">{selectedPerson.title}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">专业方向</p>
                        <p className="font-medium text-gray-900">{selectedPerson.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">联系电话</p>
                        <p className="font-medium text-gray-900">{selectedPerson.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">电子邮箱</p>
                        <p className="font-medium text-gray-900">{selectedPerson.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">参与项目</h3>
                  <div className="space-y-3">
                    {[
                      { name: '城市总体规划修编项目', status: '进行中', role: '项目负责人' },
                      { name: '园区控制性详细规划', status: '进行中', role: '项目成员' },
                      { name: '历史街区保护规划', status: '计划中', role: '项目成员' },
                    ].map((project, idx) => (
                      <div key={idx} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{project.name}</h4>
                          <span className={`px-3 py-1 rounded-full text-sm ${project.status === '进行中' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                            {project.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{project.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">资质证书</h3>
                  {selectedPerson.certifications.length > 0 ? (
                    <div className="space-y-2">
                      {selectedPerson.certifications.map((cert, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <Award className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-900">{cert}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">暂无证书信息</p>
                  )}
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">工作负荷</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">当前负荷</span>
                        <span className="text-sm font-medium text-gray-900">
                          {Math.round((selectedPerson.ongoingProjects / 5) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-full rounded-full ${selectedPerson.ongoingProjects > 3 ? 'bg-red-500' : 'bg-green-500'
                            }`}
                          style={{ width: `${Math.min((selectedPerson.ongoingProjects / 5) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      {selectedPerson.ongoingProjects > 3 ? '负荷较高，建议合理分配新项目' : '负荷正常，可承接新项目'}
                    </p>
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
            <h2 className="text-2xl font-semibold text-gray-900">人员管理</h2>
            <p className="text-sm text-gray-500 mt-1">共 {mockPersonnel.length} 名员工</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            新建人员
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索姓名、部门..."
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

      {/* 部门统计 */}
      <div className="px-8 py-6 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">部门人员负荷分析</h3>
        <div className="grid grid-cols-4 gap-4">
          {departments.map((dept) => {
            const deptPersonnel = mockPersonnel.filter(p => p.department === dept);
            const totalOngoing = deptPersonnel.reduce((sum, p) => sum + p.ongoingProjects, 0);
            return (
              <div key={dept} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4">
                <h4 className="font-medium text-gray-900 mb-2">{dept}</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-semibold text-gray-900">{deptPersonnel.length}</span>
                  <span className="text-sm text-gray-500">人</span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  进行中项目: {totalOngoing} 个
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="grid grid-cols-2 gap-6">
          {filteredPersonnel.map((person) => (
            <div
              key={person.id}
              onClick={() => setSelectedPerson(person)}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl font-medium">{person.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{person.name}</h3>
                  <p className="text-gray-600 text-sm">{person.title}</p>
                  <p className="text-gray-500 text-sm">{person.department}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">专业方向</p>
                  <p className="text-sm font-medium text-gray-900">{person.specialty}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">联系方式</p>
                  <p className="text-sm font-medium text-gray-900">{person.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">总项目: {person.projectCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600">进行中: {person.ongoingProjects}</span>
                </div>
              </div>

              {person.certifications.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {person.certifications.map((cert, idx) => (
                    <span key={idx} className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {cert}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
