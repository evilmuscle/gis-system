import { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  FileText, 
  Image as ImageIcon, 
  File, 
  Download, 
  Star,
  Clock,
  Tag,
  FolderOpen,
  Grid3x3,
  List
} from 'lucide-react';

interface Resource {
  id: string;
  name: string;
  type: '文本' | '图形' | '成果' | '规范' | '模板';
  projectName?: string;
  uploader: string;
  uploadDate: string;
  size: string;
  tags: string[];
  version?: string;
  isFavorite: boolean;
}

const mockResources: Resource[] = [
  {
    id: '1',
    name: '城市总规现状分析报告.pdf',
    type: '文本',
    projectName: '城市总体规划修编项目',
    uploader: '张工',
    uploadDate: '2024-05-20',
    size: '2.3 MB',
    tags: ['现状分析', '报告'],
    version: 'V2',
    isFavorite: true,
  },
  {
    id: '2',
    name: '规划方案总平面图.dwg',
    type: '图形',
    projectName: '城市总体规划修编项目',
    uploader: '李工',
    uploadDate: '2024-05-18',
    size: '8.7 MB',
    tags: ['图纸', '总平面'],
    version: 'V3',
    isFavorite: false,
  },
  {
    id: '3',
    name: '用地现状矢量数据.shp',
    type: '图形',
    projectName: '城市总体规划修编项目',
    uploader: '王工',
    uploadDate: '2024-04-10',
    size: '12.4 MB',
    tags: ['矢量', 'GIS'],
    isFavorite: false,
  },
  {
    id: '4',
    name: '控规编制技术规范2023.pdf',
    type: '规范',
    uploader: '张工',
    uploadDate: '2024-01-15',
    size: '5.6 MB',
    tags: ['规范', '技术标准'],
    isFavorite: true,
  },
  {
    id: '5',
    name: '项目合同模板.docx',
    type: '模板',
    uploader: '赵工',
    uploadDate: '2024-02-20',
    size: '156 KB',
    tags: ['模板', '合同'],
    isFavorite: false,
  },
  {
    id: '6',
    name: '园区控规成果汇报PPT.pptx',
    type: '成果',
    projectName: '园区控制性详细规划',
    uploader: '李工',
    uploadDate: '2024-05-25',
    size: '15.2 MB',
    tags: ['汇报', 'PPT'],
    isFavorite: false,
  },
];

const typeColors: Record<string, string> = {
  '文本': 'bg-blue-100 text-blue-700',
  '图形': 'bg-purple-100 text-purple-700',
  '成果': 'bg-green-100 text-green-700',
  '规范': 'bg-orange-100 text-orange-700',
  '模板': 'bg-gray-100 text-gray-700',
};

const typeIcons: Record<string, any> = {
  '文本': FileText,
  '图形': Grid3x3,
  '成果': FolderOpen,
  '规范': File,
  '模板': File,
};

export function ResourceManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedType, setSelectedType] = useState<string>('全部');
  const [resources, setResources] = useState(mockResources);

  const filteredResources = resources.filter(resource => {
    const matchSearch = resource.name.includes(searchTerm) || 
                       (resource.projectName && resource.projectName.includes(searchTerm));
    const matchType = selectedType === '全部' || resource.type === selectedType;
    return matchSearch && matchType;
  });

  const toggleFavorite = (id: string) => {
    setResources(resources.map(r => 
      r.id === id ? { ...r, isFavorite: !r.isFavorite } : r
    ));
  };

  const recentResources = resources.slice(0, 3);
  const favoriteResources = resources.filter(r => r.isFavorite);

  return (
    <div className="h-full flex bg-white">
      {/* 左侧快捷导航 */}
      <div className="w-64 border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">快捷入口</h3>
        </div>
        <div className="flex-1 p-4 overflow-auto">
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-2 text-left rounded-lg hover:bg-gray-50 transition-colors">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700">最近访问</span>
              <span className="ml-auto text-sm text-gray-500">{recentResources.length}</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 text-left rounded-lg hover:bg-gray-50 transition-colors">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-700">我的收藏</span>
              <span className="ml-auto text-sm text-gray-500">{favoriteResources.length}</span>
            </button>
          </div>

          <div className="mt-6">
            <h4 className="px-4 text-sm font-medium text-gray-500 mb-2">资料类型</h4>
            <div className="space-y-1">
              {['全部', '文本', '图形', '成果', '规范', '模板'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`w-full flex items-center justify-between px-4 py-2 text-left rounded-lg transition-colors ${
                    selectedType === type ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{type}</span>
                  <span className="text-sm text-gray-500">
                    {type === '全部' 
                      ? resources.length 
                      : resources.filter(r => r.type === type).length
                    }
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h4 className="px-4 text-sm font-medium text-gray-500 mb-2">标签</h4>
            <div className="px-4 flex flex-wrap gap-2">
              {['规范', '模板', '图纸', 'GIS', '汇报', '合同'].map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-900 mb-1">存储空间</p>
            <div className="w-full bg-blue-200 rounded-full h-2 mb-2">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: '68%' }}></div>
            </div>
            <p className="text-xs text-blue-700">已使用 68 GB / 100 GB</p>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col">
        <div className="border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">资料管理</h2>
              <p className="text-sm text-gray-500 mt-1">共 {filteredResources.length} 个文件</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                上传文件
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索资料名称、项目名称..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" />
              高级筛选
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-8 py-6">
          {viewMode === 'list' ? (
            <div className="space-y-2">
              {filteredResources.map((resource) => {
                const Icon = typeIcons[resource.type];
                return (
                  <div
                    key={resource.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${typeColors[resource.type]}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900 truncate">{resource.name}</h3>
                          {resource.version && (
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                              {resource.version}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span className={`px-2 py-0.5 rounded text-xs ${typeColors[resource.type]}`}>
                            {resource.type}
                          </span>
                          {resource.projectName && (
                            <span className="flex items-center gap-1">
                              <FolderOpen className="w-3 h-3" />
                              {resource.projectName}
                            </span>
                          )}
                          <span>{resource.uploader}</span>
                          <span>{resource.uploadDate}</span>
                          <span>{resource.size}</span>
                        </div>
                        {resource.tags.length > 0 && (
                          <div className="flex items-center gap-2 mt-2">
                            {resource.tags.map((tag, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs flex items-center gap-1">
                                <Tag className="w-3 h-3" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleFavorite(resource.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Star 
                          className={`w-5 h-5 ${resource.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} 
                        />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Download className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {filteredResources.map((resource) => {
                const Icon = typeIcons[resource.type];
                return (
                  <div
                    key={resource.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <div className="relative mb-3">
                      <div className={`w-full h-32 rounded-lg flex items-center justify-center ${typeColors[resource.type]}`}>
                        <Icon className="w-12 h-12" />
                      </div>
                      <button
                        onClick={() => toggleFavorite(resource.id)}
                        className="absolute top-2 right-2 p-1.5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      >
                        <Star 
                          className={`w-4 h-4 ${resource.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} 
                        />
                      </button>
                    </div>
                    <h3 className="font-medium text-gray-900 truncate mb-1" title={resource.name}>
                      {resource.name}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <span>{resource.size}</span>
                      <span>{resource.uploadDate}</span>
                    </div>
                    {resource.projectName && (
                      <p className="text-xs text-gray-500 truncate mb-2" title={resource.projectName}>
                        {resource.projectName}
                      </p>
                    )}
                    <div className="flex items-center gap-2">
                      <button className="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-1">
                        <Download className="w-3 h-3" />
                        下载
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
