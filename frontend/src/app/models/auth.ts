export interface Auth {
    token: string;
    role: string;
}

export interface Login {
    username: string;
    password: string;
}

export interface Registration {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    sex: string;
    birth_date: string;
    username: string;
    biography: string;
    private: boolean;
    password: string;
}
