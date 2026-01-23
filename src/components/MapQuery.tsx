import { useState } from 'react';
import {
  Layers,
  Map as MapIcon,
  Search,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Ruler,
  Navigation,
  Settings,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  MapPin
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { ProjectDetailModal } from './ProjectDetailModal';
import { Project } from '../data/mockData';

interface Layer {
  id: string;
  name: string;
  type: 'base' | 'vector' | 'project';
  visible: boolean;
  opacity: number;
  children?: Layer[];
}

const mockLayers: Layer[] = [
  {
    id: '1',
    name: '底图图层',
    type: 'base',
    visible: true,
    opacity: 100,
    children: [
      { id: '1-1', name: '影像地图', type: 'base', visible: true, opacity: 100 },
      { id: '1-2', name: '矢量地图', type: 'base', visible: false, opacity: 100 },
      { id: '1-3', name: '地形图', type: 'base', visible: false, opacity: 100 },
    ],
  },
  {
    id: '2',
    name: '行政区划',
    type: 'vector',
    visible: true,
    opacity: 80,
    children: [
      { id: '2-1', name: '省界', type: 'vector', visible: true, opacity: 100 },
      { id: '2-2', name: '市界', type: 'vector', visible: true, opacity: 100 },
      { id: '2-3', name: '区界', type: 'vector', visible: true, opacity: 100 },
    ],
  },
  {
    id: '3',
    name: '规划数据',
    type: 'vector',
    visible: true,
    opacity: 70,
    children: [
      { id: '3-1', name: '用地现状', type: 'vector', visible: true, opacity: 70 },
      { id: '3-2', name: '用地规划', type: 'vector', visible: false, opacity: 70 },
      { id: '3-3', name: '生态红线', type: 'vector', visible: true, opacity: 100 },
    ],
  },
  {
    id: '4',
    name: '项目点位',
    type: 'project',
    visible: true,
    opacity: 100,
  },
];

export function MapQuery() {
  const { projects } = useData();
  const [layers, setLayers] = useState(mockLayers);
  const [expandedLayers, setExpandedLayers] = useState<string[]>(['1', '2', '3']);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewDetailProject, setViewDetailProject] = useState<Project | null>(null);

  const toggleLayer = (layerId: string) => {
    const updateLayer = (layers: Layer[]): Layer[] => {
      return layers.map(layer => {
        if (layer.id === layerId) {
          return { ...layer, visible: !layer.visible };
        }
        if (layer.children) {
          return { ...layer, children: updateLayer(layer.children) };
        }
        return layer;
      });
    };
    setLayers(updateLayer(layers));
  };

  const toggleExpanded = (layerId: string) => {
    setExpandedLayers(prev =>
      prev.includes(layerId)
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  };

  const updateOpacity = (layerId: string, opacity: number) => {
    const updateLayer = (layers: Layer[]): Layer[] => {
      return layers.map(layer => {
        if (layer.id === layerId) {
          return { ...layer, opacity };
        }
        if (layer.children) {
          return { ...layer, children: updateLayer(layer.children) };
        }
        return layer;
      });
    };
    setLayers(updateLayer(layers));
  };

  const filteredProjects = projects.filter(p =>
    p.name.includes(searchTerm) || p.leader.includes(searchTerm)
  );

  const renderLayer = (layer: Layer, level: number = 0) => {
    const isExpanded = expandedLayers.includes(layer.id);
    const hasChildren = layer.children && layer.children.length > 0;

    return (
      <div key={layer.id}>
        <div
          className={`flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors ${level > 0 ? 'ml-6' : ''
            }`}
        >
          {hasChildren && (
            <button
              onClick={() => toggleExpanded(layer.id)}
              className="p-0.5 hover:bg-gray-200 rounded transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              )}
            </button>
          )}
          {!hasChildren && <div className="w-5" />}

          <button
            onClick={() => toggleLayer(layer.id)}
            className="flex-shrink-0"
          >
            {layer.visible ? (
              <Eye className="w-4 h-4 text-blue-600" />
            ) : (
              <EyeOff className="w-4 h-4 text-gray-400" />
            )}
          </button>

          <span className="flex-1 text-sm text-gray-900">{layer.name}</span>

          {layer.visible && !hasChildren && (
            <input
              type="range"
              min="0"
              max="100"
              value={layer.opacity}
              onChange={(e) => updateOpacity(layer.id, Number(e.target.value))}
              className="w-20 h-1 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>

        {hasChildren && isExpanded && (
          <div>
            {layer.children!.map(child => renderLayer(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  console.log('MapQuery Render. viewDetailProject:', viewDetailProject?.name);

  return (
    <>
      <div className="h-full flex bg-white font-sans">
        {/* 左侧图层控制面板 */}
        <div className="w-80 border-r border-gray-200 flex flex-col shadow-sm bg-white z-20">
          <div className="p-6 border-b border-gray-200 bg-gray-50/30">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">图层控制</h2>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索地点或项目..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4 space-y-2">
            {layers.map(layer => renderLayer(layer))}
          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50/50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">区域项目 ({filteredProjects.length})</h3>
              <button className="text-[10px] text-blue-600 font-bold hover:underline">查看全部</button>
            </div>
            <div className="space-y-2 max-h-64 overflow-auto pr-1">
              {filteredProjects.map((project: Project) => (
                <div
                  key={project.id}
                  onClick={() => setViewDetailProject(project)}
                  className="p-3 bg-white border border-gray-100 rounded-xl hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${project.status === '进行中' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] animate-pulse' : 'bg-gray-400'}`}></div>
                    <p className="text-sm font-bold text-gray-800 truncate flex-1 group-hover:text-blue-600 transition-colors">
                      {project.name}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                      <span className="opacity-50 font-mono">LAT</span> {project.location.lat.toFixed(3)}
                      <span className="mx-1 opacity-20">|</span>
                      <span className="opacity-50 font-mono">LNG</span> {project.location.lng.toFixed(3)}
                    </div>
                    <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 地图主区域 */}
        <div className="flex-1 relative bg-slate-900 overflow-hidden">
          {/* 地图内容 */}
          <div className="w-full h-full relative cursor-crosshair">
            <img
              src="/satellite_basemap.png"
              alt="Satellite Map"
              className="w-full h-full object-cover opacity-90 transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none"></div>

            {filteredProjects.map((project: Project, idx) => (
              <div
                key={project.id}
                className="absolute cursor-pointer group z-50 flex flex-col items-center"
                onClick={(e) => {
                  console.log('Marker clicked:', project.name);
                  e.stopPropagation();
                  setViewDetailProject(project);
                }}
                style={{
                  left: `${20 + (idx % 4) * 20}%`,
                  top: `${25 + (idx % 3) * 20}%`,
                }}
              >
                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-2 drop-shadow-md">{project.name}</h3>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.3)] border-2 border-white transform transition-all group-hover:scale-110 active:scale-95 ${project.status === '进行中' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                  <MapIcon className="w-5 h-5 text-white" />
                </div>
              </div>
            ))}

            {/* 比例尺 */}
            <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 px-4 py-3 text-white">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-[10px] font-bold opacity-70">
                  <span>0</span>
                  <span>10km</span>
                </div>
                <div className="w-32 h-1 bg-white/30 relative rounded-full">
                  <div className="absolute top-0 left-0 w-1/2 h-full bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* 坐标与系统状态 */}
            <div className="absolute bottom-8 right-8 flex flex-col items-end gap-3 font-mono">
              <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-2xl">
                <p className="text-[10px] text-blue-400 font-bold tracking-widest uppercase mb-0.5">Live Coordination</p>
                <p className="text-sm text-white font-bold tracking-tighter">
                  E 121.47352° | N 31.23041°
                </p>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur px-3 py-1 rounded-full text-[9px] text-white/50 border border-white/5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                GIS ENGINE STABLE
              </div>
            </div>
          </div>

          {/* 地图工具栏 */}
          <div className="absolute top-8 left-8 z-10 flex flex-col gap-3">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50 overflow-hidden flex flex-col p-1.5 gap-1">
              {[
                { id: 'zoom-in', icon: ZoomIn, label: '放大' },
                { id: 'zoom-out', icon: ZoomOut, label: '缩小' },
                { id: 'measure', icon: Ruler, label: '测量' },
                { id: 'navigate', icon: Navigation, label: '定点' },
              ].map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(activeTool === tool.id ? null : tool.id)}
                  title={tool.label}
                  className={`p-3 rounded-xl transition-all duration-300 ${activeTool === tool.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-500 hover:bg-white hover:text-gray-900'
                    }`}
                >
                  <tool.icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          {/* 右上角系统工具 */}
          <div className="absolute top-8 right-8 z-10 flex gap-3">
            <button className="w-12 h-12 flex items-center justify-center bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50 text-gray-700 hover:bg-white hover:text-blue-600 transition-all group">
              <Maximize2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button className="w-12 h-12 flex items-center justify-center bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50 text-gray-700 hover:bg-white hover:text-blue-600 transition-all group">
              <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
            </button>
          </div>

          {/* 活动工具指示器 */}
          {activeTool && (
            <div className="absolute top-10 left-32 bg-gray-900/90 backdrop-blur text-white px-5 py-2.5 rounded-2xl shadow-2xl text-xs font-bold border border-white/10 animate-in fade-in slide-in-from-left-4 flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
              当前工具: {
                activeTool === 'zoom-in' ? '地图放大' :
                  activeTool === 'zoom-out' ? '地图缩小' :
                    activeTool === 'measure' ? '空间测量' :
                      activeTool === 'navigate' ? '坐标定位' : activeTool
              }
            </div>
          )}

          {viewDetailProject && (
            <ProjectDetailModal
              project={viewDetailProject}
              onClose={() => {
                console.log('Closing modal');
                setViewDetailProject(null);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
