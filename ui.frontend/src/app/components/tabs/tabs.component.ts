import {AfterViewInit, ChangeDetectorRef, Component, HostBinding, Input, OnInit} from '@angular/core';
import {AEMAllowedComponentsContainerComponent, MapTo} from '@adobe/cq-angular-editable-components';
import {AbstractContainerComponent, ContainerIsEmptyFn} from '../AbstractContainerComponent';

const CONTAINER_CLASS_NAMES = 'aem-tabs';

const TabsEditConfig = {
    emptyLabel: 'Tabs',
    isEmpty: cqModel =>
      !cqModel || !cqModel.src || cqModel.src.trim().length < 1
  };

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.css']
})
/**
 * The current component provides the base presentational logic common to containers such as a grid or a page.
 * Container have in common the notion of item holders. Items are represented in the model by the fields _:items_ and _:itemsOrder_
 */
export class TabsComponent extends AbstractContainerComponent implements OnInit, AfterViewInit {

    @HostBinding('class') class = 'cmp-tabs';
    @HostBinding('attr.data-cq-data-path') cqPath = 'cqPath';

    activeItemName ?: string;
    @Input() activeItem?: string;
    @Input() accessibilityLabel?: string;

    constructor(private changeDetectorRef: ChangeDetectorRef) {
        super();
    }

    isActive(itemKey: string) {
        return (this.activeItemName === itemKey);
    }

    getTabClass(itemKey: string) {
        return `${this.class}__tab` + ((this.isActive(itemKey) ? ` ${this.class}__tab--active` : ''));
    }

    getTabTitle(itemKey: string) {
        return this.getItem(itemKey)['cq:panelTitle'];
    }
    getItemStyle(itemKey: string) {
        const display = this.isActive(itemKey) ? 'block' : 'none';
        return { display };
    }

    onClick(itemKey: string) {
        this.activeItemName = itemKey;
    }

    ngOnInit(): void {

        if ( this.activeItem && this.activeItem.trim().length > 0 ) {
            this.activeItemName = this.activeItem;
        } else {
            this.activeItemName = this.cqItemsOrder && this.cqItemsOrder.length > 0 ? this.cqItemsOrder[0] : '';
        }
        this.changeDetectorRef.detectChanges();

    }

    ngAfterViewInit(): void {

    }

    /**
     * Returns the class names of the container based on the data from the cqModel
     */
    getHostClassNames() {
        return CONTAINER_CLASS_NAMES;
    }

    get activeTabItem() {
        return this.getItem(this.activeItemName);
    }

    get activeTabItemDataPath() {
        return this.getDataPath(this.activeItemName);
    }

    get activeTabItemName() {
        console.log('activeItem', this.activeItemName);
        return this.activeItemName;
    }

    get hostClasses() {
        return this.getHostClassNames();
    }

    get isActiveItemNameSet() {
        return !!this.activeItemName && this.activeItemName.length > 0;
    }

}

MapTo('wknd-spa-angular/components/tabs')(TabsComponent, ContainerIsEmptyFn);
