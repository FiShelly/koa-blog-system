export class Material {
    id: number;
    name: string;
    kw_text: string;
    ext: string;
    mime: string;
    size: number;
    src: string;
    date: number;
    status: string = 'start';
    progress: string = '等待上传';
    file: any;
    
}
