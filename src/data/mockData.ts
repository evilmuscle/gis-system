import Mock from 'mockjs';

export interface Project {
    id: string;
    name: string;
    status: '进行中' | '已完成' | '暂停' | '计划中';
    leader: string;
    participants: string[];
    startDate: string;
    endDate: string;
    location: { lat: number; lng: number; address: string };
    description: string;
    tags: string[];
    progress: number;
    meetings: number;
    files: number;
}

export interface WorkLog {
    id: string;
    projectName: string;
    workName: string;
    startTime: string;
    endTime: string;
    content: string;
    attachments: string[];
    status: '进行中' | '已完成' | '计划中';
}

export interface Meeting {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    participants: string[];
    externalExperts: string[];
    relatedProject: string;
    summary: string;
    hasRecording: boolean;
    hasPhotos: boolean;
    status: '未开始' | '进行中' | '已完成';
}

export interface ProjectSet {
    id: string;
    name: string;
    description: string;
    responsiblePerson: string;
    status: '进行中' | '已完成' | '计划中';
    projectIds: string[]; // 关联的项目ID列表
}

// 模拟初始数据
export const initialProjects: Project[] = [
    {
        id: '1',
        name: 'xxx社区MHPO-1402单元06-03地块动迁安置房项目',
        status: '进行中',
        leader: '侯某某',
        participants: ['实某某', '智某某', '宇某某'],
        startDate: '2024-01-15',
        endDate: '2024-12-31',
        location: { lat: 31.23, lng: 121.47, address: '上海市华漕镇' },
        description: 'xxx社区MHPO-1402单元06-03地块动迁安置房',
        tags: ['重要', '安置房'],
        progress: 65,
        meetings: 8,
        files: 24
    },
    {
        id: '2',
        name: 'xxx社区MHPO-1402单元05-06地块动迁安置房项目',
        status: '进行中',
        leader: '侯某某',
        participants: ['能某某', '谷某某'],
        startDate: '2024-03-01',
        endDate: '2024-09-30',
        location: { lat: 31.28, lng: 121.52, address: '上海市华漕镇' },
        description: 'xxx社区MHPO-1402单元05-06地块动迁安置房',
        tags: ['重要', '安置房'],
        progress: 40,
        meetings: 5,
        files: 18
    },
    {
        id: '3',
        name: 'xxxMHP0-1403单元33-01A-2地块新建民办双语学校项目',
        status: '计划中',
        leader: '吴某某',
        participants: ['能某某', '谷某某'],
        startDate: '2024-06-01',
        endDate: '2025-03-31',
        location: { lat: 31.22, lng: 121.45, address: '上海市华漕镇' },
        description: 'xxxMHP0-1403单元33-01A-2地块新建民办双语学校',
        tags: ['一般', '规划'],
        progress: 10,
        meetings: 2,
        files: 6
    },
    {
        id: '4',
        name: 'xxx293街坊2/1丘（鸿桥新商汇）项目',
        status: '计划中',
        leader: '吴某某',
        participants: ['能某某', '谷某某'],
        startDate: '2024-06-01',
        endDate: '2025-03-31',
        location: { lat: 31.22, lng: 121.45, address: '上海市华漕镇' },
        description: 'xxx293街坊2/1丘（鸿桥新商汇）',
        tags: ['一般', '环评'],
        progress: 10,
        meetings: 2,
        files: 6
    },
    {
        id: '5',
        name: 'xxx地产开发有限公司处置福临天地新园项目工程渣土',
        status: '计划中',
        leader: '徐某某',
        participants: ['实某某', '智某某', '宇某某'],
        startDate: '2024-06-01',
        endDate: '2025-03-31',
        location: { lat: 31.22, lng: 121.45, address: '上海市华漕镇' },
        description: 'xxx地产开发有限公司处置福临天地新园项目工程渣土',
        tags: ['重要'],
        progress: 10,
        meetings: 2,
        files: 6
    },
    {
        id: '6',
        name: 'xxx206D-01地块动迁安置房项目',
        status: '计划中',
        leader: '徐某某',
        participants: ['实某某', '智某某', '宇某某'],
        startDate: '2024-06-01',
        endDate: '2025-03-31',
        location: { lat: 31.22, lng: 121.45, address: '上海市华漕镇' },
        description: 'xxx206D-01地块动迁安置房',
        tags: ['重要', '安置房'],
        progress: 10,
        meetings: 2,
        files: 6
    }
];

export const initialWorkLogs: WorkLog[] = [
    {
        id: '1',
        projectName: '闵行区总体规划修编项目',
        workName: '现状调研与资料收集',
        startTime: '2024-01-15',
        endTime: '2024-02-15',
        content: '对闵行区重点区域进行现场踏勘，收集自然资源、人口、产业等基础数据。',
        attachments: ['现状调研大纲.pdf', '基础数据清单.xlsx'],
        status: '已完成'
    },
    {
        id: '2',
        projectName: '闵行区总体规划修编项目',
        workName: '专题研究报告编制',
        startTime: '2024-02-16',
        endTime: '2024-04-30',
        content: '开展产业发展、交通体系、公共服务设施等专题研究，编制专题报告初稿。',
        attachments: ['产业专题初稿.docx'],
        status: '进行中'
    }
];

export const initialMeetings: Meeting[] = [
    {
        id: '1',
        title: '项目启动会',
        date: '2024-01-15',
        time: '09:00 - 11:30',
        location: '局二楼会议室',
        participants: ['张工', '李工', '王工'],
        externalExperts: [],
        relatedProject: '闵行区总体规划修编项目',
        summary: '项目正式启动，明确各分项负责人及交付时间节点。',
        hasRecording: true,
        hasPhotos: true,
        status: '已完成'
    },
    {
        id: '2',
        title: '方案成果汇报',
        date: '2024-05-15',
        time: '14:00 - 16:30',
        location: '视频会议',
        participants: ['张工', '赵工'],
        externalExperts: ['外部专家A'],
        relatedProject: '闵行区总体规划修编项目',
        summary: '专家组对初步方案进行了评审，原则性通过。',
        hasRecording: false,
        hasPhotos: true,
        status: '已完成'
    }
];

export const initialProjectSets: ProjectSet[] = [
    {
        id: 'ps-1',
        name: '2024-2026年度xxx动迁安置房重点项目',
        description: '2024-2026年度xxx动迁安置房重点项目',
        responsiblePerson: '侯某某',
        status: '进行中',
        projectIds: ['1', '2', '6']
    }
];
