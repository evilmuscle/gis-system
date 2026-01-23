import { useState } from 'react';
import { 
  Settings, 
  Database, 
  Shield, 
  FileText, 
  Users, 
  Map,
  Plus,
  Edit2,
  Trash2,
  Save,
  Clock
} from 'lucide-react';

interface ConfigSection {
  id: string;
  name: string;
  icon: any;
}

const configSections: ConfigSection[] = [
  { id: 'dictionary', name: '数据字典', icon: FileText },
  { id: 'roles', name: '角色权限', icon: Shield },
  { id: 'users', name: '用户管理', icon: Users },
  { id: 'gis', name: 'GIS服务', icon: Map },
  { id: 'backup', name: '数据备份', icon: Database },
  { id: 'logs', name: '操作日志', icon: Clock },
];

interface DictionaryItem {
  id: string;
  category: string;
  value: string;
  order: number;
}

const mockDictionary: DictionaryItem[] = [
  { id: '1', category: '项目类型', value: '城市总体规划', order: 1 },
  { id: '2', category: '项目类型', value: '控制性详细规划', order: 2 },
  { id: '3', category: '项目类型', value: '修建性详细规划', order: 3 },
  { id: '4', category: '项目类型', value: '专项规划', order: 4 },
  { id: '5', category: '会议类型', value: '项目启动会', order: 1 },
  { id: '6', category: '会议类型', value: '方案评审会', order: 2 },
  { id: '7', category: '会议类型', value: '专家咨询会', order: 3 },
  { id: '8', category: '人员职称', value: '高级规划师', order: 1 },
  { id: '9', category: '人员职称', value: '规划师', order: 2 },
  { id: '10', category: '人员职称', value: '助理规划师', order: 3 },
];

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

const mockRoles: Role[] = [
  {
    id: '1',
    name: '系统管理员',
    description: '拥有系统所有权限',
    permissions: ['系统配置', '用户管理', '项目管理', '人员管理', '会议管理', '资料管理', '地图查询'],
    userCount: 2,
  },
  {
    id: '2',
    name: '部门负责人',
    description: '管理本部门项目和人员',
    permissions: ['项目管理', '人员管理', '会议管理', '资料管理', '地图查询'],
    userCount: 5,
  },
  {
    id: '3',
    name: '普通员工',
    description: '参与项目和查看资料',
    permissions: ['项目查看', '会议查看', '资料查看', '地图查询'],
    userCount: 28,
  },
  {
    id: '4',
    name: '只读访客',
    description: '仅可查看公开信息',
    permissions: ['地图查询'],
    userCount: 3,
  },
];

interface LogEntry {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  ip: string;
}

const mockLogs: LogEntry[] = [
  {
    id: '1',
    user: '张工',
    action: '下载',
    target: '城市总规现状分析报告.pdf',
    time: '2024-05-28 14:32:18',
    ip: '192.168.1.101',
  },
  {
    id: '2',
    user: '李工',
    action: '编辑',
    target: '园区控制性详细规划',
    time: '2024-05-28 13:15:42',
    ip: '192.168.1.102',
  },
  {
    id: '3',
    user: '王工',
    action: '上传',
    target: '历史街区保护方案.pdf',
    time: '2024-05-28 11:08:33',
    ip: '192.168.1.103',
  },
  {
    id: '4',
    user: '系统管理员',
    action: '创建用户',
    target: '赵工',
    time: '2024-05-28 09:22:15',
    ip: '192.168.1.100',
  },
  {
    id: '5',
    user: '张工',
    action: '删除',
    target: '过期会议纪要',
    time: '2024-05-27 16:45:09',
    ip: '192.168.1.101',
  },
];

