export interface ListConfig {
    title: string;
    serviceName: string;
    methodName: string;
    hiddenFields?: string[];
    buttons?: ButtonConfig[];
    show_search?: boolean;
    richFields?: string[];
}

export interface ButtonConfig {
    name: string;
    hidden: (item: any) => boolean;
    click: (item: any) => Promise<void>;
}
