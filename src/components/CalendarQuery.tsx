import { useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Filter,
    ChevronDown,
    Clock,
    CheckCircle2
} from 'lucide-react';
import { useData } from '../context/DataContext';

interface CalendarEvent {
    id: string;
    type: 'work' | 'meeting' | 'project';
    title: string;
    date: string; // YYYY-MM-DD
    status: string;
    color: string;
    highlight?: boolean;
    relatedProject?: string;
    recorder?: string;
}

export function CalendarQuery() {
    const { meetings, workLogs, projects } = useData();
    const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

    // 整合所有来源的数据为日历事件
    const allEvents: CalendarEvent[] = [
        ...meetings.map(m => ({
            id: `m-${m.id}`,
            type: 'meeting' as const,
            title: m.title,
            date: m.date,
            status: m.status,
            color: 'bg-red-400',
            highlight: true,
            relatedProject: m.relatedProject,
            recorder: '局办'
        })),
        ...workLogs.map(l => ({
            id: `l-${l.id}`,
            type: 'work' as const,
            title: l.workName,
            date: l.startTime.split(' ')[0], // 取第一天
            status: l.status,
            color: 'bg-blue-400',
            relatedProject: l.projectName,
            recorder: '张工'
        })),
        ...projects.map(p => ({
            id: `p-${p.id}`,
            type: 'project' as const,
            title: `[新项目] ${p.name}`,
            date: p.startDate,
            status: p.status,
            color: 'bg-green-400',
            relatedProject: p.name,
            recorder: p.leader
        }))
    ];

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    const getEventsForDay = (year: number, month: number, day: number) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return allEvents.filter(event => event.date === dateStr);
    };

    const selectedEvent = allEvents.find(e => e.id === selectedEventId);

    return (
        <div className="h-full flex flex-col bg-white font-sans">
            {/* 顶部工具栏 */}
            <div className="flex items-center px-6 py-3 border-b border-gray-100 gap-8">
                <div className="flex items-center gap-1 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
                    <span className="text-sm text-gray-700">月</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>

                <div className="flex items-center gap-1">
                    <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded text-gray-400">
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-medium text-gray-900 mx-2">
                        {currentDate.getFullYear()}年{String(currentDate.getMonth() + 1).padStart(2, '0')}月
                    </span>
                    <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded text-gray-400">
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
                    <Filter className="w-4 h-4 text-gray-500 font-bold" />
                    <span className="text-sm text-gray-600">筛选</span>
                </div>
            </div>

            {/* 星期表头 */}
            <div className="grid grid-cols-7 border-b border-gray-100">
                {['周日', '周一', '周二', '周三', '周四', '周五', '周六'].map(day => (
                    <div key={day} className="py-2 text-center text-xs text-gray-400 border-r border-gray-100 last:border-r-0">
                        {day}
                    </div>
                ))}
            </div>

            {/* 日历主网格 */}
            <div className="flex-1 grid grid-cols-7 grid-rows-6 h-full min-h-0">
                {Array.from({ length: 42 }).map((_, i) => {
                    let dayNumber: number;
                    let isCurrentMonth = true;
                    let year = currentDate.getFullYear();
                    let month = currentDate.getMonth();

                    if (i < firstDayOfMonth) {
                        dayNumber = prevMonthLastDay - (firstDayOfMonth - i - 1);
                        isCurrentMonth = false;
                        month -= 1;
                        if (month < 0) { month = 11; year -= 1; }
                    } else if (i >= firstDayOfMonth + daysInMonth) {
                        dayNumber = i - (firstDayOfMonth + daysInMonth) + 1;
                        isCurrentMonth = false;
                        month += 1;
                        if (month > 11) { month = 0; year += 1; }
                    } else {
                        dayNumber = i - firstDayOfMonth + 1;
                    }

                    const dayEvents = getEventsForDay(year, month, dayNumber);
                    const isSelectedDay = dayNumber === 19 && isCurrentMonth;

                    return (
                        <div
                            key={i}
                            className={`border-r border-b border-gray-50 relative group flex flex-col min-h-0 ${!isCurrentMonth ? 'bg-gray-50' : ''
                                } ${isSelectedDay ? 'bg-yellow-50' : ''}`}
                            style={{
                                backgroundImage: !isCurrentMonth ? 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.01) 10px, rgba(0,0,0,0.01) 11px)' : 'none'
                            }}
                        >
                            <div className="p-2 text-right">
                                <span className={`text-xs ${isCurrentMonth ? 'text-gray-900' : 'text-gray-300'}`}>
                                    {dayNumber}
                                </span>
                            </div>

                            <div className="flex-1 px-1 pb-1 space-y-0.5 overflow-hidden">
                                {dayEvents.map(event => (
                                    <div
                                        key={event.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedEventId(event.id);
                                        }}
                                        className={`h-5 flex items-center gap-1 px-1 rounded text-[10px] text-white cursor-pointer hover:brightness-95 transition-all truncate ${event.color}`}
                                    >
                                        <Clock className="w-2.5 h-2.5 flex-shrink-0" />
                                        <span className="truncate">{event.status} {event.title}</span>
                                    </div>
                                ))}
                            </div>

                            {/* 弹窗已移至外层以实现全屏居中 */}
                        </div>
                    );
                })}
            </div>

            {/* 全屏模态窗与遮罩层 */}
            {selectedEvent && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.45)', // 变暗效果
                        backdropFilter: 'blur(2px)' // 轻微模糊，增加高级感
                    }}
                    onClick={() => setSelectedEventId(null)} // 点击背景关闭
                >
                    <div
                        style={{
                            width: '640px', // 居中弹窗通常比气泡框稍大
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            padding: '30px',
                            position: 'relative'
                        }}
                        onClick={(e) => e.stopPropagation()} // 防止点击内容区关闭
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="px-3 py-1 rounded-full text-[12px] font-bold text-white bg-red-400 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                                {selectedEvent.status}
                            </span>
                            <button onClick={() => setSelectedEventId(null)} className="text-gray-400 hover:text-gray-600 p-1">✕</button>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-6">{selectedEvent.title}</h3>

                        <div className="space-y-4 border-t border-gray-100 pt-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">所属项目</span>
                                <span className="font-medium text-gray-800">闵行区总体规划项</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">工作日期</span>
                                <span className="font-medium text-gray-800">{selectedEvent.date}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">记录人</span>
                                <span className="font-medium text-gray-800">张工</span>
                            </div>
                        </div>

                        <div className="mt-8 bg-green-50 p-3 rounded-lg flex items-center gap-3 text-green-700">
                            <CheckCircle2 className="w-5 h-5" />
                            <div>
                                <p className="text-sm font-bold">监督检查已通过</p>
                                <p className="text-[11px] opacity-80">该任务已按规划要求完成自检工作</p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setSelectedEventId(null)}
                                className="px-6 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                            >
                                确定
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
