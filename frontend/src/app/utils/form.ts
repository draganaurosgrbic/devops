export interface FormConfig {
    title: string;
    controls: FormControlConfig[];
    serviceName: string;
    methodName: string;
    backUrl?: string;
    initMethodName?: string;
}

export type FormControlType = 'text' | 'long-text' | 'password' | 'date' | 'toggle' | 'select' | 'composite';
export type FormControlValidation = 'none' | 'required';

export interface FormControlConfig {
    name: string;
    type?: FormControlType;
    validation?: FormControlValidation;
    options?: string[];
    elements?: FormControlConfig[];
}
