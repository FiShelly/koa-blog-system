import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {util, validator} from '../../shared-services/utils/normal';
import {Post} from '../../models/Post';
import {ModalService} from '../../shared-services/modal/modal.service';
import {Material} from '../../models';

declare var editormd: any;

@Component({
    selector: 'app-mark-down',
    templateUrl: './mark-down.component.html',
    styleUrls: ['./mark-down.component.scss']
})
export class MarkDownComponent implements OnInit, AfterViewInit {
    
    @Input() post: Post;
    @Input() editormdConfig: any;
    editor: any; // editormd编辑器
    _id: string = util.randomString();
    
    constructor(
        private modalService: ModalService
    ) {
    }
    
    ngOnInit() {
        if (!this.editormdConfig) {
            const that = this;
            this.editormdConfig = {
                width: '100%',
                height: 540,
                path: 'assets/editor.md/lib/',
                markdown: '',
                toolbarIcons: function () {
                    return ['bold', 'hr', 'del', 'italic', 'quote', '|', 'list-ul',
                        'list-ol', '|', 'link', 'myImgBtn', 'code', 'html-entities',
                        'preformatted-text', 'code-block', 'table', '|', 'pagebreak',
                        'goto-line', 'preview', 'fullscreen', 'search'];
                },
                autoFocus: false,
                autoHeight: true,
                codeFold: true,
                saveHTMLToTextarea: true,    // 保存 HTML 到 Textarea
                searchReplace: true,
                htmlDecode: 'style,script,iframe|on*',            // 开启 HTML 标签解析，为了安全性，默认不开启
                emoji: true,
                taskList: true,
                tocm: true,         // Using [TOCM]
                tex: true,                   // 开启科学公式TeX语言支持，默认关闭
                flowChart: true,             // 开启流程图支持，默认关闭
                sequenceDiagram: true,       // 开启时序/序列图支持，默认关闭,
                imageUpload: true,
                imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'],
                imageUploadURL: (<any>window).environment.apiURL.materialResFul,
                toolbarHandlers: {
                    myImgBtn: function (cm, icon, cursor, selection) {
                        that.modalService.modal.imageSelect({
                            output: {
                                okCallback: (item: Material) => {
                                    item = item[0];
                                    const src = `${(<any>window).environment.apiURL.materialView}${item.id}`;
                                    const md = `![${item.name}](${src} "${item.name}")`;
                                    cm.replaceSelection(md);
                                    if (validator.isEmpty(selection)) {
                                        cm.setCursor(cursor.line, cursor.ch + 1);
                                    }
                                }
                            }
                        });
                    },
                },
                toolbarIconsClass: {
                    myImgBtn: 'fa-picture-o'  // 指定一个FontAawsome的图标类
                },
                lang: {
                    toolbar: {
                        myImgBtn: '选择图片',  // 自定义按钮的提示文本，即title属性
                    }
                },
                onload: function () {
                    this.setMarkdown(that.post.articleMd);
                }
            };
        }
    }
    
    ngAfterViewInit() {
        this.editor = editormd(this._id, this.editormdConfig);
    }
    
    getContent() {
        return {
            html: this.editor.getHTML(),
            md: this.editor.getMarkdown()
        };
    }
}
