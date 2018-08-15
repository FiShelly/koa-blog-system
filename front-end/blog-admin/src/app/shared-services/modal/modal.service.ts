import {
    ApplicationRef,
    ComponentFactoryResolver,
    EmbeddedViewRef,
    EventEmitter,
    Injectable,
    Injector
} from '@angular/core';
import {ModalAlertComponent} from '../../components/modal/modal-alert/modal-alert.component';
import {EventBusService} from '../eventBus/event-bus.service';
import {ModalConfirmComponent} from '../../components/modal/modal-confirm/modal-confirm.component';
import {ModalPromptComponent} from '../../components/modal/modal-prompt/modal-prompt.component';
const modalMap = [
    ModalAlertComponent,
    ModalConfirmComponent,
    ModalPromptComponent
];

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    
    _nextZIndex: number = 10001;
    _queue: any = [];
    _vcMap: any = {};
    _fnMap: any = {};
    modal: any = {};
    
    // $body:ViewContainerRef= document.querySelector('body');
    
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private eventBus: EventBusService,
        private injector: Injector
    ) {
        this.createModal();
    }
    
    adjustPosition(instance: any) {
        const el = instance.modal.nativeElement;
        const currentStyle = window.getComputedStyle(el);
        const w = Number.parseInt(currentStyle['width']);
        const h = Number.parseInt(currentStyle['height']) +
            Number.parseInt(currentStyle['padding-top']) +
            Number.parseInt(currentStyle['padding-bottom']);
        switch (currentStyle['position']) {
            case 'fixed':
                el.style.marginLeft = -(Math.ceil(w / 2)) + 'px';
                el.style.marginTop = -(Math.ceil(h / 2)) + 'px';
                break;
            case 'absolute':
                const windowInHeight = window.innerHeight;
                let scrollTop = document.body.scrollTop;
                if (scrollTop === 0 && document.documentElement.scrollTop > 0) {
                    scrollTop = document.documentElement.scrollTop;
                }
                if (h < document.body.scrollHeight) {
                    el.style.top = scrollTop + Math.ceil((windowInHeight - h) / 2) + 'px';
                } else {
                    el.style.top = scrollTop + 100 + 'px';
                }
                el.style.marginLeft = -(Math.ceil(w / 2)) + 'px';
                el.style.marginTop = '0px';
                break;
            default:
                break;
        }
    }
    
    createModal() {
        modalMap.forEach((modal: any, idx: number) => {
            const $alias = modal.$alias;
            this._vcMap[$alias] = this.componentFactoryResolver.resolveComponentFactory(modal);
            this.constructModal(this._vcMap[$alias], $alias);
        });
    }
    
    constructModal(modal: any, name: string) {
        this._fnMap[name] = (options) => {
            return this.build(modal, options);
        };
        this.modal[name] = this._fnMap[name];
    }
    
    build(modal: any, opts: any = {}) {
        const {inputs, outputs} = modal;
        
        const componentRef = modal.create(this.injector);
        this.appRef.attachView(componentRef.hostView);
        const componentRoot: HTMLElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0];
        const instance = componentRef.instance;
        this._queue.push(instance);
        instance.modal.nativeElement.style.zIndex = this._nextZIndex++;
        instance.close = () => {
            setTimeout(() => {
                for (let i = 0; i < this._queue.length; i++) {
                    if (this._queue[i] === instance) {
                        this._nextZIndex--;
                        this._queue.splice(i, 1);
                        break;
                    }
                }
                this.checkMask();
                this.appRef.detachView(componentRef.hostView);
                componentRef.destroy();
            });
        };
        
        outputs.forEach(row => {
            const {propName, templateName} = row;
            const outProps = instance[propName];
            if (outProps as EventEmitter<any>) {
                outProps.subscribe(data => {
                    if (templateName in opts.output) {
                        opts.output[templateName](data);
                    }
                });
            }
        });
        
        if ('modalCreated' in instance) {
            setTimeout(() => {
                const defaultOpts = ('defaultOptions' in instance) ? instance.defaultOptions : {};
                instance.modalCreated(Object.assign(defaultOpts, opts.input));
                setTimeout(() => {
                    this.adjustPosition(instance);
                });
            });
        }
        this.showMask();
        
        document.querySelector('body').appendChild(componentRoot);
    }
    
    
    showMask() {
        this.eventBus.emit('mask-show-change', {
            useway: 'modal',
            isShow: true,
            zIndex: this._nextZIndex - 1
        });
    }
    
    checkMask() {
        if (this._queue.length === 0) {
            this.hideMask();
        } else {
            this.subMask();
        }
    }
    
    subMask() {
        this.eventBus.emit('mask-show-change', {
            useway: 'modal',
            isShow: true,
            zIndex: this._nextZIndex - 2
        });
    }
    
    hideMask() {
        this.eventBus.emit('mask-show-change', {
            useway: 'modal',
            isShow: false,
            zIndex: 9999
        });
    }
}
