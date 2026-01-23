import { useState } from 'react';
import { Search, Layers, ZoomIn, ZoomOut, Maximize2, Info, MapPin } from 'lucide-react';

interface MapLayer {
  id: string;
  name: string;
  type: 'base' | 'vector' | 'raster';
  visible: boolean;
  opacity: number;
}

interface ProjectMarker {
  id: string;
  name: string;
  status: string;
  leader: string;
  lat: number;
  lng: number;
}

const mockLayers: MapLayer[] = [
  { id: '1', name: '天地图影像', type: 'base', visible: true, opacity: 1 },
  { id: '2', name: '行政区划', type: 'vector', visible: true, opacity: 0.8 },
  { id: '3', name: '用地红线', type: 'vector', visible: false, opacity: 0.7 },
  { id: '4', name: '历史影像(2020)', type: 'raster', visible: false, opacity: 0.5 },
];

const mockProjects: ProjectMarker[] = [
  { id: '1', name: '城市中心区控制性详细规划', status: '进行中', leader: '张伟', lat: 31.230416, lng: 121.473701 },
  { id: '2', name: '滨江生态廊道规划设计', status: '进行中', leader: '李明', lat: 31.240416, lng: 121.483701 },
  { id: '3', name: '历史街区保护规划', status: '已完成', leader: '王芳', lat: 31.220416, lng: 121.463701 },
];

export function MapView() {
  const [layers, setLayers] = useState<MapLayer[]>(mockLayers);
  const [selectedProject, setSelectedProject] = useState<ProjectMarker | null>(null);
  const [showLayerPanel, setShowLayerPanel] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleLayer = (layerId: string) => {
    setLayers(layers.map(layer =>
      layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  const updateLayerOpacity = (layerId: string, opacity: number) => {
    setLayers(layers.map(layer =>
      layer.id === layerId ? { ...layer, opacity } : layer
    ));
  };

  return (
    <div className="h-full flex relative">
      {/* Map Area */}
      <div className="flex-1 relative bg-gray-200">
        {/* Mock Map - In real implementation, this would be Leaflet or Mapbox */}
        <div className="w-full h-full relative overflow-hidden">
          <img
            src="/satellite_basemap.png"
            alt="Satellite Base Map"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10"></div> {/* Subtle overlay for better UI contrast */}

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center bg-white/20 backdrop-blur-sm p-6 rounded-2xl border border-white/30">
              <MapPin className="w-24 h-24 text-blue-400 mx-auto mb-4 drop-shadow-lg" />
              <p className="text-xl text-white font-bold mb-2 drop-shadow-md">GIS 影像底图展示</p>
              <p className="text-sm text-white/80">实际应用中将集成 Leaflet/Mapbox 和 PostGIS 数据</p>
            </div>
          </div>
        </div>

        {/* Project Markers (Mock) */}
        {mockProjects.map((project, index) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="absolute bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg cursor-pointer hover:bg-blue-700 transition-colors text-sm"
            style={{
              left: `${30 + index * 20}%`,
              top: `${40 + index * 10}%`,
            }}
          >
            📍 {project.name.substring(0, 10)}...
          </div>
        ))}

        {/* Top Search Bar */}
        <div className="absolute top-6 left-6 right-96 z-10">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索地名、项目名称..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute bottom-6 left-6 z-10 space-y-2">
          <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
            <ZoomIn className="w-5 h-5 text-gray-700" />
          </button>
          <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
            <ZoomOut className="w-5 h-5 text-gray-700" />
          </button>
          <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
            <Maximize2 className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => setShowLayerPanel(!showLayerPanel)}
            className={`w-10 h-10 rounded-lg shadow-lg flex items-center justify-center transition-colors ${showLayerPanel ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
          >
            <Layers className="w-5 h-5" />
          </button>
        </div>

        {/* Project Info Popup */}
        {selectedProject && (
          <div className="absolute bottom-6 left-20 z-10 bg-white rounded-lg shadow-xl p-6 w-80">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{selectedProject.name}</h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">状态</span>
                <span className="text-sm font-medium text-blue-600">{selectedProject.status}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">负责人</span>
                <span className="text-sm font-medium text-gray-900">{selectedProject.leader}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">坐标</span>
                <span className="text-xs font-mono text-gray-600">
                  {selectedProject.lat.toFixed(6)}, {selectedProject.lng.toFixed(6)}
                </span>
              </div>
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              查看项目详情
            </button>
          </div>
        )}
      </div>

      {/* Right Layer Panel */}
      {showLayerPanel && (
        <aside className="w-80 bg-white border-l border-gray-200 overflow-auto">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Layers className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">图层控制</h3>
            </div>

            {/* Layers */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3">底图图层</h4>
                {layers.filter(l => l.type === 'base').map(layer => (
                  <div key={layer.id} className="p-4 bg-gray-50 rounded-lg mb-2">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-900">{layer.name}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={layer.visible}
                          onChange={() => toggleLayer(layer.id)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    {layer.visible && (
                      <div>
                        <label className="text-xs text-gray-500">透明度: {Math.round(layer.opacity * 100)}%</label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={layer.opacity * 100}
                          onChange={(e) => updateLayerOpacity(layer.id, parseInt(e.target.value) / 100)}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3">矢量图层</h4>
                {layers.filter(l => l.type === 'vector').map(layer => (
                  <div key={layer.id} className="p-4 bg-gray-50 rounded-lg mb-2">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-900">{layer.name}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={layer.visible}
                          onChange={() => toggleLayer(layer.id)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    {layer.visible && (
                      <div>
                        <label className="text-xs text-gray-500">透明度: {Math.round(layer.opacity * 100)}%</label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={layer.opacity * 100}
                          onChange={(e) => updateLayerOpacity(layer.id, parseInt(e.target.value) / 100)}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3">栅格图层</h4>
                {layers.filter(l => l.type === 'raster').map(layer => (
                  <div key={layer.id} className="p-4 bg-gray-50 rounded-lg mb-2">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-900">{layer.name}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={layer.visible}
                          onChange={() => toggleLayer(layer.id)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    {layer.visible && (
                      <div>
                        <label className="text-xs text-gray-500">透明度: {Math.round(layer.opacity * 100)}%</label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={layer.opacity * 100}
                          onChange={(e) => updateLayerOpacity(layer.id, parseInt(e.target.value) / 100)}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Project List */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-500 mb-3">项目点位</h4>
              <div className="space-y-2">
                {mockProjects.map(project => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="p-3 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{project.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{project.leader} • {project.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-500 mb-3">空间分析工具</h4>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  缓冲区分析
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  坐标拾取
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  测距测面
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
