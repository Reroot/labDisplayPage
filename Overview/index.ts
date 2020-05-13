import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { LabView, LabViewProps, LabReativeInfo } from './LabView';

export class Overview implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private LabViewContainer: HTMLDivElement;
	private _context: ComponentFramework.Context<IInputs>;
	private labViewPropsPass: LabViewProps = {
		id: "",
		context: this._context
	};

	constructor() {

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {

		let currentPageContext = context as any;
		currentPageContext = currentPageContext ? currentPageContext["page"] : undefined;
		if (currentPageContext && currentPageContext.entityId) {
			this.labViewPropsPass.id = currentPageContext.entityId;
			this.labViewPropsPass.context = context;
		}
		this.LabViewContainer = container;
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void {

		this.labViewPropsPass.context = context;			
		
		ReactDOM.render(
			React.createElement(
				LabView,
				this.labViewPropsPass
			),
			this.LabViewContainer
		);
	}

	public getOutputs(): IOutputs {
		return {

		};
	}


	public destroy(): void {
		ReactDOM.unmountComponentAtNode(this.LabViewContainer);
	}

}