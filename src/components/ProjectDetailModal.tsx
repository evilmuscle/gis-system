import { X, User, Calendar, MapPin, Users, FileText, MessageSquare, Clock, Download, Upload } from 'lucide-react';
import { useData } from '../context/DataContext';

import { Project } from '../data/mockData';

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  console.log('ProjectDetailModal: Rendering...', project.name);

  const { meetings = [], workLogs = [] } = useData() || {};
  const projectMeetings = (meetings || []).filter(m => m.relatedProject === project?.name);
  const projectLogs = (workLogs || []).filter(l => l.projectName === project?.name);

  return (
    <div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 lg:p-8"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={() => console.log('Modal overlay clicked')}
    >
      <div
        className="bg-white rounded-xl overflow-hidden flex flex-col shadow-2xl"
        style={{
          width: '100%',
          maxWidth: '1420px',
          maxHeight: '85vh'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{project.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full border border-blue-100">
                {project.status}
              </span>
              <p className="text-sm text-gray-500">项目详情</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-3 gap-6 p-8">
            {/* Left Column - Main Info */}
            <div className="col-span-2 space-y-6">
              {/* Basic Info */}
              <div className="bg-gray-50  rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  基本信息
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">项目负责人</p>
                      <p className="text-base text-gray-900 font-medium mt-1">{project.leader}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">项目周期</p>
                      <p className="text-base text-gray-900 font-medium mt-1">
                        {project.startDate} 至 {project.endDate || '进行中'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 col-span-2">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">项目位置</p>
                      <p className="text-base text-gray-900 font-medium mt-1">{project.location.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <span className="text-blue-700 font-bold text-lg">{project.progress}%</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">完成进度</p>
                      <div className="w-32 bg-gray-200 h-1.5 rounded-full mt-2">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: `${project.progress}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200/50">
                  <p className="text-sm text-gray-500 mb-2 font-medium">项目描述</p>
                  <p className="text-gray-600 leading-relaxed text-sm bg-white p-4 rounded-lg border border-gray-100 italic">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Participants */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">项目团队</h3>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                      {project.leader?.[0] || '管'}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">{project.leader}</span>
                      <span className="text-[10px] text-blue-600 font-bold uppercase">Lead</span>
                    </div>
                  </div>
                  {(project.participants || []).map((participant) => (
                    <div
                      key={participant}
                      className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl"
                    >
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-sm">
                        {participant?.[0] || '员'}
                      </div>
                      <span className="text-sm text-gray-700">{participant}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Timeline (from WorkLogs) */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">项目纪事</h3>
                  </div>
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                    {projectLogs.length} 条记录
                  </span>
                </div>
                <div className="space-y-6 pl-2">
                  {projectLogs.map((log, index) => (
                    <div key={log.id} className="flex gap-4 relative">
                      {index < projectLogs.length - 1 && (
                        <div className="absolute left-1.5 top-6 bottom-0 w-0.5 bg-gray-200" />
                      )}
                      <div className="relative z-10 w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-sm mt-1.5" />
                      <div className="flex-1 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{log.status}</span>
                          <span className="text-xs text-gray-400">{log.startTime}</span>
                        </div>
                        <h4 className="text-sm font-bold text-gray-900 mb-1">{log.workName}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{log.content}</p>
                      </div>
                    </div>
                  ))}
                  {projectLogs.length === 0 && (
                    <p className="text-sm text-gray-400 italic py-4">暂无相关纪事记录</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Files and Actions */}
            <div className="space-y-6">
              {/* Related Meetings */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">相关会议</h3>
                </div>
                <div className="space-y-3">
                  {projectMeetings.map(meeting => (
                    <div key={meeting.id} className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-blue-200 transition-all cursor-pointer">
                      <p className="text-sm font-bold text-gray-900 mb-1">{meeting.title}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-gray-500">{meeting.date}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded ${meeting.status === '已完成' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                          {meeting.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  {projectMeetings.length === 0 && (
                    <p className="text-sm text-gray-400 italic">目前无关联会议</p>
                  )}
                </div>
              </div>

              {/* Files */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">项目资料</h3>
                  </div>
                  <button className="p-1 hover:bg-gray-200 rounded text-gray-400"><Upload className="w-4 h-4" /></button>
                </div>
                <div className="space-y-2">
                  <div className="p-3 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all group cursor-pointer flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-50 text-red-600 flex items-center justify-center rounded text-[10px] font-bold">PDF</div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">成果说明.pdf</p>
                        <p className="text-[10px] text-gray-400">2.4MB · 05-15</p>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-gray-300 group-hover:text-blue-500" />
                  </div>
                  <div className="p-3 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all group cursor-pointer flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-50 text-blue-600 flex items-center justify-center rounded text-[10px] font-bold">ZIP</div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">空间库数据.zip</p>
                        <p className="text-[10px] text-gray-400">142MB · 05-12</p>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-gray-300 group-hover:text-blue-500" />
                  </div>
                </div>
                <button className="w-full mt-4 py-2 text-sm text-blue-600 font-medium hover:underline">
                  查看全部资料
                </button>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
