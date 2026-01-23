import { useState } from 'react';
import {
    Search,
    Plus,
    Calendar,
    FileText,
    Paperclip,
    ChevronRight,
    ArrowLeft,
    Clock,
    Filter
} from 'lucide-react';
import { useData } from '../context/DataContext';

const statusStyles = {
    '进行中': 'bg-blue-100 text-blue-700',
    '已完成': 'bg-green-100 text-green-700',
    '计划中': 'bg-gray-100 text-gray-700'
};

export function WorkLog() {
    const { workLogs, projects, addWorkLog } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('全部');
    const [showAddForm, setShowAddForm] = useState(false);

    // Form State
    const [newLog, setNewLog] = useState({
        projectName: '',
        workName: '',
        startTime: new Date().toISOString().split('T')[0] + ' 09:00',
        endTime: new Date().toISOString().split('T')[0] + ' 18:00',
        status: '进行中' as const,
        content: '',
        attachments: [] as string[]
    });

    const filteredLogs = workLogs.filter(log => {
        const matchesSearch = log.workName.includes(searchTerm) || log.projectName.includes(searchTerm);
        const matchesFilter = activeFilter === '全部' || log.status === activeFilter;
        return matchesSearch && matchesFilter;
    });

    const handleAddLog = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newLog.projectName || !newLog.workName) {
            alert('请选择项目并填写工作名称');
            return;
        }
        addWorkLog(newLog);
        setShowAddForm(false);
        setNewLog({
            projectName: '',
            workName: '',
            startTime: new Date().toISOString().split('T')[0] + ' 09:00',
            endTime: new Date().toISOString().split('T')[0] + ' 18:00',
            status: '进行中',
            content: '',
            attachments: []
        });
    };

    if (showAddForm) {
        return (
            <div className="h-full flex flex-col bg-white">
                <div className="border-b border-gray-200 px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900">发布工作纪事</h2>
                            <p className="text-sm text-gray-500 mt-1">记录项目的最新进展与完成情况</p>
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
                                关联项目 <span className="text-red-500">*</span>
                            </label>
                            <select
                                required
                                value={newLog.projectName}
                                onChange={e => setNewLog({ ...newLog, projectName: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">请选择所属项目...</option>
                                {projects.map(p => (
                                    <option key={p.id} value={p.name}>{p.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                工作任务名称 <span className="text-red-500">*</span>
                            </label>
                            <input
                                required
                                value={newLog.workName}
                                onChange={e => setNewLog({ ...newLog, workName: e.target.value })}
                                placeholder="请输入工作任务名称"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-gray-400" /> 开始时间
                                </label>
                                <input
                                    value={newLog.startTime}
                                    onChange={e => setNewLog({ ...newLog, startTime: e.target.value })}
                                    placeholder="2026-01-19 09:00"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-gray-400" /> 结束时间
                                </label>
                                <input
                                    value={newLog.endTime}
                                    onChange={e => setNewLog({ ...newLog, endTime: e.target.value })}
                                    placeholder="2026-01-19 18:00"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">工作描述</label>
                            <textarea
                                rows={4}
                                required
                                value={newLog.content}
                                onChange={e => setNewLog({ ...newLog, content: e.target.value })}
                                placeholder="详细说明工作进展..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="flex gap-3 pt-6 border-t border-gray-200">
                            <button
                                onClick={handleAddLog}
                                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                提供演示：发布工作纪事
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

    return (
        <div className="h-full flex flex-col bg-white">
            <div className="border-b border-gray-200 px-8 py-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">工作日志</h2>
                        <p className="text-sm text-gray-500 mt-1">记录项目过程中的关键节点与日常工作</p>
                    </div>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        发布新纪事
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="搜索工作内容、关联项目..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        {['全部', '进行中', '已完成'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setActiveFilter(f)}
                                className={`px-4 py-2 text-sm rounded-lg transition-colors border ${activeFilter === f
                                    ? 'bg-blue-50 border-blue-200 text-blue-700 font-medium'
                                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-auto px-8 py-6">
                <div className="grid grid-cols-1 gap-4">
                    {filteredLogs.map((log) => (
                        <div
                            key={log.id}
                            className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-lg font-semibold text-gray-900">{log.workName}</h2>
                                        <span className={`px-2 py-0.5 rounded-full text-xs ${statusStyles[log.status]}`}>
                                            {log.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span className="flex items-center gap-1.5">
                                            <span className="font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-xs">{log.projectName}</span>
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4" />
                                            {log.startTime.split(' ')[0]}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="w-4 h-4" />
                                            {log.startTime.split(' ')[1]} ~ {log.endTime.split(' ')[1]}
                                        </span>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>

                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{log.content}</p>

                            <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                    {log.attachments.map((file, idx) => (
                                        <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded text-xs text-gray-600">
                                            <Paperclip className="w-3.5 h-3.5" />
                                            {file}
                                        </div>
                                    ))}
                                    {log.attachments.length === 0 && (
                                        <p className="text-xs text-gray-400 italic flex items-center gap-1">
                                            <FileText className="w-3 h-3" /> 暂无附件
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredLogs.length === 0 && (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 font-medium">未发现匹配的纪事记录</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