export function SystemConfig() {
  const [activeSection, setActiveSection] = useState('dictionary');
  const [selectedCategory, setSelectedCategory] = useState('项目类型');

  const categories = Array.from(new Set(mockDictionary.map(item => item.category)));
  const filteredDictionary = mockDictionary.filter(item => item.category === selectedCategory);

  const renderDictionary = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">数据字典管理</h3>
          <p className="text-sm text-gray-500 mt-1">管理系统下拉菜单和选项配置</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          新建字典项
        </button>
      </div>

      <div className="flex gap-6">
        <div className="w-48">
          <h4 className="text-sm font-medium text-gray-700 mb-3">字典分类</h4>
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white border border-gray-200 rounded-xl">
            <div className="px-6 py-4 border-b border-gray-200">
              <h4 className="font-medium text-gray-900">{selectedCategory}</h4>
            </div>
            <div className="p-6">
              <div className="space-y-2">
                {filteredDictionary.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 text-sm w-8">{item.order}</span>
                      <span className="font-medium text-gray-900">{item.value}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRoles = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">角色权限管理</h3>
          <p className="text-sm text-gray-500 mt-1">配置系统角色和权限</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          新建角色
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {mockRoles.map((role) => (
          <div key={role.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-semibold text-gray-900 text-lg mb-1">{role.name}</h4>
                <p className="text-sm text-gray-500">{role.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">权限列表</p>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((permission, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                    {permission}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">用户数量</span>
                <span className="font-medium text-gray-900">{role.userCount} 人</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGISConfig = () => (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900">GIS服务配置</h3>
        <p className="text-sm text-gray-500 mt-1">配置地图服务地址和参数</p>
      </div>

      <div className="max-w-3xl space-y-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h4 className="font-medium text-gray-900 mb-4">底图服务</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                服务类型
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>天地图</option>
                <option>高德地图</option>
                <option>WMS服务</option>
                <option>WMTS服务</option>
                <option>XYZ瓦片</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                服务地址
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://..."
                defaultValue="https://t0.tianditu.gov.cn/vec_w/wmts"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API密钥
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入API密钥"
              />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h4 className="font-medium text-gray-900 mb-4">PostGIS数据库</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  主机地址
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="localhost"
                  defaultValue="localhost"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  端口
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5432"
                  defaultValue="5432"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                数据库名称
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="gis_database"
                defaultValue="planning_gis"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  用户名
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="postgres"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  密码
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" />
            保存配置
          </button>
          <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            测试连接
          </button>
        </div>
      </div>
    </div>
  );

  const renderBackup = () => (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900">数据备份策略</h3>
        <p className="text-sm text-gray-500 mt-1">配置自动备份和恢复</p>
      </div>

      <div className="max-w-3xl space-y-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h4 className="font-medium text-gray-900 mb-4">自动备份设置</h4>
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                <span className="text-gray-900">启用自动备份</span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                备份周期
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>每日备份</option>
                <option>每周备份</option>
                <option>每月备份</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                备份时间
              </label>
              <input
                type="time"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue="02:00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                保留天数
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue="30"
                placeholder="30"
              />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">备份历史</h4>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              立即备份
            </button>
          </div>
          <div className="space-y-2">
            {[
              { date: '2024-05-28', size: '156 MB', status: '成功' },
              { date: '2024-05-27', size: '154 MB', status: '成功' },
              { date: '2024-05-26', size: '152 MB', status: '成功' },
            ].map((backup, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">backup_{backup.date}.sql</p>
                    <p className="text-sm text-gray-500">{backup.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {backup.status}
                  </span>
                  <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    恢复
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderLogs = () => (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900">操作日志</h3>
        <p className="text-sm text-gray-500 mt-1">查看系统操作审计日志</p>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <input
          type="date"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option>全部操作</option>
          <option>登录</option>
          <option>下载</option>
          <option>上传</option>
          <option>编辑</option>
          <option>删除</option>
        </select>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          查询
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                用户
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                目标对象
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                时间
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                IP地址
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockLogs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-600 text-sm font-medium">{log.user[0]}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{log.user}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    log.action === '删除' ? 'bg-red-100 text-red-700' :
                    log.action === '下载' ? 'bg-blue-100 text-blue-700' :
                    log.action === '上传' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {log.action}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-900">{log.target}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">{log.time}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">{log.ip}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="h-full flex bg-white">
      <div className="w-64 border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">系统配置</h2>
        </div>
        <nav className="p-4">
          <ul className="space-y-1">
            {configSections.map((section) => {
              const Icon = section.icon;
              return (
                <li key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{section.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="flex-1 overflow-auto p-8">
        {activeSection === 'dictionary' && renderDictionary()}
        {activeSection === 'roles' && renderRoles()}
        {activeSection === 'gis' && renderGISConfig()}
        {activeSection === 'backup' && renderBackup()}
        {activeSection === 'logs' && renderLogs()}
        {activeSection === 'users' && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">用户管理</h3>
            <p className="text-gray-500">用户管理功能开发中...</p>
          </div>
        )}
      </div>
    </div>
  );
}
