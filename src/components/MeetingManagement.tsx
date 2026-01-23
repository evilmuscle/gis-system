import { useState } from 'react';
import {
  Search,
  Plus,
  Calendar as CalendarIcon,
  MapPin,
  Users,
  FileText,
  Mic,
  Image as ImageIcon,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { Meeting } from '../data/mockData';

const statusColors = {
  '已完成': 'bg-gray-100 text-gray-700',
  '进行中': 'bg-blue-100 text-blue-700',
  '未开始': 'bg-green-100 text-green-700',
};

export function MeetingManagement() {
  const { meetings, projects, addMeeting } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form State
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '14:00-15:30',
    location: '线上会议',
    participants: ['本人'],
    externalExperts: [],
    relatedProject: '',
    summary: '',
    status: '未开始' as const,
    hasRecording: false,
    hasPhotos: false
  });

  const filteredMeetings = meetings.filter(meeting =>
    meeting.title.includes(searchTerm) || meeting.relatedProject.includes(searchTerm)
  );

  const handleAddMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMeeting.title || !newMeeting.relatedProject) {
      alert('请填写会议标题并选择关联项目');
      return;
    }
    addMeeting(newMeeting);
    setShowAddForm(false);
    setNewMeeting({
      title: '',
      date: new Date().toISOString().split('T')[0],
      time: '14:00-15:30',
      location: '线上会议',
      participants: ['本人'],
      externalExperts: [],
      relatedProject: '',
      summary: '',
      status: '未开始',
      hasRecording: false,
      hasPhotos: false
    });
  };

  if (showAddForm) {
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">筹备新会议</h2>
              <p className="text-sm text-gray-500 mt-1">填写会议基本信息与议程</p>
            </div>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              返回列表
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-8 py-6">
          <div className="max-w-3xl space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                会议主题 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={newMeeting.title}
                onChange={e => setNewMeeting({ ...newMeeting, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入会议主题"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">日期</label>
                <input
                  type="date"
                  value={newMeeting.date}
                  onChange={e => setNewMeeting({ ...newMeeting, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">时间段</label>
                <input
                  type="text"
                  value={newMeeting.time}
                  onChange={e => setNewMeeting({ ...newMeeting, time: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="例如：14:00-15:30"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  绑定项目 <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={newMeeting.relatedProject}
                  onChange={e => setNewMeeting({ ...newMeeting, relatedProject: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">请选择所属项目...</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">会议地点</label>
                <input
                  type="text"
                  value={newMeeting.location}
                  onChange={e => setNewMeeting({ ...newMeeting, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="请输入会议地点"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">会议描述 / 议程</label>
              <textarea
                rows={4}
                value={newMeeting.summary}
                onChange={e => setNewMeeting({ ...newMeeting, summary: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="请输入会议详细内容"
              />
            </div>

            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={handleAddMeeting}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                提供演示：筹备项目会议
              </button>
              <button
                onClick={() => setShowAddForm(false)}
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

  if (selectedMeeting) {
    return (
      <div className="h-full flex flex-col bg-white">
        <div className="border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedMeeting(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-400" />
              </button>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">{selectedMeeting.title}</h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${statusColors[selectedMeeting.status]}`}>
                    {selectedMeeting.status}
                  </span>
                  <span className="text-gray-500 flex items-center gap-1 text-sm">
                    <CalendarIcon className="w-4 h-4" />
                    {selectedMeeting.date} {selectedMeeting.time}
                  </span>
                </div>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              编辑会议
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="px-8 py-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 space-y-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">会议信息</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <CalendarIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">会议时间</p>
                        <p className="font-medium text-gray-900">{selectedMeeting.date}</p>
                        <p className="text-sm text-gray-600">{selectedMeeting.time}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">会议地点</p>
                        <p className="font-medium text-gray-900">{selectedMeeting.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">会议纪要</h3>
                  {selectedMeeting.summary ? (
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap">{selectedMeeting.summary}</p>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 mb-4 text-sm">暂无会议纪要记录</p>
                    </div>
                  )}
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">会议资料</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedMeeting.hasRecording && (
                      <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <Mic className="w-5 h-5 text-red-600" />
                          <div>
                            <p className="font-medium text-gray-900 text-sm">会议录音</p>
                            <p className="text-xs text-gray-500">WAV文件</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {selectedMeeting.hasPhotos && (
                      <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <ImageIcon className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-gray-900 text-sm">会议照片</p>
                            <p className="text-xs text-gray-500">照片合集</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">参会人员</h3>
                  <div className="space-y-3">
                    {selectedMeeting.participants.map((participant, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs">
                          {participant[0]}
                        </div>
                        <span className="text-sm text-gray-900 font-medium">{participant}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">关联项目</h3>
                  <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">{selectedMeeting.relatedProject}</p>
                    <button className="mt-3 text-xs text-blue-600 font-semibold hover:underline">查看项目详情</button>
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
            <h2 className="text-2xl font-semibold text-gray-900">会议管理</h2>
            <p className="text-sm text-gray-500 mt-1">项目全生命周期会议记录</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            筹备新会议
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索会议主题、参与人员或关联项目..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="grid grid-cols-1 gap-4">
          {filteredMeetings.map((meeting) => (
            <div
              key={meeting.id}
              onClick={() => setSelectedMeeting(meeting)}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{meeting.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${statusColors[meeting.status]}`}>
                      {meeting.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <CalendarIcon className="w-4 h-4" />
                      {meeting.date} {meeting.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {meeting.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      {meeting.participants.length} 人参加
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="text-xs text-gray-400">关联项目:</p>
                  <p className="text-xs font-medium text-gray-700">{meeting.relatedProject}</p>
                </div>
                <div className="flex items-center gap-3">
                  {meeting.hasRecording && <Mic className="w-4 h-4 text-red-400" />}
                  {meeting.hasPhotos && <ImageIcon className="w-4 h-4 text-blue-400" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
