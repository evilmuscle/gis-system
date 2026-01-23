import { useState } from 'react';
import { Plus, Search, Filter, FileText, Download, Eye, Tag, Clock, User, Folder } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: '文本' | '图形' | '成果' | '规范' | '模板';
  project: string | null;
  uploadedBy: string;
  uploadDate: string;
  size: string;
  tags: string[];
  phase?: string;
  isPublic: boolean;
}

const mockDocuments: Document[] = [
  {
    id: '1',
    name: '规划说明书.pdf',
    type: '成果',
    project: '城市中心区控制性详细规划',
    uploadedBy: '张伟',
    uploadDate: '2024-03-15',
    size: '2.3 MB',
    tags: ['成果文件', '说明书'],
    phase: '方案设计',
    isPublic: false
  },
  {
    id: '2',
    name: '用地规划图.dwg',
    type: '图形',
    project: '城市中心区控制性详细规划',
    uploadedBy: '李明',
    uploadDate: '2024-03-10',
    size: '15.6 MB',
    tags: ['CAD图纸', '用地规划'],
    phase: '方案设计',
    isPublic: false
  },
  {
    id: '3',
    name: '城乡规划编制办法.pdf',
    type: '规范',
    project: null,
    uploadedBy: '王芳',
    uploadDate: '2024-01-20',
    size: '5.8 MB',
    tags: ['技术规范', '国家标准'],
    isPublic: true
  },
  {
    id: '4',
    name: '现状调研报告.docx',
    type: '文本',
    project: '城市中心区控制性详细规划',
    uploadedBy: '刘强',
    uploadDate: '2024-02-20',
    size: '1.8 MB',
    tags: ['调研资料'],
    phase: '现场调研',
    isPublic: false
  },
  {
    id: '5',
    name: '规划方案模板.pptx',
    type: '模板',
    project: null,
    uploadedBy: '陈静',
    uploadDate: '2024-01-10',
    size: '3.2 MB',
    tags: ['PPT模板', '汇报模板'],
    isPublic: true
  },
  {
    id: '6',
    name: '生态廊道设计图.shp',
    type: '图形',
    project: '滨江生态廊道规划设计',
    uploadedBy: '李明',
    uploadDate: '2024-03-25',
    size: '8.4 MB',
    tags: ['GIS数据', 'SHP文件'],
    phase: '方案设计',
    isPublic: false
  },
];

export function DocumentManagement() {
  const [documents] = useState<Document[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const getTypeColor = (type: string) => {
    switch (type) {
      case '文本': return 'bg-blue-100 text-blue-700';
      case '图形': return 'bg-purple-100 text-purple-700';
      case '成果': return 'bg-green-100 text-green-700';
      case '规范': return 'bg-orange-100 text-orange-700';
      case '模板': return 'bg-pink-100 text-pink-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    return <FileText className="w-5 h-5" />;
  };

  const filteredDocuments = documents.filter(doc => {
    if (filterType !== 'all' && doc.type !== filterType) return false;
    if (searchTerm && !doc.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">资料管理</h2>
            <p className="text-sm text-gray-500 mt-1">集中管理项目资料和公共文档</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-5 h-5" />
            上传资料
          </button>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索资料名称、项目..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5" />
            高级筛选
          </button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex gap-4 items-center">
          <span className="text-sm font-medium text-gray-700">快速筛选：</span>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filterType === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              全部 ({documents.length})
            </button>
            <button
              onClick={() => setFilterType('文本')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filterType === '文本' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              文本 ({documents.filter(d => d.type === '文本').length})
            </button>
            <button
              onClick={() => setFilterType('图形')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filterType === '图形' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              图形 ({documents.filter(d => d.type === '图形').length})
            </button>
            <button
              onClick={() => setFilterType('成果')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filterType === '成果' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              成果 ({documents.filter(d => d.type === '成果').length})
            </button>
            <button
              onClick={() => setFilterType('规范')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filterType === '规范' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              规范 ({documents.filter(d => d.type === '规范').length})
            </button>
            <button
              onClick={() => setFilterType('模板')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filterType === '模板' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              模板 ({documents.filter(d => d.type === '模板').length})
            </button>
          </div>
        </div>
      </div>

      {/* Document List */}
      <div className="flex-1 overflow-auto p-8">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  文件名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  类型
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  所属项目
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  上传人
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  上传时间
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  大小
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getTypeColor(doc.type)}`}>
                        {getTypeIcon(doc.type)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                        {doc.tags.length > 0 && (
                          <div className="flex gap-1 mt-1">
                            {doc.tags.map(tag => (
                              <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                <Tag className="w-3 h-3" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(doc.type)}`}>
                      {doc.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {doc.project ? (
                      <div className="flex items-center gap-2">
                        <Folder className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-blue-600">{doc.project}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">公共资料</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{doc.uploadedBy}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{doc.uploadDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{doc.size}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="预览">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="下载">
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
