import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {util} from '../../shared/utils/normal';
import {EditorConfig} from '../../models/editor-config';

declare var editormd: any;

@Component({
    selector: 'app-mark-down',
    templateUrl: './mark-down.component.html',
    styleUrls: ['./mark-down.component.scss']
})
export class MarkDownComponent implements OnInit, AfterViewInit {
    
    @Input() editormdConfig: EditorConfig;
    markdown: string = '';
    editor: any; // editormd编辑器
    _id: string = util.randomString();
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    ngAfterViewInit() {
        setTimeout(() => {
            console.log(this.editor.getHTML());
        }, 7000);
        this.editor = editormd(this._id, {
            width: '100%',
            height: 540,
            path: 'assets/editor.md/lib/',
            markdown: '',
            toolbarIcons: function () {
                return ['bold', 'hr', 'del', 'italic', 'quote', '|', 'list-ul',
                    'list-ol', '|', 'link', 'image', 'code', 'html-entities',
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
            imageUploadURL: './blog/uploadBlogImg',
            onload: function () {
                // this.setMarkdown('1');
                // var barHeight = document.querySelector('.editormd-toolbar-container').offsetHeight + 1;
                // document.querySelector('.CodeMirror').style.marginTop = barHeight + 'px';
            }
        });
    }
    
}
