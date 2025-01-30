declare namespace paypal {
	interface PurchaseUnit {
		amount: {
			value: string;
		};
	}

	interface OrderData {
		id: string;
		status: string;
	}

	interface Actions {
		order: {
			create: (data: { purchase_units: PurchaseUnit[] }) => Promise<string>;
			capture: () => Promise<OrderData>;
		};
	}

	interface ButtonsConfig {
		createOrder: (data: any, actions: Actions) => Promise<string>;
		onApprove: (data: { orderID: string }, actions: Actions) => Promise<void>;
		onError?: (error: any) => void;
	}

	interface Buttons {
		(config: ButtonsConfig): {
			render: (selector: string) => void;
		};
	}
}

declare const paypal: {
	Buttons: paypal.Buttons;
};
