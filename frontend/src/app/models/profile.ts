export interface Profile {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    sex: string;
    birth_date: Date;
    username: string;
    biography: string;
    private: boolean;
    work_experiences: IntervalModel[];
    educations: IntervalModel[];
    skills: NameModel[];
    interests: NameModel[];
    connections: number[];
    connection_requests: number[];
    blocked_profiles: number[];
    block_post_notifications: boolean;
    block_message_notifications: boolean;
}

interface NameModel {
    name: string;
}

interface IntervalModel extends NameModel {
    company: string;
    start: Date;
    end: Date;
}
